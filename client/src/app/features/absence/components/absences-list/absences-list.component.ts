import { Component } from '@angular/core';
import { AbsenceResponseDTO } from '../../DTO/AbsenceResponseDTO';
import { AbsenceService } from '../../services/absence.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-absences-list',
  standalone: false,
  templateUrl: './absences-list.component.html',
  styleUrl: './absences-list.component.css'
})
export class AbsencesListComponent {
  absences: AbsenceResponseDTO[] = [];
  filteredAbsences: AbsenceResponseDTO[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  // Search/filter
  searchTerm = '';
  selectedDate = '';

  // Toast notification
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  constructor(private absenceService: AbsenceService, private router: Router) {}

  ngOnInit(): void {
    this.loadAbsences();
  }

  loadAbsences(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.absenceService.getAll().subscribe({
      next: (data) => {
        this.absences = data;
        this.filteredAbsences = [...data];
        this.applyFilters();
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement des absences.';
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
    this.selectedDate = '';
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.absences];

    // Search filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(abs =>
        (abs.reason && abs.reason.toLowerCase().includes(term)) ||
        (abs.studentId && abs.studentId.toString().includes(term)) ||
        (abs.courseId && abs.courseId.toString().includes(term))
      );
    }

    // Date filter
    if (this.selectedDate) {
      filtered = filtered.filter(abs => abs.date?.slice(0, 10) === this.selectedDate);
    }

    this.filteredAbsences = filtered;
  }

  getFilteredAbsences(): AbsenceResponseDTO[] {
    return this.filteredAbsences;
  }

  trackByAbsenceId(index: number, abs: AbsenceResponseDTO): number {
    return abs.id ?? index;
  }

  showToastMessage(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  createAbsence(): void {
    this.router.navigate(['/absences/create']);
  }

  viewDetails(id: number): void {
    this.router.navigate(['/absences', id]);
  }

  editAbsence(id: number): void {
    this.router.navigate(['/absences/edit', id]);
  }

  deleteAbsence(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette absence ?')) {
      this.absenceService.delete(id).subscribe({
        next: () => {
          this.showToastMessage('Absence supprimée !', 'success');
          this.loadAbsences();
        },
        error: () => {
          this.showToastMessage('Erreur lors de la suppression', 'error');
        }
      });
    }
  }

  // Stats methods
  getTotalAbsences(): number {
    return this.absences.length;
  }

  getTodayAbsences(): number {
    const today = new Date().toISOString().slice(0, 10);
    return this.absences.filter(abs => abs.date?.slice(0, 10) === today).length;
  }

  getUniqueDates(): string[] {
    return Array.from(new Set(this.absences.map(a => a.date?.slice(0, 10)).filter(Boolean)));
  }
}