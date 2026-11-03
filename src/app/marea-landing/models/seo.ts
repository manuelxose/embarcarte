/**
 * MC-18 internal landing — SEO planning contract.
 *
 * MC-18 plans future metadata and its activation gates. It does NOT emit public
 * canonical, hreflang, Open Graph, JSON-LD or sitemap entries: the route is not
 * published. Two independent locks are modelled:
 *
 *   1. every publication/indexation/deployment gate must be satisfied (fail
 *      closed);
 *   2. a release authorization record must exist. The type below has no code
 *      path that creates one: `LANDING_RELEASE_AUTHORIZATION` is `null`, so a
 *      single boolean or environment variable can never activate metadata.
 */
import type { LandingLocale } from '../content/content.types';
import { LANDING_PAGE_IDENTITY } from './page-identity';
import type { PublicationGateState } from './publication-gates';

export const SITE_ORIGIN_CANDIDATE = 'https://embarcarte.com';

/** Preview responses must be non-indexable and non-public. */
export const PREVIEW_ROBOTS_DIRECTIVE = 'noindex, nofollow, noarchive';
export const PREVIEW_X_ROBOTS_TAG = 'noindex, nofollow, noarchive';

export type RobotsPolicy = 'noindex,nofollow' | 'index,follow';

export interface HreflangCandidate {
  readonly locale: LandingLocale;
  readonly hreflang: string;
  readonly href: string;
  readonly isXDefault: boolean;
}

export interface OpenGraphCandidate {
  readonly title: string;
  readonly description: string;
  readonly type: 'website';
  readonly locale: string;
  readonly siteName: string;
  /** No image is published: a conceptual card would assert availability. */
  readonly image: null;
}

export interface TwitterCardCandidate {
  readonly card: 'summary';
  readonly title: string;
  readonly description: string;
}

/** Structured data is not merely disabled: it is ineligible for this route. */
export interface StructuredDataEligibility {
  readonly product: false;
  readonly offer: false;
  readonly aggregateRating: false;
  readonly review: false;
  readonly breadcrumbList: false;
  readonly organization: false;
  /** Any future schema must be re-reviewed; MC-18 emits no JSON-LD. */
  readonly anyJsonLdEmitted: false;
}

export interface ReleaseAuthorization {
  readonly authorizationId: string;
  readonly scope: 'PUBLICATION';
  readonly authorizedBy: string;
  readonly authorizedAt: string;
  readonly legalClearanceReference: string;
}

/**
 * Deliberately `null`: no publication authorization exists. Nothing in the
 * landing computes this value, and the validator rejects any assignment.
 */
export const LANDING_RELEASE_AUTHORIZATION: ReleaseAuthorization | null = null;

export interface SeoActivationState {
  readonly metadataActivationAllowed: boolean;
  readonly canonicalEmissionAllowed: boolean;
  readonly hreflangEmissionAllowed: boolean;
  readonly openGraphEmissionAllowed: boolean;
  readonly structuredDataAllowed: boolean;
  readonly sitemapEligible: boolean;
  readonly indexationAllowed: boolean;
  readonly blockingReasons: readonly string[];
  readonly authorization: ReleaseAuthorization | null;
}

export interface LandingSeoMetadataContract {
  readonly routeId: 'mareaOverview';
  readonly entityId: 'ENT-HUB-MAREA';
  readonly pageType: 'HUB_OVERVIEW';
  readonly locale: LandingLocale;
  readonly pageTitle: string;
  readonly metaDescription: string;
  /** Planning candidate for a future authorized release. Not emitted live. */
  readonly canonicalCandidate: string;
  /** Candidate alternates, reciprocal by construction. Not emitted live. */
  readonly hreflangGroupCandidate: readonly HreflangCandidate[];
  readonly robotsPolicy: RobotsPolicy;
  readonly openGraphCandidate: OpenGraphCandidate;
  readonly twitterCardCandidate: TwitterCardCandidate;
  readonly structuredDataEligibility: StructuredDataEligibility;
  readonly sitemapEligibility: false;
  readonly publicationGateIds: readonly string[];
  readonly activation: SeoActivationState;
  /** Live-emission flags observed by the validator and Playwright. */
  readonly emitted: {
    readonly canonical: false;
    readonly hreflang: false;
    readonly openGraph: false;
    readonly twitterCard: false;
    readonly jsonLd: false;
    readonly robotsNoindex: true;
  };
}

/** Metadata copy is internal draft planning copy, never approved marketing. */
const TITLES: Readonly<Record<LandingLocale, string>> = {
  es: 'MAREA — ecosistema marino propuesto (vista interna, no publicada)',
  en: 'MAREA — proposed marine ecosystem (internal view, unpublished)',
};

