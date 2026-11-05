/**
 * MC-20 internal catalogue — MAREA HUB (hardware gateway) bilingual content.
 *
 * Every factual sentence traces to the MC-05 product definition, the MC-11
 * hardware architecture and the MC-16 canonical commerce data. No port count,
 * protocol list, radio feature, processor specification, price or certification
 * is invented here.
 */
import type { CatalogFamilyContent } from './content.types';

const MC05 = 'docs/marea/products/product-definitions.batch-01.json#products.HUB';
const MC05_SPEC = 'docs/marea/products/MAREA-HUB-COMMERCIAL-SPEC.md';
const MC16_FAMILY = 'docs/marea/commerce-data/data/product-families.json#families[familyId=HUB]';
const MC16_EDITIONS = 'docs/marea/commerce-data/data/product-editions.json#editions[familyId=HUB]';
const MC15_ROUTE =
  'docs/marea/information-architecture/data/proposed-routes.json#items[routeId=mareaFamilyHub]';
const MC14_GATES = 'docs/marea/legal-commercial/data/release-evidence-gates.json';
const MC02 = 'docs/marea/compliance/MC-02-BLOCKERS-AND-DECISIONS.md';
const MC11_HUB = 'docs/marea/hardware/architecture/MC11-HUB-ARCHITECTURE.md';
const MC11_MAP = 'docs/marea/hardware/architecture/MC11-PORTFOLIO-HARDWARE-MAP.md';
const MC11_PROTOCOL =
  'docs/marea/hardware/architecture/MC11-PROTOCOL-AND-COMPATIBILITY-ASSESSMENT.md';
const MC11_NMEA = 'docs/marea/hardware/conformity/MC11-NMEA-LICENSING-AND-CERTIFICATION-ROADMAP.md';
const MC11_COMPLIANCE = 'docs/marea/hardware/conformity/MC11-CONFORMITY-BLOCKER-REGISTER.md';

