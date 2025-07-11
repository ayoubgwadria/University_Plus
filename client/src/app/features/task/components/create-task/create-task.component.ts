import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-task',
  standalone: false,
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent {
  taskForm: FormGroup;
  successMessage = '';
  errorMessage = '';
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      dueDate: ['', Validators.required],
      courseId: [null, Validators.required],
      createdById: [null, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.taskForm.invalid || this.isSubmitting) return;

    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.taskService.createTask(this.taskForm.value).subscribe({
      next: (task) => {
        this.successMessage = `Task "${task.title}" created successfully.`;
        this.errorMessage = '';
        this.taskForm.reset();
        this.isSubmitting = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to create task.';
        this.successMessage = '';
        this.isSubmitting = false;
        console.error(err);
      }
    });
  }

  onReset(): void {
    this.taskForm.reset();
    this.successMessage = '';
    this.errorMessage = '';
  }

  getFormProgress(): number {
    let progress = 0;
    if (this.taskForm.get('title')?.value) progress += 20;
    if (this.taskForm.get('description')?.value) progress += 20;
    if (this.taskForm.get('dueDate')?.value) progress += 20;
    if (this.taskForm.get('courseId')?.value) progress += 20;
    if (this.taskForm.get('createdById')?.value) progress += 20;
    return progress;
  }
}

