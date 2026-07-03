import { Component } from '@angular/core';
import { Button } from '@ntv360/component-pantry';
import { CountUpDirective } from '../../directives/count-up.directive';
import { TiltDirective } from '../../directives/tilt.directive';

/** A single stat displayed in the stats row */
interface Stat {
  /** Which inline icon to render for this stat */
  icon: 'cursor' | 'monitor' | 'map';
  /** Static display value, used for stats that aren't a count-up (e.g. a year) */
  value?: string;
  /** Numeric target for the count-up animation */
  countTo?: number;
  /** Text appended after the animated number, e.g. "+ screens" */
  suffix?: string;
  /** Supporting label beneath the value */
  label: string;
}

@Component({
  selector: 'app-features-section',
  standalone: true,
  imports: [Button, CountUpDirective, TiltDirective],
  templateUrl: './features-section.component.html',
  styleUrl: './features-section.component.scss',
})
export class FeaturesSectionComponent {

  /** Eyebrow label for the "Own Your Market" block */
  protected readonly modelEyebrow: string = 'OUR MODEL';

  /** Headline for the "Own Your Market" block */
  protected readonly modelHeadline: string = 'OWN YOUR MARKET';

  /** Condensed body copy for the "Own Your Market" block, rendered via innerHTML for the bold spans */
  protected readonly modelText: string =
    'Our dealership model empowers you to <strong>own and operate your own digital marketing business</strong>, specializing in <strong>indoor digital billboards</strong> and a full suite of marketing services. Build a <strong>multi-stream revenue</strong> model as your community’s go-to marketing expert.';

  /** Eyebrow label for the "Leading Since 2008" block */
  protected readonly journeyEyebrow: string = 'OUR JOURNEY';

  /** Headline for the "Leading Since 2008" block */
  protected readonly journeyHeadline: string = 'LEADING SINCE 2008';

  /** Condensed body copy for the "Leading Since 2008" block, rendered via innerHTML for the bold spans */
  protected readonly journeyText: string =
    'Since 2008, <strong>N-Compass TV has been at the forefront of transforming community-based advertising</strong> through a nationwide network of owner-operated indoor digital billboards. As the <strong>Digital out-of-home (DOOH) advertising sector</strong> grows, we’re leading the way with a dealer-based approach built for community-focused growth.';

  /** Shared CTA label used by both blocks in this section */
  protected readonly cta: string = 'Become a dealer';

  /** Stats displayed between the two content blocks */
  protected readonly stats: Stat[] = [
    { icon: 'cursor', value: 'Since 2008', label: 'in business' },
    { icon: 'monitor', countTo: 4000, suffix: '+ screens', label: 'nationwide' },
    { icon: 'map', countTo: 250, suffix: '+ Cities', label: 'across the United States' },
  ];
}