export const HUB_CONTENT: CatalogFamilyContent = {
  familyId: 'HUB',
  hero: {
    kicker: { es: 'Catálogo interno · lote 1 · HUB', en: 'Internal catalogue · batch 1 · HUB' },
    heading: { es: 'MAREA HUB', en: 'MAREA HUB' },
    lead: {
      es: 'Pasarela de datos y conectividad a bordo: reúne los datos de embarcación compatibles, los normaliza en una única interfaz local documentada y los sirve a MAREA NAV, MAREA DISPLAY, instrumentos compatibles y los dispositivos del armador en la red del barco.',
      en: 'Onboard data gateway and connectivity appliance: it gathers supported vessel data, normalises it into one documented local interface and serves it to MAREA NAV, MAREA DISPLAY, compatible instruments and the owner’s own devices on the vessel network.',
    },
    category: { es: 'Hardware · dispositivo instalado', en: 'Hardware · installed device' },
    mandatoryNotice: {
      contentId: 'hub.hero.notice',
      text: {
        es: 'MAREA HUB es hardware en definición: el hardware no está seleccionado y la lista de materiales no está congelada. No se declara certificación, conformidad, compatibilidad universal ni disponibilidad comercial.',
        en: 'MAREA HUB is hardware in definition: the hardware is not selected and the bill of materials is not frozen. No certification, conformity, universal compatibility or commercial availability is claimed.',
      },
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC16_FAMILY, MC11_MAP, MC11_COMPLIANCE],
    },
    highlights: [
      {
        contentId: 'hub.hero.highlight.hardware',
        text: {
          es: 'Hardware no seleccionado y BOM no congelada: no se publican puertos, radios, procesador ni consumo.',
          en: 'Hardware not selected and BOM not frozen: no ports, radios, processor or power figures are published.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC16_FAMILY, MC11_MAP],
      },
      {
        contentId: 'hub.hero.highlight.offline',
        text: {
          es: 'Funciona sin conexión por diseño: las funciones locales no dependen de una suscripción en la nube.',
          en: 'Offline by design: local functions do not depend on a cloud subscription.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC05, MC11_HUB],
      },
      {
        contentId: 'hub.hero.highlight.matrix',
        text: {
          es: 'La integración se rige por una matriz publicada, no por nombres de protocolo. Hoy hay 0 filas probadas.',
          en: 'Integration is governed by a published matrix, not by protocol names. Today there are 0 tested rows.',
        },
        evidenceClass: 'OPEN',
        sourceRefs: [MC05, MC11_PROTOCOL],
      },
      {
        contentId: 'hub.hero.highlight.certification',
        text: {
          es: 'Sin certificación NMEA 2000 y sin conformidad CE/EMC/RED demostrada.',
          en: 'No NMEA 2000 certification and no demonstrated CE/EMC/RED conformity.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC11_NMEA, MC11_COMPLIANCE],
      },
    ],
  },
  sections: {
    overview: {
      kicker: { es: '01 · Visión general', en: '01 · Overview' },
      heading: { es: 'Qué es MAREA HUB', en: 'What MAREA HUB is' },
      lead: {
        es: 'Una única unidad instalada que reúne datos de embarcación compatibles y los publica como una interfaz local documentada. No es un piloto automático, no gobierna el barco y no sustituye a ningún equipo certificado.',
        en: 'A single installed unit that gathers supported vessel data and publishes it as a documented local interface. It is not an autopilot, it does not control the vessel and it replaces no certified equipment.',
      },
    },
    capabilities: {
      kicker: { es: '02 · Capacidades', en: '02 · Capabilities' },
      heading: { es: 'Capacidades definidas', en: 'Defined capabilities' },
      lead: {
        es: 'La especificación objetivo enumera 28 dominios de capacidad obligatorios. Aquí se resumen los que definen el producto; ninguno se presenta como verificado en hardware.',
        en: 'The target specification enumerates 28 mandatory capability domains. The ones that define the product are summarised here; none is presented as verified on hardware.',
      },
    },
    specifications: {
      kicker: { es: '03 · Especificaciones', en: '03 · Specifications' },
      heading: { es: 'Ficha técnica y preparación', en: 'Technical sheet and readiness' },
      lead: {
        es: 'Los estados se copian del registro canónico de MC-16 y del registro de conformidad de MC-11. Esta página no promociona ningún estado.',
        en: 'Statuses are copied from the canonical MC-16 record and the MC-11 conformity register. This page promotes no status.',
      },
    },
    composition: {
      kicker: { es: '04 · Composición', en: '04 · Composition' },
      heading: { es: 'Composición y paquete', en: 'Composition and package' },
      lead: {
        es: 'La lista exacta de accesorios de montaje y alimentación está abierta hasta que se congele la BOM. Se declara lo que ya está definido y lo que no.',
        en: 'The exact list of mounting and power accessories is open until the BOM is frozen. What is defined and what is not is stated explicitly.',
      },
    },
    editions: {
      kicker: { es: '05 · Ediciones', en: '05 · Editions' },
      heading: { es: 'Ediciones definidas', en: 'Defined editions' },
      lead: {
        es: 'Dos ediciones registradas, delimitadas por valor para el cliente y no por «más potencia». El límite exacto debe congelarse tras el diseño de hardware y las pruebas físicas.',
        en: 'Two canonical editions, bounded by customer value rather than “more power”. The exact boundary must be frozen after hardware design and physical tests.',
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
      contentId: 'hub.overview.gateway',
      text: {
        es: 'La función del HUB es reunir, normalizar y publicar datos locales; no es una función de control del buque.',
        en: 'The HUB function is to gather, normalise and publish local data; it is not a vessel-control function.',
      },
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC05, MC11_HUB],
    },
    {
      contentId: 'hub.overview.offline',
      text: {
        es: 'Las funciones locales no requieren una suscripción en la nube y ninguna comprobación de derecho puede desactivarlas.',
        en: 'Local functions require no cloud subscription and no entitlement check can disable them.',
      },
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC05],
    },
    {
      contentId: 'hub.overview.matrix',
      text: {
        es: 'La compatibilidad se afirma únicamente a través de la matriz publicada; hoy no existe ninguna fila medida.',
        en: 'Compatibility is asserted only through the published matrix; today no measured row exists.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC05, MC11_PROTOCOL],
    },
  ],
  capabilities: [
    {
      contentId: 'hub.cap.ingest',
      label: { es: 'Ingesta de fuentes compatibles', en: 'Ingest of supported sources' },
      description: {
        es: 'Diseñado para recibir GNSS, datos de instrumentos compatibles, flujos Signal K, viento, profundidad cuando está disponible, estado de batería y servicios y blancos AIS de solo recepción.',
        en: 'Designed to receive GNSS, compatible instrument data, Signal K streams, wind, depth where available, battery and utility status and receive-only AIS targets.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC05, MC11_PROTOCOL],
    },
    {
      contentId: 'hub.cap.normalise',
      label: { es: 'Normalización documentada', en: 'Documented normalisation' },
      description: {
        es: 'Diseñado para normalizar los datos en un único vocabulario documentado de unidades, marca de tiempo y calidad.',
        en: 'Designed to normalise the data into one documented units, timestamp and quality vocabulary.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC05, MC11_HUB],
    },
    {
      contentId: 'hub.cap.publish',
      label: { es: 'Interfaz local publicada', en: 'Published local interface' },
      description: {
        es: 'Diseñada para publicar esa interfaz en la red del barco para que la consuman MAREA NAV, otros equipos compatibles y los dispositivos del armador.',
        en: 'Designed to publish that interface on the vessel network for MAREA NAV, other compatible equipment and the owner’s devices.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC05, MC11_HUB],
    },
    {
      contentId: 'hub.cap.diagnostics',
      label: { es: 'Panel local y diagnóstico', en: 'Local dashboard and diagnostics' },
      description: {
        es: 'Diseñado para presentar un panel local, diagnóstico de conexión, estado de instalación, identidad del dispositivo, configuración y retención de historial con copia y recuperación.',
        en: 'Designed to present a local dashboard, connection diagnostics, installation status, device identity, configuration and history retention with backup and recovery.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC05],
    },
    {
      contentId: 'hub.cap.offline',
      label: { es: 'Sin conexión por diseño', en: 'Offline by design' },
      description: {
        es: 'Diseñado para funcionar sin conexión y degradar de forma visible y segura cuando una fuente falla.',
        en: 'Designed to operate offline and degrade visibly and safely when a source fails.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC05, MC11_HUB],
    },
    {
      contentId: 'hub.cap.lifecycle',
      label: { es: 'Ciclo de vida del dispositivo', en: 'Device lifecycle' },
      description: {
        es: 'Actualizaciones con reversión, transferencia de propiedad y entrega mediante un servicio de instalación profesional con formación y soporte.',
        en: 'Updates with rollback, ownership transfer and delivery through a professional installation service with training and support.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC05],
    },
  ],
  composition: [
    {
      groupId: 'hub.comp.hardware',
      label: { es: 'Hardware', en: 'Hardware' },
      heading: { es: 'Composición de hardware', en: 'Hardware composition' },
      items: [
        {
          contentId: 'hub.comp.hardware.appliance',
          text: {
            es: 'Una unidad MAREA HUB instalada. El modelo de hardware no está seleccionado.',
            en: 'One installed MAREA HUB unit. The hardware model is not selected.',
          },
          evidenceClass: 'VERIFIED_REPO',
          sourceRefs: [MC16_FAMILY, MC11_MAP],
        },
        {
          contentId: 'hub.comp.hardware.accessories',
          text: {
            es: 'Accesorios de montaje y alimentación por SKU: la lista exacta está abierta hasta congelar la BOM.',
            en: 'Mounting and power accessories per SKU: the exact list is open until the BOM is frozen.',
          },
          evidenceClass: 'OPEN',
          sourceRefs: [MC05],
        },
        {
          contentId: 'hub.comp.hardware.antenna',
          text: {
            es: 'Antena GNSS externa sólo cuando la instalación la requiera, como elemento opcional.',
            en: 'External GNSS antenna only where the installation requires it, as an optional item.',
          },
          evidenceClass: 'VERIFIED_REPO',
          sourceRefs: [MC05],
        },
      ],
    },
    {
      groupId: 'hub.comp.software',
      label: { es: 'Software', en: 'Software' },
      heading: { es: 'Composición de software', en: 'Software composition' },
      items: [
        {
          contentId: 'hub.comp.software.licence',
          text: {
            es: 'Licencia de uso del software del dispositivo y de los servicios locales durante la ventana de soporte publicada.',
            en: 'Licence to use the on-device software and local services for the published support window.',
          },
          evidenceClass: 'OPEN',
          sourceRefs: [MC05],
        },
        {
          contentId: 'hub.comp.software.updates',
          text: {
            es: 'Actualizaciones de seguridad y correctivas dentro de la ventana de soporte.',
            en: 'Security and corrective updates inside the support window.',
          },
          evidenceClass: 'OPEN',
          sourceRefs: [MC05],
        },
        {
          contentId: 'hub.comp.software.cloud',
          text: {
            es: 'Sin suscripción en la nube obligatoria para las funciones locales de datos.',
            en: 'No mandatory cloud subscription for local data functions.',
          },
          evidenceClass: 'VERIFIED_REPO',
          sourceRefs: [MC05],
        },
      ],
    },
    {
      groupId: 'hub.comp.included',
      label: { es: 'Incluido', en: 'Included' },
      heading: { es: 'Incluido en la compra prevista', en: 'Included in the intended purchase' },
      items: [
        {
          contentId: 'hub.comp.included.unit',
          text: {
            es: 'La unidad MAREA HUB, la guía de conexión y puesta en marcha y la evaluación de compatibilidad de la configuración comprada.',
            en: 'The MAREA HUB unit, the connection and setup guide and the compatibility assessment for the purchased configuration.',
          },
          evidenceClass: 'HYPOTHESIS',
          sourceRefs: [MC05],
        },
        {
          contentId: 'hub.comp.included.support',
          text: {
            es: 'Un derecho de soporte definido y la instalación profesional sólo cuando la configuración se compra instalada.',
            en: 'A defined support entitlement and professional installation only when the configuration is purchased as installed.',
          },
          evidenceClass: 'HYPOTHESIS',
          sourceRefs: [MC05],
        },
      ],
    },
    {
      groupId: 'hub.comp.excluded',
      label: { es: 'Excluido', en: 'Excluded' },
      heading: { es: 'Excluido de la compra', en: 'Excluded from the purchase' },
      items: [
        {
          contentId: 'hub.comp.excluded.network',
          text: {
            es: 'La columna vertebral de red del barco, sensores no relacionados y cableado licenciado de proveedor más allá de los adaptadores documentados.',
            en: 'The vessel network backbone, unrelated sensors and vendor-licensed cabling beyond the documented adapters.',
          },
          evidenceClass: 'VERIFIED_REPO',
          sourceRefs: [MC05],
        },
        {
          contentId: 'hub.comp.excluded.thirdparty',
          text: {
            es: 'Licencias de cartas o meteorología de terceros, MAREA PILOT o cualquier hardware de gobierno y la mano de obra cuando la instalación es propia.',
            en: 'Third-party chart or weather licences, MAREA PILOT or any steering hardware and labour when self-installed.',
          },
          evidenceClass: 'VERIFIED_REPO',
          sourceRefs: [MC05],
        },
        {
          contentId: 'hub.comp.excluded.compat',
          text: {
            es: 'Cualquier compatibilidad que no esté publicada en la matriz.',
            en: 'Any compatibility that is not published in the matrix.',
          },
          evidenceClass: 'VERIFIED_REPO',
          sourceRefs: [MC05, MC11_PROTOCOL],
        },
      ],
    },
  ],
  interfaces: [
    {
      contentId: 'hub.int.nmea0183',
      direction: { es: 'Entrada', en: 'Input' },
      transport: {
        es: 'NMEA 0183 sobre rutas serie/USB soportadas',
        en: 'NMEA 0183 over supported serial/USB paths',
      },
      status: { es: 'Previsto', en: 'Intended' },
      note: {
        es: 'Sólo análisis de sentencias; el análisis no es conformidad con la norma NMEA 0183.',
        en: 'Sentence parsing only; parsing is not conformance to the NMEA 0183 standard.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC05, MC11_PROTOCOL, MC11_NMEA],
    },
    {
      contentId: 'hub.int.signalk',
      direction: { es: 'Entrada', en: 'Input' },
      transport: { es: 'Flujos Signal K', en: 'Signal K streams' },
      status: { es: 'Sólo con resultado probado', en: 'Only with a tested result' },
      note: {
        es: 'Ruta por ruta y dirección por dirección, con dispositivo y firmware identificados.',
        en: 'Path by path and direction by direction, with device and firmware identified.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC05, MC11_PROTOCOL],
    },
    {
      contentId: 'hub.int.gnss',
      direction: { es: 'Entrada', en: 'Input' },
      transport: { es: 'Receptor GNSS compatible', en: 'Compatible GNSS receiver' },
      status: { es: 'Previsto', en: 'Intended' },
      note: {
        es: 'Posición, hora, rumbo y velocidad desde una fuente soportada.',
        en: 'Position, time, heading and speed from a supported source.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC05],
    },
    {
      contentId: 'hub.int.instruments',
      direction: { es: 'Entrada', en: 'Input' },
      transport: {
        es: 'Viento, profundidad y batería/servicios',
        en: 'Wind, depth and battery/utility data',
      },
      status: { es: 'Previsto', en: 'Intended' },
      note: {
        es: 'Profundidad sólo cuando está disponible en la fuente soportada.',
        en: 'Depth only where available from the supported source.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC05],
    },
    {
      contentId: 'hub.int.ais',
      direction: { es: 'Entrada', en: 'Input' },
      transport: {
        es: 'Blancos AIS de un receptor de solo recepción',
        en: 'AIS targets from a receive-only receiver',
      },
      status: { es: 'Previsto', en: 'Intended' },
      note: {
        es: 'Sólo recepción. El HUB no transmite AIS.',
        en: 'Receive only. The HUB does not transmit AIS.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC05, MC02],
    },
    {
      contentId: 'hub.int.output',
      direction: { es: 'Salida', en: 'Output' },
      transport: {
        es: 'Interfaz local documentada de datos de la embarcación',
        en: 'Documented local vessel data interface',
      },
      status: { es: 'Previsto', en: 'Intended' },
      note: {
        es: 'Publicada en la red del barco; el contrato exacto no está congelado.',
        en: 'Published on the vessel network; the exact contract is not frozen.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC05, MC11_HUB],
    },
  ],
  editions: [
    {
      editionId: 'HUB-STANDARD',
      name: { es: 'HUB Standard', en: 'HUB Standard' },
      summary: {
        es: 'Dirigida a una instalación de un solo barco con equipamiento heredado mixto, dentro de un sobre documentado de interfaces y conexiones.',
        en: 'Aimed at a single-vessel installation with mixed legacy equipment, within a documented interface and connection envelope.',
      },
      note: {
        es: 'Dispositivo de hardware previsto. Sin precio aprobado ni disponibilidad comercial.',
        en: 'Intended hardware device. No approved price and no commercial availability.',
      },
      featureLabels: [
        { featureKey: 'HUB_LOCAL_DATA', label: { es: 'Datos locales', en: 'Local data' } },
        { featureKey: 'HUB_WIFI', label: { es: 'Wi-Fi', en: 'Wi-Fi' } },
        { featureKey: 'HUB_NMEA_INTERFACE', label: { es: 'Interfaz NMEA', en: 'NMEA interface' } },
      ],
    },
    {
      editionId: 'HUB-PRO',
      name: { es: 'HUB Pro', en: 'HUB Pro' },
      summary: {
        es: 'Amplía el sobre validado de interfaces y conexiones, aumenta la capacidad de integración para conjuntos de equipos más densos o variados y añade profundidad de configuración y diagnóstico, herramientas de instalador y profundidad de soporte. El límite exacto debe congelarse tras el diseño de hardware y las pruebas físicas.',
        en: 'Extends the validated interface and connection envelope, increases integration capacity for denser or more varied equipment sets and adds configuration and diagnostics depth, installer tooling and support depth. The exact boundary must be frozen after hardware design and physical tests.',
      },
      note: {
        es: 'Dispositivo de hardware previsto. Sin precio aprobado ni disponibilidad comercial.',
        en: 'Intended hardware device. No approved price and no commercial availability.',
      },
      featureLabels: [
        { featureKey: 'HUB_LOCAL_DATA', label: { es: 'Datos locales', en: 'Local data' } },
        { featureKey: 'HUB_WIFI', label: { es: 'Wi-Fi', en: 'Wi-Fi' } },
        { featureKey: 'HUB_NMEA_INTERFACE', label: { es: 'Interfaz NMEA', en: 'NMEA interface' } },
      ],
    },
  ],
  editionNote: {
    es: 'Una edición es una identidad estable, no un SKU de comercio. No hay precio aprobado, stock verificado, código de SKU ni pedido disponible.',
    en: 'An edition is a stable identity, not a merchant SKU. There is no approved price, verified stock, SKU code or available order.',
  },
  limitations: [
    {
      contentId: 'hub.lim.hardware',
      label: {
        es: 'Hardware no seleccionado y BOM no congelada',
        en: 'Hardware not selected and BOM not frozen',
      },
      description: {
        es: 'No se publican puertos, radios, procesador, consumo ni dimensiones porque todavía no están decididos.',
        en: 'No ports, radios, processor, power or dimensions are published because they are not decided yet.',
      },
      kind: 'UNAVAILABLE',
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC16_FAMILY, MC11_MAP],
    },
    {
      contentId: 'hub.lim.nmea',
      label: {
        es: 'Sin certificación NMEA 2000 ni compatibilidad universal',
        en: 'No NMEA 2000 certification or universal compatibility',
      },
      description: {
        es: 'El análisis de sentencias NMEA 0183 no es conformidad con la norma. No se ofrece una pasarela plug-and-play universal.',
        en: 'NMEA 0183 sentence parsing is not conformance to the standard. No universal plug-and-play gateway is offered.',
      },
      kind: 'PROHIBITION',
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC05, MC11_NMEA],
    },
    {
      contentId: 'hub.lim.matrix',
      label: { es: 'Compatibilidad sin filas medidas', en: 'Compatibility with no measured rows' },
      description: {
        es: 'Hoy hay 0 filas de compatibilidad probadas: la integración no se afirma sin un resultado por dispositivo, firmware y dirección.',
        en: 'Today there are 0 tested compatibility rows: integration is not asserted without a result per device, firmware and direction.',
      },
      kind: 'LIMITATION',
      evidenceClass: 'OPEN',
      sourceRefs: [MC11_PROTOCOL, MC05],
    },
    {
      contentId: 'hub.lim.compliance',
      label: {
        es: 'Sin conformidad CE/EMC/RED demostrada',
        en: 'No demonstrated CE/EMC/RED conformity',
      },
      description: {
        es: 'No se declara marcado CE, conformidad RED/EMC ni aprobación regulatoria; el registro de conformidad sigue abierto.',
        en: 'No CE marking, RED/EMC conformity or regulatory approval is claimed; the conformity register remains open.',
      },
      kind: 'PROHIBITION',
      evidenceClass: 'BLOCKED',
      sourceRefs: [MC11_COMPLIANCE, MC02],
    },
    {
      contentId: 'hub.lim.control',
      label: { es: 'Sin control del buque', en: 'No vessel control' },
      description: {
        es: 'El HUB no gobierna el timón, el motor ni ningún actuador y no es un equipo de seguridad.',
        en: 'The HUB does not control the rudder, the engine or any actuator and is not safety equipment.',
      },
      kind: 'PROHIBITION',
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC05, MC11_HUB],
    },
    {
      contentId: 'hub.lim.commercial',
      label: {
        es: 'Sin precio, stock, SKU ni pedido',
        en: 'No price, stock, SKU or order',
      },
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
      bundleId: 'START',
      note: {
        es: 'Composición canónica: incluye HUB-STANDARD. El paquete no es comprable.',
        en: 'Canonical composition: includes HUB-STANDARD. The bundle is not purchasable.',
      },
    },
    {
      bundleId: 'CRUISE',
      note: {
        es: 'Composición canónica: incluye HUB-STANDARD. El paquete no es comprable.',
        en: 'Canonical composition: includes HUB-STANDARD. The bundle is not purchasable.',
      },
    },
    {
      bundleId: 'SAIL',
      note: {
        es: 'Composición canónica: incluye HUB-STANDARD. El paquete no es comprable.',
        en: 'Canonical composition: includes HUB-STANDARD. The bundle is not purchasable.',
      },
    },
    {
      bundleId: 'PROTECT',
      note: {
        es: 'Composición canónica: HUB-STANDARD es opcional en este paquete. No es comprable.',
        en: 'Canonical composition: HUB-STANDARD is optional in this bundle. It is not purchasable.',
      },
    },
    {
      bundleId: 'COMPLETE',
      note: {
        es: 'Composición canónica: incluye HUB-PRO. El paquete no es comprable.',
        en: 'Canonical composition: includes HUB-PRO. The bundle is not purchasable.',
      },
    },
    {
      bundleId: 'FLEET',
      note: {
        es: 'Composición canónica: HUB-STANDARD es opcional en el paquete de flota. No es comprable.',
        en: 'Canonical composition: HUB-STANDARD is optional in the fleet package. It is not purchasable.',
      },
    },
  ],
  documentation: [
    {
      documentId: 'hub.doc.spec',
      title: {
        es: 'Especificación comercial MAREA HUB (MC-05)',
        en: 'MAREA HUB commercial specification (MC-05)',
      },
      kind: 'SPECIFICATION',
      status: 'AVAILABLE',
      limitation: null,
      sourceRef: MC05_SPEC,
    },
    {
      documentId: 'hub.doc.architecture',
      title: {
        es: 'Arquitectura del HUB (MC-11)',
        en: 'HUB architecture (MC-11)',
      },
      kind: 'ARCHITECTURE',
      status: 'AVAILABLE',
      limitation: {
        es: 'Arquitectura de referencia; el hardware sigue sin seleccionar.',
        en: 'Reference architecture; the hardware remains unselected.',
      },
      sourceRef: MC11_HUB,
    },
    {
      documentId: 'hub.doc.compat',
      title: {
        es: 'Matriz de compatibilidad NAV/HUB/AIS (interna)',
        en: 'NAV/HUB/AIS compatibility matrix (internal)',
      },
      kind: 'COMPATIBILITY',
      status: 'PENDING',
      limitation: {
        es: '0 filas medidas: no existe todavía un resultado probado por dispositivo, firmware y dirección.',
        en: '0 measured rows: no tested result per device, firmware and direction exists yet.',
      },
      sourceRef: 'docs/marea/products/PRODUCT-COMPATIBILITY-NAV-HUB-AIS.md',
    },
    {
      documentId: 'hub.doc.conformity',
      title: {
        es: 'Registro de bloqueos de conformidad (MC-11)',
        en: 'Conformity blocker register (MC-11)',
      },
      kind: 'CONFORMITY',
      status: 'AVAILABLE',
      limitation: {
        es: 'Registro abierto; ninguna conformidad demostrada.',
        en: 'Open register; no conformity demonstrated.',
      },
      sourceRef: MC11_COMPLIANCE,
    },
    {
      documentId: 'hub.doc.gates',
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
  ],
  closing: {
    heading: {
      es: 'Sin autorización de publicación ni de venta',
      en: 'No publication or sale authorisation',
    },
    body: {
      es: 'Esta ficha es contenido interno. La marca MAREA no está adoptada, la limpieza legal no está concedida y la disponibilidad comercial es NOT_FOR_SALE.',
      en: 'This sheet is internal content. The MAREA brand is not adopted, legal clearance is not granted and commercial availability is NOT_FOR_SALE.',
    },
    governance: [
      {
        contentId: 'hub.close.gates',
        text: {
          es: '13 puertas de publicación registradas y 0 cerradas; 42 afirmaciones catalogadas y 0 autorizadas públicamente.',
          en: '13 publication gates recorded and 0 closed; 42 claims catalogued and 0 publicly authorised.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC14_GATES, 'docs/marea/legal-commercial/data/claims-policy.json'],
      },
      {
        contentId: 'hub.close.commercial',
        text: {
          es: '0 precios aprobados, 0 ediciones comercializables, 0 SKU de comercio, 0 filas de stock y 0 filas de compatibilidad probadas.',
          en: '0 approved prices, 0 merchantable editions, 0 merchant SKUs, 0 stock rows and 0 tested compatibility rows.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC16_EDITIONS, MC16_FAMILY],
      },
      {
        contentId: 'hub.close.privacy',
        text: {
          es: 'Sin formulario, sin captación de contactos y sin almacenamiento de datos personales: GATE-PRIVACY-DPA-DPIA está bloqueada.',
          en: 'No form, no lead capture and no personal-data storage: GATE-PRIVACY-DPA-DPIA is blocked.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC14_GATES],
      },
    ],
    nextMilestone: {
      contentId: 'hub.close.next',
      text: {
        es: 'MC-21 no está iniciado. Este lote de catálogo no lo autoriza.',
        en: 'MC-21 is not started. This catalogue batch does not authorise it.',
      },
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: ['docs/marea/execution/MASTER-PROMPT-REGISTRY.md'],
    },
  },
};
