/**
 * MC-20/MC-22 internal catalogue — MAREA PILOT (supervised steering-assist) bilingual content.
 *
 * PILOT is a supervised steering-assist system in definition only. The safety
 * gate is BLOCKED, no sea trial has been performed and the E-stop, motor
 * isolation and rudder feedback evidence is NOT_FOUND. Remote helm control is
 * PROHIBITED and every steering mode is not verified or conditional. PILOT is
 * never presented as autonomous, certified, reliable or sellable while the
 * gate is blocked. Availability stays NOT_FOR_SALE.
 */
import type { CatalogFamilyContent } from './content.types';

const MC06 = 'docs/marea/products/product-definitions.batch-02.json#products.PILOT';
const SPEC = 'docs/marea/products/MAREA-PILOT-COMMERCIAL-SPEC.md';
const SAFETY_CASE = 'docs/marea/products/PILOT-SAFETY-CASE-OUTLINE.md';
const MC16_FAMILY = 'docs/marea/commerce-data/data/product-families.json#families[familyId=PILOT]';
const MC16_EDITIONS =
  'docs/marea/commerce-data/data/product-editions.json#editions[familyId=PILOT]';
const MC16_BUNDLES = 'docs/marea/commerce-data/data/bundle-compositions.json';
const MC15_ROUTE =
  'docs/marea/information-architecture/data/proposed-routes.json#items[routeId=mareaFamilyPilot]';
const MC14_GATES = 'docs/marea/legal-commercial/data/release-evidence-gates.json';
const MC02 = 'docs/marea/compliance/MC-02-BLOCKERS-AND-DECISIONS.md';
const COMPAT = 'docs/marea/products/PRODUCT-COMPATIBILITY-PILOT-SENSE-WATCH.md';
const EDITIONS = 'docs/marea/products/PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md';
const COPY_ES = 'docs/marea/products/copy/pilot.es.md';
const COPY_EN = 'docs/marea/products/copy/pilot.en.md';

const SUPERVISED = {
  featureKey: 'PILOT_SUPERVISED_STEERING',
  label: {
    es: 'Gobierno supervisado (requisito de diseño)',
    en: 'Supervised steering (design requirement)',
  },
} as const;
const TAKEOVER = {
  featureKey: 'PILOT_MANUAL_TAKEOVER',
  label: { es: 'Toma manual (requisito de diseño)', en: 'Manual takeover (design requirement)' },
} as const;
const ESTOP = {
  featureKey: 'PILOT_ESTOP',
  label: {
    es: 'Parada de emergencia (requisito de diseño)',
    en: 'Emergency stop (design requirement)',
  },
} as const;

