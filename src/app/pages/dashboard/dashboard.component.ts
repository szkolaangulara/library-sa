import {Component, OnInit} from '@angular/core';
import {ChartType} from '@app/enums/chart-type.enum';
import {CarService} from '@app/services/car.service';
import {Car} from '@app/models/car.interface';
import {Destroyable} from '@app/components/destroyable';
import {takeUntil} from 'rxjs/operators';
import {TableData} from '@app/models/table.interface';
import {DialogService} from '@app/components/dialog/services/dialog.service';
import {CarCardComponent} from '@app/components/car-card/car-card.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent extends Destroyable implements OnInit {
  public ChartType: typeof ChartType = ChartType;
  public cars: Car[];
  public carsData: TableData[] = [];
  public headers: string[] = [];
  public lineChartData: number[] = [100, 70, 90, 70, 85, 60, 75, 60, 90, 80, 110, 100];
  public chartLabels: string[] = ['STY', 'LUT', 'MAR', 'KWI', 'MAJ', 'CZE', 'LIP', 'SIE', 'WRZ', 'PAŹ', 'LIS', 'GRU'];

  constructor(private carService: CarService, private dialogService: DialogService) {
    super();
  }

  public ngOnInit() {
    this.carService.fetchTopSoldCars()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((cars: Car[]) => this.cars = cars);

    this.handleTableDataPreparation();
  }

  private handleTableDataPreparation(): void {
    this.carService.fetchAllCars()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((cars: Car[]) => {
        this.carsData = this.prepareTableDataFromCarsData(cars);
      });

    this.headers.push('Marka');
    this.headers.push('Model');
    this.headers.push('Cena');
    this.headers.push('Data');
  }

  public rowClicked(tableData: TableData): void {
    const car: Car = this.prepareCarFromTableData(tableData);
    const carComponent: CarCardComponent = this.dialogService.openDialog(CarCardComponent);
    carComponent.car = car;
    carComponent.displayFooter = false;
  }

  private prepareCarFromTableData(tableData: TableData): Car {
    return {
      brand: tableData.data[0].value as string,
      model: tableData.data[1].value as string,
      price: tableData.data[2].value as number,
      date: tableData.data[3].value as string,
      photoSource: tableData.data[4].value as string,
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
            value: car.date,
            display: true,
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
