import { Component, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { CartStore } from '../../services/cart.store';
import { TranslationService } from '../../services/translation.service';
import { I18nPipe } from '../../shared/pipes/i18n.pipe';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule, I18nPipe, CurrencyPipe],
  template: `
    @if (confirmed()) {
      <div class="success" [@successAnim]>
        <div class="success__icon">✓</div>
        <h2>{{ 'checkout.success' | i18n }}</h2>
        <p>{{ 'checkout.thanks' | i18n }}</p>
        <a routerLink="/store" class="success__link">Continue Shopping</a>
      </div>
    } @else if (canCheckout()) {
      <div class="checkout" [@pageEnter]>
        <h1 class="checkout__title">{{ 'checkout.title' | i18n }}</h1>
        <form class="checkout__form" (ngSubmit)="placeOrder()">
          <div class="form-group">
            <label for="email">{{ 'checkout.email' | i18n }}</label>
            <input id="email" type="email" [(ngModel)]="email" name="email" required />
          </div>
          <div class="form-group">
            <label for="address">{{ 'checkout.address' | i18n }}</label>
            <input id="address" type="text" [(ngModel)]="address" name="address" required />
          </div>
          <div class="checkout__summary">
            <p>{{ 'cart.subtotal' | i18n }}: <strong>{{ cart.subtotal() | currency:'SAR':'symbol':'1.2-2' }}</strong></p>
          </div>
          <button type="submit" class="checkout__submit" [disabled]="submitting()">
            {{ submitting() ? '...' : ('checkout.place' | i18n) }}
          </button>
        </form>
      </div>
    } @else {
      <div class="checkout checkout--empty" [@pageEnter]>
        <p>{{ 'cart.empty' | i18n }}</p>
        <a routerLink="/store" class="success__link">Browse Store</a>
      </div>
    }
  `,
  styles: [`
    .checkout, .success {
      max-width: 500px;
      margin: 0 auto;
    }
    .checkout__title {
      font-size: 1.75rem;
      font-weight: 700;
      margin: 0 0 1.5rem;
      color: oklch(0.3 0.05 260);
    }
    .form-group {
      margin-block-end: 1rem;
    }
    .form-group label {
      display: block;
      font-weight: 500;
      margin-block-end: 0.375rem;
      color: oklch(0.4 0.05 260);
    }
    .form-group input {
      width: 100%;
      padding: 0.625rem 1rem;
      border: 1px solid oklch(0.9 0.02 260);
      border-radius: 0.5rem;
      font-size: 1rem;
    }
    .form-group input:focus {
      outline: none;
      border-color: oklch(0.5 0.15 280);
      box-shadow: 0 0 0 3px oklch(0.5 0.15 280 / 0.2);
    }
    .checkout__summary {
      padding: 1rem 0;
      margin-block-end: 1rem;
      border-block-start: 1px solid oklch(0.92 0.02 260);
    }
    .checkout__submit {
      width: 100%;
      padding: 0.875rem 1.5rem;
      background: linear-gradient(135deg, oklch(0.5 0.15 280), oklch(0.45 0.18 300));
      color: white;
      border: none;
      border-radius: 0.5rem;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s, opacity 0.2s;
    }
    .checkout__submit:hover:not(:disabled) {
      transform: scale(1.02);
    }
    .checkout__submit:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
    .success {
      text-align: center;
      padding: 4rem 2rem;
      background: linear-gradient(135deg, oklch(0.97 0.03 145), oklch(0.95 0.04 150));
      border-radius: 1rem;
    }
    .success__icon {
      width: 4rem;
      height: 4rem;
      margin: 0 auto 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: oklch(0.5 0.15 145);
      color: white;
      font-size: 2rem;
      font-weight: bold;
      border-radius: 50%;
    }
    .success h2 {
      font-size: 1.5rem;
      margin: 0 0 0.5rem;
      color: oklch(0.3 0.05 145);
    }
    .success p {
      color: oklch(0.45 0.05 145);
      margin: 0 0 1.5rem;
    }
    .success__link {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      background: oklch(0.5 0.15 145);
      color: white;
      text-decoration: none;
      font-weight: 600;
      border-radius: 0.5rem;
      transition: transform 0.2s;
    }
.success__link:hover {
  transform: scale(1.05);
}
.checkout--empty {
  text-align: center;
  padding: 3rem;
}
.checkout--empty p {
  margin-block-end: 1.5rem;
  color: oklch(0.5 0.03 260);
}
  `],
  animations: [
    trigger('pageEnter', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
    trigger('successAnim', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('500ms cubic-bezier(0.34, 1.56, 0.64, 1)', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
    ]),
  ],
})
export class CheckoutComponent {
  private readonly router = inject(Router);
  protected readonly cart = inject(CartStore);
  protected readonly translation = inject(TranslationService);
  protected readonly confirmed = signal(false);
  protected readonly submitting = signal(false);
  protected email = 'demo@example.com';
  protected address = '123 Demo Street, Riyadh';

  protected readonly canCheckout = computed(() => !this.cart.isEmpty());

  placeOrder(): void {
    if (this.submitting() || this.cart.isEmpty()) return;
    this.submitting.set(true);
    setTimeout(() => {
      this.cart.clear();
      this.confirmed.set(true);
      this.submitting.set(false);
    }, 1200);
  }
}
