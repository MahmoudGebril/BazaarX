import { Injectable, computed, signal } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';
import { DataService } from './data.service';

@Injectable({ providedIn: 'root' })
export class CartStore {
  private items = signal<CartItem[]>([]);

  readonly cartItems = this.items.asReadonly();
  readonly itemCount = computed(() => this.items().reduce((sum, i) => sum + i.quantity, 0));
  readonly subtotal = computed(() =>
    this.items().reduce((sum, i) => sum + i.price * i.quantity, 0)
  );
  readonly isEmpty = computed(() => this.items().length === 0);

  constructor(private data: DataService) {}

  addItem(product: Product, quantity = 1, lang: 'en' | 'ar' = 'en'): void {
    const existing = this.items().find(i => i.productId === product.id);
    if (existing) {
      this.items.update(list =>
        list.map(i =>
          i.productId === product.id ? { ...i, quantity: i.quantity + quantity } : i
        )
      );
    } else {
      this.items.update(list => [
        ...list,
        {
          productId: product.id,
          quantity,
          price: product.price,
          nameAr: product.nameAr,
          nameEn: product.nameEn,
          imageUrl: product.imageUrl,
        },
      ]);
    }
  }

  removeItem(productId: string): void {
    this.items.update(list => list.filter(i => i.productId !== productId));
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }
    this.items.update(list =>
      list.map(i => (i.productId === productId ? { ...i, quantity } : i))
    );
  }

  clear(): void {
    this.items.set([]);
  }

  getItem(productId: string): CartItem | undefined {
    return this.items().find(i => i.productId === productId);
  }
}
