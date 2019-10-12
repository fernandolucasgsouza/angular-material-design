import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

import { enumMsg } from '../../providers/emuns';

@Injectable({
  providedIn: 'root'
})

export class SnackBarService {

  constructor(private _snackBar: MatSnackBar) { }

  message(type_msg: 'success' | 'error', msg: string, action = 'Ok', configuration?: MatSnackBarConfig) {

    this._snackBar.open(msg, action, {
      duration: 5000,
      horizontalPosition: 'start',
      panelClass: this._setColorMessage(type_msg),
      ...configuration
    });
  }

  private _setColorMessage(type_message: string, ) {
    let set_color: string;

    switch (type_message) {
      case enumMsg.success:
        set_color = 'dialog-success'
        break;
      case enumMsg.error:
        set_color = 'dialog-error'
        break;
    }
    return set_color;
  }
}
