import { Component, OnInit } from '@angular/core';
import { TaskResponseDTO } from '../../DTO/TaskResponseDTO';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks-list',
  standalone: false,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css'
})
export class TasksListComponent implements OnInit {
  tasks: TaskResponseDTO[] = [];
  filteredTasks: TaskResponseDTO[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  // Search and filter properties
  searchTerm = '';
  selectedCourseId: number | '' = '';
  selectedCreatorId: number | '' = '';

  // Toast notification
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  constructor(
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.taskService.getAllTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.filteredTasks = [...data];
        this.applyFilters();
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement des tâches. Veuillez réessayer.';
        this.isLoading = false;
        console.error(err);
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
    this.selectedCourseId = '';
    this.selectedCreatorId = '';
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.tasks];

    // Search filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(task =>
        (task.title && task.title.toLowerCase().includes(term)) ||
        (task.description && task.description.toLowerCase().includes(term))
      );
    }

    // Course filter
    if (this.selectedCourseId) {
      filtered = filtered.filter(task => task.courseId === Number(this.selectedCourseId));
    }

    // Creator filter
    if (this.selectedCreatorId) {
      filtered = filtered.filter(task => task.createdById === Number(this.selectedCreatorId));
    }

    this.filteredTasks = filtered;
  }

  getFilteredTasks(): TaskResponseDTO[] {
    return this.filteredTasks;
  }

  trackByTaskId(index: number, task: TaskResponseDTO): number {
    return task.id ?? index;
  }

  onImageError(event: any): void {
    event.target.style.display = 'none';
  }

  showToastMessage(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  createTask(): void {
    this.router.navigate(['/tasks/create']);
  }

  viewTask(id?: number): void {
    if (typeof id === 'number') {
      this.router.navigate(['/task', id]);
    }
  }

  // Stats methods (mocked for now)
  getTotalTasks(): number {
    return this.tasks.length;
  }

  getUpcomingTasks(): number {
    const now = new Date();
    return this.tasks.filter(task => new Date(task.dueDate) > now).length;
  }

  getOverdueTasks(): number {
    const now = new Date();
    return this.tasks.filter(task => new Date(task.dueDate) < now).length;
  }

  getCreatedToday(): number {
    // If TaskResponseDTO has a createdAt property
    const today = new Date();
    return this.tasks.filter(task => {
      const createdAt = (task as any).createdAt ? new Date((task as any).createdAt) : null;
      if (!createdAt) return false;
      return createdAt.toDateString() === today.toDateString();
    }).length;
  }
}

