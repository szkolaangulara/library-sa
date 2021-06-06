import {Component, OnInit} from '@angular/core';
import {ChartType} from '@app/enums/chart-type.enum';
import {CarService} from '@app/services/car.service';
import {Car} from '@app/models/car.interface';
import {Destroyable} from '@app/components/destroyable';
import {catchError, takeUntil} from 'rxjs/operators';
import {TableData} from '@app/models/table.interface';
import {DialogService} from '@app/components/dialog/services/dialog.service';
import {CarCardComponent} from '@app/components/car-card/car-card.component';
import {HttpResponse} from '@angular/common/http';
import {ViewState} from '@app/enums/view-state.enum';
import {ChartService} from '@app/components/charts/services/chart.service';
import {EMPTY} from 'rxjs';
import {CarStatus} from '@app/enums/car.status.enum';
import {DialogConfig} from '@app/components/dialog/dialog-config.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent extends Destroyable implements OnInit {
  public topCarsViewState: ViewState = ViewState.LOADING;
  public lineViewState: ViewState = ViewState.LOADING;
  public carsTableViewState: ViewState = ViewState.LOADING;
  public ChartType: typeof ChartType = ChartType;
  public cars: Car[];
  public carsTableData: TableData[];
  public headers: string[] = [];
  public lineChartData: number[];
  public chartLabels: string[] = ['STY', 'LUT', 'MAR', 'KWI', 'MAJ', 'CZE', 'LIP', 'SIE', 'WRZ', 'PAŹ', 'LIS', 'GRU'];

  constructor(private carService: CarService, private dialogService: DialogService, private chartService: ChartService) {
    super();
  }

  public ngOnInit() {
    this.carService.fetchTopSoldCars()
      .pipe(
        takeUntil(this.destroyed$),
        catchError(() => {
          this.topCarsViewState = ViewState.ERROR;
          return EMPTY;
        })
      )
      .subscribe((response: HttpResponse<Car[]>) => {
        this.cars = response.body;
        this.topCarsViewState = ViewState.SUCCESS;
      });

    this.chartService.fetchLinearChartData()
      .pipe(
        takeUntil(this.destroyed$),
        catchError(() => {
          this.lineViewState = ViewState.ERROR;
          return EMPTY;
        })
      )
      .subscribe((response: HttpResponse<number[]>) => {
        this.lineChartData = response.body;
        this.lineViewState = ViewState.SUCCESS;
      });

    this.handleTableDataPreparation();
  }

  private handleTableDataPreparation(): void {
    this.carService.fetchAllCars()
      .pipe(
        takeUntil(this.destroyed$),
        catchError(() => {
          this.carsTableViewState = ViewState.ERROR;
          return EMPTY;
        })
      )
      .subscribe((response: HttpResponse<Car[]>) => {
        this.carsTableData = this.prepareTableDataFromCarsData(response.body);
        this.headers.push('Marka');
        this.headers.push('Model');
        this.headers.push('Cena');
        this.headers.push('Data');
        this.carsTableViewState = ViewState.SUCCESS;
      });
  }

  public rowClicked(tableData: TableData): void {
    const car: Car = this.prepareCarFromTableData(tableData);
    const dialogConfig: DialogConfig = {
      width: '500px',
    };
    const carComponent: CarCardComponent = this.dialogService.openDialog(CarCardComponent, dialogConfig);
    carComponent.car = car;
    carComponent.displayFooter = false;
  }

  private prepareCarFromTableData(tableData: TableData): Car {
    return {
      brand: tableData.data[0].value as string,
      model: tableData.data[1].value as string,
      price: tableData.data[2].value as number,
      pricePerDay: tableData.data[3].value as number,
      date: tableData.data[4].value as string,
      status: tableData.data[5].value as CarStatus,
      photoSource: tableData.data[6].value as string,
    };
  }

  private prepareTableDataFromCarsData(cars: Car[]): TableData[] {
    const tableData: TableData[] = [];
    cars.forEach((car: Car) => {
      const singleTableData: TableData = {
        data: [
          {
            value: car.brand,
            display: true,
          },
          {
            value: car.model,
            display: true,
          },
          {
            value: car.price,
            display: true,
          },
          {
            value: car.pricePerDay,
            display: false,
          },
          {
            value: car.date,
            display: true,
          },
          {
            value: car.status,
            display: false,
          },
          {
            value: car.photoSource,
            display: false,
          }
        ]
      };

      tableData.push(singleTableData);
    });
    return tableData;
  }
}
