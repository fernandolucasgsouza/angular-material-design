import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/dashboard-module/dashboard.module').then(m => m.DashboardModule) },
  { path: 'posts', loadChildren: () => import('./modules/posts-module/posts.module').then(m => m.PostsModule) },
  { path: 'albums', loadChildren: () => import('./modules/albums-module/albums.module').then(m => m.AlbumsModule) },
  { path: 'todos', loadChildren: () => import('./modules/todos-module/todos.module').then(m => m.TodosModule) },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
