import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-numbered-card',
  imports: [CommonModule],
  templateUrl: './numbered-card.html',
  styleUrl: './numbered-card.scss',
})
export class NumberedCardComponent {
  // Card number (1-4)
  number = input.required<number>();

  // Card title text
  title = input.required<string>();

  // Card description text
  description = input.required<string>();

  // Show "Read in Full" link flag
  showReadMore = input<boolean>(true);

  // Active state for number highlighting
  isActive = input<boolean>(false);
}
