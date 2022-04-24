import { Injectable } from '@angular/core';
import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import * as TodoActions from "./todo.actions";
import { TodoDto } from '../interfaces/TodoDto';
import { TodoService } from '../services/todo.service';

export interface TodoState {
    [id: string]: TodoDto;
}

export const todoFeatureKey = 'todo';

export interface TodoRootState {
    [todoFeatureKey]: TodoState;
}

export const initialState: TodoDto[] = [];

export const todoReducer = createReducer(
    initialState,
    on(TodoActions.add, (state, { todo }) => ({
        ...state,
        todoInput: '',
        todos: state.concat(todo)
    })),
    on(TodoActions.remove, (state, { todo }) => ({
        ...state,
        todoInput: '',
        todos: state.filter(item => item !== todo)
    })),
    on(TodoActions.complete, (state, { todo }) => ({
        ...state,
        todoInput: '',
        todos: () => {
            todo.completed = true;
            state.filter(item => item !== todo).concat(todo)
        }
    })),
    on(TodoActions.loadTodosSuccess, (state, { todos }) => [...todos])
);