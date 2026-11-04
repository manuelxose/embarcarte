/**
 * MC-19 internal audience pages — evidence registry.
 *
 * Every content block cites at least one id from this registry. The validator
 * (`scripts/check-mc19-implementation.mjs`) checks that:
 *   1. every id resolves here;
 *   2. every `sourcePath` exists in the repository;
 *   3. no id claims an external approval (none exists).
 *
 * Evidence records what the source states TODAY. It is never an approval.
 */

export type SegmentEvidenceSourceType = 'DOCUMENT' | 'DATASET' | 'IMPLEMENTATION';

export interface SegmentEvidence {
  readonly evidenceId: string;
  readonly sourcePath: string;
  readonly sourceType: SegmentEvidenceSourceType;
  readonly establishes: string;
}

export const SEGMENT_EVIDENCE: readonly SegmentEvidence[] = [
  {
    evidenceId: 'EV-MC19-INSTRUCTION',
    sourcePath: 'docs/marea/segments/MC19-IMPLEMENTATION-CONTRACT.md',
    sourceType: 'DOCUMENT',
    establishes:
      'The MC-19 internal scope instruction (Option A, three bilingual audience pages), recorded with its provenance: supplied by the requesting product owner on 2026-11-04. External legal and commercial approvals remain outstanding.',
  },
  {
    evidenceId: 'EV-MC19-IA',
    sourcePath: 'docs/marea/segments/MC19-IA-DECISION.md',
    sourceType: 'DOCUMENT',
    establishes:
      'The MC-19 IA decision: three internal audience identities, internal preview paths, no public route registration and no owners public route.',
  },
  {
    evidenceId: 'EV-MC19-IMPLEMENTATION',
    sourcePath: 'src/app/marea-segments/segment-page.ts',
    sourceType: 'IMPLEMENTATION',
    establishes:
      'This internal implementation: one bilingual component tree for three audience identities, rendered only by the isolated loopback preview.',
  },
  {
    evidenceId: 'EV-MC19-PREVIEW',
    sourcePath: 'preview/landing/server.ts',
    sourceType: 'IMPLEMENTATION',
    establishes:
      'Loopback-only preview server: Host allowlist, noindex headers, no external service and no public route.',
  },
  {
    evidenceId: 'EV-MC18-HANDOFF',
    sourcePath: 'docs/marea/landing/MC18-MC19-HANDOFF.md',
    sourceType: 'DOCUMENT',
    establishes:
      'MC-18 segment references (OWNERS, INSTALLERS, PROFESSIONAL_FLEETS), CTA restrictions and the privacy prerequisites for any enquiry flow.',
  },
  {
    evidenceId: 'EV-MC17-HANDOFF',
    sourcePath: 'docs/marea/design-system/MC17-MC18-HANDOFF.md',
    sourceType: 'DOCUMENT',
    establishes:
      'Verified MC-17 design-system reuse contract, mode boundaries and commercial CTA restrictions.',
  },
  {
    evidenceId: 'EV-MC15-ROUTES',
    sourcePath: 'docs/marea/information-architecture/data/proposed-routes.json',
    sourceType: 'DATASET',
    establishes:
      'MC-15 proposed route registry: professionals and installers exist as PROPOSED_INTERNAL_NOT_DEPLOYABLE; no owners route, entity or page type exists.',
  },
  {
    evidenceId: 'EV-MC15-INDEXATION',
    sourcePath: 'docs/marea/information-architecture/data/indexation-policy.json',
    sourceType: 'DATASET',
    establishes:
      'Proposed routes stay excluded from sitemap and indexation until publication authorisation.',
  },
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
      'Canonical 26 editions: definition status, quotation requirement, merchantable=false and priceApproved=false.',
  },
  {
    evidenceId: 'EV-MC16-BUNDLES',
    sourcePath: 'docs/marea/commerce-data/data/bundle-compositions.json',
    sourceType: 'DATASET',
    establishes:
      'Canonical six bundles: contract-only/ineligible lines, FLEET contracted solution, hardwareIncludedByDefault=false and slaEstablished=false.',
  },
  {
    evidenceId: 'EV-MC05-PRODUCTS',
    sourcePath: 'docs/marea/products/product-definitions.batch-01.json',
    sourceType: 'DATASET',
    establishes:
      'NAV, HUB and AIS definitions: intended function, installation route, integration matrix and receive-only AIS scope.',
  },
  {
    evidenceId: 'EV-MC06-PRODUCTS',
    sourcePath: 'docs/marea/products/product-definitions.batch-02.json',
    sourceType: 'DATASET',
    establishes:
      'PILOT, SENSE and WATCH definitions: PILOT professional installation/acceptance and BLOCKED safety gate; SENSE calibration; WATCH conditional remote awareness.',
  },
  {
    evidenceId: 'EV-MC07-PRODUCTS',
    sourcePath: 'docs/marea/products/product-definitions.batch-03.json',
    sourceType: 'DATASET',
    establishes:
      'DISPLAY, WEATHER and FLEET definitions: fixed wired display, unlicensed forecast data, and the contracted multi-tenant FLEET service with no default hardware and no SLA.',
  },
  {
    evidenceId: 'EV-MC11-HARDWARE',
    sourcePath: 'docs/marea/hardware/data/conformity-applicability.json',
    sourceType: 'DATASET',
    establishes:
      'No selected hardware, no conformity evidence, no CE marking claim and no tested compatibility rows.',
  },
  {
    evidenceId: 'EV-MC14-GATES',
    sourcePath: 'docs/marea/legal-commercial/data/release-evidence-gates.json',
    sourceType: 'DATASET',
    establishes:
      '13 release gates, 0 closed; 24 required documents, 0 executed; GATE-PRIVACY-DPA-DPIA BLOCKED; DOC-17 NOT_EXECUTED.',
  },
  {
    evidenceId: 'EV-MC14-CLAIMS',
    sourcePath: 'docs/marea/legal-commercial/data/claims-policy.json',
    sourceType: 'DATASET',
    establishes:
      'Claims policy: 42 catalogued claims, 0 public-authorised, 30 mandatory prohibited categories.',
  },
  {
    evidenceId: 'EV-MC04-BRAND',
    sourcePath: 'docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md',
    sourceType: 'DOCUMENT',
    establishes: 'MAREA is a proposed brand: trademark clearance NOT_GRANTED and public use NO_GO.',
  },
] as const;

const BY_ID = new Map(SEGMENT_EVIDENCE.map((entry) => [entry.evidenceId, entry]));

export function segmentEvidenceById(evidenceId: string): SegmentEvidence | undefined {
  return BY_ID.get(evidenceId);
}

export const SEGMENT_EVIDENCE_IDS: readonly string[] = SEGMENT_EVIDENCE.map(
  (entry) => entry.evidenceId,
);
