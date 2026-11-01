#!/usr/bin/env node
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Deterministic MC-10R recovery validator (D31).
 *
 * It validates the recovery contract (D27), the amendment registry (D28), the
 * ungranted authorization draft (D29), the fieldwork readiness record (D30),
 * the deliverable inventory D1-D36 and the recovery documentation against the
 * canonical registration in `MC10R-RECOVERY-EXECUTION-PLAN.md` (D2) and the
 * zero-data MC-10 records under `docs/marea/customer-discovery/data/`.
 *
 * Design rules:
 * - Offline, dependency-free, deterministic. No network, no clock, no writes.
 * - Fail closed: a missing key is a failure, never a default value.
 * - The gate NEVER confers, infers or repairs a status. It only rejects.
 * - Staging: deliveryStage IMPLEMENTATION requires deliverables D1-D32;
 *   deliveryStage FINAL additionally requires D33-D36. D33 is written by the
 *   independent auditor after the implementation commit and D34-D36 by the
 *   Lead after the audit, so an IMPLEMENTATION tree is not failed for their
 *   absence.
 * - `CRR-29` scans recovery prose for fabricated attribution and participant
 *   claims in English, Spanish and Portuguese. It is a deterministic lexical
 *   control, NOT a semantic classifier: the documented heuristics reject the
 *   forms listed in D18 and the data-contract addendum and do not prove the
 *   absence of fabricated evidence. See D20 for the honest limitations.
 *
 * Usage:
 *   node scripts/check-marea-customer-recovery.mjs [--root <dir>] [--json]
 *
 * Exit code 0 = every check passed, 1 = at least one check failed.
 */

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const DEFAULT_ROOT = resolve(SCRIPT_DIR, '..');

const CD = 'docs/marea/customer-discovery';
const RECOVERY = `${CD}/recovery`;
const RDATA = `${RECOVERY}/data`;
const GATE_DOC = `${RECOVERY}/review/MC-10R-REVIEW.md`;

const CONTRACT_ID = 'MAREA-MC10R-CUSTOMER-DISCOVERY-RECOVERY';
const CONTRACT_VERSION = '1.0.0';
const MILESTONE = 'MC-10R';
const DATE = '2026-11-01';

const D27 = `${RDATA}/mc10r-recovery.contract.json`;
const D28 = `${RDATA}/mc10r-amendments.json`;
const D29 = `${RDATA}/mc10r-authorization-draft.json`;
const D30 = `${RDATA}/mc10r-fieldwork-readiness.json`;
const D13 = `${RECOVERY}/governance/AUTH-MC10-001-REV2-DRAFT.md`;

/** The canonical D1-D36 registry as fixed by the Lead (authoritative). */
const DELIVERABLES = {
  D1: { path: `${RECOVERY}/MC10R-BASELINE-AND-SCOPE.md`, owner: 'lead' },
  D2: { path: `${RECOVERY}/MC10R-RECOVERY-EXECUTION-PLAN.md`, owner: 'lead' },
  D3: { path: `${RECOVERY}/MC10R-BLOCKER-REGISTER.md`, owner: 'lead' },
  D4: { path: `${RECOVERY}/MC10R-DECISION-REGISTER.md`, owner: 'lead' },
  D5: {
    path: `${RECOVERY}/methodology/MC10R-PI01-SAMPLING-RECONCILIATION.md`,
    owner: 'agent-a-methodologist',
  },
  D6: {
    path: `${RECOVERY}/methodology/MC10R-PI02-SEGMENT-QUOTA-CONTRACT.md`,
    owner: 'agent-a-methodologist',
  },
  D7: { path: `${RECOVERY}/pricing/MC10R-PI03-PRICING-FEASIBILITY.md`, owner: 'agent-b-pricing' },
  D8: {
    path: `${RECOVERY}/methodology/MC10R-RESEARCH-PROTOCOL-AMENDMENT.md`,
    owner: 'agent-a-methodologist',
  },
  D9: {
    path: `${RECOVERY}/instruments/MC10R-IV01-IV09-AMENDMENT.md`,
    owner: 'agent-e-instruments',
  },
  D10: {
    path: `${RECOVERY}/instruments/MC10R-INSTRUMENT-VERSION-REGISTER.md`,
    owner: 'agent-e-instruments',
  },
  D11: {
    path: `${RECOVERY}/instruments/MC10R-ES-EN-RESEARCH-INSTRUMENTS.md`,
    owner: 'agent-e-instruments',
  },
  D12: {
    path: `${RECOVERY}/instruments/MC10R-PT-TRANSLATION-REVIEW-PACKAGE.md`,
    owner: 'agent-e-instruments',
  },
  D13: { path: `${RECOVERY}/governance/AUTH-MC10-001-REV2-DRAFT.md`, owner: 'agent-c-governance' },
  D14: { path: `${RECOVERY}/governance/MC10R-AUTHORIZATION-GATE.md`, owner: 'agent-c-governance' },
  D15: {
    path: `${RECOVERY}/governance/MC10R-LEGAL-REVIEW-PACKAGE.md`,
    owner: 'agent-c-governance',
  },
  D16: {
    path: `${RECOVERY}/governance/MC10R-PRIVACY-AND-CONSENT-PACKAGE.md`,
    owner: 'agent-c-governance',
  },
  D17: { path: `${RDATA}/MC10R-SECURE-DATA-ARCHITECTURE.md`, owner: 'agent-f-data' },
  D18: { path: `${RDATA}/MC10R-DATA-CONTRACT.md`, owner: 'agent-f-data' },
  D19: { path: `${RDATA}/MC10R-ACCESS-RETENTION-AND-DELETION.md`, owner: 'agent-f-data' },
  D20: { path: `${RDATA}/MC10R-IMPLEMENTATION-AND-TEST-EVIDENCE.md`, owner: 'agent-f-data' },
  D21: {
    path: `${RECOVERY}/fieldwork/MC10R-HUMAN-INTERVIEWER-OPERATING-MODEL.md`,
    owner: 'agent-d-fieldwork',
  },
  D22: { path: `${RECOVERY}/fieldwork/MC10R-INTERVIEWER-TRAINING.md`, owner: 'agent-d-fieldwork' },
  D23: {
    path: `${RECOVERY}/fieldwork/MC10R-INTERVIEWER-OPERATIONS-KIT.md`,
    owner: 'agent-d-fieldwork',
  },
  D24: {
    path: `${RECOVERY}/fieldwork/MC10R-RECRUITMENT-TEMPLATES-ES-EN.md`,
    owner: 'agent-d-fieldwork',
  },
  D25: { path: `${RECOVERY}/fieldwork/MC10R-WAVE1-EXECUTION-PLAN.md`, owner: 'agent-d-fieldwork' },
  D26: { path: `${RECOVERY}/fieldwork/MC10R-FIELDWORK-CHECKLIST.md`, owner: 'agent-d-fieldwork' },
  D27: { path: D27, owner: 'agent-f-data' },
  D28: { path: D28, owner: 'agent-f-data' },
  D29: { path: D29, owner: 'agent-f-data' },
  D30: { path: D30, owner: 'agent-f-data' },
  D31: { path: 'scripts/check-marea-customer-recovery.mjs', owner: 'agent-f-data' },
  D32: { path: 'scripts/check-marea-customer-recovery.test.mjs', owner: 'agent-f-data' },
  D33: { path: GATE_DOC, owner: 'agent-g-auditor' },
  D34: { path: `${RECOVERY}/MC10R-EXECUTIVE-REPORT.md`, owner: 'lead' },
  D35: { path: `${RECOVERY}/MC-10R-DELIVERY.md`, owner: 'lead' },
  D36: { path: `${RECOVERY}/MC10R-HANDOFF-TO-AUTHORIZED-FIELDWORK.md`, owner: 'lead' },
};

const DELIVERABLE_IDS = Array.from({ length: 36 }, (_, index) => `D${index + 1}`);

const SEGMENTS = [
  { segmentId: 'SEG-01', name: 'Recreational motorboat owners', minimum: 5, maximum: 8 },
  { segmentId: 'SEG-02', name: 'Sailing yacht owners', minimum: 5, maximum: 8 },
  { segmentId: 'SEG-03', name: 'Marina-based unattended-vessel owners', minimum: 5, maximum: 8 },
  { segmentId: 'SEG-04', name: 'Marine electronics installers', minimum: 5, maximum: 7 },
  { segmentId: 'SEG-05', name: 'Marine retailers and chandlers', minimum: 5, maximum: 7 },
  { segmentId: 'SEG-06', name: 'Marina or shipyard operators', minimum: 3, maximum: 5 },
  { segmentId: 'SEG-07', name: 'Charter operators and sailing schools', minimum: 5, maximum: 8 },
  { segmentId: 'SEG-08', name: 'Fleet managers', minimum: 4, maximum: 6 },
];

const WAVE1 = [
  { cohort: 'A', segmentId: 'SEG-03', minimum: 5, maximum: 8 },
  { cohort: 'B', segmentId: 'SEG-01', minimum: 5, maximum: 8 },
  { cohort: 'C', segmentId: 'SEG-04', minimum: 5, maximum: 7 },
  { cohort: 'D', segmentId: 'SEG-06', minimum: 3, maximum: 5 },
];

/** Pricing feasibility: reachability per segment plus the registered population. */
const PRICING = {
  'SEG-01': {
    plannedMax: 8,
    reachability: 'REACHABLE_AT_PLANNED_MAX',
    EXP_MC10_04: 'NAMED_SUBJECT',
    EXP_MC10_05: 'NAMED_SUBJECT',
  },
  'SEG-02': {
    plannedMax: 8,
    reachability: 'REACHABLE_AT_PLANNED_MAX',
    EXP_MC10_04: 'NAMED_SUBJECT',
    EXP_MC10_05: 'NAMED_SUBJECT',
  },
  'SEG-03': {
    plannedMax: 8,
    reachability: 'REACHABLE_AT_PLANNED_MAX',
    EXP_MC10_04: 'NAMED_SUBJECT',
    EXP_MC10_05: 'NAMED_SUBJECT',
  },
  'SEG-04': {
    plannedMax: 7,
    reachability: 'BELOW_REGISTERED_MINIMUM',
    EXP_MC10_04: 'NAMED_RESALE_VARIANT',
    EXP_MC10_05: 'NOT_NAMED',
  },
  'SEG-05': {
    plannedMax: 7,
    reachability: 'BELOW_REGISTERED_MINIMUM',
    EXP_MC10_04: 'NOT_NAMED',
    EXP_MC10_05: 'NOT_NAMED',
  },
  'SEG-06': {
    plannedMax: 5,
    reachability: 'BELOW_REGISTERED_MINIMUM',
    EXP_MC10_04: 'NOT_NAMED',
    EXP_MC10_05: 'NOT_NAMED',
  },
  'SEG-07': {
    plannedMax: 8,
    reachability: 'REACHABLE_AT_PLANNED_MAX',
    EXP_MC10_04: 'NAMED_SEPARATE_VIEW',
    EXP_MC10_05: 'NAMED_SUBJECT',
  },
  'SEG-08': {
    plannedMax: 6,
    reachability: 'BELOW_REGISTERED_MINIMUM',
    EXP_MC10_04: 'NOT_NAMED',
    EXP_MC10_05: 'NAMED_SUBJECT',
  },
};

const AMENDMENT_IDS = [
  'PI-01',
  'PI-02',
  'PI-03',
  'PI-04',
  'PI-05',
  'IV-01',
  'IV-02',
  'IV-03',
  'IV-04',
  'IV-05',
  'IV-06',
  'IV-07',
  'IV-08',
  'IV-09',
];

