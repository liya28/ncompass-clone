import { Directive, ElementRef, inject } from '@angular/core';

/**
 * Applies a subtle 3D tilt to the host element that follows the cursor,
 * resetting on mouse leave. Purely a hover enhancement — never affects
 * visibility, so there's nothing for it to break if it doesn't fire (touch
 * devices, reduced-motion, etc. simply don't get the effect).
 */
@Directive({
  selector: '[appTilt]',
  standalone: true,
  host: {
    '(mousemove)': 'onMouseMove($event)',
    '(mouseleave)': 'onMouseLeave()',
  },
})
export class TiltDirective {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  /**
   * Computes a rotation from the cursor's position relative to the host's
   * center and applies it as a 3D transform.
   * @param {MouseEvent} event - The mousemove event
   * @returns {void}
   */
  protected onMouseMove(event: MouseEvent): void {
    const element = this.elementRef.nativeElement;
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = (y / rect.height - 0.5) * -8;
    const rotateY = (x / rect.width - 0.5) * 8;
    element.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale3d(1.02, 1.02, 1.02)`;
  }

  /**
   * Resets the tilt transform when the cursor leaves the host element.
   * @returns {void}
   */
  protected onMouseLeave(): void {
    this.elementRef.nativeElement.style.transform = '';
  }
}
