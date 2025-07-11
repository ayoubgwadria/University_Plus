import { Component } from '@angular/core';
import { AbsenceRequestDTO } from '../../DTO/AbsenceRequestDTO';
import { AbsenceService } from '../../services/absence.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-absence',
  standalone: false,
  templateUrl: './create-absence.component.html',
  styleUrl: './create-absence.component.css'
})
export class CreateAbsenceComponent {
  absence: AbsenceRequestDTO = {
    date: '',
    reason: '',
    studentId: 0,
    courseId: 0,
    sessionId: 0
  };

  submitting = false;
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  constructor(private absenceService: AbsenceService, private router: Router) {}

  createAbsence(): void {
    this.submitting = true;
    this.absenceService.create(this.absence).subscribe({
      next: () => {
        this.showToastMessage('Absence créée avec succès !', 'success');
        setTimeout(() => this.router.navigate(['/absences']), 1200);
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