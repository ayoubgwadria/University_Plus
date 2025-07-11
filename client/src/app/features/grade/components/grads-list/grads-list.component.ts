import { Component, OnInit } from '@angular/core';
import { GradeResponseDTO } from '../../DTO/GradeResponseDTO';
import { GradeService } from '../../services/grade.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grads-list',
  standalone: false,
  templateUrl: './grads-list.component.html',
  styleUrl: './grads-list.component.css'
})
export class GradsListComponent implements OnInit {
  grades: GradeResponseDTO[] = [];
  filteredGrades: GradeResponseDTO[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  // Search and filter properties
  searchTerm = '';
  selectedType = '';
  selectedStudentId: number | '' = '';
  selectedCourseId: number | '' = '';

  // Toast notification
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  constructor(
    private gradeService: GradeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadGrades();
  }

  loadGrades(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.gradeService.getAllGrades().subscribe({
      next: (data) => {
        this.grades = data;
        this.filteredGrades = [...data];
        this.applyFilters();
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement des notes. Veuillez réessayer.';
        this.isLoading = false;
        console.error(err);
      }
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
    this.selectedType = '';
    this.selectedStudentId = '';
    this.selectedCourseId = '';
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.grades];

    // Search filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(grade =>
        (grade.type && grade.type.toLowerCase().includes(term)) ||
        (grade.value && grade.value.toString().includes(term)) ||
        (grade.studentId && grade.studentId.toString().includes(term)) ||
        (grade.courseId && grade.courseId.toString().includes(term))
      );
    }

    // Type filter
    if (this.selectedType) {
      filtered = filtered.filter(grade => grade.type === this.selectedType);
    }

    // Student filter
    if (this.selectedStudentId) {
      filtered = filtered.filter(grade => grade.studentId === Number(this.selectedStudentId));
    }

    // Course filter
    if (this.selectedCourseId) {
      filtered = filtered.filter(grade => grade.courseId === Number(this.selectedCourseId));
    }

    this.filteredGrades = filtered;
  }

  getFilteredGrades(): GradeResponseDTO[] {
    return this.filteredGrades;
  }

  trackByGradeId(index: number, grade: GradeResponseDTO): number {
    return grade.id ?? index;
  }

  showToastMessage(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  createGrade(): void {
    this.router.navigate(['/grade/create']);
  }

  viewGrade(id?: number): void {
    if (typeof id === 'number') {
      this.router.navigate(['/grades', id]);
    }
  }

  // Stats methods (mocked for now)
  getTotalGrades(): number {
    return this.grades.length;
  }

  getAverageGrade(): number {
    if (!this.grades.length) return 0;
    return (
      this.grades.reduce((sum, g) => sum + (g.value || 0), 0) / this.grades.length
    );
  }

  getUniqueTypes(): string[] {
    return Array.from(new Set(this.grades.map(g => g.type).filter(Boolean)));
  }

  getUniqueYears(): number[] {
    return Array.from(new Set(this.grades.map(g => {
      if (g.date) return new Date(g.date).getFullYear();
      return null;
    }).filter(Boolean) as number[])).sort((a, b) => b - a);
  }
}
