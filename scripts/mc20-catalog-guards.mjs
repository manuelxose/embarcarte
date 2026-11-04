/**
 * MC-20 catalogue guards — pure helpers shared by the validator and its tests.
 *
 * These are evidence helpers, not application runtime code: they are used by
 * `scripts/check-mc20-catalog.mjs` and the node:test suite. They never write to
 * the repository and never contact the network.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

/** Claims that may never appear in an internal catalogue page, in either locale. */
export const PROHIBITED_CLAIMS = [
  {
    id: 'currency',
    pattern: /€|\$\s?\d|\b\d+\s?(?:€|\$|EUR|USD|euros?|dólares?|dollars?)\b|\b(?:EUR|USD)\s?\d/i,
  },
  {
    id: 'positive-guarantee',
    pattern:
      /\bgarantizamos\b|\bwe guarantee\b|\bcompatibilidad garantizada\b|\bguaranteed compatib/i,
  },
  {
    id: 'positive-warranty',
    pattern: /\bgarantía de compatibilidad\b|\bgarantía de funcionamiento\b/i,
  },
  { id: 'approved-by', pattern: /\baprobado por\b|\bapproved by\b/i },
  { id: 'homologated', pattern: /\bhomologad[oa]s?\b/i },
  { id: 'sea-trial', pattern: /\bpruebas? de mar\b|\bsea[- ]trials?\b/i },
  { id: 'testimonial', pattern: /\btestimonios?\b|\btestimonials?\b/i },
  { id: 'in-stock', pattern: /\ben stock\b|\bin stock\b/i },
  { id: 'add-to-cart', pattern: /\bañadir al carrito\b|\badd to cart\b/i },
  { id: 'buy-now', pattern: /\bcomprar ahora\b|\bbuy now\b/i },
  { id: 'checkout', pattern: /\bcheckout\b|\bcarrito de compra\b/i },
  { id: 'delivery-date', pattern: /\bplazos? de entrega\b|\bdelivery date\b|\bentrega en \d+\b/i },
  { id: 'price-amount', pattern: /\bprecio(?:s)? (?:de|desde)\s?\d/i },
  { id: 'stock-quantity', pattern: /\b\d+\s+(?:unidades|units)\s+(?:en stock|available)\b/i },
  {
    id: 'positive-certification',
    pattern:
      /\b(?:está|están|is|are) certificad[oa]s?\b|\bproducto certificad[oa]\b|\bcertificad[oa] por\b|\bcertified (?:by|to|under)\b/i,
  },
  {
    id: 'positive-nmea-compatibility',
    pattern:
      /\bcompatible con NMEA\b|\bcompatible with NMEA\b|\bNMEA[- ]compatible\b|\binteroperable con NMEA\b|(?<!not )(?<!no )\bNMEA (?:2000 )?certified\b/i,
  },
  {
    id: 'warranty-term',
    pattern: /\bgarantía de \d+ (?:años?|meses)\b|\b\d+[- ]year warranty\b/i,
  },
  {
    id: 'shipping-promise',
    pattern: /\benvío (?:gratis|gratuito|en \d)|\bfree shipping\b|\bships? (?:in|within)\b/i,
  },
  {
    id: 'positive-collision-avoidance',
    pattern:
      /\bpreviene colisiones\b|\bevita colisiones\b|\bprevents collisions\b|\bavoids? collisions\b/i,
  },
  {
    id: 'universal-compatibility',
    pattern:
      /\bcompatible con cualquier\b|\buniversalmente compatible\b|\bcompatible with any\b|\buniversally compatible\b|\bplug[- ]and[- ]play universal\b|\buniversal plug[- ]and[- ]play\b/i,
  },
  {
    id: 'positive-transmission',
    pattern:
      /(?<!no )(?<!not )\btransmite (?:AIS|tu posición|la posición)\b|(?<!not )\btransmits (?:AIS|your position)\b/i,
  },
  {
    id: 'forecast-accuracy',
    pattern:
      /\b(?:% de acierto|\d+\s?% de acierto|tasa de acierto|hit rate|accuracy rate|exactitud garantizada|precisión garantizada|guaranteed accuracy|accuracy guaranteed|verified accuracy)\b/i,
  },
  {
    id: 'sla-claim',
    pattern:
      /\b(?:SLA garantizado|SLA de |guaranteed SLA|SLA guaranteed|nivel de servicio garantizado|guaranteed service level|service[- ]level agreement)\b/i,
  },
  {
    id: 'guaranteed-delivery',
    pattern:
      /\b(?:entrega|aviso|alerta)\b[^.;!?]{0,24}\bgarantizad[ao]s?\b|\bgarantizad[ao]s?\b[^.;!?]{0,24}\b(?:entrega|aviso|alerta)\b|\bguaranteed (?:delivery|alert)\b|\b(?:delivery|alert) guaranteed\b/i,
  },
  {
    id: 'positive-availability',
    pattern:
      /\b(?:disponible para la venta|a la venta|en venta|on sale|available for (?:sale|purchase)|listo para (?:comprar|enviar)|ready to (?:buy|ship)|aprobado para (?:la )?venta|approved for sale)\b/i,
  },
  {
    id: 'numeric-accuracy',
    pattern: /±\s?\d|\b\d+\s?%|\b(?:accuracy|hit[- ]rate|acierto)\b[^.;,!?]{0,12}\b\d+\s?%/i,
  },
  { id: 'ip-rating', pattern: /\bIP\s?\d{1,2}[A-Z]?\b|\bIPX\s?\d\b/i },
  {
    id: 'ordering',
    pattern: /\b(?:pre[- ]?order|preventa|pre[- ]?venta|pre[- ]?reserva|pre[- ]?reservation)\b/i,
  },
];

