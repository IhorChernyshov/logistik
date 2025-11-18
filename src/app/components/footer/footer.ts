import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// Footer link interface
interface FooterLink {
  label: string;
  href: string;
}

// Footer column interface
interface FooterColumn {
  title: string;
  links: FooterLink[];
}

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class FooterComponent {
  // Current year for copyright
  currentYear = signal<number>(new Date().getFullYear());

  // Company name for footer
  companyName = signal<string>('Infinity Logistik & Verpackung');

  // Footer columns with navigation links
  columns = signal<FooterColumn[]>([
    {
      title: 'Quick Links',
      links: [
        { label: 'Warum wir', href: '#why-choose' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Arbeitgeber', href: '#employer' },
      ],
    },
    {
      title: 'News',
      links: [
        { label: 'Stellenangebote', href: '#jobs' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Bewertungen', href: '#testimonials' },
      ],
    },
  ]);

  // Handles footer link click with smooth scroll
  onLinkClick(event: Event, href: string): void {
    event.preventDefault();

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
