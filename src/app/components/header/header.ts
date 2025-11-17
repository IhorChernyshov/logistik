import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
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
export class HeaderComponent {
  // Mobile menu open state
  mobileMenuOpen = signal<boolean>(false);

  // Navigation links array
  navLinks = signal<NavLink[]>([
    { label: 'Über uns', href: '#about' },
    { label: 'Stellenangebote', href: '#jobs' },
    { label: 'Kontakte', href: '#contact' },
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
}
