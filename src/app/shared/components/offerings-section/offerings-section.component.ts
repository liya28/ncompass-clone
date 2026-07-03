import { Component, DestroyRef, afterNextRender, computed, inject, signal } from '@angular/core';
import { Button } from '@ntv360/component-pantry';

/** A single service shown in the 3D card-stack carousel */
interface Service {
  /** Tier badge label, e.g. "Foundational" */
  tier: string;
  /** Service name */
  name: string;
  /** Short supporting description */
  description: string;
}

@Component({
  selector: 'app-offerings-section',
  standalone: true,
  imports: [Button],
  templateUrl: './offerings-section.component.html',
  styleUrl: './offerings-section.component.scss',
})
export class OfferingsSectionComponent {
  private readonly destroyRef = inject(DestroyRef);

  /** Milliseconds between auto-advances */
  private static readonly AUTO_ADVANCE_MS = 6000;

  private autoAdvanceHandle: ReturnType<typeof setInterval> | undefined;

  /** Eyebrow label above the headline */
  protected readonly eyebrow: string = 'WHAT WE OFFER';

  /** Section headline */
  protected readonly headline: string = 'GO BEYOND THE SCREENS';

  /** Supporting subtext beneath the headline */
  protected readonly subtext: string = 'From digital billboards to full-scale digital marketing.';

  /** Text shown above the section-level CTA */
  protected readonly ctaPrompt: string = 'Ready to grow your business?';

  /** Section-level CTA label */
  protected readonly ctaLabel: string = 'Become a Dealer';

  /** Per-card CTA label */
  protected readonly cardCta: string = 'Learn More';

  /** All services available in the carousel */
  protected readonly services: Service[] = [
    { tier: 'Foundational', name: 'Google Business Profile Management', description: "Increase your customer's presence on Google and their Local SEO." },
    { tier: 'Foundational', name: 'Social Media Management', description: "Manage your customer's social media image and presence and increase engagement." },
    { tier: 'Foundational', name: 'Website Development', description: "A modern website is critical for developing Local SEO and your customer's brand." },
    { tier: 'Lead Gen', name: 'Social Media Advertising', description: 'Leverage Facebook & Instagram to identify prospects and send targeted messaging.' },
    { tier: 'Lead Gen', name: 'PPC (Pay Per Click)', description: "Places customers in front of prospects at the exact moment they're searching." },
    { tier: 'Branding', name: 'Display Advertising', description: 'Keep customers top of mind by retargeting prospects on apps and websites they frequent.' },
    { tier: 'Branding', name: 'OTT/CTV Advertising', description: 'Precise targeting and dynamic content on streaming platforms.' },
    { tier: 'Branding', name: 'Streaming Audio', description: 'Reach audiences as they listen to podcasts, music, and radio.' },
    { tier: 'Branding', name: 'YouTube Advertising', description: 'Build brand awareness among potential customers on YouTube.' },
  ];

  /** Index of the currently centered/featured service */
  protected readonly activeIndex = signal<number>(0);

  /**
   * The previous, current, and next service, in that order — the exact
   * window the 3D stack renders. Slot position (left/center/right) is
   * derived purely from each item's index within this array, so `@for`
   * only needs `let i = $index` to know how to place it.
   */
  protected readonly visibleServices = computed<Service[]>(() => {
    const total = this.services.length;
    const active = this.activeIndex();
    const previousIndex = (active - 1 + total) % total;
    const nextIndex = (active + 1) % total;
    return [this.services[previousIndex], this.services[active], this.services[nextIndex]];
  });

  constructor() {
    afterNextRender(() => this.startAutoAdvance());
    this.destroyRef.onDestroy(() => this.stopAutoAdvance());
  }

  /**
   * Advances the stack forward, wrapping around to the first service.
   * @returns {void}
   */
  protected next(): void {
    this.activeIndex.update((i) => (i + 1) % this.services.length);
  }

  /**
   * Steps the stack back, wrapping around to the last service.
   * @returns {void}
   */
  protected previous(): void {
    this.activeIndex.update((i) => (i - 1 + this.services.length) % this.services.length);
  }

  /**
   * Jumps directly to the service at the given index (from a progress dot).
   * @param {number} index - Index of the service to feature
   * @returns {void}
   */
  protected goTo(index: number): void {
    this.activeIndex.set(index);
  }

  /**
   * Pauses auto-advance while the carousel is hovered.
   * @returns {void}
   */
  protected onMouseEnter(): void {
    this.stopAutoAdvance();
  }

  /**
   * Resumes auto-advance once the cursor leaves the carousel.
   * @returns {void}
   */
  protected onMouseLeave(): void {
    this.startAutoAdvance();
  }

  /**
   * Starts the recurring auto-advance timer, guarding against a duplicate
   * interval if one is already running.
   * @returns {void}
   */
  private startAutoAdvance(): void {
    if (this.autoAdvanceHandle !== undefined) {
      return;
    }
    this.autoAdvanceHandle = setInterval(() => this.next(), OfferingsSectionComponent.AUTO_ADVANCE_MS);
  }

  /**
   * Stops the auto-advance timer, if one is running.
   * @returns {void}
   */
  private stopAutoAdvance(): void {
    clearInterval(this.autoAdvanceHandle);
    this.autoAdvanceHandle = undefined;
  }
}
