import {Pipe, PipeTransform} from '@angular/core';
import {CarStatus} from '@app/enums/car.status.enum';

@Pipe({
  name: 'carStatus'
})
export class CarStatusPipe implements PipeTransform {

  public transform(value: CarStatus): string {
    switch (value) {
      case CarStatus.SOLD:
        return 'SPRZEDANY';
      case CarStatus.TO_ORDER:
        return 'NA ZAMÓWIENIE';
      case CarStatus.BORROWED:
        return 'WYPOŻYCZONY';
      case CarStatus.AVAILABLE:
        return 'DOSTĘPNY';
    }
  }

}
