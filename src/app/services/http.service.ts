import {Injectable} from '@angular/core';

import {Observable, throwError} from 'rxjs';

import {environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  protected apiEndPoint: string = environment.apiEndPoint;

  constructor(private http: HttpClient) {
    this.apiEndPoint = environment.apiEndPoint;
  }

  public get<T>(uri: string): Observable<T> {
    return this.http.get<T>(this.prepareFullURL(uri), {observe: 'response'})
      .pipe(
        map((response: HttpResponse<T>) => response.body),
        catchError((error: HttpErrorResponse) => throwError(error))
      )
  }

  public post<T>(uri: string, attrs: any = {}): Observable<T> {
    return this.http.post<T>(this.prepareFullURL(uri), attrs, {observe: 'response'})
      .pipe(
        map((response: HttpResponse<T>) => response.body),
        catchError((error: HttpErrorResponse) => throwError(error))
      );
  }

  private prepareFullURL(url: string): string {
    return `${this.apiEndPoint}${url}`;
  }
}
