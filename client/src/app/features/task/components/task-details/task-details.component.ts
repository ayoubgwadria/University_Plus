import { Component, OnInit } from '@angular/core';
import { TaskResponseDTO } from '../../DTO/TaskResponseDTO';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-details',
  standalone: false,
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css'
})
export class TaskDetailsComponent implements OnInit {
  task: TaskResponseDTO | null = null;
  isLoading = true;
  errorMessage: string | null = null;
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.loadTask();
  }

  loadTask(): void {
    const taskId = Number(this.route.snapshot.paramMap.get('id'));
    if (taskId) {
      this.isLoading = true;
      this.errorMessage = null;
      this.taskService.getTaskById(taskId).subscribe({
        next: (data) => {
          this.task = data;
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = 'Tâche introuvable ou erreur lors du chargement.';
          this.isLoading = false;
          console.error(err);
        }
      });
    } else {
      this.errorMessage = 'ID de tâche invalide.';
      this.isLoading = false;
    }
  }

  retryLoad(): void {
    this.loadTask();
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

  // Mock stats for demonstration
  getTaskStatus(): string {
    if (!this.task) return 'inconnu';
    const due = new Date(this.task.dueDate);
    const now = new Date();
    if (due > now) return 'À venir';
    if (due.toDateString() === now.toDateString()) return 'Aujourd\'hui';
    return 'En retard';
  }

  getTaskStatusClass(): string {
    const status = this.getTaskStatus();
    if (status === 'À venir') return 'upcoming';
    if (status === 'Aujourd\'hui') return 'today';
    if (status === 'En retard') return 'overdue';
    return '';
  }

  getRelativeTime(dateStr?: string): string {
    if (!dateStr) return 'Jamais';
    const now = new Date();
    const date = new Date(dateStr);
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Il y a moins d\'1h';
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    if (diffDays < 7) return `Il y a ${diffDays}j`;
    return 'Il y a plus d\'1 semaine';
  }

  // Actions (mock)
  editTask(): void {
    if (this.task) {
      this.showToastMessage('Redirection vers la modification (non implémenté)', 'success');
    }
  }

  deleteTask(): void {
    if (this.task && confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      // Implement delete logic
      this.showToastMessage('Suppression non implémentée.', 'error');
    }
  }
}

