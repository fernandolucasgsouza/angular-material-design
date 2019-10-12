import { Component, OnInit } from '@angular/core';

import { AlbumsService } from '../../services/albums.service';
import { MainModel } from 'src/app/core/Models/business';
import { SnackBarService } from 'src/app/core/services/messages/snack-bar.service';
import { Constants } from 'src/app/core/providers/constants';

@Component({
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

  datas: Array<MainModel> = []

  constructor(
    public service: AlbumsService,
    private _serviceSnackBar: SnackBarService
  ) { }

  ngOnInit() {
    this.service.getAlbums().subscribe((res: Array<MainModel>) => this.datas = res);
  }

  updateAlbum(data: MainModel) {

    console.log(data);
    this.service.album = data;
    this.service.modal.title = 'Atualizar Album'
    this.service.modal.open = true;

  }

  deleteAlbum(id: number | string) {
    this.service.deleteAlbums(id).subscribe(() => {
      this._serviceSnackBar.message('success', Constants.MSG_SUCCESS)
    });
  }

}
