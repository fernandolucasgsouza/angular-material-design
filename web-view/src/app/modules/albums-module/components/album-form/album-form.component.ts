import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';

import { AlbumsService } from '../../services/albums.service';
import { MainModel } from 'src/app/core/Models/business';
import { InputProvider } from 'src/app/core/providers/input';

@Component({
  selector: 'fs-album-form',
  templateUrl: './album-form.component.html',
  styleUrls: ['./album-form.component.css']
})
export class AlbumFormComponent implements OnInit {

  subscription: Subscription;
  form: FormGroup;
  fbGroup = ({
    id: new FormControl(''),
    userId: new FormControl(''),
    title: new FormControl('', [Validators.required]),
  })

  constructor(
    private _fb: FormBuilder,
    private _service: AlbumsService
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

  setValuesUpdate() {
    if (!!this._service.album && !!this._service.album.id) {
      this.form.setValue(this._service.album);
      this._service.album = new MainModel();
    }
  }

  save() {
    const id = this.form.get('id').value;
    !!id ? this.update(id) : this.create();
  }

  create() {
    InputProvider.complex(['id'], this.form);
    this.fbGroup.userId.setValue(1);
    this._service.createAlbum(this.form.value);
  }

  update(id: string) {
    this._service.updateAlbums(id, this.form.value);
  }

  closeModal() {
    this._service.onCloseModal();
  }

}
