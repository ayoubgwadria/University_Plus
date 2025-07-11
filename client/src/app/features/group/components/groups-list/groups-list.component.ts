import { Component, OnInit } from '@angular/core';
import { GroupResponseDTO } from '../../DTO/GroupResponseDTO';
import { GroupService } from '../../services/group.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-groups-list',
  standalone: false,
  templateUrl: './groups-list.component.html',
  styleUrl: './groups-list.component.css'
})
export class GroupsListComponent implements OnInit {
  groups: GroupResponseDTO[] = [];
  filteredGroups: GroupResponseDTO[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  // Search and filter properties
  searchTerm = '';
  selectedLevel = '';
  selectedYear: number | '' = '';

  // Toast notification
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  constructor(
    private groupService: GroupService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadGroups();
  }

  loadGroups(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.groupService.getAllGroups().subscribe({
      next: (data) => {
        this.groups = data;
        this.filteredGroups = [...data];
        this.applyFilters();
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement des groupes. Veuillez réessayer.';
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
    this.selectedLevel = '';
    this.selectedYear = '';
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.groups];

    // Search filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(group =>
        (group.name && group.name.toLowerCase().includes(term)) ||
        (group.level && group.level.toLowerCase().includes(term))
      );
    }

    // Level filter
    if (this.selectedLevel) {
      filtered = filtered.filter(group => group.level === this.selectedLevel);
    }

    // Year filter
    if (this.selectedYear) {
      filtered = filtered.filter(group => group.year === Number(this.selectedYear));
    }

    this.filteredGroups = filtered;
  }

  getFilteredGroups(): GroupResponseDTO[] {
    return this.filteredGroups;
  }

  trackByGroupId(index: number, group: GroupResponseDTO): number {
    return group.id ?? index;
  }

  showToastMessage(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  createGroup(): void {
    this.router.navigate(['/group/create']);
  }

  viewGroup(id?: number): void {
    if (typeof id === 'number') {
      this.router.navigate(['/groups', id]);
    }
  }

  // Stats methods (mocked for now)
  getTotalGroups(): number {
    return this.groups.length;
  }

  getCurrentYearGroups(): number {
    const year = new Date().getFullYear();
    return this.groups.filter(group => group.year === year).length;
  }

  getUniqueLevels(): string[] {
    return Array.from(new Set(this.groups.map(g => g.level).filter(Boolean)));
  }

  getUniqueYears(): number[] {
    return Array.from(new Set(this.groups.map(g => g.year))).sort((a, b) => b - a);
  }
}
