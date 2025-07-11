import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../../services/course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-course',
  standalone: false,
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.css'
})
export class CreateCourseComponent {
  courseForm: FormGroup;
  successMessage = '';
  errorMessage = '';
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    private router: Router
  ) {
    this.courseForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      code: ['', [Validators.required, Validators.minLength(2)]],
      teacherId: [null],
      groupId: [null]
    });
  }

  onSubmit(): void {
    if (this.courseForm.invalid || this.isSubmitting) return;

    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.courseService.createCourse(this.courseForm.value).subscribe({
      next: (response) => {
        this.successMessage = `Cours "${response.name}" créé avec succès.`;
        this.errorMessage = '';
        this.courseForm.reset();
        this.isSubmitting = false;
        setTimeout(() => this.router.navigate(['/courses']), 1200);
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors de la création du cours.';
        this.successMessage = '';
        this.isSubmitting = false;
      },
    });
  }

  onReset(): void {
    this.courseForm.reset();
    this.successMessage = '';
    this.errorMessage = '';
  }

  getFormProgress(): number {
    let progress = 0;
    if (this.courseForm.get('name')?.value) progress += 40;
    if (this.courseForm.get('code')?.value) progress += 40;
    if (this.courseForm.get('teacherId')?.value) progress += 10;
    if (this.courseForm.get('groupId')?.value) progress += 10;
    return progress;
  }
}
