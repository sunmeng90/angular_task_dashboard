import { Observable } from 'rxjs';
import { TasksService } from '../service/tasks.service';
import { Component, OnInit } from '@angular/core';
import { Task } from '../model/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Task[];

  // dataSource: TaskDataSource;

  displayColumns = ['id', 'name', 'description'];

  constructor(private tasksService: TasksService) {
  }

  ngOnInit() {
    this.getTasks();
  }

  getTasks(): void {
    this.tasksService.getTasks()
      .subscribe(tasks => this.tasks = tasks);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.tasksService.addTask({ name } as Task)
      .subscribe(
        task => this.tasks.push(task)
      );
  }

  delete(task: Task): void {
    this.tasks = this.tasks.filter(t => t !== task);
    this.tasksService.deleteTask(task)
      .subscribe();
  }

  search(name: string): void {
    this.tasksService.searchTasks(name).subscribe(tasks => this.tasks = tasks);
  }
}
