// task-form.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TaskService, Task } from '../../services/task';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="taskForm" (ngSubmit)="onSubmit()" class="mb-4 p-3 border rounded bg-light">
      <div class="mb-3">
        <label class="form-label">Título de la Tarea</label>
        <input formControlName="title" class="form-control" [class.is-invalid]="taskForm.get('title')?.invalid && taskForm.get('title')?.touched">
        <div class="invalid-feedback">Mínimo 10 caracteres obligatorios.</div>
      </div>
      <button type="submit" [disabled]="taskForm.invalid" class="btn btn-primary w-100">Crear Tarea</button>
    </form>
  `
})
export class TaskFormComponent {
  taskForm: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      description: [''],
      priority: [1],
      status: ['PENDING']
    });
  }

  onSubmit() {
    this.taskService.createTask(this.taskForm.value).subscribe(() => {
      this.taskForm.reset({priority: 1, status: 'PENDING'});
      location.reload(); // Recarga simple para el examen
    });
  }
}
