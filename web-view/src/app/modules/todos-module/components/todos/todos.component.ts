import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';

import { TodosModel } from 'src/app/core/Models/business';
import { TodosService } from '../../services/todos.service';
import { Constants } from 'src/app/core/providers/constants';
import { Translaters } from 'src/app/core/providers/translaters';
import { SnackBarService } from 'src/app/core/services/messages/snack-bar.service';

@Component({
  selector: 'fs-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  datas = new MatTableDataSource<TodosModel>();
  observableData: Observable<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private service: TodosService,
    private _serviceSnackBar: SnackBarService,
  ) {
    this.service.cardTodo$.subscribe(item => this.updateCard(item));
  }

  ngOnInit() {
    Translaters.paginatorPTBR(this.paginator);
    this.requestTodos();
  }

  requestTodos() {
    this.service.getTodos().subscribe((res: any) => {
      this.datas.data = res;
      this.observableConnect();
    });
  }

  openModal(datas: any) {
    this.service.modal.title = 'Novo Todo'
    if ((typeof datas) === 'object') {
      this.service.todos = datas;
      this.service.modal.title = 'Atualizar Todo'
    }
    this.service.modal.open = true;
  }

  deleteTodos(id: number | string) {
    this.service.deleteTodos(id).subscribe(() => {
      this.deleteItem(Number(id))
      this._serviceSnackBar.message('success', Constants.MSG_SUCCESS)
    });
  }

  deleteItem(id: number) {
    for (const key in this.datas.data) {
      if (this.datas.data[key]['id'] === id) {
        this.datas.data.splice(Number(key), 1);
        this.observableConnect();
        break;
      }
    }
  }

  updateCard(item: TodosModel) {
    for (const key in this.datas.data) {
      if (this.datas.data[key]['id'] === item.id) {
        this.datas.data[key] = item;
        this.observableConnect();
        break;
      }
    }
  }

  observableConnect() {
    this.observableData = this.datas.connect();
    this.datas.paginator = this.paginator;
  }
}
