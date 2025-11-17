import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header';
import { FooterComponent } from '../../components/footer/footer';
import { HeroSectionComponent } from '../../components/sections/hero-section/hero-section';
import { WhyChooseUsComponent } from '../../components/sections/why-choose-us/why-choose-us';
import { DirectEmployerComponent } from '../../components/sections/direct-employer/direct-employer';
import { CareerDevelopmentComponent } from '../../components/sections/career-development/career-development';
import { TestimonialsComponent } from '../../components/sections/testimonials/testimonials';
import { ContactFormComponent } from '../../components/sections/contact-form/contact-form';
import { ContactDetailsComponent } from '../../components/sections/contact-details/contact-details';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    HeroSectionComponent,
    WhyChooseUsComponent,
    DirectEmployerComponent,
    CareerDevelopmentComponent,
    TestimonialsComponent,
    ContactFormComponent,
    ContactDetailsComponent,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomePage {
  // HomePage component serves as container for all landing page sections
}
