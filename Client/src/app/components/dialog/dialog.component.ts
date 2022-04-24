import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TodoDto } from 'src/app/interfaces/TodoDto';
import { characterValidator } from 'src/app/validators/character.validator';
import { FormControl, Validators } from '@angular/forms';
import { TodoDataService } from 'src/app/data/todo-data.service';

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
    private service: TodoDataService) { }

  save(): void {
    const todo: TodoDto = {
      id: '',
      value: this.control.value,
      completed: false
    };

    this.service.add(todo);

    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}