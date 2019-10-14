import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostsComponent, PostDetailComponent } from './components';


const routes: Routes = [
  { path: '', component: PostsComponent, },
  { path: 'detail/:id/:id_autor', component: PostDetailComponent, }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
