import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseMaterialService } from '../../services/course-material.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-course-material',
  standalone: false,
  templateUrl: './create-course-material.component.html',
  styleUrl: './create-course-material.component.css'
})
export class CreateCourseMaterialComponent {
  materialForm: FormGroup;
  successMessage = '';
  errorMessage = '';
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private courseMaterialService: CourseMaterialService,
    private router: Router
  ) {
    this.materialForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      fileUrl: ['', Validators.required],
      courseId: [null, Validators.required],
      uploadedById: [null, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.materialForm.invalid || this.isSubmitting) return;

    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.courseMaterialService.create(this.materialForm.value).subscribe({
      next: (material) => {
        this.successMessage = `Support "${material.title}" créé avec succès.`;
        this.errorMessage = '';
        this.materialForm.reset();
        this.isSubmitting = false;
        setTimeout(() => this.router.navigate(['/course-materials']), 1200);
      },
      error: () => {
        this.errorMessage = 'Erreur lors de la création du support.';
        this.successMessage = '';
        this.isSubmitting = false;
      }
    });
  }

  onReset(): void {
    this.materialForm.reset();
    this.successMessage = '';
    this.errorMessage = '';
  }

  getFormProgress(): number {
    let progress = 0;
    if (this.materialForm.get('title')?.value) progress += 25;
    if (this.materialForm.get('fileUrl')?.value) progress += 25;
    if (this.materialForm.get('courseId')?.value) progress += 25;
    if (this.materialForm.get('uploadedById')?.value) progress += 25;
    return progress;
  }
}