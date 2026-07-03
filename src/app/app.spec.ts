import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render every page section', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-navbar')).toBeTruthy();
    expect(compiled.querySelector('app-hero-section')).toBeTruthy();
    expect(compiled.querySelector('app-features-section')).toBeTruthy();
    expect(compiled.querySelector('app-offerings-section')).toBeTruthy();
    expect(compiled.querySelector('app-podcast-section')).toBeTruthy();
    expect(compiled.querySelector('app-testimonials-section')).toBeTruthy();
    expect(compiled.querySelector('app-contact-section')).toBeTruthy();
    expect(compiled.querySelector('app-footer')).toBeTruthy();
  });
});
