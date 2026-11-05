/**
 * MC-20 internal catalogue — frozen identity and preview routing.
 *
 * Nine canonical family identities come from MC-16 (`NAV`, `HUB`, `AIS`,
 * `SENSE`, `WATCH`, `WEATHER`, `DISPLAY`, `PILOT`, `FLEET`) and the MC-15
 * proposed-route registry (`mareaFamilyNav`, `mareaFamilyHub`, `mareaFamilyAis`,
 * `mareaFamilySense`, `mareaFamilyWatch`, `mareaFamilyWeather`,
 * `mareaFamilyDisplay`, `mareaFamilyPilot`, `mareaFamilyFleet`). The public
 * paths `/marea/{slug}` are recorded as *planning references only*: every
 * proposed route stays `PROPOSED_INTERNAL_NOT_DEPLOYABLE`, not
 * implementation-ready and not indexable.
 *
 * This milestone serves the catalogue only from the isolated loopback preview
 * under `internal/catalog/*`. Nothing here registers a public route, a sitemap
 * entry, a canonical, an hreflang alternate or any indexable metadata.
 */
import { CATALOG_SCOPE_FAMILY_IDS } from '../data/catalog.generated';
import type { CatalogFamilyId } from '../data/catalog.generated';

export { CATALOG_SCOPE_FAMILY_IDS };
export type { CatalogFamilyId };

/** Internal preview namespace. Never mounted in the production application. */
export const CATALOG_PREVIEW_NAMESPACE = 'internal/catalog';

export interface CatalogReservedPublicPath {
  readonly es: string;
  readonly en: string;
}

export interface CatalogIdentity {
  readonly familyId: CatalogFamilyId;
  /** MC-15 route id. */
  readonly mc15RouteId: string;
  readonly mc15PageType: string;
  readonly entityId: string;
  /** Internal preview path (no leading slash), ES and EN. */
  readonly preview: { readonly es: string; readonly en: string };
  /** MC-15 planning reference only: not activated, not registered, not linked publicly. */
  readonly reservedPublicPath: CatalogReservedPublicPath;
  readonly routeStatus: 'PROPOSED_INTERNAL_NOT_DEPLOYABLE';
  readonly publicRouteRegistered: false;
  readonly reservedPublicPathActivated: false;
  readonly publicationAuthorized: false;
  readonly indexationAuthorized: false;
  readonly sitemapEligible: false;
  readonly leadCapture: false;
}

const identity = (
  familyId: CatalogFamilyId,
  routeId: string,
  entityId: string,
  slug: string,
  es: string,
  en: string,
): CatalogIdentity => ({
  familyId,
  mc15RouteId: routeId,
  mc15PageType: 'PRODUCT_FAMILY',
  entityId,
  preview: {
    es: `${CATALOG_PREVIEW_NAMESPACE}/${slug}`,
    en: `en/${CATALOG_PREVIEW_NAMESPACE}/${slug}`,
  },
  reservedPublicPath: { es, en },
  routeStatus: 'PROPOSED_INTERNAL_NOT_DEPLOYABLE',
  publicRouteRegistered: false,
  reservedPublicPathActivated: false,
  publicationAuthorized: false,
  indexationAuthorized: false,
  sitemapEligible: false,
  leadCapture: false,
});

export const CATALOG_IDENTITIES: Readonly<Record<CatalogFamilyId, CatalogIdentity>> = {
  NAV: identity('NAV', 'mareaFamilyNav', 'ENT-FAMILY-NAV', 'nav', '/marea/nav', '/en/marea/nav'),
  HUB: identity('HUB', 'mareaFamilyHub', 'ENT-FAMILY-HUB', 'hub', '/marea/hub', '/en/marea/hub'),
  AIS: identity('AIS', 'mareaFamilyAis', 'ENT-FAMILY-AIS', 'ais', '/marea/ais', '/en/marea/ais'),
  SENSE: identity(
    'SENSE',
    'mareaFamilySense',
    'ENT-FAMILY-SENSE',
    'sense',
    '/marea/sense',
    '/en/marea/sense',
  ),
  WATCH: identity(
    'WATCH',
    'mareaFamilyWatch',
    'ENT-FAMILY-WATCH',
    'watch',
    '/marea/watch',
    '/en/marea/watch',
  ),
  WEATHER: identity(
    'WEATHER',
    'mareaFamilyWeather',
    'ENT-FAMILY-WEATHER',
    'weather',
    '/marea/weather',
    '/en/marea/weather',
  ),
  // Batch-3 identities. The route ids below are read verbatim from the MC-15
  // proposed-route registry (docs/marea/information-architecture/data/proposed-routes.json):
  // mareaFamilyDisplay, mareaFamilyPilot, mareaFamilyFleet.
  DISPLAY: identity(
    'DISPLAY',
    'mareaFamilyDisplay',
    'ENT-FAMILY-DISPLAY',
    'display',
    '/marea/display',
    '/en/marea/display',
  ),
  PILOT: identity(
    'PILOT',
    'mareaFamilyPilot',
    'ENT-FAMILY-PILOT',
    'pilot',
    '/marea/pilot',
    '/en/marea/pilot',
  ),
  FLEET: identity(
    'FLEET',
    'mareaFamilyFleet',
    'ENT-FAMILY-FLEET',
    'fleet',
    '/marea/fleet',
    '/en/marea/fleet',
  ),
} as const;

export const CATALOG_IDENTITY_LIST: readonly CatalogIdentity[] = CATALOG_SCOPE_FAMILY_IDS.map(
  (familyId) => CATALOG_IDENTITIES[familyId],
);

/** Preview-only route table used by `preview/landing/app.routes.ts`. */
export interface CatalogPreviewRoute {
  readonly familyId: CatalogFamilyId;
  readonly locale: 'es' | 'en';
  /** Angular route path without a leading slash. */
  readonly path: string;
  readonly renderMode: 'Server';
}

export const CATALOG_PREVIEW_ROUTES: readonly CatalogPreviewRoute[] = CATALOG_IDENTITY_LIST.flatMap(
  (entry) => [
    {
      familyId: entry.familyId,
      locale: 'es' as const,
      path: entry.preview.es,
      renderMode: 'Server' as const,
    },
    {
      familyId: entry.familyId,
      locale: 'en' as const,
      path: entry.preview.en,
      renderMode: 'Server' as const,
    },
  ],
);

export function catalogPreviewHref(familyId: CatalogFamilyId, locale: 'es' | 'en'): string {
  return `/${CATALOG_IDENTITIES[familyId].preview[locale]}`;
}

/** Type guard used by the preview host on untrusted route data. */
export function isCatalogFamilyId(value: unknown): value is CatalogFamilyId {
  return (
    typeof value === 'string' && (CATALOG_SCOPE_FAMILY_IDS as readonly string[]).includes(value)
  );
}
