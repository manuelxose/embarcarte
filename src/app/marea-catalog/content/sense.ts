/**
 * MC-20/MC-21 internal catalogue — MAREA SENSE (hardware measurement family) bilingual content.
 *
 * SENSE is hardware in definition: hardware NOT_SELECTED, engineering only
 * PARTIALLY_VERIFIED (parser/IMU only), measurement accuracy NOT_MEASURED,
 * ingress NOT_VERIFIED and NMEA 2000 NOT_IMPLEMENTED. No module has connectivity
 * of its own and no certified alarm is claimed. Availability stays NOT_FOR_SALE.
 */
import type { CatalogFamilyContent } from './content.types';

const MC06 = 'docs/marea/products/product-definitions.batch-02.json#products.SENSE';
const SPEC = 'docs/marea/products/MAREA-SENSE-COMMERCIAL-SPEC.md';
const CALIBRATION = 'docs/marea/products/SENSE-MEASUREMENT-AND-CALIBRATION-PLAN.md';
const MC16_FAMILY = 'docs/marea/commerce-data/data/product-families.json#families[familyId=SENSE]';
const MC16_EDITIONS =
  'docs/marea/commerce-data/data/product-editions.json#editions[familyId=SENSE]';
const MC16_BUNDLES = 'docs/marea/commerce-data/data/bundle-compositions.json';
const MC15_ROUTE =
  'docs/marea/information-architecture/data/proposed-routes.json#items[routeId=mareaFamilySense]';
const MC14_GATES = 'docs/marea/legal-commercial/data/release-evidence-gates.json';
const MC02 = 'docs/marea/compliance/MC-02-BLOCKERS-AND-DECISIONS.md';
const COMPAT = 'docs/marea/products/PRODUCT-COMPATIBILITY-PILOT-SENSE-WATCH.md';
const EDITIONS = 'docs/marea/products/PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md';
const MC11_NMEA = 'docs/marea/hardware/conformity/MC11-NMEA-LICENSING-AND-CERTIFICATION-ROADMAP.md';
const COPY_ES = 'docs/marea/products/copy/sense.es.md';
const COPY_EN = 'docs/marea/products/copy/sense.en.md';

const LOCAL_MEASUREMENT = {
  featureKey: 'SENSE_LOCAL_MEASUREMENT',
  label: { es: 'Medición local', en: 'Local measurement' },
} as const;
const LOCAL_ALARM = {
  featureKey: 'SENSE_LOCAL_ALARM',
  label: { es: 'Alarma local independiente', en: 'Independent local alarm' },
} as const;

