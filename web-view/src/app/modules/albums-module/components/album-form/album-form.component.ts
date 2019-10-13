import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { AlbumsService } from '../../services/albums.service';
import { SnackBarService } from 'src/app/core/services/messages/snack-bar.service';
import { MainModel } from 'src/app/core/Models/business';
import { Constants } from 'src/app/core/providers/constants';

@Component({
  selector: 'fs-album-form',
  templateUrl: './album-form.component.html',
  styleUrls: ['./album-form.component.css']
})
export class AlbumFormComponent implements OnInit {

  form: FormGroup;
  fbGroup = {
    id: [''],
    userId: [''],
    title: ['', Validators.required],
  }

  constructor(
    private _fb: FormBuilder,
    private _service: AlbumsService,
    private _serviceSnackBar: SnackBarService
  ) {
    this.form = _fb.group(this.fbGroup);
  }

  ngOnInit() {
    this.setValuesUpdate();
  }

  setValuesUpdate() {
    if (this._service.album.hasOwnProperty('id')) {
      this.form.setValue(this._service.album);
      this._service.album = new MainModel();
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
      userId: 1
    };

    this._service.createAlbum(input).subscribe((res: MainModel) => {
      this._serviceSnackBar.message('success', Constants.MSG_SUCCESS);
      console.warn(Constants.MSG_SUCCESS, res);
      setTimeout(() => this.closeModal(), 3000);
    });
  }

  update(id) {
    this._service.updateAlbums(id, this.form.value).subscribe((res: MainModel) => {
      this._serviceSnackBar.message('success', Constants.MSG_SUCCESS);
      console.warn(Constants.MSG_SUCCESS, res);
      this.updateObservable();
      setTimeout(() => this.closeModal(), 3000);
    });
  }

  updateObservable() {
    this._service.cardAlbum.next(this.form.value);
  }

  closeModal() {
    this._service.onCloseModal();
  }

}
