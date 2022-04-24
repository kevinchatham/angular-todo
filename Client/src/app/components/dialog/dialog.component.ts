import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TodoDto } from 'src/app/interfaces/TodoDto';
import { Store } from '@ngrx/store';
import { add } from 'src/app/store/todo.actions';
import { AppState } from 'src/app/store/app.state';
import { characterValidator } from 'src/app/validators/character.validator';
import { FormControl, Validators } from '@angular/forms';

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

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private store: Store<AppState>) { }

  save(): void {
    const todo: TodoDto = {
      id: '',
      createdIso: '',
      completedIso: '',
      value: this.control.value,
      completed: false
    };

    this.store.dispatch(add({ todo: todo }));
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}