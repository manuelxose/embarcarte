import { DEFAULT_LOCALE } from '../core/i18n/locale.types';
import type { Locale } from '../core/i18n/locale.types';
import { en } from './en';
import { es } from './es';

export type TranslationKey = keyof typeof es;
export type TranslationParams = Record<string, string | number>;

/**
 * Lookup table typed as possibly partial: the dictionaries are complete at
 * compile time, but a missing key at runtime must degrade instead of throwing.
 */
export const DICTIONARIES: Record<Locale, Readonly<Partial<Record<TranslationKey, string>>>> = { es, en };

const interpolate = (template: string, params?: TranslationParams): string =>
  params
    ? template.replace(/\{(\w+)\}/g, (placeholder, name: string) =>
        Object.prototype.hasOwnProperty.call(params, name) ? String(params[name]) : placeholder,
      )
    : template;

/**
 * Resolves `key` in `locale`, falling back to the default locale and finally to
 * the key itself, which makes a missing translation visible instead of blank.
 */
export const translate = (locale: Locale, key: TranslationKey, params?: TranslationParams): string => {
  const template = DICTIONARIES[locale][key] ?? DICTIONARIES[DEFAULT_LOCALE][key];
  return template === undefined ? key : interpolate(template, params);
};
