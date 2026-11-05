#!/usr/bin/env node
/**
 * MC-23 bundle data generator.
 *
 * Transcribes the MC-08 contract (docs/marea/bundles/bundle-definitions.json)
 * into src/app/marea-catalog/data/bundle-comparison.ts so the data module cannot
 * drift from the contract by hand. Every blocker, gate, line, upgrade path and
 * cross-sell rule is copied in full and in contract order.
 *
 *   node scripts/build-mc23-bundle-data.mjs           # write
 *   node scripts/build-mc23-bundle-data.mjs --check    # exit 1 on drift
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CONTRACT = 'docs/marea/bundles/bundle-definitions.json';
const OUT = 'src/app/marea-catalog/data/bundle-comparison.ts';
const CHECK = process.argv.includes('--check');

const contract = JSON.parse(readFileSync(resolve(root, CONTRACT), 'utf8'));
const q = (value) => JSON.stringify(value);

const canon = {};
for (const bundle of contract.bundles) {
  canon[bundle.id] = {
    lifecycleState: bundle.lifecycleState,
    commercialAvailability: bundle.commercialAvailability,
    publicationState: bundle.publicationState,
    readinessState: bundle.releaseReadiness.state,
    blockers: bundle.releaseReadiness.blockers ?? [],
    gates: bundle.releaseReadiness.gates ?? [],
    outcomes: bundle.configurationOutcomes ?? [],
    lines: [
      ...(bundle.components ?? []).map((c) => ({
        lineId: c.lineId,
        familyId: c.familyId,
        editionId: c.editionId,
        inclusion: c.inclusion,
      })),
      ...(bundle.optionalComponents ?? []).map((c) => ({
        lineId: c.lineId,
        familyId: c.familyId,
        editionId: c.editionId,
        inclusion: c.inclusion,
      })),
    ],
  };
}

const upgradePaths = contract.bundles.flatMap((bundle) =>
  (bundle.upgradeMigration ?? []).map((entry) => ({ ...entry, ownerBundleId: bundle.id })),
);
const crossSell = contract.crossSellRules ?? [];

const lineRows = (bundle) =>
  bundle.lines
    .map(
      (l) =>
        `      { lineId: ${q(l.lineId)}, familyId: ${l.familyId ? q(l.familyId) : 'null'}, editionId: ${
          l.editionId ? q(l.editionId) : 'null'
        }, inclusion: ${q(l.inclusion)} },`,
    )
    .join('\n');

const bundleBlocks = Object.entries(canon)
  .map(
    ([id, b]) => `  {
    bundleId: ${q(id)},
    lifecycleState: ${q(b.lifecycleState)},
    commercialAvailability: ${q(b.commercialAvailability)},
    publicationState: ${q(b.publicationState)},
    readinessState: ${q(b.readinessState)},
    blockers: [${b.blockers.map(q).join(', ')}],
    gates: [${b.gates.map(q).join(', ')}],
    outcomes: [${b.outcomes.map(q).join(', ')}],
    lines: [
${lineRows(b)}
    ],
  },`,
  )
  .join('\n');

const umBlocks = upgradePaths
  .map(
    (u) => `  {
    upgradeId: ${q(u.id)},
    path: ${q(u.path)},
    fromBundleId: ${q(u.ownerBundleId)},
    adds: [${(u.adds ?? []).map(q).join(', ')}],
    preserves: [${(u.preserves ?? []).map(q).join(', ')}],
    condition: ${q(u.condition)},
    requiresNewQuotation: ${u.requiresNewQuotation === true},
  },`,
  )
  .join('\n');

const csBlocks = crossSell
  .map(
    (c) => `  {
    ruleId: ${q(c.id)},
    fromBundleIds: [${(c.from?.bundles ?? []).map(q).join(', ')}],
    toBundleIds: [${(c.to?.bundles ?? []).map(q).join(', ')}],
    adds: [${(c.adds ?? []).map(q).join(', ')}],
    preserves: [${(c.preserves ?? []).map(q).join(', ')}],
    condition: ${q(c.condition)},
    prohibitsDoubleCharge: ${c.prohibitsDoubleCharge === true},
  },`,
  )
  .join('\n');

const output = `/**
 * MC-23 bundle comparison domain model — GENERATED FROM THE MC-08 CONTRACT.
 *
 * Every value below is transcribed from
 * \`docs/marea/bundles/bundle-definitions.json\` (MC-08). Nothing is authored,
 * summarised or truncated. Regenerate with
 * \`node scripts/build-mc23-bundle-data.mjs\`; \`--check\` fails when the two
 * drift, so a hand edit that disagrees with the contract is a build error
 * rather than a review decision.
 *
 * Two boundaries that must never be misread:
 *
 *  1. Inclusion is a COMMERCIAL classification, not a technical-support or
 *     compatibility statement. \`INCLUDED\` does not mean an integration was
 *     tested; \`NOT_INCLUDED\` does not mean a product is incompatible.
 *  2. There is no \`ORDERABLE\` outcome in MC-08 and none is produced here. Every
 *     configuration result is internal. Nothing here grants a sale, a price, a
 *     stock position or a quotation.
 */

/** The six MC-08 commercial solutions, in canonical contract order. */
export const BUNDLE_ORDER = ${q(Object.keys(canon))} as const;

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

/** MC-08 internal configuration outcomes. \`ORDERABLE\` deliberately does not exist. */
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
${bundleBlocks}
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
${umBlocks}
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
${csBlocks}
];
`;

/**
 * Compare the committed module with a fresh transcription of the contract.
 * Returns true when they match, false on drift. Exported so the confined runner
 * can execute this check in-process (it cannot spawn a child).
 */
export function checkDrift() {
  const current = readFileSync(resolve(root, OUT), 'utf8');
  return current.replace(/\r\n/g, '\n') === output.replace(/\r\n/g, '\n');
}

export function runConfined() {
  const ok = checkDrift();
  console.log(
    ok
      ? `MC-23 bundle data is up to date (${Object.keys(canon).length} bundles, ${upgradePaths.length} upgrade paths, ${crossSell.length} cross-sell rules).`
      : `STALE: ${OUT} does not match ${CONTRACT}. Run: node scripts/build-mc23-bundle-data.mjs`,
  );
  return ok;
}

// Only act as a CLI when executed directly, not when imported by the runner.
const isCli = process.argv[1] !== undefined && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (!isCli) {
  // Imported for the in-process check; nothing else to do.
} else if (CHECK) {
  const current = readFileSync(resolve(root, OUT), 'utf8');
  if (current.replace(/\r\n/g, '\n') !== output.replace(/\r\n/g, '\n')) {
    console.error(`STALE: ${OUT} does not match ${CONTRACT}.`);
    console.error('Run: node scripts/build-mc23-bundle-data.mjs');
    process.exit(1);
  }
  console.log(
    `MC-23 bundle data is up to date (${Object.keys(canon).length} bundles, ${upgradePaths.length} upgrade paths, ${crossSell.length} cross-sell rules).`,
  );
  process.exit(0);
}

if (isCli && !CHECK) {
  writeFileSync(resolve(root, OUT), output);
  console.log(
    `MC-23 bundle data generated: ${Object.keys(canon).length} bundles, ${upgradePaths.length} upgrade paths, ${crossSell.length} cross-sell rules.`,
  );
}
