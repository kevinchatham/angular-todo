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
    let sorted = todos.sort((a, b) => {
      return this.sortFn(a.completed, b.completed) || this.sortFn(a.value, b.value)
    });

    this.todosSubject.next(sorted);
  }

  private sortFn(a: any, b: any): number {
    return a === b ? 0 : a < b ? -1 : 1;
  }

  todoCompleted(todo: TodoDto) {
    this.todoService.complete(todo.id)
      .pipe(single())
      .subscribe(todo => {
        let current = this.todosSubject.getValue();
        let index = current.indexOf(todo);
        current[index] = todo;
        this.emitTodos(current);
      });
  }

  todoDeleted(todo: TodoDto) {
    this.todoService.delete(todo.id)
      .pipe(single())
      .subscribe(empty => {
        let current = this.todosSubject.getValue();
        let index = current.indexOf(todo);
        current.splice(index, 1);
        this.emitTodos(current);
      });
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
