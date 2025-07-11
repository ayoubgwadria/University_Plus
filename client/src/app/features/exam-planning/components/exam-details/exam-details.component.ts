import { Component, OnInit } from '@angular/core';
import { ExamPlanningResponseDTO } from '../../DTO/ExamPlanningResponseDTO';
import { ActivatedRoute } from '@angular/router';
import { ExamPlanningService } from '../../services/exam-planning.service';

@Component({
  selector: 'app-exam-details',
  standalone: false,
  templateUrl: './exam-details.component.html',
  styleUrl: './exam-details.component.css'
})
export class ExamDetailsComponent implements OnInit {
  examPlanning: ExamPlanningResponseDTO | null = null;
  isLoading = true;
  errorMessage = '';
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  constructor(
    private route: ActivatedRoute,
    private examPlanningService: ExamPlanningService
  ) {}

  ngOnInit() {
    this.loadExam();
  }

  loadExam() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.isLoading = true;
      this.errorMessage = '';
      this.examPlanningService.getById(id).subscribe({
        next: (data) => {
          this.examPlanning = data;
          this.isLoading = false;
        },
        error: () => {
          this.errorMessage = 'Impossible de charger les détails de la planification.';
          this.isLoading = false;
        }
      });
    } else {
      this.errorMessage = 'ID de planification invalide.';
      this.isLoading = false;
    }
  }

  retryLoad(): void {
    this.loadExam();
  }

  goBack(): void {
    window.history.back();
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

  editExam(): void {
    this.showToastMessage('Redirection vers la modification (non implémenté)', 'success');
  }

  deleteExam(): void {
    if (this.examPlanning && confirm('Êtes-vous sûr de vouloir supprimer cette planification ?')) {
      this.showToastMessage('Suppression non implémentée.', 'error');
    }
  }
}