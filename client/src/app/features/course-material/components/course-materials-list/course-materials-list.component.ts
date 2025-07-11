import { Component, OnInit } from '@angular/core';
import { CourseMaterialResponseDTO } from '../../DTO/CourseMaterialResponseDTO';
import { CourseMaterialService } from '../../services/course-material.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-materials-list',
  standalone: false,
  templateUrl: './course-materials-list.component.html',
  styleUrl: './course-materials-list.component.css'
})
export class CourseMaterialsListComponent implements OnInit {
  courseMaterials: CourseMaterialResponseDTO[] = [];
  filteredMaterials: CourseMaterialResponseDTO[] = [];
  isLoading = true;
  errorMessage = '';

  // Search/filter
  searchTerm = '';
  selectedCourseId: number | '' = '';
  selectedUploaderId: number | '' = '';

  // Toast notification
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  constructor(
    private courseMaterialService: CourseMaterialService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMaterials();
  }

  loadMaterials(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.courseMaterialService.getAll().subscribe({
      next: (data) => {
        this.courseMaterials = data;
        this.filteredMaterials = [...data];
        this.applyFilters();
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement des supports de cours.';
        this.isLoading = false;
        console.error(err);
      },
    });
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.applyFilters();
  }

  clearAllFilters(): void {
    this.searchTerm = '';
    this.selectedCourseId = '';
    this.selectedUploaderId = '';
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.courseMaterials];

    // Search filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(mat =>
        (mat.title && mat.title.toLowerCase().includes(term)) ||
        (mat.fileUrl && mat.fileUrl.toLowerCase().includes(term))
      );
    }

    // Course filter
    if (this.selectedCourseId) {
      filtered = filtered.filter(mat => mat.courseId === Number(this.selectedCourseId));
    }

    // Uploader filter
    if (this.selectedUploaderId) {
      filtered = filtered.filter(mat => mat.uploadedById === Number(this.selectedUploaderId));
    }

    this.filteredMaterials = filtered;
  }

  getFilteredMaterials(): CourseMaterialResponseDTO[] {
    return this.filteredMaterials;
  }

  trackByMaterialId(index: number, mat: CourseMaterialResponseDTO): number {
    return mat.id ?? index;
  }

  showToastMessage(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  createMaterial(): void {
    this.router.navigate(['/course-materials/create']);
  }

  viewDetails(id: number): void {
    this.router.navigate(['/course-materials', id]);
  }

  deleteMaterial(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce support de cours ?')) {
      this.courseMaterialService.delete(id).subscribe({
        next: () => {
          this.showToastMessage('Support supprimé !', 'success');
          this.loadMaterials();
        },
        error: (err) => {
          this.showToastMessage('Erreur lors de la suppression', 'error');
          console.error(err);
        },
      });
    }
  }

  // Stats methods
  getTotalMaterials(): number {
    return this.courseMaterials.length;
  }

  getTodayMaterials(): number {
    const today = new Date().toISOString().slice(0, 10);
    return this.courseMaterials.filter(mat => mat.uploadedAt?.slice(0, 10) === today).length;
  }

  getUniqueCourses(): number[] {
    // Filter out undefined/null before creating the Set
    return Array.from(
      new Set(
        this.courseMaterials
          .map(m => m.courseId)
          .filter((id): id is number => typeof id === 'number')
      )
    );
  }
}
