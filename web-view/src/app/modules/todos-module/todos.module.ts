import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material';

import { SharedModule } from 'src/app/shared/shared.module';
import { TodosRoutingModule } from './todos-routing.module';
import { TodosComponent } from './components/todos/todos.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';


@NgModule({
  declarations: [TodosComponent, TodoFormComponent],
  imports: [
    SharedModule,
    TodosRoutingModule,
    MatCardModule
  ]
})
export class TodosModule { }
