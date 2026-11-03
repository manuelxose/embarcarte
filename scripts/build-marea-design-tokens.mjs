#!/usr/bin/env node
/**
 * MC-17 canonical design-token generator.
 *
 * One source of truth: src/app/marea-design-system/tokens/marea-design-tokens.source.json
 * Deterministic outputs:
 *   - src/app/marea-design-system/tokens/generated/marea-tokens.generated.scss
 *   - src/app/marea-design-system/tokens/generated/marea-tokens.generated.ts
 *   - docs/marea/design-system/data/{token-source-map,color-roles,mode-contracts,typography-roles,layout-tokens}.json
 *
 * Usage:
 *   node scripts/build-marea-design-tokens.mjs           # write outputs
 *   node scripts/build-marea-design-tokens.mjs --check   # verify committed outputs are current
 *
 * No timestamps, no environment data: identical input always produces identical bytes.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = 'src/app/marea-design-system/tokens/marea-design-tokens.source.json';
const OUT = {
  css: 'src/app/marea-design-system/tokens/generated/marea-tokens.generated.css',
  ts: 'src/app/marea-design-system/tokens/generated/marea-tokens.generated.ts',
  sourceMap: 'docs/marea/design-system/data/token-source-map.json',
  colorRoles: 'docs/marea/design-system/data/color-roles.json',
  modeContracts: 'docs/marea/design-system/data/mode-contracts.json',
  typographyRoles: 'docs/marea/design-system/data/typography-roles.json',
  layoutTokens: 'docs/marea/design-system/data/layout-tokens.json',
};

const ALLOWED_STATUS = new Set([
  'EXISTING_MEASURED_BASELINE',
  'INTERNAL_PROPOSED',
  'DERIVED_INTERNAL',
  'INTERNAL_DESIGN_GOAL',
  'NORMATIVE_WCAG_22_AA',
]);
const TOKEN_CATEGORIES = ['color', 'typography', 'space', 'size', 'grid', 'radius', 'border', 'elevation', 'opacity', 'focus', 'motion', 'breakpoint', 'zIndex', 'icon'];

const read = (p) => readFileSync(resolve(root, p), 'utf8');
const source = JSON.parse(read(SOURCE));

const problems = [];
const kebab = (s) => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

function json(value) {
  return JSON.stringify(value, null, 2) + '\n';
}

function assert(condition, message) {
  if (!condition) problems.push(message);
}

// ---------------------------------------------------------------- validation
assert(source.contractId === 'MC17-DESIGN-TOKENS', 'contractId must be MC17-DESIGN-TOKENS');
assert(source.status === 'INTERNAL_PROPOSED', 'token contract must stay INTERNAL_PROPOSED');
assert(source.adoption === 'NOT_ADOPTED', 'token contract adoption must stay NOT_ADOPTED');
assert(source.publicUse === 'NO_GO', 'token contract publicUse must stay NO_GO');
assert(Array.isArray(source.sourceRefs) && source.sourceRefs.length > 0, 'sourceRefs required');

const modes = Object.keys(source.modes ?? {});
assert(modes.length === 4, 'exactly four modes are required');
for (const mode of modes) {
  const m = source.modes[mode];
  assert(typeof m.label === 'string' && m.label.length > 0, `mode ${mode} needs a label`);
  assert(m.status !== undefined, `mode ${mode} needs a status`);
}

const cssVars = new Map();
const rows = [];
const tokenIds = new Set();

function register({ tokenId, category, name, cssVar, unit, semanticRole, sourceTokenId, status, evidence, mode, value }) {
  const key = `${category}.${name}`;
  assert(!tokenIds.has(`${mode ?? 'all'}:${tokenId}`), `duplicate token ${tokenId} in mode ${mode ?? 'all'}`);
  tokenIds.add(`${mode ?? 'all'}:${tokenId}`);
  assert(typeof semanticRole === 'string' && semanticRole.length > 8, `${key} needs a semanticRole`);
  assert(typeof sourceTokenId === 'string' && /^(MC04|MC16|MC17|WCAG22|DERIVED):/.test(sourceTokenId), `${key} needs a provenance sourceTokenId`);
  assert(ALLOWED_STATUS.has(status), `${key} has an unsupported status ${status}`);
  if (cssVar) {
    assert(/^--marea-[a-z0-9-]+$/.test(cssVar), `${key} cssVar must be namespaced --marea-*`);
    if (mode) {
      const seen = cssVars.get(cssVar);
      if (seen) assert(seen === unit, `${cssVar} declared with conflicting units (${seen} vs ${unit})`);
      else cssVars.set(cssVar, unit);
    } else {
      assert(!cssVars.has(cssVar), `${cssVar} is declared twice`);
      cssVars.set(cssVar, unit);
    }
  }
  rows.push({ tokenId, category, name, cssVar: cssVar ?? null, mode: mode ?? 'all', value, unit, status, semanticRole, sourceTokenId, evidence: evidence ?? null });
}

const color = source.tokens.color ?? {};
const colorRoleNames = Object.keys(color);
assert(colorRoleNames.length >= 25, 'expected at least 25 colour roles');
for (const role of colorRoleNames) {
  const def = color[role];
  assert(typeof def.cssVar === 'string', `colour role ${role} needs cssVar`);
  assert(def.unit === 'color', `colour role ${role} unit must be color`);
  for (const mode of modes) {
    const v = def.values?.[mode];
    assert(v && typeof v.value === 'string', `colour role ${role} missing value for mode ${mode}`);
    if (!v) continue;
    assert(/^#[0-9a-f]{6}$/i.test(v.value), `colour role ${role}/${mode} must be a six-digit hex value (got ${v.value})`);
    register({ tokenId: `marea.color.${role}`, category: 'color', name: role, cssVar: def.cssVar, unit: 'color', semanticRole: def.semanticRole, sourceTokenId: v.sourceTokenId, status: v.status, evidence: def.evidence, mode, value: v.value });
  }
}

const typography = source.tokens.typography ?? {};
const families = typography.families ?? {};
for (const [name, def] of Object.entries(families)) {
  register({ tokenId: `marea.typography.family.${name}`, category: 'typography', name: `family.${name}`, cssVar: def.cssVar, unit: 'font-family-list', semanticRole: def.semanticRole, sourceTokenId: def.sourceTokenId, status: def.status, evidence: def.evidence, value: def.value });
}
const typeRoles = typography.roles ?? {};
for (const [role, def] of Object.entries(typeRoles)) {
  assert(families[def.family], `typography role ${role} references unknown family ${def.family}`);
  for (const field of ['size', 'lineHeight', 'weight', 'letterSpacing']) {
    assert(typeof def[field] === 'string' && def[field].length > 0, `typography role ${role} needs ${field}`);
    register({ tokenId: `marea.typography.${role}.${field}`, category: 'typography', name: `${role}.${field}`, cssVar: `--marea-type-${kebab(role)}-${field === 'letterSpacing' ? 'tracking' : kebab(field)}`, unit: 'typography', semanticRole: def.purpose, sourceTokenId: def.sourceTokenId, status: 'INTERNAL_PROPOSED', evidence: 'TYPOGRAPHY-SYSTEM.md / derived implementation layer', value: def[field] });
  }
  if (def.textTransform) {
    register({ tokenId: `marea.typography.${role}.textTransform`, category: 'typography', name: `${role}.textTransform`, cssVar: `--marea-type-${kebab(role)}-transform`, unit: 'keyword', semanticRole: def.purpose, sourceTokenId: def.sourceTokenId, status: 'INTERNAL_PROPOSED', value: def.textTransform });
  }
  if (def.numeric) {
    register({ tokenId: `marea.typography.${role}.numeric`, category: 'typography', name: `${role}.numeric`, cssVar: `--marea-type-${kebab(role)}-numeric`, unit: 'keyword', semanticRole: def.purpose, sourceTokenId: def.sourceTokenId, status: 'INTERNAL_PROPOSED', value: `${typography.numeric.fontVariantNumeric} ${typography.numeric.fontFeatureSettings}`.trim() });
  }
}

for (const category of ['space', 'size', 'grid', 'radius', 'border', 'elevation', 'opacity', 'focus', 'motion', 'breakpoint', 'zIndex', 'icon']) {
  const group = source.tokens[category];
  assert(group && group.values, `token category ${category} is required`);
  if (!group?.values) continue;
  for (const [name, def] of Object.entries(group.values)) {
    register({ tokenId: `marea.${category}.${name}`, category, name, cssVar: def.cssVar, unit: def.unit ?? group.unit, semanticRole: def.semanticRole, sourceTokenId: def.sourceTokenId, status: def.status, value: def.value });
  }
}

// colour role references used by status semantics / variant tokens / contrast pairs
const roleRefs = new Set();
for (const pair of source.contrastPairs ?? []) {
  for (const fg of pair.foregrounds ?? []) roleRefs.add(fg);
  for (const bg of pair.backgrounds ?? []) roleRefs.add(bg);
  for (const [fg, bg] of Object.entries(pair.backgroundsByRole ?? {})) {
    roleRefs.add(fg);
    roleRefs.add(bg);
  }
  assert(['text-normal', 'text-disabled-internal', 'focus', 'ui', 'text-large'].includes(pair.kind), `contrast pair ${pair.id} has an unknown kind`);
  assert(typeof pair.minRatio === 'number' && pair.minRatio >= 3, `contrast pair ${pair.id} needs a minRatio >= 3`);
}
for (const def of source.dataStatusSemantics ?? []) {
  roleRefs.add(def.colorRole);
  roleRefs.add(def.surfaceRole);
}
for (const variant of source.componentVariantTokens ?? []) for (const ref of variant.tokenRefs) roleRefs.add(ref);
for (const ref of roleRefs) {
  if (!color[ref]) problems.push(`unknown colour role reference: ${ref}`);
}

for (const mode of modes) {
  for (const [category, def] of Object.entries(color)) {
    const v = def.values[mode];
    if (mode === 'instrument-night' && ['#000000', '#ffffff'].includes(v?.value?.toLowerCase())) {
      problems.push(`night mode forbids ${v.value} on role ${category}`);
    }
  }
}

if (problems.length) {
  console.error('Token source validation failed:');
  for (const p of problems) console.error(' - ' + p);
  process.exit(1);
}

// ---------------------------------------------------------------- SCSS
const modeBlock = (mode) => {
  const lines = [];
  for (const [role, def] of Object.entries(color)) lines.push(`  ${def.cssVar}: ${def.values[mode].value};`);
  return lines.join('\n');
};
const baseLines = [];
for (const [role, def] of Object.entries(color)) baseLines.push(`  ${def.cssVar}: ${def.values['web-light'].value};`);
for (const [name, def] of Object.entries(families)) baseLines.push(`  ${def.cssVar}: ${def.value};`);
for (const [role, def] of Object.entries(typeRoles)) {
  const prefix = `--marea-type-${kebab(role)}`;
  baseLines.push(`  ${prefix}-family: var(--marea-font-${def.family});`);
  baseLines.push(`  ${prefix}-size: ${def.size};`);
  baseLines.push(`  ${prefix}-line-height: ${def.lineHeight};`);
  baseLines.push(`  ${prefix}-weight: ${def.weight};`);
  baseLines.push(`  ${prefix}-tracking: ${def.letterSpacing};`);
  if (def.textTransform) baseLines.push(`  ${prefix}-transform: ${def.textTransform};`);
  if (def.numeric) baseLines.push(`  ${prefix}-numeric: ${typography.numeric.fontVariantNumeric};`);
}
for (const category of ['space', 'size', 'grid', 'radius', 'border', 'elevation', 'opacity', 'focus', 'motion', 'breakpoint', 'zIndex', 'icon']) {
  for (const [, def] of Object.entries(source.tokens[category].values)) baseLines.push(`  ${def.cssVar}: ${def.value};`);
}

const scss = `/* GENERATED FILE — do not edit by hand.
 * Source: ${SOURCE}
 * Generator: node scripts/build-marea-design-tokens.mjs
 * Contract: ${source.contractId} v${source.contractVersion} — ${source.status} / ${source.adoption} / public use ${source.publicUse}
 * Scoped to <marea-theme> only: no :root overrides, no production CSS side effects.
 * Import this file once in an isolated consumer (internal catalogue or a future authorized integration).
 */
