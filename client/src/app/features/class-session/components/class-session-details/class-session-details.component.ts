import { Component, OnInit } from '@angular/core';
import { ClassSessionResponseDTO } from '../../DTO/ClassSessionResponseDTO';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassSessionService } from '../../services/class-session.service';

@Component({
  selector: 'app-class-session-details',
  standalone: false,
  templateUrl: './class-session-details.component.html',
  styleUrl: './class-session-details.component.css'
})
export class ClassSessionDetailsComponent implements OnInit {
  classSession!: ClassSessionResponseDTO | null;
  loading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private classSessionService: ClassSessionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(id)) {
      this.errorMessage = 'ID de séance invalide';
      return;
    }

    this.loading = true;
    this.classSessionService.getById(id).subscribe({
      next: (data) => {
        this.classSession = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Erreur lors du chargement des détails de la séance.';
        this.loading = false;
      }
    });
  }

  goBack() {
    this.router.navigate(['/class-sessions']);
  }
}