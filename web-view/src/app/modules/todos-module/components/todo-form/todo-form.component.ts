import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { TodosModel } from 'src/app/core/Models/business';
import { TodosService } from '../../services/todos.service';
import { Constants } from 'src/app/core/providers/constants';
import { SnackBarService } from 'src/app/core/services/messages/snack-bar.service';

@Component({
  selector: 'fs-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {

  form: FormGroup;
  fbGroup = {
    id: [''],
    userId: [''],
    title: ['', Validators.required],
    completed: ['']
  }

  constructor(
    private _fb: FormBuilder,
    private _service: TodosService,
    private _serviceSnackBar: SnackBarService
  ) {
    this.form = _fb.group(this.fbGroup);
  }

  ngOnInit() {
    this.setValuesUpdte();
  }

  setValuesUpdte() {
    if (this._service.todos.hasOwnProperty('id')) {
      this.form.setValue(this._service.todos);
      this._service.todos = new TodosModel();
    }
  }

  save() {
    const id = this.form.get('id').value;
    if (!!id) this.update(id);
    else this.create();
  }

  create() {
    const input = {
      title: this.fbGroup.title.values,
      userId: 1
    };

    this._service.createTodo(input).subscribe((res: TodosModel) => {
      this._serviceSnackBar.message('success', Constants.MSG_SUCCESS);
      console.warn(Constants.MSG_SUCCESS, res);
      setTimeout(() => this.closeModal(), 3000);
    });
  }

  update(id) {
    this._service.updateTodos(id, this.form.value).subscribe((res: TodosModel) => {
      this._serviceSnackBar.message('success', Constants.MSG_SUCCESS);
      console.warn(Constants.MSG_SUCCESS, res);
      this.updateObservable();
      setTimeout(() => this.closeModal(), 3000);
    });
  }

  updateObservable() {
    this._service.cardTodo.next(this.form.value);
  }
  closeModal() {
    this._service.onCloseModal();
  }

}
