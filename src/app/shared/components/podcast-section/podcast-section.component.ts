import { Component } from '@angular/core';
import { Button } from '@ntv360/component-pantry';
import { ParallaxDirective } from '../../directives/parallax.directive';
import { TiltDirective } from '../../directives/tilt.directive';

@Component({
  selector: 'app-podcast-section',
  standalone: true,
  imports: [Button, ParallaxDirective, TiltDirective],
  templateUrl: './podcast-section.component.html',
  styleUrl: './podcast-section.component.scss',
})
export class PodcastSectionComponent {

  /** Now-playing waveform bars shown beside the podcast title */
  protected readonly waveformBars: number[] = Array.from({ length: 5 }, (_, i) => i);

  /** Eyebrow label above the headline */
  protected readonly eyebrow: string = 'OUR PODCAST';

  /** First (bold) part of the headline */
  protected readonly headlineLead: string = 'Listen to';

  /** Second (italic) part of the headline — the podcast's name */
  protected readonly headlineTitle: string = 'Beyond the Words';

  /** Body copy, rendered via innerHTML for the bold/italic spans */
  protected readonly text: string =
    'Whether you are an <strong>advertiser, agency professional, media owner,</strong> or just fascinated by the interplay between <strong>digital signage and human behavior</strong>, <em>Beyond the Words</em> pulls back the curtain on the inner workings of Digital Out-of-Home. Tune in for an entertaining, educational look at a medium that’s impossible to ignore.';

  /** Spotify CTA label */
  protected readonly spotifyCta: string = 'Spotify';

  /** Apple Music CTA label */
  protected readonly appleMusicCta: string = 'Apple Music';
}
