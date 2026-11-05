/**
 * MC-18 internal landing — publication gate model.
 *
 * Fail-closed evaluation. This module is pure TypeScript: no Angular, no
 * environment variable, no query parameter and no UI toggle participates in the
 * decision. A missing value is `false`. The current evaluation is recorded in
 * `docs/marea/landing/data/publication-gates.json`.
 */

/** The 13 MC-14 release gates (all currently closed). */
export const RELEASE_GATE_IDS = [
  'GATE-MARKET-PLACEMENT',
  'GATE-SAFETY-PILOT',
  'GATE-IP-CLEARANCE',
  'GATE-DATA-LICENSING',
  'GATE-PRIVACY-DPA-DPIA',
  'GATE-CRA-CYBERSECURITY',
  'GATE-CONSUMER-TERMS',
  'GATE-COMMERCIAL-CLAIMS',
  'GATE-PRICING',
  'GATE-PAYMENTS',
  'GATE-INSURANCE',
  'GATE-LEGAL-ENTITY',
  'GATE-WEBSITE-REMEDIATION',
] as const;

export type ReleaseGateId = (typeof RELEASE_GATE_IDS)[number];

/** Recorded MC-14 gate state. 0 of 13 closed; 24 required documents, 0 executed. */
export const RELEASE_GATE_RECORD = {
  source: 'docs/marea/legal-commercial/data/release-evidence-gates.json',
  gates: 13,
  gatesClosed: 0,
  gatesBlocked: 12,
  gatesEvidenceRequired: 1,
  requiredDocuments: 24,
  documentsExecuted: 0,
  openGateIds: RELEASE_GATE_IDS,
} as const;

/** Page-level publication booleans. The three approval ids are not booleans:
 * they are records that do not exist, so they are typed `null` on purpose. */
export interface PublicationGateInput {
  readonly pageImplemented?: boolean | null;
  readonly internalPreviewReady?: boolean | null;
  readonly publicCopyApproved?: boolean | null;
  readonly trademarkCleared?: boolean | null;
  readonly sourceIpCleared?: boolean | null;
  readonly legalIdentityVerified?: boolean | null;
  readonly claimsApproved?: boolean | null;
  readonly privacyApproved?: boolean | null;
  readonly commercialDataApproved?: boolean | null;
  readonly publicationApproved?: boolean | null;
  readonly indexationApproved?: boolean | null;
  readonly deploymentApproved?: boolean | null;
}

export interface PublicationGateState {
  readonly pageImplemented: boolean;
  readonly internalPreviewReady: boolean;
  readonly publicCopyApproved: boolean;
  readonly trademarkCleared: boolean;
  readonly sourceIpCleared: boolean;
  readonly legalIdentityVerified: boolean;
  readonly claimsApproved: boolean;
  readonly privacyApproved: boolean;
  readonly commercialDataApproved: boolean;
  readonly publicationApproved: boolean;
  readonly indexationApproved: boolean;
  readonly deploymentApproved: boolean;
  readonly blockingGateIds: readonly string[];
  /** True only when every gate is satisfied. There is no override. */
  readonly publishable: boolean;
}

const GATE_FIELDS: readonly (keyof PublicationGateInput)[] = [
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

/** Missing, non-boolean or false values are all unsatisfied. `true` is required. */
function satisfied(value: unknown): boolean {
  return value === true;
}

export function evaluatePublicationGates(input: PublicationGateInput): PublicationGateState {
  const source = input ?? {};
  const state = {} as Record<keyof PublicationGateInput, boolean>;
  for (const field of [
    'pageImplemented',
    'internalPreviewReady',
    ...GATE_FIELDS,
  ] as (keyof PublicationGateInput)[]) {
    state[field] = satisfied(source[field]);
  }

  // Blocking ids are derived from the same fail-closed evaluation, in a stable order.
  const blockingGateIds: string[] = [];
  for (const field of GATE_FIELDS) {
    if (!state[field])
      blockingGateIds.push(`GATE-${field.replace(/[A-Z]/g, (c) => `-${c}`).toUpperCase()}`);
  }

  const pageImplemented = state['pageImplemented'];
  const internalPreviewReady = state['internalPreviewReady'];
  const publishable =
    pageImplemented && internalPreviewReady && GATE_FIELDS.every((field) => state[field]);

  return {
    pageImplemented,
    internalPreviewReady,
    publicCopyApproved: state['publicCopyApproved'],
    trademarkCleared: state['trademarkCleared'],
    sourceIpCleared: state['sourceIpCleared'],
    legalIdentityVerified: state['legalIdentityVerified'],
    claimsApproved: state['claimsApproved'],
    privacyApproved: state['privacyApproved'],
    commercialDataApproved: state['commercialDataApproved'],
    publicationApproved: state['publicationApproved'],
    indexationApproved: state['indexationApproved'],
    deploymentApproved: state['deploymentApproved'],
    blockingGateIds,
    publishable,
  };
}

/** Inputs that are actually established by MC-18 internal scope. */
export const MC18_GATE_INPUTS: PublicationGateInput = {
  pageImplemented: true,
  internalPreviewReady: true,
  publicCopyApproved: false,
  trademarkCleared: false,
  sourceIpCleared: false,
  legalIdentityVerified: false,
  claimsApproved: false,
  privacyApproved: false,
  commercialDataApproved: false,
  publicationApproved: false,
  indexationApproved: false,
  deploymentApproved: false,
};

export const MC18_PUBLICATION_EVALUATION = evaluatePublicationGates(MC18_GATE_INPUTS);

/** A single function that always fails closed; used by UI text and tests. */
export function landingMayPublish(input: PublicationGateInput): boolean {
  return evaluatePublicationGates(input).publishable;
}
