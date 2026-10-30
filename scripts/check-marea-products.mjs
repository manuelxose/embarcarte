#!/usr/bin/env node
import { existsSync, readFileSync, statSync } from 'node:fs';
import { dirname, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Deterministic product-governance validator for the MAREA product batches MC-05
 * and MC-06.
 *
 * It validates the two machine-readable product-definition contracts
 * (`product-definitions.batch-01.json`, `product-definitions.batch-02.json`) and
 * scans ONLY the scoped product deliverables listed in BATCHES: the six dossiers,
 * the two edition comparisons, the two compatibility documents, the two pricing
 * documents, the two asset requirement documents, the two customer-journey
 * documents, the batch-02 safety/calibration/alert-delivery documents, the twelve
 * customer-facing copy drafts and the two JSON contracts. It never scans src/,
 * never docs/marea/brand/ (owned by scripts/check-brand.mjs), never the whole
 * repository, makes no network request and adds no dependency. Plain node,
 * offline, Windows/Linux.
 *
 * The governing conventions are docs/marea/products/README.md (§1–§11 for batch 01,
 * §12–§23 for batch 02), the brand contract
 * docs/marea/brand/brand-identity.contract.json (canonical names, forbidden family
 * names) and the approved disclaimers in
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
const MC02_REGISTER = 'docs/marea/compliance/MC-02-BLOCKERS-AND-DECISIONS.md';

// --- Shared vocabulary ------------------------------------------------------

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

const EVIDENCE_CLASSES = [
  'VERIFIED_REPO',
  'VERIFIED_EXTERNAL',
  'ASSUMPTION',
  'HYPOTHESIS',
  'OPEN',
  'BLOCKED',
];

// The MC-05 legal/commercial global restrictions (README §1).
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

// Batch-02 additions (README §16, §20) — every one is a prohibition, not a value.
const BATCH02_GLOBAL_RESTRICTIONS = {
  ...GLOBAL_RESTRICTIONS,
  remoteHelmControl: 'PROHIBITED',
  instantAlertGuarantee: false,
  sensorAccuracyClaimed: false,
  ipRatingClaimed: false,
};

// Batch-03 additions (MC-07 brief §0, §10, §11, §12, §14). Every entry states a
// restriction that must remain truthfully open; none is a granted right.
const BATCH03_GLOBAL_RESTRICTIONS = {
  ...GLOBAL_RESTRICTIONS,
  remoteHelmControl: 'PROHIBITED',
  remoteSteeringOffered: false,
  dataProviderRightsGranted: false,
  forecastAccuracyClaimed: false,
  redistributionAllowed: false,
  offlineDataAllowed: false,
  navDoubleBillingAllowed: false,
  crossTenantAccessAllowed: false,
  securityCertificationClaimed: false,
  slaEstablished: false,
  hardwareMeasured: false,
  customerProductionDataUsed: false,
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

const HARDWARE_SPECIFIC_DIMENSION_VALUES = [
  'NOT_SELECTED',
  'DESIGN_IN_PROGRESS',
  'PROTOTYPED',
  'CERTIFIED',
];

const LIFECYCLE_FORBIDDEN_FOR_BATCH02 = ['RELEASED', 'FOR_SALE', 'APPROVED', 'PUBLISHABLE'];

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
  pilotSteering: {
    en: 'The steering system is assisted and supervised: it requires continuous watchkeeping and the ability to take manual control at all times. It does not provide autonomous steering or unattended remote control.',
    es: 'El sistema de gobierno es asistido y supervisado: exige vigilancia y capacidad de toma de control manual en todo momento. No permite gobierno autónomo ni control remoto sin supervisión.',
  },
  weatherForecast: {
    en: 'Forecasts are probabilistic and may differ from actual local conditions. Source and timestamp are displayed for every data point.',
    es: 'Las previsiones son probabilísticas y pueden desviarse de las condiciones locales reales. Se muestra la fuente y la hora de cada dato.',
  },
};

// Batch-02 limitation statements, README §16 rule 8 (verbatim, ES and EN).
const BATCH02_LIMITATION_STATEMENTS = {
  senseLimitation: {
    en: "Readings are only valid within each module's verified range and calibration. An uncalibrated, stale or out-of-range value is not presented as a reliable measurement.",
    es: 'Las lecturas solo son válidas dentro del rango y la calibración verificados de cada módulo. Un valor sin calibrar, caducado o fuera de rango no se presenta como una medición fiable.',
  },
  watchLimitation: {
    en: 'Remote alerts depend on power, network coverage and delivery by the notification provider. Immediate receipt is not guaranteed and they are not a certified distress service.',
    es: 'Los avisos remotos dependen de la alimentación, de la cobertura de red y de la entrega por parte del proveedor de notificaciones. No se garantiza la recepción inmediata y no constituyen un servicio de socorro certificado.',
  },
};

// Batch-03 additional limitation statements, MC-07 brief §17.2 (internal draft
// wording, verbatim in the dossier disclaimers section and both product copy files).
const BATCH03_LIMITATION_STATEMENTS = {
  displayLimitation: {
    en: 'The display is an internal concept: no manufactured unit exists and its size, brightness, sunlight legibility and environmental resistance have not been verified. Charts and data services are licensed separately.',
    es: 'La pantalla es un concepto interno: no existe una unidad fabricada ni se han verificado tamaño, brillo, legibilidad solar ni resistencia ambiental. Las cartas y los servicios de datos se licencian por separado.',
  },
  weatherLimitation: {
    en: 'Coverage depends on licensed providers and forecast accuracy is not guaranteed. A stale or unavailable forecast is never presented as current.',
    es: 'La cobertura depende de proveedores con licencia y no se garantiza la exactitud de la previsión. Una previsión caducada o no disponible nunca se presenta como actual.',
  },
  fleetLimitation: {
    en: 'MAREA FLEET is an internal design: no deployed multi-tenant service and no security certification exist, and no service level is guaranteed. Telemetry is read-only and never allows steering the vessel.',
    es: 'MAREA FLEET es un diseño interno: no existe un servicio multiempresa desplegado ni una certificación de seguridad, y no se garantiza ningún nivel de servicio. La telemetría es de solo lectura y nunca permite gobernar la embarcación.',
  },
};

// WATCH notification state model, README §20 — one vocabulary, no duplicate enum.
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

// 17 customer-journey stages, README §22 (MC-05 order and wording).
const JOURNEY_STAGES = [
  'Discovery',
  'Product understanding',
  'Compatibility',
  'Editions',
  'Price comprehension',
  'Purchase or quote',
  'Fulfilment',
  'Installation',
  'Activation',
  'First use',
  'Regular use',
  'Updates',
  'Support',
  'Upgrade',
  'Renewal or cancellation',
  'Ownership transfer',
  'End-of-life',
];

// D5 compatibility table columns, README §21 — exactly these, in this order.
const COMPATIBILITY_COLUMNS = [
  'Integration',
  'Required product',
  'Required edition',
  'Required accessory',
  'Required subscription',
  'Data direction',
  'Local/cloud boundary',
  'Safety boundary',
  'Current evidence',
  'Release gate',
];

const CROSS_PRODUCT_RELATIONSHIPS = [
  'PILOT ↔ NAV',
  'PILOT ↔ HUB',
  'PILOT ↔ WATCH',
  'PILOT ↔ SENSE',
  'SENSE ↔ HUB',
  'SENSE ↔ WATCH',
  'WATCH ↔ FLEET',
  'Any ↔ Subscription',
];

// Batch-02 allowed price figures, README §17. Amounts only; labels live in prose.
const BATCH02_ALLOWED_AMOUNTS = new Map([
  [1290, 'PILOT Coastal starting price'],
  [99, 'SENSE entry module starting price'],
  [299, 'WATCH Core hardware'],
  [9.9, 'WATCH Core monitoring subscription'],
]);
// Bundle figures may appear only as MC-08 ecosystem context, never as product prices.
const BATCH02_BUNDLE_AMOUNTS = new Map([
  [499, 'MAREA START'],
  [1399, 'MAREA CRUISE'],
  [1990, 'MAREA SAIL'],
  [399, 'MAREA PROTECT'],
  [3490, 'MAREA COMPLETE'],
]);

// Batch-03 frozen price hypotheses, brief §4. Amounts only; every figure is
// HYPOTHESIS_UNAPPROVED and must never be presented as a sale price.
const BATCH03_ALLOWED_AMOUNTS = new Map([
  [699, 'DISPLAY-7 starting price'],
  [49, 'WEATHER-STANDARD / FLEET-START starting price'],
  [89, 'WEATHER-PRO'],
  [79, 'FLEET-BUSINESS'],
]);
// Editions whose price is NOT_ESTABLISHED must never carry a figure (brief §4).
const BATCH03_UNPRICED_EDITIONS = ['DISPLAY-LARGE-CONDITIONAL', 'FLEET-ENTERPRISE'];

// --- Per-batch configuration -------------------------------------------------

// Batch 01 (MC-05): NAV, HUB, AIS. Behaviour and vocabulary are those that passed
// the MC-05 gate; the configuration is data only so the same code serves batch 02.
const BATCH_01 = {
  id: 1,
  milestone: 'MC-05',
  contractId: 'MC-05-PRODUCT-DEFINITIONS-BATCH-01',
  contractPath: `${PRODUCTS_DIR}product-definitions.batch-01.json`,
  label: 'MC-05 batch',
  docs: {
    dossiers: {
      NAV: `${PRODUCTS_DIR}MAREA-NAV-COMMERCIAL-SPEC.md`,
      HUB: `${PRODUCTS_DIR}MAREA-HUB-COMMERCIAL-SPEC.md`,
      AIS: `${PRODUCTS_DIR}MAREA-AIS-COMMERCIAL-SPEC.md`,
    },
    editions: `${PRODUCTS_DIR}PRODUCT-EDITIONS-NAV-HUB-AIS.md`,
    compatibility: `${PRODUCTS_DIR}PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md`,
    pricing: `${PRODUCTS_DIR}PRODUCT-PRICING-AND-CHANNEL-MODEL.md`,
    journeys: `${PRODUCTS_DIR}CUSTOMER-JOURNEYS-NAV-HUB-AIS.md`,
    assets: `${PRODUCTS_DIR}PRODUCT-ASSET-REQUIREMENTS.md`,
  },
  products: [
    {
      id: 'NAV',
      displayName: 'MAREA NAV',
      type: 'SOFTWARE',
      dossier: `${PRODUCTS_DIR}MAREA-NAV-COMMERCIAL-SPEC.md`,
      copy: { es: `${PRODUCTS_DIR}copy/nav.es.md`, en: `${PRODUCTS_DIR}copy/nav.en.md` },
      requiredReadiness: {
        definition: 'COMPLETE_TARGET_SPECIFICATION',
        engineering: 'PARTIALLY_VERIFIED',
        licensing: 'NOT_CLEARED',
        hardware: 'NOT_APPLICABLE_SOFTWARE_PRODUCT',
        dataRights: 'NOT_GRANTED',
        compliance: 'NOT_STARTED',
        pricing: 'HYPOTHESIS_UNAPPROVED',
        brandPublication: 'NOT_GRANTED',
        availability: 'NOT_FOR_SALE',
      },
      editions: [
        {
          id: 'NAV-ESSENTIAL',
          displayName: 'MAREA NAV Essential',
          amount: 99,
          period: 'YEAR',
          verdictStatus: 'DEFINED',
        },
        {
          id: 'NAV-PRO',
          displayName: 'MAREA NAV Pro',
          amount: 149,
          period: 'YEAR',
          verdictStatus: 'DEFINED',
        },
      ],
      minimumBlockers: [
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
    },
    {
      id: 'HUB',
      displayName: 'MAREA HUB',
      type: 'HARDWARE',
      dossier: `${PRODUCTS_DIR}MAREA-HUB-COMMERCIAL-SPEC.md`,
      copy: { es: `${PRODUCTS_DIR}copy/hub.es.md`, en: `${PRODUCTS_DIR}copy/hub.en.md` },
      requiredReadiness: {
        definition: 'COMPLETE_TARGET_SPECIFICATION',
        engineering: 'PARTIALLY_VERIFIED',
        licensing: 'NOT_CLEARED',
        hardware: 'NOT_SELECTED',
        dataRights: 'NOT_GRANTED',
        compliance: 'NOT_STARTED',
        pricing: 'HYPOTHESIS_UNAPPROVED',
        brandPublication: 'NOT_GRANTED',
        availability: 'NOT_FOR_SALE',
      },
      editions: [
        {
          id: 'HUB-STANDARD',
          displayName: 'MAREA HUB Standard',
          amount: 349,
          period: 'ONE_OFF',
          verdictStatus: 'DEFINED',
        },
        {
          id: 'HUB-PRO',
          displayName: 'MAREA HUB Pro',
          amount: 499,
          period: 'ONE_OFF',
          verdictStatus: 'DEFINED',
        },
      ],
      minimumBlockers: [
        'H-02',
        'H-04',
        'H-05',
        'H-06',
        'H-07',
        'H-13',
        'P-02',
        'P-10',
        'S-06',
        'X-01',
        'X-05',
      ],
    },
    {
      id: 'AIS',
      displayName: 'MAREA AIS',
      type: 'HARDWARE',
      dossier: `${PRODUCTS_DIR}MAREA-AIS-COMMERCIAL-SPEC.md`,
      copy: { es: `${PRODUCTS_DIR}copy/ais.es.md`, en: `${PRODUCTS_DIR}copy/ais.en.md` },
      requiredReadiness: {
        definition: 'COMPLETE_TARGET_SPECIFICATION',
        engineering: 'NOT_VERIFIED',
        licensing: 'NOT_CLEARED',
        hardware: 'NOT_SELECTED',
        dataRights: 'NOT_GRANTED',
        compliance: 'NOT_STARTED',
        pricing: 'HYPOTHESIS_UNAPPROVED',
        brandPublication: 'NOT_GRANTED',
        availability: 'NOT_FOR_SALE',
      },
      editions: [
        {
          id: 'AIS-RECEIVER',
          displayName: 'MAREA AIS Receiver',
          amount: 249,
          period: 'ONE_OFF',
          verdictStatus: 'DEFINED',
        },
        {
          id: 'AIS-CONNECTED',
          displayName: 'MAREA AIS Connected',
          amount: 399,
          period: 'ONE_OFF',
          verdictStatus: 'CONDITIONAL',
          verdict: 'NOT_YET_JUSTIFIED',
        },
      ],
      minimumBlockers: ['D-09', 'H-05', 'H-06', 'H-08', 'P-03', 'P-10', 'S-01', 'X-01', 'X-05'],
    },
  ],
  requiredGlobalRestrictions: GLOBAL_RESTRICTIONS,
  disclaimers: [
    { product: 'NAV', file: 'dossier', kind: 'navigation', language: 'en' },
    { product: 'NAV', file: 'copy.es', kind: 'navigation', language: 'es' },
    { product: 'NAV', file: 'copy.en', kind: 'navigation', language: 'en' },
    { product: 'HUB', file: 'dossier', kind: 'navigation', language: 'en' },
    { product: 'HUB', file: 'copy.es', kind: 'navigation', language: 'es' },
    { product: 'HUB', file: 'copy.en', kind: 'navigation', language: 'en' },
    { product: 'AIS', file: 'dossier', kind: 'aisReceiveOnly', language: 'en' },
    { product: 'AIS', file: 'copy.es', kind: 'aisReceiveOnly', language: 'es' },
    { product: 'AIS', file: 'copy.en', kind: 'aisReceiveOnly', language: 'en' },
  ],
};

// Batch 02 (MC-06): PILOT, SENSE, WATCH. Canonical identities, editions and
// verdicts: README §12, §14, §18; price hypotheses: §17.
const BATCH_02 = {
  id: 2,
  milestone: 'MC-06',
  contractId: 'MC-06-PRODUCT-DEFINITIONS-BATCH-02',
  contractPath: `${PRODUCTS_DIR}product-definitions.batch-02.json`,
  batch01Contract: `${PRODUCTS_DIR}product-definitions.batch-01.json`,
  label: 'MC-06 batch',
  docs: {
    dossiers: {
      PILOT: `${PRODUCTS_DIR}MAREA-PILOT-COMMERCIAL-SPEC.md`,
      SENSE: `${PRODUCTS_DIR}MAREA-SENSE-COMMERCIAL-SPEC.md`,
      WATCH: `${PRODUCTS_DIR}MAREA-WATCH-COMMERCIAL-SPEC.md`,
    },
    editions: `${PRODUCTS_DIR}PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md`,
    compatibility: `${PRODUCTS_DIR}PRODUCT-COMPATIBILITY-PILOT-SENSE-WATCH.md`,
    pricing: `${PRODUCTS_DIR}PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-02.md`,
    journeys: `${PRODUCTS_DIR}CUSTOMER-JOURNEYS-PILOT-SENSE-WATCH.md`,
    assets: `${PRODUCTS_DIR}PRODUCT-ASSET-REQUIREMENTS-BATCH-02.md`,
    safetyCase: `${PRODUCTS_DIR}PILOT-SAFETY-CASE-OUTLINE.md`,
    calibrationPlan: `${PRODUCTS_DIR}SENSE-MEASUREMENT-AND-CALIBRATION-PLAN.md`,
    alertDeliveryContract: `${PRODUCTS_DIR}WATCH-ALERT-DELIVERY-AND-PRIVACY-CONTRACT.md`,
  },
  products: [
    {
      id: 'PILOT',
      displayName: 'MAREA PILOT',
      type: 'HARDWARE_SOFTWARE',
      dossier: `${PRODUCTS_DIR}MAREA-PILOT-COMMERCIAL-SPEC.md`,
      copy: { es: `${PRODUCTS_DIR}copy/pilot.es.md`, en: `${PRODUCTS_DIR}copy/pilot.en.md` },
      requiredReadiness: {
        definition: 'COMPLETE_TARGET_SPECIFICATION',
        engineering: 'NOT_VERIFIED',
        licensing: 'NOT_CLEARED',
        hardware: 'NOT_SELECTED',
        dataRights: 'NOT_GRANTED',
        compliance: 'NOT_STARTED',
        pricing: 'HYPOTHESIS_UNAPPROVED',
        brandPublication: 'NOT_GRANTED',
        availability: 'NOT_FOR_SALE',
      },
      editions: [
        {
          id: 'PILOT-COASTAL',
          displayName: 'MAREA PILOT Coastal',
          priceState: 'HYPOTHESIS_UNAPPROVED',
          amount: 1290,
          period: 'ONE_OFF',
          startingPrice: true,
          notAnInclusiveQuotation: true,
          subscription: null,
          verdictStatus: 'DEFINED',
        },
        {
          id: 'PILOT-SAIL',
          displayName: 'MAREA PILOT Sail',
          priceState: 'NOT_ESTABLISHED',
          subscription: null,
          verdictStatus: 'CONDITIONAL',
        },
        {
          id: 'PILOT-PRO',
          displayName: 'MAREA PILOT Pro',
          priceState: 'NOT_ESTABLISHED',
          subscription: null,
          verdictStatus: 'INSTALLATION_PACKAGE',
        },
      ],
      minimumBlockers: [
        'H-01',
        'H-02',
        'H-03',
        'H-05',
        'H-06',
        'H-07',
        'H-10',
        'H-13',
        'P-04',
        'P-10',
        'X-01',
        'X-05',
        'X-06',
        'X-03',
      ],
    },
    {
      id: 'SENSE',
      displayName: 'MAREA SENSE',
      type: 'HARDWARE',
      dossier: `${PRODUCTS_DIR}MAREA-SENSE-COMMERCIAL-SPEC.md`,
      copy: { es: `${PRODUCTS_DIR}copy/sense.es.md`, en: `${PRODUCTS_DIR}copy/sense.en.md` },
      requiredReadiness: {
        definition: 'COMPLETE_TARGET_SPECIFICATION',
        engineering: 'PARTIALLY_VERIFIED',
        licensing: 'NOT_CLEARED',
        hardware: 'NOT_SELECTED',
        dataRights: 'NOT_GRANTED',
        compliance: 'NOT_STARTED',
        pricing: 'HYPOTHESIS_UNAPPROVED',
        brandPublication: 'NOT_GRANTED',
        availability: 'NOT_FOR_SALE',
      },
      editions: [
        {
          id: 'SENSE-WIND',
          displayName: 'MAREA SENSE Wind',
          priceState: 'NOT_ESTABLISHED',
          subscription: null,
          verdictStatus: 'DEFINED',
        },
        {
          id: 'SENSE-POWER',
          displayName: 'MAREA SENSE Power',
          priceState: 'NOT_ESTABLISHED',
          subscription: null,
          verdictStatus: 'DEFINED',
        },
        {
          id: 'SENSE-BILGE',
          displayName: 'MAREA SENSE Bilge',
          priceState: 'NOT_ESTABLISHED',
          subscription: null,
          verdictStatus: 'DEFINED',
        },
        {
          id: 'SENSE-TANKS',
          displayName: 'MAREA SENSE Tanks',
          priceState: 'NOT_ESTABLISHED',
          subscription: null,
          verdictStatus: 'DEFINED',
        },
        {
          id: 'SENSE-ENV',
          displayName: 'MAREA SENSE Environment',
          priceState: 'NOT_ESTABLISHED',
          subscription: null,
          verdictStatus: 'DEFINED',
        },
        {
          id: 'SENSE-ESSENTIALS',
          displayName: 'MAREA SENSE Essentials',
          priceState: 'NOT_ESTABLISHED',
          subscription: null,
          verdictStatus: 'DEFINED',
        },
        {
          id: 'SENSE-SAIL',
          displayName: 'MAREA SENSE Sail',
          priceState: 'NOT_ESTABLISHED',
          subscription: null,
          verdictStatus: 'CONDITIONAL',
        },
        {
          id: 'SENSE-SYSTEMS',
          displayName: 'MAREA SENSE Systems',
          priceState: 'NOT_ESTABLISHED',
          subscription: null,
          verdictStatus: 'CONDITIONAL',
        },
      ],
      minimumBlockers: [
        'H-04',
        'H-05',
        'H-06',
        'H-07',
        'H-11',
        'P-02',
        'P-05',
        'P-06',
        'P-10',
        'X-01',
        'X-05',
        'X-06',
        'X-03',
      ],
    },
    {
      id: 'WATCH',
      displayName: 'MAREA WATCH',
      type: 'HARDWARE_SERVICE',
      dossier: `${PRODUCTS_DIR}MAREA-WATCH-COMMERCIAL-SPEC.md`,
      copy: { es: `${PRODUCTS_DIR}copy/watch.es.md`, en: `${PRODUCTS_DIR}copy/watch.en.md` },
      requiredReadiness: {
        definition: 'COMPLETE_TARGET_SPECIFICATION',
        engineering: 'NOT_VERIFIED',
        licensing: 'NOT_CLEARED',
        hardware: 'NOT_SELECTED',
        dataRights: 'NOT_GRANTED',
        compliance: 'NOT_STARTED',
        pricing: 'HYPOTHESIS_UNAPPROVED',
        brandPublication: 'NOT_GRANTED',
        availability: 'NOT_FOR_SALE',
      },
      editions: [
        {
          id: 'WATCH-CORE',
          displayName: 'MAREA WATCH Core',
          priceState: 'HYPOTHESIS_UNAPPROVED',
          amount: 299,
          period: 'ONE_OFF',
          subscription: { amount: 9.9, period: 'MONTH' },
          verdictStatus: 'DEFINED',
        },
        {
          id: 'WATCH-PLUS',
          displayName: 'MAREA WATCH Plus',
          priceState: 'NOT_ESTABLISHED',
          subscription: { amount: null, period: 'MONTH' },
          verdictStatus: 'CONDITIONAL',
        },
      ],
      minimumBlockers: [
        'D-09',
        'H-05',
        'H-06',
        'H-11',
        'H-12',
        'H-13',
        'P-06',
        'P-10',
        'X-01',
        'X-05',
        'X-06',
        'X-07',
        'X-03',
      ],
    },
  ],
  requiredGlobalRestrictions: BATCH02_GLOBAL_RESTRICTIONS,
  disclaimers: [
    { product: 'PILOT', file: 'dossier', kind: 'pilotSteering', language: 'en' },
    { product: 'PILOT', file: 'dossier', kind: 'navigation', language: 'en' },
    { product: 'PILOT', file: 'copy.es', kind: 'pilotSteering', language: 'es' },
    { product: 'PILOT', file: 'copy.en', kind: 'pilotSteering', language: 'en' },
    { product: 'PILOT', file: 'copy.es', kind: 'navigation', language: 'es' },
    { product: 'PILOT', file: 'copy.en', kind: 'navigation', language: 'en' },
    { product: 'SENSE', file: 'dossier', kind: 'navigation', language: 'en' },
    { product: 'SENSE', file: 'copy.es', kind: 'navigation', language: 'es' },
    { product: 'SENSE', file: 'copy.en', kind: 'navigation', language: 'en' },
    { product: 'SENSE', file: 'copy.es', kind: 'senseLimitation', language: 'es' },
    { product: 'SENSE', file: 'copy.en', kind: 'senseLimitation', language: 'en' },
    { product: 'WATCH', file: 'dossier', kind: 'navigation', language: 'en' },
    { product: 'WATCH', file: 'copy.es', kind: 'navigation', language: 'es' },
    { product: 'WATCH', file: 'copy.en', kind: 'navigation', language: 'en' },
    { product: 'WATCH', file: 'copy.es', kind: 'watchLimitation', language: 'es' },
    { product: 'WATCH', file: 'copy.en', kind: 'watchLimitation', language: 'en' },
  ],
};

// Batch 03 (MC-07): DISPLAY, WEATHER, FLEET. Canonical identities and readiness:
// MC-07 shared brief §3 and §5; editions and price hypotheses: §4; blockers: §6;
// copy paths: §8; asset ids: §13. The configuration is data only.
const BATCH_03 = {
  id: 3,
  milestone: 'MC-07',
  contractId: 'MC-07-PRODUCT-DEFINITIONS-BATCH-03',
  contractPath: `${PRODUCTS_DIR}product-definitions.batch-03.json`,
  batch01Contract: `${PRODUCTS_DIR}product-definitions.batch-01.json`,
  batch02Contract: `${PRODUCTS_DIR}product-definitions.batch-02.json`,
  label: 'MC-07 batch',
  docs: {
    dossiers: {
      DISPLAY: `${PRODUCTS_DIR}MAREA-DISPLAY-COMMERCIAL-SPEC.md`,
      WEATHER: `${PRODUCTS_DIR}MAREA-WEATHER-COMMERCIAL-SPEC.md`,
      FLEET: `${PRODUCTS_DIR}MAREA-FLEET-COMMERCIAL-SPEC.md`,
    },
    editions: `${PRODUCTS_DIR}PRODUCT-EDITIONS-DISPLAY-WEATHER-FLEET.md`,
    compatibility: `${PRODUCTS_DIR}PRODUCT-COMPATIBILITY-DISPLAY-WEATHER-FLEET.md`,
    pricing: `${PRODUCTS_DIR}PRODUCT-PRICING-AND-CHANNEL-MODEL-BATCH-03.md`,
    journeys: `${PRODUCTS_DIR}CUSTOMER-JOURNEYS-DISPLAY-WEATHER-FLEET.md`,
    assets: `${PRODUCTS_DIR}PRODUCT-ASSET-REQUIREMENTS-BATCH-03.md`,
    annexes: {
      displayHardware: `${PRODUCTS_DIR}DISPLAY-HARDWARE-AND-INTERACTION-REQUIREMENTS.md`,
      weatherDataRights: `${PRODUCTS_DIR}WEATHER-DATA-RIGHTS-AND-FORECAST-CONTRACT.md`,
      fleetTenancy: `${PRODUCTS_DIR}FLEET-TENANCY-SECURITY-AND-DATA-GOVERNANCE.md`,
    },
  },
  products: [
    {
      id: 'DISPLAY',
      displayName: 'MAREA DISPLAY',
      type: 'HARDWARE_SOFTWARE',
      dossier: `${PRODUCTS_DIR}MAREA-DISPLAY-COMMERCIAL-SPEC.md`,
      copy: { es: `${PRODUCTS_DIR}copy/display.es.md`, en: `${PRODUCTS_DIR}copy/display.en.md` },
      requiredReadiness: {
        definition: 'COMPLETE_TARGET_SPECIFICATION',
        engineering: 'NOT_VERIFIED',
        licensing: 'NOT_CLEARED',
        hardware: 'NOT_SELECTED',
        dataRights: 'NOT_GRANTED',
        compliance: 'NOT_STARTED',
        pricing: 'HYPOTHESIS_UNAPPROVED',
        brandPublication: 'NOT_GRANTED',
        availability: 'NOT_FOR_SALE',
      },
      editions: [
        {
          id: 'DISPLAY-7',
          displayName: 'MAREA DISPLAY 7',
          priceState: 'HYPOTHESIS_UNAPPROVED',
          amount: 699,
          period: 'ONE_OFF',
          startingPrice: true,
          notAnInclusiveQuotation: true,
          subscription: null,
          verdictStatus: 'DEFINED',
        },
        {
          id: 'DISPLAY-LARGE-CONDITIONAL',
          displayName: 'MAREA DISPLAY Large (conditional)',
          priceState: 'NOT_ESTABLISHED',
          subscription: null,
          verdictStatus: 'CONDITIONAL',
        },
      ],
      minimumBlockers: [
        'H-04',
        'H-05',
        'H-06',
        'H-11',
        'H-13',
        'D-01',
        'D-05',
        'D-06',
        'D-10',
        'P-07',
        'P-10',
        'X-01',
        'X-03',
        'X-05',
        'X-06',
        'X-07',
      ],
    },
    {
      id: 'WEATHER',
      displayName: 'MAREA WEATHER',
      type: 'SOFTWARE',
      dossier: `${PRODUCTS_DIR}MAREA-WEATHER-COMMERCIAL-SPEC.md`,
      copy: { es: `${PRODUCTS_DIR}copy/weather.es.md`, en: `${PRODUCTS_DIR}copy/weather.en.md` },
      requiredReadiness: {
        definition: 'COMPLETE_TARGET_SPECIFICATION',
        engineering: 'NOT_VERIFIED',
        licensing: 'NOT_CLEARED',
        hardware: 'NOT_APPLICABLE_SOFTWARE_PRODUCT',
        dataRights: 'NOT_GRANTED',
        compliance: 'NOT_STARTED',
        pricing: 'HYPOTHESIS_UNAPPROVED',
        brandPublication: 'NOT_GRANTED',
        availability: 'NOT_FOR_SALE',
      },
      editions: [
        {
          id: 'WEATHER-STANDARD',
          displayName: 'MAREA WEATHER Standard',
          priceState: 'HYPOTHESIS_UNAPPROVED',
          amount: 49,
          period: 'YEAR',
          startingPrice: true,
          subscription: null,
          verdictStatus: 'DEFINED',
        },
        {
          id: 'WEATHER-PRO',
          displayName: 'MAREA WEATHER Pro',
          priceState: 'HYPOTHESIS_UNAPPROVED',
          amount: 89,
          period: 'YEAR',
          subscription: null,
          verdictStatus: 'CONDITIONAL',
        },
      ],
      minimumBlockers: [
        'D-04',
        'D-05',
        'D-07',
        'D-09',
        'D-10',
        'P-08',
        'P-10',
        'X-01',
        'X-03',
        'X-05',
        'X-06',
      ],
    },
    {
      id: 'FLEET',
      displayName: 'MAREA FLEET',
      type: 'SOFTWARE',
      dossier: `${PRODUCTS_DIR}MAREA-FLEET-COMMERCIAL-SPEC.md`,
      copy: { es: `${PRODUCTS_DIR}copy/fleet.es.md`, en: `${PRODUCTS_DIR}copy/fleet.en.md` },
      requiredReadiness: {
        definition: 'COMPLETE_TARGET_SPECIFICATION',
        engineering: 'NOT_VERIFIED',
        licensing: 'NOT_CLEARED',
        hardware: 'NOT_APPLICABLE_SOFTWARE_PRODUCT',
        dataRights: 'NOT_GRANTED',
        compliance: 'NOT_STARTED',
        pricing: 'HYPOTHESIS_UNAPPROVED',
        brandPublication: 'NOT_GRANTED',
        availability: 'NOT_FOR_SALE',
      },
      editions: [
        {
          id: 'FLEET-START',
          displayName: 'MAREA FLEET Start',
          priceState: 'HYPOTHESIS_UNAPPROVED',
          amount: 49,
          period: 'MONTH',
          startingPrice: true,
          subscription: null,
          verdictStatus: 'DEFINED',
        },
        {
          id: 'FLEET-BUSINESS',
          displayName: 'MAREA FLEET Business',
          priceState: 'HYPOTHESIS_UNAPPROVED',
          amount: 79,
          period: 'MONTH',
          subscription: null,
          verdictStatus: 'DEFINED',
        },
        {
          id: 'FLEET-ENTERPRISE',
          displayName: 'MAREA FLEET Enterprise',
          priceState: 'NOT_ESTABLISHED',
          subscription: null,
          verdictStatus: 'CONDITIONAL',
        },
      ],
      minimumBlockers: [
        'D-09',
        'D-10',
        'H-12',
        'H-13',
        'P-09',
        'P-10',
        'X-01',
        'X-03',
        'X-05',
        'X-06',
        'X-07',
      ],
    },
  ],
  requiredGlobalRestrictions: BATCH03_GLOBAL_RESTRICTIONS,
  disclaimers: [
    // Brief §17.1: navigation/instruments disclaimer in the DISPLAY and FLEET
    // dossiers and all three copy pairs; in the WEATHER dossier only where a
    // position or route context appears.
    { product: 'DISPLAY', file: 'dossier', kind: 'navigation', language: 'en' },
    { product: 'DISPLAY', file: 'copy.es', kind: 'navigation', language: 'es' },
    { product: 'DISPLAY', file: 'copy.en', kind: 'navigation', language: 'en' },
    {
      product: 'WEATHER',
      file: 'dossier',
      kind: 'navigation',
      language: 'en',
      when: 'position|route|ruta|posición|posicion',
    },
    { product: 'WEATHER', file: 'dossier', kind: 'weatherForecast', language: 'en' },
    { product: 'WEATHER', file: 'copy.es', kind: 'navigation', language: 'es' },
    { product: 'WEATHER', file: 'copy.en', kind: 'navigation', language: 'en' },
    { product: 'WEATHER', file: 'copy.es', kind: 'weatherForecast', language: 'es' },
    { product: 'WEATHER', file: 'copy.en', kind: 'weatherForecast', language: 'en' },
    { product: 'FLEET', file: 'dossier', kind: 'navigation', language: 'en' },
    { product: 'FLEET', file: 'copy.es', kind: 'navigation', language: 'es' },
    { product: 'FLEET', file: 'copy.en', kind: 'navigation', language: 'en' },
    // Brief §17.2: additional internal-draft limitation statements.
    { product: 'DISPLAY', file: 'dossier', kind: 'displayLimitation', language: 'en' },
    { product: 'DISPLAY', file: 'copy.es', kind: 'displayLimitation', language: 'es' },
    { product: 'DISPLAY', file: 'copy.en', kind: 'displayLimitation', language: 'en' },
    { product: 'WEATHER', file: 'dossier', kind: 'weatherLimitation', language: 'en' },
    { product: 'WEATHER', file: 'copy.es', kind: 'weatherLimitation', language: 'es' },
    { product: 'WEATHER', file: 'copy.en', kind: 'weatherLimitation', language: 'en' },
    { product: 'FLEET', file: 'dossier', kind: 'fleetLimitation', language: 'en' },
    { product: 'FLEET', file: 'copy.es', kind: 'fleetLimitation', language: 'es' },
    { product: 'FLEET', file: 'copy.en', kind: 'fleetLimitation', language: 'en' },
  ],
};

const BATCHES = [BATCH_01, BATCH_02, BATCH_03];

// --- Batch-02 invariant configuration (README §14, §15, §18, §19, §20) -------

const BATCH02_INVARIANTS = {
  PILOT: {
    equalities: {
      availability: 'NOT_FOR_SALE',
      safetyGate: 'BLOCKED',
      remoteHelmControl: 'PROHIBITED',
      seaTrialsCompleted: false,
      physicalEstopEvidence: 'NOT_FOUND',
      motorIsolationEvidence: 'NOT_FOUND',
      rudderFeedbackEvidence: 'NOT_FOUND',
      priceInclusiveQuotation: false,
      quotationRequired: true,
    },
    steeringModes: true,
  },
  SENSE: {
    equalities: {
      accuracyVerified: false,
      accuracyEvidenceState: 'NOT_MEASURED',
      nmea2000Certified: false,
      nmea2000State: 'NOT_IMPLEMENTED',
      directRemoteAlerts: false,
      ipRatingClaimed: false,
      ingressEvidenceState: 'NOT_VERIFIED',
    },
    modules: true,
    kits: true,
    entryPriceAmount: 99,
  },
  WATCH: {
    equalities: {
      serviceImplemented: false,
      ingestionState: 'NOT_VERIFIED',
      notificationPipelineState: 'NOT_FOUND',
      deviceIdentityState: 'NOT_FOUND',
      subscriptionServiceState: 'NOT_FOUND',
      connectivityContractState: 'NOT_FOUND',
      instantAlertGuarantee: false,
      distressServiceCertified: false,
      remoteHelmControl: 'PROHIBITED',
      connectivityDependent: true,
      subscriptionTermsStatus: 'OPEN',
    },
  },
};

const SENSE_MODULE_IDS = ['SENSE-WIND', 'SENSE-POWER', 'SENSE-BILGE', 'SENSE-TANKS', 'SENSE-ENV'];
const SENSE_KIT_IDS = ['SENSE-ESSENTIALS', 'SENSE-SAIL', 'SENSE-SYSTEMS'];
// Kit composition is a product decision fixed by the SENSE dossier §7.1–§7.3 and
// D4 §3.3. A validator must never let the machine-readable contract drift from it.
const SENSE_KIT_COMPOSITION = {
  'SENSE-ESSENTIALS': ['SENSE-POWER', 'SENSE-BILGE'],
  'SENSE-SAIL': ['SENSE-WIND', 'SENSE-ENV'],
  'SENSE-SYSTEMS': ['SENSE-POWER', 'SENSE-BILGE', 'SENSE-TANKS', 'SENSE-ENV'],
};
const BATCH02_ASSET_SUFFIXES = [
  'HERO',
  'USE',
  'OVR',
  'EDN',
  'ECO',
  'INS',
  'MOB',
  'TMB',
  'OG',
  'TEC',
];

// D9 §6 coverage matrix is the authority for batch-02 asset status: 4 blocked per
// family (HERO, USE, INS, TMB), 5 MC-04 reuse (OVR, EDN, ECO, OG, TEC) and 1
// authored new (MOB), i.e. 12 BLOCKED_ON_IMAGE_GENERATION + 18 CONCEPT.
const BATCH02_BLOCKED_ASSET_SUFFIXES = ['HERO', 'USE', 'INS', 'TMB'];
const BATCH02_REUSED_ASSET_SUFFIXES = ['OVR', 'EDN', 'ECO', 'OG', 'TEC'];
const BATCH02_AUTHORED_ASSET_SUFFIXES = ['MOB'];
const BATCH02_ASSET_COVERAGE = {
  requirementsPerFamily: 10,
  blockedPerFamily: BATCH02_BLOCKED_ASSET_SUFFIXES.length,
  reusedPerFamily: BATCH02_REUSED_ASSET_SUFFIXES.length,
  authoredPerFamily: BATCH02_AUTHORED_ASSET_SUFFIXES.length,
  blockedTotal: BATCH02_BLOCKED_ASSET_SUFFIXES.length * 3,
  reusedTotal: BATCH02_REUSED_ASSET_SUFFIXES.length * 3,
  authoredTotal: BATCH02_AUTHORED_ASSET_SUFFIXES.length * 3,
};

function parseAssetCoverageMatrix(text) {
  if (!text) return null;
  const parseCell = (cell) => {
    const trimmed = cell.trim();
    const countMatch = /^(\d+)/.exec(trimmed);
    const suffixes = [...trimmed.matchAll(/\b([A-Z]{2,4})\b/g)]
      .map((match) => match[1])
      .filter((token) => BATCH02_ASSET_SUFFIXES.includes(token));
    return {
      count: countMatch ? Number(countMatch[1]) : null,
      suffixes,
    };
  };
  const families = new Map();
  let total = null;
  for (const line of text.split(/\r?\n/)) {
    if (!/^\s*\|\s*(?:\*\*)?(?:MAREA (?:PILOT|SENSE|WATCH)|Total)\b/.test(line)) continue;
    const cells = line
      .split('|')
      .slice(1, -1)
      .map((cell) => cell.replace(/\*\*/g, '').trim());
    const label = cells[0];
    if (/^MAREA /.test(label)) {
      families.set(label, {
        requirements: parseCell(cells[1]),
        blocked: parseCell(cells[2]),
        reused: parseCell(cells[3]),
        authored: parseCell(cells[4]),
        verified: parseCell(cells[5]),
      });
    } else if (label === 'Total') {
      total = {
        requirements: parseCell(cells[1]),
        blocked: parseCell(cells[2]),
        reused: parseCell(cells[3]),
        authored: parseCell(cells[4]),
        verified: parseCell(cells[5]),
      };
    }
  }
  return { families, total };
}

// Canonical evidence states that must appear in the dossier and agree with the JSON
// contract (README §15).
const BATCH02_EVIDENCE_STATES = {
  PILOT: [
    ['PILOT_SAFETY_GATE', 'BLOCKED'],
    ['PILOT_PHYSICAL_ESTOP_EVIDENCE', 'NOT_FOUND'],
    ['PILOT_MOTOR_ISOLATION_EVIDENCE', 'NOT_FOUND'],
    ['PILOT_RUDDER_FEEDBACK_EVIDENCE', 'NOT_FOUND'],
    ['PILOT_SEA_TRIALS', 'NOT_PERFORMED'],
  ],
  SENSE: [
    ['SENSE_MEASUREMENT_ACCURACY', 'NOT_MEASURED'],
    ['SENSE_INGRESS_PROTECTION', 'NOT_VERIFIED'],
    ['SENSE_NMEA2000', 'NOT_IMPLEMENTED'],
  ],
  WATCH: [
    ['WATCH_INGESTION', 'NOT_VERIFIED'],
    ['WATCH_NOTIFICATION_PIPELINE', 'NOT_FOUND'],
    ['WATCH_DEVICE_IDENTITY', 'NOT_FOUND'],
    ['WATCH_SUBSCRIPTION_SERVICE', 'NOT_FOUND'],
    ['WATCH_CONNECTIVITY_CONTRACT', 'NOT_FOUND'],
  ],
};

// JSON keys that must carry the canonical state of the matching evidence token.
const BATCH02_STATE_JSON_KEYS = {
  PILOT_SAFETY_GATE: 'safetyGate',
  PILOT_PHYSICAL_ESTOP_EVIDENCE: 'physicalEstopEvidence',
  PILOT_MOTOR_ISOLATION_EVIDENCE: 'motorIsolationEvidence',
  PILOT_RUDDER_FEEDBACK_EVIDENCE: 'rudderFeedbackEvidence',
  SENSE_MEASUREMENT_ACCURACY: 'accuracyEvidenceState',
  SENSE_INGRESS_PROTECTION: 'ingressEvidenceState',
  SENSE_NMEA2000: 'nmea2000State',
  WATCH_INGESTION: 'ingestionState',
  WATCH_NOTIFICATION_PIPELINE: 'notificationPipelineState',
  WATCH_DEVICE_IDENTITY: 'deviceIdentityState',
  WATCH_SUBSCRIPTION_SERVICE: 'subscriptionServiceState',
  WATCH_CONNECTIVITY_CONTRACT: 'connectivityContractState',
};

const BATCH02_REQUIRED_SAFETY_GATES = [
  'PILOT_SAFETY_GATE',
  'PILOT_PHYSICAL_ESTOP',
  'PILOT_MOTOR_ISOLATION',
  'PILOT_RUDDER_FEEDBACK',
  'PILOT_SEA_TRIALS',
  'SENSE_MEASUREMENT_ACCURACY',
  'WATCH_NOTIFICATION_PIPELINE',
  'WATCH_DEVICE_IDENTITY',
  'WATCH_SUBSCRIPTION_SERVICE',
  'WATCH_CONNECTIVITY_CONTRACT',
];

const BATCH02_REQUIRED_ISOLATION_RULES = [
  'STEERING_NOT_GATED',
  'LOCAL_SENSING_NOT_GATED',
  'LOCAL_ALARMS_NOT_GATED',
  'PAYMENT_FAILURE_NEVER_DISABLES_LOCAL_FUNCTIONS',
];

// --- Batch-03 invariant configuration (MC-07 brief §10, §11, §12, §14) -----

const PRODUCT_TYPE_VOCABULARY = ['SOFTWARE', 'HARDWARE', 'HARDWARE_SOFTWARE', 'HARDWARE_SERVICE'];

const CANONICAL_FAMILY_IDS = [
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

const BATCH03_INVARIANTS = {
  DISPLAY: {
    equalities: {
      screenSizesFrozen: false,
      hardwareSelected: false,
      chartRightsGranted: false,
      pilotControlAuthority: false,
    },
    hardwareBoundary: {
      sizeState: 'SIZE_NOT_FROZEN',
      hardwareState: 'HARDWARE_NOT_SELECTED',
      bomState: 'BOM_NOT_ESTABLISHED',
      targetsAreRequiredTarget: true,
      measuredPerformance: false,
    },
  },
  WEATHER: {
    equalities: {
      providerRightsGranted: false,
      forecastAccuracyClaimed: false,
      redistributionAllowed: false,
      offlineAllowed: false,
      navDoubleBillingAllowed: false,
    },
    entitlementModel: {
      oneAccount: true,
      oneEntitlementLedger: true,
      standalonePurchaseAllowed: true,
      navProIncludesWeatherStandardRead: 'CONDITIONAL',
      upgradesProrated: true,
      cancellationPreservesUserRecords: true,
      doubleBillingAllowed: false,
      licenceLossUnavailableState: true,
      billingImplemented: false,
    },
  },
  FLEET: {
    equalities: {
      multiTenantProductionService: false,
      crossTenantAccessAllowed: false,
      remoteSteeringAllowed: false,
      slaEstablished: false,
      customerProductionDataUsed: false,
      securityCertificationClaimed: false,
    },
    tenancy: {
      authorizationRequired: true,
      serverSideAuthorization: true,
      trustClientSuppliedTenant: false,
      defaultRole: 'NO_ACCESS',
      defaultRoleListsAllVessels: false,
      auditLogRequired: true,
      privacyPolicyRequired: true,
      dataExportPolicyRequired: true,
      telemetryReadOnly: true,
      slaState: 'NO_SLA_ESTABLISHED',
    },
  },
};

// Frozen integration baseline for the three new families (brief §9). Statuses
// use only SUPPORTED / CONDITIONAL / PLANNED / UNKNOWN / BLOCKED.
const BATCH03_INTEGRATION_BASELINE = [
  ['DISPLAY', 'HUB', 'CONDITIONAL'],
  ['DISPLAY', 'NAV', 'PLANNED'],
  ['DISPLAY', 'AIS', 'CONDITIONAL'],
  ['DISPLAY', 'WEATHER', 'CONDITIONAL'],
  ['DISPLAY', 'SENSE', 'CONDITIONAL'],
  ['DISPLAY', 'PILOT', 'UNKNOWN'],
  ['DISPLAY', 'WATCH', 'UNKNOWN'],
  ['WEATHER', 'NAV', 'PLANNED'],
  ['WEATHER', 'FLEET', 'CONDITIONAL'],
  ['WEATHER', 'DISPLAY', 'CONDITIONAL'],
  ['WEATHER', 'HUB', 'CONDITIONAL'],
  ['FLEET', 'WATCH', 'CONDITIONAL'],
  ['FLEET', 'HUB', 'CONDITIONAL'],
  ['FLEET', 'SENSE', 'UNKNOWN'],
  ['FLEET', 'PILOT', 'BLOCKED'],
  ['FLEET', 'NAV', 'PLANNED'],
  ['FLEET', 'WEATHER', 'CONDITIONAL'],
  ['FLEET', 'DISPLAY', 'UNKNOWN'],
  ['FLEET', 'AIS', 'CONDITIONAL'],
];

const INTEGRATION_STATUS_VOCABULARY = ['SUPPORTED', 'CONDITIONAL', 'PLANNED', 'UNKNOWN', 'BLOCKED'];

// D9 asset plan, brief §13: 30 ids, 10 per family, 12 blocked + 15 reused + 3 authored.
const BATCH03_ASSET_SUFFIXES = [
  'HERO',
  'USE',
  'OVR',
  'EDN',
  'ECO',
  'INS',
  'MOB',
  'TMB',
  'OG',
  'TEC',
];
const BATCH03_BLOCKED_ASSET_SUFFIXES = ['HERO', 'USE', 'INS', 'TMB'];
const BATCH03_REUSED_ASSET_SUFFIXES = ['OVR', 'EDN', 'ECO', 'OG', 'TEC'];
const BATCH03_AUTHORED_ASSET_SUFFIXES = ['MOB'];
const BATCH03_ASSET_COVERAGE = {
  requirementsPerFamily: 10,
  blockedPerFamily: 4,
  reusedPerFamily: 5,
  authoredPerFamily: 1,
  blockedTotal: 12,
  reusedTotal: 15,
  authoredTotal: 3,
};

function parseBatch03AssetCoverage(text) {
  if (!text) return null;
  const cleanCell = (cell) => cell.replace(/\*\*/g, '').replace(/`/g, '').trim();
  const parseCell = (cell) => {
    const trimmed = cleanCell(cell);
    const countMatch = /^(\d+)/.exec(trimmed);
    const suffixes = [...trimmed.matchAll(/\b([A-Z]{2,4})\b/g)]
      .map((match) => match[1])
      .filter((token) => BATCH03_ASSET_SUFFIXES.includes(token));
    return { count: countMatch ? Number(countMatch[1]) : null, suffixes };
  };
  let headerFound = false;
  const families = new Map();
  let total = null;
  for (const line of text.split(/\r?\n/)) {
    if (/^\s*\|\s*Product\s*\|\s*Requirements\s*\|/.test(line)) {
      headerFound = true;
      continue;
    }
    if (!headerFound || !/^\s*\|/.test(line)) continue;
    const cells = line.split('|').slice(1, -1);
    if (cells.length < 6) continue;
    const label = cleanCell(cells[0]);
    if (/^MAREA (?:DISPLAY|WEATHER|FLEET)$/.test(label)) {
      families.set(label, {
        requirements: parseCell(cells[1]),
        blocked: parseCell(cells[2]),
        reused: parseCell(cells[3]),
        authored: parseCell(cells[4]),
        verified: parseCell(cells[5]),
      });
    } else if (label === 'Total') {
      total = {
        requirements: parseCell(cells[1]),
        blocked: parseCell(cells[2]),
        reused: parseCell(cells[3]),
        authored: parseCell(cells[4]),
        verified: parseCell(cells[5]),
      };
    }
  }
  return headerFound ? { families, total } : null;
}

const BATCH03_REQUIRED_PUBLICATION_GATES = [
  'brandTrademarkClearance',
  'openMarineSourceRights',
  'imageGeneration',
  'priceApproval',
  'hardwareEvidence',
  'dataProviderRights',
  'securityAndPrivacyReview',
  'commercePublication',
];

// Frozen FLEET roles and tenancy defaults, brief §11.
const FLEET_ROLE_VOCABULARY = [
  'ORGANIZATION_OWNER',
  'ORGANIZATION_ADMIN',
  'FLEET_MANAGER',
  'MAINTENANCE_MANAGER',
  'CREW_MEMBER',
  'READ_ONLY_VIEWER',
  'EXTERNAL_INSTALLER',
  'EMBARCARTE_SUPPORT',
];

const BATCH03_DISPLAY_HARDWARE_STATES = [
  'SIZE_NOT_FROZEN',
  'HARDWARE_NOT_SELECTED',
  'BOM_NOT_ESTABLISHED',
];

const BATCH03_ENTITLEMENT_MODEL = {
  oneAccount: true,
  oneEntitlementLedger: true,
  standalonePurchaseAllowed: true,
  navProIncludesWeatherStandardRead: 'CONDITIONAL',
  upgradesProrated: true,
  cancellationPreservesUserRecords: true,
  doubleBillingAllowed: false,
  licenceLossUnavailableState: true,
  billingImplemented: false,
};

// --- Text rules -------------------------------------------------------------

const PURCHASE_RULES = [
  [/\bFOR_SALE\b/, 'purchase status FOR_SALE is prohibited; every product is NOT_FOR_SALE'],
  [/\bPURCHASABLE\b/, 'purchase status PURCHASABLE is prohibited; no SKU is orderable'],
  [/\bavailable\s+now\b/i, 'availability claim "available now" is prohibited'],
  [/\bbuy\s+now\b/i, 'sale-enabling CTA "buy now" is prohibited'],
  [/\badd\s+to\s+(?:cart|basket)\b/i, 'sale-enabling CTA "add to cart" is prohibited'],
  [/\bin\s+stock\b/i, 'stock claim "in stock" is prohibited'],
  [/\ben\s+stock\b/i, 'stock claim "en stock" is prohibited'],
  [/\bout\s+of\s+stock\b/i, 'stock claim "out of stock" is prohibited'],
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
  // Imperative device purchase in NOT_FOR_SALE copy (MIN-07).
  [
    /\b(?:buy|order|purchase)\s+(?:the|this|your)\s+(?:device|product|unit|system|hardware)\b/i,
    'an imperative purchase CTA is prohibited while every product is NOT_FOR_SALE',
  ],
  [
    /\b(?:compra|adquiere|pide)\s+(?:el|este|tu)\s+(?:dispositivo|producto|equipo|sistema|hardware)\b/i,
    'una llamada a la compra imperativa está prohibida mientras el producto es NOT_FOR_SALE',
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

// Batch-02 relaxes the blanket "from EUR" prohibition because README §17 names
// starting-price hypotheses. Everything else stays prohibited; allowed figures are
// checked against the §17 list.
const PRICE_TEXT_RULES_BATCH02 = PRICE_RULES.filter(
  ([pattern]) => !pattern.source.includes('from\\s+(?:EUR'),
);

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
    /\bMAREA(?:\s+(?:NAV|HUB|AIS|PILOT|SENSE|WATCH))?\s*[®™]/,
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
    /\bMAREA-(?:NAV|HUB|AIS|PILOT|SENSE|WATCH)\b(?![-\w])/,
    'hyphenated family name is prohibited; the canonical form is "MAREA <FAMILY>"',
  ],
  [
    /\bMarea\s+(?:Nav|Hub|Ais|Pilot|Sense|Watch)\b/,
    'title-case family name is prohibited; the canonical form is "MAREA <FAMILY>"',
  ],
  [
    /\bMAREA(?:NAV|HUB|AIS|PILOT|SENSE|WATCH)\b/,
    'concatenated family name is prohibited; the canonical form is "MAREA <FAMILY>"',
  ],
  ...FORBIDDEN_FAMILY_NAMES.map((familyName) => [
    new RegExp(`\\b${familyName.replace(/\s+/g, '\\s+')}\\b`),
    `invented family name ${JSON.stringify(familyName)} is prohibited by the brand contract`,
  ]),
];

// Batch-02 claim rules (README §16). Patterns are phrased so that the legitimate
// limitation statements (“not guaranteed”, “no remote steering”) do not match an
// affirmative claim; internal documents additionally use negative-context tolerance.
const STEERING_CLAIM_RULES = [
  [
    /\bremote(?:ly)?\s+(?:steer|steering|helm|control)\s+(?:is\s+|are\s+)?(?:available|included|supported|enabled)\b/i,
    'a remote steering/helm-control capability is prohibited: PILOT authority stays local',
  ],
  [
    /\b(?:can|may|could)\s+(?:steer|control|command)\s+(?:the\s+|your\s+)?(?:boat|vessel|helm|autopilot)\s+(?:from|via|through|using)\b/i,
    'a remote steering-control path is prohibited: no app, cloud or WATCH may command the actuator',
  ],
  [
    /\b(?:app|cloud|website|watch|nav|hub)\b[^.\n]{0,40}\b(?:steer|command|engage|disengage)\b[^.\n]{0,30}\b(?:helm|actuator|autopilot|steering)\b/i,
    'a cloud/app/website steering-control path is prohibited (README §16 rule 1)',
  ],
  [
    /\bautonomous\s+(?:steering|helm|navigation)\s+(?:is\s+|are\s+)?(?:available|included|supported|enabled)\b/i,
    'an autonomous-steering claim is prohibited',
  ],
  [
    /\b(?:control|gobierno)\s+remot[oa]\s+(?:está\s+)?(?:disponible|incluid[oa]|habilitad[oa])\b/i,
    'un control remoto del gobierno está prohibido (README §16)',
  ],
  [
    /\bgobernar\s+desde\s+(?:la\s+)?(?:app|nube|aplicación|reloj|web)\b/i,
    'un camino de control remoto del gobierno está prohibido (README §16)',
  ],
  [
    /\b(?:can|may|could|lets?|allows?)\b[^.\n]{0,40}\b(?:control|steer|command|engage|disengage)\b[^.\n]{0,30}\b(?:remotely|from\s+(?:the\s+|your\s+|a\s+|an\s+)?(?:app|phone|cloud|website|web|watch|display|tablet))\b/i,
    'a remote or display-based steering-control path is prohibited: no app, cloud, phone or display may command the vessel (README §16)',
  ],
  [
    /\b(?:control|steer|command|engage|disengage)\b[^.\n]{0,30}\b(?:remotely|from\s+(?:the\s+|your\s+|a\s+|an\s+)?(?:app|phone|cloud|website|web|watch|display|tablet))\b/i,
    'a remote or display-based steering-control path is prohibited: no app, cloud, phone or display may command the vessel (README §16)',
  ],
  [
    /\b(?:the\s+)?(?:display|screen|app|phone|cloud|website|web|watch)\b[^.\n]{0,30}\b(?:can|may|could)\s+(?:steer|control|command)\b[^.\n]{0,20}\b(?:vessel|boat|helm|autopilot|steering|throttle|motor)\b/i,
    'a display- or app-based steering-control claim is prohibited: the display never commands the helm',
  ],
  [
    /\bPILOT\b[^.\n]{0,40}\b(?:can|may|could)\s+be\s+(?:controlled|steered|engaged|disengaged|commanded)\b/i,
    'PILOT control is prohibited: status is read-only at most and never a control path',
  ],
];

const ACCURACY_CLAIM_RULES = [
  [
    /(?:±|\+\/-)\s*\d+(?:[.,]\d+)?\s*(?:%|°|deg|º|m|cm|mm|kn|knots?|kt|hPa|bar|V|A)?/i,
    'a numerical accuracy figure is prohibited: SENSE accuracy is NOT_MEASURED',
  ],
  [
    /\baccuracy\s+(?:of|is)\s*(?:±|about|approximately|approx\.?|under|within)?\s*\d/i,
    'a numerical accuracy figure is prohibited: SENSE accuracy is NOT_MEASURED',
  ],
  [
    /\b(?:precisión|exactitud)\s+(?:de|del|es)\s*(?:±|aproximadamente|en torno a)?\s*\d/i,
    'una cifra numérica de precisión está prohibida: SENSE_MEASUREMENT_ACCURACY es NOT_MEASURED',
  ],
  [
    /\b(?:accuracy|precisión|exactitud)\s+(?:is|has\s+been|está|ha\s+sido)\s+(?:verified|validated|measured|guaranteed|verificad[ao]|valid[ao]|medid[ao]|garantizad[ao])\b/i,
    'an unverified accuracy claim is prohibited: SENSE accuracy is NOT_MEASURED',
  ],
];

const INGRESS_CLAIM_RULES = [
  [
    /\bIP\s?(?:6[5-9]|5[4-9]|4[4-9]|[0-6][0-9])\b/,
    'an IP rating is prohibited: SENSE ingress protection is NOT_VERIFIED (H-05)',
  ],
  [
    /\bIP\s*rating\s*(?:of\s*)?\d/i,
    'an IP rating is prohibited: SENSE ingress protection is NOT_VERIFIED (H-05)',
  ],
  [
    /\b(?:waterproof|sumergible|estanco)\s+(?:to|hasta|IP)\s*\d/i,
    'an unverified ingress claim is prohibited (H-05)',
  ],
];

const DELIVERY_GUARANTEE_RULES = [
  [
    /\b(?:guaranteed|guarantees|ensure[sd]?|assures?)\s+(?:immediate\s+|instant\s+)?(?:delivery|receipt|arrival)\b/i,
    'an alert delivery guarantee is prohibited: WATCH delivery is conditional',
  ],
  [
    /\balerts?\s+(?:are|is|will\s+be)\s+(?:delivered\s+)?(?:instantly|immediately)\b/i,
    'an instant-alert promise is prohibited: provider acceptance is not delivery',
  ],
  [
    /\binstant(?:aneous)?\s+(?:alert|notification|delivery)\b/i,
    'an instant-alert promise is prohibited: provider acceptance is not delivery',
  ],
  [
    /\bgarantiza(?:mos|da|do)?\s+(?:la\s+)?(?:entrega|recepción)\s+inmediata\b/i,
    'una garantía de entrega inmediata está prohibida (README §16)',
  ],
  [
    /\b(?:entrega|recepción|aviso)\s+inmediat[oa]\s+garantizad[oa]\b/i,
    'una garantía de entrega inmediata está prohibida (README §16)',
  ],
];

const DISTRESS_CLAIM_RULES = [
  [
    /\b(?:is|as)\s+(?:a\s+)?certified\s+distress/i,
    'a certified distress-service claim is prohibited',
  ],
  [/\bMED\s+(?:approved|certified)\b/i, 'a certified distress-service claim is prohibited'],
  [
    /\b(?:servicio|sistema)\s+de\s+socorro\s+certificad[oa]\b/i,
    'un servicio de socorro certificado está prohibido (README §16)',
  ],
  [
    /\btheft[-\s]proof\b|\bgarantiza(?:mos)?\s+(?:la\s+)?(?:protección|prevención)\s+(?:contra\s+el\s+)?robo\b/i,
    'a theft-prevention guarantee is prohibited: WATCH is conditional awareness',
  ],
];

const CONNECTIVITY_CLAIM_RULES = [
  [
    /\bconnectivity\s+(?:is\s+|comes\s+)?(?:included|bundled)\b/i,
    'bundled connectivity is prohibited: no connectivity contract exists (H-12)',
  ],
  [/\bSIM\s+(?:card\s+)?(?:is\s+|comes\s+)?included\b/i, 'bundled SIM/data is prohibited (H-12)'],
  [/\bdata\s+plan\s+(?:is\s+|comes\s+)?included\b/i, 'a bundled data plan is prohibited (H-12)'],
  [
    /\bconectividad\s+(?:está\s+|va\s+)?incluid[ao]\b/i,
    'la conectividad incluida está prohibida: no existe contrato de conectividad (H-12)',
  ],
  [
    /\b(?:tarjeta\s+)?SIM\s+incluid[ao]\b/i,
    'una SIM incluida está prohibida: no existe contrato de conectividad (H-12)',
  ],
];

const CALIBRATION_CLAIM_RULES = [
  [
    /\bcalibrat(?:ed|ion)\s+(?:is\s+|has\s+been\s+)?(?:verified|validated|complete[ds]?)\b/i,
    'calibration is not evidence of accuracy; SENSE accuracy is NOT_MEASURED',
  ],
  [
    /\bsensor\s+accuracy\s+(?:is\s+)?(?:verified|known|guaranteed)\b/i,
    'an unverified sensor accuracy claim is prohibited (P-05)',
  ],
  [
    /\bcalibración\s+(?:está\s+|ha\s+sido\s+)?(?:verificada|validada|completada)\b/i,
    'la calibración no es evidencia de precisión; SENSE accuracy es NOT_MEASURED',
  ],
];

const SEA_TRIAL_CLAIM_RULES = [
  [
    /\bsea\s+trials?\s+(?:were\s+|has\s+been\s+|have\s+been\s+)?(?:completed|passed|successful|conducted)\b/i,
    'a completed sea-trial claim is prohibited: no supervised sea trial exists',
  ],
  [
    /\bpruebas?\s+de\s+mar\s+(?:completad[ao]s?|superad[ao]s?|realizad[oa]s?)\b/i,
    'una prueba de mar completada está prohibida: no existe ninguna prueba supervisada',
  ],
];

const PHYSICAL_EVIDENCE_CLAIM_RULES = [
  [
    /\bphysical\s+E-?stop\s+(?:is\s+)?(?:proven|verified|installed|tested|validated)\b/i,
    'physical E-stop evidence is NOT_FOUND (H-10)',
  ],
  [
    /\bE-?stop\s+evidence\s+(?:exists|is\s+confirmed|is\s+available)\b/i,
    'physical E-stop evidence is NOT_FOUND (H-10)',
  ],
  [
    /\b(?:parada\s+de\s+emergencia|E-?stop)\s+(?:física\s+)?(?:probada|verificada|instalada)\b/i,
    'la evidencia física del E-stop es NOT_FOUND (H-10)',
  ],
  [
    /\bmotor\s+(?:power\s+)?isolation\s+(?:is\s+)?(?:proven|verified|tested)\b/i,
    'independent motor-power isolation evidence is NOT_FOUND (H-03, H-10)',
  ],
];

const BATCH02_CLAIM_RULES = [
  ...STEERING_CLAIM_RULES,
  ...ACCURACY_CLAIM_RULES,
  ...INGRESS_CLAIM_RULES,
  ...DELIVERY_GUARANTEE_RULES,
  ...DISTRESS_CLAIM_RULES,
  ...CONNECTIVITY_CLAIM_RULES,
  ...CALIBRATION_CLAIM_RULES,
  ...SEA_TRIAL_CLAIM_RULES,
  ...PHYSICAL_EVIDENCE_CLAIM_RULES,
];

// --- Batch-03 claim rules (MC-07 brief §12, §14, §17) ----------------------

// DISPLAY: hardware, optics, chart-rights and PILOT-authority claims may only
// exist as unverified targets; none is measured, certified or granted.
const DISPLAY_CLAIM_RULES = [
  [
    /\b(?:certified|verified|measured|proven|certificad[oa]|verificad[oa]|medid[oa])\b[^.\n]{0,40}\b(?:sunlight|sun\s+legibility|legibilidad\s+solar|daylight\s+legibility)\b/i,
    'a certified or measured sunlight-performance claim is prohibited: no optical performance has been measured (H-11)',
  ],
  [
    /\b(?:sunlight[- ]readable|readable\s+in\s+(?:direct\s+)?sunlight|legible\s+in\s+(?:direct\s+)?sunlight|legible\s+a\s+pleno\s+sol)\b/i,
    'a sunlight-readability claim is prohibited: no panel, brightness or legibility test exists (H-11)',
  ],
  [
    /\b(?:brightness|brillo|nits?)\b[^.\n]{0,20}\b\d{2,4}\s*(?:nits?|cd\/m)/i,
    'a numerical brightness figure is prohibited: SIZE_NOT_FROZEN and HARDWARE_NOT_SELECTED (H-05, H-11)',
  ],
  [
    /\b\d{2,4}\s*(?:nits?|cd\/m2|cd\/m²)\b/i,
    'a numerical brightness figure is prohibited: no panel has been measured (H-11)',
  ],
  [
    /\b(?:screen|display|panel|pantalla)\s+(?:size|diagonal|tamaño|diagonal)\s+(?:is|measures|of|es|mide)\s+\d/i,
    'a measured screen size is prohibited: SIZE_NOT_FROZEN and hardware is NOT_SELECTED (H-05, H-11)',
  ],
  [
    /\b(?:the\s+)?(?:final\s+)?screen\s+size\s+is\s+\d/i,
    'a final screen size is prohibited: SIZE_NOT_FROZEN (brief §12)',
  ],
  [
    /\b\d{1,2}(?:[.,]\d+)?[- ]?(?:inch|pulgadas)\b[^.\n]{0,20}\b(?:display|screen|panel|pantalla)\b/i,
    'a purchased or measured screen size is prohibited; the 7-inch class is a working designation, not a frozen size (brief §12)',
  ],
  [
    /\b(?:resolution|resolución)\b[^.\n]{0,20}\b\d{3,4}\s*[x×]\s*\d{3,4}\b/i,
    'a resolution stated as fact is prohibited: no panel is selected (H-05)',
  ],
  [
    /\b(?:operating\s+temperature|temperature\s+range|rango\s+de\s+temperatura)\b[^.\n]{0,30}-?\d{1,3}\s*(?:°|º|deg)?\s*C\b/i,
    'a temperature range stated as fact is prohibited: thermal behaviour is a REQUIRED_TARGET (H-11)',
  ],
  [
    /\b(?:display|screen|pantalla)\b[^.\n]{0,60}\b(?:controls?|steers?|engages?|disengages?|commands?|controla|gobierna)\b[^.\n]{0,30}\b(?:PILOT|helm|autopilot|piloto\s+automático|timón)\b/i,
    'PILOT control authority from the DISPLAY is prohibited: read-only status at most (brief §12)',
  ],
  [
    /\bPILOT\s+(?:control|steering|authority)\b[^.\n]{0,25}\b(?:is|are|está|es)\s+(?:available|included|supported|enabled|disponible|incluid[oa])\b/i,
    'PILOT control authority is not approved on the DISPLAY; status/monitoring only (brief §12)',
  ],
  [
    /\b(?:safety[- ]critical|safety\s+system|sistema\s+de\s+seguridad)\b[^.\n]{0,30}\b(?:certified|approved|compliant|certificad[oa]|aprobad[oa])\b/i,
    'a safety-system framing or certification claim is prohibited for a display (brief §14)',
  ],
];

// WEATHER: forecasts are probabilistic; no provider right, redistribution or
// offline permission may be asserted without matching source evidence.
const WEATHER_CLAIM_RULES = [
  [
    /\b(?:free|no[- ]cost|gratis)\b[^.\n]{0,30}\b(?:tier|plan|api|data|service|nivel)\b[^.\n]{0,60}\b(?<!non-)(?:commercial|paid|resale|redistribut|comercial|de\s+pago|reventa)\b/i,
    'a free non-commercial data tier is presented as usable for a paid service; no commercial right is granted (D-04, D-07)',
  ],
  [
    /\b(?:provider|data|source)\s+(?:rights?|licen[cs]e|agreement|terms)\b[^.\n]{0,40}\b(?:granted|cleared|approved|signed|obtained|concedid[oa]s?|aprobad[oa]s?)\b/i,
    'provider data rights presented as granted; dataRights is NOT_GRANTED (D-04, D-07, D-10)',
  ],
  [
    /\bdata\s+rights\s+(?:are|is)\s+(?:GRANTED|CLEARED|APPROVED)\b/i,
    'provider data rights presented as granted; dataRights is NOT_GRANTED (D-04, D-07, D-10)',
  ],
  [
    /\b(?:redistribut\w+|resell\w+|reventa)\b[^.\n]{0,40}\b(?:is|are|está|están)\s+(?:allowed|permitted|included|granted|permitid[oa]|incluid[oa])\b/i,
    'redistribution rights presented as permitted; no redistribution right exists (D-04)',
  ],
  [
    /\boffline(?:\s+(?:access|data|presentation|rights?))?\s+(?:is|are|está|están)\s+\**(?:included|available|granted|permitted|supported|incluid[oa]|disponible|permitid[oa])\b/i,
    'offline entitlement presented as included; offline use needs matching source permission (D-04, D-07)',
  ],
  [
    /\b(?:guarantee[sd]?|guaranteed|garantiz\w+)\b[^.\n]{0,40}\b(?:forecast|previsi[oó]n|accuracy|exactitud)\b/i,
    'a forecast guarantee is prohibited: forecasts are probabilistic (D-04)',
  ],
  [
    /\b(?:forecast|previsi[oó]n)\w*\b[^.\n]{0,20}\b(?:100\s*%|guarantee|guaranteed|accuracy\s+of\s+\d|exactitud\s+(?:del?\s+)?\d)/i,
    'a forecast accuracy or guarantee claim is prohibited; accuracy is not measured (D-04)',
  ],
  [
    /\b(?:accuracy|exactitud|precisi[oó]n)\b[^.\n]{0,25}\b\d{1,3}(?:[.,]\d+)?\s*%/i,
    'a forecast accuracy percentage is prohibited: no accuracy evidence exists (D-04, §14)',
  ],
  [
    /\b\d{1,3}(?:[.,]\d+)?\s*%\s*(?:accurate|accuracy|precis[aeo]s?|exact[ao]s?|de\s+exactitud|de\s+precisi[oó]n)\b/i,
    'a forecast accuracy percentage is prohibited: no accuracy evidence exists (D-04, §14)',
  ],
  [
    /\b(?:official|exclusive|oficial|exclusiv[oa])\s+(?:weather\s+)?(?:warning|alerta|aviso)\s+service\b/i,
    'an official warning service or exclusive data claim is prohibited (D-04, §14)',
  ],
  [
    /\b(?:forecast|previsi[oó]n)\b[^.\n]{0,30}\b(?:is|are|es|son)\s+(?:an?\s+)?observations?\b/i,
    'a forecast must never be presented as an observation (D-04, §14)',
  ],
  [
    /\b(?:double[- ]?bill\w*|billed\s+twice|charged\s+twice|cobrad[oa]\s+dos\s+veces)\b/i,
    'the same entitlement must never be billed twice across NAV and WEATHER (brief §10)',
  ],
];

// FLEET: B2B/SaaS claims. No SLA, certification, unlimited plan, instant alert
// guarantee or cross-tenant access may be asserted.
const FLEET_CLAIM_RULES = [
  [
    /\b(?:SLA|uptime|service\s+level|nivel\s+de\s+servicio)\b[^.\n]{0,30}\b(?:guaranteed|committed|99[.,]\d+\s*%|garantizad[oa])\b/i,
    'a guaranteed SLA or uptime figure is prohibited: NO_SLA_ESTABLISHED (P-09, X-06)',
  ],
  [
    /\b99[.,]\d+\s*%\s*(?:uptime|availability|disponibilidad)\b/i,
    'a guaranteed uptime percentage is prohibited: no measurement evidence exists (P-09)',
  ],
  [
    /\b(?:ISO\s*27001|SOC\s*2|PCI[- ]DSS|Cyber\s*Essentials)\b[^.\n]{0,30}\b(?:certified|compliant|accredited)\b/i,
    'an unsupported security certification claim is prohibited (X-07)',
  ],
  [
    /\b(?:certified|accredited)\b[^.\n]{0,30}\b(?:ISO\s*27001|SOC\s*2|PCI[- ]DSS|Cyber\s*Essentials)\b/i,
    'an unsupported security certification claim is prohibited (X-07)',
  ],
  [
    /\bcertified\s+(?:multi[- ]tenant\s+)?security\b/i,
    'a certified multi-tenant security claim is prohibited; no certification exists (X-07, §14)',
  ],
  [
    /\b(?:remote|remotely|remot[oa])\s+(?:vessel\s+)?(?:steering|helm|motor|throttle|engine|control)\b[^.\n]{0,40}\b(?:available|included|supported|enabled|disponible|incluid[oa]|habilitad[oa])\b/i,
    'remote vessel control is prohibited: FLEET telemetry is read-only (brief §11)',
  ],
  [
    /\bunlimited\s+(?:vessels?|users?|seats?|storage|api\s+calls?|embarcaciones|usuarios)\b/i,
    'unlimited vessels, users, storage or API is prohibited; limits must be explicit (brief §4)',
  ],
  [
    /\bcross[- ]tenant\b[^.\n]{0,40}\b(?:allowed|permitted|supported|possible|enabled|permitid[oa])\b/i,
    'cross-tenant access is prohibited: organization A can never read or modify B (brief §11)',
  ],
  [
    /\b(?:can|could|may|might|is\s+able\s+to|are\s+able\s+to|allowed\s+to|permitted\s+to)\s+(?:access|read|modify|query|see|view|export|search)\b[^.\n]{0,30}\bcross[- ]tenant\b/i,
    'cross-tenant access is prohibited: organization A can never read or modify B (brief §11)',
  ],
  [
    /\bcross[- ]tenant\b[^.\n]{0,25}\b(?:data|access|records?|vessels?|reports?|exports?)\b[^.\n]{0,25}\b(?:is|are)\s+(?:allowed|permitted|granted|possible|enabled|visible|accessible|shared)\b/i,
    'cross-tenant access is prohibited: organization A can never read or modify B (brief §11)',
  ],
  [
    /\b(?:organization|organisation)\s+(?:administrators?|admins?|owners?|managers?|members?)\b[^.\n]{0,60}\bcross[- ]tenant\b/i,
    'cross-tenant access is prohibited: organization A can never read or modify B (brief §11)',
  ],
  [
    /\b(?:customer|production)\s+data\b[^.\n]{0,30}\b(?:is|are|has\s+been|have\s+been)\s+(?:used|included|utilizad[oa])\b/i,
    'no customer production data may be used or presented (X-06)',
  ],
];

// Trademark, source-IP and certification clearance must remain NOT_GRANTED/NOT_CLEARED.
const BATCH03_CLEARANCE_RULES = [
  [
    /\b(?:trademark|brand|marca)\b[^.\n]{0,40}\b(?:clearance|registration|approval|registro|aprobación)\b[^.\n]{0,30}\b(?:granted|obtained|approved|cleared|registered|concedid[oa]|obtenid[oa]|registrad[oa])\b/i,
    'MAREA trademark clearance is presented as granted; it is NOT_GRANTED (X-01)',
  ],
  [
    /\b(?:source[- ]IP|open[- ]marine|source\s+code)\b[^.\n]{0,40}\b(?:cleared|approved|granted|licensed|authori[sz]ed|liberad[oa]|aprobad[oa])\b/i,
    'OPEN-MARINE source rights are presented as cleared; they are NOT_CLEARED (X-01)',
  ],
  [
    /\b(?:certification|certificado|homologación)\b[^.\n]{0,30}\b(?:granted|obtained|issued|concedid[oa]|obtenid[oa])\b/i,
    'a certification is presented as granted; no MAREA product is certified (H-06, H-11, X-02)',
  ],
];

const BATCH03_CLAIM_RULES = [
  ...DISPLAY_CLAIM_RULES,
  ...WEATHER_CLAIM_RULES,
  ...FLEET_CLAIM_RULES,
  ...INGRESS_CLAIM_RULES,
  ...DELIVERY_GUARANTEE_RULES,
  ...STEERING_CLAIM_RULES,
];

// A line is negative context (a policy statement or a forbidden example) when it
// carries one of these markers. This is what lets the internal documents quote
// the very strings they prohibit without a false positive. The customer-facing
// copy drafts get no tolerance for purchase, price or naming violations.
// IMPORTANT: a status label such as HYPOTHESIS_UNAPPROVED is not a negation and
// must never exempt a line; the same applies to NOT_FOR_SALE/NOT_GRANTED/…
const EXEMPT_CONTEXT =
  /\b(?:not|never|nunca|no|sin|without|avoid|evitar|pending|unregistered|proposed|proposal|draft|forbidden\w*|prohibited\w*|prohibid[oa]s?|incorrect[oa]?s?|invalid|wrong|reject(?:ed|s)?|refus(?:e|es|ed|ing)|exclud(?:e|es|ed|ing)|must\s+not|cannot|can't|don't|do\s+not|shall\s+not|not\s+allowed|third[- ]part(?:y|ies)|existing|earlier|ajena|otra\s+marca|competitor|competidor|none|ninguna?|ningún)\b/i;
const BAD_MARKERS = /[❌✗🚫]|\b(?:BAD|WRONG|INCORRECT|FORBIDDEN|PROHIBITED|INVALID)\b/;
const TABLE_OR_SECTION_MARKER =
  /\b(?:forbidden|prohibited|incorrect|wrong|invalid|avoid|do\s+not|don't|must\s+not|not\s+allowed|reject(?:ed)?|anti-?pattern|prohibid[oa]s?|incorrect[oa]s?|evitar|nunca|limitations?|out\s+of\s+scope|never)\b/i;

// --- Helpers ----------------------------------------------------------------

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

// --- Load the scoped files --------------------------------------------------

const scopedDocFiles = (batch) =>
  Object.values(batch.docs).flatMap((value) =>
    typeof value === 'string' ? [value] : Object.values(value),
  );
const scopedCopyFiles = (batch) =>
  batch.products.flatMap((product) => [product.copy.es, product.copy.en]);
const scopedFilesFor = (batch) => [
  ...scopedDocFiles(batch),
  ...scopedCopyFiles(batch),
  batch.contractPath,
];

const SCOPED_DOC_FILES = [...new Set(BATCHES.flatMap(scopedDocFiles))];
const SCOPED_COPY_FILES = [...new Set(BATCHES.flatMap(scopedCopyFiles))];
const SCOPED_FILES = [...new Set(BATCHES.flatMap(scopedFilesFor))];

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

const contracts = new Map();
for (const batch of BATCHES) {
  const entry = { contract: null, error: null, text: texts.get(batch.contractPath) ?? null };
  if (entry.text !== null) {
    try {
      entry.contract = JSON.parse(entry.text);
    } catch (error) {
      entry.error = `cannot be parsed as JSON (${error.message})`;
    }
    if (entry.contract !== null && !isRecord(entry.contract)) {
      entry.contract = null;
      entry.error = 'is not a JSON object';
    }
  }
  contracts.set(batch.id, entry);
}
const contractOf = (batch) => contracts.get(batch.id)?.contract ?? null;
const contractErrorOf = (batch) => contracts.get(batch.id)?.error ?? null;

// The MC-02 blocker register is fixed evidence, never a scoped product document.
let mc02RegisterIds = null;
function registerIds() {
  if (mc02RegisterIds) return mc02RegisterIds;
  mc02RegisterIds = new Set();
  try {
    const text = readFileSync(resolve(root, MC02_REGISTER), 'utf8');
    for (const match of text.matchAll(/^\|\s*([A-Z]-\d{2})\s*\|/gm)) mc02RegisterIds.add(match[1]);
  } catch {
    // A missing register is reported by the blocker checks through the empty set.
  }
  return mc02RegisterIds;
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

function requireContract(record, batch) {
  const entry = contracts.get(batch.id);
  if (!entry) {
    record.failures.push(
      `${batch.contractPath} is missing; the product-definition contract is required`,
    );
    return null;
  }
  if (entry.error) {
    record.failures.push(`${batch.contractPath} ${entry.error}`);
    return null;
  }
  if (!entry.contract) {
    record.failures.push(
      `${batch.contractPath} is missing; the product-definition contract is required`,
    );
    return null;
  }
  return entry.contract;
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

// A price may be quoted as a prohibited example only in an explicit prohibition
// table, list or section. Unrelated negations on the same line ("connectivity
// excluded", "not soldable") must not exempt a forbidden figure (BLK-01).
function isProhibitedExampleContext(lines, index) {
  const line = lines[index];
  if (BAD_MARKERS.test(line)) return true;
  if (/^\s*\|/.test(line) && tableHeaderIsNegative(lines, index)) return true;
  if (listItemIsNegative(lines, index)) return true;
  return sectionIsNegative(lines, index);
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
  { tolerant, wideContext = false, skipQuestions = false, allowProposedTargets = false },
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
    // Internal engineering documents legitimately carry PROPOSED validation
    // targets; an achieved-accuracy claim is what the rules prohibit.
    if (allowProposedTargets) {
      const window = `${line} ${sentenceWindow(lines, index)}`;
      if (
        /\bPROPOSED\b|acceptance target|validation criteria|target only|future validation|criteri(?:a|on)|evidence (?:required|against)|required target|before launch|closing evidence/i.test(
          window,
        )
      )
        return;
    }
    for (const violation of detectLineViolations(line, rules)) {
      record.failures.push(`${relativePath}:${index + 1}: ${violation}`);
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

function collectContractTextViolations(record, batch, rules) {
  const contract = contractOf(batch);
  if (!contract) return;
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
      record.failures.push(`${batch.contractPath}: ${path}: ${message}`);
    }
  });
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

function parseEuroAmount(raw) {
  let value = raw.replace(/[^\d.,]/g, '');
  if (!value) return null;
  if (/^\d{1,3}(?:[.,]\d{3})+$/.test(value)) value = value.replace(/[.,]/g, '');
  else value = value.replace(/,/g, '.');
  const amount = Number(value);
  return Number.isFinite(amount) ? amount : null;
}

function euroAmountsInLine(line) {
  return euroAmountMatches(line).map(({ amount }) => amount);
}

function euroAmountMatches(line) {
  const matches = [];
  for (const match of line.matchAll(/\bEUR\s*([0-9][0-9.,]*)/gi)) {
    const amount = parseEuroAmount(match[1]);
    if (amount !== null) matches.push({ amount, matchIndex: match.index });
  }
  for (const match of line.matchAll(/([0-9][0-9.,]*)\s*(?:€|EUR\b)/gi)) {
    const amount = parseEuroAmount(match[1]);
    if (amount !== null) matches.push({ amount, matchIndex: match.index });
  }
  return matches;
}

function formatAmount(amount) {
  return Number.isInteger(amount) ? amount.toLocaleString('en-US') : String(amount);
}

const EVIDENCE_PRICE_CONTEXT =
  /\b(?:competitor|third[- ]party|external|reference|benchmark|public(?:ly)?\s+(?:listed|published|price)|official\s+(?:price|page|documentation|source)|accessed|retrieved|checked|source:|quoting)\b|https?:\/\/|www\./i;

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

// --- 2. Machine-readable contracts -----------------------------------------

check('json.contract', (record) => {
  for (const batch of BATCHES) {
    const contract = requireContract(record, batch);
    if (!contract) continue;
    for (const key of ['contractId', 'contractVersion', 'status', 'milestone', 'date', 'owner']) {
      if (!isFilled(contract[key]))
        record.failures.push(`${batch.contractPath}: contract.${key} is missing or empty`);
    }
    if (contract.contractId !== batch.contractId) {
      record.failures.push(
        `${batch.contractPath}: contractId must be "${batch.contractId}", found ${JSON.stringify(contract.contractId)}`,
      );
    }
    if (contract.status !== 'INTERNAL_PRODUCT_DEFINITION_CONTRACT') {
      record.failures.push(
        `${batch.contractPath}: status must be "INTERNAL_PRODUCT_DEFINITION_CONTRACT", found ${JSON.stringify(contract.status)}`,
      );
    }
    if (contract.milestone !== batch.milestone) {
      record.failures.push(
        `${batch.contractPath}: milestone must be "${batch.milestone}", found ${JSON.stringify(contract.milestone)}`,
      );
    }
    if (contract.notACommerceCatalog !== true)
      record.failures.push(
        `${batch.contractPath}: notACommerceCatalog must be true: this contract is not a shop catalogue`,
      );
    if (contract.notTheFutureCommerceDataModel !== true)
      record.failures.push(
        `${batch.contractPath}: notTheFutureCommerceDataModel must be true: the MC-16 commerce data model is out of scope`,
      );
    if (contract.publicationState !== 'INTERNAL_ONLY')
      record.failures.push(
        `${batch.contractPath}: publicationState must be "INTERNAL_ONLY", found ${JSON.stringify(contract.publicationState)}`,
      );
    if (contract.lifecycleDecision !== 'D-007') {
      record.failures.push(
        `${batch.contractPath}: lifecycleDecision must be "D-007" (the lifecycle reconciliation decision in docs/marea/execution/DECISION-LOG.md), found ${JSON.stringify(contract.lifecycleDecision)}`,
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
        `${batch.contractPath}: lifecycleVocabulary must be exactly the seven binding states: ${LIFECYCLE_VOCABULARY.join(', ')}`,
      );
    }

    const mapping = contract.lifecycleMapping;
    if (!Array.isArray(mapping) || mapping.length === 0) {
      record.failures.push(
        `${batch.contractPath}: lifecycleMapping must be a non-empty array of {proposed, binding} entries`,
      );
    } else {
      const covered = [];
      for (const entry of mapping) {
        if (!isRecord(entry) || !isFilled(entry.proposed) || !isFilled(entry.binding)) {
          record.failures.push(
            `${batch.contractPath}: lifecycleMapping contains an entry without proposed/binding strings`,
          );
          continue;
        }
        covered.push(entry.proposed);
        if (!LIFECYCLE_VOCABULARY.includes(entry.binding)) {
          record.failures.push(
            `${batch.contractPath}: lifecycleMapping maps ${entry.proposed} to ${entry.binding}, which is not in the binding vocabulary`,
          );
        }
      }
      for (const state of MASTER_PROMPT_STATES) {
        if (!covered.includes(state))
          record.failures.push(
            `${batch.contractPath}: lifecycleMapping does not cover the Master-Prompt state ${state}`,
          );
      }
    }

    if (!isRecord(contract.readinessDimensions)) {
      record.failures.push(
        `${batch.contractPath}: readinessDimensions must be an object mapping each dimension to its allowed values`,
      );
    } else {
      const actualKeys = Object.keys(contract.readinessDimensions).sort();
      const expectedKeys = Object.keys(READINESS_DIMENSIONS).sort();
      if (actualKeys.join('|') !== expectedKeys.join('|')) {
        record.failures.push(
          `${batch.contractPath}: readinessDimensions must declare exactly: ${expectedKeys.join(', ')}`,
        );
      }
      for (const [dimension, allowed] of Object.entries(READINESS_DIMENSIONS)) {
        const declared = contract.readinessDimensions[dimension];
        if (!Array.isArray(declared) || declared.join('|') !== allowed.join('|')) {
          record.failures.push(
            `${batch.contractPath}: readinessDimensions.${dimension} must be [${allowed.join(', ')}]`,
          );
        }
      }
    }

    const classes = contract.evidenceClasses;
    if (!Array.isArray(classes) || classes.join('|') !== EVIDENCE_CLASSES.join('|')) {
      record.failures.push(
        `${batch.contractPath}: evidenceClasses must be exactly [${EVIDENCE_CLASSES.join(', ')}]`,
      );
    }

    if (!isRecord(contract.globalRestrictions)) {
      record.failures.push(`${batch.contractPath}: globalRestrictions is missing`);
    } else {
      for (const [key, expected] of Object.entries(batch.requiredGlobalRestrictions)) {
        const actual = contract.globalRestrictions[key];
        if (actual !== expected) {
          record.failures.push(
            `${batch.contractPath}: globalRestrictions.${key} must be ${JSON.stringify(expected)}, found ${JSON.stringify(actual)}`,
          );
        }
      }
    }
  }
  const first = contractOf(BATCH_01);
  record.detail = first
    ? `contracts ${BATCHES.map((batch) => contractOf(batch)?.contractVersion ?? '?').join(' / ')}`
    : 'contracts missing';
});

// --- 3. Products, editions, readiness --------------------------------------

check('json.products', (record) => {
  for (const batch of BATCHES) {
    const contract = requireContract(record, batch);
    if (!contract) continue;
    const products = contract.products;
    if (!Array.isArray(products)) {
      record.failures.push(`${batch.contractPath}: products must be an array`);
      continue;
    }
    if (products.length !== batch.products.length) {
      record.failures.push(
        `${batch.contractPath}: products has ${products.length} entries; expected exactly ${batch.products.length} (${batch.products.map((product) => product.id).join(', ')})`,
      );
    }
    const ids = products.map((product) => product?.id);
    if (new Set(ids).size !== ids.length)
      record.failures.push(`${batch.contractPath}: product ids are not unique`);
    for (const expected of batch.products) {
      const product = products.find((entry) => entry?.id === expected.id);
      if (!product) {
        record.failures.push(
          `${batch.contractPath}: product ${expected.id} is missing from the contract`,
        );
        continue;
      }
      if (product.displayName !== expected.displayName) {
        record.failures.push(
          `${batch.contractPath}: product ${expected.id}: displayName must be exactly ${JSON.stringify(expected.displayName)}, found ${JSON.stringify(product.displayName)}`,
        );
      }
      if (product.type !== expected.type) {
        record.failures.push(
          `${batch.contractPath}: product ${expected.id}: type must be ${JSON.stringify(expected.type)}, found ${JSON.stringify(product.type)}`,
        );
      }
      if (product.lifecycleState !== 'DEFINED') {
        record.failures.push(
          `${batch.contractPath}: product ${expected.id}: lifecycleState must be "DEFINED" at ${batch.milestone}, found ${JSON.stringify(product.lifecycleState)}`,
        );
      }
      if (!isRecord(product.readiness)) {
        record.failures.push(`${batch.contractPath}: product ${expected.id}: readiness is missing`);
      } else {
        for (const [dimension, allowed] of Object.entries(READINESS_DIMENSIONS)) {
          const value = product.readiness[dimension];
          if (!isFilled(value)) {
            record.failures.push(
              `${batch.contractPath}: product ${expected.id}: readiness.${dimension} is missing`,
            );
          } else if (!allowed.includes(value)) {
            record.failures.push(
              `${batch.contractPath}: product ${expected.id}: readiness.${dimension} must be one of [${allowed.join(', ')}], found ${JSON.stringify(value)}`,
            );
          }
        }
        for (const [dimension, required] of Object.entries(expected.requiredReadiness)) {
          if (product.readiness[dimension] !== required) {
            record.failures.push(
              `${batch.contractPath}: product ${expected.id}: readiness.${dimension} must be ${required} at ${batch.milestone}, found ${JSON.stringify(product.readiness[dimension])}`,
            );
          }
        }
        if (
          expected.type.includes('HARDWARE') &&
          !HARDWARE_SPECIFIC_DIMENSION_VALUES.includes(product.readiness.hardware)
        ) {
          record.failures.push(
            `${batch.contractPath}: product ${expected.id}: a hardware product must carry a hardware-specific readiness value, found ${JSON.stringify(product.readiness.hardware)}`,
          );
        }
      }
      if (
        !isRecord(product.copy) ||
        product.copy.es !== expected.copy.es ||
        product.copy.en !== expected.copy.en
      ) {
        record.failures.push(
          `${batch.contractPath}: product ${expected.id}: copy.es/copy.en must reference ${expected.copy.es} and ${expected.copy.en}`,
        );
      }
      if (!Array.isArray(product.mc02Blockers) || product.mc02Blockers.length === 0) {
        record.failures.push(
          `${batch.contractPath}: product ${expected.id}: mc02Blockers must be a non-empty array`,
        );
      } else {
        const invalid = product.mc02Blockers.filter(
          (entry) => typeof entry !== 'string' || !/^[A-Z]-\d{2}$/.test(entry),
        );
        if (invalid.length)
          record.failures.push(
            `${batch.contractPath}: product ${expected.id}: mc02Blockers contains invalid ids: ${invalid.map((entry) => JSON.stringify(entry)).join(', ')}`,
          );
        for (const blocker of product.mc02Blockers) {
          if (typeof blocker === 'string' && !registerIds().has(blocker)) {
            record.failures.push(
              `${batch.contractPath}: product ${expected.id}: mc02Blockers references ${blocker}, which is not in the MC-02 register`,
            );
          }
        }
        for (const blocker of expected.minimumBlockers) {
          if (!product.mc02Blockers.includes(blocker)) {
            record.failures.push(
              `${batch.contractPath}: product ${expected.id}: mc02Blockers is missing the mandatory blocker ${blocker}`,
            );
          }
        }
      }
    }
  }
  record.detail = `${BATCHES.flatMap((batch) => batch.products).length} products`;
});

check('json.editions', (record) => {
  for (const batch of BATCHES) {
    const contract = requireContract(record, batch);
    if (!contract) continue;
    const products = Array.isArray(contract.products) ? contract.products : [];
    for (const expectedProduct of batch.products) {
      const product = products.find((entry) => entry?.id === expectedProduct.id);
      if (!product) continue;
      const editions = product.editions;
      if (!Array.isArray(editions)) {
        record.failures.push(
          `${batch.contractPath}: product ${expectedProduct.id}: editions must be an array`,
        );
        continue;
      }
      if (editions.length !== expectedProduct.editions.length) {
        record.failures.push(
          `${batch.contractPath}: product ${expectedProduct.id}: ${editions.length} editions declared; expected exactly ${expectedProduct.editions.length}`,
        );
      }
      const editionIds = editions.map((edition) => edition?.id);
      if (new Set(editionIds).size !== editionIds.length)
        record.failures.push(
          `${batch.contractPath}: product ${expectedProduct.id}: edition ids are not unique`,
        );
      for (const wanted of expectedProduct.editions) {
        const edition = editions.find((entry) => entry?.id === wanted.id);
        if (!edition) {
          record.failures.push(
            `${batch.contractPath}: product ${expectedProduct.id}: edition ${wanted.id} is missing`,
          );
          continue;
        }
        if (edition.displayName !== wanted.displayName) {
          record.failures.push(
            `${batch.contractPath}: product ${expectedProduct.id}: edition ${wanted.id} displayName must be exactly ${JSON.stringify(wanted.displayName)}, found ${JSON.stringify(edition.displayName)}`,
          );
        }
        if (batch.id === 1) {
          const price = edition.priceHypothesis;
          if (!isRecord(price)) {
            record.failures.push(
              `${batch.contractPath}: product ${expectedProduct.id}: edition ${wanted.id} priceHypothesis is missing`,
            );
            continue;
          }
          if (price.status !== PRICE_HYPOTHESIS_RULES.status) {
            record.failures.push(
              `${batch.contractPath}: product ${expectedProduct.id}: edition ${wanted.id} priceHypothesis.status must be "${PRICE_HYPOTHESIS_RULES.status}", found ${JSON.stringify(price.status)}`,
            );
          }
          if (price.amount !== wanted.amount) {
            record.failures.push(
              `${batch.contractPath}: product ${expectedProduct.id}: edition ${wanted.id} price hypothesis must be ${wanted.amount} EUR, found ${JSON.stringify(price.amount)}`,
            );
          }
          if (price.currency !== PRICE_HYPOTHESIS_RULES.currency) {
            record.failures.push(
              `${batch.contractPath}: product ${expectedProduct.id}: edition ${wanted.id} priceHypothesis.currency must be "EUR", found ${JSON.stringify(price.currency)}`,
            );
          }
          if (price.period !== wanted.period) {
            record.failures.push(
              `${batch.contractPath}: product ${expectedProduct.id}: edition ${wanted.id} priceHypothesis.period must be "${wanted.period}", found ${JSON.stringify(price.period)}`,
            );
          }
          if (!isFilled(price.vatBasis))
            record.failures.push(
              `${batch.contractPath}: product ${expectedProduct.id}: edition ${wanted.id} priceHypothesis.vatBasis is missing`,
            );
          if (price.validationRequired !== true)
            record.failures.push(
              `${batch.contractPath}: product ${expectedProduct.id}: edition ${wanted.id} priceHypothesis.validationRequired must be true`,
            );
          if (!Array.isArray(price.blockers))
            record.failures.push(
              `${batch.contractPath}: product ${expectedProduct.id}: edition ${wanted.id} priceHypothesis.blockers must be an array`,
            );
        } else {
          // Batch 02: an edition either carries an allowed hypothesis or no price at
          // all; a prohibited edition never carries a figure (README §17, §18).
          if (edition.priceState !== wanted.priceState) {
            record.failures.push(
              `${batch.contractPath}: product ${expectedProduct.id}: edition ${wanted.id} priceState must be "${wanted.priceState}", found ${JSON.stringify(edition.priceState)}`,
            );
          }
          if (wanted.priceState === 'NOT_ESTABLISHED') {
            if (edition.priceHypothesis !== null) {
              record.failures.push(
                `${batch.contractPath}: product ${expectedProduct.id}: edition ${wanted.id} must carry no price hypothesis while its price is not established`,
              );
            }
          } else {
            const price = edition.priceHypothesis;
            if (!isRecord(price)) {
              record.failures.push(
                `${batch.contractPath}: product ${expectedProduct.id}: edition ${wanted.id} priceHypothesis is missing`,
              );
            } else {
              if (price.status !== PRICE_HYPOTHESIS_RULES.status) {
                record.failures.push(
                  `${batch.contractPath}: product ${expectedProduct.id}: edition ${wanted.id} priceHypothesis.status must be "${PRICE_HYPOTHESIS_RULES.status}", found ${JSON.stringify(price.status)}`,
                );
              }
              if (price.amount !== wanted.amount) {
                record.failures.push(
                  `${batch.contractPath}: product ${expectedProduct.id}: edition ${wanted.id} price hypothesis must be ${wanted.amount} EUR, found ${JSON.stringify(price.amount)}`,
                );
              }
              if (price.currency !== PRICE_HYPOTHESIS_RULES.currency) {
                record.failures.push(
                  `${batch.contractPath}: product ${expectedProduct.id}: edition ${wanted.id} priceHypothesis.currency must be "EUR", found ${JSON.stringify(price.currency)}`,
                );
              }
              if (price.period !== wanted.period) {
                record.failures.push(
                  `${batch.contractPath}: product ${expectedProduct.id}: edition ${wanted.id} priceHypothesis.period must be "${wanted.period}", found ${JSON.stringify(price.period)}`,
                );
              }
              if (!isFilled(price.vatBasis))
                record.failures.push(
                  `${batch.contractPath}: product ${expectedProduct.id}: edition ${wanted.id} priceHypothesis.vatBasis is missing`,
                );
              if (price.validationRequired !== true)
                record.failures.push(
                  `${batch.contractPath}: product ${expectedProduct.id}: edition ${wanted.id} priceHypothesis.validationRequired must be true`,
                );
              if (!Array.isArray(price.blockers))
                record.failures.push(
                  `${batch.contractPath}: product ${expectedProduct.id}: edition ${wanted.id} priceHypothesis.blockers must be an array`,
                );
              if (wanted.startingPrice && price.startingPrice !== true)
                record.failures.push(
                  `${batch.contractPath}: product ${expectedProduct.id}: edition ${wanted.id} price hypothesis must be marked as a starting price`,
                );
              if (wanted.notAnInclusiveQuotation && price.notAnInclusiveQuotation !== true)
                record.failures.push(
                  `${batch.contractPath}: product ${expectedProduct.id}: edition ${wanted.id} price hypothesis must state it is not an inclusive quotation (D-009)`,
                );
            }
          }
          if (wanted.subscription !== null && wanted.subscription !== undefined) {
            const subscription = edition.subscriptionHypothesis;
            if (!isRecord(subscription)) {
              record.failures.push(
                `${batch.contractPath}: product ${expectedProduct.id}: edition ${wanted.id} subscriptionHypothesis is missing; every edition that declares a subscription entitlement must state it`,
              );
            } else {
              if (subscription.status !== PRICE_HYPOTHESIS_RULES.status) {
                record.failures.push(
                  `${batch.contractPath}: product ${expectedProduct.id}: edition ${wanted.id} subscriptionHypothesis.status must be "${PRICE_HYPOTHESIS_RULES.status}", found ${JSON.stringify(subscription.status)}`,
                );
              }
              if (subscription.amount !== wanted.subscription.amount) {
                record.failures.push(
                  `${batch.contractPath}: product ${expectedProduct.id}: edition ${wanted.id} subscription hypothesis must start at ${JSON.stringify(wanted.subscription.amount)} EUR, found ${JSON.stringify(subscription.amount)}`,
                );
              }
              if (subscription.currency !== 'EUR')
                record.failures.push(
                  `${batch.contractPath}: product ${expectedProduct.id}: edition ${wanted.id} subscriptionHypothesis.currency must be "EUR"`,
                );
              if (subscription.period !== wanted.subscription.period)
                record.failures.push(
                  `${batch.contractPath}: product ${expectedProduct.id}: edition ${wanted.id} subscriptionHypothesis.period must be "${wanted.subscription.period}"`,
                );
              if (wanted.subscription.amount === null) {
                // WATCH Plus carries a required entitlement whose price is NOT ESTABLISHED.
                if (subscription.priceState !== 'NOT_ESTABLISHED')
                  record.failures.push(
                    `${batch.contractPath}: product ${expectedProduct.id}: edition ${wanted.id} subscriptionHypothesis.priceState must be "NOT_ESTABLISHED" while its price is open`,
                  );
                if (subscription.amount !== null)
                  record.failures.push(
                    `${batch.contractPath}: product ${expectedProduct.id}: edition ${wanted.id} subscription hypothesis must not state a price; it is NOT ESTABLISHED`,
                  );
              } else if (subscription.startingPrice !== true) {
                record.failures.push(
                  `${batch.contractPath}: product ${expectedProduct.id}: edition ${wanted.id} subscription hypothesis must be marked as a starting price`,
                );
              }
              if (subscription.includes !== 'OPEN')
                record.failures.push(
                  `${batch.contractPath}: product ${expectedProduct.id}: edition ${wanted.id} subscriptionHypothesis.includes must be "OPEN": what the subscription includes is not established`,
                );
            }
          } else if (edition.subscriptionHypothesis !== null) {
            record.failures.push(
              `${batch.contractPath}: product ${expectedProduct.id}: edition ${wanted.id} subscriptionHypothesis must be null; this edition declares no subscription entitlement`,
            );
          }
        }
        // No edition is ever approved, released or for sale.
        const verdict = edition.editionVerdict;
        if (!isRecord(verdict)) {
          record.failures.push(
            `${batch.contractPath}: product ${expectedProduct.id}: edition ${wanted.id} editionVerdict is missing; no edition may be flattened to "approved"`,
          );
        } else {
          const allowedVerdictStatuses =
            batch.id === 1
              ? wanted.verdictStatus === 'CONDITIONAL'
                ? ['CONDITIONAL']
                : ['DEFINED']
              : [wanted.verdictStatus];
          if (!allowedVerdictStatuses.includes(verdict.status)) {
            record.failures.push(
              `${batch.contractPath}: product ${expectedProduct.id}: edition ${wanted.id} editionVerdict.status must be ${allowedVerdictStatuses.map((value) => JSON.stringify(value)).join(' or ')} at ${batch.milestone}, found ${JSON.stringify(verdict.status)}`,
            );
          }
          if (verdict.publicationConditional !== true) {
            record.failures.push(
              `${batch.contractPath}: product ${expectedProduct.id}: edition ${wanted.id} editionVerdict.publicationConditional must be true; no edition is publishable at ${batch.milestone}`,
            );
          }
          if (
            ['APPROVED', 'JUSTIFIED', 'RELEASED', 'FOR_SALE', 'PUBLISHABLE'].includes(
              verdict.verdict,
            )
          ) {
            record.failures.push(
              `${batch.contractPath}: product ${expectedProduct.id}: edition ${wanted.id} must not be presented as ${verdict.verdict}`,
            );
          }
          if (
            batch.id === 1 &&
            wanted.verdict === 'NOT_YET_JUSTIFIED' &&
            verdict.verdict !== 'NOT_YET_JUSTIFIED'
          ) {
            record.failures.push(
              `${batch.contractPath}: product ${expectedProduct.id}: edition ${wanted.id} editionVerdict.verdict must be "NOT_YET_JUSTIFIED"`,
            );
          }
          if (!isFilled(verdict.rationale)) {
            record.failures.push(
              `${batch.contractPath}: product ${expectedProduct.id}: edition ${wanted.id} editionVerdict.rationale is missing or empty`,
            );
          }
          if (!Array.isArray(verdict.evidenceRefs) || verdict.evidenceRefs.length === 0) {
            record.failures.push(
              `${batch.contractPath}: product ${expectedProduct.id}: edition ${wanted.id} editionVerdict.evidenceRefs must be a non-empty array`,
            );
          } else {
            for (const reference of verdict.evidenceRefs) {
              if (!evidenceRefExists(reference)) {
                record.failures.push(
                  `${batch.contractPath}: product ${expectedProduct.id}: edition ${wanted.id} editionVerdict.evidenceRefs references ${JSON.stringify(reference)}, which does not resolve to a scoped document`,
                );
              }
            }
          }
        }
      }
    }
    if (batch.id === 1) {
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
          `${batch.contractPath}: AIS-CONNECTED editionVerdict must be CONDITIONAL / NOT_YET_JUSTIFIED, per MAREA-AIS-COMMERCIAL-SPEC.md §3`,
        );
      }
      const aisDossier = textOf(BATCH_01.docs.dossiers.AIS);
      if (aisDossier !== null) {
        const normalized = normalizeForCheck(aisDossier);
        if (!normalized.includes('conditional') || !normalized.includes('not yet justified')) {
          record.failures.push(
            `${BATCH_01.docs.dossiers.AIS}: no longer records the Connected edition verdict as CONDITIONAL / not yet justified`,
          );
        }
      }
    }
  }
});

// --- 4. The 24 required fields in the JSON contracts -----------------------

function countSentences(value) {
  const masked = value.replace(/\b(?:e\.g|i\.e|cf|approx|vs|incl|excl)\./gi, 'X');
  return (masked.match(/[.!?](?:\s|$)/g) ?? []).length;
}

function checkFieldEntry(record, batch, productId, key, entry) {
  const prefix = `${batch.contractPath}: product ${productId}: fields.${key}`;
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
  if (!Array.isArray(entry.blockers)) {
    record.failures.push(`${prefix}.blockers must be an array`);
  } else {
    for (const blocker of entry.blockers) {
      if (typeof blocker !== 'string' || !/^[A-Z]-\d{2}$/.test(blocker)) {
        record.failures.push(
          `${prefix}.blockers contains the invalid blocker id ${JSON.stringify(blocker)}`,
        );
      } else if (!registerIds().has(blocker)) {
        record.failures.push(
          `${prefix}.blockers references ${blocker}, which is not in the MC-02 register`,
        );
      }
    }
  }
  if (
    !isFilled(entry.readinessDimension) ||
    !Object.hasOwn(READINESS_DIMENSIONS, entry.readinessDimension)
  ) {
    record.failures.push(
      `${prefix}.readinessDimension must name one of [${Object.keys(READINESS_DIMENSIONS).join(', ')}], found ${JSON.stringify(entry.readinessDimension)}`,
    );
  } else if (
    !isFilled(entry.readinessValue) ||
    !READINESS_DIMENSIONS[entry.readinessDimension].includes(entry.readinessValue)
  ) {
    record.failures.push(
      `${prefix}.readinessValue must be one of [${READINESS_DIMENSIONS[entry.readinessDimension].join(', ')}] for readinessDimension ${entry.readinessDimension}, found ${JSON.stringify(entry.readinessValue)}`,
    );
  } else if (
    batch.id >= 2 &&
    isRecord(contractOf(batch)?.products?.find((product) => product.id === productId)?.readiness)
  ) {
    // Batch 02 keeps every field's stated readiness inside the product's honest
    // dimension values: a field may repeat the product value or a lower one, never
    // a higher one. A simple equality guard is used only for dimensions that are
    // invariant across the whole milestone.
    const productReadiness = contractOf(batch).products.find(
      (product) => product.id === productId,
    ).readiness;
    const invariantDimensions = [
      'definition',
      'licensing',
      'pricing',
      'brandPublication',
      'availability',
    ];
    if (
      invariantDimensions.includes(entry.readinessDimension) &&
      entry.readinessValue !== productReadiness[entry.readinessDimension]
    ) {
      record.failures.push(
        `${prefix}.readinessValue must equal the product readiness ${JSON.stringify(productReadiness[entry.readinessDimension])} for the invariant dimension ${entry.readinessDimension}, found ${JSON.stringify(entry.readinessValue)}`,
      );
    }
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
  for (const batch of BATCHES) {
    const contract = requireContract(record, batch);
    if (!contract) continue;
    const products = Array.isArray(contract.products) ? contract.products : [];
    for (const expected of batch.products) {
      const product = products.find((entry) => entry?.id === expected.id);
      if (!product) continue;
      if (!isRecord(product.fields)) {
        record.failures.push(`${batch.contractPath}: product ${expected.id}: fields is missing`);
        continue;
      }
      const actualKeys = Object.keys(product.fields);
      for (const key of FIELD_KEYS) {
        if (!Object.hasOwn(product.fields, key)) {
          record.failures.push(
            `${batch.contractPath}: product ${expected.id}: the 24-field contract is missing field "${key}"`,
          );
          continue;
        }
        checkFieldEntry(record, batch, expected.id, key, product.fields[key]);
      }
      const unexpected = actualKeys.filter((key) => !FIELD_KEYS.includes(key));
      if (unexpected.length)
        record.failures.push(
          `${batch.contractPath}: product ${expected.id}: fields contains non-canonical keys: ${unexpected.join(', ')}`,
        );
    }
  }
});

// --- 5. Every value traceable, no placeholders ------------------------------

check('json.traceability', (record) => {
  let references = 0;
  for (const batch of BATCHES) {
    const contract = requireContract(record, batch);
    if (!contract) continue;
    const products = Array.isArray(contract.products) ? contract.products : [];
    for (const product of products) {
      if (!isRecord(product.fields)) continue;
      for (const [key, entry] of Object.entries(product.fields)) {
        if (!isRecord(entry) || !Array.isArray(entry.evidenceRefs)) continue;
        for (const reference of entry.evidenceRefs) {
          references += 1;
          if (!evidenceRefExists(reference)) {
            record.failures.push(
              `${batch.contractPath}: product ${product.id}: fields.${key}.evidenceRefs references ${JSON.stringify(reference)}, which does not resolve to a scoped document`,
            );
          }
        }
      }
    }
  }
  record.detail = `${references} evidence references resolved`;
});

check('placeholders', (record) => {
  const placeholder = /(?<![A-Za-z])TBD(?![A-Za-z])/i;
  for (const [relativePath, text] of texts) {
    if (BATCHES.some((batch) => batch.contractPath === relativePath)) {
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
  for (const batch of BATCHES) {
    for (const product of batch.products) {
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
  }
});

// --- 7. Edition comparison (D4) --------------------------------------------

function productEditionIds(batch) {
  return batch.products.flatMap((product) => product.editions.map((edition) => edition.id));
}

check('editions.comparison', (record) => {
  for (const batch of BATCHES) {
    const text = textOf(batch.docs.editions);
    if (text === null) {
      record.failures.push(`${batch.docs.editions} is missing; the edition comparison is required`);
      continue;
    }
    const normalized = text.toLowerCase().replace(/\s+/g, ' ');
    for (const product of batch.products) {
      if (!containsToken(normalized, product.displayName.toLowerCase())) {
        record.failures.push(
          `${batch.docs.editions}: product ${product.displayName} is not present in the edition comparison`,
        );
      }
      for (const edition of product.editions) {
        if (!containsToken(normalized, edition.displayName.toLowerCase())) {
          record.failures.push(
            `${batch.docs.editions}: edition ${edition.displayName} is missing from the edition comparison`,
          );
        }
        if (!containsToken(normalized, edition.id.toLowerCase())) {
          record.failures.push(
            `${batch.docs.editions}: edition id ${edition.id} does not appear in the edition comparison; D4 is the edition authority and must name every edition id`,
          );
        }
      }
    }
    // D4 is the edition-id authority: no unknown edition id may appear.
    const knownEditionIds = productEditionIds(batch);
    const families = batch.products.map((product) => product.id).join('|');
    // Filenames such as MAREA-NAV-COMMERCIAL-SPEC.md are not edition ids: a
    // candidate id must not be followed by another name segment or a file suffix.
    for (const match of text.matchAll(
      new RegExp(`\\b(?:${families})-[A-Z][A-Z0-9]+\\b(?![.\\-])`, 'g'),
    )) {
      if (knownEditionIds.includes(match[0])) continue;
      // Cross-product relationship labels (FLEET-HUB) and asset suffixes are not
      // edition ids; any other family-prefixed identifier is.
      const segments = match[0].split('-');
      if (
        segments.length === 2 &&
        (CANONICAL_FAMILY_IDS.includes(segments[1]) || BATCH03_ASSET_SUFFIXES.includes(segments[1]))
      )
        continue;
      record.failures.push(
        `${batch.docs.editions}: unknown edition id ${match[0]} appears in the edition authority; only the canonical ${batch.milestone} edition ids may exist`,
      );
    }
    const normalizedAuthority = normalizeForCheck(text);
    if (batch.id === 1) {
      // The AIS Connected verdict must be recorded, not flattened.
      for (const phrase of ['conditional', 'not yet justified']) {
        if (!normalizedAuthority.includes(phrase)) {
          record.failures.push(
            `${batch.docs.editions}: does not record the AIS-CONNECTED verdict as CONDITIONAL / not yet justified (missing ${JSON.stringify(phrase)})`,
          );
        }
      }
    } else {
      // Batch-02 verdict vocabulary (README §14, §18): DEFINED, CONDITIONAL and
      // INSTALLATION_PACKAGE are the only verdicts; every expected verdict appears.
      const requiredVerdicts = new Set([
        ...(batch.id === 2
          ? ['DEFINED', 'CONDITIONAL', 'INSTALLATION_PACKAGE']
          : ['DEFINED', 'CONDITIONAL']),
        ...batch.products.flatMap((product) =>
          product.editions.map((edition) => edition.verdictStatus),
        ),
      ]);
      for (const verdict of requiredVerdicts) {
        if (!text.includes(verdict)) {
          record.failures.push(
            `${batch.docs.editions}: does not use the canonical edition verdict ${verdict}`,
          );
        }
      }
      for (const prohibited of LIFECYCLE_FORBIDDEN_FOR_BATCH02) {
        const lines = text.split(/\r?\n/);
        lines.forEach((line, index) => {
          if (!containsToken(line, prohibited)) return;
          if (isNegativeContext(lines, index, { wideContext: true })) return;
          record.failures.push(
            `${batch.docs.editions}:${index + 1}: the prohibited edition verdict ${prohibited} is presented as current`,
          );
        });
      }
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

function numberedHeadings(text) {
  return text
    .split(/\r?\n/)
    .filter((line) => /^\s{0,3}##\s+\d{1,2}[.)]\s+\S/.test(line))
    .map((line) => {
      const match = /^\s{0,3}##\s+(\d{1,2})[.)]\s+(.*)$/.exec(line);
      return { number: Number(match[1]), label: match[2].trim() };
    });
}

check('copy.pairs', (record) => {
  for (const batch of BATCHES) {
    for (const product of batch.products) {
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
  }
});

check('batch02.copy', (record) => {
  const navEs = textOf(BATCH_01.products[0].copy.es);
  const navEn = textOf(BATCH_01.products[0].copy.en);
  const reference = {
    es: navEs === null ? null : numberedHeadings(navEs),
    en: navEn === null ? null : numberedHeadings(navEn),
  };
  for (const expected of BATCH_02.products) {
    for (const language of ['es', 'en']) {
      const file = expected.copy[language];
      const text = textOf(file);
      if (text === null) continue;
      const headings = numberedHeadings(text);
      const referenceHeadings = reference[language];
      if (headings.length !== 24) {
        record.failures.push(
          `${file}: has ${headings.length} numbered customer-copy sections; the batch-02 copy uses the exact 24 numbered sections of copy/nav.${language}.md`,
        );
      }
      const numbers = headings.map((heading) => heading.number);
      const expectedNumbers = Array.from({ length: 24 }, (_value, index) => index + 1);
      if (numbers.join('|') !== expectedNumbers.join('|')) {
        record.failures.push(
          `${file}: numbered copy sections must be exactly 1..24 in order, found [${numbers.join(', ')}]`,
        );
      }
      if (referenceHeadings !== null && referenceHeadings.length === 24) {
        for (const heading of headings) {
          const wanted = referenceHeadings.find((entry) => entry.number === heading.number);
          if (wanted && wanted.label !== heading.label) {
            record.failures.push(
              `${file}: section ${heading.number} heading must use the exact wording of copy/nav.${language}.md (${JSON.stringify(wanted.label)}), found ${JSON.stringify(heading.label)}`,
            );
          }
        }
      }
      if (!/(?:avisos\s+aprobados|approved\s+disclaimers|texto\s+literal|verbatim)/i.test(text)) {
        record.failures.push(`${file}: must end with an approved-disclaimer section (README §22)`);
      }
    }
  }
});

// --- 9. Naming -------------------------------------------------------------

check('names', (record) => {
  for (const batch of BATCHES) {
    const contract = contractOf(batch);
    if (!contract) continue;
    const products = Array.isArray(contract.products) ? contract.products : [];
    for (const expected of batch.products) {
      const product = products.find((entry) => entry?.id === expected.id);
      if (!product) continue;
      if (product.displayName !== expected.displayName) {
        record.failures.push(
          `${batch.contractPath}: product ${expected.id}: displayName must be exactly "${expected.displayName}"`,
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
  for (const batch of BATCHES) {
    const contract = contractOf(batch);
    if (contract) {
      const products = Array.isArray(contract.products) ? contract.products : [];
      for (const product of products) {
        if (product?.lifecycleState !== 'DEFINED') {
          record.failures.push(
            `${batch.contractPath}: product ${product?.id}: lifecycleState must be "DEFINED" at ${batch.milestone}, found ${JSON.stringify(product?.lifecycleState)}`,
          );
        }
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
  // separate dimensions). This applies to documents and the JSON contracts.
  const readyBoolean = /[A-Za-z_]*(?:ready|Ready|READY)[A-Za-z_]*["']?\s*[:=]\s*true\b/;
  for (const [file, text] of texts) {
    const lines = text.split(/\r?\n/);
    lines.forEach((line, index) => {
      if (!readyBoolean.test(line)) return;
      if (!BATCHES.some((batch) => batch.contractPath === file) && isNegativeContext(lines, index))
        return;
      record.failures.push(
        `${file}:${index + 1}: a READY-style boolean is prohibited; readiness is nine separate dimensions`,
      );
    });
  }
});

// --- 11. Availability ------------------------------------------------------

check('availability', (record) => {
  for (const batch of BATCHES) {
    const contract = contractOf(batch);
    if (!contract) continue;
    walkJsonEntries(contract, (key, value, path) => {
      if (/availability$/i.test(key) && typeof value === 'string' && value !== 'NOT_FOR_SALE') {
        record.failures.push(
          `${batch.contractPath}: ${path} must be "NOT_FOR_SALE", found ${JSON.stringify(value)}`,
        );
      }
    });
    collectContractTextViolations(record, batch, PURCHASE_RULES);
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
      collectFileViolations(record, file, text, PURCHASE_RULES, {
        tolerant: false,
        skipQuestions: true,
      });
  }
});

// --- 12. Prices ------------------------------------------------------------

const PRICE_IN_COPY = [/[€$]\s*\d/, /\b\d+(?:[.,]\d+)?\s*(?:€|EUR\b|euros?\b)/i, /\bEUR\s*\d/i];

check('pricing', (record) => {
  for (const batch of BATCHES) {
    const contract = contractOf(batch);
    if (contract) {
      walkJsonEntries(contract, (key, value, path) => {
        if (
          (path.includes('priceHypothesis') || path.includes('subscriptionHypothesis')) &&
          key === 'status' &&
          value !== PRICE_HYPOTHESIS_RULES.status
        ) {
          record.failures.push(
            `${batch.contractPath}: ${path} must be "${PRICE_HYPOTHESIS_RULES.status}", found ${JSON.stringify(value)}`,
          );
        }
        if (
          /^(?:priceStatus|pricingStatus)$/i.test(key) &&
          value !== PRICE_HYPOTHESIS_RULES.status
        ) {
          record.failures.push(
            `${batch.contractPath}: ${path} must be "${PRICE_HYPOTHESIS_RULES.status}", found ${JSON.stringify(value)}`,
          );
        }
        if (batch.id >= 2 && key === 'priceState') {
          const allowed = ['HYPOTHESIS_UNAPPROVED', 'NOT_ESTABLISHED'];
          if (!allowed.includes(value)) {
            record.failures.push(
              `${batch.contractPath}: ${path} must be one of [${allowed.join(', ')}], found ${JSON.stringify(value)}`,
            );
          }
        }
      });
      collectContractTextViolations(
        record,
        batch,
        batch.id >= 2 ? PRICE_TEXT_RULES_BATCH02 : PRICE_TEXT_RULES,
      );
    }
    for (const file of scopedDocFiles(batch)) {
      const text = textOf(file);
      if (text === null) continue;
      collectFileViolations(
        record,
        file,
        text,
        batch.id >= 2 ? PRICE_TEXT_RULES_BATCH02 : PRICE_RULES,
        {
          tolerant: true,
          wideContext: true,
          skipQuestions: true,
        },
      );
    }
    for (const file of scopedCopyFiles(batch)) {
      const text = textOf(file);
      if (text === null) continue;
      if (batch.id === 1) {
        collectFileViolations(record, file, text, PRICE_COPY_RULES, {
          tolerant: false,
          skipQuestions: true,
        });
      } else {
        collectFileViolations(record, file, text, PRICE_TEXT_RULES, {
          tolerant: false,
          skipQuestions: true,
        });
        // A truthful "prices are not approved" statement is legitimate copy; only
        // an affirmative approval claim fails, so the approval rules allow negation.
        collectFileViolations(record, file, text, PRICE_APPROVAL_CLAIM_RULES, {
          tolerant: true,
          skipQuestions: true,
        });
      }
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
    const priceLabelledFiles =
      batch.id === 1
        ? [
            BATCH_01.products[0].dossier,
            BATCH_01.products[1].dossier,
            BATCH_01.products[2].dossier,
            BATCH_01.docs.pricing,
          ]
        : [...batch.products.map((product) => product.dossier), batch.docs.pricing];
    for (const file of priceLabelledFiles) {
      const text = textOf(file);
      if (text !== null && !text.includes(PRICE_HYPOTHESIS_RULES.status)) {
        record.failures.push(
          `${file} does not label its price figures ${PRICE_HYPOTHESIS_RULES.status}`,
        );
      }
    }
  }
});

// --- 13. Legal clearance ---------------------------------------------------

check('clearance', (record) => {
  for (const batch of BATCHES) {
    const contract = contractOf(batch);
    if (!contract) continue;
    walkJsonEntries(contract, (key, value, path) => {
      if (/trademark.*clearance/i.test(key) && value !== 'NOT_GRANTED') {
        record.failures.push(
          `${batch.contractPath}: ${path} must be "NOT_GRANTED", found ${JSON.stringify(value)}`,
        );
      }
    });
    collectContractTextViolations(record, batch, CLEARANCE_RULES);
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
  for (const batch of BATCHES) {
    if (contractOf(batch)) collectContractTextViolations(record, batch, AIS_RULES);
  }
  // The approved receive-only disclaimer itself names the transponder and
  // collision-avoidance exclusions, so a negated line is legitimate even in
  // customer-facing copy. An affirmative transmission claim has no negation.
  collectScopedViolations(record, AIS_RULES);
});

// --- 15. NMEA 2000 claims --------------------------------------------------

check('nmea', (record) => {
  for (const batch of BATCHES) {
    if (contractOf(batch)) collectContractTextViolations(record, batch, NMEA_RULES);
  }
  collectScopedViolations(record, NMEA_RULES);
});

// --- 16. Chart rights / ECDIS ---------------------------------------------

check('charts', (record) => {
  for (const batch of BATCHES) {
    if (contractOf(batch)) collectContractTextViolations(record, batch, CHARTS_RULES);
  }
  collectScopedViolations(record, CHARTS_RULES);
});

// --- 17. Compatibility -----------------------------------------------------

check('compatibility', (record) => {
  for (const batch of BATCHES) {
    if (contractOf(batch)) collectContractTextViolations(record, batch, COMPATIBILITY_RULES);
  }
  collectScopedViolations(record, COMPATIBILITY_RULES);
});

// --- 18. Assets and file references ---------------------------------------

check('assets', (record) => {
  const assetFiles = /docs\/marea\/[A-Za-z0-9_][A-Za-z0-9_./-]*\.(?:png|jpe?g|gif|svg|webp|avif)/gi;
  const allowedStatuses = ['CONCEPT', 'BLOCKED_ON_IMAGE_GENERATION'];
  for (const batch of BATCHES) {
    const contract = contractOf(batch);
    if (!contract) continue;
    const registered = new Map();
    const assets = contract.assets;
    if (!Array.isArray(assets) || assets.length === 0) {
      record.failures.push(
        `${batch.contractPath}: assets must be a non-empty array of internal asset records`,
      );
    } else {
      for (const asset of assets) {
        if (!isRecord(asset) || !isFilled(asset.assetId)) {
          record.failures.push(`${batch.contractPath}: assets contains an entry without assetId`);
          continue;
        }
        if (registered.has(asset.assetId))
          record.failures.push(`${batch.contractPath}: duplicate assetId ${asset.assetId}`);
        if (!allowedStatuses.includes(asset.status)) {
          record.failures.push(
            `${batch.contractPath}: asset ${asset.assetId} status must be CONCEPT or BLOCKED_ON_IMAGE_GENERATION, found ${JSON.stringify(asset.status)}`,
          );
        }
        if (!isFilled(asset.source)) {
          record.failures.push(`${batch.contractPath}: asset ${asset.assetId} source is missing`);
        } else if (!evidenceRefExists(asset.source)) {
          record.failures.push(
            `${batch.contractPath}: asset ${asset.assetId} references ${JSON.stringify(asset.source)}, which does not exist`,
          );
        }
        registered.set(asset.assetId, asset);
      }
    }
    const products = Array.isArray(contract.products) ? contract.products : [];
    for (const product of products) {
      if (!Array.isArray(product.assets) || product.assets.length === 0) {
        record.failures.push(
          `${batch.contractPath}: product ${product.id}: assets must be a non-empty array`,
        );
        continue;
      }
      for (const reference of product.assets) {
        const assetId = isRecord(reference) ? reference.assetId : reference;
        if (!isFilled(assetId)) {
          record.failures.push(
            `${batch.contractPath}: product ${product.id}: an asset reference has no assetId`,
          );
          continue;
        }
        if (!registered.has(assetId)) {
          record.failures.push(
            `${batch.contractPath}: product ${product.id}: assetId ${assetId} is not declared in the contract assets list`,
          );
        }
      }
    }
    if (batch.id === 2) {
      // README §22: ten fixed asset ids per product, thirty in total, all declared
      // in the batch-02 asset-requirements document.
      if (Array.isArray(assets) && assets.length !== 30) {
        record.failures.push(
          `${batch.contractPath}: assets must declare exactly 30 batch-02 asset ids, found ${assets.length}`,
        );
      }
      const expectedAssetIds = batch.products.flatMap((product) =>
        BATCH02_ASSET_SUFFIXES.map(
          (suffix, index) => `${product.id}-${suffix}-${String(index + 1).padStart(2, '0')}`,
        ),
      );
      if (Array.isArray(assets)) {
        const declared = assets.map((asset) => asset?.assetId);
        for (const assetId of expectedAssetIds) {
          if (!declared.includes(assetId)) {
            record.failures.push(
              `${batch.contractPath}: the fixed batch-02 asset id ${assetId} is missing from assets`,
            );
          }
        }
      }
      for (const product of batch.products) {
        const productDefinition = products.find((entry) => entry?.id === product.id);
        const expectedForProduct = expectedAssetIds.filter((assetId) =>
          assetId.startsWith(`${product.id}-`),
        );
        const actual = Array.isArray(productDefinition?.assets)
          ? productDefinition.assets.map((reference) =>
              isRecord(reference) ? reference.assetId : reference,
            )
          : [];
        if (actual.length !== 10) {
          record.failures.push(
            `${batch.contractPath}: product ${product.id}: assets must declare exactly 10 asset ids, found ${actual.length}`,
          );
        }
        for (const assetId of expectedForProduct) {
          if (!actual.includes(assetId)) {
            record.failures.push(
              `${batch.contractPath}: product ${product.id}: asset ${assetId} is not referenced by the product`,
            );
          }
        }
      }
      const assetDoc = textOf(batch.docs.assets);
      // MAJ-02: every asset's status, classification and provenance must match the
      // D9 coverage matrix, not just the id list.
      for (const asset of Array.isArray(assets) ? assets : []) {
        if (!isRecord(asset) || !isFilled(asset.assetId)) continue;
        const suffix = asset.assetId.split('-')[1];
        const blocked = BATCH02_BLOCKED_ASSET_SUFFIXES.includes(suffix);
        const expectedStatus = blocked ? 'BLOCKED_ON_IMAGE_GENERATION' : 'CONCEPT';
        const expectedClassification = blocked
          ? 'REQUIRES_GENERATION'
          : BATCH02_AUTHORED_ASSET_SUFFIXES.includes(suffix)
            ? 'AUTHORED_NEW_SPECIFICATION'
            : 'REUSED_MC04_VECTOR_OR_BRIEF';
        if (asset.status !== expectedStatus) {
          record.failures.push(
            `${batch.contractPath}: asset ${asset.assetId} status must be ${expectedStatus} per the D9 coverage matrix, found ${JSON.stringify(asset.status)}`,
          );
        }
        if (asset.classification !== expectedClassification) {
          record.failures.push(
            `${batch.contractPath}: asset ${asset.assetId} classification must be ${expectedClassification} per the D9 coverage matrix, found ${JSON.stringify(asset.classification)}`,
          );
        }
        if (!isFilled(asset.provenance)) {
          record.failures.push(
            `${batch.contractPath}: asset ${asset.assetId} provenance is missing; reused MC-04 inputs and authored-new specifications must be distinguishable`,
          );
        }
      }
      if (assetDoc !== null) {
        for (const assetId of expectedAssetIds) {
          if (!assetDoc.includes(assetId)) {
            record.failures.push(
              `${batch.docs.assets}: does not declare the batch-02 asset id ${assetId}`,
            );
          }
        }
        if (!assetDoc.includes('BLOCKED_ON_IMAGE_GENERATION')) {
          record.failures.push(
            `${batch.docs.assets}: the four per-family blocked assets must remain BLOCKED_ON_IMAGE_GENERATION (X-03)`,
          );
        }
        if (!assetDoc.includes('CONCEPT')) {
          record.failures.push(
            `${batch.docs.assets}: the reused/authored assets must remain CONCEPT, not REAL_PRODUCT`,
          );
        }
        const coverage = parseAssetCoverageMatrix(assetDoc);
        if (!coverage || coverage.families.size === 0 || !coverage.total) {
          record.failures.push(
            `${batch.docs.assets}: cannot find the §6 coverage matrix with per-family counts and totals`,
          );
        } else {
          const expectFamily = {
            requirements: BATCH02_ASSET_COVERAGE.requirementsPerFamily,
            blocked: BATCH02_ASSET_COVERAGE.blockedPerFamily,
            reused: BATCH02_ASSET_COVERAGE.reusedPerFamily,
            authored: BATCH02_ASSET_COVERAGE.authoredPerFamily,
          };
          for (const [family, row] of coverage.families) {
            for (const [key, wanted] of Object.entries(expectFamily)) {
              if (row[key]?.count !== wanted) {
                record.failures.push(
                  `${batch.docs.assets}: coverage matrix row ${family} ${key} count must be ${wanted}, found ${JSON.stringify(row[key]?.count)}`,
                );
              }
            }
            const wantedSuffixes = {
              blocked: BATCH02_BLOCKED_ASSET_SUFFIXES,
              reused: BATCH02_REUSED_ASSET_SUFFIXES,
              authored: BATCH02_AUTHORED_ASSET_SUFFIXES,
            };
            for (const [key, wanted] of Object.entries(wantedSuffixes)) {
              const actual = row[key]?.suffixes ?? [];
              if ([...actual].sort().join('|') !== [...wanted].sort().join('|')) {
                record.failures.push(
                  `${batch.docs.assets}: coverage matrix row ${family} ${key} suffix list must be [${wanted.join(', ')}], found [${actual.join(', ')}]`,
                );
              }
            }
          }
          const totalChecks = {
            requirements: 30,
            blocked: BATCH02_ASSET_COVERAGE.blockedTotal,
            reused: BATCH02_ASSET_COVERAGE.reusedTotal,
            authored: BATCH02_ASSET_COVERAGE.authoredTotal,
          };
          for (const [key, wanted] of Object.entries(totalChecks)) {
            if (coverage.total[key]?.count !== wanted) {
              record.failures.push(
                `${batch.docs.assets}: coverage matrix total ${key} must be ${wanted}, found ${JSON.stringify(coverage.total[key]?.count)}`,
              );
            }
          }
          // The JSON contract and the D9 matrix must agree with each other.
          if (Array.isArray(assets)) {
            const blockedInJson = assets.filter(
              (asset) => asset?.status === 'BLOCKED_ON_IMAGE_GENERATION',
            ).length;
            const conceptInJson = assets.filter((asset) => asset?.status === 'CONCEPT').length;
            if (blockedInJson !== coverage.total.blocked.count) {
              record.failures.push(
                `${batch.contractPath}: ${blockedInJson} assets are BLOCKED_ON_IMAGE_GENERATION but ${batch.docs.assets} records ${coverage.total.blocked.count}`,
              );
            }
            if (conceptInJson !== coverage.total.reused.count + coverage.total.authored.count) {
              record.failures.push(
                `${batch.contractPath}: ${conceptInJson} assets are CONCEPT but ${batch.docs.assets} records ${coverage.total.reused.count + coverage.total.authored.count} reused/authored assets`,
              );
            }
          }
        }
      }
    } else if (batch.id === 3) {
      // MC-07 brief §13: thirty fixed ids, ten per product, status partition
      // 12 BLOCKED_ON_IMAGE_GENERATION + 15 reused CONCEPT + 3 authored CONCEPT.
      if (Array.isArray(assets) && assets.length !== 30) {
        record.failures.push(
          `${batch.contractPath}: assets must declare exactly 30 batch-03 asset ids, found ${assets.length}`,
        );
      }
      const expectedAssetIds = batch.products.flatMap((product) =>
        BATCH03_ASSET_SUFFIXES.map(
          (suffix, index) => `${product.id}-${suffix}-${String(index + 1).padStart(2, '0')}`,
        ),
      );
      if (Array.isArray(assets)) {
        const declared = assets.map((asset) => asset?.assetId);
        for (const assetId of expectedAssetIds) {
          if (!declared.includes(assetId)) {
            record.failures.push(
              `${batch.contractPath}: the fixed batch-03 asset id ${assetId} is missing from assets`,
            );
          }
        }
      }
      for (const product of batch.products) {
        const productDefinition = products.find((entry) => entry?.id === product.id);
        const expectedForProduct = expectedAssetIds.filter((assetId) =>
          assetId.startsWith(`${product.id}-`),
        );
        const actual = Array.isArray(productDefinition?.assets)
          ? productDefinition.assets.map((reference) =>
              isRecord(reference) ? reference.assetId : reference,
            )
          : [];
        if (actual.length !== 10) {
          record.failures.push(
            `${batch.contractPath}: product ${product.id}: assets must declare exactly 10 asset ids, found ${actual.length}`,
          );
        }
        for (const assetId of expectedForProduct) {
          if (!actual.includes(assetId)) {
            record.failures.push(
              `${batch.contractPath}: product ${product.id}: asset ${assetId} is not referenced by the product`,
            );
          }
        }
      }
      const assetDoc = textOf(batch.docs.assets);
      for (const asset of Array.isArray(assets) ? assets : []) {
        if (!isRecord(asset) || !isFilled(asset.assetId)) continue;
        const suffix = asset.assetId.split('-')[1];
        const blocked = BATCH03_BLOCKED_ASSET_SUFFIXES.includes(suffix);
        const authored = BATCH03_AUTHORED_ASSET_SUFFIXES.includes(suffix);
        const expectedStatus = blocked ? 'BLOCKED_ON_IMAGE_GENERATION' : 'CONCEPT';
        const expectedClassification = blocked
          ? 'REQUIRES_GENERATION'
          : authored
            ? 'AUTHORED_NEW_SPECIFICATION'
            : 'REUSED_MC04_VECTOR_OR_BRIEF';
        if (asset.status !== expectedStatus) {
          record.failures.push(
            `${batch.contractPath}: asset ${asset.assetId} status must be ${expectedStatus} per the D9 §6 coverage matrix, found ${JSON.stringify(asset.status)}`,
          );
        }
        if (asset.classification !== expectedClassification) {
          record.failures.push(
            `${batch.contractPath}: asset ${asset.assetId} classification must be ${expectedClassification} per the D9 §6 coverage matrix, found ${JSON.stringify(asset.classification)}`,
          );
        }
        if (!isFilled(asset.provenance)) {
          record.failures.push(
            `${batch.contractPath}: asset ${asset.assetId} provenance is missing; reused MC-04 inputs and authored-new specifications must be distinguishable`,
          );
        }
        if (asset.source !== `${batch.docs.assets}#${asset.assetId}`) {
          record.failures.push(
            `${batch.contractPath}: asset ${asset.assetId} source must be ${batch.docs.assets}#${asset.assetId}, found ${JSON.stringify(asset.source)}`,
          );
        }
      }
      if (assetDoc !== null) {
        for (const assetId of expectedAssetIds) {
          if (!assetDoc.includes(assetId)) {
            record.failures.push(
              `${batch.docs.assets}: does not declare the batch-03 asset id ${assetId}`,
            );
          }
        }
        if (!assetDoc.includes('BLOCKED_ON_IMAGE_GENERATION')) {
          record.failures.push(
            `${batch.docs.assets}: the four per-family blocked assets must remain BLOCKED_ON_IMAGE_GENERATION (X-03)`,
          );
        }
        if (!assetDoc.includes('CONCEPT')) {
          record.failures.push(
            `${batch.docs.assets}: the reused/authored assets must remain CONCEPT, not REAL_PRODUCT`,
          );
        }
        const coverage = parseBatch03AssetCoverage(assetDoc);
        if (!coverage || coverage.families.size === 0 || !coverage.total) {
          record.failures.push(
            `${batch.docs.assets}: cannot find the §6 coverage matrix with per-family counts and totals`,
          );
        } else {
          const expectFamily = {
            requirements: BATCH03_ASSET_COVERAGE.requirementsPerFamily,
            blocked: BATCH03_ASSET_COVERAGE.blockedPerFamily,
            reused: BATCH03_ASSET_COVERAGE.reusedPerFamily,
            authored: BATCH03_ASSET_COVERAGE.authoredPerFamily,
          };
          for (const [family, row] of coverage.families) {
            for (const [key, wanted] of Object.entries(expectFamily)) {
              if (row[key]?.count !== wanted) {
                record.failures.push(
                  `${batch.docs.assets}: coverage matrix row ${family} ${key} count must be ${wanted}, found ${JSON.stringify(row[key]?.count)}`,
                );
              }
            }
          }
          const totalChecks = {
            requirements: 30,
            blocked: BATCH03_ASSET_COVERAGE.blockedTotal,
            reused: BATCH03_ASSET_COVERAGE.reusedTotal,
            authored: BATCH03_ASSET_COVERAGE.authoredTotal,
          };
          for (const [key, wanted] of Object.entries(totalChecks)) {
            if (coverage.total[key]?.count !== wanted) {
              record.failures.push(
                `${batch.docs.assets}: coverage matrix total ${key} must be ${wanted}, found ${JSON.stringify(coverage.total[key]?.count)}`,
              );
            }
          }
          if (Array.isArray(assets)) {
            const blockedInJson = assets.filter(
              (asset) => asset?.status === 'BLOCKED_ON_IMAGE_GENERATION',
            ).length;
            const conceptInJson = assets.filter((asset) => asset?.status === 'CONCEPT').length;
            if (blockedInJson !== coverage.total.blocked.count) {
              record.failures.push(
                `${batch.contractPath}: ${blockedInJson} assets are BLOCKED_ON_IMAGE_GENERATION but ${batch.docs.assets} records ${coverage.total.blocked.count}`,
              );
            }
            if (conceptInJson !== coverage.total.reused.count + coverage.total.authored.count) {
              record.failures.push(
                `${batch.contractPath}: ${conceptInJson} assets are CONCEPT but ${batch.docs.assets} records ${coverage.total.reused.count + coverage.total.authored.count} reused/authored assets`,
              );
            }
          }
        }
        const assetLines = assetDoc.split(/\r?\n/);
        assetLines.forEach((line, index) => {
          for (const prohibited of ['REAL_PRODUCT', 'PHOTOGRAPHED', 'PUBLISHED']) {
            if (!line.includes(prohibited)) continue;
            if (prohibited === 'REAL_PRODUCT' && line.includes('CONCEPT')) continue;
            if (isNegativeContext(assetLines, index, { wideContext: true })) continue;
            record.failures.push(
              `${batch.docs.assets}:${index + 1}: an asset is presented as ${prohibited}; all batch-03 assets are CONCEPT and BLOCKED_ON_IMAGE_GENERATION`,
            );
          }
        });
      }
    }
  }
  for (const [file, text] of texts) {
    if (BATCHES.some((batch) => batch.contractPath === file)) continue;
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

function disclaimerFile(requirement) {
  const product = BATCHES.flatMap((batch) => batch.products).find(
    (entry) => entry.id === requirement.product,
  );
  if (!product) return null;
  return requirement.file === 'dossier'
    ? product.dossier
    : product.copy[requirement.file.split('.')[1]];
}

check('disclaimers', (record) => {
  const requirements = BATCHES.flatMap((batch) => batch.disclaimers);
  for (const requirement of requirements) {
    const file = disclaimerFile(requirement);
    if (!file) continue;
    const text = textOf(file);
    if (text === null) continue;
    if (requirement.when && !new RegExp(requirement.when, 'i').test(text)) continue;
    const approved =
      APPROVED_DISCLAIMERS[requirement.kind]?.[requirement.language] ??
      BATCH02_LIMITATION_STATEMENTS[requirement.kind]?.[requirement.language] ??
      BATCH03_LIMITATION_STATEMENTS[requirement.kind]?.[requirement.language];
    if (!approved) {
      record.failures.push(`internal error: no approved wording for ${requirement.kind}`);
      continue;
    }
    const normalizedApproved = normalizeDisclaimer(approved);
    const normalizedText = normalizeDisclaimer(text);
    if (!normalizedText.includes(normalizedApproved)) {
      record.failures.push(
        `${file}: does not carry the approved ${requirement.kind} disclaimer (${requirement.language.toUpperCase()}) verbatim, §9 of the claims policy / README §16`,
      );
    }
  }
});

// --- 20. Batch-02 contract additions (README §14, §19, §20) ----------------

check('batch02.contract', (record) => {
  const contract = contractOf(BATCH_02);
  if (!contract) {
    record.failures.push(
      `${BATCH_02.contractPath} is missing; the batch-02 product-definition contract is required`,
    );
    return;
  }
  if (contract.batch !== 2) {
    record.failures.push(
      `${BATCH_02.contractPath}: batch must be 2, found ${JSON.stringify(contract.batch)}`,
    );
  }
  if (contract.batch01Contract !== BATCH_01.contractPath) {
    record.failures.push(
      `${BATCH_02.contractPath}: batch01Contract must reference ${BATCH_01.contractPath}, found ${JSON.stringify(contract.batch01Contract)}`,
    );
  }
  if (contract.notificationStates?.join('|') !== NOTIFICATION_STATES.join('|')) {
    record.failures.push(
      `${BATCH_02.contractPath}: notificationStates must be exactly the ten canonical states [${NOTIFICATION_STATES.join(', ')}]`,
    );
  }
  if (contract.notificationTimestamps?.join('|') !== NOTIFICATION_TIMESTAMPS.join('|')) {
    record.failures.push(
      `${BATCH_02.contractPath}: notificationTimestamps must be exactly the eight distinct timestamps [${NOTIFICATION_TIMESTAMPS.join(', ')}]`,
    );
  }
  const rules = contract.subscriptionIsolationRules;
  if (!Array.isArray(rules) || rules.length < BATCH02_REQUIRED_ISOLATION_RULES.length) {
    record.failures.push(
      `${BATCH_02.contractPath}: subscriptionIsolationRules must declare at least the ${BATCH02_REQUIRED_ISOLATION_RULES.length} canonical isolation rules`,
    );
  } else {
    const ids = rules.map((rule) => rule?.id);
    for (const id of BATCH02_REQUIRED_ISOLATION_RULES) {
      const rule = rules.find((entry) => entry?.id === id);
      if (!rule) {
        record.failures.push(
          `${BATCH_02.contractPath}: subscriptionIsolationRules is missing ${id}`,
        );
        continue;
      }
      if (!isFilled(rule.statement)) {
        record.failures.push(
          `${BATCH_02.contractPath}: subscriptionIsolationRules.${id}.statement is missing`,
        );
      }
    }
    const paymentRule = rules.find((entry) =>
      /payment/i.test(`${entry?.id ?? ''} ${entry?.statement ?? ''}`),
    );
    if (
      !paymentRule ||
      !/\b(?:never|not|must\s+not)\b/i.test(paymentRule.statement) ||
      !/\b(?:local|safety)\b/i.test(paymentRule.statement)
    ) {
      record.failures.push(
        `${BATCH_02.contractPath}: subscriptionIsolationRules must state that payment failure never disables local or safety-relevant functions`,
      );
    }
    for (const id of ids) {
      if (typeof id === 'string' && !BATCH02_REQUIRED_ISOLATION_RULES.includes(id)) {
        record.failures.push(
          `${BATCH_02.contractPath}: unexpected subscription isolation rule id ${JSON.stringify(id)}`,
        );
      }
    }
  }
  const authority = contract.crossProductAuthority;
  if (!Array.isArray(authority) || authority.length !== CROSS_PRODUCT_RELATIONSHIPS.length) {
    record.failures.push(
      `${BATCH_02.contractPath}: crossProductAuthority must contain the ${CROSS_PRODUCT_RELATIONSHIPS.length} authoritative relationships of README §19`,
    );
  } else {
    for (const relationship of CROSS_PRODUCT_RELATIONSHIPS) {
      const row = authority.find((entry) => entry?.relationship === relationship);
      if (!row) {
        record.failures.push(
          `${BATCH_02.contractPath}: crossProductAuthority is missing the relationship ${relationship}`,
        );
        continue;
      }
      if (!isFilled(row.permitted) || !isFilled(row.prohibited)) {
        record.failures.push(
          `${BATCH_02.contractPath}: crossProductAuthority ${relationship} must record both permitted and prohibited behaviour`,
        );
      }
    }
  }
  const gates = contract.safetyGates;
  if (!Array.isArray(gates) || gates.length === 0) {
    record.failures.push(
      `${BATCH_02.contractPath}: safetyGates must be a non-empty array of {product, gate, state, closingEvidence}`,
    );
  } else {
    for (const gate of gates) {
      if (!isRecord(gate) || !isFilled(gate.product) || !isFilled(gate.gate)) {
        record.failures.push(
          `${BATCH_02.contractPath}: safetyGates contains an entry without product/gate`,
        );
        continue;
      }
      if (gate.state !== 'BLOCKED') {
        record.failures.push(
          `${BATCH_02.contractPath}: safety gate ${gate.gate} must be BLOCKED at MC-06, found ${JSON.stringify(gate.state)}`,
        );
      }
      if (!Array.isArray(gate.closingEvidence)) {
        record.failures.push(
          `${BATCH_02.contractPath}: safety gate ${gate.gate} closingEvidence must be an array`,
        );
      }
    }
    for (const gate of BATCH02_REQUIRED_SAFETY_GATES) {
      if (!gates.some((entry) => entry?.gate === gate)) {
        record.failures.push(
          `${BATCH_02.contractPath}: safetyGates is missing the canonical gate ${gate}`,
        );
      }
    }
    const pilotSafety = gates.find((entry) => entry?.gate === 'PILOT_SAFETY_GATE');
    if (
      pilotSafety &&
      Array.isArray(pilotSafety.closingEvidence) &&
      pilotSafety.closingEvidence.length > 0
    ) {
      record.failures.push(
        `${BATCH_02.contractPath}: PILOT_SAFETY_GATE must remain open with no closing evidence at MC-06`,
      );
    }
  }
  const controls = contract.publicationControls;
  if (!isRecord(controls)) {
    record.failures.push(`${BATCH_02.contractPath}: publicationControls is missing`);
  } else {
    const expectedControls = {
      publicationState: 'INTERNAL_ONLY',
      published: false,
      forSale: false,
      purchaseCtaAllowed: false,
      pricesInCopyAllowed: false,
      pricesLabelled: 'HYPOTHESIS_UNAPPROVED',
      remoteSteeringAllowed: false,
      instantAlertGuaranteeAllowed: false,
      certificationClaimAllowed: false,
    };
    for (const [key, expected] of Object.entries(expectedControls)) {
      if (controls[key] !== expected) {
        record.failures.push(
          `${BATCH_02.contractPath}: publicationControls.${key} must be ${JSON.stringify(expected)}, found ${JSON.stringify(controls[key])}`,
        );
      }
    }
  }
  // MIN-06: the module dependency enumerations are only unambiguous if the contract
  // states what "required" means.
  const dependencySemantics = contract.dependencySemantics;
  if (!isRecord(dependencySemantics)) {
    record.failures.push(`${BATCH_02.contractPath}: dependencySemantics is missing`);
  } else {
    for (const key of [
      'meaning',
      'localModuleUse',
      'mareaConsolidatedView',
      'remoteAlerts',
      'display',
    ]) {
      if (!isFilled(dependencySemantics[key])) {
        record.failures.push(
          `${BATCH_02.contractPath}: dependencySemantics.${key} is missing or empty`,
        );
      }
    }
    if (
      !/\bnever\b/i.test(dependencySemantics.meaning ?? '') ||
      !/unusable alone/i.test(dependencySemantics.meaning ?? '')
    ) {
      record.failures.push(
        `${BATCH_02.contractPath}: dependencySemantics.meaning must state that "required" means required for the named outcome, never that the module is unusable alone`,
      );
    }
  }
  if (!isRecord(contract.sourceDocuments)) {
    record.failures.push(`${BATCH_02.contractPath}: sourceDocuments is missing`);
  } else {
    const requiredDocuments = {
      editions: BATCH_02.docs.editions,
      compatibility: BATCH_02.docs.compatibility,
      pricing: BATCH_02.docs.pricing,
      journeys: BATCH_02.docs.journeys,
      assets: BATCH_02.docs.assets,
      safetyCase: BATCH_02.docs.safetyCase,
      calibrationPlan: BATCH_02.docs.calibrationPlan,
      alertDeliveryContract: BATCH_02.docs.alertDeliveryContract,
    };
    for (const [key, expected] of Object.entries(requiredDocuments)) {
      if (contract.sourceDocuments[key] !== expected) {
        record.failures.push(
          `${BATCH_02.contractPath}: sourceDocuments.${key} must reference ${expected}, found ${JSON.stringify(contract.sourceDocuments[key])}`,
        );
      }
    }
    for (const product of BATCH_02.products) {
      if (contract.sourceDocuments.dossiers?.[product.id] !== product.dossier) {
        record.failures.push(
          `${BATCH_02.contractPath}: sourceDocuments.dossiers.${product.id} must reference ${product.dossier}`,
        );
      }
    }
    for (const value of Object.values(contract.sourceDocuments)) {
      if (typeof value !== 'string') continue;
      if (!existsSync(resolve(root, value))) {
        record.failures.push(
          `${BATCH_02.contractPath}: sourceDocuments references the missing file ${value}`,
        );
      }
    }
  }
});

// --- 21. Batch-02 product invariants (README §14, §15, §18) ----------------

check('batch02.invariants', (record) => {
  const contract = contractOf(BATCH_02);
  if (!contract) return;
  const products = Array.isArray(contract.products) ? contract.products : [];
  for (const [productId, invariants] of Object.entries(BATCH02_INVARIANTS)) {
    const product = products.find((entry) => entry?.id === productId);
    if (!product) {
      record.failures.push(
        `${BATCH_02.contractPath}: product ${productId} is missing; the invariant block cannot be validated`,
      );
      continue;
    }
    for (const [key, expected] of Object.entries(invariants.equalities)) {
      if (product[key] !== expected) {
        record.failures.push(
          `${BATCH_02.contractPath}: product ${productId}.${key} must be ${JSON.stringify(expected)}, found ${JSON.stringify(product[key])}`,
        );
      }
    }
    if (invariants.steeringModes) {
      const modes = product.steeringModes;
      if (!Array.isArray(modes) || modes.length < 2) {
        record.failures.push(
          `${BATCH_02.contractPath}: product ${productId}.steeringModes must declare every intended steering mode with id, prerequisites and status`,
        );
      } else {
        const allowedStatuses = ['CONDITIONAL_ON_VERIFICATION', 'NOT_VERIFIED'];
        for (const mode of modes) {
          if (!isRecord(mode) || !isFilled(mode.id) || !isFilled(mode.prerequisites)) {
            record.failures.push(
              `${BATCH_02.contractPath}: product ${productId}.steeringModes entry must carry id and prerequisites`,
            );
            continue;
          }
          if (!allowedStatuses.includes(mode.status)) {
            record.failures.push(
              `${BATCH_02.contractPath}: product ${productId}.steeringModes.${mode.id} status must be one of [${allowedStatuses.join(', ')}], found ${JSON.stringify(mode.status)}`,
            );
          }
        }
        if (!modes.some((mode) => mode?.status === 'CONDITIONAL_ON_VERIFICATION')) {
          record.failures.push(
            `${BATCH_02.contractPath}: product ${productId}.steeringModes must record the CONDITIONAL_ON_VERIFICATION mode`,
          );
        }
      }
    }
    if (invariants.modules) {
      const modules = product.modules;
      if (!Array.isArray(modules)) {
        record.failures.push(
          `${BATCH_02.contractPath}: product ${productId}.modules must be an array`,
        );
      } else {
        const ids = modules.map((module) => module?.id);
        if (ids.join('|') !== SENSE_MODULE_IDS.join('|')) {
          record.failures.push(
            `${BATCH_02.contractPath}: product ${productId}.modules must be exactly [${SENSE_MODULE_IDS.join(', ')}], found [${ids.join(', ')}]`,
          );
        }
        for (const module of modules) {
          for (const flag of ['hubRequired', 'watchRequired', 'displayRequired']) {
            if (typeof module?.[flag] !== 'boolean') {
              record.failures.push(
                `${BATCH_02.contractPath}: product ${productId}.modules.${module?.id}.${flag} must be a boolean`,
              );
            }
          }
          // MIN-06: the booleans collapse three different outcomes; the explicit
          // dependency enumerations carry the meaning and must never contradict them.
          const dependencyRules = {
            hubDependency: {
              allowed: ['REQUIRED_FOR_MAREA_CONSOLIDATED_VIEW', 'OPTIONAL', 'NOT_APPLICABLE'],
              required: 'REQUIRED_FOR_MAREA_CONSOLIDATED_VIEW',
              boolean: 'hubRequired',
            },
            watchDependency: {
              allowed: ['REQUIRED_FOR_REMOTE_ALERTS', 'OPTIONAL', 'NOT_APPLICABLE'],
              required: 'REQUIRED_FOR_REMOTE_ALERTS',
              boolean: 'watchRequired',
            },
            displayDependency: {
              allowed: ['OPTIONAL', 'REQUIRED', 'NOT_APPLICABLE'],
              required: 'OPTIONAL',
              boolean: 'displayRequired',
            },
          };
          for (const [dependencyKey, rule] of Object.entries(dependencyRules)) {
            const declared = module?.[dependencyKey];
            if (!rule.allowed.includes(declared)) {
              record.failures.push(
                `${BATCH_02.contractPath}: product ${productId}.modules.${module?.id}.${dependencyKey} must be one of [${rule.allowed.join(', ')}], found ${JSON.stringify(declared)}`,
              );
              continue;
            }
            if (declared !== rule.required) {
              record.failures.push(
                `${BATCH_02.contractPath}: product ${productId}.modules.${module?.id}.${dependencyKey} must be ${rule.required}, found ${JSON.stringify(declared)}`,
              );
            }
            const isRequiredOutcome =
              declared === 'REQUIRED' ||
              declared === 'REQUIRED_FOR_MAREA_CONSOLIDATED_VIEW' ||
              declared === 'REQUIRED_FOR_REMOTE_ALERTS';
            if (module?.[rule.boolean] !== isRequiredOutcome) {
              record.failures.push(
                `${BATCH_02.contractPath}: product ${productId}.modules.${module?.id}.${rule.boolean} contradicts ${dependencyKey}=${declared}; a module is never unusable alone`,
              );
            }
          }
          // A SENSE module never alerts directly: remote alerting requires WATCH.
          if (module?.directRemoteAlerts !== false) {
            record.failures.push(
              `${BATCH_02.contractPath}: product ${productId}.modules.${module?.id}.directRemoteAlerts must be false; a SENSE module has no connectivity and requires WATCH for remote alerts`,
            );
          }
        }
      }
    }
    if (invariants.kits) {
      const kits = product.kits;
      if (!Array.isArray(kits)) {
        record.failures.push(
          `${BATCH_02.contractPath}: product ${productId}.kits must be an array`,
        );
      } else {
        const ids = kits.map((kit) => kit?.id);
        if (ids.join('|') !== SENSE_KIT_IDS.join('|')) {
          record.failures.push(
            `${BATCH_02.contractPath}: product ${productId}.kits must be exactly [${SENSE_KIT_IDS.join(', ')}], found [${ids.join(', ')}]`,
          );
        }
        for (const kit of kits) {
          if (!Array.isArray(kit?.modules) || kit.modules.length === 0) {
            record.failures.push(
              `${BATCH_02.contractPath}: product ${productId}.kits.${kit?.id} must list the modules it contains`,
            );
            continue;
          }
          for (const moduleId of kit.modules) {
            if (typeof moduleId !== 'string' || !moduleId.startsWith('SENSE-')) {
              record.failures.push(
                `${BATCH_02.contractPath}: product ${productId}.kits.${kit.id} includes ${JSON.stringify(moduleId)}; a kit contains SENSE modules only, never a HUB, WATCH, DISPLAY or subscription`,
              );
            } else if (!SENSE_MODULE_IDS.includes(moduleId)) {
              record.failures.push(
                `${BATCH_02.contractPath}: product ${productId}.kits.${kit.id} includes the invented module ${JSON.stringify(moduleId)}; a kit never invents a capability absent from its modules`,
              );
            }
          }
          const expectedComposition = SENSE_KIT_COMPOSITION[kit.id];
          if (expectedComposition) {
            const actual = [...kit.modules].sort();
            const wanted = [...expectedComposition].sort();
            if (actual.join('|') !== wanted.join('|')) {
              record.failures.push(
                `${BATCH_02.contractPath}: product ${productId}.kits.${kit.id} composition must match the SENSE dossier §7 and D4 §3.3 [${expectedComposition.join(', ')}], found [${kit.modules.join(', ')}]`,
              );
            }
          }
        }
      }
    }
    if (invariants.entryPriceAmount !== undefined) {
      const entry = product.entryPriceHypothesis;
      if (!isRecord(entry)) {
        record.failures.push(
          `${BATCH_02.contractPath}: product ${productId}.entryPriceHypothesis is missing`,
        );
      } else {
        if (entry.amount !== invariants.entryPriceAmount) {
          record.failures.push(
            `${BATCH_02.contractPath}: product ${productId}.entryPriceHypothesis.amount must be ${invariants.entryPriceAmount}, found ${JSON.stringify(entry.amount)}`,
          );
        }
        if (entry.status !== 'HYPOTHESIS_UNAPPROVED') {
          record.failures.push(
            `${BATCH_02.contractPath}: product ${productId}.entryPriceHypothesis.status must be "HYPOTHESIS_UNAPPROVED", found ${JSON.stringify(entry.status)}`,
          );
        }
      }
    }
  }
});

// --- 22. Batch-02 canonical evidence states (README §15) -------------------

check('batch02.evidenceStates', (record) => {
  const contract = contractOf(BATCH_02);
  for (const product of BATCH_02.products) {
    const dossier = textOf(product.dossier);
    const states = BATCH02_EVIDENCE_STATES[product.id] ?? [];
    if (dossier !== null) {
      const lines = dossier.split(/\r?\n/);
      for (const [state, value] of states) {
        const line = lines.find(
          (candidate) =>
            candidate.includes(state) &&
            new RegExp(`(^|[^\\w-])${escapeRegExp(value)}([^\\w-]|$)`).test(candidate),
        );
        if (!line) {
          record.failures.push(
            `${product.dossier}: does not record the canonical evidence state ${state} = ${value} (README §15)`,
          );
        }
      }
    }
    if (contract) {
      const productEntry = contract.products?.find((entry) => entry?.id === product.id);
      for (const [state, value] of states) {
        const jsonKey = BATCH02_STATE_JSON_KEYS[state];
        if (!jsonKey) continue;
        const jsonValue = productEntry?.[jsonKey];
        if (jsonValue !== value) {
          record.failures.push(
            `${BATCH_02.contractPath}: product ${product.id}.${jsonKey} contradicts the canonical state ${state} = ${value}, found ${JSON.stringify(jsonValue)}`,
          );
        }
      }
    }
  }
});

// --- 23. Batch-02 claim prohibitions (README §16) -------------------------

check('batch02.claims', (record) => {
  const batch02Docs = scopedDocFiles(BATCH_02);
  for (const file of batch02Docs) {
    const text = textOf(file);
    if (text === null) continue;
    collectFileViolations(record, file, text, BATCH02_CLAIM_RULES, {
      tolerant: true,
      wideContext: true,
      skipQuestions: true,
      allowProposedTargets: true,
    });
  }
  for (const file of scopedCopyFiles(BATCH_02)) {
    const text = textOf(file);
    if (text === null) continue;
    collectFileViolations(record, file, text, BATCH02_CLAIM_RULES, {
      tolerant: true,
      wideContext: false,
      skipQuestions: true,
    });
  }
  const contract = contractOf(BATCH_02);
  if (contract) {
    walkJsonEntries(contract, (key, value, path) => {
      if (typeof value !== 'string') return;
      for (const [pattern, message] of BATCH02_CLAIM_RULES) {
        if (!pattern.test(value)) continue;
        if (EXEMPT_CONTEXT.test(value)) continue;
        record.failures.push(`${BATCH_02.contractPath}: ${path}: ${message}`);
      }
    });
  }
});

// --- 24. Batch-02 notification model (README §20) -------------------------

check('batch02.notification', (record) => {
  const contract = contractOf(BATCH_02);
  if (contract) {
    const states = contract.notificationStates;
    const timestamps = contract.notificationTimestamps;
    if (JSON.stringify(states) !== JSON.stringify(NOTIFICATION_STATES)) {
      record.failures.push(
        `${BATCH_02.contractPath}: notificationStates must be the canonical ten-state vocabulary`,
      );
    }
    if (JSON.stringify(timestamps) !== JSON.stringify(NOTIFICATION_TIMESTAMPS)) {
      record.failures.push(
        `${BATCH_02.contractPath}: notificationTimestamps must be the eight distinct timestamps`,
      );
    }
  }
  const watchDossier = textOf(BATCH_02.docs.dossiers.WATCH);
  const alertContract = textOf(BATCH_02.docs.alertDeliveryContract);
  for (const [file, text] of [
    [BATCH_02.docs.dossiers.WATCH, watchDossier],
    [BATCH_02.docs.alertDeliveryContract, alertContract],
  ]) {
    if (text === null) continue;
    for (const state of NOTIFICATION_STATES) {
      if (!new RegExp(`(^|[^\\w-])${state}([^\\w-]|$)`).test(text)) {
        record.failures.push(
          `${file}: does not use the canonical notification state ${state}; no duplicate enum may be introduced (README §20)`,
        );
      }
    }
    for (const timestamp of NOTIFICATION_TIMESTAMPS) {
      if (!text.includes(timestamp)) {
        record.failures.push(
          `${file}: does not use the canonical timestamp ${timestamp} (README §20)`,
        );
      }
    }
  }
  if (alertContract !== null) {
    const normalized = normalizeForCheck(alertContract);
    if (
      !/provider acceptance (?:is not|never (?:sets|proves|means|confirms|equals)|does not (?:confirm|prove|mean|set))/.test(
        normalized,
      )
    ) {
      record.failures.push(
        `${BATCH_02.docs.alertDeliveryContract}: must state that provider acceptance is not delivery and never proves a human saw an alert (README §20)`,
      );
    }
    const lines = alertContract.split(/\r?\n/);
    lines.forEach((line, index) => {
      if (!/provider[_\s-]+accept/i.test(line)) return;
      if (!/\b(?:confirms?|proves?|means?|equals?|sets?)\b[^.\n]{0,30}\bdeliver/i.test(line))
        return;
      if (isNegativeContext(lines, index, { wideContext: true })) return;
      record.failures.push(
        `${BATCH_02.docs.alertDeliveryContract}:${index + 1}: provider acceptance treated as delivery; provider acceptance never sets DELIVERED_WHEN_CONFIRMED`,
      );
    });
  }
});

// --- 25. Batch-02 edition authority (D4) ----------------------------------

check('batch02.editions', (record) => {
  const contract = contractOf(BATCH_02);
  const text = textOf(BATCH_02.docs.editions);
  if (text !== null) {
    const normalized = normalizeForCheck(text);
    for (const product of BATCH_02.products) {
      if (!containsToken(normalized, product.displayName.toLowerCase())) {
        record.failures.push(
          `${BATCH_02.docs.editions}: product ${product.displayName} is missing from the edition comparison`,
        );
      }
    }
    for (const verdict of ['DEFINED', 'CONDITIONAL', 'INSTALLATION_PACKAGE']) {
      if (!text.includes(verdict)) {
        record.failures.push(
          `${BATCH_02.docs.editions}: does not record the canonical edition verdict ${verdict}`,
        );
      }
    }
    // D-008: PILOT Pro is an installation package, not a retail SKU.
    if (
      !text.includes('INSTALLATION_PACKAGE') ||
      !/vessel-specific|installation package/i.test(text)
    ) {
      record.failures.push(
        `${BATCH_02.docs.editions}: does not record D-008 (PILOT Pro is a vessel-specific installation package, not a retail SKU)`,
      );
    }
    for (const edition of ['PILOT-SAIL', 'SENSE-SAIL', 'SENSE-SYSTEMS', 'WATCH-PLUS']) {
      if (!containsToken(normalized, edition.toLowerCase())) {
        record.failures.push(
          `${BATCH_02.docs.editions}: conditional edition ${edition} is missing from the edition comparison`,
        );
      }
    }
    for (const prohibited of LIFECYCLE_FORBIDDEN_FOR_BATCH02) {
      const lines = text.split(/\r?\n/);
      lines.forEach((line, index) => {
        if (!containsToken(line, prohibited)) return;
        if (isNegativeContext(lines, index, { wideContext: true })) return;
        record.failures.push(
          `${BATCH_02.docs.editions}:${index + 1}: the prohibited edition verdict ${prohibited} is presented as current`,
        );
      });
    }
  }
  if (contract) {
    // Every price hypothesis is labelled and every prohibited edition carries none.
    const prohibitedEditionIds = ['PILOT-SAIL', 'PILOT-PRO', ...SENSE_KIT_IDS, 'WATCH-PLUS'];
    for (const product of contract.products ?? []) {
      for (const edition of product.editions ?? []) {
        if (prohibitedEditionIds.includes(edition.id) && edition.priceHypothesis !== null) {
          record.failures.push(
            `${BATCH_02.contractPath}: edition ${edition.id} must not carry a price hypothesis; its price is not established (README §17)`,
          );
        }
      }
    }
  }
});

// --- 26. Batch-02 compatibility document (README §19, §21) ----------------

check('batch02.compatibility', (record) => {
  const text = textOf(BATCH_02.docs.compatibility);
  if (text === null) return;
  // Find the actual compatibility matrix header: the table line that carries the
  // canonical column labels, not a metadata row that merely mentions "integration".
  const expectedColumns = COMPATIBILITY_COLUMNS.map((column) => column.toLowerCase());
  let header = null;
  let bestMatches = 0;
  for (const line of text.split(/\r?\n/)) {
    if (!/^\s*\|/.test(line)) continue;
    const cells = line
      .split('|')
      .slice(1, -1)
      .map((cell) => cell.trim().toLowerCase());
    const matches = expectedColumns.filter((column) => cells.includes(column)).length;
    if (matches > bestMatches) {
      bestMatches = matches;
      header = { line, cells };
    }
  }
  if (!header) {
    record.failures.push(
      `${BATCH_02.docs.compatibility}: no compatibility table header with the ${COMPATIBILITY_COLUMNS.length} canonical columns of README §21`,
    );
  } else if (header.cells.join('|') !== expectedColumns.join('|')) {
    record.failures.push(
      `${BATCH_02.docs.compatibility}: compatibility table must have exactly the columns [${COMPATIBILITY_COLUMNS.join(' | ')}] in this order, found [${header.cells.join(' | ')}]`,
    );
  }
  const evidenceStatuses = ['SUPPORTED', 'PLANNED', 'CONDITIONAL', 'UNKNOWN'];
  for (const status of evidenceStatuses) {
    if (!text.includes(status)) {
      record.failures.push(
        `${BATCH_02.docs.compatibility}: does not use the compatibility evidence status ${status} (README §19)`,
      );
    }
  }
  for (const token of ['permitted', 'prohibited']) {
    if (!new RegExp(`\\b${token}\\b`, 'i').test(text)) {
      record.failures.push(
        `${BATCH_02.docs.compatibility}: does not state the ${token.toUpperCase()} authority behaviour of README §19`,
      );
    }
  }
  const normalized = normalizeForCheck(text);
  if (!normalized.includes('subscription')) {
    record.failures.push(
      `${BATCH_02.docs.compatibility}: does not record the subscription-isolation authority rule`,
    );
  }
  // No document introduces a steering-control path outside the PILOT boundary.
  collectFileViolations(record, BATCH_02.docs.compatibility, text, STEERING_CLAIM_RULES, {
    tolerant: true,
    wideContext: true,
  });
});

// --- 27. Batch-02 pricing document (README §17) ---------------------------

check('batch02.pricing', (record) => {
  const pricingText = textOf(BATCH_02.docs.pricing);
  if (pricingText === null) return;
  if (!pricingText.includes('HYPOTHESIS_UNAPPROVED')) {
    record.failures.push(
      `${BATCH_02.docs.pricing}: does not label its figures HYPOTHESIS_UNAPPROVED`,
    );
  }
  const batch02DocFilesForPrices = [...scopedDocFiles(BATCH_02)];
  for (const file of batch02DocFilesForPrices) {
    const text = textOf(file);
    if (text === null) continue;
    const lines = text.split(/\r?\n/);
    lines.forEach((line, index) => {
      const amountMatches = euroAmountMatches(line);
      if (amountMatches.length === 0) return;
      const window = sentenceWindow(lines, index);
      const context = `${line} ${window}`;
      const prohibitedScope =
        /PILOT-SAIL|PILOT-PRO|SENSE-(?:ESSENTIALS|SAIL|SYSTEMS)|WATCH-PLUS|data plan|installation labour|extended warranty|roaming/i;
      for (const { amount, matchIndex } of amountMatches) {
        if (BATCH02_ALLOWED_AMOUNTS.has(amount)) continue;
        if (
          BATCH02_BUNDLE_AMOUNTS.has(amount) &&
          /\bMAREA\s+(?:START|CRUISE|SAIL|PROTECT|COMPLETE)\b/.test(context)
        )
          continue;
        if (EVIDENCE_PRICE_CONTEXT.test(context)) continue;
        if (isProhibitedExampleContext(lines, index)) continue;
        record.failures.push(
          `${file}:${index + 1}: the price ${formatAmount(amount)} EUR is not among the allowed batch-02 hypotheses of README §17`,
        );
      }
      // A prohibited edition or scope must never carry a price. The prohibition is
      // judged only on the clause around the figure, so that a sentence saying "no
      // price exists for X" elsewhere on the same line is not a false positive.
      for (const { amount, matchIndex } of amountMatches) {
        const local = line.slice(Math.max(0, matchIndex - 120), matchIndex + 120);
        if (!prohibitedScope.test(local)) continue;
        if (isProhibitedExampleContext(lines, index)) continue;
        record.failures.push(
          `${file}:${index + 1}: a price for ${formatAmount(amount)} EUR is stated for an edition or scope whose price is OPEN; only the README §17 figures may be stated`,
        );
      }
    });
    // No APPROVED pricing anywhere in batch 02.
    collectFileViolations(
      record,
      file,
      text,
      [
        [
          /\bAPPROVED\b/,
          'APPROVED pricing is prohibited; every batch-02 figure is HYPOTHESIS_UNAPPROVED',
        ],
      ],
      { tolerant: true, wideContext: true },
    );
  }
  // Every README §17 figure must be stated as a hypothesis somewhere in the batch.
  const requiredFigures = [
    { amount: 1290, file: BATCH_02.docs.dossiers.PILOT },
    { amount: 99, file: BATCH_02.docs.dossiers.SENSE },
    { amount: 299, file: BATCH_02.docs.dossiers.WATCH },
    { amount: 9.9, file: BATCH_02.docs.dossiers.WATCH },
  ];
  for (const { amount, file } of requiredFigures) {
    let found = false;
    for (const candidate of [file, BATCH_02.docs.pricing]) {
      const text = textOf(candidate);
      if (text === null) continue;
      if (text.split(/\r?\n/).some((line) => euroAmountsInLine(line).includes(amount))) {
        found = true;
        break;
      }
    }
    if (!found) {
      record.failures.push(
        `${BATCH_02.docs.pricing}: the README §17 price hypothesis ${formatAmount(amount)} EUR is not stated in the dossier or the pricing document`,
      );
    }
  }
});

// --- 28. Batch-02 customer journeys (README §22) --------------------------

check('batch02.journeys', (record) => {
  const text = textOf(BATCH_02.docs.journeys);
  if (text === null) return;
  const normalized = text.toLowerCase();
  const sections = [];
  const lines = text.split(/\r?\n/);
  for (const product of BATCH_02.products) {
    const display = product.displayName.toLowerCase();
    const start = lines.findIndex(
      (line) => /^\s{0,3}#{2,4}\s/.test(line) && line.toLowerCase().includes(display),
    );
    if (start === -1) {
      record.failures.push(
        `${BATCH_02.docs.journeys}: product ${product.displayName} has no journey section`,
      );
      continue;
    }
    let end = lines.length;
    for (let index = start + 1; index < lines.length; index++) {
      if (!/^\s{0,3}#{2,4}\s/.test(lines[index])) continue;
      if (
        BATCH_02.products.some(
          (other) =>
            other.id !== product.id &&
            lines[index].toLowerCase().includes(other.displayName.toLowerCase()),
        )
      ) {
        end = index;
        break;
      }
    }
    sections.push({ product: product.displayName, text: lines.slice(start, end).join('\n') });
  }
  if (sections.length === BATCH_02.products.length) {
    for (const section of sections) {
      for (const stage of JOURNEY_STAGES) {
        if (!containsToken(section.text, stage)) {
          record.failures.push(
            `${BATCH_02.docs.journeys}: the ${section.product} journey is missing the stage ${stage}`,
          );
        }
      }
    }
  } else {
    for (const stage of JOURNEY_STAGES) {
      const occurrences = normalized.split(stage.toLowerCase()).length - 1;
      if (occurrences < BATCH_02.products.length) {
        record.failures.push(
          `${BATCH_02.docs.journeys}: the 17-stage blueprint must cover all three products; stage ${stage} appears ${occurrences} time(s)`,
        );
      }
    }
  }
  const requiredElements = [
    /user action/i,
    /touchpoint/i,
    /expected result/i,
    /required information/i,
    /failure mode/i,
    /recovery/i,
    /commercial opportunity/i,
    /trust|safety requirement/i,
    /acceptance evidence/i,
  ];
  for (const element of requiredElements) {
    if (!element.test(text)) {
      record.failures.push(
        `${BATCH_02.docs.journeys}: does not record the required journey element ${element}`,
      );
    }
  }
});

// --- 29. Batch-02 asset document (README §22) -----------------------------

check('batch02.assets', (record) => {
  const assetDoc = textOf(BATCH_02.docs.assets);
  if (assetDoc === null) return;
  const expectedAssetIds = BATCH_02.products.flatMap((product) =>
    BATCH02_ASSET_SUFFIXES.map(
      (suffix, index) => `${product.id}-${suffix}-${String(index + 1).padStart(2, '0')}`,
    ),
  );
  for (const assetId of expectedAssetIds) {
    if (!assetDoc.includes(assetId)) {
      record.failures.push(`${BATCH_02.docs.assets}: does not declare the asset id ${assetId}`);
    }
  }
  for (const prohibited of ['REAL_PRODUCT', 'PHOTOGRAPHED', 'PUBLISHED']) {
    const lines = assetDoc.split(/\r?\n/);
    lines.forEach((line, index) => {
      if (!line.includes(prohibited)) return;
      // The document legitimately defines the classification field as
      // `CONCEPT`/`REAL_PRODUCT`; only an actual REAL_PRODUCT classification fails.
      if (line.includes('CONCEPT') && prohibited === 'REAL_PRODUCT') return;
      if (isNegativeContext(lines, index, { wideContext: true })) return;
      record.failures.push(
        `${BATCH_02.docs.assets}:${index + 1}: an asset is presented as ${prohibited}; all batch-02 assets are CONCEPT and BLOCKED_ON_IMAGE_GENERATION`,
      );
    });
  }
});

// --- 30. Batch-02 safety (README §15, §16, §18) ---------------------------

check('batch02.safety', (record) => {
  const pilotDossier = textOf(BATCH_02.docs.dossiers.PILOT);
  const safetyCase = textOf(BATCH_02.docs.safetyCase);
  for (const [file, text] of [
    [BATCH_02.docs.dossiers.PILOT, pilotDossier],
    [BATCH_02.docs.safetyCase, safetyCase],
  ]) {
    if (text === null) continue;
    const lines = text.split(/\r?\n/);
    const blockedLine = lines.find(
      (line) => line.includes('PILOT_SAFETY_GATE') && line.includes('BLOCKED'),
    );
    if (!blockedLine) {
      record.failures.push(`${file}: does not state PILOT_SAFETY_GATE = BLOCKED (H-01, P-04)`);
    }
    for (const evidence of [
      ['PILOT_PHYSICAL_ESTOP_EVIDENCE', 'NOT_FOUND'],
      ['PILOT_MOTOR_ISOLATION_EVIDENCE', 'NOT_FOUND'],
    ]) {
      if (!lines.some((line) => line.includes(evidence[0]) && line.includes(evidence[1]))) {
        record.failures.push(
          `${file}: does not state ${evidence[0]} = ${evidence[1]} (H-03, H-10)`,
        );
      }
    }
    if (!/E-?stop/i.test(text)) {
      record.failures.push(`${file}: does not discuss the physical E-stop requirement`);
    }
    if (!/motor[- ]power isolation|aislamiento de (?:la )?potencia del motor/i.test(text)) {
      record.failures.push(`${file}: does not discuss independent motor-power isolation`);
    }
  }
  const contract = contractOf(BATCH_02);
  const pilot = contract?.products?.find((product) => product?.id === 'PILOT');
  if (pilot) {
    if (pilot.safetyGate !== 'BLOCKED') {
      record.failures.push(
        `${BATCH_02.contractPath}: PILOT.safetyGate must be BLOCKED, found ${JSON.stringify(pilot.safetyGate)}`,
      );
    }
    for (const blocker of ['H-01', 'H-03', 'H-10']) {
      if (!pilot.mc02Blockers?.includes(blocker)) {
        record.failures.push(
          `${BATCH_02.contractPath}: PILOT.mc02Blockers must include the physical safety blocker ${blocker}`,
        );
      }
    }
  }
  // No document may claim a completed sea trial or physical safety evidence.
  for (const file of scopedDocFiles(BATCH_02)) {
    const text = textOf(file);
    if (text === null) continue;
    collectFileViolations(
      record,
      file,
      text,
      [...SEA_TRIAL_CLAIM_RULES, ...PHYSICAL_EVIDENCE_CLAIM_RULES],
      { tolerant: true, wideContext: true },
    );
  }
});

// --- 31. Batch-02 SENSE measurement honesty (README §15, §16, §18) -------

check('batch02.sense', (record) => {
  const dossier = textOf(BATCH_02.docs.dossiers.SENSE);
  const calibrationPlan = textOf(BATCH_02.docs.calibrationPlan);
  for (const [file, text] of [
    [BATCH_02.docs.dossiers.SENSE, dossier],
    [BATCH_02.docs.calibrationPlan, calibrationPlan],
  ]) {
    if (text === null) continue;
    if (!text.includes('SENSE_MEASUREMENT_ACCURACY')) {
      record.failures.push(
        `${file}: does not use the canonical state SENSE_MEASUREMENT_ACCURACY (P-05)`,
      );
    }
    if (!text.includes('NOT_MEASURED')) {
      record.failures.push(
        `${file}: does not state that SENSE_MEASUREMENT_ACCURACY is NOT_MEASURED (P-05)`,
      );
    }
    if (!/calibrat/i.test(text)) {
      record.failures.push(`${file}: does not state the mandatory calibration requirement`);
    }
  }
  // No document may state an accuracy figure, IP rating or certified alarm.
  for (const file of scopedDocFiles(BATCH_02)) {
    const text = textOf(file);
    if (text === null) continue;
    collectFileViolations(record, file, text, ACCURACY_CLAIM_RULES, {
      tolerant: true,
      wideContext: true,
      skipQuestions: true,
      allowProposedTargets: true,
    });
    collectFileViolations(record, file, text, INGRESS_CLAIM_RULES, {
      tolerant: true,
      wideContext: true,
      skipQuestions: true,
      allowProposedTargets: true,
    });
  }
  for (const file of scopedCopyFiles(BATCH_02)) {
    const text = textOf(file);
    if (text === null) continue;
    collectFileViolations(record, file, text, ACCURACY_CLAIM_RULES, {
      tolerant: true,
      skipQuestions: true,
    });
    collectFileViolations(record, file, text, INGRESS_CLAIM_RULES, {
      tolerant: true,
      skipQuestions: true,
    });
  }
  // No invented SENSE module may be referenced by a batch-02 document or kit.
  const candidateModules = /\bSENSE-[A-Z][A-Z0-9-]*[A-Z0-9]\b/g;
  // Canonical, non-edition SENSE tokens: document ids and filenames, cross-product
  // relationship labels, acceptance-criteria ids and asset ids.
  const knownNonEditionTokens =
    /^SENSE-(?:MEASUREMENT-AND-CALIBRATION-PLAN|CALIBRATION|COMMERCIAL-SPEC|AC-\d{2}|WATCH|HUB|NAV|PILOT|AIS|FLEET|DISPLAY|WEATHER|(?:HERO|USE|OVR|EDN|ECO|INS|MOB|TMB|OG|TEC)-\d{2})$/;
  const known = new Set([...SENSE_MODULE_IDS, ...SENSE_KIT_IDS]);
  for (const file of [...scopedDocFiles(BATCH_02), ...scopedCopyFiles(BATCH_02)]) {
    const text = textOf(file);
    if (text === null) continue;
    for (const match of text.matchAll(candidateModules)) {
      const token = match[0];
      if (known.has(token) || knownNonEditionTokens.test(token)) continue;
      record.failures.push(
        `${file}: references the invented SENSE module or kit id ${token}; only the five module SKUs and three kits exist`,
      );
    }
  }
});

// --- 32. Batch-02 SENSE kit composition in copy and D4 (MAJ-03) ----------

const SENSE_MODULE_WORDS = {
  'SENSE-WIND': /\b(?:wind|viento)\b/i,
  'SENSE-POWER': /\b(?:power|energía|energia|battery|batería|bateria)\b/i,
  'SENSE-BILGE': /\b(?:bilge|sentina|sentinas)\b/i,
  'SENSE-TANKS': /\b(?:tanks?|tanques?|depósitos?|depositos?)\b/i,
  'SENSE-ENV': /\b(?:environment|ambiente|temperatura|humedad|temperature|humidity)\b/i,
};

const BATCH02_KIT_NAMES = {
  'SENSE-ESSENTIALS': 'MAREA SENSE Essentials',
  'SENSE-SAIL': 'MAREA SENSE Sail',
  'SENSE-SYSTEMS': 'MAREA SENSE Systems',
};

function extractSenseModules(text) {
  return Object.entries(SENSE_MODULE_WORDS)
    .filter(([_moduleId, pattern]) => pattern.test(text))
    .map(([moduleId]) => moduleId);
}

check('batch02.kits', (record) => {
  // Customer copy must state the same kit composition as D2 §7 and D4 §3.3.
  for (const language of ['es', 'en']) {
    const file = BATCH_02.products.find((product) => product.id === 'SENSE').copy[language];
    const text = textOf(file);
    if (text === null) continue;
    const lines = text.split(/\r?\n/);
    for (const kitId of SENSE_KIT_IDS) {
      const kit = BATCH02_KIT_NAMES[kitId];
      const composition = SENSE_KIT_COMPOSITION[kitId];
      const candidates = lines.filter((line) => {
        const lower = line.toLowerCase();
        const names = lower.includes(kitId.toLowerCase()) || lower.includes(kit.toLowerCase());
        return names && line.includes('+');
      });
      if (candidates.length === 0) {
        record.failures.push(
          `${file}: does not state the ${kit} composition as an explicit list; the copy must match D2 §7 and D4 §3.3 [${composition.join(', ')}]`,
        );
        continue;
      }
      for (const line of candidates) {
        const actual = extractSenseModules(line);
        const wanted = [...composition].sort();
        if (actual.length < 2) {
          record.failures.push(
            `${file}: cannot identify the modules of ${kit} on its composition line; expected [${composition.join(', ')}]`,
          );
          continue;
        }
        if ([...actual].sort().join('|') !== wanted.join('|')) {
          record.failures.push(
            `${file}: ${kit} composition in customer copy [${actual.join(', ')}] does not match D2 §7 / D4 §3.3 [${composition.join(', ')}]`,
          );
        }
      }
    }
  }
  // D4 §3.3 must state each kit composition with module SKU ids.
  const editionsText = textOf(BATCH_02.docs.editions);
  if (editionsText !== null) {
    const lines = editionsText.split(/\r?\n/);
    for (const kitId of SENSE_KIT_IDS) {
      const headingIndex = lines.findIndex((line) =>
        new RegExp(`^\\*\\*\`${kitId}\` —`).test(line),
      );
      if (headingIndex === -1) {
        record.failures.push(
          `${BATCH_02.docs.editions}: no composition section for ${kitId}; D4 §3.3 must state the kit composition`,
        );
        continue;
      }
      let end = lines.length;
      for (let index = headingIndex + 1; index < lines.length; index++) {
        if (SENSE_KIT_IDS.some((other) => other !== kitId && lines[index].includes(other))) {
          end = index;
          break;
        }
      }
      const section = lines.slice(headingIndex, end);
      const includedLine = section.find((line) => /^- \*\*Capabilities included\.\*\*/.test(line));
      if (!includedLine) {
        record.failures.push(
          `${BATCH_02.docs.editions}: ${kitId} section does not state "Capabilities included" with its module composition`,
        );
        continue;
      }
      const actual = [...includedLine.matchAll(/SENSE-(?:WIND|POWER|BILGE|TANKS|ENV)\b/g)].map(
        (match) => match[0],
      );
      const wanted = [...SENSE_KIT_COMPOSITION[kitId]].sort();
      if ([...actual].sort().join('|') !== wanted.join('|')) {
        record.failures.push(
          `${BATCH_02.docs.editions}: ${kitId} composition [${actual.join(', ')}] does not match D2 §7.3 and the JSON contract [${wanted.join(', ')}]`,
        );
      }
    }
  }
});

// --- 33. Batch-02 WATCH service honesty (README §15, §16) ----------------

check('batch02.watch', (record) => {
  const contract = contractOf(BATCH_02);
  const watch = contract?.products?.find((product) => product?.id === 'WATCH');
  const dossier = textOf(BATCH_02.docs.dossiers.WATCH);
  const alertContract = textOf(BATCH_02.docs.alertDeliveryContract);
  const expectedStates = BATCH02_EVIDENCE_STATES.WATCH ?? [];
  if (dossier !== null) {
    const lines = dossier.split(/\r?\n/);
    for (const [state, value] of expectedStates) {
      if (!lines.some((line) => line.includes(state) && line.includes(value))) {
        record.failures.push(
          `${BATCH_02.docs.dossiers.WATCH}: does not state ${state} = ${value} (P-06, H-12)`,
        );
      }
    }
    if (!/subscription/i.test(dossier)) {
      record.failures.push(
        `${BATCH_02.docs.dossiers.WATCH}: does not describe the subscription entitlement`,
      );
    }
  }
  if (alertContract !== null) {
    if (!/device identity|identidad del dispositivo/i.test(alertContract)) {
      record.failures.push(
        `${BATCH_02.docs.alertDeliveryContract}: does not address device identity and ownership`,
      );
    }
    if (!/privacy|privacidad/i.test(alertContract)) {
      record.failures.push(`${BATCH_02.docs.alertDeliveryContract}: does not address privacy`);
    }
    if (!/remote helm|remote steering|gobierno remoto/i.test(alertContract)) {
      record.failures.push(
        `${BATCH_02.docs.alertDeliveryContract}: does not exclude remote helm control`,
      );
    }
  }
  if (watch) {
    if (watch.subscriptionTermsStatus !== 'OPEN') {
      record.failures.push(
        `${BATCH_02.contractPath}: WATCH.subscriptionTermsStatus must be "OPEN", found ${JSON.stringify(watch.subscriptionTermsStatus)}`,
      );
    }
    if (watch.remoteHelmControl !== 'PROHIBITED') {
      record.failures.push(
        `${BATCH_02.contractPath}: WATCH.remoteHelmControl must be "PROHIBITED"`,
      );
    }
  }
  // No document may promise instant delivery, certified distress service or
  // bundled connectivity without a connectivity contract.
  for (const file of scopedDocFiles(BATCH_02)) {
    const text = textOf(file);
    if (text === null) continue;
    collectFileViolations(
      record,
      file,
      text,
      [...DELIVERY_GUARANTEE_RULES, ...DISTRESS_CLAIM_RULES, ...CONNECTIVITY_CLAIM_RULES],
      { tolerant: true, wideContext: true, skipQuestions: true },
    );
  }
  for (const file of scopedCopyFiles(BATCH_02)) {
    const text = textOf(file);
    if (text === null) continue;
    collectFileViolations(
      record,
      file,
      text,
      [...DELIVERY_GUARANTEE_RULES, ...DISTRESS_CLAIM_RULES, ...CONNECTIVITY_CLAIM_RULES],
      { tolerant: true, skipQuestions: true },
    );
  }
});

// --- 33. Batch-02 global prohibitions (README §16, §23) -------------------

check('batch02.prohibitions', (record) => {
  for (const batch of BATCHES) {
    if (contractOf(batch)) collectContractTextViolations(record, batch, STEERING_CLAIM_RULES);
  }
  // Required limitation statements legitimately say "no remote steering" in copy, so
  // negation is tolerated; an affirmative remote-steering claim still fails.
  for (const file of [...SCOPED_DOC_FILES, ...SCOPED_COPY_FILES]) {
    const text = textOf(file);
    if (text === null) continue;
    collectFileViolations(record, file, text, STEERING_CLAIM_RULES, {
      tolerant: true,
      wideContext: !SCOPED_COPY_FILES.includes(file),
      skipQuestions: true,
    });
  }
  // The customer-facing copy carries no purchase CTA, no price, no stock and no
  // certification, without negative-context tolerance (existing rules already
  // enforce the first three; certification wording is checked here).
  for (const file of scopedCopyFiles(BATCH_02)) {
    const text = textOf(file);
    if (text === null) continue;
    collectFileViolations(
      record,
      file,
      text,
      [
        [
          /\b(?:certified|homologad[oa]|certificad[oa])\b/i,
          'a certification claim is prohibited in customer-facing copy; MAREA is a proposed, uncertified brand',
        ],
      ],
      { tolerant: true, skipQuestions: true },
    );
  }
});

// --- 34. Nine families across three contracts (MC-05, MC-06, MC-07) --------

check('all.families', (record) => {
  const productIds = [];
  const editionIds = [];
  for (const batch of BATCHES) {
    const contract = contractOf(batch);
    if (!contract || !Array.isArray(contract.products)) continue;
    for (const product of contract.products) {
      productIds.push(product?.id);
      if (!PRODUCT_TYPE_VOCABULARY.includes(product?.type)) {
        record.failures.push(
          `${batch.contractPath}: product ${product?.id}: type must be one of [${PRODUCT_TYPE_VOCABULARY.join(', ')}], found ${JSON.stringify(product?.type)}`,
        );
      }
      const fields = isRecord(product?.fields) ? Object.keys(product.fields) : [];
      if (fields.length !== 24) {
        record.failures.push(
          `${batch.contractPath}: product ${product?.id}: fields must contain exactly 24 entries, found ${fields.length}`,
        );
      }
      for (const edition of Array.isArray(product?.editions) ? product.editions : []) {
        editionIds.push(edition?.id);
      }
    }
  }
  if (productIds.length !== 9) {
    record.failures.push(
      `the three contracts must define exactly nine products, found ${productIds.length}`,
    );
  }
  const missingFamilies = CANONICAL_FAMILY_IDS.filter((id) => !productIds.includes(id));
  for (const id of missingFamilies) {
    record.failures.push(`the canonical family ${id} is not defined by any batch contract`);
  }
  if (new Set(productIds).size !== productIds.length) {
    record.failures.push('product ids are not unique across the three contracts');
  }
  if (new Set(editionIds).size !== editionIds.length) {
    record.failures.push('edition ids are not unique across the three contracts');
  }
  record.detail = `${productIds.length} products / ${editionIds.length} editions across ${BATCHES.length} contracts`;
});

// --- 35. Batch-03 contract additions (MC-07 brief §10, §11, §15) -----------

check('batch03.contract', (record) => {
  const contract = contractOf(BATCH_03);
  if (!contract) {
    record.failures.push(
      `${BATCH_03.contractPath} is missing; the batch-03 product-definition contract is required`,
    );
    return;
  }
  if (contract.batch !== 3) {
    record.failures.push(
      `${BATCH_03.contractPath}: batch must be 3, found ${JSON.stringify(contract.batch)}`,
    );
  }
  if (contract.batch01Contract !== BATCH_03.batch01Contract) {
    record.failures.push(
      `${BATCH_03.contractPath}: batch01Contract must reference ${BATCH_03.batch01Contract}, found ${JSON.stringify(contract.batch01Contract)}`,
    );
  }
  if (contract.batch02Contract !== BATCH_03.batch02Contract) {
    record.failures.push(
      `${BATCH_03.contractPath}: batch02Contract must reference ${BATCH_03.batch02Contract}, found ${JSON.stringify(contract.batch02Contract)}`,
    );
  }
  const controls = contract.publicationControls;
  if (!isRecord(controls)) {
    record.failures.push(`${BATCH_03.contractPath}: publicationControls is missing`);
  } else {
    const expectedControls = {
      publicationState: 'INTERNAL_ONLY',
      published: false,
      forSale: false,
      purchaseCtaAllowed: false,
      pricesInCopyAllowed: false,
      pricesLabelled: 'HYPOTHESIS_UNAPPROVED',
      remoteSteeringAllowed: false,
      certificationClaimAllowed: false,
    };
    for (const [key, expected] of Object.entries(expectedControls)) {
      if (controls[key] !== expected) {
        record.failures.push(
          `${BATCH_03.contractPath}: publicationControls.${key} must be ${JSON.stringify(expected)}, found ${JSON.stringify(controls[key])}`,
        );
      }
    }
  }
  if (!isRecord(contract.globalRestrictions)) {
    record.failures.push(`${BATCH_03.contractPath}: globalRestrictions is missing`);
  } else {
    for (const [key, expected] of Object.entries(BATCH03_GLOBAL_RESTRICTIONS)) {
      if (contract.globalRestrictions[key] !== expected) {
        record.failures.push(
          `${BATCH_03.contractPath}: globalRestrictions.${key} must be ${JSON.stringify(expected)}, found ${JSON.stringify(contract.globalRestrictions[key])}`,
        );
      }
    }
  }
  const gates = contract.publicationGates;
  if (!Array.isArray(gates) || gates.length === 0) {
    record.failures.push(
      `${BATCH_03.contractPath}: publicationGates must be a non-empty array of {gate, state, reason}`,
    );
  } else {
    for (const gateId of BATCH03_REQUIRED_PUBLICATION_GATES) {
      const gate = gates.find((entry) => entry?.gate === gateId);
      if (!gate) {
        record.failures.push(
          `${BATCH_03.contractPath}: publicationGates is missing the gate ${gateId}`,
        );
        continue;
      }
      if (gate.state !== 'BLOCKED') {
        record.failures.push(
          `${BATCH_03.contractPath}: publication gate ${gateId} must be BLOCKED at MC-07, found ${JSON.stringify(gate.state)}`,
        );
      }
      if (!isFilled(gate.reason)) {
        record.failures.push(
          `${BATCH_03.contractPath}: publication gate ${gateId} must state its blocking reason`,
        );
      }
    }
  }
  if (contract.integrationStatusVocabulary?.join('|') !== INTEGRATION_STATUS_VOCABULARY.join('|')) {
    record.failures.push(
      `${BATCH_03.contractPath}: integrationStatusVocabulary must be exactly [${INTEGRATION_STATUS_VOCABULARY.join(', ')}]`,
    );
  }
  const authority = contract.crossProductAuthority;
  if (!Array.isArray(authority) || authority.length < BATCH03_INTEGRATION_BASELINE.length) {
    record.failures.push(
      `${BATCH_03.contractPath}: crossProductAuthority must contain the ${BATCH03_INTEGRATION_BASELINE.length} frozen product-to-product dependencies of brief §9`,
    );
  } else {
    for (const [from, to, status] of BATCH03_INTEGRATION_BASELINE) {
      const relationship = `${from} ↔ ${to}`;
      const row = authority.find((entry) => entry?.relationship === relationship);
      if (!row) {
        record.failures.push(
          `${BATCH_03.contractPath}: crossProductAuthority is missing the frozen relationship ${relationship}`,
        );
        continue;
      }
      if (row.status !== status) {
        record.failures.push(
          `${BATCH_03.contractPath}: crossProductAuthority ${relationship} status must be ${status}, found ${JSON.stringify(row.status)}`,
        );
      }
      if (!isFilled(row.permitted) || !isFilled(row.prohibited)) {
        record.failures.push(
          `${BATCH_03.contractPath}: crossProductAuthority ${relationship} must record both permitted and prohibited behaviour`,
        );
      }
      if (
        row.status === 'SUPPORTED' &&
        (!Array.isArray(row.evidence) || row.evidence.length === 0)
      ) {
        record.failures.push(
          `${BATCH_03.contractPath}: crossProductAuthority ${relationship} is SUPPORTED without an evidence reference`,
        );
      }
    }
  }
  const tenancy = contract.tenancyModel;
  if (!isRecord(tenancy)) {
    record.failures.push(`${BATCH_03.contractPath}: tenancyModel is missing`);
  } else {
    const expectedTenancy = {
      organizationScopedTenancy: true,
      serverSideAuthorizationRequired: true,
      trustClientSuppliedTenant: false,
      crossTenantAccessAllowed: false,
      defaultRole: 'NO_ACCESS',
      removedMemberAccessRevokedImmediately: true,
      auditLogRequired: true,
      privacyPolicyRequired: true,
      dataExportPolicyRequired: true,
      telemetryReadOnly: true,
      remoteSteeringAllowed: false,
      productionService: false,
      slaState: 'NO_SLA_ESTABLISHED',
    };
    for (const [key, expected] of Object.entries(expectedTenancy)) {
      if (tenancy[key] !== expected) {
        record.failures.push(
          `${BATCH_03.contractPath}: tenancyModel.${key} must be ${JSON.stringify(expected)}, found ${JSON.stringify(tenancy[key])}`,
        );
      }
    }
    if (
      !Array.isArray(tenancy.roles) ||
      tenancy.roles.join('|') !== FLEET_ROLE_VOCABULARY.join('|')
    ) {
      record.failures.push(
        `${BATCH_03.contractPath}: tenancyModel.roles must be exactly [${FLEET_ROLE_VOCABULARY.join(', ')}]`,
      );
    }
  }
  const entitlement = contract.entitlementModel;
  if (!isRecord(entitlement)) {
    record.failures.push(`${BATCH_03.contractPath}: entitlementModel is missing`);
  } else {
    for (const [key, expected] of Object.entries(BATCH03_ENTITLEMENT_MODEL)) {
      if (entitlement[key] !== expected) {
        record.failures.push(
          `${BATCH_03.contractPath}: entitlementModel.${key} must be ${JSON.stringify(expected)}, found ${JSON.stringify(entitlement[key])}`,
        );
      }
    }
  }
  if (!isRecord(contract.sourceDocuments)) {
    record.failures.push(`${BATCH_03.contractPath}: sourceDocuments is missing`);
  } else {
    const requiredDocuments = {
      conventions: `${PRODUCTS_DIR}README.md`,
      editions: BATCH_03.docs.editions,
      compatibility: BATCH_03.docs.compatibility,
      pricing: BATCH_03.docs.pricing,
      journeys: BATCH_03.docs.journeys,
      assets: BATCH_03.docs.assets,
      claimsPolicy: 'docs/marea/brand/COMMERCIAL-BRAND-CLAIMS-POLICY.md',
      blockers: MC02_REGISTER,
    };
    for (const [key, expected] of Object.entries(requiredDocuments)) {
      if (contract.sourceDocuments[key] !== expected) {
        record.failures.push(
          `${BATCH_03.contractPath}: sourceDocuments.${key} must reference ${expected}, found ${JSON.stringify(contract.sourceDocuments[key])}`,
        );
      }
    }
    for (const product of BATCH_03.products) {
      if (contract.sourceDocuments.dossiers?.[product.id] !== product.dossier) {
        record.failures.push(
          `${BATCH_03.contractPath}: sourceDocuments.dossiers.${product.id} must reference ${product.dossier}`,
        );
      }
    }
    for (const [key, expected] of Object.entries(BATCH_03.docs.annexes)) {
      if (contract.sourceDocuments.annexes?.[key] !== expected) {
        record.failures.push(
          `${BATCH_03.contractPath}: sourceDocuments.annexes.${key} must reference ${expected}`,
        );
      }
    }
    for (const value of Object.values(contract.sourceDocuments)) {
      if (typeof value !== 'string') continue;
      if (!existsSync(resolve(root, value))) {
        record.failures.push(
          `${BATCH_03.contractPath}: sourceDocuments references the missing file ${value}`,
        );
      }
    }
  }
});

// --- 36. Batch-03 product invariants (brief §10, §11, §12, §15) -----------

check('batch03.invariants', (record) => {
  const contract = contractOf(BATCH_03);
  if (!contract) return;
  const products = Array.isArray(contract.products) ? contract.products : [];
  for (const [productId, invariants] of Object.entries(BATCH03_INVARIANTS)) {
    const product = products.find((entry) => entry?.id === productId);
    if (!product) {
      record.failures.push(
        `${BATCH_03.contractPath}: product ${productId} is missing; the invariant block cannot be validated`,
      );
      continue;
    }
    for (const [key, expected] of Object.entries(invariants.equalities)) {
      if (product[key] !== expected) {
        record.failures.push(
          `${BATCH_03.contractPath}: product ${productId}.${key} must be ${JSON.stringify(expected)}, found ${JSON.stringify(product[key])}`,
        );
      }
    }
    if (invariants.hardwareBoundary) {
      const boundary = product.hardwareBoundary;
      if (!isRecord(boundary)) {
        record.failures.push(
          `${BATCH_03.contractPath}: product ${productId}.hardwareBoundary is missing`,
        );
      } else {
        for (const [key, expected] of Object.entries(invariants.hardwareBoundary)) {
          if (boundary[key] !== expected) {
            record.failures.push(
              `${BATCH_03.contractPath}: product ${productId}.hardwareBoundary.${key} must be ${JSON.stringify(expected)}, found ${JSON.stringify(boundary[key])}`,
            );
          }
        }
      }
    }
    if (invariants.entitlementModel) {
      const entitlement = product.entitlementModel;
      if (!isRecord(entitlement)) {
        record.failures.push(
          `${BATCH_03.contractPath}: product ${productId}.entitlementModel is missing`,
        );
      } else {
        for (const [key, expected] of Object.entries(invariants.entitlementModel)) {
          if (entitlement[key] !== expected) {
            record.failures.push(
              `${BATCH_03.contractPath}: product ${productId}.entitlementModel.${key} must be ${JSON.stringify(expected)}, found ${JSON.stringify(entitlement[key])}`,
            );
          }
        }
      }
    }
    if (invariants.tenancy) {
      const tenancy = product.tenancy;
      if (!isRecord(tenancy)) {
        record.failures.push(`${BATCH_03.contractPath}: product ${productId}.tenancy is missing`);
      } else {
        for (const [key, expected] of Object.entries(invariants.tenancy)) {
          if (tenancy[key] !== expected) {
            record.failures.push(
              `${BATCH_03.contractPath}: product ${productId}.tenancy.${key} must be ${JSON.stringify(expected)}, found ${JSON.stringify(tenancy[key])}`,
            );
          }
        }
        if (tenancy.telemetryReadOnly !== true || tenancy.remoteControlPath !== false) {
          record.failures.push(
            `${BATCH_03.contractPath}: product ${productId}.tenancy must state telemetryReadOnly=true and remoteControlPath=false`,
          );
        }
      }
    }
    // Every one of the nine readiness dimensions must drive at least one field.
    const fields = isRecord(product.fields) ? Object.values(product.fields) : [];
    for (const dimension of Object.keys(READINESS_DIMENSIONS)) {
      if (!fields.some((field) => field?.readinessDimension === dimension)) {
        record.failures.push(
          `${BATCH_03.contractPath}: product ${productId}: no field is anchored to the readiness dimension ${dimension}`,
        );
      }
    }
  }
});

// Tenancy must also declare no remote-control path at product level.
check('batch03.tenancyRemoteControl', (record) => {
  const contract = contractOf(BATCH_03);
  const fleet = contract?.products?.find((product) => product?.id === 'FLEET');
  if (!fleet) return;
  walkJsonEntries(fleet, (key, value, path) => {
    if (/remoteControl|remoteSteering|controlAuthority/i.test(key) && value === true) {
      record.failures.push(
        `${BATCH_03.contractPath}: ${path} must not grant remote vessel control; FLEET telemetry is read-only`,
      );
    }
  });
});
// --- 37. Batch-03 dossiers: 24 h4 fields, field bullets, annex tokens -----

const DOSSIER_FIELD_BULLETS = [
  'Definition',
  'Evidence',
  'Owner',
  'Blockers / dependencies',
  'Commercial readiness',
];

check('batch03.dossiers', (record) => {
  for (const product of BATCH_03.products) {
    const text = textOf(product.dossier);
    if (text === null) continue;
    const lines = text.split(/\r?\n/);
    const h4Fields = new Set();
    for (const line of lines) {
      const match = /^\s{0,3}####\s*F(\d{2})\b/.exec(line);
      if (match) h4Fields.add(Number(match[1]));
    }
    for (let number = 1; number <= 24; number++) {
      if (!h4Fields.has(number)) {
        record.failures.push(
          `${product.dossier}: is missing the h4 field heading #### F${String(number).padStart(2, '0')} (brief §17.6)`,
        );
      }
    }
    for (const bullet of DOSSIER_FIELD_BULLETS) {
      const pattern = new RegExp(`^- \\*\\*${escapeRegExp(bullet)}\\.\\*\\*`, 'm');
      const count = lines.filter((line) => pattern.test(line)).length;
      if (count < 24) {
        record.failures.push(
          `${product.dossier}: only ${count} "${bullet}" field bullet(s); every one of the 24 fields needs the batch-02 field block (brief §17.6)`,
        );
      }
    }
  }
  const annexRequirements = [
    [
      BATCH_03.docs.annexes.displayHardware,
      ['SIZE_NOT_FROZEN', 'HARDWARE_NOT_SELECTED', 'BOM_NOT_ESTABLISHED', 'REQUIRED_TARGET'],
    ],
    [
      BATCH_03.docs.annexes.weatherDataRights,
      ['NOT_GRANTED', 'redistribution', 'offline', 'entitlement'],
    ],
    [
      BATCH_03.docs.annexes.fleetTenancy,
      [
        'authorization',
        'cross-tenant',
        'ORGANIZATION_OWNER',
        'EXTERNAL_INSTALLER',
        'audit',
        'privacy',
        'export',
        'NO_SLA_ESTABLISHED',
      ],
    ],
  ];
  for (const [file, tokens] of annexRequirements) {
    const text = textOf(file);
    if (text === null) continue;
    const normalized = text.toLowerCase();
    for (const token of tokens) {
      if (!normalized.includes(token.toLowerCase())) {
        record.failures.push(
          `${file}: does not state the mandatory ${token} requirement (brief §11, §12, §17)`,
        );
      }
    }
  }
});

// --- 38. Batch-03 customer copy: 24 exact sections and status line ---------

check('batch03.copy', (record) => {
  const navEs = textOf(BATCH_01.products[0].copy.es);
  const navEn = textOf(BATCH_01.products[0].copy.en);
  const reference = {
    es: navEs === null ? null : numberedHeadings(navEs),
    en: navEn === null ? null : numberedHeadings(navEn),
  };
  for (const expected of BATCH_03.products) {
    for (const language of ['es', 'en']) {
      const file = expected.copy[language];
      const text = textOf(file);
      if (text === null) continue;
      const headings = numberedHeadings(text);
      if (headings.length !== 24) {
        record.failures.push(
          `${file}: has ${headings.length} numbered customer-copy sections; the batch-03 copy uses the exact 24 numbered sections of copy/nav.${language}.md`,
        );
      }
      const numbers = headings.map((heading) => heading.number);
      const expectedNumbers = Array.from({ length: 24 }, (_value, index) => index + 1);
      if (numbers.join('|') !== expectedNumbers.join('|')) {
        record.failures.push(
          `${file}: numbered copy sections must be exactly 1..24 in order, found [${numbers.join(', ')}]`,
        );
      }
      const referenceHeadings = reference[language];
      if (referenceHeadings !== null && referenceHeadings.length === 24) {
        for (const heading of headings) {
          const wanted = referenceHeadings.find((entry) => entry.number === heading.number);
          if (wanted && wanted.label !== heading.label) {
            record.failures.push(
              `${file}: section ${heading.number} heading must use the exact wording of copy/nav.${language}.md (${JSON.stringify(wanted.label)}), found ${JSON.stringify(heading.label)}`,
            );
          }
        }
      }
      if (/^\s{0,3}###\s+\S/m.test(text)) {
        record.failures.push(
          `${file}: must not use ### subheadings; ES and EN heading counts must stay identical`,
        );
      }
      if (!/(?:avisos\s+aprobados|approved\s+disclaimers|texto\s+literal|verbatim)/i.test(text)) {
        record.failures.push(`${file}: must end with the approved-disclaimer section (brief §8)`);
      }
      if (!/DRAFT\s*[-–—]\s*INTERNAL ONLY\s*[-–—]\s*NOT PUBLISHED/i.test(text)) {
        record.failures.push(
          `${file}: must carry the internal DRAFT / INTERNAL ONLY / NOT PUBLISHED status line`,
        );
      }
      if (!/PRICES ARE HYPOTHESES,\s*NOT APPROVED/i.test(text)) {
        record.failures.push(
          `${file}: the status line must state that prices are hypotheses, not approved`,
        );
      }
      text.split(/\r?\n/).forEach((line, index) => {
        for (const pattern of PRICE_IN_COPY) {
          if (pattern.test(line)) {
            record.failures.push(
              `${file}:${index + 1}: a price does not belong in customer-facing copy; copy must contain no currency amounts at all`,
            );
            break;
          }
        }
      });
    }
  }
});

// --- 39. Batch-03 edition authority (brief §4) ----------------------------

check('batch03.editions', (record) => {
  const contract = contractOf(BATCH_03);
  const text = textOf(BATCH_03.docs.editions);
  if (text !== null) {
    const normalized = normalizeForCheck(text);
    if (!text.includes('HYPOTHESIS_UNAPPROVED')) {
      record.failures.push(
        `${BATCH_03.docs.editions}: does not label the price hypotheses HYPOTHESIS_UNAPPROVED`,
      );
    }
    if (!normalized.includes('not established')) {
      record.failures.push(
        `${BATCH_03.docs.editions}: does not record that DISPLAY Large and FLEET Enterprise have no established price`,
      );
    }
    for (const editionId of BATCH03_UNPRICED_EDITIONS) {
      const lines = text.split(/\r?\n/);
      lines.forEach((line, index) => {
        if (!containsToken(line, editionId)) return;
        const amounts = euroAmountsInLine(line);
        if (amounts.length === 0) return;
        if (isProhibitedExampleContext(lines, index)) return;
        record.failures.push(
          `${BATCH_03.docs.editions}:${index + 1}: ${editionId} must not be presented with a price; its price is NOT_ESTABLISHED`,
        );
      });
    }
  }
  if (contract) {
    for (const product of contract.products ?? []) {
      for (const edition of product.editions ?? []) {
        if (BATCH03_UNPRICED_EDITIONS.includes(edition.id) && edition.priceHypothesis !== null) {
          record.failures.push(
            `${BATCH_03.contractPath}: edition ${edition.id} must not carry a price hypothesis; its price is NOT_ESTABLISHED (brief §4)`,
          );
        }
        if (edition.priceHypothesis) {
          const allowedAmount = BATCH03_ALLOWED_AMOUNTS.has(edition.priceHypothesis.amount);
          if (!allowedAmount) {
            record.failures.push(
              `${BATCH_03.contractPath}: edition ${edition.id} carries the amount ${JSON.stringify(edition.priceHypothesis.amount)}, which is not in the frozen batch-03 hypothesis table (brief §4)`,
            );
          }
        }
      }
    }
  }
});
// --- 40. Batch-03 claim prohibitions (brief §12, §14, §17) ----------------

check('batch03.claims', (record) => {
  for (const file of scopedDocFiles(BATCH_03)) {
    const text = textOf(file);
    if (text === null) continue;
    collectFileViolations(record, file, text, BATCH03_CLAIM_RULES, {
      tolerant: true,
      wideContext: true,
      skipQuestions: true,
      allowProposedTargets: true,
    });
    collectFileViolations(record, file, text, BATCH03_CLEARANCE_RULES, {
      tolerant: true,
      wideContext: true,
      skipQuestions: true,
    });
  }
  for (const file of scopedCopyFiles(BATCH_03)) {
    const text = textOf(file);
    if (text === null) continue;
    collectFileViolations(record, file, text, BATCH03_CLAIM_RULES, {
      tolerant: true,
      wideContext: false,
      skipQuestions: true,
    });
    collectFileViolations(record, file, text, BATCH03_CLEARANCE_RULES, {
      tolerant: true,
      skipQuestions: true,
    });
    collectFileViolations(
      record,
      file,
      text,
      [
        [
          /\b(?:is|are|has\s+been|have\s+been|está|están|ha\s+sido|han\s+sido)\s+(?:fully\s+)?(?:certified|homologad[oa]s?|certificad[oa]s?)\b/i,
          'a certification claim is prohibited in customer-facing copy; MAREA is a proposed, uncertified brand',
        ],
      ],
      { tolerant: true, skipQuestions: true },
    );
  }
  const contract = contractOf(BATCH_03);
  if (contract) {
    walkJsonEntries(contract, (_key, value, path) => {
      if (typeof value !== 'string' || !value.trim()) return;
      for (const [pattern, message] of [...BATCH03_CLAIM_RULES, ...BATCH03_CLEARANCE_RULES]) {
        if (!pattern.test(value)) continue;
        if (EXEMPT_CONTEXT.test(value)) continue;
        record.failures.push(`${BATCH_03.contractPath}: ${path}: ${message}`);
      }
    });
  }
});

// --- 41. Batch-03 DISPLAY hardware boundary (brief §12) -------------------

check('batch03.display', (record) => {
  const dossier = textOf(BATCH_03.docs.dossiers.DISPLAY);
  if (dossier !== null) {
    for (const token of [
      'SIZE_NOT_FROZEN',
      'HARDWARE_NOT_SELECTED',
      'BOM_NOT_ESTABLISHED',
      'REQUIRED_TARGET',
      'PILOT',
    ]) {
      if (!dossier.includes(token)) {
        record.failures.push(
          `${BATCH_03.docs.dossiers.DISPLAY}: does not state the mandatory hardware-boundary token ${token} (brief §12)`,
        );
      }
    }
    if (!/read[- ]only/i.test(dossier)) {
      record.failures.push(
        `${BATCH_03.docs.dossiers.DISPLAY}: does not state that PILOT on the display is read-only status/monitoring at most`,
      );
    }
    if (!/chart/i.test(dossier)) {
      record.failures.push(
        `${BATCH_03.docs.dossiers.DISPLAY}: does not state that charts are a separately licensed entitlement (D-01)`,
      );
    }
  }
  const contract = contractOf(BATCH_03);
  const display = contract?.products?.find((product) => product?.id === 'DISPLAY');
  if (display) {
    for (const blocker of ['H-05', 'H-11', 'P-07']) {
      if (!display.mc02Blockers?.includes(blocker)) {
        record.failures.push(
          `${BATCH_03.contractPath}: DISPLAY.mc02Blockers must include ${blocker} (hardware and chart gates)`,
        );
      }
    }
  }
});

// --- 42. Batch-03 WEATHER entitlement and forecast honesty (brief §10) ----

check('batch03.weather', (record) => {
  const dossier = textOf(BATCH_03.docs.dossiers.WEATHER);
  if (dossier !== null) {
    for (const token of ['NOT_GRANTED']) {
      if (!dossier.includes(token)) {
        record.failures.push(
          `${BATCH_03.docs.dossiers.WEATHER}: does not state the canonical state ${token} for provider data rights`,
        );
      }
    }
    if (
      !/(?:never|not)[^.\n]{0,40}billed twice/i.test(dossier) &&
      !/double[- ]billing/i.test(dossier)
    ) {
      record.failures.push(
        `${BATCH_03.docs.dossiers.WEATHER}: does not state that the same entitlement is never billed twice across NAV and WEATHER (brief §10)`,
      );
    }
    if (!/redistribut/i.test(dossier)) {
      record.failures.push(
        `${BATCH_03.docs.dossiers.WEATHER}: does not address redistribution rights (D-04)`,
      );
    }
    if (!/offline/i.test(dossier)) {
      record.failures.push(
        `${BATCH_03.docs.dossiers.WEATHER}: does not address offline data rights (D-04, D-07)`,
      );
    }
    if (!/stale/i.test(dossier)) {
      record.failures.push(
        `${BATCH_03.docs.dossiers.WEATHER}: does not state that a stale or unavailable forecast is never shown as current`,
      );
    }
  }
  const contract = contractOf(BATCH_03);
  const weather = contract?.products?.find((product) => product?.id === 'WEATHER');
  if (weather) {
    for (const blocker of ['D-04', 'D-07', 'P-08']) {
      if (!weather.mc02Blockers?.includes(blocker)) {
        record.failures.push(
          `${BATCH_03.contractPath}: WEATHER.mc02Blockers must include ${blocker} (data-rights gates)`,
        );
      }
    }
  }
});

// --- 43. Batch-03 FLEET tenancy, privacy and read-only telemetry (brief §11)

check('batch03.fleet', (record) => {
  const dossier = textOf(BATCH_03.docs.dossiers.FLEET);
  if (dossier !== null) {
    if (!/cross[- ]tenant/i.test(dossier) && !/between organizations/i.test(dossier)) {
      record.failures.push(
        `${BATCH_03.docs.dossiers.FLEET}: does not state the cross-tenant isolation rule (brief §11)`,
      );
    }
    for (const token of ['NO_SLA_ESTABLISHED', 'authorization']) {
      if (!dossier.toLowerCase().includes(token.toLowerCase())) {
        record.failures.push(
          `${BATCH_03.docs.dossiers.FLEET}: does not state the mandatory tenancy token ${token} (brief §11)`,
        );
      }
    }
    for (const pattern of [/read[- ]only/i, /audit/i, /privacy/i, /export/i, /tenant/i]) {
      if (!pattern.test(dossier)) {
        record.failures.push(
          `${BATCH_03.docs.dossiers.FLEET}: does not cover the tenancy requirement ${pattern} (brief §11)`,
        );
      }
    }
    if (!/steer|helm|gobernar|gobierno/i.test(dossier)) {
      record.failures.push(
        `${BATCH_03.docs.dossiers.FLEET}: does not exclude remote steering or vessel control (brief §11)`,
      );
    }
  }
  const contract = contractOf(BATCH_03);
  const fleet = contract?.products?.find((product) => product?.id === 'FLEET');
  if (fleet) {
    for (const blocker of ['D-09', 'H-12', 'P-09', 'X-07']) {
      if (!fleet.mc02Blockers?.includes(blocker)) {
        record.failures.push(
          `${BATCH_03.contractPath}: FLEET.mc02Blockers must include ${blocker} (connectivity, data and security gates)`,
        );
      }
    }
  }
});

// --- 44. Batch-03 pricing discipline (brief §4, §17.3) --------------------

check('batch03.pricing', (record) => {
  const pricingText = textOf(BATCH_03.docs.pricing);
  if (pricingText !== null) {
    if (!pricingText.includes('HYPOTHESIS_UNAPPROVED')) {
      record.failures.push(
        `${BATCH_03.docs.pricing}: does not label its figures HYPOTHESIS_UNAPPROVED`,
      );
    }
    const fleetModelRequirements = [
      ['organisation fee', /\b(?:organisation|organization)\s+fee\b/i],
      ['user seats', /\bseats?\b/i],
      ['onboarding', /\bonboarding\b/i],
      ['telemetry limits', /\btelemetry\b/i],
      ['storage limits', /\bstorage\b/i],
      ['API limits', /\bAPI\b/],
      ['VAT basis', /VAT\s+excluded|plus\s+VAT|IVA\s+no\s+incluido/i],
      ['no unlimited promise', /(?:no|not|never)[^.\n]{0,20}["'`]?unlimited/i],
    ];
    for (const [label, pattern] of fleetModelRequirements) {
      if (!pattern.test(pricingText)) {
        record.failures.push(
          `${BATCH_03.docs.pricing}: the FLEET pricing model must state ${label} explicitly (brief §4)`,
        );
      }
    }
  }
  for (const file of scopedDocFiles(BATCH_03)) {
    const text = textOf(file);
    if (text === null) continue;
    const lines = text.split(/\r?\n/);
    lines.forEach((line, index) => {
      const amounts = euroAmountMatches(line);
      if (amounts.length === 0) return;
      const context = `${line} ${sentenceWindow(lines, index)}`;
      for (const { amount } of amounts) {
        if (BATCH03_ALLOWED_AMOUNTS.has(amount)) continue;
        if (EVIDENCE_PRICE_CONTEXT.test(context)) continue;
        if (isProhibitedExampleContext(lines, index)) continue;
        record.failures.push(
          `${file}:${index + 1}: the price ${formatAmount(amount)} EUR is not one of the frozen batch-03 hypotheses and is not attributed competitor evidence (brief §4, §17.3)`,
        );
      }
      for (const editionId of BATCH03_UNPRICED_EDITIONS) {
        if (!containsToken(line, editionId)) continue;
        if (isProhibitedExampleContext(lines, index)) continue;
        if (EVIDENCE_PRICE_CONTEXT.test(context)) continue;
        record.failures.push(
          `${file}:${index + 1}: ${editionId} must not carry a EUR price; its price is NOT_ESTABLISHED (brief §4)`,
        );
      }
    });
    collectFileViolations(
      record,
      file,
      text,
      [
        [
          /\bAPPROVED\b/,
          'APPROVED pricing is prohibited; every batch-03 figure is HYPOTHESIS_UNAPPROVED',
        ],
      ],
      { tolerant: true, wideContext: true },
    );
  }
  const requiredFigures = [
    { amount: 699, dossier: BATCH_03.docs.dossiers.DISPLAY },
    { amount: 49, dossier: BATCH_03.docs.dossiers.WEATHER },
    { amount: 89, dossier: BATCH_03.docs.dossiers.WEATHER },
    { amount: 49, dossier: BATCH_03.docs.dossiers.FLEET },
    { amount: 79, dossier: BATCH_03.docs.dossiers.FLEET },
  ];
  for (const { amount, dossier } of requiredFigures) {
    let found = false;
    for (const candidate of [dossier, BATCH_03.docs.pricing]) {
      const text = textOf(candidate);
      if (text === null) continue;
      if (text.split(/\r?\n/).some((line) => euroAmountsInLine(line).includes(amount))) {
        found = true;
        break;
      }
    }
    if (!found) {
      record.failures.push(
        `${BATCH_03.docs.pricing}: the frozen batch-03 price hypothesis ${formatAmount(amount)} EUR is not stated in the dossier or the pricing document (brief §4)`,
      );
    }
  }
});
// --- 45. Batch-03 compatibility matrix (brief §9, §17.4) ------------------

check('batch03.compatibility', (record) => {
  const text = textOf(BATCH_03.docs.compatibility);
  if (text === null) return;
  const lines = text.split(/\r?\n/);
  const expectedColumns = COMPATIBILITY_COLUMNS.map((column) => column.toLowerCase());
  let headerIndex = -1;
  let headerCells = [];
  let bestMatches = 0;
  lines.forEach((line, index) => {
    if (!/^\s*\|/.test(line)) return;
    const cells = line
      .split('|')
      .slice(1, -1)
      .map((cell) => cell.trim().toLowerCase());
    const matches = expectedColumns.filter((column) => cells.includes(column)).length;
    if (matches > bestMatches) {
      bestMatches = matches;
      headerIndex = index;
      headerCells = cells;
    }
  });
  if (headerIndex === -1) {
    record.failures.push(
      `${BATCH_03.docs.compatibility}: no compatibility table header with the ${COMPATIBILITY_COLUMNS.length} canonical columns of brief §17.4`,
    );
    return;
  }
  if (headerCells.join('|') !== expectedColumns.join('|')) {
    record.failures.push(
      `${BATCH_03.docs.compatibility}: compatibility table must have exactly the columns [${COMPATIBILITY_COLUMNS.join(' | ')}] in this order, found [${headerCells.join(' | ')}]`,
    );
  }
  for (const status of INTEGRATION_STATUS_VOCABULARY) {
    if (!text.includes(status)) {
      record.failures.push(
        `${BATCH_03.docs.compatibility}: does not use the compatibility evidence status ${status} (brief §9, §17.4)`,
      );
    }
  }
  for (const token of ['permitted', 'prohibited']) {
    if (!new RegExp(`\\b${token}\\b`, 'i').test(text)) {
      record.failures.push(
        `${BATCH_03.docs.compatibility}: does not state the ${token.toUpperCase()} authority behaviour (brief §9)`,
      );
    }
  }
  // Rows of the canonical matrix only: everything after its header until the
  // next level-2 heading.
  const rows = [];
  for (let index = headerIndex + 1; index < lines.length; index++) {
    const line = lines[index];
    if (/^\s{0,3}##\s/.test(line)) break;
    if (!/^\s*\|/.test(line)) continue;
    const cells = line
      .split('|')
      .slice(1, -1)
      .map((cell) => cell.replace(/`/g, '').trim());
    if (cells.length < 10) continue;
    if (cells.every((cell) => /^:?-{2,}:?$/.test(cell) || cell === '')) continue;
    rows.push({ cells, text: cells.join(' | ') });
  }
  if (rows.length < BATCH03_INTEGRATION_BASELINE.length) {
    record.failures.push(
      `${BATCH_03.docs.compatibility}: the matrix has ${rows.length} integration rows; the frozen batch-03 baseline needs ${BATCH03_INTEGRATION_BASELINE.length}`,
    );
  }
  for (const [from, to, status] of BATCH03_INTEGRATION_BASELINE) {
    const candidates = rows.filter(
      (row) => containsToken(row.text, from) && containsToken(row.text, to),
    );
    if (candidates.length === 0) {
      record.failures.push(
        `${BATCH_03.docs.compatibility}: no integration row pairs ${from} with ${to}; the frozen baseline of brief §9 must be recorded`,
      );
      continue;
    }
    if (!candidates.some((row) => new RegExp(`(^|[^A-Z_])${status}([^A-Z_]|$)`).test(row.text))) {
      record.failures.push(
        `${BATCH_03.docs.compatibility}: the ${from}–${to} integration must be recorded as ${status} (brief §9)`,
      );
    }
  }
  for (const row of rows) {
    if (!/\bSUPPORTED\b/.test(row.text)) continue;
    if (!/\bVERIFIED|\bTESTED|\bEVIDENCE|\brecord/i.test(row.text)) {
      record.failures.push(
        `${BATCH_03.docs.compatibility}: an integration is labelled SUPPORTED without a named evidence record`,
      );
    }
  }
  if (!/read[- ]only/i.test(text) || !/steer|helm|control/i.test(text)) {
    record.failures.push(
      `${BATCH_03.docs.compatibility}: does not record that FLEET/DISPLAY PILOT integrations are read-only and never a control path`,
    );
  }
});

// --- 46. Batch-03 customer journeys (brief §17.5) -------------------------

const JOURNEY_COLUMN_LABELS = [
  'Stage',
  'User action',
  'Touchpoint',
  'Expected result',
  'Required information',
  'Failure mode',
  'Recovery',
  'Commercial opportunity',
  'Trust / safety requirement',
  'Acceptance evidence',
];

// The B2B journey renames three buyer-centric stages; the seventeen-stage order is
// fixed, the wording of these three is allowed to be organisation-specific.
const JOURNEY_STAGE_ALTERNATIVES = {
  Compatibility: ['Compatibility', 'Organisational assessment', 'Organizational assessment'],
  'Purchase or quote': ['Purchase or quote', 'Purchase or contract'],
  Fulfilment: ['Fulfilment', 'Fulfilment and provisioning'],
  Installation: ['Installation', 'Installation and setup'],
};

check('batch03.journeys', (record) => {
  const text = textOf(BATCH_03.docs.journeys);
  if (text === null) return;
  const lines = text.split(/\r?\n/);
  for (const label of JOURNEY_COLUMN_LABELS) {
    const present = lines.some((line) => {
      if (!/^\s*\|/.test(line)) return false;
      const cells = line
        .split('|')
        .slice(1, -1)
        .map((cell) => cell.trim().toLowerCase());
      return cells.includes(label.toLowerCase());
    });
    if (!present) {
      record.failures.push(
        `${BATCH_03.docs.journeys}: no journey table uses the canonical column label ${label} (brief §17.5)`,
      );
    }
  }
  for (const product of BATCH_03.products) {
    const display = product.displayName.toLowerCase();
    const start = lines.findIndex(
      (line) => /^\s{0,3}#{2,4}\s/.test(line) && line.toLowerCase().includes(display),
    );
    if (start === -1) {
      record.failures.push(
        `${BATCH_03.docs.journeys}: product ${product.displayName} has no journey section`,
      );
      continue;
    }
    let end = lines.length;
    for (let index = start + 1; index < lines.length; index++) {
      if (!/^\s{0,3}#{2,4}\s/.test(lines[index])) continue;
      if (
        BATCH_03.products.some(
          (other) =>
            other.id !== product.id &&
            lines[index].toLowerCase().includes(other.displayName.toLowerCase()),
        )
      ) {
        end = index;
        break;
      }
    }
    const section = lines.slice(start, end).join('\n');
    for (const stage of JOURNEY_STAGES) {
      const alternatives = JOURNEY_STAGE_ALTERNATIVES[stage] ?? [stage];
      if (!alternatives.some((alternative) => containsToken(section, alternative))) {
        record.failures.push(
          `${BATCH_03.docs.journeys}: the ${product.displayName} journey is missing the stage ${stage}`,
        );
      }
    }
    const sectionLines = lines.slice(start, end);
    const stageRows = new Set();
    for (const line of sectionLines) {
      const match = /^\|\s*(\d{1,2})\.\s+/.exec(line);
      if (match) stageRows.add(Number(match[1]));
    }
    for (let number = 1; number <= 17; number++) {
      if (!stageRows.has(number)) {
        record.failures.push(
          `${BATCH_03.docs.journeys}: the ${product.displayName} journey table has no stage row ${number}`,
        );
      }
    }
  }
});
// --- Report ----------------------------------------------------------------

const failed = checks.filter((entry) => entry.failures.length > 0);
const passed = checks.length - failed.length;
const result = {
  contract: contractOf(BATCH_01)
    ? {
        id: contractOf(BATCH_01).contractId,
        version: contractOf(BATCH_01).contractVersion,
        status: contractOf(BATCH_01).status,
      }
    : null,
  contracts: BATCHES.map((batch) => ({
    batch: batch.id,
    path: batch.contractPath,
    contractId: contractOf(batch)?.contractId ?? null,
    version: contractOf(batch)?.contractVersion ?? null,
  })),
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
    `MAREA product-governance validator — MC-05/MC-06/MC-07 batches (contracts ${BATCHES.map((batch) => contractOf(batch)?.contractVersion ?? 'missing').join(' / ')})`,
  );
  for (const batch of BATCHES) console.log(`Contract: ${batch.contractPath}`);
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
