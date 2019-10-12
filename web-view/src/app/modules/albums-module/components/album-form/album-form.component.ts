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
    this.form.setValue(this._service.album)
  }

  save() {
    const id = this.form.get('id').value;
    this._service.updateAlbums(id, this.form.value).subscribe((res: MainModel) => {
      this._serviceSnackBar.message('success', Constants.MSG_SUCCESS);
      console.warn(Constants.MSG_SUCCESS, res);
      setTimeout(() => this.closeModal(), 5000);
    });

  }

  closeModal() {
    this._service.onCloseModal();
  }

}
