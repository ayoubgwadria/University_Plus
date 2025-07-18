import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { UserService } from '../../features/user/services/user.service';

export interface SidebarLink {
  id: string;
  label: string;
  icon: string;
  route: string;
  badge?: number;
  category: string;
  children?: SidebarLink[];
}

export interface SidebarCategory {
  id: string;
  name: string;
  order: number;
  icon: string;
  alwaysExpanded?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('sidebarAnimation', [
      state('expanded', style({ width: '280px' })),
      state('collapsed', style({ width: '72px' })),
      transition(
        'expanded <=> collapsed',
        animate('300ms cubic-bezier(0.4, 0, 0.2, 1)')
      ),
    ]),
    trigger('contentAnimation', [
      state('visible', style({ opacity: 1, transform: 'translateX(0)' })),
      state('hidden', style({ opacity: 0, transform: 'translateX(-10px)' })),
      transition(
        'visible <=> hidden',
        animate('200ms cubic-bezier(0.4, 0, 0.2, 1)')
      ),
    ]),
    trigger('mobileAnimation', [
      state('open', style({ transform: 'translateX(0)' })),
      state('closed', style({ transform: 'translateX(-100%)' })),
      transition(
        'open <=> closed',
        animate('300ms cubic-bezier(0.4, 0, 0.2, 1)')
      ),
    ]),
    trigger('accordionAnimation', [
      state('expanded', style({ height: '*', opacity: 1 })),
      state('collapsed', style({ height: '0px', opacity: 0 })),
      transition(
        'expanded <=> collapsed',
        animate('250ms cubic-bezier(0.4, 0, 0.2, 1)')
      ),
    ]),
  ],
})
export class SidebarComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  isCollapsed = false;
  isMobileOpen = false;
  isMobile = false;
  currentRoute = '';
  activeCategory: string | null = 'dashboard';
  searchQuery = '';
  role = '';
  logedIn = false;

  allCategories: SidebarCategory[] = [
    { id: 'dashboard', name: 'Tableau de bord', order: 1, icon: 'dashboard', alwaysExpanded: true },
    { id: 'academic', name: 'Académique', order: 2, icon: 'school' },
    { id: 'management', name: 'Gestion', order: 3, icon: 'people' },
    { id: 'planning', name: 'Planning', order: 4, icon: 'schedule' },
    { id: 'evaluation', name: 'Évaluation', order: 5, icon: 'assessment' },
    { id: 'communication', name: 'Communication', order: 6, icon: 'chat' },
  ];

  allSidebarLinks: SidebarLink[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', route: '/dashboard', category: 'dashboard' },
    { id: 'courses', label: 'Cours', icon: 'book', route: '/course/list', category: 'academic' },
    { id: 'course-materials', label: 'Supports de cours', icon: 'library_books', route: '/coursematerial/list', category: 'academic' },
    { id: 'documents', label: 'Documents', icon: 'description', route: '/document/list', category: 'academic' },
    { id: 'students', label: 'Utilisateurs', icon: 'school', route: '/user/list', category: 'management', badge: 12 },
    { id: 'groups', label: 'Groupes', icon: 'group', route: '/group/list', category: 'management' },
    { id: 'classsessions', label: 'Class Sessions', icon: 'class', route: '/classsession/list', category: 'management' },
    { id: 'schedule', label: 'Emploi du temps', icon: 'schedule', route: '/academiccalendar/list', category: 'planning' },
    { id: 'exams', label: 'Examens', icon: 'quiz', route: '/examplan/list', category: 'planning' },
    { id: 'events', label: 'Événements', icon: 'event', route: '/event/list', category: 'planning' },
    { id: 'grades', label: 'Notes', icon: 'star', route: '/grade/list', category: 'evaluation' },
    { id: 'attendance', label: 'Présences', icon: 'how_to_reg', route: '/absence/list', category: 'evaluation' },
    { id: 'messages', label: 'Messages', icon: 'message', route: '/messages', category: 'communication', badge: 5 },
    { id: 'announcements', label: 'Annonces', icon: 'campaign', route: '/announcements', category: 'communication' },
  ];

  sidebarLinks: SidebarLink[] = [];
  sidebarCategories: SidebarCategory[] = [];

  constructor(private router: Router, private userService: UserService) {
    this.checkScreenSize();
  }

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url;
        this.setActiveCategoryFromRoute();
      });

    this.currentRoute = this.router.url;
    this.setActiveCategoryFromRoute();
    this.role = this.userService.getUserRole() || '';
    this.logedIn = this.userService.isLoggedIn();

    this.filterSidebarByRole();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.checkScreenSize();
  }

  private checkScreenSize(): void {
    this.isMobile = window.innerWidth < 768;
    if (!this.isMobile) {
      this.isMobileOpen = false;
    }
  }

  private setActiveCategoryFromRoute(): void {
    const activeLink = this.sidebarLinks.find((link) =>
      this.isRouteActive(link.route)
    );
    if (
      activeLink &&
      !this.sidebarCategories.find((cat) => cat.id === activeLink.category)
        ?.alwaysExpanded
    ) {
      this.activeCategory = activeLink.category;
    }
  }

  toggleSidebar(): void {
    this.isMobile ? this.isMobileOpen = !this.isMobileOpen : this.isCollapsed = !this.isCollapsed;
  }

  toggleCategory(categoryId: string): void {
    const category = this.sidebarCategories.find((cat) => cat.id === categoryId);
    if (category?.alwaysExpanded) return;
    this.activeCategory = this.activeCategory === categoryId ? null : categoryId;
  }

  navigate(route: string): void {
    this.router.navigate([route]);
    if (this.isMobile) {
      this.isMobileOpen = false;
    }
  }

  isRouteActive(linkRoute: string): boolean {
    if (linkRoute === '/dashboard') {
      return this.currentRoute === '/' || this.currentRoute === '/dashboard';
    }
    return this.currentRoute.startsWith(linkRoute);
  }

  isCategoryExpanded(categoryId: string): boolean {
    const category = this.sidebarCategories.find((cat) => cat.id === categoryId);
    return category?.alwaysExpanded || this.activeCategory === categoryId;
  }

  getLinksByCategory(categoryId: string): SidebarLink[] {
    const links = this.sidebarLinks.filter(link => link.category === categoryId);
    return this.searchQuery.trim()
      ? links.filter(link => link.label.toLowerCase().includes(this.searchQuery.toLowerCase()))
      : links;
  }

  getFilteredCategories(): SidebarCategory[] {
    if (!this.searchQuery.trim()) {
      return this.sidebarCategories;
    }
    return this.sidebarCategories.filter(
      (category) => this.getLinksByCategory(category.id).length > 0
    );
  }

  getCategoryItemCount(categoryId: string): number {
    return this.getLinksByCategory(categoryId).length;
  }

  hasActiveLink(categoryId: string): boolean {
    return this.getLinksByCategory(categoryId).some(link =>
      this.isRouteActive(link.route)
    );
  }

  onSearchChange(event: any): void {
    const value = event?.target?.value || '';
    this.searchQuery = value;

    if (value.trim()) {
      const categoriesWithResults = this.getFilteredCategories();
      if (categoriesWithResults.length === 1) {
        this.activeCategory = categoriesWithResults[0].id;
      }
    }
  }

  clearSearch(): void {
    this.searchQuery = '';
  }

  closeMobileSidebar(): void {
    if (this.isMobile) {
      this.isMobileOpen = false;
    }
  }

  trackByCategory(index: number, category: SidebarCategory): string {
    return category.id;
  }

  trackByLink(index: number, link: SidebarLink): string {
    return link.id;
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/user/login']);
    this.logedIn = false;
  }

  private filterSidebarByRole(): void {
    if (this.role === 'PROFESSOR') {
      // Only allow academic materials for professor
      const allowedLinkIds = ['course-materials', 'documents'];
      this.sidebarLinks = this.allSidebarLinks.filter(link =>
        allowedLinkIds.includes(link.id)
      );
    } else {
      this.sidebarLinks = this.allSidebarLinks;
    }

    // Only include categories that have links
    const allowedCategoryIds = new Set(this.sidebarLinks.map(link => link.category));
    this.sidebarCategories = this.allCategories.filter(cat =>
      allowedCategoryIds.has(cat.id)
    );
  }
}
