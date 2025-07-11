import { Component, OnInit } from '@angular/core';
import { EventResponseDTO } from '../../DTO/EventResponseDTO';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-details',
  standalone: false,
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.css'
})
export class EventDetailsComponent implements OnInit {
  event: EventResponseDTO | null = null;
  isLoading = true;
  errorMessage = '';
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadEvent(+id);
    } else {
      this.errorMessage = 'ID événement invalide.';
      this.isLoading = false;
    }
  }

  loadEvent(id: number): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.eventService.getEventById(id).subscribe({
      next: (data) => {
        this.event = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Événement introuvable ou erreur lors du chargement.';
        this.isLoading = false;
      }
    });
  }

  retryLoad(): void {
    if (this.event?.id) {
      this.loadEvent(this.event.id);
    } else {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      if (id) this.loadEvent(id);
    }
  }

  goBack(): void {
    this.router.navigate(['/events']);
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

  editEvent(): void {
    if (this.event?.id) {
      this.router.navigate(['/events/edit', this.event.id]);
    }
  }

  deleteEvent(): void {
    if (this.event?.id && confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
      this.eventService.deleteEvent(this.event.id).subscribe({
        next: () => {
          this.showToastMessage('Événement supprimé !', 'success');
          setTimeout(() => this.router.navigate(['/events']), 1500);
        },
        error: () => {
          this.showToastMessage('Erreur lors de la suppression', 'error');
        }
      });
    }
  }
}
