import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-card',
  imports: [CommonModule],
  templateUrl: './job-card.html',
  styleUrl: './job-card.scss',
})
export class JobCardComponent {
  // Job title text
  title = input.required<string>();

  // Job description text
  description = input.required<string>();

  // Image URL for the job photo
  imageUrl = input.required<string>();

  // Image alt text for accessibility
  imageAlt = input<string>('Job photo');
}
