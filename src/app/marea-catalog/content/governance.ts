import type { Localized } from './content.types';

/**
 * MC-25 bilingual copy for the internal SKU governance screen.
 *
 * Claim discipline (inherited from MC-03/MC-14 and enforced by the catalogue
 * claim guard): no price, no availability claim, no certification, no
 * compatibility promise, no guarantee. Every statement about a commercial
 * prerequisite says it is missing, unverified or blocked — because it is.
 *
 * Presentation only: identity, lifecycle, readiness and blockers are read from
 * the generated MC-16 projection and the deterministic engine, never authored
 * here.
 */
export const GOVERNANCE_LABELS: Readonly<Record<string, Localized>> = {
  heading: {
    es: 'Gobernanza de SKU: preparación comercial',
    en: 'SKU governance: commercial readiness',
  },
  kicker: { es: 'Herramienta interna', en: 'Internal tool' },
  intro: {
    es: 'Esta pantalla evalúa por qué cada edición canónica del catálogo MAREA no puede venderse. Lee los contratos de producto, precio, inventario, publicación y bloqueadores, y aplica el motor determinista de preparación. No calcula precios, no modifica datos y no aprueba nada.',
    en: 'This screen evaluates why each canonical MAREA catalogue edition cannot be sold. It reads the product, price, inventory, publication and blocker contracts and applies the deterministic readiness engine. It does not compute prices, does not change data and approves nothing.',
  },
  noticeHeading: { es: 'Límites de esta pantalla', en: 'Limits of this screen' },
  noticeNoPrice: {
    es: 'No hay ningún precio aprobado: PRICE_APPROVED = NONE. No se muestra ni se inventa un importe.',
    en: 'No price is approved: PRICE_APPROVED = NONE. No amount is shown or invented.',
  },
  noticeNoStock: {
    es: 'No existe stock MAREA verificado: 0 filas de inventario verificado. El stock introducido a mano no cuenta como stock de MAREA.',
    en: 'No verified MAREA stock exists: 0 verified inventory rows. Admin-entered stock does not count as MAREA stock.',
  },
  noticeNoSku: {
    es: 'No hay códigos de SKU comercial aprobados: 0 códigos de comerciante establecidos. Un candidato no es un SKU aprobado.',
    en: 'No approved merchant SKU codes exist: 0 merchant SKU codes established. A candidate is not an approved SKU.',
  },
  noticeNoPublication: {
    es: 'La publicación y el despliegue no están autorizados, y las puertas legales externas siguen abiertas. Ningún resultado es pedible.',
    en: 'Publication and deployment are not authorized, and the external legal gates remain open. No result is orderable.',
  },
  subjectHeading: { es: 'Sujeto evaluado', en: 'Subject under evaluation' },
  subjectLegend: { es: 'Familia de producto', en: 'Product family' },
  subjectHelp: {
    es: 'Elige una familia y una edición canónica. La selección no implica disponibilidad comercial.',
    en: 'Choose a canonical family and edition. Selecting one does not imply commercial availability.',
  },
  editionLegend: { es: 'Edición canónica', en: 'Canonical edition' },
  identityHeading: { es: 'Identidad canónica', en: 'Canonical identity' },
  familyLabel: { es: 'Familia', en: 'Family' },
  editionLabel: { es: 'Edición', en: 'Edition' },
  candidateLabel: { es: 'SKU candidato', en: 'Candidate SKU' },
  merchantSkuLabel: { es: 'Código de SKU de comerciante', en: 'Merchant SKU code' },
  merchantSkuNone: { es: 'No establecido', en: 'Not established' },
  identityKindLabel: { es: 'Tipo de identidad', en: 'Identity kind' },
  contractRefLabel: { es: 'Contrato de origen', en: 'Source contract' },
  readinessHeading: { es: 'Requisitos de preparación', en: 'Readiness prerequisites' },
  verdictHeading: { es: 'Resultado', en: 'Result' },
  verdictNotOrderable: { es: 'NO PEDIBLE', en: 'NOT ORDERABLE' },
  verdictExplanation: {
    es: 'Al menos un requisito comercial no se cumple. Mientras falte uno solo, la edición no puede convertirse en un SKU vendible.',
    en: 'At least one commercial prerequisite is not satisfied. While a single one is missing, the edition cannot become a sellable SKU.',
  },
  missingHeading: { es: 'Requisitos pendientes', en: 'Outstanding prerequisites' },
  missingIntro: {
    es: 'Estos son los requisitos que hoy impiden la venta, en el orden del contrato.',
    en: 'These are the prerequisites that prevent a sale today, in contract order.',
  },
  tableCaptionReadiness: {
    es: 'Requisitos de preparación comercial por edición',
    en: 'Commercial readiness prerequisites per edition',
  },
  colPrerequisite: { es: 'Requisito', en: 'Prerequisite' },
  colStatus: { es: 'Estado', en: 'Status' },
  colReason: { es: 'Motivo', en: 'Reason' },
  colBlockers: { es: 'Bloqueadores MC-02', en: 'MC-02 blockers' },
  statusPassed: { es: 'CUMPLIDO', en: 'SATISFIED' },
  statusFailed: { es: 'PENDIENTE', en: 'OUTSTANDING' },
  statusUnknown: { es: 'DESCONOCIDO', en: 'UNKNOWN' },
  statusNotApplicable: { es: 'NO APLICABLE', en: 'NOT APPLICABLE' },
  statusNaPermitted: {
    es: 'No aplicable y el contrato lo permite expresamente para este producto de software.',
    en: 'Not applicable, and the contract explicitly permits it for this software product.',
  },
  statusNaNotPermitted: {
    es: 'No aplicable no equivale a aprobación: el contrato no lo permite para este producto.',
    en: 'Not applicable is not approval: the contract does not permit it for this product.',
  },
  blockersHeading: { es: 'Bloqueadores MC-02 referenciados', en: 'Referenced MC-02 blockers' },
  blockersIntro: {
    es: 'Cada bloqueador procede del registro MC-16 y del mapeo de puertas de publicación. Una puerta abierta no puede darse por cerrada.',
    en: 'Every blocker comes from the MC-16 register and the release-gate mapping. An open gate cannot be treated as closed.',
  },
  blockersNone: { es: 'Ninguno referenciado.', en: 'None referenced.' },
  tableCaptionBlockers: { es: 'Bloqueadores MC-02 por SKU', en: 'MC-02 blockers per SKU' },
  blockerId: { es: 'Identificador', en: 'Identifier' },
  blockerStatus: { es: 'Estado', en: 'State' },
  blockerOwner: { es: 'Responsable del cierre', en: 'Closure owner' },
  blockerEvidence: { es: 'Evidencia exigida', en: 'Required evidence' },
  provenanceHeading: { es: 'Procedencia de la evidencia', en: 'Evidence provenance' },
  provenanceIntro: {
    es: 'Cada dato se transcribe de un contrato versionado. El resumen SHA-256 permite comprobar que la decisión se apoya en los bytes actuales del contrato.',
    en: 'Every value is transcribed from a versioned contract. The SHA-256 digest proves the decision rests on the current contract bytes.',
  },
  provenanceContract: { es: 'Contrato', en: 'Contract' },
  provenanceVersion: { es: 'Versión', en: 'Version' },
  provenanceDigest: { es: 'SHA-256', en: 'SHA-256' },
  provenanceEvidence: {
    es: 'Evidencias citadas por la edición',
    en: 'Evidence cited by the edition',
  },
  lifecycleHeading: { es: 'Elegibilidad de ciclo de vida', en: 'Lifecycle eligibility' },
  lifecycleIntro: {
    es: 'El ciclo interno de gobernanza solo llega a READY_FOR_REVIEW. No existe ningún estado pedible, vendible ni publicado.',
    en: 'The internal governance lifecycle reaches READY_FOR_REVIEW only. No orderable, sellable or published state exists.',
  },
  lifecycleStateLabel: { es: 'Estado interno', en: 'Internal state' },
  lifecycleOptionsHeading: { es: 'Transiciones evaluadas', en: 'Evaluated transitions' },
  lifecyclePermitted: { es: 'Permitida', en: 'Permitted' },
  lifecycleRefused: { es: 'Rechazada', en: 'Refused' },
  lifecycleTerminal: {
    es: 'READY_FOR_REVIEW es terminal en este hito: no hay backend de aprobación verificado al que promover.',
    en: 'READY_FOR_REVIEW is terminal in this milestone: there is no verified approval backend to promote into.',
  },
  lifecycleStateDraft: { es: 'Borrador', en: 'Draft' },
  lifecycleStateIncomplete: { es: 'Incompleto', en: 'Incomplete' },
  lifecycleStateAwaiting: { es: 'Esperando evidencia', en: 'Awaiting evidence' },
  lifecycleStateBlocked: { es: 'Bloqueado', en: 'Blocked' },
  lifecycleStateReady: { es: 'Listo para revisión', en: 'Ready for review' },
  reviewsHeading: { es: 'Acciones de revisión interna', en: 'Internal review actions' },
  reviewsIntro: {
    es: 'Estas acciones se evalúan en el servidor de lógica de negocio, no en la interfaz. Ninguna puede aplicarse: no existe un mecanismo de autorización verificado ni un contrato de persistencia aprobado.',
    en: 'These actions are evaluated in the business logic, not in the interface. None can be applied: no verified authorization mechanism and no approved persistence contract exist.',
  },
  actionRequestEvidence: { es: 'Solicitar evidencia', en: 'Request evidence' },
  actionRecordDecision: { es: 'Registrar decisión de revisión', en: 'Record review decision' },
  reviewRefused: { es: 'Solicitud rechazada', en: 'Request refused' },
  reviewNoPersistence: {
    es: 'No se ha escrito nada: no hay almacén autorizado para aprobaciones de SKU.',
    en: 'Nothing was written: there is no authorized store for SKU approvals.',
  },
  reviewDurableNo: {
    es: 'Esta pantalla no emite una aprobación comercial duradera.',
    en: 'This screen does not issue a durable commercial approval.',
  },
  factsHeading: { es: 'Hechos verificados', en: 'Verified facts' },
  factEditionCount: { es: 'Ediciones canónicas evaluadas', en: 'Canonical editions evaluated' },
  factOrderableCount: { es: 'SKU pedibles', en: 'Orderable SKUs' },
  factOpenGates: { es: 'Puertas de publicación abiertas', en: 'Open release gates' },
  factMerchantSku: { es: 'Códigos de SKU comercial', en: 'Merchant SKU codes' },
  factApprovedPrices: { es: 'Precios aprobados', en: 'Approved prices' },
  factEvaluationVersion: { es: 'Versión de evaluación', en: 'Evaluation version' },
  factFingerprint: { es: 'Huella de la decisión', en: 'Decision fingerprint' },
  limitationsHeading: { es: 'Limitaciones declaradas', en: 'Declared limitations' },
  limitationNoBackend: {
    es: 'No existe backend de aprobación comercial ni registro de SKU de comerciante.',
    en: 'No commercial approval backend and no merchant SKU registry exist.',
  },
  limitationNoPersist: {
    es: 'Ninguna acción de revisión se persiste; la pantalla es de inspección.',
    en: 'No review action is persisted; the screen is for inspection.',
  },
  limitationNoCustomerData: {
    es: 'No se recogen datos de cliente ni datos personales.',
    en: 'No customer or personal data is collected.',
  },
  limitationExternalGates: {
    es: 'Las puertas legales y comerciales externas siguen abiertas y no las cierra este hito.',
    en: 'The external legal and commercial gates remain open; this milestone does not close them.',
  },
  limitationNoClaim: {
    es: 'Ninguna etiqueta de esta pantalla constituye una certificación, una promesa de compatibilidad ni una oferta.',
    en: 'No label on this screen is a certification, a compatibility promise or an offer.',
  },
  selectLabel: { es: 'Seleccionar', en: 'Select' },
  noSelection: { es: 'Sin selección', en: 'No selection' },
} as const;

/** Ordered limitation keys rendered in the limitations section. */
export const GOVERNANCE_LIMITATION_KEYS = [
  'limitationNoBackend',
  'limitationNoPersist',
  'limitationNoCustomerData',
  'limitationExternalGates',
  'limitationNoClaim',
] as const;

/** Ordered limit keys rendered in the notice region. */
export const GOVERNANCE_NOTICE_KEYS = [
  'noticeNoPrice',
  'noticeNoStock',
  'noticeNoSku',
  'noticeNoPublication',
] as const;

/** Lifecycle state label keys. */
export const GOVERNANCE_STATE_LABELS: Readonly<Record<string, string>> = {
  DRAFT: 'lifecycleStateDraft',
  INCOMPLETE: 'lifecycleStateIncomplete',
  AWAITING_EVIDENCE: 'lifecycleStateAwaiting',
  BLOCKED: 'lifecycleStateBlocked',
  READY_FOR_REVIEW: 'lifecycleStateReady',
};
