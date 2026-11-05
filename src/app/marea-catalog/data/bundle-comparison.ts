/**
 * MC-23 bundle comparison domain model — GENERATED FROM THE MC-08 CONTRACT.
 *
 * Every value below is transcribed from
 * `docs/marea/bundles/bundle-definitions.json` (MC-08). Nothing is authored,
 * summarised or truncated. Regenerate with
 * `node scripts/build-mc23-bundle-data.mjs`; `--check` fails when the two
 * drift, so a hand edit that disagrees with the contract is a build error
 * rather than a review decision.
 *
 * Two boundaries that must never be misread:
 *
 *  1. Inclusion is a COMMERCIAL classification, not a technical-support or
 *     compatibility statement. `INCLUDED` does not mean an integration was
 *     tested; `NOT_INCLUDED` does not mean a product is incompatible.
 *  2. There is no `ORDERABLE` outcome in MC-08 and none is produced here. Every
 *     configuration result is internal. Nothing here grants a sale, a price, a
 *     stock position or a quotation.
 */

/** The six MC-08 commercial solutions, in canonical contract order. */
export const BUNDLE_ORDER = ["START","CRUISE","SAIL","PROTECT","COMPLETE","FLEET"] as const;

export type BundleId = (typeof BUNDLE_ORDER)[number];

/** MC-08 inclusion vocabulary (component level). */
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

/** One canonical line of a bundle's reference configuration, verbatim. */
export interface BundleLine {
  readonly lineId: string;
  readonly familyId: string | null;
  readonly editionId: string | null;
  readonly inclusion: BundleInclusion;
}

export interface BundleRecord {
  readonly bundleId: BundleId;
  readonly lifecycleState: string;
  readonly commercialAvailability: string;
  readonly publicationState: string;
  readonly readinessState: string;
  /** Release blockers, contract order, complete. */
  readonly blockers: readonly string[];
  /** Release gates, contract order, complete. */
  readonly gates: readonly string[];
  readonly outcomes: readonly BundleConfigurationOutcome[];
  /** Every component and optional line, including external and installation lines. */
  readonly lines: readonly BundleLine[];
}

