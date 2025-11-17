import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconFeatureComponent } from '../../icon-feature/icon-feature';
import { ScrollAnimateDirective } from '../../../directives/scroll-animate.directive';

// Feature data interface
interface FeatureData {
  iconUrl: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-direct-employer',
  imports: [CommonModule, IconFeatureComponent, ScrollAnimateDirective],
  templateUrl: './direct-employer.html',
  styleUrl: './direct-employer.scss',
})
export class DirectEmployerComponent {
  // Section title
  title = signal<string>('Direkter Arbeitgeber');

  // Section description
  description = signal<string>('Wir sind ein direkter Arbeitgeber in Deutschland und bieten zahlreiche Stellen in verschiedenen Bereichen an. Bei uns erhalten Sie eine legale Anstellung - ohne Vermittler und ohne versteckte Gebühren.');

  // Photo description text
  photoDescription = signal<string>('Alle Bedingungen sind transparent und vertraglich klar geregelt. Wir garantieren ein stabiles Gehalt und unterstützen Sie in allen Phasen Ihrer Beschäftigung.');

  // Large warehouse photo URL
  photoUrl = signal<string>('/images/contact.jpg');

  // Features array
  features = signal<FeatureData[]>([
    {
      iconUrl: '/icons/lift-car.svg',
      title: 'Lagerarbeiter',
      description: 'Annahme und Entladung von Waren. Sortierung, Etikettierung und Einlagerung im Lager. Kommissionierung und Vorbereitung von Bestellungen für den Versand.',
    },
    {
      iconUrl: '/icons/truck.svg',
      title: 'Fahrer',
      description: 'Lieferung von Waren und Materialien an die vorgesehenen Standorte. Kontrolle des technischen Zustands des Fahrzeugs. Betankung und kleinere Wartungsarbeiten. Verantwortung für die pünktliche und sichere Lieferung.',
    },
    {
      iconUrl: '/icons/scan barcode.svg',
      title: 'Hilfsarbeiter',
      description: 'Ausführung einfacher Hilfstätigkeiten in Produktion, Lager oder Bau. Unterstützung von Facharbeitern bei verschiedenen Aufgaben. Tätigkeiten wie Tragen, Verpacken, Reinigen oder Vorbereiten von Materialien.',
    },
  ]);
}
