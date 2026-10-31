#!/usr/bin/env node
import { existsSync, readFileSync, statSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Deterministic bundle-governance validator for MC-08 (MAREA bundles).
 *
 * It consumes the only product authority (`product-definitions.batch-01/02/03.json`)
 * to build the family/edition registry, then validates the bundle contract
 * (`bundle-definitions.json`, document type BUNDLE_DEFINITION_CONTRACT), the six
 * 24-field bundle specifications, the twelve ES/EN copy drafts, the 60-asset
 * planning register, the pricing/entitlement/installation documents and the
 * canonical compatibility registers. It never scans src/, never makes a network
 * request and adds no dependency. Plain node, offline, Windows/Linux.
 *
 * Usage:
 *   node scripts/check-marea-bundles.mjs [--root <dir>] [--json]
 *
 * Exit code 0 = every check passed, 1 = at least one check failed.
 */

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(SCRIPT_DIR, '..');

const BUNDLES_DIR = 'docs/marea/bundles/';
const PRODUCTS_DIR = 'docs/marea/products/';
const CONTRACT_PATH = `${BUNDLES_DIR}bundle-definitions.json`;
const REGISTRY_CONTRACTS = [
  `${PRODUCTS_DIR}product-definitions.batch-01.json`,
  `${PRODUCTS_DIR}product-definitions.batch-02.json`,
  `${PRODUCTS_DIR}product-definitions.batch-03.json`,
];
const SPEC_PATHS = {
  START: `${BUNDLES_DIR}MAREA-START-COMMERCIAL-SPEC.md`,
  CRUISE: `${BUNDLES_DIR}MAREA-CRUISE-COMMERCIAL-SPEC.md`,
  SAIL: `${BUNDLES_DIR}MAREA-SAIL-COMMERCIAL-SPEC.md`,
  PROTECT: `${BUNDLES_DIR}MAREA-PROTECT-COMMERCIAL-SPEC.md`,
  COMPLETE: `${BUNDLES_DIR}MAREA-COMPLETE-COMMERCIAL-SPEC.md`,
  FLEET: `${BUNDLES_DIR}MAREA-FLEET-PACKAGE-COMMERCIAL-SPEC.md`,
};
const COPY_PATHS = {
  START: { es: `${BUNDLES_DIR}copy/start.es.md`, en: `${BUNDLES_DIR}copy/start.en.md` },
  CRUISE: { es: `${BUNDLES_DIR}copy/cruise.es.md`, en: `${BUNDLES_DIR}copy/cruise.en.md` },
  SAIL: { es: `${BUNDLES_DIR}copy/sail.es.md`, en: `${BUNDLES_DIR}copy/sail.en.md` },
  PROTECT: { es: `${BUNDLES_DIR}copy/protect.es.md`, en: `${BUNDLES_DIR}copy/protect.en.md` },
  COMPLETE: { es: `${BUNDLES_DIR}copy/complete.es.md`, en: `${BUNDLES_DIR}copy/complete.en.md` },
  FLEET: {
    es: `${BUNDLES_DIR}copy/fleet-package.es.md`,
    en: `${BUNDLES_DIR}copy/fleet-package.en.md`,
  },
};
const ASSET_DOC = `${BUNDLES_DIR}BUNDLE-ASSET-REQUIREMENTS.md`;
const PRICING_DOC = `${BUNDLES_DIR}BUNDLE-PRICING-AND-UNIT-ECONOMICS.md`;
const ENTITLEMENTS_DOC = `${BUNDLES_DIR}BUNDLE-SUBSCRIPTIONS-AND-ENTITLEMENTS.md`;
const INSTALLATION_DOC = `${BUNDLES_DIR}BUNDLE-INSTALLATION-AND-QUOTATION-MODEL.md`;
const JOURNEYS_DOC = `${BUNDLES_DIR}BUNDLE-CUSTOMER-JOURNEYS.md`;
const COMPARISON_DOC = `${BUNDLES_DIR}BUNDLE-CUSTOMER-COMPARISON.md`;
const ARCHITECTURE_DOC = `${BUNDLES_DIR}BUNDLE-ARCHITECTURE.md`;
const COMPOSITION_DOC = `${BUNDLES_DIR}BUNDLE-COMPOSITION-AND-EXCLUSIONS.md`;
const CONFIG_RULES_DOC = `${BUNDLES_DIR}BUNDLE-CONFIGURATION-RULES.md`;
const COMPATIBILITY_DOCS = [
  `${PRODUCTS_DIR}PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md`,
  `${PRODUCTS_DIR}PRODUCT-COMPATIBILITY-PILOT-SENSE-WATCH.md`,
  `${PRODUCTS_DIR}PRODUCT-COMPATIBILITY-DISPLAY-WEATHER-FLEET.md`,
];
const EDITIONS_AUTHORITY = `${PRODUCTS_DIR}PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md`;

// --- Canonical vocabulary (D-007 and MC-08 architecture §3) -----------------

const BUNDLE_IDS = ['START', 'CRUISE', 'SAIL', 'PROTECT', 'COMPLETE', 'FLEET'];
const DISPLAY_NAMES = {
  START: 'MAREA START',
  CRUISE: 'MAREA CRUISE',
  SAIL: 'MAREA SAIL',
  PROTECT: 'MAREA PROTECT',
  COMPLETE: 'MAREA COMPLETE',
  FLEET: 'MAREA FLEET',
};
const CUSTOMER_FACING_NAMES = { FLEET: 'MAREA FLEET package' };

const FAMILY_IDS = ['NAV', 'HUB', 'AIS', 'PILOT', 'SENSE', 'WATCH', 'DISPLAY', 'WEATHER', 'FLEET'];

const LIFECYCLE_VOCABULARY = [
  'CONCEPT',
  'DEFINED',
  'ENGINEERING_VERIFIED',
  'REGULATORY_READY',
  'OPERATIONS_READY',
  'COMMERCIALLY_AVAILABLE',
  'RETIRED',
];
const EVIDENCE_CLASSES = [
  'VERIFIED_REPO',
  'VERIFIED_EXTERNAL',
  'ASSUMPTION',
  'HYPOTHESIS',
  'OPEN',
  'BLOCKED',
];
const INCLUSION_VOCABULARY = [
  'INCLUDED',
  'REQUIRED_EXTERNAL',
  'OPTIONAL',
  'CONDITIONAL',
  'NOT_INCLUDED',
  'INELIGIBLE',
  'QUOTATION_REQUIRED',
];
const CONFIGURATION_OUTCOMES = [
  'CONFIGURATION_DEFINED_INTERNAL',
  'COMPATIBILITY_EVIDENCE_REQUIRED',
  'SPECIALIST_SURVEY_REQUIRED',
  'QUOTATION_REQUIRED',
  'NOT_ELIGIBLE',
  'PUBLICATION_BLOCKED',
];
const READINESS_STATES = ['INTERNAL_ONLY_DEFINED', 'BLOCKED'];
const PRICE_STATUS = [
  'HYPOTHESIS_UNAPPROVED',
  'NOT_ESTABLISHED',
  'OPEN',
  'BLOCKED',
  'NOT_APPLICABLE',
];
const INSTALL_CLASSES = [
  'NOT_APPLICABLE',
  'SELF_INSTALL_NOT_VERIFIED',
  'INSTALLER_ASSISTED',
  'PROFESSIONAL_REQUIRED',
  'QUOTATION_REQUIRED',
  'SPECIALIST_SURVEY_REQUIRED',
];
const FORBIDDEN_STATES = ['ORDERABLE', 'FOR_SALE', 'PURCHASABLE', 'APPROVED', 'PUBLISHABLE'];
const NOTIFICATION_STATES = [
  'EVENT_OBSERVED',
  'RULE_MATCHED',
  'ALERT_CREATED',
  'QUEUED',
  'PROVIDER_ACCEPTED',
  'DELIVERED_WHEN_CONFIRMED',
  'ACKNOWLEDGED',
  'EXPIRED',
  'FAILED',
  'DELIVERY_UNKNOWN',
];
const NOTIFICATION_TIMESTAMPS = [
  'eventTime',
  'deviceClockTime',
  'serverReceiptTime',
  'alertCreationTime',
  'notificationHandoffTime',
  'providerAcceptanceTime',
  'deliveryConfirmationTime',
  'userAcknowledgementTime',
];

const FIELD_KEYS = [
  'identity',
  'commercialPurpose',
  'idealCustomer',
  'applicability',
  'customerOutcome',
  'mandatoryBaseComponents',
  'optionalComponents',
  'requiredProductEditions',
  'explicitExclusions',
  'dependencyRules',
  'compatibilityCriteria',
  'installationRequirements',
  'softwareEntitlements',
  'recurringSubscriptions',
  'externalDataConnectivity',
  'commissioningOnboarding',
  'warrantySupport',
  'channelFulfilment',
  'priceHypothesisAndQuotationModel',
  'costAndMarginAssumptions',
  'upgradeMigration',
  'customerAcceptance',
  'releaseReadinessBlockers',
  'contentAndVisualReferences',
];
const FIELD_TITLES = [
  'Identity',
  'Commercial purpose',
  'Ideal customer',
  'Vessel or organization applicability',
  'Main customer outcome',
  'Mandatory base components',
  'Optional components',
  'Required product editions',
  'Explicit exclusions',
  'Dependency rules',
  'Compatibility criteria',
  'Installation requirements',
  'Software entitlements',
  'Recurring subscriptions',
  'External data and connectivity',
  'Commissioning and onboarding',
  'Warranty and support',
  'Channel and fulfilment',
  'Price hypothesis and quotation model',
  'Cost and margin assumptions',
  'Upgrade and migration',
  'Customer acceptance',
  'Release readiness and blockers',
  'ES/EN content and visual references',
];
const REQUIRED_LINES = [
  '- **Definition.**',
  '- **Evidence.**',
  '- **Owner.**',
  '- **References.**',
  '- **Release readiness.**',
];

const PUBLICATION_CONTROLS = {
  published: false,
  forSale: false,
  checkoutAllowed: false,
  orderable: false,
  purchaseCtaAllowed: false,
  pricesInCopyAllowed: false,
  pricesLabelled: 'HYPOTHESIS_UNAPPROVED',
  remoteSteeringAllowed: false,
  instantAlertGuaranteeAllowed: false,
  certificationClaimAllowed: false,
  assetGenerationAllowed: false,
};

const GLOBAL_RESTRICTIONS = {
  trademarkLegalClearance: 'NOT_GRANTED',
  sourceIpClearance: 'NOT_CLEARED',
  commercialAvailability: 'NOT_FOR_SALE',
  aisTransmissionOffered: false,
  nmea2000Certified: false,
  ecdiscClaimed: false,
  chartRightsGranted: false,
  imageGeneration: 'BLOCKED',
  remoteHelmControl: 'PROHIBITED',
  instantAlertGuarantee: false,
  sensorAccuracyClaimed: false,
  dataProviderRightsGranted: false,
  forecastAccuracyClaimed: false,
  slaEstablished: false,
  crossTenantAccessAllowed: false,
  hardwareIncludedByDefault: false,
};

const REQUIRED_CONTRACT_KEYS = [
  'contractId',
  'contractVersion',
  'status',
  'documentType',
  'milestone',
  'date',
  'owner',
  'sourceContracts',
  'lifecycleDecision',
  'notACommerceCatalog',
  'notAProductFamily',
  'publicationState',
  'publicationControls',
  'globalRestrictions',
  'lifecycleVocabulary',
  'evidenceClasses',
  'inclusionVocabulary',
  'configurationOutcomes',
  'notificationStates',
  'notificationTimestamps',
  'subscriptionIsolationRules',
  'senseKitExpansion',
  'bundleFieldModel',
  'priceHypothesisRegister',
  'configurationRules',
  'conflictRules',
  'crossSellRules',
  'sourceDocuments',
  'decisions',
  'honestLimit',
  'assets',
  'entitlementsMatrix',
  'bundles',
];

const EXPECTED_KITS = {
  'SENSE-ESSENTIALS': ['SENSE-POWER', 'SENSE-BILGE'],
  'SENSE-SAIL': ['SENSE-WIND', 'SENSE-ENV'],
  'SENSE-SYSTEMS': ['SENSE-POWER', 'SENSE-BILGE', 'SENSE-TANKS', 'SENSE-ENV'],
};

// Fixed reference configurations (D-019). Edition ids are facts of the six
// bundles; all family/edition RESOLUTION still comes from the product contracts.
const FIXED_REFERENCE = {
  START: [
    ['HUB', 'HUB-STANDARD', 'INCLUDED'],
    ['NAV', 'NAV-PRO', 'INCLUDED'],
  ],
  CRUISE: [
    ['NAV', 'NAV-ESSENTIAL', 'INCLUDED'],
    ['HUB', 'HUB-STANDARD', 'INCLUDED'],
    ['AIS', 'AIS-RECEIVER', 'INCLUDED'],
    ['DISPLAY', 'DISPLAY-7', 'INCLUDED'],
  ],
  SAIL: [
    ['NAV', 'NAV-PRO', 'INCLUDED'],
    ['HUB', 'HUB-STANDARD', 'INCLUDED'],
    ['PILOT', 'PILOT-COASTAL', 'QUOTATION_REQUIRED'],
    ['SENSE', 'SENSE-WIND', 'CONDITIONAL'],
  ],
  PROTECT: [
    ['WATCH', 'WATCH-CORE', 'INCLUDED'],
    ['SENSE', 'SENSE-ESSENTIALS', 'INCLUDED'],
  ],
  COMPLETE: [
    ['NAV', 'NAV-PRO', 'INCLUDED'],
    ['HUB', 'HUB-PRO', 'INCLUDED'],
    ['DISPLAY', 'DISPLAY-7', 'INCLUDED'],
    ['WATCH', 'WATCH-CORE', 'INCLUDED'],
    ['SENSE', 'SENSE-POWER', 'INCLUDED'],
    ['SENSE', 'SENSE-BILGE', 'INCLUDED'],
    ['SENSE', 'SENSE-TANKS', 'INCLUDED'],
    ['SENSE', 'SENSE-ENV', 'INCLUDED'],
    ['PILOT', 'PILOT-COASTAL', 'QUOTATION_REQUIRED'],
  ],
  FLEET: [['FLEET', 'FLEET-START', 'INCLUDED']],
};

// Every line of the fixed reference composition, with the ONLY inclusion class it
// may carry (M-01). Conditional, ineligible and required-external lines are pinned
// too, so a conditional product cannot silently become a bundled mandatory purchase.
const PINNED_LINES = {
  START: [
    ['ST-01', 'HUB', 'HUB-STANDARD', 'INCLUDED'],
    ['ST-02', 'NAV', 'NAV-PRO', 'INCLUDED'],
    ['ST-05', null, null, 'REQUIRED_EXTERNAL'],
    ['ST-06', null, null, 'REQUIRED_EXTERNAL'],
    ['ST-03', 'HUB', 'HUB-PRO', 'OPTIONAL'],
    ['ST-04', 'WEATHER', 'WEATHER-STANDARD', 'OPTIONAL'],
    ['ST-07', null, null, 'OPTIONAL'],
  ],
  CRUISE: [
    ['CR-01', 'NAV', 'NAV-ESSENTIAL', 'INCLUDED'],
    ['CR-02', 'HUB', 'HUB-STANDARD', 'INCLUDED'],
    ['CR-03', 'AIS', 'AIS-RECEIVER', 'INCLUDED'],
    ['CR-04', 'DISPLAY', 'DISPLAY-7', 'INCLUDED'],
    ['CR-06', 'AIS', 'AIS-CONNECTED', 'CONDITIONAL'],
    ['CR-07', 'DISPLAY', 'DISPLAY-LARGE-CONDITIONAL', 'INELIGIBLE'],
    ['CR-09', null, null, 'REQUIRED_EXTERNAL'],
    ['CR-10', null, null, 'REQUIRED_EXTERNAL'],
    ['CR-11', null, null, 'REQUIRED_EXTERNAL'],
    ['CR-05', 'NAV', 'NAV-PRO', 'OPTIONAL'],
    ['CR-08', 'WEATHER', 'WEATHER-STANDARD', 'OPTIONAL'],
  ],
  SAIL: [
    ['SL-01', 'NAV', 'NAV-PRO', 'INCLUDED'],
    ['SL-02', 'HUB', 'HUB-STANDARD', 'INCLUDED'],
    ['SL-03', 'PILOT', 'PILOT-COASTAL', 'QUOTATION_REQUIRED'],
    ['SL-04', 'SENSE', 'SENSE-WIND', 'CONDITIONAL'],
    ['SL-05', 'PILOT', 'PILOT-SAIL', 'CONDITIONAL'],
    ['SL-06', 'PILOT', 'PILOT-PRO', 'INELIGIBLE'],
    ['SL-08', null, null, 'REQUIRED_EXTERNAL'],
    ['SL-09', null, null, 'QUOTATION_REQUIRED'],
    ['SL-10', null, null, 'QUOTATION_REQUIRED'],
  ],
  PROTECT: [
    ['PR-01', 'WATCH', 'WATCH-CORE', 'INCLUDED'],
    ['PR-02', 'SENSE', 'SENSE-ESSENTIALS', 'INCLUDED'],
    ['PR-03', 'SENSE', null, 'INELIGIBLE'],
    ['PR-05', 'WATCH', 'WATCH-PLUS', 'CONDITIONAL'],
    ['PR-06', null, null, 'REQUIRED_EXTERNAL'],
    ['PR-07', null, null, 'INCLUDED'],
    ['PR-08', null, null, 'REQUIRED_EXTERNAL'],
    ['PR-04', 'HUB', 'HUB-STANDARD', 'OPTIONAL'],
  ],
  COMPLETE: [
    ['CP-01', 'NAV', 'NAV-PRO', 'INCLUDED'],
    ['CP-02', 'HUB', 'HUB-PRO', 'INCLUDED'],
    ['CP-03', 'DISPLAY', 'DISPLAY-7', 'INCLUDED'],
    ['CP-04', 'WATCH', 'WATCH-CORE', 'INCLUDED'],
    ['CP-05', 'SENSE', 'SENSE-POWER', 'INCLUDED'],
    ['CP-06', 'SENSE', 'SENSE-BILGE', 'INCLUDED'],
    ['CP-07', 'SENSE', 'SENSE-TANKS', 'INCLUDED'],
    ['CP-08', 'SENSE', 'SENSE-ENV', 'INCLUDED'],
    ['CP-09', 'PILOT', 'PILOT-COASTAL', 'QUOTATION_REQUIRED'],
    ['CP-13', 'PILOT', 'PILOT-PRO', 'INELIGIBLE'],
    ['CP-14', 'PILOT', 'PILOT-SAIL', 'CONDITIONAL'],
    ['CP-15', 'DISPLAY', 'DISPLAY-LARGE-CONDITIONAL', 'INELIGIBLE'],
    ['CP-16', null, null, 'REQUIRED_EXTERNAL'],
    ['CP-17', null, null, 'QUOTATION_REQUIRED'],
    ['CP-10', 'AIS', 'AIS-RECEIVER', 'OPTIONAL'],
    ['CP-11', 'WEATHER', 'WEATHER-PRO', 'OPTIONAL'],
  ],
  FLEET: [
    ['FP-01', 'FLEET', 'FLEET-START', 'INCLUDED'],
    ['FP-02', 'FLEET', 'FLEET-ENTERPRISE', 'CONDITIONAL'],
    ['FP-03', null, null, 'INCLUDED'],
    ['FP-04', null, null, 'INCLUDED'],
    ['FP-08', null, null, 'REQUIRED_EXTERNAL'],
    ['FP-10', null, null, 'CONDITIONAL'],
    ['FP-11', 'FLEET', null, 'INCLUDED'],
    ['FP-05', 'WATCH', 'WATCH-CORE', 'OPTIONAL'],
    ['FP-06', 'HUB', 'HUB-STANDARD', 'OPTIONAL'],
    ['FP-07', 'SENSE', null, 'OPTIONAL'],
    ['FP-09', null, null, 'OPTIONAL'],
    ['FP-12', 'FLEET', 'FLEET-BUSINESS', 'OPTIONAL'],
  ],
};

// Each bundle must expose required-external scope for these categories.
const REQUIRED_EXTERNAL_SCOPE = {
  START: [
    ['licensed chart entitlement', /chart|licen[cs]e/i],
    ['customer device / cabling', /customer device|phone|tablet|cablin|cable/i],
  ],
  CRUISE: [
    ['AIS antenna / splitter', /antenna|splitter/i],
    ['mounts / cabling / installation', /mount|cablin|cable|installation/i],
    ['licensed chart entitlement', /chart|licen[cs]e/i],
  ],
  SAIL: [
    ['vessel and steering survey', /survey/i],
    ['drive / actuator / feedback', /drive|actuator|feedback/i],
    ['commissioning / sea trials', /commission|sea trial|sea-trial/i],
  ],
  PROTECT: [
    ['SIM / data plan', /sim|data plan|data connectiv|cellular/i],
    ['installation materials / labour', /installation|install/i],
  ],
  COMPLETE: [
    ['full survey', /survey/i],
    ['installation / commissioning scope', /installation|commission/i],
    ['licensed chart entitlement', /chart|licen[cs]e/i],
  ],
  FLEET: [['SIM / data per connected device', /sim|data|cellular|connectiv/i]],
};

const PRICE_VERDICTS = {
  START: {
    verdict: 'HYPOTHESIS_UNAPPROVED',
    referenceBasis: 'PRODUCT_ONLY_FIRST_YEAR_UNINSTALLED',
  },
  CRUISE: {
    verdict: 'HYPOTHESIS_UNAPPROVED',
    referenceBasis: 'PRODUCT_ONLY_FIRST_YEAR_UNINSTALLED',
  },
  SAIL: { verdict: 'FULL_BUNDLE_PRICE_NOT_ESTABLISHED', referenceBasis: null },
  PROTECT: { verdict: 'HISTORIC_PRICE_NOT_COST_JUSTIFIED', referenceBasis: null },
  COMPLETE: { verdict: 'FULL_BUNDLE_PRICE_NOT_ESTABLISHED', referenceBasis: null },
  FLEET: { verdict: 'BESPOKE_PACKAGE_NOT_ESTABLISHED', referenceBasis: null },
};
const HISTORICAL_AMOUNTS = {
  START: 499,
  CRUISE: 1399,
  SAIL: 1990,
  PROTECT: 399,
  COMPLETE: 3490,
  FLEET: null,
};

// Approved disclaimers, COMMERCIAL-BRAND-CLAIMS-POLICY.md §9, compared after
// normalisation (markdown, quotes and whitespace removed).
const DISCLAIMERS = {
  navigation: {
    en: "This product is a navigational aid. It does not replace official nautical charts, the vessel's required equipment, continuous watchkeeping or good seamanship. Responsibility for navigation always rests with the skipper.",
    es: 'Este producto es una ayuda a la navegación y no sustituye a la carta náutica oficial, al equipo reglamentario de la embarcación, a la vigilancia continuada ni al buen hacer marinero. La responsabilidad de la navegación corresponde siempre al patrón.',
  },
  ais: {
    en: 'AIS reception is receive-only: not every vessel transmits AIS. It is not a collision-avoidance system and not a transponder.',
    es: 'La recepción AIS es únicamente de escucha: no todos los buques emiten AIS. No constituye un sistema de evitación de colisiones ni un transpondedor.',
  },
  pilot: {
    en: 'The steering system is assisted and supervised: it requires continuous watchkeeping and the ability to take manual control at all times. It does not provide autonomous steering or unattended remote control.',
    es: 'El sistema de gobierno es asistido y supervisado: exige vigilancia y capacidad de toma de control manual en todo momento. No permite gobierno autónomo ni control remoto sin supervisión.',
  },
  weather: {
    en: 'Forecasts are probabilistic and may differ from actual local conditions. Source and timestamp are displayed for every data point.',
    es: 'Las previsiones son probabilísticas y pueden desviarse de las condiciones locales reales. Se muestra la fuente y la hora de cada dato.',
  },
};

const ASSET_SUFFIX_CLASS = {
  'HERO-01': 'BLOCKED_ON_IMAGE_GENERATION',
  'USE-02': 'BLOCKED_ON_IMAGE_GENERATION',
  'INS-06': 'BLOCKED_ON_IMAGE_GENERATION',
  'TMB-08': 'BLOCKED_ON_IMAGE_GENERATION',
  'OVR-03': 'CONCEPT_REUSED_MC04_VECTOR',
  'EDN-04': 'CONCEPT_REUSED_MC04_VECTOR',
  'ECO-05': 'CONCEPT_REUSED_MC04_VECTOR',
  'TEC-10': 'CONCEPT_REUSED_MC04_VECTOR',
  'OG-09': 'CONCEPT_REUSED_MC04_VECTOR',
  'MOB-07': 'AUTHORED_SPECIFICATION_PLANNED',
};
const ASSET_PREFIX = {
  START: 'START',
  CRUISE: 'CRUISE',
  SAIL: 'SAIL',
  PROTECT: 'PROTECT',
  COMPLETE: 'COMPLETE',
  FLEET: 'FLEETPKG',
};
const REQUIRED_ENTITLEMENTS = {
  NAV_PRO_SUBSCRIPTION: ['START', 'SAIL', 'COMPLETE'],
  NAV_ESSENTIAL_SUBSCRIPTION: ['CRUISE'],
  WATCH_MONITORING_SUBSCRIPTION: ['PROTECT', 'COMPLETE'],
  FLEET_SAAS_SUBSCRIPTION: ['FLEET'],
  CHART_DATA_LICENCE: ['START', 'CRUISE', 'SAIL', 'COMPLETE'],
};

// --- Generic helpers -------------------------------------------------------

const isRecord = (value) => Boolean(value) && typeof value === 'object' && !Array.isArray(value);
const isString = (value) => typeof value === 'string' && value.trim().length > 0;
const asArray = (value) => (Array.isArray(value) ? value : []);
const toSet = (value) => new Set(asArray(value));

const sameFlatObject = (expected, actual) => {
  if (!isRecord(actual)) return false;
  const expectedKeys = Object.keys(expected);
  if (Object.keys(actual).length !== expectedKeys.length) return false;
  return expectedKeys.every((key) => actual[key] === expected[key]);
};

const normalizeText = (value) =>
  String(value)
    .replace(/[«»“”"'’`*_]/g, ' ')
    .replace(/[—–]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

const normalizeStatus = (value) => {
  const text = String(value)
    .replace(/[`*_]/g, '')
    .replace(/[—–]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
    .toUpperCase();
  if (text.startsWith('UNKNOWN')) return 'UNKNOWN_NOT_TESTED';
  if (text.startsWith('BLOCKED')) return 'BLOCKED';
  return text.replace(/\s+/g, '_');
};

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
const jsonMode = process.argv.includes('--json');

// --- Load the scoped files -------------------------------------------------

const SCOPED_FILES = [
  CONTRACT_PATH,
  ...Object.values(SPEC_PATHS),
  ...BUNDLE_IDS.flatMap((id) => [COPY_PATHS[id].es, COPY_PATHS[id].en]),
  ASSET_DOC,
  PRICING_DOC,
  ENTITLEMENTS_DOC,
  INSTALLATION_DOC,
  JOURNEYS_DOC,
  COMPARISON_DOC,
  ARCHITECTURE_DOC,
  COMPOSITION_DOC,
  CONFIG_RULES_DOC,
  ...REGISTRY_CONTRACTS,
  ...COMPATIBILITY_DOCS,
  EDITIONS_AUTHORITY,
  `${PRODUCTS_DIR}README.md`,
  `${PRODUCTS_DIR}PRODUCT-EDITIONS-NAV-HUB-AIS.md`,
  `${PRODUCTS_DIR}PRODUCT-EDITIONS-DISPLAY-WEATHER-FLEET.md`,
  `${PRODUCTS_DIR}PRODUCT-PRICING-AND-CHANNEL-MODEL.md`,
  `${PRODUCTS_DIR}PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-02.md`,
  `${PRODUCTS_DIR}PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-03.md`,
  'docs/marea/execution/DECISION-LOG.md',
  'docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md',
];

const texts = new Map();
for (const relativePath of SCOPED_FILES) {
  try {
    const absolute = resolve(root, relativePath);
    if (!existsSync(absolute) || !statSync(absolute).isFile()) continue;
    texts.set(relativePath, readFileSync(absolute, 'utf8'));
  } catch {
    // A unreadable file is reported by the checks that need it.
  }
}
const textOf = (relativePath) => texts.get(relativePath) ?? null;

const parseJson = (relativePath) => {
  const text = textOf(relativePath);
  if (text === null) return { value: null, error: 'is missing' };
  try {
    const value = JSON.parse(text);
    if (!isRecord(value)) return { value: null, error: 'is not a JSON object' };
    return { value, error: null };
  } catch (error) {
    return { value: null, error: `cannot be parsed as JSON (${error.message})` };
  }
};

const contractEntry = parseJson(CONTRACT_PATH);
const contract = contractEntry.value;

// --- Product registry (built ONLY from the nine-product contracts) ----------

const registry = {
  families: new Map(),
  editionOwner: new Map(),
  kitModules: new Map(),
  productCount: 0,
  contractErrors: [],
  editionCount: 0,
};

for (const relativePath of REGISTRY_CONTRACTS) {
  const entry = parseJson(relativePath);
  if (entry.error) {
    registry.contractErrors.push(`${relativePath} ${entry.error}`);
    continue;
  }
  for (const product of asArray(entry.value.products)) {
    if (!isRecord(product) || !isString(product.id)) continue;
    registry.productCount += 1;
    if (!registry.families.has(product.id)) {
      registry.families.set(product.id, { id: product.id, editions: new Set(), kits: new Set() });
    }
    const family = registry.families.get(product.id);
    for (const edition of asArray(product.editions)) {
      if (isString(edition)) {
        family.editions.add(edition);
        registry.editionOwner.set(edition, product.id);
        registry.editionCount += 1;
      } else if (isRecord(edition) && (isString(edition.id) || isString(edition.editionId))) {
        const editionId = edition.id ?? edition.editionId;
        family.editions.add(editionId);
        registry.editionOwner.set(editionId, product.id);
        registry.editionCount += 1;
      }
    }
    for (const kit of asArray(product.kits)) {
      if (isRecord(kit) && isString(kit.id)) {
        family.kits.add(kit.id);
        registry.kitModules.set(kit.id, asArray(kit.modules).filter(isString));
      }
    }
  }
}

const familyHasEdition = (familyId, editionId) =>
  registry.families.get(familyId)?.editions.has(editionId) ?? false;

// --- Canonical compatibility registers -------------------------------------

function parseCompatibilityRegister(relativePath) {
  const rows = new Map();
  const text = textOf(relativePath);
  if (text === null) return rows;
  for (const line of text.split(/\r?\n/)) {
    if (!line.startsWith('|')) continue;
    const cells = line.split('|').map((cell) => cell.trim());
    const first = cells[1] ?? '';
    let match = first.match(/^([ABC]-\d{2})$/);
    if (match) {
      const status = cells[cells.length - 2] ?? '';
      if (!rows.has(match[1])) rows.set(match[1], normalizeStatus(status));
      continue;
    }
    match = first.match(/^`([IN]-\d{2})`\s+`(SUPPORTED|PLANNED|CONDITIONAL|UNKNOWN|BLOCKED)`/);
    if (match && !rows.has(match[1])) rows.set(match[1], match[2]);
  }
  return rows;
}

const compatibilityRows = new Map();
for (const relativePath of COMPATIBILITY_DOCS) {
  for (const [rowId, status] of parseCompatibilityRegister(relativePath)) {
    if (!compatibilityRows.has(rowId)) compatibilityRows.set(rowId, status);
  }
}

// --- Kit authority text (editions document §3.3) ---------------------------

function parseKitAuthority() {
  const result = new Map();
  const text = textOf(EDITIONS_AUTHORITY);
  if (text === null) return result;
  const lines = text.split(/\r?\n/);
  for (let index = 0; index < lines.length; index += 1) {
    const match = lines[index].match(/\*\*`(SENSE-(?:ESSENTIALS|SAIL|SYSTEMS))`/);
    if (!match || result.has(match[1])) continue;
    for (let cursor = index; cursor < Math.min(index + 40, lines.length); cursor += 1) {
      if (!/Capabilities included\./.test(lines[cursor])) continue;
      const segment = lines.slice(cursor, cursor + 3).join(' ');
      const modules = [
        ...new Set(
          [...segment.matchAll(/SENSE-(WIND|POWER|BILGE|TANKS|ENV)/g)].map(
            (entry) => `SENSE-${entry[1]}`,
          ),
        ),
      ];
      result.set(match[1], modules);
      break;
    }
  }
  return result;
}

const kitAuthority = parseKitAuthority();

// --- Spec and copy parsers -------------------------------------------------

function parseSpecBlocks(text) {
  const blocks = [];
  let current = null;
  for (const line of text.split(/\r?\n/)) {
    const match = line.match(/^####\s+B(\d{2})\s*[—–-]\s*(.*)$/);
    if (match) {
      current = { field: `B${match[1]}`, title: match[2].trim(), lines: [] };
      blocks.push(current);
      continue;
    }
    if (/^####\s/.test(line)) current = null;
    else if (current) current.lines.push(line);
  }
  return blocks;
}

function parseCopySections(text) {
  const numbers = [];
  let disclaimerHeading = false;
  for (const line of text.split(/\r?\n/)) {
    const numbered = line.match(/^##\s+(\d+)\.\s+(.*)$/);
    if (numbered) {
      numbers.push(Number(numbered[1]));
      continue;
    }
    if (/^##\s+/.test(line) && /disclaimer|aviso/i.test(line)) disclaimerHeading = true;
  }
  return { numbers, disclaimerHeading };
}

const EXPECTED_SECTION_NUMBERS = Array.from({ length: 24 }, (_, index) => index + 1);

const copyForbidden = [
  { label: 'a currency amount', regex: /[€]|\bEUR\b|\beuros?\b/i },
  {
    label: 'a price pattern',
    regex: /\b\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{2})?\s*(?:€|EUR|euros?)\b/i,
  },
  {
    label: 'a purchase call to action',
    regex:
      /\b(buy now|add to cart|order now|shop now|purchase now|comprar ahora|añadir al carrito|haz tu pedido|realiza tu pedido|reservar ahora)\b/i,
  },
  { label: 'the ORDERABLE token', regex: /\bORDERABLE\b/ },
  { label: 'a TBD placeholder', regex: /\bTBD\b/ },
];

const GUARANTEED_DELIVERY_CLAIM = new RegExp(
  [
    /\b(?:guarantee[ds]?|guaranteed)\s+(?:immediate|instant|real-time)\s+(?:alert|alerts|notification|notifications|delivery)\b/,
    /\b(?:immediate|instant)\s+(?:alert|alerts|notification|notifications)\s+(?:are\s+)?guaranteed\b/,
    /\b(?:is|are)\s+guaranteed\s+to\s+(?:deliver|send|provide)\s+(?:immediate|instant)\s+(?:alerts?|notifications?)\b/,
    /\bgarantiz(?:a|amos|an|ado|ada|ados|adas)\s+(?:la\s+)?(?:entrega|recepci[oó]n|notificaci[oó]n|notificaciones|avisos?|alertas?)\s+(?:inmediat[ao]s?|al instante|instant[aá]ne[ao]s?)\b/,
    /\b(?:alertas?|avisos?|notificaciones?)\s+(?:inmediat[ao]s?|instant[aá]ne[ao]s?)\s+(?:y\s+)?garantiz\w*/,
  ]
    .map((pattern) => pattern.source)
    .join('|'),
  'i',
);

const claimPatterns = [
  {
    label: 'a sale/orderable state assignment',
    regex:
      /(?:commercialAvailability|availability|publicationState|lifecycleState|status|state)\s*[:=]\s*`?"?(FOR_SALE|ORDERABLE|PURCHASABLE|APPROVED|PUBLISHABLE|RELEASED)\b/i,
  },
  {
    label: 'a positive "for sale / orderable" assertion',
    // B-01/M-03: compositional subject (determiner + noun, or a pronoun), case
    // insensitive and line-start safe. The copula may only be followed by an
    // affirmative adverb, so "is not for sale" is never promoted into a failure.
    regex:
      /(?:^|[\n.;|:]\s*)(?:(?:this|the|these|those|our|that)\b[^.\n]{0,30}\b(?:bundle|bundles|package|packages|solution|solutions|product|products|family|families|offer|offers)\b[^.\n]{0,30}\b(?:is|are|has been|have been|will be)\b(?:\s+(?:now|currently|already|officially|finally))?\s+(?:for sale|orderable|purchasable|available to buy|on sale)\b|\bit\b[^.\n]{0,12}\b(?:is|are)\b(?:\s+(?:now|currently|already|officially|finally))?\s+(?:for sale|orderable|purchasable|available to buy|on sale)\b)/im,
  },
  {
    label: 'a subject-agnostic sale / orderable / purchasable token',
    // R-01 (residue of B-01): a name subject ("MAREA START is now for sale.")
    // or a modal predicate ("The bundle can be purchased today.") has no
    // determiner+noun shape, so the token itself is detected. The shared scanner
    // still evaluates it outside negation, exclusion-list and quoted contexts,
    // and skips claim enumerations such as "orderable, purchasable or publishable".
    regex:
      /(?:\b(?:is|are|was|were|be|remains?|becomes?|became|goes?|went|will\s+be|would\s+be|can\s+be|could\s+be|may\s+be|might\s+be|must\s+be|shall\s+be|has\s+become|have\s+become)\b(?:\s+(?:now|currently|already|officially|finally|still))?\s+(?:for sale|on sale|orderable|purchasable|available for purchase|offered for sale)|\b(?:can be purchased|could be purchased|may be purchased|will be purchased|goes on sale|went on sale|available for purchase|offered for sale)\b)/i,
  },
  {
    label: 'a trademark clearance granted claim',
    regex:
      /(?:trademarkLegalClearance|trademark clearance|brand clearance|MAREA clearance)\s*[:=]?\s*`?(GRANTED|CLEARED|APPROVED)\b/i,
  },
  {
    label: 'a source-IP / OPEN-MARINE rights clearance claim',
    regex:
      /(?:sourceIpClearance|source ip clearance|OPEN-MARINE[^\n.]{0,40}(?:rights|clearance)|open marine rights)\s*[:=]?\s*`?(CLEARED|GRANTED)\b/i,
  },
  {
    label: 'an invented certification claim',
    regex: /(?:certificationClaimAllowed|nmea2000Certified)\s*[:=]\s*`?true\b/i,
  },
  {
    label: 'an approved-price claim',
    regex:
      /(?:^|[\n.;|:]\s*)(?:(?:the|this|its|our)\b[^.\n]{0,20}\b(?:bundle|package|product|pricing|price)s?\b[^.\n]{0,20}\b(?:is|are|has been|have been)\b(?:\s+(?:now|currently|already|officially))?\s+(?:approved|final|launch-priced)\b|\b(?:price|pricing)\b\s+(?:is|are|has been)\s+(?:now\s+)?(?:approved|final|launch-priced)\b)/im,
  },
  {
    label: 'a positive certified-product assertion',
    regex: /\b(?:is|are|has been|have been)\s+(?:now\s+)?(?:certified|CE-marked|type-approved)\b/i,
  },
  {
    label: 'a cross-tenant access grant',
    regex: /cross-tenant[^\n.]{0,40}\b(?:allowed|granted|permitted|enabled)\b/i,
  },
  {
    label: 'a remote steering capability claim',
    regex:
      /\b(?:remote steering|remote helm|steer (?:the |your )?vessel remotely|control remoto del tim[oó]n)\b[^\n.]{0,30}\b(?:available|enabled|offered|supported)\b/i,
  },
  {
    label: 'a guaranteed / immediate alert-delivery claim',
    // B-02: strict affirmative guarantee detector, shared with BUNDLE-15 so the
    // twelve customer copy files and the specifications are scanned identically.
    regex: GUARANTEED_DELIVERY_CLAIM,
  },
];

const QUOTED_SPAN_PATTERNS = [
  /\u201c[^\u201d\n]*\u201d/g,
  /\u00ab[^\u00bb\n]*\u00bb/g,
  /"[^"\n]*"/g,
  /`[^`\n]*`/g,
];

// R-02: a quoted span is a cited example (typically a prohibition example in a
// governance document), not an assertion. Blank it while preserving the exact
// line shape so reported line numbers stay accurate.
function stripQuotedSpans(text) {
  let result = text;
  for (const pattern of QUOTED_SPAN_PATTERNS) {
    result = result.replace(pattern, (span) => span.replace(/[^\n]/g, ' '));
  }
  return result;
}

function scanClaims(relativePath, patterns) {
  const failures = [];
  const text = textOf(relativePath);
  if (text === null) return failures;
  const scanText = relativePath.endsWith('.json') ? text : stripQuotedSpans(text);
  for (const pattern of patterns) {
    const match = findAffirmative(scanText, pattern.regex);
    if (!match) continue;
    const line = scanText.slice(0, match.index).split(/\r?\n/).length;
    failures.push(`${relativePath}:${line} contains ${pattern.label} (${match[0].trim()})`);
  }
  return failures;
}

// --- Negative-context and placeholder helpers ------------------------------

const NEGATION =
  /[^.|;:\n]*\b(no|not|never|none|nobody|nothing|nor|without|cannot|can't|must not|may not|will not|shall not|won't|isn't|aren't|doesn't|don't|ning[uú]n|ninguna|nada|sin|jam[aá]s|tampoco)\b[^.|;:\n]*$/i;

const isNegatedAt = (text, index) => {
  // A quoted phrase in a governance table is a listed example, not an assertion.
  const preceding = text.slice(0, index).trimEnd();
  if (/["'`\u00ab\u201c]$/.test(preceding)) return true;
  const before = text.slice(Math.max(0, index - 90), index);
  const boundary = Math.max(
    before.lastIndexOf('.'),
    before.lastIndexOf('|'),
    before.lastIndexOf('\n'),
    before.lastIndexOf(';'),
    before.lastIndexOf(':'),
  );
  return NEGATION.test(before.slice(boundary + 1));
};

function findAffirmative(text, regex) {
  const flags = regex.flags.includes('g') ? regex.flags : `${regex.flags}g`;
  const scanner = new RegExp(regex.source, flags);
  const claimExclusionContext =
    /\b(?:expecting|expects|exclud(?:e|es|ed|ing)|not included|never|prohibit(?:ed|s)?|refus(?:e|es|ed|al)|limitation|does not|do not|without|not promised)\b/i;
  let match = scanner.exec(text);
  while (match) {
    // Only the clause before the assertion may mark it as a listed exclusion; a
    // status line elsewhere in the file cannot neutralise a later assertion. The
    // leading sentence/line boundary consumed by the pattern is not part of the
    // assertion itself, so it must not drag the previous status line into the
    // negation window.
    const boundaryPrefix = match[0].match(/^[\n.;|:]\s*/);
    const claimIndex = match.index + (boundaryPrefix ? boundaryPrefix[0].length : 0);
    const beforeMatch = text.slice(Math.max(0, claimIndex - 200), claimIndex);
    const boundary = Math.max(
      beforeMatch.lastIndexOf('.'),
      beforeMatch.lastIndexOf('\n'),
      beforeMatch.lastIndexOf('|'),
      beforeMatch.lastIndexOf(';'),
    );
    const exclusionWindow = beforeMatch.slice(boundary + 1);
    // A token inside a list of claim atoms ("orderable, purchasable or
    // publishable") is a prohibition enumeration, not an affirmation.
    const afterMatch = text.slice(
      match.index + match[0].length,
      match.index + match[0].length + 120,
    );
    const claimEnumeration =
      /^\s*[,\/]?\s*(?:or\s+|and\s+)?(?:available for purchase|can be purchased|offered for sale|goes on sale|for sale|on sale|orderable|purchasable|publishable|certified|available|supported)\b/i.test(
        afterMatch,
      );
    if (
      !isNegatedAt(text, claimIndex) &&
      !claimExclusionContext.test(exclusionWindow) &&
      !claimEnumeration
    ) {
      return match;
    }
    if (scanner.lastIndex === match.index) scanner.lastIndex += 1;
    match = scanner.exec(text);
  }
  return null;
}

function isTbdPlaceholder(text) {
  return [
    /^\s*\|\s*TBD\s*\|/m,
    /[:=]\s*TBD\s*(?:$|[.,;])/m,
    /^\s*[-*]\s*TBD\s*$/m,
    /^#{1,6}[^\n]*\bTBD\b/m,
  ].some((pattern) => pattern.test(text));
}

// --- Check framework -------------------------------------------------------

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
  if (contract) return contract;
  record.failures.push(`${CONTRACT_PATH} ${contractEntry.error ?? 'is missing'}`);
  return null;
}

const bundles = () => asArray(contract?.bundles);
const bundleOf = (id) => bundles().find((entry) => entry?.id === id) ?? null;
const allComponents = (bundle) => [
  ...asArray(bundle?.components),
  ...asArray(bundle?.optionalComponents),
];
const componentText = (bundle) =>
  allComponents(bundle)
    .map((component) =>
      [
        component.role,
        ...asArray(component.dependencies),
        ...asArray(component.releaseBlockers),
      ].join(' '),
    )
    .join(' ');
const sellableInclusions = new Set(['INCLUDED', 'OPTIONAL', 'CONDITIONAL', 'QUOTATION_REQUIRED']);

// --- BUNDLE-01: contract identity and required sections --------------------

check('BUNDLE-01', (record) => {
  const value = requireContract(record);
  if (!value) return;
  record.detail = `${value.contractId} v${value.contractVersion}`;
  const expected = {
    contractId: 'MC-08-BUNDLE-DEFINITIONS',
    status: 'INTERNAL_BUNDLE_DEFINITION_CONTRACT',
    documentType: 'BUNDLE_DEFINITION_CONTRACT',
    milestone: 'MC-08',
    date: '2026-10-30',
    owner: 'Commerce Contracts and Configuration Engineer',
    lifecycleDecision: 'D-007',
  };
  for (const [key, expectedValue] of Object.entries(expected)) {
    if (value[key] !== expectedValue) {
      record.failures.push(`contract.${key} must be ${expectedValue}, found ${value[key]}`);
    }
  }
  if (!isString(value.contractVersion)) record.failures.push('contract.contractVersion is missing');
  if (value.notACommerceCatalog !== true)
    record.failures.push('contract.notACommerceCatalog must be true');
  if (value.notAProductFamily !== true)
    record.failures.push('contract.notAProductFamily must be true');
  if (value.publicationState !== 'INTERNAL_ONLY') {
    record.failures.push('contract.publicationState must be INTERNAL_ONLY');
  }
  if (!Array.isArray(value.sourceContracts) || value.sourceContracts.length !== 3) {
    record.failures.push('contract.sourceContracts must list the three product contracts');
  } else {
    for (const relativePath of REGISTRY_CONTRACTS) {
      if (!value.sourceContracts.includes(relativePath)) {
        record.failures.push(`contract.sourceContracts is missing ${relativePath}`);
      }
    }
  }
  for (const key of REQUIRED_CONTRACT_KEYS) {
    if (!(key in value)) record.failures.push(`contract.${key} is missing`);
  }
  if (!isString(value.honestLimit) || value.honestLimit.length < 80) {
    record.failures.push('contract.honestLimit must state the validator limit');
  }
  const registration = asArray(value.priceHypothesisRegister);
  if (registration.length !== 6) {
    record.failures.push(
      `contract.priceHypothesisRegister must contain exactly six historical entries, found ${registration.length}`,
    );
  }
});

// --- BUNDLE-02: exactly six canonical bundles ------------------------------

check('BUNDLE-02', (record) => {
  if (!requireContract(record)) return;
  const entries = bundles();
  if (entries.length !== 6) {
    record.failures.push(`the contract must contain exactly six bundles, found ${entries.length}`);
  }
  const ids = entries.map((entry) => entry?.id);
  for (const expected of BUNDLE_IDS) {
    if (!ids.includes(expected)) record.failures.push(`canonical bundle ${expected} is missing`);
  }
  for (const id of ids) {
    if (!BUNDLE_IDS.includes(id)) record.failures.push(`unknown bundle id ${id}`);
  }
  for (const entry of entries) {
    const displayName = DISPLAY_NAMES[entry.id];
    if (displayName && entry.displayName !== displayName) {
      record.failures.push(`bundle ${entry.id} displayName must be ${displayName}`);
    }
    if (entry.id === 'FLEET') {
      if (entry.customerFacingName !== CUSTOMER_FACING_NAMES.FLEET) {
        record.failures.push(
          `bundle FLEET customerFacingName must be ${CUSTOMER_FACING_NAMES.FLEET}`,
        );
      }
    } else if ('customerFacingName' in entry) {
      record.failures.push(`bundle ${entry.id} must not declare customerFacingName`);
    }
    const expected = {
      definitionState: 'COMPLETE_TARGET_SPECIFICATION',
      commercialAvailability: 'NOT_FOR_SALE',
      publicationState: 'INTERNAL_ONLY',
      lifecycleState: 'DEFINED',
    };
    for (const [key, expectedValue] of Object.entries(expected)) {
      if (entry[key] !== expectedValue) {
        record.failures.push(
          `bundle ${entry.id}.${key} must be ${expectedValue}, found ${entry[key]}`,
        );
      }
    }
  }
  record.detail = `${entries.length} bundles`;
});

// --- BUNDLE-03: unique identifiers -----------------------------------------

check('BUNDLE-03', (record) => {
  if (!requireContract(record)) return;
  const register = (values, label) => {
    const seen = new Set();
    for (const value of values) {
      if (!isString(value)) {
        record.failures.push(`${label} contains an empty identifier`);
        continue;
      }
      if (seen.has(value)) record.failures.push(`${label} contains a duplicate id ${value}`);
      seen.add(value);
    }
  };
  register(
    bundles().map((entry) => entry.id),
    'bundles',
  );
  for (const entry of bundles()) {
    register(
      allComponents(entry).map((component) => component.lineId),
      `${entry.id} component lineIds`,
    );
  }
  register(
    asArray(contract.assets).map((asset) => asset.id),
    'assets',
  );
  register(
    asArray(contract.priceHypothesisRegister).map((entry) => entry.id),
    'price hypotheses',
  );
  register(
    asArray(contract.conflictRules).map((entry) => entry.id),
    'conflict rules',
  );
  register(
    asArray(contract.configurationRules).map((entry) => entry.id),
    'configuration rules',
  );
  register(
    asArray(contract.crossSellRules).map((entry) => entry.id),
    'cross-sell rules',
  );
  register(
    asArray(contract.entitlementsMatrix).map((entry) => entry.id),
    'entitlement records',
  );
  const linePattern = /^(ST|CR|SL|PR|CP|FP)-\d{2}$/;
  for (const entry of bundles()) {
    for (const component of allComponents(entry)) {
      if (!linePattern.test(component.lineId ?? '')) {
        record.failures.push(
          `bundle ${entry.id} line ${component.lineId} has an invalid lineId prefix`,
        );
      }
    }
  }
  const expectedPrefix = {
    START: 'ST-',
    CRUISE: 'CR-',
    SAIL: 'SL-',
    PROTECT: 'PR-',
    COMPLETE: 'CP-',
    FLEET: 'FP-',
  };
  for (const entry of bundles()) {
    for (const component of allComponents(entry)) {
      if (!String(component.lineId).startsWith(expectedPrefix[entry.id])) {
        record.failures.push(
          `bundle ${entry.id} line ${component.lineId} must use the ${expectedPrefix[entry.id]} prefix`,
        );
      }
    }
  }
});

// --- BUNDLE-04: vocabularies and forbidden state tokens -------------------

check('BUNDLE-04', (record) => {
  if (!requireContract(record)) return;
  const compare = (field, expected) => {
    const actual = asArray(contract[field]);
    if (
      actual.length !== expected.length ||
      actual.some((value, index) => value !== expected[index])
    ) {
      record.failures.push(
        `contract.${field} does not match the binding vocabulary (${expected.join(', ')})`,
      );
    }
  };
  compare('lifecycleVocabulary', LIFECYCLE_VOCABULARY);
  compare('evidenceClasses', EVIDENCE_CLASSES);
  compare('inclusionVocabulary', INCLUSION_VOCABULARY);
  compare('configurationOutcomes', CONFIGURATION_OUTCOMES);
  compare('notificationStates', NOTIFICATION_STATES);
  compare('notificationTimestamps', NOTIFICATION_TIMESTAMPS);
  compare('bundleReadinessStates', READINESS_STATES);
  if (asArray(contract.priceStatusVocabulary).join(',') !== PRICE_STATUS.join(',')) {
    record.failures.push(
      'contract.priceStatusVocabulary does not match the price-status vocabulary',
    );
  }
  if (asArray(contract.installationClassifications).join(',') !== INSTALL_CLASSES.join(',')) {
    record.failures.push(
      'contract.installationClassifications does not match the classification list',
    );
  }
  const vocabulary = contract.compatibilityStatusVocabulary;
  if (!isRecord(vocabulary)) {
    record.failures.push('contract.compatibilityStatusVocabulary is missing');
  } else {
    for (const batch of ['batch01', 'batch02', 'batch03']) {
      for (const value of asArray(vocabulary[batch])) {
        const allowed = [
          'SUPPORTED',
          'TESTED',
          'PLANNED',
          'CONDITIONAL',
          'UNKNOWN',
          'UNKNOWN_NOT_TESTED',
          'BLOCKED',
          'PROHIBITED',
        ];
        if (!allowed.includes(value)) {
          record.failures.push(`compatibilityStatusVocabulary.${batch} contains ${value}`);
        }
      }
    }
  }
  for (const entry of bundles()) {
    for (const outcome of asArray(entry.configurationOutcomes)) {
      if (!CONFIGURATION_OUTCOMES.includes(outcome)) {
        record.failures.push(
          `bundle ${entry.id} declares an invalid configuration outcome ${outcome}`,
        );
      }
      if (FORBIDDEN_STATES.includes(outcome)) {
        record.failures.push(`bundle ${entry.id} declares a forbidden outcome ${outcome}`);
      }
    }
    if (!READINESS_STATES.includes(entry.releaseReadiness?.state)) {
      record.failures.push(
        `bundle ${entry.id} releaseReadiness.state ${entry.releaseReadiness?.state} is not valid`,
      );
    }
    for (const field of [
      'commercialAvailability',
      'publicationState',
      'lifecycleState',
      'definitionState',
    ]) {
      if (FORBIDDEN_STATES.includes(entry[field])) {
        record.failures.push(`bundle ${entry.id}.${field} uses a sale/approval state`);
      }
    }
  }
});

// --- BUNDLE-05: product family registry from the contracts ----------------

check('BUNDLE-05', (record) => {
  if (!requireContract(record)) return;
  for (const error of registry.contractErrors) record.failures.push(error);
  if (registry.productCount !== 9) {
    record.failures.push(
      `the nine-product contracts must define exactly 9 products, found ${registry.productCount}`,
    );
  }
  const familyIds = [...registry.families.keys()].sort();
  if (familyIds.join(',') !== [...FAMILY_IDS].sort().join(',')) {
    record.failures.push(`the product-family registry does not match the nine canonical families`);
  }
  for (const entry of bundles()) {
    for (const component of allComponents(entry)) {
      if (component.familyId === null || component.familyId === undefined) continue;
      if (!registry.families.has(component.familyId)) {
        record.failures.push(
          `bundle ${entry.id} line ${component.lineId} references unknown product family ${component.familyId}`,
        );
      }
    }
  }
  record.detail = `${registry.families.size} families / ${registry.editionCount} editions from 3 contracts`;
});

// --- BUNDLE-06: edition resolution ----------------------------------------

check('BUNDLE-06', (record) => {
  if (!requireContract(record)) return;
  for (const entry of bundles()) {
    for (const component of allComponents(entry)) {
      if (component.familyId === null || component.familyId === undefined) {
        if (isString(component.editionId)) {
          record.failures.push(
            `bundle ${entry.id} line ${component.lineId} declares an edition without a product family`,
          );
        }
        continue;
      }
      const family = registry.families.get(component.familyId);
      if (!family) continue;
      if (isString(component.editionId)) {
        if (!family.editions.has(component.editionId)) {
          record.failures.push(
            `bundle ${entry.id} line ${component.lineId} edition ${component.editionId} does not exist in family ${component.familyId}`,
          );
        } else if (registry.editionOwner.get(component.editionId) !== component.familyId) {
          record.failures.push(
            `bundle ${entry.id} line ${component.lineId} moves edition ${component.editionId} to another family`,
          );
        }
      }
      for (const moduleId of asArray(component.expandsTo)) {
        if (!registry.families.has('SENSE') || !familyHasEdition('SENSE', moduleId)) {
          record.failures.push(
            `bundle ${entry.id} line ${component.lineId} expands to unknown SENSE module ${moduleId}`,
          );
        }
      }
      if (registry.kitModules.has(component.editionId)) {
        const expected = registry.kitModules.get(component.editionId);
        const declared = asArray(component.expandsTo);
        if (declared.join(',') !== expected.join(',')) {
          record.failures.push(
            `bundle ${entry.id} line ${component.lineId} kit ${component.editionId} expands to [${declared}] but the contract declares [${expected}]`,
          );
        }
      }
    }
    for (const kitId of Object.keys(EXPECTED_KITS)) {
      if (!registry.kitModules.has(kitId)) {
        record.failures.push(`product contracts do not declare the ${kitId} kit`);
      }
    }
  }
});

// --- BUNDLE-07: kit expansion against all three authorities ---------------

check('BUNDLE-07', (record) => {
  if (!requireContract(record)) return;
  const declared = contract.senseKitExpansion?.kits;
  if (!isRecord(declared)) {
    record.failures.push('contract.senseKitExpansion.kits is missing');
    return;
  }
  for (const [kitId, modules] of Object.entries(EXPECTED_KITS)) {
    const inContract = asArray(declared[kitId]);
    if (inContract.join(',') !== modules.join(',')) {
      record.failures.push(`contract.senseKitExpansion.${kitId} must be [${modules}]`);
    }
    const inRegistry = asArray(registry.kitModules.get(kitId));
    if (inRegistry.join(',') !== modules.join(',')) {
      record.failures.push(
        `product contracts declare ${kitId} as [${inRegistry}], expected [${modules}]`,
      );
    }
    const inAuthority = asArray(kitAuthority.get(kitId));
    if (inAuthority.join(',') !== modules.join(',')) {
      record.failures.push(
        `${EDITIONS_AUTHORITY} §3.3 declares ${kitId} as [${inAuthority}], expected [${modules}]`,
      );
    }
  }
  const declaredKits = Object.keys(declared).sort();
  if (declaredKits.join(',') !== Object.keys(EXPECTED_KITS).sort().join(',')) {
    record.failures.push('contract.senseKitExpansion declares an unexpected kit set');
  }
});

// --- BUNDLE-08: duplicate components and kit double-counting --------------

check('BUNDLE-08', (record) => {
  if (!requireContract(record)) return;
  for (const entry of bundles()) {
    const seen = new Map();
    for (const component of allComponents(entry)) {
      if (!isString(component.editionId)) continue;
      if (component.inclusion === 'INELIGIBLE') continue;
      const key = `${component.familyId}:${component.editionId}`;
      if (seen.has(key)) {
        record.failures.push(
          `bundle ${entry.id} counts ${component.editionId} twice (lines ${seen.get(key)} and ${component.lineId})`,
        );
      } else {
        seen.set(key, component.lineId);
      }
    }
    for (const component of allComponents(entry)) {
      if (!registry.kitModules.has(component.editionId)) continue;
      if (component.inclusion === 'INELIGIBLE') continue;
      const modules = registry.kitModules.get(component.editionId);
      for (const sibling of allComponents(entry)) {
        if (sibling === component) continue;
        if (sibling.familyId !== 'SENSE' || !modules.includes(sibling.editionId)) continue;
        if (sibling.inclusion === 'INELIGIBLE') continue;
        record.failures.push(
          `bundle ${entry.id} counts ${sibling.editionId} twice: inside kit ${component.editionId} (line ${component.lineId}) and as line ${sibling.lineId}`,
        );
      }
    }
  }
  const protect = bundleOf('PROTECT');
  if (protect) {
    const kitLine = allComponents(protect).find(
      (component) =>
        component.editionId === 'SENSE-ESSENTIALS' && component.inclusion === 'INCLUDED',
    );
    if (!kitLine) record.failures.push('PROTECT must include the SENSE-ESSENTIALS kit line');
    const modules = asArray(kitLine?.expandsTo);
    if (modules.join(',') !== 'SENSE-POWER,SENSE-BILGE') {
      record.failures.push('PROTECT SENSE-ESSENTIALS must expand to SENSE-POWER + SENSE-BILGE');
    }
    const loose = allComponents(protect).filter(
      (component) =>
        component.familyId === 'SENSE' &&
        ['SENSE-POWER', 'SENSE-BILGE'].includes(component.editionId) &&
        component.inclusion !== 'INELIGIBLE',
    );
    if (loose.length > 0) {
      record.failures.push('PROTECT counts a loose SENSE-POWER/SENSE-BILGE beside the kit');
    }
  }
});

// --- BUNDLE-09: mandatory composition and required external scope ---------

check('BUNDLE-09', (record) => {
  if (!requireContract(record)) return;
  for (const entry of bundles()) {
    const components = allComponents(entry);
    for (const [familyId, editionId, inclusion] of FIXED_REFERENCE[entry.id] ?? []) {
      const line = components.find(
        (component) => component.familyId === familyId && component.editionId === editionId,
      );
      if (!line) {
        record.failures.push(
          `bundle ${entry.id} is missing mandatory reference component ${familyId} ${editionId}`,
        );
        continue;
      }
      if (line.inclusion !== inclusion) {
        record.failures.push(
          `bundle ${entry.id} reference component ${editionId} must be ${inclusion}, found ${line.inclusion}`,
        );
      }
    }
    const scopeText = componentText(entry);
    for (const [label, regex] of REQUIRED_EXTERNAL_SCOPE[entry.id] ?? []) {
      if (!regex.test(scopeText)) {
        record.failures.push(
          `bundle ${entry.id} does not expose required external scope: ${label}`,
        );
      }
    }
  }
});

// --- BUNDLE-10: PILOT quotation semantics ---------------------------------

check('BUNDLE-10', (record) => {
  if (!requireContract(record)) return;
  for (const bundleId of ['SAIL', 'COMPLETE']) {
    const entry = bundleOf(bundleId);
    if (!entry) continue;
    const pricing = entry.pricing ?? {};
    if (pricing.fixedTurnkeyPriceApproved !== false) {
      record.failures.push(`${bundleId}.pricing.fixedTurnkeyPriceApproved must be false`);
    }
    if (pricing.pilotSurveyRequired !== true) {
      record.failures.push(`${bundleId}.pricing.pilotSurveyRequired must be true`);
    }
    if (pricing.quoteRequired !== true) {
      record.failures.push(`${bundleId}.pricing.quoteRequired must be true`);
    }
    if (pricing.totalPriceEstablished !== false) {
      record.failures.push(`${bundleId}.pricing.totalPriceEstablished must be false`);
    }
    if (pricing.verdict !== 'FULL_BUNDLE_PRICE_NOT_ESTABLISHED') {
      record.failures.push(`${bundleId}.pricing.verdict must be FULL_BUNDLE_PRICE_NOT_ESTABLISHED`);
    }
    const pilotCoastal = allComponents(entry).find(
      (component) => component.editionId === 'PILOT-COASTAL',
    );
    if (!pilotCoastal || pilotCoastal.inclusion !== 'QUOTATION_REQUIRED') {
      record.failures.push(`${bundleId} must contain PILOT-COASTAL as QUOTATION_REQUIRED`);
    }
    const pilotPro = allComponents(entry).find((component) => component.editionId === 'PILOT-PRO');
    if (!pilotPro) {
      record.failures.push(`${bundleId} must represent PILOT-PRO explicitly as INELIGIBLE`);
    } else {
      if (pilotPro.inclusion !== 'INELIGIBLE') {
        record.failures.push(
          `${bundleId} line ${pilotPro.lineId} treats PILOT-PRO as a selectable line`,
        );
      }
      if (isString(pilotPro.priceHypothesisRef)) {
        record.failures.push(
          `${bundleId} line ${pilotPro.lineId} attaches a price hypothesis to PILOT-PRO`,
        );
      }
    }
  }
  for (const entry of bundles()) {
    for (const component of allComponents(entry)) {
      if (component.editionId !== 'PILOT-PRO') continue;
      if (sellableInclusions.has(component.inclusion)) {
        record.failures.push(
          `bundle ${entry.id} line ${component.lineId} lists PILOT-PRO as ${component.inclusion}; PILOT Pro is never a retail SKU`,
        );
      }
    }
  }
  for (const entry of asArray(contract.priceHypothesisRegister)) {
    if (entry.bundleId === 'SAIL' || entry.bundleId === 'COMPLETE') {
      if (entry.status !== 'HYPOTHESIS_UNAPPROVED') {
        record.failures.push(`price hypothesis ${entry.id} must remain HYPOTHESIS_UNAPPROVED`);
      }
    }
  }
});

// --- BUNDLE-11: subscription entitlements ---------------------------------

check('BUNDLE-11', (record) => {
  if (!requireContract(record)) return;
  const matrixIds = toSet(
    asArray(contract.entitlementsMatrix)
      .map((entry) => entry.entitlementId)
      .filter(isString),
  );
  for (const entry of bundles()) {
    for (const component of allComponents(entry)) {
      if (isString(component.subscriptionEntitlement)) {
        if (!matrixIds.has(component.subscriptionEntitlement)) {
          record.failures.push(
            `bundle ${entry.id} line ${component.lineId} references undeclared entitlement ${component.subscriptionEntitlement}`,
          );
        }
      }
    }
    for (const subscription of asArray(entry.recurringSubscriptions)) {
      if (!isString(subscription.entitlement)) {
        record.failures.push(
          `bundle ${entry.id} has a recurring subscription without an entitlement id`,
        );
      } else if (!matrixIds.has(subscription.entitlement)) {
        record.failures.push(
          `bundle ${entry.id} recurring subscription ${subscription.entitlement} is not in the entitlement matrix`,
        );
      }
      if (!PRICE_STATUS.includes(subscription.status)) {
        record.failures.push(
          `bundle ${entry.id} subscription ${subscription.entitlement} has an invalid status`,
        );
      }
    }
    const watchComponents = allComponents(entry).filter(
      (component) => component.familyId === 'WATCH' && component.inclusion !== 'INELIGIBLE',
    );
    if (watchComponents.length > 0) {
      for (const component of watchComponents) {
        if (!isString(component.subscriptionEntitlement)) {
          record.failures.push(
            `bundle ${entry.id} WATCH line ${component.lineId} has no monitoring entitlement`,
          );
        }
      }
      const hasWatchSubscription = asArray(entry.recurringSubscriptions).some(
        (subscription) => subscription.entitlement === 'WATCH_MONITORING_SUBSCRIPTION',
      );
      if (!hasWatchSubscription) {
        record.failures.push(
          `bundle ${entry.id} contains WATCH but declares no WATCH_MONITORING_SUBSCRIPTION recurring entitlement`,
        );
      }
    }
  }
  const fleet = bundleOf('FLEET');
  if (fleet) {
    const hasFleetSubscription = asArray(fleet.recurringSubscriptions).some(
      (subscription) => subscription.entitlement === 'FLEET_SAAS_SUBSCRIPTION',
    );
    if (!hasFleetSubscription) {
      record.failures.push(
        'FLEET package must declare the FLEET_SAAS_SUBSCRIPTION recurring entitlement',
      );
    }
  }
  const cloud = asArray(contract.entitlementsMatrix).find(
    (entry) => entry.entitlementId === 'CLOUD_MONITORING',
  );
  if (!cloud) {
    record.failures.push('the entitlement matrix must define CLOUD_MONITORING');
  } else if (cloud.doubleBillingAllowed !== false || cloud.gatesLocalSafety !== false) {
    record.failures.push('CLOUD_MONITORING must never double-bill or gate local safety');
  }
  const isolationIds = toSet(asArray(contract.subscriptionIsolationRules).map((rule) => rule.id));
  for (const required of [
    'STEERING_NOT_GATED',
    'LOCAL_SENSING_NOT_GATED',
    'LOCAL_ALARMS_NOT_GATED',
    'PAYMENT_FAILURE_NEVER_DISABLES_LOCAL_FUNCTIONS',
    'NO_SUBSCRIPTION_FREE_CLOUD_MONITORING',
  ]) {
    if (!isolationIds.has(required)) {
      record.failures.push(`subscriptionIsolationRules is missing ${required}`);
    }
  }
});

// --- BUNDLE-12: no double billing ----------------------------------------

check('BUNDLE-12', (record) => {
  if (!requireContract(record)) return;
  for (const entry of asArray(contract.entitlementsMatrix)) {
    if (entry.doubleBillingAllowed !== false) {
      record.failures.push(`entitlement ${entry.id} must set doubleBillingAllowed=false`);
    }
    if (entry.gatesLocalSafety !== false) {
      record.failures.push(`entitlement ${entry.id} must never gate local safety`);
    }
  }
  for (const rule of asArray(contract.crossSellRules)) {
    if (rule.prohibitsDoubleCharge !== true) {
      record.failures.push(`cross-sell rule ${rule.id} must prohibit double charging`);
    }
  }
  for (const entry of bundles()) {
    const entitlements = asArray(entry.recurringSubscriptions).map(
      (subscription) => subscription.entitlement,
    );
    const seen = new Set();
    for (const entitlement of entitlements) {
      if (seen.has(entitlement)) {
        record.failures.push(`bundle ${entry.id} bills entitlement ${entitlement} twice`);
      }
      seen.add(entitlement);
    }
  }
  const navWeather = asArray(contract.entitlementsMatrix).filter((entry) =>
    ['NAV_PRO_SUBSCRIPTION', 'NAV_ESSENTIAL_SUBSCRIPTION', 'WEATHER_SUBSCRIPTION'].includes(
      entry.entitlementId,
    ),
  );
  if (navWeather.length < 3) {
    record.failures.push('the entitlement matrix must declare the NAV and WEATHER entitlements');
  }
});

// --- BUNDLE-13: DISPLAY restrictions -------------------------------------

check('BUNDLE-13', (record) => {
  if (!requireContract(record)) return;
  for (const bundleId of ['CRUISE', 'COMPLETE']) {
    const entry = bundleOf(bundleId);
    if (!entry) continue;
    const display = allComponents(entry).find((component) => component.editionId === 'DISPLAY-7');
    if (!display || display.inclusion !== 'INCLUDED') {
      record.failures.push(`${bundleId} must include DISPLAY-7 as INCLUDED`);
    }
    // m-01: the conditional large display must stay as an auditable INELIGIBLE line.
    const largeDisplay = allComponents(entry).find(
      (component) => component.editionId === 'DISPLAY-LARGE-CONDITIONAL',
    );
    if (!largeDisplay) {
      record.failures.push(
        `${bundleId} must retain the DISPLAY-LARGE-CONDITIONAL line as INELIGIBLE (auditable exclusion)`,
      );
    }
  }
  for (const entry of bundles()) {
    for (const component of allComponents(entry)) {
      if (component.editionId !== 'DISPLAY-LARGE-CONDITIONAL') continue;
      if (component.inclusion !== 'INELIGIBLE') {
        record.failures.push(
          `bundle ${entry.id} line ${component.lineId} makes DISPLAY-LARGE-CONDITIONAL selectable (${component.inclusion})`,
        );
      }
    }
  }
  const raw = textOf(CONTRACT_PATH) ?? '';
  if (/"(?:screenSizeFrozen|sizeFrozen)"\s*:\s*true/i.test(raw)) {
    record.failures.push('the contract must not declare a frozen DISPLAY size');
  }
  if (
    /(?:\d+(?:\.\d+)?\s*(?:inch|pulgadas))[^\n.]{0,40}(?:final|frozen|approved|definitiv)/i.test(
      raw,
    )
  ) {
    record.failures.push('the contract must not present a measured DISPLAY size as final');
  }
  for (const bundleId of ['CRUISE', 'COMPLETE']) {
    const specText = textOf(SPEC_PATHS[bundleId]) ?? '';
    if (
      !/SIZE_NOT_FROZEN|size[^\n.]{0,40}not frozen|tama[ñn]o[^\n.]{0,40}no (?:est[áa] )?(?:congelado|definido)/i.test(
        specText,
      )
    ) {
      record.failures.push(
        `${SPEC_PATHS[bundleId]} must state that the DISPLAY size is not frozen`,
      );
    }
  }
  record.detail = 'DISPLAY-7 only; conditional large display never selectable';
});

// --- BUNDLE-14: AIS receive-only -----------------------------------------

check('BUNDLE-14', (record) => {
  if (!requireContract(record)) return;
  if (contract.globalRestrictions.aisTransmissionOffered !== false) {
    record.failures.push('globalRestrictions.aisTransmissionOffered must be false');
  }
  let aisLines = 0;
  for (const entry of bundles()) {
    for (const component of allComponents(entry)) {
      if (component.familyId !== 'AIS') continue;
      aisLines += 1;
      if (component.receiveOnly !== true) {
        record.failures.push(
          `bundle ${entry.id} AIS line ${component.lineId} must declare receiveOnly=true`,
        );
      }
      if (component.inclusion === 'INCLUDED' || component.inclusion === 'OPTIONAL') {
        if (
          /(?:ais\s+)?(?:transmits?|transmitting)\s+(?:the\s+)?(?:vessel|position|own)|is a transponder|transponder transmits/i.test(
            String(component.role),
          )
        ) {
          record.failures.push(
            `bundle ${entry.id} AIS line ${component.lineId} describes AIS transmission`,
          );
        }
      }
    }
  }
  if (aisLines === 0) record.failures.push('no AIS line is defined; CRUISE requires AIS-RECEIVER');
  if (/"aisTransmission(?:Offered)?"\s*:\s*true/i.test(textOf(CONTRACT_PATH) ?? '')) {
    record.failures.push('the contract must not enable AIS transmission');
  }
});

// --- BUNDLE-15: WATCH connectivity and notification limits ---------------

check('BUNDLE-15', (record) => {
  if (!requireContract(record)) return;
  if (
    asArray(contract.notificationStates).join(',') !== NOTIFICATION_STATES.join(',') ||
    asArray(contract.notificationTimestamps).join(',') !== NOTIFICATION_TIMESTAMPS.join(',')
  ) {
    record.failures.push('notification states/timestamps do not match the MC-06 canonical model');
  }
  if (contract.globalRestrictions.instantAlertGuarantee !== false) {
    record.failures.push('globalRestrictions.instantAlertGuarantee must be false');
  }
  if (contract.publicationControls.instantAlertGuaranteeAllowed !== false) {
    record.failures.push('publicationControls.instantAlertGuaranteeAllowed must be false');
  }
  for (const bundleId of ['PROTECT', 'COMPLETE']) {
    const entry = bundleOf(bundleId);
    if (!entry) continue;
    const connectivity = asArray(entry.externalDataConnectivity);
    if (!connectivity.some((item) => /sim|data|cellular|connectiv/i.test(String(item.item)))) {
      record.failures.push(
        `${bundleId} must declare the external SIM/data connectivity requirement`,
      );
    }
    const hasConnectivityComponent = allComponents(entry).some((component) =>
      /sim|data plan|cellular|connectiv/i.test(String(component.role)),
    );
    if (!hasConnectivityComponent) {
      record.failures.push(`${bundleId} must expose a required-external connectivity line`);
    }
  }
  const guaranteed = GUARANTEED_DELIVERY_CLAIM;
  // B-02: specifications AND the twelve customer-facing copy files (the surface a
  // customer actually reads) are scanned for guaranteed/immediate alert delivery.
  for (const relativePath of [
    CONTRACT_PATH,
    ...Object.values(SPEC_PATHS),
    ...BUNDLE_IDS.flatMap((bundleId) => [COPY_PATHS[bundleId].es, COPY_PATHS[bundleId].en]),
  ]) {
    const text = textOf(relativePath);
    if (text && findAffirmative(text, guaranteed)) {
      record.failures.push(`${relativePath} claims guaranteed immediate alert delivery`);
    }
  }
});

// --- BUNDLE-16: FLEET package vs FLEET SaaS ------------------------------

check('BUNDLE-16', (record) => {
  if (!requireContract(record)) return;
  const fleet = bundleOf('FLEET');
  if (!fleet) return;
  const flags = {
    contractedSolution: true,
    hardwareIncludedByDefault: false,
    onboardingPricingEstablished: false,
    fixedPackagePriceEstablished: false,
  };
  for (const [key, expected] of Object.entries(flags)) {
    if (fleet[key] !== expected) {
      record.failures.push(`FLEET.${key} must be ${expected}, found ${fleet[key]}`);
    }
  }
  if (contract.globalRestrictions.hardwareIncludedByDefault !== false) {
    record.failures.push('globalRestrictions.hardwareIncludedByDefault must be false');
  }
  const fleetSubscription = asArray(fleet.recurringSubscriptions).find(
    (subscription) => subscription.entitlement === 'FLEET_SAAS_SUBSCRIPTION',
  );
  if (!fleetSubscription) {
    record.failures.push('FLEET package must declare the per-vessel SaaS subscription');
  } else if (fleetSubscription.includesHardware === true) {
    record.failures.push('the FLEET SaaS subscription must not include hardware');
  }
  for (const component of allComponents(fleet)) {
    if (component.inclusion !== 'INCLUDED') continue;
    if (['WATCH', 'HUB', 'SENSE', 'DISPLAY', 'AIS'].includes(component.familyId)) {
      record.failures.push(
        `FLEET line ${component.lineId} includes hardware by default; hardware is never included in the per-vessel fee`,
      );
    }
  }
  const familyCount = registry.families.size;
  if (familyCount !== FAMILY_IDS.length) {
    record.failures.push('the FLEET package must not introduce a tenth product family');
  }
  for (const entry of bundles()) {
    for (const component of allComponents(entry)) {
      if (component.familyId && !FAMILY_IDS.includes(component.familyId)) {
        record.failures.push(
          `bundle ${entry.id} uses a non-canonical family ${component.familyId}`,
        );
      }
    }
  }
});

// --- BUNDLE-17: tenancy boundaries --------------------------------------

check('BUNDLE-17', (record) => {
  if (!requireContract(record)) return;
  if (contract.globalRestrictions.crossTenantAccessAllowed !== false) {
    record.failures.push('globalRestrictions.crossTenantAccessAllowed must be false');
  }
  const tenancy = contract.tenancyBoundaries;
  if (!isRecord(tenancy)) {
    record.failures.push('contract.tenancyBoundaries is missing');
    return;
  }
  if (tenancy.organizationScopedTenancy !== true) {
    record.failures.push('tenancyBoundaries.organizationScopedTenancy must be true');
  }
  if (tenancy.serverSideAuthorizationRequired !== true) {
    record.failures.push('tenancyBoundaries.serverSideAuthorizationRequired must be true');
  }
  if (tenancy.crossTenantAccessAllowed !== false) {
    record.failures.push('tenancyBoundaries.crossTenantAccessAllowed must be false');
  }
  if (tenancy.defaultRole !== 'NO_ACCESS') {
    record.failures.push('tenancyBoundaries.defaultRole must be NO_ACCESS');
  }
  if (tenancy.telemetryReadOnly !== true || tenancy.remoteSteeringAllowed !== false) {
    record.failures.push('FLEET telemetry must be read-only and remote steering prohibited');
  }
  if (tenancy.slaState !== 'NO_SLA_ESTABLISHED') {
    record.failures.push('tenancyBoundaries.slaState must be NO_SLA_ESTABLISHED');
  }
  for (const relativePath of [SPEC_PATHS.FLEET, CONTRACT_PATH]) {
    const text = textOf(relativePath);
    if (text && /cross-tenant[^\n.]{0,40}\b(?:allowed|granted|permitted|enabled)\b/i.test(text)) {
      record.failures.push(`${relativePath} permits cross-tenant access`);
    }
  }
});

// --- BUNDLE-18: no remote steering path ----------------------------------

check('BUNDLE-18', (record) => {
  if (!requireContract(record)) return;
  if (contract.globalRestrictions.remoteHelmControl !== 'PROHIBITED') {
    record.failures.push('globalRestrictions.remoteHelmControl must be PROHIBITED');
  }
  if (contract.publicationControls.remoteSteeringAllowed !== false) {
    record.failures.push('publicationControls.remoteSteeringAllowed must be false');
  }
  const raw = textOf(CONTRACT_PATH) ?? '';
  const authorityFalse = /"(?:steeringAuthority|helmControl|steeringControl)"\s*:\s*true/i.test(
    raw,
  );
  if (authorityFalse) {
    record.failures.push('the contract grants steering authority to a component');
  }
  const remoteTrue =
    /"(?:remoteSteering|remoteHelm|remoteSteeringAllowed|remoteHelmControl)"\s*:\s*(?:true|"ALLOWED"|"ENABLED")/i.test(
      raw,
    );
  if (remoteTrue) record.failures.push('the contract enables a remote steering/helm path');
  for (const entry of bundles()) {
    for (const component of allComponents(entry)) {
      if (
        component.familyId === 'HUB' &&
        /steering (?:authority|control|command)/i.test(String(component.role)) &&
        !/never|not |no steering/i.test(String(component.role))
      ) {
        record.failures.push(
          `bundle ${entry.id} line ${component.lineId} gives HUB a steering role`,
        );
      }
    }
  }
  for (const relativePath of Object.values(SPEC_PATHS)) {
    const text = textOf(relativePath) ?? '';
    if (
      /(?:can|may|is able to)\s+(?:steer|control)\s+(?:the\s+)?(?:vessel|boat)\s+(?:remotely|from the (?:app|cloud|web))/i.test(
        text,
      )
    ) {
      record.failures.push(`${relativePath} claims remote vessel control`);
    }
  }
});

// --- BUNDLE-19: price classifications and historical register -------------

check('BUNDLE-19', (record) => {
  if (!requireContract(record)) return;
  const register = asArray(contract.priceHypothesisRegister);
  if (register.length !== 6)
    record.failures.push('the historical price register must contain six entries');
  for (const entry of bundles()) {
    const expected = PRICE_VERDICTS[entry.id];
    const pricing = entry.pricing ?? {};
    if (!expected) continue;
    if (pricing.verdict !== expected.verdict) {
      record.failures.push(`bundle ${entry.id} pricing.verdict must be ${expected.verdict}`);
    }
    if (expected.referenceBasis && pricing.referenceBasis !== expected.referenceBasis) {
      record.failures.push(
        `bundle ${entry.id} pricing.referenceBasis must be ${expected.referenceBasis}`,
      );
    }
    if (pricing.fixedTurnkeyPriceApproved !== false) {
      record.failures.push(`bundle ${entry.id}.pricing.fixedTurnkeyPriceApproved must be false`);
    }
    if (pricing.totalPriceEstablished !== false) {
      record.failures.push(`bundle ${entry.id}.pricing.totalPriceEstablished must be false`);
    }
    const historical = pricing.historicalHypothesis;
    if (!isRecord(historical)) {
      record.failures.push(`bundle ${entry.id}.pricing.historicalHypothesis is missing`);
      continue;
    }
    if (!PRICE_STATUS.includes(historical.status)) {
      record.failures.push(`bundle ${entry.id} historical hypothesis has an invalid price status`);
    }
    const forbidden = ['APPROVED', 'FINAL', 'LAUNCH', 'PURCHASABLE', 'FOR_SALE', 'ORDERABLE'];
    if (forbidden.includes(historical.status)) {
      record.failures.push(
        `bundle ${entry.id} historical hypothesis claims an ${historical.status} price`,
      );
    }
    if (historical.amount !== HISTORICAL_AMOUNTS[entry.id]) {
      record.failures.push(
        `bundle ${entry.id} historical amount must be ${HISTORICAL_AMOUNTS[entry.id]}, found ${historical.amount}`,
      );
    }
    if (bundleIdStatusInvalid(pricing)) {
      record.failures.push(`bundle ${entry.id} pricing contains an invalid status token`);
    }
  }
  for (const entry of register) {
    if (!BUNDLE_IDS.includes(entry.bundleId)) {
      record.failures.push(
        `price hypothesis ${entry.id} references unknown bundle ${entry.bundleId}`,
      );
    }
    if (entry.bundleId === 'FLEET') {
      if (!['NOT_ESTABLISHED', 'HYPOTHESIS_UNAPPROVED'].includes(entry.status)) {
        record.failures.push('FLEET package price hypothesis must remain NOT_ESTABLISHED');
      }
    } else if (entry.status !== 'HYPOTHESIS_UNAPPROVED') {
      record.failures.push(`price hypothesis ${entry.id} must remain HYPOTHESIS_UNAPPROVED`);
    }
    if (
      ['APPROVED', 'FINAL', 'LAUNCH', 'PURCHASABLE', 'FOR_SALE', 'ORDERABLE'].includes(entry.status)
    ) {
      record.failures.push(`price hypothesis ${entry.id} claims an approved price`);
    }
  }
  const protect = bundleOf('PROTECT');
  if (protect && protect.pricing?.finalPriceEstablished !== false) {
    record.failures.push('PROTECT must keep finalPriceEstablished=false (final price OPEN)');
  }
});

function bundleIdStatusInvalid(pricing) {
  const forbidden = ['APPROVED', 'FINAL', 'LAUNCH', 'PURCHASABLE', 'FOR_SALE', 'ORDERABLE'];
  const values = [pricing.verdict, pricing.historicalHypothesis?.status].filter(isString);
  return values.some((value) => forbidden.includes(value));
}

// --- BUNDLE-20: evidence classes and no TBD ------------------------------

check('BUNDLE-20', (record) => {
  if (!requireContract(record)) return;
  const evidenceFields = [
    ...bundles().flatMap((entry) =>
      allComponents(entry).map((component) => component.evidenceClass),
    ),
    ...bundles().flatMap((entry) => asArray(entry.evidence).map((item) => item.class)),
    ...bundles().flatMap((entry) =>
      Object.values(entry.fields ?? {}).map((field) => field?.evidenceClass),
    ),
  ];
  for (const evidenceClass of evidenceFields) {
    if (!EVIDENCE_CLASSES.includes(evidenceClass)) {
      record.failures.push(`invalid evidence class ${evidenceClass}`);
    }
  }
  for (const relativePath of SCOPED_FILES) {
    const text = textOf(relativePath);
    if (text === null) continue;
    if (isTbdPlaceholder(text)) {
      record.failures.push(`${relativePath} contains the prohibited placeholder TBD`);
    }
  }
});

// --- BUNDLE-21: readiness and configuration outcomes ---------------------

check('BUNDLE-21', (record) => {
  if (!requireContract(record)) return;
  for (const entry of bundles()) {
    const expected = ['SAIL', 'COMPLETE'].includes(entry.id) ? 'BLOCKED' : 'INTERNAL_ONLY_DEFINED';
    if (entry.releaseReadiness?.state !== expected) {
      record.failures.push(`bundle ${entry.id} releaseReadiness.state must be ${expected}`);
    }
    if (!Array.isArray(entry.releaseReadiness?.blockers)) {
      record.failures.push(`bundle ${entry.id} releaseReadiness.blockers must be an array`);
    }
    if (
      !Array.isArray(entry.releaseReadiness?.gates) ||
      entry.releaseReadiness.gates.length === 0
    ) {
      record.failures.push(`bundle ${entry.id} releaseReadiness.gates must be a non-empty array`);
    }
    if (entry.releaseReadiness.gates.includes('ORDERABLE')) {
      record.failures.push(`bundle ${entry.id} gates contain ORDERABLE`);
    }
    for (const outcome of asArray(entry.configurationOutcomes)) {
      if (!CONFIGURATION_OUTCOMES.includes(outcome)) {
        record.failures.push(`bundle ${entry.id} has an invalid configuration outcome ${outcome}`);
      }
    }
  }
});

// --- BUNDLE-22: the six 24-field bundle specifications -------------------

check('BUNDLE-22', (record) => {
  if (!requireContract(record)) return;
  let totalBlocks = 0;
  for (const bundleId of BUNDLE_IDS) {
    const relativePath = SPEC_PATHS[bundleId];
    const text = textOf(relativePath);
    if (text === null) {
      record.failures.push(`${relativePath} is missing`);
      continue;
    }
    const blocks = parseSpecBlocks(text);
    totalBlocks += blocks.length;
    if (blocks.length !== 24) {
      record.failures.push(
        `${relativePath} must contain exactly 24 B01-B24 blocks, found ${blocks.length}`,
      );
    }
    const expectedFields = Array.from(
      { length: 24 },
      (_, index) => `B${String(index + 1).padStart(2, '0')}`,
    );
    for (let index = 0; index < expectedFields.length; index += 1) {
      if (blocks[index]?.field !== expectedFields[index]) {
        record.failures.push(
          `${relativePath} block ${expectedFields[index]} is missing or out of order`,
        );
      }
    }
    for (const block of blocks) {
      const body = block.lines.join('\n');
      let previous = -1;
      for (const label of REQUIRED_LINES) {
        const position = body.indexOf(label);
        if (position === -1) {
          record.failures.push(`${relativePath} ${block.field} is missing the "${label}" line`);
          continue;
        }
        if (position < previous) {
          record.failures.push(
            `${relativePath} ${block.field} has the five labelled lines out of order`,
          );
        }
        previous = position;
      }
      if (!/(VERIFIED_REPO|VERIFIED_EXTERNAL|ASSUMPTION|HYPOTHESIS|OPEN|BLOCKED)/.test(body)) {
        record.failures.push(
          `${relativePath} ${block.field} Evidence line carries no evidence class`,
        );
      }
      const readiness = body.slice(body.indexOf('- **Release readiness.**') + 1);
      if (body.includes('- **Release readiness.**') && !readiness.includes('=')) {
        record.failures.push(
          `${relativePath} ${block.field} Release readiness line has no "dimension = value"`,
        );
      }
      if (!isString(block.title)) {
        record.failures.push(`${relativePath} ${block.field} has no title after the em dash`);
      }
    }
    if (/\bTBD\b/.test(text)) record.failures.push(`${relativePath} contains TBD`);
  }
  record.detail = `${totalBlocks} B-blocks across 6 specs`;
});

// --- BUNDLE-23: the twelve ES/EN copy files -----------------------------

check('BUNDLE-23', (record) => {
  const navigation = DISCLAIMERS.navigation;
  for (const bundleId of BUNDLE_IDS) {
    const pair = COPY_PATHS[bundleId];
    const copyText = {};
    for (const language of ['es', 'en']) {
      const relativePath = pair[language];
      const text = textOf(relativePath);
      if (text === null) {
        record.failures.push(`${relativePath} is missing`);
        continue;
      }
      copyText[language] = text;
      const parsed = parseCopySections(text);
      if (parsed.numbers.length !== 24) {
        record.failures.push(
          `${relativePath} must contain exactly 24 numbered sections, found ${parsed.numbers.length}`,
        );
      }
      if (parsed.numbers.join(',') !== EXPECTED_SECTION_NUMBERS.join(',')) {
        record.failures.push(`${relativePath} numbered sections are not exactly 1-24 in order`);
      }
      if (!parsed.disclaimerHeading) {
        record.failures.push(`${relativePath} has no unnumbered disclaimer section`);
      }
      if (!normalizeText(text).includes(normalizeText(navigation[language]))) {
        record.failures.push(`${relativePath} is missing the approved navigation disclaimer`);
      }
      // m-03: surface-based disclaimer rule. START and CRUISE are the two copy
      // surfaces that present the WEATHER forecast service, so they must carry the
      // approved weather disclaimer; SAIL/COMPLETE/FLEET present WEATHER only as a
      // separate excluded/optional product and do not present forecast data.
      if (['START', 'CRUISE'].includes(bundleId)) {
        if (!normalizeText(text).includes(normalizeText(DISCLAIMERS.weather[language]))) {
          record.failures.push(
            `${relativePath} is missing the approved weather disclaimer for a forecast surface`,
          );
        }
      }
      for (const pattern of copyForbidden) {
        const match = text.match(pattern.regex);
        if (match) {
          record.failures.push(`${relativePath} contains ${pattern.label} (${match[0].trim()})`);
        }
      }
    }
    if (copyText.es && copyText.en) {
      const esSections = parseCopySections(copyText.es).numbers;
      const enSections = parseCopySections(copyText.en).numbers;
      if (esSections.join(',') !== enSections.join(',')) {
        record.failures.push(`${bundleId} copy ES/EN section structures do not match`);
      }
      // AIS receive-only wording is required on the copy surfaces that present
      // received traffic: CRUISE and COMPLETE (and the FLEET package traffic context).
      if (['CRUISE', 'COMPLETE', 'FLEET'].includes(bundleId)) {
        for (const language of ['es', 'en']) {
          if (
            !normalizeText(copyText[language]).includes(normalizeText(DISCLAIMERS.ais[language]))
          ) {
            record.failures.push(
              `${COPY_PATHS[bundleId][language]} is missing the approved AIS disclaimer`,
            );
          }
        }
      }
      if (['SAIL', 'COMPLETE'].includes(bundleId)) {
        for (const language of ['es', 'en']) {
          if (
            !normalizeText(copyText[language]).includes(normalizeText(DISCLAIMERS.pilot[language]))
          ) {
            record.failures.push(
              `${COPY_PATHS[bundleId][language]} is missing the approved PILOT disclaimer`,
            );
          }
        }
      }
    }
  }
  record.detail = '12 ES/EN copy drafts';
});

// --- BUNDLE-24: the 60 planned assets -----------------------------------

check('BUNDLE-24', (record) => {
  if (!requireContract(record)) return;
  const assets = asArray(contract.assets);
  if (assets.length !== 60) {
    record.failures.push(`the contract must track exactly 60 assets, found ${assets.length}`);
  }
  const statuses = {
    BLOCKED_ON_IMAGE_GENERATION: 0,
    CONCEPT_REUSED_MC04_VECTOR: 0,
    AUTHORED_SPECIFICATION_PLANNED: 0,
  };
  const ids = new Set();
  for (const asset of assets) {
    if (ids.has(asset.id)) record.failures.push(`duplicate asset id ${asset.id}`);
    ids.add(asset.id);
    if (!(asset.status in statuses)) {
      record.failures.push(`asset ${asset.id} has an unknown status ${asset.status}`);
    } else {
      statuses[asset.status] += 1;
    }
    const suffix = String(asset.id).slice(String(asset.id).indexOf('-') + 1);
    if (ASSET_SUFFIX_CLASS[suffix] !== asset.status) {
      record.failures.push(`asset ${asset.id} status ${asset.status} contradicts the D16 class`);
    }
    if (!isString(asset.altText?.es) || !isString(asset.altText?.en)) {
      record.failures.push(`asset ${asset.id} is missing ES/EN alt text`);
    }
    if (asset.realProduct === true) {
      record.failures.push(`asset ${asset.id} claims to be a real product`);
    }
    if (asset.publicationState !== 'INTERNAL_ONLY') {
      record.failures.push(`asset ${asset.id} must be INTERNAL_ONLY`);
    }
  }
  const expected = {
    BLOCKED_ON_IMAGE_GENERATION: 24,
    CONCEPT_REUSED_MC04_VECTOR: 30,
    AUTHORED_SPECIFICATION_PLANNED: 6,
  };
  for (const [status, count] of Object.entries(expected)) {
    if (statuses[status] !== count) {
      record.failures.push(
        `asset class ${status} must have ${count} records, found ${statuses[status]}`,
      );
    }
  }
  for (const bundleId of BUNDLE_IDS) {
    const prefix = ASSET_PREFIX[bundleId];
    const count = assets.filter((asset) => String(asset.id).startsWith(`${prefix}-`)).length;
    if (count !== 10) {
      record.failures.push(
        `bundle ${bundleId} must track exactly 10 assets with prefix ${prefix}-`,
      );
    }
    const bundle = bundleOf(bundleId);
    for (const assetId of asArray(bundle?.content?.assetRefs)) {
      if (!ids.has(assetId)) {
        record.failures.push(`bundle ${bundleId} references undeclared asset ${assetId}`);
      }
    }
    if (asArray(bundle?.content?.assetRefs).length !== 10) {
      record.failures.push(`bundle ${bundleId} content.assetRefs must list its ten assets`);
    }
  }
  const docText = normalizeText(textOf(ASSET_DOC) ?? '');
  if (docText.length === 0) {
    record.failures.push(`${ASSET_DOC} is missing`);
  } else {
    for (const assetId of ids) {
      if (!docText.includes(assetId.toLowerCase())) {
        record.failures.push(`${ASSET_DOC} does not track asset ${assetId}`);
      }
    }
    if (!/60\s+planned\s+assets\s*=\s*24\b/.test(docText)) {
      record.failures.push(`${ASSET_DOC} must state the reconciliation 60 planned = 24 blocked`);
    }
    if (!/authored[ _-]*new/.test(docText)) {
      record.failures.push(`${ASSET_DOC} must identify the 6 authored-new assets`);
    }
    const rawDoc = textOf(ASSET_DOC) ?? '';
    const expectedPrefixes = {
      START: 'START',
      CRUISE: 'CRUISE',
      SAIL: 'SAIL',
      PROTECT: 'PROTECT',
      COMPLETE: 'COMPLETE',
      FLEET: 'FLEETPKG',
    };
    for (const [bundleId, prefix] of Object.entries(expectedPrefixes)) {
      const row = new RegExp(
        `\\|\\s*\`${prefix}\`\\s*\\|\\s*10\\s*\\|\\s*4[^|]*\\|\\s*5[^|]*\\|\\s*1[^|]*\\|`,
      );
      if (!row.test(rawDoc)) {
        record.failures.push(`${ASSET_DOC} is missing the ${bundleId} reconciliation row 10/4/5/1`);
      }
    }
  }
  record.detail = `${statuses.BLOCKED_ON_IMAGE_GENERATION} blocked + ${statuses.CONCEPT_REUSED_MC04_VECTOR} reused + ${statuses.AUTHORED_SPECIFICATION_PLANNED} authored`;
});

// --- BUNDLE-25: configuration and conflict rules -------------------------

check('BUNDLE-25', (record) => {
  if (!requireContract(record)) return;
  const conflictRules = asArray(contract.conflictRules);
  if (conflictRules.length < 20) {
    record.failures.push(`at least 20 conflict rules are required, found ${conflictRules.length}`);
  }
  for (let index = 1; index <= 20; index += 1) {
    const id = `CF-${String(index).padStart(2, '0')}`;
    if (!conflictRules.some((rule) => rule.id === id))
      record.failures.push(`conflict rule ${id} is missing`);
  }
  for (const rule of conflictRules) {
    if (!isString(rule.name) || !isString(rule.condition) || !isString(rule.message)) {
      record.failures.push(`conflict rule ${rule.id} is missing name/condition/message`);
    }
    if (!CONFIGURATION_OUTCOMES.includes(rule.outcome)) {
      record.failures.push(`conflict rule ${rule.id} has a non-canonical outcome ${rule.outcome}`);
    }
    if (
      typeof rule.structuralCheck !== 'boolean' ||
      typeof rule.behaviouralIntegrationTestLater !== 'boolean'
    ) {
      record.failures.push(
        `conflict rule ${rule.id} must classify structural and behavioural enforcement`,
      );
    }
  }
  const structural = conflictRules.filter((rule) => rule.structuralCheck === true).length;
  if (structural < 15) record.failures.push('too few conflict rules are structurally enforced');
  const configurationRules = asArray(contract.configurationRules);
  if (configurationRules.length < 10) {
    record.failures.push(
      `at least 10 configuration rules are required, found ${configurationRules.length}`,
    );
  }
  for (let index = 1; index <= 12; index += 1) {
    const id = `CFG-${String(index).padStart(2, '0')}`;
    if (!configurationRules.some((rule) => rule.id === id)) {
      record.failures.push(`configuration rule ${id} is missing`);
    }
  }
  const componentLineIds = new Set(
    bundles().flatMap((bundle) => allComponents(bundle).map((component) => component.lineId)),
  );
  for (const rule of configurationRules) {
    if (!isString(rule.name) || !isString(rule.condition)) {
      record.failures.push(`configuration rule ${rule.id} is missing name/condition`);
    }
    // m-02: configuration rules use the CFG-NN namespace; ST-/CR-/SL-/PR-/CP-/FP-
    // are component line ids and may never be reused by a rule.
    if (!/^CFG-\d{2}$/.test(rule.id)) {
      record.failures.push(
        `configuration rule ${rule.id} must use the CFG-NN namespace (CR-NN is a CRUISE line id)`,
      );
    }
    if (componentLineIds.has(rule.id)) {
      record.failures.push(`configuration rule ${rule.id} collides with a component line id`);
    }
    if (!CONFIGURATION_OUTCOMES.includes(rule.outcome)) {
      record.failures.push(
        `configuration rule ${rule.id} has a non-canonical outcome ${rule.outcome}`,
      );
    }
  }
  record.detail = `${conflictRules.length} conflict rules / ${configurationRules.length} configuration rules`;
});

// --- BUNDLE-26: publication controls, restrictions and claim scan --------

check('BUNDLE-26', (record) => {
  if (!requireContract(record)) return;
  if (contract.publicationState !== 'INTERNAL_ONLY') {
    record.failures.push('contract.publicationState must be INTERNAL_ONLY');
  }
  if (!sameFlatObject(PUBLICATION_CONTROLS, contract.publicationControls)) {
    record.failures.push('contract.publicationControls does not match the frozen MC-08 controls');
  }
  if (!sameFlatObject(GLOBAL_RESTRICTIONS, contract.globalRestrictions)) {
    record.failures.push(
      'contract.globalRestrictions does not match the frozen MC-08 restrictions',
    );
  }
  for (const entry of bundles()) {
    if (entry.publicationState !== 'INTERNAL_ONLY') {
      record.failures.push(`bundle ${entry.id}.publicationState must be INTERNAL_ONLY`);
    }
    if (entry.commercialAvailability !== 'NOT_FOR_SALE') {
      record.failures.push(`bundle ${entry.id}.commercialAvailability must be NOT_FOR_SALE`);
    }
  }
  const scanTargets = [
    CONTRACT_PATH,
    ...Object.values(SPEC_PATHS),
    ...BUNDLE_IDS.flatMap((id) => [COPY_PATHS[id].es, COPY_PATHS[id].en]),
    PRICING_DOC,
    ENTITLEMENTS_DOC,
    INSTALLATION_DOC,
    ARCHITECTURE_DOC,
    COMPOSITION_DOC,
    CONFIG_RULES_DOC,
    ASSET_DOC,
    JOURNEYS_DOC,
    COMPARISON_DOC,
  ];
  for (const relativePath of scanTargets) {
    for (const failure of scanClaims(relativePath, claimPatterns)) record.failures.push(failure);
  }
  record.detail = 'INTERNAL_ONLY / NOT_FOR_SALE';
});

// --- BUNDLE-27: source documents and decisions --------------------------

check('BUNDLE-27', (record) => {
  if (!requireContract(record)) return;
  const decisions = asArray(contract.decisions).map((decision) => decision.id);
  for (let index = 18; index <= 24; index += 1) {
    const id = `D-0${index}`;
    if (!decisions.includes(id)) record.failures.push(`the decisions array is missing ${id}`);
  }
  for (const decision of asArray(contract.decisions)) {
    if (decision.recordedBy !== 'Lead') {
      record.failures.push(`decision ${decision.id} must be recorded by the Lead`);
    }
    if (!isString(decision.title) || !isString(decision.note)) {
      record.failures.push(`decision ${decision.id} is missing a title/note`);
    }
  }
  const sourceDocuments = asArray(contract.sourceDocuments);
  for (const relativePath of sourceDocuments) {
    if (!existsSync(resolve(root, relativePath))) {
      record.failures.push(`source document ${relativePath} is missing`);
    }
  }
  for (const relativePath of Object.values(SPEC_PATHS)) {
    if (!sourceDocuments.includes(relativePath)) {
      record.failures.push(`sourceDocuments must include ${relativePath}`);
    }
  }
});

// --- BUNDLE-28: entitlement matrix and isolation -------------------------

check('BUNDLE-28', (record) => {
  if (!requireContract(record)) return;
  const matrix = asArray(contract.entitlementsMatrix);
  if (matrix.length < 8) record.failures.push('the entitlement matrix is incomplete');
  const byId = new Map(matrix.map((entry) => [entry.entitlementId, entry]));
  for (const [entitlementId, requiredBundles] of Object.entries(REQUIRED_ENTITLEMENTS)) {
    const entry = byId.get(entitlementId);
    if (!entry) {
      record.failures.push(`the entitlement matrix is missing ${entitlementId}`);
      continue;
    }
    for (const bundleId of requiredBundles) {
      if (!asArray(entry.requiredBy).includes(bundleId)) {
        record.failures.push(`entitlement ${entitlementId} must be required by ${bundleId}`);
      }
    }
    if (!PRICE_STATUS.includes(entry.status)) {
      record.failures.push(`entitlement ${entitlementId} has an invalid status`);
    }
  }
  for (const entry of matrix) {
    if (entry.gatesLocalSafety !== false) {
      record.failures.push(`entitlement ${entry.id} must never gate local safety`);
    }
    if (entry.doubleBillingAllowed !== false) {
      record.failures.push(`entitlement ${entry.id} must never allow double billing`);
    }
    if (['YEAR', 'MONTH'].includes(entry.period) && entry.includesHardware === true) {
      record.failures.push(`subscription ${entry.entitlementId} must not include hardware`);
    }
  }
  const isolation = asArray(contract.subscriptionIsolationRules);
  if (isolation.length < 4) record.failures.push('subscription isolation rules are incomplete');
  for (const rule of isolation) {
    if (!isString(rule.id) || !isString(rule.statement)) {
      record.failures.push('a subscription isolation rule is missing its id/statement');
    }
    if (
      findAffirmative(
        rule.statement,
        /(?:disables|gates|blocks)\s+(?:local steering|valid local|local alarms)/i,
      )
    ) {
      record.failures.push(
        `subscription isolation rule ${rule.id} allows gating a safety function`,
      );
    }
  }
  const raw = textOf(CONTRACT_PATH) ?? '';
  if (/"(?:gatesLocalSafety|disableLocalFunctionsOnNonpayment)"\s*:\s*true/i.test(raw)) {
    record.failures.push('the contract would disable a local safety function on non-payment');
  }
  record.detail = `${matrix.length} entitlement records`;
});

// --- BUNDLE-29: 24 field summaries and coverage -------------------------

check('BUNDLE-29', (record) => {
  if (!requireContract(record)) return;
  const model = contract.bundleFieldModel ?? {};
  if (model.count !== 24) record.failures.push('bundleFieldModel.count must be 24');
  if (asArray(model.keys).join(',') !== FIELD_KEYS.join(',')) {
    record.failures.push('bundleFieldModel.keys does not match the Lead-fixed 24 bundle keys');
  }
  if (asArray(model.titles).join('|') !== FIELD_TITLES.join('|')) {
    record.failures.push('bundleFieldModel.titles does not match the Lead-fixed 24 bundle titles');
  }
  if (
    asArray(model.requiredLines).join(',') !==
    'Definition.,Evidence.,Owner.,References.,Release readiness.'
  ) {
    record.failures.push(
      'bundleFieldModel.requiredLines must list the five required labelled lines',
    );
  }
  for (const entry of bundles()) {
    const specName = SPEC_PATHS[entry.id].split('/').pop();
    const blocks = parseSpecBlocks(textOf(SPEC_PATHS[entry.id]) ?? '').map((block) => block.field);
    const fields = entry.fields;
    if (!isRecord(fields)) {
      record.failures.push(`bundle ${entry.id}.fields is missing`);
      continue;
    }
    const keys = Object.keys(fields);
    if (keys.join(',') !== FIELD_KEYS.join(',')) {
      record.failures.push(
        `bundle ${entry.id}.fields does not expose the 24 canonical keys in order`,
      );
    }
    for (let index = 0; index < FIELD_KEYS.length; index += 1) {
      const key = FIELD_KEYS[index];
      const field = fields[key];
      const block = `B${String(index + 1).padStart(2, '0')}`;
      if (!isRecord(field)) {
        record.failures.push(`bundle ${entry.id}.fields.${key} is missing`);
        continue;
      }
      if (!isString(field.summary) || field.summary.trim().length < 40) {
        record.failures.push(`bundle ${entry.id}.fields.${key}.summary is not substantive`);
      }
      if (!EVIDENCE_CLASSES.includes(field.evidenceClass)) {
        record.failures.push(`bundle ${entry.id}.fields.${key} has an invalid evidenceClass`);
      }
      if (!isString(field.owner))
        record.failures.push(`bundle ${entry.id}.fields.${key} has no owner`);
      if (asArray(field.references).length === 0) {
        record.failures.push(`bundle ${entry.id}.fields.${key} has no references`);
      }
      const expectedSection = `${specName}#${block}`;
      if (field.specSection !== expectedSection) {
        record.failures.push(
          `bundle ${entry.id}.fields.${key}.specSection must be ${expectedSection}`,
        );
      }
      if (!blocks.includes(block)) {
        record.failures.push(`bundle ${entry.id} spec has no ${block} block for field ${key}`);
      }
    }
    const coverage = asArray(entry.fieldCoverage);
    if (coverage.length !== 24) {
      record.failures.push(`bundle ${entry.id}.fieldCoverage must contain 24 entries`);
    }
    for (let index = 0; index < coverage.length; index += 1) {
      const item = coverage[index];
      const expectedField = `B${String(index + 1).padStart(2, '0')}`;
      if (item?.field !== expectedField) {
        record.failures.push(`bundle ${entry.id}.fieldCoverage[${index}] must be ${expectedField}`);
      }
      if (item?.key !== FIELD_KEYS[index]) {
        record.failures.push(
          `bundle ${entry.id}.fieldCoverage[${index}].key must be ${FIELD_KEYS[index]}`,
        );
      }
      if (item?.specSection !== `${specName}#${expectedField}`) {
        record.failures.push(
          `bundle ${entry.id}.fieldCoverage[${index}] has the wrong specSection`,
        );
      }
      if (!isString(item?.evidenceClass)) {
        record.failures.push(`bundle ${entry.id}.fieldCoverage[${index}] has no evidenceClass`);
      }
    }
  }
});

// --- BUNDLE-30: cross-sell rules ----------------------------------------

check('BUNDLE-30', (record) => {
  if (!requireContract(record)) return;
  const rules = asArray(contract.crossSellRules);
  if (rules.length < 6) record.failures.push('at least six cross-sell rules are required');
  for (const rule of rules) {
    if (!isString(rule.id) || !isString(rule.name) || !isString(rule.message)) {
      record.failures.push(`cross-sell rule ${rule.id} is missing id/name/message`);
    }
    if (rule.prohibitsDoubleCharge !== true) {
      record.failures.push(`cross-sell rule ${rule.id} must prohibit double charging`);
    }
    for (const side of ['from', 'to']) {
      for (const bundleId of asArray(rule[side]?.bundles)) {
        if (!BUNDLE_IDS.includes(bundleId)) {
          record.failures.push(`cross-sell rule ${rule.id} references unknown bundle ${bundleId}`);
        }
      }
    }
    const serialised = JSON.stringify(rule);
    if (serialised.includes('PILOT-PRO') && !/ineligible|never|not offered/i.test(serialised)) {
      record.failures.push(
        `cross-sell rule ${rule.id} could cross-sell PILOT-PRO as a retail line`,
      );
    }
    if (
      serialised.includes('DISPLAY-LARGE-CONDITIONAL') &&
      !/ineligible|never|not offered/i.test(serialised)
    ) {
      record.failures.push(
        `cross-sell rule ${rule.id} could cross-sell the conditional large display`,
      );
    }
  }
  record.detail = `${rules.length} cross-sell rules`;
});

// --- BUNDLE-33: line-level inclusion vocabulary --------------------------

check('BUNDLE-33', (record) => {
  if (!requireContract(record)) return;
  // M-02: every component line must carry a declared inclusion value. A sale or
  // approval token may not live in the line-level field that future configurators
  // consume, even when the contract-level vocabulary is correct.
  const saleLikeKey =
    /(?:^|_)(?:forSale|orderable|purchasable|approved|publishable|saleState|saleEnabled)$/i;
  for (const entry of bundles()) {
    for (const component of allComponents(entry)) {
      if (!INCLUSION_VOCABULARY.includes(component.inclusion)) {
        record.failures.push(
          `bundle ${entry.id} line ${component.lineId} has an invalid inclusion value ${component.inclusion}`,
        );
      }
      if (FORBIDDEN_STATES.includes(component.inclusion)) {
        record.failures.push(
          `bundle ${entry.id} line ${component.lineId} carries the forbidden inclusion token ${component.inclusion}`,
        );
      }
      for (const [key, value] of Object.entries(component)) {
        if (saleLikeKey.test(key) && value !== false && value !== null) {
          record.failures.push(
            `bundle ${entry.id} line ${component.lineId} declares the sale/approval field ${key}`,
          );
        }
      }
    }
  }
  record.detail = 'every component inclusion validated against the vocabulary';
});

// --- BUNDLE-34: pinned reference composition ----------------------------

check('BUNDLE-34', (record) => {
  if (!requireContract(record)) return;
  let pinned = 0;
  for (const entry of bundles()) {
    const expectedLines = PINNED_LINES[entry.id] ?? [];
    const components = allComponents(entry);
    const pinnedIds = new Set(expectedLines.map(([lineId]) => lineId));
    // M-01: every fixed reference line must exist with exactly its pinned
    // inclusion class, including CONDITIONAL, INELIGIBLE and required-external
    // lines, so a not-selected product cannot be promoted to INCLUDED.
    for (const [lineId, familyId, editionId, inclusion] of expectedLines) {
      pinned += 1;
      const component = components.find((entryLine) => entryLine.lineId === lineId);
      if (!component) {
        record.failures.push(`bundle ${entry.id} is missing pinned reference line ${lineId}`);
        continue;
      }
      if ((component.familyId ?? null) !== familyId) {
        record.failures.push(
          `bundle ${entry.id} line ${lineId} family must be ${familyId}, found ${component.familyId}`,
        );
      }
      if ((component.editionId ?? null) !== editionId) {
        record.failures.push(
          `bundle ${entry.id} line ${lineId} edition must be ${editionId}, found ${component.editionId}`,
        );
      }
      if (component.inclusion !== inclusion) {
        record.failures.push(
          `bundle ${entry.id} line ${lineId} inclusion must be ${inclusion}, found ${component.inclusion}`,
        );
      }
    }
    // M-01: an extra INCLUDED line is a hidden mandatory purchase; unpinned lines
    // of any class are not part of the fixed reference composition.
    for (const component of components) {
      if (component.inclusion === 'INCLUDED' && !pinnedIds.has(component.lineId)) {
        record.failures.push(
          `bundle ${entry.id} line ${component.lineId} is INCLUDED but not in the fixed reference composition`,
        );
      }
      if (!pinnedIds.has(component.lineId)) {
        record.failures.push(
          `bundle ${entry.id} line ${component.lineId} is not pinned in the fixed reference composition`,
        );
      }
      if (component.inclusion === 'NOT_INCLUDED') {
        record.failures.push(
          `bundle ${entry.id} line ${component.lineId} uses NOT_INCLUDED in components[]; record it in exclusions[]`,
        );
      }
    }
  }
  record.detail = `${pinned} pinned reference lines`;
});

// --- BUNDLE-35: stale configuration-rule references ----------------------

check('BUNDLE-35', (record) => {
  // R-04/m-02: configuration rules are CFG-NN; CR-NN is a CRUISE component line
  // id. A rule-reference position that still points at CR-NN sends a reader to an
  // unrelated line, so it must fail even though legitimate CR-NN line ids remain
  // valid elsewhere in the same documents.
  const targets = [
    CONTRACT_PATH,
    CONFIG_RULES_DOC,
    ARCHITECTURE_DOC,
    COMPOSITION_DOC,
    PRICING_DOC,
    ENTITLEMENTS_DOC,
    INSTALLATION_DOC,
    ASSET_DOC,
    JOURNEYS_DOC,
    COMPARISON_DOC,
    ...Object.values(SPEC_PATHS),
  ];
  const patterns = [
    /(?:rule|regla)\s*[`"'\u00ab]?\s*(CR-\d{2})\b/gi,
    /(?:rule|regla)[^.\n]{0,30}(CR-\d{2})\b/gi,
    /§\s*[\d.]+\s*\([^)\n]{0,40}\b(CR-\d{2})\b/gi,
  ];
  let references = 0;
  for (const relativePath of targets) {
    const text = textOf(relativePath);
    if (text === null) continue;
    for (const pattern of patterns) {
      const scanner = new RegExp(pattern.source, pattern.flags);
      let match = scanner.exec(text);
      while (match) {
        references += 1;
        const line = text.slice(0, match.index).split(/\r?\n/).length;
        record.failures.push(
          `${relativePath}:${line} references the configuration rule ${match[1]} with the CR-NN line-id prefix; configuration rules use CFG-NN`,
        );
        match = scanner.exec(text);
      }
    }
  }
  record.detail = `${references} CR-NN rule reference(s) found`;
});

// --- BUNDLE-31: compatibility statuses against canonical registers -------

check('BUNDLE-31', (record) => {
  if (!requireContract(record)) return;
  let supported = 0;
  let citations = 0;
  for (const entry of bundles()) {
    for (const component of allComponents(entry)) {
      const compatibility = component.compatibility ?? {};
      if (compatibility.deviceTestRecorded === true) {
        record.failures.push(
          `bundle ${entry.id} line ${component.lineId} claims a device test record that does not exist`,
        );
      }
      if (compatibility.status === 'SUPPORTED' || compatibility.status === 'TESTED') {
        supported += 1;
        if (compatibility.deviceTestRecorded !== true) {
          record.failures.push(
            `bundle ${entry.id} line ${component.lineId} calls compatibility ${compatibility.status} without a device test record`,
          );
        }
      }
      if (!isString(compatibility.integrationId)) {
        const needsRow =
          isString(component.familyId) &&
          component.familyId !== 'FLEET' &&
          ['INCLUDED', 'OPTIONAL', 'CONDITIONAL'].includes(component.inclusion);
        if (needsRow) {
          record.failures.push(
            `bundle ${entry.id} line ${component.lineId} has no compatibility row id for a sellable product line`,
          );
        }
        continue;
      }
      citations += 1;
      const canonical = compatibilityRows.get(compatibility.integrationId);
      if (!canonical) {
        record.failures.push(
          `bundle ${entry.id} line ${component.lineId} cites unknown compatibility row ${compatibility.integrationId}`,
        );
        continue;
      }
      if (canonical !== compatibility.status) {
        record.failures.push(
          `bundle ${entry.id} line ${component.lineId} reports ${compatibility.status} but ${compatibility.integrationId} is ${canonical}`,
        );
      }
      if (!PRICE_STATUS.includes(component.priceStatus)) {
        record.failures.push(
          `bundle ${entry.id} line ${component.lineId} has an invalid priceStatus`,
        );
      }
      if (!INSTALL_CLASSES.includes(component.installationClassification)) {
        record.failures.push(
          `bundle ${entry.id} line ${component.lineId} has an invalid installationClassification`,
        );
      }
    }
  }
  if (supported > 0) {
    record.failures.push('no bundle may cite a SUPPORTED/TESTED compatibility row in MC-08');
  }
  if (citations === 0) record.failures.push('no component cites a canonical compatibility row');
  const registerSupported = [...compatibilityRows.values()].filter(
    (status) => status === 'SUPPORTED' || status === 'TESTED',
  ).length;
  if (registerSupported > 0) {
    record.failures.push(
      `the canonical compatibility registers must contain zero SUPPORTED/TESTED rows, found ${registerSupported}`,
    );
  }
  record.detail = `${citations} canonical row citations / 0 supported`;
});

// --- BUNDLE-32: no sale/approval/clearance claims in scoped docs ---------

check('BUNDLE-32', (record) => {
  const scanTargets = [
    CONFIG_RULES_DOC,
    ARCHITECTURE_DOC,
    COMPOSITION_DOC,
    PRICING_DOC,
    ENTITLEMENTS_DOC,
    INSTALLATION_DOC,
    ASSET_DOC,
    JOURNEYS_DOC,
    COMPARISON_DOC,
    ...Object.values(SPEC_PATHS),
  ];
  for (const relativePath of scanTargets) {
    for (const failure of scanClaims(relativePath, claimPatterns)) record.failures.push(failure);
  }
  record.detail = 'no sale/approval/clearance claim found';
});

// --- Compatibility row totals (evidence for BUNDLE-31) --------------------

const registerTotals = {
  batch01: 0,
  batch02: 0,
  batch03: 0,
};
for (const relativePath of COMPATIBILITY_DOCS) {
  const rows = parseCompatibilityRegister(relativePath).size;
  if (relativePath.includes('NAV-HUB-AIS')) registerTotals.batch01 = rows;
  else if (relativePath.includes('PILOT-SENSE-WATCH')) registerTotals.batch02 = rows;
  else registerTotals.batch03 = rows;
}

// --- Report ---------------------------------------------------------------

const failed = checks.filter((entry) => entry.failures.length > 0);
const passed = checks.length - failed.length;
const presentScopedFiles = SCOPED_FILES.filter((file) => texts.has(file));
const result = {
  contract: contract
    ? {
        id: contract.contractId,
        version: contract.contractVersion,
        documentType: contract.documentType,
        bundles: bundles().map((entry) => entry.id),
      }
    : null,
  registry: {
    products: registry.productCount,
    families: [...registry.families.keys()].sort(),
    editions: registry.editionCount,
    kits: [...registry.kitModules.keys()].sort(),
  },
  compatibilityRows: registerTotals,
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
    presentFiles: presentScopedFiles.length,
    assets: asArray(contract?.assets).length,
    bundles: bundles().length,
    specs: BUNDLE_IDS.filter((id) => texts.has(SPEC_PATHS[id])).length,
    copyFiles: BUNDLE_IDS.flatMap((id) => [COPY_PATHS[id].es, COPY_PATHS[id].en]).filter((file) =>
      texts.has(file),
    ).length,
  },
  result: failed.length === 0 ? 'PASS' : 'FAIL',
};

if (jsonMode) {
  console.log(JSON.stringify(result, null, 2));
} else {
  const version = contract
    ? `${contract.contractId} v${contract.contractVersion}`
    : 'contract missing';
  console.log(`MAREA bundle-governance validator — MC-08 (${version})`);
  console.log(`Contract: ${CONTRACT_PATH}`);
  console.log(`Root: ${displayPath(root)}`);
  console.log(
    `Registry: ${registry.productCount} products, ${registry.families.size} families, ${registry.editionCount} editions, ${registry.kitModules.size} kits (from the nine-product contracts)`,
  );
  console.log(
    `Canonical compatibility rows: ${registerTotals.batch01} batch-01, ${registerTotals.batch02} batch-02, ${registerTotals.batch03} batch-03 — 0 SUPPORTED/TESTED`,
  );
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
    `Summary: ${checks.length} checks run, ${passed} passed, ${failed.length} failed; ${presentScopedFiles.length} of ${SCOPED_FILES.length} scoped files read; ${asArray(contract?.assets).length} assets; ${bundles().length} bundles.`,
  );
  console.log(failed.length === 0 ? 'RESULT: PASS' : 'RESULT: FAIL');
}

process.exitCode = failed.length === 0 ? 0 : 1;
