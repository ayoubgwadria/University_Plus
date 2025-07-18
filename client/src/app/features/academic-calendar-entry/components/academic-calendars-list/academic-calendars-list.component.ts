import { Component, OnInit } from '@angular/core';
import { AcademicCalendarResponseDTO } from '../../DTO/AcademicCalendarResponseDTO';
import { AcademicCalendarService } from '../../services/academic-calendar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-academic-calendars-list',
  standalone: false,
  templateUrl: './academic-calendars-list.component.html',
  styleUrl: './academic-calendars-list.component.css'
})
export class AcademicCalendarsListComponent implements OnInit {
  calendarEntries: AcademicCalendarResponseDTO[] = [];
  filteredEntries: AcademicCalendarResponseDTO[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  // Search/filter
  searchTerm = '';
  selectedDate = '';

  // Toast notification
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  constructor(
    private calendarService: AcademicCalendarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCalendarEntries();
  }

  loadCalendarEntries(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.calendarService.getAll().subscribe({
      next: (data) => {
        this.calendarEntries = data;
        this.filteredEntries = [...data];
        this.applyFilters();
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des entrées du calendrier.';
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
    let filtered = [...this.calendarEntries];

    // Search filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(entry =>
        (entry.title && entry.title.toLowerCase().includes(term)) ||
        (entry.description && entry.description.toLowerCase().includes(term))
      );
    }

    // Date filter (startDate)
    if (this.selectedDate) {
      filtered = filtered.filter(entry => entry.startDate?.slice(0, 10) === this.selectedDate);
    }

    this.filteredEntries = filtered;
  }

  getFilteredEntries(): AcademicCalendarResponseDTO[] {
    return this.filteredEntries;
  }

  trackByEntryId(index: number, entry: AcademicCalendarResponseDTO): number {
    return entry.id ?? index;
  }

  showToastMessage(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  createEntry(): void {
    this.router.navigate(['/academiccalendar/create']);
  }

  viewEntry(id?: number): void {
    if (typeof id === 'number') {
      this.router.navigate(['/academic-calendar', id]);
    }
  }

  deleteEntry(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette entrée ?')) {
      this.calendarService.delete(id).subscribe({
        next: () => {
          this.showToastMessage('Entrée supprimée !', 'success');
          this.loadCalendarEntries();
        },
        error: () => {
          this.showToastMessage('Erreur lors de la suppression', 'error');
        }
      });
    }
  }

  // Stats methods
  getTotalEntries(): number {
    return this.calendarEntries.length;
  }

  getTodayEntries(): number {
    const today = new Date().toISOString().slice(0, 10);
    return this.calendarEntries.filter(entry => entry.startDate?.slice(0, 10) === today).length;
  }

  getUniqueDates(): string[] {
    return Array.from(new Set(this.calendarEntries.map(e => e.startDate?.slice(0, 10)).filter(Boolean)));
  }
}
