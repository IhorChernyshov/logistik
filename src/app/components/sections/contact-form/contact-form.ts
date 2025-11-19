import { Component, inject, OnInit, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ScrollAnimateDirective } from '../../../directives/scroll-animate.directive';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule, CommonModule, ScrollAnimateDirective],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
})
export class ContactFormComponent implements OnInit {
  // Injected services for form building and HTTP requests
  private formBuilder = inject(FormBuilder);
  private http = inject(HttpClient);

  // Section title
  title = signal<string>('Kontaktieren Sie uns');

  // Section description
  description = signal<string>('Wir sind ein Team von Fachleuten mit langjähriger Erfahrung im Bereich Logistik und Verpackung.');

  // Reactive form group for contact form
  contactForm!: FormGroup;

  // Server-side validation error message
  serverValidationError = signal<string>('');

  // Success message after form submission
  successMessage = signal<string>('');

  // Flag to track form submission state
  isSubmitting = signal<boolean>(false);

  // Initializes the reactive form with validators
  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(64)]],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]]
    });

    // Clears server errors and success messages when form changes
    this.contactForm.valueChanges.subscribe(() => {
      this.serverValidationError.set('');
      this.successMessage.set('');
    });
  }

  // Getter for easy access to form controls
  get f(): { [key: string]: AbstractControl } {
    return this.contactForm.controls;
  }

  // Returns appropriate error message for name field based on validation state
  getNameErrorMessage(characters: number): string {
    if (this.f['name'].hasError('required')) {
      return 'Name ist erforderlich';
    } else if (this.f['name'].hasError('minlength')) {
      return `Name muss mindestens 2 Zeichen enthalten (aktuell: ${characters})`;
    } else if (this.f['name'].hasError('maxlength')) {
      return `Name darf maximal 50 Zeichen enthalten (aktuell: ${characters})`;
    }
    return '';
  }

  // Returns appropriate error message for email field based on validation state
  getEmailErrorMessage(characters: number): string {
    if (this.f['email'].hasError('required')) {
      return 'E-Mail ist erforderlich';
    } else if (this.f['email'].hasError('email')) {
      return 'Bitte geben Sie eine gültige E-Mail-Adresse ein';
    } else if (this.f['email'].hasError('maxlength')) {
      return `E-Mail darf maximal 64 Zeichen enthalten (aktuell: ${characters})`;
    }
    return '';
  }

  // Returns appropriate error message for message field based on validation state
  getMessageErrorMessage(characters: number): string {
    if (this.f['message'].hasError('required')) {
      return 'Nachricht ist erforderlich';
    } else if (this.f['message'].hasError('minlength')) {
      return `Nachricht muss mindestens 10 Zeichen enthalten (aktuell: ${characters})`;
    } else if (this.f['message'].hasError('maxlength')) {
      return `Nachricht darf maximal 500 Zeichen enthalten (aktuell: ${characters})`;
    }
    return '';
  }

  // Handles form submission with validation and HTTP request
  onSubmit(): void {
    // Removes focus from all fields
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    // Validates form and marks all fields as touched if invalid
    if (this.contactForm.invalid) {
      Object.keys(this.contactForm.controls).forEach(key =>
        this.contactForm.get(key)?.markAsTouched()
      );
      return;
    }

    this.isSubmitting.set(true);
    this.serverValidationError.set('');
    this.successMessage.set('');

    // Prepares contact data for submission
    const contactData = {
      name: this.contactForm.value.name,
      email: this.contactForm.value.email,
      message: this.contactForm.value.message
    };

    // Sends HTTP POST request to backend API
    this.http.post(`${environment.apiUrl}/api/v1/users/contact`, contactData).subscribe({
      next: (response: any) => {
        this.isSubmitting.set(false);
        this.contactForm.reset();
        this.successMessage.set('Vielen Dank für Ihre Nachricht! Wir werden uns bald bei Ihnen melden.');

        // Hides success message after 5 seconds
        setTimeout(() => {
          this.successMessage.set('');
        }, 5000);
      },
      error: (error) => {
        this.isSubmitting.set(false);
        this.serverValidationError.set(error.error?.message || 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
      }
    });
  }
}
