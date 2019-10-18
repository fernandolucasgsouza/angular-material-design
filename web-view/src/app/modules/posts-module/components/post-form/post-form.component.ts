import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { PostModel } from 'src/app/core/Models/business';
import { PostsService } from '../../services/posts.service';
import { Constants } from 'src/app/core/providers/constants';
import { SnackBarService } from 'src/app/core/services/messages/snack-bar.service';

@Component({
  selector: 'fs-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  form: FormGroup;
  fbGroup = {
    id: [''],
    userId: [''],
    title: ['', Validators.required],
    body: ['', Validators.required],
  }

  constructor(
    private _fb: FormBuilder,
    private _service: PostsService,
    private _serviceSnackBar: SnackBarService
  ) {
    this.form = _fb.group(this.fbGroup);
  }

  ngOnInit() {
    this.setValuesUpdate();
  }

  /**
  * se existir propriedade id - updade
  * senão - create
  */
  setValuesUpdate() {
    if (this._service.postItems.hasOwnProperty('id')) {
      this.form.setValue(this._service.postItems);
      this._service.postItems = new PostModel();
    }
  }

  save() {
    const id = this.form.get('id').value;
    if (!!id) this.update(id);
    else this.create();
  }

  create() {
    const input = {
      title: this.fbGroup.title.values,
      body: this.fbGroup.body.values,
      userId: 1
    };

    this._service.createPost(input).subscribe((res: PostModel) => {
      this._serviceSnackBar.message('success', Constants.MSG_SUCCESS);
      console.warn(Constants.MSG_SUCCESS, res);
      this.closeModal();
    });
  }

  update(id) {
    this._service.updatePost(id, this.form.value).subscribe((res: PostModel) => {
      this._serviceSnackBar.message('success', Constants.MSG_SUCCESS);
      console.warn(Constants.MSG_SUCCESS, res);
      this.updateObservable();
      this.closeModal();
    });
  }

  updateObservable() {
    this._service.bodyTable.next(this.form.value);
  }

  closeModal() {
    this._service.onCloseModal();
  }
}
