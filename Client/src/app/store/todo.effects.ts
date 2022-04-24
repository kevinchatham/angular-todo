import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TodoService } from '../services/todo.service';
import { Injectable } from '@angular/core';
import { loadTodos, loadTodosError, loadTodosSuccess } from './todo.actions';
import { switchMap, map, catchError, of } from 'rxjs';

@Injectable()
export class TodoEffects {
    constructor(
        private actions$: Actions,
        private todoService: TodoService
    ) { }

    loadTodos$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadTodos),
            switchMap(() => this.todoService.getAll().pipe(
                map(todos => loadTodosSuccess({ todos })),
                catchError(() => of(loadTodosError()))
            ))
        )
    );
}