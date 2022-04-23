import { Component } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { single } from 'rxjs';
import { TodoService } from 'src/app/services/todo.service';
import { TodoDto } from 'src/interfaces/TodoDto';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  maxLength = 30;

  control: FormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(this.maxLength),
    characterValidator(/[a-zA-Z0-9,.:?!%]/i)
  ]);

  constructor(public dialogRef: MatDialogRef<DialogComponent>, public todoService: TodoService) { }

  save(): void {
    let todo: TodoDto = {
      id: '',
      createdIso: '',
      completedIso: '',
      value: this.control.value,
      completed: false
    };

    this.todoService
      .create(todo)
      .pipe(single())
      .subscribe(todo => {
        this.dialogRef.close(todo);
      });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}

export function characterValidator(expression: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    const allowed = expression.test(control.value);
    return allowed ? null : { invalidCharacters: { value: control.value } };
  };
}