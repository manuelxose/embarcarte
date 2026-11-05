/**
 * MC-24 internal preview route for the configurator and quotation triage.
 *
 * Exactly like the nine family catalogue pages and the MC-23 bundle comparison,
 * this is an INTERNAL preview page: it lives under the internal namespace, it is
 * loopback-reachable only, it emits no canonical, no hreflang, no social card and
 * no structured data, and it is marked noindex. It registers no public route and
 * no sitemap entry.
 */
export interface ConfiguratorPreviewRoute {
  readonly locale: 'es' | 'en';
  /** Angular route path without a leading slash. */
  readonly path: string;
  readonly renderMode: 'Server';
}

/** Internal preview namespace. Never mounted in the production application. */
export const CONFIGURATOR_PREVIEW_NAMESPACE = 'internal/catalog/configurator';

export const CONFIGURATOR_PREVIEW_ROUTES: readonly ConfiguratorPreviewRoute[] = [
  { locale: 'es', path: CONFIGURATOR_PREVIEW_NAMESPACE, renderMode: 'Server' },
  { locale: 'en', path: `en/${CONFIGURATOR_PREVIEW_NAMESPACE}`, renderMode: 'Server' },
];

/** Fail-closed facts shared by both locales. */
export const CONFIGURATOR_PREVIEW_IDENTITY = {
  routeStatus: 'PROPOSED_INTERNAL_NOT_DEPLOYABLE',
  publicRouteRegistered: false,
  reservedPublicPathActivated: false,
  publicationAuthorized: false,
  indexationAuthorized: false,
  sitemapEligible: false,
  leadCapture: false,
  purchasable: false,
  priceProvided: false,
} as const;
