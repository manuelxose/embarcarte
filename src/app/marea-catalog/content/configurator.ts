import type { Localized } from './content.types';

/** Re-exported so callers type localized maps without reaching into content.types. */
export type ConfiguratorContentLocalized = Localized;

/**
 * MC-24 bilingual chrome copy for the internal configurator and quotation triage.
 *
 * Claim discipline (inherited from MC-03/MC-14 and enforced by the MC-20 claim
 * guard): no price, no availability claim, no guarantee, no certification, no
 * compatibility promise. Every claim-sensitive sentence states what is NOT known.
 */
export const CONFIGURATOR_LABELS: Readonly<Record<string, Localized>> = {
  heading: { es: 'Configurador interno y clasificación de consultas', en: 'Internal configurator and enquiry triage' },
  intro: {
    es: 'Esta herramienta clasifica una consulta interna según las reglas canónicas de MC-08 y los cuatro resultados de compatibilidad de D5. No calcula precios, no confirma compatibilidad y no permite comprar.',
    en: 'This tool classifies an internal enquiry against the MC-08 canonical rules and the four D5 compatibility outcomes. It does not compute prices, does not confirm compatibility and does not allow buying.',
  },
  noticeHeading: { es: 'Límites de esta herramienta', en: 'Limits of this tool' },
  noticeNoPrice: {
    es: 'No se muestra ningún precio: no hay precio aprobado para ninguna configuración.',
    en: 'No price is shown: no price is approved for any configuration.',
  },
  noticeNoPurchase: {
    es: 'No hay compra, reserva ni pedido: ningún resultado es un estado pedible.',
    en: 'There is no purchase, reservation or order: no result is an orderable state.',
  },
  noticeUnknown: {
    es: 'Una configuración desconocida o no comprobada nunca se presenta como válida.',
    en: 'An unknown or unverified configuration is never presented as valid.',
  },
  noticeNoTestedRow: {
    es: 'Hoy hay cero filas de compatibilidad comprobadas, así que el resultado de instalación propia no es alcanzable.',
    en: 'There are zero tested compatibility rows today, so the self-install result is not reachable.',
  },
  formHeading: { es: 'Cuestionario de configuración', en: 'Configuration questionnaire' },
  formDescription: {
    es: 'Las preguntas proceden del contrato canónico de paquetes (MC-08). Las preguntas de un grupo solo se aplican a los paquetes que indica el contrato.',
    en: 'The questions come from the canonical bundle contract (MC-08). A group applies only to the bundles the contract assigns to it.',
  },
  bundleLegend: { es: 'Paquete que se quiere evaluar', en: 'Bundle to evaluate' },
  bundleHelp: {
    es: 'Elige un paquete canónico. La selección no implica disponibilidad comercial.',
    en: 'Choose a canonical bundle. Selecting one does not imply commercial availability.',
  },
  groupGeneral: { es: 'Preguntas generales', en: 'General questions' },
  groupSafety: { es: 'Preguntas de seguridad', en: 'Safety questions' },
  groupFleet: { es: 'Preguntas B2B para flota', en: 'B2B fleet questions' },
  groupSafetyNote: {
    es: 'Se aplican a los paquetes que incluyen capacidades sensibles. Ninguna respuesta convertirá una instalación en válida si falla un requisito de seguridad.',
    en: 'These apply to the bundles that include safety-sensitive capabilities. No answer turns an installation valid when a safety prerequisite fails.',
  },
  answerPlaceholder: { es: 'Escribe la respuesta', en: 'Type the answer' },
  requiredMark: { es: 'Obligatoria', en: 'Required' },
  optionalMark: { es: 'No aplicable a este paquete', en: 'Not applicable to this bundle' },
  excludedLegend: { es: 'Capacidades solicitadas', en: 'Requested capabilities' },
  excludedHelp: {
    es: 'Marca solo lo que el cliente haya pedido explícitamente. El control de gobierno y la certificación NMEA 2000 están excluidos por diseño.',
    en: 'Select only what the customer explicitly asked for. Steering control and NMEA 2000 certification are excluded by design.',
  },
  excludedSteering: { es: 'Integración con el sistema de gobierno', en: 'Steering system integration' },
  excludedAutopilot: { es: 'Control del piloto automático', en: 'Autopilot control' },
  excludedNmea: { es: 'Certificación NMEA 2000', en: 'NMEA 2000 certification' },
  submit: { es: 'Clasificar consulta', en: 'Classify enquiry' },
  reset: { es: 'Empezar de nuevo', en: 'Start again' },
  resultHeading: { es: 'Resultado de la clasificación', en: 'Classification result' },
  resultEmpty: {
    es: 'Aún no hay resultado. Completa el cuestionario y clasifica la consulta.',
    en: 'No result yet. Complete the questionnaire and classify the enquiry.',
  },
  missingHeading: { es: 'Respuestas pendientes', en: 'Pending answers' },
  missingNote: {
    es: 'Sin estas respuestas no se puede clasificar la consulta.',
    en: 'Without these answers the enquiry cannot be classified.',
  },
  excludedHeading: { es: 'Capacidades no ofrecidas', en: 'Capabilities not offered' },
  excludedNote: {
    es: 'La solicitud pide una capacidad excluida por diseño. No se ofrece una alternativa que implique que funcionaría.',
    en: 'The request asks for a capability excluded by design. No workaround is offered that would imply it works.',
  },
  triageHeading: { es: 'Clasificación interna', en: 'Internal triage' },
  triageRoute: { es: 'Cola de tratamiento', en: 'Handling queue' },
  triagePriority: { es: 'Prioridad interna', en: 'Internal priority' },
  triageSurvey: { es: 'Requiere evaluación del barco', en: 'Requires vessel assessment' },
  triageSafety: { es: 'Requiere evidencia de seguridad', en: 'Requires safety evidence' },
  triageYes: { es: 'Sí', en: 'Yes' },
  triageNo: { es: 'No', en: 'No' },
  nextActionHeading: { es: 'Siguiente paso', en: 'Next step' },
  nextActionComplete: { es: 'Completar las respuestas que faltan.', en: 'Complete the missing answers.' },
  nextActionReadExclusion: {
    es: 'Leer el aviso de exclusión. No hay una variante que se pueda prometer.',
    en: 'Read the exclusion notice. There is no variant that can be promised.',
  },
  nextActionInstaller: {
    es: 'Solicitar una evaluación por instalador, que aún no es una propuesta comercial.',
    en: 'Request an installer assessment, which is not yet a commercial proposal.',
  },
  nextActionSteps: {
    es: 'Revisar los pasos documentados de instalación.',
    en: 'Review the documented installation steps.',
  },
  nextActionSpecialist: { es: 'Contactar con un especialista.', en: 'Contact a specialist.' },
  quotationHeading: { es: 'Estado de la cotización', en: 'Quotation status' },
  quotationNotProduced: {
    es: 'No se ha generado ninguna cotización ni precio. Una cotización real es un documento específico del barco que requiere una evaluación previa.',
    en: 'No quotation or price has been generated. A real quotation is a vessel-specific document that requires a prior assessment.',
  },
  rulesHeading: { es: 'Reglas canónicas aplicadas', en: 'Canonical rules applied' },
  rulesCaption: {
    es: 'Estas reglas vienen del contrato de paquetes MC-08. Se listan como referencia; son reglas de configuración, no evidencia de compatibilidad.',
    en: 'These rules come from the MC-08 bundle contract. They are listed for reference; they are configuration rules, not compatibility evidence.',
  },
  factsHeading: { es: 'Hechos verificados', en: 'Verified facts' },
  factQuestions: { es: 'Preguntas canónicas', en: 'Canonical questions' },
  factRules: { es: 'Reglas de configuración', en: 'Configuration rules' },
  factConflictRules: { es: 'Reglas de conflicto', en: 'Conflict rules' },
  factValidatedRules: { es: 'Reglas de instalación propia validadas', en: 'Validated self-install rules' },
  factTestedRows: { es: 'Filas de compatibilidad comprobadas', en: 'Tested compatibility rows' },
  limitationHeading: { es: 'Limitaciones explícitas', en: 'Explicit limitations' },
};

