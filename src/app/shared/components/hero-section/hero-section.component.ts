import { Component, DestroyRef, HostListener, inject, signal } from '@angular/core';
import { Button } from '@ntv360/component-pantry';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [Button],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
})
export class HeroSectionComponent {
  private readonly destroyRef = inject(DestroyRef);

  /** Fraction of scroll distance the parallax target moves per pixel scrolled */
  private static readonly PARALLAX_SPEED = 0.6;

  /** Fraction of the remaining distance closed each frame — lower is smoother/laggier */
  private static readonly EASE_FACTOR = 0.08;

  /** Scroll-derived position the eased value is chasing */
  private targetPositionY = 0;

  private animationFrameHandle: number | undefined;

  /** Angles (in degrees) for the decorative compass motif's tick marks */
  protected readonly compassTicks: number[] = Array.from({ length: 12 }, (_, i) => i * 30);

  /** Vertical background-position offset (px), eased toward the scroll target each frame for the parallax effect */
  protected readonly backgroundPositionY = signal<number>(0);

  /** First, larger headline line */
  protected readonly headlineLine1: string = 'COMMUNITY FOCUSED';

  /** Second headline line, in the brand accent color */
  protected readonly headlineLine2: string = 'INDOOR DIGITAL BILLBOARDS';

  /** Supporting subtext beneath the headline */
  protected readonly subtext: string =
    "N-Compass TV's business model boasts high revenue potential and low startup costs.";

  /** Primary CTA button label */
  protected readonly primaryCta: string = 'Become a Dealer';

  /** Secondary CTA button label */
  protected readonly secondaryCta: string = 'Learn More';

  constructor() {
    this.destroyRef.onDestroy(() => {
      if (this.animationFrameHandle !== undefined) {
        cancelAnimationFrame(this.animationFrameHandle);
      }
    });
  }

  /**
   * Updates the scroll-derived parallax target. Bound directly to
   * `window:scroll` (rather than `background-attachment: fixed`, which
   * mobile browsers routinely ignore) so the effect behaves consistently
   * across browsers. The actual visible position is eased toward this
   * target by the animation loop, not set directly, so it trails smoothly
   * instead of snapping on every scroll event.
   * @returns {void}
   */
  @HostListener('window:scroll')
  protected onWindowScroll(): void {
    this.targetPositionY = window.scrollY * HeroSectionComponent.PARALLAX_SPEED;
    if (this.animationFrameHandle === undefined) {
      this.animationFrameHandle = requestAnimationFrame(() => this.tickParallax());
    }
  }

  /**
   * Eases `backgroundPositionY` toward `targetPositionY` by one frame's
   * worth of distance, re-scheduling itself until the two are close enough
   * to snap together, then stops rather than looping forever.
   * @returns {void}
   */
  private tickParallax(): void {
    const current = this.backgroundPositionY();
    const delta = this.targetPositionY - current;

    if (Math.abs(delta) < 0.05) {
      this.backgroundPositionY.set(this.targetPositionY);
      this.animationFrameHandle = undefined;
      return;
    }

    this.backgroundPositionY.set(current + delta * HeroSectionComponent.EASE_FACTOR);
    this.animationFrameHandle = requestAnimationFrame(() => this.tickParallax());
  }
}
