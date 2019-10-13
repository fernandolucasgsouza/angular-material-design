import { Injectable } from '@angular/core';

import { MainModel } from 'src/app/core/Models/business';
import { BaseService } from 'src/app/core/services/base-service/base.service';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  album: MainModel = new MainModel();
  modal = {
    title: 'Novo Album',
    description: '',
    footer: '',
    open: false
  }

  constructor(private _base: BaseService) { }

  onCloseModal() {
    this.modal.open = false;
  }

  public getAlbums() {
    return this._base.get('albums');
  }

  public createAlbum(datas: object) {
    return this._base.post('albums', datas);
  }

  public updateAlbums(id: number | string, datas: object) {
    return this._base.put('albums', id, datas);
  }

  public deleteAlbums(id: number | string) {
    return this._base.delete('albums', id);
  }
}
