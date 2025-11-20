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

  // Section description
  description = signal<string>('Unsere Kunden schätzen unsere Zuverlässigkeit, Qualität und persönliche Betreuung. Hier finden Sie einige echte Rückmeldungen von Menschen, die bereits mit uns zusammengearbeitet haben.');

  // Large photo URL
  photoUrl = signal<string>('/images/contact.jpg');

  // Photo alt text
  photoAlt = signal<string>('Infinity Logistik Customer');

  // Testimonials array
  testimonials = signal<TestimonialData[]>([
    {
      text: 'Ich bin ohne Erfahrung gekommen und wurde direkt vor Ort eingearbeitet. Die Arbeit ist körperlich nicht schwer und die Bezahlung ist fair. Es gibt manchmal stressige Tage, aber insgesamt bin ich zufrieden. Wichtig ist, dass Stabilität und eine offizielle Anstellung geboten werden.',
      name: 'Jamshid K.',
      position: 'Hilfsarbeiter',
      avatarUrl: '/avatars/Jamshid K.JPG',
    },
    {
      text: 'Ich arbeite seit einem halben Jahr im Unternehmen. Der Lohn wird immer pünktlich gezahlt, die Arbeitsbedingungen sind gut und das Team ist freundlich. Die Geschäftsleitung unterstützt uns und hilft bei neuen Aufgaben. Ich fühle mich hier sicher und habe Vertrauen in meine Arbeit.',
      name: 'Hanna',
      position: 'Lagerarbeiterin',
      avatarUrl: '/avatars/hanna.png',
    },
    {
      text: 'Die Zusammenarbeit mit diesem Logistikunternehmen war äußerst zuverlässig. Alle Lieferungen kamen pünktlich und in einwandfreiem Zustand an. Besonders schätze ich die klare Kommunikation und die flexible Anpassung an unsere Bedürfnisse.',
      name: 'Bahrom M.',
      position: 'Unternehmer',
      avatarUrl: '/avatars/Bahrom M.JPG',
    },
    {
      text: 'Ich nutze regelmäßig die Verpackungs- und Versandservices. Die Ware wird sorgfältig behandelt und sicher verpackt, was meinen Kunden sehr wichtig ist. Dank der professionellen Arbeit konnte ich mein Geschäft deutlich effizienter gestalten.',
      name: 'Olga',
      position: 'Online-Shop-Betreiberin',
      avatarUrl: '/avatars/sabine.png',
    },
  ]);
}
