import { NgModule } from '@angular/core';

import { PostDetailComponent } from './components';
import { SharedModule } from 'src/app/shared/shared.module';
import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './components/posts/posts.component';
import { PostFormComponent } from './components/post-form/post-form.component';

@NgModule({
  declarations: [PostsComponent, PostDetailComponent, PostFormComponent],
  imports: [
    SharedModule,
    PostsRoutingModule,
  ]
})
export class PostsModule { }
