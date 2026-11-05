/**
 * MC-25 internal preview route for the SKU governance screen.
 *
 * Like the nine family pages, the MC-23 bundle comparison and the MC-24
 * configurator, this is an INTERNAL preview page: internal namespace, loopback
 * reachable only, no canonical, no hreflang, no social card, no structured
 * data, noindex. It registers no public route and no sitemap entry.
 *
 * It is an administration experience, and it is deliberately NOT protected by a
 * hidden button: every review action is refused in the business logic (see
 * `governance/admin-authorization.ts`).
 */
export interface GovernancePreviewRoute {
  readonly locale: 'es' | 'en';
  /** Angular route path without a leading slash. */
  readonly path: string;
  readonly renderMode: 'Server';
}

/** Internal preview namespace. Never mounted in the production application. */
export const GOVERNANCE_PREVIEW_NAMESPACE = 'internal/catalog/sku-governance';

export const GOVERNANCE_PREVIEW_ROUTES: readonly GovernancePreviewRoute[] = Object.freeze([
  { locale: 'es', path: GOVERNANCE_PREVIEW_NAMESPACE, renderMode: 'Server' },
  { locale: 'en', path: `en/${GOVERNANCE_PREVIEW_NAMESPACE}`, renderMode: 'Server' },
]);

/** Fail-closed facts shared by both locales. */
export const GOVERNANCE_PREVIEW_IDENTITY = Object.freeze({
  routeStatus: 'PROPOSED_INTERNAL_NOT_DEPLOYABLE',
  publicRouteRegistered: false,
  reservedPublicPathActivated: false,
  publicationAuthorized: false,
  indexationAuthorized: false,
  sitemapEligible: false,
  leadCapture: false,
  purchasable: false,
  priceProvided: false,
  customerDataCollected: false,
} as const);