marea-theme {
  color-scheme: light;
${baseLines.join('\n')}
}

${modes
  .filter((mode) => source.modes[mode].selectorAttribute)
  .map(
    (mode) => `marea-theme[data-marea-mode='${mode}'] {
  color-scheme: ${source.modes[mode].colorScheme};
${modeBlock(mode)}
}`,
  )
  .join('\n\n')}
`;

// ---------------------------------------------------------------- TS
const breakpoints = {};
for (const [name, def] of Object.entries(source.tokens.breakpoint.values)) breakpoints[name] = Number.parseInt(def.value, 10);
const cssVarEntries = new Map();
for (const row of rows) if (row.cssVar) cssVarEntries.set(row.tokenId, row.cssVar);
const uniqueIds = [...new Set(rows.map((row) => row.tokenId))];
const tsFixed = `// GENERATED FILE — do not edit by hand.
// Source: ${SOURCE}
// Generator: node scripts/build-marea-design-tokens.mjs
// Contract: ${source.contractId} v${source.contractVersion}
export const MAREA_TOKEN_CONTRACT_ID = '${source.contractId}';
export const MAREA_TOKEN_CONTRACT_VERSION = '${source.contractVersion}';
export const MAREA_MODES = ${JSON.stringify(modes)} as const;
export type MareaMode = (typeof MAREA_MODES)[number];