/** Canonical composition of the six solutions. */
export const BUNDLES: readonly BundleRecord[] = [
  {
    bundleId: "START",
    lifecycleState: "DEFINED",
    commercialAvailability: "NOT_FOR_SALE",
    publicationState: "INTERNAL_ONLY",
    readinessState: "INTERNAL_ONLY_DEFINED",
    blockers: ["X-01", "X-05", "X-06", "H-04", "H-05", "H-07", "P-02", "P-01", "P-10", "D-01", "D-02", "D-03", "DEC-05"],
    gates: ["PUBLICATION_BLOCKED", "BRAND_CLEARANCE_NOT_GRANTED", "SOURCE_IP_NOT_CLEARED", "PRICE_NOT_APPROVED", "COMPATIBILITY_NOT_TESTED", "INSTALLATION_QUOTATION_REQUIRED"],
    outcomes: ["CONFIGURATION_DEFINED_INTERNAL", "COMPATIBILITY_EVIDENCE_REQUIRED", "PUBLICATION_BLOCKED"],
    lines: [
      { lineId: "ST-01", familyId: "HUB", editionId: "HUB-STANDARD", inclusion: "INCLUDED" },
      { lineId: "ST-02", familyId: "NAV", editionId: "NAV-PRO", inclusion: "INCLUDED" },
      { lineId: "ST-05", familyId: null, editionId: null, inclusion: "REQUIRED_EXTERNAL" },
      { lineId: "ST-06", familyId: null, editionId: null, inclusion: "REQUIRED_EXTERNAL" },
      { lineId: "ST-03", familyId: "HUB", editionId: "HUB-PRO", inclusion: "OPTIONAL" },
      { lineId: "ST-04", familyId: "WEATHER", editionId: "WEATHER-STANDARD", inclusion: "OPTIONAL" },
      { lineId: "ST-07", familyId: null, editionId: null, inclusion: "OPTIONAL" },
    ],
  },
  {
    bundleId: "CRUISE",
    lifecycleState: "DEFINED",
    commercialAvailability: "NOT_FOR_SALE",
    publicationState: "INTERNAL_ONLY",
    readinessState: "INTERNAL_ONLY_DEFINED",
    blockers: ["X-01", "X-05", "X-06", "H-04", "H-05", "H-07", "H-08", "H-11", "P-02", "P-03", "P-07", "D-01", "D-02", "D-03", "D-09", "DEC-05"],
    gates: ["PUBLICATION_BLOCKED", "BRAND_CLEARANCE_NOT_GRANTED", "SOURCE_IP_NOT_CLEARED", "PRICE_NOT_APPROVED", "COMPATIBILITY_NOT_TESTED", "DISPLAY_SIZE_NOT_FROZEN", "INSTALLATION_QUOTATION_REQUIRED"],
    outcomes: ["CONFIGURATION_DEFINED_INTERNAL", "COMPATIBILITY_EVIDENCE_REQUIRED", "PUBLICATION_BLOCKED"],
    lines: [
      { lineId: "CR-01", familyId: "NAV", editionId: "NAV-ESSENTIAL", inclusion: "INCLUDED" },
      { lineId: "CR-02", familyId: "HUB", editionId: "HUB-STANDARD", inclusion: "INCLUDED" },
      { lineId: "CR-03", familyId: "AIS", editionId: "AIS-RECEIVER", inclusion: "INCLUDED" },
      { lineId: "CR-04", familyId: "DISPLAY", editionId: "DISPLAY-7", inclusion: "INCLUDED" },
      { lineId: "CR-06", familyId: "AIS", editionId: "AIS-CONNECTED", inclusion: "CONDITIONAL" },
      { lineId: "CR-07", familyId: "DISPLAY", editionId: "DISPLAY-LARGE-CONDITIONAL", inclusion: "INELIGIBLE" },
      { lineId: "CR-09", familyId: null, editionId: null, inclusion: "REQUIRED_EXTERNAL" },
      { lineId: "CR-10", familyId: null, editionId: null, inclusion: "REQUIRED_EXTERNAL" },
      { lineId: "CR-11", familyId: null, editionId: null, inclusion: "REQUIRED_EXTERNAL" },
      { lineId: "CR-05", familyId: "NAV", editionId: "NAV-PRO", inclusion: "OPTIONAL" },
      { lineId: "CR-08", familyId: "WEATHER", editionId: "WEATHER-STANDARD", inclusion: "OPTIONAL" },
    ],
  },
  {
    bundleId: "SAIL",
    lifecycleState: "DEFINED",
    commercialAvailability: "NOT_FOR_SALE",
    publicationState: "INTERNAL_ONLY",
    readinessState: "BLOCKED",
    blockers: ["X-01", "X-05", "X-06", "H-01", "P-04", "H-03", "H-10", "P-05", "X-07", "D-01", "D-02", "D-03"],
    gates: ["PUBLICATION_BLOCKED", "PILOT_SAFETY_GATE_BLOCKED", "BRAND_CLEARANCE_NOT_GRANTED", "SOURCE_IP_NOT_CLEARED", "PRICE_NOT_APPROVED", "COMPATIBILITY_NOT_TESTED", "SURVEY_REQUIRED", "QUOTATION_REQUIRED"],
    outcomes: ["CONFIGURATION_DEFINED_INTERNAL", "COMPATIBILITY_EVIDENCE_REQUIRED", "SPECIALIST_SURVEY_REQUIRED", "QUOTATION_REQUIRED", "NOT_ELIGIBLE", "PUBLICATION_BLOCKED"],
    lines: [
      { lineId: "SL-01", familyId: "NAV", editionId: "NAV-PRO", inclusion: "INCLUDED" },
      { lineId: "SL-02", familyId: "HUB", editionId: "HUB-STANDARD", inclusion: "INCLUDED" },
      { lineId: "SL-03", familyId: "PILOT", editionId: "PILOT-COASTAL", inclusion: "QUOTATION_REQUIRED" },
      { lineId: "SL-04", familyId: "SENSE", editionId: "SENSE-WIND", inclusion: "CONDITIONAL" },
      { lineId: "SL-05", familyId: "PILOT", editionId: "PILOT-SAIL", inclusion: "CONDITIONAL" },
      { lineId: "SL-06", familyId: "PILOT", editionId: "PILOT-PRO", inclusion: "INELIGIBLE" },
      { lineId: "SL-08", familyId: null, editionId: null, inclusion: "REQUIRED_EXTERNAL" },
      { lineId: "SL-09", familyId: null, editionId: null, inclusion: "QUOTATION_REQUIRED" },
      { lineId: "SL-10", familyId: null, editionId: null, inclusion: "QUOTATION_REQUIRED" },
    ],
  },
  {
    bundleId: "PROTECT",
    lifecycleState: "DEFINED",
    commercialAvailability: "NOT_FOR_SALE",
    publicationState: "INTERNAL_ONLY",
    readinessState: "INTERNAL_ONLY_DEFINED",
    blockers: ["X-01", "X-05", "X-07", "H-05", "H-12", "P-05", "P-06", "DEC-05"],
    gates: ["PUBLICATION_BLOCKED", "BRAND_CLEARANCE_NOT_GRANTED", "SOURCE_IP_NOT_CLEARED", "PRICE_NOT_APPROVED", "COMPATIBILITY_NOT_TESTED", "WATCH_SERVICE_NOT_FOUND", "CONNECTIVITY_CONTRACT_NOT_FOUND"],
    outcomes: ["CONFIGURATION_DEFINED_INTERNAL", "COMPATIBILITY_EVIDENCE_REQUIRED", "PUBLICATION_BLOCKED"],
    lines: [
      { lineId: "PR-01", familyId: "WATCH", editionId: "WATCH-CORE", inclusion: "INCLUDED" },
      { lineId: "PR-02", familyId: "SENSE", editionId: "SENSE-ESSENTIALS", inclusion: "INCLUDED" },
      { lineId: "PR-03", familyId: "SENSE", editionId: null, inclusion: "INELIGIBLE" },
      { lineId: "PR-05", familyId: "WATCH", editionId: "WATCH-PLUS", inclusion: "CONDITIONAL" },
      { lineId: "PR-06", familyId: null, editionId: null, inclusion: "REQUIRED_EXTERNAL" },
      { lineId: "PR-07", familyId: null, editionId: null, inclusion: "INCLUDED" },
      { lineId: "PR-08", familyId: null, editionId: null, inclusion: "REQUIRED_EXTERNAL" },
      { lineId: "PR-04", familyId: "HUB", editionId: "HUB-STANDARD", inclusion: "OPTIONAL" },
    ],
  },
  {
    bundleId: "COMPLETE",
    lifecycleState: "DEFINED",
    commercialAvailability: "NOT_FOR_SALE",
    publicationState: "INTERNAL_ONLY",
    readinessState: "BLOCKED",
    blockers: ["X-01", "X-05", "X-06", "X-07", "H-01", "P-04", "H-03", "H-10", "P-05", "P-06", "H-12", "H-11", "H-08", "P-03", "P-07", "D-01", "D-02", "D-03", "D-04", "D-05", "D-07", "D-09"],
    gates: ["PUBLICATION_BLOCKED", "PILOT_SAFETY_GATE_BLOCKED", "BRAND_CLEARANCE_NOT_GRANTED", "SOURCE_IP_NOT_CLEARED", "PRICE_NOT_APPROVED", "COMPATIBILITY_NOT_TESTED", "SURVEY_REQUIRED", "QUOTATION_REQUIRED", "WATCH_SERVICE_NOT_FOUND", "DISPLAY_SIZE_NOT_FROZEN"],
    outcomes: ["CONFIGURATION_DEFINED_INTERNAL", "COMPATIBILITY_EVIDENCE_REQUIRED", "SPECIALIST_SURVEY_REQUIRED", "QUOTATION_REQUIRED", "NOT_ELIGIBLE", "PUBLICATION_BLOCKED"],
    lines: [
      { lineId: "CP-01", familyId: "NAV", editionId: "NAV-PRO", inclusion: "INCLUDED" },
      { lineId: "CP-02", familyId: "HUB", editionId: "HUB-PRO", inclusion: "INCLUDED" },
      { lineId: "CP-03", familyId: "DISPLAY", editionId: "DISPLAY-7", inclusion: "INCLUDED" },
      { lineId: "CP-04", familyId: "WATCH", editionId: "WATCH-CORE", inclusion: "INCLUDED" },
      { lineId: "CP-05", familyId: "SENSE", editionId: "SENSE-POWER", inclusion: "INCLUDED" },
      { lineId: "CP-06", familyId: "SENSE", editionId: "SENSE-BILGE", inclusion: "INCLUDED" },
      { lineId: "CP-07", familyId: "SENSE", editionId: "SENSE-TANKS", inclusion: "INCLUDED" },
      { lineId: "CP-08", familyId: "SENSE", editionId: "SENSE-ENV", inclusion: "INCLUDED" },
      { lineId: "CP-09", familyId: "PILOT", editionId: "PILOT-COASTAL", inclusion: "QUOTATION_REQUIRED" },
      { lineId: "CP-13", familyId: "PILOT", editionId: "PILOT-PRO", inclusion: "INELIGIBLE" },
      { lineId: "CP-14", familyId: "PILOT", editionId: "PILOT-SAIL", inclusion: "CONDITIONAL" },
      { lineId: "CP-15", familyId: "DISPLAY", editionId: "DISPLAY-LARGE-CONDITIONAL", inclusion: "INELIGIBLE" },
      { lineId: "CP-16", familyId: null, editionId: null, inclusion: "REQUIRED_EXTERNAL" },
      { lineId: "CP-17", familyId: null, editionId: null, inclusion: "QUOTATION_REQUIRED" },
      { lineId: "CP-10", familyId: "AIS", editionId: "AIS-RECEIVER", inclusion: "OPTIONAL" },
      { lineId: "CP-11", familyId: "WEATHER", editionId: "WEATHER-PRO", inclusion: "OPTIONAL" },
    ],
  },
  {
    bundleId: "FLEET",
    lifecycleState: "DEFINED",
    commercialAvailability: "NOT_FOR_SALE",
    publicationState: "INTERNAL_ONLY",
    readinessState: "INTERNAL_ONLY_DEFINED",
    blockers: ["X-01", "X-05", "X-07", "P-09", "H-12", "D-014", "E-26"],
    gates: ["PUBLICATION_BLOCKED", "BRAND_CLEARANCE_NOT_GRANTED", "SOURCE_IP_NOT_CLEARED", "PRICE_NOT_APPROVED", "FLEET_SERVICE_NOT_IMPLEMENTED", "SLA_NOT_ESTABLISHED", "CONNECTIVITY_CONTRACT_NOT_FOUND"],
    outcomes: ["CONFIGURATION_DEFINED_INTERNAL", "COMPATIBILITY_EVIDENCE_REQUIRED", "QUOTATION_REQUIRED", "PUBLICATION_BLOCKED"],
    lines: [
      { lineId: "FP-01", familyId: "FLEET", editionId: "FLEET-START", inclusion: "INCLUDED" },
      { lineId: "FP-02", familyId: "FLEET", editionId: "FLEET-ENTERPRISE", inclusion: "CONDITIONAL" },
      { lineId: "FP-03", familyId: null, editionId: null, inclusion: "INCLUDED" },
      { lineId: "FP-04", familyId: null, editionId: null, inclusion: "INCLUDED" },
      { lineId: "FP-08", familyId: null, editionId: null, inclusion: "REQUIRED_EXTERNAL" },
      { lineId: "FP-10", familyId: null, editionId: null, inclusion: "CONDITIONAL" },
      { lineId: "FP-11", familyId: "FLEET", editionId: null, inclusion: "INCLUDED" },
      { lineId: "FP-05", familyId: "WATCH", editionId: "WATCH-CORE", inclusion: "OPTIONAL" },
      { lineId: "FP-06", familyId: "HUB", editionId: "HUB-STANDARD", inclusion: "OPTIONAL" },
      { lineId: "FP-07", familyId: "SENSE", editionId: null, inclusion: "OPTIONAL" },
      { lineId: "FP-09", familyId: null, editionId: null, inclusion: "OPTIONAL" },
      { lineId: "FP-12", familyId: "FLEET", editionId: "FLEET-BUSINESS", inclusion: "OPTIONAL" },
    ],
  },
];

