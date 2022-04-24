import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoDto } from '../interfaces/TodoDto';
import { todoFeatureKey, TodoRootState, TodoState } from './todo.reducer';

const selectTodoFeature = createFeatureSelector<TodoState>(todoFeatureKey);

export const selectTodos = createSelector(
    selectTodoFeature,
    state => Object.keys(state)
        .map(key => state[key])
        .sort((a, b) => sortFn(a.completed, b.completed) || sortFn(a.value, b.value))
);

export const selectTodo = (todo: TodoDto) => createSelector(
    selectTodoFeature,
    (state) => state[todo.id]
);

const sortFn = (a: any, b: any): number => {
    return a === b ? 0 : a < b ? -1 : 1;
}