import {Injectable} from '@angular/core';
import {Car} from '@app/models/car.interface';
import {Observable, of, Subject} from 'rxjs';
import {delay, map} from 'rxjs/operators';
import {CarStatus} from '@app/enums/car.status.enum';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  public newCarAdded$: Subject<boolean> = new Subject<boolean>();
  private cars: Car[] = this.prepareDefaultCars();

  public addNewCar(car: Car): void {
    this.cars.push(car);
    this.newCarAdded$.next();
  }

  public fetchAllCars(): Observable<Car[] | void> {
    const shouldThrowError: boolean = false;
    return of(this.cars).pipe(
      map(() => {
        if (shouldThrowError) {
          throw new Error('');
        }
        return this.cars;
      }),
      delay(2000)
    );
  }

  public fetchTopSoldCars(): Observable<Car[]> {
    return of ([
      {
        brand: 'Audi',
        model: 'RS7',
        price: 280000,
        pricePerDay: 2500,
        status: CarStatus.AVAILABLE,
        date: '2015/06/10',
        photoSource: 'https://www.szkolaangulara.pl/wp-content/uploads/2020/05/3-small.jpeg'
      },
      {
        brand: 'Mercedes',
        model: 'Klasa G',
        price: 1150000,
        pricePerDay: 6000,
        status: CarStatus.TO_ORDER,
        date: '2018/09/22',
        photoSource: 'https://www.szkolaangulara.pl/wp-content/uploads/2020/05/6-small.jpeg'
      },
      {
        brand: 'Lamborghini',
        model: 'Urus',
        price: 1780000,
        pricePerDay: 8000,
        status: CarStatus.SOLD,
        date: '2018/09/22',
        photoSource: 'https://www.szkolaangulara.pl/wp-content/uploads/2020/05/10-small.jpeg'
      },
    ])
  }

  private prepareDefaultCars(): Car[] {
    return [
      {
        brand: 'Audi',
        model: 'RS7',
        price: 280000,
        pricePerDay: 2500,
        status: CarStatus.AVAILABLE,
        date: '2015/06/10',
        photoSource: 'https://www.szkolaangulara.pl/wp-content/uploads/2020/05/3-small.jpeg'
      },
      {
        brand: 'Mercedes',
        model: 'GT',
        price: 700000,
        pricePerDay: 4500,
        status: CarStatus.TO_ORDER,
        date: '2017/03/01',
        photoSource: 'https://www.szkolaangulara.pl/wp-content/uploads/2020/05/4-small.jpeg'
      },
      {
        brand: 'Audi',
        model: 'A3',
        price: 130000,
        pricePerDay: 350,
        status: CarStatus.BORROWED,
        date: '2018/04/09',
        photoSource: 'https://www.szkolaangulara.pl/wp-content/uploads/2020/05/5-small.jpeg'
      },
      {
        brand: 'Nissan',
        model: '370z',
        price: 120000,
        pricePerDay: 350,
        status: CarStatus.AVAILABLE,
        date: '2016/09/22',
        photoSource: 'https://www.szkolaangulara.pl/wp-content/uploads/2020/05/8-small.jpeg'
      },
      {
        brand: 'BMW',
        model: 'Seria 3',
        price: 45000,
        pricePerDay: 200,
        status: CarStatus.BORROWED,
        date: '2010/09/22',
        photoSource: 'https://www.szkolaangulara.pl/wp-content/uploads/2020/05/7-small.jpeg'
      },
      {
        brand: 'Mercedes',
        model: 'Klasa G',
        price: 1150000,
        pricePerDay: 6000,
        status: CarStatus.TO_ORDER,
        date: '2018/09/22',
        photoSource: 'https://www.szkolaangulara.pl/wp-content/uploads/2020/05/6-small.jpeg'
      },
      {
        brand: 'Lamborghini',
        model: 'Urus',
        price: 1780000,
        pricePerDay: 8000,
        status: CarStatus.SOLD,
        date: '2018/09/22',
        photoSource: 'https://www.szkolaangulara.pl/wp-content/uploads/2020/05/10-small.jpeg'
      },
    ];
  }

}
