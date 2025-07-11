import { Component, OnInit } from '@angular/core';
import { CourseMaterialResponseDTO } from '../../DTO/CourseMaterialResponseDTO';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseMaterialService } from '../../services/course-material.service';

@Component({
  selector: 'app-course-material-details',
  standalone: false,
  templateUrl: './course-material-details.component.html',
  styleUrl: './course-material-details.component.css'
})
export class CourseMaterialDetailsComponent implements OnInit {
  courseMaterial: CourseMaterialResponseDTO | null = null;
  isLoading = true;
  errorMessage = '';
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseMaterialService: CourseMaterialService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(id)) {
      this.errorMessage = 'ID du support de cours invalide.';
      this.isLoading = false;
      return;
    }
    this.loadCourseMaterial(id);
  }

  loadCourseMaterial(id: number): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.courseMaterialService.getById(id).subscribe({
      next: (data) => {
        this.courseMaterial = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Support de cours introuvable ou erreur lors du chargement.';
        this.isLoading = false;
      },
    });
  }

  retryLoad(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      this.loadCourseMaterial(id);
    }
  }

  goBack(): void {
    this.router.navigate(['/course-materials']);
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

  editMaterial(): void {
    if (this.courseMaterial?.id) {
      this.router.navigate(['/course-materials/edit', this.courseMaterial.id]);
    }
  }

  deleteMaterial(): void {
    if (this.courseMaterial?.id && confirm('Êtes-vous sûr de vouloir supprimer ce support de cours ?')) {
      this.courseMaterialService.delete(this.courseMaterial.id).subscribe({
        next: () => {
          this.showToastMessage('Support supprimé !', 'success');
          setTimeout(() => this.router.navigate(['/course-materials']), 1200);
        },
        error: () => {
          this.showToastMessage('Erreur lors de la suppression', 'error');
        }
      });
    }
  }
}