import { Component, inject, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { CartStore } from '../../../../services/cart.store';
import { TranslationService } from '../../../../services/translation.service';
import { I18nPipe } from '../../../../shared/pipes/i18n.pipe';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  host: { class: 'cart-drawer-host' },
  imports: [RouterLink, I18nPipe, CurrencyPipe],
  template: `
    <div class="overlay" [@overlay] (click)="close.emit()"></div>
    <aside class="drawer" [@drawer] role="dialog" aria-label="Cart">
      <div class="drawer__header">
        <h2>{{ 'nav.cart' | i18n }}</h2>
        <button type="button" class="drawer__close" (click)="close.emit()" aria-label="Close">×</button>
      </div>
      <div class="drawer__body">
        @if (cart.isEmpty()) {
          <p class="drawer__empty">{{ 'cart.empty' | i18n }}</p>
        } @else {
          <ul class="cart-list">
            @for (item of cart.cartItems(); track item.productId) {
              <li class="cart-item" [@itemAnim]>
                <img [src]="item.imageUrl" [alt]="getName(item)" class="cart-item__img" />
                <div class="cart-item__info">
                  <span class="cart-item__name">{{ getName(item) }}</span>
                  <span class="cart-item__price">{{ item.price | currency:'SAR':'symbol':'1.2-2' }}</span>
                  <div class="cart-item__qty">
                    <button type="button" (click)="updateQty(item, -1)">−</button>
                    <span>{{ item.quantity }}</span>
                    <button type="button" (click)="updateQty(item, 1)">+</button>
                  </div>
                </div>
                <button
                  type="button"
                  class="cart-item__remove"
                  (click)="cart.removeItem(item.productId)"
                  [attr.aria-label]="'cart.remove' | i18n"
                >
                  ×
                </button>
              </li>
            }
          </ul>
        }
      </div>
      @if (!cart.isEmpty()) {
        <div class="drawer__footer">
          <div class="drawer__subtotal">
            <span>{{ 'cart.subtotal' | i18n }}</span>
            <strong>{{ cart.subtotal() | currency:'SAR':'symbol':'1.2-2' }}</strong>
          </div>
          <a routerLink="/checkout" class="drawer__checkout" (click)="close.emit()">
            {{ 'cart.checkout' | i18n }}
          </a>
        </div>
      }
    </aside>
  `,
  styles: [`
    :host {
      position: fixed;
      inset: 0;
      z-index: 1000;
      pointer-events: none;
    }
    :host > * {
      pointer-events: auto;
    }
    .overlay {
      position: fixed;
      inset: 0;
      background: oklch(0 0 0 / 0.4);
      z-index: 100;
      backdrop-filter: blur(2px);
    }
    .drawer {
      position: fixed;
      top: 0;
      inset-inline-end: 0;
      width: min(400px, 100vw);
      height: 100vh;
      background: oklch(0.99 0.01 260);
      box-shadow: -4px 0 24px oklch(0 0 0 / 0.15);
      z-index: 101;
      display: flex;
      flex-direction: column;
    }
    .drawer__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.25rem 1.5rem;
      border-block-end: 1px solid oklch(0.92 0.02 260);
    }
    .drawer__header h2 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
    }
    .drawer__close {
      width: 2rem;
      height: 2rem;
      border: none;
      background: transparent;
      font-size: 1.5rem;
      cursor: pointer;
      border-radius: 0.5rem;
      transition: background 0.2s;
    }
    .drawer__close:hover {
      background: oklch(0.95 0.02 260);
    }
    .drawer__body {
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
    }
    .drawer__empty {
      text-align: center;
      color: oklch(0.5 0.02 260);
      padding: 2rem;
    }
    .cart-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .cart-item {
      display: flex;
      gap: 1rem;
      padding: 0.75rem;
      background: oklch(0.98 0.01 260);
      border-radius: 0.5rem;
      align-items: center;
    }
    .cart-item__img {
      width: 56px;
      height: 56px;
      object-fit: cover;
      border-radius: 0.375rem;
    }
    .cart-item__info {
      flex: 1;
      min-width: 0;
    }
    .cart-item__name {
      display: block;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .cart-item__price {
      font-size: 0.875rem;
      color: oklch(0.45 0.05 260);
    }
    .cart-item__qty {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      margin-block-start: 0.25rem;
    }
    .cart-item__qty button {
      width: 1.5rem;
      height: 1.5rem;
      border: 1px solid oklch(0.9 0.02 260);
      background: white;
      border-radius: 0.25rem;
      cursor: pointer;
      font-size: 0.875rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .cart-item__qty button:hover {
      background: oklch(0.95 0.02 260);
    }
    .cart-item__remove {
      width: 2rem;
      height: 2rem;
      border: none;
      background: transparent;
      color: oklch(0.5 0.1 25);
      font-size: 1.25rem;
      cursor: pointer;
      border-radius: 0.5rem;
      transition: background 0.2s;
    }
    .cart-item__remove:hover {
      background: oklch(0.95 0.05 25);
    }
    .drawer__footer {
      padding: 1.25rem 1.5rem;
      border-block-start: 1px solid oklch(0.92 0.02 260);
    }
    .drawer__subtotal {
      display: flex;
      justify-content: space-between;
      margin-block-end: 1rem;
      font-size: 1rem;
    }
    .drawer__checkout {
      display: block;
      width: 100%;
      padding: 0.75rem 1.5rem;
      background: linear-gradient(135deg, oklch(0.5 0.15 280), oklch(0.45 0.18 300));
      color: white;
      text-align: center;
      text-decoration: none;
      font-weight: 600;
      border-radius: 0.5rem;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .drawer__checkout:hover {
      transform: scale(1.02);
      box-shadow: 0 4px 12px oklch(0.5 0.15 280 / 0.4);
    }
  `],
  animations: [
    trigger('overlay', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('200ms ease-in', style({ opacity: 0 }))]),
    ]),
    trigger('drawer', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms cubic-bezier(0.32, 0.72, 0, 1)', style({ transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('250ms ease-in', style({ transform: 'translateX(100%)' })),
      ]),
    ]),
    trigger('itemAnim', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class CartDrawerComponent {
  readonly close = output<void>();
  protected readonly cart = inject(CartStore);
  protected readonly translation = inject(TranslationService);

  getName(item: { nameEn: string; nameAr: string }): string {
    return this.translation.lang() === 'ar' ? item.nameAr : item.nameEn;
  }

  updateQty(item: { productId: string; quantity: number }, delta: number): void {
    this.cart.updateQuantity(item.productId, item.quantity + delta);
  }
}
