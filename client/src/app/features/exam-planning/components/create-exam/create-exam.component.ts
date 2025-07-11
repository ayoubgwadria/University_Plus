import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExamPlanningService } from '../../services/exam-planning.service';

@Component({
  selector: 'app-create-exam',
  standalone: false,
  templateUrl: './create-exam.component.html',
  styleUrl: './create-exam.component.css'
})
export class CreateExamComponent {
  examForm: FormGroup;
  successMessage = '';
  errorMessage = '';
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private examPlanningService: ExamPlanningService
  ) {
    this.examForm = this.fb.group({
      examDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      room: ['', [Validators.required, Validators.minLength(1)]],
      courseId: [null, [Validators.required, Validators.min(1)]],
      groupId: [null, [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.examForm.invalid || this.isSubmitting) return;

    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.examPlanningService.create(this.examForm.value).subscribe({
      next: (res) => {
        this.successMessage = `Examen planifié avec succès (ID ${res.id}) !`;
        this.errorMessage = '';
        this.examForm.reset();
        this.isSubmitting = false;
      },
      error: () => {
        this.errorMessage = 'Erreur lors de la création de la planification.';
        this.successMessage = '';
        this.isSubmitting = false;
      }
    });
  }

  onReset(): void {
    this.examForm.reset();
    this.successMessage = '';
    this.errorMessage = '';
  }

  getFormProgress(): number {
    let progress = 0;
    if (this.examForm.get('examDate')?.value) progress += 17;
    if (this.examForm.get('startTime')?.value) progress += 17;
    if (this.examForm.get('endTime')?.value) progress += 17;
    if (this.examForm.get('room')?.value) progress += 17;
    if (this.examForm.get('courseId')?.value) progress += 16;
    if (this.examForm.get('groupId')?.value) progress += 16;
    return progress;
  }
}