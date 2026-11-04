/**
 * MC-19 internal audience pages — frozen identity and preview routing.
 *
 * Three internal audience identities:
 *   - `professionals` → MC-15 `professionals` / `ENT-PAGE-PROFESSIONALS` / `PROFESSIONALS`
 *   - `installers`    → MC-15 `installers` / `ENT-PAGE-INSTALLERS` / `INSTALLERS`
 *   - `shipowners`    → NEW internal-only identity. MC-15 defines no owners route or
 *                       entity, so no public path is reserved or proposed here.
 *
 * The preview paths are internal preview identifiers under `/internal/segments/`.
 * They are deliberately NOT the MC-15 proposed public paths: the proposal dataset
 * (`docs/marea/information-architecture/data/proposed-routes.json`) keeps every
 * route `PROPOSED_INTERNAL_NOT_DEPLOYABLE`, and `shipowners` has no proposal at
 * all. The reserved public paths are recorded as *planning references only* and
 * are not registered anywhere in this milestone.
 *
 * Nothing in this module registers a public route, a sitemap entry, a canonical,
 * an hreflang alternate or any indexable metadata.
 */

export const SEGMENT_IDS = ['professionals', 'installers', 'shipowners'] as const;
export type SegmentId = (typeof SEGMENT_IDS)[number];

/** Internal preview namespace. Never mounted in the production application. */
export const SEGMENT_PREVIEW_NAMESPACE = 'internal/segments';

export interface SegmentReservedPublicPath {
  readonly es: string;
  readonly en: string;
}

export interface SegmentIdentity {
  readonly segmentId: SegmentId;
  /** Internal entity id. `shipowners` is not an MC-15 entity. */
  readonly entityId: string;
  /** MC-15 route id, or `null` when MC-15 defines no such audience. */
  readonly mc15RouteId: string | null;
  /** MC-15 page type, or `null` when MC-15 defines no such audience. */
  readonly mc15PageType: string | null;
  /** Where the identity comes from. */
  readonly identitySource: string;
  /** Internal preview path (no leading slash), ES and EN. */
  readonly preview: { readonly es: string; readonly en: string };
  /** MC-15 planning reference only: not activated, not registered, not linked publicly. */
  readonly reservedPublicPath: SegmentReservedPublicPath | null;
  readonly publicRouteRegistered: boolean;
  readonly reservedPublicPathActivated: boolean;
  readonly publicationAuthorized: boolean;
  readonly indexationAuthorized: boolean;
  readonly sitemapEligible: boolean;
  readonly leadCapture: false;
}

export const SEGMENT_IDENTITIES: Readonly<Record<SegmentId, SegmentIdentity>> = {
  professionals: {
    segmentId: 'professionals',
    entityId: 'ENT-PAGE-PROFESSIONALS',
    mc15RouteId: 'professionals',
    mc15PageType: 'PROFESSIONALS',
    identitySource: 'docs/marea/information-architecture/data/proposed-routes.json',
    preview: {
      es: `${SEGMENT_PREVIEW_NAMESPACE}/professionals`,
      en: `en/${SEGMENT_PREVIEW_NAMESPACE}/professionals`,
    },
    reservedPublicPath: { es: '/profesionales', en: '/en/professionals' },
    publicRouteRegistered: false,
    reservedPublicPathActivated: false,
    publicationAuthorized: false,
    indexationAuthorized: false,
    sitemapEligible: false,
    leadCapture: false,
  },
  installers: {
    segmentId: 'installers',
    entityId: 'ENT-PAGE-INSTALLERS',
    mc15RouteId: 'installers',
    mc15PageType: 'INSTALLERS',
    identitySource: 'docs/marea/information-architecture/data/proposed-routes.json',
    preview: {
      es: `${SEGMENT_PREVIEW_NAMESPACE}/installers`,
      en: `en/${SEGMENT_PREVIEW_NAMESPACE}/installers`,
    },
    reservedPublicPath: { es: '/instaladores', en: '/en/installers' },
    publicRouteRegistered: false,
    reservedPublicPathActivated: false,
    publicationAuthorized: false,
    indexationAuthorized: false,
    sitemapEligible: false,
    leadCapture: false,
  },
  shipowners: {
    segmentId: 'shipowners',
    entityId: 'ENT-INTERNAL-SHIPOWNERS',
    mc15RouteId: null,
    mc15PageType: null,
    identitySource:
      'MC-19 master instruction (2026-11-04) — new internal audience identity; no MC-15 route, entity or page type exists',
    preview: {
      es: `${SEGMENT_PREVIEW_NAMESPACE}/shipowners`,
      en: `en/${SEGMENT_PREVIEW_NAMESPACE}/shipowners`,
    },
    reservedPublicPath: null,
    publicRouteRegistered: false,
    reservedPublicPathActivated: false,
    publicationAuthorized: false,
    indexationAuthorized: false,
    sitemapEligible: false,
    leadCapture: false,
  },
} as const;

export const SEGMENT_IDENTITY_LIST: readonly SegmentIdentity[] = SEGMENT_IDS.map(
  (segmentId) => SEGMENT_IDENTITIES[segmentId],
);

/** Preview-only route table used by `preview/landing/app.routes.ts`. */
export interface SegmentPreviewRoute {
  readonly segmentId: SegmentId;
  readonly locale: 'es' | 'en';
  /** Angular route path without a leading slash. */
  readonly path: string;
  readonly renderMode: 'Server';
}

export const SEGMENT_PREVIEW_ROUTES: readonly SegmentPreviewRoute[] = SEGMENT_IDENTITY_LIST.flatMap(
  (identity) => [
    {
      segmentId: identity.segmentId,
      locale: 'es' as const,
      path: identity.preview.es,
      renderMode: 'Server' as const,
    },
    {
      segmentId: identity.segmentId,
      locale: 'en' as const,
      path: identity.preview.en,
      renderMode: 'Server' as const,
    },
  ],
);

export function segmentPreviewHref(segmentId: SegmentId, locale: 'es' | 'en'): string {
  return `/${SEGMENT_IDENTITIES[segmentId].preview[locale]}`;
}

/** Type guard used by the preview host on untrusted route data. */
export function isSegmentId(value: unknown): value is SegmentId {
  return typeof value === 'string' && (SEGMENT_IDS as readonly string[]).includes(value);
}
