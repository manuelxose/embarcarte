/**
 * MC-20/MC-22 internal catalogue — MAREA DISPLAY (hardware family) bilingual content.
 *
 * DISPLAY is a fixed marine multifunction display in definition only: the screen
 * size is SIZE_NOT_FROZEN, the hardware is HARDWARE_NOT_SELECTED and no bill of
 * materials (BOM_NOT_ESTABLISHED) exists. No physical dimension, resolution,
 * brightness, environmental/IP rating or power consumption is published, and no
 * measured performance figure is claimed. The display has no PILOT control
 * authority. Availability stays NOT_FOR_SALE and publication INTERNAL_ONLY.
 */
import type { CatalogFamilyContent } from './content.types';

const MC07 = 'docs/marea/products/product-definitions.batch-03.json#products.DISPLAY';
const SPEC = 'docs/marea/products/MAREA-DISPLAY-COMMERCIAL-SPEC.md';
const HARDWARE = 'docs/marea/products/DISPLAY-HARDWARE-AND-INTERACTION-REQUIREMENTS.md';
const MC16_FAMILY =
  'docs/marea/commerce-data/data/product-families.json#families[familyId=DISPLAY]';
const MC16_EDITIONS =
  'docs/marea/commerce-data/data/product-editions.json#editions[familyId=DISPLAY]';
const MC16_BUNDLES = 'docs/marea/commerce-data/data/bundle-compositions.json';
const MC15_ROUTE =
  'docs/marea/information-architecture/data/proposed-routes.json#items[routeId=mareaFamilyDisplay]';
const MC14_GATES = 'docs/marea/legal-commercial/data/release-evidence-gates.json';
const MC02 = 'docs/marea/compliance/MC-02-BLOCKERS-AND-DECISIONS.md';
const COMPAT = 'docs/marea/products/PRODUCT-COMPATIBILITY-DISPLAY-WEATHER-FLEET.md';
const EDITIONS = 'docs/marea/products/PRODUCT-EDITIONS-DISPLAY-WEATHER-FLEET.md';
const COPY_ES = 'docs/marea/products/copy/display.es.md';
const COPY_EN = 'docs/marea/products/copy/display.en.md';

const CHART_VIEW = {
  featureKey: 'DISPLAY_CHART_VIEW',
  label: { es: 'Vista de cartas', en: 'Chart view' },
} as const;
const INSTRUMENTS = {
  featureKey: 'DISPLAY_INSTRUMENTS',
  label: { es: 'Instrumentos', en: 'Instruments' },
} as const;

