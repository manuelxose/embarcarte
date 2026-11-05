#!/usr/bin/env node
/**
 * MC-18 landing guard helpers.
 *
 * Pure, deterministic functions shared by the validator
 * (`scripts/check-marea-landing.mjs`), its unit/adversarial suites and the
 * Playwright evidence layer. No network, no writes, no browser APIs.
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';

const toPosix = (path) => path.replaceAll('\\', '/');

/** Spanish and English negation markers used by the constraint-copy rules. */
const NEGATION = {
  es: /\b(?:no|sin|nunca|ning[uú]n[oa]?s?|ni|cero|0)\b/i,
  en: /\b(?:no|not|without|never|none|nor|zero|0|cannot|can't|n't)\b/i,
};

export function hasNegation(text) {
  return NEGATION.es.test(text) || NEGATION.en.test(text);
}

/** Splits a text into sentence-like windows for negation-aware scanning. */
export function sentences(text) {
  return String(text)
    .split(/(?<=[.!?;:])\s+|\n+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

/**
 * Prohibited commercial/safety claim patterns.
 *
 * Each pattern targets a claim category that the MC-14 claims policy prohibits
 * for MAREA. A match inside a sentence that contains an explicit negation is
 * allowed (the landing states limitations, it does not assert them).
 * `negationExempt: false` marks patterns that are forbidden even in a negation
 * window (the registered-trademark symbol and purchase controls).
 */
export const DANGEROUS_COPY_PATTERNS = [
  {
    category: 'PRICE_AMOUNT',
    pattern:
      /(?:\d[\d.,]*\s*(?:€|eur\b|euros?\b|usd\b|\$))|(?:\b(?:precio|price)\b[^.\n]{0,20}\d)/i,
    negationExempt: true,
  },
  {
    category: 'STOCK_OR_ORDER',
    pattern:
      /\b(?:en stock|in stock|disponible para pedido|available to order|añadir al carrito|add to (?:the )?(?:cart|basket)|comprar ahora|buy now|preventa|pre-order|reserva ahora|reserve now|lista de espera|waiting list|waitlist)\b/i,
    negationExempt: true,
  },
  {
    category: 'DELIVERY_DATE',
    pattern:
      /\b(?:entrega en|delivery within|env[ií]o en \d|disponible en \d{4}|available in \d{4}|disponible pr[oó]ximamente|available soon)\b/i,
    negationExempt: true,
  },
  {
    category: 'CERTIFICATION',
    pattern:
      /\b(?:certificad[oa]s?|certified|certificaci[oó]n|NMEA ?2000|marcado CE|CE[- ]mark(?:ed|ing)?|homologad[oa]s?|approved as marine equipment|RED and EMC compliant|conforme a RED|CRA[- ]?certified)\b/i,
    negationExempt: true,
  },
  {
    category: 'AUTONOMY_OR_GUARANTEE',
    pattern:
      /\b(?:aut[oó]nomo|autonomous|evitaci[oó]n de colisiones|collision[- ]avoidance|garantiz(?:a|ado|ada|adas|ados)|guarantee(?:d|s)?|SLA|99[.,]9\s*%|24\/7)\b/i,
    negationExempt: true,
  },
  {
    category: 'TESTIMONIAL_OR_AUTHORITY',
    pattern:
      /\b(?:testimonios?|testimonials?|clientes conf[ií]an|customers trust|l[ií]deres del mercado|market leader)\b/i,
    negationExempt: true,
  },
  {
    category: 'LICENSED_DATA_INCLUDED',
    pattern:
      /\b(?:cartas? n[aá]uticas? oficiales|official nautical charts?|datos meteorol[oó]gicos oficiales|official weather data|datos licenciados incluidos|licensed data included)\b/i,
    negationExempt: true,
  },
  {
    category: 'TRANSMISSION',
    pattern: /\btransmit(?:e|es|s|ir|iendo)\b[^.\n]{0,40}\bAIS\b|\bAIS\b[^.\n]{0,40}\btransmit/i,
    negationExempt: true,
  },
  {
    category: 'FAKE_TELEMETRY',
    pattern: /\b\d+(?:[.,]\d+)?\s*(?:knots?|nudos?|kn\b|m\/s|°C|bar\b|Ah\b)/i,
    negationExempt: true,
  },
  {
    category: 'INVENTED_DIMENSIONS',
    pattern: /\b\d+(?:[.,]\d+)?\s*(?:pulgadas|inch(?:es)?|nits|cd\/m2|cm\b|mm\b)/i,
    negationExempt: true,
  },
  {
    category: 'CONTACT_OR_LEAD_CAPTURE',
    pattern:
      /\b(?:formulario de contacto|contact form|solicitar presupuesto|request a quote|reg[ií]strate|register now|suscr[ií]bete|subscribe now|deja tus datos|leave your details)\b/i,
    negationExempt: true,
  },
  {
    category: 'REGISTERED_TRADEMARK',
    pattern: /®|\b(?:marca registrada|registered trademark)\b/i,
    negationExempt: false,
  },
  {
    category: 'OFFICIAL_SECURITY_OR_PRIVACY_CLAIM',
    pattern:
      /\b(?:cumplimiento total del RGPD|full GDPR compliance|propietarios del c[oó]digo|own the code|seguro con cobertura|insured with liability)\b/i,
    negationExempt: true,
  },
];

/**
 * True when a negation marker appears in the window immediately before a
 * match (up to 80 characters back), or the sentence opens with one. This makes
 * "sin navegación autónoma" acceptable while rejecting "gobierno totalmente
 * autónomo sin supervisión", where "sin" does not negate the risky term.
 */
export function negatedBefore(sentence, matchIndex) {
  const window = sentence.slice(Math.max(0, matchIndex - 80), matchIndex);
  return NEGATION.es.test(window) || NEGATION.en.test(window);
}

/**
 * Scans a text for prohibited claims. Returns one entry per unmatched
 * violation; a match preceded by a negation window is not a violation.
 */
export function scanDangerousCopy(text, { patterns = DANGEROUS_COPY_PATTERNS } = {}) {
  const violations = [];
  for (const sentence of sentences(text)) {
    for (const { category, pattern, negationExempt } of patterns) {
      const regex = new RegExp(
        pattern.source,
        pattern.flags.includes('g') ? pattern.flags : pattern.flags + 'g',
      );
      let match;
      while ((match = regex.exec(sentence)) !== null) {
        const allowed =
          negationExempt && (negatedBefore(sentence, match.index) || hasNegation(match[0]));
        if (!allowed) {
          violations.push({ category, match: match[0], sentence });
          break;
        }
      }
    }
  }
  return violations;
}

/** Numeric tokens normalised so ES and EN representations compare equal. */
export function numericTokens(text) {
  const normalised = String(text).replace(/(\d)[.,](?=\d{3}\b)/g, '$1');
  return (normalised.match(/\d+(?:[.,]\d+)?/g) ?? []).sort();
}

export const PLACEHOLDER_PATTERN =
  /\b(?:TODO|TBD|FIXME|XXX|lorem ipsum|placeholder)\b|\{[a-z][a-zA-Z]*\}/;

/**
 * Structural ES/EN parity for resolved content records.
 * Input: array of `{ contentId, locale, text }`.
 */
export function bilingualParityProblems(records) {
  const byId = new Map();
  for (const record of records) {
    if (!byId.has(record.contentId)) byId.set(record.contentId, {});
    byId.get(record.contentId)[record.locale] = record.text;
  }
  const problems = [];
  for (const [contentId, pair] of byId) {
    if (!pair.es || !pair.en) {
      problems.push(`${contentId}: missing ${pair.es ? 'en' : 'es'} text`);
      continue;
    }
    if (PLACEHOLDER_PATTERN.test(pair.es) || PLACEHOLDER_PATTERN.test(pair.en)) {
      problems.push(`${contentId}: placeholder text`);
    }
    const esNumbers = numericTokens(pair.es).join(',');
    const enNumbers = numericTokens(pair.en).join(',');
    if (esNumbers !== enNumbers) {
      problems.push(`${contentId}: numeric mismatch (es=${esNumbers} en=${enNumbers})`);
    }
    if (
      pair.es.trim() === pair.en.trim() &&
      /\b(?:el|la|los|las|de|del|que|para|con)\b/i.test(pair.es)
    ) {
      problems.push(`${contentId}: suspected untranslated Spanish text in EN`);
    }
  }
  return problems;
}

/**
 * Constraint copy must state a negation in both locales. Input: content blocks
 * with `copyClass`, `contentId` and `text`.
 */
export function constraintNegationProblems(blocks) {
  const problems = [];
  for (const block of blocks) {
    if (block.copyClass !== 'CONSTRAINT_STATEMENT') continue;
    for (const locale of ['es', 'en']) {
      const text = block.text?.[locale] ?? '';
      if (!hasNegation(text)) problems.push(`${block.contentId}: ${locale} lacks a negation`);
    }
  }
  return problems;
}

/** Collects source files under a repository-relative directory. */
export function collectSourceFiles(root, directory, extensions = ['.ts']) {
  const files = [];
  const walk = (dir) => {
    const absolute = resolve(root, dir);
    if (!existsSync(absolute)) return;
    for (const entry of readdirSync(absolute, { withFileTypes: true })) {
      const rel = join(dir, entry.name);
      if (entry.isDirectory()) walk(rel);
      else if (extensions.some((extension) => rel.endsWith(extension))) files.push(toPosix(rel));
    }
  };
  walk(directory);
  return files;
}

const IMPORT_PATTERN =
  /(?:import|export)\s+(?:[^'"]*?\s+from\s+)?['"]([^'"]+)['"]|import\s*\(\s*['"]([^'"]+)['"]\s*\)/g;

export function importSpecifiers(source) {
  const specifiers = new Set();
  let match;
  IMPORT_PATTERN.lastIndex = 0;
  while ((match = IMPORT_PATTERN.exec(source)) !== null) {
    specifiers.add(match[1] ?? match[2]);
  }
  return [...specifiers];
}

const RESOLVE_SUFFIXES = ['', '.ts', '.mts', '/index.ts'];

function resolveRelative(fromFile, specifier) {
  if (!specifier.startsWith('.')) return null;
  const base = resolve(dirname(fromFile), specifier);
  for (const suffix of RESOLVE_SUFFIXES) {
    const candidate = `${base}${suffix}`;
    try {
      if (statSync(candidate).isFile()) return candidate;
    } catch {
      // not a file; keep looking
    }
  }
  return null;
}

/**
 * Walks the relative import graph from the production entry points and reports
 * every path that reaches a forbidden root (the landing feature or the preview).
 */
export function findForbiddenReach({ root, entryFiles, forbiddenRoots }) {
  const offenders = new Set();
  const visited = new Set();
  const forbidden = forbiddenRoots.map((path) => resolve(root, path));
  const queue = entryFiles.map((file) => resolve(root, file));
  let scanned = 0;

  for (const entry of queue) {
    if (!existsSync(entry)) offenders.add(`${toPosix(relative(root, entry))}: entry file missing`);
  }

  const isForbidden = (absolutePath) =>
    forbidden.some((path) => absolutePath === path || absolutePath.startsWith(`${path}${sep}`));

  while (queue.length > 0) {
    const file = queue.shift();
    if (visited.has(file) || !existsSync(file)) continue;
    visited.add(file);
    if (isForbidden(file)) {
      offenders.add(`${toPosix(relative(root, file))}: forbidden module reached`);
      continue;
    }
    scanned += 1;
    const source = readFileSync(file, 'utf8');
    for (const specifier of importSpecifiers(source)) {
      const resolved = resolveRelative(file, specifier);
      if (!resolved) continue;
      if (isForbidden(resolved)) {
        offenders.add(
          `${toPosix(relative(root, file))}: "${specifier}" -> ${toPosix(relative(root, resolved))}`,
        );
        continue;
      }
      if (
        resolved.startsWith(resolve(root, 'src')) ||
        resolved.startsWith(resolve(root, 'preview'))
      ) {
        queue.push(resolved);
      }
    }
  }

  return { offenders: [...offenders].sort(), scanned };
}

/**
 * Static purchase/lead affordance scan for the landing and preview sources.
 * The DS components are not scanned: the design system already proves its own
 * fail-closed contract in MC-17.
 */
export const PURCHASE_CONTROL_PATTERNS = [
  { category: 'BUTTON_CONTROL', pattern: /<button\b/i },
  { category: 'FORM', pattern: /<form\b|<\/form>/i },
  { category: 'INPUT', pattern: /<input\b|<textarea\b|<select\b/i },
  { category: 'ANCHOR_TO_EXTERNAL', pattern: /href\s*=\s*["']https?:\/\//i },
  { category: 'MAILTO_OR_TEL', pattern: /mailto:|tel:/i },
  { category: 'HTTP_CLIENT', pattern: /HttpClient|provideHttpClient/i },
  { category: 'FETCH_OR_XHR', pattern: /\bfetch\s*\(|XMLHttpRequest|WebSocket|EventSource/ },
  { category: 'CLICK_HANDLER', pattern: /\(click\)\s*=/i },
  { category: 'CANONICAL_LINK', pattern: /rel\s*=\s*["']canonical["']/i },
  { category: 'HREFLANG_LINK', pattern: /rel\s*=\s*["']alternate["'][^>]*hreflang|hreflang\s*=/i },
  { category: 'JSON_LD', pattern: /application\/ld\+json/i },
  { category: 'OPEN_GRAPH', pattern: /property\s*=\s*["']og:/i },
  { category: 'TWITTER_CARD', pattern: /name\s*=\s*["']twitter:/i },
  { category: 'PUBLIC_ROUTE_LINK', pattern: /routerLink|href\s*=\s*["']\/(?!marea|en\/marea|#)/i },
  { category: 'ENV_OVERRIDE', pattern: /process\.env|localStorage|sessionStorage/i },
];

export function purchaseControlViolations(source) {
  const violations = [];
  for (const { category, pattern } of PURCHASE_CONTROL_PATTERNS) {
    const match = pattern.exec(source);
    if (match) violations.push({ category, match: match[0] });
  }
  return violations;
}

/** Component selectors declared with `@Component({ selector: '...' })`. */
export function declaredSelectors(source) {
  const selectors = [];
  const pattern = /selector:\s*'([^']+)'/g;
  let match;
  while ((match = pattern.exec(source)) !== null) selectors.push(match[1]);
  return selectors;
}

/** Public route files that must not reference the proposed landing. */
export function publicRouteSourceProblems(entries) {
  return entries
    .filter((entry) => /marea/i.test(entry.source))
    .map((entry) => `${entry.path}: references MAREA`);
}

/** Scope violations for a git porcelain listing (the MC-18 allowed file set). */
export function scopeProblems(statusLines, allowedPrefixes, allowedExact) {
  const exact = new Set(allowedExact);
  const problems = [];
  for (const line of statusLines) {
    if (typeof line !== 'string' || line.length <= 3) continue;
    const statusCode = line.slice(0, 2);
    const path = line.slice(3).trim().replace(/^"|"$/g, '').replaceAll('\\', '/');
    if (!path) continue;
    const target = path.includes(' -> ') ? path.split(' -> ').pop() : path;
    if (statusCode.includes('D')) {
      problems.push(`${target} (deletion)`);
      continue;
    }
    if (exact.has(target)) continue;
    if (allowedPrefixes.some((prefix) => target.startsWith(prefix))) continue;
    problems.push(target);
  }
  return problems;
}

/** Live public SEO emission that MC-18 must never produce. */
export function seoEmissionProblems(source) {
  const problems = [];
  if (/rel\s*=\s*["']canonical["']/i.test(source)) problems.push('canonical link');
  if (/rel\s*=\s*["']alternate["']/i.test(source)) problems.push('alternate hreflang link');
  if (/attr\.hreflang/.test(source)) problems.push('hreflang binding');
  if (/property\s*=\s*["']og:/i.test(source)) problems.push('open graph meta');
  if (/name\s*=\s*["']twitter:/i.test(source)) problems.push('twitter card meta');
  if (/type\s*=\s*["']application\/ld\+json["']/i.test(source)) problems.push('json-ld script');
  return problems;
}

/** Noindex contract for the internal preview. */
export function noindexProblems({ indexHtml, serverSource, hostSource = '' }) {
  const problems = [];
  if (!/name="robots"\s+content="noindex, nofollow/i.test(indexHtml))
    problems.push('missing robots meta');
  if (!/X-Robots-Tag/.test(serverSource)) problems.push('missing X-Robots-Tag header');
  if (!/noindex, nofollow/.test(serverSource))
    problems.push('X-Robots-Tag is not noindex,nofollow');
  if (
    /index:\s*true|noindex:\s*false|allowIndexing/i.test(`${indexHtml}${serverSource}${hostSource}`)
  )
    problems.push('indexing opt-in');
  return problems;
}

/** A gate or SEO module must not read an env var, storage or query parameter. */
export function gateOverrideProblems(sources) {
  const problems = [];
  for (const entry of sources) {
    if (/process\.env/.test(entry.source)) problems.push(`${entry.path}: process.env`);
    if (/localStorage|sessionStorage/.test(entry.source)) problems.push(`${entry.path}: storage`);
    if (/URLSearchParams|queryParam/.test(entry.source))
      problems.push(`${entry.path}: query parameter`);
  }
  return problems;
}

/** Landing must not redefine a design-system selector. */
export function selectorCollisionProblems(landingSource, registrySelectors) {
  const registry = new Set(registrySelectors);
  return declaredSelectors(landingSource).filter((selector) => registry.has(selector));
}

/** Preview server isolation: loopback binding, host allowlist, restrictive CSP. */
export function previewBindingProblems(serverSource) {
  const problems = [];
  if (!/const host = '127\.0\.0\.1'/.test(serverSource)) problems.push('not bound to 127.0.0.1');
  if (/0\.0\.0\.0/.test(serverSource)) problems.push('binds all interfaces');
  if (!/ALLOWED_HOSTS/.test(serverSource)) problems.push('missing host allowlist');
  if (!/X-Robots-Tag/.test(serverSource)) problems.push('missing X-Robots-Tag');
  if (!/form-action 'none'/.test(serverSource)) problems.push('CSP allows form actions');
  return problems;
}

/** The internal/provisional banner must be unconditional. */
export function bannerProblems(landingSource) {
  const problems = [];
  if (!/<marea-internal-banner\b/.test(landingSource)) problems.push('banner not composed');
  if (/@if[^>]*>[\s\S]{0,200}<marea-internal-banner/.test(landingSource))
    problems.push('banner conditionally rendered');
  if (!/data-landing-internal-banner/.test(landingSource))
    problems.push('banner marker missing in banner source');
  return problems;
}

/** Every one of the nine families must keep bilingual limitations. */
export function familyLimitationProblems(families, requiredIds) {
  const problems = [];
  const byId = new Map(families.map((family) => [family.familyId, family]));
  for (const familyId of requiredIds) {
    const family = byId.get(familyId);
    if (!family) {
      problems.push(`${familyId}: missing family copy`);
      continue;
    }
    if (!Array.isArray(family.limitations) || family.limitations.length === 0)
      problems.push(`${familyId}: no limitation`);
    for (const limitation of family.limitations ?? []) {
      if (!limitation.text?.es || !limitation.text?.en)
        problems.push(`${familyId}: limitation missing a locale`);
    }
  }
  return problems;
}

/** Duplicate product identity in either locale is a defect. */
export function duplicateIdentityProblems(ids) {
  const seen = new Set();
  const duplicates = new Set();
  for (const id of ids) {
    if (seen.has(id)) duplicates.add(id);
    seen.add(id);
  }
  return [...duplicates];
}

/** FLEET must stay contracted, hardware-free by default and SLA-free. */
export function fleetPolicyProblems(bundle) {
  if (!bundle) return ['FLEET bundle missing'];
  const problems = [];
  if (bundle.contractedSolution !== true) problems.push('FLEET is not a contracted solution');
  if (bundle.hardwareIncludedByDefault !== false) problems.push('FLEET includes default hardware');
  if (bundle.slaEstablished !== false) problems.push('FLEET has an established SLA');
  if (bundle.priceApproved !== false) problems.push('FLEET has an approved price');
  if (bundle.orderable !== false) problems.push('FLEET is orderable');
  return problems;
}

/** No MAREA asset may be copied into public/. */
export function publicAssetProblems(publicFiles) {
  return publicFiles.filter((file) => /marea/i.test(file));
}

/** The preview project must not write into the production output path. */
export function previewProjectProblems(project, productionStyles) {
  const problems = [];
  if (!project) return ['preview project missing'];
  const options = project.architect?.build?.options ?? {};
  if (options.outputPath === 'dist/embarcarte')
    problems.push('preview writes into the production output');
  if (!options.outputPath?.startsWith('dist/marea-landing-preview'))
    problems.push('unexpected preview output path');
  if (options.outputMode !== 'server') problems.push('preview is not an SSR build');
  if (!options.ssr?.entry) problems.push('preview SSR entry missing');
  if (JSON.stringify(productionStyles) !== JSON.stringify(['src/styles.scss']))
    problems.push('production styles changed');
  return problems;
}

/** Hydration evidence must prove a clean run. */
export function hydrationEvidenceProblems(data) {
  const problems = [];
  if (data?.hydration?.status !== 'PASS') problems.push('hydration status is not PASS');
  if (data?.hydration?.consoleErrors !== 0) problems.push('hydration console errors recorded');
  if (data?.hydration?.duplicateDom !== false) problems.push('duplicate DOM recorded');
  if (data?.ssr?.es?.status !== 200) problems.push('ES SSR status is not 200');
  if (data?.ssr?.en?.status !== 200) problems.push('EN SSR status is not 200');
  if (data?.ssr?.noCanonical !== true) problems.push('canonical not recorded as absent');
  if (data?.ssr?.noHreflang !== true) problems.push('hreflang not recorded as absent');
  if (data?.ssr?.noJsonLd !== true) problems.push('JSON-LD not recorded as absent');
  return problems;
}

/** A focus outline must not be removed without a visible replacement. */
export function focusOutlineRemoval(source) {
  const problems = [];
  const rule = /outline:\s*(?:none|0)(?:[^;}]*)!important?/gi;
  if (rule.test(source)) problems.push('outline removal forced');
  const plain = /outline:\s*(?:none|0)\s*;/gi;
  let match;
  while ((match = plain.exec(source)) !== null) {
    const tail = source.slice(match.index, match.index + 200);
    if (!/:focus-visible/.test(tail)) problems.push('outline removed without focus-visible');
    break;
  }
  return problems;
}

/** A mobile media query must not hide limitation/notice/banner content. */
export function mobileDisclosureProblems(source) {
  const problems = [];
  const mediaBlocks = source.match(/@media[^{]*max-width[^{]*\{([\s\S]*?)\n?\s*\}/g) ?? [];
  for (const block of mediaBlocks) {
    if (!/display:\s*none/.test(block)) continue;
    if (/(?:limits?|notice|banner|constraint|disclaimer|limitation)/i.test(block))
      problems.push('limited content hidden at mobile width');
  }
  return problems;
}
