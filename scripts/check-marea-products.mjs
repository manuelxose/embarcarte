#!/usr/bin/env node
import { existsSync, readFileSync, statSync } from 'node:fs';
import { dirname, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Deterministic product-governance validator for the MAREA MC-05 product batch.
 *
 * It validates the machine-readable product-definition contract
 * (`docs/marea/products/product-definitions.batch-01.json`) and scans ONLY the
 * MC-05 product deliverables listed below: the three dossiers, the edition
 * comparison, the compatibility document, the pricing document, the asset
 * requirements document, the six customer-facing copy drafts and the JSON
 * contract itself. It never scans src/, never docs/marea/brand/ (owned by
 * scripts/check-brand.mjs), never the whole repository, makes no network
 * request and adds no dependency. Plain node, offline, Windows/Linux.
 *
 * The governing conventions are docs/marea/products/README.md, the brand
 * contract docs/marea/brand/brand-identity.contract.json (canonical names,
 * forbidden family names) and the approved disclaimers in
 * docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md §9.
 *
 * Usage:
 *   node scripts/check-marea-products.mjs [--root <dir>] [--json]
 *
 * Exit code 0 = every check passed, 1 = at least one check failed.
 */

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, '..');

const PRODUCTS_DIR = 'docs/marea/products/';
const JSON_CONTRACT = `${PRODUCTS_DIR}product-definitions.batch-01.json`;
const EDITIONS_DOC = `${PRODUCTS_DIR}PRODUCT-EDITIONS-NAV-HUB-AIS.md`;
const COMPATIBILITY_DOC = `${PRODUCTS_DIR}PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md`;
const PRICING_DOC = `${PRODUCTS_DIR}PRODUCT-PRICING-AND-CHANNEL-MODEL.md`;
const ASSETS_DOC = `${PRODUCTS_DIR}PRODUCT-ASSET-REQUIREMENTS.md`;
const JOURNEYS_DOC = `${PRODUCTS_DIR}CUSTOMER-JOURNEYS-NAV-HUB-AIS.md`;

// The seven binding lifecycle states (docs/marea/COMMERCIAL-PORTFOLIO.md).
const LIFECYCLE_VOCABULARY = [
  'CONCEPT',
  'DEFINED',
  'ENGINEERING_VERIFIED',
  'REGULATORY_READY',
  'OPERATIONS_READY',
  'COMMERCIALLY_AVAILABLE',
  'RETIRED',
];

// The eight governance states proposed by the Master Prompt, mapped onto the
// binding vocabulary. The mapping is decision D-007.
const MASTER_PROMPT_STATES = [
  'CONCEPT',
  'DEFINED',
  'ENGINEERING',
  'VALIDATION',
  'COMPLIANCE_REVIEW',
  'SALES_APPROVED',
  'RELEASED',
  'RETIRED',
];

const READINESS_DIMENSIONS = {
  definition: ['COMPLETE_TARGET_SPECIFICATION'],
  engineering: ['NOT_VERIFIED', 'PARTIALLY_VERIFIED', 'ENGINEERING_VERIFIED'],
  licensing: ['NOT_CLEARED', 'CONDITIONAL', 'CLEARED'],
  hardware: [
    'NOT_SELECTED',
    'DESIGN_IN_PROGRESS',
    'PROTOTYPED',
    'CERTIFIED',
    'NOT_APPLICABLE_SOFTWARE_PRODUCT',
  ],
  dataRights: ['NOT_GRANTED', 'PARTIAL', 'GRANTED_PER_TERRITORY'],
  compliance: ['NOT_STARTED', 'ASSESSMENT_PENDING', 'CONFORMITY_EVIDENCE_ON_FILE'],
  pricing: ['HYPOTHESIS_UNAPPROVED', 'COSTED_UNAPPROVED', 'APPROVED'],
  brandPublication: ['NOT_GRANTED', 'INTERNAL_ONLY_APPROVED', 'PUBLICATION_APPROVED'],
  availability: ['NOT_FOR_SALE', 'PREORDER_NOT_AUTHORISED', 'FOR_SALE'],
};

// The honest values at MC-05, fixed by docs/marea/products/README.md §4 and the
// per-dimension readiness tables in each dossier (§1.2). A software-only product
// carries NOT_APPLICABLE_SOFTWARE_PRODUCT for hardware (MC-05 revision of §4).
const REQUIRED_READINESS_VALUES = {
  definition: 'COMPLETE_TARGET_SPECIFICATION',
  licensing: 'NOT_CLEARED',
  dataRights: 'NOT_GRANTED',
  pricing: 'HYPOTHESIS_UNAPPROVED',
  brandPublication: 'NOT_GRANTED',
  availability: 'NOT_FOR_SALE',
};

const PRODUCT_READINESS_VALUES = {
  NAV: {
    engineering: 'PARTIALLY_VERIFIED',
    hardware: 'NOT_APPLICABLE_SOFTWARE_PRODUCT',
    compliance: 'NOT_STARTED',
  },
  HUB: { engineering: 'PARTIALLY_VERIFIED', hardware: 'NOT_SELECTED', compliance: 'NOT_STARTED' },
  AIS: { engineering: 'NOT_VERIFIED', hardware: 'NOT_SELECTED', compliance: 'NOT_STARTED' },
};

const HARDWARE_SPECIFIC_DIMENSION_VALUES = [
  'NOT_SELECTED',
  'DESIGN_IN_PROGRESS',
  'PROTOTYPED',
  'CERTIFIED',
];

const EVIDENCE_CLASSES = [
  'VERIFIED_REPO',
  'VERIFIED_EXTERNAL',
  'ASSUMPTION',
  'HYPOTHESIS',
  'OPEN',
  'BLOCKED',
];

const GLOBAL_RESTRICTIONS = {
  trademarkLegalClearance: 'NOT_GRANTED',
  sourceIpClearance: 'NOT_CLEARED',
  commercialAvailability: 'NOT_FOR_SALE',
  aisTransmissionOffered: false,
  nmea2000Certified: false,
  ecdiscClaimed: false,
  chartRightsGranted: false,
  imageGeneration: 'BLOCKED',
};

// Canonical 24 fields, docs/marea/products/README.md §6.
const FIELD_KEYS = [
  'identity',
  'customerSegments',
  'customerProblems',
  'finalFunctionality',
  'differentiation',
  'editions',
  'includedItems',
  'optionalAccessories',
  'integration',
  'professionalInstallation',
  'onboarding',
  'licensingSubscriptions',
  'retailAndPartnerPricing',
  'directAndOngoingCosts',
  'channelEconomics',
  'competitorComparison',
  'salesArguments',
  'faq',
  'warrantyAndSupport',
  'bilingualProductPageCopy',
  'crossSells',
  'retentionStrategy',
  'successMetrics',
  'endToEndAcceptance',
];

const PRICE_HYPOTHESIS_RULES = {
  currency: 'EUR',
  status: 'HYPOTHESIS_UNAPPROVED',
};

// Binding MC-02 blocker ids per dossier (docs/marea/products/README.md §9).
const MC02_MINIMUM_BLOCKERS = {
  NAV: [
    'D-01',
    'D-02',
    'D-03',
    'D-04',
    'D-05',
    'D-06',
    'D-08',
    'D-10',
    'P-01',
    'P-10',
    'L-01',
    'L-02',
    'L-03',
    'X-01',
    'X-05',
  ],
  HUB: ['H-02', 'H-04', 'H-05', 'H-06', 'H-07', 'H-13', 'P-02', 'P-10', 'S-06', 'X-01', 'X-05'],
  AIS: ['D-09', 'H-05', 'H-06', 'H-08', 'P-03', 'P-10', 'S-01', 'X-01', 'X-05'],
};

// Canonical products and editions, docs/marea/products/README.md §2 and §8.
const PRODUCTS = [
  {
    id: 'NAV',
    displayName: 'MAREA NAV',
    type: 'SOFTWARE',
    dossier: `${PRODUCTS_DIR}MAREA-NAV-COMMERCIAL-SPEC.md`,
    copy: { es: `${PRODUCTS_DIR}copy/nav.es.md`, en: `${PRODUCTS_DIR}copy/nav.en.md` },
    editions: [
      { id: 'NAV-ESSENTIAL', displayName: 'MAREA NAV Essential', amount: 99, period: 'YEAR' },
      { id: 'NAV-PRO', displayName: 'MAREA NAV Pro', amount: 149, period: 'YEAR' },
    ],
  },
  {
    id: 'HUB',
    displayName: 'MAREA HUB',
    type: 'HARDWARE',
    dossier: `${PRODUCTS_DIR}MAREA-HUB-COMMERCIAL-SPEC.md`,
    copy: { es: `${PRODUCTS_DIR}copy/hub.es.md`, en: `${PRODUCTS_DIR}copy/hub.en.md` },
    editions: [
      { id: 'HUB-STANDARD', displayName: 'MAREA HUB Standard', amount: 349, period: 'ONE_OFF' },
      { id: 'HUB-PRO', displayName: 'MAREA HUB Pro', amount: 499, period: 'ONE_OFF' },
    ],
  },
  {
    id: 'AIS',
    displayName: 'MAREA AIS',
    type: 'HARDWARE',
    dossier: `${PRODUCTS_DIR}MAREA-AIS-COMMERCIAL-SPEC.md`,
    copy: { es: `${PRODUCTS_DIR}copy/ais.es.md`, en: `${PRODUCTS_DIR}copy/ais.en.md` },
    editions: [
      { id: 'AIS-RECEIVER', displayName: 'MAREA AIS Receiver', amount: 249, period: 'ONE_OFF' },
      { id: 'AIS-CONNECTED', displayName: 'MAREA AIS Connected', amount: 399, period: 'ONE_OFF' },
    ],
  },
];

