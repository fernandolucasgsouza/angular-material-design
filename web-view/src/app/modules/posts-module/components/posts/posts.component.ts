import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';


import { PostsService } from '../../services/posts.service';
import { PostModel } from 'src/app/core/Models/business/post.model';
import { Constants } from 'src/app/core/providers/constants';
import { SnackBarService } from 'src/app/core/services/messages/snack-bar.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';

@Component({
  selector: 'fs-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  headerTable: string[] = ['id', 'title', 'options'];
  bodyTable = new MatTableDataSource<PostModel>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public service: PostsService,
    private _router: Router,
    private _serviceSnackBar: SnackBarService,
    private _modal: ModalComponent
  ) { }

  ngOnInit() {
    this.requestDatasPost();
  }

  requestDatasPost() {
    this.configLabels();
    this.service.getPosts().subscribe((resp: Array<PostModel>) => this.bodyTable.data = resp);
    this.bodyTable.paginator = this.paginator;
  }

  openModal(datas: any) {

    if ((typeof datas) === 'object') {
      this.service.postItems = datas;
      this.service.modal.title = 'Atualizar Post'
    }
    this.service.modal.open = true;
  }

  deletePost(id: number | string) {
    this.service.deletePost(id).subscribe(() => {
      this._serviceSnackBar.message('success', Constants.MSG_SUCCESS);
    });
  }


  routePage(id, id_autor) {
    this._router.navigate(['/posts/detail', id, id_autor]);
  }

  configLabels() {
    this.paginator._intl.itemsPerPageLabel = 'Itens por página';
    this.paginator._intl.nextPageLabel = "Próxima";
    this.paginator._intl.previousPageLabel = "Anterior";
    this.paginator._intl.lastPageLabel = "Ultima página";
    this.paginator._intl.firstPageLabel = "Primera página";
  }
}
