import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="hero" [@fadeIn]>
      <h1 class="hero__title">BazaarX</h1>
      <p class="hero__subtitle">Discover premium Middle Eastern treasures</p>
      <a routerLink="/store" class="hero__cta">Browse Store</a>
    </div>
  `,
  styles: [`
    .hero {
      text-align: center;
      padding: 4rem 2rem;
      background: linear-gradient(135deg, oklch(0.98 0.02 280), oklch(0.95 0.04 260));
      border-radius: 1rem;
      margin-block-end: 2rem;
    }
    .hero__title {
      font-size: 3rem;
      font-weight: 700;
      color: oklch(0.3 0.1 280);
      margin: 0 0 0.5rem;
      letter-spacing: -0.02em;
    }
    .hero__subtitle {
      font-size: 1.25rem;
      color: oklch(0.45 0.05 260);
      margin: 0 0 2rem;
    }
    .hero__cta {
      display: inline-block;
      padding: 0.75rem 2rem;
      background: linear-gradient(135deg, oklch(0.5 0.15 280), oklch(0.45 0.18 300));
      color: white;
      text-decoration: none;
      font-weight: 600;
      border-radius: 0.5rem;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .hero__cta:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 16px oklch(0.5 0.15 280 / 0.4);
    }
  `],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class HomeComponent {}