/** Assertion rules whose match may legitimately appear inside a negated clause. */
const NEGATABLE = new Set([
  'positive-guarantee',
  'positive-warranty',
  'positive-certification',
  'positive-nmea-compatibility',
  'warranty-term',
  'shipping-promise',
  'positive-collision-avoidance',
  'universal-compatibility',
  'positive-transmission',
  'forecast-accuracy',
  'sla-claim',
  'guaranteed-delivery',
  'positive-availability',
  'numeric-accuracy',
  'ip-rating',
  'ordering',
]);

const CLAUSE_NEGATION = /\b(?:no|sin|not|never|without|ni|neither|nor)\b/i;
// Commas and coordinating conjunctions end a clause, so a negation in an
// earlier clause ("Sin permanencia,") cannot suppress a claim in a later one.
// Negation particles (ni/nor/neither) are NOT boundaries: they continue the
// negation of the current clause.
const CLAUSE_BOUNDARY = /[.;,]|\b(?:y|e|o|u|pero|and|or|but)\b/g;

/**
 * True when the clause that starts before `start` already contains a negation.
 * The scan runs from the clause start to `end` (the full matched span), so a
 * spread pattern such as "entrega … garantizada" that carries its own negation
 * inside the span ("entrega no garantizada") is recognised as negated, while
 * "Sin permanencia, SLA garantizado" is not (the comma starts a fresh clause).
 */
function isNegatedClause(text, start, end) {
  let clauseStart = 0;
  for (const match of text.matchAll(CLAUSE_BOUNDARY)) {
    if (match.index !== undefined && match.index < start)
      clauseStart = match.index + match[0].length;
  }
  return CLAUSE_NEGATION.test(text.slice(clauseStart, end));
}

/**
 * Returns the ids of prohibited claim rules matched by a text.
 *
 * Assertion rules are clause-negation aware: "no plug-and-play universal
 * gateway is offered" must pass while "universal plug-and-play" must fail.
 * Every match is scanned (not only the first), so a later non-negated claim
 * cannot escape behind an earlier negated one.
 */
export function catalogClaimProblems(text) {
  if (typeof text !== 'string') return ['not-a-string'];
  const problems = [];
  for (const rule of PROHIBITED_CLAIMS) {
    const global = new RegExp(
      rule.pattern.source,
      rule.pattern.flags.includes('g') ? rule.pattern.flags : `${rule.pattern.flags}g`,
    );
    let hit = false;
    for (const match of text.matchAll(global)) {
      if (match.index === undefined) continue;
      const end = match.index + match[0].length;
      if (!(NEGATABLE.has(rule.id) && isNegatedClause(text, match.index, end))) {
        hit = true;
        break;
      }
    }
    if (hit) problems.push(rule.id);
  }
  return problems;
}

/**
 * Data-provider names that may never appear in the internal catalogue: no
 * provider is contracted (provider rights NOT_GRANTED). Returns the names found,
 * case-insensitively, or an empty array. Matching is word-boundary aware so a
 * short marker (IHM, AEMET) is never matched as a substring of an unrelated
 * word; multi-word and hyphenated names are matched as whole forms.
 */
export const NAMED_PROVIDER_MARKERS = [
  'meteoblue',
  'meteogroup',
  'predictwind',
  'windy.com',
  'ecmwf',
  'navionics',
  'tidetech',
  'stormglass',
  'openweather',
  'windfinder',
  'windguru',
  'buoyweather',
  'meteofrance',
  'noaa',
  'aemet',
  'ipma',
  // MC-21 mandated providers (finding F-1): none is contracted, so none may be
  // named. AEMET and OpenWeather were already covered above.
  'copernicus',
  'emodnet',
  'open-meteo',
  'meteogalicia',
  'puertos del estado',
  'ihm',
];

