import { Component, signal } from '@angular/core';
import { Button } from '@ntv360/component-pantry';

/** A single navigation link rendered in the navbar */
interface NavLink {
  /** Visible label for the link */
  label: string;
  /** Fragment href the link points to */
  href: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [Button],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {

  /** Primary navigation links rendered in the navbar */
  protected readonly navLinks: NavLink[] = [
    { label: 'Home', href: '#' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Podcast', href: '#podcast' },
    { label: 'Contact', href: '#contact' },
  ];

  /** Whether the mobile nav-links panel is expanded */
  protected readonly menuOpen = signal<boolean>(false);

  /**
   * Toggles the mobile nav-links panel open/closed.
   * @returns {void}
   */
  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  /**
   * Closes the mobile nav-links panel, e.g. after a link is followed.
   * @returns {void}
   */
  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}
