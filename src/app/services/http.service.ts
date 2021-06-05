import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {HttpClient, HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  protected apiEndPoint: string = environment.apiEndPoint;

  constructor(private http: HttpClient) {
    this.apiEndPoint = environment.apiEndPoint;
  }

  public get<T>(uri: string): Observable<HttpResponse<T>> {
    return this.http.get<T>(this.prepareFullURL(uri), {observe: 'response'});
  }

  public post<T>(uri: string, attrs: any = {}, shortUri: boolean = false): Observable<HttpResponse<T>> {
    return this.http.post<T>(this.prepareFullURL(uri), attrs, {observe: 'response'});
  }

  private prepareFullURL(url: string): string {
    return `${this.apiEndPoint}${url}`;
  }
}