// Brand-contract forbidden family names (docs/marea/brand/brand-identity.contract.json
// namingRules.forbiddenFamilyNames); copied here so the validator stays
// self-contained and never scans docs/marea/brand/, which check-brand.mjs owns.
const FORBIDDEN_FAMILY_NAMES = ['MAREA ONE', 'MAREA CORE', 'MAREA LINK'];

// Approved disclaimer wording, COMMERCIAL-BRAND-CLAIMS-POLICY.md §9, compared
// after normalisation (markdown emphasis, quotes and whitespace removed).
const APPROVED_DISCLAIMERS = {
  navigation: {
    en: "This product is a navigational aid. It does not replace official nautical charts, the vessel's required equipment, continuous watchkeeping or good seamanship. Responsibility for navigation always rests with the skipper.",
    es: 'Este producto es una ayuda a la navegación y no sustituye a la carta náutica oficial, al equipo reglamentario de la embarcación, a la vigilancia continuada ni al buen hacer marinero. La responsabilidad de la navegación corresponde siempre al patrón.',
  },
  aisReceiveOnly: {
    en: 'AIS reception is receive-only: not every vessel transmits AIS. It is not a collision-avoidance system and not a transponder.',
    es: 'La recepción AIS es únicamente de escucha: no todos los buques emiten AIS. No constituye un sistema de evitación de colisiones ni un transpondedor.',
  },
};

const REQUIRED_DISCLAIMERS = [
  { file: PRODUCTS[0].dossier, kind: 'navigation', language: 'en' },
  { file: PRODUCTS[0].copy.es, kind: 'navigation', language: 'es' },
  { file: PRODUCTS[0].copy.en, kind: 'navigation', language: 'en' },
  { file: PRODUCTS[1].dossier, kind: 'navigation', language: 'en' },
  { file: PRODUCTS[1].copy.es, kind: 'navigation', language: 'es' },
  { file: PRODUCTS[1].copy.en, kind: 'navigation', language: 'en' },
  { file: PRODUCTS[2].dossier, kind: 'aisReceiveOnly', language: 'en' },
  { file: PRODUCTS[2].copy.es, kind: 'aisReceiveOnly', language: 'es' },
  { file: PRODUCTS[2].copy.en, kind: 'aisReceiveOnly', language: 'en' },
];

// A line is negative context (a policy statement or a forbidden example) when it
// carries one of these markers. This is what lets the internal documents quote
// the very strings they prohibit without a false positive. The customer-facing
// copy drafts get no tolerance for purchase, price or naming violations.
const EXEMPT_CONTEXT =
  /\b(?:not|never|nunca|no|sin|without|avoid|evitar|pending|unregistered|proposed|proposal|draft|forbidden\w*|prohibited\w*|prohibid[oa]s?|incorrect[oa]?s?|invalid|wrong|reject(?:ed|s)?|refus(?:e|es|ed|ing)|exclud(?:e|es|ed|ing)|must\s+not|cannot|can't|don't|do\s+not|shall\s+not|not\s+allowed|third[- ]part(?:y|ies)|existing|earlier|ajena|otra\s+marca|competitor|competidor|none|ninguna?|ningún)\b|NOT_(?:GRANTED|CLEARED|FOR_SALE|STARTED)|HYPOTHESIS_UNAPPROVED/i;
