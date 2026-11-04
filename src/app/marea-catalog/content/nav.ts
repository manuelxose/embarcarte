/**
 * MC-20 internal catalogue — MAREA NAV (software family) bilingual content.
 *
 * Every factual sentence traces to the MC-05 product definition, the MC-16
 * canonical commerce data or the MC-02/MC-11 audit evidence. Nothing here is a
 * price, stock, SKU, certification, compatibility guarantee or sales claim.
 */
import type { CatalogFamilyContent } from './content.types';

const MC05 = 'docs/marea/products/product-definitions.batch-01.json#products.NAV';
const MC05_SPEC = 'docs/marea/products/MAREA-NAV-COMMERCIAL-SPEC.md';
const MC16_FAMILY = 'docs/marea/commerce-data/data/product-families.json#families[familyId=NAV]';
const MC16_EDITIONS = 'docs/marea/commerce-data/data/product-editions.json#editions[familyId=NAV]';
const MC16_BUNDLES = 'docs/marea/commerce-data/data/bundle-compositions.json';
const MC15_ROUTE =
  'docs/marea/information-architecture/data/proposed-routes.json#items[routeId=mareaFamilyNav]';
const MC14_GATES = 'docs/marea/legal-commercial/data/release-evidence-gates.json';
const MC02 = 'docs/marea/compliance/MC-02-BLOCKERS-AND-DECISIONS.md';
const MC11_PROTOCOL =
  'docs/marea/hardware/architecture/MC11-PROTOCOL-AND-COMPATIBILITY-ASSESSMENT.md';
const MC11_NMEA = 'docs/marea/hardware/conformity/MC11-NMEA-LICENSING-AND-CERTIFICATION-ROADMAP.md';

