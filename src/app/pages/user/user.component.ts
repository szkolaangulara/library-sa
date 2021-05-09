import {Component, OnInit} from '@angular/core';

import {takeUntil} from 'rxjs/operators';

import {Car} from '@app/models/car.interface';
import {TableData} from '@app/models/table.interface';
import {CarService} from '@app/services/car.service';
import {Destroyable} from '@app/components/destroyable';

@Component({
  selector: 'app-user',
  templateUrl: 'user.component.html'
})
export class UserComponent extends Destroyable implements OnInit {
  public cars: Car[];
  public carsData: TableData[] = [];
  public headers: string[] = [];
  public emiliaSalaries: number[] = [3200, 3500, 3200, 4000, 3000, 5000, 4500, 4500, 5200, 3900, 4100, 6000];
  public janSalaries: number[] = [5200, 5500, 7200, 5400, 6000, 4000, 8500, 9500, 5200, 7900, 4100, 9000];
  public jarekSalaries: number[] = [1200, 2500, 1200, 1400, 1500, 1300, 1500, 2500, 2200, 2900, 2100, 2000];

  constructor(private carService: CarService) {
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
        console.log(this.carsData);

        this.headers.push('Marka');
        this.headers.push('Model');
        this.headers.push('Cena');
        this.headers.push('Data');
      });
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
