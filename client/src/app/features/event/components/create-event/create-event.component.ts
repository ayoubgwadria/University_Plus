import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventRequestDTO } from '../../DTO/EventRequestDTO';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-create-event',
  standalone: false,
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateEventComponent {
  eventForm: FormGroup;
  successMessage = '';
  errorMessage = '';
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService
  ) {
    this.eventForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: [''],
      date: ['', Validators.required],
      location: ['', Validators.required],
      organizerId: [null, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.eventForm.invalid || this.isSubmitting) return;

    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.eventService.createEvent(this.eventForm.value).subscribe({
      next: (event) => {
        this.successMessage = `Événement "${event.title}" créé avec succès.`;
        this.errorMessage = '';
        this.eventForm.reset();
        this.isSubmitting = false;
      },
      error: () => {
        this.errorMessage = 'Erreur lors de la création de l\'événement.';
        this.successMessage = '';
        this.isSubmitting = false;
      }
    });
  }

  onReset(): void {
    this.eventForm.reset();
    this.successMessage = '';
    this.errorMessage = '';
  }

  getFormProgress(): number {
    let progress = 0;
    if (this.eventForm.get('title')?.value) progress += 20;
    if (this.eventForm.get('description')?.value) progress += 20;
    if (this.eventForm.get('date')?.value) progress += 20;
    if (this.eventForm.get('location')?.value) progress += 20;
    if (this.eventForm.get('organizerId')?.value) progress += 20;
    return progress;
  }
}
