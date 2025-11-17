import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testimonial-card',
  imports: [CommonModule],
  templateUrl: './testimonial-card.html',
  styleUrl: './testimonial-card.scss',
})
export class TestimonialCardComponent {
  // Testimonial text content
  text = input.required<string>();

  // Person name
  name = input.required<string>();

  // Person job title or position
  position = input.required<string>();

  // Avatar image URL
  avatarUrl = input.required<string>();

  // Avatar alt text for accessibility
  avatarAlt = input<string>('');
}
