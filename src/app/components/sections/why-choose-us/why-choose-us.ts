import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberedCardComponent } from '../../numbered-card/numbered-card';
import { ScrollAnimateDirective } from '../../../directives/scroll-animate.directive';

// Card data interface
interface CardData {
  number: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-why-choose-us',
  imports: [CommonModule, NumberedCardComponent, ScrollAnimateDirective],
  templateUrl: './why-choose-us.html',
  styleUrl: './why-choose-us.scss',
})
export class WhyChooseUsComponent {
  // Section title
  title = signal<string>('Warum wählen Mitarbeiter Infinity Logistik & Verpackung?');

  // Section subtitle
  subtitle = signal<string>('Step by step guide:');

  // Cards data array
  cards = signal<CardData[]>([
    {
      number: 1,
      title: 'Direkte, offizielle Anstellung',
      description: 'Wir stellen unsere Mitarbeiter direkt nach deutschem Arbeitsrecht ein. Alle Prozesse sind strikt geregelt, transparent und rechtlich abgesichert.',
    },
    {
      number: 2,
      title: 'Transparente und pünktliche Vergütung',
      description: 'Pünktliche und vollständig nachvollziehbare Zahlungen gehören zu unseren wichtigsten Prinzipien. Jeder Mitarbeiter versteht jederzeit die Struktur seines Einkommens.',
    },
    {
      number: 3,
      title: 'Moderne Arbeitsumgebungen',
      description: 'Unsere Logistik- und Verpackungsstandorte entsprechen den aktuellen deutschen Qualitäts- und Sicherheitsstandards. Organisierte Arbeitsbereiche, Ergonomie und Prozesskontrolle gewährleisten sicheres und effizientes Arbeiten.',
    },
    {
      number: 4,
      title: 'Hohe Sicherheits- und Qualitätsstandards',
      description: 'Wir arbeiten streng nach deutschen Normen (Arbeitsschutz, Unfallvermeidung, Prozesskontrolle). Vor Arbeitsbeginn erhält jeder Mitarbeiter eine professionelle Einarbeitung.',
    },
  ]);
}
