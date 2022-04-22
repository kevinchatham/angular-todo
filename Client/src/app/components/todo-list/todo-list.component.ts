import { Component, OnInit } from '@angular/core';
import { single } from 'rxjs';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from 'src/interfaces/Todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  constructor(public todoService: TodoService) { }

  todos: Todo[] = [];

  ngOnInit(): void {
    this.todoService.get()
      .pipe(single())
      .subscribe(todos => this.todos = [...todos]);
  }
}
