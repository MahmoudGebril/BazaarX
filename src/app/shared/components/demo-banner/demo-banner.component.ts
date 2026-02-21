import { Component, inject } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { TranslationService } from '../../../services/translation.service';

@Component({
  selector: 'app-demo-banner',
  standalone: true,
  template: `
    <div class="demo-banner" [@fadeIn]>
      <span class="demo-banner__icon">ℹ</span>
      <span class="demo-banner__text">{{ translation.t('app.demo') }}</span>
    </div>
  `,
  styles: [`
    .demo-banner {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: linear-gradient(135deg, oklch(0.95 0.02 260), oklch(0.92 0.03 280));
      color: oklch(0.35 0.05 260);
      font-size: 0.875rem;
      font-weight: 500;
      text-align: center;
      border-block-end: 1px solid oklch(0.9 0.02 260);
    }
    .demo-banner__icon {
      font-size: 1rem;
      opacity: 0.9;
    }
  `],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class DemoBannerComponent {
  protected readonly translation = inject(TranslationService);
}
