import { Component, OnInit } from '@angular/core';
import { ClassSessionResponseDTO } from '../../DTO/ClassSessionResponseDTO';
import { ClassSessionService } from '../../services/class-session.service';

@Component({
  selector: 'app-class-sessions-list',
  standalone: false,
  templateUrl: './class-sessions-list.component.html',
  styleUrl: './class-sessions-list.component.css'
})
export class ClassSessionsListComponent implements OnInit {
  classSessions: ClassSessionResponseDTO[] = [];
  filteredClassSessions: ClassSessionResponseDTO[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  // Search/filter
  searchTerm = '';
  selectedDate = '';

  // Toast notification
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  constructor(private classSessionService: ClassSessionService) {}

  ngOnInit(): void {
    this.loadClassSessions();
  }

  loadClassSessions() {
    this.isLoading = true;
    this.errorMessage = null;
    this.classSessionService.getAll().subscribe({
      next: (data) => {
        this.classSessions = data;
        this.filteredClassSessions = [...data];
        this.applyFilters();
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des séances.';
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
    let filtered = [...this.classSessions];

    // Search filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(cs =>
        (cs.subjectName && cs.subjectName.toLowerCase().includes(term)) ||
        (cs.room && cs.room.toLowerCase().includes(term))
      );
    }

    // Date filter
    if (this.selectedDate) {
      filtered = filtered.filter(cs => cs.date?.slice(0, 10) === this.selectedDate);
    }

    this.filteredClassSessions = filtered;
  }

  getFilteredClassSessions(): ClassSessionResponseDTO[] {
    return this.filteredClassSessions;
  }

  trackByClassSessionId(index: number, cs: ClassSessionResponseDTO): number {
    return cs.id ?? index;
  }

  showToastMessage(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  // Stats methods
  getTotalClassSessions(): number {
    return this.classSessions.length;
  }

  getTodayClassSessions(): number {
    const today = new Date().toISOString().slice(0, 10);
    return this.classSessions.filter(cs => cs.date?.slice(0, 10) === today).length;
  }

  getUniqueDates(): string[] {
    return Array.from(new Set(this.classSessions.map(cs => cs.date?.slice(0, 10)).filter(Boolean)));
  }
}