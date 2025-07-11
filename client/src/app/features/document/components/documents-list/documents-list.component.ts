import { Component, OnInit } from '@angular/core';
import { DocumentResponseDTO } from '../../DTO/DocumentResponseDTO';
import { DocumentService } from '../../services/document.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documents-list',
  standalone: false,
  templateUrl: './documents-list.component.html',
  styleUrl: './documents-list.component.css'
})
export class DocumentsListComponent implements OnInit {
  documents: DocumentResponseDTO[] = [];
  filteredDocuments: DocumentResponseDTO[] = [];
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
    private documentService: DocumentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDocuments();
  }

  loadDocuments(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.documentService.getAllDocuments().subscribe({
      next: (data) => {
        this.documents = data;
        this.filteredDocuments = [...data];
        this.applyFilters();
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Erreur lors du chargement des documents.';
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
    let filtered = [...this.documents];

    // Search filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(doc =>
        (doc.title && doc.title.toLowerCase().includes(term)) ||
        (doc.fileUrl && doc.fileUrl.toLowerCase().includes(term))
      );
    }

    // Date filter
    if (this.selectedDate) {
      filtered = filtered.filter(doc => doc.uploadedAt?.slice(0, 10) === this.selectedDate);
    }

    this.filteredDocuments = filtered;
  }

  getFilteredDocuments(): DocumentResponseDTO[] {
    return this.filteredDocuments;
  }

  trackByDocumentId(index: number, doc: DocumentResponseDTO): number {
    return doc.id ?? index;
  }

  showToastMessage(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  createDocument(): void {
    this.router.navigate(['/documents/create']);
  }

  viewDocument(id?: number): void {
    if (typeof id === 'number') {
      this.router.navigate(['/documents', id]);
    }
  }

  deleteDocument(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce document ?')) {
      this.documentService.deleteDocument(id).subscribe({
        next: () => {
          this.showToastMessage('Document supprimé !', 'success');
          this.loadDocuments();
        },
        error: () => {
          this.showToastMessage('Erreur lors de la suppression', 'error');
        }
      });
    }
  }

  // Stats methods
  getTotalDocuments(): number {
    return this.documents.length;
  }

  getTodayDocuments(): number {
    const today = new Date().toISOString().slice(0, 10);
    return this.documents.filter(doc => doc.uploadedAt?.slice(0, 10) === today).length;
  }

  getUniqueDates(): string[] {
    return Array.from(new Set(this.documents.map(d => d.uploadedAt?.slice(0, 10)).filter(Boolean)));
  }
}