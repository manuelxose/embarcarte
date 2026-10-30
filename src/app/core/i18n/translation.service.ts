import { Injectable, inject, isDevMode } from '@angular/core';
import { translate } from '../../i18n/dictionary';
import type { TranslationKey, TranslationParams } from '../../i18n/dictionary';
import { LocaleService } from './locale.service';

/**
 * Reads the active locale from `LocaleService`, so `t()` re-renders on locale
 * change without any subscription. The dictionaries are bundled, so there is
 * no network request and no browser-only API involved (SSR safe).
 */
@Injectable({ providedIn: 'root' })
export class TranslationService {
  private readonly localeService = inject(LocaleService);

  t(key: TranslationKey, params?: TranslationParams): string {
    const value = translate(this.localeService.locale(), key, params);
    if (isDevMode() && value === key) console.warn(`[i18n] Missing translation for "${key}" in locale "${this.localeService.locale()}".`);
    return value;
  }
}