export const NAV_CONTENT: CatalogFamilyContent = {
  familyId: 'NAV',
  hero: {
    kicker: { es: 'Catálogo interno · lote 1 · NAV', en: 'Internal catalogue · batch 1 · NAV' },
    heading: { es: 'MAREA NAV', en: 'MAREA NAV' },
    lead: {
      es: 'Aplicación de navegación por software de la familia MAREA: planificar una ruta, navegarla con vista de carta, registrar la travesía y ver los datos del barco cuando un equipo compatible los publica, en teléfono, tableta u ordenador.',
      en: 'The MAREA family navigation application: plan a route, navigate it on a chart view, record the passage and see the boat data that compatible equipment publishes, on a phone, tablet or desktop.',
    },
    category: {
      es: 'Software · suscripción anual prevista',
      en: 'Software · intended annual subscription',
    },
    mandatoryNotice: {
      contentId: 'nav.hero.notice',
      text: {
        es: 'MAREA NAV no sustituye a equipos certificados de navegación o seguridad. No es un sistema de navegación certificado y no se declara equivalencia ECDIS.',
        en: 'MAREA NAV is not a substitute for certified navigation or safety equipment. It is not a certified navigation system and no ECDIS equivalence is claimed.',
      },
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC02, MC05_SPEC],
    },
    highlights: [
      {
        contentId: 'nav.hero.highlight.software',
        text: {
          es: 'Producto de software: no incluye hardware propio ni instalación.',
          en: 'Software product: no hardware of its own and no installation included.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC05, MC16_FAMILY],
      },
      {
        contentId: 'nav.hero.highlight.editions',
        text: {
          es: 'Dos ediciones registradas (NAV-ESSENTIAL, NAV-PRO). Una edición no es un SKU de comercio.',
          en: 'Two canonical editions (NAV-ESSENTIAL, NAV-PRO). An edition is not a merchant SKU.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC16_EDITIONS, MC05],
      },
      {
        contentId: 'nav.hero.highlight.data',
        text: {
          es: 'Cartas, mareas y corrientes dependen de la licencia del cliente: el software no transmite ese derecho.',
          en: 'Charts, tides and currents depend on the customer’s licence: the software does not transfer that right.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC05, MC02],
      },
      {
        contentId: 'nav.hero.highlight.ais',
        text: {
          es: 'Tráfico AIS de solo recepción cuando existe una fuente compatible. NAV no transmite AIS.',
          en: 'Receive-only AIS traffic when a compatible source exists. NAV does not transmit AIS.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC05, MC02],
      },
    ],
  },
  sections: {
    overview: {
      kicker: { es: '01 · Visión general', en: '01 · Overview' },
      heading: { es: 'Qué es MAREA NAV', en: 'What MAREA NAV is' },
      lead: {
        es: 'Producto de software definido para planificar, navegar y registrar travesías con los datos que el barco ya puede publicar. No se presenta una licencia de datos ni un equipo de terceros como una función de MAREA NAV.',
        en: 'A software product defined to plan, navigate and record passages using the data the boat can already publish. A data licence or third-party equipment is never presented as a MAREA NAV feature.',
      },
    },
    capabilities: {
      kicker: { es: '02 · Capacidades', en: '02 · Capabilities' },
      heading: { es: 'Capacidades definidas', en: 'Defined capabilities' },
      lead: {
        es: 'Cada capacidad pertenece a una capa distinta: función de software, derecho de datos licenciado, instrumento conectado opcional o dispositivo opcional. La capa se declara junto a la capacidad.',
        en: 'Each capability belongs to a different layer: software function, licensed data entitlement, optional connected instrument or optional device. The layer is stated next to the capability.',
      },
    },
    specifications: {
      kicker: { es: '03 · Especificaciones', en: '03 · Specifications' },
      heading: { es: 'Ficha técnica y preparación', en: 'Technical sheet and readiness' },
      lead: {
        es: 'Los estados se copian del registro canónico de MC-16. Esta página no promociona ningún estado ni convierte una definición en disponibilidad.',
        en: 'Statuses are copied from the canonical MC-16 record. This page promotes no status and does not turn a definition into availability.',
      },
    },
    composition: {
      kicker: { es: '04 · Composición', en: '04 · Composition' },
      heading: { es: 'Composición y paquete', en: 'Composition and package' },
      lead: {
        es: 'Qué incluye la edición prevista y qué queda fuera, declarado antes de cualquier compra.',
        en: 'What the intended edition includes and what it excludes, stated before any purchase.',
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
      contentId: 'nav.overview.software',
      text: {
        es: 'MAREA NAV es un producto de software: no incluye hardware propio, conectividad ni instalación.',
        en: 'MAREA NAV is a software product: it includes no hardware of its own, no connectivity and no installation.',
      },
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC05, MC16_FAMILY],
    },
    {
      contentId: 'nav.overview.layers',
      text: {
        es: 'Una carta licenciada, una previsión o un equipo conectado son objetos separados con su propia preparación y su propio derecho de uso.',
        en: 'A licensed chart, a forecast or connected equipment are separate objects with their own readiness and their own right of use.',
      },
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC05, MC02],
    },
    {
      contentId: 'nav.overview.claims',
      text: {
        es: 'La ficha no atribuye certificación, compatibilidad probada, disponibilidad comercial ni fiabilidad de navegación.',
        en: 'The sheet attributes no certification, tested compatibility, commercial availability or navigation reliability.',
      },
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC02, MC11_NMEA],
    },
  ],
  capabilities: [
    {
      contentId: 'nav.cap.planning',
      label: { es: 'Planificación y navegación de ruta', en: 'Route planning and navigation' },
      description: {
        es: 'Planificación de ruta, waypoints, edición de rutas, bibliotecas de rutas, destinos guardados y planificación de travesía.',
        en: 'Route planning, waypoints, route editing, route libraries, saved destinations and passage planning.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC05, MC05_SPEC],
    },
    {
      contentId: 'nav.cap.charts',
      label: {
        es: 'Vista de carta con datos licenciados',
        en: 'Chart view with licensed data',
      },
      description: {
        es: 'Vista de carta con acceso a cartas licenciadas dentro del derecho de la edición del cliente. La cobertura y la fuente dependen de esa licencia; no se adquieren con el software.',
        en: 'Chart view with access to licensed charts within the customer’s edition entitlement. Coverage and source depend on that licence; they are not acquired with the software.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC05, MC02],
    },
    {
      contentId: 'nav.cap.instruments',
      label: {
        es: 'Datos del barco en la superficie de navegación',
        en: 'Boat data on the navigation surface',
      },
      description: {
        es: 'Posición GNSS del dispositivo, rumbo, velocidad y curso, viento y profundidad cuando una fuente compatible los publica, con la antigüedad y la calidad del dato visibles.',
        en: 'Device GNSS position, heading, speed and course, wind and depth when a compatible source publishes them, with data age and quality visible.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC05, MC11_PROTOCOL],
    },
    {
      contentId: 'nav.cap.ais',
      label: { es: 'Tráfico AIS de solo recepción', en: 'Receive-only AIS traffic' },
      description: {
        es: 'Visualización de blancos AIS cuando existe una fuente AIS de solo recepción compatible. NAV no transmite AIS y no sustituye a un transpondedor.',
        en: 'AIS target display when a compatible receive-only AIS source exists. NAV does not transmit AIS and is not a transponder substitute.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC05, MC02],
    },
    {
      contentId: 'nav.cap.logbook',
      label: { es: 'Registro y exportación', en: 'Logbook and export' },
      description: {
        es: 'Historial y cuaderno de bitácora por travesía, con importación y exportación de los registros propios del cliente.',
        en: 'Per-passage history and logbook, with import and export of the customer’s own records.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC05, MC05_SPEC],
    },
    {
      contentId: 'nav.cap.account',
      label: { es: 'Una cuenta, varios dispositivos', en: 'One account, several devices' },
      description: {
        es: 'Una cuenta y un perfil de embarcación con acceso en varios dispositivos hasta el límite de la edición prevista.',
        en: 'One account and one vessel profile with access on several devices up to the intended edition limit.',
      },
      evidenceClass: 'HYPOTHESIS',
      sourceRefs: [MC05],
    },
  ],
  composition: [
    {
      groupId: 'nav.comp.software',
      label: { es: 'Software', en: 'Software' },
      heading: { es: 'Software previsto', en: 'Intended software' },
      items: [
        {
          contentId: 'nav.comp.software.access',
          text: {
            es: 'Acceso a las capacidades de la edición en las plataformas soportadas.',
            en: 'Access to the edition capabilities on the supported platforms.',
          },
          evidenceClass: 'HYPOTHESIS',
          sourceRefs: [MC05],
        },
        {
          contentId: 'nav.comp.software.updates',
          text: {
            es: 'Actualizaciones de aplicación y correcciones de seguridad durante la suscripción.',
            en: 'Application updates and security fixes during the subscription.',
          },
          evidenceClass: 'HYPOTHESIS',
          sourceRefs: [MC05],
        },
        {
          contentId: 'nav.comp.software.export',
          text: {
            es: 'Exportación de los registros propios del cliente.',
            en: 'Export of the customer’s own records.',
          },
          evidenceClass: 'HYPOTHESIS',
          sourceRefs: [MC05],
        },
      ],
    },
    {
      groupId: 'nav.comp.included',
      label: { es: 'Incluido', en: 'Included' },
      heading: {
        es: 'Incluido en la suscripción prevista',
        en: 'Included in the intended subscription',
      },
      items: [
        {
          contentId: 'nav.comp.included.account',
          text: {
            es: 'Una cuenta MAREA con el perfil de embarcación y del patrón.',
            en: 'One MAREA account with the vessel and skipper profile.',
          },
          evidenceClass: 'HYPOTHESIS',
          sourceRefs: [MC05],
        },
        {
          contentId: 'nav.comp.included.data',
          text: {
            es: 'Datos licenciados de carta, marea, corriente o previsión sólo en la medida en que el derecho del cliente lo permita.',
            en: 'Licensed chart, tide, current or forecast data only to the extent the customer’s entitlement allows.',
          },
          evidenceClass: 'HYPOTHESIS',
          sourceRefs: [MC05, MC02],
        },
        {
          contentId: 'nav.comp.included.support',
          text: {
            es: 'Soporte según la política de soporte publicada.',
            en: 'Support under the published support policy.',
          },
          evidenceClass: 'HYPOTHESIS',
          sourceRefs: [MC05],
        },
      ],
    },
    {
      groupId: 'nav.comp.excluded',
      label: { es: 'Excluido', en: 'Excluded' },
      heading: { es: 'Excluido de la suscripción', en: 'Excluded from the subscription' },
      items: [
        {
          contentId: 'nav.comp.excluded.charts',
          text: {
            es: 'Cartas por defecto: el software no incluye derechos de carta.',
            en: 'Charts by default: the software includes no chart rights.',
          },
          evidenceClass: 'VERIFIED_REPO',
          sourceRefs: [MC05, MC02],
        },
        {
          contentId: 'nav.comp.excluded.hardware',
          text: {
            es: 'Hardware GNSS, receptor AIS, MAREA HUB, conectividad y mano de obra de instalación.',
            en: 'GNSS hardware, AIS receiver, MAREA HUB, connectivity and installation labour.',
          },
          evidenceClass: 'VERIFIED_REPO',
          sourceRefs: [MC05],
        },
        {
          contentId: 'nav.comp.excluded.weather',
          text: {
            es: 'Una suscripción MAREA WEATHER separada y cualquier certificación de navegación.',
            en: 'A separate MAREA WEATHER subscription and any navigation certification.',
          },
          evidenceClass: 'VERIFIED_REPO',
          sourceRefs: [MC05],
        },
      ],
    },
    {
      groupId: 'nav.comp.licence',
      label: { es: 'Licencias', en: 'Licensing' },
      heading: { es: 'Licencias y procedencia', en: 'Licensing and provenance' },
      items: [
        {
          contentId: 'nav.comp.licence.ownership',
          text: {
            es: 'El cliente no adquiere la propiedad de cartas, previsiones ni mareas; se aplican los términos del proveedor.',
            en: 'The customer does not acquire ownership of charts, forecasts or tides; the provider’s terms apply.',
          },
          evidenceClass: 'OPEN',
          sourceRefs: [MC05, MC02],
        },
        {
          contentId: 'nav.comp.licence.separation',
          text: {
            es: 'Ningún derecho de datos de terceros se transfiere más allá del propio contrato de usuario final del proveedor.',
            en: 'No third-party data right is transferred beyond the provider’s own end-user terms.',
          },
          evidenceClass: 'OPEN',
          sourceRefs: [MC05, MC02],
        },
      ],
    },
  ],
  interfaces: [
    {
      contentId: 'nav.int.gnss',
      direction: { es: 'Entrada', en: 'Input' },
      transport: { es: 'GNSS del dispositivo del cliente', en: 'Customer device GNSS' },
      status: { es: 'Previsto', en: 'Intended' },
      note: {
        es: 'Depende de la plataforma y de la precisión del dispositivo; no se declara una precisión.',
        en: 'Depends on the platform and device accuracy; no accuracy is claimed.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC05, MC11_PROTOCOL],
    },
    {
      contentId: 'nav.int.signalk',
      direction: { es: 'Entrada', en: 'Input' },
      transport: { es: 'Signal K', en: 'Signal K' },
      status: { es: 'Sólo con resultado probado', en: 'Only with a tested result' },
      note: {
        es: 'Ruta por ruta y dirección por dirección, con dispositivo y firmware identificados.',
        en: 'Path by path and direction by direction, with device and firmware identified.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC05, MC11_PROTOCOL],
    },
    {
      contentId: 'nav.int.nmea0183',
      direction: { es: 'Entrada', en: 'Input' },
      transport: { es: 'NMEA 0183', en: 'NMEA 0183' },
      status: {
        es: 'Sólo donde la matriz probada lo indique',
        en: 'Only where the tested matrix says so',
      },
      note: {
        es: 'El análisis de sentencias no es conformidad con la norma NMEA 0183.',
        en: 'Sentence parsing is not conformance to the NMEA 0183 standard.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC11_PROTOCOL, MC11_NMEA],
    },
    {
      contentId: 'nav.int.hub',
      direction: { es: 'Entrada', en: 'Input' },
      transport: {
        es: 'Interfaz local documentada de MAREA HUB',
        en: 'Documented MAREA HUB local interface',
      },
      status: { es: 'Previsto', en: 'Intended' },
      note: {
        es: 'Requiere un MAREA HUB compatible con su propia matriz publicada.',
        en: 'Requires a MAREA HUB compatible under its own published matrix.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC05, MC11_PROTOCOL],
    },
    {
      contentId: 'nav.int.ais',
      direction: { es: 'Entrada', en: 'Input' },
      transport: { es: 'Receptor AIS de solo recepción', en: 'Receive-only AIS receiver' },
      status: { es: 'Previsto', en: 'Intended' },
      note: {
        es: 'Sólo recepción. NAV no transmite AIS ni sustituye a un transpondedor.',
        en: 'Receive only. NAV does not transmit AIS and is not a transponder substitute.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC05, MC02],
    },
    {
      contentId: 'nav.int.weather',
      direction: { es: 'Entrada', en: 'Input' },
      transport: {
        es: 'Datos meteorológicos, de marea y corriente licenciados',
        en: 'Licensed weather, tide and current data',
      },
      status: { es: 'Según el derecho del cliente', en: 'Subject to the customer’s entitlement' },
      note: {
        es: 'No se transfiere ningún derecho del proveedor.',
        en: 'No provider right is transferred.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC05, MC02],
    },
  ],
  editions: [
    {
      editionId: 'NAV-ESSENTIAL',
      name: { es: 'NAV Essential', en: 'NAV Essential' },
      summary: {
        es: 'Edición de planificación y travesía: navegación, planificación y edición de rutas, waypoints, bibliotecas, destinos guardados, planificación de travesía, cuaderno de bitácora y exportación, y cartas licenciadas dentro del derecho del cliente.',
        en: 'Planning-and-passage edition: navigation, route planning and editing, waypoints, libraries, saved destinations, passage planning, logbook and export, and licensed charts within the customer’s entitlement.',
      },
      note: {
        es: 'Suscripción de software prevista. Sin precio aprobado ni disponibilidad comercial.',
        en: 'Intended software subscription. No approved price and no commercial availability.',
      },
      featureLabels: [
        { featureKey: 'NAV_CHARTS', label: { es: 'Cartas', en: 'Charts' } },
        { featureKey: 'NAV_ROUTING', label: { es: 'Ruta', en: 'Routing' } },
        { featureKey: 'NAV_INSTRUMENTS', label: { es: 'Instrumentos', en: 'Instruments' } },
        { featureKey: 'NAV_AIS_TARGETS', label: { es: 'Blancos AIS', en: 'AIS targets' } },
      ],
    },
    {
      editionId: 'NAV-PRO',
      name: { es: 'NAV Pro', en: 'NAV Pro' },
      summary: {
        es: 'Segunda edición registrada. Los datos canónicos de MC-16 registran el mismo conjunto de claves de función que la edición Essential; el límite detallado entre ediciones vive en la especificación comercial y no se presenta aquí como una diferencia comercial no registrada.',
        en: 'Second canonical edition. The MC-16 canonical data records the same feature-key set as the Essential edition; the detailed boundary lives in the commercial specification and is not presented here as an unrecorded commercial difference.',
      },
      note: {
        es: 'Suscripción de software prevista. Sin precio aprobado ni disponibilidad comercial.',
        en: 'Intended software subscription. No approved price and no commercial availability.',
      },
      featureLabels: [
        { featureKey: 'NAV_CHARTS', label: { es: 'Cartas', en: 'Charts' } },
        { featureKey: 'NAV_ROUTING', label: { es: 'Ruta', en: 'Routing' } },
        { featureKey: 'NAV_INSTRUMENTS', label: { es: 'Instrumentos', en: 'Instruments' } },
        { featureKey: 'NAV_AIS_TARGETS', label: { es: 'Blancos AIS', en: 'AIS targets' } },
      ],
    },
  ],
  editionNote: {
    es: 'Una edición es una identidad estable, no un SKU de comercio. No hay precio aprobado, stock verificado, código de SKU ni pedido disponible.',
    en: 'An edition is a stable identity, not a merchant SKU. There is no approved price, verified stock, SKU code or available order.',
  },
  limitations: [
    {
      contentId: 'nav.lim.certified',
      label: {
        es: 'No es un sistema de navegación certificado',
        en: 'Not a certified navigation system',
      },
      description: {
        es: 'No sustituye a equipos certificados de navegación o seguridad y no se declara equivalencia ECDIS.',
        en: 'It is not a substitute for certified navigation or safety equipment and no ECDIS equivalence is claimed.',
      },
      kind: 'PROHIBITION',
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC02, MC05_SPEC],
    },
    {
      contentId: 'nav.lim.nmea',
      label: {
        es: 'Sin certificación NMEA 2000 ni garantía de interoperabilidad',
        en: 'No NMEA 2000 certification or interoperability guarantee',
      },
      description: {
        es: 'La integración sólo se afirma donde existe un resultado probado por dispositivo, firmware y dirección. Hoy hay 0 filas de compatibilidad probadas.',
        en: 'Integration is only asserted where a result is tested per device, firmware and direction. Today there are 0 tested compatibility rows.',
      },
      kind: 'LIMITATION',
      evidenceClass: 'OPEN',
      sourceRefs: [MC11_PROTOCOL, MC11_NMEA],
    },
    {
      contentId: 'nav.lim.charts',
      label: {
        es: 'Cartas y datos no incluidos',
        en: 'Charts and data not included',
      },
      description: {
        es: 'Las cartas, mareas y corrientes pertenecen a proveedores y a la licencia del cliente; no se transfiere ningún derecho de datos.',
        en: 'Charts, tides and currents belong to providers and to the customer’s licence; no data right is transferred.',
      },
      kind: 'UNAVAILABLE',
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC05, MC02],
    },
    {
      contentId: 'nav.lim.hardware',
      label: { es: 'Hardware no incluido', en: 'Hardware not included' },
      description: {
        es: 'GNSS, receptor AIS, HUB, conectividad e instalación son objetos separados con su propia preparación.',
        en: 'GNSS, AIS receiver, HUB, connectivity and installation are separate objects with their own readiness.',
      },
      kind: 'LIMITATION',
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC05],
    },
    {
      contentId: 'nav.lim.commercial',
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
    {
      contentId: 'nav.lim.safety',
      label: {
        es: 'Sin función de seguridad crítica',
        en: 'No safety-critical function',
      },
      description: {
        es: 'No se declara supervisión, alerta ni fiabilidad de navegación; la seguridad del buque no depende de este producto.',
        en: 'No supervision, alerting or navigation reliability is claimed; vessel safety does not depend on this product.',
      },
      kind: 'PROHIBITION',
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC02, MC05_SPEC],
    },
  ],
  bundleNotes: [
    {
      bundleId: 'START',
      note: {
        es: 'Composición canónica: incluye NAV-PRO. El paquete no es comprable.',
        en: 'Canonical composition: includes NAV-PRO. The bundle is not purchasable.',
      },
    },
    {
      bundleId: 'CRUISE',
      note: {
        es: 'Composición canónica: incluye NAV-ESSENTIAL. El paquete no es comprable.',
        en: 'Canonical composition: includes NAV-ESSENTIAL. The bundle is not purchasable.',
      },
    },
    {
      bundleId: 'SAIL',
      note: {
        es: 'Composición canónica: incluye NAV-PRO. El paquete no es comprable.',
        en: 'Canonical composition: includes NAV-PRO. The bundle is not purchasable.',
      },
    },
    {
      bundleId: 'COMPLETE',
      note: {
        es: 'Composición canónica: incluye NAV-PRO. El paquete no es comprable.',
        en: 'Canonical composition: includes NAV-PRO. The bundle is not purchasable.',
      },
    },
  ],
  documentation: [
    {
      documentId: 'nav.doc.spec',
      title: {
        es: 'Especificación comercial MAREA NAV (MC-05)',
        en: 'MAREA NAV commercial specification (MC-05)',
      },
      kind: 'SPECIFICATION',
      status: 'AVAILABLE',
      limitation: null,
      sourceRef: MC05_SPEC,
    },
    {
      documentId: 'nav.doc.data',
      title: {
        es: 'Contrato canónico de datos de comercio (MC-16)',
        en: 'Canonical commerce data contract (MC-16)',
      },
      kind: 'DATA_CONTRACT',
      status: 'AVAILABLE',
      limitation: null,
      sourceRef: 'docs/marea/commerce-data/MC16-CANONICAL-DOMAIN-DATA-CONTRACT.md',
    },
    {
      documentId: 'nav.doc.compat',
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
      documentId: 'nav.doc.gates',
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
      documentId: 'nav.doc.routes',
      title: {
        es: 'Registro de rutas propuestas (MC-15)',
        en: 'Proposed route registry (MC-15)',
      },
      kind: 'ROUTE_REGISTRY',
      status: 'AVAILABLE',
      limitation: {
        es: 'La ruta marea/nav está propuesta internamente y no es desplegable.',
        en: 'The marea/nav route is internally proposed and not deployable.',
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
      es: 'Esta ficha es contenido interno. La marca MAREA no está adoptada, la limpieza legal no está concedida y la disponibilidad comercial es NOT_FOR_SALE.',
      en: 'This sheet is internal content. The MAREA brand is not adopted, legal clearance is not granted and commercial availability is NOT_FOR_SALE.',
    },
    governance: [
      {
        contentId: 'nav.close.gates',
        text: {
          es: '13 puertas de publicación registradas y 0 cerradas; 42 afirmaciones catalogadas y 0 autorizadas públicamente.',
          en: '13 publication gates recorded and 0 closed; 42 claims catalogued and 0 publicly authorised.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC14_GATES, 'docs/marea/legal-commercial/data/claims-policy.json'],
      },
      {
        contentId: 'nav.close.commercial',
        text: {
          es: '0 precios aprobados, 0 ediciones comercializables, 0 SKU de comercio, 0 filas de stock y 0 filas de compatibilidad probadas.',
          en: '0 approved prices, 0 merchantable editions, 0 merchant SKUs, 0 stock rows and 0 tested compatibility rows.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC16_EDITIONS, MC16_FAMILY],
      },
      {
        contentId: 'nav.close.privacy',
        text: {
          es: 'Sin formulario, sin captación de contactos y sin almacenamiento de datos personales: GATE-PRIVACY-DPA-DPIA está bloqueada.',
          en: 'No form, no lead capture and no personal-data storage: GATE-PRIVACY-DPA-DPIA is blocked.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC14_GATES],
      },
    ],
    nextMilestone: {
      contentId: 'nav.close.next',
      text: {
        es: 'MC-21 no está iniciado. Este lote de catálogo no lo autoriza.',
        en: 'MC-21 is not started. This catalogue batch does not authorise it.',
      },
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: ['docs/marea/execution/MASTER-PROMPT-REGISTRY.md'],
    },
  },
};
