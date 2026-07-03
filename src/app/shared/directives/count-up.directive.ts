import { Directive, afterNextRender, input, signal } from '@angular/core';

/**
 * Animates an exported `current` signal from 0 up to `appCountUp` using an
 * ease-out curve, starting as soon as the page renders. Consume via a
 * template reference, e.g.:
 * `<span [appCountUp]="4000" #stat="countUp">{{ stat.current() }}</span>`.
 *
 * Deliberately does NOT gate on IntersectionObserver — that was tried and
 * proved unreliable in practice (see ScrollRevealDirective's history), and
 * for a number that's meant to display a fact, "stuck at 0" is worse than
 * "already finished counting by the time you scroll to it".
 */
@Directive({
  selector: '[appCountUp]',
  standalone: true,
  exportAs: 'countUp',
})
export class CountUpDirective {
  /** Target number to count up to */
  public readonly appCountUp = input.required<number>();

  /** Duration of the count-up animation in milliseconds */
  public readonly duration = input<number>(1400);

  /** Current animated value, read by the template via the `countUp` export */
  public readonly current = signal<number>(0);

  constructor() {
    afterNextRender(() => this.animate());
  }

  /**
   * Steps `current` from 0 to the target value using a fixed number of
   * `setTimeout` ticks. Deliberately avoids `requestAnimationFrame` with a
   * wall-clock progress check — that loop never reliably terminated outside
   * a real browser (test environments, some real-world setups), leaving it
   * spinning indefinitely. A hard step counter always terminates.
   * @returns {void}
   */
  private animate(): void {
    const target = this.appCountUp();
    const steps = 30;
    const stepDuration = this.duration() / steps;
    let stepIndex = 0;

    const tick = (): void => {
      stepIndex++;
      const progress = stepIndex / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      this.current.set(Math.round(eased * target));
      if (stepIndex < steps) {
        setTimeout(tick, stepDuration);
      }
    };

    setTimeout(tick, stepDuration);
  }
}
