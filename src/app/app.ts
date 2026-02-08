import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list'; // El nombre de la clase es TaskListComponent [cite: 39, 52]
import { TaskFormComponent } from './components/task-form/task-form'; // El nombre de la clase es TaskFormComponent [cite: 39, 44]

@Component({
  selector: 'app-root',
  standalone: true, // Asegúrate de que sea standalone si no usas módulos [cite: 43, 49]
  imports: [RouterOutlet, TaskListComponent, TaskFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Miniproyecto');
}
