import type { LocalizedContent } from '../../../shared/models/localized';

export interface TechnologyDetailContent {
  readonly features: string;
  readonly audience: string;
  readonly specs: string;
  readonly shopCta: string;
  readonly help: string;
  readonly helpCta: string;
  readonly related: string;
  /**
   * Kind suffix used in the page title. English titles publish the module name
   * alone today, so the suffix is only defined for Spanish.
   */
  readonly titleKind?: { readonly Software: string; readonly Hardware: string };
}

export const TECHNOLOGY_DETAIL: LocalizedContent<TechnologyDetailContent> = {
  es: {
    features: 'Características',
    audience: 'Para quién',
    specs: 'Ficha técnica',
    shopCta: 'Ver en la tienda',
    help: '¿Necesitas instalación o una configuración especial?',
    helpCta: 'Pide presupuesto',
    related: 'Otros módulos',
    titleKind: { Software: 'software de navegación', Hardware: 'hardware náutico' },
  },
  en: {
    features: 'Features',
    audience: 'Who it is for',
    specs: 'Specifications',
    shopCta: 'Explore the shop',
    help: 'Compatibility and configuration depend on your vessel and equipment.',
    helpCta: 'Contact us',
    related: 'Other modules',
  },
};
