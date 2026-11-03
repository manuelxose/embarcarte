/**
 * MC-18 internal landing — evidence registry.
 *
 * Every content block cites at least one evidence id from this registry. The
 * validator (`scripts/check-marea-landing.mjs`) checks that:
 *   1. every id resolves here;
 *   2. every `sourcePath` exists in the repository;
 *   3. no block cites an id whose source is an external approval (there is none).
 *
 * Evidence describes what the source records TODAY. It is not an approval.
 */

export type EvidenceSourceType = 'DOCUMENT' | 'DATASET' | 'IMPLEMENTATION';

export interface LandingEvidence {
  readonly evidenceId: string;
  readonly sourcePath: string;
  readonly sourceType: EvidenceSourceType;
  /** What this source actually establishes. */
  readonly establishes: string;
}

export const LANDING_EVIDENCE: readonly LandingEvidence[] = [
  {
    evidenceId: 'EV-MC16-FAMILIES',
    sourcePath: 'docs/marea/commerce-data/data/product-families.json',
    sourceType: 'DATASET',
    establishes:
      'Canonical nine-family identity, lifecycle, readiness dimensions and commercial state (all NOT_FOR_SALE, 0 approved prices).',
  },
  {
    evidenceId: 'EV-MC16-EDITIONS',
    sourcePath: 'docs/marea/commerce-data/data/product-editions.json',
    sourceType: 'DATASET',
    establishes:
      'Canonical 26 editions, definition status, quotation requirement, merchantable=false and priceApproved=false.',
  },
  {
    evidenceId: 'EV-MC16-BUNDLES',
    sourcePath: 'docs/marea/commerce-data/data/bundle-compositions.json',
    sourceType: 'DATASET',
    establishes:
      'Canonical six bundles: component composition, contract-only/ ineligible lines, FLEET contracted solution, hardwareIncludedByDefault=false and slaEstablished=false.',
  },
  {
    evidenceId: 'EV-MC14-CLAIMS',
    sourcePath: 'docs/marea/legal-commercial/data/claims-policy.json',
    sourceType: 'DATASET',
    establishes:
      'Claims policy: 42 catalogued claims, 0 public-authorized, 30 mandatory prohibited categories, publicationAuthorization NONE.',
  },
  {
    evidenceId: 'EV-MC14-BILINGUAL-CLAIMS',
    sourcePath: 'docs/marea/legal-commercial/data/bilingual-claims.json',
    sourceType: 'DATASET',
    establishes:
      'Canonical ES/EN internal-only claim pairs (class A) usable as internal draft source, and the prohibited class P/X examples.',
  },
  {
    evidenceId: 'EV-MC14-GATES',
    sourcePath: 'docs/marea/legal-commercial/data/release-evidence-gates.json',
    sourceType: 'DATASET',
    establishes:
      '13 release gates, 0 closed; 24 required documents, 0 executed; external approvals absent.',
  },
  {
    evidenceId: 'EV-MC17-HANDOFF',
    sourcePath: 'docs/marea/design-system/MC17-MC18-HANDOFF.md',
    sourceType: 'DOCUMENT',
    establishes:
      'Verified MC-17 design-system handoff: component reuse contract, mode boundaries, CTA restrictions, no-publication rule.',
  },
  {
    evidenceId: 'EV-MC15-ROUTES',
    sourcePath: 'docs/marea/information-architecture/data/proposed-routes.json',
    sourceType: 'DATASET',
    establishes:
      'Frozen proposed route identity mareaOverview / ENT-HUB-MAREA / HUB_OVERVIEW (pageType as recorded in the canonical dataset) at /marea and /en/marea, publication not authorized.',
  },
  {
    evidenceId: 'EV-MC15-INDEXATION',
    sourcePath: 'docs/marea/information-architecture/data/indexation-policy.json',
    sourceType: 'DATASET',
    establishes:
      'Proposed routes excluded from sitemap and indexation until publication authorization.',
  },
  {
    evidenceId: 'EV-MC05-PRODUCTS',
    sourcePath: 'docs/marea/products/product-definitions.batch-01.json',
    sourceType: 'DATASET',
    establishes:
      'Product definitions, including PILOT safety status, AIS receive-only scope and per-family intended functionality.',
  },
  {
    evidenceId: 'EV-MC11-HARDWARE',
    sourcePath: 'docs/marea/hardware/data/conformity-applicability.json',
    sourceType: 'DATASET',
    establishes:
      'No selected hardware, no conformity evidence, no CE marking claim, no tested compatibility rows.',
  },
  {
    evidenceId: 'EV-MC04-BRAND',
    sourcePath: 'docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md',
    sourceType: 'DOCUMENT',
    establishes:
      'MAREA is a proposed brand: trademark clearance NOT_GRANTED, public use NO_GO, final identity adoption BLOCKED.',
  },
  {
    evidenceId: 'EV-MC18-IMPLEMENTATION',
    sourcePath: 'src/app/marea-landing/landing.ts',
    sourceType: 'IMPLEMENTATION',
    establishes:
      'This internal landing implementation: isolated preview, real MC-17 component reuse, no public route and no commercial action.',
  },
] as const;

const BY_ID = new Map(LANDING_EVIDENCE.map((entry) => [entry.evidenceId, entry]));

export function evidenceById(evidenceId: string): LandingEvidence | undefined {
  return BY_ID.get(evidenceId);
}
