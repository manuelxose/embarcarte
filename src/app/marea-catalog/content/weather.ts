/**
 * MC-20/MC-21 internal catalogue — MAREA WEATHER (software data service) bilingual content.
 *
 * WEATHER is a probabilistic forecast/data service with NO contracted data
 * provider: no provider is named, no forecast-accuracy figure is claimed and no
 * service level (SLA) is announced. Every data-derived claim carries an evidence
 * class and its canonical source reference. Availability stays NOT_FOR_SALE and
 * publication INTERNAL_ONLY. No price, stock, SKU, quote or purchasable wording.
 */
import type { CatalogFamilyContent } from './content.types';

const MC07 = 'docs/marea/products/product-definitions.batch-03.json#products.WEATHER';
const SPEC = 'docs/marea/products/MAREA-WEATHER-COMMERCIAL-SPEC.md';
const DATA_RIGHTS = 'docs/marea/products/WEATHER-DATA-RIGHTS-AND-FORECAST-CONTRACT.md';
const MC16_FAMILY =
  'docs/marea/commerce-data/data/product-families.json#families[familyId=WEATHER]';
const MC16_EDITIONS =
  'docs/marea/commerce-data/data/product-editions.json#editions[familyId=WEATHER]';
const MC16_BUNDLES = 'docs/marea/commerce-data/data/bundle-compositions.json';
const MC15_ROUTE =
  'docs/marea/information-architecture/data/proposed-routes.json#items[routeId=mareaFamilyWeather]';
const MC14_GATES = 'docs/marea/legal-commercial/data/release-evidence-gates.json';
const MC02 = 'docs/marea/compliance/MC-02-BLOCKERS-AND-DECISIONS.md';
const EDITIONS = 'docs/marea/products/PRODUCT-EDITIONS-DISPLAY-WEATHER-FLEET.md';
const COPY_ES = 'docs/marea/products/copy/weather.es.md';
const COPY_EN = 'docs/marea/products/copy/weather.en.md';

