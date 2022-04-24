import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { TodoDataService } from 'src/app/data/todo-data.service';
import { TodoDto } from 'src/app/interfaces/todo-dto.interface';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  todos$: Observable<TodoDto[]> = this.service.entities$
  loading$: Observable<Boolean> = this.service.loading$
  loaded$: Observable<Boolean> = this.service.loaded$

  constructor(private service: TodoDataService, public dialog: MatDialog) {
    this.service.getAll()
  }

  complete(todo: TodoDto) {
    if (todo.completed) return;
    let edited: TodoDto = { ...todo };
    edited.completed = true;
    this.service.update(edited);
  }

  delete(todo: TodoDto) {
    this.service.delete(todo.id);
  }

  openDialog(): void {
    let dialogConfig: MatDialogConfig = {
      disableClose: true
    };

    this.dialog.open(DialogComponent, dialogConfig);
  }
}
