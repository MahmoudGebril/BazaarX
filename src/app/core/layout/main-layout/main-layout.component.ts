import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DemoBannerComponent } from '../../../shared/components/demo-banner/demo-banner.component';
import { LanguageToggleComponent } from '../../../shared/components/language-toggle/language-toggle.component';
import { CartTriggerComponent } from '../../../storefront/cart/components/cart-trigger/cart-trigger.component';
import { I18nPipe } from '../../../shared/pipes/i18n.pipe';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    DemoBannerComponent,
    LanguageToggleComponent,
    CartTriggerComponent,
    I18nPipe,
  ],
  template: `
    <div class="layout">
      <app-demo-banner />
      <header class="header">
        <a routerLink="/" class="logo" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">
          BazaarX
        </a>
        <nav class="nav">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">
            {{ 'nav.home' | i18n }}
          </a>
          <a routerLink="/store" routerLinkActive="active"> {{ 'nav.store' | i18n }} </a>
          <app-cart-trigger />
          <a routerLink="/admin" routerLinkActive="active"> {{ 'nav.admin' | i18n }} </a>
          <app-language-toggle />
        </nav>
      </header>
      <main class="main">
        <router-outlet />
      </main>
    </div>
  `,
  styles: [`
    .layout {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 2rem;
      background: linear-gradient(135deg, oklch(0.99 0.01 260), oklch(0.96 0.02 280));
      border-block-end: 1px solid oklch(0.9 0.02 260);
      box-shadow: 0 1px 3px oklch(0.5 0.05 260 / 0.06);
    }
    .logo {
      font-size: 1.5rem;
      font-weight: 700;
      color: oklch(0.35 0.12 280);
      text-decoration: none;
      letter-spacing: -0.02em;
      transition: transform 0.2s ease;
    }
    .logo:hover {
      transform: scale(1.02);
    }
    .nav {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }
    @media (max-width: 640px) {
      .header {
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
      }
      .nav {
        flex-wrap: wrap;
        justify-content: center;
      }
    }
    .nav a {
      color: oklch(0.45 0.05 260);
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s ease;
    }
    .nav a:hover,
    .nav a.active {
      color: oklch(0.4 0.15 280);
    }
    .main {
      flex: 1;
      padding: 2rem;
    }
  `],
})
export class MainLayoutComponent {}
