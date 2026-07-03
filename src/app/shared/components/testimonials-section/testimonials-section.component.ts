import { Component } from '@angular/core';
import { Button } from '@ntv360/component-pantry';
import { TiltDirective } from '../../directives/tilt.directive';

/** A single dealer testimonial card */
interface Testimonial {
  /** Quoted testimonial text */
  quote: string;
  /** Dealer's name */
  name: string;
  /** Dealer's city/region */
  location: string;
  /** Path to the dealer's headshot */
  avatar: string;
}

@Component({
  selector: 'app-testimonials-section',
  standalone: true,
  imports: [Button, TiltDirective],
  templateUrl: './testimonials-section.component.html',
  styleUrl: './testimonials-section.component.scss',
})
export class TestimonialsSectionComponent {

  /** Eyebrow label above the headline */
  protected readonly eyebrow: string = 'WHAT THEY SAY';

  /** Section headline */
  protected readonly headline: string = 'TRUSTED BY DEALERS NATIONWIDE';

  /** Supporting subtext beneath the headline */
  protected readonly subtext: string =
    'See how N-Compass TV dealers are building thriving businesses across the country.';

  /** CTA label beneath the testimonial cards */
  protected readonly cta: string = 'Become a dealer';

  /** Dealer testimonials rendered in the grid */
  protected readonly testimonials: Testimonial[] = [
    {
      quote:
        "I was looking for an opportunity that didn't require too much down but would allow me to be my own boss and make a great living. I exceeded my sales goals in my first year.",
      name: 'Jim Montoya',
      location: 'Grand Junction, Colorado',
      avatar: 'assets/images/testimonial-jim.png',
    },
    {
      quote:
        'Just over a year in, we are seeing recurring revenue that is covering costs and showing a profit. With over 90 screens up and rolling, we are excited about the future.',
      name: 'Bill Christman',
      location: 'St. Clair Shores, MI',
      avatar: 'assets/images/testimonial-bill.png',
    },
    {
      quote:
        "My favorite part about this business is I'm not alone. From continued training to answering my questions — they cheer me along! I can highly recommend being a dealer.",
      name: 'Susan Thompson',
      location: 'Michiana',
      avatar: 'assets/images/testimonial-susan.png',
    },
  ];
}
