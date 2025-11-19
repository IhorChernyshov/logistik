import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactInfoCardComponent } from '../../contact-info-card/contact-info-card';
import { ScrollAnimateDirective } from '../../../directives/scroll-animate.directive';

@Component({
  selector: 'app-contact-details',
  imports: [CommonModule, ContactInfoCardComponent, ScrollAnimateDirective],
  templateUrl: './contact-details.html',
  styleUrl: './contact-details.scss',
})
export class ContactDetailsComponent {
  // Section title
  title = signal<string>('Details Information');

  // Company email address
  email = signal<string>('info@infinity-logisticverpackung.de');

  // Company physical address
  address = signal<string>('Infinity Logistik & Verpackung GmbH\nRobert-Bunsen-Straße 7\nD-79108 Freiburg im Breisgau\nGermany');
}
