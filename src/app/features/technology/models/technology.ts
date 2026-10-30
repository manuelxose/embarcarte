import type { LocalizedContent } from '../../../shared/models/localized';
import { TECHNOLOGY_EN } from '../content/technology.en';
import { TECHNOLOGY_ES } from '../content/technology.es';

export type TechnologyKind = 'Software' | 'Hardware';

/**
 * Technical classification. It is not translated: it identifies what the module
 * is, and it is the same in both locales.
 */
const TECHNOLOGY_IDENTITY = {
  navegador: 'Software',
  cartografia: 'Software',
  hub: 'Hardware',
  'piloto-automatico': 'Hardware',
  simulacion: 'Software',
  'pasarela-sensores': 'Hardware',
} as const satisfies Record<string, TechnologyKind>;

/** Stable, language-independent identifier: the slug is public and identical in both locales. */
export type TechnologySlug = keyof typeof TECHNOLOGY_IDENTITY;

export interface TechnologySpec {
  readonly label: string;
  readonly value: string;
}

/** Text that changes with the language. Every module is published in both locales. */
export interface TechnologyContent {
  readonly name: string;
  readonly description: string;
  readonly features: readonly string[];
  readonly tagline?: string;
  readonly specs?: readonly TechnologySpec[];
  readonly audience?: string;
}

export interface TechnologyProduct {
  readonly id: TechnologySlug;
  readonly slug: TechnologySlug;
  readonly kind: TechnologyKind;
  readonly content: LocalizedContent<TechnologyContent>;
}

export const TECHNOLOGY: readonly TechnologyProduct[] = (Object.keys(TECHNOLOGY_IDENTITY) as TechnologySlug[]).map((slug) => ({
  id: slug,
  slug,
  kind: TECHNOLOGY_IDENTITY[slug],
  content: { es: TECHNOLOGY_ES[slug], en: TECHNOLOGY_EN[slug] },
}));

export const findTechnology = (slug: string): TechnologyProduct | undefined =>
  TECHNOLOGY.find((product) => product.slug === slug);
