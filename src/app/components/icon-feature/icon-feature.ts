import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon-feature',
  imports: [CommonModule],
  templateUrl: './icon-feature.html',
  styleUrl: './icon-feature.scss',
})
export class IconFeatureComponent {
  // Icon class (e.g., "fa-solid fa-truck", or custom icon class)
  iconClass = input<string>('');

  // Icon URL for SVG image (alternative to iconClass)
  iconUrl = input<string>('');

  // Feature title text
  title = input.required<string>();

  // Feature description text
  description = input.required<string>();
}
