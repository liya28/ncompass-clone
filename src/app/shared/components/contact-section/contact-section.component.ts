import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from '@ntv360/component-pantry';
import { ParallaxDirective } from '../../directives/parallax.directive';

/** A single contact-info row (address, phone, or email) */
interface ContactInfo {
  /** Which inline icon to render for this row */
  icon: 'pin' | 'phone' | 'email';
  /** Row label, e.g. "Address" */
  label: string;
  /** Row value, e.g. the actual address/phone/email */
  value: string;
}

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [Button, FormsModule, ParallaxDirective],
  templateUrl: './contact-section.component.html',
  styleUrl: './contact-section.component.scss',
})
export class ContactSectionComponent {

  /** Eyebrow label above the headline */
  protected readonly eyebrow: string = 'GET IN TOUCH';

  /** Section headline */
  protected readonly headline: string = 'Ready to Own Your Market?';

  /** Supporting subtext beneath the headline */
  protected readonly subtext: string =
    'Fill out the form and a member of our team will reach out to schedule a call and walk you through the opportunity.';

  /** Contact info rows displayed beneath the subtext */
  protected readonly contactInfo: ContactInfo[] = [
    { icon: 'pin', label: 'Address', value: '5148 Cola Blvd Bldg 5, Suite 100, Lakewood, CO 80401' },
    { icon: 'phone', label: 'Phone', value: '(770) 580-0990' },
    { icon: 'email', label: 'Email', value: 'info@n-compass.tv' },
  ];

  /** Submit button label */
  protected readonly submitCta: string = 'Schedule a call';

  /** First name form field */
  protected readonly firstName = signal<string>('');

  /** Last name form field */
  protected readonly lastName = signal<string>('');

  /** Email address form field */
  protected readonly email = signal<string>('');

  /** Phone number form field */
  protected readonly phone = signal<string>('');

  /** Message form field */
  protected readonly message = signal<string>('');
}
