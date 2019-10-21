import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';

import { TodosModel } from 'src/app/core/Models/business';
import { TodosService } from '../../services/todos.service';
import { InputProvider } from 'src/app/core/providers/input';

@Component({
  selector: 'fs-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {

  subscription: Subscription;
  form: FormGroup;
  fbGroup = ({
    id: new FormControl(''),
    userId: new FormControl(''),
    title: new FormControl('', [Validators.required]),
    completed: new FormControl('')
  })

  constructor(
    private _fb: FormBuilder,
    private _service: TodosService,
  ) {
    this.form = _fb.group(this.fbGroup);
  }

  ngOnInit() {
    this.setValuesUpdate();
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe;
  }

  setValuesUpdate() {
    if (!!this._service.todos && !!this._service.todos.id) {
      this.form.setValue(this._service.todos);
      this._service.todos = new TodosModel();
    }
  }

  save() {
    const id = this.form.get('id').value;
    !!id ? this.update(id) : this.create();
  }

  create() {
    InputProvider.complex(['id'], this.form);
    this.fbGroup.userId.setValue(1);
    this.subscription = this._service.createTodo(this.form.value);
  }

  update(id: string) {
    this.subscription = this._service.updateTodos(id, this.form.value);
  }

  closeModal() {
    this._service.onCloseModal();
  }

}
