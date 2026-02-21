import { Component, inject, signal } from '@angular/core';
import { CartStore } from '../../../../services/cart.store';
import { TranslationService } from '../../../../services/translation.service';
import { CartDrawerComponent } from '../cart-drawer/cart-drawer.component';

@Component({
  selector: 'app-cart-trigger',
  standalone: true,
  imports: [CartDrawerComponent],
  template: `
    <button
      type="button"
      class="cart-trigger"
      (click)="openDrawer()"
      [attr.aria-label]="translation.t('nav.cart')"
    >
      <span class="cart-trigger__icon">🛒</span>
      @if (cart.itemCount(); as count) {
        @if (count > 0) {
          <span class="cart-trigger__badge">{{ count }}</span>
        }
      }
    </button>
    @if (drawerOpen()) {
      <app-cart-drawer (close)="drawerOpen.set(false)" />
    }
  `,
  styles: [`
    .cart-trigger {
      position: relative;
      padding: 0.5rem;
      border: none;
      background: transparent;
      cursor: pointer;
      font-size: 1.25rem;
      border-radius: 0.5rem;
      transition: transform 0.2s ease, background 0.2s ease;
    }
    .cart-trigger:hover {
      background: oklch(0.95 0.02 260);
      transform: scale(1.05);
    }
    .cart-trigger__badge {
      position: absolute;
      top: 0;
      inset-inline-end: 0;
      min-width: 1.25rem;
      height: 1.25rem;
      padding: 0 0.25rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: oklch(0.5 0.2 280);
      color: white;
      font-size: 0.7rem;
      font-weight: 600;
      border-radius: 999px;
    }
  `],
})
export class CartTriggerComponent {
  protected readonly cart = inject(CartStore);
  protected readonly translation = inject(TranslationService);
  protected readonly drawerOpen = signal(false);

  openDrawer(): void {
    this.drawerOpen.set(true);
  }
}
