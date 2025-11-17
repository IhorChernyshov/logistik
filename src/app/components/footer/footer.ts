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
        { label: 'Home', href: '#' },
        { label: 'Team', href: '#team' },
        { label: 'Security', href: '#security' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Team', href: '#team' },
        { label: 'Compliance & Security', href: '#security' },
        { label: 'Whitepaper', href: '#whitepaper' },
      ],
    },
    {
      title: 'News',
      links: [
        { label: 'Blog', href: '#blog' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'FAQ', href: '#faq' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'Privacy Terms', href: '#privacy' },
        { label: 'Terms & Conditions', href: '#terms' },
      ],
    },
  ]);
}
