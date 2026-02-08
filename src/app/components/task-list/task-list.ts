// task-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService, Task } from '../../services/task';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="row">
      <div *ngFor="let task of tasks" class="col-md-4 mb-3">
        <div class="card h-100 task-card" [ngClass]="{'high-priority': task.priority > 5}">
          <div class="card-body">
            <h5 class="card-title">{{ task.title }}</h5>
            <span class="badge mb-2"
                  [ngStyle]="{'background-color': task.status === 'COMPLETED' ? '#28a745' : '#ffc107'}">
              {{ task.status }}
            </span>
            <div class="d-flex gap-2">
              <button (click)="nextStatus(task)" class="btn btn-outline-secondary btn-sm">Cambiar Estado</button>
              <button (click)="delete(task.id!)" class="btn btn-outline-danger btn-sm">🗑️</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  constructor(private taskService: TaskService) {}

  ngOnInit() { this.loadTasks(); }

  loadTasks() { this.taskService.getTasks().subscribe(data => this.tasks = data); }

  nextStatus(task: Task) {
    const states: ('PENDING' | 'IN_PROGRESS' | 'COMPLETED')[] = ['PENDING', 'IN_PROGRESS', 'COMPLETED'];
    let currentIndex = states.indexOf(task.status);
    task.status = states[(currentIndex + 1) % states.length];

    this.taskService.updateTask(task.id!, task).subscribe();
  }

  delete(id: number) {
    this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
  }
}
