import { Component, OnInit } from '@angular/core';
import { AcademicCalendarResponseDTO } from '../../DTO/AcademicCalendarResponseDTO';
import { ActivatedRoute, Router } from '@angular/router';
import { AcademicCalendarService } from '../../services/academic-calendar.service';

@Component({
  selector: 'app-academic-calendar-details',
  standalone: false,
  templateUrl: './academic-calendar-details.component.html',
  styleUrl: './academic-calendar-details.component.css'
}) 
export class AcademicCalendarDetailsComponent implements OnInit {
  entry: AcademicCalendarResponseDTO | null = null;
  isLoading = true;
  errorMessage: string | null = null;
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  constructor(
    private route: ActivatedRoute,
    private calendarService: AcademicCalendarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEntry();
  }

  loadEntry(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.errorMessage = 'ID de calendrier invalide.';
      this.isLoading = false;
      return;
    }
    this.isLoading = true;
    this.errorMessage = null;
    this.calendarService.getById(id).subscribe({
      next: (data) => {
        this.entry = data;
        this.isLoading = false;
      },
      error: () => {
        this.entry = null;
        this.errorMessage = 'Impossible de charger les détails du calendrier.';
        this.isLoading = false;
      }
    });
  }

  retryLoad(): void {
    this.loadEntry();
  }

  goBack(): void {
    this.router.navigate(['/academic-calendar']);
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
}
