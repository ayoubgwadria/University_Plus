import { Component, OnInit } from '@angular/core';
import { GroupResponseDTO } from '../../DTO/GroupResponseDTO';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-group-details',
  standalone: false,
  templateUrl: './group-details.component.html',
  styleUrl: './group-details.component.css'
})
export class GroupDetailsComponent implements OnInit {
  group: GroupResponseDTO | null = null;
  isLoading = true;
  errorMessage = '';
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService
  ) {}

  ngOnInit() {
    this.loadGroup();
  }

  loadGroup() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      this.isLoading = true;
      this.errorMessage = '';
      this.groupService.getGroupById(id).subscribe({
        next: (data) => {
          this.group = data;
          this.isLoading = false;
        },
        error: () => {
          this.errorMessage = 'Impossible de charger les détails du groupe.';
          this.isLoading = false;
        }
      });
    } else {
      this.errorMessage = 'Aucun ID de groupe fourni.';
      this.isLoading = false;
    }
  }

  retryLoad(): void {
    this.loadGroup();
  }

  goBack(): void {
    window.history.back();
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

  editGroup(): void {
    this.showToastMessage('Redirection vers la modification (non implémenté)', 'success');
  }

  deleteGroup(): void {
    if (this.group && confirm('Êtes-vous sûr de vouloir supprimer ce groupe ?')) {
      this.showToastMessage('Suppression non implémentée.', 'error');
    }
  }
}