/**
 * MC-23 bundle comparison and upgrade-path domain model.
 *
 * Every fact here is COPIED from the MC-08 canonical contract
 * (`docs/marea/bundles/bundle-definitions.json`). None of it is authored,
 * inferred or rounded: a bundle's lifecycle, its availability, the inclusion of
 * each line and its upgrade paths are read from the contract.
 *
 * Two boundaries that must never be misread:
 *
 *  1. Inclusion is a COMMERCIAL classification, not a technical-support or
 *     compatibility statement. `INCLUDED` does not mean an integration was
 *     tested; `NOT_INCLUDED` does not mean a product is incompatible.
 *  2. There is no `ORDERABLE` outcome anywhere in MC-08 and none is produced
 *     here. Every configuration result is an internal classification. Nothing
 *     in this module grants a sale, a price, a stock position or a quotation.
 *
 * The module is Angular-free, side-effect free and deterministic: the same input
 * always produces the same output, with no clock, no randomness and no I/O.
 */

/** The six MC-08 commercial solutions, in canonical contract order. */
export const BUNDLE_ORDER = ['START', 'CRUISE', 'SAIL', 'PROTECT', 'COMPLETE', 'FLEET'] as const;

export type BundleId = (typeof BUNDLE_ORDER)[number];

/**
 * MC-08 inclusion vocabulary (component level). These are the only values the
 * comparison may ever display.
 */
export const INCLUSION_VOCABULARY = [
  'INCLUDED',
  'REQUIRED_EXTERNAL',
  'OPTIONAL',
  'CONDITIONAL',
  'NOT_INCLUDED',
  'INELIGIBLE',
  'QUOTATION_REQUIRED',
] as const;

export type BundleInclusion = (typeof INCLUSION_VOCABULARY)[number];

/** MC-08 internal configuration outcomes. `ORDERABLE` deliberately does not exist. */
export const CONFIGURATION_OUTCOMES = [
  'CONFIGURATION_DEFINED_INTERNAL',
  'COMPATIBILITY_EVIDENCE_REQUIRED',
  'SPECIALIST_SURVEY_REQUIRED',
  'QUOTATION_REQUIRED',
  'NOT_ELIGIBLE',
  'PUBLICATION_BLOCKED',
] as const;

export type BundleConfigurationOutcome = (typeof CONFIGURATION_OUTCOMES)[number];

/** The nine canonical product families of the MC-16 projection. */
export const COMPARISON_FAMILY_ORDER = [
  'NAV',
  'HUB',
  'AIS',
  'SENSE',
  'WATCH',
  'WEATHER',
  'DISPLAY',
  'PILOT',
  'FLEET',
] as const;

export type ComparisonFamilyId = (typeof COMPARISON_FAMILY_ORDER)[number];

/** One canonical line of a bundle's reference configuration. */
export interface BundleLine {
  readonly familyId: ComparisonFamilyId | null;
  readonly editionId: string | null;
  readonly inclusion: BundleInclusion;
  /** True only when the contract marks the line quotation-only. */
  readonly requiresQuotation: boolean;
  /** True when the line is part of the base composition rather than an add-on. */
  readonly requiredForOutcome: boolean;
}

export interface BundleRecord {
  readonly bundleId: BundleId;
  /** MC-08 lifecycle state, verbatim. */
  readonly lifecycleState: string;
  /** MC-08 commercial availability, verbatim. */
  readonly commercialAvailability: string;
  /** MC-08 publication state, verbatim. */
  readonly publicationState: string;
  /** MC-08 release readiness state, verbatim. */
  readonly readinessState: string;
  /** Release blockers recorded by the contract. */
  readonly blockers: readonly string[];
  readonly outcomes: readonly BundleConfigurationOutcome[];
  readonly lines: readonly BundleLine[];
}

/** Shorthand for a contract line. */
const line = (
  familyId: ComparisonFamilyId,
  editionId: string | null,
  inclusion: BundleInclusion,
): BundleLine => ({
  familyId,
  editionId,
  inclusion,
  requiresQuotation: inclusion === 'QUOTATION_REQUIRED',
  requiredForOutcome: inclusion === 'INCLUDED' || inclusion === 'QUOTATION_REQUIRED',
});

