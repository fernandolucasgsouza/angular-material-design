import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/core/services/base-service/base.service';
import { MainModel } from 'src/app/core/Models/business';

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

  public deleteAlbums(id: number | string) {
    return this._base.delete('albums', id);
  }

  public updateAlbums(id: number | string, datas: object) {
    return this._base.put('albums', id, datas);
  }

}
