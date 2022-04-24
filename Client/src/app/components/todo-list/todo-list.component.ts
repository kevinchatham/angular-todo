import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoDataService } from 'src/app/data/todo-data.service';
import { TodoDto } from 'src/app/interfaces/todo-dto.interface';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  todos$: Observable<TodoDto[]> = this.service.entities$

  constructor(private service: TodoDataService) {
    this.service.getAll()
  }

  complete(todo: TodoDto) {
    let edited: TodoDto = { ...todo };
    edited.completed = true;
    this.service.update(edited);
  }

  delete(todo: TodoDto) {
    this.service.delete(todo.id);
  }
}
