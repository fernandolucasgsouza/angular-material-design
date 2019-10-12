import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material';

import { SharedModule } from 'src/app/shared/shared.module';
import { AlbumsRoutingModule } from './albums-routing.module';
import { AlbumsComponent } from './components/albums/albums.component';
import { AlbumFormComponent } from './components/album-form/album-form.component';


@NgModule({
  declarations: [AlbumsComponent, AlbumFormComponent],
  imports: [
    SharedModule,
    AlbumsRoutingModule,
    MatCardModule
  ]
})
export class AlbumsModule { }
