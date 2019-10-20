import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

import { PostModel } from 'src/app/core/Models/business';
import { Constants } from 'src/app/core/providers/constants';
import { BaseService } from 'src/app/core/services/base-service/base.service';
import { SnackBarService } from 'src/app/core/services/messages/snack-bar.service';

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

  constructor(private _base: BaseService, private _serviceSnackBar: SnackBarService) { }

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
    return this._base.post('posts', datas).subscribe((res: PostModel) => {
      this._serviceSnackBar.message('success', Constants.MSG_SUCCESS);
      console.warn(Constants.MSG_SUCCESS, res);
      this.onCloseModal();
    });
  }

  public updatePost(id: number | string, datas: PostModel) {
    return this._base.put('posts', id, datas).subscribe((res: PostModel) => {
      this._serviceSnackBar.message('success', Constants.MSG_SUCCESS);
      console.warn(Constants.MSG_SUCCESS, res);
      this.bodyTable.next(datas);
      this.onCloseModal();
    });
  }

  public deletePost(id: number | string) {
    return this._base.delete('posts', id);
  }
}
