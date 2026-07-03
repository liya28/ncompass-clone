import { Component } from '@angular/core';

/** A single footer navigation link */
interface FooterLink {
  /** Visible label for the link */
  label: string;
  /** Fragment href the link points to */
  href: string;
}

/** A single social platform link */
interface SocialLink {
  /** Which inline icon to render */
  icon: 'facebook' | 'instagram' | 'linkedin';
  /** Accessible label for the icon-only link */
  label: string;
  /** URL the icon links to */
  href: string;
}

/** A single contact-info row (address, phone, or email) */
interface ContactInfo {
  /** Which inline icon to render for this row */
  icon: 'pin' | 'phone' | 'email';
  /** Row value, e.g. the actual address/phone/email */
  value: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {

  /** Brand tagline shown beneath the logo */
  protected readonly tagline: string =
    "Our indoor billboards are popular in communities throughout the country. From restaurants to gyms, doctor's offices to auto repair, you will be seen wherever your customers go!";

  /** Current year, used in the copyright line */
  protected readonly currentYear: number = new Date().getFullYear();

  /** Social platform links */
  protected readonly socialLinks: SocialLink[] = [
    { icon: 'facebook', label: 'Facebook', href: '#' },
    { icon: 'instagram', label: 'Instagram', href: '#' },
    { icon: 'linkedin', label: 'LinkedIn', href: '#' },
  ];

  /** Contact info rows */
  protected readonly contactInfo: ContactInfo[] = [
    { icon: 'pin', value: '5148 Cola Blvd Bldg 5, Suite 100, Lakewood, CO 80401' },
    { icon: 'phone', value: '(770) 580-0990' },
    { icon: 'email', value: 'info@n-compass.tv' },
  ];

  /** Quick navigation links, mirroring the navbar */
  protected readonly quickLinks: FooterLink[] = [
    { label: 'Home', href: '#' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Podcast', href: '#podcast' },
    { label: 'Contact', href: '#contact' },
  ];

  /**
   * Smoothly scrolls the window back to the top of the page.
   * @returns {void}
   */
  protected scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
