import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../button/button';
import { FadeInDirective } from '../../../directives/fade-in.directive';

@Component({
  selector: 'app-hero-section',
  imports: [CommonModule, ButtonComponent, FadeInDirective],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.scss',
})
export class HeroSectionComponent {
  // Hero title text
  title = input<string>('Beste Logistik & Verpackungsfirma 2025');

  // Hero subtitle text
  subtitle = input<string>('Infinity Logistik & Verpackung – Zuverlässigkeit und Qualität bei jeder Lieferung');

  // CTA button text
  ctaText = input<string>('Los geht\'s');

  // Background image URL
  backgroundImage = input<string>('/images/hero.png');

  // Handles CTA button click
  onCtaClick(): void {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
