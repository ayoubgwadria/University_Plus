import { Component, OnInit } from '@angular/core';
import { CourseResponseDTO } from '../../DTO/CourseResponseDTO';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-courses-list',
  standalone: false,
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.css'
})
export class CoursesListComponent implements OnInit {
  courses: CourseResponseDTO[] = [];
  filteredCourses: CourseResponseDTO[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  // Search/filter
  searchTerm = '';
  selectedTeacherId = '';

  // Toast notification
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.isLoading = true;
    this.errorMessage = null;
    this.courseService.getAllCourses().subscribe({
      next: (data) => {
        this.courses = data;
        this.filteredCourses = [...data];
        this.applyFilters();
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement des cours.';
        this.isLoading = false;
      },
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
    this.selectedTeacherId = '';
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.courses];

    // Search filter
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(course =>
        (course.name && course.name.toLowerCase().includes(term)) ||
        (course.code && course.code.toLowerCase().includes(term))
      );
    }

    // Teacher filter
    if (this.selectedTeacherId) {
      filtered = filtered.filter(course => String(course.teacherId) === this.selectedTeacherId);
    }

    this.filteredCourses = filtered;
  }

  getFilteredCourses(): CourseResponseDTO[] {
    return this.filteredCourses;
  }

  trackByCourseId(index: number, course: CourseResponseDTO): number {
    return course.id ?? index;
  }

  showToastMessage(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  // Stats methods
  getTotalCourses(): number {
    return this.courses.length;
  }

  getUniqueTeachers(): string[] {
    return Array.from(
      new Set(
        this.courses
          .map(c => c.teacherId)
          .filter((id): id is number => id !== undefined && id !== null)
          .map(id => String(id))
      )
    );
  }
}
