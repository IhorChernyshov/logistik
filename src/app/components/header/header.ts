import { Component, signal, HostListener, OnInit, AfterViewInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ButtonComponent } from '../button/button';

// Navigation link interface
interface NavLink {
  label: string;
  href: string;
}

@Component({
  selector: 'app-header',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent implements OnInit, AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);
  readonly isBrowser: boolean = isPlatformBrowser(this.platformId);

  // Mobile menu open state
  mobileMenuOpen = signal<boolean>(false);

  // Header hidden state - true when scrolling down
  isHeaderHidden = signal<boolean>(false);

  // Previous scroll position for direction detection
  private lastScrollTop = 0;

  // Navigation links array
  navLinks = signal<NavLink[]>([
    { label: 'Warum wir', href: '#why-choose' },
    { label: 'Arbeitgeber', href: '#employer' },
    { label: 'Stellenangebote', href: '#jobs' },
    { label: 'Bewertungen', href: '#testimonials' },
  ]);

  // Toggles mobile menu visibility
  toggleMobileMenu(): void {
    this.mobileMenuOpen.set(!this.mobileMenuOpen());
  }

  // Closes mobile menu
  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  // Handles navigation link click
  onNavLinkClick(event: Event, href: string): void {
    event.preventDefault();
    this.closeMobileMenu();

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Handles CTA button click
  onCtaClick(): void {
    this.closeMobileMenu();
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Gets current scroll position
  private getScrollTop(): number {
    if (!this.isBrowser) return 0;
    return window.pageYOffset || document.documentElement?.scrollTop || document.body?.scrollTop || 0;
  }

  // Window scroll listener - detects scroll direction and hides/shows header
  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (!this.isBrowser) return;

    const currentScrollTop = this.getScrollTop();

    // Don't hide header if we're at the top
    if (currentScrollTop <= 100) {
      this.isHeaderHidden.set(false);
      this.lastScrollTop = currentScrollTop;
      return;
    }

    // Scrolling down - hide header
    if (currentScrollTop > this.lastScrollTop) {
      this.isHeaderHidden.set(true);
    }
    // Scrolling up - show header
    else {
      this.isHeaderHidden.set(false);
    }

    this.lastScrollTop = currentScrollTop;
  }

  // Lifecycle hook - initialize on component load
  ngOnInit(): void {
    if (!this.isBrowser) return;
    this.lastScrollTop = this.getScrollTop();
  }

  // Lifecycle hook - check scroll position after view init
  ngAfterViewInit(): void {
    if (!this.isBrowser) return;
    this.lastScrollTop = this.getScrollTop();
  }
}
