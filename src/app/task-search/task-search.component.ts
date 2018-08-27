import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Task } from '../model/task';
import { TasksService } from '../service/tasks.service';
import { debounce, distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-task-search',
  templateUrl: './task-search.component.html',
  styleUrls: ['./task-search.component.css']
})
export class TaskSearchComponent implements OnInit {

  tasks$: Observable<Task[]>;

  private searchTerms = new Subject<string>();


  constructor(private tasksService: TasksService) { }

  ngOnInit() {
    this.tasks$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.tasksService.searchTasks(term))
    );

  }

  search(term: string): void {
    this.searchTerms.next(term);
  }
}