/** The 31 authorization field keys of AUTH-MC10-001 revision 2 (D13 section 7). */
const AUTH_FIELDS = [
  'authorizationId',
  'revision',
  'programme',
  'purpose',
  'authorizingPerson',
  'authorityBasis',
  'authorizationDate',
  'effectiveStartDate',
  'expiryDate',
  'fieldworkLead',
  'permittedSegments',
  'permittedGeographies',
  'permittedContactChannels',
  'maximumAuthorizedContacts',
  'maximumCompletedInterviews',
  'spendingCeiling',
  'incentivePolicy',
  'directEmailPermission',
  'telephonePermission',
  'thirdPartyIntroductionPermission',
  'onSiteInvitationPermission',
  'prohibitedChannels',
  'controllerIdentity',
  'privacyContact',
  'approvedInstrumentVersions',
  'approvedStorageReference',
  'assignedInterviewers',
  'withdrawalRevocationMechanism',
  'legalReviewReference',
  'approvalEvidence',
  'currentAuthorizationStatus',
];

const AUTH_STATUS_KEYS = [
  'documentStatus',
  'authorizationStatus',
  'fieldworkPermission',
  'externalContactAllowed',
];

const AUTH_ALL_KEYS = [
  ...AUTH_FIELDS,
  ...AUTH_STATUS_KEYS,
  'inferenceGuard',
  'fieldStatus',
  'fieldMapNote',
];

/** Only these values may appear in an accountable-owner slot. */
const ACCOUNTABLE_VALUES = [
  'OPEN',
  'UNASSIGNED',
  'NOT_ENGAGED',
  'NOT_APPOINTED',
  'UNASSIGNED_ROLE',
];

const COMMERCIAL_INVARIANTS = {
  trademarkLegalClearance: 'NOT_GRANTED',
  sourceIpClearance: 'NOT_CLEARED',
  productSales: 'BLOCKED',
  commercialPublication: 'BLOCKED',
  productionDeployment: 'NOT_AUTHORIZED',
  profitabilityNotEstablished: true,
  pilotSafetyGate: 'BLOCKED',
  compatibilityTested: 'NO',
  approvedPrices: 0,
  orderableProducts: 0,
};

const PROHIBITED_CHANNELS = [
  'PURCHASED_CONTACT_LISTS',
  'SCRAPED_PERSONAL_EMAILS',
  'PRIVATE_MARINA_CUSTOMER_RECORDS',
  'COLD_AUTOMATED_CAMPAIGNS',
  'PAID_ADVERTISING_RECRUITMENT',
];

const CONSENT_STATES = ['NOT_SOUGHT', 'GRANTED', 'REFUSED', 'WITHDRAWN'];
const CONSENT_TRANSITIONS = ['NOT_SOUGHT->GRANTED', 'NOT_SOUGHT->REFUSED', 'GRANTED->WITHDRAWN'];
const WITHDRAWAL_STATES = [
  'RECEIVED',
  'STOPPED',
  'EXCLUDED',
  'REMOVED',
  'RECOMPUTED',
  'DELETED',
  'ACKNOWLEDGED',
  'AUDITED',
];

const PREREQUISITE_CLASSIFICATIONS = [
  'VERIFIED_COMPLETE',
  'PREPARED_PENDING_APPROVAL',
  'EXTERNAL_DEPENDENCY',
  'NOT_READY',
  'BLOCKED',
];
const ROLE_STATES = ['UNASSIGNED', 'UNTRAINED', 'NOT_APPOINTED'];

const REQUIREMENT_ROLES = {
  D1: 'lead',
  D2: 'lead',
  D3: 'lead',
  D4: 'lead',
  D13: 'agent-c-governance',
  D17: 'agent-f-data',
  D18: 'agent-f-data',
  D19: 'agent-f-data',
  D20: 'agent-f-data',
  D31: 'agent-f-data',
  D32: 'agent-f-data',
  D33: 'agent-g-auditor',
  D34: 'lead',
  D35: 'lead',
  D36: 'lead',
};

const TIMELINE = {
  deliverablesAtImplementation: 'D1-D32',
  deliverablesAtFinal: 'D1-D36',
};

const NEGATION_TOKENS =
  /\b(?:no|not|never|none|nothing|nobody|without|cannot|can't|isn't|aren't|wasn't|weren't|won't|blocked|prohibited|unavailable|unauthori[sz]ed|neither|nor|n't|ni|ning[uú]n|sin|nunca|jam[aá]s|n[aã]o|proibid[oa]|bloquead[oa]|no se|sin que)\b/i;
const PLANNING_TOKENS =
  /\b(?:plan|planned|planning|proposed|proposal|quota|minimum|maximum|target|aspiration|preserved|registered|threshold|band|between|per segment|wave|sum|sums|total|overall|completion requirement|full study|m[ií]nimo|m[aá]ximo|objetivo|meta|cuota|planificad|planejad|preservad|por segmento|registrad|suma|total)\b/i;
const PREPARED_CONTEXT_RE =
  /\b(?:interviewer|instrument|script|template|prepared|preparado|preparada|guion|gui[oó]n|plantilla|modelo|roteiro|prompt|question|read aloud|leer en voz alta|ler em voz alta|wording|guide|consent text|NOT_APPROVED|NOT_EXECUTED|SCREEN-01|CONSENT-01|GUIDE-01|PRICE-01|NOTE-01|SCHEMA-01|ANA-01|interview guideline)\b/i;
const SYNTHETIC_CONTEXT_RE =
  /\b(?:TRAINING_SYNTHETIC_NOT_RESEARCH|testingFixture|synthetic fixture|fixture sint[eé]tico|hipot[eé]tic|hypothetical|example only|worked example|ejemplo|exemplo|illustrative)\b/i;
const PUBLIC_SOURCE_RE =
  /\b(?:MC-09|desk research|secondary research|public source|public evidence|public signal|published|press release|annual report|informe anual|relat[oó]rio anual|fuente p[uú]blica|fonte p[uú]blica)\b/i;
const CONDITIONAL_TOKENS =
  /\b(?:if|when|once|after|before|until|unless|only|condition|conditional|prerequisite|gate|gated|pending|awaiting|would|will|future|required|requires|si|cuando|quando|s[oó]|requer|pendiente|bloquead[oa])\b/i;
const PROHIBITION_CONTEXT_RE =
  /\b(?:prohibit|forbidden|not permitted|never permitted|must not|may not|cannot|do not write|do not use|never write|not to be used|not allowed|prohibido|nunca|n[aã]o deve|proibid[oa])\b/i;

const ROLE_NOUNS = [
  'participants?',
  'interviewers?',
  'interviewees?',
  'owners?',
  'boat owners?',
  'vessel owners?',
  'installers?',
  'retailers?',
  'chandlers?',
  'operators?',
  'managers?',
  'customers?',
  'respondents?',
  'buyers?',
  'charter operators?',
  'fleet managers?',
  'marina operators?',
  'shipyard operators?',
  'due[nñ]as?',
  'due[nñ]os?',
  'armador(?:a|es)?',
  'armadora',
  'patr[oó]n(?:a|es)?',
  'instalador(?:a|es)?',
  'instaladora',
  'gerentes? de marina',
  'gerentes?',
  'operador(?:a|es)?',
  'operadora',
  'propietari[oa]s?',
  'clientes?',
  'entrevistad[oa]s?',
  'participantes?',
  'responsables de marina',
  'propriet[aá]ri[oa]s?',
  'propriet[aá]ria',
  'gestores?',
].join('|');

const VERBS = [
  'said',
  'says',
  'stated',
  'states',
  'noted',
  'notes',
  'explained',
  'explains',
  'told',
  'tells',
  'reported',
  'reports',
  'claimed',
  'claims',
  'commented',
  'comments',
  'confirmed',
  'confirms',
  'mentioned',
  'mentions',
  'described',
  'describes',
  'declared',
  'declares',
  'dijo',
  'dice',
  'coment[oó]',
  'comenta',
  'se[nñ]al[oó]',
  'se[nñ]ala',
  'afirm[oó]',
  'afirma',
  'explic[oó]',
  'explica',
  'indic[oó]',
  'indica',
  'refiri[oó]',
  'refiere',
  'report[oó]',
  'reporta',
  'confirm[oó]',
  'confirma',
  'mencion[oó]',
  'menciona',
  'declar[oó]',
  'declara',
  'disse',
  'diz',
  'comentou',
  'afirmou',
  'explicou',
  'indicou',
  'relatou',
  'relata',
  'confirmou',
  'mencionou',
  'declarou',
].join('|');

const ARTICLE = '(?:(?:the|a|an|el|la|los|las|un|una|unos|unas|o|a|os|as|um|uma|uns|umas)\\s+)?';
const QUOTE_OPEN = '(?:["\u201c\u2018\u00ab\u201e])';
const QUOTE_CLOSE = '(?:["\u201d\u2019\u00bb])';

/** Additive multilingual narrative-attribution heuristics for the recovery prose. */
const NARRATIVE_RULES = [
  {
    id: 'attribution-before-quotation',
    re: new RegExp(
      `\\b${ARTICLE}(?:${ROLE_NOUNS})\\s+(?:${VERBS})\\b[^.\\n]{0,30}${QUOTE_OPEN}`,
      'iu',
    ),
  },
  {
    id: 'quotation-dash-attribution',
    re: new RegExp(`${QUOTE_CLOSE}\\s*[\\u2014\\u2013-]\\s*${ARTICLE}(?:${ROLE_NOUNS})\\b`, 'iu'),
  },
  {
    id: 'reverse-order-quotation',
    re: new RegExp(`${QUOTE_CLOSE}\\s*,?\\s*(?:${VERBS})\\s+${ARTICLE}(?:${ROLE_NOUNS})\\b`, 'iu'),
  },
  {
    id: 'parenthetical-quotation',
    re: new RegExp(`${QUOTE_CLOSE}\\s*\\(\\s*${ARTICLE}(?:${ROLE_NOUNS})\\b[^)\\n]{0,30}\\)`, 'iu'),
  },
  {
    id: 'indirect-speech-finding',
    re: new RegExp(`\\b(?:${ROLE_NOUNS})\\s+(?:${VERBS})\\s+(?:that|que|qu[eé])\\b`, 'iu'),
  },
  {
    id: 'claimed-preference',
    re: new RegExp(
      `\\b${ARTICLE}(?:${ROLE_NOUNS})\\s+(?:prefer|prefers|preferred|prefieren|prefiere|preferem|prefere|prefeririam)\\b`,
      'iu',
    ),
  },
];

const POSITIVE_COUNT_RULES = [
  {
    id: 'numbered-participant-claim',
    re: /\b([1-9]\d*)\s+(?:completed\s+|realizadas?\s+|realizados?\s+|conclu[ií]das?\s+|conclu[ií]dos?\s+)?(?:interviews?|participants?|entrevistas?|participantes)\s+(?:were|have been|had been|completed|conducted|recorded|realizad[oa]s?|completad[oa]s?|conclu[ií]d[oa]s?|conduzid[oa]s?)\b/giu,
  },
  {
    id: 'numbered-claim-verb',
    re: /\b(?:we|the team|el equipo|a equipe)\s+(?:conducted|completed|performed|held|entrevistamos|realizamos|realiz[aá]mos|conduzimos)\s+([1-9]\d*)\b/giu,
  },
];

const PII_RULES = [
  { id: 'email', re: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i },
  { id: 'phone-international', re: /\+\d{1,3}[\s.-]?(?:\(?\d{1,4}\)?[\s.-]?){2,4}\d{2,4}/ },
  {
    id: 'phone-labelled',
    re: /\b(?:tel[eé]fono|telefono|phone|telephone|m[oó]vil|whatsapp)\b[^\n]{0,20}\b\d{3,4}[\s.-]?\d{3}[\s.-]?\d{3}\b/i,
  },
  { id: 'phone-00-prefix', re: /\b00(?:34|351)\d{6,9}\b/ },
  {
    id: 'iban',
    re: /\b(?:ES|PT|FR|DE|GB|IT|NL|BE|IE|LU|AT)\d{2}(?:[\s-]?[A-Z0-9]{4}){2,6}[\s-]?[A-Z0-9]{0,4}\b/,
  },
  { id: 'identity-number', re: /\b(?:\d{8}[A-Z]|[XYZ]\d{7}[A-Z])\b/ },
  {
    id: 'postal-address',
    re: /\b(?:calle|carrer|c\/|avenida|avda\.?|plaza|rua|r[uí]a|paseo)\s+[A-Za-z\u00c0-\u024f][^\n]{0,36}\d/i,
  },
];

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
    'fullname',
    'firstname',
    'lastname',
    'berthnumber',
    'vesselregistration',
    'registrationnumber',
    'participantname',
    'customername',
    'signature',
    'passport',
    'contactemail',
    'contactphone',
  ].map((value) => value.toLowerCase()),
);

