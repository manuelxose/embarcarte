#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Deterministic research-integrity validator for MC-10 (MAREA primary customer
 * discovery).
 *
 * It validates the machine-readable data contract under
 * `docs/marea/customer-discovery/data/`, the data-contract document, every
 * required deliverable D1-D28 and the independent review against the frozen
 * MC-09 registry and the canonical product/bundle contracts. It never makes a
 * network request and adds no dependency: plain node, offline, Windows/Linux.
 *
 * What it refuses:
 * - fabricated participants, interviews, price responses, coded units or findings
 * - fieldwork, outreach or pricing activity while AUTH-MC10-001 is NOT_GRANTED
 * - post-hoc threshold changes (every experiment is frozen by SHA-256)
 * - a finding without a traceable valid interview record
 * - prices without currency, VAT treatment, ladder provenance or a known point
 * - a rate with a zero denominator, or a qualitative sample sold as a census
 * - quotations without recorded permission in any attribution form (blockquote,
 *   dash with or without an article, reverse-order reporting verb with or
 *   without a comma, parenthetical role, straight/curly/guillemet marks) and
 *   quantifier-less observation, participant-count, percentage or customer-
 *   preference claims that would imply field work which never happened (CR-62);
 *   every P-MC10-### reference in a document must resolve to a valid interview
 *   record with recorded permission
 * - personal data, contact data, audio or verbatim transcripts in the repository
 * - participant or interview content in the application layers (CR-47 scans
 *   contents, not only filenames)
 * - commercial claims: availability, sale, distribution, pilot, price approval
 * - product/bundle readiness upgrades or a weakened governance invariant
 * - a review that does not exist or that issues a primary-research PASS
 *
 * CR-62 language coverage (MC-10R): the attribution vocabulary covers English,
 * Spanish and Portuguese role nouns and reporting verbs, and the quotation rules
 * cover straight, curly and guillemet marks. This is a deterministic lexical
 * heuristic, not proof that a document contains no fabricated evidence: forms
 * outside the documented lexicon can still pass, so an independent human review
 * remains required. The covered forms and the known limits are recorded in the
 * MC-10R addendum of the data-contract document. No rule here replaces recorded
 * consent or a real interview record.
 *
 * Usage:
 *   node scripts/check-marea-customer-research.mjs [--root <dir>] [--json]
 *
 * Exit code 0 = every check passed, 1 = at least one check failed.
 */

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const DEFAULT_ROOT = resolve(SCRIPT_DIR, '..');

const CD = 'docs/marea/customer-discovery';
const DATA = `${CD}/data`;
const DC = `${CD}/data-contract`;
const REVIEW = `${CD}/review`;
const MV = 'docs/marea/market-validation';
const MV_DATA = `${MV}/data`;

const CONTRACT_ID = 'MAREA-MC10-CUSTOMER-DISCOVERY-CONTRACT';
const CONTRACT_VERSION = '1.0.0';
const MILESTONE = 'MC-10';
const MILESTONE_DATE = '2026-11-01';
const BASE_COMMIT = '9d206cc251ea63c7edd1cda0ca7a2d028ae7cca3';
const CONTRACT_DOC = `${DC}/MC10-DATA-CONTRACT.md`;

const SEGMENT_PLAN = [
  { segmentId: 'SEG-01', name: 'Recreational motorboat owners', plannedMin: 5, plannedMax: 8 },
  { segmentId: 'SEG-02', name: 'Sailing yacht owners', plannedMin: 5, plannedMax: 8 },
  {
    segmentId: 'SEG-03',
    name: 'Marina-based unattended-vessel owners',
    plannedMin: 5,
    plannedMax: 8,
  },
  { segmentId: 'SEG-04', name: 'Marine electronics installers', plannedMin: 5, plannedMax: 7 },
  { segmentId: 'SEG-05', name: 'Marine retailers and chandlers', plannedMin: 5, plannedMax: 7 },
  { segmentId: 'SEG-06', name: 'Marina or shipyard operators', plannedMin: 3, plannedMax: 5 },
  {
    segmentId: 'SEG-07',
    name: 'Charter operators and sailing schools',
    plannedMin: 5,
    plannedMax: 8,
  },
  { segmentId: 'SEG-08', name: 'Fleet managers', plannedMin: 4, plannedMax: 6 },
];

const FUNNEL_STATES = [
  'IDENTIFIED',
  'CONTACT_AUTHORIZED',
  'INVITED',
  'RESPONDED',
  'SCREENED',
  'ELIGIBLE',
  'CONSENTED',
  'INTERVIEW_COMPLETED',
  'ANALYSIS_ELIGIBLE',
  'WITHDRAWN',
  'EXCLUDED',
];

const RESEARCH_STATUS_COUNTS = [
  'identified',
  'contactAuthorized',
  'invited',
  'responded',
  'screened',
  'eligible',
  'consented',
  'interviewCompleted',
  'analysisEligible',
  'withdrawn',
  'excluded',
];

const EXPERIMENT_IDS = Array.from(
  { length: 10 },
  (_, index) => `EXP-MC10-${String(index + 1).padStart(2, '0')}`,
);

const BLOCKER_IDS = [
  'BLK-MC10-01',
  'BLK-MC10-02',
  'BLK-MC10-03',
  'BLK-MC10-04',
  'BLK-MC10-05',
  'BLK-MC10-06',
  'BLK-MC10-07',
];