/** Display label for each of the four D5 §9.2 outcomes. */
export const OUTCOME_LABELS: Readonly<Record<string, Localized>> = {
  ELIGIBLE_SELF_INSTALL: { es: 'Instalación propia válida', en: 'Valid self-install' },
  INSTALLER_ASSESSMENT_REQUIRED: {
    es: 'Requiere evaluación de instalador',
    en: 'Installer assessment required',
  },
  NOT_SUPPORTED: { es: 'No soportado', en: 'Not supported' },
  INSUFFICIENT_INFORMATION: { es: 'Información insuficiente', en: 'Insufficient information' },
};

/** Plain-language explanation of each outcome. */
export const OUTCOME_EXPLANATIONS: Readonly<Record<string, Localized>> = {
  ELIGIBLE_SELF_INSTALL: {
    es: 'Una regla determinística validada confirma una configuración de bajo riesgo dentro de una fila de matriz comprobada. Hoy no existe ninguna, así que este resultado no se produce.',
    en: 'A validated deterministic rule confirms a low-risk configuration inside a tested matrix row. None exists today, so this result is not produced.',
  },
  INSTALLER_ASSESSMENT_REQUIRED: {
    es: 'La configuración es plausible pero queda fuera de las reglas validadas, o requiere trabajo de instalación que necesita una evaluación.',
    en: 'The configuration is plausible but outside the validated rules, or requires installation work that needs an assessment.',
  },
  NOT_SUPPORTED: {
    es: 'La consulta pide una capacidad excluida o una configuración explícitamente no ofrecida.',
    en: 'The enquiry asks for an excluded capability or an explicitly unsupported configuration.',
  },
  INSUFFICIENT_INFORMATION: {
    es: 'Faltan respuestas obligatorias o se contradicen, incluida la versión de firmware o el tipo de red desconocidos.',
    en: 'Mandatory answers are missing or contradictory, including unknown device firmware or network type.',
  },
};

