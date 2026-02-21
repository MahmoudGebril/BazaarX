import { Component, inject } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { DataService } from '../../services/data.service';
import { ProductCardComponent } from '../components/product-card/product-card.component';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [ProductCardComponent],
  template: `
    <div class="store" [@pageEnter]>
      <h1 class="store__title">Store</h1>
      <div class="product-grid">
        @for (product of products; track product.id) {
          <app-product-card [product]="product" />
        }
      </div>
    </div>
  `,
  styles: [`
    .store {
      max-width: 1400px;
      margin: 0 auto;
    }
    .store__title {
      font-size: 2rem;
      font-weight: 700;
      color: oklch(0.3 0.05 260);
      margin: 0 0 1.5rem;
    }
    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      gap: 1.5rem;
    }
  `],
  animations: [
    trigger('pageEnter', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class StoreComponent {
  private readonly data = inject(DataService);
  protected readonly products: Product[] = this.data.products;
}