const CANONICAL_PRODUCTS = [
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
const CANONICAL_BUNDLES = ['START', 'CRUISE', 'SAIL', 'PROTECT', 'COMPLETE', 'FLEET'];

const MC09_PRODUCT_ORDER = [
  { subject: 'NAV', mc09Score: 4.23, mc09Rank: 1 },
  { subject: 'WEATHER', mc09Score: 3.77, mc09Rank: 2 },
  { subject: 'WATCH', mc09Score: 3.38, mc09Rank: 3 },
  { subject: 'HUB', mc09Score: 3.37, mc09Rank: 4 },
  { subject: 'FLEET', mc09Score: 3.22, mc09Rank: 5 },
  { subject: 'AIS', mc09Score: 2.9, mc09Rank: 6 },
  { subject: 'SENSE', mc09Score: 2.84, mc09Rank: 7 },
  { subject: 'PILOT', mc09Score: 2.64, mc09Rank: 8 },
  { subject: 'DISPLAY', mc09Score: 2.47, mc09Rank: 9 },
];

const MC09_BUNDLE_ORDER = [
  { subject: 'PROTECT', mc09Score: 3.37, mc09Rank: 1 },
  { subject: 'START', mc09Score: 3.27, mc09Rank: 2 },
  { subject: 'FLEET', mc09Score: 3.22, mc09Rank: 3 },
  { subject: 'CRUISE', mc09Score: 2.99, mc09Rank: 4 },
  { subject: 'SAIL', mc09Score: 2.65, mc09Rank: 5 },
  { subject: 'COMPLETE', mc09Score: 2.31, mc09Rank: 6 },
];

/** Every commercial restriction the MC-10 milestone must keep unchanged. */
const GOVERNANCE_INVARIANTS = {
  trademarkLegalClearance: 'NOT_GRANTED',
  sourceIpClearance: 'NOT_CLEARED',
  customerDemandEmpiricallyValidated: 'NO',
  willingnessToPayEmpiricallyValidated: 'NO',
  productProfitabilityEstablished: 'NO',
  commercialPublication: 'BLOCKED',
  productSales: 'BLOCKED',
  productionDeployment: 'NOT_AUTHORIZED',
  customerOutreach: 'NOT_AUTHORIZED',
  paidResearch: 'NOT_AUTHORIZED',
  advertisingExperiments: 'NOT_AUTHORIZED',
  aisTransmissionOffered: false,
  nmea2000Certified: false,
  ecdisClaimed: false,
  chartRightsGranted: false,
  dataProviderRightsGranted: false,
  forecastAccuracyClaimed: false,
  slaEstablished: false,
  remoteHelmControl: 'PROHIBITED',
  instantAlertGuarantee: false,
  sensorAccuracyClaimed: false,
  crossTenantAccessAllowed: false,
  hardwareIncludedInFleetByDefault: false,
  compatibilityRowsTested: 0,
  productsForSale: 0,
  requestedMemberCount: 7,
  approvedBundlePrices: 0,
  approvedProductionBom: 0,
  verifiedCommercialMargins: 0,
};

const MC10_EXTRA_INVARIANTS = {
  approvedPrices: 0,
  orderableProducts: 0,
  pilotSafetyGate: 'BLOCKED',
  wtpStatedPreferenceObserved: false,
  wtpCommerciallyValidated: false,
};

const DELIVERABLES = [
  { id: 'D1', owner: 'lead', path: `${CD}/MC10-RESEARCH-SCOPE.md` },
  { id: 'D2', owner: 'lead', path: `${CD}/MC10-FIELDWORK-AUTHORIZATION.md` },
  {
    id: 'D3',
    owner: 'agent-a-methodologist',
    path: `${CD}/methodology/MC10-RESEARCH-ETHICS-AND-PRIVACY.md`,
  },
  { id: 'D4', owner: 'agent-a-methodologist', path: `${CD}/methodology/MC10-RESEARCH-PROTOCOL.md` },
  {
    id: 'D5',
    owner: 'agent-a-methodologist',
    path: `${CD}/methodology/MC10-INSTRUMENT-VERSIONS.md`,
  },
  { id: 'D6', owner: 'agent-b-recruitment', path: `${CD}/recruitment/MC10-RECRUITMENT-PLAN.md` },
  { id: 'D7', owner: 'agent-b-recruitment', path: `${CD}/recruitment/MC10-RECRUITMENT-RESULTS.md` },
  { id: 'D8', owner: 'agent-c-owners', path: `${CD}/owners/MC10-OWNER-DISCOVERY.md` },
  {
    id: 'D9',
    owner: 'agent-d-professionals',
    path: `${CD}/professionals/MC10-INSTALLER-DISCOVERY.md`,
  },
  {
    id: 'D10',
    owner: 'agent-d-professionals',
    path: `${CD}/professionals/MC10-CHANNEL-AND-FLEET-DISCOVERY.md`,
  },
  {
    id: 'D11',
    owner: 'agent-a-methodologist',
    path: `${CD}/methodology/MC10-QUALITATIVE-ANALYSIS.md`,
  },
  { id: 'D12', owner: 'agent-e-pricing', path: `${CD}/pricing/MC10-SUBSCRIPTION-ATTITUDES.md` },
  { id: 'D13', owner: 'agent-e-pricing', path: `${CD}/pricing/MC10-GABOR-GRANGER.md` },
  { id: 'D14', owner: 'agent-e-pricing', path: `${CD}/pricing/MC10-VAN-WESTENDORP.md` },
  { id: 'D15', owner: 'agent-c-owners', path: `${CD}/MC10-CONCEPT-COMPREHENSION.md` },
  { id: 'D16', owner: 'lead', path: `${CD}/MC10-BUYER-OBJECTIONS.md` },
  { id: 'D17', owner: 'lead', path: `${CD}/MC10-EXPERIMENT-RESULTS.md` },
  { id: 'D18', owner: 'lead', path: `${CD}/MC10-PRODUCT-PRIMARY-EVIDENCE.md` },
  { id: 'D19', owner: 'lead', path: `${CD}/MC10-BUNDLE-PRIMARY-EVIDENCE.md` },
  { id: 'D20', owner: 'lead', path: `${CD}/MC10-POSITIONING-RECOMMENDATIONS.md` },
  { id: 'D21', owner: 'lead', path: `${CD}/MC10-DECISION-REGISTER.md` },
  { id: 'D22', owner: 'agent-f-data', path: CONTRACT_DOC },
  { id: 'D23', owner: 'agent-f-data', path: 'scripts/check-marea-customer-research.mjs' },
  { id: 'D24', owner: 'agent-f-data', path: 'scripts/check-marea-customer-research.test.mjs' },
  { id: 'D25', owner: 'agent-g-auditor', path: `${REVIEW}/MC-10-REVIEW.md` },
  { id: 'D26', owner: 'lead', path: `${CD}/MC10-EXECUTIVE-REPORT.md` },
  { id: 'D27', owner: 'lead', path: `${CD}/MC10-MC11-HANDOFF.md` },
  { id: 'D28', owner: 'lead', path: `${CD}/MC-10-DELIVERY.md` },
];

const REQUIRED_DATA_FILES = [
  'manifest.json',
  'experiments.json',
  'recruitment-funnel.json',
  'participants.json',
  'interview-records.json',
  'pricing-responses.json',
  'coding.json',
  'concept-comprehension.json',
  'barriers.json',
  'findings.json',
  'product-evidence.json',
  'bundle-evidence.json',
  'data-quality.json',
  'governance-status.json',
  'research-status.json',
  'fieldwork-authorization.json',
  'decisions.json',
  'pricing-ladders.json',
];

const SUPPORTING_RECORDS = [
  { path: `${CD}/methodology/instruments.json`, label: 'instrument freeze record' },
  { path: `${CD}/recruitment/MC10-OUTREACH-TEMPLATES.md`, label: 'outreach templates' },
  { path: `${CD}/data/pricing-ladders.json`, label: 'frozen price ladders' },
  { path: `${REVIEW}/review-findings.json`, label: 'machine-readable review findings' },
];

/** The review files are a required gate: D25 is a deliverable, not an option. */
const REVIEW_DOC = `${REVIEW}/MC-10-REVIEW.md`;
const REVIEW_FINDINGS = `${REVIEW}/review-findings.json`;

const RESULTS_DOCS = [
  `${CD}/recruitment/MC10-RECRUITMENT-RESULTS.md`,
  `${CD}/owners/MC10-OWNER-DISCOVERY.md`,
  `${CD}/professionals/MC10-INSTALLER-DISCOVERY.md`,
  `${CD}/professionals/MC10-CHANNEL-AND-FLEET-DISCOVERY.md`,
  `${CD}/pricing/MC10-SUBSCRIPTION-ATTITUDES.md`,
  `${CD}/pricing/MC10-GABOR-GRANGER.md`,
  `${CD}/pricing/MC10-VAN-WESTENDORP.md`,
  `${CD}/MC10-CONCEPT-COMPREHENSION.md`,
  `${CD}/MC10-BUYER-OBJECTIONS.md`,
  `${CD}/MC10-EXPERIMENT-RESULTS.md`,
  `${CD}/MC10-PRODUCT-PRIMARY-EVIDENCE.md`,
  `${CD}/MC10-BUNDLE-PRIMARY-EVIDENCE.md`,
  `${CD}/MC10-POSITIONING-RECOMMENDATIONS.md`,
  `${CD}/MC10-DECISION-REGISTER.md`,
  `${CD}/MC10-MC11-HANDOFF.md`,
  `${CD}/MC-10-DELIVERY.md`,
];

const NEGATION_TOKENS =
  /\b(?:no|not|never|none|nothing|nobody|without|cannot|can't|isn't|aren't|wasn't|weren't|won't|blocked|prohibited|unavailable|unauthori[sz]ed|neither|nor|n't|ni|ningún|ningun|sin)\b/i;
const THRESHOLD_TOKENS =
  /(?:≥|>=|<=|≤|at least|at most|no more than|target|threshold|planned|minimum|maximum|registered|pre-?registered|PASS if|FAIL if|INCONCLUSIVE|criterion|goal|aim|between|band|per segment|per concept|per construct)/i;

const FORBIDDEN_VERDICTS = 'PASS|FAIL|INCONCLUSIVE';
const FORBIDDEN_FIELD_NAMES = new Set(
  [
    'email',
    'emailaddress',
    'e-mail',
    'phone',
    'telephone',
    'mobile',
    'whatsapp',
    'address',
    'postaladdress',
    'iban',
    'swift',
    'dni',
    'nie',
    'nif',
    'vatnumber',
    'fullname',
    'firstname',
    'lastname',
    'berthnumber',
    'vesselregistration',
    'registrationnumber',
    'contactemail',
    'contactphone',
    'participantname',
    'customername',
    'signature',
    'passport',
  ].map((value) => value.toLowerCase()),
);

const PII_RULES = [
  {
    id: 'email',
    re: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i,
  },
  {
    id: 'phone-international',
    re: /\+\d{1,3}[\s.-]?(?:\(?\d{1,4}\)?[\s.-]?){2,4}\d{2,4}/,
  },
  {
    id: 'phone-labelled',
    re: /\b(?:tel(?:éfono|efono)?|phone|telephone|m[oó]vil|whatsapp)\b[^\n]{0,20}\b\d{3,4}[\s.-]?\d{3}[\s.-]?\d{3}\b/i,
  },
  {
    id: 'phone-00-prefix',
    re: /\b00(?:34|351)\d{6,9}\b/,
  },
  {
    id: 'iban',
    re: /\b(?:ES|PT|FR|DE|GB|IT|NL|BE|IE|LU|AT)\d{2}(?:[\s-]?[A-Z0-9]{4}){2,6}[\s-]?[A-Z0-9]{0,4}\b/,
  },
  {
    id: 'identity-number',
    re: /\b(?:\d{8}[A-Z]|[XYZ]\d{7}[A-Z])\b/,
  },
  {
    id: 'postal-address',
    re: /\b(?:calle|carrer|c\/|avenida|avda\.?|plaza|rua|rúa|paseo)\s+[A-Za-zÁÉÍÓÚÑáéíóúñ][^\n]{0,36}\d/,
  },
];

const PROHIBITED_CLAIM_RULES = [
  { id: 'add-to-cart', re: /\badd to cart\b|\bbuy now\b|\border now\b|\bpre-?order now\b/i },
  {
    id: 'checkout-live',
    re: /\bcheckout (?:is |was )?(?:enabled|live|active)\b|\bcheckout:\s*(?:ENABLED|LIVE)\b/i,
  },
  {
    id: 'available-for-sale',
    re: /\b(?:is|are) (?:now )?(?:available for sale|purchasable|orderable|on sale)\b|\bavailable to order\b/i,
  },
  {
    id: 'shipping-now',
    re: /\b(?:is|are) (?:now )?(?:shipping|in stock|deliverable)\b|\bshipping now\b/i,
  },
  { id: 'price-approved', re: /\bprices? (?:is |are |was |were )approved\b/i },
  {
    id: 'approved-price-count',
    re: /\bapproved (?:bundle )?prices?\b\s*(?:[:=]\s*[1-9]|\b(?:is|are)\s*[1-9])/i,
  },
  {
    id: 'distribution-signed',
    re: /\bdistribution (?:agreement|partnership|deal|contract)\b[^.\n]{0,40}\b(?:signed|agreed|in place|established|exists)\b/i,
  },
  {
    id: 'pilot-agreed',
    re: /\bpilot (?:is |was |has been )?(?:agreed|approved|started|signed|launched|running)\b/i,
  },
  {
    id: 'letter-of-intent',
    re: /\b(?:letter of intent|LOI)\b\s+(?:is |was |has been )?(?:signed|obtained|received)\b/i,
  },
  {
    id: 'trademark-cleared',
    re: /\btrademark (?:clearance )?(?:is |was )?(?:granted|cleared)\b|\btrademark (?:is )?legally cleared\b/i,
  },
  {
    id: 'source-ip-cleared',
    re: /\bsource ip (?:clearance )?(?:is |was )?(?:cleared|granted)\b/i,
  },
  {
    id: 'compatibility-tested',
    re: /\bNMEA ?2000\b[^.\n]{0,40}\b(?:certified|tested|verified|supported)\b|\bcompatibility (?:is |was )?(?:tested|verified|supported)\b/i,
    mareaScoped: true,
  },
  {
    id: 'guaranteed-alert',
    re: /\bguaranteed (?:alert|delivery|monitoring)\b|\balert delivery is guaranteed\b/i,
  },
  {
    id: 'remote-helm',
    re: /\bremote (?:helm|autonomous) (?:control|steering)\b|\bunattended PILOT operation\b/i,
  },
  {
    id: 'ecdis',
    re: /\bECDIS[- ]compliant\b|\bECDIS compliance (?:is )?(?:met|achieved)\b/i,
    mareaScoped: true,
  },
  {
    id: 'public-copy-validated',
    re: /\bpublic copy (?:is |was )?(?:validated|approved|cleared)\b|\bvalidated public copy\b/i,
    allowed: /\|\s*0\b|\b0\b\s*\|/,
  },
  {
    id: 'product-published',
    re: /\bproduct page (?:is |was )?(?:published|live)\b|\bpublished (?:the )?(?:product|price|bundle) page\b/i,
  },
];

const POPULATION_CLAIM_RULES = [
  {
    id: 'percentage-of-population',
    re: /\b\d+(?:[.,]\d+)?\s*%\s+of\s+(?:the\s+)?(?:all\s+)?(?:boat|vessel|yacht)?[\s-]*(?:owners|operators|installers|retailers|charter operators|fleet managers|participants|respondents|customers|buyers|the market)\b/i,
  },
  {
    id: 'representative-sample',
    re: /\b(?:statistically\s+)?representative\s+(?:sample|of the (?:market|population))\b/i,
  },
  { id: 'margin-of-error', re: /\bmargin of error\b/i },
  {
    id: 'extrapolation',
    re: /\bextrapolat\w+\b[^.\n]{0,60}\b(?:market|population|all owners|demand|revenue)\b/i,
  },
  {
    id: 'population-estimate',
    re: /\bpopulation estimate\b|\bproject(?:ed)? to the (?:market|population)\b/i,
  },
];

const VERDICT_CLAIM_RULES = [
  { id: 'verdict', re: /\bverdict\s*(?:[:=]|is |was )\s*`?(?:PASS|FAIL|INCONCLUSIVE)\b/i },
  {
    id: 'experiment-passed',
    re: /\bexperiments?\s+(?:has |have |was |were )?(?:passed|failed)\b/i,
  },
  {
    id: 'result-verdict',
    re: /\bresults?\s*(?:[:=]|is |was |are |were )\s*`?(?:PASS|FAIL|INCONCLUSIVE)\b/i,
  },
  {
    id: 'validated-demand',
    re: /\b(?:we|MAREA|the (?:research|study|data|evidence))\b[^.\n]{0,50}\b(?:validated|confirmed|proven)\b[^.\n]{0,40}\b(?:willingness to pay|demand|price acceptance|purchase intent)\b/i,
  },
  {
    id: 'demand-is-validated',
    re: /\b(?:willingness to pay|demand|price acceptance|purchase intent)\b[^.\n]{0,30}\b(?:is|was|has been)\b[^.\n]{0,20}\b(?:validated|confirmed|proven)\b/i,
  },
];

const QUOTE_CLAIM_RULES = [
  {
    id: 'attributed-statement',
    re: /\b(?:one|a|another|several|many|some)\s+(?:owner|participant|installer|retailer|operator|manager|customer)s?\s+(?:said|stated|told|reported|explained|commented)\b/i,
  },
  {
    id: 'quotation-label',
    re: /\b(?:participant|owner|installer|retailer|operator)\s+(?:quote|quotation)\s*:/i,
  },
];

/**
 * Attribution subjects used by the narrative-fabrication check CR-62.
 *
 * MC-10R extends the original English list with Spanish and Portuguese role
 * nouns (with gender/number variants) because the study instruments are ES/EN
 * and a PT version is prepared. This is a lexical heuristic, not proof that a
 * document contains no fabricated evidence: the documented scope is recorded in
 * the MC-10R data-contract addendum and the module header.
 */
const NARRATIVE_ATTRIBUTION =
  '(?:participants?|owners?|installers?|retailers?|charter operators?|operators?|managers?|customers?|respondents?|interviewees?|' +
  'dueñ(?:o|a|os|as)|propietari(?:o|a|os|as)|armador(?:a|as|es)?|patrón|patrona|patrones|patronas|instalador(?:a|as|es)?|' +
  'minorista(?:s)?|comerciante(?:s)?|operador(?:a|as|es)?|gerente(?:s)? de marina|gestor(?:a|as|es)? de flota|' +
  'proprietári(?:o|a|os|as)|retalhista(?:s)?|gestor(?:a|as|es)? de frota|' +
  'entrevistad(?:o|a|os|as)|P-MC10-\\d{3})';
const NARRATIVE_ATTRIBUTION_RE = new RegExp(`\\b${NARRATIVE_ATTRIBUTION}\\b`, 'iu');
const NARRATIVE_PARTICIPANT_ID_RE = /\bP-MC10-\d{3}\b/g;
/** Reporting verbs in English, Spanish and Portuguese, in several tenses. */
const NARRATIVE_REPORTING_VERB =
  '(?:said|stated|told|reported|claimed|explained|commented|confirmed|noted|mentioned|described|added|remarked|observed|' +
  'dijo|dijeron|dice|dicen|declar[oó]|declararon|declara|coment[oó]|comentaron|comenta|señal[oó]|señalaron|señala|' +
  'afirm[oó]|afirmaron|afirma|explic[oó]|explicaron|explica|indic[oó]|indicaron|indica|refiri[oó]|refirieron|refiere|' +
  'mencion[oó]|mencionaron|menciona|confirm[oó]|confirmaron|confirma|cont[oó]|contaron|cuenta|manifest[oó]|manifestaron|manifiesta|precis[oó]|precisaron|precisa|' +
  'disse|disseram|diz|dizem|declarou|declararam|declara|comentou|comentaram|comenta|afirmou|afirmaram|afirma|' +
  'explicou|explicaram|explica|indicou|indicaram|indica|referiu|referiram|refere|mencionou|mencionaram|menciona|' +
  'confirmou|confirmaram|confirma|contou|contaram|conta|manifestou|manifestaram|manifesta)';
/** Preference verbs that assert an empirical customer preference. */
const NARRATIVE_PREFERENCE_VERB =
  '(?:prefer|preferred|want|wanted|demand|demanded|would pay|prefieren|prefirieron|quieren|querían|demandan|demandaron|pagarían|pagar[íi]an|preferem|preferiram|querem|queriam|exigem|exigiram|pagariam)';
/** `the owner`, `a retailer`, `an installer`, `un armador` or a bare role noun. */
const NARRATIVE_ARTICLE = '(?:(?:the|a|an|el|la|los|las|un|una|unos|unas|o|a|os|as|um|uma)\\s+)?';
/** Opening and closing quotation marks covered by CR-62 (straight, curly, guillemet). */
const NARRATIVE_OPEN_QUOTE = '["\'“«‘]';
const NARRATIVE_CLOSE_QUOTE = '["\'”»’]';
/** A Unicode-aware word end, because accented verb forms defeat `\\b`. */
const NARRATIVE_WORD_END = '(?![\\p{L}\\p{N}])';

/** A quotation attributed to a participant cannot exist without a real record. */
const NARRATIVE_QUOTE_RULES = [
  {
    id: 'blockquoted-attributed-quotation',
    re: /^[ \t]*>[^\n]*["“”«»‘’][^\n]*$/gm,
    attributionInMatch: true,
  },
  {
    id: 'attribution-before-quotation',
    re: new RegExp(
      `\\b${NARRATIVE_ARTICLE}${NARRATIVE_ATTRIBUTION}\\s+${NARRATIVE_REPORTING_VERB}${NARRATIVE_WORD_END}[^.\\n]{0,20}(?<![\\p{L}])${NARRATIVE_OPEN_QUOTE}`,
      'iu',
    ),
    insideQuotesExempt: true,
  },
  {
    id: 'quotation-attribution-dash',
    re: new RegExp(
      `${NARRATIVE_CLOSE_QUOTE}\\s*[\u2014\u2013-]\\s*${NARRATIVE_ARTICLE}${NARRATIVE_ATTRIBUTION}${NARRATIVE_WORD_END}`,
      'iu',
    ),
    insideQuotesExempt: false,
  },
  {
    id: 'reverse-order-quotation-attribution',
    re: new RegExp(
      `${NARRATIVE_CLOSE_QUOTE}\\s*,?\\s*${NARRATIVE_REPORTING_VERB}${NARRATIVE_WORD_END}\\s+${NARRATIVE_ARTICLE}${NARRATIVE_ATTRIBUTION}${NARRATIVE_WORD_END}`,
      'iu',
    ),
    insideQuotesExempt: false,
  },
  {
    id: 'parenthetical-quotation-attribution',
    re: new RegExp(
      `${NARRATIVE_CLOSE_QUOTE}\\s*\\(\\s*${NARRATIVE_ARTICLE}${NARRATIVE_ATTRIBUTION}${NARRATIVE_WORD_END}[^)\\n]{0,30}\\)`,
      'iu',
    ),
    insideQuotesExempt: false,
  },
];

/** Quantifier-less observational claims imply an interview that never happened. */
const NARRATIVE_OBSERVATION_RE = new RegExp(
  `\\b${NARRATIVE_ATTRIBUTION}\\s+(?:(?:also|consistently|repeatedly|generally|typically|often|frequently|también|además|sistemáticamente|repetidamente)\\s+)?${NARRATIVE_REPORTING_VERB}${NARRATIVE_WORD_END}`,
  'giu',
);

/** Explicitly labelled synthetic or hypothetical content is not an empirical claim. */
const SYNTHETIC_LABEL_RE =
  /\b(?:SYNTHETIC_FIXTURE|TRAINING_SYNTHETIC_NOT_RESEARCH|SYNTHETIC_EXAMPLE|synthetic fixture|synthetic example|hypothetical|for illustration only|illustrative example)\b/i;

/** Honest contexts that make a narrative phrase non-assertive about field data. */
const PREPARED_CONTEXT_RE =
  /\b(?:interviewer|instrument|script|template|prepared|prompt|question|read aloud|read the|wording|guide|consent text|guion|guión|plantilla|borrador|instrucción|texto de consentimiento|guião|modelo|minuta|instrução|NOT_APPROVED|NOT_EXECUTED|SCREEN-01|CONSENT-01|GUIDE-01|PRICE-01|NOTE-01|SCHEMA-01|ANA-01)\b/i;

/** Threshold language that makes a numeric statement a plan, not an observation. */
const NARRATIVE_THRESHOLD_RE =
  /(?:≥|>=|<=|≤|at least|at most|no more than|PASS if|FAIL if|minimum of|maximum of|target of|range of|between|planned|requires?|required|threshold|pre-?registered)/i;

/** Contexts that mark a claim as a hypothesis, question or explicitly absent fact. */
const NARRATIVE_NON_ASSERTIVE_RE =
  /\b(?:unknown|not known|unclear|unverified|not measured|not established|hypothes[ie]s|hypothesis|expected|anticipated|assumed|whether|evidence that|no evidence|unproven|registered hypothesis|research question|to be tested|to test|not:)\b/i;
const NARRATIVE_INTERROGATIVE_RE =
  /^\s*(?:[-*]\s*)?(?:do|does|did|which|what|how|why|when|where|who|would|could|should|is|are|can|will|¿)\b/i;

/**
 * Claims of completed field data or customer preference that need a real record.
 * These are additive to the original CR-62 rules and are exempted for negated,
 * threshold, desk-research, prepared/labelled-synthetic and prohibited content.
 */
const NARRATIVE_CLAIM_RULES = [
  {
    id: 'fabricated-completed-participant-count',
    re: new RegExp(
      '\\b(?:\\d{1,4}|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|fifteen|twenty|thirty|forty|fifty|cien|diez|doce|quince|veinte|treinta|vinte|doze|quinze|trinta)\\s+' +
        '(?:(?:completed|valid|real)\\s+){0,2}' +
        '(?:interviews?|participants?|owners?|installers?|retailers?|operators?|respondents?|entrevistados?|entrevistadas?|participantes?|propietarios?|armadores?|instaladores?|operadores?|proprietários?|retalhistas?)' +
        '\\b[^.\\n]{0,40}\\b(?:were|was|have been|has been|completed|conducted|interviewed|recruited|surveyed|realizadas?|completadas?|completados?|realizados?|entrevistad[oa]s?|reclutad[oa]s?)\\b',
      'iu',
    ),
  },
  {
    id: 'fabricated-participant-percentage-claim',
    re: /\b\d{1,3}\s*%\s+(?:of\s+|de\s+|dos\s+|das\s+)?(?:participants?|owners?|installers?|retailers?|operators?|respondents?|entrevistados?|entrevistadas?|participantes?|propietarios?|armadores?|instaladores?|operadores?|proprietários?|retalhistas?)\b[^.\n]{0,40}\b(?:said|stated|reported|preferred|would pay|dijo|afirmó|comentó|señaló|prefieren|prefirieron|pagarían|disse|afirmou|preferem|preferiram|pagariam)\b/i,
  },
  {
    id: 'unsupported-customer-preference-claim',
    re: new RegExp(
      `\\b${NARRATIVE_ATTRIBUTION}\\s+${NARRATIVE_PREFERENCE_VERB}${NARRATIVE_WORD_END}`,
      'iu',
    ),
  },
];
const DESK_RESEARCH_RE =
  /\b(?:MC-09|desk research|secondary research|public source|public evidence|public signal|existing desk|published evidence)\b/i;
const PROHIBITION_CONTEXT_RE =
  /\b(?:prohibit|forbidden|not permitted|never permitted|must not|may not|cannot|do not use|never use|not to be used|not allowed)\b/i;

/** Content markers that must never appear in the application layers (CR-47). */
const APP_LAYER_DIRS = ['src', 'public', 'deploy'];
const APP_TEXT_EXTENSION = /\.(?:json|md|txt|csv|js|mjs|cjs|ts|html|yml|yaml|xml)$/i;
const APP_PARTICIPANT_MARKERS = [
  /"participantId"/,
  /"participants"\s*:/,
  /participantRecords/i,
  /"interviewId"/,
  /"interviewDate"/,
  /"interviewRecords"/,
  /"consentRecorded"/,
  /"consentDate"/,
  /"quotationPermission"/,
  /"withdrawalDate"/,
  /"acquisitionSource"/,
  /"priceResponses?"/,
  /"pricingResponses?"/,
  /"participantEmail"/,
  /"participantName"/,
  /"contactEmail"/,
  /"contactPhone"/,
  /"berthNumber"/,
  /"vesselRegistration"/,
  /"interviewerId"/,
  /#+\s*Participant records/i,
  /#+\s*Interview records/i,
];

const TRANSLATION_CLAIM_RULES = [
  {
    id: 'translation-equivalence',
    re: /\btranslation (?:equivalence|equivalency)\b[^.\n]{0,30}\b(?:established|verified|confirmed|proven)\b/i,
  },
  {
    id: 'translations-equivalent',
    re: /\btranslations? (?:are |is )(?:fully )?equivalent\b|\bbilingual equivalence (?:established|verified)\b/i,
  },
  {
    id: 'qualified-signoff',
    re: /\bqualified (?:bilingual )?(?:translation )?sign-?off (?:is |was )?(?:obtained|complete|granted)\b/i,
  },
];

const POSITIVE_COUNT_RULES = [
  {
    id: 'we-conducted',
    re: /\b(?:we|the (?:research )?team)\s+(?:conducted|completed|performed|ran|held|interviewed|surveyed|screened|recruited|contacted|invited)\s+(?:\d+|one|two|three|four|five|six|seven|eight|nine|ten)\b/i,
  },
  {
    id: 'n-were',
    re: /\b\d+\s+(?:interviews|participants|respondents|price responses)\s+(?:were |have been |had been )?(?:conducted|completed|recorded|collected|obtained)\b/i,
    allowed: /\b(?:0|zero)\s+(?:interviews|participants|respondents|price responses)\b/i,
  },
  {
    id: 'completed-label',
    re: /\b(?:completed|conducted|recorded)\s+(?:interviews|participants|price responses)\s*[:=]\s*[1-9]\d*\b/i,
    allowed:
      /\b(?:completed|conducted|recorded)\s+(?:interviews|participants|price responses)\s*[:=]\s*0\b/i,
  },
  {
    id: 'field-count',
    re: /"(?:interviewCount|participantCount|completedInterviews|participantsCompletingPricingModule)"\s*:\s*[1-9]/,
  },
];

const OFFER_PRICE_RULES = [
  {
    id: 'sell-price',
    re: /\b(?:sells? for|priced at|available at|offered at|costs?)\s*(?:EUR|€)?\s*\d[\d.,]*/i,
  },
  {
    id: 'eur-offer',
    re: /\b(?:EUR|€)\s?\d[\d.,]*[^.\n]{0,30}\b(?:price|offer|purchase|order|buy|checkout)\b/i,
  },
];

const OFFER_PRICE_ALLOWED =
  /hypothes|unapproved|not a price|reference|illustrative|example|research|probe|anchor|traceab|provisional|quotation model|historical|budget|cost model/i;

const RECORD_COUNT_RULES = {
  'experiments.json': (value) => value.experiments.length,
  'recruitment-funnel.json': (value) => value.segments.length,
  'participants.json': (value) => value.participants.length,
  'interview-records.json': (value) => value.interviews.length,
  'pricing-responses.json': (value) => value.responses.length,
  'coding.json': () => 0,
  'concept-comprehension.json': (value) => value.concepts.length,
  'barriers.json': (value) => value.barriers.length,
  'findings.json': (value) => value.findings.length,
  'product-evidence.json': (value) => value.products.length,
  'bundle-evidence.json': (value) => value.bundles.length,
  'data-quality.json': (value) => value.checks.length,
  'governance-status.json': () => 1,
  'research-status.json': () => 1,
  'fieldwork-authorization.json': () => 1,
  'decisions.json': (value) => value.decisions.length,
  'pricing-ladders.json': (value) => value.constructs.length,
};

function buildRunner(root) {
  const checks = [];
  const jsonCache = new Map();

  const abs = (p) => resolve(root, p);
  const read = (p) => readFileSync(abs(p), 'utf8');
  const exists = (p) => existsSync(abs(p));
  const existsDir = (p) => {
    try {
      return statSync(abs(p)).isDirectory();
    } catch {
      return false;
    }
  };

  function readJson(rel) {
    if (!jsonCache.has(rel)) jsonCache.set(rel, JSON.parse(read(rel)));
    return jsonCache.get(rel);
  }

  function tryJson(rel) {
    try {
      return { ok: true, value: readJson(rel) };
    } catch (error) {
      return { ok: false, error };
    }
  }

  function require(condition, message) {
    if (!condition) throw new Error(message);
  }

  function check(id, description, fn) {
    try {
      fn();
      checks.push({ id, description, status: 'PASS', detail: '' });
    } catch (error) {
      checks.push({ id, description, status: 'FAIL', detail: error.message });
    }
  }

  // ------------------------------------------------------------- primitives
  function isNonEmptyString(value) {
    return typeof value === 'string' && value.trim().length > 0;
  }

  function isNonEmptyArray(value) {
    return Array.isArray(value) && value.length > 0;
  }

  function isFiniteNumber(value) {
    return typeof value === 'number' && Number.isFinite(value);
  }

  function isPlainObject(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }

  function isIsoDate(value) {
    return (
      typeof value === 'string' &&
      /^\d{4}-\d{2}-\d{2}$/.test(value) &&
      !Number.isNaN(Date.parse(`${value}T00:00:00Z`))
    );
  }

  function closeTo(actual, expected, tolerance = 0.0001) {
    return (
      isFiniteNumber(actual) && isFiniteNumber(expected) && Math.abs(actual - expected) <= tolerance
    );
  }

  function sortKeys(value) {
    if (Array.isArray(value)) return value.map(sortKeys);
    if (value && typeof value === 'object') {
      const sorted = {};
      for (const key of Object.keys(value).sort()) sorted[key] = sortKeys(value[key]);
      return sorted;
    }
    return value;
  }

  /** Canonical JSON used to freeze MC-09 experiment records before any data. */
  function canonicalJson(value) {
    return JSON.stringify(sortKeys(value), null, 2);
  }

  function sha256(text) {
    return createHash('sha256').update(text, 'utf8').digest('hex');
  }

  function walk(relDir, predicate) {
    const out = [];
    if (!existsDir(relDir)) return out;
    const visit = (current) => {
      for (const entry of readdirSync(current, { withFileTypes: true })) {
        const full = join(current, entry.name);
        if (entry.isDirectory()) visit(full);
        else if (predicate(entry.name)) out.push(relative(abs('.'), full).replace(/\\/g, '/'));
      }
    };
    visit(abs(relDir));
    return out.sort();
  }

  function dataFileNames() {
    if (!existsDir(DATA)) return [];
    return readdirSync(abs(DATA))
      .filter((name) => name.endsWith('.json'))
      .sort();
  }

  function docFiles() {
    return walk(CD, (name) => name.endsWith('.md') && !name.startsWith('.'));
  }

  function eachJsonValue(fn) {
    for (const file of dataFileNames()) {
      const result = tryJson(`${DATA}/${file}`);
      if (!result.ok) continue;
      fn(file, result.value);
    }
  }

  function walkJson(value, visit, path = '$') {
    visit(value, path);
    if (Array.isArray(value))
      value.forEach((item, index) => walkJson(item, visit, `${path}[${index}]`));
    else if (value && typeof value === 'object') {
      for (const [key, child] of Object.entries(value)) walkJson(child, visit, `${path}.${key}`);
    }
  }

  function clauseAround(text, index, length) {
    const start = Math.max(0, index - 180);
    const end = Math.min(text.length, index + length + 60);
    const window = text.slice(start, end);
    const before = window.slice(0, index - start);
    const boundary = Math.max(
      before.lastIndexOf('.'),
      before.lastIndexOf('\n'),
      before.lastIndexOf(';'),
      before.lastIndexOf('|'),
    );
    return window.slice(boundary + 1);
  }

  /** True when an index sits inside a double-quoted span (typographic marks included). */
  function insideDoubleQuotes(text, index) {
    const before = text.slice(0, index);
    const marks = (before.match(/["\u201c\u201d]/g) || []).length;
    return marks % 2 === 1;
  }

  /**
   * A blockquoted line is attributed when it carries a participant ID, a
   * dash/parenthetical attribution or an attribution verb next to a quotation.
   * The role/verb vocabulary is the multilingual CR-62 set (EN/ES/PT).
   */
  function blockquoteAttribution(line) {
    if (/\bP-MC10-\d{3}\b/.test(line)) return true;
    const dash = new RegExp(
      `[\u2014\u2013-]\\s*${NARRATIVE_ARTICLE}${NARRATIVE_ATTRIBUTION}${NARRATIVE_WORD_END}`,
      'iu',
    );
    if (dash.test(line)) return true;
    const parenthetical = new RegExp(
      `[([]\\s*${NARRATIVE_ARTICLE}${NARRATIVE_ATTRIBUTION}${NARRATIVE_WORD_END}[^)\\]]{0,30}[)\\]]`,
      'iu',
    );
    if (parenthetical.test(line)) return true;
    const verb = new RegExp(
      `\\b${NARRATIVE_ATTRIBUTION}\\s+${NARRATIVE_REPORTING_VERB}${NARRATIVE_WORD_END}`,
      'iu',
    );
    return verb.test(line);
  }

  /** Sentence window around a match; folded lines do not split a sentence. */
  function sentenceAround(text, index, length) {
    const boundaries = ['. ', '.\n', '! ', '? ', '\n\n'];
    let start = 0;
    for (const boundary of boundaries) {
      const at = text.lastIndexOf(boundary, index);
      if (at !== -1 && at + boundary.length <= index) start = Math.max(start, at + boundary.length);
    }
    let end = text.length;
    for (const boundary of boundaries) {
      const at = text.indexOf(boundary, index + length);
      if (at !== -1 && at + boundary.length < end) end = at + boundary.length;
    }
    return text.slice(start, Math.min(end, text.length));
  }

  /** A quotation is permitted only with a real completed interview and consent. */
  function quotationCleared(ids, participants, interviews) {
    if (ids.length === 0) return false;
    return ids.every((id) => {
      const participant = participants.get(id);
      if (!participant || participant.withdrawalDate !== null) return false;
      if (!participant.consent || participant.consent.quote !== true) return false;
      return interviews.some(
        (interview) =>
          interview.participantId === id &&
          interview.completionStatus === 'COMPLETED' &&
          interview.analysisEligible === true &&
          interview.quotationPermission === true,
      );
    });
  }

  function scanDocuments(rules, options = {}) {
    const docs = options.docs || docFiles();
    const violations = [];
    for (const doc of docs) {
      if (!exists(doc)) continue;
      const text = read(doc);
      for (const rule of rules) {
        const re = new RegExp(rule.re.source, `${rule.re.flags.replace('g', '')}g`);
        for (const match of text.matchAll(re)) {
          const clause = clauseAround(text, match.index, match[0].length);
          if (options.skipNegated !== false && NEGATION_TOKENS.test(clause)) continue;
          if (options.skipThreshold && THRESHOLD_TOKENS.test(clause)) continue;
          if (rule.allowed && rule.allowed.test(clause)) continue;
          if (options.allowed && options.allowed.test(clause)) continue;
          if (rule.mareaScoped && !/MAREA|EMBARCARTE/i.test(clause)) continue;
          violations.push(`${doc}: ${rule.id} -> "${clause.trim().slice(0, 120)}"`);
        }
      }
    }
    return violations;
  }

  function scanJsonFields(predicate) {
    const violations = [];
    for (const file of dataFileNames()) {
      const result = tryJson(`${DATA}/${file}`);
      if (!result.ok) continue;
      walkJson(result.value, (node, path) => {
        if (!isPlainObject(node)) return;
        for (const [key, value] of Object.entries(node)) {
          const failure = predicate(key, value, `${file}:${path}.${key}`);
          if (failure) violations.push(failure);
        }
      });
    }
    return violations;
  }

  // ---------------------------------------------------------------- loading
  function safetyStatus() {
    const result = tryJson(`${DATA}/research-status.json`);
    return result.ok ? result.value : {};
  }

  function authorization() {
    const result = tryJson(`${DATA}/fieldwork-authorization.json`);
    return result.ok ? result.value : {};
  }

  function gateClosed() {
    return authorization().authorizationStatus !== 'GRANTED';
  }

  function interviewList() {
    const result = tryJson(`${DATA}/interview-records.json`);
    return result.ok && Array.isArray(result.value.interviews) ? result.value.interviews : [];
  }

  function participantList() {
    const result = tryJson(`${DATA}/participants.json`);
    return result.ok && Array.isArray(result.value.participants) ? result.value.participants : [];
  }

  function pricingLadders() {
    const result = tryJson(`${DATA}/pricing-ladders.json`);
    return result.ok ? result.value : {};
  }

  function experimentSourceRecords() {
    const result = tryJson(`${MV_DATA}/validation-experiments.json`);
    return result.ok && Array.isArray(result.value.experiments) ? result.value.experiments : [];
  }

  function experimentRecords() {
    const result = tryJson(`${DATA}/experiments.json`);
    return result.ok && Array.isArray(result.value.experiments) ? result.value.experiments : [];
  }

  function isClosedGateConsistent() {
    const status = safetyStatus();
    return (
      gateClosed() &&
      status.fieldworkStatus === 'BLOCKED' &&
      status.fieldworkExecuted === false &&
      status.milestoneStatus === 'BLOCKED'
    );
  }

  // ---------------------------------------------------------------- checks
  check('CR-01', 'All 28 required MC-10 deliverables D1-D28 exist', () => {
    const missing = DELIVERABLES.filter((deliverable) => !exists(deliverable.path)).map(
      (deliverable) => `${deliverable.id} (${deliverable.path})`,
    );
    require(missing.length === 0, `missing deliverables: ${missing.join(', ')}`);
  });

  check('CR-02', 'All required machine-readable data files exist and parse as JSON', () => {
    require(existsDir(DATA), 'data directory missing');
    const missing = REQUIRED_DATA_FILES.filter((file) => !exists(`${DATA}/${file}`));
    require(missing.length === 0, `missing data files: ${missing.join(', ')}`);
    const broken = [];
    for (const file of dataFileNames()) {
      const result = tryJson(`${DATA}/${file}`);
      if (!result.ok) broken.push(`${file}: ${result.error.message}`);
    }
    require(broken.length === 0, `unparsable JSON: ${broken.join('; ')}`);
  });

  check('CR-03', 'Manifest indexes every data file and the full D1-D28 inventory', () => {
    const manifest = readJson(`${DATA}/manifest.json`);
    require(manifest.contractId === CONTRACT_ID, `manifest contractId must be ${CONTRACT_ID}`);
    require(manifest.contractVersion ===
      CONTRACT_VERSION, 'manifest contractVersion must be 1.0.0');
    require(manifest.milestone === MILESTONE, 'manifest milestone must be MC-10');
    require(manifest.date === MILESTONE_DATE, 'manifest date must be 2026-11-01');
    require(manifest.baseCommit === BASE_COMMIT, 'manifest baseCommit must be the MC-09 HEAD');
    require(isNonEmptyArray(manifest.files), 'manifest.files must be a non-empty array');
    const listed = new Set();
    for (const entry of manifest.files) {
      require(isNonEmptyString(entry.path), 'manifest entry without path');
      const name = entry.path.replace(/^data\//, '');
      require(!listed.has(name), `manifest duplicates ${entry.path}`);
      listed.add(name);
      require(exists(`${DATA}/${name}`), `manifest lists missing file ${entry.path}`);
      require(isNonEmptyString(entry.owner), `manifest entry ${entry.path} lacks owner`);
      require(isNonEmptyString(entry.purpose), `manifest entry ${entry.path} lacks purpose`);
      require(Number.isInteger(entry.recordCount) &&
        entry.recordCount >= 0, `manifest entry ${entry.path} needs an integer recordCount`);
    }
    const unlisted = dataFileNames().filter(
      (name) => name !== 'manifest.json' && !listed.has(name),
    );
    require(unlisted.length === 0, `data files missing from manifest: ${unlisted.join(', ')}`);
    require(isNonEmptyArray(
      manifest.deliverables,
    ), 'manifest.deliverables must be a non-empty array');
    const declared = manifest.deliverables.map((entry) => entry.id);
    require(JSON.stringify(declared) ===
      JSON.stringify(
        DELIVERABLES.map((entry) => entry.id),
      ), `manifest deliverable ids must be D1..D28 in order, found ${declared.join(',')}`);
    for (const entry of manifest.deliverables) {
      const expected = DELIVERABLES.find((candidate) => candidate.id === entry.id);
      require(expected, `manifest declares unknown deliverable ${entry.id}`);
      require(entry.path === expected.path, `${entry.id} path must be ${expected.path}`);
      require(entry.owner === expected.owner, `${entry.id} must be owned by ${expected.owner}`);
    }
    require(Array.isArray(manifest.supportingRecords) &&
      manifest.supportingRecords.length >=
        3, 'manifest.supportingRecords must list the non-deliverable records');
    for (const entry of manifest.supportingRecords) {
      require(isNonEmptyString(entry.path), 'supporting record without path');
      require(isNonEmptyString(entry.owner), `supporting record ${entry.path} lacks owner`);
      require(isNonEmptyString(entry.purpose), `supporting record ${entry.path} lacks purpose`);
      // The independent review records are required by CR-40/CR-41; every other
      // supporting record must exist in the tree under the manifest check.
      if (!entry.path.startsWith(`${REVIEW}/`)) {
        require(exists(entry.path), `supporting record ${entry.path} is missing`);
      }
    }
    require(manifest.fixtureExclusion &&
      manifest.fixtureExclusion.realTreeFixtureRecords ===
        0, 'manifest must state that no fixture record exists in the real tree');
  });

  check('CR-04', 'Manifest recordCount matches the real record count of each file', () => {
    const manifest = readJson(`${DATA}/manifest.json`);
    require(isNonEmptyArray(manifest.files), 'manifest.files must be a non-empty array');
    for (const entry of manifest.files) {
      const name = entry.path.replace(/^data\//, '');
      const rule = RECORD_COUNT_RULES[name];
      require(rule, `no record-count rule for ${name}`);
      const result = tryJson(`${DATA}/${name}`);
      require(result.ok, `cannot count ${name}: file does not parse`);
      require(entry.recordCount ===
        rule(
          result.value,
        ), `${name}: manifest recordCount ${entry.recordCount} != real ${rule(result.value)}`);
    }
  });

  check('CR-05', 'Data-contract document covers schemas, layers and freeze algorithm', () => {
    require(exists(CONTRACT_DOC), 'data-contract document missing');
    const doc = read(CONTRACT_DOC);
    for (const token of [
      'Layer A',
      'Layer B',
      'Layer C',
      'AUTH-MC10-001',
      'canonical',
      'SHA-256',
      'denominator',
      'VAT',
      'fixture',
      'reconcil',
      'permission',
      'unknown',
      'CR-01',
    ]) {
      require(new RegExp(token, 'i').test(doc), `data-contract document must discuss "${token}"`);
    }
    require(/(?:sort|ordering)[^.\n]{0,60}key/i.test(
      doc,
    ), 'data contract must document key ordering');
    require(/(?:2-space|two-space|2 spaces|indent)/i.test(
      doc,
    ), 'data contract must document indentation');
    for (const file of REQUIRED_DATA_FILES) {
      require(doc.includes(file), `data-contract document must describe ${file}`);
    }
  });

  check('CR-06', 'AUTH-MC10-001 honestly records NOT_GRANTED with an empty scope', () => {
    const auth = readJson(`${DATA}/fieldwork-authorization.json`);
    require(auth.milestone === MILESTONE, 'authorization milestone must be MC-10');
    require(auth.recordId === 'AUTH-MC10-001', 'authorization recordId must be AUTH-MC10-001');
    require(auth.recordStatus === 'ACTIVE', 'authorization record must be ACTIVE');
    const granted = auth.authorizationStatus === 'GRANTED';
    if (!granted) {
      require(auth.authorizationStatus ===
        'NOT_GRANTED', 'authorizationStatus must be NOT_GRANTED');
      require(auth.authorizationDate === null, 'NOT_GRANTED cannot carry an authorization date');
      require(auth.authorizer === null, 'NOT_GRANTED cannot carry an authorizer');
      require(auth.authorizerRole === null, 'NOT_GRANTED cannot carry an authorizer role');
      for (const field of [
        'permittedParticipantCategories',
        'permittedGeographicAreas',
        'permittedContactMethods',
      ]) {
        require(Array.isArray(auth[field]) &&
          auth[field].length === 0, `${field} must be empty while authorization is NOT_GRANTED`);
      }
      for (const field of [
        'directEmailAllowed',
        'telephoneAllowed',
        'introductionsAllowed',
        'onsiteInvitationsAllowed',
      ]) {
        require(auth[field] === false, `${field} must be false while authorization is NOT_GRANTED`);
      }
      require(auth.maximumOutreachVolume === 0, 'maximumOutreachVolume must be 0');
      require(auth.spendingApproved === false, 'spendingApproved must be false');
      require(auth.incentivesApproved === false, 'incentivesApproved must be false');
      require(auth.authorizationDurationDays === 0, 'authorizationDurationDays must be 0');
      require(auth.authorizationExpiresAt === null, 'authorizationExpiresAt must be null');
      require(auth.fieldworkLead === null, 'fieldworkLead must be null while NOT_GRANTED');
      require(auth.incentivePolicy &&
        auth.incentivePolicy.status !==
          'APPROVED', 'incentive policy cannot be approved while authorization is NOT_GRANTED');
      require(/not constitute|does not constitute|not authorization/i.test(
        auth.inferenceGuard || '',
      ), 'inferenceGuard must state that the request/PR/task is not authorization');
    } else {
      require(isIsoDate(auth.authorizationDate), 'a GRANTED record needs an authorization date');
      require(isNonEmptyString(auth.authorizer), 'a GRANTED record needs a named authorizer');
      require(isNonEmptyString(auth.fieldworkLead), 'a GRANTED record needs a fieldwork lead');
      require(auth.permittedParticipantCategories.length > 0 &&
        auth.permittedGeographicAreas.length >
          0, 'a GRANTED record must name permitted categories and areas');
      require(auth.maximumOutreachVolume > 0, 'a GRANTED record must name a volume limit');
      require(auth.authorizationDurationDays > 0, 'a GRANTED record must name a duration');
    }
    require(Array.isArray(auth.prohibitedTargets) &&
      auth.prohibitedTargets.length >= 4, 'standing prohibited targets must be preserved');
  });

  check('CR-07', 'The authorization gate binds the milestone and fieldwork status', () => {
    const status = readJson(`${DATA}/research-status.json`);
    require(status.milestone === MILESTONE, 'research-status milestone must be MC-10');
    require(status.contractId ===
      CONTRACT_ID, 'research-status contractId must match the contract');
    require(status.baseCommit === BASE_COMMIT, 'research-status baseCommit must be the MC-09 HEAD');
    const auth = readJson(`${DATA}/fieldwork-authorization.json`);
    if (auth.authorizationStatus !== 'GRANTED') {
      require(status.milestoneStatus === 'BLOCKED', 'milestoneStatus must be BLOCKED at the gate');
      require(status.statusReason ===
        'OUTREACH_AUTHORIZATION_NOT_GRANTED', 'statusReason must name the gate');
      require(status.outreachAuthorization ===
        'NOT_GRANTED', 'outreachAuthorization must be NOT_GRANTED');
      require(status.fieldworkStatus === 'BLOCKED', 'fieldworkStatus must be BLOCKED at the gate');
      require(status.fieldworkExecuted === false, 'fieldworkExecuted must be false at the gate');
      require(status.fieldworkStartDate === null, 'fieldworkStartDate must be null at the gate');
      require(status.fieldworkEndDate === null, 'fieldworkEndDate must be null at the gate');
      require(/PREPARATION_COMPLETE/.test(status.scopeStatus) &&
        /NOT_EXECUTED/.test(
          status.scopeStatus,
        ), 'scopeStatus must state preparation complete and fieldwork NOT_EXECUTED');
    } else {
      require(status.outreachAuthorization ===
        'GRANTED', 'outreachAuthorization must match the record');
      require(status.fieldworkStatus !==
        'BLOCKED', 'fieldwork cannot stay BLOCKED with a GRANTED record');
      require(status.milestoneStatus !==
        'BLOCKED', 'milestone cannot stay BLOCKED with a GRANTED record');
    }
  });

  check('CR-08', 'The authorization gate zeroes every participant count', () => {
    const status = readJson(`${DATA}/research-status.json`);
    require(isPlainObject(status.participantCounts), 'participantCounts missing');
    if (gateClosed()) {
      for (const key of RESEARCH_STATUS_COUNTS) {
        require(status.participantCounts[key] ===
          0, `participantCounts.${key} must be 0 at the gate`);
      }
      require(status.fieldworkExecuted === false, 'fieldworkExecuted must be false at the gate');
    } else {
      for (const key of RESEARCH_STATUS_COUNTS) {
        require(isFiniteNumber(status.participantCounts[key]) &&
          status.participantCounts[key] >= 0, `participantCounts.${key} must be a count`);
      }
    }
  });

  check('CR-09', 'The authorization gate keeps every experiment NOT_EXECUTED/BLOCKED', () => {
    for (const experiment of experimentRecords()) {
      if (gateClosed()) {
        require(experiment.executionStatus ===
          'NOT_EXECUTED', `${experiment.experimentId}: executionStatus must be NOT_EXECUTED at the gate`);
        require(experiment.resultStatus ===
          'BLOCKED', `${experiment.experimentId}: resultStatus must be BLOCKED at the gate`);
        require(experiment.evidence &&
          experiment.evidence.participants === 0 &&
          experiment.evidence.validCases === 0 &&
          experiment.evidence.responses ===
            0, `${experiment.experimentId}: evidence counts must be 0 at the gate`);
      } else {
        require(['NOT_EXECUTED', 'IN_PROGRESS', 'EXECUTED'].includes(
          experiment.executionStatus,
        ), `${experiment.experimentId}: invalid executionStatus ${experiment.executionStatus}`);
      }
    }
    require(experimentRecords().length === 10, 'the gate check needs all ten experiments');
  });

  check('CR-10', 'The authorization gate keeps every pricing module unadministered', () => {
    const responses = readJson(`${DATA}/pricing-responses.json`);
    if (gateClosed()) {
      require(responses.administered ===
        false, 'pricing modules cannot be administered at the gate');
      require(Array.isArray(responses.responses) &&
        responses.responses.length === 0, 'responses must be empty at the gate');
      for (const field of [
        'participantsCompletingPricingModule',
        'gaborGrangerLaddersCompleted',
        'vanWestendorpModulesCompleted',
      ]) {
        require(responses[field] === 0, `${field} must be 0 at the gate`);
      }
      const ladders = pricingLadders();
      require(ladders.administered === false, 'frozen ladders must be unadministered at the gate');
      require(Array.isArray(ladders.responses) &&
        ladders.responses.length === 0, 'frozen ladders cannot hold responses');
      require(ladders.approvedPrice === false, 'no ladder point may be an approved price');
    }
    const status = readJson(`${DATA}/research-status.json`);
    require(status.pricing &&
      status.pricing.participantsCompletingPricingModule ===
        0, 'research-status pricing module count must be 0');
    require(status.pricing.priceResponsesRecorded ===
      0, 'research-status price response count must be 0');
    require(status.pricing.wtpStatedPreferenceObserved ===
      false, 'stated preference cannot be observed');
    require(status.pricing.wtpCommerciallyValidated ===
      false, 'WTP cannot be commercially validated');
    require(status.pricing.approvedPrices === 0, 'approvedPrices must remain 0');
  });

  check('CR-11', 'The pre-fieldwork checklist blocks fielding while any item is incomplete', () => {
    const status = readJson(`${DATA}/research-status.json`);
    const checklist = status.wave0Checklist;
    require(isNonEmptyArray(checklist), 'wave0Checklist missing');
    require(checklist.length ===
      17, `expected 17 pre-fieldwork checklist items, found ${checklist.length}`);
    const allowed = [
      'COMPLETE',
      'PARTIAL',
      'BLOCKED',
      'NOT_APPROVED',
      'NOT_PRODUCED',
      'IN_PROGRESS',
      'NOT_STARTED',
    ];
    const seen = new Set();
    for (const item of checklist) {
      require(/^W0-\d{2}$/.test(item.itemId || ''), `invalid checklist itemId ${item.itemId}`);
      require(!seen.has(item.itemId), `duplicate checklist item ${item.itemId}`);
      seen.add(item.itemId);
      require(allowed.includes(item.status), `${item.itemId}: invalid status ${item.status}`);
      require(isNonEmptyString(item.evidence), `${item.itemId}: evidence missing`);
    }
    const incomplete = checklist.filter((item) => item.status !== 'COMPLETE');
    for (const blocking of ['W0-03', 'W0-04', 'W0-05', 'W0-10', 'W0-12', 'W0-17']) {
      const item = checklist.find((candidate) => candidate.itemId === blocking);
      require(item, `checklist item ${blocking} missing`);
      require(item.status !==
        'COMPLETE', `${blocking} cannot be COMPLETE while the data controller, legal basis, channels, storage and authorization are absent`);
    }
    if (authorization().authorizationStatus === 'GRANTED') {
      require(incomplete.length ===
        0, `outreach cannot be granted while ${incomplete.length} pre-fieldwork items are incomplete`);
    } else {
      require(status.fieldworkStatus ===
        'BLOCKED', 'incomplete checklist must keep fieldwork BLOCKED');
    }
  });

  check('CR-12', 'Every register is consistent with the closed authorization gate', () => {
    require(isClosedGateConsistent(), 'the closed gate is not consistently represented');
    const participants = readJson(`${DATA}/participants.json`);
    require(Array.isArray(participants.participants) &&
      participants.participants.length === 0, 'participants must be empty at the gate');
    require(participants.aggregate &&
      participants.aggregate.total === 0, 'participants aggregate must be 0');
    const interviews = readJson(`${DATA}/interview-records.json`);
    require(Array.isArray(interviews.interviews) &&
      interviews.interviews.length === 0, 'interview records must be empty');
    require(interviews.aggregate === 0, 'interview aggregate must be 0');
    const findings = readJson(`${DATA}/findings.json`);
    require(findings.status === 'NOT_EXECUTED', 'findings status must be NOT_EXECUTED');
    require(Array.isArray(findings.findings) &&
      findings.findings.length === 0, 'no finding may exist without an interview');
    const coding = readJson(`${DATA}/coding.json`);
    require(coding.codedUnits === 0 &&
      coding.doubleCodedUnits === 0, 'nothing may be coded without interviews');
    const funnel = readJson(`${DATA}/recruitment-funnel.json`);
    require(funnel.totals &&
      funnel.totals.totalsCompleted === 0, 'funnel totalsCompleted must be 0');
    const decisions = readJson(`${DATA}/decisions.json`);
    for (const decision of decisions.decisions) {
      require(!/\b(?:approved price|price approval|released for sale|readiness upgrade)\b/i.test(
        decision.summary || '',
      ), `${decision.decisionId}: decision cannot approve a price or release`);
    }
  });

  check('CR-13', 'The experiment set is exactly EXP-MC10-01 to EXP-MC10-10', () => {
    const experiments = experimentRecords();
    require(experiments.length ===
      10, `expected exactly 10 experiments, found ${experiments.length}`);
    const ids = experiments.map((experiment) => experiment.experimentId);
    require(JSON.stringify(ids) ===
      JSON.stringify(
        EXPERIMENT_IDS,
      ), `experiment ids must be EXP-MC10-01..10 in order, found ${ids.join(',')}`);
    const unique = new Set(ids);
    require(unique.size === ids.length, 'duplicate experimentId');
  });

  check('CR-14', 'Frozen experiment thresholds recompute to the recorded SHA-256', () => {
    const sources = experimentSourceRecords();
    require(sources.length === 10, 'MC-09 registry must hold ten experiment records');
    const byId = new Map(sources.map((source) => [source.experimentId, source]));
    for (const experiment of experimentRecords()) {
      const source = byId.get(experiment.experimentId);
      require(source, `${experiment.experimentId}: missing MC-09 registry record`);
      require(experiment.thresholdSha256 ===
        sha256(
          canonicalJson(source),
        ), `${experiment.experimentId}: threshold SHA-256 does not match the canonical MC-09 record (post-hoc change suspected)`);
      require(/^[0-9a-f]{64}$/.test(
        experiment.thresholdSha256 || '',
      ), `${experiment.experimentId}: thresholdSha256 must be lowercase hex`);
    }
  });

  check('CR-15', 'Every experiment copies the MC-09 registered text faithfully', () => {
    const byId = new Map(experimentSourceRecords().map((source) => [source.experimentId, source]));
    for (const experiment of experimentRecords()) {
      const source = byId.get(experiment.experimentId);
      require(source, `${experiment.experimentId}: missing MC-09 registry record`);
      for (const field of ['hypothesis', 'segment', 'minimumEvidence', 'decisionThreshold']) {
        require(experiment[field] ===
          source[
            field
          ], `${experiment.experimentId}: ${field} differs from the frozen MC-09 registry`);
      }
      require(isNonEmptyString(
        experiment.whatWouldCountAsEvidence,
      ), `${experiment.experimentId}: whatWouldCountAsEvidence missing`);
      require(isNonEmptyString(
        experiment.interpretationLimits,
      ), `${experiment.experimentId}: interpretationLimits missing`);
      require(isNonEmptyString(
        experiment.nextStep,
      ), `${experiment.experimentId}: nextStep missing`);
    }
  });

  check('CR-16', 'Experiment status vocabulary is honest and evidence counts are zero', () => {
    const allowedExecution = ['NOT_EXECUTED'];
    const allowedResult = ['BLOCKED'];
    for (const experiment of experimentRecords()) {
      require(allowedExecution.includes(
        experiment.executionStatus,
      ), `${experiment.experimentId}: invalid executionStatus`);
      require(allowedResult.includes(
        experiment.resultStatus,
      ), `${experiment.experimentId}: invalid resultStatus`);
      require(isNonEmptyArray(
        experiment.blockerCodes,
      ), `${experiment.experimentId}: blockerCodes missing`);
      for (const code of experiment.blockerCodes) {
        require(BLOCKER_IDS.includes(code), `${experiment.experimentId}: unknown blocker ${code}`);
      }
      require(experiment.blockerCodes.includes(
        'BLK-MC10-01',
      ), `${experiment.experimentId}: must name the authorization blocker`);
      require(isPlainObject(
        experiment.evidence,
      ), `${experiment.experimentId}: evidence object missing`);
      require(experiment.evidence.participants ===
        0, `${experiment.experimentId}: participants must be 0`);
      require(experiment.evidence.validCases ===
        0, `${experiment.experimentId}: validCases must be 0`);
      require(experiment.evidence.responses ===
        0, `${experiment.experimentId}: responses must be 0`);
    }
    const blocked = readJson(`${DATA}/research-status.json`).blockers;
    for (const blocker of blocked)
      require(BLOCKER_IDS.includes(blocker.blockerId), `unknown blocker id ${blocker.blockerId}`);
  });

  check('CR-17', 'No data record carries a PASS/FAIL/INCONCLUSIVE result verdict', () => {
    const violations = [];
    for (const file of dataFileNames()) {
      const result = tryJson(`${DATA}/${file}`);
      if (!result.ok) continue;
      walkJson(result.value, (node, path) => {
        if (!isPlainObject(node)) return;
        for (const [key, value] of Object.entries(node)) {
          if (
            /^(?:verdict|resultStatus|executionStatus|result|conclusion|outcome)$/i.test(key) &&
            typeof value === 'string' &&
            new RegExp(`^(?:${FORBIDDEN_VERDICTS})$`).test(value)
          ) {
            violations.push(`${file}:${path}.${key} = ${value}`);
          }
        }
      });
    }
    require(violations.length ===
      0, `forbidden result verdicts: ${violations.slice(0, 5).join(', ')}`);
  });

  check('CR-18', 'Experiment freeze provenance and canonicalization are documented', () => {
    const doc = readJson(`${DATA}/experiments.json`);
    require(doc.registeredVersion ===
      'MC-09-REGISTRY-1.0.0', 'registeredVersion must be MC-09-REGISTRY-1.0.0');
    require(doc.frozenFrom ===
      `${MV_DATA}/validation-experiments.json`, 'frozenFrom must point at the MC-09 registry');
    const algorithm = doc.canonicalization?.algorithm || '';
    require(/sort/i.test(algorithm), 'canonicalization algorithm must sort keys');
    require(/sha-?256/i.test(algorithm), 'canonicalization algorithm must name SHA-256');
    require(/stringify/i.test(
      algorithm,
    ), 'canonicalization algorithm must name the JSON serialization');
    require(/2-space|two-space|\(value, null, 2\)|null, 2/.test(
      algorithm,
    ), 'canonicalization algorithm must document 2-space indentation');
    require(doc.gate &&
      doc.gate.authorizationStatus === 'NOT_GRANTED', 'experiment gate must record NOT_GRANTED');
    const registry = readJson(`${MV_DATA}/validation-experiments.json`);
    require(/^MAREA-MC09/.test(registry.contractId || ''), 'MC-09 registry contractId changed');
    require(registry.experiments.length === 10, 'MC-09 registry must keep ten experiments');
  });

  check('CR-19', 'No finding exists without a traceable valid interview record', () => {
    const findings = readJson(`${DATA}/findings.json`);
    require(isNonEmptyArray(
      findings.findingSchema?.requiredFields,
    ), 'findings schema requiredFields missing');
    const interviews = interviewList();
    const participants = new Map(
      participantList().map((participant) => [participant.participantId, participant]),
    );
    for (const finding of findings.findings) {
      const where = `finding ${finding.findingId}`;
      require(/^FND-MC10-\d{3}$/.test(finding.findingId || ''), `${where}: invalid findingId`);
      require(EXPERIMENT_IDS.includes(finding.experimentId), `${where}: invalid experimentId`);
      require(isNonEmptyArray(
        finding.evidenceInterviewIds,
      ), `${where}: evidenceInterviewIds must be non-empty`);
      const linked = interviews.filter((interview) =>
        finding.evidenceInterviewIds.includes(interview.interviewId),
      );
      require(linked.length ===
        finding.evidenceInterviewIds.length, `${where}: unresolved interview reference`);
      for (const interview of linked) {
        require(interview.completionStatus ===
          'COMPLETED', `${where}: links an incomplete interview`);
        require(interview.analysisEligible ===
          true, `${where}: links a non-analysis-eligible interview`);
        require(interview.consentRecorded === true, `${where}: links an interview without consent`);
      }
      require(isFiniteNumber(finding.denominator) &&
        finding.denominator > 0, `${where}: denominator must be > 0`);
      require(isNonEmptyString(finding.claim), `${where}: claim missing`);
      if (finding.quote !== undefined && finding.quote !== null) {
        const participantId = finding.quoteParticipantId;
        require(isNonEmptyString(
          participantId,
        ), `${where}: a quotation needs a pseudonymous quoteParticipantId`);
        const participant = participants.get(participantId);
        require(participant, `${where}: quotation references an unknown participant`);
        require(participant.consent &&
          participant.consent.quote ===
            true, `${where}: a quotation requires recorded QUOTATION permission`);
        require(finding.quotePermission ===
          true, `${where}: quotePermission must be recorded as true`);
      }
    }
    if (findings.status === 'NOT_EXECUTED') {
      require(findings.findings.length ===
        0, 'NOT_EXECUTED findings register cannot hold findings');
    }
  });

  check('CR-20', 'Every interview record carries all mandatory evidence fields', () => {
    const participants = new Map(
      participantList().map((participant) => [participant.participantId, participant]),
    );
    const allowedCompletion = ['COMPLETED', 'INCOMPLETE', 'ABANDONED'];
    for (const interview of interviewList()) {
      const where = `interview ${interview.interviewId}`;
      require(/^INT-MC10-\d{3}$/.test(
        interview.interviewId || '',
      ), `${where}: invalid interviewId`);
      const participant = participants.get(interview.participantId);
      require(participant, `${where}: unresolved participantId`);
      require(participant.segmentId ===
        interview.segmentId, `${where}: segment does not match the participant`);
      require(SEGMENT_PLAN.some(
        (segment) => segment.segmentId === interview.segmentId,
      ), `${where}: invalid segmentId`);
      require(isNonEmptyArray(interview.experimentIds), `${where}: experimentIds missing`);
      for (const id of interview.experimentIds)
        require(EXPERIMENT_IDS.includes(id), `${where}: unknown experiment ${id}`);
      require(isIsoDate(
        interview.interviewDate,
      ), `${where}: interviewDate must be a real ISO date`);
      require(interview.interviewDate >=
        MILESTONE_DATE, `${where}: interviewDate cannot precede the milestone`);
      require(isNonEmptyString(interview.acquisitionSource), `${where}: acquisitionSource missing`);
      require(isNonEmptyString(interview.interviewerId), `${where}: interviewerId missing`);
      require(/^INTV-[A-Z0-9-]+$/.test(
        interview.interviewerId || '',
      ), `${where}: interviewerId must match INTV-*`);
      require(['ES', 'EN'].includes(
        interview.language,
      ), `${where}: language must be a produced instrument language`);
      require(interview.eligibilityConfirmed === true, `${where}: eligibility must be confirmed`);
      require(interview.consentRecorded === true, `${where}: consent must be recorded`);
      require(isIsoDate(interview.consentDate), `${where}: consentDate must be a real ISO date`);
      require(interview.consentDate <=
        interview.interviewDate, `${where}: consent cannot post-date the interview`);
      require(typeof interview.recordingPermission ===
        'boolean', `${where}: recordingPermission missing`);
      require(typeof interview.quotationPermission ===
        'boolean', `${where}: quotationPermission missing`);
      require(allowedCompletion.includes(
        interview.completionStatus,
      ), `${where}: invalid completionStatus`);
      require(typeof interview.analysisEligible ===
        'boolean', `${where}: analysisEligible must be explicit`);
      if (interview.completionStatus !== 'COMPLETED') {
        require(interview.analysisEligible ===
          false, `${where}: an incomplete interview cannot be analysis-eligible`);
      }
    }
    const file = readJson(`${DATA}/interview-records.json`);
    require(file.aggregate ===
      interviewList()
        .length, `interview aggregate ${file.aggregate} != records ${interviewList().length}`);
    require(isNonEmptyArray(file.requiredFields), 'interview requiredFields schema missing');
  });

  check('CR-21', 'Every participant record is pseudonymous, unique and typed', () => {
    const file = readJson(`${DATA}/participants.json`);
    require(isNonEmptyString(
      file.pseudonymization?.participantIdPattern,
    ), 'pseudonymization participantIdPattern must be a string');
    const ids = new Set();
    for (const participant of file.participants) {
      const where = `participant ${participant.participantId}`;
      require(/^P-MC10-\d{3}$/.test(
        participant.participantId || '',
      ), `${where}: invalid pseudonymous participantId`);
      require(!ids.has(participant.participantId), `${where}: duplicate participantId`);
      ids.add(participant.participantId);
      require(SEGMENT_PLAN.some(
        (segment) => segment.segmentId === participant.segmentId,
      ), `${where}: invalid segmentId`);
      require(isNonEmptyString(participant.role), `${where}: role missing`);
      require(/^[A-Z]{2}$/.test(
        participant.country || '',
      ), `${where}: country must be ISO-3166 alpha-2`);
      require(['ES', 'EN'].includes(participant.language), `${where}: language must be ES or EN`);
      require(isNonEmptyString(
        participant.acquisitionSource,
      ), `${where}: acquisitionSource missing`);
      require(isPlainObject(participant.consent), `${where}: consent object missing`);
      for (const permission of ['participate', 'record', 'quote', 'followUp']) {
        require(typeof participant.consent[permission] ===
          'boolean', `${where}: consent.${permission} must be boolean`);
      }
      require(participant.withdrawalDate === null ||
        isIsoDate(
          participant.withdrawalDate,
        ), `${where}: withdrawalDate must be null or an ISO date`);
    }
    require(file.aggregate &&
      file.aggregate.total === file.participants.length, 'participant aggregate.total mismatch');
    for (const segment of SEGMENT_PLAN) {
      require(file.aggregate.bySegment[segment.segmentId] === 0 ||
        isFiniteNumber(
          file.aggregate.bySegment[segment.segmentId],
        ), `${segment.segmentId}: bySegment count missing`);
      const actual = file.participants.filter(
        (participant) => participant.segmentId === segment.segmentId,
      ).length;
      require(file.aggregate.bySegment[segment.segmentId] ===
        actual, `${segment.segmentId}: bySegment count mismatch`);
    }
    require(/Layer A/i.test(
      file.piiPolicy || '',
    ), 'participant file must state that Layer A data never enter the repository');
  });

  check('CR-22', 'Consent and withdrawal are enforced across findings and interviews', () => {
    const participants = new Map(
      participantList().map((participant) => [participant.participantId, participant]),
    );
    const withdrawn = new Set(
      [...participants.values()]
        .filter((participant) => participant.withdrawalDate !== null)
        .map((participant) => participant.participantId),
    );
    for (const interview of interviewList()) {
      const participant = participants.get(interview.participantId);
      require(participant, `${interview.interviewId}: unresolved participant`);
      require(participant.consent.participate ===
        true, `${interview.interviewId}: participant consent is not recorded`);
      if (withdrawn.has(participant.participantId)) {
        require(interview.analysisEligible ===
          false, `${interview.interviewId}: a withdrawn participant cannot be analysis-eligible`);
      }
    }
    for (const finding of readJson(`${DATA}/findings.json`).findings) {
      if (finding.quoteParticipantId && withdrawn.has(finding.quoteParticipantId)) {
        throw new Error(`${finding.findingId}: a withdrawn participant cannot be quoted`);
      }
    }
  });

  check('CR-23', 'Duplicate interviews are rejected', () => {
    const seen = new Set();
    for (const interview of interviewList()) {
      const key = `${interview.participantId}|${interview.interviewDate}|${[...(interview.experimentIds || [])].sort().join(',')}`;
      require(!seen.has(
        key,
      ), `duplicate interview for ${interview.participantId} on ${interview.interviewDate}`);
      seen.add(key);
    }
  });

  check(
    'CR-24',
    'Participant, interview, funnel and status counts reconcile across datasets',
    () => {
      const participants = participantList();
      const interviews = interviewList();
      const status = readJson(`${DATA}/research-status.json`);
      const funnel = readJson(`${DATA}/recruitment-funnel.json`);
      const participantFile = readJson(`${DATA}/participants.json`);
      require(participantFile.aggregate.total ===
        participants.length, 'participants aggregate mismatch');
      require(readJson(`${DATA}/interview-records.json`).aggregate ===
        interviews.length, 'interview aggregate mismatch');
      require(status.sample.completedInterviews ===
        interviews.length, 'research-status completedInterviews mismatch');
      require(status.sample.validAnalyticalCases ===
        interviews.filter((interview) => interview.analysisEligible)
          .length, 'research-status validAnalyticalCases mismatch');
      require(funnel.totals.completedInterviews ===
        interviews.length, 'funnel completedInterviews mismatch');
      require(funnel.totals.totalsCompleted ===
        interviews.length, 'funnel totalsCompleted mismatch');
      const completed = funnel.segments.reduce(
        (total, segment) => total + segment.counts.INTERVIEW_COMPLETED,
        0,
      );
      require(completed === interviews.length, 'funnel segment INTERVIEW_COMPLETED mismatch');
      const consented = funnel.segments.reduce(
        (total, segment) => total + segment.counts.CONSENTED,
        0,
      );
      require(consented ===
        participants.filter((participant) => participant.consent.participate)
          .length, 'funnel CONSENTED mismatch');
      for (const key of RESEARCH_STATUS_COUNTS) {
        const camel = {
          identified: 'IDENTIFIED',
          contactAuthorized: 'CONTACT_AUTHORIZED',
          invited: 'INVITED',
          responded: 'RESPONDED',
          screened: 'SCREENED',
          eligible: 'ELIGIBLE',
          consented: 'CONSENTED',
          interviewCompleted: 'INTERVIEW_COMPLETED',
          analysisEligible: 'ANALYSIS_ELIGIBLE',
          withdrawn: 'WITHDRAWN',
          excluded: 'EXCLUDED',
        }[key];
        require(status.participantCounts[key] ===
          funnel.totals.counts[camel], `research-status ${key} != funnel ${camel}`);
      }
    },
  );

  check(
    'CR-25',
    'Every price response carries currency, VAT treatment, provenance and a known point',
    () => {
      const responses = readJson(`${DATA}/pricing-responses.json`);
      const ladders = pricingLadders();
      const constructs = new Map(
        (ladders.constructs || []).map((construct) => [construct.constructId, construct]),
      );
      for (const response of responses.responses) {
        const where = `response ${response.responseId}`;
        require(/^PRS-MC10-\d{3}$/.test(response.responseId || ''), `${where}: invalid responseId`);
        require(participantList().some(
          (participant) => participant.participantId === response.participantId,
        ), `${where}: unresolved participantId`);
        const construct = constructs.get(response.constructId);
        require(construct, `${where}: unknown ladder construct ${response.constructId}`);
        require(['GABOR_GRANGER', 'VAN_WESTENDORP'].includes(
          response.method,
        ), `${where}: invalid method`);
        require(Number.isInteger(response.pointIndex) &&
          response.pointIndex >= 1, `${where}: pointIndex must be a known integer`);
        require(/^[A-Z]{3}$/.test(
          response.currency || '',
        ), `${where}: currency must be an ISO-4217 code`);
        require(response.currency ===
          construct.currency, `${where}: currency differs from the frozen ladder`);
        require(isNonEmptyString(response.vatTreatment), `${where}: vatTreatment must be recorded`);
        require(response.vatTreatment !==
          'UNKNOWN', `${where}: a known amount cannot carry an UNKNOWN VAT treatment`);
        require(isNonEmptyString(response.ladderVersion), `${where}: ladderVersion missing`);
        require(response.ladderVersion ===
          ladders.contractVersion, `${where}: ladderVersion does not match the frozen ladder`);
        require(isIsoDate(response.responseDate), `${where}: responseDate must be a real ISO date`);
        if (response.amount === null) {
          require(response.amountStatus ===
            'UNKNOWN', `${where}: an unknown amount must be explicitly UNKNOWN, not zero`);
        } else {
          require(isFiniteNumber(response.amount) &&
            response.amount > 0, `${where}: amount must be a positive recorded price`);
          require(response.amountStatus === undefined ||
            response.amountStatus === 'KNOWN', `${where}: amountStatus contradicts a known amount`);
        }
        const ladder = construct.ladder || [];
        require(ladder.length === 0 ||
          ladder.some(
            (point) => point.pointIndex === response.pointIndex,
          ), `${where}: pointIndex is not in the frozen ladder`);
        require(response.intentScale !== undefined ||
          response.vwQuestion !==
            undefined, `${where}: no intent scale or Van Westendorp answer recorded`);
      }
      if (responses.administered === false) {
        require(responses.responses.length ===
          0, 'unadministered pricing module cannot hold responses');
      } else {
        require(responses.responses.length >
          0, 'administered pricing module must hold at least one response');
      }
    },
  );

  check('CR-26', 'No reported rate has a zero or missing denominator', () => {
    const violations = [];
    eachJsonValue((file, value) => {
      walkJson(value, (node, path) => {
        if (!isPlainObject(node)) return;
        for (const [key, raw] of Object.entries(node)) {
          if (!/(?:^|_)(?:rate|percent|percentage|proportion|share)$/i.test(key)) continue;
          if (!isFiniteNumber(raw)) continue;
          if (
            node.basis === 'THRESHOLD' ||
            node.threshold === true ||
            node.valueKind === 'THRESHOLD'
          )
            continue;
          const denominator =
            node.denominator ??
            node.n ??
            node.sampleSize ??
            node.participants ??
            node.codedUnits ??
            node.validCases;
          if (!isFiniteNumber(denominator) || denominator <= 0) {
            violations.push(`${file}:${path}.${key} has no positive denominator`);
          }
        }
      });
    });
    require(violations.length ===
      0, `rates without denominators: ${violations.slice(0, 5).join(', ')}`);
    const concepts = readJson(`${DATA}/concept-comprehension.json`);
    for (const concept of concepts.concepts) {
      if (concept.participantsTested > 0) {
        require(concept.denominator ===
          concept.participantsTested, `${concept.conceptId}: denominator must equal participantsTested`);
        require(concept.status !==
          'NOT_EXECUTED', `${concept.conceptId}: tested concept cannot be NOT_EXECUTED`);
      } else {
        require(concept.denominator ===
          0, `${concept.conceptId}: untested concept must have denominator 0`);
        require(concept.status ===
          'NOT_EXECUTED', `${concept.conceptId}: untested concept must be NOT_EXECUTED`);
      }
    }
  });

  check('CR-27', 'Qualitative samples are never reported as population estimates', () => {
    const violations = scanDocuments(POPULATION_CLAIM_RULES, {
      skipThreshold: true,
      skipNegated: true,
      allowed:
        /outside the design|limitation|non-probability|not attempted|not possible|impossib|not claimed|not permitted|outside the scope/i,
    });
    require(violations.length === 0, `population inference: ${violations.slice(0, 5).join(' | ')}`);
  });

  check('CR-28', 'Quotations are permission-gated and never attributed without consent', () => {
    const violations = scanDocuments(QUOTE_CLAIM_RULES, { skipNegated: true });
    require(violations.length ===
      0, `unattributed or ungated quotations: ${violations.slice(0, 5).join(' | ')}`);
    const findings = readJson(`${DATA}/findings.json`);
    const quoteRule = findings.findingSchema?.quoteRule || '';
    require(/QUOTATION/i.test(
      quoteRule,
    ), 'findings schema must document the QUOTATION permission rule');
  });

  check(
    'CR-62',
    'Narrative documents contain no fabricated quotation, observation or participant claim (EN/ES/PT)',
    () => {
      const participants = new Map(
        participantList().map((participant) => [participant.participantId, participant]),
      );
      const interviews = interviewList();
      const violations = [];
      for (const doc of docFiles()) {
        if (!exists(doc)) continue;
        const text = read(doc);
        // (a) a quotation attributed to a participant, a pseudonymous ID or an
        // owner/installer/retailer/operator cannot exist without a real record.
        for (const rule of NARRATIVE_QUOTE_RULES) {
          const flags = rule.re.flags.includes('g') ? rule.re.flags : `${rule.re.flags}g`;
          for (const match of text.matchAll(new RegExp(rule.re.source, flags))) {
            // Rules anchored on a closing quotation sit inside the quoted span, so
            // they must not be skipped as if they were a quoted meta-example.
            if (rule.insideQuotesExempt !== false && insideDoubleQuotes(text, match.index))
              continue;
            if (rule.attributionInMatch && !blockquoteAttribution(match[0])) continue;
            const sentence = rule.attributionInMatch
              ? match[0]
              : sentenceAround(text, match.index, match[0].length);
            if (PREPARED_CONTEXT_RE.test(sentence) && !/P-MC10-\d{3}/.test(sentence)) continue;
            if (PROHIBITION_CONTEXT_RE.test(sentence)) continue;
            const ids = [...sentence.matchAll(new RegExp('\\bP-MC10-\\d{3}\\b', 'g'))].map(
              (entry) => entry[0],
            );
            if (quotationCleared(ids, participants, interviews)) continue;
            violations.push(`${doc}: ${rule.id} -> "${sentence.trim().slice(0, 120)}"`);
          }
        }
        // (b) every pseudonymous participant reference must resolve to a valid
        // interview record with recorded quotation permission.
        for (const match of text.matchAll(new RegExp('\\bP-MC10-\\d{3}\\b', 'g'))) {
          if (!quotationCleared([match[0]], participants, interviews)) {
            violations.push(`${doc}: unresolvable participant reference ${match[0]}`);
          }
        }
        // (c) quantifier-less observational claims imply an interview that never
        // happened unless they are negated, desk research, prepared or labelled
        // synthetic/hypothetical text. MC-10R covers EN/ES/PT role nouns and verbs.
        for (const match of text.matchAll(new RegExp(NARRATIVE_OBSERVATION_RE.source, 'giu'))) {
          if (insideDoubleQuotes(text, match.index)) continue;
          const sentence = sentenceAround(text, match.index, match[0].length);
          if (NEGATION_TOKENS.test(sentence)) continue;
          if (DESK_RESEARCH_RE.test(sentence)) continue;
          if (SYNTHETIC_LABEL_RE.test(sentence)) continue;
          if (
            PREPARED_CONTEXT_RE.test(sentence) &&
            /\b(?:prepared|instrument|template|script|wording|question|prompt|interviewer|guion|guión|plantilla|borrador|guião|minuta)\b/i.test(
              sentence,
            )
          )
            continue;
          if (PROHIBITION_CONTEXT_RE.test(sentence)) continue;
          if (/\b(?:only as|as the|as a|exactly as|according to)\b/i.test(sentence)) continue;
          violations.push(
            `${doc}: quantifier-less observation -> "${sentence.trim().slice(0, 120)}"`,
          );
        }
        // (d) explicit claims of completed field work, participant percentages or
        // customer preference are fabricated unless a real record exists. They
        // must not be negated, threshold/planning language, desk research,
        // prepared or labelled synthetic/hypothetical text, or a prohibition.
        for (const rule of NARRATIVE_CLAIM_RULES) {
          for (const match of text.matchAll(
            new RegExp(rule.re.source, `${rule.re.flags.replace('g', '')}g`),
          )) {
            if (insideDoubleQuotes(text, match.index)) continue;
            const sentence = sentenceAround(text, match.index, match[0].length);
            if (NEGATION_TOKENS.test(sentence)) continue;
            if (NARRATIVE_THRESHOLD_RE.test(sentence)) continue;
            if (NARRATIVE_NON_ASSERTIVE_RE.test(sentence)) continue;
            if (/\?/.test(sentence)) continue;
            if (NARRATIVE_INTERROGATIVE_RE.test(sentence.trim())) continue;
            if (DESK_RESEARCH_RE.test(sentence)) continue;
            if (SYNTHETIC_LABEL_RE.test(sentence)) continue;
            if (PREPARED_CONTEXT_RE.test(sentence)) continue;
            if (PROHIBITION_CONTEXT_RE.test(sentence)) continue;
            if (/\b(?:only as|as the|as a|exactly as|according to)\b/i.test(sentence)) continue;
            violations.push(`${doc}: ${rule.id} -> "${sentence.trim().slice(0, 120)}"`);
          }
        }
      }
      require(violations.length ===
        0, `narrative fabrication: ${violations.slice(0, 5).join(' | ')}`);
    },
  );

  check('CR-29', 'Coding state is honest: nothing is coded and kappa is not computed', () => {
    const coding = readJson(`${DATA}/coding.json`);
    require(coding.doubleCodingRatioTarget === 0.25, 'doubleCodingRatioTarget must be 0.25');
    require(isFiniteNumber(coding.codedUnits) &&
      coding.codedUnits === 0, 'codedUnits must be 0 without interviews');
    require(isFiniteNumber(coding.doubleCodedUnits) &&
      coding.doubleCodedUnits === 0, 'doubleCodedUnits must be 0');
    require(coding.doubleCodedUnits <=
      coding.codedUnits, 'doubleCodedUnits cannot exceed codedUnits');
    require(coding.cohensKappa === null, 'cohensKappa must be null when nothing was coded');
    require(coding.kappaStatus === 'NOT_COMPUTED', 'kappaStatus must be NOT_COMPUTED');
    require(coding.doubleCodingRatioAchieved ===
      null, 'doubleCodingRatioAchieved must be null without data');
    require(coding.saturation &&
      coding.saturation.reached === false, 'saturation cannot be reached without interviews');
    require(Array.isArray(coding.saturation.perSegment) &&
      coding.saturation.perSegment.length === 0, 'saturation perSegment must be empty');
    require(coding.negativeCases === 0, 'negativeCases must be 0 without coded units');
  });

  check('CR-30', 'Concept-comprehension state matches an unexecuted experiment', () => {
    const file = readJson(`${DATA}/concept-comprehension.json`);
    const expected = ['NAV', 'WATCH', 'PROTECT', 'HUB', 'START', 'INTEGRATED_SYSTEM', 'FLEET'];
    const ids = file.concepts.map((concept) => concept.conceptId);
    require(JSON.stringify(ids) ===
      JSON.stringify(expected), `concepts must be ${expected.join(',')}`);
    for (const concept of file.concepts) {
      require(concept.participantsTested ===
        0, `${concept.conceptId}: participantsTested must be 0`);
      require(concept.correctTwoExclusions ===
        0, `${concept.conceptId}: correctTwoExclusions must be 0`);
      require(concept.criticalMisconceptions ===
        0, `${concept.conceptId}: criticalMisconceptions must be 0`);
      require(concept.denominator === 0, `${concept.conceptId}: denominator must be 0`);
      require(concept.status ===
        'NOT_EXECUTED', `${concept.conceptId}: status must be NOT_EXECUTED`);
    }
    require(file.experimentId ===
      'EXP-MC10-06', 'concept comprehension must reference EXP-MC10-06');
    require(file.aggregate.participantsTested === 0 &&
      file.aggregate.denominator === 0, 'aggregate must stay zero');
  });

  check('CR-31', 'Barrier taxonomy state matches an unexecuted experiment', () => {
    const file = readJson(`${DATA}/barriers.json`);
    const expected = [
      'WARRANTY',
      'LIABILITY',
      'DATA_OWNERSHIP',
      'BRAND_LONGEVITY',
      'SUBSCRIPTION_LAPSE',
      'OFFLINE_OPERATION',
      'SUPPORT',
      'SECURITY',
      'RELIABILITY',
      'UNKNOWN_BRAND',
    ];
    const codes = file.barriers.map((barrier) => barrier.barrierCode);
    require(JSON.stringify(codes) ===
      JSON.stringify(expected), `barrier codes must be ${expected.join(',')}`);
    for (const barrier of file.barriers) {
      require(barrier.participantsRanking ===
        0, `${barrier.barrierCode}: participantsRanking must be 0`);
      require(barrier.topThreeCount === 0, `${barrier.barrierCode}: topThreeCount must be 0`);
      require(barrier.status ===
        'NOT_EXECUTED', `${barrier.barrierCode}: status must be NOT_EXECUTED`);
    }
    require(file.experimentId === 'EXP-MC10-10', 'barriers must reference EXP-MC10-10');
    require(file.aggregate.participantsRanking === 0 &&
      file.aggregate.topThreeCount === 0, 'barrier aggregate must stay zero');
  });

  check('CR-32', 'Data-quality record proves reconciliation and PII safety', () => {
    const quality = readJson(`${DATA}/data-quality.json`);
    require(isNonEmptyArray(quality.checks), 'data-quality checks must be recorded');
    for (const entry of quality.checks) {
      require(/^QC-\d{2}$/.test(
        entry.checkId || '',
      ), `invalid data-quality checkId ${entry.checkId}`);
      require(isNonEmptyString(entry.check), `${entry.checkId}: check description missing`);
      require(['COMPLETE', 'BLOCKED', 'NOT_APPLICABLE'].includes(
        entry.result,
      ), `${entry.checkId}: invalid result`);
      require(isNonEmptyString(entry.evidence), `${entry.checkId}: evidence missing`);
    }
    require(quality.participantsReconciled === true, 'participantsReconciled must be true');
    require(quality.countsReconciled === true, 'countsReconciled must be true');
    require(quality.fixturesExcludedFromTotals === true, 'fixturesExcludedFromTotals must be true');
    require(quality.piiScan === 'NO_PII_FOUND', 'piiScan must be NO_PII_FOUND');
    require(quality.transcriptsInRepo === false, 'transcriptsInRepo must be false');
    require(quality.audioInRepo === false, 'audioInRepo must be false');
    require(quality.layerAProvisioned === false &&
      quality.layerBProvisioned === false, 'Layer A/B stores cannot be claimed as provisioned');
  });

  check('CR-33', 'Recruitment funnel preserves the plan and every state is zero', () => {
    const funnel = readJson(`${DATA}/recruitment-funnel.json`);
    const status = readJson(`${DATA}/research-status.json`);
    require(funnel.authorizationStatus ===
      'NOT_GRANTED', 'funnel must record the authorization status');
    require(funnel.segments.length === 8, 'funnel must cover all eight segments');
    for (const [index, segment] of funnel.segments.entries()) {
      const planned = SEGMENT_PLAN[index];
      require(segment.segmentId ===
        planned.segmentId, `funnel segment ${index} must be ${planned.segmentId}`);
      require(segment.name === planned.name, `${planned.segmentId}: segment name changed`);
      require(segment.plannedMin ===
        planned.plannedMin, `${planned.segmentId}: plannedMin changed`);
      require(segment.plannedMax ===
        planned.plannedMax, `${planned.segmentId}: plannedMax changed`);
      require(segment.completedInterviews ===
        0, `${planned.segmentId}: completedInterviews must be 0`);
      require(segment.validAnalysisCases ===
        0, `${planned.segmentId}: validAnalysisCases must be 0`);
      for (const state of FUNNEL_STATES) {
        require(segment.counts[state] === 0, `${planned.segmentId}: ${state} must be 0`);
      }
    }
    require(funnel.totals.plannedMin === 40 &&
      funnel.totals.plannedMax === 80, 'planned totals must remain 40-80');
    require(funnel.totals.completedInterviews === 0, 'completedInterviews must be 0');
    require(funnel.totals.totalsCompleted === 0, 'totalsCompleted must be 0');
    for (const state of FUNNEL_STATES) {
      require(funnel.totals.counts[state] === 0, `totals.${state} must be 0`);
    }
    const statusSegments = status.segmentCounts;
    require(statusSegments.length === 8, 'research-status must hold eight segments');
    for (const [index, planned] of SEGMENT_PLAN.entries()) {
      require(statusSegments[index].segmentId ===
        planned.segmentId, `research-status segment ${planned.segmentId} changed`);
      require(statusSegments[index].plannedMin ===
        planned.plannedMin, `research-status ${planned.segmentId} plannedMin changed`);
      require(statusSegments[index].plannedMax ===
        planned.plannedMax, `research-status ${planned.segmentId} plannedMax changed`);
      require(statusSegments[index].completedInterviews ===
        0, `research-status ${planned.segmentId} completedInterviews must be 0`);
    }
    require(funnel.reconciliation &&
      funnel.reconciliation.participantsReconciled === true, 'funnel reconciliation missing');
    require(status.sample.totalInterviewsPlannedMin === 40 &&
      status.sample.totalInterviewsPlannedMax ===
        80, 'research-status planned total must stay 40-80');
    // The per-segment quotas are preserved honestly even though their sum does
    // not equal the headline 40-80 target. That defect must stay recorded: it is
    // allowed only when planningInconsistencies documents the mismatch.
    const quotaMin = SEGMENT_PLAN.reduce((total, segment) => total + segment.plannedMin, 0);
    const quotaMax = SEGMENT_PLAN.reduce((total, segment) => total + segment.plannedMax, 0);
    if (quotaMin !== funnel.totals.plannedMin || quotaMax !== funnel.totals.plannedMax) {
      require(Array.isArray(status.planningInconsistencies) &&
        status.planningInconsistencies.length >
          0, `planned totals 40-80 are not derivable from the segment quotas (${quotaMin}-${quotaMax}); the mismatch must stay recorded in planningInconsistencies`);
      for (const entry of status.planningInconsistencies) {
        require(isNonEmptyString(entry.id) &&
          isNonEmptyString(
            entry.description,
          ), 'planningInconsistencies entries need id/description');
      }
      require(/(?:quota|37|40|57|80)/i.test(
        JSON.stringify(status.planningInconsistencies),
      ), 'planningInconsistencies must describe the quota/total mismatch');
    }
  });

  check('CR-34', 'Governance invariants mirror MC-09 and nothing was weakened', () => {
    const mc09 = readJson(`${MV_DATA}/governance-status.json`);
    const mc10 = readJson(`${DATA}/governance-status.json`);
    for (const [key, expected] of Object.entries(GOVERNANCE_INVARIANTS)) {
      require(mc09.statuses[key] ===
        expected, `MC-09 governance ${key} changed to ${JSON.stringify(mc09.statuses[key])}`);
      require(mc10.statuses[key] ===
        expected, `MC-10 ${key} must stay ${JSON.stringify(expected)}, found ${JSON.stringify(mc10.statuses[key])}`);
    }
    for (const [key, expected] of Object.entries(MC10_EXTRA_INVARIANTS)) {
      require(mc10.statuses[key] ===
        expected, `MC-10 ${key} must be ${JSON.stringify(expected)}, found ${JSON.stringify(mc10.statuses[key])}`);
    }
    require(JSON.stringify(mc10.canonicalProducts) ===
      JSON.stringify(CANONICAL_PRODUCTS), 'canonicalProducts must keep contract order');
    require(JSON.stringify(mc10.canonicalBundles) ===
      JSON.stringify(CANONICAL_BUNDLES), 'canonicalBundles must keep contract order');
    require(JSON.stringify(mc09.canonicalProducts) ===
      JSON.stringify(CANONICAL_PRODUCTS), 'MC-09 canonicalProducts changed');
    require(JSON.stringify(mc09.canonicalBundles) ===
      JSON.stringify(CANONICAL_BUNDLES), 'MC-09 canonicalBundles changed');
    require(Array.isArray(mc10.mc10Changes) &&
      mc10.mc10Changes.length === 0, 'MC-10 cannot record a governance change');
    require(mc10.customerEvidenceStatus.customerDemandMeasured ===
      false, 'customer demand cannot be measured');
    require(mc10.customerEvidenceStatus.wtpObserved === false, 'WTP cannot be observed');
  });

  check(
    'CR-35',
    'Product evidence keeps the canonical nine, MC-09 order and NOT_TESTED status',
    () => {
      const file = readJson(`${DATA}/product-evidence.json`);
      const mc09 = readJson(`${MV_DATA}/product-assessments.json`);
      const mc09Scores = new Map(
        mc09.families.map((family) => [family.familyId, family.commercialScore]),
      );
      require(file.products.length === 9, 'product evidence must cover nine families');
      for (const [index, product] of file.products.entries()) {
        const expected = MC09_PRODUCT_ORDER[index];
        require(product.family ===
          expected.subject, `product ${index} must be ${expected.subject}`);
        require(product.mc09Rank ===
          expected.mc09Rank, `${product.family}: mc09Rank must be ${expected.mc09Rank}`);
        require(closeTo(
          product.mc09Score,
          expected.mc09Score,
        ), `${product.family}: mc09Score must be ${expected.mc09Score}`);
        require(closeTo(
          mc09Scores.get(product.family),
          expected.mc09Score,
        ), `${product.family}: MC-09 score changed`);
        require(product.primaryEvidenceStatus ===
          'NOT_TESTED', `${product.family}: evidence status must be NOT_TESTED`);
        for (const field of [
          'participants',
          'purchaseHistoryEvidence',
          'comprehensionEvidence',
          'pricingEvidence',
          'installerChannelEvidence',
          'counterevidence',
        ]) {
          require(product[field] === 0, `${product.family}: ${field} must be 0`);
        }
        require(product.evidenceQuality ===
          'NONE', `${product.family}: evidenceQuality must be NONE`);
        require(product.recommendation ===
          'NOT_TESTED', `${product.family}: recommendation must be NOT_TESTED`);
        require(product.readinessUnchanged ===
          true, `${product.family}: readinessUnchanged must be true`);
        require(isNonEmptyArray(
          product.remainingUnknowns,
        ), `${product.family}: remainingUnknowns must be explicit`);
        require(isNonEmptyString(
          product.nextValidationStep,
        ), `${product.family}: nextValidationStep missing`);
      }
      require(file.aggregate.tested === 0 &&
        file.aggregate.withPrimaryEvidence === 0, 'product aggregate must stay untested');
      require(file.aggregate.readinessUpgrades ===
        0, 'no product readiness upgrade may be recorded');
      require(JSON.stringify([...file.products.map((product) => product.family)].sort()) ===
        JSON.stringify(
          [...CANONICAL_PRODUCTS].sort(),
        ), 'product families must be the canonical nine');
    },
  );

  check(
    'CR-36',
    'Bundle evidence keeps the canonical six, MC-09 order and NOT_TESTED status',
    () => {
      const file = readJson(`${DATA}/bundle-evidence.json`);
      const mc09 = readJson(`${MV_DATA}/bundle-assessments.json`);
      const mc09Scores = new Map(
        mc09.bundles.map((bundle) => [bundle.bundleId, bundle.commercialScore]),
      );
      require(file.bundles.length === 6, 'bundle evidence must cover six bundles');
      for (const [index, bundle] of file.bundles.entries()) {
        const expected = MC09_BUNDLE_ORDER[index];
        require(bundle.bundle === expected.subject, `bundle ${index} must be ${expected.subject}`);
        require(bundle.mc09Rank ===
          expected.mc09Rank, `${bundle.bundle}: mc09Rank must be ${expected.mc09Rank}`);
        require(closeTo(
          bundle.mc09Score,
          expected.mc09Score,
        ), `${bundle.bundle}: mc09Score must be ${expected.mc09Score}`);
        require(closeTo(
          mc09Scores.get(bundle.bundle),
          expected.mc09Score,
        ), `${bundle.bundle}: MC-09 score changed`);
        require(bundle.primaryEvidenceStatus ===
          'NOT_TESTED', `${bundle.bundle}: evidence status must be NOT_TESTED`);
        for (const field of [
          'participants',
          'purchaseHistoryEvidence',
          'comprehensionEvidence',
          'pricingEvidence',
          'installerChannelEvidence',
          'counterevidence',
        ]) {
          require(bundle[field] === 0, `${bundle.bundle}: ${field} must be 0`);
        }
        require(bundle.evidenceQuality ===
          'NONE', `${bundle.bundle}: evidenceQuality must be NONE`);
        require(bundle.recommendation ===
          'NOT_TESTED', `${bundle.bundle}: recommendation must be NOT_TESTED`);
        require(bundle.readinessUnchanged ===
          true, `${bundle.bundle}: readinessUnchanged must be true`);
        require(isNonEmptyArray(
          bundle.remainingUnknowns,
        ), `${bundle.bundle}: remainingUnknowns must be explicit`);
        require(isNonEmptyString(
          bundle.nextValidationStep,
        ), `${bundle.bundle}: nextValidationStep missing`);
      }
      require(file.aggregate.tested === 0 &&
        file.aggregate.withPrimaryEvidence === 0, 'bundle aggregate must stay untested');
      require(file.aggregate.readinessUpgrades ===
        0, 'no bundle readiness upgrade may be recorded');
      require(JSON.stringify([...file.bundles.map((bundle) => bundle.bundle)].sort()) ===
        JSON.stringify([...CANONICAL_BUNDLES].sort()), 'bundles must be the canonical six');
    },
  );

  check('CR-37', 'No commercial CTA, publication or availability claim appears in MC-10', () => {
    const violations = scanDocuments(PROHIBITED_CLAIM_RULES, { skipNegated: true });
    require(violations.length ===
      0, `prohibited commercial claims: ${violations.slice(0, 5).join(' | ')}`);
    const fieldViolations = scanJsonFields((key, value, where) => {
      if (
        !/^(?:commercialAvailability|availability|priceApproved|approvalStatus|priceStatus|publicationStatus|salesStatus)$/i.test(
          key,
        )
      )
        return null;
      if (typeof value === 'boolean' && value === true) return `${where} cannot be true`;
      if (
        typeof value === 'string' &&
        /^(?:AVAILABLE|FOR_SALE|IN_STOCK|APPROVED|AUTHORIZED|LIVE|PUBLISHED|ON_SALE)$/.test(value)
      ) {
        return `${where} = ${value}`;
      }
      return null;
    });
    require(fieldViolations.length ===
      0, `availability fields weakened: ${fieldViolations.slice(0, 5).join(', ')}`);
  });

  check('CR-38', 'No sale, pilot, distribution or price-approval claim is made', () => {
    const rules = PROHIBITED_CLAIM_RULES.filter((rule) =>
      [
        'price-approved',
        'distribution-signed',
        'pilot-agreed',
        'letter-of-intent',
        'trademark-cleared',
        'shipping-now',
      ].includes(rule.id),
    );
    const violations = scanDocuments(rules, { skipNegated: true });
    require(violations.length === 0, `commercial claims: ${violations.slice(0, 5).join(' | ')}`);
    for (const doc of [
      `${CD}/MC10-DECISION-REGISTER.md`,
      `${CD}/MC10-EXPERIMENT-RESULTS.md`,
      `${REVIEW}/MC-10-REVIEW.md`,
    ]) {
      if (!exists(doc)) continue;
      require(!/"(?:priceApproved|approvalStatus)"\s*:\s*(?:true|"APPROVED")/i.test(
        read(doc),
      ), `${doc}: price approval claim`);
    }
  });

  check('CR-39', 'No fixed offer price is presented as a purchasable price', () => {
    const violations = scanDocuments(OFFER_PRICE_RULES, {
      skipNegated: true,
      allowed: OFFER_PRICE_ALLOWED,
    });
    require(violations.length ===
      0, `unapproved offer prices: ${violations.slice(0, 5).join(' | ')}`);
  });

  check('CR-40', 'The independent review exists as a required deliverable (D25)', () => {
    require(exists(
      REVIEW_DOC,
    ), `required review missing: ${REVIEW_DOC} (D25 review pending, auditor blocked by task dependencies)`);
    require(exists(
      REVIEW_FINDINGS,
    ), `required machine-readable review findings missing: ${REVIEW_FINDINGS}`);
    const text = read(REVIEW_DOC);
    require(/(?:PASS|PARTIAL|BLOCKED|FAIL)/.test(
      text,
    ), 'review must state a PASS/PARTIAL/BLOCKED/FAIL verdict');
    require(text.length > 1500, 'review document is too short to be an independent audit');
  });

  check('CR-41', 'Independent review findings are machine-readable and complete', () => {
    const findings = readJson(REVIEW_FINDINGS);
    require(isNonEmptyArray(findings.findings), 'review findings must be recorded');
    const severity = ['BLOCKING', 'MAJOR', 'MINOR', 'INFORMATIONAL'];
    for (const finding of findings.findings) {
      require(/^F-\d{2,3}$/.test(
        finding.findingId || '',
      ), `invalid findingId ${finding.findingId}`);
      require(severity.includes(
        finding.severity,
      ), `${finding.findingId}: invalid severity ${finding.severity}`);
      require(['OPEN', 'CLOSED'].includes(
        finding.status,
      ), `${finding.findingId}: invalid status ${finding.status}`);
      require(isNonEmptyString(finding.evidence), `${finding.findingId}: evidence missing`);
      require(isNonEmptyString(finding.remediation), `${finding.findingId}: remediation missing`);
    }
  });

  check('CR-42', 'The review does not issue a primary-research PASS', () => {
    require(exists(REVIEW_DOC), 'review missing, cannot verify its verdict');
    const text = read(REVIEW_DOC);
    require(/(?:no|not|never)\b[\s\S]{0,90}\bpass\b[\s\S]{0,90}\b(?:primary|customer)\b/i.test(
      text,
    ) ||
      /\bpass\b[\s\S]{0,90}\b(?:not|never)\b[\s\S]{0,60}\b(?:issued|awarded|given)\b/i.test(text) ||
      /(?:primary|qualitative)\s+(?:customer\s+)?research[\s\S]{0,140}\bBLOCKED\b/i.test(
        text,
      ), 'review must explicitly refuse a primary-research PASS (no research was executed)');
    require(/BLOCKED/.test(text), 'review must record the BLOCKED fieldwork state');
  });

  check('CR-43', 'Required documents carry the NOT_EXECUTED/BLOCKED banner', () => {
    const missing = [];
    for (const doc of RESULTS_DOCS) {
      require(exists(doc), `results document missing: ${doc}`);
      const text = read(doc);
      if (!/(?:NOT[ _]EXECUTED|BLOCKED|NOT_TESTED)/.test(text)) missing.push(doc);
    }
    require(missing.length === 0, `documents without a blocked banner: ${missing.join(', ')}`);
    const d17 = read(`${CD}/MC10-EXPERIMENT-RESULTS.md`);
    require(/NOT[ _]EXECUTED/.test(d17), 'experiment results must state NOT_EXECUTED');
  });

  check('CR-44', 'No document states a positive completed participant count', () => {
    const violations = scanDocuments(POSITIVE_COUNT_RULES, {
      skipNegated: true,
      skipThreshold: true,
    });
    require(violations.length ===
      0, `fabricated participant counts: ${violations.slice(0, 5).join(' | ')}`);
    const status = safetyStatus();
    require(status.fieldworkExecuted === false, 'fieldworkExecuted must stay false');
  });

  check('CR-45', 'No unreviewed translation is claimed as equivalent', () => {
    const violations = scanDocuments(TRANSLATION_CLAIM_RULES, { skipNegated: true });
    require(violations.length ===
      0, `translation equivalence claims: ${violations.slice(0, 5).join(' | ')}`);
    const instruments = tryJson(`${CD}/methodology/instruments.json`);
    if (instruments.ok) {
      for (const instrument of instruments.value.instruments || []) {
        require(instrument.review &&
          instrument.review.equivalenceClaim ===
            'NOT_ESTABLISHED', `${instrument.instrumentId}: translation equivalence cannot be established`);
      }
    }
  });

  check('CR-46', 'No PII, contact data, audio or transcript enters the repository', () => {
    const targets = [...docFiles(), ...dataFileNames().map((file) => `${DATA}/${file}`)];
    const instruments = `${CD}/methodology/instruments.json`;
    if (exists(instruments)) targets.push(instruments);
    const violations = [];
    for (const target of targets) {
      if (!exists(target)) continue;
      const text = read(target);
      for (const rule of PII_RULES) {
        const match = text.match(rule.re);
        if (match) violations.push(`${target}: ${rule.id} -> "${match[0].slice(0, 60)}"`);
      }
    }
    require(violations.length === 0, `PII patterns found: ${violations.slice(0, 5).join(' | ')}`);
    const fieldViolations = scanJsonFields((key, value, where) => {
      if (FORBIDDEN_FIELD_NAMES.has(String(key).toLowerCase()) && value !== null && value !== '') {
        return `${where} carries the forbidden personal field ${key}`;
      }
      return null;
    });
    const instrumentsFieldViolations = (() => {
      if (!exists(instruments)) return [];
      const out = [];
      const value = JSON.parse(read(instruments));
      walkJson(value, (node, path) => {
        if (!node || typeof node !== 'object') return;
        for (const [key, child] of Object.entries(node)) {
          if (
            FORBIDDEN_FIELD_NAMES.has(String(key).toLowerCase()) &&
            child !== null &&
            child !== ''
          ) {
            out.push(`${instruments}:${path}.${key} carries the forbidden personal field`);
          }
        }
      });
      return out;
    })();
    require(fieldViolations.length + instrumentsFieldViolations.length ===
      0, `forbidden personal-data fields: ${[...fieldViolations, ...instrumentsFieldViolations].slice(0, 5).join(', ')}`);
    const banned = targets.filter((target) => /\.(?:wav|mp3|m4a|ogg|flac|vtt|srt)$/i.test(target));
    require(banned.length === 0, `audio/transcript files present: ${banned.join(', ')}`);
  });

  check('CR-47', 'No participant data exists under src/, public/ or deploy/', () => {
    const filenameRule =
      /(?:participant|interview-record|consent-record|pricing-response|research-participant|transcript|audio-recording)/i;
    const offending = [];
    for (const dir of APP_LAYER_DIRS) {
      for (const file of walk(dir, () => true)) {
        if (filenameRule.test(file)) {
          offending.push(`${file} (filename)`);
          continue;
        }
        if (!APP_TEXT_EXTENSION.test(file) || !exists(file)) continue;
        const text = read(file);
        const marker = APP_PARTICIPANT_MARKERS.find((rule) => rule.test(text));
        if (marker) offending.push(`${file} (participant field content)`);
      }
    }
    require(offending.length ===
      0, `participant data outside the research layer: ${offending.slice(0, 5).join(', ')}`);
  });

  check('CR-48', 'Synthetic fixtures are marked and excluded from the real tree', () => {
    const tagged = scanJsonFields((key, value, where) => {
      if (key === 'testingFixture' && value === true)
        return `${where} is a fixture record in the real tree`;
      return null;
    });
    require(tagged.length ===
      0, `fixture records in the real data layer: ${tagged.slice(0, 5).join(', ')}`);
    const manifest = readJson(`${DATA}/manifest.json`);
    require(manifest.fixtureExclusion &&
      manifest.fixtureExclusion.realTreeFixtureRecords ===
        0, 'manifest must record zero fixture records in the real tree');
    const quality = readJson(`${DATA}/data-quality.json`);
    require(quality.fixturesExcludedFromTotals === true, 'fixturesExcludedFromTotals must be true');
  });

  check('CR-49', 'The milestone reports BLOCKED honestly and never a primary-research PASS', () => {
    const status = readJson(`${DATA}/research-status.json`);
    require(status.milestoneStatus === 'BLOCKED', 'milestoneStatus must be BLOCKED');
    const verdict = scanDocuments(VERDICT_CLAIM_RULES, { skipNegated: true, skipThreshold: true });
    require(verdict.length ===
      0, `fabricated research verdicts: ${verdict.slice(0, 5).join(' | ')}`);
    const passRules = [
      {
        id: 'primary-pass',
        re: /\bPASS\b[\s\S]{0,100}\b(?:primary research|primary customer research|primary customer-discovery|investigaci[oó]n primaria)\b/i,
      },
    ];
    const passViolations = scanDocuments(passRules, { skipNegated: true });
    require(passViolations.length ===
      0, `primary-research PASS claims: ${passViolations.slice(0, 5).join(' | ')}`);
    const delivery = `${CD}/MC-10-DELIVERY.md`;
    if (exists(delivery)) {
      const text = read(delivery);
      require(/BLOCKED/.test(text), 'delivery record must state BLOCKED');
      require(/NOT[ _]EXECUTED/.test(text), 'delivery record must state NOT_EXECUTED');
    }
    const executive = `${CD}/MC10-EXECUTIVE-REPORT.md`;
    if (exists(executive)) {
      const text = read(executive);
      require(/BLOCKED|BLOQUEAD/i.test(text), 'executive report must state the blocked state');
    }
  });

  check('CR-50', 'Decisions D-029 to D-033 are recorded and approve nothing', () => {
    const file = readJson(`${DATA}/decisions.json`);
    require(file.milestone === MILESTONE, 'decisions milestone must be MC-10');
    require(file.decisions.length === 5, 'exactly five MC-10 decisions must be recorded');
    const expected = ['D-029', 'D-030', 'D-031', 'D-032', 'D-033'];
    const ids = file.decisions.map((decision) => decision.decisionId);
    require(JSON.stringify(ids) ===
      JSON.stringify(expected), `decision ids must be ${expected.join(',')}`);
    for (const decision of file.decisions) {
      require(isIsoDate(decision.date), `${decision.decisionId}: date must be ISO`);
      require(decision.status === 'IN_FORCE', `${decision.decisionId}: status must be IN_FORCE`);
      require(isNonEmptyString(decision.title), `${decision.decisionId}: title missing`);
      require(isNonEmptyString(decision.summary), `${decision.decisionId}: summary missing`);
      require(isNonEmptyString(
        decision.statusEffect,
      ), `${decision.decisionId}: statusEffect missing`);
      require(isNonEmptyArray(
        decision.evidence,
      ), `${decision.decisionId}: evidence references missing`);
    }
    const register = `${CD}/MC10-DECISION-REGISTER.md`;
    if (exists(register)) {
      const text = read(register);
      for (const id of expected) require(text.includes(id), `decision register must record ${id}`);
    }
  });

  check('CR-51', 'The frozen MC-09 experiment registry is complete and unmodified', () => {
    const registry = readJson(`${MV_DATA}/validation-experiments.json`);
    require(/^MAREA-MC09/.test(registry.contractId || ''), 'MC-09 registry contractId changed');
    require(registry.milestone === 'MC-09', 'MC-09 registry milestone changed');
    require(registry.experiments.length === 10, 'MC-09 registry must keep ten experiments');
    const ids = registry.experiments.map((experiment) => experiment.experimentId);
    require(JSON.stringify(ids) === JSON.stringify(EXPERIMENT_IDS), 'MC-09 experiment ids changed');
    for (const experiment of registry.experiments) {
      for (const field of [
        'hypothesis',
        'segment',
        'recruitment',
        'minimumEvidence',
        'decisionThreshold',
        'limitations',
        'ethics',
        'interpretation',
      ]) {
        require(isNonEmptyString(
          experiment[field],
        ), `${experiment.experimentId}: MC-09 ${field} missing`);
      }
      require(experiment.executed === false ||
        experiment.executed ===
          undefined, `${experiment.experimentId}: MC-09 cannot claim execution`);
    }
  });

  check('CR-52', 'Canonical product and bundle contracts were not weakened', () => {
    const productPaths = [
      'docs/marea/products/product-definitions.batch-01.json',
      'docs/marea/products/product-definitions.batch-02.json',
      'docs/marea/products/product-definitions.batch-03.json',
    ];
    const products = productPaths.flatMap((path) => readJson(path).products);
    require(products.length === 9, `expected nine canonical products, found ${products.length}`);
    for (const product of products) {
      require(product.lifecycleState === 'DEFINED', `${product.id}: lifecycleState changed`);
      const availability = product.readiness?.availability;
      const state = typeof availability === 'string' ? availability : availability?.status;
      require(state === 'NOT_FOR_SALE', `${product.id}: availability changed from NOT_FOR_SALE`);
    }
    const contract = readJson('docs/marea/bundles/bundle-definitions.json');
    require(contract.bundles.length === 6, 'expected six canonical bundles');
    for (const bundle of contract.bundles) {
      require(bundle.definitionState ===
        'COMPLETE_TARGET_SPECIFICATION', `${bundle.id}: definitionState changed`);
      require(bundle.commercialAvailability ===
        'NOT_FOR_SALE', `${bundle.id}: commercialAvailability changed`);
    }
    const restrictions = contract.globalRestrictions;
    require(restrictions.trademarkLegalClearance ===
      'NOT_GRANTED', 'trademarkLegalClearance weakened');
    require(restrictions.sourceIpClearance === 'NOT_CLEARED', 'sourceIpClearance weakened');
    require(restrictions.remoteHelmControl === 'PROHIBITED', 'remoteHelmControl weakened');
    require(restrictions.hardwareIncludedByDefault === false, 'hardwareIncludedByDefault weakened');
    require(!/"(?:commercialAvailability|availability)"\s*:\s*"(?:AVAILABLE|FOR_SALE|IN_STOCK)"/.test(
      read('docs/marea/bundles/bundle-definitions.json'),
    ), 'bundle availability weakened');
  });

  check('CR-53', 'The instrument freeze record is intact and refuses a translation claim', () => {
    const path = `${CD}/methodology/instruments.json`;
    require(exists(path), 'methodology/instruments.json missing');
    const instruments = readJson(path);
    require(instruments.milestone === MILESTONE, 'instruments milestone must be MC-10');
    require(instruments.owner ===
      'agent-a-methodologist', 'instruments owner must be the methodologist');
    require(isIsoDate(instruments.frozenAt), 'instruments frozenAt must be an ISO date');
    require(isNonEmptyString(instruments.sourceDocument), 'instruments sourceDocument missing');
    if (exists(instruments.sourceDocument)) {
      const sourcePath = instruments.sourceDocument;
      const asText = sha256(read(sourcePath));
      const asBuffer = createHash('sha256')
        .update(readFileSync(abs(sourcePath)))
        .digest('hex');
      require(instruments.sourceSha256 === asText ||
        instruments.sourceSha256 ===
          asBuffer, 'instrument sourceSha256 does not recompute from the frozen source document');
    }
    require(isNonEmptyArray(instruments.instruments), 'instruments[] missing');
    const required = [
      'SCREEN-01',
      'CONSENT-01',
      'GUIDE-01',
      'PRICE-01',
      'NOTE-01',
      'SCHEMA-01',
      'ANA-01',
    ];
    const seen = instruments.instruments.map((instrument) => instrument.instrumentId);
    for (const id of required)
      require(seen.includes(id), `instrument ${id} missing from the freeze record`);
    for (const instrument of instruments.instruments) {
      require(/^1\.0\.0$/.test(
        instrument.version || '',
      ), `${instrument.instrumentId}: version must be 1.0.0`);
      require(Array.isArray(instrument.languages) &&
        instrument.languages.includes('ES') &&
        instrument.languages.includes(
          'EN',
        ), `${instrument.instrumentId}: ES and EN must be frozen`);
      require(instrument.portugueseStatus ===
        'NOT_PRODUCED', `${instrument.instrumentId}: PT instruments must be NOT_PRODUCED`);
      require(instrument.status ===
        'FROZEN_PENDING_AUTHORIZATION', `${instrument.instrumentId}: status must be FROZEN_PENDING_AUTHORIZATION`);
      require(isNonEmptyString(instrument.sourceSha256) &&
        /^[0-9a-f]{64}$/.test(
          instrument.sourceSha256,
        ), `${instrument.instrumentId}: sourceSha256 missing`);
      require(instrument.review &&
        instrument.review.structuralReview ===
          'COMPLETE', `${instrument.instrumentId}: structural review missing`);
      require(instrument.review.qualifiedTranslationSignOff ===
        'NOT_OBTAINED', `${instrument.instrumentId}: qualified translation sign-off must be NOT_OBTAINED`);
      require(instrument.review.equivalenceClaim ===
        'NOT_ESTABLISHED', `${instrument.instrumentId}: equivalence cannot be established`);
    }
  });

  check(
    'CR-54',
    'The frozen price ladders are pre-registered hypotheses with no approved price',
    () => {
      const ladders = pricingLadders();
      require(ladders.milestone === MILESTONE, 'pricing-ladders milestone must be MC-10');
      require(ladders.owner ===
        'agent-e-pricing', 'pricing-ladders owner must be the pricing specialist');
      require(ladders.status ===
        'PRE_REGISTERED_HYPOTHESIS', 'ladders must be PRE_REGISTERED_HYPOTHESIS');
      require(ladders.approvedPrice === false, 'no ladder may be an approved price');
      require(ladders.administered === false, 'ladders must be unadministered');
      require(Array.isArray(ladders.responses) &&
        ladders.responses.length === 0, 'ladders cannot hold responses');
      require(isIsoDate(ladders.frozenAt), 'ladders frozenAt must be ISO');
      require(ladders.constructs.length === 2, 'exactly two constructs must be frozen');
      const ids = ladders.constructs.map((construct) => construct.constructId);
      require(JSON.stringify(ids) ===
        JSON.stringify(['CONSTRUCT-01', 'CONSTRUCT-02']), 'construct ids must be CONSTRUCT-01/02');
      for (const construct of ladders.constructs) {
        require(/^[A-Z]{3}$/.test(
          construct.currency || '',
        ), `${construct.constructId}: currency missing`);
        require(isNonEmptyString(
          construct.vatTreatment,
        ), `${construct.constructId}: VAT treatment missing`);
        require(isNonEmptyString(
          construct.descriptionOfConcept,
        ), `${construct.constructId}: neutral concept description missing`);
        require(construct.ladder.length ===
          5, `${construct.constructId}: ladder must have five points`);
        const amounts = construct.ladder.map((point) => point.amount);
        for (let index = 0; index < amounts.length; index += 1) {
          require(isFiniteNumber(amounts[index]) &&
            amounts[index] > 0, `${construct.constructId}: ladder amount must be positive`);
          if (index > 0)
            require(amounts[index] >
              amounts[index - 1], `${construct.constructId}: ladder must be strictly ascending`);
          require(construct.ladder[index].pointIndex ===
            index + 1, `${construct.constructId}: pointIndex must be 1..5`);
        }
        require(construct.vanWestendorpQuestions.length ===
          4, `${construct.constructId}: four Van Westendorp questions required`);
        require(construct.buyResponseScale.length ===
          5, `${construct.constructId}: five-point buy-response scale required`);
        require(isNonEmptyArray(
          construct.provenance,
        ), `${construct.constructId}: ladder provenance missing`);
        for (const provenance of construct.provenance) {
          require(isNonEmptyString(
            provenance.derivationNote,
          ), `${construct.constructId}: provenance derivationNote missing`);
          require(isNonEmptyString(
            provenance.rationale,
          ), `${construct.constructId}: provenance rationale missing`);
        }
      }
      require(!/"(?:approvedPrice|priceApproved)"\s*:\s*true/.test(
        read(`${DATA}/pricing-ladders.json`),
      ), 'no price may be approved');
    },
  );

  check('CR-55', 'The pricing-response register matches the frozen ladder reference', () => {
    const responses = readJson(`${DATA}/pricing-responses.json`);
    const ladders = pricingLadders();
    require(responses.ladderReference, 'pricing-responses must reference the frozen ladders');
    require(responses.ladderReference.path ===
      `${DATA}/pricing-ladders.json`, 'ladderReference path mismatch');
    require(responses.ladderReference.contractVersion ===
      ladders.contractVersion, 'ladderReference version mismatch');
    require(responses.ladderReference.frozenAt ===
      ladders.frozenAt, 'ladderReference frozenAt mismatch');
    require(responses.ladderReference.status === ladders.status, 'ladderReference status mismatch');
    require(responses.administered === ladders.administered, 'administered flags must agree');
    require(isNonEmptyArray(responses.requiredResponseFields), 'pricing response schema missing');
    require(/never coerced to zero|never coerce/i.test(
      responses.unknownHandling || '',
    ), 'unknown-handling rule must forbid treating unknown as zero');
  });

  check('CR-56', 'Outreach templates exist, are NOT_APPROVED and were never sent', () => {
    const path = `${CD}/recruitment/MC10-OUTREACH-TEMPLATES.md`;
    require(exists(path), 'outreach templates document missing');
    const text = read(path);
    require(/NOT_APPROVED/.test(text), 'templates must be marked NOT_APPROVED');
    require(/NOT_SENT/.test(text), 'templates must be marked NOT_SENT');
    require(/AUTH-MC10-001/.test(text), 'templates must reference the authorization record');
    require(/GRANTED/.test(text), 'templates must state the gate condition');
    for (const rule of PROHIBITED_CLAIM_RULES.filter((candidate) =>
      ['available-for-sale', 'price-approved', 'shipping-now'].includes(candidate.id),
    )) {
      const re = new RegExp(rule.re.source, `${rule.re.flags.replace('g', '')}g`);
      for (const match of text.matchAll(re)) {
        const clause = clauseAround(text, match.index, match[0].length);
        require(NEGATION_TOKENS.test(
          clause,
        ), `outreach template makes a commercial claim: ${rule.id}`);
      }
    }
  });

  check('CR-57', 'The data contract documents every data file and the check families', () => {
    require(exists(CONTRACT_DOC), 'data-contract document missing');
    const doc = read(CONTRACT_DOC);
    for (const file of REQUIRED_DATA_FILES) {
      require(doc.includes(file), `data contract is missing the ${file} schema`);
    }
    for (const family of [
      'CR-01',
      'CR-06',
      'CR-13',
      'CR-19',
      'CR-25',
      'CR-29',
      'CR-33',
      'CR-37',
      'CR-40',
      'CR-43',
      'CR-46',
      'CR-49',
      'CR-53',
      'CR-57',
      'CR-62',
    ]) {
      require(doc.includes(family), `data contract must list check family ${family}`);
    }
  });

  check('CR-58', 'The review is owned by an independent auditor, not an author', () => {
    const manifest = readJson(`${DATA}/manifest.json`);
    const reviewDeliverable = (manifest.deliverables || []).find((entry) => entry.id === 'D25');
    require(reviewDeliverable, 'manifest must declare D25');
    require(reviewDeliverable.owner ===
      'agent-g-auditor', 'D25 must be owned by the independent auditor');
    const implementationOwners = new Set(
      (manifest.deliverables || [])
        .filter((entry) => entry.id !== 'D25')
        .map((entry) => entry.owner),
    );
    require(!implementationOwners.has(
      reviewDeliverable.owner,
    ), 'the reviewer must not be an author of the reviewed scope');
  });

  check('CR-59', 'The executive report is Spanish and reports the blocked state', () => {
    const path = `${CD}/MC10-EXECUTIVE-REPORT.md`;
    require(exists(path), 'Spanish executive report missing');
    const text = read(path);
    require(/[áéíóúñ¿¡]/i.test(text), 'executive report does not look Spanish');
    require(/BLOCKED|BLOQUEAD/i.test(text), 'executive report must state the blocked state');
    require(/(?:0|cero|ninguna|ningún|ningun)\b[^.\n]{0,60}\b(?:entrevista|participante|respuesta|entrevistas|participantes)/i.test(
      text,
    ), 'executive report must state that zero participants/interviews exist');
    const passRules = [
      {
        id: 'primary-pass',
        re: /\bPASS\b[^.\n]{0,80}\b(?:primary research|primary customer research|investigaci[oó]n primaria)\b/i,
      },
    ];
    const violations = scanDocuments(passRules, { docs: [path], skipNegated: true });
    require(violations.length === 0, 'executive report cannot claim a primary-research PASS');
  });

  check(
    'CR-60',
    'The MC-11 handoff separates blocked customer questions from hardware work',
    () => {
      const path = `${CD}/MC10-MC11-HANDOFF.md`;
      require(exists(path), 'MC-11 handoff missing');
      const text = read(path);
      require(/AUTH-MC10-001|MC10-FIELDWORK-AUTHORIZATION/.test(
        text,
      ), 'handoff must reference the authorization gate');
      require(/NOT_GRANTED|BLOCKED/.test(text), 'handoff must record that fieldwork is blocked');
      require(/BLOCKED/.test(text), 'handoff must preserve the blocked customer-evidence state');
      require(/MC-11/.test(text), 'handoff must be addressed to MC-11');
      require(!/\b(?:pilot|trial)\b[^.\n]{0,40}\b(?:agreed|signed|completed)\b/i.test(
        text,
      ), 'handoff cannot claim an agreed pilot or trial');
    },
  );

  check('CR-61', 'The delivery record is honest and reproducible', () => {
    const path = `${CD}/MC-10-DELIVERY.md`;
    require(exists(path), 'delivery record missing (D28)');
    const text = read(path);
    require(/BLOCKED/.test(text), 'delivery record must state the milestone BLOCKED');
    require(/NOT[ _]EXECUTED/.test(text), 'delivery record must state fieldwork NOT_EXECUTED');
    require(/check-marea-customer-research/.test(
      text,
    ), 'delivery record must name the validator command');
    require(/9d206cc/.test(text), 'delivery record must record the verified base commit');
    require(/D25|REVIEW/i.test(text), 'delivery record must record the independent review status');
  });

  return checks;
}

function main() {
  const args = process.argv.slice(2);
  let root = DEFAULT_ROOT;
  let jsonMode = false;
  for (let index = 0; index < args.length; index += 1) {
    if (args[index] === '--root') root = resolve(args[index + 1] || '');
    else if (args[index] === '--json') jsonMode = true;
  }
  const checks = buildRunner(root);
  const failed = checks.filter((entry) => entry.status === 'FAIL');
  if (jsonMode) {
    process.stdout.write(
      `${JSON.stringify(
        {
          milestone: 'MC-10',
          total: checks.length,
          passed: checks.length - failed.length,
          failed: failed.length,
          checks,
        },
        null,
        2,
      )}\n`,
    );
  } else {
    for (const entry of checks) {
      if (entry.status === 'FAIL')
        process.stderr.write(`FAIL ${entry.id} ${entry.description}\n     ${entry.detail}\n`);
    }
    const summary = `MC-10 customer research validation: ${checks.length - failed.length}/${checks.length} checks passed`;
    process.stdout.write(`${summary}\n`);
    if (failed.length > 0)
      process.stdout.write(`FAILED: ${failed.map((entry) => entry.id).join(', ')}\n`);
  }
  process.exit(failed.length === 0 ? 0 : 1);
}

main();
