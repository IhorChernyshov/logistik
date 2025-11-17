import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// Contact info type (email or location)
type InfoType = 'email' | 'location';

@Component({
  selector: 'app-contact-info-card',
  imports: [CommonModule],
  templateUrl: './contact-info-card.html',
  styleUrl: './contact-info-card.scss',
})
export class ContactInfoCardComponent {
  // Type of contact info (email or location)
  type = input.required<InfoType>();

  // Contact information text (email address or physical address)
  info = input.required<string>();

  // Copied state flag
  copied = signal<boolean>(false);

  // Copies info text to clipboard
  copyToClipboard(): void {
    navigator.clipboard.writeText(this.info()).then(() => {
      this.copied.set(true);
      setTimeout(() => {
        this.copied.set(false);
      }, 2000);
    });
  }

  // Returns appropriate icon class based on type
  getIconClass(): string {
    return this.type() === 'email' ? 'fa-solid fa-envelope' : 'fa-solid fa-location-dot';
  }
}
