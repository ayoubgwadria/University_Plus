import { Component, OnInit } from '@angular/core';
import { ExamPlanningResponseDTO } from '../../DTO/ExamPlanningResponseDTO';
import { ExamPlanningService } from '../../services/exam-planning.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exams-list',
  standalone: false,
  templateUrl: './exams-list.component.html',
  styleUrl: './exams-list.component.css'
})
export class ExamsListComponent implements OnInit {
  exams: ExamPlanningResponseDTO[] = [];
  filteredExams: ExamPlanningResponseDTO[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  // Search and filter properties
  searchTerm = '';
  selectedCourseId: number | '' = '';
  selectedGroupId: number | '' = '';

  // Toast notification
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  constructor(
    private examService: ExamPlanningService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadExams();
  }

  loadExams() {
    this.isLoading = true;
    this.errorMessage = null;
    this.examService.getAll().subscribe({
      next: (data) => {
        this.exams = data;
        this.filteredExams = [...data];
        this.applyFilters();
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Erreur lors du chargement des examens.';
        this.isLoading = false;
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
    this.selectedCourseId = '';
    this.selectedGroupId = '';
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.exams];

    // Search filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(exam =>
        (exam.room && exam.room.toLowerCase().includes(term)) ||
        (exam.examDate && exam.examDate.toLowerCase().includes(term))
      );
    }

    // Course filter
    if (this.selectedCourseId) {
      filtered = filtered.filter(exam => exam.courseId === Number(this.selectedCourseId));
    }

    // Group filter
    if (this.selectedGroupId) {
      filtered = filtered.filter(exam => exam.groupId === Number(this.selectedGroupId));
    }

    this.filteredExams = filtered;
  }

  getFilteredExams(): ExamPlanningResponseDTO[] {
    return this.filteredExams;
  }

  trackByExamId(index: number, exam: ExamPlanningResponseDTO): number {
    return exam.id ?? index;
  }

  showToastMessage(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  createExam(): void {
    this.router.navigate(['/examplan/create']);
  }

  viewExam(id?: number): void {
    if (typeof id === 'number') {
      this.router.navigate(['/exams', id]);
    }
  }

  deleteExam(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette planification ?')) {
      this.examService.delete(id).subscribe({
        next: () => {
          this.showToastMessage('Planification supprimée !', 'success');
          this.loadExams();
        },
        error: () => {
          this.showToastMessage('Erreur lors de la suppression', 'error');
        }
      });
    }
  }

  // Stats methods (mocked for now)
  getTotalExams(): number {
    return this.exams.length;
  }

  getUpcomingExams(): number {
    const now = new Date();
    return this.exams.filter(exam => new Date(exam.examDate) > now).length;
  }

  getUniqueRooms(): string[] {
    return Array.from(new Set(this.exams.map(e => e.room).filter(Boolean)));
  }

  getUniqueYears(): number[] {
    return Array.from(new Set(this.exams.map(e => {
      if (e.examDate) return new Date(e.examDate).getFullYear();
      return null;
    }).filter(Boolean) as number[])).sort((a, b) => b - a);
  }
}