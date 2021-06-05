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

  public fetchAllCars(): Observable<HttpResponse<Car[]>> {
    return this.httpService.get<Car[]>('/cars/all')
      .pipe(
        delay(1000),
        map((response: HttpResponse<Car[]>) => {
          if (this.cars && this.cars.length > 0) {
            return new HttpResponse<Car[]>({body: this.cars})
          }

          this.cars = response.body;
          return response;
        })
      );
  }

  public fetchTopSoldCars(): Observable<HttpResponse<Car[]>> {
    return this.httpService.get<Car[]>('/cars/top')
      .pipe(delay(2000));
  }

}