const BAD_MARKERS = /[❌✗🚫]|\b(?:BAD|WRONG|INCORRECT|FORBIDDEN|PROHIBITED|INVALID)\b/;
const TABLE_OR_SECTION_MARKER =
  /\b(?:forbidden|prohibited|incorrect|wrong|invalid|avoid|do\s+not|don't|must\s+not|not\s+allowed|reject(?:ed)?|anti-?pattern|prohibid[oa]s?|incorrect[oa]s?|evitar|nunca|limitations?|out\s+of\s+scope|never)\b/i;

// --- Text rules -------------------------------------------------------------
// Each rule is [pattern, message]. Patterns are not global (no /g) so they are
// safe to reuse.

const PURCHASE_RULES = [
  [/\bFOR_SALE\b/, 'purchase status FOR_SALE is prohibited; every product is NOT_FOR_SALE'],
  [/\bPURCHASABLE\b/, 'purchase status PURCHASABLE is prohibited; no SKU is orderable'],
  [/\bavailable\s+now\b/i, 'availability claim "available now" is prohibited'],
  [/\bbuy\s+now\b/i, 'sale-enabling CTA "buy now" is prohibited'],
  [/\badd\s+to\s+(?:cart|basket)\b/i, 'sale-enabling CTA "add to cart" is prohibited'],
  [/\bin\s+stock\b/i, 'stock claim "in stock" is prohibited'],
  [/\bpre-?\s?order\b/i, 'pre-order language is prohibited while availability is NOT_FOR_SALE'],
  [/\bcomprar\s+ahora\b/i, 'CTA "comprar ahora" está prohibida'],
  [/\bañadir\s+al\s+(?:carrito|cesta)\b/i, 'CTA "añadir al carrito" está prohibida'],
  [/\bdisponible\s+ahora\b/i, 'claim "disponible ahora" está prohibido'],
  [
    /\b(?:buy|purchase|order)\s+(?:it|this|the\s+product|now|today|here)\b/i,
    'sale-enabling call to action is prohibited',
  ],
  [
    /\b(?:comprar|pedir|reservar)\s+(?:ya|ahora|este\s+producto)\b/i,
    'llamada a la acción de compra prohibida',
  ],
];

const PRICE_RULES = [
  [
    /\b(?:PVP|precio)\s+confirmad[oa]\b/i,
    'a confirmed retail price is prohibited; price hypotheses are HYPOTHESIS_UNAPPROVED',
  ],
  [
    /\bprice\s+is\s+final\b/i,
    'a final price is prohibited; price hypotheses are HYPOTHESIS_UNAPPROVED',
  ],
  [/\bfinal\s+price\b/i, 'a final price is prohibited; price hypotheses are HYPOTHESIS_UNAPPROVED'],
  [/\bfrom\s+(?:EUR|€)\s*\d/i, 'a "from EUR" price is prohibited while no price is approved'],
  [
    /\bdesde\s+(?:EUR|€)?\s*\d/i,
    'un precio "desde" está prohibido mientras no haya precio aprobado',
  ],
  [/\bAPPROVED\b/, 'a price must not be represented as APPROVED; it is HYPOTHESIS_UNAPPROVED'],
];

// JSON statuses are checked structurally (priceHypothesis.status must be
// HYPOTHESIS_UNAPPROVED), so the allowed-value vocabulary may contain the token
// APPROVED without being a price approval. Only the phrasing rules apply to the
// contract's prose.
const PRICE_TEXT_RULES = PRICE_RULES.slice(0, 5);

// In customer-facing copy the approved status is not a forbidden token by
// itself: a truthful "prices are hypotheses, not approved" statement must be
// allowed. Only an affirmative approval claim fails.
const PRICE_APPROVAL_CLAIM_RULES = [
  [
    /\bapproved\s+(?:price|pricing|retail\s+price)s?\b/i,
    'a price is presented as approved; prices are HYPOTHESIS_UNAPPROVED',
  ],
  [
    /\bprice\s+(?:is|has\s+been|was)\s+approved\b/i,
    'a price is presented as approved; prices are HYPOTHESIS_UNAPPROVED',
  ],
  [/\bPVP\s+aprobado\b/i, 'un PVP aprobado está prohibido; los precios son HYPOTHESIS_UNAPPROVED'],
  [
    /\bprecios?\s+aprobad[oa]s?\b/i,
    'un precio aprobado está prohibido; los precios son HYPOTHESIS_UNAPPROVED',
  ],
];
const PRICE_COPY_RULES = [...PRICE_TEXT_RULES, ...PRICE_APPROVAL_CLAIM_RULES];

const CLEARANCE_RULES = [
  [
    /\bMAREA\s+(?:is|es)\s+(?:a\s+|the\s+|una\s+)?(?:registered|registrad[ao]|legally\s+cleared)\b/i,
    'MAREA is presented as registered or legally cleared while trademarkLegalClearance is NOT_GRANTED',
  ],
  [
    /\bMAREA\b[^.\n]{0,40}\b(?:registered\s+trademark|marca\s+registrada)\b/i,
    'MAREA is presented as a registered trademark while clearance is NOT_GRANTED',
  ],
  [
    /\bMAREA\b[^.\n]{0,40}\btrademark\b[^.\n]{0,30}\b(?:has\s+been\s+|is\s+|was\s+)?(?:granted|registered|approved|cleared)\b/i,
    'the MAREA trademark is presented as granted, registered, approved or cleared while clearance is NOT_GRANTED',
  ],
  [
    /\bMAREA(?:\s+(?:NAV|HUB|AIS))?\s*[®™]/,
    'a trademark symbol is attached to MAREA while clearance is NOT_GRANTED',
  ],
];

const AIS_RULES = [
  [
    /\btransmits?\s+(?:your|its|the\s+vessel'?s?)\s+(?:position|location)/i,
    'an AIS transmission claim is prohibited: MAREA AIS is receive-only',
  ],
  [
    /\btransmit\w*\s+(?:tu|su|la)\s+(?:posición|posición)/i,
    'an AIS transmission claim is prohibited: MAREA AIS is receive-only',
  ],
  [
    /\b(?:is|es)\s+(?:an?\s+)?(?:AIS\s+)?transpondedor?\b/i,
    'a transponder claim is prohibited: MAREA AIS is receive-only and is not a transponder',
  ],
  [/\bDSC\b/, 'a DSC capability claim is prohibited: MAREA AIS is receive-only'],
  [
    /\bguaranteed\s+detection\b/i,
    'a guaranteed-detection claim is prohibited: AIS reception is incomplete by nature',
  ],
  [
    /\bdetección\s+garantizada\b/i,
    'a guaranteed-detection claim is prohibited: AIS reception is incomplete by nature',
  ],
  [/\bguaranteed\s+(?:reception|range)\b/i, 'a guaranteed reception/range claim is prohibited'],
];

const NMEA_RULES = [
  [
    /\bNMEA\s*2000\s+certified\b/i,
    'an unapproved NMEA 2000 certification claim is prohibited (H-04)',
  ],
  [
    /\bcertificad[oa]\s+NMEA\s*2000\b/i,
    'an unapproved NMEA 2000 certification claim is prohibited (H-04)',
  ],
  [
    /\bNMEA\s*2000\s+(?:certification|licen[cs]e)\s+(?:granted|approved|obtained)\b/i,
    'an unapproved NMEA 2000 certification/licence claim is prohibited (H-04)',
  ],
  [
    /\bcompatible\s+(?:con\s+todos|with\s+all|with\s+any|with\s+every)\b/i,
    'blanket NMEA 2000 compatibility claim is prohibited (H-04)',
  ],
  [
    /\bcompatible\s+con\s+(?:cualquier|cualesquiera)\b/i,
    'blanket compatibility claim is prohibited (H-04)',
  ],
  [/\buniversal(?:ly)?\s+compatible\b/i, 'blanket compatibility claim is prohibited (H-04)'],
  [/\bplug\s*(?:and|-|\s)\s*play\b/i, 'a plug-and-play compatibility claim is prohibited (H-04)'],
];

const CHARTS_RULES = [
  [
    /\bofficial\s+(?:nautical\s+)?charts?\s+(?:are\s+)?included\b/i,
    'official charts presented as included is prohibited (D-01)',
  ],
  [
    /\bcartas\s+oficiales\s+incluidas\b/i,
    'cartas oficiales presentadas como incluidas: prohibido (D-01)',
  ],
  [
    /\b(?:is|are)\s+(?:an?\s+)?(?:certified\s+)?ECDIS\b/i,
    'an ECDIS claim is prohibited: NAV is a navigational aid (D-01)',
  ],
  [
    /\bECDIS[-\s](?:certified|compliant|approved|class|equivalent)\b/i,
    'an ECDIS-class/compliant claim is prohibited (D-01)',
  ],
  [/\b(?:includes?|provides?)\s+(?:the\s+)?ECDIS\b/i, 'an ECDIS claim is prohibited (D-01)'],
  [
    /\bofficial\s+ENC\s+(?:charts?\s+)?(?:are\s+)?included\b/i,
    'official ENC presented as included is prohibited (D-01)',
  ],
  [
    /\bglobal\s+chart\s+coverage\b/i,
    'global chart coverage is prohibited; every chart area is a licensed entitlement (D-01)',
  ],
  [
    /\bunlimited\s+(?:official\s+)?charts?\b/i,
    'unlimited charts are prohibited; chart coverage is licensed per territory (D-01)',
  ],
  [
    /\bcobertura\s+global\b/i,
    'cobertura global de cartas prohibida; es una licencia por territorio (D-01)',
  ],
  [
    /\bcartas\s+ilimitadas\b/i,
    'cartas ilimitadas prohibidas; la cobertura es una licencia por territorio (D-01)',
  ],
];

const COMPATIBILITY_RULES = [
  [
    /\bworks?\s+with\s+any\s+boat\b/i,
    'blanket compatibility claim is prohibited; compatibility is per device, firmware and direction',
  ],
  [
    /\bcompatible\s+with\s+any\s+(?:boat|vessel|equipment)\b/i,
    'blanket compatibility claim is prohibited',
  ],
  [
    /\bcompatible\s+con\s+cualquier\s+(?:barco|embarcación|equipo)\b/i,
    'blanket compatibility claim is prohibited',
  ],
  [/\buniversal\s+compatibility\b/i, 'blanket compatibility claim is prohibited'],
  [
    /\bfully\s+compatible\b/i,
    'blanket compatibility claim is prohibited; compatibility is evidence per device and firmware',
  ],
  [/\b100%\s+compatible\b/i, 'a 100% compatibility claim is prohibited'],
];

const NAMING_RULES = [
  [
    /\bMAREA-(?:NAV|HUB|AIS)\b/,
    'hyphenated family name is prohibited; the canonical form is "MAREA <FAMILY>"',
  ],
  [
    /\bMarea\s+(?:Nav|Hub|Ais)\b/,
    'title-case family name is prohibited; the canonical form is "MAREA <FAMILY>"',
  ],
  [
    /\bMAREA(?:NAV|HUB|AIS)\b/,
    'concatenated family name is prohibited; the canonical form is "MAREA <FAMILY>"',
  ],
  ...FORBIDDEN_FAMILY_NAMES.map((familyName) => [
    new RegExp(`\\b${familyName.replace(/\s+/g, '\\s+')}\\b`),
    `invented family name ${JSON.stringify(familyName)} is prohibited by the brand contract`,
  ]),
];

const isFilled = (value) => typeof value === 'string' && value.trim().length > 0;
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// A token must not be matched inside a longer identifier (e.g. NAV-ESSENTIALX
// or "MAREA AIS ConnectedX" must not satisfy the NAV-ESSENTIAL / Connected checks).
const containsToken = (text, token) =>
  new RegExp(`(^|[^\\w-])${escapeRegExp(token)}($|[^\\w-])`, 'i').test(text);
const displayPath = (absolute) => {
  const relativePath = relative(process.cwd(), absolute);
  return relativePath && !relativePath.startsWith('..')
    ? relativePath.replace(/\\/g, '/')
    : absolute;
};
const isRecord = (value) => Boolean(value) && typeof value === 'object' && !Array.isArray(value);

function argument(name) {
  const index = process.argv.indexOf(name);
  return index === -1 ? null : (process.argv[index + 1] ?? null);
}

const root = resolve(process.cwd(), argument('--root') ?? REPO_ROOT);
const jsonMode = process.argv.includes('--json');

const SCOPED_DOC_FILES = [
  PRODUCTS[0].dossier,
  PRODUCTS[1].dossier,
  PRODUCTS[2].dossier,
  EDITIONS_DOC,
  COMPATIBILITY_DOC,
  PRICING_DOC,
  ASSETS_DOC,
  JOURNEYS_DOC,
];
const SCOPED_COPY_FILES = PRODUCTS.flatMap((product) => [product.copy.es, product.copy.en]);
const SCOPED_FILES = [...SCOPED_DOC_FILES, ...SCOPED_COPY_FILES, JSON_CONTRACT];

// --- Load the scoped files --------------------------------------------------

const texts = new Map();
const unreadable = [];

for (const relativePath of SCOPED_FILES) {
  try {
    texts.set(relativePath, readFileSync(resolve(root, relativePath), 'utf8'));
  } catch (error) {
    if (error.code !== 'ENOENT')
      unreadable.push(`${relativePath}: cannot be read (${error.message})`);
  }
}

const textOf = (relativePath) => texts.get(relativePath) ?? null;

let contract = null;
let contractError = null;
const contractText = textOf(JSON_CONTRACT);
if (contractText !== null) {
  try {
    contract = JSON.parse(contractText);
  } catch (error) {
    contractError = `cannot be parsed as JSON (${error.message})`;
  }
  if (contract !== null && !isRecord(contract)) {
    contract = null;
    contractError = 'is not a JSON object';
  }
}

// --- Check framework --------------------------------------------------------

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

function requireContract(record) {
  if (contractError) {
    record.failures.push(`${JSON_CONTRACT} ${contractError}`);
    return null;
  }
  if (!contract) {
    record.failures.push(
      `${JSON_CONTRACT} is missing; the product-definition contract is required`,
    );
    return null;
  }
  return contract;
}

// --- Negative-context tolerance (internal documents only) -------------------

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

function listItemIsNegative(lines, index) {
  if (!/^\s*(?:[-*+]|\d+\.)\s+/.test(lines[index])) return false;
  for (let above = index - 1; above >= 0 && index - above <= 15; above--) {
    const line = lines[above];
    if (!line.trim()) continue;
    if (/^\s*(?:[-*+]|\d+\.)\s+/.test(line)) continue;
    // The lead-in of a bullet list ("It does not include:", "No incluye:")
    // governs every following item until the next non-bullet line.
    return (
      /:\s*$/.test(line) &&
      (EXEMPT_CONTEXT.test(line) || BAD_MARKERS.test(line) || TABLE_OR_SECTION_MARKER.test(line))
    );
  }
  return false;
}

function sentenceWindow(lines, index) {
  let start = index;
  for (let above = index - 1; above >= 0 && index - above <= 6; above--) {
    const previous = lines[above];
    if (!previous.trim()) break;
    if (/[.!?]\s*$/.test(previous)) break;
    start = above;
    if (/[:;]\s*$/.test(previous)) break;
  }
  return lines.slice(start, index + 1).join(' ');
}

function isNegativeContext(lines, index, { wideContext = false } = {}) {
  const line = lines[index];
  if (EXEMPT_CONTEXT.test(line) || BAD_MARKERS.test(line)) return true;
  if (/^\s*\|/.test(line) && tableHeaderIsNegative(lines, index)) return true;
  if (listItemIsNegative(lines, index)) return true;
  if (wideContext) {
    // Wrapped prose keeps the negation of the sentence it belongs to; a
    // limitations clause such as "the assessment refuses ... AIS transmission
    // or DSC" spans several physical lines.
    const window = sentenceWindow(lines, index);
    if (EXEMPT_CONTEXT.test(window) || BAD_MARKERS.test(window)) return true;
  }
  return sectionIsNegative(lines, index);
}

function isQuestionLine(line) {
  return /[?¿]\*{0,2}\s*$/.test(line.trim());
}

function stripInlineCode(line) {
  return line.replace(/`[^`\n]*`/g, ' ');
}

function detectLineViolations(line, rules) {
  const violations = [];
  const prose = stripInlineCode(line);
  for (const [pattern, message] of rules) if (pattern.test(prose)) violations.push(message);
  return violations;
}

function collectFileViolations(
  record,
  relativePath,
  text,
  rules,
  { tolerant, wideContext = false, skipQuestions = false },
) {
  const lines = text.split(/\r?\n/);
  let inFence = false;
  lines.forEach((line, index) => {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      return;
    }
    if (inFence || !line.trim()) return;
    // A FAQ question is not a claim; the answer under it is judged normally.
    if (skipQuestions && isQuestionLine(line)) return;
    if (tolerant && isNegativeContext(lines, index, { wideContext })) return;
    for (const violation of detectLineViolations(line, rules)) {
      record.failures.push(`${relativePath}:${index + 1}: ${violation}`);
    }
  });
}

function collectJsonTextViolations(record, rules) {
  const seen = new Set();
  walkJsonEntries(contract, (_key, value, path) => {
    if (typeof value !== 'string' || !value.trim()) return;
    if (seen.has(path)) return;
    seen.add(path);
    for (const [pattern, message] of rules) {
      if (!pattern.test(value)) continue;
      // JSON prose is internal; a negated statement ("NMEA 2000 is not
      // implemented") is a legitimate limitation, not a claim.
      if (EXEMPT_CONTEXT.test(value)) continue;
      record.failures.push(`${JSON_CONTRACT}: ${path}: ${message}`);
    }
  });
}

function walkJsonEntries(value, visitor, path = '$') {
  if (Array.isArray(value)) {
    value.forEach((item, index) => walkJsonEntries(item, visitor, `${path}[${index}]`));
    return;
  }
  if (isRecord(value)) {
    for (const [key, child] of Object.entries(value)) {
      const childPath = `${path}.${key}`;
      visitor(key, child, childPath);
      walkJsonEntries(child, visitor, childPath);
    }
  }
}

function evidenceRefExists(reference) {
  if (typeof reference !== 'string' || !reference.trim()) return false;
  const trimmed = reference.trim();
  if (/^MC-02:[A-Z]-\d{2}$/.test(trimmed)) return true;
  if (/^MC-02-BLOCKERS-AND-DECISIONS\.md#[A-Z]-\d{2}$/.test(trimmed)) return true;
  const [filePart, anchor] = trimmed.split('#');
  if (!filePart) return false;
  const absolute = filePart.startsWith('docs/')
    ? resolve(root, filePart)
    : resolve(root, PRODUCTS_DIR, filePart);
  if (absolute !== root && !absolute.startsWith(root + sep)) return false;
  if (!existsSync(absolute)) return false;
  try {
    if (!statSync(absolute).isFile()) return false;
  } catch {
    return false;
  }
  if (anchor) {
    const text = readFileSync(absolute, 'utf8');
    if (!text.toLowerCase().includes(anchor.toLowerCase())) return false;
  }
  return true;
}

function collectScopedViolations(record, rules, { docTolerant = true, copyTolerant = true } = {}) {
  for (const file of SCOPED_DOC_FILES) {
    const text = textOf(file);
    if (text !== null) {
      collectFileViolations(record, file, text, rules, {
        tolerant: docTolerant,
        wideContext: true,
        skipQuestions: true,
      });
    }
  }
  for (const file of SCOPED_COPY_FILES) {
    const text = textOf(file);
    if (text !== null) {
      collectFileViolations(record, file, text, rules, {
        tolerant: copyTolerant,
        wideContext: false,
        skipQuestions: true,
      });
    }
  }
}

function normalizeForCheck(value) {
  return value.toLowerCase().replace(/_/g, ' ').replace(/\s+/g, ' ');
}

function normalizeDisclaimer(value) {
  return value
    .toLowerCase()
    .replace(/[*_`>#]/g, ' ')
    .replace(/[«»“”"]/g, ' ')
    .replace(/’/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

// --- 1. Scoped files exist (missing product / dossier / edition / copy) -----

check('files.required', (record) => {
  const missing = SCOPED_FILES.filter((relativePath) => !texts.has(relativePath));
  for (const relativePath of missing) record.failures.push(`${relativePath} is missing`);
  for (const relativePath of unreadable) record.failures.push(relativePath);
  record.detail = `${SCOPED_FILES.length - missing.length} of ${SCOPED_FILES.length} scoped files present`;
});

check('files.scope', (record) => {
  for (const relativePath of SCOPED_FILES) {
    if (!relativePath.startsWith(PRODUCTS_DIR)) {
      record.failures.push(
        `${relativePath} is outside ${PRODUCTS_DIR}; the validator must not scan the rest of the repository`,
      );
    }
  }
});

// --- 2. Machine-readable contract ------------------------------------------

check('json.contract', (record) => {
  if (!requireContract(record)) return;
  for (const key of ['contractId', 'contractVersion', 'status', 'milestone', 'date', 'owner']) {
    if (!isFilled(contract[key])) record.failures.push(`contract.${key} is missing or empty`);
  }
  if (contract.status !== 'INTERNAL_PRODUCT_DEFINITION_CONTRACT') {
    record.failures.push(
      `status must be "INTERNAL_PRODUCT_DEFINITION_CONTRACT", found ${JSON.stringify(contract.status)}`,
    );
  }
  if (contract.milestone !== 'MC-05') {
    record.failures.push(`milestone must be "MC-05", found ${JSON.stringify(contract.milestone)}`);
  }
  if (contract.notACommerceCatalog !== true)
    record.failures.push('notACommerceCatalog must be true: this contract is not a shop catalogue');
  if (contract.notTheFutureCommerceDataModel !== true)
    record.failures.push(
      'notTheFutureCommerceDataModel must be true: the MC-16 commerce data model is out of scope',
    );
  if (contract.publicationState !== 'INTERNAL_ONLY')
    record.failures.push(
      `publicationState must be "INTERNAL_ONLY", found ${JSON.stringify(contract.publicationState)}`,
    );
  if (contract.lifecycleDecision !== 'D-007') {
    record.failures.push(
      `lifecycleDecision must be "D-007" (the lifecycle reconciliation decision in docs/marea/execution/DECISION-LOG.md), found ${JSON.stringify(contract.lifecycleDecision)}`,
    );
  }

  const vocabulary = contract.lifecycleVocabulary;
  if (
    !Array.isArray(vocabulary) ||
    vocabulary.length !== LIFECYCLE_VOCABULARY.length ||
    !LIFECYCLE_VOCABULARY.every((state) => vocabulary.includes(state)) ||
    new Set(vocabulary).size !== vocabulary.length
  ) {
    record.failures.push(
      `lifecycleVocabulary must be exactly the seven binding states: ${LIFECYCLE_VOCABULARY.join(', ')}`,
    );
  }

  const mapping = contract.lifecycleMapping;
  if (!Array.isArray(mapping) || mapping.length === 0) {
    record.failures.push(
      'lifecycleMapping must be a non-empty array of {proposed, binding} entries',
    );
  } else {
    const covered = [];
    for (const entry of mapping) {
      if (!isRecord(entry) || !isFilled(entry.proposed) || !isFilled(entry.binding)) {
        record.failures.push('lifecycleMapping contains an entry without proposed/binding strings');
        continue;
      }
      covered.push(entry.proposed);
      if (!LIFECYCLE_VOCABULARY.includes(entry.binding)) {
        record.failures.push(
          `lifecycleMapping maps ${entry.proposed} to ${entry.binding}, which is not in the binding vocabulary`,
        );
      }
    }
    for (const state of MASTER_PROMPT_STATES) {
      if (!covered.includes(state))
        record.failures.push(`lifecycleMapping does not cover the Master-Prompt state ${state}`);
    }
  }

  if (!isRecord(contract.readinessDimensions)) {
    record.failures.push(
      'readinessDimensions must be an object mapping each dimension to its allowed values',
    );
  } else {
    const actualKeys = Object.keys(contract.readinessDimensions).sort();
    const expectedKeys = Object.keys(READINESS_DIMENSIONS).sort();
    if (actualKeys.join('|') !== expectedKeys.join('|')) {
      record.failures.push(`readinessDimensions must declare exactly: ${expectedKeys.join(', ')}`);
    }
    for (const [dimension, allowed] of Object.entries(READINESS_DIMENSIONS)) {
      const declared = contract.readinessDimensions[dimension];
      if (!Array.isArray(declared) || declared.join('|') !== allowed.join('|')) {
        record.failures.push(`readinessDimensions.${dimension} must be [${allowed.join(', ')}]`);
      }
    }
  }

  const classes = contract.evidenceClasses;
  if (!Array.isArray(classes) || classes.join('|') !== EVIDENCE_CLASSES.join('|')) {
    record.failures.push(`evidenceClasses must be exactly [${EVIDENCE_CLASSES.join(', ')}]`);
  }

  if (!isRecord(contract.globalRestrictions)) {
    record.failures.push('globalRestrictions is missing');
  } else {
    for (const [key, expected] of Object.entries(GLOBAL_RESTRICTIONS)) {
      const actual = contract.globalRestrictions[key];
      if (actual !== expected) {
        record.failures.push(
          `globalRestrictions.${key} must be ${JSON.stringify(expected)}, found ${JSON.stringify(actual)}`,
        );
      }
    }
  }
  record.detail = `contract ${contract.contractVersion ?? '?'} (${contract.status ?? '?'})`;
});

// --- 3. Products, editions, readiness --------------------------------------

check('json.products', (record) => {
  if (!requireContract(record)) return;
  const products = contract.products;
  if (!Array.isArray(products)) return record.failures.push('products must be an array');
  if (products.length !== PRODUCTS.length) {
    record.failures.push(
      `products has ${products.length} entries; expected exactly ${PRODUCTS.length} (NAV, HUB, AIS)`,
    );
  }
  const ids = products.map((product) => product?.id);
  if (new Set(ids).size !== ids.length) record.failures.push('product ids are not unique');
  for (const expected of PRODUCTS) {
    const product = products.find((entry) => entry?.id === expected.id);
    if (!product) {
      record.failures.push(`product ${expected.id} is missing from the contract`);
      continue;
    }
    if (product.displayName !== expected.displayName) {
      record.failures.push(
        `product ${expected.id}: displayName must be exactly ${JSON.stringify(expected.displayName)}, found ${JSON.stringify(product.displayName)}`,
      );
    }
    if (product.type !== expected.type) {
      record.failures.push(
        `product ${expected.id}: type must be ${JSON.stringify(expected.type)}, found ${JSON.stringify(product.type)}`,
      );
    }
    if (product.lifecycleState !== 'DEFINED') {
      record.failures.push(
        `product ${expected.id}: lifecycleState must be "DEFINED" at MC-05, found ${JSON.stringify(product.lifecycleState)}`,
      );
    }
    if (!isRecord(product.readiness)) {
      record.failures.push(`product ${expected.id}: readiness is missing`);
    } else {
      for (const [dimension, allowed] of Object.entries(READINESS_DIMENSIONS)) {
        const value = product.readiness[dimension];
        if (!isFilled(value)) {
          record.failures.push(`product ${expected.id}: readiness.${dimension} is missing`);
        } else if (!allowed.includes(value)) {
          record.failures.push(
            `product ${expected.id}: readiness.${dimension} must be one of [${allowed.join(', ')}], found ${JSON.stringify(value)}`,
          );
        }
      }
      for (const [dimension, required] of Object.entries(REQUIRED_READINESS_VALUES)) {
        if (product.readiness[dimension] !== required) {
          record.failures.push(
            `product ${expected.id}: readiness.${dimension} must be ${required} at MC-05, found ${JSON.stringify(product.readiness[dimension])}`,
          );
        }
      }
      const productValues = PRODUCT_READINESS_VALUES[expected.id] ?? {};
      for (const [dimension, required] of Object.entries(productValues)) {
        if (product.readiness[dimension] !== required) {
          record.failures.push(
            `product ${expected.id}: readiness.${dimension} must be ${required} per the dossier readiness table, found ${JSON.stringify(product.readiness[dimension])}`,
          );
        }
      }
      if (
        expected.type === 'HARDWARE' &&
        !HARDWARE_SPECIFIC_DIMENSION_VALUES.includes(product.readiness.hardware)
      ) {
        record.failures.push(
          `product ${expected.id}: a hardware product must carry a hardware-specific readiness value, found ${JSON.stringify(product.readiness.hardware)}`,
        );
      }
    }
    if (
      !isRecord(product.copy) ||
      product.copy.es !== expected.copy.es ||
      product.copy.en !== expected.copy.en
    ) {
      record.failures.push(
        `product ${expected.id}: copy.es/copy.en must reference ${expected.copy.es} and ${expected.copy.en}`,
      );
    }
    if (!Array.isArray(product.mc02Blockers) || product.mc02Blockers.length === 0) {
      record.failures.push(`product ${expected.id}: mc02Blockers must be a non-empty array`);
    } else {
      const invalid = product.mc02Blockers.filter(
        (entry) => typeof entry !== 'string' || !/^[A-Z]-\d{2}$/.test(entry),
      );
      if (invalid.length)
        record.failures.push(
          `product ${expected.id}: mc02Blockers contains invalid ids: ${invalid.map((entry) => JSON.stringify(entry)).join(', ')}`,
        );
      for (const blocker of MC02_MINIMUM_BLOCKERS[expected.id] ?? []) {
        if (!product.mc02Blockers.includes(blocker)) {
          record.failures.push(
            `product ${expected.id}: mc02Blockers is missing the mandatory blocker ${blocker}`,
          );
        }
      }
    }
  }
  record.detail = `${Array.isArray(products) ? products.length : 0} products`;
});

check('json.editions', (record) => {
  if (!requireContract(record)) return;
  const products = Array.isArray(contract.products) ? contract.products : [];
  for (const expected of PRODUCTS) {
    const product = products.find((entry) => entry?.id === expected.id);
    if (!product) continue;
    const editions = product.editions;
    if (!Array.isArray(editions)) {
      record.failures.push(`product ${expected.id}: editions must be an array`);
      continue;
    }
    if (editions.length !== expected.editions.length) {
      record.failures.push(
        `product ${expected.id}: ${editions.length} editions declared; expected exactly ${expected.editions.length}`,
      );
    }
    const editionIds = editions.map((edition) => edition?.id);
    if (new Set(editionIds).size !== editionIds.length)
      record.failures.push(`product ${expected.id}: edition ids are not unique`);
    for (const wanted of expected.editions) {
      const edition = editions.find((entry) => entry?.id === wanted.id);
      if (!edition) {
        record.failures.push(`product ${expected.id}: edition ${wanted.id} is missing`);
        continue;
      }
      if (edition.displayName !== wanted.displayName) {
        record.failures.push(
          `product ${expected.id}: edition ${wanted.id} displayName must be exactly ${JSON.stringify(wanted.displayName)}, found ${JSON.stringify(edition.displayName)}`,
        );
      }
      const price = edition.priceHypothesis;
      if (!isRecord(price)) {
        record.failures.push(
          `product ${expected.id}: edition ${wanted.id} priceHypothesis is missing`,
        );
        continue;
      }
      if (price.status !== PRICE_HYPOTHESIS_RULES.status) {
        record.failures.push(
          `product ${expected.id}: edition ${wanted.id} priceHypothesis.status must be "${PRICE_HYPOTHESIS_RULES.status}", found ${JSON.stringify(price.status)}`,
        );
      }
      if (price.amount !== wanted.amount) {
        record.failures.push(
          `product ${expected.id}: edition ${wanted.id} price hypothesis must be ${wanted.amount} EUR, found ${JSON.stringify(price.amount)}`,
        );
      }
      if (price.currency !== PRICE_HYPOTHESIS_RULES.currency) {
        record.failures.push(
          `product ${expected.id}: edition ${wanted.id} priceHypothesis.currency must be "EUR", found ${JSON.stringify(price.currency)}`,
        );
      }
      if (price.period !== wanted.period) {
        record.failures.push(
          `product ${expected.id}: edition ${wanted.id} priceHypothesis.period must be "${wanted.period}", found ${JSON.stringify(price.period)}`,
        );
      }
      if (!isFilled(price.vatBasis))
        record.failures.push(
          `product ${expected.id}: edition ${wanted.id} priceHypothesis.vatBasis is missing`,
        );
      if (price.validationRequired !== true)
        record.failures.push(
          `product ${expected.id}: edition ${wanted.id} priceHypothesis.validationRequired must be true`,
        );
      if (!Array.isArray(price.blockers))
        record.failures.push(
          `product ${expected.id}: edition ${wanted.id} priceHypothesis.blockers must be an array`,
        );
      // An edition is never approved at MC-05. The AIS Connected verdict is
      // CONDITIONAL / NOT_YET_JUSTIFIED in the AIS dossier §3 and must not be
      // flattened into an approved edition in the machine-readable contract.
      const verdict = edition.editionVerdict;
      if (!isRecord(verdict)) {
        record.failures.push(
          `product ${expected.id}: edition ${wanted.id} editionVerdict is missing; no edition may be flattened to "approved"`,
        );
      } else {
        const allowedVerdictStatuses =
          wanted.id === 'AIS-CONNECTED' ? ['CONDITIONAL'] : ['DEFINED'];
        if (!allowedVerdictStatuses.includes(verdict.status)) {
          record.failures.push(
            `product ${expected.id}: edition ${wanted.id} editionVerdict.status must be ${allowedVerdictStatuses.map((value) => JSON.stringify(value)).join(' or ')} at MC-05, found ${JSON.stringify(verdict.status)}`,
          );
        }
        if (verdict.publicationConditional !== true) {
          record.failures.push(
            `product ${expected.id}: edition ${wanted.id} editionVerdict.publicationConditional must be true; no edition is publishable at MC-05`,
          );
        }
        if (['APPROVED', 'JUSTIFIED'].includes(verdict.verdict)) {
          record.failures.push(
            `product ${expected.id}: edition ${wanted.id} must not be presented as ${verdict.verdict}`,
          );
        }
        if (!isFilled(verdict.rationale)) {
          record.failures.push(
            `product ${expected.id}: edition ${wanted.id} editionVerdict.rationale is missing or empty`,
          );
        }
        if (!Array.isArray(verdict.evidenceRefs) || verdict.evidenceRefs.length === 0) {
          record.failures.push(
            `product ${expected.id}: edition ${wanted.id} editionVerdict.evidenceRefs must be a non-empty array`,
          );
        } else {
          for (const reference of verdict.evidenceRefs) {
            if (!evidenceRefExists(reference)) {
              record.failures.push(
                `product ${expected.id}: edition ${wanted.id} editionVerdict.evidenceRefs references ${JSON.stringify(reference)}, which does not resolve to a scoped document`,
              );
            }
          }
        }
      }
    }
  }
  const aisProduct = products.find((entry) => entry?.id === 'AIS');
  const aisConnected = Array.isArray(aisProduct?.editions)
    ? aisProduct.editions.find((edition) => edition?.id === 'AIS-CONNECTED')
    : null;
  const aisVerdict = aisConnected?.editionVerdict;
  if (
    !isRecord(aisVerdict) ||
    aisVerdict.status !== 'CONDITIONAL' ||
    aisVerdict.verdict !== 'NOT_YET_JUSTIFIED'
  ) {
    record.failures.push(
      `${JSON_CONTRACT}: AIS-CONNECTED editionVerdict must be CONDITIONAL / NOT_YET_JUSTIFIED, per MAREA-AIS-COMMERCIAL-SPEC.md §3`,
    );
  }
  const aisDossier = textOf(PRODUCTS[2].dossier);
  if (aisDossier !== null) {
    const normalized = normalizeForCheck(aisDossier);
    if (!normalized.includes('conditional') || !normalized.includes('not yet justified')) {
      record.failures.push(
        `${PRODUCTS[2].dossier}: no longer records the Connected edition verdict as CONDITIONAL / not yet justified`,
      );
    }
  }
});

// --- 4. The 24 required fields in the JSON contract -------------------------

function countSentences(value) {
  const masked = value.replace(/\b(?:e\.g|i\.e|cf|approx|vs|incl|excl)\./gi, 'X');
  return (masked.match(/[.!?](?:\s|$)/g) ?? []).length;
}

function checkFieldEntry(record, productId, key, entry) {
  const prefix = `product ${productId}: fields.${key}`;
  if (!isRecord(entry)) return record.failures.push(`${prefix} is missing or not an object`);
  if (!['COMPLETE', 'OPEN', 'BLOCKED'].includes(entry.status)) {
    record.failures.push(
      `${prefix}.status must be COMPLETE, OPEN or BLOCKED, found ${JSON.stringify(entry.status)}`,
    );
  }
  if (!EVIDENCE_CLASSES.includes(entry.evidenceClass)) {
    record.failures.push(
      `${prefix}.evidenceClass must be one of [${EVIDENCE_CLASSES.join(', ')}], found ${JSON.stringify(entry.evidenceClass)}`,
    );
  }
  if (!isFilled(entry.summary)) {
    record.failures.push(`${prefix}.summary is missing or empty`);
  } else {
    const sentences = countSentences(entry.summary);
    if (entry.summary.trim().length < 25)
      record.failures.push(`${prefix}.summary is too short to be a substantive answer`);
    if (sentences < 1) record.failures.push(`${prefix}.summary must contain at least one sentence`);
    if (sentences > 4)
      record.failures.push(
        `${prefix}.summary must contain at most 4 sentences, found ${sentences}`,
      );
  }
  if (!Array.isArray(entry.evidenceRefs) || entry.evidenceRefs.length === 0) {
    record.failures.push(`${prefix}.evidenceRefs must be a non-empty array`);
  } else if (!entry.evidenceRefs.every(isFilled)) {
    record.failures.push(`${prefix}.evidenceRefs contains an empty entry`);
  }
  if (!isFilled(entry.ownerFunction))
    record.failures.push(`${prefix}.ownerFunction is missing or empty`);
  if (!Array.isArray(entry.blockers)) record.failures.push(`${prefix}.blockers must be an array`);
  if (
    !isFilled(entry.readinessDimension) ||
    !Object.hasOwn(READINESS_DIMENSIONS, entry.readinessDimension)
  ) {
    record.failures.push(
      `${prefix}.readinessDimension must name one of [${Object.keys(READINESS_DIMENSIONS).join(', ')}], found ${JSON.stringify(entry.readinessDimension)}`,
    );
  }
  if (entry.status === 'BLOCKED' && entry.evidenceClass !== 'BLOCKED') {
    record.failures.push(`${prefix}: a BLOCKED field must carry evidenceClass BLOCKED`);
  }
  if (entry.status === 'OPEN' && entry.evidenceClass !== 'OPEN') {
    record.failures.push(`${prefix}: an OPEN field must carry evidenceClass OPEN`);
  }
  if (
    isFilled(entry.summary) &&
    /compatib/i.test(entry.summary) &&
    (!Array.isArray(entry.evidenceRefs) || entry.evidenceRefs.length === 0)
  ) {
    record.failures.push(`${prefix}: a compatibility assertion must carry an evidence reference`);
  }
}

check('json.fields', (record) => {
  if (!requireContract(record)) return;
  const products = Array.isArray(contract.products) ? contract.products : [];
  for (const expected of PRODUCTS) {
    const product = products.find((entry) => entry?.id === expected.id);
    if (!product) continue;
    if (!isRecord(product.fields)) {
      record.failures.push(`product ${expected.id}: fields is missing`);
      continue;
    }
    const actualKeys = Object.keys(product.fields);
    for (const key of FIELD_KEYS) {
      if (!Object.hasOwn(product.fields, key)) {
        record.failures.push(
          `product ${expected.id}: the 24-field contract is missing field "${key}"`,
        );
        continue;
      }
      checkFieldEntry(record, expected.id, key, product.fields[key]);
    }
    const unexpected = actualKeys.filter((key) => !FIELD_KEYS.includes(key));
    if (unexpected.length)
      record.failures.push(
        `product ${expected.id}: fields contains non-canonical keys: ${unexpected.join(', ')}`,
      );
  }
});

// --- 5. Every value traceable, no placeholders ------------------------------

check('json.traceability', (record) => {
  if (!requireContract(record)) return;
  const products = Array.isArray(contract.products) ? contract.products : [];
  let references = 0;
  for (const product of products) {
    if (!isRecord(product.fields)) continue;
    for (const [key, entry] of Object.entries(product.fields)) {
      if (!isRecord(entry) || !Array.isArray(entry.evidenceRefs)) continue;
      for (const reference of entry.evidenceRefs) {
        references += 1;
        if (!evidenceRefExists(reference)) {
          record.failures.push(
            `product ${product.id}: fields.${key}.evidenceRefs references ${JSON.stringify(reference)}, which does not resolve to a scoped document`,
          );
        }
      }
    }
  }
  record.detail = `${references} evidence references resolved`;
});

check('placeholders', (record) => {
  const placeholder = /(?<![A-Za-z])TBD(?![A-Za-z])/i;
  for (const [relativePath, text] of texts) {
    if (relativePath === JSON_CONTRACT) {
      if (placeholder.test(text))
        record.failures.push(`${relativePath}: contains the prohibited placeholder "TBD"`);
      continue;
    }
    // "TBD" is prohibited everywhere (README §5); customer-facing copy included.
    text.split(/\r?\n/).forEach((line, index) => {
      if (placeholder.test(line))
        record.failures.push(
          `${relativePath}:${index + 1}: contains the prohibited placeholder "TBD"`,
        );
    });
  }
});

// --- 6. Dossier field headings ---------------------------------------------

check('dossiers.fields', (record) => {
  for (const product of PRODUCTS) {
    const text = textOf(product.dossier);
    if (text === null) continue;
    const present = new Set();
    for (const line of text.split(/\r?\n/)) {
      const match = /^\s{0,3}#{1,6}\s*F(\d{2})\b/.exec(line);
      if (match) present.add(Number(match[1]));
    }
    const missing = FIELD_KEYS.map((_key, index) => index + 1).filter(
      (number) => !present.has(number),
    );
    if (missing.length) {
      record.failures.push(
        `${product.dossier} is missing the F-heading(s): ${missing.map((number) => `F${String(number).padStart(2, '0')}`).join(', ')}`,
      );
    }
  }
});

// --- 7. Edition comparison (D4) --------------------------------------------

check('editions.comparison', (record) => {
  const text = textOf(EDITIONS_DOC);
  if (text === null)
    return record.failures.push(`${EDITIONS_DOC} is missing; the edition comparison is required`);
  const normalized = text.toLowerCase().replace(/\s+/g, ' ');
  for (const product of PRODUCTS) {
    if (!containsToken(normalized, product.displayName.toLowerCase())) {
      record.failures.push(
        `${EDITIONS_DOC}: product ${product.displayName} is not present in the edition comparison`,
      );
    }
    for (const edition of product.editions) {
      if (!containsToken(normalized, edition.displayName.toLowerCase())) {
        record.failures.push(
          `${EDITIONS_DOC}: edition ${edition.displayName} is missing from the edition comparison`,
        );
      }
      if (!containsToken(normalized, edition.id.toLowerCase())) {
        record.failures.push(
          `${EDITIONS_DOC}: edition id ${edition.id} does not appear in the edition comparison; D4 is the edition authority and must name every edition id`,
        );
      }
    }
  }
  // D4 §1.3 is the edition-id authority: no seventh edition id may appear.
  const knownEditionIds = PRODUCTS.flatMap((product) =>
    product.editions.map((edition) => edition.id),
  );
  // Filenames such as MAREA-NAV-COMMERCIAL-SPEC.md are not edition ids: a
  // candidate id must not be followed by another name segment or a file suffix.
  for (const match of text.matchAll(/\b(?:NAV|HUB|AIS)-[A-Z][A-Z0-9]+\b(?![.\-])/g)) {
    if (!knownEditionIds.includes(match[0])) {
      record.failures.push(
        `${EDITIONS_DOC}: unknown edition id ${match[0]} appears in the edition authority; only the six MC-05 edition ids may exist`,
      );
    }
  }
  // The AIS Connected verdict must be recorded, not flattened.
  const normalizedAuthority = normalizeForCheck(text);
  for (const phrase of ['conditional', 'not yet justified']) {
    if (!normalizedAuthority.includes(phrase)) {
      record.failures.push(
        `${EDITIONS_DOC}: does not record the AIS-CONNECTED verdict as CONDITIONAL / not yet justified (missing ${JSON.stringify(phrase)})`,
      );
    }
  }
});

// --- 8. Copy files and structural parity -----------------------------------

function headingLabels(text) {
  return text
    .split(/\r?\n/)
    .filter((line) => /^\s{0,3}#{2,3}\s+\S/.test(line))
    .map((line) => line.replace(/^\s{0,3}#{2,3}\s+/, '').trim());
}

function numberedLabels(labels) {
  const numbers = [];
  for (const label of labels) {
    const match = /^(?:F)?(\d{1,2})[.)\s—–-]/.exec(label) ?? /^(\d{1,2})\s/.exec(label);
    if (!match) return null;
    numbers.push(Number(match[1]));
  }
  return numbers;
}

check('copy.pairs', (record) => {
  for (const product of PRODUCTS) {
    const pair = [
      { language: 'es', file: product.copy.es },
      { language: 'en', file: product.copy.en },
    ];
    const sections = {};
    for (const side of pair) {
      const text = textOf(side.file);
      if (text === null) {
        record.failures.push(`${side.file} is missing; a complete ES/EN copy pair is required`);
        continue;
      }
      if (!text.trim()) {
        record.failures.push(`${side.file} is empty`);
        continue;
      }
      const labels = headingLabels(text);
      sections[side.language] = labels;
      if (labels.length === 0)
        record.failures.push(
          `${side.file} has no section headings; the copy structure cannot be compared`,
        );
    }
    if (!sections.es || !sections.en) continue;
    if (sections.es.length !== sections.en.length) {
      record.failures.push(
        `${product.copy.es} and ${product.copy.en} are not structurally parallel: ${sections.es.length} ES sections vs ${sections.en.length} EN sections`,
      );
      continue;
    }
    const esNumbers = numberedLabels(sections.es);
    const enNumbers = numberedLabels(sections.en);
    if (esNumbers && enNumbers && esNumbers.join('|') !== enNumbers.join('|')) {
      record.failures.push(
        `${product.copy.es} and ${product.copy.en} use different numbered section sequences: ES ${esNumbers.join(', ')} / EN ${enNumbers.join(', ')}`,
      );
    }
  }
});

// --- 9. Naming -------------------------------------------------------------

check('names', (record) => {
  if (contract) {
    const products = Array.isArray(contract.products) ? contract.products : [];
    for (const expected of PRODUCTS) {
      const product = products.find((entry) => entry?.id === expected.id);
      if (!product) continue;
      if (product.displayName !== `MAREA ${expected.id}`) {
        record.failures.push(
          `${JSON_CONTRACT}: product ${expected.id}: displayName must be exactly "MAREA ${expected.id}"`,
        );
      }
    }
  }
  for (const file of SCOPED_DOC_FILES) {
    const text = textOf(file);
    if (text !== null)
      collectFileViolations(record, file, text, NAMING_RULES, {
        tolerant: true,
        wideContext: true,
      });
  }
  for (const file of SCOPED_COPY_FILES) {
    const text = textOf(file);
    if (text !== null) collectFileViolations(record, file, text, NAMING_RULES, { tolerant: false });
  }
});

// --- 10. Lifecycle ---------------------------------------------------------

const FORBIDDEN_LIFECYCLE_ASSERTIONS =
  /\b(?:lifecycle(?:State|_state)?|productState|PRODUCT_STATE|commercialState)\b\s*[:=]\s*`?([A-Za-z][A-Za-z_]+)`?/i;

check('lifecycle', (record) => {
  if (contract) {
    const products = Array.isArray(contract.products) ? contract.products : [];
    for (const product of products) {
      if (product?.lifecycleState !== 'DEFINED') {
        record.failures.push(
          `product ${product?.id}: lifecycleState must be "DEFINED" at MC-05, found ${JSON.stringify(product?.lifecycleState)}`,
        );
      }
    }
  }
  for (const file of SCOPED_DOC_FILES) {
    const text = textOf(file);
    if (text === null) continue;
    const lines = text.split(/\r?\n/);
    lines.forEach((line, index) => {
      const match = FORBIDDEN_LIFECYCLE_ASSERTIONS.exec(line);
      if (match && !LIFECYCLE_VOCABULARY.includes(match[1].toUpperCase())) {
        if (isNegativeContext(lines, index)) return;
        record.failures.push(
          `${file}:${index + 1}: lifecycle state ${JSON.stringify(match[1])} is not in the seven-state vocabulary`,
        );
      }
    });
  }
  // A single READY-style boolean is prohibited (readiness is always nine
  // separate dimensions). This applies to documents and the JSON contract.
  const readyBoolean = /[A-Za-z_]*(?:ready|Ready|READY)[A-Za-z_]*["']?\s*[:=]\s*true\b/;
  for (const [file, text] of texts) {
    const lines = text.split(/\r?\n/);
    lines.forEach((line, index) => {
      if (!readyBoolean.test(line)) return;
      if (file !== JSON_CONTRACT && isNegativeContext(lines, index)) return;
      record.failures.push(
        `${file}:${index + 1}: a READY-style boolean is prohibited; readiness is nine separate dimensions`,
      );
    });
  }
});

// --- 11. Availability ------------------------------------------------------

check('availability', (record) => {
  if (contract) {
    walkJsonEntries(contract, (key, value, path) => {
      if (/availability$/i.test(key) && typeof value === 'string' && value !== 'NOT_FOR_SALE') {
        record.failures.push(
          `${JSON_CONTRACT}: ${path} must be "NOT_FOR_SALE", found ${JSON.stringify(value)}`,
        );
      }
    });
    collectJsonTextViolations(record, PURCHASE_RULES);
  }
  for (const file of SCOPED_DOC_FILES) {
    const text = textOf(file);
    if (text !== null)
      collectFileViolations(record, file, text, PURCHASE_RULES, {
        tolerant: true,
        wideContext: true,
      });
  }
  for (const file of SCOPED_COPY_FILES) {
    const text = textOf(file);
    if (text !== null)
      collectFileViolations(record, file, text, PURCHASE_RULES, { tolerant: false });
  }
});

// --- 12. Prices ------------------------------------------------------------

const PRICE_IN_COPY = [/[€$]\s*\d/, /\b\d+(?:[.,]\d+)?\s*(?:€|EUR\b|euros?\b)/i, /\bEUR\s*\d/i];

check('pricing', (record) => {
  if (contract) {
    walkJsonEntries(contract, (key, value, path) => {
      if (
        path.includes('priceHypothesis') &&
        key === 'status' &&
        value !== PRICE_HYPOTHESIS_RULES.status
      ) {
        record.failures.push(
          `${JSON_CONTRACT}: ${path} must be "${PRICE_HYPOTHESIS_RULES.status}", found ${JSON.stringify(value)}`,
        );
      }
      if (/^(?:priceStatus|pricingStatus)$/i.test(key) && value !== PRICE_HYPOTHESIS_RULES.status) {
        record.failures.push(
          `${JSON_CONTRACT}: ${path} must be "${PRICE_HYPOTHESIS_RULES.status}", found ${JSON.stringify(value)}`,
        );
      }
    });
    collectJsonTextViolations(record, PRICE_TEXT_RULES);
  }
  for (const file of [...SCOPED_DOC_FILES]) {
    const text = textOf(file);
    if (text !== null)
      collectFileViolations(record, file, text, PRICE_RULES, {
        tolerant: true,
        wideContext: true,
        skipQuestions: true,
      });
  }
  for (const file of SCOPED_COPY_FILES) {
    const text = textOf(file);
    if (text === null) continue;
    collectFileViolations(record, file, text, PRICE_COPY_RULES, {
      tolerant: false,
      skipQuestions: true,
    });
    text.split(/\r?\n/).forEach((line, index) => {
      for (const pattern of PRICE_IN_COPY) {
        if (pattern.test(line)) {
          record.failures.push(
            `${file}:${index + 1}: a price does not belong in customer-facing copy while prices are HYPOTHESIS_UNAPPROVED`,
          );
          break;
        }
      }
    });
  }
  // Price hypotheses must be labelled as such wherever they appear.
  for (const file of [PRODUCTS[0].dossier, PRODUCTS[1].dossier, PRODUCTS[2].dossier, PRICING_DOC]) {
    const text = textOf(file);
    if (text !== null && !text.includes(PRICE_HYPOTHESIS_RULES.status)) {
      record.failures.push(
        `${file} does not label its price figures ${PRICE_HYPOTHESIS_RULES.status}`,
      );
    }
  }
});

// --- 13. Legal clearance ---------------------------------------------------

check('clearance', (record) => {
  if (contract) {
    walkJsonEntries(contract, (key, value, path) => {
      if (/trademark.*clearance/i.test(key) && value !== 'NOT_GRANTED') {
        record.failures.push(
          `${JSON_CONTRACT}: ${path} must be "NOT_GRANTED", found ${JSON.stringify(value)}`,
        );
      }
    });
    collectJsonTextViolations(record, CLEARANCE_RULES);
  }
  for (const file of [...SCOPED_DOC_FILES, ...SCOPED_COPY_FILES]) {
    const text = textOf(file);
    if (text !== null)
      collectFileViolations(record, file, text, CLEARANCE_RULES, {
        tolerant: true,
        skipQuestions: true,
      });
  }
});

// --- 14. AIS transmission claims ------------------------------------------

check('ais', (record) => {
  if (contract) collectJsonTextViolations(record, AIS_RULES);
  // The approved receive-only disclaimer itself names the transponder and
  // collision-avoidance exclusions, so a negated line is legitimate even in
  // customer-facing copy. An affirmative transmission claim has no negation.
  collectScopedViolations(record, AIS_RULES);
});

// --- 15. NMEA 2000 claims --------------------------------------------------

check('nmea', (record) => {
  if (contract) collectJsonTextViolations(record, NMEA_RULES);
  collectScopedViolations(record, NMEA_RULES);
});

// --- 16. Chart rights / ECDIS ---------------------------------------------

check('charts', (record) => {
  if (contract) collectJsonTextViolations(record, CHARTS_RULES);
  collectScopedViolations(record, CHARTS_RULES);
});

// --- 17. Compatibility -----------------------------------------------------

check('compatibility', (record) => {
  if (contract) collectJsonTextViolations(record, COMPATIBILITY_RULES);
  collectScopedViolations(record, COMPATIBILITY_RULES);
});

// --- 18. Assets and file references ---------------------------------------

check('assets', (record) => {
  const assetFiles = /docs\/marea\/[A-Za-z0-9_][A-Za-z0-9_./-]*\.(?:png|jpe?g|gif|svg|webp|avif)/gi;
  const allowedStatuses = ['CONCEPT', 'BLOCKED_ON_IMAGE_GENERATION'];
  const registered = new Map();
  if (contract) {
    const assets = contract.assets;
    if (!Array.isArray(assets) || assets.length === 0) {
      record.failures.push(
        `${JSON_CONTRACT}: assets must be a non-empty array of internal asset records`,
      );
    } else {
      for (const asset of assets) {
        if (!isRecord(asset) || !isFilled(asset.assetId)) {
          record.failures.push(`${JSON_CONTRACT}: assets contains an entry without assetId`);
          continue;
        }
        if (registered.has(asset.assetId))
          record.failures.push(`${JSON_CONTRACT}: duplicate assetId ${asset.assetId}`);
        if (!allowedStatuses.includes(asset.status)) {
          record.failures.push(
            `${JSON_CONTRACT}: asset ${asset.assetId} status must be CONCEPT or BLOCKED_ON_IMAGE_GENERATION, found ${JSON.stringify(asset.status)}`,
          );
        }
        if (!isFilled(asset.source)) {
          record.failures.push(`${JSON_CONTRACT}: asset ${asset.assetId} source is missing`);
        } else if (!evidenceRefExists(asset.source)) {
          record.failures.push(
            `${JSON_CONTRACT}: asset ${asset.assetId} references ${JSON.stringify(asset.source)}, which does not exist`,
          );
        }
        registered.set(asset.assetId, asset);
      }
    }
    const products = Array.isArray(contract.products) ? contract.products : [];
    for (const product of products) {
      if (!Array.isArray(product.assets) || product.assets.length === 0) {
        record.failures.push(`product ${product.id}: assets must be a non-empty array`);
        continue;
      }
      for (const reference of product.assets) {
        const assetId = isRecord(reference) ? reference.assetId : reference;
        if (!isFilled(assetId)) {
          record.failures.push(`product ${product.id}: an asset reference has no assetId`);
          continue;
        }
        if (!registered.has(assetId)) {
          record.failures.push(
            `product ${product.id}: assetId ${assetId} is not declared in the contract assets list`,
          );
        }
      }
    }
  }
  for (const [file, text] of texts) {
    if (file === JSON_CONTRACT) continue;
    assetFiles.lastIndex = 0;
    for (const match of text.matchAll(assetFiles)) {
      const candidate = match[0].replace(/[.,;:)]+$/, '');
      if (!existsSync(resolve(root, candidate))) {
        record.failures.push(`${file}: references the missing asset file ${candidate}`);
      }
    }
  }
});

// --- 19. Disclaimers -------------------------------------------------------

check('disclaimers', (record) => {
  for (const requirement of REQUIRED_DISCLAIMERS) {
    const text = textOf(requirement.file);
    if (text === null) continue;
    const approved = APPROVED_DISCLAIMERS[requirement.kind][requirement.language];
    const normalizedApproved = normalizeDisclaimer(approved);
    const normalizedText = normalizeDisclaimer(text);
    if (!normalizedText.includes(normalizedApproved)) {
      record.failures.push(
        `${requirement.file}: does not carry the approved ${requirement.kind} disclaimer (${requirement.language.toUpperCase()}) verbatim, §9 of the claims policy`,
      );
    }
  }
});

// --- Report ----------------------------------------------------------------

const failed = checks.filter((entry) => entry.failures.length > 0);
const passed = checks.length - failed.length;
const result = {
  contract: contract
    ? { id: contract.contractId, version: contract.contractVersion, status: contract.status }
    : null,
  root: displayPath(root),
  checks: checks.map(({ id, failures, detail }) => ({
    id,
    status: failures.length === 0 ? 'PASS' : 'FAIL',
    detail,
    failures,
  })),
  summary: {
    checks: checks.length,
    passed,
    failed: failed.length,
    scopedFiles: SCOPED_FILES.length,
    presentFiles: SCOPED_FILES.filter((file) => texts.has(file)).length,
  },
  result: failed.length === 0 ? 'PASS' : 'FAIL',
};

if (jsonMode) {
  console.log(JSON.stringify(result, null, 2));
} else {
  console.log(
    `MAREA product-governance validator — MC-05 batch (contract ${contract?.contractVersion ?? 'missing'})`,
  );
  console.log(`Contract: ${JSON_CONTRACT}`);
  console.log(`Root: ${displayPath(root)}`);
  console.log('');
  for (const { id, failures, detail } of checks) {
    if (failures.length === 0) {
      console.log(`PASS  ${id}${detail ? ` — ${detail}` : ''}`);
      continue;
    }
    console.log(
      `FAIL  ${id} (${failures.length} ${failures.length === 1 ? 'failure' : 'failures'})`,
    );
    for (const failure of failures) console.log(`        - ${failure}`);
  }
  console.log('');
  console.log('Scoped files (only these are read; everything else is out of scope):');
  for (const file of SCOPED_FILES) {
    console.log(
      `  ${texts.has(file) ? 'scanned  ' : 'missing  '} ${file}${texts.has(file) ? ` — ${texts.get(file).split(/\r?\n/).length} lines` : ''}`,
    );
  }
  console.log('');
  console.log(
    `Summary: ${checks.length} checks run, ${passed} passed, ${failed.length} failed; ${texts.size} of ${SCOPED_FILES.length} scoped files read.`,
  );
  console.log(failed.length === 0 ? 'RESULT: PASS' : 'RESULT: FAIL');
}

process.exitCode = failed.length === 0 ? 0 : 1;
