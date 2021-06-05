import {Pipe, PipeTransform} from '@angular/core';
import {CarStatus} from '@app/enums/car.status.enum';

@Pipe({
  name: 'carStatusColor'
})
export class CarStatusColorPipe implements PipeTransform {

  public transform(value: CarStatus): string {
    switch (value) {
      case CarStatus.SOLD:
        return '#a10000';
      case CarStatus.TO_ORDER:
        return '#007bbd';
      case CarStatus.BORROWED:
        return '#d4cd00';
      case CarStatus.AVAILABLE:
        return '#27c400';
    }
  }

}
