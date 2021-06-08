import {Component, OnInit} from '@angular/core';

import {ChartType} from '@app/enums/chart-type.enum';
import {ChartService} from '@app/components/charts/services/chart.service';
import {catchError, takeUntil} from 'rxjs/operators';
import {Destroyable} from '@app/components/destroyable';
import {HttpResponse} from '@angular/common/http';
import {ViewState} from '@app/enums/view-state.enum';
import {EMPTY, Observable} from 'rxjs';

@Component({
  selector: 'app-chart-dashboard',
  templateUrl: './chart-dashboard.component.html',
  styleUrls: ['./chart-dashboard.component.scss']
})
export class ChartDashboardComponent extends Destroyable implements OnInit {

  constructor(private chartService: ChartService) {
    super();
  }

  public linearChartViewState: ViewState = ViewState.LOADING;
  public barChartViewState: ViewState = ViewState.LOADING;
  public pieChartViewState: ViewState = ViewState.LOADING;
  public doughnutChartViewState: ViewState = ViewState.LOADING;
  public lineChartData: number[];
  public barChartData: number[];
  public pieChartData: number[];
  public doughnutChartData: number[];
  public chartLabels: string[] = ['STY', 'LUT', 'MAR', 'KWI', 'MAJ', 'CZE', 'LIP', 'SIE', 'WRZ', 'PAŹ', 'LIS', 'GRU'];
  public chartRadarLabels: string[] = [
    'Umówione spotkania',
    'Sprzedane samochody',
    'W trakcie',
    'Odrzucone',
    'Liczba klientów',
    'Zwroty',
    'Zamiana'
  ];
  public chartColors: string[] = [
    'rgb(192, 57, 43, 0.2)',
    'rgb(231, 76, 60, 0.2)',
    'rgb(155, 89, 182, 0.2)',
    'rgb(142, 68, 173, 0.2)',
    'rgb(41, 128, 185, 0.2)',
    'rgb(52, 152, 219, 0.2)',
    'rgb(26, 188, 156, 0.2)',
    'rgb(22, 160, 133, 0.2)',
    'rgb(39, 174, 96, 0.2)',
    'rgb(46, 204, 113, 0.2)',
    'rgb(241, 196, 15, 0.2)',
    'rgb(243, 156, 18, 0.2)',
  ];
  public chartBorderColors: string[] = [
    'rgb(192, 57, 43)',
    'rgb(231, 76, 60)',
    'rgb(155, 89, 182)',
    'rgb(142, 68, 173)',
    'rgb(41, 128, 185)',
    'rgb(52, 152, 219)',
    'rgb(26, 188, 156)',
    'rgb(22, 160, 133)',
    'rgb(39, 174, 96)',
    'rgb(46, 204, 113)',
    'rgb(241, 196, 15)',
    'rgb(243, 156, 18)',
  ];

  public ChartType: typeof ChartType = ChartType;

  public ngOnInit(): void {
    this.prepareChartsData();
  }

  private prepareChartsData(): void {
    this.chartService.fetchLinearChartData()
      .pipe(
        catchError(() => this.handleError(ChartType.LINE)),
        takeUntil(this.destroyed$)
      )
      .subscribe((response: HttpResponse<number[]>) => this.handleSubscription(ChartType.LINE, response?.body));

    this.chartService.fetchBarChartData()
      .pipe(
        catchError(() => this.handleError(ChartType.PIE)),
        takeUntil(this.destroyed$)
      )
      .subscribe((response: HttpResponse<number[]>) => this.handleSubscription(ChartType.PIE, response?.body));

    this.chartService.fetchPieChartData()
      .pipe(
        catchError(() => this.handleError(ChartType.BAR)),
        takeUntil(this.destroyed$)
      )
      .subscribe((response: HttpResponse<number[]>) => this.handleSubscription(ChartType.BAR, response?.body));

    this.chartService.fetchDoughnutChartData()
      .pipe(
        catchError(() => this.handleError(ChartType.DOUGHNUT)),
        takeUntil(this.destroyed$)
      )
      .subscribe((response: HttpResponse<number[]>) => this.handleSubscription(ChartType.DOUGHNUT, response?.body));
  }

  private handleError(chartType: ChartType): Observable<void> {
    switch (chartType) {
      case ChartType.BAR:
        this.barChartViewState = ViewState.ERROR;
        break;
      case ChartType.LINE:
        this.linearChartViewState = ViewState.ERROR;
        break;
      case ChartType.PIE:
        this.pieChartViewState = ViewState.ERROR;
        break;
      case ChartType.DOUGHNUT:
        this.doughnutChartViewState = ViewState.ERROR;
        break;
    }

    return EMPTY;
  }

  private handleSubscription(chartType: ChartType, chartData: number[]): void {
    switch (chartType) {
      case ChartType.BAR:
        this.barChartData = chartData;
        this.barChartViewState = ViewState.SUCCESS;
        break;
      case ChartType.LINE:
        this.lineChartData = chartData;
        this.linearChartViewState = ViewState.SUCCESS;
        break;
      case ChartType.PIE:
        this.pieChartData = chartData;
        this.pieChartViewState = ViewState.SUCCESS;
        break;
      case ChartType.DOUGHNUT:
        this.doughnutChartData = chartData;
        this.doughnutChartViewState = ViewState.SUCCESS;
        break;
    }
  }
}
