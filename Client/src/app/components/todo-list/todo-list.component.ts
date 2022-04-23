import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, single, Subscription } from 'rxjs';
import { TodoService } from 'src/app/services/todo.service';
import { TodoDto } from 'src/interfaces/TodoDto';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  private eventsSubscription: Subscription = new Subscription();
  @Input() todos!: Observable<TodoDto[]>;
  @Output() todoCompleted: EventEmitter<TodoDto> = new EventEmitter<TodoDto>();
  @Output() todoDeleted: EventEmitter<TodoDto> = new EventEmitter<TodoDto>();

  _todos: TodoDto[] = [];

  constructor() { }

  ngOnInit(): void {
    this.eventsSubscription = this.todos.subscribe(todos => this._todos = todos);
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }

  complete(todo: TodoDto) {
    // * cheap fix for emit event not making round trip...
    todo.completed = true;
    let index = this._todos.indexOf(todo);
    this._todos[index] = todo;
    // todo fix above

    this.todoCompleted.emit(todo)
  }

  delete(todo: TodoDto) {
    // // * cheap fix for emit event not making round trip...
    // let index = this._todos.indexOf(todo);
    // this._todos.splice(index, 1);
    // // todo fix above

    this.todoDeleted.emit(todo);
  }
}
