import type { Locale } from './locale.types';

export interface LocaleInfo {
  /** Value for `<html lang>` and `hreflang`. */
  readonly htmlLang: string;
  /** Value for `og:locale`. */
  readonly ogLocale: string;
  /** Name of the language as it is written in the language switcher. */
  readonly switchLabel: string;
  /** BCP 47 tag used by `Intl` to format money and dates. */
  readonly intlLocale: string;
}

export const LOCALE_INFO = {
  es: { htmlLang: 'es', ogLocale: 'es_ES', switchLabel: 'Español', intlLocale: 'es-ES' },
  en: { htmlLang: 'en', ogLocale: 'en_GB', switchLabel: 'English', intlLocale: 'en-GB' },
} as const satisfies Record<Locale, LocaleInfo>;