export const DISPLAY_CONTENT: CatalogFamilyContent = {
  familyId: 'DISPLAY',
  hero: {
    kicker: {
      es: 'Catálogo interno · lote 3 · DISPLAY',
      en: 'Internal catalogue · batch 3 · DISPLAY',
    },
    heading: { es: 'MAREA DISPLAY', en: 'MAREA DISPLAY' },
    lead: {
      es: 'Pantalla multifunción marina fija para el timón, en definición: panel, módulo de cálculo, almacenamiento, carcasa, montaje, conversión de potencia y software base. El tamaño no está congelado, el hardware no está seleccionado y la lista de materiales no existe: ninguna cifra física se publica.',
      en: 'A fixed marine multifunction display for the helm, in definition: panel, compute module, storage, enclosure, mounting, power conversion and base software. The size is not frozen, the hardware is not selected and no bill of materials exists: no physical figure is published.',
    },
    category: {
      es: 'Hardware · pantalla multifunción fija',
      en: 'Hardware · fixed multifunction display',
    },
    mandatoryNotice: {
      contentId: 'display.hero.notice',
      text: {
        es: 'MAREA DISPLAY no congeló el tamaño (SIZE_NOT_FROZEN), no seleccionó hardware (HARDWARE_NOT_SELECTED) y no estableció lista de materiales (BOM_NOT_ESTABLISHED). No publica dimensión física, resolución, brillo, índice de protección ni consumo, y no tiene autoridad de control sobre PILOT.',
        en: 'MAREA DISPLAY has no frozen size (SIZE_NOT_FROZEN), no selected hardware (HARDWARE_NOT_SELECTED) and no established bill of materials (BOM_NOT_ESTABLISHED). It publishes no physical dimension, resolution, brightness, protection rating or power consumption, and holds no PILOT control authority.',
      },
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC07, HARDWARE, MC16_FAMILY],
    },
    highlights: [
      {
        contentId: 'display.hero.highlight.size',
        text: {
          es: 'Tamaño no congelado: la designación «DISPLAY 7» es una etiqueta comercial de trabajo, no una dimensión medida.',
          en: 'Size not frozen: the “DISPLAY 7” designation is a working commercial label, not a measured dimension.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC07, MC16_EDITIONS],
      },
      {
        contentId: 'display.hero.highlight.hardware',
        text: {
          es: 'Hardware no seleccionado y BOM no establecida: no se publican paneles, conectores ni componentes.',
          en: 'Hardware not selected and BOM not established: no panels, connectors or components are published.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC07, HARDWARE, MC16_FAMILY],
      },
      {
        contentId: 'display.hero.highlight.performance',
        text: {
          es: 'Rendimiento medido = false: no se anuncia brillo, resolución, índice ambiental ni consumo.',
          en: 'Measured performance = false: no brightness, resolution, environmental rating or consumption is announced.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC07, SPEC],
      },
      {
        contentId: 'display.hero.highlight.pilot',
        text: {
          es: 'Sin autoridad de control sobre PILOT: como mucho estado de solo lectura, nunca gobierno.',
          en: 'No PILOT control authority: at most read-only status, never steering.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC07, SPEC],
      },
      {
        contentId: 'display.hero.highlight.editions',
        text: {
          es: 'Dos ediciones registradas (DISPLAY-7, DISPLAY-LARGE-CONDITIONAL). Una edición no es un SKU de comercio.',
          en: 'Two canonical editions (DISPLAY-7, DISPLAY-LARGE-CONDITIONAL). An edition is not a merchant SKU.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC16_EDITIONS, EDITIONS],
      },
    ],
  },
  sections: {
    overview: {
      kicker: { es: '01 · Visión general', en: '01 · Overview' },
      heading: { es: 'Qué es MAREA DISPLAY', en: 'What MAREA DISPLAY is' },
      lead: {
        es: 'Una pantalla fija e instalada para el timón con una capa de presentación MAREA compartida. Hoy es una definición: no existe ninguna unidad fabricada y ninguna especificación física está verificada.',
        en: 'A fixed, installed helm display with a shared MAREA presentation layer. Today it is a definition: no manufactured unit exists and no physical specification is verified.',
      },
    },
    capabilities: {
      kicker: { es: '02 · Capacidades', en: '02 · Capabilities' },
      heading: { es: 'Capacidades definidas', en: 'Defined capabilities' },
      lead: {
        es: 'El software base presenta instrumentos, tráfico AIS recibido y capas NAV o WEATHER según el derecho de cada uno. Las cartas y los servicios de datos son derechos separados, nunca incluidos en el dispositivo.',
        en: 'The base software presents instruments, received AIS traffic and NAV or WEATHER layers per each entitlement. Charts and data services are separate entitlements, never included with the device.',
      },
    },
    specifications: {
      kicker: { es: '03 · Especificaciones', en: '03 · Specifications' },
      heading: { es: 'Ficha técnica y preparación', en: 'Technical sheet and readiness' },
      lead: {
        es: 'Los estados se copian del registro canónico de MC-16. La ingeniería está NOT_VERIFIED y el hardware NOT_SELECTED; no hay ficha física que promocionar.',
        en: 'Statuses are copied from the canonical MC-16 record. Engineering is NOT_VERIFIED and hardware NOT_SELECTED; there is no physical sheet to promote.',
      },
    },
    composition: {
      kicker: { es: '04 · Composición', en: '04 · Composition' },
      heading: { es: 'Composición y paquete', en: 'Composition and package' },
      lead: {
        es: 'El dispositivo previsto y sus derechos de datos se declaran por separado. Lo que queda fuera se dice antes de cualquier contratación.',
        en: 'The intended device and its data entitlements are stated separately. What is excluded is said before any contracting.',
      },
    },
    editions: {
      kicker: { es: '05 · Ediciones', en: '05 · Editions' },
      heading: { es: 'Ediciones definidas', en: 'Defined editions' },
      lead: {
        es: 'Dos ediciones registradas en los datos canónicos. Ninguna tiene precio aprobado, stock verificado ni código de SKU de comercio.',
        en: 'Two editions recorded in the canonical data. Neither has an approved price, verified stock or merchant SKU code.',
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
        es: 'Preparación derivada de las once dimensiones canónicas y de las puertas de publicación abiertas. Ninguna puerta está cerrada.',
        en: 'Readiness derived from the eleven canonical dimensions and the open publication gates. No gate is closed.',
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
      contentId: 'display.overview.definition',
      text: {
        es: 'Ninguna unidad fabricada existe y el hardware no está seleccionado: esta ficha describe una definición, no un dispositivo disponible.',
        en: 'No manufactured unit exists and the hardware is not selected: this sheet describes a definition, not an available device.',
      },
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC07, MC16_FAMILY],
    },
    {
      contentId: 'display.overview.boundary',
      text: {
        es: 'La frontera honesta es entre software base y datos con licencia separada; ni cartas, ni HUB, ni receptor AIS ni suscripción van incluidos.',
        en: 'The honest boundary is between base software and separately licensed data; no charts, HUB, AIS receiver or subscription is included.',
      },
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [SPEC, MC07],
    },
    {
      contentId: 'display.overview.claims',
      text: {
        es: 'La ficha no atribuye brillo, tamaño, certificación ni compatibilidad sin una fila medida.',
        en: 'The sheet attributes no brightness, size, certification or compatibility without a measured row.',
      },
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC07, HARDWARE],
    },
  ],
  capabilities: [
    {
      contentId: 'display.cap.instruments',
      label: { es: 'Instrumentos', en: 'Instruments' },
      description: {
        es: 'Presentación de instrumentos de a bordo con fuente y frescura; es un objetivo de software base, no una función probada.',
        en: 'Presentation of onboard instruments with source and freshness; it is a base-software target, not a tested function.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [SPEC, COPY_ES],
    },
    {
      contentId: 'display.cap.ais',
      label: { es: 'Tráfico AIS recibido', en: 'Received AIS traffic' },
      description: {
        es: 'Mostrar tráfico AIS del receptor solo-recepción separado; nunca transmitir ni presentarse como anticolisión.',
        en: 'Show AIS traffic from the separate receive-only receiver; never transmit and never present itself as collision avoidance.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC07, SPEC],
    },
    {
      contentId: 'display.cap.nav',
      label: { es: 'Presentación NAV', en: 'NAV presentation' },
      description: {
        es: 'Presentar la salida de software NAV por una ruta local futura validada; ningún emparejamiento está validado hoy.',
        en: 'Present NAV software output over a future validated local path; no pairing is validated today.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC07, SPEC],
    },
    {
      contentId: 'display.cap.weather',
      label: { es: 'Capas WEATHER', en: 'WEATHER layers' },
      description: {
        es: 'Capas WEATHER con licencia dentro del derecho del cliente; ningún derecho de previsión está concedido.',
        en: 'Licensed WEATHER layers inside the customer entitlement; no forecast right is granted.',
      },
      evidenceClass: 'BLOCKED',
      sourceRefs: [MC07, SPEC],
    },
    {
      contentId: 'display.cap.configuration',
      label: { es: 'Configuración y copia de seguridad', en: 'Configuration and backup' },
      description: {
        es: 'Configuración de la embarcación y de las fuentes de datos y copia de seguridad; el servicio de configuración no está implementado.',
        en: 'Vessel and data-source configuration and backup; the configuration service is not implemented.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [SPEC, HARDWARE],
    },
    {
      contentId: 'display.cap.charts',
      label: { es: 'Cartas como derecho separado', en: 'Charts as a separate entitlement' },
      description: {
        es: 'Las cartas se conceden por cuenta y por territorio y nunca van incluidas en el dispositivo.',
        en: 'Charts are granted per account and per territory and are never included with the device.',
      },
      evidenceClass: 'BLOCKED',
      sourceRefs: [MC07, SPEC],
    },
  ],
  composition: [
    {
      groupId: 'display.comp.included',
      label: { es: 'Objetivo previsto', en: 'Intended target' },
      heading: {
        es: 'Componentes objetivo, no seleccionados',
        en: 'Target components, not selected',
      },
      items: [
        {
          contentId: 'display.comp.included.unit',
          text: {
            es: 'La unidad de pantalla objetivo: panel y módulo de cálculo, carcasa, montaje, conversión y protección de potencia, conectores y arnés; ningún componente está seleccionado.',
            en: 'The target display unit: panel and compute module, enclosure, mounting, power conversion and protection, connectors and harness; no component is selected.',
          },
          evidenceClass: 'HYPOTHESIS',
          sourceRefs: [SPEC, COPY_ES],
        },
        {
          contentId: 'display.comp.included.software',
          text: {
            es: 'El entorno operativo dedicado y el software base para instrumentos y tráfico AIS recibido.',
            en: 'The dedicated operating environment and base software for instruments and received AIS traffic.',
          },
          evidenceClass: 'HYPOTHESIS',
          sourceRefs: [SPEC],
        },
        {
          contentId: 'display.comp.included.installation',
          text: {
            es: 'Instalación profesional exigida: el dispositivo es fijo, alimentado y cableado a la embarcación.',
            en: 'Professional installation required: the device is fixed, powered and wired to the vessel.',
          },
          evidenceClass: 'OPEN',
          sourceRefs: [SPEC, HARDWARE],
        },
      ],
    },
    {
      groupId: 'display.comp.excluded',
      label: { es: 'Excluido', en: 'Excluded' },
      heading: { es: 'Excluido del alcance', en: 'Excluded from scope' },
      items: [
        {
          contentId: 'display.comp.excluded.data',
          text: {
            es: 'Cartas, capas WEATHER y suscripción NAV: derechos de datos separados, nunca incluidos.',
            en: 'Charts, WEATHER layers and the NAV subscription: separate data entitlements, never included.',
          },
          evidenceClass: 'VERIFIED_REPO',
          sourceRefs: [MC07, SPEC],
        },
        {
          contentId: 'display.comp.excluded.ecosystem',
          text: {
            es: 'MAREA HUB, receptor AIS y MAREA SENSE: productos separados que requieren su propia validación.',
            en: 'MAREA HUB, the AIS receiver and MAREA SENSE: separate products requiring their own validation.',
          },
          evidenceClass: 'VERIFIED_REPO',
          sourceRefs: [SPEC, MC07],
        },
        {
          contentId: 'display.comp.excluded.pilot',
          text: {
            es: 'Cualquier control, engranaje o autoridad de gobierno sobre MAREA PILOT.',
            en: 'Any control, engagement or steering authority over MAREA PILOT.',
          },
          evidenceClass: 'VERIFIED_REPO',
          sourceRefs: [MC07, SPEC],
        },
      ],
    },
    {
      groupId: 'display.comp.licence',
      label: { es: 'Licencias', en: 'Licensing' },
      heading: { es: 'Licencias y procedencia', en: 'Licensing and provenance' },
      items: [
        {
          contentId: 'display.comp.licence.charts',
          text: {
            es: 'Ningún derecho de cartas está concedido (chartRightsGranted = false): no se anuncia cartografía como disponible.',
            en: 'No chart right is granted (chartRightsGranted = false): no cartography is announced as available.',
          },
          evidenceClass: 'BLOCKED',
          sourceRefs: [MC07, MC02],
        },
        {
          contentId: 'display.comp.licence.separation',
          text: {
            es: 'El software base y los datos con licencia se mantienen como fronteras separadas; perder un derecho muestra un estado no disponible, nunca datos congelados.',
            en: 'Base software and licensed data stay separate boundaries; losing a right shows an unavailable state, never frozen data.',
          },
          evidenceClass: 'OPEN',
          sourceRefs: [SPEC, HARDWARE],
        },
      ],
    },
  ],
  interfaces: [
    {
      contentId: 'display.int.hub',
      direction: { es: 'Entrada', en: 'Input' },
      transport: { es: 'Datos del HUB', en: 'HUB data' },
      status: { es: 'Condicional', en: 'Conditional' },
      note: {
        es: 'Sólo a través de una integración HUB futura validada.',
        en: 'Only through a future validated HUB integration.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC07, COMPAT],
    },
    {
      contentId: 'display.int.nav',
      direction: { es: 'Entrada', en: 'Input' },
      transport: { es: 'Salida de software MAREA NAV', en: 'MAREA NAV software output' },
      status: { es: 'Previsto', en: 'Planned' },
      note: {
        es: 'Ningún emparejamiento está validado; no se afirma soporte.',
        en: 'No pairing is validated; no support is claimed.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC07, SPEC],
    },
    {
      contentId: 'display.int.ais',
      direction: { es: 'Entrada', en: 'Input' },
      transport: { es: 'Tráfico AIS recibido', en: 'Received AIS traffic' },
      status: { es: 'Condicional', en: 'Conditional' },
      note: {
        es: 'Solo recepción; nunca transmite AIS ni es anticolisión.',
        en: 'Receive-only; it never transmits AIS and is not collision avoidance.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC07, SPEC],
    },
    {
      contentId: 'display.int.sense',
      direction: { es: 'Entrada', en: 'Input' },
      transport: { es: 'Mediciones MAREA SENSE', en: 'MAREA SENSE measurements' },
      status: { es: 'Condicional', en: 'Conditional' },
      note: {
        es: 'Sin contrato de datos validado en el dispositivo y sin exactitud verificada.',
        en: 'No validated data contract on the device and no verified accuracy.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC07, SPEC],
    },
    {
      contentId: 'display.int.pilot',
      direction: { es: 'Salida', en: 'Output' },
      transport: { es: 'Estado PILOT de solo lectura', en: 'Read-only PILOT status' },
      status: { es: 'Desconocido', en: 'Unknown' },
      note: {
        es: 'Como mucho estado y alarmas de solo lectura; nunca control ni gobierno.',
        en: 'At most read-only status and alarms; never control or steering.',
      },
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC07, SPEC],
    },
    {
      contentId: 'display.int.watch',
      direction: { es: 'Salida', en: 'Output' },
      transport: { es: 'Vista remota WATCH', en: 'WATCH remote view' },
      status: { es: 'Desconocido', en: 'Unknown' },
      note: {
        es: 'No hay vista remota ni monitorización definida para el dispositivo.',
        en: 'No remote view or monitoring is defined for the device.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC07, COMPAT],
    },
  ],
  editions: [
    {
      editionId: 'DISPLAY-7',
      name: { es: 'DISPLAY 7', en: 'DISPLAY 7' },
      summary: {
        es: 'Edición de trabajo con software base para instrumentos y tráfico AIS recibido. La designación «DISPLAY 7» es una etiqueta comercial: el tamaño no está congelado y el hardware no está seleccionado.',
        en: 'Working edition with base software for instruments and received AIS traffic. The “DISPLAY 7” designation is a commercial label: the size is not frozen and the hardware is not selected.',
      },
      note: {
        es: 'Dispositivo de hardware previsto. Sin precio aprobado ni disponibilidad comercial.',
        en: 'Intended hardware device. No approved price and no commercial availability.',
      },
      featureLabels: [CHART_VIEW, INSTRUMENTS],
    },
    {
      editionId: 'DISPLAY-LARGE-CONDITIONAL',
      name: { es: 'DISPLAY Large (condicional)', en: 'DISPLAY Large (conditional)' },
      summary: {
        es: 'Familia futura de pantallas mayores, condicional: tamaño no congelado y hardware no seleccionado, por lo que no se publica ninguna medida ni precio.',
        en: 'Future larger-screen family, conditional: size not frozen and hardware not selected, so no measurement or price is published.',
      },
      note: {
        es: 'Condicional y nunca seleccionable como tamaño disponible. Sin precio aprobado.',
        en: 'Conditional and never selectable as an available size. No approved price.',
      },
      featureLabels: [CHART_VIEW, INSTRUMENTS],
    },
  ],
  editionNote: {
    es: 'Una edición es una identidad estable, no un SKU de comercio. No hay precio aprobado, stock verificado, código de SKU ni pedido disponible; ninguna dimensión física se publica mientras el tamaño no esté congelado.',
    en: 'An edition is a stable identity, not a merchant SKU. There is no approved price, verified stock, SKU code or available order; no physical dimension is published while the size is not frozen.',
  },
  limitations: [
    {
      contentId: 'display.lim.size',
      label: { es: 'Tamaño no congelado', en: 'Size not frozen' },
      description: {
        es: 'SIZE_NOT_FROZEN: no se publica dimensión física, diagonal, resolución ni formato de pantalla.',
        en: 'SIZE_NOT_FROZEN: no physical dimension, diagonal, resolution or screen format is published.',
      },
      kind: 'UNAVAILABLE',
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC07, MC16_EDITIONS],
    },
    {
      contentId: 'display.lim.hardware',
      label: { es: 'Hardware no seleccionado', en: 'Hardware not selected' },
      description: {
        es: 'HARDWARE_NOT_SELECTED: no se publican paneles, conectores, componentes ni proveedores.',
        en: 'HARDWARE_NOT_SELECTED: no panels, connectors, components or suppliers are published.',
      },
      kind: 'UNAVAILABLE',
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC07, HARDWARE],
    },
    {
      contentId: 'display.lim.bom',
      label: { es: 'Lista de materiales no establecida', en: 'Bill of materials not established' },
      description: {
        es: 'BOM_NOT_ESTABLISHED: no existe lista de materiales ni coste aprobado.',
        en: 'BOM_NOT_ESTABLISHED: no bill of materials and no approved cost exists.',
      },
      kind: 'UNAVAILABLE',
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC07, MC16_FAMILY],
    },
    {
      contentId: 'display.lim.performance',
      label: { es: 'Sin rendimiento medido', en: 'No measured performance' },
      description: {
        es: 'El rendimiento medido es false: no se anuncia brillo/nits, resolución, índice ambiental/IP, consumo de potencia ni comportamiento térmico o de vibración.',
        en: 'Measured performance is false: no brightness/nits, resolution, environmental/IP rating, power consumption, or thermal or vibration behaviour is announced.',
      },
      kind: 'UNAVAILABLE',
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC07, HARDWARE, SPEC],
    },
    {
      contentId: 'display.lim.charts',
      label: { es: 'Cartas con licencia separada', en: 'Charts licensed separately' },
      description: {
        es: 'Ningún derecho de cartas está concedido; no se anuncia cartografía incluida ni disponible.',
        en: 'No chart right is granted; no included or available cartography is announced.',
      },
      kind: 'LIMITATION',
      evidenceClass: 'BLOCKED',
      sourceRefs: [MC07, MC02],
    },
    {
      contentId: 'display.lim.pilot',
      label: { es: 'Sin autoridad de control sobre PILOT', en: 'No PILOT control authority' },
      description: {
        es: 'La pantalla no gobierna, no engrana ni ajusta rumbo sobre MAREA PILOT; como mucho muestra estado de solo lectura.',
        en: 'The display does not steer, engage or adjust heading over MAREA PILOT; at most it shows read-only status.',
      },
      kind: 'PROHIBITION',
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC07, SPEC],
    },
    {
      contentId: 'display.lim.commercial',
      label: { es: 'Sin precio, stock, SKU ni pedido', en: 'No price, stock, SKU or order' },
      description: {
        es: 'No hay precio aprobado, stock verificado ni SKU de comercio; la compra no está disponible.',
        en: 'There is no approved price, verified stock or merchant SKU; purchase is not available.',
      },
      kind: 'UNAVAILABLE',
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC16_EDITIONS, MC14_GATES],
    },
  ],
  bundleNotes: [
    {
      bundleId: 'CRUISE',
      note: {
        es: 'Composición canónica: incluye DISPLAY-7. El paquete no es comprable.',
        en: 'Canonical composition: includes DISPLAY-7. The bundle is not purchasable.',
      },
    },
    {
      bundleId: 'COMPLETE',
      note: {
        es: 'Composición canónica: incluye DISPLAY-7. DISPLAY-LARGE-CONDITIONAL no es seleccionable como tamaño. El paquete no es comprable.',
        en: 'Canonical composition: includes DISPLAY-7. DISPLAY-LARGE-CONDITIONAL is not selectable as a size. The bundle is not purchasable.',
      },
    },
  ],
  documentation: [
    {
      documentId: 'display.doc.spec',
      title: {
        es: 'Especificación comercial MAREA DISPLAY (MC-07)',
        en: 'MAREA DISPLAY commercial specification (MC-07)',
      },
      kind: 'SPECIFICATION',
      status: 'AVAILABLE',
      limitation: null,
      sourceRef: SPEC,
    },
    {
      documentId: 'display.doc.hardware',
      title: {
        es: 'Requisitos de hardware e interacción (DISPLAY)',
        en: 'DISPLAY hardware and interaction requirements',
      },
      kind: 'HARDWARE',
      status: 'AVAILABLE',
      limitation: {
        es: 'Tamaño no congelado y hardware no seleccionado.',
        en: 'Size not frozen and hardware not selected.',
      },
      sourceRef: HARDWARE,
    },
    {
      documentId: 'display.doc.editions',
      title: {
        es: 'Autoridad de ediciones DISPLAY/WEATHER/FLEET',
        en: 'DISPLAY/WEATHER/FLEET edition authority',
      },
      kind: 'EDITIONS',
      status: 'AVAILABLE',
      limitation: {
        es: 'DISPLAY-LARGE-CONDITIONAL sin tamaño congelado ni precio.',
        en: 'DISPLAY-LARGE-CONDITIONAL has no frozen size and no price.',
      },
      sourceRef: EDITIONS,
    },
    {
      documentId: 'display.doc.compat',
      title: {
        es: 'Compatibilidad DISPLAY/WEATHER/FLEET (interna)',
        en: 'DISPLAY/WEATHER/FLEET compatibility (internal)',
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
      documentId: 'display.doc.gates',
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
      documentId: 'display.doc.routes',
      title: {
        es: 'Registro de rutas propuestas (MC-15)',
        en: 'Proposed route registry (MC-15)',
      },
      kind: 'ROUTE_REGISTRY',
      status: 'AVAILABLE',
      limitation: {
        es: 'La ruta marea/display está propuesta internamente y no es desplegable.',
        en: 'The marea/display route is internally proposed and not deployable.',
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
      es: 'Esta ficha es contenido interno. La marca MAREA no está adoptada, la limpieza legal no está concedida, el hardware no está seleccionado y la disponibilidad comercial es NOT_FOR_SALE.',
      en: 'This sheet is internal content. The MAREA brand is not adopted, legal clearance is not granted, the hardware is not selected and commercial availability is NOT_FOR_SALE.',
    },
    governance: [
      {
        contentId: 'display.close.gates',
        text: {
          es: '13 puertas de publicación registradas y 0 cerradas; 42 afirmaciones catalogadas y 0 autorizadas públicamente.',
          en: '13 publication gates recorded and 0 closed; 42 claims catalogued and 0 publicly authorised.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC14_GATES, 'docs/marea/legal-commercial/data/claims-policy.json'],
      },
      {
        contentId: 'display.close.commercial',
        text: {
          es: '0 precios aprobados, 0 ediciones comercializables, 0 SKU de comercio, 0 filas de stock y 0 filas de compatibilidad probadas.',
          en: '0 approved prices, 0 merchantable editions, 0 merchant SKUs, 0 stock rows and 0 tested compatibility rows.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC16_EDITIONS, MC16_FAMILY],
      },
      {
        contentId: 'display.close.boundary',
        text: {
          es: 'SIZE_NOT_FROZEN, HARDWARE_NOT_SELECTED, BOM_NOT_ESTABLISHED, measuredPerformance = false y pilotControlAuthority = false en los datos canónicos de MC-07.',
          en: 'SIZE_NOT_FROZEN, HARDWARE_NOT_SELECTED, BOM_NOT_ESTABLISHED, measuredPerformance = false and pilotControlAuthority = false in the canonical MC-07 data.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC07, HARDWARE],
      },
    ],
    nextMilestone: {
      contentId: 'display.close.next',
      text: {
        es: 'MC-22 cierra el lote 3 del catálogo interno. Ningún dispositivo se fabrica, selecciona ni publica aquí.',
        en: 'MC-22 closes batch 3 of the internal catalogue. No device is manufactured, selected or published here.',
      },
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: ['docs/marea/execution/MASTER-PROMPT-REGISTRY.md'],
    },
  },
};
