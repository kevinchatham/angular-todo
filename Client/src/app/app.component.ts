import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, single } from 'rxjs';
import { TodoDto } from 'src/interfaces/TodoDto';
import { DialogComponent } from './components/dialog/dialog.component';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  todosSubject: BehaviorSubject<TodoDto[]> = new BehaviorSubject<TodoDto[]>([]);

  constructor(public todoService: TodoService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.todoService.getAll()
      .pipe(single())
      .subscribe(todos => this.emitTodos(todos));
  }

  emitTodos(todos: TodoDto[]) {
    this.todosSubject.next(todos);
  }

  openDialog(): void {
    let dialogConfig: MatDialogConfig = {
      disableClose: true
    };

    let dialogRef: MatDialogRef<DialogComponent, TodoDto> = this.dialog.open(DialogComponent, dialogConfig);

    dialogRef.afterClosed()
      .subscribe(todo => {
        if (todo === undefined) return;
        let current = this.todosSubject.getValue()
        current.push(todo);
        this.emitTodos(current);
      });
  }
}
