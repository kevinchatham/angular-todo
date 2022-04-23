import { Component, Input, OnInit} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TodoService } from 'src/app/services/todo.service';
import { TodoDto } from 'src/interfaces/TodoDto';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  private eventsSubscription: Subscription = new Subscription();
  @Input() events!: Observable<TodoDto[]>;

  todos: TodoDto[] = [];

  constructor(public todoService: TodoService) { }

  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe(todos => this.todos = todos);
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }
}
