import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { PostsService } from '../../services/posts.service';
import { PostModel, UserModel } from 'src/app/core/Models/business';

@Component({
  selector: 'fs-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  id: number;
  idAutor: number;
  post: PostModel;
  author: UserModel;
  subscription: Subscription;

  constructor(
    private _service: PostsService,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subscription = this._activatedRoute.params.subscribe((params: any) => {
      this.id = params['id'];
      this.idAutor = params['id_autor'];
    });
    this.resquestDatasList();
  }

  resquestDatasList() {
    this._service.getPostId(this.id).subscribe((res: PostModel) => {
      this.post = res;
      this._service.getAuthorId(this.idAutor).subscribe((res: UserModel) => {
        this.author = res;
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