const DESCRIPTIONS: Readonly<Record<LandingLocale, string>> = {
  es: 'Vista interna no publicada del ecosistema MAREA propuesto: nueve familias de producto y seis conceptos de solución. Sin precio aprobado, sin disponibilidad comercial y sin autorización de publicación.',
  en: 'Unpublished internal view of the proposed MAREA ecosystem: nine product families and six solution concepts. No approved price, no commercial availability and no publication authorisation.',
};

export function buildHreflangCandidates(): readonly HreflangCandidate[] {
  return [
    {
      locale: 'es',
      hreflang: LANDING_PAGE_IDENTITY.locales.es.hreflang,
      href: `${SITE_ORIGIN_CANDIDATE}${LANDING_PAGE_IDENTITY.locales.es.path}`,
      isXDefault: true,
    },
    {
      locale: 'en',
      hreflang: LANDING_PAGE_IDENTITY.locales.en.hreflang,
      href: `${SITE_ORIGIN_CANDIDATE}${LANDING_PAGE_IDENTITY.locales.en.path}`,
      isXDefault: false,
    },
  ];
}

/**
 * Fail-closed activation evaluation. Metadata can only activate when EVERY
 * publication gate is true AND a release authorization record exists. The
 * evaluation is deliberately as strict as page publication: no subset shortcut.
 */
export function evaluateSeoActivation(
  gates: PublicationGateState,
  authorization: ReleaseAuthorization | null = LANDING_RELEASE_AUTHORIZATION,
): SeoActivationState {
  const blockingReasons: string[] = [];
  const requiredGates: readonly (keyof PublicationGateState)[] = [
    'pageImplemented',
    'internalPreviewReady',
    'publicCopyApproved',
    'trademarkCleared',
    'sourceIpCleared',
    'legalIdentityVerified',
    'claimsApproved',
    'privacyApproved',
    'commercialDataApproved',
    'publicationApproved',
    'indexationApproved',
    'deploymentApproved',
  ];
  for (const gate of requiredGates) {
    if (gates[gate] !== true) blockingReasons.push(`${gate}Unsatisfied`);
  }
  if (!authorization) blockingReasons.push('releaseAuthorizationMissing');

  const allowed = blockingReasons.length === 0;
  return {
    metadataActivationAllowed: allowed,
    canonicalEmissionAllowed: allowed,
    hreflangEmissionAllowed: allowed,
    openGraphEmissionAllowed: allowed,
    structuredDataAllowed: false,
    sitemapEligible: false,
    indexationAllowed: allowed,
    blockingReasons,
    authorization: allowed ? authorization : null,
  };
}

export function buildLandingSeoContract(
  locale: LandingLocale,
  gates: PublicationGateState,
): LandingSeoMetadataContract {
  const hreflangGroupCandidate = buildHreflangCandidates();
  const activation = evaluateSeoActivation(gates);
  return {
    routeId: 'mareaOverview',
    entityId: 'ENT-HUB-MAREA',
    pageType: 'HUB_OVERVIEW',
    locale,
    pageTitle: TITLES[locale],
    metaDescription: DESCRIPTIONS[locale],
    canonicalCandidate: hreflangGroupCandidate.find((entry) => entry.locale === locale)!.href,
    hreflangGroupCandidate,
    robotsPolicy: activation.indexationAllowed ? 'index,follow' : 'noindex,nofollow',
    openGraphCandidate: {
      title: TITLES[locale],
      description: DESCRIPTIONS[locale],
      type: 'website',
      locale: locale === 'es' ? 'es_ES' : 'en_GB',
      siteName: 'EMBARCARTE',
      image: null,
    },
    twitterCardCandidate: {
      card: 'summary',
      title: TITLES[locale],
      description: DESCRIPTIONS[locale],
    },
    structuredDataEligibility: {
      product: false,
      offer: false,
      aggregateRating: false,
      review: false,
      breadcrumbList: false,
      organization: false,
      anyJsonLdEmitted: false,
    },
    sitemapEligibility: false,
    publicationGateIds: activation.blockingReasons,
    activation,
    emitted: {
      canonical: false,
      hreflang: false,
      openGraph: false,
      twitterCard: false,
      jsonLd: false,
      robotsNoindex: true,
    },
  };
}

/** Reciprocity check for the planned hreflang group. Both directions must exist. */
export function hreflangGroupIsReciprocal(group: readonly HreflangCandidate[]): boolean {
  if (group.length !== 2) return false;
  const locales = new Set(group.map((entry) => entry.locale));
  if (locales.size !== group.length) return false;
  return group.every(
    (entry) =>
      entry.href === `${SITE_ORIGIN_CANDIDATE}${LANDING_PAGE_IDENTITY.locales[entry.locale].path}`,
  );
}
