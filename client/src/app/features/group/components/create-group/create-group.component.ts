import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-create-group',
  standalone: false,
  templateUrl: './create-group.component.html',
  styleUrl: './create-group.component.css'
})
export class CreateGroupComponent {
  groupForm: FormGroup;
  successMessage = '';
  errorMessage = '';
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private groupService: GroupService
  ) {
    this.groupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      level: ['', Validators.required],
      year: [new Date().getFullYear(), [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.groupForm.invalid || this.isSubmitting) return;

    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.groupService.createGroup(this.groupForm.value).subscribe({
      next: (group) => {
        this.successMessage = `Groupe "${group.name}" créé avec succès.`;
        this.errorMessage = '';
        this.groupForm.reset({ year: new Date().getFullYear() });
        this.isSubmitting = false;
      },
      error: () => {
        this.errorMessage = 'Erreur lors de la création du groupe.';
        this.successMessage = '';
        this.isSubmitting = false;
      }
    });
  }

  onReset(): void {
    this.groupForm.reset({ year: new Date().getFullYear() });
    this.successMessage = '';
    this.errorMessage = '';
  }

  getFormProgress(): number {
    let progress = 0;
    if (this.groupForm.get('name')?.value) progress += 34;
    if (this.groupForm.get('level')?.value) progress += 33;
    if (this.groupForm.get('year')?.value) progress += 33;
    return progress;
  }
}

