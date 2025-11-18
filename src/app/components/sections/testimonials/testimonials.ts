import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestimonialCardComponent } from '../../testimonial-card/testimonial-card';
import { ScrollAnimateDirective } from '../../../directives/scroll-animate.directive';

// Testimonial data interface
interface TestimonialData {
  text: string;
  name: string;
  position: string;
  avatarUrl: string;
}

@Component({
  selector: 'app-testimonials',
  imports: [CommonModule, TestimonialCardComponent, ScrollAnimateDirective],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.scss',
})
export class TestimonialsComponent {
  // Section title
  title = signal<string>('Feedback unserer Kunden');

  // Large photo URL
  photoUrl = signal<string>('/images/contact.jpg');

  // Photo alt text
  photoAlt = signal<string>('Infinity Logistik Customer');

  // Testimonials array
  testimonials = signal<TestimonialData[]>([
    {
      text: '„Ich bin ohne Erfahrung gekommen und wurde direkt vor Ort eingearbeitet. Die Arbeit ist körperlich nicht schwer und die Bezahlung ist fair. Es gibt manchmal stressige Tage, aber insgesamt bin ich zufrieden. Wichtig ist, dass Stabilität und eine offizielle Anstellung geboten werden."',
      name: 'Oleg',
      position: 'Hilfsarbeiter',
      avatarUrl: 'https://ui-avatars.com/api/?name=Oleg&size=100&background=0E293F&color=fff',
    },
    {
      text: 'Ich arbeite seit einem halben Jahr im Unternehmen. Der Lohn wird immer pünktlich gezahlt, die Arbeitsbedingungen sind gut und das Team ist freundlich. Die Geschäftsleitung unterstützt uns und hilft bei neuen Aufgaben. Ich fühle mich hier sicher und habe Vertrauen in meine Arbeit.',
      name: 'Hanna',
      position: 'Lagerarbeiterin',
      avatarUrl: 'https://ui-avatars.com/api/?name=Hanna&size=100&background=0E293F&color=fff',
    },
    {
      text: 'Die Zusammenarbeit mit diesem Logistikunternehmen war äußerst zuverlässig. Alle Lieferungen kamen pünktlich und in einwandfreiem Zustand an. Besonders schätze ich die klare Kommunikation und die flexible Anpassung an unsere Bedürfnisse.',
      name: 'Thomas M.',
      position: 'Unternehmer',
      avatarUrl: 'https://ui-avatars.com/api/?name=Thomas+M&size=100&background=0E293F&color=fff',
    },
    {
      text: 'Ich nutze regelmäßig die Verpackungs- und Versandservices. Die Ware wird sorgfältig behandelt und sicher verpackt, was meinen Kunden sehr wichtig ist. Dank der professionellen Arbeit konnte ich mein Geschäft deutlich effizienter gestalten.',
      name: 'Sabine K.',
      position: 'Online-Shop-Betreiberin',
      avatarUrl: 'https://ui-avatars.com/api/?name=Sabine+K&size=100&background=0E293F&color=fff',
    },
  ]);
}
