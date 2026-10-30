#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Deterministic brand-governance validator for the EMBARCARTE / MAREA proposal.
 *
 * It validates the machine-readable brand contract and scans ONLY the files the
 * contract lists in `governedPaths` (all inside docs/marea/brand/). It never
 * scans src/ or the whole repository, makes no network request and adds no
 * runtime dependency, so it runs offline on Windows and Linux with plain node.
 *
 * Usage:
 *   node scripts/check-brand.mjs [--root <dir>] [--contract <relative path>]
 *
 * Exit code 0 = every check passed, 1 = at least one check failed.
 */

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, '..');
const BRAND_DIR = 'docs/marea/brand/';
const CONTRACT_RELATIVE = `${BRAND_DIR}brand-identity.contract.json`;
const CLAIMS_POLICY_RELATIVE = `${BRAND_DIR}COMMERCIAL-BRAND-CLAIMS-POLICY.md`;

const REQUIRED_FAMILIES = [
  'NAV',
  'HUB',
  'AIS',
  'PILOT',
  'SENSE',
  'WATCH',
  'DISPLAY',
  'WEATHER',
  'FLEET',
];
const REQUIRED_BUNDLES = ['START', 'CRUISE', 'SAIL', 'PROTECT', 'COMPLETE', 'FLEET'];
const REQUIRED_MESSAGE_KEYS = [
  'companyDescription',
  'mareaShortDescription',
  'mareaExtendedDescription',
  'headlinePrimary',
  'headlineSecondaryOne',
  'headlineSecondaryTwo',
  'trustLine',
  'ctaPrimary',
  'b2bLine',
  'attributionLine',
];
const REQUIRED_CLAIMS = [
  'NMEA 2000 certified',
  'guaranteed collision avoidance',
  'fully autonomous',
  'most accurate',
  '100% reliable',
  'immediately available',
];
const SCAN_RULES = ['trademarkSymbols', 'productNames', 'attribution', 'clearanceClaims'];

// A line is negative context (a policy statement or a forbidden example) when it
// carries one of these markers. This is what lets the governed documents quote
// the very strings they prohibit without a false positive.
const EXEMPT_CONTEXT =
  /\b(?:not|never|nunca|no|sin|without|avoid|evitar|pending|unregistered|proposed|proposal|draft|forbidden\w*|prohibited\w*|prohibid[oa]s?|incorrect[oa]?s?|invalid|wrong|reject(?:ed|s)?|must\s+not|cannot|can't|don't|do\s+not|shall\s+not|not\s+allowed|third[- ]part(?:y|ies)|existing|earlier|ajena|otra\s+marca|competitor|competidor)\b|NOT_GRANTED/i;
