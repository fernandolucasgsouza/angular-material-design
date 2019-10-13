import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/core/services/base-service/base.service';
import { async } from 'q';
import { PostModel } from 'src/app/core/Models/business';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  bodyTable: Subject<PostModel> = new Subject<PostModel>();
  get bodyTable$() {
    return this.bodyTable.asObservable();
  }

  postItems: PostModel = new PostModel();
  modal = {
    title: 'Novo Post',
    description: '',
    footer: '',
    open: false
  }

  constructor(private _base: BaseService) { }

  onCloseModal() {
    this.modal.open = false;
  }

  public getPosts() {
    return this._base.get('posts');
  }

  public getPostId(id: number | string) {
    return this._base.getById('posts', id);
  }

  public getAuthorId(id: number | string) {
    return this._base.getById('users', id);
  }

  public createPost(datas: object) {
    return this._base.post('posts', datas);
  }

  public updatePost(id: number | string, datas: object) {
    return this._base.put('posts', id, datas);
  }

  public deletePost(id: number | string) {
    return this._base.delete('posts', id);
  }
}
