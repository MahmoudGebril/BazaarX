import { Component, inject, computed, signal } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { DataService } from '../../services/data.service';
import { CurrencyPipe } from '@angular/common';
import { I18nPipe } from '../../shared/pipes/i18n.pipe';
import { Order } from '../../models/order.model';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [I18nPipe, CurrencyPipe],
  template: `
    <div class="analytics" [@pageEnter]>
      <h1 class="analytics__title">{{ 'admin.dashboard' | i18n }}</h1>
      <div class="cards">
        <div class="card" [@cardAnim]>
          <span class="card__label">{{ 'admin.orders' | i18n }}</span>
          <span class="card__value">{{ totalOrders() }}</span>
        </div>
        <div class="card" [@cardAnim]>
          <span class="card__label">{{ 'admin.revenue' | i18n }}</span>
          <span class="card__value">{{ totalRevenue() | currency:'SAR':'symbol':'1.0-0' }}</span>
        </div>
        <div class="card" [@cardAnim]>
          <span class="card__label">{{ 'admin.conversion' | i18n }}</span>
          <span class="card__value">{{ conversionRate() }}%</span>
        </div>
        <div class="card" [@cardAnim]>
          <span class="card__label">{{ 'admin.abandoned' | i18n }}</span>
          <span class="card__value">{{ abandonedRate() }}%</span>
        </div>
      </div>
      <div class="charts">
        <div class="chart-card" [@cardAnim]>
          <h3>{{ 'admin.revenueTrend' | i18n }}</h3>
          <div class="chart chart--bar" role="img" [attr.aria-label]="'admin.revenueTrend' | i18n">
            @for (bar of revenueBars(); track $index) {
              <div
                class="chart__bar"
                [style.height.%]="bar.percent"
                [title]="bar.label + ': ' + (bar.value | currency:'SAR')"
              ></div>
            }
          </div>
        </div>
        <div class="chart-card" [@cardAnim]>
          <h3>{{ 'admin.ordersPerDay' | i18n }}</h3>
          <div class="chart chart--line" role="img" [attr.aria-label]="'admin.ordersPerDay' | i18n">
            <svg viewBox="0 0 400 120" preserveAspectRatio="none">
              <polyline
                [attr.points]="ordersPerDayPoints()"
                fill="none"
                stroke="url(#grad)"
                stroke-width="2"
              />
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stop-color="#6366f1" />
                  <stop offset="100%" stop-color="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <div class="chart-card chart-card--full" [@cardAnim]>
        <h3>{{ 'admin.topProducts' | i18n }}</h3>
        <ul class="top-products">
          @for (item of topProducts(); track item.productId) {
            <li class="top-products__item">
              <span class="top-products__rank">{{ $index + 1 }}</span>
              <span class="top-products__name">{{ item.name }}</span>
              <span class="top-products__count">{{ item.count }} {{ $index === 0 ? 'orders' : '' }}</span>
            </li>
          }
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .analytics {
      max-width: 1200px;
      margin: 0 auto;
    }
    .analytics__title {
      font-size: 1.75rem;
      font-weight: 700;
      margin: 0 0 1.5rem;
      color: oklch(0.3 0.05 260);
    }
    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-block-end: 2rem;
    }
    .card {
      padding: 1.25rem;
      background: linear-gradient(135deg, oklch(0.99 0.02 280), oklch(0.97 0.03 260));
      border-radius: 0.75rem;
      border: 1px solid oklch(0.94 0.02 260);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px oklch(0.4 0.08 280 / 0.1);
    }
    .card__label {
      display: block;
      font-size: 0.8rem;
      color: oklch(0.5 0.03 260);
      margin-block-end: 0.5rem;
    }
    .card__value {
      font-size: 1.5rem;
      font-weight: 700;
      color: oklch(0.35 0.1 280);
    }
    .charts {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 1.5rem;
      margin-block-end: 2rem;
    }
    .chart-card {
      padding: 1.5rem;
      background: oklch(0.99 0.01 260);
      border-radius: 0.75rem;
      border: 1px solid oklch(0.94 0.02 260);
      transition: transform 0.2s;
    }
    .chart-card:hover {
      transform: translateY(-2px);
    }
    .chart-card h3 {
      margin: 0 0 1rem;
      font-size: 1rem;
      font-weight: 600;
      color: oklch(0.35 0.05 260);
    }
    .chart {
      height: 160px;
      display: flex;
      align-items: flex-end;
      gap: 4px;
    }
    .chart__bar {
      flex: 1;
      min-width: 8px;
      background: linear-gradient(180deg, oklch(0.5 0.15 280), oklch(0.45 0.18 300));
      border-radius: 4px 4px 0 0;
      transition: height 0.5s ease;
    }
    .chart--line {
      display: block;
      height: 120px;
    }
    .chart--line svg {
      width: 100%;
      height: 100%;
      display: block;
    }
    .chart--line polyline {
      vector-effect: non-scaling-stroke;
    }
    .chart-card--full {
      grid-column: 1 / -1;
    }
    .top-products {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .top-products__item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.75rem;
      border-block-end: 1px solid oklch(0.94 0.02 260);
      transition: background 0.2s;
    }
    .top-products__item:hover {
      background: oklch(0.98 0.02 260);
    }
    .top-products__item:last-child {
      border-block-end: none;
    }
    .top-products__rank {
      width: 1.75rem;
      height: 1.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, oklch(0.5 0.15 280), oklch(0.45 0.18 300));
      color: white;
      font-size: 0.8rem;
      font-weight: 700;
      border-radius: 50%;
    }
    .top-products__name {
      flex: 1;
      font-weight: 500;
    }
    .top-products__count {
      font-size: 0.875rem;
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
    trigger('cardAnim', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(8px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class AnalyticsComponent {
  private readonly data = inject(DataService);
  private readonly ordersSignal = signal<Order[]>([]);
  private readonly productsSignal = signal<Product[]>([]);

  constructor() {
    this.ordersSignal.set(this.data.orders);
    this.productsSignal.set(this.data.products);
  }

  readonly totalOrders = computed(() => this.ordersSignal().length);

  readonly totalRevenue = computed(() =>
    this.ordersSignal()
      .filter(o => o.status === 'completed')
      .reduce((s, o) => s + o.total, 0)
  );

  readonly conversionRate = computed(() => {
    const orders = this.ordersSignal();
    if (orders.length === 0) return 0;
    const completed = orders.filter(o => o.status === 'completed').length;
    return Math.round((completed / orders.length) * 100);
  });

  readonly abandonedRate = computed(() => {
    const orders = this.ordersSignal();
    if (orders.length === 0) return 0;
    const abandoned = orders.filter(o => o.status === 'abandoned').length;
    return Math.round((abandoned / orders.length) * 100);
  });

  readonly revenueBars = computed(() => {
    const completed = this.ordersSignal().filter(o => o.status === 'completed');
    const byMonth = new Map<string, number>();
    const now = new Date();
    for (let i = 2; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      byMonth.set(d.toISOString().slice(0, 7), 0);
    }
    completed.forEach(o => {
      const key = o.date.toISOString().slice(0, 7);
      if (byMonth.has(key)) byMonth.set(key, (byMonth.get(key) ?? 0) + o.total);
    });
    const revValues = Array.from(byMonth.values());
    const maxRev = Math.max(...revValues, 1);
    return Array.from(byMonth.entries()).map(([k, v]) => ({
      label: k,
      value: v,
      percent: (v / maxRev) * 100,
    }));
  });

  readonly ordersPerDayPoints = computed(() => {
    const completed = this.ordersSignal().filter(o => o.status === 'completed');
    const byDay = new Map<number, number>();
    for (let i = 0; i < 7; i++) byDay.set(i, 0);
    completed.forEach(o => {
      const day = o.date.getDay();
      byDay.set(day, (byDay.get(day) ?? 0) + 1);
    });
    const dayValues = [0, 1, 2, 3, 4, 5, 6].map(d => byDay.get(d) ?? 0);
    const maxDay = Math.max(...dayValues, 1);
    return dayValues
      .map((v, i) => {
        const x = (i / 6) * 400;
        const y = 120 - (v / maxDay) * 100;
        return `${x},${y}`;
      })
      .join(' ');
  });

  readonly topProducts = computed(() => {
    const orders = this.ordersSignal();
    const products = this.productsSignal();
    const productCounts = new Map<string, number>();
    orders.forEach(o => {
      o.productIds.forEach(pid => productCounts.set(pid, (productCounts.get(pid) ?? 0) + 1));
    });
    return Array.from(productCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([pid, count]) => {
        const p = products.find(pr => pr.id === pid);
        return { productId: pid, name: p?.nameEn ?? pid, count };
      });
  });
}
