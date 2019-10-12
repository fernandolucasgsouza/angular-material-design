import { Injectable } from '@angular/core';

import { BaseService } from 'src/app/core/services/base-service/base.service';
import { TodosModel } from 'src/app/core/Models/business';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  todos: TodosModel = new TodosModel();
  modal = {
    title: 'Novo Todo',
    description: '',
    footer: '',
    open: false
  }

  constructor(private _base: BaseService) { }

  onCloseModal() {
    this.modal.open = false;
  }

  public getTodos() {
    return this._base.get('todos');
  }

  public deleteTodos(id: number | string) {
    return this._base.delete('todos', id);
  }

  public updateTodos(id: number | string, datas: object) {
    return this._base.put('todos', id, datas);
  }

}
