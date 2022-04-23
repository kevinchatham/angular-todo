import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TodoDto } from 'src/interfaces/TodoDto';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable()
export class TodoService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<TodoDto[]> {
        return this.http.get<TodoDto[]>("http://localhost/api/GetTodo")
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }

    create(todo: TodoDto): Observable<TodoDto> {
        return this.http.post<TodoDto>('http://localhost/api/CreateTodo', todo)
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }

    delete(id: String): Observable<void> {
        return this.http.delete<void>(`http://localhost/api/DeleteTodo?Id=${id}`)
    }

    complete(id: String): Observable<TodoDto> {
        return this.http.get<TodoDto>(`http://localhost/api/CompleteTodo?Id=${id}`)
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            console.error('An error occurred:', error.error);
        } else {
            console.error(
                `Backend returned code ${error.status}, body was: `, error.error);
        }
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }
}