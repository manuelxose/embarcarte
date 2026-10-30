import type { Locale } from './locale.types';

export type RouteId =
  | 'home'
  | 'technology'
  | 'technologyDetail'
  | 'experiences'
  | 'delivery'
  | 'services'
  | 'about'
  | 'contact'
  | 'guides'
  | 'guideDetail'
  | 'shop'
  | 'shopDetail'
  | 'shopSample'
  | 'cart'
  | 'login'
  | 'account'
  | 'orderDetail'
  | 'legalNotice'
  | 'privacy'
  | 'cookies'
  | 'termsOfSale';

export type RouteParams = Record<string, string>;

interface LocalizedPath {
  readonly es: string;
  readonly en: string;
}

/**
 * Single source of truth for public, SEO-visible URLs. Spanish paths are
 * unprefixed because they are already indexed and must not move. Dynamic
 * segments (`:slug`) use the same slug in both languages, so the entity
 * identifier stays stable across locales.
 */
export const LOCALIZED_ROUTES = {
  home: { es: '', en: 'en' },
  technology: { es: 'tecnologia', en: 'en/technology' },
  technologyDetail: { es: 'tecnologia/:slug', en: 'en/technology/:slug' },
  experiences: { es: 'experiencias', en: 'en/experiences' },
  delivery: { es: 'traslados', en: 'en/delivery' },
  services: { es: 'servicios', en: 'en/services' },
  about: { es: 'sobre-nosotros', en: 'en/about' },
  contact: { es: 'contacto', en: 'en/contact' },
  guides: { es: 'guias', en: 'en/guides' },
  guideDetail: { es: 'guias/:slug', en: 'en/guides/:slug' },
  shop: { es: 'tienda', en: 'en/shop' },
  shopDetail: { es: 'tienda/:slug', en: 'en/shop/:slug' },
  shopSample: { es: 'tienda/muestra/:slug', en: 'en/shop/sample/:slug' },
  cart: { es: 'carrito', en: 'en/cart' },
  login: { es: 'acceso', en: 'en/login' },
  account: { es: 'cuenta', en: 'en/account' },
  // Private page, but the two URLs are still translations of each other: the language
  // switcher must keep the order id instead of dropping the customer on the other home.
  orderDetail: { es: 'cuenta/pedidos/:id', en: 'en/account/orders/:id' },
  legalNotice: { es: 'aviso-legal', en: 'en/legal-notice' },
  privacy: { es: 'privacidad', en: 'en/privacy' },
  cookies: { es: 'cookies', en: 'en/cookies' },
  termsOfSale: { es: 'condiciones-de-venta', en: 'en/terms-of-sale' },
} as const satisfies Record<RouteId, LocalizedPath>;

export interface RouteMatch {
  readonly id: RouteId;
  readonly locale: Locale;
  readonly params: RouteParams;
}

const ROUTE_IDS = Object.keys(LOCALIZED_ROUTES) as RouteId[];

/** Literal segments win over parameters, so `/tienda/muestra/x` never resolves as `/tienda/:slug`. */
const PATTERNS = ROUTE_IDS.flatMap((id) =>
  (['es', 'en'] as const).map((locale) => ({
    id,
    locale,
    segments: LOCALIZED_ROUTES[id][locale].split('/').filter(Boolean),
  })),
).sort((a, b) => b.segments.filter((s) => !s.startsWith(':')).length - a.segments.filter((s) => !s.startsWith(':')).length);

const pathOf = (url: string): string => url.split(/[?#]/)[0];

/** Absolute URL for a semantic route in the given locale. */
export const localizedUrl = (id: RouteId, locale: Locale, params: RouteParams = {}): string => {
  const path = LOCALIZED_ROUTES[id][locale].replace(/:(\w+)/g, (_, name: string) => encodeURIComponent(params[name] ?? ''));
  return path ? `/${path}` : '/';
};

/** Resolves a public URL back to its semantic route, or `null` when the URL is not a localized page. */
export const matchRoute = (url: string): RouteMatch | null => {
  const segments = pathOf(url).split('/').filter(Boolean);
  for (const pattern of PATTERNS) {
    if (pattern.segments.length !== segments.length) continue;
    const params: RouteParams = {};
    const matches = pattern.segments.every((segment, index) =>
      segment.startsWith(':') ? Boolean((params[segment.slice(1)] = segments[index])) : segment === segments[index],
    );
    if (matches) return { id: pattern.id, locale: pattern.locale, params };
  }
  return null;
};

/**
 * The same page in another locale, keeping query string and fragment.
 * Returns `null` for pages without a localized counterpart (admin, legacy
 * redirects, unknown URLs) instead of guessing a destination.
 */
export const alternateUrl = (url: string, locale: Locale): string | null => {
  const match = matchRoute(url);
  if (!match) return null;
  return localizedUrl(match.id, locale, match.params) + url.slice(pathOf(url).length);
};
