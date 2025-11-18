import { Component, signal, ElementRef, QueryList, ViewChildren, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberedCardComponent } from '../../numbered-card/numbered-card';

// Card data interface
interface CardData {
  number: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-why-choose-us',
  imports: [CommonModule, NumberedCardComponent],
  templateUrl: './why-choose-us.html',
  styleUrl: './why-choose-us.scss',
})
export class WhyChooseUsComponent implements AfterViewInit, OnDestroy {
  // Section title
  title = signal<string>('Warum wählen Mitarbeiter<br>Infinity Logistik & Verpackung?');

  // Active card number for highlighting
  activeCardNumber = signal<number>(1);

  // Reference to card wrapper elements
  @ViewChildren('cardElement', { read: ElementRef })
  cardElements!: QueryList<ElementRef<HTMLElement>>;

  // IntersectionObserver instance
  private observer: IntersectionObserver | null = null;

  // Cards data array
  cards = signal<CardData[]>([
    {
      number: 1,
      title: 'Direkte, offizielle Anstellung',
      description: 'Wir stellen unsere Mitarbeiter direkt nach deutschem Arbeitsrecht ein. Alle Prozesse sind strikt geregelt, transparent und rechtlich abgesichert.',
    },
    {
      number: 2,
      title: 'Transparente und pünktliche<br>Vergütung',
      description: 'Pünktliche und vollständig nachvollziehbare Zahlungen gehören zu unseren wichtigsten Prinzipien. Jeder Mitarbeiter versteht jederzeit die Struktur seines Einkommens.',
    },
    {
      number: 3,
      title: 'Moderne Arbeitsumgebungen',
      description: 'Unsere Logistik- und Verpackungsstandorte entsprechen den aktuellen deutschen Qualitäts- und Sicherheitsstandards. Organisierte Arbeitsbereiche, Ergonomie und Prozesskontrolle gewährleisten sicheres und effizientes Arbeiten.',
    },
    {
      number: 4,
      title: 'Hohe Sicherheits- und<br>Qualitätsstandards',
      description: 'Wir arbeiten streng nach deutschen Normen (Arbeitsschutz, Unfallvermeidung, Prozesskontrolle). Vor Arbeitsbeginn erhält jeder Mitarbeiter eine professionelle Einarbeitung.',
    },
  ]);

  // Initialize IntersectionObserver after view is ready
  ngAfterViewInit(): void {
    this.setupIntersectionObserver();
  }

  // Setup IntersectionObserver to track which card is in the viewport
  private setupIntersectionObserver(): void {
    // Observer options - trigger when card enters middle of viewport
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0,
    };

    // Observer callback - updates active card number when intersection changes
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cardId = entry.target.getAttribute('data-card-id');
          if (cardId) {
            this.activeCardNumber.set(parseInt(cardId, 10));
          }
        }
      });
    }, options);

    // Observe each card element
    this.cardElements.forEach((elementRef) => {
      this.observer?.observe(elementRef.nativeElement);
    });
  }

  // Cleanup observer on component destroy
  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}
