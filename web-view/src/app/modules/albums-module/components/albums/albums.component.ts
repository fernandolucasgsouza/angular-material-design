import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';

import { MainModel } from 'src/app/core/Models/business';
import { Constants } from 'src/app/core/providers/constants';
import { AlbumsService } from '../../services/albums.service';
import { Translaters } from 'src/app/core/providers/translaters';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { SnackBarService } from 'src/app/core/services/messages/snack-bar.service';

@Component({
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

  datas = new MatTableDataSource<MainModel>();
  observableData: Observable<any>;
  subscription: Subscription;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public service: AlbumsService,
    private _serviceSnackBar: SnackBarService
  ) {
    this.subscription = this.service.cardAlbum$.subscribe(item => this.updateCard(item));
  }

  ngOnInit() {
    Translaters.paginatorPTBR(this.paginator);
    this.requestAlbums();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  requestAlbums() {
    this.service.getAlbums().subscribe((res: any) => {
      this.datas.data = res;
      this.observableConnect();
    });
  }

  openModal(datas: any) {
    this.service.modal.title = 'Novo Album'
    if ((typeof datas) === 'object') {
      this.service.album = datas;
      this.service.modal.title = 'Atualizar Album'
    }
    this.service.modal.open = true;
  }

  deleteAlbum(id: number | string) {
    this.service.deleteAlbums(id).subscribe(() => {
      this.deleteItem(Number(id));
      this._serviceSnackBar.message('success', Constants.MSG_SUCCESS)
    });
  }

  deleteItem(id: number) {
    for (const key in this.datas.data) {
      if (this.datas.data[key]['id'] === id) {
        this.datas.data.splice(Number(key), 1);
        this.observableConnect();
        break;
      }
    }
  }

  updateCard(item: MainModel) {
    for (const key in this.datas.data) {
      if (this.datas.data[key]['id'] === item.id) {
        this.datas.data[key] = item;
        this.observableConnect();
        break;
      }
    }
  }

  observableConnect() {
    this.observableData = this.datas.connect();
    this.datas.paginator = this.paginator;
  }
}
