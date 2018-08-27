import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InMemoryDataService } from '../mocks/in-memory-data.service';
import { Task } from '../model/task';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root',
})
export class TasksService {

    private tasksUrl = 'api/tasks';

    constructor(private httpClient: HttpClient) {
    }

    getTasks(): Observable<Task[]> {
        return this.httpClient.get<Task[]>(this.tasksUrl)
            .pipe(catchError(this.handleError('getTasks', [])));
    }

    getTask(id: number): Observable<Task> {
        const url = `${this.tasksUrl}/${id}`;
        return this.httpClient.get<Task>(url)
            .pipe(
                tap(_ => console.log(`fetched task id=${id}`)),
                catchError(this.handleError<Task>(`getTask id=${id}`))
            );

    }

    updateTask(task: Task): Observable<any> {

        return this.httpClient.put(this.tasksUrl, task, httpOptions)
            .pipe(
                tap(_ => console.log(`updateTask id=${task.id}`)),
                catchError(this.handleError<any>('updateTask'))
            );
    }


    addTask(task: Task): Observable<Task> {
        return this.httpClient.post<Task>(this.tasksUrl, task, httpOptions)
            .pipe(
                tap((task: Task) => console.log(`addTask id=${task.id}`)),
                catchError(this.handleError<Task>('addTask'))
            );
    }

    deleteTask(task: Task | number): Observable<any> {
        const id = typeof task === 'number' ? task : task.id;
        const url = `${this.tasksUrl}/${id}`;

        return this.httpClient.delete<Task>(url, httpOptions)
            .pipe(
                tap((_) => console.log(`deleteTask id=${id}`)),
                catchError(this.handleError<Task>('deleteTask'))
            );
    }

    searchTasks(term: string): Observable<Task[]> {
        const searchUrl = `${this.tasksUrl}/?name=${term}`;
        return this.httpClient.get<Task[]>(searchUrl)
            .pipe(
                tap(_ => console.log(`found tasks matching "${term}"`)),
                catchError(this.handleError<Task[]>('searchTasks', []))
            );
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

}
