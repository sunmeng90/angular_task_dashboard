import { Component, OnInit } from '@angular/core';
import { Task } from '../model/task';
import { TasksService } from '../service/tasks.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  tasks: Task[];

  constructor(private tasksService: TasksService) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.tasksService.getTasks()
      .subscribe(tasks => this.tasks = tasks.slice(0, 6));
  }

}
