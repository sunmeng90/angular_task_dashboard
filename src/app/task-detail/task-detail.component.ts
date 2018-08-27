import { TasksService } from './../service/tasks.service';
import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../model/task';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {

  task: Task;

  constructor(private route: ActivatedRoute, private tasksService: TasksService,
    private location: Location) { }

  ngOnInit() {
    this.getTask();
  }

  getTask(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.tasksService.getTask(id).subscribe(task => this.task = task);
  }

  save(): void {
    this.tasksService.updateTask(this.task)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
