import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

// Button type options for different visual variants
type ButtonType = 'primary' | 'outline' | 'white';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class ButtonComponent {
  // Button text content
  text = input.required<string>();

  // Button type modifier (primary, outline, white)
  type = input<ButtonType>('primary');

  // Disabled state of the button
  disabled = input<boolean>(false);

  // Full width button flag
  fullWidth = input<boolean>(false);

  // Click event emitter
  clicked = output<void>();

  // Handles button click and emits event
  handleClick(): void {
    if (!this.disabled()) {
      this.clicked.emit();
    }
  }
}