export const WEATHER_CONTENT: CatalogFamilyContent = {
  familyId: 'WEATHER',
  hero: {
    kicker: {
      es: 'Catálogo interno · lote 2 · WEATHER',
      en: 'Internal catalogue · batch 2 · WEATHER',
    },
    heading: { es: 'MAREA WEATHER', en: 'MAREA WEATHER' },
    lead: {
      es: 'Servicio de previsión meteorológica y oceanográfica de la familia MAREA: viento, rachas, oleaje, corrientes, mareas y condiciones atmosféricas mostrados siempre con su fuente, su hora de validez y su antigüedad. Una previsión no es una garantía: la decisión de navegar sigue siendo del patrón.',
      en: 'The MAREA family weather and oceanographic forecast service: wind, gusts, waves, currents, tides and atmospheric conditions, always shown with their source, valid time and age. A forecast is not a guarantee: the decision to sail stays with the skipper.',
    },
    category: {
      es: 'Software · servicio de previsión previsto',
      en: 'Software · intended forecast service',
    },
    mandatoryNotice: {
      contentId: 'weather.hero.notice',
      text: {
        es: 'MAREA WEATHER no nombra ningún proveedor de datos contratado y no afirma exactitud de previsión ni nivel de servicio. No es un servicio oficial de avisos meteorológicos y no sustituye al criterio del patrón.',
        en: 'MAREA WEATHER names no contracted data provider and claims no forecast accuracy or service level. It is not an official meteorological warning service and does not replace the skipper’s judgement.',
      },
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC07, DATA_RIGHTS, MC16_FAMILY],
    },
    highlights: [
      {
        contentId: 'weather.hero.highlight.software',
        text: {
          es: 'Producto de software: no incluye hardware propio, instalación ni conectividad.',
          en: 'Software product: no hardware of its own, no installation and no connectivity included.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC16_FAMILY, MC07],
      },
      {
        contentId: 'weather.hero.highlight.provenance',
        text: {
          es: 'La procedencia no está contratada: se usa la expresión genérica «fuente externa no contratada» y no se nombra ningún proveedor.',
          en: 'Provenance is not contracted: the generic wording “external uncontracted source” is used and no provider is named.',
        },
        evidenceClass: 'BLOCKED',
        sourceRefs: [DATA_RIGHTS, MC02],
      },
      {
        contentId: 'weather.hero.highlight.accuracy',
        text: {
          es: 'Sin cifra de acierto, sin SLA y sin presentar una previsión caducada como actual.',
          en: 'No hit-rate figure, no SLA and no stale forecast presented as current.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC07, DATA_RIGHTS],
      },
      {
        contentId: 'weather.hero.highlight.editions',
        text: {
          es: 'Dos ediciones registradas (WEATHER-STANDARD, WEATHER-PRO). Una edición no es un SKU de comercio.',
          en: 'Two canonical editions (WEATHER-STANDARD, WEATHER-PRO). An edition is not a merchant SKU.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC16_EDITIONS, EDITIONS],
      },
    ],
  },
  sections: {
    overview: {
      kicker: { es: '01 · Visión general', en: '01 · Overview' },
      heading: { es: 'Qué es MAREA WEATHER', en: 'What MAREA WEATHER is' },
      lead: {
        es: 'Un producto de información meteorológica y oceanográfica definido para reunir previsión, oleaje, corrientes, mareas y condiciones atmosféricas con la procedencia y el tiempo de cada valor. No se presenta una fuente sin contrato como si estuviera disponible.',
        en: 'A weather and oceanographic information product defined to bring forecast, waves, currents, tides and atmospheric conditions together with the provenance and time of every value. A source without a contract is never presented as available.',
      },
    },
    capabilities: {
      kicker: { es: '02 · Capacidades', en: '02 · Capabilities' },
      heading: { es: 'Capacidades definidas', en: 'Defined capabilities' },
      lead: {
        es: 'Cada capacidad depende de un derecho de datos que hoy no está concedido. Una función cuyo derecho no existe se declara no disponible con su motivo, nunca se sustituye por un servicio no autorizado.',
        en: 'Each capability depends on a data right that is not granted today. A function whose right does not exist is declared unavailable with its reason; it is never replaced by an unauthorised service.',
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
        es: 'Qué incluye la suscripción prevista y qué queda fuera, declarado antes de cualquier contratación.',
        en: 'What the intended subscription includes and what it excludes, stated before any contracting.',
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
      contentId: 'weather.overview.data',
      text: {
        es: 'La cobertura depende de fuentes externas licenciadas que hoy no están contratadas: no se anuncia ninguna fuente como disponible para la venta.',
        en: 'Coverage depends on licensed external sources that are not contracted today: no source is announced as available for sale.',
      },
      evidenceClass: 'BLOCKED',
      sourceRefs: [DATA_RIGHTS, MC02],
    },
    {
      contentId: 'weather.overview.forecast',
      text: {
        es: 'Las previsiones son probabilísticas y pueden desviarse de las condiciones locales reales; no se afirma ningún porcentaje de acierto.',
        en: 'Forecasts are probabilistic and may differ from actual local conditions; no hit-rate percentage is claimed.',
      },
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [SPEC, COPY_ES, COPY_EN],
    },
    {
      contentId: 'weather.overview.warnings',
      text: {
        es: 'La ficha no atribuye aviso oficial, certificación, SLA ni superioridad frente a otra fuente.',
        en: 'The sheet attributes no official warning status, certification, SLA or superiority over another source.',
      },
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC07, MC16_FAMILY],
    },
  ],
  capabilities: [
    {
      contentId: 'weather.cap.wind',
      label: { es: 'Viento y rachas', en: 'Wind and gusts' },
      description: {
        es: 'Velocidad y dirección del viento con las rachas mostradas por separado, cada valor con fuente, hora y antigüedad.',
        en: 'Wind speed and direction with gusts shown separately, each value with source, time and age.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [SPEC, COPY_ES],
    },
    {
      contentId: 'weather.cap.waves',
      label: { es: 'Oleaje y mar de fondo', en: 'Waves and swell' },
      description: {
        es: 'Altura, dirección y período de las olas; el mar de fondo sólo cuando la fuente licenciada lo publica y, si no, se declara no disponible.',
        en: 'Wave height, direction and period; swell only where the licensed source publishes it, otherwise declared unavailable.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [SPEC, DATA_RIGHTS],
    },
    {
      contentId: 'weather.cap.tides',
      label: { es: 'Corrientes y mareas', en: 'Currents and tides' },
      description: {
        es: 'Corriente superficial y altura de marea con su fuente, datum y hora. No se presenta una tabla oficial de mareas sin un derecho escrito que lo permita.',
        en: 'Surface current and tide height with their source, datum and time. No official tide table is presented without a written right to do so.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [SPEC, DATA_RIGHTS],
    },
    {
      contentId: 'weather.cap.provenance',
      label: { es: 'Procedencia visible', en: 'Visible provenance' },
      description: {
        es: 'Cada valor lleva fuente, modelo, hora de la pasada, hora de validez, hora de recepción, antigüedad, unidad, método, licencia y limitaciones.',
        en: 'Every value carries source, model, model run time, valid time, receipt time, age, units, method, licence and limitations.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [SPEC, COPY_EN],
    },
    {
      contentId: 'weather.cap.freshness',
      label: { es: 'Frescura honesta', en: 'Honest freshness' },
      description: {
        es: 'Estados actual, envejeciendo, caducado, expirado, no disponible y fuera de cobertura, cada uno con su motivo; «sin datos» nunca se confunde con «todo normal».',
        en: 'Current, aging, stale, expired, unavailable and out-of-coverage states, each with its reason; “no data” is never mistaken for “all normal”.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [SPEC, COPY_ES],
    },
    {
      contentId: 'weather.cap.account',
      label: { es: 'Una cuenta, un derecho', en: 'One account, one entitlement' },
      description: {
        es: 'Una cuenta con el registro de derechos; el mismo acceso no se cobra dos veces entre WEATHER y la suscripción de navegación cuando la licencia lo permita.',
        en: 'One account with the entitlement record; the same access is never charged twice between WEATHER and the navigation subscription where the licence allows it.',
      },
      evidenceClass: 'HYPOTHESIS',
      sourceRefs: [MC07, EDITIONS],
    },
  ],
  composition: [
    {
      groupId: 'weather.comp.included',
      label: { es: 'Incluido', en: 'Included' },
      heading: {
        es: 'Incluido en la suscripción prevista',
        en: 'Included in the intended subscription',
      },
      items: [
        {
          contentId: 'weather.comp.included.access',
          text: {
            es: 'Acceso a la cobertura y al horizonte declarados de las fuentes licenciadas de la edición contratada.',
            en: 'Access to the declared coverage and horizon of the licensed sources of the purchased edition.',
          },
          evidenceClass: 'HYPOTHESIS',
          sourceRefs: [SPEC, COPY_ES],
        },
        {
          contentId: 'weather.comp.included.metadata',
          text: {
            es: 'Metadatos por variable: fuente, modelo, hora de la pasada, hora de validez, hora de recepción, antigüedad, unidad, método, licencia y limitaciones.',
            en: 'Per-variable metadata: source, model, model run time, valid time, receipt time, age, units, method, licence and limitations.',
          },
          evidenceClass: 'HYPOTHESIS',
          sourceRefs: [SPEC],
        },
        {
          contentId: 'weather.comp.included.provenance',
          text: {
            es: 'Identificación de la fuente, atribución y página de procedencia con todas las fuentes y sus licencias.',
            en: 'Source identification, attribution and a provenance page listing every source and its licence.',
          },
          evidenceClass: 'HYPOTHESIS',
          sourceRefs: [SPEC, DATA_RIGHTS],
        },
      ],
    },
    {
      groupId: 'weather.comp.excluded',
      label: { es: 'Excluido', en: 'Excluded' },
      heading: { es: 'Excluido de la suscripción', en: 'Excluded from the subscription' },
      items: [
        {
          contentId: 'weather.comp.excluded.charts',
          text: {
            es: 'Cartas náuticas, navegación, ejecución de rutas y bitácora, que pertenecen a MAREA NAV.',
            en: 'Nautical charts, navigation, route execution and logbook, which belong to MAREA NAV.',
          },
          evidenceClass: 'VERIFIED_REPO',
          sourceRefs: [SPEC, MC16_FAMILY],
        },
        {
          contentId: 'weather.comp.excluded.device',
          text: {
            es: 'El dispositivo y la conexión del cliente, y cualquier instalación o hardware.',
            en: 'The customer’s device and connection, and any installation or hardware.',
          },
          evidenceClass: 'VERIFIED_REPO',
          sourceRefs: [SPEC],
        },
        {
          contentId: 'weather.comp.excluded.rights',
          text: {
            es: 'Cualquier conjunto de datos cuya licencia no esté concedida, y los avisos oficiales como servicio oficial.',
            en: 'Any dataset whose licence is not granted, and official warnings as an official service.',
          },
          evidenceClass: 'VERIFIED_REPO',
          sourceRefs: [DATA_RIGHTS, SPEC],
        },
      ],
    },
    {
      groupId: 'weather.comp.licence',
      label: { es: 'Licencias', en: 'Licensing' },
      heading: { es: 'Licencias y procedencia', en: 'Licensing and provenance' },
      items: [
        {
          contentId: 'weather.comp.licence.ownership',
          text: {
            es: 'La suscripción no transfiere la propiedad de ningún conjunto de datos de terceros ni concede derechos de proveedor.',
            en: 'The subscription transfers no ownership of any third-party dataset and grants no provider right.',
          },
          evidenceClass: 'VERIFIED_REPO',
          sourceRefs: [MC07, DATA_RIGHTS],
        },
        {
          contentId: 'weather.comp.licence.separation',
          text: {
            es: 'Los derechos de datos se conceden por territorio y por cuenta; ningún derecho implícito se extiende a conjuntos no licenciados.',
            en: 'Data rights are granted per territory and per account; no implied right extends to unlicensed datasets.',
          },
          evidenceClass: 'BLOCKED',
          sourceRefs: [DATA_RIGHTS, MC02],
        },
      ],
    },
  ],
  interfaces: [
    {
      contentId: 'weather.int.forecast',
      direction: { es: 'Entrada', en: 'Input' },
      transport: {
        es: 'Fuente externa no contratada de previsión',
        en: 'External uncontracted forecast source',
      },
      status: { es: 'Derecho no concedido', en: 'Right not granted' },
      note: {
        es: 'No se nombra proveedor; la procedencia se declara genéricamente.',
        en: 'No provider is named; provenance is stated generically.',
      },
      evidenceClass: 'BLOCKED',
      sourceRefs: [DATA_RIGHTS, MC16_FAMILY],
    },
    {
      contentId: 'weather.int.tides',
      direction: { es: 'Entrada', en: 'Input' },
      transport: { es: 'Datos de marea licenciados', en: 'Licensed tide data' },
      status: { es: 'Derecho no resuelto', en: 'Right unresolved' },
      note: {
        es: 'La altura de marea no se presenta como tabla oficial sin un derecho escrito.',
        en: 'Tide height is not presented as an official table without a written right.',
      },
      evidenceClass: 'BLOCKED',
      sourceRefs: [DATA_RIGHTS, SPEC],
    },
    {
      contentId: 'weather.int.nav',
      direction: { es: 'Salida', en: 'Output' },
      transport: {
        es: 'Contexto de solo lectura a MAREA NAV',
        en: 'Read-only context to MAREA NAV',
      },
      status: { es: 'Integración prevista', en: 'Planned integration' },
      note: {
        es: 'MAREA WEATHER no incluye cartas, bitácora ni ejecución de la navegación.',
        en: 'MAREA WEATHER does not include charts, a logbook or navigation execution.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [SPEC, MC16_FAMILY],
    },
    {
      contentId: 'weather.int.offline',
      direction: { es: 'Salida', en: 'Output' },
      transport: { es: 'Presentación sin conexión', en: 'Offline presentation' },
      status: { es: 'Sólo con licencia', en: 'Only with a licence' },
      note: {
        es: 'Sin licencia de la fuente, el estado es no disponible y nunca una previsión congelada.',
        en: 'Without a source licence, the state is unavailable and never a frozen forecast.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [SPEC, DATA_RIGHTS],
    },
  ],
  editions: [
    {
      editionId: 'WEATHER-STANDARD',
      name: { es: 'WEATHER Standard', en: 'WEATHER Standard' },
      summary: {
        es: 'Edición de previsión con pantalla de inicio, zonas de navegación, localizaciones guardadas, viento, rachas, oleaje y condiciones atmosféricas dentro del límite del plan, con procedencia y frescura siempre incluidas.',
        en: 'Forecast edition with home screen, sailing areas, saved locations, wind, gusts, waves and atmospheric conditions within the plan limit, with provenance and freshness always included.',
      },
      note: {
        es: 'Suscripción de software prevista. Sin precio aprobado ni disponibilidad comercial.',
        en: 'Intended software subscription. No approved price and no commercial availability.',
      },
      featureLabels: [
        { featureKey: 'WEATHER_FORECAST', label: { es: 'Previsión', en: 'Forecast' } },
        { featureKey: 'WEATHER_LAYERS', label: { es: 'Capas', en: 'Layers' } },
      ],
    },
    {
      editionId: 'WEATHER-PRO',
      name: { es: 'WEATHER Pro', en: 'WEATHER Pro' },
      summary: {
        es: 'Segunda edición, condicional a los derechos de proveedor: comparación entre modelos, capas adicionales, contexto de ruta, planificación y ventanas orientativas, y notificaciones configurables con límites de entrega declarados.',
        en: 'Second edition, conditional on provider rights: model comparison, additional layers, route context, advisory planning and windows, and configurable notifications with declared delivery limits.',
      },
      note: {
        es: 'Condicional a derechos de proveedor. Sin precio aprobado ni disponibilidad comercial.',
        en: 'Conditional on provider rights. No approved price and no commercial availability.',
      },
      featureLabels: [
        { featureKey: 'WEATHER_FORECAST', label: { es: 'Previsión', en: 'Forecast' } },
        { featureKey: 'WEATHER_LAYERS', label: { es: 'Capas', en: 'Layers' } },
      ],
    },
  ],
  editionNote: {
    es: 'Una edición es una identidad estable, no un SKU de comercio. No hay precio aprobado, stock verificado, código de SKU ni pedido disponible; ninguna capacidad de Pro se vende si el derecho de proveedor correspondiente no existe.',
    en: 'An edition is a stable identity, not a merchant SKU. There is no approved price, verified stock, SKU code or available order; no Pro capability is sold if the corresponding provider right does not exist.',
  },
  limitations: [
    {
      contentId: 'weather.lim.forecast',
      label: { es: 'Previsiones, no garantías', en: 'Forecasts, not guarantees' },
      description: {
        es: 'Las previsiones son probabilísticas y pueden desviarse de las condiciones locales reales; no se afirma ningún porcentaje de acierto ni superioridad frente a otra fuente.',
        en: 'Forecasts are probabilistic and may differ from actual local conditions; no hit-rate percentage and no superiority over another source is claimed.',
      },
      kind: 'PROHIBITION',
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [SPEC, MC07],
    },
    {
      contentId: 'weather.lim.provider',
      label: { es: 'Sin proveedor contratado', en: 'No contracted provider' },
      description: {
        es: 'No hay derechos comerciales concedidos, por lo que no se nombra ningún proveedor ni se anuncia ninguna fuente como disponible.',
        en: 'No commercial rights are granted, so no provider is named and no source is announced as available.',
      },
      kind: 'UNAVAILABLE',
      evidenceClass: 'BLOCKED',
      sourceRefs: [DATA_RIGHTS, MC02],
    },
    {
      contentId: 'weather.lim.sla',
      label: { es: 'Sin nivel de servicio', en: 'No service level' },
      description: {
        es: 'No se anuncia ningún SLA ni cifra de disponibilidad; las cifras de un proveedor serían objetivos suyos, no promesas de MAREA.',
        en: 'No SLA and no availability figure is announced; a provider’s figures would be its own targets, not MAREA promises.',
      },
      kind: 'UNAVAILABLE',
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC07, SPEC],
    },
    {
      contentId: 'weather.lim.warnings',
      label: {
        es: 'No es un servicio oficial de avisos',
        en: 'Not an official warning service',
      },
      description: {
        es: 'No sustituye a los avisos meteorológicos oficiales ni a ninguna autoridad pública.',
        en: 'It does not replace official meteorological warnings or any public authority.',
      },
      kind: 'PROHIBITION',
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [SPEC, MC16_FAMILY],
    },
    {
      contentId: 'weather.lim.offline',
      label: { es: 'Sin conexión sólo con licencia', en: 'Offline only with a licence' },
      description: {
        es: 'La presentación sin conexión depende del permiso de cada fuente; sin él, el estado es no disponible y nunca una previsión congelada.',
        en: 'Offline presentation depends on each source’s permission; without it, the state is unavailable and never a frozen forecast.',
      },
      kind: 'LIMITATION',
      evidenceClass: 'OPEN',
      sourceRefs: [SPEC, DATA_RIGHTS],
    },
    {
      contentId: 'weather.lim.commercial',
      label: { es: 'Sin precio, stock, SKU ni pedido', en: 'No price, stock, SKU or order' },
      description: {
        es: 'No hay precio aprobado, stock verificado ni SKU de comercio; la compra no está disponible.',
        en: 'There is no approved price, verified stock or merchant SKU; purchase is not available.',
      },
      kind: 'UNAVAILABLE',
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC16_EDITIONS, MC14_GATES],
    },
    {
      contentId: 'weather.lim.skipper',
      label: { es: 'No sustituye al patrón', en: 'Does not replace the skipper' },
      description: {
        es: 'La decisión de salir, la vigilancia continuada y la responsabilidad de la navegación corresponden siempre al patrón.',
        en: 'The decision to leave, continuous watchkeeping and responsibility for navigation always rest with the skipper.',
      },
      kind: 'PROHIBITION',
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [SPEC, COPY_ES, COPY_EN],
    },
  ],
  bundleNotes: [
    {
      bundleId: 'START',
      note: {
        es: 'Composición canónica: WEATHER-STANDARD es opcional en este paquete. No es comprable.',
        en: 'Canonical composition: WEATHER-STANDARD is optional in this bundle. It is not purchasable.',
      },
    },
    {
      bundleId: 'CRUISE',
      note: {
        es: 'Composición canónica: WEATHER-STANDARD es opcional en este paquete. No es comprable.',
        en: 'Canonical composition: WEATHER-STANDARD is optional in this bundle. It is not purchasable.',
      },
    },
    {
      bundleId: 'COMPLETE',
      note: {
        es: 'Composición canónica: WEATHER-PRO es opcional en este paquete. No es comprable.',
        en: 'Canonical composition: WEATHER-PRO is optional in this bundle. It is not purchasable.',
      },
    },
  ],
  documentation: [
    {
      documentId: 'weather.doc.spec',
      title: {
        es: 'Especificación comercial MAREA WEATHER (MC-07)',
        en: 'MAREA WEATHER commercial specification (MC-07)',
      },
      kind: 'SPECIFICATION',
      status: 'AVAILABLE',
      limitation: null,
      sourceRef: SPEC,
    },
    {
      documentId: 'weather.doc.rights',
      title: {
        es: 'Contrato de derechos de datos y previsión (WEATHER)',
        en: 'Weather data rights and forecast contract',
      },
      kind: 'DATA_CONTRACT',
      status: 'AVAILABLE',
      limitation: {
        es: 'Derechos de proveedor NOT_GRANTED: no se nombra proveedor.',
        en: 'Provider rights NOT_GRANTED: no provider is named.',
      },
      sourceRef: DATA_RIGHTS,
    },
    {
      documentId: 'weather.doc.editions',
      title: {
        es: 'Autoridad de ediciones DISPLAY/WEATHER/FLEET',
        en: 'DISPLAY/WEATHER/FLEET edition authority',
      },
      kind: 'EDITIONS',
      status: 'AVAILABLE',
      limitation: {
        es: 'WEATHER-PRO condicional a derechos de proveedor.',
        en: 'WEATHER-PRO conditional on provider rights.',
      },
      sourceRef: EDITIONS,
    },
    {
      documentId: 'weather.doc.gates',
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
      documentId: 'weather.doc.routes',
      title: {
        es: 'Registro de rutas propuestas (MC-15)',
        en: 'Proposed route registry (MC-15)',
      },
      kind: 'ROUTE_REGISTRY',
      status: 'AVAILABLE',
      limitation: {
        es: 'La ruta marea/weather está propuesta internamente y no es desplegable.',
        en: 'The marea/weather route is internally proposed and not deployable.',
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
      es: 'Esta ficha es contenido interno. La marca MAREA no está adoptada, la limpieza legal no está concedida, los derechos de proveedor no están contratados y la disponibilidad comercial es NOT_FOR_SALE.',
      en: 'This sheet is internal content. The MAREA brand is not adopted, legal clearance is not granted, provider rights are not contracted and commercial availability is NOT_FOR_SALE.',
    },
    governance: [
      {
        contentId: 'weather.close.gates',
        text: {
          es: '13 puertas de publicación registradas y 0 cerradas; 42 afirmaciones catalogadas y 0 autorizadas públicamente.',
          en: '13 publication gates recorded and 0 closed; 42 claims catalogued and 0 publicly authorised.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC14_GATES, 'docs/marea/legal-commercial/data/claims-policy.json'],
      },
      {
        contentId: 'weather.close.commercial',
        text: {
          es: '0 precios aprobados, 0 ediciones comercializables, 0 SKU de comercio, 0 filas de stock y 0 filas de compatibilidad probadas.',
          en: '0 approved prices, 0 merchantable editions, 0 merchant SKUs, 0 stock rows and 0 tested compatibility rows.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC16_EDITIONS, MC16_FAMILY],
      },
      {
        contentId: 'weather.close.provenance',
        text: {
          es: 'WEATHER_PROVIDER_RIGHTS = NOT_GRANTED y WEATHER_FORECAST_EVALUATION = NOT_PERFORMED en los datos canónicos: no se nombra proveedor ni se afirma exactitud.',
          en: 'WEATHER_PROVIDER_RIGHTS = NOT_GRANTED and WEATHER_FORECAST_EVALUATION = NOT_PERFORMED in the canonical data: no provider is named and no accuracy is claimed.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC07, DATA_RIGHTS],
      },
    ],
    nextMilestone: {
      contentId: 'weather.close.next',
      text: {
        es: 'MC-21 cierra el lote 2 del catálogo interno. Ningún proveedor se contrata ni se publica aquí.',
        en: 'MC-21 closes batch 2 of the internal catalogue. No provider is contracted or published here.',
      },
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: ['docs/marea/execution/MASTER-PROMPT-REGISTRY.md'],
    },
  },
};
