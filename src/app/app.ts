import { Component } from '@angular/core';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { HeroSectionComponent } from './shared/components/hero-section/hero-section.component';
import { FeaturesSectionComponent } from './shared/components/features-section/features-section.component';
import { OfferingsSectionComponent } from './shared/components/offerings-section/offerings-section.component';
import { PodcastSectionComponent } from './shared/components/podcast-section/podcast-section.component';
import { TestimonialsSectionComponent } from './shared/components/testimonials-section/testimonials-section.component';
import { ContactSectionComponent } from './shared/components/contact-section/contact-section.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroSectionComponent,
    FeaturesSectionComponent,
    OfferingsSectionComponent,
    PodcastSectionComponent,
    TestimonialsSectionComponent,
    ContactSectionComponent,
    FooterComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {}