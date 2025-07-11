import { Component, OnInit } from '@angular/core';
import { UserDTO } from '../../DTO/UserDTO';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-details',
  standalone: false,
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {
  user: UserDTO | null = null;
  loading = true;
  errorMessage = '';
  showMoreActions = false;
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loading = true;
      this.errorMessage = '';
      
      this.userService.getUserById(id).subscribe({
        next: (data) => {
          this.user = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading user:', err);
          this.errorMessage = 'Utilisateur introuvable ou erreur lors du chargement des données.';
          this.loading = false;
        }
      });
    } else {
      this.errorMessage = 'ID utilisateur invalide.';
      this.loading = false;
    }
  }

  retryLoad(): void {
    this.loadUser();
  }

  goBack(): void {
    this.location.back();
  }

  getInitials(firstName: string, lastName: string): string {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  }

  getRoleClass(role: string): string {
    return role.toLowerCase();
  }

  getRoleDisplayName(role: string): string {
    const roleMap: { [key: string]: string } = {
      'ADMIN': 'Administrateur',
      'PROFESSOR': 'Professeur',
      'STUDENT': 'Étudiant'
    };
    return roleMap[role] || role;
  }

  getUserStatusClass(): string {
    if (!this.user?.lastLoginTime) return 'offline';
    
    const now = new Date();
    const lastLogin = new Date(this.user.lastLoginTime);
    const diffHours = (now.getTime() - lastLogin.getTime()) / (1000 * 60 * 60);
    
    if (diffHours < 1) return 'online';
    if (diffHours < 24) return 'away';
    return 'offline';
  }

  getUserStatusText(): string {
    const status = this.getUserStatusClass();
    const statusMap: { [key: string]: string } = {
      'online': 'En ligne',
      'away': 'Absent',
      'offline': 'Hors ligne'
    };
    return statusMap[status] || 'Inconnu';
  }

  getRelativeTime(timestamp: string): string {
    if (!timestamp) return 'Jamais';
    
    const now = new Date();
    const time = new Date(timestamp);
    const diffMs = now.getTime() - time.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Il y a moins d\'une heure';
    if (diffHours < 24) return `Il y a ${diffHours} heure${diffHours > 1 ? 's' : ''}`;
    if (diffDays < 7) return `Il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`;
    return 'Il y a plus d\'une semaine';
  }

  getCreationDate(): string {
    // Mock creation date - you can implement real logic
    return new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString();
  }

  getDaysActive(): number {
    // Mock days active - implement real logic
    return Math.floor(Math.random() * 365) + 1;
  }

  getLoginCount(): number {
    // Mock login count - implement real logic
    return Math.floor(Math.random() * 1000) + 10;
  }

  getLastActivity(): string {
    // Mock last activity - implement real logic
    const activities = ['2h', '5h', '1j', '3j'];
    return activities[Math.floor(Math.random() * activities.length)];
  }

  getLoginAttempts(): number {
    // Mock login attempts - implement real logic
    return Math.floor(Math.random() * 10);
  }

  onImageError(event: any): void {
    event.target.style.display = 'none';
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      this.showToastMessage('Copié dans le presse-papiers !', 'success');
    }).catch(() => {
      this.showToastMessage('Erreur lors de la copie', 'error');
    });
  }

  showToastMessage(message: string, type: 'success' | 'error'): void {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  toggleMoreActions(): void {
    this.showMoreActions = !this.showMoreActions;
  }

  editUser(): void {
    if (this.user) {
      this.router.navigate(['/users/edit', this.user.id]);
    }
  }

  resetPassword(): void {
    if (this.user) {
      // Implement password reset logic
      console.log('Reset password for user:', this.user.id);
      this.showToastMessage('Email de réinitialisation envoyé !', 'success');
    }
    this.showMoreActions = false;
  }

  sendMessage(): void {
    if (this.user) {
      // Implement send message logic
      console.log('Send message to user:', this.user.email);
      this.showToastMessage('Message envoyé !', 'success');
    }
  }

  printUser(): void {
    window.print();
    this.showMoreActions = false;
  }

  exportUser(): void {
    if (this.user) {
      // Implement export logic
      const userData = JSON.stringify(this.user, null, 2);
      const blob = new Blob([userData], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `user-${this.user.id}.json`;
      a.click();
      window.URL.revokeObjectURL(url);
      this.showToastMessage('Données exportées !', 'success');
    }
    this.showMoreActions = false;
  }

  deleteUser(): void {
    if (this.user && this.user.id !== undefined && confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.userService.deleteUser(this.user.id!).subscribe({
        next: () => {
          this.showToastMessage('Utilisateur supprimé avec succès !', 'success');
          setTimeout(() => {
            this.router.navigate(['/users']);
          }, 2000);
        },
        error: (err) => {
          console.error('Error deleting user:', err);
          this.showToastMessage('Erreur lors de la suppression', 'error');
        }
      });
    }
    this.showMoreActions = false;
  }

  showLocation(ip: string): void {
    // Implement IP location lookup
    console.log('Show location for IP:', ip);
    this.showToastMessage('Localisation de l\'IP en cours...', 'success');
  }
}