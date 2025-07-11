import { Component, OnInit } from '@angular/core';
import { EventResponseDTO } from '../../DTO/EventResponseDTO';
import { EventService } from '../../services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events-list',
  standalone: false,
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.css'
})
export class EventsListComponent implements OnInit {
  events: EventResponseDTO[] = [];
  filteredEvents: EventResponseDTO[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  // Search/filter
  searchTerm = '';
  selectedDate = '';
  selectedOrganizer = '';

  // Toast notification
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  constructor(
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.isLoading = true;
    this.errorMessage = null;
    this.eventService.getAllEvents().subscribe({
      next: (res) => {
        this.events = res;
        this.filteredEvents = [...res];
        this.applyFilters();
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Erreur lors du chargement des événements.';
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
    this.selectedOrganizer = '';
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.events];

    // Search filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(event =>
        (event.title && event.title.toLowerCase().includes(term)) ||
        (event.description && event.description.toLowerCase().includes(term))
      );
    }

    // Date filter
    if (this.selectedDate) {
      filtered = filtered.filter(event => event.startDate === this.selectedDate);
    }

    // Organizer filter (if available)
    if (this.selectedOrganizer) {
      filtered = filtered.filter(event => (event as any).organizerId === this.selectedOrganizer);
    }

    this.filteredEvents = filtered;
  }

  getFilteredEvents(): EventResponseDTO[] {
    return this.filteredEvents;
  }

  trackByEventId(index: number, event: EventResponseDTO): number {
    return event.id ?? index;
  }

  showToastMessage(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  createEvent(): void {
    this.router.navigate(['/event/create']);
  }

  viewEvent(id?: number): void {
    if (typeof id === 'number') {
      this.router.navigate(['/events', id]);
    }
  }

  // Stats methods (mocked for now)
  getTotalEvents(): number {
    return this.events.length;
  }

  getUpcomingEvents(): number {
    const now = new Date();
    return this.events.filter(e => new Date(e.startDate) > now).length;
  }

  getPastEvents(): number {
    const now = new Date();
    return this.events.filter(e => new Date(e.endDate) < now).length;
  }

  getUniqueOrganizers(): string[] {
    return Array.from(new Set(this.events.map(e => (e as any).organizerId).filter(Boolean)));
  }
}
