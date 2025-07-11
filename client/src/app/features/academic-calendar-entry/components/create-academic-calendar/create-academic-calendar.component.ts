import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AcademicCalendarService } from '../../services/academic-calendar.service';
import { AcademicCalendarRequestDTO } from '../../DTO/AcademicCalendarRequestDTO';

@Component({
  selector: 'app-create-academic-calendar',
  standalone: false,
  templateUrl: './create-academic-calendar.component.html',
  styleUrl: './create-academic-calendar.component.css'
})
export class CreateAcademicCalendarComponent {
  calendarForm: FormGroup;
  submitting = false;
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  constructor(
    private fb: FormBuilder,
    private calendarService: AcademicCalendarService
  ) {
    this.calendarForm = this.fb.group({
      title: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description: ['']
    });
  }

  onSubmit(): void {
    if (this.calendarForm.invalid) return;
    this.submitting = true;
    const request: AcademicCalendarRequestDTO = this.calendarForm.value;

    this.calendarService.create(request).subscribe({
      next: () => {
        this.showToastMessage('Entrée ajoutée avec succès !', 'success');
        this.calendarForm.reset();
        this.submitting = false;
      },
      error: (err) => {
        this.showToastMessage('Erreur lors de la création.', 'error');
        this.submitting = false;
      }
    });
  }

  showToastMessage(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 2500);
  }
}
