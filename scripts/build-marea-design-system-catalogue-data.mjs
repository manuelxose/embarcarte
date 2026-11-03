#!/usr/bin/env node
/**
 * Derives the internal catalogue metadata module and the component-state
 * dataset from the authored component registry.
 *
 * Usage:
 *   node scripts/build-marea-design-system-catalogue-data.mjs           # write
 *   node scripts/build-marea-design-system-catalogue-data.mjs --check   # verify
 *
 * Deterministic: the registry order and field order are preserved.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const REGISTRY = 'docs/marea/design-system/data/component-registry.json';
const OUT_TS = 'preview/catalogue/app/registry.generated.ts';
const OUT_STATES = 'docs/marea/design-system/data/component-states.json';

const registry = JSON.parse(readFileSync(resolve(root, REGISTRY), 'utf8'));
const requiredFields = [
  'componentId',
  'componentName',
  'version',
  'purpose',
  'status',
  'implementationKind',
  'implementationPath',
  'selector',
  'semanticElement',
  'inputs',
  'outputs',
  'visualVariants',
  'supportedModes',
  'responsiveRules',
  'tokenDependencies',
  'keyboardContract',
  'focusContract',
  'ariaContract',
  'localizationRequirements',
  'commercialRestrictions',
  'states',
  'testReferences',
  'knownLimitations',
  'usage',
];
const problems = [];
const ids = new Set();
for (const entry of registry.components ?? []) {
  for (const field of requiredFields) if (!(field in entry)) problems.push(`${entry.componentId ?? '(missing id)'} is missing ${field}`);
  if (ids.has(entry.componentId)) problems.push(`duplicate componentId ${entry.componentId}`);
  ids.add(entry.componentId);
  if (entry.status !== 'INTERNAL_READY' && entry.status !== 'INTERNAL_PROPOSED') problems.push(`${entry.componentId} has an unsupported status`);
  for (const mode of entry.supportedModes ?? []) {
    if (!['web-light', 'instrument-day', 'instrument-sunlight', 'instrument-night'].includes(mode)) problems.push(`${entry.componentId} lists an unknown mode ${mode}`);
  }
  for (const token of entry.tokenDependencies ?? []) if (typeof token !== 'string' || !token.startsWith('--marea-')) problems.push(`${entry.componentId} has a non-token dependency ${token}`);
  const states = entry.states ?? {};
  for (const state of ['DEFAULT', 'HOVER', 'FOCUS_VISIBLE', 'PRESSED', 'DISABLED', 'LOADING', 'EMPTY', 'ERROR', 'WARNING', 'READ_ONLY', 'BLOCKED']) {
    if (!(state in states)) problems.push(`${entry.componentId} does not declare the ${state} state (applicable or NOT_APPLICABLE with a reason)`);
  }
}
if (problems.length) {
  console.error('Registry validation failed:');
  for (const problem of problems) console.error(' - ' + problem);
  process.exit(1);
}

const ts = `// GENERATED FILE — do not edit by hand.
// Source: ${REGISTRY}
// Generator: node scripts/build-marea-design-system-catalogue-data.mjs
// Internal catalogue metadata only. Never imported by the production application.
export interface MareaRegistryInput {
  readonly name: string;
  readonly type: string;
  readonly required: boolean;
  readonly defaultValue: string | null;
  readonly description: string;
}

export interface MareaRegistryOutput {
  readonly name: string;
  readonly type: string;
  readonly description: string;
}

export interface MareaRegistryComponent {
  readonly componentId: string;
  readonly componentName: string;
  readonly version: string;
  readonly purpose: string;
  readonly status: string;
  readonly implementationKind: string;
  readonly implementationPath: string;
  readonly selector: string;
  readonly semanticElement: string;
  readonly inputs: readonly MareaRegistryInput[];
  readonly outputs: readonly MareaRegistryOutput[];
  readonly visualVariants: readonly string[];
  readonly supportedModes: readonly string[];
  readonly responsiveRules: string;
  readonly tokenDependencies: readonly string[];
  readonly keyboardContract: string;
  readonly focusContract: string;
  readonly ariaContract: string;
  readonly localizationRequirements: string;
  readonly commercialRestrictions: readonly string[];
  readonly states: Readonly<Record<string, string>>;
  readonly testReferences: readonly string[];
  readonly knownLimitations: readonly string[];
  readonly usage: string;
}

export const COMPONENT_REGISTRY: readonly MareaRegistryComponent[] = ${JSON.stringify(registry.components, null, 2)} as const;

export const REGISTRY_META = ${JSON.stringify(
  {
    contractId: registry.contractId,
    contractVersion: registry.contractVersion,
    status: registry.status,
    componentCount: registry.components.length,
  },
  null,
  2,
)} as const;

export function findComponent(componentId: string): MareaRegistryComponent | undefined {
  return COMPONENT_REGISTRY.find((entry) => entry.componentId === componentId);
}
`;

const stateRows = (registry.components ?? []).map((entry) => ({
  componentId: entry.componentId,
  componentName: entry.componentName,
  states: Object.fromEntries(
    Object.entries(entry.states).map(([state, description]) => [
      state,
      {
        applicable: !String(description).startsWith('NOT_APPLICABLE'),
        description,
      },
    ]),
  ),
}));

const states = JSON.stringify(
  {
    contractId: 'MC17-COMPONENT-STATES',
    contractVersion: registry.contractVersion,
    milestone: 'MC-17',
    status: 'INTERNAL_PROPOSED',
    owner: registry.owner ?? 'lead',
    generationMethod: 'node scripts/build-marea-design-system-catalogue-data.mjs (derived from component-registry.json)',
    scope: 'Applicability of the eleven required interaction/states per registered component. NOT_APPLICABLE entries carry an explicit reason instead of a manufactured variant.',
    knownLimitations: ['State descriptions document the implemented contract; automated behaviour coverage is recorded in the design-system test evidence.'],
    sourceRefs: [REGISTRY],
    requiredStates: ['DEFAULT', 'HOVER', 'FOCUS_VISIBLE', 'PRESSED', 'DISABLED', 'LOADING', 'EMPTY', 'ERROR', 'WARNING', 'READ_ONLY', 'BLOCKED'],
    components: stateRows,
  },
  null,
  2,
) + '\n';

const outputs = {
  [OUT_TS]: ts,
  [OUT_STATES]: states,
};

const check = process.argv.includes('--check');
let stale = 0;
for (const [relPath, content] of Object.entries(outputs)) {
  const abs = resolve(root, relPath);
  if (check) {
    if (!existsSync(abs)) {
      console.error(`MISSING ${relPath}`);
      stale++;
    } else if (readFileSync(abs, 'utf8') !== content) {
      console.error(`STALE ${relPath} (run node scripts/build-marea-design-system-catalogue-data.mjs)`);
      stale++;
    }
  } else {
    mkdirSync(dirname(abs), { recursive: true });
    writeFileSync(abs, content);
    console.log(`wrote ${relPath}`);
  }
}
if (check) {
  if (stale) process.exit(1);
  console.log(`Catalogue metadata current: ${registry.components.length} registered components.`);
} else {
  console.log(`Registered components: ${registry.components.length}.`);
}