export const SENSE_CONTENT: CatalogFamilyContent = {
  familyId: 'SENSE',
  hero: {
    kicker: {
      es: 'Catálogo interno · lote 2 · SENSE',
      en: 'Internal catalogue · batch 2 · SENSE',
    },
    heading: { es: 'MAREA SENSE', en: 'MAREA SENSE' },
    lead: {
      es: 'Familia de módulos de medición a bordo de MAREA: viento, energía, sentinas, tanques y ambiente. Cada módulo declara qué mide, en qué rango y con qué calibración; cada lectura lleva su origen, su estado y su antigüedad. Un módulo por sí solo no tiene conectividad.',
      en: 'The MAREA family of onboard measurement modules: wind, power, bilge, tanks and environment. Each module declares what it measures, over what range and with what calibration; every reading carries its source, state and age. A module on its own has no connectivity.',
    },
    category: {
      es: 'Hardware · módulos de medición',
      en: 'Hardware · measurement modules',
    },
    mandatoryNotice: {
      contentId: 'sense.hero.notice',
      text: {
        es: 'MAREA SENSE no declara exactitud de medición (NOT_MEASURED), no verifica la estanqueidad (NOT_VERIFIED) y no implementa NMEA 2000 (NOT_IMPLEMENTED). No es equipo reglamentario ni una alarma certificada.',
        en: 'MAREA SENSE claims no measurement accuracy (NOT_MEASURED), no verified ingress protection (NOT_VERIFIED) and no NMEA 2000 implementation (NOT_IMPLEMENTED). It is not required equipment and not a certified alarm.',
      },
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC06, MC16_FAMILY, MC11_NMEA],
    },
    highlights: [
      {
        contentId: 'sense.hero.highlight.hardware',
        text: {
          es: 'Hardware no seleccionado y BOM no congelada: no se publican sensores, conectores ni clase de protección.',
          en: 'Hardware not selected and BOM not frozen: no sensors, connectors or protection class are published.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC16_FAMILY, MC06],
      },
      {
        contentId: 'sense.hero.highlight.accuracy',
        text: {
          es: 'Exactitud de medición NOT_MEASURED: no se anuncia ninguna cifra de precisión.',
          en: 'Measurement accuracy NOT_MEASURED: no accuracy figure is announced.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC06, CALIBRATION],
      },
      {
        contentId: 'sense.hero.highlight.connectivity',
        text: {
          es: 'Ningún módulo tiene conectividad propia; los avisos remotos son de MAREA WATCH.',
          en: 'No module has connectivity of its own; remote alerts belong to MAREA WATCH.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC06, SPEC],
      },
      {
        contentId: 'sense.hero.highlight.editions',
        text: {
          es: 'Ocho ediciones registradas (cinco módulos y tres conjuntos). Una edición no es un SKU de comercio.',
          en: 'Eight canonical editions (five modules and three sets). An edition is not a merchant SKU.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC16_EDITIONS, EDITIONS],
      },
    ],
  },
  sections: {
    overview: {
      kicker: { es: '01 · Visión general', en: '01 · Overview' },
      heading: { es: 'Qué es MAREA SENSE', en: 'What MAREA SENSE is' },
      lead: {
        es: 'Una familia de medición formada por cinco módulos y tres conjuntos preconfigurados. Ninguno es equipo reglamentario, una alarma certificada ni un instrumento de navegación.',
        en: 'A measurement family of five modules and three preconfigured sets. None is required equipment, a certified alarm or a navigation instrument.',
      },
    },
    capabilities: {
      kicker: { es: '02 · Capacidades', en: '02 · Capabilities' },
      heading: { es: 'Capacidades definidas', en: 'Defined capabilities' },
      lead: {
        es: 'Cada módulo mide una magnitud concreta dentro de su rango previsto. Lo que no se ha verificado se muestra como no verificado, nunca como fiable.',
        en: 'Each module measures one specific quantity within its intended range. What has not been verified is shown as not verified, never as reliable.',
      },
    },
    specifications: {
      kicker: { es: '03 · Especificaciones', en: '03 · Specifications' },
      heading: { es: 'Ficha técnica y preparación', en: 'Technical sheet and readiness' },
      lead: {
        es: 'Los estados se copian del registro canónico de MC-16. La ingeniería está PARTIALLY_VERIFIED sólo para el analizador y la IMU, nunca para el sensor completo.',
        en: 'Statuses are copied from the canonical MC-16 record. Engineering is PARTIALLY_VERIFIED only for the parser and the IMU, never for the full sensor.',
      },
    },
    composition: {
      kicker: { es: '04 · Composición', en: '04 · Composition' },
      heading: { es: 'Composición y paquete', en: 'Composition and package' },
      lead: {
        es: 'Cada módulo se compra por separado y ninguno presupone los demás. Los conjuntos reúnen módulos ya descritos y no añaden capacidades nuevas.',
        en: 'Each module is purchased separately and none presumes the others. The sets combine modules already described and add no new capability.',
      },
    },
    editions: {
      kicker: { es: '05 · Ediciones', en: '05 · Editions' },
      heading: { es: 'Ediciones definidas', en: 'Defined editions' },
      lead: {
        es: 'Ocho ediciones registradas en los datos canónicos. Ninguna tiene precio aprobado, stock verificado ni código de SKU de comercio.',
        en: 'Eight editions recorded in the canonical data. Neither has an approved price, verified stock or merchant SKU code.',
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
      contentId: 'sense.overview.modules',
      text: {
        es: 'Cinco módulos (Wind, Power, Bilge, Tanks, Environment) y tres conjuntos (Essentials, Sail, Systems); los conjuntos no añaden capacidades nuevas.',
        en: 'Five modules (Wind, Power, Bilge, Tanks, Environment) and three sets (Essentials, Sail, Systems); the sets add no new capability.',
      },
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC06, EDITIONS],
    },
    {
      contentId: 'sense.overview.verified',
      text: {
        es: 'La ingeniería está PARTIALLY_VERIFIED sólo para el analizador y la IMU; eso no convierte en verificada la medición de ningún módulo.',
        en: 'Engineering is PARTIALLY_VERIFIED only for the parser and the IMU; that does not make any module’s measurement verified.',
      },
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC16_FAMILY, MC06],
    },
    {
      contentId: 'sense.overview.alarm',
      text: {
        es: 'La ficha no atribuye alarma certificada, conformidad ni compatibilidad universal.',
        en: 'The sheet attributes no certified alarm, conformity or universal compatibility.',
      },
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC02, MC11_NMEA],
    },
  ],
  capabilities: [
    {
      contentId: 'sense.cap.wind',
      label: { es: 'Viento aparente', en: 'Apparent wind' },
      description: {
        es: 'Velocidad y ángulo del viento aparente en el mástil; el viento real sólo con rumbo y velocidad válidos, si no, se indica no disponible.',
        en: 'Apparent wind speed and angle at the masthead; true wind only with valid heading and speed, otherwise shown as unavailable.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [SPEC, CALIBRATION],
    },
    {
      contentId: 'sense.cap.power',
      label: { es: 'Energía', en: 'Power' },
      description: {
        es: 'Tensión y corriente de carga o descarga del circuito vigilado, con potencia y contadores derivados. No es un sistema de gestión de baterías.',
        en: 'Voltage and charge or discharge current of the monitored circuit, with derived power and counters. It is not a battery-management system.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [SPEC],
    },
    {
      contentId: 'sense.cap.bilge',
      label: { es: 'Presencia de agua en sentina', en: 'Bilge water presence' },
      description: {
        es: 'Estado de presencia de agua mediante un contacto: seco, agua detectada, fallo o desconocido. No es un nivel continuo.',
        en: 'Water-presence state through a contact: dry, water detected, fault or unknown. It is not a continuous level.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [SPEC],
    },
    {
      contentId: 'sense.cap.tanks',
      label: { es: 'Contenido de tanques', en: 'Tank contents' },
      description: {
        es: 'Contenido de agua, combustible o aguas residuales a partir de un emisor compatible y la tabla del tanque. No es metrología legal.',
        en: 'Water, fuel or waste contents from a compatible sender and the tank table. It is not legal metrology.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [SPEC],
    },
    {
      contentId: 'sense.cap.environment',
      label: { es: 'Ambiente', en: 'Environment' },
      description: {
        es: 'Temperatura, humedad relativa y presión barométrica de un compartimento protegido. No es una previsión ni un detector de fuego o gas.',
        en: 'Temperature, relative humidity and barometric pressure in a protected compartment. It is not a forecast or a fire or gas detector.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [SPEC],
    },
    {
      contentId: 'sense.cap.calibration',
      label: { es: 'Calibración documentada', en: 'Documented calibration' },
      description: {
        es: 'Cada módulo tiene su procedimiento y su clase de referencia; la calibración deja un registro fechado con método, puntos y resultado.',
        en: 'Each module has its procedure and reference class; calibration leaves a dated record with method, points and result.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [CALIBRATION, SPEC],
    },
  ],
  composition: [
    {
      groupId: 'sense.comp.included',
      label: { es: 'Incluido', en: 'Included' },
      heading: { es: 'Incluido en la compra prevista', en: 'Included in the intended purchase' },
      items: [
        {
          contentId: 'sense.comp.included.module',
          text: {
            es: 'El módulo y el elemento sensor o la entrada de medición de esa referencia, con los elementos de montaje y conexión documentados.',
            en: 'The module and its sensing element or measurement input, with the documented mounting and connection items.',
          },
          evidenceClass: 'HYPOTHESIS',
          sourceRefs: [SPEC, COPY_ES],
        },
        {
          contentId: 'sense.comp.included.guide',
          text: {
            es: 'Guía de instalación, puesta en marcha y calibración con una plantilla de registro de calibración.',
            en: 'Installation, commissioning and calibration guide with a calibration record template.',
          },
          evidenceClass: 'HYPOTHESIS',
          sourceRefs: [SPEC, CALIBRATION],
        },
        {
          contentId: 'sense.comp.included.firmware',
          text: {
            es: 'Licencia de uso del firmware y de los servicios locales del módulo durante el periodo de soporte publicado.',
            en: 'Licence to use the module firmware and local services for the published support window.',
          },
          evidenceClass: 'HYPOTHESIS',
          sourceRefs: [SPEC],
        },
      ],
    },
    {
      groupId: 'sense.comp.excluded',
      label: { es: 'Excluido', en: 'Excluded' },
      heading: { es: 'Excluido de la compra', en: 'Excluded from the purchase' },
      items: [
        {
          contentId: 'sense.comp.excluded.ecosystem',
          text: {
            es: 'MAREA HUB, MAREA WATCH, MAREA DISPLAY y MAREA NAV.',
            en: 'MAREA HUB, MAREA WATCH, MAREA DISPLAY and MAREA NAV.',
          },
          evidenceClass: 'VERIFIED_REPO',
          sourceRefs: [SPEC, MC06],
        },
        {
          contentId: 'sense.comp.excluded.connectivity',
          text: {
            es: 'Conectividad, tarjeta SIM, servicio en la nube y avisos remotos.',
            en: 'Connectivity, a SIM card, a cloud service and remote alerts.',
          },
          evidenceClass: 'VERIFIED_REPO',
          sourceRefs: [SPEC, MC06],
        },
        {
          contentId: 'sense.comp.excluded.certified',
          text: {
            es: 'Una alarma certificada y el equipo reglamentario del barco.',
            en: 'A certified alarm and the vessel’s required equipment.',
          },
          evidenceClass: 'VERIFIED_REPO',
          sourceRefs: [SPEC, MC02],
        },
      ],
    },
    {
      groupId: 'sense.comp.licence',
      label: { es: 'Calibración y verificación', en: 'Calibration and verification' },
      heading: { es: 'Calibración y verificación', en: 'Calibration and verification' },
      items: [
        {
          contentId: 'sense.comp.licence.calibration',
          text: {
            es: 'Un módulo sin calibrar, con la calibración caducada o con la configuración cambiada no presenta su número como una medición fiable.',
            en: 'A module that is uncalibrated, has an overdue calibration or has changed configuration does not present its number as a reliable measurement.',
          },
          evidenceClass: 'VERIFIED_REPO',
          sourceRefs: [CALIBRATION, SPEC],
        },
        {
          contentId: 'sense.comp.licence.adapter',
          text: {
            es: 'Cuando un módulo consume datos de otro fabricante, se indica el origen externo y que MAREA no ha verificado esa medición.',
            en: 'When a module consumes another manufacturer’s data, the external source is identified and the reading is marked as not verified by MAREA.',
          },
          evidenceClass: 'OPEN',
          sourceRefs: [SPEC],
        },
      ],
    },
  ],
  interfaces: [
    {
      contentId: 'sense.int.hub',
      direction: { es: 'Salida', en: 'Output' },
      transport: { es: 'Interfaz local documentada del HUB', en: 'Documented HUB local interface' },
      status: { es: 'Previsto', en: 'Intended' },
      note: {
        es: 'El HUB no mide: recibe y publica lo que miden los módulos.',
        en: 'The HUB does not measure: it receives and publishes what the modules measure.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [SPEC, MC06],
    },
    {
      contentId: 'sense.int.nmea0183',
      direction: { es: 'Entrada', en: 'Input' },
      transport: { es: 'NMEA 0183 (modo adaptador)', en: 'NMEA 0183 (adapter mode)' },
      status: { es: 'Sólo donde la matriz lo indique', en: 'Only where the matrix says so' },
      note: {
        es: 'Leer sentencias no es conformidad con la norma NMEA 0183 ni una certificación.',
        en: 'Reading sentences is not conformity with the NMEA 0183 standard and is not certification.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [SPEC, MC11_NMEA],
    },
    {
      contentId: 'sense.int.nmea2000',
      direction: { es: 'Salida', en: 'Output' },
      transport: { es: 'NMEA 2000', en: 'NMEA 2000' },
      status: { es: 'No implementado', en: 'Not implemented' },
      note: {
        es: 'NMEA 2000 no está implementado ni certificado; no se anuncia compatibilidad operativa.',
        en: 'NMEA 2000 is not implemented or certified; no operational compatibility is announced.',
      },
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC06, MC11_NMEA],
    },
    {
      contentId: 'sense.int.signalk',
      direction: { es: 'Salida', en: 'Output' },
      transport: { es: 'Signal K', en: 'Signal K' },
      status: { es: 'Sólo con resultado probado', en: 'Only with a tested result' },
      note: {
        es: 'Se comprueba por fuente, versión, ruta y dirección, no como garantía general.',
        en: 'Checked per source, version, path and direction, not as a blanket guarantee.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [COMPAT, SPEC],
    },
  ],
  editions: [
    {
      editionId: 'SENSE-WIND',
      name: { es: 'SENSE Wind', en: 'SENSE Wind' },
      summary: {
        es: 'Módulo de viento aparente en el mástil; viento real sólo con rumbo y velocidad válidos. Requiere calibración de alineación y verificación de velocidad.',
        en: 'Apparent wind module at the masthead; true wind only with valid heading and speed. Requires alignment calibration and speed verification.',
      },
      note: {
        es: 'Dispositivo de hardware previsto. Sin precio aprobado.',
        en: 'Intended hardware device. No approved price.',
      },
      featureLabels: [LOCAL_MEASUREMENT, LOCAL_ALARM],
    },
    {
      editionId: 'SENSE-POWER',
      name: { es: 'SENSE Power', en: 'SENSE Power' },
      summary: {
        es: 'Tensión y corriente de carga o descarga del circuito vigilado, con potencia y contadores derivados.',
        en: 'Voltage and charge or discharge current of the monitored circuit, with derived power and counters.',
      },
      note: {
        es: 'Dispositivo de hardware previsto. Sin precio aprobado.',
        en: 'Intended hardware device. No approved price.',
      },
      featureLabels: [LOCAL_MEASUREMENT, LOCAL_ALARM],
    },
    {
      editionId: 'SENSE-BILGE',
      name: { es: 'SENSE Bilge', en: 'SENSE Bilge' },
      summary: {
        es: 'Presencia de agua en una sentina como estado, no como nivel continuo.',
        en: 'Water presence in a bilge compartment as a state, not as a continuous level.',
      },
      note: {
        es: 'Dispositivo de hardware previsto. Sin precio aprobado.',
        en: 'Intended hardware device. No approved price.',
      },
      featureLabels: [LOCAL_MEASUREMENT, LOCAL_ALARM],
    },
    {
      editionId: 'SENSE-TANKS',
      name: { es: 'SENSE Tanks', en: 'SENSE Tanks' },
      summary: {
        es: 'Contenido de un tanque a partir de un emisor compatible y de la tabla del tanque.',
        en: 'Tank contents from a compatible sender and the tank capacity table.',
      },
      note: {
        es: 'Dispositivo de hardware previsto. Sin precio aprobado.',
        en: 'Intended hardware device. No approved price.',
      },
      featureLabels: [LOCAL_MEASUREMENT, LOCAL_ALARM],
    },
    {
      editionId: 'SENSE-ENV',
      name: { es: 'SENSE Environment', en: 'SENSE Environment' },
      summary: {
        es: 'Temperatura, humedad relativa y presión barométrica de un compartimento protegido.',
        en: 'Temperature, relative humidity and barometric pressure in a protected compartment.',
      },
      note: {
        es: 'Dispositivo de hardware previsto. Sin precio aprobado.',
        en: 'Intended hardware device. No approved price.',
      },
      featureLabels: [LOCAL_MEASUREMENT, LOCAL_ALARM],
    },
    {
      editionId: 'SENSE-ESSENTIALS',
      name: { es: 'SENSE Essentials', en: 'SENSE Essentials' },
      summary: {
        es: 'Conjunto que reúne SENSE-POWER y SENSE-BILGE; es un empaquetado, no una capacidad nueva.',
        en: 'Set combining SENSE-POWER and SENSE-BILGE; it is packaging, not a new capability.',
      },
      note: {
        es: 'Kit de hardware previsto. Sin precio aprobado.',
        en: 'Intended hardware kit. No approved price.',
      },
      featureLabels: [LOCAL_MEASUREMENT, LOCAL_ALARM],
    },
    {
      editionId: 'SENSE-SAIL',
      name: { es: 'SENSE Sail', en: 'SENSE Sail' },
      summary: {
        es: 'Conjunto condicional que reúne SENSE-WIND y SENSE-ENV; pendiente de validar la medición de viento.',
        en: 'Conditional set combining SENSE-WIND and SENSE-ENV; pending wind measurement validation.',
      },
      note: {
        es: 'Condicional y no seleccionado por defecto. Sin precio aprobado.',
        en: 'Conditional and not selected by default. No approved price.',
      },
      featureLabels: [LOCAL_MEASUREMENT, LOCAL_ALARM],
    },
    {
      editionId: 'SENSE-SYSTEMS',
      name: { es: 'SENSE Systems', en: 'SENSE Systems' },
      summary: {
        es: 'Conjunto condicional que reúne SENSE-POWER, SENSE-BILGE, SENSE-TANKS y SENSE-ENV.',
        en: 'Conditional set combining SENSE-POWER, SENSE-BILGE, SENSE-TANKS and SENSE-ENV.',
      },
      note: {
        es: 'Condicional y no seleccionado por defecto. Sin precio aprobado.',
        en: 'Conditional and not selected by default. No approved price.',
      },
      featureLabels: [LOCAL_MEASUREMENT, LOCAL_ALARM],
    },
  ],
  editionNote: {
    es: 'Una edición es una identidad estable, no un SKU de comercio. No hay precio aprobado, stock verificado, código de SKU ni pedido disponible.',
    en: 'An edition is a stable identity, not a merchant SKU. There is no approved price, verified stock, SKU code or available order.',
  },
  limitations: [
    {
      contentId: 'sense.lim.accuracy',
      label: { es: 'Sin cifras de precisión', en: 'No accuracy figures' },
      description: {
        es: 'La exactitud de medición no está medida (NOT_MEASURED); no se anuncia ninguna cifra. El rango indicado es un objetivo previsto, no una especificación verificada.',
        en: 'Measurement accuracy has not been measured (NOT_MEASURED); no figure is announced. The stated range is an intended target, not a verified specification.',
      },
      kind: 'UNAVAILABLE',
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC06, CALIBRATION],
    },
    {
      contentId: 'sense.lim.ingress',
      label: { es: 'Estanqueidad no verificada', en: 'Ingress not verified' },
      description: {
        es: 'La ingesta o protección frente al agua y al polvo no está verificada (NOT_VERIFIED); no se anuncia ninguna clase de protección.',
        en: 'Ingress or water/dust protection is not verified (NOT_VERIFIED); no protection class is announced.',
      },
      kind: 'UNAVAILABLE',
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC06, MC16_FAMILY],
    },
    {
      contentId: 'sense.lim.nmea2000',
      label: { es: 'NMEA 2000 no implementado', en: 'NMEA 2000 not implemented' },
      description: {
        es: 'NMEA 2000 no está implementado ni certificado (NOT_IMPLEMENTED); no se anuncia compatibilidad operativa con ese estándar.',
        en: 'NMEA 2000 is not implemented or certified (NOT_IMPLEMENTED); no operational compatibility with that standard is announced.',
      },
      kind: 'UNAVAILABLE',
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC06, MC11_NMEA],
    },
    {
      contentId: 'sense.lim.connectivity',
      label: { es: 'Sin conectividad propia', en: 'No connectivity of its own' },
      description: {
        es: 'Ningún módulo envía datos a tierra ni genera avisos remotos; eso requiere MAREA WATCH, cobertura y suscripción.',
        en: 'No module sends data ashore or generates remote alerts; that requires MAREA WATCH, coverage and a subscription.',
      },
      kind: 'LIMITATION',
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC06, SPEC],
    },
    {
      contentId: 'sense.lim.alarm',
      label: {
        es: 'No es equipo reglamentario ni alarma certificada',
        en: 'Not required equipment or a certified alarm',
      },
      description: {
        es: 'No sustituye al equipo exigido a la embarcación ni a una alarma de sentina o de cualquier otro tipo.',
        en: 'It does not replace the vessel’s required equipment or any bilge or other alarm.',
      },
      kind: 'PROHIBITION',
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [SPEC, MC02],
    },
    {
      contentId: 'sense.lim.control',
      label: { es: 'Sin control de gobierno', en: 'No steering control' },
      description: {
        es: 'MAREA SENSE no gobierna el barco, no ofrece piloto automático y no publica comandos de control.',
        en: 'MAREA SENSE does not steer the boat, offers no autopilot and publishes no control commands.',
      },
      kind: 'PROHIBITION',
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [SPEC, MC06],
    },
    {
      contentId: 'sense.lim.commercial',
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
      bundleId: 'SAIL',
      note: {
        es: 'Composición canónica: SENSE-WIND es condicional en este paquete. No es comprable.',
        en: 'Canonical composition: SENSE-WIND is conditional in this bundle. It is not purchasable.',
      },
    },
    {
      bundleId: 'PROTECT',
      note: {
        es: 'Composición canónica: incluye SENSE-ESSENTIALS. El paquete no es comprable.',
        en: 'Canonical composition: includes SENSE-ESSENTIALS. The bundle is not purchasable.',
      },
    },
    {
      bundleId: 'COMPLETE',
      note: {
        es: 'Composición canónica: incluye varios módulos SENSE (POWER, BILGE, TANKS, ENV). El paquete no es comprable.',
        en: 'Canonical composition: includes several SENSE modules (POWER, BILGE, TANKS, ENV). The bundle is not purchasable.',
      },
    },
  ],
  documentation: [
    {
      documentId: 'sense.doc.spec',
      title: {
        es: 'Especificación comercial MAREA SENSE (MC-06)',
        en: 'MAREA SENSE commercial specification (MC-06)',
      },
      kind: 'SPECIFICATION',
      status: 'AVAILABLE',
      limitation: null,
      sourceRef: SPEC,
    },
    {
      documentId: 'sense.doc.calibration',
      title: {
        es: 'Plan de medición y calibración (SENSE)',
        en: 'SENSE measurement and calibration plan',
      },
      kind: 'CALIBRATION',
      status: 'AVAILABLE',
      limitation: {
        es: 'La exactitud no está medida: NOT_MEASURED.',
        en: 'Accuracy is not measured: NOT_MEASURED.',
      },
      sourceRef: CALIBRATION,
    },
    {
      documentId: 'sense.doc.compat',
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
      documentId: 'sense.doc.nmea',
      title: {
        es: 'Hoja de ruta de licencias y certificación NMEA (MC-11)',
        en: 'NMEA licensing and certification roadmap (MC-11)',
      },
      kind: 'CONFORMITY',
      status: 'AVAILABLE',
      limitation: {
        es: 'NMEA 2000 no está implementado ni certificado.',
        en: 'NMEA 2000 is not implemented or certified.',
      },
      sourceRef: MC11_NMEA,
    },
    {
      documentId: 'sense.doc.gates',
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
      es: 'Esta ficha es contenido interno. La marca MAREA no está adoptada, la limpieza legal no está concedida, la medición no está verificada y la disponibilidad comercial es NOT_FOR_SALE.',
      en: 'This sheet is internal content. The MAREA brand is not adopted, legal clearance is not granted, measurement is not verified and commercial availability is NOT_FOR_SALE.',
    },
    governance: [
      {
        contentId: 'sense.close.gates',
        text: {
          es: '13 puertas de publicación registradas y 0 cerradas; 42 afirmaciones catalogadas y 0 autorizadas públicamente.',
          en: '13 publication gates recorded and 0 closed; 42 claims catalogued and 0 publicly authorised.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC14_GATES, 'docs/marea/legal-commercial/data/claims-policy.json'],
      },
      {
        contentId: 'sense.close.commercial',
        text: {
          es: '0 precios aprobados, 0 ediciones comercializables, 0 SKU de comercio, 0 filas de stock y 0 filas de compatibilidad probadas.',
          en: '0 approved prices, 0 merchantable editions, 0 merchant SKUs, 0 stock rows and 0 tested compatibility rows.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC16_EDITIONS, MC16_FAMILY],
      },
      {
        contentId: 'sense.close.limits',
        text: {
          es: 'SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED y NMEA 2000 = NOT_IMPLEMENTED en los datos canónicos.',
          en: 'SENSE_MEASUREMENT_ACCURACY = NOT_MEASURED and NMEA 2000 = NOT_IMPLEMENTED in the canonical data.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC06, MC11_NMEA],
      },
    ],
    nextMilestone: {
      contentId: 'sense.close.next',
      text: {
        es: 'MC-21 cierra el lote 2 del catálogo interno. Ninguna medición se certifica ni se publica aquí.',
        en: 'MC-21 closes batch 2 of the internal catalogue. No measurement is certified or published here.',
      },
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: ['docs/marea/execution/MASTER-PROMPT-REGISTRY.md'],
    },
  },
};
