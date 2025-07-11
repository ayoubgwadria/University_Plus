import { Component, OnInit } from '@angular/core';
import { CourseResponseDTO } from '../../DTO/CourseResponseDTO';
import { CourseService } from '../../services/course.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-details',
  standalone: false,
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent implements OnInit {
  course: CourseResponseDTO | null = null;
  isLoading = true;
  errorMessage = '';
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCourse();
  }

  loadCourse() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = +idParam;
      this.isLoading = true;
      this.errorMessage = '';
      this.courseService.getCourseById(id).subscribe({
        next: (data) => {
          this.course = data;
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors du chargement du cours.';
          this.isLoading = false;
        },
      });
    } else {
      this.errorMessage = 'Aucun ID de cours fourni dans l\'URL.';
      this.isLoading = false;
    }
  }

  retryLoad(): void {
    this.loadCourse();
  }

  goBack(): void {
    this.router.navigate(['/courses']);
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

  editCourse(): void {
    if (this.course?.id) {
      this.router.navigate(['/courses/edit', this.course.id]);
    }
  }

  deleteCourse(): void {
    if (this.course?.id && confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) {
      this.courseService.deleteCourse(this.course.id).subscribe({
        next: () => {
          this.showToastMessage('Cours supprimé !', 'success');
          setTimeout(() => this.router.navigate(['/courses']), 1200);
        },
        error: () => {
          this.showToastMessage('Erreur lors de la suppression', 'error');
        }
      });
    }
  }
}