export const MAREA_MODE_LABELS: Readonly<Record<MareaMode, string>> = {
${modes.map((mode) => `  '${mode}': '${source.modes[mode].label}',`).join('\n')}
};

export const MAREA_TOKEN_IDS = [
${uniqueIds.map((id) => `  '${id}',`).join('\n')}
] as const;

export const MAREA_TOKEN_CSS_VAR: Readonly<Record<string, string>> = {
${[...cssVarEntries].map(([id, v]) => `  '${id}': '${v}',`).join('\n')}
};

export const MAREA_BREAKPOINTS: Readonly<Record<string, number>> = ${JSON.stringify(breakpoints)};
`;

// ---------------------------------------------------------------- datasets
const generated = {
  sourceMap: json({
    contractId: 'MC17-TOKEN-SOURCE-MAP',
    contractVersion: source.contractVersion,
    milestone: 'MC-17',
    status: 'INTERNAL_PROPOSED',
    owner: source.owner,
    generationMethod: 'node scripts/build-marea-design-tokens.mjs',
    scope: 'Flattened provenance rows: one row per token per mode, derived from the canonical token source.',
    knownLimitations: source.knownLimitations,
    sourceRefs: source.sourceRefs,
    tokenCount: rows.length,
    rows,
  }),
  colorRoles: json({
    contractId: 'MC17-COLOR-ROLES',
    contractVersion: source.contractVersion,
    milestone: 'MC-17',
    status: 'INTERNAL_PROPOSED',
    adoption: source.adoption,
    publicUse: source.publicUse,
    owner: source.owner,
    generationMethod: 'node scripts/build-marea-design-tokens.mjs',
    scope: 'Semantic colour roles and their per-mode resolved values.',
    knownLimitations: source.knownLimitations,
    sourceRefs: source.sourceRefs,
    roles: Object.fromEntries(
      Object.entries(color).map(([role, def]) => [
        role,
        {
          cssVar: def.cssVar,
          semanticRole: def.semanticRole,
          evidence: def.evidence,
          values: Object.fromEntries(modes.map((mode) => [mode, { value: def.values[mode].value, sourceTokenId: def.values[mode].sourceTokenId, status: def.values[mode].status }])),
        },
      ]),
    ),
    contrastPairs: source.contrastPairs,
    dataStatusSemantics: source.dataStatusSemantics,
    componentVariantTokens: source.componentVariantTokens,
    forbiddenValues: source.forbiddenValues,
  }),
  modeContracts: json({
    contractId: 'MC17-MODE-CONTRACTS',
    contractVersion: source.contractVersion,
    milestone: 'MC-17',
    status: 'INTERNAL_PROPOSED',
    owner: source.owner,
    generationMethod: 'node scripts/build-marea-design-tokens.mjs',
    scope: 'Supported visual modes, their context separation and selector contract.',
    knownLimitations: source.knownLimitations,
    sourceRefs: source.sourceRefs,
    selectorContract: {
      hostElement: 'marea-theme',
      attribute: 'data-marea-mode',
      selection: "Components inherit custom properties from the nearest <marea-theme> host; no :root or body override exists.",
      defaultMode: 'web-light',
    },
    modes: Object.fromEntries(
      modes.map((mode) => [
        mode,
        {
          ...source.modes[mode],
          colorRoleCount: colorRoleNames.length,
          selector: mode === 'web-light' ? 'marea-theme (default host state)' : `marea-theme[data-marea-mode='${source.modes[mode].selectorAttribute}']`,
        },
      ]),
    ),
  }),
  typographyRoles: json({
    contractId: 'MC17-TYPOGRAPHY-ROLES',
    contractVersion: source.contractVersion,
    milestone: 'MC-17',
    status: 'INTERNAL_PROPOSED',
    owner: source.owner,
    generationMethod: 'node scripts/build-marea-design-tokens.mjs',
    scope: 'Semantic typography roles, families and the instrument numeric contract.',
    knownLimitations: ['Font metrics were not re-measured on this milestone; the MC-04 typography evidence remains the authority.', 'Fluid sizes are CSS expressions; pixel equivalents depend on the viewport and are not asserted.'],
    sourceRefs: source.sourceRefs,
    families,
    numericContract: typography.numeric,
    roles: typeRoles,
    cssVariablePattern: '--marea-type-<role>-<field>',
  }),
  layoutTokens: json({
    contractId: 'MC17-LAYOUT-TOKENS',
    contractVersion: source.contractVersion,
    milestone: 'MC-17',
    status: 'INTERNAL_PROPOSED',
    owner: source.owner,
    generationMethod: 'node scripts/build-marea-design-tokens.mjs',
    scope: 'Spacing, sizing, grid, shape, elevation, opacity, focus, motion, breakpoints, stacking and icon scales.',
    knownLimitations: ['Breakpoints are exposed as informational custom properties; media queries are authored in component SCSS and validated by the responsive evidence set.'],
    sourceRefs: source.sourceRefs,
    categories: Object.fromEntries(['space', 'size', 'grid', 'radius', 'border', 'elevation', 'opacity', 'focus', 'motion', 'breakpoint', 'zIndex', 'icon'].map((category) => [category, source.tokens[category].values])),
  }),
};

// ---------------------------------------------------------------- write / check
const outputs = { css: scss, ts: tsFixed, ...generated };
const check = process.argv.includes('--check');
let stale = 0;
for (const [key, relPath] of Object.entries(OUT)) {
  const abs = resolve(root, relPath);
  const content = outputs[key];
  if (check) {
    if (!existsSync(abs)) {
      console.error(`MISSING generated token output: ${relPath}`);
      stale++;
      continue;
    }
    if (read(relPath) !== content) {
      console.error(`STALE generated token output: ${relPath} (run node scripts/build-marea-design-tokens.mjs)`);
      stale++;
    }
  } else {
    mkdirSync(dirname(abs), { recursive: true });
    writeFileSync(abs, content);
    console.log(`wrote ${relPath}`);
  }
}
if (check) {
  if (stale) {
    console.error(`Token outputs are stale or missing (${stale}).`);
    process.exit(1);
  }
  console.log(`Token outputs current: ${rows.length} provenance rows across ${modes.length} modes.`);
} else {
  console.log(`Generated ${rows.length} provenance rows across ${modes.length} modes; ${cssVars.size} CSS custom properties.`);
}
