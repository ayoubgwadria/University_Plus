import { Component, OnInit } from '@angular/core';
import { GradeResponseDTO } from '../../DTO/GradeResponseDTO';
import { GradeService } from '../../services/grade.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-grade-details',
  standalone: false,
  templateUrl: './grade-details.component.html',
  styleUrl: './grade-details.component.css'
})
export class GradeDetailsComponent implements OnInit {
  grade: GradeResponseDTO | null = null;
  isLoading = true;
  errorMessage = '';
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  constructor(
    private gradeService: GradeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadGrade();
  }

  loadGrade() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.isLoading = true;
      this.errorMessage = '';
      this.gradeService.getGradeById(id).subscribe({
        next: data => {
          this.grade = data;
          this.isLoading = false;
        },
        error: () => {
          this.errorMessage = 'Impossible de charger les détails de la note.';
          this.isLoading = false;
        }
      });
    } else {
      this.errorMessage = 'ID de note invalide.';
      this.isLoading = false;
    }
  }

  retryLoad(): void {
    this.loadGrade();
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

  editGrade(): void {
    this.showToastMessage('Redirection vers la modification (non implémenté)', 'success');
  }

  deleteGrade(): void {
    if (this.grade && confirm('Êtes-vous sûr de vouloir supprimer cette note ?')) {
      this.showToastMessage('Suppression non implémentée.', 'error');
    }
  }

  getRelativeTime(dateStr?: string): string {
    if (!dateStr) return 'Jamais';
    const now = new Date();
    const date = new Date(dateStr);
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Il y a moins d\'1h';
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    if (diffDays < 7) return `Il y a ${diffDays}j`;
    return 'Il y a plus d\'1 semaine';
  }
}