export function providerNameProblems(text) {
  if (typeof text !== 'string') return [];
  const lower = text.toLowerCase();
  return NAMED_PROVIDER_MARKERS.filter((name) => {
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`\\b${escaped}\\b`).test(lower);
  });
}

/**
 * Spanish function-word clustering in an English sentence. Two or more hits
 * indicate an untranslated block; a single hit is tolerated because several of
 * these tokens are legitimate English words.
 */
const SPANISH_ONLY = /\b(?:el|la|los|las|una|para|con|que|desde|sin|según|también)\b/gi;

export function englishClusterProblem(text) {
  if (typeof text !== 'string') return false;
  const hits = (text.match(SPANISH_ONLY) ?? []).length;
  return hits >= 2;
}

/** A source reference is `<relative path>[#fragment]`; the path must exist. */
export function sourceRefPath(ref) {
  if (typeof ref !== 'string' || ref.length === 0) return null;
  const [path] = ref.split('#');
  return path;
}

/** Proper-noun-like tokens may legitimately be identical in both locales. */
const LOCALE_INVARIANT =
  /^(?:MAREA(?:\s+(?:NAV|HUB|AIS|SENSE|WATCH|WEATHER|START|CRUISE|SAIL|PROTECT|COMPLETE|FLEET))?|NAV|HUB|AIS|SENSE|WATCH|WEATHER|Software|Hardware|Signal K|NMEA 0183|Wi-Fi|[A-Z0-9][A-Z0-9 ·_-]*|NAV (?:Essential|Pro)|HUB (?:Standard|Pro)|AIS (?:Receiver|Connected)|SENSE (?:Wind|Power|Bilge|Tanks|Environment|Essentials|Sail|Systems)|WATCH (?:Core|Plus)|WEATHER (?:Standard|Pro))$/;

const NEGATION_ES = /\b(?:no|sin|sólo|solo|ni|nunca)\b/i;
const NEGATION_EN = /\b(?:no|not|never|without|only|neither|nor|receive-only)\b/i;

/**
 * Genuine bilingual checks over every localized pair: no empty locale, no
 * untranslated pair unless it is a proper noun, and every limitation or
 * prohibition carries a negation marker in both languages.
 */
export function bilingualTextProblems(content) {
  const problems = [];
  const pairs = [];
  const collect = (id, value) => {
    if (value && typeof value === 'object') {
      const hasEs = 'es' in value;
      const hasEn = 'en' in value;
      if (hasEs || hasEn) {
        if (!hasEs || !hasEn) {
          problems.push(`${id}: missing locale`);
        } else {
          pairs.push({ id, es: value.es, en: value.en });
        }
      }
    }
  };

  collect('hero.kicker', content.hero.kicker);
  collect('hero.heading', content.hero.heading);
  collect('hero.lead', content.hero.lead);
  collect('hero.category', content.hero.category);
  collect('hero.notice', content.hero.mandatoryNotice.text);
  content.hero.highlights.forEach((entry, index) => collect(`hero.highlight.${index}`, entry.text));
  for (const [sectionId, section] of Object.entries(content.sections)) {
    collect(`sections.${sectionId}.kicker`, section.kicker);
    collect(`sections.${sectionId}.heading`, section.heading);
    collect(`sections.${sectionId}.lead`, section.lead);
  }
  content.overviewNotes.forEach((entry, index) => collect(`overview.${index}`, entry.text));
  for (const capability of content.capabilities) {
    collect(`${capability.contentId}.label`, capability.label);
    collect(`${capability.contentId}.description`, capability.description);
  }
  for (const group of content.composition) {
    collect(`${group.groupId}.label`, group.label);
    collect(`${group.groupId}.heading`, group.heading);
    for (const item of group.items) collect(`${item.contentId}.text`, item.text);
  }
  for (const row of content.interfaces) {
    collect(`${row.contentId}.direction`, row.direction);
    collect(`${row.contentId}.transport`, row.transport);
    collect(`${row.contentId}.status`, row.status);
    if (row.note) collect(`${row.contentId}.note`, row.note);
  }
  for (const edition of content.editions) {
    collect(`${edition.editionId}.name`, edition.name);
    collect(`${edition.editionId}.summary`, edition.summary);
    if (edition.note) collect(`${edition.editionId}.note`, edition.note);
    for (const feature of edition.featureLabels) {
      collect(`${edition.editionId}.${feature.featureKey}`, feature.label);
    }
  }
  collect('editionNote', content.editionNote);
  for (const limitation of content.limitations) {
    collect(`${limitation.contentId}.label`, limitation.label);
    collect(`${limitation.contentId}.description`, limitation.description);
  }
  for (const bundle of content.bundleNotes) collect(`${bundle.bundleId}.note`, bundle.note);
  for (const document of content.documentation) {
    collect(`${document.documentId}.title`, document.title);
    if (document.limitation) collect(`${document.documentId}.limitation`, document.limitation);
  }
  collect('closing.heading', content.closing.heading);
  collect('closing.body', content.closing.body);
  content.closing.governance.forEach((entry, index) => collect(`closing.gov.${index}`, entry.text));
  collect('closing.next', content.closing.nextMilestone.text);

  for (const field of ['kicker', 'heading', 'lead', 'category']) {
    const value = content.hero?.[field];
    if (
      !value ||
      typeof value !== 'object' ||
      typeof value.es !== 'string' ||
      typeof value.en !== 'string'
    ) {
      problems.push(`hero.${field}: missing localized field`);
    }
  }

  for (const pair of pairs) {
    if (!pair.es.trim() || !pair.en.trim()) problems.push(`${pair.id}: empty locale`);
    if (pair.es.trim() === pair.en.trim() && !LOCALE_INVARIANT.test(pair.es.trim())) {
      problems.push(`${pair.id}: identical ES/EN text`);
    }
  }
  for (const limitation of content.limitations) {
    const es = `${limitation.label.es} ${limitation.description.es}`;
    const en = `${limitation.label.en} ${limitation.description.en}`;
    if (!NEGATION_ES.test(es))
      problems.push(`${limitation.contentId}: ES limitation lacks a negation`);
    if (!NEGATION_EN.test(en))
      problems.push(`${limitation.contentId}: EN limitation lacks a negation`);
  }
  return problems;
}