/** Display label for each internal triage route. */
export const TRIAGE_LABELS: Readonly<Record<string, Localized>> = {
  SELF_INSTALL_REVIEW: { es: 'Revisión de instalación propia', en: 'Self-install review' },
  INSTALLER_SURVEY: { es: 'Evaluación por instalador', en: 'Installer survey' },
  SPECIALIST_ASSESSMENT: { es: 'Evaluación especializada', en: 'Specialist assessment' },
  INFORMATION_REQUEST: { es: 'Solicitud de información', en: 'Information request' },
};

/** Display label for each internal triage priority. */
export const PRIORITY_LABELS: Readonly<Record<string, Localized>> = {
  STANDARD: { es: 'Estándar', en: 'Standard' },
  ELEVATED: { es: 'Elevada', en: 'Elevated' },
  SAFETY_REVIEW: { es: 'Revisión de seguridad', en: 'Safety review' },
};

/** Bundles offered by the configurator, with the canonical MC-08 id as label. */
export const BUNDLE_OPTIONS: readonly string[] = ['START', 'CRUISE', 'SAIL', 'PROTECT', 'COMPLETE', 'FLEET'];

/** Explicit limitations printed on the page, ES and EN. */
export const CONFIGURATOR_LIMITATIONS: readonly Localized[] = [
  {
    es: 'El resultado es una clasificación interna, no una confirmación de compatibilidad ni un presupuesto.',
    en: 'The result is an internal classification, not a compatibility confirmation and not a quotation.',
  },
  {
    es: 'No hay filas de compatibilidad comprobadas, así que ninguna configuración alcanza el resultado de instalación propia.',
    en: 'There are no tested compatibility rows, so no configuration reaches the self-install result.',
  },
  {
    es: 'El control del gobierno está excluido por diseño; la certificación NMEA 2000 no existe y no se afirma.',
    en: 'Steering control is excluded by design; NMEA 2000 certification does not exist and is not claimed.',
  },
  {
    es: 'Este cuestionario no sustituye una evaluación del barco por un instalador cualificado.',
    en: 'This questionnaire does not replace a vessel assessment by a qualified installer.',
  },
  {
    es: 'La marca sigue siendo propuesta y la publicación no está autorizada.',
    en: 'The brand remains proposed and publication is not authorised.',
  },
];
