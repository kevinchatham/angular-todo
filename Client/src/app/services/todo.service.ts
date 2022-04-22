import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Todo } from 'src/interfaces/Todo';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable()
export class TodoService {
    constructor(private http: HttpClient) { }

    get(): Observable<Todo[]> {
        return this.http.get<Todo[]>("http://localhost:7071/api/GetTodo")
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }

    create(todo: Todo): Observable<Todo> {
        return this.http.post<Todo>('http://localhost:7071/api/CreateTodo', todo)
            .pipe(
                retry(3),
                catchError(this.handleError)
            );
    }

    delete(id: String): Observable<void> {
        return this.http.delete<void>(`http://localhost:7071/api/DeleteTodo?Id=${id}`)
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