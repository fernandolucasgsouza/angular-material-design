import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

import { BaseService } from 'src/app/core/services/base-service/base.service';
import { TodosModel } from 'src/app/core/Models/business';
import { SnackBarService } from 'src/app/core/services/messages/snack-bar.service';
import { Constants } from 'src/app/core/providers/constants';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  cardTodo: Subject<TodosModel> = new Subject<TodosModel>();
  get cardTodo$() {
    return this.cardTodo.asObservable();
  }

  todos: TodosModel = new TodosModel();
  modal = {
    title: 'Novo Todo',
    description: '',
    footer: '',
    open: false
  }

  constructor(
    private _base: BaseService,
    private _serviceSnackBar: SnackBarService
  ) { }

  onCloseModal() {
    this.modal.open = false;
  }

  public getTodos() {
    return this._base.get('todos');
  }

  public createTodo(datas: object) {
    return this._base.post('todos', datas).subscribe((res: TodosModel) => {
      this._serviceSnackBar.message('success', Constants.MSG_SUCCESS);
      console.warn(Constants.MSG_SUCCESS, res);
      this.onCloseModal();
    });
  }

  public updateTodos(id: number | string, datas: TodosModel) {
    return this._base.put('todos', id, datas).subscribe((res: TodosModel) => {
      this._serviceSnackBar.message('success', Constants.MSG_SUCCESS);
      console.warn(Constants.MSG_SUCCESS, res);
      this.cardTodo.next(datas);
      this.onCloseModal();
    });
  }

  public deleteTodos(id: number | string) {
    return this._base.delete('todos', id);
  }

}