/**
 * The canonical composition, mirroring `bundle-definitions.json`.
 *
 * `components[]` lines are listed first (including the conditional and
 * ineligible lines the contract records), then `optionalComponents[]`.
 */
export const BUNDLES: readonly BundleRecord[] = [
  {
    bundleId: 'START',
    lifecycleState: 'DEFINED',
    commercialAvailability: 'NOT_FOR_SALE',
    publicationState: 'INTERNAL_ONLY',
    readinessState: 'INTERNAL_ONLY_DEFINED',
    blockers: ['X-01', 'X-05', 'X-06', 'H-04', 'H-05', 'H-07', 'P-02'],
    outcomes: ['CONFIGURATION_DEFINED_INTERNAL', 'COMPATIBILITY_EVIDENCE_REQUIRED', 'PUBLICATION_BLOCKED'],
    lines: [
      line('HUB', 'HUB-STANDARD', 'INCLUDED'),
      line('NAV', 'NAV-PRO', 'INCLUDED'),
      line('HUB', 'HUB-PRO', 'OPTIONAL'),
      line('WEATHER', 'WEATHER-STANDARD', 'OPTIONAL'),
    ],
  },
  {
    bundleId: 'CRUISE',
    lifecycleState: 'DEFINED',
    commercialAvailability: 'NOT_FOR_SALE',
    publicationState: 'INTERNAL_ONLY',
    readinessState: 'INTERNAL_ONLY_DEFINED',
    blockers: ['X-01', 'X-05', 'X-06', 'H-04', 'H-05', 'H-07', 'H-08', 'H-11', 'P-02', 'P-03', 'P-07'],
    outcomes: ['CONFIGURATION_DEFINED_INTERNAL', 'COMPATIBILITY_EVIDENCE_REQUIRED', 'PUBLICATION_BLOCKED'],
    lines: [
      line('NAV', 'NAV-ESSENTIAL', 'INCLUDED'),
      line('HUB', 'HUB-STANDARD', 'INCLUDED'),
      line('AIS', 'AIS-RECEIVER', 'INCLUDED'),
      line('DISPLAY', 'DISPLAY-7', 'INCLUDED'),
      line('AIS', 'AIS-CONNECTED', 'CONDITIONAL'),
      line('DISPLAY', 'DISPLAY-LARGE-CONDITIONAL', 'INELIGIBLE'),
      line('NAV', 'NAV-PRO', 'OPTIONAL'),
      line('WEATHER', 'WEATHER-STANDARD', 'OPTIONAL'),
    ],
  },
  {
    bundleId: 'SAIL',
    lifecycleState: 'DEFINED',
    commercialAvailability: 'NOT_FOR_SALE',
    publicationState: 'INTERNAL_ONLY',
    readinessState: 'BLOCKED',
    blockers: ['X-01', 'X-05', 'X-06', 'H-01', 'P-04', 'H-03', 'H-10', 'P-05', 'X-07'],
    outcomes: [
      'CONFIGURATION_DEFINED_INTERNAL',
      'COMPATIBILITY_EVIDENCE_REQUIRED',
      'SPECIALIST_SURVEY_REQUIRED',
      'QUOTATION_REQUIRED',
      'NOT_ELIGIBLE',
      'PUBLICATION_BLOCKED',
    ],
    lines: [
      line('NAV', 'NAV-PRO', 'INCLUDED'),
      line('HUB', 'HUB-STANDARD', 'INCLUDED'),
      line('PILOT', 'PILOT-COASTAL', 'QUOTATION_REQUIRED'),
      line('SENSE', 'SENSE-WIND', 'CONDITIONAL'),
      line('PILOT', 'PILOT-SAIL', 'CONDITIONAL'),
      line('PILOT', 'PILOT-PRO', 'INELIGIBLE'),
    ],
  },
  {
    bundleId: 'PROTECT',
    lifecycleState: 'DEFINED',
    commercialAvailability: 'NOT_FOR_SALE',
    publicationState: 'INTERNAL_ONLY',
    readinessState: 'INTERNAL_ONLY_DEFINED',
    blockers: ['X-01', 'X-05', 'X-07', 'H-05', 'H-12', 'P-05', 'P-06'],
    outcomes: ['CONFIGURATION_DEFINED_INTERNAL', 'COMPATIBILITY_EVIDENCE_REQUIRED', 'PUBLICATION_BLOCKED'],
    lines: [
      line('WATCH', 'WATCH-CORE', 'INCLUDED'),
      line('SENSE', 'SENSE-ESSENTIALS', 'INCLUDED'),
      line('SENSE', null, 'INELIGIBLE'),
      line('WATCH', 'WATCH-PLUS', 'CONDITIONAL'),
      line('HUB', 'HUB-STANDARD', 'OPTIONAL'),
    ],
  },
  {
    bundleId: 'COMPLETE',
    lifecycleState: 'DEFINED',
    commercialAvailability: 'NOT_FOR_SALE',
    publicationState: 'INTERNAL_ONLY',
    readinessState: 'BLOCKED',
    blockers: ['X-01', 'X-05', 'X-06', 'X-07', 'H-01', 'P-04', 'H-03', 'H-10', 'P-05', 'P-06', 'H-12', 'H-11', 'H-08'],
    outcomes: [
      'CONFIGURATION_DEFINED_INTERNAL',
      'COMPATIBILITY_EVIDENCE_REQUIRED',
      'SPECIALIST_SURVEY_REQUIRED',
      'QUOTATION_REQUIRED',
      'NOT_ELIGIBLE',
      'PUBLICATION_BLOCKED',
    ],
    lines: [
      line('NAV', 'NAV-PRO', 'INCLUDED'),
      line('HUB', 'HUB-PRO', 'INCLUDED'),
      line('DISPLAY', 'DISPLAY-7', 'INCLUDED'),
      line('WATCH', 'WATCH-CORE', 'INCLUDED'),
      line('SENSE', 'SENSE-POWER', 'INCLUDED'),
      line('SENSE', 'SENSE-BILGE', 'INCLUDED'),
      line('SENSE', 'SENSE-TANKS', 'INCLUDED'),
      line('SENSE', 'SENSE-ENV', 'INCLUDED'),
      line('PILOT', 'PILOT-COASTAL', 'QUOTATION_REQUIRED'),
      line('PILOT', 'PILOT-PRO', 'INELIGIBLE'),
      line('PILOT', 'PILOT-SAIL', 'CONDITIONAL'),
      line('DISPLAY', 'DISPLAY-LARGE-CONDITIONAL', 'INELIGIBLE'),
      line('AIS', 'AIS-RECEIVER', 'OPTIONAL'),
      line('WEATHER', 'WEATHER-PRO', 'OPTIONAL'),
    ],
  },
  {
    bundleId: 'FLEET',
    lifecycleState: 'DEFINED',
    commercialAvailability: 'NOT_FOR_SALE',
    publicationState: 'INTERNAL_ONLY',
    readinessState: 'INTERNAL_ONLY_DEFINED',
    blockers: ['X-01', 'X-05', 'X-07', 'P-09', 'H-12', 'D-014', 'E-26'],
    outcomes: [
      'CONFIGURATION_DEFINED_INTERNAL',
      'COMPATIBILITY_EVIDENCE_REQUIRED',
      'QUOTATION_REQUIRED',
      'PUBLICATION_BLOCKED',
    ],
    lines: [
      line('FLEET', 'FLEET-START', 'INCLUDED'),
      line('FLEET', 'FLEET-ENTERPRISE', 'CONDITIONAL'),
      line('FLEET', null, 'INCLUDED'),
      line('WATCH', 'WATCH-CORE', 'OPTIONAL'),
      line('HUB', 'HUB-STANDARD', 'OPTIONAL'),
      line('FLEET', 'FLEET-BUSINESS', 'OPTIONAL'),
    ],
  },
];
