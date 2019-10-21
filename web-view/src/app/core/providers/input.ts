import { FormGroup } from '@angular/forms';

export class InputProvider {

  /**
   *
   * @param inputs passar array de items que deseja remover do model @exemple ['id', 'idUser']
   * @param formGroup  model form:FormGroup
   */
  public static complex(inputs: string[], formGroup: FormGroup) {
    for (const input of inputs) {
      Object.keys(formGroup.controls).forEach(controlName => {
        let control = formGroup.get(controlName);
        if (input === controlName) {
          delete formGroup.controls[controlName];
        }
        else if (control instanceof FormGroup) {
          this.complex(inputs, control);
        }
      })
    }
  }
}