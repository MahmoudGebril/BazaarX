import { Component, input, output, inject, signal } from '@angular/core';
import { Product } from '../../../models/product.model';
import { CartStore } from '../../../services/cart.store';
import { TranslationService } from '../../../services/translation.service';
import { CurrencyPipe } from '@angular/common';
import { I18nPipe } from '../../../shared/pipes/i18n.pipe';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [I18nPipe, CurrencyPipe],
  template: `
    <article
      class="card"
      (mouseenter)="hovered.set(true)"
      (mouseleave)="hovered.set(false)"
    >
      <div class="card__img-wrap">
        <img
          [src]="product().imageUrl"
          [alt]="getName()"
          class="card__img"
          loading="lazy"
        />
        @if (showFly()) {
          <div
            class="card__fly"
            [style.left.px]="flyStartX()"
            [style.top.px]="flyStartY()"
            [style.--fly-dx]="flyDx() + 'px'"
            [style.--fly-dy]="flyDy() + 'px'"
          ></div>
        }
      </div>
      <div class="card__body">
        <h3 class="card__name">{{ getName() }}</h3>
        <p class="card__seller">{{ product().seller }}</p>
        <div class="card__footer">
          <span class="card__price">{{ product().price | currency:'SAR':'symbol':'1.2-2' }}</span>
          <button
            type="button"
            class="card__add"
            (click)="addToCart($event)"
            [disabled]="adding()"
          >
            {{ adding() ? '...' : ('product.add' | i18n) }}
          </button>
        </div>
      </div>
    </article>
  `,
  host: { class: 'product-card' },
  styles: [`
    .card {
      background: oklch(0.99 0.01 260);
      border-radius: 0.75rem;
      overflow: hidden;
      border: 1px solid oklch(0.94 0.02 260);
      transition: box-shadow 0.3s ease, transform 0.3s ease;
    }
    .card:hover {
      box-shadow: 0 8px 24px oklch(0.4 0.08 280 / 0.12);
      transform: translateY(-4px);
    }
    .card__img-wrap {
      position: relative;
      aspect-ratio: 1;
      overflow: hidden;
    }
    .card__img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }
    .card:hover .card__img {
      transform: scale(1.05);
    }
    .card__fly {
      position: fixed;
      width: 24px;
      height: 24px;
      margin: -12px 0 0 -12px;
      border-radius: 50%;
      background: linear-gradient(135deg, oklch(0.5 0.15 280), oklch(0.45 0.18 300));
      pointer-events: none;
      z-index: 9999;
      animation: flyToCart 0.65s cubic-bezier(0.32, 0.72, 0, 1) forwards;
    }
    @keyframes flyToCart {
      0% {
        opacity: 1;
        transform: scale(1) translate(0, 0);
      }
      100% {
        opacity: 0;
        transform: scale(0.3) translate(var(--fly-dx, -150px), var(--fly-dy, -80px));
      }
    }
    .card__body {
      padding: 1rem;
    }
    .card__name {
      font-size: 1rem;
      font-weight: 600;
      margin: 0 0 0.25rem;
      color: oklch(0.3 0.05 260);
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .card__seller {
      font-size: 0.8rem;
      color: oklch(0.5 0.03 260);
      margin: 0 0 0.75rem;
    }
    .card__footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
    }
    .card__price {
      font-weight: 700;
      color: oklch(0.4 0.12 280);
    }
    .card__add {
      padding: 0.4rem 0.75rem;
      background: linear-gradient(135deg, oklch(0.5 0.15 280), oklch(0.45 0.18 300));
      color: white;
      border: none;
      border-radius: 0.375rem;
      font-size: 0.8rem;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s, opacity 0.2s;
    }
    .card__add:hover:not(:disabled) {
      transform: scale(1.05);
    }
    .card__add:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  `],
})
export class ProductCardComponent {
  product = input.required<Product>();
  addedToCart = output<void>();

  protected readonly cart = inject(CartStore);
  protected readonly translation = inject(TranslationService);
  protected readonly hovered = signal(false);
  protected readonly adding = signal(false);
  protected readonly showFly = signal(false);
  protected readonly flyStartX = signal(0);
  protected readonly flyStartY = signal(0);
  protected readonly flyDx = signal(-150);
  protected readonly flyDy = signal(-80);

  getName(): string {
    return this.translation.lang() === 'ar' ? this.product().nameAr : this.product().nameEn;
  }

  addToCart(event: MouseEvent): void {
    if (this.adding()) return;
    this.adding.set(true);

    const btn = (event.target as HTMLElement).getBoundingClientRect();
    const cx = btn.left + btn.width / 2;
    const cy = btn.top + btn.height / 2;
    this.flyStartX.set(cx);
    this.flyStartY.set(cy);

    const cartIcon = document.querySelector('.cart-trigger');
    const cartRect = cartIcon?.getBoundingClientRect();
    const tx = cartRect ? cartRect.left + cartRect.width / 2 : 100;
    const ty = cartRect ? cartRect.top + cartRect.height / 2 : 50;
    this.flyDx.set(tx - cx);
    this.flyDy.set(ty - cy);
    this.showFly.set(true);

    this.cart.addItem(this.product(), 1, this.translation.lang());
    this.addedToCart.emit();

    setTimeout(() => {
      this.showFly.set(false);
      this.adding.set(false);
    }, 650);
  }
}
