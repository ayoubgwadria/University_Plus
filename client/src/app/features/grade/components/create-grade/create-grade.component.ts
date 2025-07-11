import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GradeService } from '../../services/grade.service';

@Component({
  selector: 'app-create-grade',
  standalone: false,
  templateUrl: './create-grade.component.html',
  styleUrl: './create-grade.component.css'
})
export class CreateGradeComponent {
  gradeForm: FormGroup;
  gradeTypes = ['EXAM', 'PROJECT', 'ASSIGNMENT'];
  successMessage = '';
  errorMessage = '';
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private gradeService: GradeService
  ) {
    this.gradeForm = this.fb.group({
      type: ['', Validators.required],
      value: [0, [Validators.required, Validators.min(0)]],
      outOf: [0, [Validators.required, Validators.min(0)]],
      date: ['', Validators.required],
      studentId: [null, [Validators.required, Validators.min(1)]],
      courseId: [null, [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.gradeForm.invalid || this.isSubmitting) return;

    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.gradeService.createGrade(this.gradeForm.value).subscribe({
      next: () => {
        this.successMessage = `Note créée avec succès !`;
        this.errorMessage = '';
        this.gradeForm.reset();
        this.isSubmitting = false;
      },
      error: () => {
        this.errorMessage = 'Erreur lors de la création de la note.';
        this.successMessage = '';
        this.isSubmitting = false;
      }
    });
  }

  onReset(): void {
    this.gradeForm.reset();
    this.successMessage = '';
    this.errorMessage = '';
  }

  getFormProgress(): number {
    let progress = 0;
    if (this.gradeForm.get('type')?.value) progress += 17;
    if (this.gradeForm.get('value')?.value) progress += 17;
    if (this.gradeForm.get('outOf')?.value) progress += 17;
    if (this.gradeForm.get('date')?.value) progress += 17;
    if (this.gradeForm.get('studentId')?.value) progress += 16;
    if (this.gradeForm.get('courseId')?.value) progress += 16;
    return progress;
  }
}
