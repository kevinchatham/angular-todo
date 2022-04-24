import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { BehaviorSubject, single } from 'rxjs';
import { TodoDto } from 'src/app/interfaces/TodoDto';
import { DialogComponent } from './components/dialog/dialog.component';
import { TodoService } from './services/todo.service';
import { AppState } from './store/app.state';
import { loadTodos } from './store/todo.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  todosSubject: BehaviorSubject<TodoDto[]> = new BehaviorSubject<TodoDto[]>([]);
  constructor(
    private store: Store<AppState>,
    private todoService: TodoService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void { }

  openDialog(): void {
    let dialogConfig: MatDialogConfig = {
      disableClose: true
    };

    this.dialog.open(DialogComponent, dialogConfig);
  }
}
