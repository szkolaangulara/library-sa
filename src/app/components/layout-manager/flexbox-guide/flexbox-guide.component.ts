import {Component, OnInit} from '@angular/core';

import {takeUntil} from 'rxjs/operators';

import {Car} from '@app/models/car.interface';
import {CarService} from '@app/services/car.service';
import {Destroyable} from '@app/components/destroyable';
import {DialogService} from '@app/components/dialog/services/dialog.service';
import {AddCarDialogFormComponent} from '@app/components/layout-manager/add-car-dialog-form/add-car-dialog-form.component';

@Component({
  selector: 'app-flexbox-guide',
  templateUrl: './flexbox-guide.component.html',
  styleUrls: ['./flexbox-guide.component.scss']
})
export class FlexboxGuideComponent extends Destroyable implements OnInit {
  public cars: Car[];
  public radioValue: string = 'flex-start';
  public radioValueY: string = 'flex-start';
  public cardAmount: number = 3;
  public cardWidth: string = '32%';

  constructor(private carService: CarService, private dialogService: DialogService) {
    super();
  }

  public ngOnInit(): void {
    this.prepareCars();

    this.carService.newCarAdded$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => this.prepareCars());
  }

  public addNewCar(): void {
    this.dialogService.openDialog(AddCarDialogFormComponent);
  }

  private prepareCars(): void {
    this.carService.fetchAllCars()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((cars: Car[]) => this.cars = cars);
  }
}
