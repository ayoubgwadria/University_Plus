import { Component, OnInit } from '@angular/core';
import { DocumentResponseDTO } from '../../DTO/DocumentResponseDTO';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'app-document-details',
  standalone: false,
  templateUrl: './document-details.component.html',
  styleUrl: './document-details.component.css'
})
export class DocumentDetailsComponent implements OnInit {
  document?: DocumentResponseDTO;
  isLoading = true;
  errorMessage = '';
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  constructor(
    private route: ActivatedRoute,
    private documentService: DocumentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDocument();
  }

  loadDocument(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.isLoading = true;
      this.errorMessage = '';
      this.documentService.getDocumentById(id).subscribe({
        next: (doc) => {
          this.document = doc;
          this.isLoading = false;
        },
        error: () => {
          this.errorMessage = 'Impossible de charger les détails du document.';
          this.isLoading = false;
        }
      });
    } else {
      this.errorMessage = 'ID de document invalide.';
      this.isLoading = false;
    }
  }

  retryLoad(): void {
    this.loadDocument();
  }

  goBack(): void {
    this.router.navigate(['/documents']);
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

  editDocument(): void {
    if (this.document?.id) {
      this.router.navigate(['/documents/edit', this.document.id]);
    }
  }

  deleteDocument(): void {
    if (this.document?.id && confirm('Êtes-vous sûr de vouloir supprimer ce document ?')) {
      this.documentService.deleteDocument(this.document.id).subscribe({
        next: () => {
          this.showToastMessage('Document supprimé !', 'success');
          setTimeout(() => this.router.navigate(['/documents']), 1200);
        },
        error: () => {
          this.showToastMessage('Erreur lors de la suppression', 'error');
        }
      });
    }
  }
}