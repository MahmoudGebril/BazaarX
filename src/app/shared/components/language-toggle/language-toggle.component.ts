import { Component, inject } from '@angular/core';
import { TranslationService } from '../../../services/translation.service';

@Component({
  selector: 'app-language-toggle',
  standalone: true,
  template: `
    <button
      type="button"
      class="lang-toggle"
      (click)="translation.toggleLang()"
      [attr.aria-label]="translation.t('lang.toggle')"
    >
      {{ translation.t('lang.toggle') }}
    </button>
  `,
  styles: [`
    .lang-toggle {
      padding: 0.4rem 0.8rem;
      border-radius: 0.5rem;
      border: 1px solid oklch(0.85 0.02 260);
      background: oklch(0.98 0.01 260);
      color: oklch(0.4 0.08 260);
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .lang-toggle:hover {
      background: oklch(0.92 0.03 260);
      transform: scale(1.02);
      box-shadow: 0 2px 8px oklch(0.5 0.05 260 / 0.1);
    }
  `],
})
export class LanguageToggleComponent {
  protected readonly translation = inject(TranslationService);
}
