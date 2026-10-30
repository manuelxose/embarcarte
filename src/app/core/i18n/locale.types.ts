export const LOCALES = ['es', 'en'] as const;

/**
 * Locales the site is published in. Spanish is the default and its public URLs
 * are unprefixed (`/tecnologia`); English pages live under `/en`.
 */
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'es';

export const isLocale = (value: string | null | undefined): value is Locale =>
  value != null && (LOCALES as readonly string[]).includes(value);

export const otherLocale = (locale: Locale): Locale => (locale === 'es' ? 'en' : 'es');

/**
 * The locale is a pure function of the URL, so server rendering and hydration
 * cannot disagree and there is no second source of truth to keep in sync.
 * Accepts router URLs (`/en/technology`) and absolute request URLs.
 */
export const localeFromUrl = (url: string): Locale => {
  const path = url.split(/[?#]/)[0].replace(/^[a-z]+:\/\/[^/]*/i, '');
  const [first = ''] = path.split('/').filter(Boolean);
  return isLocale(first) ? first : DEFAULT_LOCALE;
};
