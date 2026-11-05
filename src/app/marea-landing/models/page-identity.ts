/**
 * MC-18 internal landing — frozen page identity.
 *
 * These values are copied from the MC-15 proposed route registry
 * (`docs/marea/information-architecture/data/proposed-routes.json`). They are
 * the identity the landing WOULD use in a future authorized release. In MC-18
 * they are planning contracts only: none of the paths is registered in the
 * public router, the sitemap or any public navigation.
 */

export const LANDING_PAGE_IDENTITY = {
  routeId: 'mareaOverview',
  entityId: 'ENT-HUB-MAREA',
  // Canonical MC-15 value. The MC-18 master prompt calls this label
  // PAGE_MAREA_OVERVIEW; the repository dataset is the authority and says HUB_OVERVIEW.
  pageType: 'HUB_OVERVIEW',
  source: 'docs/marea/information-architecture/data/proposed-routes.json',
  locales: {
    es: { path: '/marea', languageTag: 'es-ES', hreflang: 'es-ES', isDefault: true },
    en: { path: '/en/marea', languageTag: 'en', hreflang: 'en', isDefault: false },
  },
  /** MC-18 state: implemented internally, not published. */
  publicationAuthorized: false,
  indexationAuthorized: false,
  commercialTransactionAuthorized: false,
  publicRouteActivated: false,
  sitemapEligible: false,
  previewOnly: true,
  /** Route ids that already exist in the public application: never redefined here. */
  existingPublicRouteIdsRetained: 21,
} as const;

export type LandingPreviewPath =
  (typeof LANDING_PAGE_IDENTITY)['locales'][LandingLocaleKey]['path'];

type LandingLocaleKey = keyof typeof LANDING_PAGE_IDENTITY.locales;

/** Preview-only URL paths, served by the isolated loopback SSR preview application. */
export const LANDING_PREVIEW_PATHS = [
  LANDING_PAGE_IDENTITY.locales.es.path,
  LANDING_PAGE_IDENTITY.locales.en.path,
] as const;

/**
 * Files that must never receive the proposed route in MC-18.
 *
 * The public sitemap is generated at runtime by `src/server.ts`; this
 * repository has no static `public/sitemap.xml`, so the SSR server file is the
 * sitemap surface a future milestone must protect.
 */
export const PRODUCTION_ROUTE_FILES = [
  'src/app/app.routes.ts',
  'src/app/app.routes.server.ts',
  'src/app/core/i18n/locale-routes.ts',
  'src/server.ts',
] as const;

/**
 * The preview application's route table. It is imported ONLY by
 * `preview/landing/`; no production entry point may import this module.
 */
export const LANDING_ROUTE_TABLE = [
  {
    routeId: 'mareaOverview',
    locale: 'es',
    path: LANDING_PAGE_IDENTITY.locales.es.path,
    renderMode: 'Server',
  },
  {
    routeId: 'mareaOverview',
    locale: 'en',
    path: LANDING_PAGE_IDENTITY.locales.en.path,
    renderMode: 'Server',
  },
] as const;

export function localeForPath(path: string): 'es' | 'en' | null {
  const normalized = path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
  if (normalized === LANDING_PAGE_IDENTITY.locales.es.path) return 'es';
  if (normalized === LANDING_PAGE_IDENTITY.locales.en.path) return 'en';
  return null;
}
