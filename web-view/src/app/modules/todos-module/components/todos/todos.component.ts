import { Component, OnInit } from '@angular/core';

import { TodosService } from '../../services/todos.service';
import { TodosModel } from 'src/app/core/Models/business';
import { SnackBarService } from 'src/app/core/services/messages/snack-bar.service';
import { Constants } from 'src/app/core/providers/constants';

@Component({
  selector: 'fs-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  datas: Array<TodosModel> = []

  constructor(
    private service: TodosService,
    private _serviceSnackBar: SnackBarService,
  ) { }

  ngOnInit() {
    this.service.getTodos().subscribe((res: Array<TodosModel>) => this.datas = res);
  }

  updateTodos(data: TodosModel) {
    console.log(data);
    this.service.todos = data;
    this.service.modal.title = 'Atualizar Todo'
    this.service.modal.open = true;

  }

  deleteTodos(id: number | string) {
    this.service.deleteTodos(id).subscribe(() => {
      this._serviceSnackBar.message('success', Constants.MSG_SUCCESS)
    });
  }

}
