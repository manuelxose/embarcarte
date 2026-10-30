import type { Locale } from '../../core/i18n/locale.types';

/**
 * Text that is published in every locale. Identity (ids, slugs, URLs) stays
 * outside of it, so a locale that forgot a translation is a compile error
 * instead of an empty paragraph in production.
 */
export type LocalizedContent<T> = { readonly es: T; readonly en: T };

/** Picks the variant for the active locale. */
export const localized = <T>(content: LocalizedContent<T>, locale: Locale): T => content[locale];
