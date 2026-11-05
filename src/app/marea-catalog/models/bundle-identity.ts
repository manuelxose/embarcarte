/**
 * MC-23 internal preview route for the bundle comparison.
 *
 * The bundle comparison is an INTERNAL preview page, exactly like the nine
 * family catalogue pages: it lives under the internal namespace, it is
 * loopback-reachable only, it emits no canonical, no hreflang, no social card
 * and no structured data, and it is marked noindex. It registers no public
 * route and no sitemap entry.
 */
export interface BundlePreviewRoute {
  readonly locale: 'es' | 'en';
  /** Angular route path without a leading slash. */
  readonly path: string;
  readonly renderMode: 'Server';
}

/** Internal preview namespace. Never mounted in the production application. */
export const BUNDLE_PREVIEW_NAMESPACE = 'internal/catalog/bundles';

export const BUNDLE_PREVIEW_ROUTES: readonly BundlePreviewRoute[] = [
  { locale: 'es', path: BUNDLE_PREVIEW_NAMESPACE, renderMode: 'Server' },
  { locale: 'en', path: `en/${BUNDLE_PREVIEW_NAMESPACE}`, renderMode: 'Server' },
];

/** Fail-closed facts shared by both locales. */
export const BUNDLE_PREVIEW_IDENTITY = {
  routeStatus: 'PROPOSED_INTERNAL_NOT_DEPLOYABLE',
  publicRouteRegistered: false,
  reservedPublicPathActivated: false,
  publicationAuthorized: false,
  indexationAuthorized: false,
  sitemapEligible: false,
  leadCapture: false,
  purchasable: false,
} as const;
