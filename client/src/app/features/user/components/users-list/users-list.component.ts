import { Component, OnInit } from '@angular/core';
import { UserDTO } from '../../DTO/UserDTO';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  standalone: false,
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent implements OnInit {
  users: UserDTO[] = [];
  filteredUsers: UserDTO[] = [];
  loading = true;
  error = '';

  // Search and filter properties
  searchTerm = '';
  selectedRole = '';
  selectedStatus = '';

  // View and sorting properties
  viewMode: 'grid' | 'list' = 'grid';
  sortBy = 'firstName';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Toast notification
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.error = '';

    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.filteredUsers = [...data];
        this.applyFiltersAndSort();
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load users', err);
        this.error = 'Erreur lors du chargement des utilisateurs. Veuillez réessayer.';
        this.loading = false;
      },
    });
  }

  // Search and filter methods
  onSearchChange() {
    this.applyFiltersAndSort();
  }

  onFilterChange() {
    this.applyFiltersAndSort();
  }

  onSortChange() {
    this.applyFiltersAndSort();
  }

  clearSearch() {
    this.searchTerm = '';
    this.applyFiltersAndSort();
  }

  clearAllFilters() {
    this.searchTerm = '';
    this.selectedRole = '';
    this.selectedStatus = '';
    this.applyFiltersAndSort();
  }

  applyFiltersAndSort() {
    let filtered = [...this.users];

    // Apply search filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(user =>
        user.firstName.toLowerCase().includes(term) ||
        user.lastName.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.role.toLowerCase().includes(term)
      );
    }

    // Apply role filter
    if (this.selectedRole) {
      filtered = filtered.filter(user => user.role === this.selectedRole);
    }

    // Apply status filter
    if (this.selectedStatus) {
      filtered = filtered.filter(user => {
        const status = this.getUserStatus(user);
        return status === this.selectedStatus;
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any = a[this.sortBy as keyof UserDTO];
      let bValue: any = b[this.sortBy as keyof UserDTO];

      // Handle special cases
      if (this.sortBy === 'lastLogin' || this.sortBy === 'lastLoginTime') {
        aValue = new Date(a.lastLoginTime || 0).getTime();
        bValue = new Date(b.lastLoginTime || 0).getTime();
      }

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });

    this.filteredUsers = filtered;
  }

  // View and sorting methods
  setViewMode(mode: 'grid' | 'list') {
    this.viewMode = mode;
  }

  setSortBy(field: string) {
    if (this.sortBy === field) {
      this.toggleSortDirection();
    } else {
      this.sortBy = field;
      this.sortDirection = 'asc';
    }
    this.applyFiltersAndSort();
  }

  toggleSortDirection() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.applyFiltersAndSort();
  }

  // Utility methods
  getFilteredUsers(): UserDTO[] {
    return this.filteredUsers;
  }

  trackByUserId(index: number, user: UserDTO): number {
    return user.id ?? index;
  }

  getInitials(firstName: string, lastName: string): string {
    return `${firstName?.charAt(0) ?? ''}${lastName?.charAt(0) ?? ''}`.toUpperCase();
  }

  getRoleClass(role: string): string {
    return role ? role.toLowerCase() : '';
  }

  getRoleDisplayName(role: string): string {
    const roleMap: { [key: string]: string } = {
      'ADMIN': 'Administrateur',
      'PROFESSOR': 'Professeur',
      'STUDENT': 'Étudiant'
    };
    return roleMap[role] || role;
  }

  getUserStatus(user: UserDTO): string {
    if (!user.lastLoginTime) return 'offline';

    const now = new Date();
    const lastLogin = new Date(user.lastLoginTime);
    const diffHours = (now.getTime() - lastLogin.getTime()) / (1000 * 60 * 60);

    if (diffHours < 1) return 'online';
    if (diffHours < 24) return 'away';
    return 'offline';
  }

  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'online': 'En ligne',
      'away': 'Absent',
      'offline': 'Hors ligne'
    };
    return statusMap[status] || 'Inconnu';
  }

  // Actions
  createUser(): void {
    this.router.navigate(['/user/create']);
  }

  exportUsers(): void {
    const data = JSON.stringify(this.filteredUsers, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users-export.json';
    a.click();
    window.URL.revokeObjectURL(url);
    this.showToastMessage('Export effectué !', 'success');
  }

  viewUser(id?: number): void {
    if (typeof id === 'number') {
      this.router.navigate(['/users', id]);
    }
  }

  editUser(id?: number): void {
    if (typeof id === 'number') {
      this.router.navigate(['/users/edit', id]);
    }
  }

  deleteUser(user: UserDTO): void {
    if (user && typeof user.id === 'number' && confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.userService.deleteUser(user.id).subscribe({
        next: () => {
          this.showToastMessage('Utilisateur supprimé avec succès !', 'success');
          this.loadUsers();
        },
        error: (err) => {
          this.showToastMessage('Erreur lors de la suppression', 'error');
        }
      });
    }
  }

  getNewUsers(): number {
    // Users created in the last 7 days (assuming user has a createdAt property)
    const now = new Date();
    return this.users.filter(user => {
      const createdAt = (user as any).createdAt ? new Date((user as any).createdAt) : null;
      if (!createdAt) return false;
      const diffDays = (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24);
      return diffDays < 7;
    }).length;
  }

  getLastLoginText(lastLoginTime?: string): string {
    if (!lastLoginTime) return 'Jamais connecté';
    return this.getRelativeTime(lastLoginTime);
  }

  getRelativeTime(timestamp?: string): string {
    if (!timestamp) return 'Jamais';
    const now = new Date();
    const time = new Date(timestamp);
    const diffMs = now.getTime() - time.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Il y a moins d\'1h';
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    if (diffDays < 7) return `Il y a ${diffDays}j`;
    return 'Il y a plus d\'1 semaine';
  }

  onImageError(event: any): void {
    event.target.style.display = 'none';
  }

  // Toast notification method
  showToastMessage(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  // Stats methods
  getTotalUsers(): number {
    return this.users.length;
  }

  getActiveUsers(): number {
    return this.users.filter(user => this.getUserStatus(user) === 'online').length;
  }

  getAdminUsers(): number {
    return this.users.filter(user => user.role === 'ADMIN').length;
  }
}