export function normaliseRoutePath(path) {
  return String(path).replace(/^\/+/, '').replace(/\/+$/, '');
}

/** Sorted inventory of a family content contract, used for ES/EN parity checks. */
export function contentInventory(content) {
  return {
    sections: Object.keys(content.sections).sort(),
    capabilityIds: content.capabilities.map((entry) => entry.contentId).sort(),
    limitationIds: content.limitations.map((entry) => entry.contentId).sort(),
    compositionIds: content.composition
      .flatMap((group) => group.items.map((item) => item.contentId))
      .sort(),
    interfaceIds: content.interfaces.map((entry) => entry.contentId).sort(),
    editionIds: content.editions.map((entry) => entry.editionId).sort(),
    documentIds: content.documentation.map((entry) => entry.documentId).sort(),
    bundleIds: content.bundleNotes.map((entry) => entry.bundleId).sort(),
  };
}

export function inventoryParityProblems(es, en) {
  const problems = [];
  for (const key of Object.keys(es)) {
    if (JSON.stringify(es[key]) !== JSON.stringify(en[key])) {
      problems.push(`${key} inventory differs between locales`);
    }
  }
  return problems;
}

/** Collects every rendered string from a family content contract. */
export function contentStrings(content) {
  const strings = [];
  const push = (value) => {
    if (value && typeof value === 'object' && 'es' in value && 'en' in value) {
      strings.push(value.es, value.en);
    }
  };
  push(content.hero.kicker);
  push(content.hero.heading);
  push(content.hero.lead);
  push(content.hero.category);
  push(content.hero.mandatoryNotice.text);
  for (const highlight of content.hero.highlights) push(highlight.text);
  for (const section of Object.values(content.sections)) {
    push(section.kicker);
    push(section.heading);
    push(section.lead);
  }
  for (const note of content.overviewNotes) push(note.text);
  for (const capability of content.capabilities) {
    push(capability.label);
    push(capability.description);
  }
  for (const group of content.composition) {
    push(group.label);
    push(group.heading);
    for (const item of group.items) push(item.text);
  }
  for (const row of content.interfaces) {
    push(row.direction);
    push(row.transport);
    push(row.status);
    if (row.note) push(row.note);
  }
  for (const edition of content.editions) {
    push(edition.name);
    push(edition.summary);
    if (edition.note) push(edition.note);
    for (const feature of edition.featureLabels) push(feature.label);
  }
  push(content.editionNote);
  for (const limitation of content.limitations) {
    push(limitation.label);
    push(limitation.description);
  }
  for (const bundle of content.bundleNotes) push(bundle.note);
  for (const document of content.documentation) {
    push(document.title);
    if (document.limitation) push(document.limitation);
  }
  push(content.closing.heading);
  push(content.closing.body);
  for (const item of content.closing.governance) push(item.text);
  push(content.closing.nextMilestone.text);
  return strings;
}

