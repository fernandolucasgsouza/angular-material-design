import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';

import { PostsService } from '../../services/posts.service';
import { Constants } from 'src/app/core/providers/constants';
import { Translaters } from 'src/app/core/providers/translaters';
import { PostModel } from 'src/app/core/Models/business/post.model';
import { SnackBarService } from 'src/app/core/services/messages/snack-bar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'fs-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  headerTable: string[] = ['id', 'title', 'options'];
  bodyTable = new MatTableDataSource<PostModel>();
  subscription: Subscription

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public service: PostsService,
    private _router: Router,
    private _serviceSnackBar: SnackBarService,
  ) {
    this.subscription = this.service.bodyTable$.subscribe(item => this.updateTable(item));
  }

  ngOnInit() {
    this.requestDatasPost();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  requestDatasPost() {
    Translaters.paginatorPTBR(this.paginator);
    this.service.getPosts().subscribe((res: Array<PostModel>) => this.bodyTable.data = res);
    this.loadPaginator();
  }

  openModal(datas: any) {
    this.service.modal.title = 'Novo Post'
    if ((typeof datas) === 'object') {
      this.service.postItems = datas;
      this.service.modal.title = 'Atualizar Post'
    }
    this.service.modal.open = true;
  }

  deletePost(id: number | string) {
    this.service.deletePost(id).subscribe(() => {
      this.deleteRow(Number(id));
      this._serviceSnackBar.message('success', Constants.MSG_SUCCESS);
    });

  }

  deleteRow(id: number) {
    for (const key in this.bodyTable.data) {
      if (this.bodyTable.data[key].id === id) {
        this.bodyTable.data.splice(Number(key), 1)
        this.loadPaginator();
      }
    }
  }

  updateTable(item: PostModel) {
    for (const key in this.bodyTable.data) {
      if (this.bodyTable.data[key].id === item.id) {
        this.bodyTable.data[key] = item;
        this.loadPaginator();
        break;
      }
    }
  }

  loadPaginator() {
    this.bodyTable.paginator = this.paginator;
  }

  routePage(id, id_autor) {
    this._router.navigate(['/posts/detail', id, id_autor]);
  }

}