const BAD_MARKERS = /[❌✗🚫]|\b(?:BAD|WRONG|INCORRECT|FORBIDDEN|PROHIBITED|INVALID)\b/;
const TABLE_OR_SECTION_MARKER =
  /\b(?:forbidden|prohibited|incorrect|wrong|invalid|avoid|do\s+not|don't|must\s+not|not\s+allowed|reject(?:ed)?|anti-?pattern|prohibid[oa]s?|incorrect[oa]s?|evitar|nunca)\b/i;

// The symbol is only a violation when it is attached to the brand or a family or
// bundle name. Discussing `®` or `™` anywhere else is legitimate governance copy.
const SYMBOL_ATTACHED =
  /\bmarea(?:\s+(?:NAV|HUB|AIS|PILOT|SENSE|WATCH|DISPLAY|WEATHER|FLEET|START|CRUISE|SAIL|PROTECT|COMPLETE))*\s*[®™]/i;

const isFilled = (value) => typeof value === 'string' && value.trim().length > 0;
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const normalizeWhitespace = (value) => value.toLowerCase().replace(/\s+/g, ' ').trim();
const displayPath = (absolute) => {
  const relativePath = relative(process.cwd(), absolute);
  return relativePath && !relativePath.startsWith('..')
    ? relativePath.replace(/\\/g, '/')
    : absolute;
};

function argument(name) {
  const index = process.argv.indexOf(name);
  return index === -1 ? null : (process.argv[index + 1] ?? null);
}

const root = resolve(process.cwd(), argument('--root') ?? REPO_ROOT);
const contractOption = argument('--contract');
const contractPath = contractOption ? resolve(root, contractOption) : join(root, CONTRACT_RELATIVE);

let contract;
try {
  contract = JSON.parse(readFileSync(contractPath, 'utf8'));
} catch (error) {
  console.error(
    `FATAL: cannot load the brand contract at ${displayPath(contractPath)}: ${error.message}`,
  );
  process.exit(1);
}
if (!contract || typeof contract !== 'object' || Array.isArray(contract)) {
  console.error(`FATAL: the brand contract at ${displayPath(contractPath)} is not a JSON object`);
  process.exit(1);
}

// --- Contract checks --------------------------------------------------------

const checks = [];

function check(id, run) {
  const record = { id, failures: [], detail: '' };
  try {
    run(record);
  } catch (error) {
    record.failures.push(`check crashed: ${error.message}`);
  }
  checks.push(record);
  return record;
}

check('contract.identity', (record) => {
  if (!isFilled(contract.contractVersion))
    record.failures.push('contractVersion is missing or empty');
  if (contract.status !== 'PROPOSED')
    record.failures.push(`status must be "PROPOSED", found ${JSON.stringify(contract.status)}`);
});

check('contract.company', (record) => {
  const company = contract.company;
  if (!company || typeof company !== 'object') return record.failures.push('company is missing');
  if (company.id !== 'EMBARCARTE')
    record.failures.push(`company.id must be "EMBARCARTE", found ${JSON.stringify(company.id)}`);
  if (!isFilled(company.role) || !/SELLER/i.test(company.role)) {
    record.failures.push(
      `company.role must name the seller/legal commercial identity, found ${JSON.stringify(company.role)}`,
    );
  }
  if (!isFilled(company.description))
    record.failures.push('company.description is missing or empty');
  const statements = company.permittedAttributionStatements;
  if (!Array.isArray(statements) || statements.length < 2 || !statements.every(isFilled)) {
    record.failures.push(
      'company.permittedAttributionStatements must be an array with at least two non-empty statements',
    );
  }
});

check('contract.productBrand', (record) => {
  const brand = contract.productBrand;
  if (!brand || typeof brand !== 'object') return record.failures.push('productBrand is missing');
  if (brand.id !== 'MAREA')
    record.failures.push(`productBrand.id must be "MAREA", found ${JSON.stringify(brand.id)}`);
  if (brand.displayName !== 'MAREA')
    record.failures.push('productBrand.displayName must be "MAREA"');
  if (brand.status !== 'PROPOSED')
    record.failures.push(
      `productBrand.status must be "PROPOSED", found ${JSON.stringify(brand.status)}`,
    );
  if (brand.trademarkLegalClearance !== 'NOT_GRANTED') {
    record.failures.push(
      `productBrand.trademarkLegalClearance must be "NOT_GRANTED" while the brand is proposed, found ${JSON.stringify(brand.trademarkLegalClearance)}`,
    );
  }
  if (brand.publicationState !== 'INTERNAL_ONLY') {
    record.failures.push(
      `productBrand.publicationState must be "INTERNAL_ONLY", found ${JSON.stringify(brand.publicationState)}`,
    );
  }
  if (brand.registeredSymbolsAllowed !== false)
    record.failures.push('productBrand.registeredSymbolsAllowed must be false');
  if (!isFilled(brand.registrationPolicy))
    record.failures.push('productBrand.registrationPolicy is missing or empty');
});

check('contract.technologyFoundation', (record) => {
  const foundation = contract.technologyFoundation;
  if (!foundation || typeof foundation !== 'object')
    return record.failures.push('technologyFoundation is missing');
  if (foundation.id !== 'OPEN-MARINE') {
    record.failures.push(
      `technologyFoundation.id must be "OPEN-MARINE", found ${JSON.stringify(foundation.id)}`,
    );
  }
  if (!isFilled(foundation.role) || !/INTERNAL/i.test(foundation.role)) {
    record.failures.push(
      `technologyFoundation.role must be an internal engineering identifier, found ${JSON.stringify(foundation.role)}`,
    );
  }
  if (foundation.publicUse !== 'INTERNAL_ONLY') {
    record.failures.push(
      `technologyFoundation.publicUse must be "INTERNAL_ONLY", found ${JSON.stringify(foundation.publicUse)}`,
    );
  }
  if (foundation.rightsClearance !== 'NOT_CLEARED') {
    record.failures.push(
      `technologyFoundation.rightsClearance must be "NOT_CLEARED", found ${JSON.stringify(foundation.rightsClearance)}`,
    );
  }
  if (foundation.neverPresentedAsPublicProductBrand !== true) {
    record.failures.push('technologyFoundation.neverPresentedAsPublicProductBrand must be true');
  }
  if (!isFilled(foundation.rule) || !/never|must\s+not|no\s+debe/i.test(foundation.rule)) {
    record.failures.push(
      'technologyFoundation.rule must state that OPEN-MARINE is never the public product brand',
    );
  }
});

check('contract.productFamilies', (record) => {
  const families = contract.productFamilies;
  if (!Array.isArray(families)) return record.failures.push('productFamilies must be an array');
  if (families.length !== REQUIRED_FAMILIES.length) {
    record.failures.push(
      `productFamilies has ${families.length} entries; expected exactly ${REQUIRED_FAMILIES.length}`,
    );
  }
  const ids = families.map((family) => family?.id);
  const missing = REQUIRED_FAMILIES.filter((id) => !ids.includes(id));
  const unexpected = ids.filter((id) => !REQUIRED_FAMILIES.includes(id));
  if (missing.length) record.failures.push(`productFamilies is missing: ${missing.join(', ')}`);
  if (unexpected.length)
    record.failures.push(`productFamilies has unexpected ids: ${unexpected.join(', ')}`);
  if (new Set(ids).size !== ids.length) record.failures.push('productFamilies ids are not unique');
  for (const family of families) {
    if (!family || typeof family !== 'object') {
      record.failures.push('productFamilies contains a non-object entry');
      continue;
    }
    if (family.displayName !== `MAREA ${family.id}`) {
      record.failures.push(
        `productFamily ${family.id}: displayName must be "MAREA ${family.id}", found ${JSON.stringify(family.displayName)}`,
      );
    }
    if (!isFilled(family.domain))
      record.failures.push(`productFamily ${family.id}: domain is missing or empty`);
  }
});

check('contract.bundles', (record) => {
  const bundles = contract.bundles;
  if (!Array.isArray(bundles)) return record.failures.push('bundles must be an array');
  if (bundles.length !== REQUIRED_BUNDLES.length) {
    record.failures.push(
      `bundles has ${bundles.length} entries; expected exactly ${REQUIRED_BUNDLES.length}`,
    );
  }
  const ids = bundles.map((bundle) => bundle?.id);
  const missing = REQUIRED_BUNDLES.filter((id) => !ids.includes(id));
  const unexpected = ids.filter((id) => !REQUIRED_BUNDLES.includes(id));
  if (missing.length) record.failures.push(`bundles is missing: ${missing.join(', ')}`);
  if (unexpected.length)
    record.failures.push(`bundles has unexpected ids: ${unexpected.join(', ')}`);
  for (const bundle of bundles) {
    if (!bundle || typeof bundle !== 'object') {
      record.failures.push('bundles contains a non-object entry');
      continue;
    }
    if (bundle.displayName !== `MAREA ${bundle.id}`) {
      record.failures.push(
        `bundle ${bundle.id}: displayName must be "MAREA ${bundle.id}", found ${JSON.stringify(bundle.displayName)}`,
      );
    }
    if (!isFilled(bundle.minimumContent))
      record.failures.push(`bundle ${bundle.id}: minimumContent is missing or empty`);
  }
});

check('contract.fleetDisambiguation', (record) => {
  const disambiguation = contract.fleetDisambiguation;
  if (!disambiguation || typeof disambiguation !== 'object')
    return record.failures.push('fleetDisambiguation is missing');
  if (!isFilled(disambiguation.rule))
    return record.failures.push('fleetDisambiguation.rule is missing or empty');
  if (
    !/FLEET/.test(disambiguation.rule) ||
    !/product/i.test(disambiguation.rule) ||
    !/bundle/i.test(disambiguation.rule)
  ) {
    record.failures.push(
      'fleetDisambiguation.rule must distinguish the MAREA FLEET product family from the MAREA FLEET bundle',
    );
  }
  if (!isFilled(disambiguation.product) || !isFilled(disambiguation.bundle)) {
    record.failures.push(
      'fleetDisambiguation must describe both the product family and the bundle',
    );
  }
});

check('contract.namingRules', (record) => {
  const naming = contract.namingRules;
  if (!naming || typeof naming !== 'object') return record.failures.push('namingRules is missing');
  for (const key of [
    'masterBrand',
    'canonicalSyntax',
    'edition',
    'generation',
    'hardwareSize',
    'version',
    'commercialVsEngineeringIdentifier',
  ]) {
    const value = naming[key];
    const filled =
      isFilled(value) || (value && typeof value === 'object' && Object.keys(value).length > 0);
    if (!filled) record.failures.push(`namingRules.${key} is missing or empty`);
  }
  for (const key of ['allowedPatterns', 'forbiddenPatterns', 'forbiddenFamilyNames']) {
    const value = naming[key];
    if (!Array.isArray(value) || value.length === 0 || !value.every(isFilled)) {
      record.failures.push(`namingRules.${key} must be a non-empty array of non-empty strings`);
    }
  }
});

check('contract.attributionRules', (record) => {
  const attribution = contract.attributionRules;
  if (!attribution || typeof attribution !== 'object')
    return record.failures.push('attributionRules is missing');
  if (attribution.owner !== 'EMBARCARTE') {
    record.failures.push(
      `attributionRules.owner must be "EMBARCARTE", found ${JSON.stringify(attribution.owner)}`,
    );
  }
  for (const key of ['allowedStatements', 'forbiddenStatements']) {
    const statements = attribution[key];
    if (!Array.isArray(statements) || statements.length < 2 || !statements.every(isFilled)) {
      record.failures.push(
        `attributionRules.${key} must be an array with at least two non-empty statements`,
      );
    }
  }
});

check('contract.claimsPolicy', (record) => {
  const claims = contract.claimsPolicy;
  if (!claims || typeof claims !== 'object') return record.failures.push('claimsPolicy is missing');
  if (!isFilled(claims.summary)) record.failures.push('claimsPolicy.summary is missing or empty');
  const prohibited = claims.prohibitedClaimPatterns;
  if (!Array.isArray(prohibited) || prohibited.length === 0) {
    return record.failures.push('claimsPolicy.prohibitedClaimPatterns must be a non-empty array');
  }
  const normalized = prohibited.map((claim) => normalizeWhitespace(String(claim)));
  for (const required of REQUIRED_CLAIMS) {
    if (!normalized.includes(normalizeWhitespace(required))) {
      record.failures.push(
        `claimsPolicy.prohibitedClaimPatterns is missing ${JSON.stringify(required)}`,
      );
    }
  }
});

check('contract.messages', (record) => {
  const messages = contract.messages;
  if (!messages || typeof messages !== 'object') return record.failures.push('messages is missing');
  for (const locale of ['es', 'en']) {
    const dictionary = messages[locale];
    if (!dictionary || typeof dictionary !== 'object') {
      record.failures.push(`messages.${locale} is missing`);
      continue;
    }
    for (const key of REQUIRED_MESSAGE_KEYS) {
      if (!isFilled(dictionary[key]))
        record.failures.push(`messages.${locale}.${key} is missing or empty`);
    }
  }
});

let governed = [];
check('contract.governedPaths', (record) => {
  const paths = contract.governedPaths;
  if (!Array.isArray(paths) || paths.length === 0)
    return record.failures.push('governedPaths must be a non-empty array');
  if (new Set(paths).size !== paths.length)
    record.failures.push('governedPaths contains duplicate entries');
  if (!paths.includes(CONTRACT_RELATIVE))
    record.failures.push(`governedPaths must include the contract itself (${CONTRACT_RELATIVE})`);
  for (const entry of paths) {
    if (!isFilled(entry)) {
      record.failures.push('governedPaths contains an empty entry');
      continue;
    }
    const reason = explicitFileProblem(entry);
    if (reason) {
      record.failures.push(`governedPaths entry ${JSON.stringify(entry)} ${reason}`);
      continue;
    }
    if (!entry.startsWith(BRAND_DIR)) {
      record.failures.push(
        `governedPaths entry ${JSON.stringify(entry)} is outside ${BRAND_DIR}; src/ and the rest of the repo are out of scope`,
      );
      continue;
    }
    const absolute = resolve(root, entry);
    if (absolute !== root && !absolute.startsWith(root + sep)) {
      record.failures.push(
        `governedPaths entry ${JSON.stringify(entry)} escapes the validation root`,
      );
      continue;
    }
    governed.push(entry);
  }
  record.detail = `${governed.length} governed paths`;
});

function explicitFileProblem(entry) {
  if (isAbsolute(entry)) return 'must be relative';
  if (entry.split(/[\\/]/).includes('..')) return 'must not contain ".."';
  if (/[*?[\]{}]/.test(entry)) return 'must be an explicit file, not a glob';
  return '';
}

check('contract.checkProfiles', (record) => {
  const profiles = contract.checkProfiles;
  if (profiles === undefined) return;
  if (!profiles || typeof profiles !== 'object' || Array.isArray(profiles)) {
    return record.failures.push(
      'checkProfiles must be an object mapping a path (or "default") to an array of scan rules',
    );
  }
  for (const [key, rules] of Object.entries(profiles)) {
    if (key !== 'default' && !isFilled(key))
      record.failures.push('checkProfiles contains an empty key');
    if (!Array.isArray(rules) || rules.length === 0) {
      record.failures.push(`checkProfiles.${key} must be a non-empty array of scan rules`);
      continue;
    }
    for (const rule of rules) {
      if (!SCAN_RULES.includes(rule)) {
        record.failures.push(
          `checkProfiles.${key} names unknown scan rule ${JSON.stringify(rule)}`,
        );
      }
    }
  }
  if (!Array.isArray(profiles.default))
    record.failures.push('checkProfiles.default must be an array of scan rules');
});

check('contract.publicationCopies', (record) => {
  const copies = contract.publicationCopies;
  if (copies === undefined) {
    record.detail = 'not declared (treated as empty list)';
    return;
  }
  if (!Array.isArray(copies))
    return record.failures.push('publicationCopies must be an array (may be empty)');
  for (const entry of copies) {
    if (!isFilled(entry)) {
      record.failures.push('publicationCopies contains an empty entry');
      continue;
    }
    const reason = explicitFileProblem(entry);
    if (reason) record.failures.push(`publicationCopies entry ${JSON.stringify(entry)} ${reason}`);
    else if (entry.startsWith('src/'))
      record.failures.push(
        `publicationCopies entry ${JSON.stringify(entry)} is under src/, which is out of scope`,
      );
    else if (!resolve(root, entry).startsWith(root + sep)) {
      record.failures.push(
        `publicationCopies entry ${JSON.stringify(entry)} escapes the validation root`,
      );
    }
  }
  record.detail = `${copies.length} publication copies in scope (extension point)`;
});

// --- Governed document scan -------------------------------------------------

const scanHits = new Map(SCAN_RULES.map((rule) => [rule, []]));
const scanned = [];
const skipped = [];
const unreadable = [];
let claimsPolicyText = null;

function tableHeaderIsNegative(lines, index) {
  for (let above = index - 1; above >= 0 && index - above <= 40; above--) {
    if (!/^\s*\|/.test(lines[above])) return false;
    if (TABLE_OR_SECTION_MARKER.test(lines[above])) return true;
  }
  return false;
}

function sectionIsNegative(lines, index) {
  for (let above = index - 1; above >= 0 && index - above <= 80; above--) {
    if (/^\s{0,3}#{1,6}\s/.test(lines[above])) return TABLE_OR_SECTION_MARKER.test(lines[above]);
  }
  return false;
}

function isNegativeContext(lines, index, { tableTolerant }) {
  const line = lines[index];
  if (EXEMPT_CONTEXT.test(line) || BAD_MARKERS.test(line)) return true;
  if (tableTolerant && /^\s*\|/.test(line) && tableHeaderIsNegative(lines, index)) return true;
  if (/^\s*\|/.test(line) && tableHeaderIsNegative(lines, index)) return true;
  return sectionIsNegative(lines, index);
}

function stripInlineCode(line) {
  return line.replace(/`[^`\n]*`/g, ' ');
}

function scanLine(line, enabledRules, brandContract) {
  const violations = [];
  const prose = stripInlineCode(line);

  if (enabledRules.has('trademarkSymbols') && SYMBOL_ATTACHED.test(line)) {
    const registered = line.match(/[®™]/)?.[0] === '®';
    violations.push({
      rule: 'trademarkSymbols',
      message: registered
        ? 'a registered-trademark symbol is attached to MAREA or a family/bundle name while clearance is NOT_GRANTED'
        : 'an unregistered-trademark symbol is attached to MAREA or a family/bundle name while clearance is NOT_GRANTED',
    });
  }

  if (enabledRules.has('productNames')) {
    for (const family of REQUIRED_FAMILIES) {
      const canonical = `MAREA ${family}`;
      const pattern = new RegExp(`\\bmarea[\\s_-]*${family}\\b`, 'gi');
      for (const match of prose.matchAll(pattern)) {
        if (match[0] !== canonical) {
          violations.push({
            rule: 'productNames',
            message: `product family ${family} is written as ${JSON.stringify(match[0])} instead of ${JSON.stringify(canonical)}`,
          });
        }
      }
    }
    const forbiddenNames = Array.isArray(brandContract.namingRules?.forbiddenFamilyNames)
      ? brandContract.namingRules.forbiddenFamilyNames
      : [];
    for (const name of forbiddenNames) {
      if (!isFilled(name)) continue;
      if (new RegExp(`\\b${escapeRegExp(name)}\\b`, 'i').test(prose)) {
        violations.push({
          rule: 'productNames',
          message: `invented family name ${JSON.stringify(name)} is outside the nine mandated product families`,
        });
      }
    }
  }

  if (enabledRules.has('attribution')) {
    const attributions = [
      [
        /\bMAREA\s+(?:by|de|from)\s+OPEN[- ]?MARINE\b/i,
        'MAREA is attributed to the OPEN-MARINE technology foundation',
      ],
      [
        /\bEMBARCARTE\s+(?:by|de|from)\s+MAREA\b/i,
        'EMBARCARTE is attributed to MAREA instead of the other way round',
      ],
      [
        /\bMAREA\b[^.\n]{0,60}\ba brand of\s+(?:the\s+)?(?!EMBARCARTE\b)[A-Z][\w-]+/i,
        '"a brand of" names an owner other than EMBARCARTE',
      ],
      [
        /\bEMBARCARTE\b[^.\n]{0,60}\ba brand of\s+(?:MAREA|OPEN[- ]?MARINE)\b/i,
        'EMBARCARTE is presented as a sub-brand of MAREA or OPEN-MARINE',
      ],
    ];
    for (const [pattern, message] of attributions) {
      if (pattern.test(line)) violations.push({ rule: 'attribution', message });
    }
  }

  if (enabledRules.has('clearanceClaims')) {
    const clearanceClaims = [
      [
        /\bMAREA\s+(?:is|es)\s+(?:a\s+|the\s+)?(?:registered|registrad[ao]|legally\s+cleared)\b/i,
        'MAREA is presented as registered or legally cleared while clearance is NOT_GRANTED',
      ],
      [
        /\bMAREA\b[^.\n]{0,40}\b(?:registered\s+trademark|marca\s+registrada)\b/i,
        'MAREA is presented as a registered trademark while clearance is NOT_GRANTED',
      ],
      [
        /\bMAREA\b[^.\n]{0,40}\btrademark\b[^.\n]{0,30}\b(?:has\s+been\s+|is\s+|was\s+)?(?:granted|registered|approved|cleared)\b/i,
        'MAREA trademark is presented as granted, registered, approved or cleared while clearance is NOT_GRANTED',
      ],
      [
        /\bMAREA\b[^.\n]{0,70}\b(?:commercially\s+available|available\s+(?:now|for\s+(?:purchase|sale|order|pre-?order))|on\s+sale|in\s+stock|buy\s+now)\b/i,
        'MAREA is presented as commercially available while no product is released',
      ],
    ];
    for (const [pattern, message] of clearanceClaims) {
      if (pattern.test(line)) violations.push({ rule: 'clearanceClaims', message });
    }
  }

  return violations;
}

for (const entry of governed) {
  const absolute = resolve(root, entry);
  if (absolute === contractPath) {
    scanned.push({
      path: entry,
      detail:
        'contract validated structurally; text rules exempt (the contract must quote prohibited statements)',
    });
    continue;
  }
  let text;
  try {
    text = readFileSync(absolute, 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') {
      skipped.push(entry);
      continue;
    }
    unreadable.push(`${entry}: cannot be read (${error.message})`);
    continue;
  }
  if (entry === CLAIMS_POLICY_RELATIVE) claimsPolicyText = text;
  const lines = text.split(/\r?\n/);
  scanned.push({ path: entry, detail: `${lines.length} lines` });

  const profile = contract.checkProfiles?.[entry] ?? contract.checkProfiles?.default ?? SCAN_RULES;
  const enabledRules = new Set(profile);
  let inFence = false;
  lines.forEach((line, index) => {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      return;
    }
    if (inFence || !line.trim()) return;
    // Naming occurrences in tables are illustrative (forbidden/allowed columns)
    // and are governed by the table itself, so only prose is checked for naming.
    if (enabledRules.has('productNames') && /^\s*\|/.test(line)) return;
    if (isNegativeContext(lines, index, { tableTolerant: enabledRules.has('productNames') }))
      return;
    const emitted = new Set();
    for (const violation of scanLine(line, enabledRules, contract)) {
      const key = `${violation.rule}|${violation.message}`;
      if (emitted.has(key)) continue;
      emitted.add(key);
      scanHits.get(violation.rule).push(`${entry}:${index + 1}: ${violation.message}`);
    }
  });
}

check('brand.docs.readable', (record) => {
  for (const failure of unreadable) record.failures.push(failure);
});

const SCAN_CHECK_IDS = {
  trademarkSymbols: 'brand.docs.trademarkSymbols',
  productNames: 'brand.docs.productNames',
  attribution: 'brand.docs.attribution',
  clearanceClaims: 'brand.docs.clearanceClaims',
};
for (const rule of SCAN_RULES) {
  check(SCAN_CHECK_IDS[rule], (record) => {
    for (const hit of scanHits.get(rule)) record.failures.push(hit);
  });
}

// Policy coverage: the claims policy must literally restate every prohibited
// claim pattern, so a document cannot quietly drop one of them.
check('brand.policyCoverage', (record) => {
  const patterns = contract.claimsPolicy?.prohibitedClaimPatterns ?? [];
  if (claimsPolicyText === null) {
    record.detail = 'skipped: claims policy document is absent (reported as skipped above)';
    return;
  }
  const policyText = normalizeWhitespace(claimsPolicyText);
  for (const pattern of patterns) {
    if (!policyText.includes(normalizeWhitespace(pattern))) {
      record.failures.push(
        `${CLAIMS_POLICY_RELATIVE} does not restate prohibited claim pattern ${JSON.stringify(pattern)}`,
      );
    }
  }
  record.detail = `${patterns.length} prohibited claim patterns checked`;
});

// Publication copies: an explicit extension point. Empty today, so nothing is
// scanned; when a copy file is listed, prohibited claims and clearance
// assertions in it are real violations with no negative-context tolerance.
check('brand.publicationCopies', (record) => {
  const copies = Array.isArray(contract.publicationCopies) ? contract.publicationCopies : [];
  if (copies.length === 0) {
    record.detail = '0 publication copies in scope (extension point; empty list passes)';
    return;
  }
  const patterns = (contract.claimsPolicy?.prohibitedClaimPatterns ?? []).map((claim) =>
    normalizeWhitespace(String(claim)),
  );
  let scannedCopies = 0;
  for (const entry of copies) {
    let text;
    try {
      text = readFileSync(resolve(root, entry), 'utf8');
    } catch (error) {
      record.failures.push(`${entry}: cannot be read (${error.message})`);
      continue;
    }
    scannedCopies++;
    text.split(/\r?\n/).forEach((line, index) => {
      const normalized = normalizeWhitespace(line);
      for (const pattern of patterns) {
        if (normalized.includes(pattern)) {
          record.failures.push(
            `${entry}:${index + 1}: prohibited claim pattern ${JSON.stringify(pattern)} appears in a publication copy`,
          );
        }
      }
      for (const violation of scanLine(line, new Set(['clearanceClaims']), contract)) {
        record.failures.push(`${entry}:${index + 1}: ${violation.message}`);
      }
    });
  }
  record.detail = `${scannedCopies} of ${copies.length} publication copies scanned`;
});

// --- Report -----------------------------------------------------------------

const failed = checks.filter((entry) => entry.failures.length > 0);
const passed = checks.length - failed.length;
const contractRelative = relative(root, contractPath).replace(/\\/g, '/');

console.log(
  `Brand governance validator — EMBARCARTE / MAREA (contract ${contract.contractVersion}, ${contract.status})`,
);
console.log(`Contract: ${contractRelative.startsWith('..') ? contractPath : contractRelative}`);
console.log(`Root: ${displayPath(root)}`);
console.log('');
for (const { id, failures, detail } of checks) {
  if (failures.length === 0) {
    console.log(`PASS  ${id}${detail ? ` — ${detail}` : ''}`);
    continue;
  }
  console.log(`FAIL  ${id} (${failures.length} ${failures.length === 1 ? 'failure' : 'failures'})`);
  for (const failure of failures) console.log(`        - ${failure}`);
}
console.log('');
console.log('Governed files (only these are read; everything else is out of scope):');
if (scanned.length === 0) console.log('  (none scanned)');
for (const file of scanned) console.log(`  scanned   ${file.path} — ${file.detail}`);
for (const path of skipped) console.log(`  skipped   ${path} — not found (content not evaluated)`);
console.log('');
console.log(
  `Summary: ${checks.length} checks run, ${passed} passed, ${failed.length} failed; ${scanned.length} files scanned, ${skipped.length} skipped.`,
);
console.log(failed.length === 0 ? 'RESULT: PASS' : 'RESULT: FAIL');
process.exitCode = failed.length === 0 ? 0 : 1;
