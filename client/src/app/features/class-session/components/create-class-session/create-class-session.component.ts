import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClassSessionService } from '../../services/class-session.service';
import { Router } from '@angular/router';
import { ClassSessionRequestDTO } from '../../DTO/ClassSessionRequestDTO';

@Component({
  selector: 'app-create-class-session',
  standalone: false,
  templateUrl: './create-class-session.component.html',
  styleUrl: './create-class-session.component.css'
})
export class CreateClassSessionComponent {
  classSessionForm!: FormGroup;
  submitting = false;
  errorMessage = '';
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  constructor(
    private fb: FormBuilder,
    private classSessionService: ClassSessionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.classSessionForm = this.fb.group({
      subjectName: ['', Validators.required],
      date: ['', Validators.required],            // input type="date"
      startTime: ['', Validators.required],       // input type="time"
      endTime: ['', Validators.required],
      room: ['', Validators.required],
      integratedClassroom: [false],
      teacherId: [null],                           // optional, can be select dropdown
      groupId: [null]
    });
  }

  onSubmit() {
    if (this.classSessionForm.invalid) {
      return;
    }
    this.submitting = true;
    this.errorMessage = '';
    const dto: ClassSessionRequestDTO = this.classSessionForm.value;

    this.classSessionService.create(dto).subscribe({
      next: () => {
        this.submitting = false;
        this.showToastMessage('Séance créée avec succès !', 'success');
        setTimeout(() => {
          this.router.navigate(['/class-sessions']);
        }, 1200);
      },
      error: (error) => {
        this.submitting = false;
        this.errorMessage = 'Erreur lors de la création de la séance. Veuillez réessayer.';
        this.showToastMessage('Erreur lors de la création', 'error');
        console.error(error);
      }
    });
  }

  showToastMessage(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 2500);
  }
}
