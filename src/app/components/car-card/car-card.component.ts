import {Component, EventEmitter, Input, Output} from '@angular/core';

import {Car} from '@app/models/car.interface';
import {DialogService} from '@app/components/dialog/services/dialog.service';
import {DialogConfig} from '@app/components/dialog/dialog-config.interface';

@Component({
  selector: 'app-car-card',
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.scss']
})
export class CarCardComponent {
  @Input()
  public car: Car = this.prepareDefaultCar();
  @Input()
  public displayFooter: boolean = true;
  @Output()
  public lastElementEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(private dialogService: DialogService) {
  }

  public moreInfo(): void {
    const dialogConfig: DialogConfig = {
      width: '500px',
    };
    const cardComponent: CarCardComponent = this.dialogService.openDialog(CarCardComponent, dialogConfig);
    cardComponent.car = this.car;
    cardComponent.displayFooter = false;
  }

  private prepareDefaultCar(): Car {
    return {
      brand: 'Audi',
      model: 'RS7',
      price: 280000,
      date: '2015/06/10',
      photoSource: 'https://www.szkolaangulara.pl/wp-content/uploads/2020/05/3-small.jpeg'
    };
  }
}
