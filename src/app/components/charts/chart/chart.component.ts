import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  ViewChild
} from '@angular/core';

import Chart from 'chart.js';

import {ChartConfig, ChartService} from '@app/components/charts/services/chart.service';
import {ChartType} from '@app/enums/chart-type.enum';
import {forkJoin, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Destroyable} from '@app/components/destroyable';
import {ViewState} from '@app/enums/view-state.enum';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent extends Destroyable implements AfterViewInit, OnChanges {
  private static instanceCounter: number = 0;
  @ViewChild('myCanvas')
  public canvasElement: ElementRef;
  @Input()
  public chartType: ChartType;
  @Input()
  public color: string = '#48f542';
  @Input()
  public mainLabel: string;
  @Input()
  public topLabel: string;
  @Input()
  public icon: string;
  @Input()
  public iconColor: string;
  @Input()
  public chartData: number[];
  @Input()
  public chartColors: string[];
  @Input()
  public borderColors: string[];
  @Input()
  public labels: string[];
  @Input()
  public viewState: ViewState = ViewState.SUCCESS;
  @Input()
  public chartHeight: string;
  public myChartData;
  public data: any;
  public canvas: HTMLCanvasElement;
  public canvasFillStyles: CanvasRenderingContext2D;
  public chartId: string;
  public ViewState: typeof ViewState = ViewState;

  private chartRendered$: Subject<boolean> = new Subject<boolean>();
  private chartDataPrepared$: Subject<boolean> = new Subject<boolean>();

  constructor(private chartService: ChartService, private renderer: Renderer2, private changeDetectorRef: ChangeDetectorRef) {
    super();
    forkJoin([this.chartRendered$, this.chartDataPrepared$])
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => this.renderPreparedChart());
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.chartData && this.chartData && this.chartData.length > 0) {
      this.chartDataPrepared$.next(true);
      this.chartDataPrepared$.complete();
    }
  }

  public ngAfterViewInit(): void {
    this.handleChartPreparation();
    this.changeDetectorRef.detectChanges();
    this.chartRendered$.next(true);
    this.chartRendered$.complete();
  }

  public handleChartPreparation(): void {
    this.setChartDynamicId();

    this.canvas = document.getElementById(this.chartId) as HTMLCanvasElement;
    this.canvasFillStyles = this.canvas.getContext('2d');
  }

  private renderPreparedChart(): void {
    const chartConfig: ChartConfig = this.prepareChartConfig();
    const config = this.chartService.getChartConfig(chartConfig);
    this.myChartData = new Chart(this.canvasFillStyles, config);

    this.myChartData.data.datasets[0].data = this.chartData;
    this.myChartData.update();
  }

  private prepareChartId(): string {
    const chartId: string = `chart-${ChartComponent.instanceCounter}`;
    ChartComponent.instanceCounter++;
    return chartId;
  }

  private setChartDynamicId(): void {
    this.chartId = this.prepareChartId();
    this.renderer.setProperty(this.canvasElement.nativeElement, 'id', this.chartId);
  }

  private prepareChartConfig(): ChartConfig {
    return {
      chartData: this.chartData,
      chartType: this.chartType,
      color: this.color,
      canvasFillStyles: this.canvasFillStyles,
      chartColors: this.chartColors,
      borderColors: this.borderColors,
      labels: this.labels,
    };
  }
}
