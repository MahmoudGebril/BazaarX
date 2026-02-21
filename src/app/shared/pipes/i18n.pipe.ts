import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Pipe({ name: 'i18n', standalone: true, pure: false })
export class I18nPipe implements PipeTransform {
  private readonly translation = inject(TranslationService);

  transform(key: string): string {
    this.translation.lang(); // Establish signal dependency for reactivity
    return this.translation.translate(key);
  }
}