/** Collects every rendered English string from a family content contract. */
export function contentEnglishStrings(content) {
  const strings = [];
  for (const [index, text] of contentStrings(content).entries()) {
    if (index % 2 === 1) strings.push(text);
  }
  return strings;
}

/**
 * Recursively collects every localized (es/en) string from a nested object or
 * array, used to scan shared copy (CATALOG_SHARED) that is not a family content
 * contract. Non-localized leaves (numbers, booleans, plain strings) are ignored.
 */
export function localizedStrings(value) {
  const out = [];
  const walk = (node) => {
    if (node && typeof node === 'object') {
      if (typeof node.es === 'string' && typeof node.en === 'string') {
        out.push(node.es, node.en);
        return;
      }
      if (Array.isArray(node)) {
        for (const item of node) walk(item);
      } else {
        for (const child of Object.values(node)) walk(child);
      }
    }
  };
  walk(value);
  return out;
}

/** All content blocks with the metadata the validator enforces. */
export function contentBlocks(content) {
  const blocks = [];
  const add = (block) => {
    blocks.push({
      contentId: block.contentId,
      evidenceClass: block.evidenceClass,
      sourceRefs: block.sourceRefs,
    });
  };
  add(content.hero.mandatoryNotice);
  for (const highlight of content.hero.highlights) add(highlight);
  for (const note of content.overviewNotes) add(note);
  for (const capability of content.capabilities) {
    blocks.push({
      contentId: capability.contentId,
      evidenceClass: capability.evidenceClass,
      sourceRefs: capability.sourceRefs,
    });
  }
  for (const group of content.composition) for (const item of group.items) add(item);
  for (const row of content.interfaces) {
    blocks.push({
      contentId: row.contentId,
      evidenceClass: row.evidenceClass,
      sourceRefs: row.sourceRefs,
    });
  }
  for (const limitation of content.limitations) add(limitation);
  for (const item of content.closing.governance) add(item);
  add(content.closing.nextMilestone);
  return blocks;
}

const IMPORT_PATTERN = /(?:from\s+|import\s*\()\s*['"](\.[^'"]+)['"]/g;

/**
 * Walks the production import graph from the public entry points and reports
 * every reachable module under a forbidden root. A reachable catalogue module
 * would mean the internal pages contaminate the public bundle.
 */
export function findForbiddenReach({ root, entryFiles, forbiddenRoots }) {
  const visited = new Set();
  const offenders = [];
  const stack = entryFiles.map((file) => resolve(root, file));
  while (stack.length > 0) {
    const current = stack.pop();
    if (visited.has(current)) continue;
    visited.add(current);
    let source;
    try {
      source = readFileSync(current, 'utf8');
    } catch {
      continue;
    }
    const relative = current.slice(root.length + 1).replaceAll('\\', '/');
    for (const forbidden of forbiddenRoots) {
      if (relative.startsWith(`${forbidden.replaceAll('\\', '/')}/`)) {
        offenders.push(relative);
        break;
      }
    }
    for (const match of source.matchAll(IMPORT_PATTERN)) {
      const specifier = match[1];
      const base = resolve(dirname(current), specifier);
      for (const suffix of ['', '.ts', '/index.ts']) {
        const candidate = `${base}${suffix}`;
        try {
          if (statSync(candidate).isFile()) {
            stack.push(candidate);
            break;
          }
        } catch {
          // not this suffix
        }
      }
    }
  }
  return { scanned: visited.size, offenders };
}

/** Recursively lists files under a directory, relative to `root`. */
export function walk(root, relativeDirectory) {
  const out = [];
  const walkDir = (relative) => {
    const absolute = resolve(root, relative);
    let entries;
    try {
      entries = readdirSync(absolute, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const child = `${relative}/${entry.name}`;
      if (entry.isDirectory()) walkDir(child);
      else out.push(child);
    }
  };
  walkDir(relativeDirectory);
  return out;
}

/**
 * Working-tree scope guard: every changed path must match an allowed prefix or
 * exact path. Renames are checked by their destination.
 */
export function scopeProblems(lines, allowedPrefixes, allowedExact) {
  const exact = new Set(allowedExact);
  return lines
    .map((line) => line.replace(/^\s*\S+\s+/, '').trim())
    .filter(Boolean)
    .map((path) => path.split(' -> ').pop())
    .filter(
      (path) => !exact.has(path) && !allowedPrefixes.some((prefix) => path.startsWith(prefix)),
    );
}
