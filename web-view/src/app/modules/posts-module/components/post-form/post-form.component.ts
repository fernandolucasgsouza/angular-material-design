import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';

import { PostModel } from 'src/app/core/Models/business';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'fs-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  subscription: Subscription;
  form: FormGroup;
  fbGroup = ({
    id: new FormControl(''),
    userId: new FormControl(''),
    title: new FormControl('', [Validators.required]),
    body: new FormControl('', [Validators.required])
  })

  constructor(
    private _fb: FormBuilder,
    private _service: PostsService,
  ) {
    this.form = _fb.group(this.fbGroup);
  }

  ngOnInit() {
    this.setValuesUpdate();
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe;
  }

  /**
  * se existir propriedade id - updade
  * senão - create
  */
  setValuesUpdate() {
    if (!!this._service.postItems && !!this._service.postItems.id) {
      this.form.setValue(this._service.postItems);
      this._service.postItems = new PostModel();
    }
  }

  save() {
    const id = this.form.get('id').value;
    !!id ? this.update(id) : this.create();
  }

  create() {
    this.fbGroup.id.setValue(null);
    this.fbGroup.userId.setValue(1);
    this.subscription = this._service.createPost(this.form.value);
  }

  update(id: string) {
    this.subscription = this._service.updatePost(id, this.form.value);
  }

  closeModal() {
    this._service.onCloseModal();
  }

}
