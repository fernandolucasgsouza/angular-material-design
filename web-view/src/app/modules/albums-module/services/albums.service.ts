import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

import { MainModel } from 'src/app/core/Models/business';
import { Constants } from 'src/app/core/providers/constants';
import { BaseService } from 'src/app/core/services/base-service/base.service';
import { SnackBarService } from 'src/app/core/services/messages/snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  cardAlbum: Subject<MainModel> = new Subject<MainModel>();
  get cardAlbum$() {
    return this.cardAlbum.asObservable();
  }

  album: MainModel = new MainModel();
  modal = {
    title: 'Novo Album',
    description: '',
    footer: '',
    open: false
  }

  constructor(
    private _base: BaseService,
    private _serviceSnackBar: SnackBarService
  ) { }

  onCloseModal() {
    this.modal.open = false;
  }

  public getAlbums() {
    return this._base.get('albums');
  }

  public createAlbum(datas: object) {
    return this._base.post('albums', datas).subscribe((res: MainModel) => {
      this._serviceSnackBar.message('success', Constants.MSG_SUCCESS);
      console.warn(Constants.MSG_SUCCESS, res);
      this.onCloseModal();
    });
  }

  public updateAlbums(id: number | string, datas: MainModel) {
    return this._base.put('albums', id, datas).subscribe((res: MainModel) => {
      this._serviceSnackBar.message('success', Constants.MSG_SUCCESS);
      console.warn(Constants.MSG_SUCCESS, res);
      this.cardAlbum.next(datas);
      this.onCloseModal();
    });
  }

  public deleteAlbums(id: number | string) {
    return this._base.delete('albums', id);
  }
}
