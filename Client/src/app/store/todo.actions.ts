import { createAction, props } from '@ngrx/store';
import { TodoDto } from '../interfaces/TodoDto';

export const add = createAction('[Todo] Add', props<{ todo: TodoDto }>());
export const remove = createAction('[Todo] Remove', props<{ todo: TodoDto }>());
export const complete = createAction('[Todo] Complete', props<{ todo: TodoDto }>());

export const loadTodos = createAction('[Todo] Load');
export const loadTodosSuccess = createAction('[Todo] Load Success', props<{ todos: TodoDto[] }>());
export const loadTodosError = createAction('[Todo] Load Error');