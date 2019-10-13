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

  constructor(
    private _service: PostsService,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = +this._activatedRoute.snapshot.paramMap.get('id');
    this.idAutor = +this._activatedRoute.snapshot.paramMap.get('id_autor');
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

}