export const PILOT_CONTENT: CatalogFamilyContent = {
  familyId: 'PILOT',
  hero: {
    kicker: {
      es: 'Catálogo interno · lote 3 · PILOT',
      en: 'Internal catalogue · batch 3 · PILOT',
    },
    heading: { es: 'MAREA PILOT', en: 'MAREA PILOT' },
    lead: {
      es: 'Sistema de asistencia al gobierno supervisado de la familia MAREA: una cabeza de control, un ordenador de control y electrónica de control de motor independiente que mantienen un rumbo de brújula o siguen una ruta autorizada explícitamente por el patrón. La toma manual sigue siendo posible en todo momento; no se ofrece gobierno remoto ni autónomo.',
      en: 'The MAREA family supervised steering-assist system: a control head, a control computer and independent motor-control electronics that hold a compass heading or follow a route the skipper has explicitly authorised. Manual takeover remains possible at all times; neither remote nor autonomous steering is offered.',
    },
    category: {
      es: 'Hardware · asistencia al gobierno supervisado',
      en: 'Hardware · supervised steering assist',
    },
    mandatoryNotice: {
      contentId: 'pilot.hero.notice',
      text: {
        es: 'MAREA PILOT funciona sólo bajo supervisión y nunca es autónomo. PILOT_SAFETY_GATE = BLOCKED, las pruebas de mar no se han realizado y la evidencia de parada de emergencia, aislamiento del motor y realimentación del timón no existe (NOT_FOUND). El mando remoto del timón está PROHIBIDO. No se vende mientras la puerta esté bloqueada.',
        en: 'MAREA PILOT works only under supervision and is never autonomous. PILOT_SAFETY_GATE = BLOCKED, sea trials have not been performed and the E-stop, motor-isolation and rudder-feedback evidence does not exist (NOT_FOUND). Remote helm control is PROHIBITED. It is not sold while the gate is blocked.',
      },
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC06, SAFETY_CASE, MC16_FAMILY],
    },
    highlights: [
      {
        contentId: 'pilot.hero.highlight.supervised',
        text: {
          es: 'Solo supervisado: el patrón permanece al mando y la toma manual es posible en todo momento.',
          en: 'Supervised only: the skipper stays in command and manual takeover is possible at all times.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC06, SPEC],
      },
      {
        contentId: 'pilot.hero.highlight.gate',
        text: {
          es: 'PILOT_SAFETY_GATE = BLOCKED: no se vende ni se anuncia como seguro mientras esté bloqueado.',
          en: 'PILOT_SAFETY_GATE = BLOCKED: it is not sold or announced as safe while blocked.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC06, SAFETY_CASE],
      },
      {
        contentId: 'pilot.hero.highlight.evidence',
        text: {
          es: 'Parada de emergencia, aislamiento del motor y realimentación del timón: evidencia NOT_FOUND.',
          en: 'E-stop, motor isolation and rudder feedback: evidence NOT_FOUND.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC06, SAFETY_CASE],
      },
      {
        contentId: 'pilot.hero.highlight.remote',
        text: {
          es: 'Mando remoto del timón PROHIBIDO: sin engranaje, desengranaje ni ajuste de rumbo a distancia.',
          en: 'Remote helm control PROHIBITED: no remote engage, disengage or heading adjustment.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC06, SPEC],
      },
      {
        contentId: 'pilot.hero.highlight.editions',
        text: {
          es: 'Dos ediciones (PILOT-COASTAL, PILOT-SAIL) y un paquete de instalación (PILOT-PRO). Una edición no es un SKU de comercio.',
          en: 'Two editions (PILOT-COASTAL, PILOT-SAIL) and an installation package (PILOT-PRO). An edition is not a merchant SKU.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC16_EDITIONS, EDITIONS],
      },
    ],
  },
  sections: {
    overview: {
      kicker: { es: '01 · Visión general', en: '01 · Overview' },
      heading: { es: 'Qué es MAREA PILOT', en: 'What MAREA PILOT is' },
      lead: {
        es: 'Una asistencia al gobierno que reduce la carga de timonear en tramos largos manteniendo al patrón al mando. No es un piloto automático certificado, no gobierna sin supervisión y no ofrece mando remoto.',
        en: 'A steering assist that reduces helming workload on long legs while keeping the skipper in command. It is not a certified autopilot, it does not steer unsupervised and it offers no remote command.',
      },
    },
    capabilities: {
      kicker: { es: '02 · Capacidades', en: '02 · Capabilities' },
      heading: { es: 'Capacidades definidas', en: 'Defined capabilities' },
      lead: {
        es: 'Cada modo de gobierno declara sus prerrequisitos y su estado. Lo que no se ha verificado se muestra como no verificado, nunca como fiable.',
        en: 'Each steering mode declares its prerequisites and its state. What has not been verified is shown as not verified, never as reliable.',
      },
    },
    specifications: {
      kicker: { es: '03 · Especificaciones', en: '03 · Specifications' },
      heading: { es: 'Ficha técnica y preparación', en: 'Technical sheet and readiness' },
      lead: {
        es: 'Los estados se copian del registro canónico de MC-16. La ingeniería está NOT_VERIFIED y la seguridad BLOCKED.',
        en: 'Statuses are copied from the canonical MC-16 record. Engineering is NOT_VERIFIED and safety is BLOCKED.',
      },
    },
    composition: {
      kicker: { es: '04 · Composición', en: '04 · Composition' },
      heading: { es: 'Composición y paquete', en: 'Composition and package' },
      lead: {
        es: 'La instalación profesional con estudio y presupuesto por embarcación es obligatoria. Nunca es un kit de autoinstalación ni un precio fijo de venta.',
        en: 'Professional installation with a per-vessel survey and quotation is mandatory. It is never a self-install kit or a fixed retail price.',
      },
    },
    editions: {
      kicker: { es: '05 · Ediciones', en: '05 · Editions' },
      heading: { es: 'Ediciones definidas', en: 'Defined editions' },
      lead: {
        es: 'Dos ediciones y un paquete de instalación registrados en los datos canónicos. Ninguno tiene precio aprobado, stock verificado ni código de SKU de comercio.',
        en: 'Two editions and an installation package recorded in the canonical data. None has an approved price, verified stock or merchant SKU code.',
      },
    },
    limitations: {
      kicker: { es: '06 · Limitaciones', en: '06 · Limitations' },
      heading: { es: 'Limitaciones y exclusiones', en: 'Limitations and exclusions' },
      lead: {
        es: 'Restricciones explícitas que acompañan a la ficha. No se atenúan en la versión inglesa.',
        en: 'Explicit restrictions that travel with the sheet. They are not softened in the English version.',
      },
    },
    ecosystem: {
      kicker: { es: '07 · Ecosistema', en: '07 · Ecosystem' },
      heading: { es: 'Ecosistema y paquetes', en: 'Ecosystem and bundles' },
      lead: {
        es: 'Relaciones canónicas con otros productos y paquetes. Una relación de composición no implica disponibilidad comercial.',
        en: 'Canonical relationships with other products and bundles. A composition relationship does not imply commercial availability.',
      },
    },
    readiness: {
      kicker: { es: '08 · Preparación', en: '08 · Readiness' },
      heading: { es: 'Preparación y puertas', en: 'Readiness and gates' },
      lead: {
        es: 'Preparación derivada de las once dimensiones canónicas y de las puertas de publicación abiertas. La puerta de seguridad de PILOT está bloqueada.',
        en: 'Readiness derived from the eleven canonical dimensions and the open publication gates. The PILOT safety gate is blocked.',
      },
    },
    documentation: {
      kicker: { es: '09 · Documentación', en: '09 · Documentation' },
      heading: { es: 'Documentación y procedencia', en: 'Documentation and provenance' },
      lead: {
        es: 'Documentos internos que sostienen esta ficha y documentos que todavía no existen. La ausencia se declara, no se rellena.',
        en: 'Internal documents that support this sheet and documents that do not exist yet. Absence is declared, not filled in.',
      },
    },
    closing: {
      kicker: { es: '10 · Cierre', en: '10 · Closing' },
      heading: { es: 'Estado de gobernanza', en: 'Governance state' },
      lead: {
        es: 'Estado de las autorizaciones externas y siguiente paso del programa. Esta ficha no activa ninguna publicación.',
        en: 'State of the external authorisations and the next programme step. This sheet activates no publication.',
      },
    },
  },
  overviewNotes: [
    {
      contentId: 'pilot.overview.supervised',
      text: {
        es: 'La finalidad prevista es mantener un rumbo o seguir una ruta autorizada, todo engranado y ajustado sólo en la cabeza de control local. Ninguna de estas funciones está construida ni verificada en MC-06.',
        en: 'The intended purpose is to hold a heading or follow an authorised route, all engaged and adjusted only at the local control head. None of this is built or verified at MC-06.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC06, SPEC],
    },
    {
      contentId: 'pilot.overview.authority',
      text: {
        es: 'La autoridad está limitada por diseño: la toma manual es posible en todo momento y ningún tercero puede mandar el actuador.',
        en: 'Authority is bounded by design: manual takeover is possible at all times and no third party may command the actuator.',
      },
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC06, SPEC],
    },
    {
      contentId: 'pilot.overview.certification',
      text: {
        es: 'La ficha no atribuye piloto automático certificado, fiabilidad de seguridad ni aprobación regulatoria.',
        en: 'The sheet attributes no certified autopilot, safety reliability or regulatory approval.',
      },
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC06, SAFETY_CASE],
    },
  ],
  capabilities: [
    {
      contentId: 'pilot.cap.headingHold',
      label: { es: 'Mantener rumbo', en: 'Heading hold' },
      description: {
        es: 'Mantener un rumbo de brújula seleccionado. Modo HEADING_HOLD: NOT_VERIFIED; requiere fuente de rumbo verificada y realimentación del timón.',
        en: 'Hold a selected compass heading. HEADING_HOLD mode: NOT_VERIFIED; it requires a verified heading source and rudder feedback.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC06, SPEC],
    },
    {
      contentId: 'pilot.cap.windAngle',
      label: { es: 'Ángulo de viento', en: 'Wind angle' },
      description: {
        es: 'Mantener un ángulo de viento aparente o real donde el modo esté verificado. Modo WIND_ANGLE: CONDITIONAL_ON_VERIFICATION.',
        en: 'Hold an apparent or true wind angle where the mode is verified. WIND_ANGLE mode: CONDITIONAL_ON_VERIFICATION.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC06, SPEC],
    },
    {
      contentId: 'pilot.cap.routeFollow',
      label: { es: 'Seguir ruta', en: 'Route follow' },
      description: {
        es: 'Seguir una ruta autorizada con cambios de curso simples. Modo ROUTE_FOLLOW: CONDITIONAL_ON_VERIFICATION; exige pruebas de mar supervisadas.',
        en: 'Follow an authorised route with simple course changes. ROUTE_FOLLOW mode: CONDITIONAL_ON_VERIFICATION; it requires supervised sea trials.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC06, SPEC],
    },
    {
      contentId: 'pilot.cap.takeover',
      label: { es: 'Toma manual', en: 'Manual takeover' },
      description: {
        es: 'La toma manual es un requisito de diseño: el patrón recupera el mando en todo momento. No está implementada ni probada.',
        en: 'Manual takeover is a design requirement: the skipper regains command at all times. It is not implemented or tested.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC06, SPEC],
    },
    {
      contentId: 'pilot.cap.estop',
      label: { es: 'Parada de emergencia', en: 'Emergency stop' },
      description: {
        es: 'La parada de emergencia física es un requisito de diseño, no una función probada: su evidencia es NOT_FOUND.',
        en: 'The physical E-stop is a design requirement, not a tested function: its evidence is NOT_FOUND.',
      },
      evidenceClass: 'BLOCKED',
      sourceRefs: [MC06, SAFETY_CASE],
    },
    {
      contentId: 'pilot.cap.isolation',
      label: { es: 'Aislamiento del motor', en: 'Motor isolation' },
      description: {
        es: 'El aislamiento independiente de la potencia del motor es un concepto de diseño; su evidencia es NOT_FOUND.',
        en: 'Independent motor-power isolation is a design concept; its evidence is NOT_FOUND.',
      },
      evidenceClass: 'BLOCKED',
      sourceRefs: [MC06, SAFETY_CASE],
    },
  ],
  composition: [
    {
      groupId: 'pilot.comp.included',
      label: { es: 'Incluido', en: 'Included' },
      heading: { es: 'Incluido en el paquete previsto', en: 'Included in the intended package' },
      items: [
        {
          contentId: 'pilot.comp.included.head',
          text: {
            es: 'La cabeza de control, el ordenador de control y la electrónica de control de motor independiente.',
            en: 'The control head, the control computer and the independent motor-control electronics.',
          },
          evidenceClass: 'HYPOTHESIS',
          sourceRefs: [SPEC, COPY_ES],
        },
        {
          contentId: 'pilot.comp.included.drive',
          text: {
            es: 'La interfaz de la familia de accionamiento especificada en el presupuesto y una parada de emergencia física como requisito de diseño.',
            en: 'The drive-family interface specified in the quotation and a physical E-stop as a design requirement.',
          },
          evidenceClass: 'HYPOTHESIS',
          sourceRefs: [SPEC, MC06],
        },
        {
          contentId: 'pilot.comp.included.commissioning',
          text: {
            es: 'Cableado, conectores, puesta en marcha, documentación y formación del operador dentro del alcance definido.',
            en: 'Wiring, connectors, commissioning, documentation and operator training within the defined scope.',
          },
          evidenceClass: 'HYPOTHESIS',
          sourceRefs: [SPEC],
        },
      ],
    },
    {
      groupId: 'pilot.comp.excluded',
      label: { es: 'Excluido', en: 'Excluded' },
      heading: { es: 'Excluido del paquete', en: 'Excluded from the package' },
      items: [
        {
          contentId: 'pilot.comp.excluded.remote',
          text: {
            es: 'Cualquier forma de gobierno, engranaje o ajuste de rumbo remoto.',
            en: 'Any form of remote steering, engagement or heading adjustment.',
          },
          evidenceClass: 'VERIFIED_REPO',
          sourceRefs: [MC06, SPEC],
        },
        {
          contentId: 'pilot.comp.excluded.autonomous',
          text: {
            es: 'No se incluye navegación autónoma, ni piloto automático certificado, ni fiabilidad de seguridad.',
            en: 'No autonomous navigation, no certified autopilot and no safety reliability are included.',
          },
          evidenceClass: 'VERIFIED_REPO',
          sourceRefs: [MC06, SAFETY_CASE],
        },
        {
          contentId: 'pilot.comp.excluded.skikit',
          text: {
            es: 'Un kit de autoinstalación y un precio fijo de venta al público.',
            en: 'A self-install kit and a fixed retail price.',
          },
          evidenceClass: 'VERIFIED_REPO',
          sourceRefs: [SPEC, EDITIONS],
        },
      ],
    },
    {
      groupId: 'pilot.comp.licence',
      label: { es: 'Instalación y suscripción', en: 'Installation and subscription' },
      heading: { es: 'Instalación y suscripción', en: 'Installation and subscription' },
      items: [
        {
          contentId: 'pilot.comp.licence.installation',
          text: {
            es: 'La instalación profesional, la puesta en marcha y la aceptación son obligatorias; el trabajo se estudia y presupuesta por embarcación.',
            en: 'Professional installation, commissioning and acceptance are mandatory; the work is surveyed and quoted per vessel.',
          },
          evidenceClass: 'ASSUMPTION',
          sourceRefs: [SPEC, MC06],
        },
        {
          contentId: 'pilot.comp.licence.entitlement',
          text: {
            es: 'Requisito de diseño, no un comportamiento probado: ninguna titularidad comercial desactiva el gobierno local ni la conducta de seguridad.',
            en: 'Design requirement, not a tested behaviour: no commercial entitlement disables local steering or safety behaviour.',
          },
          evidenceClass: 'OPEN',
          sourceRefs: [MC06, SPEC],
        },
      ],
    },
  ],
  interfaces: [
    {
      contentId: 'pilot.int.nav',
      direction: { es: 'Entrada', en: 'Input' },
      transport: { es: 'Ruta y waypoints de NAV', en: 'NAV route and waypoints' },
      status: { es: 'Solo lectura planificada', en: 'Planned read-only' },
      note: {
        es: 'NAV nunca manda el actuador; los datos de ruta son entrada, no autoridad.',
        en: 'NAV never commands the actuator; route data is an input, not authority.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC06, SPEC],
    },
    {
      contentId: 'pilot.int.hub',
      direction: { es: 'Entrada', en: 'Input' },
      transport: { es: 'Datos del HUB', en: 'HUB data' },
      status: { es: 'Condicional', en: 'Conditional' },
      note: {
        es: 'El HUB publica datos limitados y lee estado; no es el controlador del actuador.',
        en: 'The HUB publishes bounded data and reads status; it is not the actuator controller.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC06, SPEC],
    },
    {
      contentId: 'pilot.int.sense',
      direction: { es: 'Entrada', en: 'Input' },
      transport: { es: 'Mediciones SENSE validadas', en: 'Validated SENSE measurements' },
      status: { es: 'Solo tras cualificación de seguridad', en: 'Only after safety qualification' },
      note: {
        es: 'Ningún módulo genérico es aceptable como entrada de gobierno.',
        en: 'No generic sensor module is acceptable as a steering input.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC06, COMPAT],
    },
    {
      contentId: 'pilot.int.watch',
      direction: { es: 'Salida', en: 'Output' },
      transport: {
        es: 'Estado PILOT de solo lectura a WATCH',
        en: 'Read-only PILOT status to WATCH',
      },
      status: { es: 'Prohibido el mando remoto', en: 'Remote command prohibited' },
      note: {
        es: 'Sin engranaje, desengranaje, ajuste de rumbo ni comando de gobierno.',
        en: 'No engage, disengage, heading adjustment or steering command.',
      },
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC06, SPEC],
    },
    {
      contentId: 'pilot.int.estop',
      direction: { es: 'Entrada', en: 'Input' },
      transport: { es: 'Parada de emergencia física', en: 'Physical emergency stop' },
      status: { es: 'Evidencia no encontrada', en: 'Evidence not found' },
      note: {
        es: 'La parada de emergencia no está construida ni verificada: NOT_FOUND.',
        en: 'The E-stop is not built or verified: NOT_FOUND.',
      },
      evidenceClass: 'BLOCKED',
      sourceRefs: [MC06, SAFETY_CASE],
    },
  ],
  editions: [
    {
      editionId: 'PILOT-COASTAL',
      name: { es: 'PILOT Coastal', en: 'PILOT Coastal' },
      summary: {
        es: 'Edición de gobierno supervisado para pasajes costeros: cabeza de control, ordenador y electrónica de control de motor con parada de emergencia y toma manual como requisitos de diseño.',
        en: 'Supervised steering edition for coastal passages: control head, computer and motor-control electronics with E-stop and manual takeover as design requirements.',
      },
      note: {
        es: 'Instalación profesional con estudio y presupuesto por embarcación. Sin precio aprobado ni disponibilidad comercial.',
        en: 'Professional installation with per-vessel survey and quotation. No approved price and no commercial availability.',
      },
      featureLabels: [SUPERVISED, TAKEOVER, ESTOP],
    },
    {
      editionId: 'PILOT-SAIL',
      name: { es: 'PILOT Sail', en: 'PILOT Sail' },
      summary: {
        es: 'Edición condicional que añade gobierno a un ángulo de viento; su diferenciador depende de un modo de viento no verificado.',
        en: 'Conditional edition adding wind-angle steering; its differentiator depends on an unverified wind mode.',
      },
      note: {
        es: 'Condicional a la verificación del modo viento. Sin precio aprobado ni disponibilidad comercial.',
        en: 'Conditional on wind-mode verification. No approved price and no commercial availability.',
      },
      featureLabels: [SUPERVISED, TAKEOVER, ESTOP],
    },
    {
      editionId: 'PILOT-PRO',
      name: { es: 'PILOT Pro', en: 'PILOT Pro' },
      summary: {
        es: 'Paquete de instalación específico de la embarcación, no un SKU de venta: su alcance se define sólo tras un estudio del barco y no tiene precio fijo.',
        en: 'Vessel-specific installation package, not a retail SKU: its scope is defined only after a vessel survey and it carries no fixed price.',
      },
      note: {
        es: 'Paquete de instalación, nunca un SKU, una línea de paquete ni un artículo de pago. Sin precio fijo.',
        en: 'Installation package, never a SKU, a bundle line or a checkout item. No fixed price.',
      },
      featureLabels: [SUPERVISED, TAKEOVER, ESTOP],
    },
  ],
  editionNote: {
    es: 'Una edición es una identidad estable, no un SKU de comercio, y un paquete de instalación nunca es un artículo de pago. No hay precio aprobado, stock verificado, código de SKU ni pedido disponible; nada de PILOT se vende mientras PILOT_SAFETY_GATE esté bloqueado.',
    en: 'An edition is a stable identity, not a merchant SKU, and an installation package is never a checkout item. There is no approved price, verified stock, SKU code or available order; nothing of PILOT is sold while PILOT_SAFETY_GATE is blocked.',
  },
  limitations: [
    {
      contentId: 'pilot.lim.supervised',
      label: { es: 'Solo bajo supervisión', en: 'Supervised only' },
      description: {
        es: 'La toma manual es posible en todo momento y el patrón permanece al mando; no se ofrece funcionamiento desatendido.',
        en: 'Manual takeover is possible at all times and the skipper stays in command; unattended operation is not offered.',
      },
      kind: 'PROHIBITION',
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC06, SPEC],
    },
    {
      contentId: 'pilot.lim.gate',
      label: { es: 'Puerta de seguridad bloqueada', en: 'Safety gate blocked' },
      description: {
        es: 'PILOT_SAFETY_GATE = BLOCKED: no se vende, no se anuncia como seguro y no se presenta como certificado.',
        en: 'PILOT_SAFETY_GATE = BLOCKED: it is not sold, not announced as safe and not presented as certified.',
      },
      kind: 'UNAVAILABLE',
      evidenceClass: 'BLOCKED',
      sourceRefs: [MC06, SAFETY_CASE],
    },
    {
      contentId: 'pilot.lim.seaTrials',
      label: { es: 'Pruebas de mar no realizadas', en: 'Sea trials not performed' },
      description: {
        es: 'Las pruebas de mar no se han realizado (NOT_PERFORMED): no se afirma ningún comportamiento de gobierno verificado.',
        en: 'Sea trials have not been performed (NOT_PERFORMED): no verified steering behaviour is claimed.',
      },
      kind: 'UNAVAILABLE',
      evidenceClass: 'BLOCKED',
      sourceRefs: [MC06, SAFETY_CASE],
    },
    {
      contentId: 'pilot.lim.evidence',
      label: {
        es: 'Evidencia de seguridad no encontrada',
        en: 'Safety evidence not found',
      },
      description: {
        es: 'La parada de emergencia, el aislamiento del motor y la realimentación del timón tienen evidencia NOT_FOUND.',
        en: 'E-stop, motor isolation and rudder feedback have evidence NOT_FOUND.',
      },
      kind: 'UNAVAILABLE',
      evidenceClass: 'BLOCKED',
      sourceRefs: [MC06, SAFETY_CASE],
    },
    {
      contentId: 'pilot.lim.remote',
      label: { es: 'Mando remoto prohibido', en: 'Remote command prohibited' },
      description: {
        es: 'El mando remoto del timón está PROHIBIDO: sin engranaje, desengranaje, ajuste de rumbo ni comando de gobierno a distancia.',
        en: 'Remote helm control is PROHIBITED: no remote engage, disengage, heading adjustment or steering command.',
      },
      kind: 'PROHIBITION',
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC06, SPEC],
    },
    {
      contentId: 'pilot.lim.modes',
      label: {
        es: 'Modos no verificados o condicionales',
        en: 'Modes not verified or conditional',
      },
      description: {
        es: 'HEADING_HOLD = NOT_VERIFIED; WIND_ANGLE y ROUTE_FOLLOW = CONDITIONAL. Ningún modo se anuncia como verificado.',
        en: 'HEADING_HOLD = NOT_VERIFIED; WIND_ANGLE and ROUTE_FOLLOW = CONDITIONAL. No mode is announced as verified.',
      },
      kind: 'UNAVAILABLE',
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC06, SPEC],
    },
    {
      contentId: 'pilot.lim.certification',
      label: { es: 'No es un piloto automático certificado', en: 'Not a certified autopilot' },
      description: {
        es: 'No hay aprobación regulatoria, fiabilidad de seguridad ni integración verificada con hardware de gobierno no probado.',
        en: 'There is no regulatory approval, safety reliability or verified integration with untested steering hardware.',
      },
      kind: 'PROHIBITION',
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC06, SAFETY_CASE, MC02],
    },
    {
      contentId: 'pilot.lim.commercial',
      label: { es: 'Sin precio, stock, SKU ni pedido', en: 'No price, stock, SKU or order' },
      description: {
        es: 'No hay precio aprobado, stock verificado ni SKU de comercio; la compra no está disponible mientras la puerta esté bloqueada.',
        en: 'There is no approved price, verified stock or merchant SKU; purchase is not available while the gate is blocked.',
      },
      kind: 'UNAVAILABLE',
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC16_EDITIONS, MC14_GATES],
    },
  ],
  bundleNotes: [
    {
      bundleId: 'SAIL',
      note: {
        es: 'Composición canónica: PILOT-COASTAL con presupuesto obligatorio y PILOT-SAIL condicional en este paquete. No es comprable.',
        en: 'Canonical composition: PILOT-COASTAL quotation-required and PILOT-SAIL conditional in this bundle. It is not purchasable.',
      },
    },
    {
      bundleId: 'COMPLETE',
      note: {
        es: 'Composición canónica: PILOT-COASTAL con presupuesto obligatorio y PILOT-SAIL condicional en este paquete. No es comprable.',
        en: 'Canonical composition: PILOT-COASTAL quotation-required and PILOT-SAIL conditional in this bundle. It is not purchasable.',
      },
    },
  ],
  documentation: [
    {
      documentId: 'pilot.doc.spec',
      title: {
        es: 'Especificación comercial MAREA PILOT (MC-06)',
        en: 'MAREA PILOT commercial specification (MC-06)',
      },
      kind: 'SPECIFICATION',
      status: 'AVAILABLE',
      limitation: null,
      sourceRef: SPEC,
    },
    {
      documentId: 'pilot.doc.safety',
      title: {
        es: 'Esquema del caso de seguridad (PILOT)',
        en: 'PILOT safety case outline',
      },
      kind: 'SAFETY_CASE',
      status: 'AVAILABLE',
      limitation: {
        es: 'PILOT_SAFETY_GATE = BLOCKED; pruebas de mar no realizadas.',
        en: 'PILOT_SAFETY_GATE = BLOCKED; sea trials not performed.',
      },
      sourceRef: SAFETY_CASE,
    },
    {
      documentId: 'pilot.doc.compat',
      title: {
        es: 'Compatibilidad PILOT/SENSE/WATCH (interna)',
        en: 'PILOT/SENSE/WATCH compatibility (internal)',
      },
      kind: 'COMPATIBILITY',
      status: 'PENDING',
      limitation: {
        es: '0 filas medidas: la compatibilidad no se afirma sin un resultado probado.',
        en: '0 measured rows: compatibility is not asserted without a tested result.',
      },
      sourceRef: COMPAT,
    },
    {
      documentId: 'pilot.doc.editions',
      title: {
        es: 'Autoridad de ediciones PILOT/SENSE/WATCH',
        en: 'PILOT/SENSE/WATCH edition authority',
      },
      kind: 'EDITIONS',
      status: 'AVAILABLE',
      limitation: {
        es: 'PILOT-PRO es un paquete de instalación, no un SKU.',
        en: 'PILOT-PRO is an installation package, not a SKU.',
      },
      sourceRef: EDITIONS,
    },
    {
      documentId: 'pilot.doc.gates',
      title: {
        es: 'Registro de puertas de publicación (MC-14)',
        en: 'Publication gate register (MC-14)',
      },
      kind: 'RELEASE_EVIDENCE',
      status: 'AVAILABLE',
      limitation: {
        es: '13 puertas registradas, 0 cerradas.',
        en: '13 gates recorded, 0 closed.',
      },
      sourceRef: MC14_GATES,
    },
    {
      documentId: 'pilot.doc.routes',
      title: {
        es: 'Registro de rutas propuestas (MC-15)',
        en: 'Proposed route registry (MC-15)',
      },
      kind: 'ROUTE_REGISTRY',
      status: 'AVAILABLE',
      limitation: {
        es: 'La ruta marea/pilot está propuesta internamente y no es desplegable.',
        en: 'The marea/pilot route is internally proposed and not deployable.',
      },
      sourceRef: MC15_ROUTE,
    },
  ],
  closing: {
    heading: {
      es: 'Sin autorización de publicación ni de venta',
      en: 'No publication or sale authorisation',
    },
    body: {
      es: 'Esta ficha es contenido interno. La marca MAREA no está adoptada, la limpieza legal no está concedida, la puerta de seguridad de PILOT está bloqueada y la disponibilidad comercial es NOT_FOR_SALE.',
      en: 'This sheet is internal content. The MAREA brand is not adopted, legal clearance is not granted, the PILOT safety gate is blocked and commercial availability is NOT_FOR_SALE.',
    },
    governance: [
      {
        contentId: 'pilot.close.gates',
        text: {
          es: '13 puertas de publicación registradas y 0 cerradas; 42 afirmaciones catalogadas y 0 autorizadas públicamente.',
          en: '13 publication gates recorded and 0 closed; 42 claims catalogued and 0 publicly authorised.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC14_GATES, 'docs/marea/legal-commercial/data/claims-policy.json'],
      },
      {
        contentId: 'pilot.close.commercial',
        text: {
          es: '0 precios aprobados, 0 ediciones comercializables, 0 SKU de comercio, 0 filas de stock y 0 filas de compatibilidad probadas.',
          en: '0 approved prices, 0 merchantable editions, 0 merchant SKUs, 0 stock rows and 0 tested compatibility rows.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC16_EDITIONS, MC16_FAMILY],
      },
      {
        contentId: 'pilot.close.safety',
        text: {
          es: 'safetyGate = BLOCKED, seaTrialsCompleted = false y remoteHelmControl = PROHIBITED en los datos canónicos de MC-06; la evidencia de parada, aislamiento y realimentación es NOT_FOUND.',
          en: 'safetyGate = BLOCKED, seaTrialsCompleted = false and remoteHelmControl = PROHIBITED in the canonical MC-06 data; E-stop, isolation and rudder-feedback evidence is NOT_FOUND.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC06, SAFETY_CASE],
      },
    ],
    nextMilestone: {
      contentId: 'pilot.close.next',
      text: {
        es: 'MC-22 cierra el lote 3 del catálogo interno. Ninguna asistencia al gobierno se certifica ni se publica aquí.',
        en: 'MC-22 closes batch 3 of the internal catalogue. No steering assist is certified or published here.',
      },
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: ['docs/marea/execution/MASTER-PROMPT-REGISTRY.md'],
    },
  },
};
