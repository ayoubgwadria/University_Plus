import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentService } from '../../services/document.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-document',
  standalone: false,
  templateUrl: './create-document.component.html',
  styleUrl: './create-document.component.css'
})
export class CreateDocumentComponent {
  documentForm: FormGroup;
  successMessage = '';
  errorMessage = '';
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private documentService: DocumentService,
    private router: Router
  ) {
    this.documentForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      fileUrl: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.documentForm.invalid || this.isSubmitting) return;

    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    const document = {
      ...this.documentForm.value,
      uploadedAt: new Date().toISOString()
    };

    this.documentService.createDocument(document).subscribe({
      next: () => {
        this.successMessage = 'Document créé avec succès.';
        this.errorMessage = '';
        this.documentForm.reset();
        this.isSubmitting = false;
        setTimeout(() => this.router.navigate(['/documents']), 1200);
      },
      error: err => {
        this.errorMessage = 'Erreur lors de la création du document.';
        this.successMessage = '';
        this.isSubmitting = false;
      }
    });
  }

  onReset(): void {
    this.documentForm.reset();
    this.successMessage = '';
    this.errorMessage = '';
  }

  getFormProgress(): number {
    let progress = 0;
    if (this.documentForm.get('title')?.value) progress += 50;
    if (this.documentForm.get('fileUrl')?.value) progress += 50;
    return progress;
  }
}