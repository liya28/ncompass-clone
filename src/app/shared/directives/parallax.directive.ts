import { DestroyRef, Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';

/**
 * Shifts the host element's `translateY` as the page scrolls, based on how
 * far its center sits from the viewport center. Purely additive/decorative —
 * intended for background layers, never for content whose visibility must
 * never depend on JS running (see ScrollRevealDirective's history for why).
 * A no-op during SSR and in any environment without `window`.
 */
@Directive({
  selector: '[appParallax]',
  standalone: true,
})
export class ParallaxDirective {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  /** Fraction of the viewport-center offset applied as translateY (e.g. 0.2 = 20% speed) */
  public readonly speed = input<number>(0.2);

  constructor() {
    afterNextRender(() => {
      if (typeof window === 'undefined') {
        return;
      }

      const element = this.elementRef.nativeElement;
      let ticking = false;

      const update = (): void => {
        const rect = element.getBoundingClientRect();
        const viewportCenter = window.innerHeight / 2;
        const elementCenter = rect.top + rect.height / 2;
        const offset = (viewportCenter - elementCenter) * this.speed();
        element.style.transform = `translateY(${offset}px)`;
        ticking = false;
      };

      const onScroll = (): void => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      };

      update();
      window.addEventListener('scroll', onScroll, { passive: true });
      this.destroyRef.onDestroy(() => window.removeEventListener('scroll', onScroll));
    });
  }
}
