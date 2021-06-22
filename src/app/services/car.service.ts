import {Injectable} from '@angular/core';
import {Car} from '@app/models/car.interface';
import {Observable, Subject} from 'rxjs';
import {delay, map} from 'rxjs/operators';
import {HttpService} from '@app/services/http.service';
import {HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  public newCarAdded$: Subject<boolean> = new Subject<boolean>();
  private cars: Car[];

  constructor(private httpService: HttpService) {
  }

  public addNewCar(car: Car): void {
    this.cars.push(car);
    this.newCarAdded$.next();
  }

  public fetchAllCars(): Observable<Car[]> {
    return this.httpService.get<Car[]>('/cars/all')
      .pipe(delay(1000));
  }

  public fetchTopSoldCars(): Observable<Car[]> {
    return this.httpService.get<Car[]>('/cars/top')
      .pipe(delay(2000));
  }

}
