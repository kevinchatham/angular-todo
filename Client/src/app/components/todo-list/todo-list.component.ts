import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, single, Subscription } from 'rxjs';
import { TodoDto } from 'src/app/interfaces/TodoDto';
import { AppState } from 'src/app/store/app.state';
import { loadTodos } from 'src/app/store/todo.actions';
import { selectTodos } from 'src/app/store/todo.selectors';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {

  todos$: Observable<TodoDto[]> = this.store.select(selectTodos);

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(loadTodos())
  }

  ngOnDestroy() { }

  complete(todo: TodoDto) { }

  delete(todo: TodoDto) { }
}