/** One upgrade path from the contract. */
export interface BundleUpgradePath {
  readonly upgradeId: string;
  readonly path: string;
  readonly fromBundleId: BundleId | null;
  readonly adds: readonly string[];
  readonly preserves: readonly string[];
  readonly condition: string;
  readonly requiresNewQuotation: boolean;
}

/** Every upgrade path in the contract, complete. */
export const UPGRADE_PATHS: readonly BundleUpgradePath[] = [
  {
    upgradeId: "UM-ST-01",
    path: "START to CRUISE",
    fromBundleId: "START",
    adds: ["AIS-RECEIVER", "DISPLAY-7"],
    preserves: ["HUB-STANDARD", "NAV-PRO or documented NAV-ESSENTIAL variant"],
    condition: "Compatibility evidence and installation assessment",
    requiresNewQuotation: true,
  },
  {
    upgradeId: "UM-ST-02",
    path: "START to SAIL",
    fromBundleId: "START",
    adds: ["PILOT-COASTAL (quotation)", "SENSE-WIND"],
    preserves: ["HUB-STANDARD", "NAV-PRO"],
    condition: "Vessel and steering survey; PILOT safety gate BLOCKED",
    requiresNewQuotation: true,
  },
  {
    upgradeId: "UM-ST-03",
    path: "START edition upgrades",
    fromBundleId: "START",
    adds: ["HUB-PRO", "NAV-PRO"],
    preserves: ["customer records and exports"],
    condition: "Price and compatibility confirmation",
    requiresNewQuotation: false,
  },
  {
    upgradeId: "UM-CR-01",
    path: "CRUISE to COMPLETE",
    fromBundleId: "CRUISE",
    adds: ["HUB-PRO", "WATCH-CORE", "SENSE-POWER", "SENSE-BILGE", "SENSE-TANKS", "SENSE-ENV", "PILOT-COASTAL (quotation)"],
    preserves: ["NAV subscription", "AIS-RECEIVER", "DISPLAY-7"],
    condition: "Full compatibility and safety survey; PILOT safety gate BLOCKED",
    requiresNewQuotation: true,
  },
  {
    upgradeId: "UM-CR-02",
    path: "NAV-ESSENTIAL to NAV-PRO",
    fromBundleId: "CRUISE",
    adds: ["NAV-PRO capabilities"],
    preserves: ["customer records and exports"],
    condition: "Price and compatibility confirmation; prorated upgrade credit is a hypothesis",
    requiresNewQuotation: false,
  },
  {
    upgradeId: "UM-CR-03",
    path: "CRUISE to START (simplification)",
    fromBundleId: "CRUISE",
    adds: [],
    preserves: ["HUB-STANDARD"],
    condition: "Not a supported customer downgrade path; recorded for internal comparison only",
    requiresNewQuotation: false,
  },
  {
    upgradeId: "UM-SL-01",
    path: "SAIL to COMPLETE",
    fromBundleId: "SAIL",
    adds: ["HUB-PRO", "DISPLAY-7", "WATCH-CORE", "SENSE-POWER", "SENSE-BILGE", "SENSE-TANKS", "SENSE-ENV", "AIS-RECEIVER optional", "WEATHER-PRO optional"],
    preserves: ["NAV-PRO", "PILOT-COASTAL quotation", "SENSE-WIND"],
    condition: "Full compatibility and safety survey; multiple gates BLOCKED",
    requiresNewQuotation: true,
  },
  {
    upgradeId: "UM-SL-02",
    path: "START/CRUISE to SAIL",
    fromBundleId: "SAIL",
    adds: ["PILOT-COASTAL quotation", "SENSE-WIND", "PILOT survey scope"],
    preserves: ["existing HUB/NAV"],
    condition: "Steering survey and PILOT safety gate",
    requiresNewQuotation: true,
  },
  {
    upgradeId: "UM-PR-01",
    path: "PROTECT to COMPLETE",
    fromBundleId: "PROTECT",
    adds: ["NAV-PRO", "HUB-PRO", "DISPLAY-7", "SENSE-POWER", "SENSE-BILGE", "SENSE-TANKS", "SENSE-ENV", "PILOT-COASTAL quotation"],
    preserves: ["WATCH-CORE and monitoring subscription", "HUB optional"],
    condition: "Full compatibility and safety survey; multiple gates BLOCKED",
    requiresNewQuotation: true,
  },
  {
    upgradeId: "UM-PR-02",
    path: "PROTECT sensor expansion",
    fromBundleId: "PROTECT",
    adds: ["additional SENSE modules through a new configuration and cost sheet"],
    preserves: ["existing kit and WATCH"],
    condition: "Measurement evidence and a new kit/module cost sheet; never a loose duplicate beside the kit",
    requiresNewQuotation: true,
  },
  {
    upgradeId: "UM-CP-01",
    path: "COMPLETE optional additions",
    fromBundleId: "COMPLETE",
    adds: ["AIS-RECEIVER", "WEATHER-PRO"],
    preserves: ["all reference subsystems"],
    condition: "Separate purchase, entitlement and compatibility evidence",
    requiresNewQuotation: true,
  },
  {
    upgradeId: "UM-CP-02",
    path: "START/CRUISE/PROTECT/SAIL to COMPLETE",
    fromBundleId: "COMPLETE",
    adds: ["the remaining reference subsystems and the coordinated project scope"],
    preserves: ["existing compatible hardware and active entitlements"],
    condition: "Full survey, itemised quotation and all open gates",
    requiresNewQuotation: true,
  },
  {
    upgradeId: "UM-FP-01",
    path: "FLEET-START to FLEET-BUSINESS",
    fromBundleId: "FLEET",
    adds: ["richer permissions, workflows, reporting and integrations"],
    preserves: ["vessel data and role design"],
    condition: "Volume terms quoted; price hypotheses unapproved",
    requiresNewQuotation: true,
  },
  {
    upgradeId: "UM-FP-02",
    path: "FLEET-ENTERPRISE",
    fromBundleId: "FLEET",
    adds: ["negotiated tier and contracted integrations/SLA"],
    preserves: ["existing contract scope"],
    condition: "Written contract and measurement evidence for any SLA",
    requiresNewQuotation: true,
  },
  {
    upgradeId: "UM-FP-03",
    path: "FLEET package hardware expansion",
    fromBundleId: "FLEET",
    adds: ["WATCH-CORE", "HUB-STANDARD", "SENSE modules", "installation"],
    preserves: ["SaaS contract and vessel registrations"],
    condition: "Separate purchases and subscriptions; hardware never folded into the SaaS fee",
    requiresNewQuotation: true,
  },
];

