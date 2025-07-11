import { Component } from '@angular/core';
import { AbsenceResponseDTO } from '../../DTO/AbsenceResponseDTO';
import { ActivatedRoute, Router } from '@angular/router';
import { AbsenceService } from '../../services/absence.service';

@Component({
  selector: 'app-absence-details',
  standalone: false,
  templateUrl: './absence-details.component.html',
  styleUrl: './absence-details.component.css'
})
export class AbsenceDetailsComponent {
  absence: AbsenceResponseDTO | null = null;
  isLoading = true;
  errorMessage = '';
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  constructor(
    private route: ActivatedRoute,
    private absenceService: AbsenceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAbsence();
  }

  loadAbsence(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : null;

    if (id !== null) {
      this.isLoading = true;
      this.errorMessage = '';
      this.absenceService.getById(id).subscribe({
        next: (data) => {
          this.absence = data;
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = 'Absence introuvable ou erreur lors du chargement.';
          this.isLoading = false;
        }
      });
    } else {
      this.errorMessage = 'ID d\'absence invalide.';
      this.isLoading = false;
    }
  }

  retryLoad(): void {
    this.loadAbsence();
  }

  goBack(): void {
    this.router.navigate(['/absences']);
  }

  showToastMessage(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      this.showToastMessage('Copié dans le presse-papiers !', 'success');
    }).catch(() => {
      this.showToastMessage('Erreur lors de la copie', 'error');
    });
  }
}
