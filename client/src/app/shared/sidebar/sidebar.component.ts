import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { trigger, state, style, transition, animate } from '@angular/animations';

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
      transition('expanded <=> collapsed', animate('300ms cubic-bezier(0.4, 0, 0.2, 1)'))
    ]),
    trigger('contentAnimation', [
      state('visible', style({ opacity: 1, transform: 'translateX(0)' })),
      state('hidden', style({ opacity: 0, transform: 'translateX(-10px)' })),
      transition('visible <=> hidden', animate('200ms cubic-bezier(0.4, 0, 0.2, 1)'))
    ]),
    trigger('mobileAnimation', [
      state('open', style({ transform: 'translateX(0)' })),
      state('closed', style({ transform: 'translateX(-100%)' })),
      transition('open <=> closed', animate('300ms cubic-bezier(0.4, 0, 0.2, 1)'))
    ]),
    trigger('accordionAnimation', [
      state('expanded', style({ height: '*', opacity: 1 })),
      state('collapsed', style({ height: '0px', opacity: 0 })),
      transition('expanded <=> collapsed', animate('250ms cubic-bezier(0.4, 0, 0.2, 1)'))
    ])
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  isCollapsed = false;
  isMobileOpen = false;
  isMobile = false;
  currentRoute = '';
  activeCategory: string | null = 'dashboard'; // Only one category active at a time
  searchQuery = '';

  categories: SidebarCategory[] = [
    { id: 'dashboard', name: 'Tableau de bord', order: 1, icon: 'dashboard', alwaysExpanded: true },
    { id: 'academic', name: 'Académique', order: 2, icon: 'school' },
    { id: 'management', name: 'Gestion', order: 3, icon: 'people' },
    { id: 'planning', name: 'Planning', order: 4, icon: 'schedule' },
    { id: 'evaluation', name: 'Évaluation', order: 5, icon: 'assessment' },
    { id: 'communication', name: 'Communication', order: 6, icon: 'chat' }
  ];

  sidebarLinks: SidebarLink[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard',
      category: 'dashboard'
    },
    {
      id: 'courses',
      label: 'Cours',
      icon: 'book',
      route: '/course/list',
      category: 'academic'
    },
    {
      id: 'course-materials',
      label: 'Supports de cours',
      icon: 'library_books',
      route: '/coursematerial/list',
      category: 'academic'
    },
    {
      id: 'documents',
      label: 'Documents',
      icon: 'description',
      route: '/document/list',
      category: 'academic'
    },
    {
      id: 'students',
      label: 'Étudiants',
      icon: 'school',
      route: '/user/list',
      category: 'management',
      badge: 12
    },
    {
      id: 'teachers',
      label: 'Enseignants',
      icon: 'person',
      route: '/user/list',
      category: 'management'
    },
    {
      id: 'groups',
      label: 'Groupes',
      icon: 'group',
      route: '/group/list',
      category: 'management'
    },
    {
      id: 'schedule',
      label: 'Emploi du temps',
      icon: 'schedule',
      route: '/examplan/list',
      category: 'planning'
    },
    {
      id: 'exams',
      label: 'Examens',
      icon: 'quiz',
      route: '/examplan/list',
      category: 'planning'
    },
    {
      id: 'events',
      label: 'Événements',
      icon: 'event',
      route: '/event/list',
      category: 'planning'
    },
    {
      id: 'grades',
      label: 'Notes',
      icon: 'star',
      route: '/grade/list',
      category: 'evaluation'
    },
    {
      id: 'attendance',
      label: 'Présences',
      icon: 'how_to_reg',
      route: '/attendance',
      category: 'evaluation'
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: 'message',
      route: '/messages',
      category: 'communication',
      badge: 5
    },
    {
      id: 'announcements',
      label: 'Annonces',
      icon: 'campaign',
      route: '/announcements',
      category: 'communication'
    }
  ];

  constructor(private router: Router) {
    this.checkScreenSize();
  }

  ngOnInit(): void {
    // Listen to route changes
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url;
        this.setActiveCategoryFromRoute();
      });

    // Set initial route
    this.currentRoute = this.router.url;
    this.setActiveCategoryFromRoute();
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
    const activeLink = this.sidebarLinks.find(link => this.isRouteActive(link.route));
    if (activeLink && !this.categories.find(cat => cat.id === activeLink.category)?.alwaysExpanded) {
      this.activeCategory = activeLink.category;
    }
  }

  toggleSidebar(): void {
    if (this.isMobile) {
      this.isMobileOpen = !this.isMobileOpen;
    } else {
      this.isCollapsed = !this.isCollapsed;
    }
  }

  toggleCategory(categoryId: string): void {
    const category = this.categories.find(cat => cat.id === categoryId);
    if (category?.alwaysExpanded) return;

    // Accordion behavior - only one category open at a time
    if (this.activeCategory === categoryId) {
      this.activeCategory = null;
    } else {
      this.activeCategory = categoryId;
    }
  }

  navigate(route: string): void {
    this.router.navigate([route]);
    if (this.isMobile) {
      this.isMobileOpen = false;
    }
  }

  isRouteActive(linkRoute: string, currentRoute: string = this.currentRoute): boolean {
    if (linkRoute === '/dashboard') {
      return currentRoute === '/' || currentRoute === '/dashboard';
    }
    return currentRoute.startsWith(linkRoute);
  }

  isCategoryExpanded(categoryId: string): boolean {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category?.alwaysExpanded || this.activeCategory === categoryId;
  }

  getLinksByCategory(categoryId: string): SidebarLink[] {
    const links = this.sidebarLinks.filter(link => link.category === categoryId);
    
    // Filter by search query if exists
    if (this.searchQuery.trim()) {
      return links.filter(link => 
        link.label.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    
    return links;
  }

  getFilteredCategories(): SidebarCategory[] {
    if (!this.searchQuery.trim()) {
      return this.categories;
    }
    
    // Show categories that have matching links
    return this.categories.filter(category => 
      this.getLinksByCategory(category.id).length > 0
    );
  }

  getCategoryItemCount(categoryId: string): number {
    return this.getLinksByCategory(categoryId).length;
  }

  hasActiveLink(categoryId: string): boolean {
    return this.getLinksByCategory(categoryId).some(link => this.isRouteActive(link.route));
  }

  onSearchChange(event: any): void {
    // Defensive: event.target may be null, so check before accessing value
    const value = event && event.target ? event.target.value : '';
    this.searchQuery = value;

    // If searching, expand all categories with results
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
  logout():void{
    localStorage.clear();
    this.router.navigate(['/user/login']);
  }
}