/** One cross-sell rule from the contract. */
export interface BundleCrossSellRule {
  readonly ruleId: string;
  readonly fromBundleIds: readonly string[];
  readonly toBundleIds: readonly string[];
  readonly adds: readonly string[];
  readonly preserves: readonly string[];
  readonly condition: string;
  readonly prohibitsDoubleCharge: boolean;
}

/** Every cross-sell rule in the contract, complete. */
export const CROSS_SELL_RULES: readonly BundleCrossSellRule[] = [
  {
    ruleId: "CS-01",
    fromBundleIds: ["START"],
    toBundleIds: ["CRUISE"],
    adds: ["AIS-RECEIVER", "DISPLAY-7"],
    preserves: ["HUB-STANDARD", "NAV subscription"],
    condition: "Customer needs a fixed helm display and receive-only AIS traffic",
    prohibitsDoubleCharge: true,
  },
  {
    ruleId: "CS-02",
    fromBundleIds: ["CRUISE"],
    toBundleIds: ["COMPLETE"],
    adds: ["HUB-PRO", "WATCH-CORE", "four SENSE modules", "PILOT-COASTAL quotation"],
    preserves: ["NAV subscription", "AIS-RECEIVER", "DISPLAY-7"],
    condition: "Customer wants one coordinated professional integration",
    prohibitsDoubleCharge: true,
  },
  {
    ruleId: "CS-03",
    fromBundleIds: ["START", "CRUISE"],
    toBundleIds: ["SAIL"],
    adds: ["PILOT-COASTAL quotation", "SENSE-WIND", "survey scope"],
    preserves: ["NAV", "HUB", "existing compatible hardware"],
    condition: "Customer wants supervised steering and measured wind",
    prohibitsDoubleCharge: true,
  },
  {
    ruleId: "CS-04",
    fromBundleIds: ["PROTECT"],
    toBundleIds: ["COMPLETE"],
    adds: ["NAV-PRO", "HUB-PRO", "DISPLAY-7", "four SENSE modules", "PILOT-COASTAL quotation"],
    preserves: ["WATCH-CORE and monitoring subscription"],
    condition: "Customer wants navigation, display and integration in addition to monitoring",
    prohibitsDoubleCharge: true,
  },
  {
    ruleId: "CS-05",
    fromBundleIds: ["FLEET"],
    toBundleIds: [],
    adds: ["contracted onboarding/migration/training/support scope"],
    preserves: ["FLEET-START/BUSINESS subscription"],
    condition: "A professional operator buys the FLEET package",
    prohibitsDoubleCharge: true,
  },
  {
    ruleId: "CS-06",
    fromBundleIds: ["START", "CRUISE", "SAIL", "COMPLETE"],
    toBundleIds: ["START", "CRUISE", "SAIL", "COMPLETE"],
    adds: ["integrated access to the already granted right"],
    preserves: ["active entitlement"],
    condition: "The customer already holds a NAV or WEATHER entitlement",
    prohibitsDoubleCharge: true,
  },
  {
    ruleId: "CS-07",
    fromBundleIds: ["FLEET"],
    toBundleIds: ["FLEET"],
    adds: ["WATCH-CORE", "HUB-STANDARD"],
    preserves: ["FLEET SaaS contract"],
    condition: "The operator wants per-vessel telemetry or a local data source",
    prohibitsDoubleCharge: true,
  },
  {
    ruleId: "CS-08",
    fromBundleIds: ["START", "CRUISE", "SAIL", "PROTECT", "COMPLETE", "FLEET"],
    toBundleIds: [],
    adds: [],
    preserves: [],
    condition: "An ineligible item would be cross-sold as an available retail line (PILOT-PRO as a priced SKU; DISPLAY-LARGE-CONDITIONAL as an available size)",
    prohibitsDoubleCharge: true,
  },
];
