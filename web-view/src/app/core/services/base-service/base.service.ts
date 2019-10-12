import { Injectable } from '@angular/core';
import { throwError as observableThrowError } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { take, catchError, finalize } from 'rxjs/operators';
import { SnackBarService } from '../messages/snack-bar.service';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class BaseService {

  constructor(
    private _http: HttpClient,
    private _serviceSnackBar: SnackBarService
  ) { }

  private _getOptions() {
    const header = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8'
    });
    return { headers: header, body: null }
  }

  public get(url: string) {

    return this._http
      .get(`${environment.urls.api}${url}`, this._getOptions())
      .pipe(take(1),
        catchError(err => {
          this._serviceSnackBar.message('error', err.error);
          return observableThrowError(err)
        }),
        finalize(() => { })
      )
  }

  public getById(url: string, id: number | string) {

    return this._http
      .get(`${environment.urls.api}${url}/${id}`, this._getOptions())
      .pipe(take(1),
        catchError(err => {
          this._serviceSnackBar.message('error', err.error);
          return observableThrowError(err)
        }),
        finalize(() => { })
      )
  }


  public post(url: string, data: any) {
    const body = JSON.stringify(data);

    return this._http
      .post(`${environment.urls.api}${url}`, body, this._getOptions())
      .pipe(take(1),
        catchError(err => {
          this._serviceSnackBar.message('error', err.error);
          return observableThrowError(err)
        }),
        finalize(() => { })
      )
  }

  public put(url: string, id: number | string, data: any) {
    const body = JSON.stringify(data);

    return this._http
      .put(`${environment.urls.api}${url}/${id}`, body, this._getOptions())
      .pipe(take(1),
        catchError(err => {
          this._serviceSnackBar.message('error', err.error);
          return observableThrowError(err)
        }),
        finalize(() => { })
      )
  }

  public delete(url: string, id: number | string) {

    return this._http
      .delete(`${environment.urls.api}${url}/${id}`, this._getOptions())
      .pipe(take(1),
        catchError(err => {
          this._serviceSnackBar.message('error', err.error);
          return observableThrowError(err)
        }),
        finalize(() => { })
      )
  }


}