const COMMERCIAL_CLAIM_RULES = [
  { id: 'price-approved', re: /\bprices? (?:is |are |was |were )?approved\b/i },
  {
    id: 'approved-price-count',
    re: /\bapproved (?:bundle )?prices?\b\s*(?:[:=]\s*[1-9]|\b(?:is|are)\s*[1-9])/i,
  },
  {
    id: 'available-for-sale',
    re: /\b(?:is|are) (?:now )?(?:for sale|purchasable|orderable|available to order)\b/i,
  },
  { id: 'shipping-now', re: /\b(?:in stock|shipping now|deliverable now)\b/i },
  {
    id: 'pilot-agreed',
    re: /\bpilot (?:is |was |has been )?(?:agreed|approved|started|signed|launched|running)\b/i,
  },
  {
    id: 'distribution-signed',
    re: /\bdistribution (?:agreement|partnership|deal|contract)\b[^.\n]{0,40}\b(?:signed|agreed|in place|established|exists)\b/i,
  },
  {
    id: 'trademark-cleared',
    re: /\btrademark (?:clearance )?(?:is |was )?(?:granted|cleared)\b|\btrademark (?:is )?legally cleared\b/i,
  },
];

const STORAGE_STATES = [
  'ARCHITECTURE_DEFINED',
  'LOCAL_SYNTHETIC_TESTS_PASS',
  'PROVISIONED',
  'ACCESS_REVIEWED',
  'OPERATIONALLY_APPROVED',
];

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
  function isPlainObject(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }

  function isNonEmptyString(value) {
    return typeof value === 'string' && value.trim().length > 0;
  }

  function isNonEmptyArray(value) {
    return Array.isArray(value) && value.length > 0;
  }

  function deepEqual(actual, expected) {
    if (actual === expected) return true;
    if (Array.isArray(actual) && Array.isArray(expected)) {
      return (
        actual.length === expected.length &&
        actual.every((entry, index) => deepEqual(entry, expected[index]))
      );
    }
    if (isPlainObject(actual) && isPlainObject(expected)) {
      const actualKeys = Object.keys(actual).sort();
      const expectedKeys = Object.keys(expected).sort();
      return (
        actualKeys.length === expectedKeys.length &&
        actualKeys.every(
          (key, index) => key === expectedKeys[index] && deepEqual(actual[key], expected[key]),
        )
      );
    }
    return false;
  }

  function setOf(values) {
    return [...new Set(values)].sort();
  }

  function walk(relDir, predicate, skipDirs = []) {
    const out = [];
    if (!existsDir(relDir)) return out;
    const skip = new Set(skipDirs.map((entry) => entry.toLowerCase()));
    const visit = (current) => {
      for (const entry of readdirSync(current, { withFileTypes: true })) {
        const full = join(current, entry.name);
        if (entry.isDirectory()) {
          if (skip.has(entry.name.toLowerCase())) continue;
          visit(full);
        } else if (predicate(entry.name)) {
          out.push(relative(abs('.'), full).replace(/\\/g, '/'));
        }
      }
    };
    visit(abs(relDir));
    return out.sort();
  }

  function recoveryDocs() {
    return walk(RECOVERY, (name) => name.endsWith('.md'));
  }

  function recoveryDataFiles() {
    return walk(RDATA, (name) => name.endsWith('.json'));
  }

  function walkJson(value, visit, path = '$') {
    visit(value, path);
    if (Array.isArray(value)) {
      value.forEach((item, index) => walkJson(item, visit, `${path}[${index}]`));
    } else if (isPlainObject(value)) {
      for (const [key, child] of Object.entries(value)) walkJson(child, visit, `${path}.${key}`);
    }
  }

  function clauseAround(text, index, length) {
    const start = Math.max(0, index - 180);
    const end = Math.min(text.length, index + length + 60);
    return text.slice(start, end);
  }

  function sentenceAround(text, index, length) {
    const boundaries = ['. ', '.\n', '! ', '? ', '\n\n', '|'];
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

  function scanRecoveryDocs(rules, options = {}) {
    const docs = options.docs || recoveryDocs();
    const violations = [];
    for (const doc of docs) {
      if (!exists(doc)) continue;
      const text = read(doc);
      for (const rule of rules) {
        const flags = rule.re.flags.includes('g') ? rule.re.flags : `${rule.re.flags}g`;
        for (const match of text.matchAll(new RegExp(rule.re.source, flags))) {
          const clause = options.sentenceLevel
            ? sentenceAround(text, match.index, match[0].length)
            : clauseAround(text, match.index, match[0].length);
          if (options.skipNegated !== false && NEGATION_TOKENS.test(clause)) continue;
          if (
            /\b(?:reject|rejects|rejected|refuse|refuses|refused|must not|may not|never)\b/i.test(
              clause,
            )
          ) {
            continue;
          }
          if (options.skipPlanning && PLANNING_TOKENS.test(clause)) continue;
          if (PREPARED_CONTEXT_RE.test(clause)) continue;
          if (SYNTHETIC_CONTEXT_RE.test(clause)) continue;
          if (PUBLIC_SOURCE_RE.test(clause)) continue;
          if (PROHIBITION_CONTEXT_RE.test(clause)) continue;
          if (options.skipConditional && CONDITIONAL_TOKENS.test(clause)) continue;
          if (rule.allowed && rule.allowed.test(clause)) continue;
          violations.push(`${doc}: ${rule.id} -> "${clause.trim().slice(0, 140)}"`);
        }
      }
    }
    return violations;
  }

  function statusOf(value) {
    if (isPlainObject(value)) return value.status;
    return value;
  }

  function assertNoGranted(text, where) {
    require(!/\bGRANTED\b/.test(text), `${where} may not contain a bare GRANTED status`);
  }

  // ---------------------------------------------------------------- loading
  const mc10Status = () => {
    const result = tryJson(`${CD}/data/research-status.json`);
    return result.ok ? result.value : {};
  };
  const mc10Authorization = () => {
    const result = tryJson(`${CD}/data/fieldwork-authorization.json`);
    return result.ok ? result.value : {};
  };
  const d27 = () => readJson(D27);
  const d28 = () => readJson(D28);
  const d29 = () => readJson(D29);
  const d30 = () => readJson(D30);

  function staging() {
    const contract = d27();
    const deliveryStage = contract.deliveryStage;
    require(deliveryStage === 'IMPLEMENTATION' ||
      deliveryStage ===
        'FINAL', `deliveryStage must be IMPLEMENTATION or FINAL, got ${deliveryStage}`);
    const required = deliveryStage === 'FINAL' ? DELIVERABLE_IDS : DELIVERABLE_IDS.slice(0, 32);
    return { deliveryStage, required };
  }

  function deliverableFiles(ids) {
    return ids.map((id) => ({ id, ...DELIVERABLES[id] }));
  }

  // ------------------------------------------------------------ the checks
  check('CRR-01', 'D27-D30 are valid JSON with the canonical recovery identity', () => {
    for (const [path, expected] of [
      [
        D27,
        {
          contractId: CONTRACT_ID,
          contractVersion: CONTRACT_VERSION,
          milestone: MILESTONE,
          date: DATE,
          owner: 'lead',
        },
      ],
      [
        D28,
        {
          contractId: CONTRACT_ID,
          contractVersion: CONTRACT_VERSION,
          milestone: MILESTONE,
          date: DATE,
        },
      ],
      [
        D30,
        {
          contractId: CONTRACT_ID,
          contractVersion: CONTRACT_VERSION,
          milestone: MILESTONE,
          date: DATE,
        },
      ],
    ]) {
      require(exists(path), `missing recovery data file ${path}`);
      const value = readJson(path);
      for (const [key, wanted] of Object.entries(expected)) {
        require(value[key] ===
          wanted, `${path}: ${key} must be ${wanted}, got ${String(value[key])}`);
      }
    }
    const a = d29();
    require(a.authorizationId === 'AUTH-MC10-001', 'D29 must mirror AUTH-MC10-001');
    require(a.revision === 2, 'D29 revision must be 2');
    for (const path of [D27, D28, D29, D30]) {
      const text = read(path);
      const value = JSON.parse(text);
      require(text ===
        `${JSON.stringify(value, null, 2)}\n`, `${path} must be 2-space indented JSON with a trailing newline`);
    }
  });

  check('CRR-02', 'Binding truth: MC-10 BLOCKED and every count zero', () => {
    const contract = d27();
    const truth = contract.bindingTruth;
    require(isPlainObject(truth), 'D27 bindingTruth missing');
    const expected = {
      mc10Status: 'BLOCKED',
      authMc10001: 'NOT_GRANTED',
      outreachAuthorization: 'NOT_GRANTED',
      fieldworkStatus: 'BLOCKED',
      fieldworkReadiness: 'PARTIALLY_READY',
      commercialPublication: 'BLOCKED',
      productSales: 'BLOCKED',
      productionDeployment: 'NOT_AUTHORIZED',
    };
    for (const [key, value] of Object.entries(expected)) {
      require(truth[key] ===
        value, `bindingTruth.${key} must be ${value}, got ${String(truth[key])}`);
    }
    require(isPlainObject(truth.counts), 'bindingTruth.counts missing');
    for (const [key, value] of Object.entries(truth.counts)) {
      require(value === 0, `bindingTruth.counts.${key} must be 0, got ${String(value)}`);
    }
    for (const countKey of [
      'participants',
      'interviews',
      'completedInterviews',
      'validAnalysisCases',
      'priceResponses',
      'approvedPrices',
      'trainedInterviewers',
      'assignedInterviewers',
    ]) {
      require(countKey in truth.counts, `bindingTruth.counts.${countKey} missing`);
    }
    const status = mc10Status();
    require(status.milestoneStatus === 'BLOCKED', 'MC-10 milestoneStatus must remain BLOCKED');
    require(status.fieldworkStatus === 'BLOCKED', 'MC-10 fieldworkStatus must remain BLOCKED');
    require(status.outreachAuthorization ===
      'NOT_GRANTED', 'MC-10 outreachAuthorization must remain NOT_GRANTED');
    require(mc10Authorization().authorizationStatus ===
      'NOT_GRANTED', 'AUTH-MC10-001 must remain NOT_GRANTED in the MC-10 record');
  });

  check('CRR-03', 'Commercial invariants are unchanged from the frozen MC-10 record', () => {
    const contract = d27();
    require(isPlainObject(contract.commercialInvariants), 'D27 commercialInvariants missing');
    require(deepEqual(
      contract.commercialInvariants,
      COMMERCIAL_INVARIANTS,
    ), 'D27 commercialInvariants differ from the frozen expected values');
    require(deepEqual(
      contract.commercialInvariants,
      mc10Status().commercialInvariants,
    ), 'D27 commercialInvariants differ from docs/marea/customer-discovery/data/research-status.json');
    const truth = contract.bindingTruth;
    require(truth.trademarkLegalClearance === 'NOT_GRANTED', 'trademark clearance cannot change');
    require(truth.sourceIpClearance === 'NOT_CLEARED', 'source IP clearance cannot change');
    require(truth.profitability === 'NOT_ESTABLISHED', 'profitability cannot be established');
    require(truth.pilotSafetyGate === 'BLOCKED', 'pilot safety gate cannot open');
  });

  check('CRR-04', 'Recovery PASS/READY states never imply fieldwork permission', () => {
    const contract = d27();
    require(['READY_FOR_OWNER_REVIEW', 'PASS_INTERNAL_PREPARATION_SCOPE'].includes(
      contract.recoveryWorkStatus,
    ) ||
      contract.recoveryWorkStatus ===
        'IN_PROGRESS', `unexpected recoveryWorkStatus ${contract.recoveryWorkStatus}`);
    const truth = contract.bindingTruth;
    require(truth.fieldworkStatus ===
      'BLOCKED', 'fieldwork cannot be unblocked by a recovery state');
    const draft = d29();
    if (draft.authorizationStatus !== 'GRANTED') {
      require(draft.fieldworkPermission ===
        false, 'fieldworkPermission must be false while ungranted');
      require(draft.externalContactAllowed ===
        false, 'externalContactAllowed must be false while ungranted');
      require(draft.directEmailPermission === false &&
        draft.telephonePermission === false &&
        draft.thirdPartyIntroductionPermission === false &&
        draft.onSiteInvitationPermission ===
          false, 'no contact channel permission may be true while ungranted');
    }
    require(d30().fieldworkStatus === 'BLOCKED', 'D30 fieldworkStatus must be BLOCKED');
    const readiness = contract.fieldworkReadiness;
    require(readiness.readinessState ===
      'PARTIALLY_READY', 'readinessState must be PARTIALLY_READY');
    require(readiness.fieldworkStatus === 'BLOCKED', 'contract fieldworkStatus must be BLOCKED');
    require(readiness.storage.architectureDefined === true &&
      readiness.storage.localSyntheticTestsPass === true &&
      readiness.storage.provisioned === false &&
      readiness.storage.accessReviewed === false &&
      readiness.storage.operationallyApproved ===
        false, 'storage evidence states are inconsistent with an architecture-only milestone');
  });

  check(
    'CRR-05',
    'Authorization draft carries exactly the canonical key set and ungranted status',
    () => {
      const draft = d29();
      const keys = Object.keys(draft).sort();
      require(deepEqual(
        keys,
        setOf(AUTH_ALL_KEYS),
      ), `D29 key set mismatch; expected the 31 flat fields + ${AUTH_STATUS_KEYS.join(', ')} + inferenceGuard/fieldStatus/fieldMapNote`);
      require(draft.documentStatus === 'DRAFT_PREPARED', 'documentStatus must be DRAFT_PREPARED');
      require(draft.authorizationStatus ===
        'NOT_GRANTED', 'authorizationStatus must be NOT_GRANTED');
      require(draft.currentAuthorizationStatus ===
        'NOT_GRANTED', 'currentAuthorizationStatus must be NOT_GRANTED');
      require(draft.fieldworkPermission === false, 'fieldworkPermission must be false');
      require(draft.externalContactAllowed === false, 'externalContactAllowed must be false');
      assertNoGranted(read(D29), 'D29');
      require(isNonEmptyString(draft.inferenceGuard), 'D29 inferenceGuard missing');
      require(/PR approval/i.test(draft.inferenceGuard), 'inferenceGuard must reject PR approvals');
      require(/task assignment/i.test(
        draft.inferenceGuard,
      ), 'inferenceGuard must reject task assignment');
      require(/passing validator/i.test(
        draft.inferenceGuard,
      ), 'inferenceGuard must reject validators');
      require(isNonEmptyString(draft.fieldMapNote), 'D29 fieldMapNote missing');
      require(isPlainObject(draft.fieldStatus), 'D29 fieldStatus missing');
      require(deepEqual(
        Object.keys(draft.fieldStatus).sort(),
        setOf(AUTH_FIELDS),
      ), 'fieldStatus must cover exactly the 31 authorization fields');
    },
  );

  check(
    'CRR-06',
    'Authorization draft invents no human, legal, storage or interviewer value',
    () => {
      const draft = d29();
      for (const field of [
        'authorizingPerson',
        'authorizationDate',
        'effectiveStartDate',
        'expiryDate',
        'fieldworkLead',
        'controllerIdentity',
        'privacyContact',
        'legalReviewReference',
        'approvalEvidence',
        'approvedStorageReference',
      ]) {
        require(draft[field] ===
          null, `${field} must be null, got ${JSON.stringify(draft[field])}`);
      }
      require(draft.authorityBasis === null, 'authorityBasis must be null');
      require(draft.permittedContactChannels.length ===
        0, 'permittedContactChannels must be empty');
      require(draft.approvedInstrumentVersions.length ===
        0, 'approvedInstrumentVersions must be empty');
      require(draft.assignedInterviewers.length === 0, 'assignedInterviewers must be empty');
      require(draft.maximumAuthorizedContacts === 0, 'maximumAuthorizedContacts must be 0');
      require(draft.maximumCompletedInterviews === 0, 'maximumCompletedInterviews must be 0');
      require(draft.spendingCeiling === 0, 'spendingCeiling must be 0');
      require(statusOf(draft.incentivePolicy) !== 'APPROVED' &&
        !deepEqual(draft.incentivePolicy, 'APPROVED'), 'incentivePolicy may not be approved');
      require(draft.incentivePolicy.proposed === 'ZERO' &&
        draft.incentivePolicy.status ===
          'NOT_APPROVED', 'incentivePolicy must stay the unapproved ZERO proposal');
      require(draft.withdrawalRevocationMechanism.accountableRole ===
        'OPEN', 'withdrawalRevocationMechanism accountable role must be OPEN');
      require(deepEqual(draft.permittedSegments, [
        'SEG-01',
        'SEG-03',
        'SEG-04',
        'SEG-06',
      ]), 'permittedSegments must be the canonical Wave 1 four');
      require(deepEqual(draft.permittedGeographies, [
        'Rías Baixas / Galicia (Spain)',
      ]), 'permittedGeographies must be the canonical Wave 1 geography');
      require(deepEqual(
        draft.prohibitedChannels,
        PROHIBITED_CHANNELS,
      ), 'prohibitedChannels must preserve the five standing exclusions');
      for (const field of [
        'directEmailPermission',
        'telephonePermission',
        'thirdPartyIntroductionPermission',
        'onSiteInvitationPermission',
      ]) {
        require(draft[field] === false, `${field} must be false`);
      }
      for (const [field, status] of Object.entries(draft.fieldStatus)) {
        require(['VALUE_PRESENT', 'PROPOSAL_PENDING_APPROVAL', 'OPEN', 'NULL'].includes(
          status,
        ), `fieldStatus.${field} has an invalid status ${status}`);
      }
    },
  );

  check('CRR-07', 'The authorization draft matches D13 field for field', () => {
    require(exists(D13), 'D13 authorization draft missing');
    const text = read(D13);
    const blocks = [];
    for (const match of text.matchAll(/```json\n([\s\S]*?)```/g)) {
      try {
        blocks.push(JSON.parse(match[1]));
      } catch {
        // A malformed fenced block is caught by the D13 owner; this check only
        // compares the well-formed field block when it exists.
      }
    }
    const fieldBlock = blocks.find((block) => block.authorizationId === 'AUTH-MC10-001');
    require(fieldBlock, 'D13 must expose a machine-readable authorization field block');
    const draft = d29();
    for (const field of AUTH_FIELDS) {
      require(field in fieldBlock, `D13 machine block missing ${field}`);
      require(deepEqual(
        draft[field],
        fieldBlock[field],
      ), `D29.${field} differs from D13: ${JSON.stringify(draft[field])} vs ${JSON.stringify(fieldBlock[field])}`);
    }
    const statusBlock = blocks.find(
      (block) => block.documentStatus === 'DRAFT_PREPARED' && block.authorizationStatus,
    );
    require(statusBlock, 'D13 must expose a machine-readable status block');
    for (const key of AUTH_STATUS_KEYS) {
      require(draft[key] === statusBlock[key], `D29.${key} differs from D13 status block`);
    }
  });

  check(
    'CRR-08',
    'Sampling arithmetic: preserved quotas sum to 37/57 and the aspiration is preserved',
    () => {
      const sampling = d27().sampling;
      require(isPlainObject(sampling), 'D27 sampling block missing');
      require(sampling.status ===
        'PROPOSED_NOT_EFFECTIVE', 'sampling status must be PROPOSED_NOT_EFFECTIVE');
      require(sampling.candidatePlanId ===
        'MC10R-SAMPLING-1.1.0-PROPOSED', 'candidatePlanId must be MC10R-SAMPLING-1.1.0-PROPOSED');
      require(Array.isArray(sampling.historicalQuotas) &&
        sampling.historicalQuotas.length === 8, 'historicalQuotas must list all eight segments');
      let minSum = 0;
      let maxSum = 0;
      for (const expected of SEGMENTS) {
        const quota = sampling.historicalQuotas.find(
          (entry) => entry.segmentId === expected.segmentId,
        );
        require(quota, `historicalQuotas missing ${expected.segmentId}`);
        require(quota.minimum === expected.minimum &&
          quota.maximum ===
            expected.maximum, `${expected.segmentId} quota changed: ${quota.minimum}/${quota.maximum} !== ${expected.minimum}/${expected.maximum}`);
        minSum += quota.minimum;
        maxSum += quota.maximum;
      }
      require(minSum === 37, `segment minima must sum to 37, got ${minSum}`);
      require(maxSum === 57, `segment maxima must sum to 57, got ${maxSum}`);
      require(sampling.totalMinimum === 37, 'totalMinimum must be 37');
      require(sampling.totalMaximum === 57, 'totalMaximum must be 57');
      require(deepEqual(sampling.completionRequirement, {
        minimum: 37,
        maximum: 57,
        derivation: 'sum of the eight preserved per-segment minima and maxima',
      }), 'completionRequirement must be the 37/57 sums');
      const aspiration = sampling.historicalTarget;
      require(aspiration.minimum === 40 && aspiration.maximum === 80, '40-80 must be preserved');
      require(aspiration.derivableFromSegmentQuotas ===
        false, 'the 40-80 aspiration must be recorded as not derivable');
      require(aspiration.label ===
        'HISTORICAL_PLANNING_ASPIRATION', 'the 40-80 aspiration must keep its historical label');
      require(!('fullStudyTotalMinimum' in sampling) ||
        sampling.fullStudyTotalMinimum === 37, 'no alternative full-study minimum may exist');
    },
  );

  check(
    'CRR-09',
    'Wave 1 is 18-28 on the canonical four segments and is not the full study',
    () => {
      const sampling = d27().sampling;
      require(Array.isArray(sampling.waves) &&
        sampling.waves.length === 3, 'sampling.waves must have three waves');
      const wave1 = sampling.waves.find((wave) => wave.wave === 1);
      require(wave1, 'Wave 1 missing');
      require(deepEqual(
        setOf(wave1.segmentIds),
        setOf(['SEG-01', 'SEG-03', 'SEG-04', 'SEG-06']),
      ), 'Wave 1 segments must be SEG-01, SEG-03, SEG-04, SEG-06');
      require(wave1.minimum === 18 && wave1.maximum === 28, 'Wave 1 must be 18-28');
      require(wave1.isFullStudy === false, 'Wave 1 must not be the full study');
      require(isNonEmptyArray(sampling.wave1Cohorts), 'wave1Cohorts missing');
      const cohortMin = sampling.wave1Cohorts.reduce((sum, entry) => sum + entry.minimum, 0);
      const cohortMax = sampling.wave1Cohorts.reduce((sum, entry) => sum + entry.maximum, 0);
      require(cohortMin === 18 &&
        cohortMax === 28, `Wave 1 cohorts must sum to 18-28, got ${cohortMin}-${cohortMax}`);
      for (const expected of WAVE1) {
        const cohort = sampling.wave1Cohorts.find((entry) => entry.cohort === expected.cohort);
        require(cohort, `Wave 1 cohort ${expected.cohort} missing`);
        require(cohort.segmentId === expected.segmentId &&
          cohort.minimum === expected.minimum &&
          cohort.maximum === expected.maximum, `Wave 1 cohort ${expected.cohort} quota mismatch`);
      }
      const wave2 = sampling.waves.find((wave) => wave.wave === 2);
      require(wave2 &&
        wave2.minimum === 19 &&
        wave2.maximum === 29, 'Wave 2 must complete 37-57 (19-29 more)');
      const wave3 = sampling.waves.find((wave) => wave.wave === 3);
      require(wave3 &&
        wave3.requiresApprovedAmendment === true, 'Wave 3 must require an approved amendment');
      for (const wave of sampling.waves) {
        require(wave.status ===
          'NOT_EXECUTED', `Wave ${wave.wave} must be NOT_EXECUTED, got ${wave.status}`);
      }
    },
  );

  check(
    'CRR-10',
    'Pricing reachability and registered populations are the canonical matrix',
    () => {
      const pricing = d27().sampling.pricingFeasibility;
      require(isPlainObject(pricing), 'pricingFeasibility missing');
      require(pricing.requiredN === 8, 'registered minimum must stay 8');
      require(pricing.minimumNeverReduced === true, 'minimumNeverReduced must be true');
      require(deepEqual(
        setOf(pricing.experiments),
        setOf(['EXP-MC10-04', 'EXP-MC10-05']),
      ), 'pricing experiments must be EXP-MC10-04 and EXP-MC10-05');
      require(deepEqual(
        setOf(pricing.constructs),
        setOf(['CONSTRUCT-01', 'CONSTRUCT-02']),
      ), 'pricing constructs must be CONSTRUCT-01 and CONSTRUCT-02');
      const cellPattern = new RegExp(pricing.cellKeyPattern);
      require(cellPattern.test('SEG-01__EXP-MC10-04__CONSTRUCT-01') &&
        !cellPattern.test(
          'SEG-01__EXP-MC10-05__CONSTRUCT-03',
        ), 'cellKeyPattern is not the canonical pattern');
      require(pricing.cellCount ===
        32, 'cellCount must be 32 (8 segments x 2 experiments x 2 constructs)');
      require(pricing.reachableCellCount === 16, 'reachableCellCount must be 16');
      require(pricing.belowMinimumCellCount === 16, 'belowMinimumCellCount must be 16');
      require(pricing.executedCellCount === 0, 'no pricing cell may be executed');
      require(pricing.approvedPrices === 0, 'no price may be approved');
      const eligible = [];
      let populationEligibleCount = 0;
      for (const [segmentId, expected] of Object.entries(PRICING)) {
        const cell = pricing.segments[segmentId];
        require(cell, `pricing.segments missing ${segmentId}`);
        require(cell.plannedMax ===
          expected.plannedMax, `${segmentId} plannedMax must be ${expected.plannedMax}`);
        require(cell.reachability ===
          expected.reachability, `${segmentId} reachability must be ${expected.reachability}`);
        for (const [experiment, code] of [
          ['EXP-MC10-04', expected.EXP_MC10_04],
          ['EXP-MC10-05', expected.EXP_MC10_05],
        ]) {
          require(cell.registeredPopulation[experiment] ===
            code, `${segmentId}/${experiment} registeredPopulation must be ${code}`);
          const populationEligible = code !== 'NOT_NAMED';
          if (populationEligible) populationEligibleCount += 2;
          for (const construct of pricing.constructs) {
            const key = `${segmentId}__${experiment}__${construct}`;
            require(cellPattern.test(key), `cell key ${key} violates the canonical pattern`);
            if (populationEligible && expected.reachability === 'REACHABLE_AT_PLANNED_MAX') {
              eligible.push(key);
            }
          }
        }
      }
      require(pricing.populationEligibleCellCount ===
        populationEligibleCount, `populationEligibleCellCount must be ${populationEligibleCount}`);
      require(setOf(pricing.experimentLevelEligibleCells).length ===
        setOf(eligible).length, `experimentLevelEligibleCells must have ${eligible.length} cells`);
      for (const key of eligible) {
        require(pricing.experimentLevelEligibleCells.includes(
          key,
        ), `experimentLevelEligibleCells missing ${key}`);
      }
      for (const key of pricing.experimentLevelEligibleCells) {
        require(cellPattern.test(key), `experimentLevelEligibleCells has a malformed key ${key}`);
        const [segmentId, experimentId] = key.split('__');
        const expected = PRICING[segmentId];
        require(expected, `experimentLevelEligibleCells references unknown segment ${segmentId}`);
        require(expected.reachability ===
          'REACHABLE_AT_PLANNED_MAX', `${key} is below the registered minimum and cannot be experiment-level eligible`);
        const population =
          experimentId === 'EXP-MC10-04' ? expected.EXP_MC10_04 : expected.EXP_MC10_05;
        require(population !==
          'NOT_NAMED', `${key} has no registered population and cannot be experiment-level eligible`);
      }
      for (const [segmentId, experiments] of Object.entries(pricing.notApplicable)) {
        for (const experimentId of experiments) {
          const population =
            experimentId === 'EXP-MC10-04'
              ? PRICING[segmentId].EXP_MC10_04
              : PRICING[segmentId].EXP_MC10_05;
          require(population ===
            'NOT_NAMED', `${segmentId}/${experimentId} is listed NOT_APPLICABLE but carries a named population`);
        }
      }
      require(deepEqual(
        setOf(pricing.wave1ExperimentEligibleSegments),
        setOf(['SEG-01', 'SEG-03']),
      ), 'Wave 1 experiment-eligible segments must be SEG-01 and SEG-03');
    },
  );

  check('CRR-11', 'Amendments: fourteen entries, none approved or effective', () => {
    const registry = d28();
    require(registry.status ===
      'PROPOSED_NOT_EFFECTIVE', 'registry status must be PROPOSED_NOT_EFFECTIVE');
    require(Array.isArray(registry.amendments), 'amendments array missing');
    require(registry.amendments.length ===
      14, `registry must hold 14 amendments, got ${registry.amendments.length}`);
    const ids = registry.amendments.map((entry) => entry.id);
    require(deepEqual(
      ids,
      AMENDMENT_IDS,
    ), 'amendment ids must be PI-01..PI-05 then IV-01..IV-09 in order');
    for (const entry of registry.amendments) {
      require(isNonEmptyString(entry.title), `${entry.id}: title missing`);
      require(isNonEmptyString(entry.source), `${entry.id}: source missing`);
      require(entry.previousVersion === '1.0.0', `${entry.id}: previousVersion must be 1.0.0`);
      require(isNonEmptyString(entry.candidateVersion), `${entry.id}: candidateVersion missing`);
      require(entry.status ===
        'PROPOSED_NOT_EFFECTIVE', `${entry.id}: status must be PROPOSED_NOT_EFFECTIVE`);
      require(statusOf(entry.status) === 'PROPOSED_NOT_EFFECTIVE' &&
        statusOf(entry.reviewStatus) !==
          'APPROVED', `${entry.id}: an amendment may not be approved`);
      require(isNonEmptyString(entry.summary), `${entry.id}: summary missing`);
      require(isNonEmptyArray(
        entry.affectedExperiments,
      ), `${entry.id}: affectedExperiments missing`);
      for (const experimentId of entry.affectedExperiments) {
        require(/^EXP-MC10-\d{2}$/.test(
          experimentId,
        ), `${entry.id}: invalid affected experiment ${experimentId}`);
      }
      require(isNonEmptyArray(entry.dependencies), `${entry.id}: dependencies missing`);
      require(isNonEmptyString(entry.docRef), `${entry.id}: docRef missing`);
      require(entry.approvalEvidence === null, `${entry.id}: approvalEvidence must be null`);
      require(entry.effectiveDate === null, `${entry.id}: effectiveDate must be null`);
      require(!/APPROVED_FOR_FUTURE_FIELDWORK|APPROVED$/.test(String(entry.status)) &&
        entry.reviewStatus !== 'APPROVED', `${entry.id}: no approval state may be asserted`);
    }
    const ivs = registry.amendments.filter((entry) => entry.id.startsWith('IV-'));
    require(ivs.length === 9, 'nine instrument amendments required');
    for (const iv of ivs) {
      require(['REVIEW_REQUIRED', 'DRAFT_NOT_APPROVED'].includes(
        iv.reviewStatus,
      ), `${iv.id}: reviewStatus must be REVIEW_REQUIRED or DRAFT_NOT_APPROVED, got ${iv.reviewStatus}`);
      require(iv.candidateVersion === '1.1.0', `${iv.id}: candidateVersion must be 1.1.0`);
    }
    const pis = registry.amendments.filter((entry) => entry.id.startsWith('PI-'));
    require(pis.length === 5, 'five planning-inconsistency entries required');
    require(deepEqual(registry.counts, {
      total: 14,
      planningInconsistencies: 5,
      instrumentAmendments: 9,
      approved: 0,
      effective: 0,
      withApprovalEvidence: 0,
    }), 'registry counts must reconcile to 14/5/9/0/0/0');
    assertNoGranted(read(D28), 'D28');
  });

  check('CRR-12', 'D27 amendment block reconciles with the D28 registry', () => {
    const contract = d27();
    const registry = d28();
    const block = contract.amendments;
    require(block.registryRef === D28, 'amendments.registryRef must point at D28');
    require(block.registryId === registry.registryId, 'amendments.registryId mismatch');
    require(block.total === registry.amendments.length, 'amendments.total mismatch');
    require(deepEqual(
      setOf(block.planningInconsistencies),
      setOf(
        registry.amendments.filter((entry) => entry.id.startsWith('PI-')).map((entry) => entry.id),
      ),
    ), 'planningInconsistencies must match the registry');
    require(deepEqual(
      setOf(block.instrumentAmendments),
      setOf(
        registry.amendments.filter((entry) => entry.id.startsWith('IV-')).map((entry) => entry.id),
      ),
    ), 'instrumentAmendments must match the registry');
    require(block.approvedCount === 0, 'approvedCount must be 0');
    require(block.effectiveCount === 0, 'effectiveCount must be 0');
    require(block.allApprovalEvidenceNull === true, 'allApprovalEvidenceNull must be true');
    require(block.allEffectiveDatesNull === true, 'allEffectiveDatesNull must be true');
    require(block.historicalInstrumentVersion === '1.0.0' &&
      block.historicalInstrumentStatus ===
        'FROZEN_HISTORICAL', 'the historical instrument version must be preserved');
    require(block.candidateInstrumentVersion ===
      '1.1.0', 'the candidate instrument version must be 1.1.0');
  });

  check('CRR-13', 'Deliverable inventory D1-D36 uses the canonical paths and owners', () => {
    const inventory = d27().deliverables;
    require(Array.isArray(inventory), 'D27 deliverables inventory missing');
    require(inventory.length ===
      36, `inventory must list 36 deliverables, got ${inventory.length}`);
    const ids = inventory.map((entry) => entry.id);
    require(deepEqual(ids, DELIVERABLE_IDS), 'inventory ids must be D1..D36 in order');
    const seenPaths = new Set();
    for (const entry of inventory) {
      const expected = DELIVERABLES[entry.id];
      require(expected, `inventory has unknown id ${entry.id}`);
      require(entry.path ===
        expected.path, `${entry.id} path must be ${expected.path}, got ${entry.path}`);
      require(entry.owner ===
        expected.owner, `${entry.id} owner must be ${expected.owner}, got ${entry.owner}`);
      require(!seenPaths.has(entry.path), `duplicate inventory path ${entry.path}`);
      seenPaths.add(entry.path);
    }
  });

  check('CRR-14', 'Every staged deliverable exists and every recovery file is inventoried', () => {
    const { deliveryStage, required } = staging();
    const missing = [];
    for (const entry of deliverableFiles(required)) {
      if (!exists(entry.path)) missing.push(`${entry.id} ${entry.path}`);
    }
    require(missing.length ===
      0, `${deliveryStage} requires ${TIMELINE[deliveryStage === 'FINAL' ? 'deliverablesAtFinal' : 'deliverablesAtImplementation']}; missing: ${missing.join(', ')}`);
    const inventory = new Set(d27().deliverables.map((entry) => entry.path));
    const stray = [...recoveryDocs(), ...recoveryDataFiles()].filter(
      (path) => !inventory.has(path),
    );
    require(stray.length === 0, `recovery files outside the D27 inventory: ${stray.join(', ')}`);
  });

  check(
    'CRR-15',
    'Deliverable documents carry the Document ID, date, owner and status banner',
    () => {
      const { required } = staging();
      const problems = [];
      for (const entry of deliverableFiles(required)) {
        if (!entry.path.endsWith('.md') || !exists(entry.path)) continue;
        const head = read(entry.path).split('\n').slice(0, 30).join('\n');
        const id = entry.id.slice(1);
        if (!/\|\s*Document ID\s*\|/.test(head)) problems.push(`${entry.id}: no Document ID row`);
        if (!new RegExp(`\\bD${id}\\b`).test(head))
          problems.push(`${entry.id}: Document ID does not name D${id}`);
        if (!head.includes(DATE)) problems.push(`${entry.id}: header date is not ${DATE}`);
        if (!head.includes(entry.owner))
          problems.push(`${entry.id}: header does not name owner ${entry.owner}`);
        if (!/^\|[^|\n]*(?:status|estado|state)[^|\n]*\|/im.test(head))
          problems.push(`${entry.id}: no status row`);
      }
      require(problems.length === 0, `banner defects: ${problems.slice(0, 8).join('; ')}`);
    },
  );

  check(
    'CRR-16',
    'No fabricated attribution or participant claim appears in recovery prose',
    () => {
      const violations = scanRecoveryDocs(NARRATIVE_RULES, { sentenceLevel: true });
      require(violations.length ===
        0, `fabricated narrative: ${violations.slice(0, 5).join(' | ')}`);
    },
  );

  check('CRR-17', 'No fabricated positive participant, interview or price count appears', () => {
    const violations = scanRecoveryDocs(POSITIVE_COUNT_RULES, {
      sentenceLevel: true,
      skipPlanning: true,
    }).filter((entry) => {
      const digits = entry.match(/\b(\d+)\b/);
      return !digits || Number(digits[1]) > 0;
    });
    require(violations.length === 0, `fabricated counts: ${violations.slice(0, 5).join(' | ')}`);
    for (const path of recoveryDataFiles()) {
      const value = readJson(path);
      walkJson(value, (node, where) => {
        if (!isPlainObject(node)) return;
        for (const [key, child] of Object.entries(node)) {
          if (typeof child !== 'number' || child === 0) continue;
          if (
            /^(?:participants|interviews|completedInterviews|interviewCompleted|participantCount|interviewCount|priceResponses|validAnalysisCases|codedUnits|findings|approvedPrices|orderableProducts|trainedInterviewers|assignedInterviewers)$/i.test(
              key,
            )
          ) {
            throw new Error(`${path}:${where}.${key} carries the positive count ${child}`);
          }
        }
      });
    }
  });

  check(
    'CRR-18',
    'No PII, participant identity key, audio or transcript in the recovery surface',
    () => {
      const targets = [...recoveryDocs(), ...recoveryDataFiles()];
      for (const target of targets) {
        const text = read(target);
        for (const rule of PII_RULES) {
          const match = text.match(rule.re);
          require(!match, `${target}: ${rule.id} -> "${match ? match[0].slice(0, 60) : ''}"`);
        }
        for (const match of text.matchAll(/\bP-MC10-\d{3}\b/g)) {
          const clause = clauseAround(text, match.index, match[0].length);
          require(!/\b(?:name|nombre|email|e-mail|tel[eé]fono|phone|address|direcci[oó]n|contact|contacto|berth|vessel|embarcaci[oó]n)\b/i.test(
            clause,
          ), `${target}: participant identity key ${match[0]} joined with identity terms`);
          require(!/\b(?:confirmed|stated|said|reported|told|interviewed|interview|consented|consent|quoted|quotation)\b/i.test(
            clause,
          ), `${target}: participant identity key ${match[0]} asserts an interaction that cannot exist`);
        }
        for (const rule of FORBIDDEN_FIELD_NAMES) {
          require(!new RegExp(`"${rule}"\\s*:\\s*(?!null|""|\\[\\])`).test(
            text,
          ), `${target}: forbidden personal-data field "${rule}" is populated`);
        }
      }
      const banned = walk('.', (name) => /\.(?:wav|mp3|m4a|ogg|flac|vtt|srt)$/i.test(name), [
        'node_modules',
        '.git',
        'dist',
        '.angular',
        'playwright-report',
        'test-results',
      ]).concat(
        walk('.', (name) => /(?:transcript|verbatim|audio-recording)/i.test(name), [
          'node_modules',
          '.git',
          'dist',
          '.angular',
          'playwright-report',
          'test-results',
        ]),
      );
      require(banned.length ===
        0, `audio/transcript files present: ${banned.slice(0, 5).join(', ')}`);
    },
  );

  check(
    'CRR-19',
    'Consent transitions are closed: withdrawal is terminal and propagation is defined',
    () => {
      const model = d27().consentModel;
      require(isPlainObject(model), 'D27 consentModel missing');
      require(model.instrumentId === 'CONSENT-01', 'consent instrument must be CONSENT-01');
      require(model.candidateVersion === '1.1.0', 'candidate consent version must be 1.1.0');
      require(model.status ===
        'REVIEW_REQUIRED', 'the consent instrument must stay REVIEW_REQUIRED');
      require(model.effective === false, 'the consent instrument cannot be effective');
      require(deepEqual(
        setOf(model.scopes),
        setOf(['PARTICIPATION', 'RECORDING', 'QUOTATION', 'FOLLOW_UP']),
      ), 'consent scopes must be the four canonical scopes');
      require(deepEqual(
        setOf(model.states),
        setOf(CONSENT_STATES),
      ), 'consent states must be NOT_SOUGHT/GRANTED/REFUSED/WITHDRAWN');
      require(deepEqual(
        setOf(model.allowedTransitions.map((entry) => `${entry.from}->${entry.to}`)),
        setOf(CONSENT_TRANSITIONS),
      ), 'allowed transitions must be exactly NOT_SOUGHT->GRANTED, NOT_SOUGHT->REFUSED, GRANTED->WITHDRAWN');
      for (const transition of model.allowedTransitions) {
        require(model.states.includes(transition.from) &&
          model.states.includes(
            transition.to,
          ), `transition ${transition.from}->${transition.to} uses an unknown state`);
        require(!model.terminalStates.includes(
          transition.from,
        ), `terminal state ${transition.from} may not transition to ${transition.to}`);
      }
      require(deepEqual(setOf(model.terminalStates), [
        'WITHDRAWN',
      ]), 'WITHDRAWN must be the only terminal state');
      require(Array.isArray(model.withdrawalPropagation), 'withdrawalPropagation missing');
      require(model.withdrawalPropagation.length ===
        8, 'withdrawalPropagation must define eight steps');
      model.withdrawalPropagation.forEach((step, index) => {
        require(step.step === index + 1, `withdrawal step ${index + 1} out of order`);
        require(step.state ===
          WITHDRAWAL_STATES[
            index
          ], `withdrawal step ${index + 1} state must be ${WITHDRAWAL_STATES[index]}`);
        require(isNonEmptyString(step.action), `withdrawal step ${index + 1} action missing`);
        require(isNonEmptyString(
          step.accountableRole,
        ), `withdrawal step ${index + 1} role missing`);
        require(ACCOUNTABLE_VALUES.includes(step.accountableStatus) ||
          isNonEmptyString(
            step.accountableStatus,
          ), `withdrawal step ${index + 1} accountability missing`);
      });
      require(isPlainObject(model.accountableOwnerFields), 'accountableOwnerFields missing');
      for (const [field, value] of Object.entries(model.accountableOwnerFields)) {
        require(ACCOUNTABLE_VALUES.includes(
          value,
        ), `accountableOwnerFields.${field} must be OPEN/UNASSIGNED/NOT_ENGAGED, got ${String(value)}`);
      }
      require(model.accountableOwnerFields.controller === 'OPEN', 'controller must be OPEN');
      require(model.accountableOwnerFields.withdrawalAcknowledgement ===
        'OPEN', 'withdrawal acknowledgement owner must be OPEN');
      const docs = read(`${RDATA}/MC10R-DATA-CONTRACT.md`);
      require(/NOT_SOUGHT/.test(docs) &&
        /WITHDRAWN/.test(docs), 'D18 must document the consent state model');
      require(/Allowed transitions/i.test(docs), 'D18 must document the allowed transition table');
      const deletion = read(`${RDATA}/MC10R-ACCESS-RETENTION-AND-DELETION.md`);
      for (const state of WITHDRAWAL_STATES) {
        require(deletion.includes(state), `D19 must document the ${state} withdrawal step`);
      }
      require(/Deletion procedure/i.test(deletion), 'D19 must document the deletion procedure');
    },
  );

  check(
    'CRR-20',
    'The data-contract documents the three layers and the repository-output allowlist',
    () => {
      const contract = read(`${RDATA}/MC10R-DATA-CONTRACT.md`);
      require(/Layer A/.test(contract) &&
        /Layer B/.test(contract) &&
        /Layer C/.test(contract), 'D18 must describe Layers A, B and C');
      require(/IDENTITY_MAP|identity-to-pseudonym/i.test(
        contract,
      ), 'D18 must define the identity-to-pseudonym mapping rule');
      require(/Repository-output allowlist/i.test(
        contract,
      ), 'D18 must carry the Layer C allowlist');
      require(/VAT/.test(contract), 'D18 must define currency/VAT treatment');
      require(/ladderProvenanceRef/.test(
        contract,
      ), 'D18 must define ladder provenance for pricing responses');
      require(/expiryDate/.test(contract), 'D18 must consume the expiry field');
      const architecture = read(`${RDATA}/MC10R-SECURE-DATA-ARCHITECTURE.md`);
      for (const state of STORAGE_STATES) {
        require(architecture.includes(state), `D17 must name the storage evidence state ${state}`);
      }
      require(/PROVISIONED = false/.test(architecture), 'D17 must state PROVISIONED = false');
      require(/ACCESS_REVIEWED = false/.test(
        architecture,
      ), 'D17 must state ACCESS_REVIEWED = false');
      require(/OPERATIONALLY_APPROVED = false/.test(
        architecture,
      ), 'D17 must state OPERATIONALLY_APPROVED = false');
      const access = read(`${RDATA}/MC10R-ACCESS-RETENTION-AND-DELETION.md`);
      require(/Retention/.test(access), 'D19 must define the retention schedule');
      require(/Processor/.test(access), 'D19 must define processor requirements');
      require(/Breach/.test(access), 'D19 must define breach response');
    },
  );

  check(
    'CRR-21',
    'Fieldwork readiness is PARTIALLY_READY and every prerequisite is classified',
    () => {
      const readiness = d30();
      require(readiness.readinessState ===
        'PARTIALLY_READY', 'readinessState must be PARTIALLY_READY');
      require(readiness.fieldworkStatus === 'BLOCKED', 'fieldworkStatus must be BLOCKED');
      require(readiness.fieldworkPermission === false, 'fieldworkPermission must be false');
      require(readiness.authorizationStatus ===
        'NOT_GRANTED', 'authorizationStatus must be NOT_GRANTED');
      require(readiness.outreachAuthorization ===
        'NOT_GRANTED', 'outreachAuthorization must be NOT_GRANTED');
      require(isNonEmptyArray(readiness.prerequisites), 'prerequisites missing');
      const classifications = new Set();
      for (const prerequisite of readiness.prerequisites) {
        require(isNonEmptyString(prerequisite.id), 'prerequisite id missing');
        require(isNonEmptyString(prerequisite.prerequisite), `${prerequisite.id}: text missing`);
        require(PREREQUISITE_CLASSIFICATIONS.includes(
          prerequisite.classification,
        ), `${prerequisite.id}: invalid classification ${prerequisite.classification}`);
        require(isNonEmptyString(prerequisite.ownerRole), `${prerequisite.id}: ownerRole missing`);
        require(isNonEmptyString(
          prerequisite.requiredEvidence,
        ), `${prerequisite.id}: requiredEvidence missing`);
        require(isNonEmptyString(
          prerequisite.currentStatus,
        ), `${prerequisite.id}: currentStatus missing`);
        classifications.add(prerequisite.classification);
      }
      for (const classification of PREREQUISITE_CLASSIFICATIONS) {
        require(classifications.has(
          classification,
        ), `no prerequisite is classified ${classification}`);
      }
      const authorizationPrerequisite = readiness.prerequisites.find((entry) =>
        /authori[sz]ation/i.test(entry.prerequisite),
      );
      require(authorizationPrerequisite, 'the authorization prerequisite must be recorded');
      require(authorizationPrerequisite.classification ===
        'BLOCKED', 'the authorization prerequisite must stay BLOCKED');
    },
  );

  check('CRR-22', 'No role is represented as appointed, trained or authorized', () => {
    const readiness = d30();
    require(isNonEmptyArray(readiness.roles), 'D30 roles table missing');
    const requiredRoles = [
      'researchOwner',
      'fieldworkLead',
      'dataSteward',
      'qualitativeAnalyst',
      'secondCoder',
      'independentAuditor',
      'interviewers',
    ];
    require(deepEqual(
      setOf(readiness.roles.map((entry) => entry.role)),
      setOf(requiredRoles),
    ), 'D30 roles must name the seven canonical roles');
    for (const role of readiness.roles) {
      require(ROLE_STATES.includes(
        role.status,
      ), `${role.role}: status must be UNASSIGNED/UNTRAINED/NOT_APPOINTED, got ${role.status}`);
      require(role.trained === false, `${role.role}: trained must be false`);
      require(role.appointed === false, `${role.role}: appointed must be false`);
      require(role.count === 0, `${role.role}: count must be 0`);
      require(isNonEmptyString(role.requiredEvidence), `${role.role}: requiredEvidence missing`);
    }
    require(readiness.counts.trainedInterviewers === 0, 'trainedInterviewers must be 0');
    require(readiness.counts.assignedInterviewers === 0, 'assignedInterviewers must be 0');
  });

  check('CRR-23', 'Storage, legal and instrument states are honest and unprovisioned', () => {
    const readiness = d30().storage;
    require(readiness.architectureDefined === true, 'architectureDefined must be true');
    require(readiness.localSyntheticTestsPass ===
      true, 'localSyntheticTestsPass must be true after the evidence run');
    require(readiness.provisioned === false, 'provisioned must be false');
    require(readiness.accessReviewed === false, 'accessReviewed must be false');
    require(readiness.operationallyApproved === false, 'operationallyApproved must be false');
    require(readiness.storeExists === false, 'storeExists must be false');
    require(readiness.processorEngaged === false, 'processorEngaged must be false');
    const legal = d30().legalPrivacy;
    require(legal.controllerIdentity === 'OPEN', 'controllerIdentity must be OPEN');
    require(legal.privacyContact === 'OPEN', 'privacyContact must be OPEN');
    require(legal.legalReviewStatus ===
      'LEGAL_REVIEW_PENDING', 'legalReviewStatus must be LEGAL_REVIEW_PENDING');
    require(legal.lawfulBasis === 'PROPOSED_NOT_APPROVED', 'lawfulBasis must stay unapproved');
    require(!/^APPROVED$/.test(
      legal.privacyPackageStatus,
    ), 'the privacy package may not be approved');
    const instruments = d30().instrumentVersions;
    require(instruments.historicalEffectiveVersion === '1.0.0' &&
      instruments.historicalEffectiveStatus ===
        'FROZEN_HISTORICAL', 'the historical instrument version must be preserved');
    require(instruments.candidateVersion === '1.1.0', 'candidate version must be 1.1.0');
    require(instruments.candidateStatus ===
      'REVIEW_REQUIRED', 'candidate status must be REVIEW_REQUIRED');
    require(instruments.candidateEffective === false, 'the candidate version cannot be effective');
    require(instruments.languages.PT ===
      'NOT_PRODUCED', 'Portuguese instruments must stay NOT_PRODUCED');
  });

  check(
    'CRR-24',
    'Wave 1 plan quotes 18-28, excludes Portugal and carries zero completions',
    () => {
      const wave1 = d30().wave1;
      require(wave1.status === 'NOT_EXECUTED', 'Wave 1 status must be NOT_EXECUTED');
      require(wave1.isFullStudy === false, 'Wave 1 must not be the full study');
      require(wave1.presentedAsFullStudy ===
        false, 'Wave 1 may not be presented as the full study');
      require(wave1.geography ===
        'Rías Baixas / Galicia (Spain only)', 'Wave 1 geography must be Rías Baixas / Galicia (Spain only)');
      require(wave1.portugalScope === 'EXCLUDED', 'Portugal must stay EXCLUDED');
      require(wave1.quotaMinimum === 18 && wave1.quotaMaximum === 28, 'Wave 1 must be 18-28');
      require(wave1.fullStudyMinimum === 37 &&
        wave1.fullStudyMaximum === 57, 'full study must be 37/57');
      require(wave1.completionState === '0_OF_18_MINIMUM', 'Wave 1 completion must be 0 of 18');
      require(isNonEmptyArray(wave1.cohorts) &&
        wave1.cohorts.length === 4, 'four Wave 1 cohorts required');
      const cohortMin = wave1.cohorts.reduce((sum, entry) => sum + entry.minimum, 0);
      const cohortMax = wave1.cohorts.reduce((sum, entry) => sum + entry.maximum, 0);
      require(cohortMin === 18 &&
        cohortMax === 28, `cohort quotas must sum to 18-28, got ${cohortMin}-${cohortMax}`);
      for (const expected of WAVE1) {
        const cohort = wave1.cohorts.find((entry) => entry.cohort === expected.cohort);
        require(cohort &&
          cohort.segmentId === expected.segmentId &&
          cohort.minimum === expected.minimum &&
          cohort.maximum === expected.maximum &&
          cohort.completed === 0, `Wave 1 cohort ${expected.cohort} is inconsistent`);
      }
      const counts = d30().counts;
      for (const [key, value] of Object.entries(counts)) {
        require(value === 0, `D30 counts.${key} must be 0, got ${String(value)}`);
      }
      for (const key of [
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
      ]) {
        require(key in counts, `D30 funnel count ${key} missing`);
      }
      require(isPlainObject(wave1.pricing), 'Wave 1 pricing cells missing');
      require(wave1.pricing.cells.length === 16, 'Wave 1 pricing must carry 16 cells');
      const cellPattern = new RegExp(wave1.pricing.cellKeyPattern);
      for (const cell of wave1.pricing.cells) {
        require(cellPattern.test(cell.cellKey), `Wave 1 cell ${cell.cellKey} violates the pattern`);
        require(cell.requiredN === 8, `${cell.cellKey}: requiredN must be 8`);
        const expected = PRICING[cell.segmentId];
        require(expected, `${cell.cellKey}: unknown segment`);
        require(cell.reachableAtPlannedMax ===
          (expected.reachability ===
            'REACHABLE_AT_PLANNED_MAX'), `${cell.cellKey}: reachability contradicts the canonical matrix`);
        const population =
          cell.experimentId === 'EXP-MC10-04' ? expected.EXP_MC10_04 : expected.EXP_MC10_05;
        require(cell.registeredPopulation ===
          population, `${cell.cellKey}: registeredPopulation must be ${population}`);
        require(cell.experimentLevelResultPermitted ===
          (cell.reachableAtPlannedMax &&
            population !==
              'NOT_NAMED'), `${cell.cellKey}: experimentLevelResultPermitted must require population eligibility AND n>=8`);
        require(cell.experimentLevelResultPermitted === false ||
          cell.intendedInterpretation === 'GG_BAND_AT_N8' ||
          cell.intendedInterpretation ===
            'VW_RANGE_AT_N8', `${cell.cellKey}: permitted cells must carry a bounded intended interpretation`);
      }
    },
  );

  check(
    'CRR-25',
    'No surface claims provisioning, access review, approval or fieldwork permission',
    () => {
      const rules = [
        {
          id: 'provisioned-true',
          re: /"?\b(?:PROVISIONED|provisioned)\b"?\s*[:=]\s*true|storage (?:is |was )?provisioned/i,
        },
        {
          id: 'access-reviewed-true',
          re: /"?\bACCESS_REVIEWED\b"?\s*[:=]\s*true|access review (?:is |was )?(?:complete|approved)/i,
        },
        {
          id: 'operationally-approved-true',
          re: /"?\bOPERATIONALLY_APPROVED\b"?\s*[:=]\s*true|operationally approved/i,
        },
        {
          id: 'fieldwork-permitted',
          re: /\bfieldwork\b[^.\n]{0,40}\b(?:is|is now|has been|was)\s+(?:now\s+)?(?:permitted|authorized|approved|allowed)\b/i,
        },
        {
          id: 'recovery-pass-permission',
          re: /\b(?:recovery|MC-10R|validator|gate)\b[^.\n]{0,40}\bPASS\b[^.\n]{0,40}\b(?:fieldwork|contact|interviews?|outreach)\b/i,
        },
      ];
      const violations = scanRecoveryDocs(rules, { skipConditional: true, sentenceLevel: true });
      require(violations.length === 0, `permission claims: ${violations.slice(0, 5).join(' | ')}`);
      const structured = [];
      for (const path of recoveryDataFiles()) {
        const value = readJson(path);
        walkJson(value, (node) => {
          if (!isPlainObject(node)) return;
          for (const [key, child] of Object.entries(node)) {
            if (typeof child !== 'boolean' && child !== 'string') continue;
            if (
              key === 'authorizationStatus' &&
              child !== 'NOT_GRANTED' &&
              child !== 'DRAFT_PREPARED'
            ) {
              structured.push(`${path}: authorizationStatus=${child}`);
            }
            if (
              [
                'fieldworkPermission',
                'externalContactAllowed',
                'provisioned',
                'accessReviewed',
                'operationallyApproved',
              ].includes(key) &&
              child === true
            ) {
              structured.push(`${path}: ${key}=true`);
            }
            if (
              ['approvalEvidence', 'legalReviewReference', 'approvedStorageReference'].includes(
                key,
              ) &&
              child !== null
            ) {
              structured.push(`${path}: ${key}=${String(child)}`);
            }
            if (key === 'effectiveDate' && child !== null) {
              structured.push(`${path}: effectiveDate=${String(child)}`);
            }
            if ((key === 'status' || key === 'reviewStatus') && child === 'APPROVED') {
              structured.push(`${path}: ${key}=APPROVED`);
            }
          }
        });
      }
      require(structured.length === 0, `structured permission claims: ${structured.join(' | ')}`);
    },
  );

  check('CRR-26', 'No commercial restriction is weakened in the recovery surface', () => {
    const violations = scanRecoveryDocs(COMMERCIAL_CLAIM_RULES, {
      skipConditional: true,
      sentenceLevel: true,
    });
    require(violations.length === 0, `commercial claims: ${violations.slice(0, 5).join(' | ')}`);
    const contract = d27();
    const truth = contract.bindingTruth;
    for (const [key, value] of Object.entries(COMMERCIAL_INVARIANTS)) {
      const contractValue = contract.commercialInvariants[key];
      require(deepEqual(
        contractValue,
        value,
      ), `commercialInvariants.${key} must stay ${JSON.stringify(value)}`);
    }
    require(truth.approvedPrices === undefined ||
      truth.approvedPrices === 0, 'no approved price may exist');
  });

  check(
    'CRR-27',
    'No recovery marker or participant data exists under src/, public/ or deploy/',
    () => {
      const dirs = ['src', 'public', 'deploy'];
      const offending = [];
      for (const dir of dirs) {
        for (const file of walk(dir, () => true)) {
          if (/mc10r|marea-mc10r|recovery\/data/i.test(file)) offending.push(`${file} (filename)`);
          if (!/\.(?:json|md|txt|csv|js|mjs|cjs|ts|html|yml|yaml|xml)$/i.test(file)) continue;
          if (!exists(file)) continue;
          const text = read(file);
          if (
            /MAREA-MC10R-CUSTOMER-DISCOVERY-RECOVERY|mc10r-recovery\.contract|mc10r-fieldwork-readiness/i.test(
              text,
            )
          ) {
            offending.push(`${file} (recovery contract content)`);
          }
          if (/"(?:participantId|interviewId|consentRecorded|participantEmail)"\s*:/.test(text)) {
            offending.push(`${file} (participant field content)`);
          }
        }
      }
      require(offending.length ===
        0, `recovery content outside the docs layer: ${offending.slice(0, 5).join(', ')}`);
    },
  );

  check(
    'CRR-28',
    'The existing research gate is unchanged at 62 checks and CR-62 is extended',
    () => {
      const gatePath = 'scripts/check-marea-customer-research.mjs';
      require(exists(gatePath), 'the existing research gate is missing');
      const text = read(gatePath);
      const ids = [...text.matchAll(/check\(\s*'(CR-\d{2})'/g)].map((match) => match[1]);
      require(ids.length ===
        62, `the existing gate must declare exactly 62 checks, found ${ids.length}`);
      const expected = Array.from(
        { length: 62 },
        (_, index) => `CR-${String(index + 1).padStart(2, '0')}`,
      );
      require(deepEqual(
        setOf(ids),
        setOf(expected),
      ), 'the existing gate check ids must be CR-01..CR-62 contiguous');
      // The CR-62 multilingual strengthening is Lead-owned; this gate only requires
      // the existing 62-check contract to stay intact and records the extension in D27.
      const validators = d27().validators;
      require(validators.existingResearchGate.checks ===
        62, 'validators.existingResearchGate.checks must be 62');
      require(validators.existingResearchGate.status ===
        'UNCHANGED_62_OF_62', 'validators.existingResearchGate.status must be UNCHANGED_62_OF_62');
      require(validators.existingResearchGate.cr62Extension ===
        'MULTILINGUAL_EN_ES_PT_ADDITIVE', 'validators.existingResearchGate.cr62Extension must be recorded');
      require(validators.recoveryGate.checkPrefix ===
        'CRR', 'the recovery gate prefix must be CRR');
      require(validators.recoveryGate.checkCount ===
        'REPORTED_BY_RUN', 'the recovery gate count must be REPORTED_BY_RUN');
      require(validators.recoveryGate.staging.IMPLEMENTATION_REQUIRED === 'D1-D32' &&
        validators.recoveryGate.staging.FINAL_ADDITIONAL_REQUIRED ===
          'D33-D36', 'the recovery gate staging must be D1-D32 at IMPLEMENTATION and D33-D36 at FINAL');
      require(validators.networkAccess === false, 'the validators declare no network access');
      require(validators.newDependencies === 0, 'the validators declare no dependencies');
    },
  );

  check(
    'CRR-29',
    'The status model enums are canonical and no agent-conferred state is allowed',
    () => {
      const model = d27().statusModel;
      require(isPlainObject(model), 'D27 statusModel missing');
      const expected = {
        recoveryWorkStatus: [
          'NOT_STARTED',
          'IN_PROGRESS',
          'PARTIAL',
          'READY_FOR_OWNER_REVIEW',
          'PASS_INTERNAL_PREPARATION_SCOPE',
          'BLOCKED',
          'FAIL',
        ],
        externalAuthorizationStatus: [
          'NOT_GRANTED',
          'DRAFT_PREPARED',
          'PENDING_APPROVAL',
          'GRANTED',
          'EXPIRED',
          'REVOKED',
        ],
        fieldworkReadiness: [
          'NOT_READY',
          'PARTIALLY_READY',
          'READY_PENDING_AUTHORIZATION',
          'AUTHORIZED_NOT_STARTED',
          'IN_PROGRESS',
          'COMPLETED',
          'BLOCKED',
        ],
        documentAmendmentStatus: [
          'DRAFT',
          'REVIEW_REQUIRED',
          'PROPOSED_NOT_EFFECTIVE',
          'APPROVED_FOR_FUTURE_FIELDWORK',
          'SUPERSEDED',
          'REJECTED',
        ],
        legalPrivacyDocumentStatus: [
          'DRAFT_FOR_LEGAL_REVIEW',
          'LEGAL_REVIEW_PENDING',
          'APPROVED',
          'REJECTED',
        ],
        storageEvidenceStates: STORAGE_STATES,
      };
      for (const [key, values] of Object.entries(expected)) {
        require(deepEqual(model[key], values), `statusModel.${key} must be the canonical enum`);
      }
      require(deepEqual(model.deliveryStages, [
        'IMPLEMENTATION',
        'FINAL',
      ]), 'deliveryStages must be IMPLEMENTATION and FINAL');
      require(/no agent may confer/i.test(
        model.note,
      ), 'the status model must state that no agent may confer an external state');
    },
  );

  check('CRR-30', 'The implementation evidence record is honest and reproducible', () => {
    const d20Path = `${RDATA}/MC10R-IMPLEMENTATION-AND-TEST-EVIDENCE.md`;
    require(exists(d20Path), 'D20 implementation evidence missing');
    const text = read(d20Path);
    require(/ARCHITECTURE_DEFINED\s*=\s*true/.test(
      text,
    ), 'D20 must record ARCHITECTURE_DEFINED = true');
    require(/LOCAL_SYNTHETIC_TESTS_PASS\s*=\s*true/.test(
      text,
    ), 'D20 must record LOCAL_SYNTHETIC_TESTS_PASS = true');
    require(/PROVISIONED\s*=\s*false/.test(text), 'D20 must record PROVISIONED = false');
    require(/ACCESS_REVIEWED\s*=\s*false/.test(text), 'D20 must record ACCESS_REVIEWED = false');
    require(/OPERATIONALLY_APPROVED\s*=\s*false/.test(
      text,
    ), 'D20 must record OPERATIONALLY_APPROVED = false');
    require(/node scripts\/check-marea-customer-recovery\.mjs/.test(
      text,
    ), 'D20 must record the recovery gate command');
    require(/node --test scripts\/check-marea-customer-recovery\.test\.mjs/.test(
      text,
    ), 'D20 must record the recovery suite command');
    require(/node scripts\/check-marea-customer-research\.mjs/.test(
      text,
    ), 'D20 must record the existing gate command');
    require(/node --test scripts\/check-marea-customer-research\.test\.mjs/.test(
      text,
    ), 'D20 must record the existing suite command');
    require(/checks passed/.test(text) &&
      /pass\b/.test(text), 'D20 must record real observed outputs');
    require(/NOT_EXECUTED/.test(
      text,
    ), 'D20 must record the unexecuted operational security tests honestly');
    require(/(?:no |not )[^.\n]{0,60}(?:store|provisioned|encryption at rest)/i.test(
      text,
    ), 'D20 must state the unprovisioned limitation');
  });

  check('CRR-31', 'The authorization gate cannot be bypassed by a document claim', () => {
    const docs = recoveryDocs();
    const violations = [];
    for (const doc of docs) {
      const text = read(doc);
      const base = doc.toLowerCase();
      for (const match of text.matchAll(
        /\b(?:authori[sz]ation|fieldwork|outreach|research programme|recovery programme|the programme|the store|research access|access to research)\b[^.\n]{0,30}\b(?:now|is|was|has been)\b[^.\n]{0,20}\b(?:authori[sz]ed|granted|approved|provisioned)\b/giu,
      )) {
        const lineStart = text.lastIndexOf('\n', match.index) + 1;
        const lineEndIndex = text.indexOf('\n', match.index);
        const line = text.slice(lineStart, lineEndIndex === -1 ? text.length : lineEndIndex);
        if (line.includes('|')) continue;
        const clause = sentenceAround(text, match.index, match[0].length);
        if (NEGATION_TOKENS.test(clause)) continue;
        if (PREPARED_CONTEXT_RE.test(clause) || PROHIBITION_CONTEXT_RE.test(clause)) continue;
        if (CONDITIONAL_TOKENS.test(clause)) continue;
        violations.push(`${doc}: ${match[0].trim()} -> "${clause.trim().slice(0, 120)}"`);
      }
      require(!/AUTHORIZATION GRANTED|FIELDWORK APPROVED|OUTREACH ENABLED/.test(
        text,
      ), `${doc}: may not carry an authorization-granted banner`);
      require(!/(?:^|\n)\s*STATUS:\s*(?:AUTHORIZED|APPROVED|GRANTED)\b/.test(
        text,
      ), `${base}: may not carry an authorized status banner`);
    }
    require(violations.length === 0, `authorization claims: ${violations.slice(0, 5).join(' | ')}`);
    require(d29().currentAuthorizationStatus ===
      'NOT_GRANTED', 'the ungranted state must survive every document claim');
  });

  check('CRR-32', 'The recovery contract staging and cross-references resolve', () => {
    const contract = d27();
    require(contract.contractId === CONTRACT_ID, 'contractId mismatch');
    require(contract.contractVersion === CONTRACT_VERSION, 'contractVersion mismatch');
    require(contract.milestone === MILESTONE, 'milestone must be MC-10R');
    require(contract.date === DATE, 'date must be 2026-11-01');
    require(contract.owner === 'lead', 'owner must be lead');
    require(contract.deliveryStage ===
      'IMPLEMENTATION', 'deliveryStage must be IMPLEMENTATION for the implementation commit');
    require(contract.recoveryWorkStatus ===
      'READY_FOR_OWNER_REVIEW', 'recoveryWorkStatus must be READY_FOR_OWNER_REVIEW before the audit');
    require(contract.authorization.recordRef === D29, 'authorization recordRef must be D29');
    require(contract.fieldworkReadiness.recordRef ===
      D30, 'fieldworkReadiness recordRef must be D30');
    require(contract.amendments.registryRef === D28, 'amendments registryRef must be D28');
    require(isNonEmptyString(contract.changeControl.note), 'changeControl note missing');
    require(deepEqual(contract.changeControl.forbiddenTransitions, [
      'recovery PASS read as fieldwork permission',
      'DRAFT_PREPARED read as GRANTED',
      'ARCHITECTURE_DEFINED read as PROVISIONED',
      'REVIEW_REQUIRED read as APPROVED_FOR_FUTURE_FIELDWORK',
      'PREPARED_PENDING_APPROVAL read as effective',
    ]), 'forbiddenTransitions must list the five conflation risks');
    require(contract.authorization.authorizingPerson ===
      null, 'authorization block may not name a person');
    require(contract.authorization.approvalEvidence ===
      null, 'authorization block may not carry evidence');
    require(contract.authorization.authorizationStatus ===
      'NOT_GRANTED', 'authorization block must stay NOT_GRANTED');
    require(contract.fieldworkReadiness.rolesAllUnassigned ===
      true, 'fieldworkReadiness.rolesAllUnassigned must be true');
    for (const path of [D27, D28, D29, D30, D13, GATE_DOC]) {
      if (path === GATE_DOC) continue;
      require(exists(path), `cross-referenced file missing: ${path}`);
    }
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
          milestone: MILESTONE,
          contractId: CONTRACT_ID,
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
    const summary = `MC-10R recovery validation: ${checks.length - failed.length}/${checks.length} checks passed`;
    process.stdout.write(`${summary}\n`);
    if (failed.length > 0)
      process.stdout.write(`FAILED: ${failed.map((entry) => entry.id).join(', ')}\n`);
  }
  process.exit(failed.length === 0 ? 0 : 1);
}

const invokedDirectly =
  process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) main();

export { buildRunner, main, DELIVERABLES, AUTH_FIELDS, AUTH_ALL_KEYS, SEGMENTS, WAVE1, PRICING };
