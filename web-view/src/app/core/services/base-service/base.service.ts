import { Injectable } from '@angular/core';
import { throwError as observableThrowError } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { take, catchError, finalize, count } from 'rxjs/operators';
import { SnackBarService } from '../messages/snack-bar.service';
import { MatCalendarBody } from '@angular/material';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class BaseService {

  private _spinner = document.getElementById('container-spinner');
  private _count = 0;

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

    this.loadingShow();
    return this._http
      .get(`${environment.urls.api}${url}`, this._getOptions())
      .pipe(take(1),
        catchError(err => {
          this._serviceSnackBar.message('error', err.error);
          return observableThrowError(err)
        }),
        finalize(() => { this.lodingHide() })
      );
  }

  public getById(url: string, id: number | string) {
    this.loadingShow();

    return this._http
      .get(`${environment.urls.api}${url}/${id}`, this._getOptions())
      .pipe(take(1),
        catchError(err => {
          this._serviceSnackBar.message('error', err.error);
          return observableThrowError(err)
        }),
        finalize(() => { this.lodingHide() })
      )
  }


  public post(url: string, data: any) {
    this.loadingShow();
    const body = JSON.stringify(data);

    return this._http
      .post(`${environment.urls.api}${url}`, body, this._getOptions())
      .pipe(take(1),
        catchError(err => {
          this._serviceSnackBar.message('error', err.error);
          return observableThrowError(err)
        }),
        finalize(() => { this.lodingHide() })
      )
  }

  public put(url: string, id: number | string, data: any) {
    this.loadingShow();
    const body = JSON.stringify(data);

    return this._http
      .put(`${environment.urls.api}${url}/${id}`, body, this._getOptions())
      .pipe(take(1),
        catchError(err => {
          this._serviceSnackBar.message('error', err.error);
          return observableThrowError(err)
        }),
        finalize(() => { this.lodingHide() })
      )
  }

  public delete(url: string, id: number | string) {
    this.loadingShow();

    return this._http
      .delete(`${environment.urls.api}${url}/${id}`, this._getOptions())
      .pipe(take(1),
        catchError(err => {
          this._serviceSnackBar.message('error', err.error);
          return observableThrowError(err)
        }),
        finalize(() => { this.lodingHide() })
      )
  }

  loadingShow() {
    const body = document.getElementById('container-spinner');
    if (this._count == 0) {
      body.classList.add('show');
    }
    this._count++;
  }

  lodingHide() {
    this._count--;
    if (this._count == 0)
      this._spinner.classList.remove('show');

  }

}
