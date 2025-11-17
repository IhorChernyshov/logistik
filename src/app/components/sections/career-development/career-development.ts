import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobCardComponent } from '../../job-card/job-card';
import { ScrollAnimateDirective } from '../../../directives/scroll-animate.directive';

// Job card data interface
interface JobData {
  title: string;
  description: string;
  imageUrl: string;
}

@Component({
  selector: 'app-career-development',
  imports: [CommonModule, JobCardComponent, ScrollAnimateDirective],
  templateUrl: './career-development.html',
  styleUrl: './career-development.scss',
})
export class CareerDevelopmentComponent {
  // Section title
  title = signal<string>('Karriereentwicklung und Aufstiegsmöglichkeiten');

  // Section description
  description = signal<string>('Wir fördern verantwortungsbewusste, motivierte und zuverlässige Mitarbeiter');

  // Jobs array
  jobs = signal<JobData[]>([
    {
      title: 'Senior-Lagerarbeiter',
      description: 'Hauptaufgabe: Kontrolle der Lagerqualität, der Prozesse und Begleitung der Dokumentation. Vermeidung von Fehlern und Mängeln.',
      imageUrl: '/images/why-us1.jpg',
    },
    {
      title: 'Schichtleiter / Teamleiter',
      description: 'Hauptaufgabe: Führung eines Lager- oder Logistikteams. Aufgabenzuweisung und Überwachung der Prozessabläufe.',
      imageUrl: '/images/why-us2.jpg',
    },
    {
      title: 'Qualitätsmitarbeiter / Qualitätsspezialist',
      description: 'Hauptaufgabe: Kontrolle der Warenqualität, der Verpackung und der Dokumentation sowie Vermeidung von Fehlern.',
      imageUrl: '/images/why-us3.jpg',
    },
    {
      title: 'Logistikprozess-Koordinator',
      description: 'Hauptaufgabe: Sicherstellung eines reibungslosen und effizienten Informationsflusses zwischen Abteilungen, Speditionen und dem Lager.',
      imageUrl: '/images/why-us4.jpg',
    },
  ]);
}
