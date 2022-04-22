import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { single } from 'rxjs';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from 'src/interfaces/Todo';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  maxLength = 30;
  control = new FormControl('', [
    Validators.required,
    Validators.maxLength(this.maxLength),
    characterValidator(/[a-zA-Z0-9,.:?!%]/i)
  ]);

  constructor(public dialogRef: MatDialogRef<DialogComponent>, public todoService: TodoService) { }

  ngOnInit(): void {
  }

  save(): void {
    let todo: Todo = {
      id: '',
      value: this.control.value,
      createdUtc: '',
      completedUtc: ''
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