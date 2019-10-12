import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TodosService } from '../../services/todos.service';
import { SnackBarService } from 'src/app/core/services/messages/snack-bar.service';
import { TodosModel } from 'src/app/core/Models/business';
import { Constants } from 'src/app/core/providers/constants';

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
    this.form.setValue(this._service.todos)
  }

  save() {
    const id = this.form.get('id').value;
    this._service.updateTodos(id, this.form.value).subscribe((res: TodosModel) => {
      this._serviceSnackBar.message('success', Constants.MSG_SUCCESS);
      console.warn(Constants.MSG_SUCCESS, res);
      setTimeout(() => this.closeModal(), 5000);
    });

  }

  closeModal() {
    this._service.onCloseModal();
  }

}
