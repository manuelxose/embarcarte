import { RenderMode, ServerRoute } from '@angular/ssr';
import { LOCALIZED_ROUTES } from './core/i18n/locale-routes';
import type { RouteId } from './core/i18n/locale-routes';
import { LOCALES } from './core/i18n/locale.types';
import type { Locale } from './core/i18n/locale.types';
import { GUIDE_SLUGS } from './features/guides/models/guides';
import { TECHNOLOGY } from './features/technology/models/technology';

/** Path of a semantic route in a locale: the registry is the only list of public URLs. */
const path = (id: RouteId, locale: Locale): string => LOCALIZED_ROUTES[id][locale];

/** Páginas cuyo contenido no depende de la base de datos: se generan en el build. */
const PRERENDERED: readonly RouteId[] = [
  'home',
  'technology',
  'experiences',
  'delivery',
  'services',
  'about',
  'contact',
  'guides',
  'legalNotice',
  'privacy',
  'cookies',
  'termsOfSale',
];

/** Detalle estático: el mismo slug en las dos lenguas. */
const DETAILS: readonly { readonly id: RouteId; readonly slugs: readonly string[] }[] = [
  { id: 'technologyDetail', slugs: TECHNOLOGY.map((product) => product.slug) },
  { id: 'guideDetail', slugs: GUIDE_SLUGS },
];

const prerender = (id: RouteId, locale: Locale): ServerRoute => ({ path: path(id, locale), renderMode: RenderMode.Prerender });

export const serverRoutes: ServerRoute[] = [
  ...LOCALES.flatMap((locale) => PRERENDERED.map((id) => prerender(id, locale))),
  ...LOCALES.flatMap((locale) =>
    DETAILS.map(({ id, slugs }) => ({
      ...prerender(id, locale),
      getPrerenderParams: async () => slugs.map((slug) => ({ slug })),
    })),
  ),
  // La tienda cambia desde el panel: se renderiza en servidor en cada petición para Google.
  ...LOCALES.flatMap((locale) =>
    (['shop', 'shopSample', 'shopDetail'] as const).map((id): ServerRoute => ({ path: path(id, locale), renderMode: RenderMode.Server })),
  ),
  // Zonas privadas: solo en el navegador (dependen de la sesión).
  ...LOCALES.flatMap((locale) =>
    (['cart', 'login', 'account'] as const).flatMap((id): ServerRoute[] => [
      { path: path(id, locale), renderMode: RenderMode.Client },
      { path: `${path(id, locale)}/**`, renderMode: RenderMode.Client },
    ]),
  ),
  { path: 'admin', renderMode: RenderMode.Client },
  { path: 'admin/**', renderMode: RenderMode.Client },
  { path: 'open-marine', renderMode: RenderMode.Server, status: 301 },
  { path: 'productos', renderMode: RenderMode.Server, status: 301 },
  { path: 'productos/**', renderMode: RenderMode.Server, status: 301 },
  // Las rutas desconocidas se renderizan en servidor para devolver un 404 real.
  { path: '**', renderMode: RenderMode.Server, status: 404 },
];
