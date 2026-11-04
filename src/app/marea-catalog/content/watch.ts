/**
 * MC-20/MC-21 internal catalogue — MAREA WATCH (hardware + service) bilingual content.
 *
 * WATCH is a hardware device plus a service subscription. Ingestion is
 * NOT_VERIFIED, connectivity/notification/identity are NOT_FOUND and the privacy
 * gate (GATE-PRIVACY-DPA-DPIA) is BLOCKED. No guaranteed alert delivery is
 * claimed and it is not a certified distress service. Availability NOT_FOR_SALE.
 */
import type { CatalogFamilyContent } from './content.types';

const MC06 = 'docs/marea/products/product-definitions.batch-02.json#products.WATCH';
const SPEC = 'docs/marea/products/MAREA-WATCH-COMMERCIAL-SPEC.md';
const ALERT_CONTRACT = 'docs/marea/products/WATCH-ALERT-DELIVERY-AND-PRIVACY-CONTRACT.md';
const MC16_FAMILY = 'docs/marea/commerce-data/data/product-families.json#families[familyId=WATCH]';
const MC16_EDITIONS =
  'docs/marea/commerce-data/data/product-editions.json#editions[familyId=WATCH]';
const MC16_BUNDLES = 'docs/marea/commerce-data/data/bundle-compositions.json';
const MC15_ROUTE =
  'docs/marea/information-architecture/data/proposed-routes.json#items[routeId=mareaFamilyWatch]';
const MC14_GATES = 'docs/marea/legal-commercial/data/release-evidence-gates.json';
const MC02 = 'docs/marea/compliance/MC-02-BLOCKERS-AND-DECISIONS.md';
const EDITIONS = 'docs/marea/products/PRODUCT-EDITIONS-PILOT-SENSE-WATCH.md';
const COPY_ES = 'docs/marea/products/copy/watch.es.md';
const COPY_EN = 'docs/marea/products/copy/watch.en.md';

const LOCAL_ALARM = {
  featureKey: 'WATCH_LOCAL_ALARM',
  label: { es: 'Alarma local', en: 'Local alarm' },
} as const;
const REMOTE_MONITORING = {
  featureKey: 'WATCH_REMOTE_MONITORING',
  label: { es: 'Monitorización remota', en: 'Remote monitoring' },
} as const;

export const WATCH_CONTENT: CatalogFamilyContent = {
  familyId: 'WATCH',
  hero: {
    kicker: {
      es: 'Catálogo interno · lote 2 · WATCH',
      en: 'Internal catalogue · batch 2 · WATCH',
    },
    heading: { es: 'MAREA WATCH', en: 'MAREA WATCH' },
    lead: {
      es: 'Monitorización remota del barco cuando queda desatendido: mide las entradas compatibles que declares, evalúa tus reglas y geocerca, y avisa a las personas que autorices. Es una ayuda condicional: depende de la alimentación, de la cobertura y del proveedor de notificaciones.',
      en: 'Remote monitoring for a vessel left unattended: it measures the compatible inputs you declare, evaluates your rules and geofence, and alerts the people you authorise. It is conditional awareness: it depends on power, network coverage and the notification provider.',
    },
    category: {
      es: 'Hardware + servicio · monitorización remota',
      en: 'Hardware + service · remote monitoring',
    },
    mandatoryNotice: {
      contentId: 'watch.hero.notice',
      text: {
        es: 'MAREA WATCH no garantiza la entrega de avisos y no es un servicio de socorro certificado. La ingesta no está verificada, la conectividad, la notificación y la identidad no están encontradas y la puerta de privacidad está bloqueada.',
        en: 'MAREA WATCH does not guarantee alert delivery and is not a certified distress service. Ingestion is not verified, connectivity, notification and identity are not found and the privacy gate is blocked.',
      },
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC06, ALERT_CONTRACT, MC16_FAMILY],
    },
    highlights: [
      {
        contentId: 'watch.hero.highlight.conditional',
        text: {
          es: 'Ayuda condicional: ningún aviso se promete como inmediato ni garantizado.',
          en: 'Conditional awareness: no alert is promised as immediate or guaranteed.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [ALERT_CONTRACT, MC06],
      },
      {
        contentId: 'watch.hero.highlight.ingestion',
        text: {
          es: 'Ingesta NOT_VERIFIED: no se afirma qué sensores quedan cubiertos sin un resultado probado.',
          en: 'Ingestion NOT_VERIFIED: no sensor coverage is asserted without a tested result.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC06, MC16_FAMILY],
      },
      {
        contentId: 'watch.hero.highlight.privacy',
        text: {
          es: 'GATE-PRIVACY-DPA-DPIA = BLOCKED: la posición no es pública por defecto y el acceso es revocable.',
          en: 'GATE-PRIVACY-DPA-DPIA = BLOCKED: position is not public by default and access is revocable.',
        },
        evidenceClass: 'BLOCKED',
        sourceRefs: [MC14_GATES, ALERT_CONTRACT],
      },
      {
        contentId: 'watch.hero.highlight.editions',
        text: {
          es: 'Dos ediciones registradas (WATCH-CORE, WATCH-PLUS). Una edición no es un SKU de comercio.',
          en: 'Two canonical editions (WATCH-CORE, WATCH-PLUS). An edition is not a merchant SKU.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC16_EDITIONS, EDITIONS],
      },
    ],
  },
  sections: {
    overview: {
      kicker: { es: '01 · Visión general', en: '01 · Overview' },
      heading: { es: 'Qué es MAREA WATCH', en: 'What MAREA WATCH is' },
      lead: {
        es: 'Un dispositivo físico, un software de cuenta y una suscripción de servicio, entendidos por separado. No es un servicio de socorro, no evita robos ni hundimientos y no permite gobernar la embarcación.',
        en: 'A physical device, account software and a service subscription, understood separately. It is not a distress service, does not prevent theft or sinking and does not allow remote steering of the vessel.',
      },
    },
    capabilities: {
      kicker: { es: '02 · Capacidades', en: '02 · Capabilities' },
      heading: { es: 'Capacidades definidas', en: 'Defined capabilities' },
      lead: {
        es: 'Las entradas monitorizadas se publican antes de la compra y se confirman en la instalación. Lo que no está en esa lista no se presenta como vigilado.',
        en: 'The monitored inputs are published before purchase and confirmed at installation. Anything outside that list is never presented as watched.',
      },
    },
    specifications: {
      kicker: { es: '03 · Especificaciones', en: '03 · Specifications' },
      heading: { es: 'Ficha técnica y preparación', en: 'Technical sheet and readiness' },
      lead: {
        es: 'Los estados se copian del registro canónico de MC-16. La ingeniería está NOT_VERIFIED y el hardware no está seleccionado.',
        en: 'Statuses are copied from the canonical MC-16 record. Engineering is NOT_VERIFIED and hardware is not selected.',
      },
    },
    composition: {
      kicker: { es: '04 · Composición', en: '04 · Composition' },
      heading: { es: 'Composición y paquete', en: 'Composition and package' },
      lead: {
        es: 'El dispositivo y la suscripción son compras distintas; ninguna incluye a la otra. Lo que queda fuera se declara antes de contratar.',
        en: 'The device and the subscription are separate purchases; neither includes the other. What is excluded is stated before contracting.',
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
      contentId: 'watch.overview.layers',
      text: {
        es: 'Tres capas separadas: dispositivo físico, software de cuenta y suscripción de servicio. Ninguna incluye a las otras.',
        en: 'Three separate layers: the physical device, the account software and the service subscription. None includes the others.',
      },
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [SPEC, MC06],
    },
    {
      contentId: 'watch.overview.conditional',
      text: {
        es: 'La entrega de un aviso depende de la alimentación, de la cobertura de red y del proveedor de notificaciones; no se afirma más de lo que se puede probar.',
        en: 'Alert delivery depends on power, network coverage and the notification provider; nothing beyond what can be proved is claimed.',
      },
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [ALERT_CONTRACT, SPEC],
    },
    {
      contentId: 'watch.overview.safety',
      text: {
        es: 'Es un requisito de diseño, no una función probada: la especificación exige que las funciones locales y de seguridad sean independientes de la suscripción, pero el servicio no está implementado ni probado.',
        en: 'This is a design requirement, not a tested behaviour: the specification requires local and safety-relevant functions to be independent of the subscription, but the service is not implemented or tested.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC06, SPEC],
    },
  ],
  capabilities: [
    {
      contentId: 'watch.cap.position',
      label: { es: 'Monitorización de posición', en: 'Position monitoring' },
      description: {
        es: 'Posición GNSS del dispositivo con calidad de fix y antigüedad; si se pierde la señal, la posición pasa a desconocida y la geocerca queda suspendida.',
        en: 'Device GNSS position with fix quality and age; if the signal is lost, position becomes unknown and the geofence is suspended.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [SPEC, COPY_ES],
    },
    {
      contentId: 'watch.cap.inputs',
      label: { es: 'Entradas compatibles', en: 'Compatible inputs' },
      description: {
        es: 'Batería, sentina y temperatura cuando existe una entrada compatible; cada entrada declara unidades, rango previsto y requisitos de instalación.',
        en: 'Battery, bilge and temperature where a compatible input exists; each input states units, intended range and installation requirements.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [SPEC],
    },
    {
      contentId: 'watch.cap.geofence',
      label: { es: 'Geocerca y reglas', en: 'Geofence and rules' },
      description: {
        es: 'Zonas definidas por el propietario con histéresis para evitar avisos en cadena; si la posición no es válida, no se afirma que el barco esté dentro.',
        en: 'Owner-defined zones with hysteresis to avoid alert chains; when position is invalid, it is not asserted that the vessel is inside.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [SPEC],
    },
    {
      contentId: 'watch.cap.traceability',
      label: { es: 'Avisos con trazabilidad', en: 'Alerts with an evidence trail' },
      description: {
        es: 'Distingue «aceptado por el proveedor», «entregado» y «confirmado por una persona»; nunca afirma que alguien ha visto un aviso entregado.',
        en: 'Distinguishes “accepted by the provider”, “delivered” and “confirmed by a person”; it never claims that a delivered alert has been seen.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [ALERT_CONTRACT, SPEC],
    },
    {
      contentId: 'watch.cap.gaps',
      label: { es: 'Huecos de conexión visibles', en: 'Visible connectivity gaps' },
      description: {
        es: 'Muestra desde cuándo no hay contacto y el último valor conocido con su antigüedad; «sin datos» es un estado visible, no un semáforo verde.',
        en: 'Shows how long there has been no contact and the last-known-good value with its age; “no data” is a visible state, not a green light.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [SPEC, COPY_EN],
    },
    {
      contentId: 'watch.cap.roles',
      label: { es: 'Permisos por rol', en: 'Role-based permissions' },
      description: {
        es: 'El propietario invita por rol y puede revocar el acceso en cualquier momento; la posición no es pública por defecto.',
        en: 'The owner invites by role and can revoke access at any time; position is not public by default.',
      },
      evidenceClass: 'HYPOTHESIS',
      sourceRefs: [SPEC, ALERT_CONTRACT],
    },
  ],
  composition: [
    {
      groupId: 'watch.comp.included',
      label: { es: 'Incluido', en: 'Included' },
      heading: { es: 'Incluido en la compra prevista', en: 'Included in the intended purchase' },
      items: [
        {
          contentId: 'watch.comp.included.device',
          text: {
            es: 'El dispositivo MAREA WATCH con sus elementos de montaje y alimentación según la configuración comprada.',
            en: 'The MAREA WATCH device with its mounting and power items for the purchased configuration.',
          },
          evidenceClass: 'HYPOTHESIS',
          sourceRefs: [SPEC, COPY_ES],
        },
        {
          contentId: 'watch.comp.included.identity',
          text: {
            es: 'La identidad del dispositivo y el proceso de puesta en marcha para vincularlo a una embarcación y a una cuenta.',
            en: 'The device identity and the onboarding process to bind it to a vessel and an account.',
          },
          evidenceClass: 'HYPOTHESIS',
          sourceRefs: [SPEC],
        },
        {
          contentId: 'watch.comp.included.subscription',
          text: {
            es: 'La suscripción de servicio de la edición comprada, con las condiciones que se publicarán antes de la venta.',
            en: 'The service subscription of the purchased edition, under terms to be published before sale.',
          },
          evidenceClass: 'HYPOTHESIS',
          sourceRefs: [SPEC, EDITIONS],
        },
      ],
    },
    {
      groupId: 'watch.comp.excluded',
      label: { es: 'Excluido', en: 'Excluded' },
      heading: { es: 'Excluido de la compra', en: 'Excluded from the purchase' },
      items: [
        {
          contentId: 'watch.comp.excluded.coverage',
          text: {
            es: 'Cobertura móvil más allá del servicio de conectividad contratado; no se promete cobertura ilimitada ni mundial.',
            en: 'Mobile coverage beyond the contracted connectivity service; no unlimited or worldwide coverage is promised.',
          },
          evidenceClass: 'VERIFIED_REPO',
          sourceRefs: [SPEC],
        },
        {
          contentId: 'watch.comp.excluded.distress',
          text: {
            es: 'Un servicio de socorro, rescate, seguridad o prevención de robos.',
            en: 'A distress, rescue, security or theft-prevention service.',
          },
          evidenceClass: 'VERIFIED_REPO',
          sourceRefs: [SPEC, MC06],
        },
        {
          contentId: 'watch.comp.excluded.control',
          text: {
            es: 'Cualquier forma de gobierno o mando remoto de la embarcación.',
            en: 'Any form of remote steering or command of the vessel.',
          },
          evidenceClass: 'VERIFIED_REPO',
          sourceRefs: [SPEC, MC06],
        },
      ],
    },
    {
      groupId: 'watch.comp.licence',
      label: { es: 'Privacidad y suscripción', en: 'Privacy and subscription' },
      heading: { es: 'Privacidad y suscripción', en: 'Privacy and subscription' },
      items: [
        {
          contentId: 'watch.comp.licence.privacy',
          text: {
            es: 'Minimización de los datos que salen del barco, consentimiento, registro de accesos y revocación inmediata.',
            en: 'Minimisation of the data that leaves the vessel, consent, access logging and immediate revocation.',
          },
          evidenceClass: 'BLOCKED',
          sourceRefs: [ALERT_CONTRACT, MC14_GATES],
        },
        {
          contentId: 'watch.comp.licence.local',
          text: {
            es: 'Requisito de diseño, no un comportamiento probado: la especificación exige que la monitorización local, los avisos locales y el registro local sigan funcionando sin suscripción activa, pero no está implementado ni probado.',
            en: 'Design requirement, not a tested behaviour: the specification requires local monitoring, local alerts and local buffering to keep working without an active subscription, but this is not implemented or tested.',
          },
          evidenceClass: 'OPEN',
          sourceRefs: [MC06, SPEC],
        },
      ],
    },
  ],
  interfaces: [
    {
      contentId: 'watch.int.gnss',
      direction: { es: 'Entrada', en: 'Input' },
      transport: { es: 'Posición GNSS del dispositivo', en: 'Device GNSS position' },
      status: { es: 'Previsto', en: 'Intended' },
      note: {
        es: 'Sin señal, la posición pasa a desconocida y no se inventa.',
        en: 'Without a signal, position becomes unknown and is not invented.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [SPEC],
    },
    {
      contentId: 'watch.int.sense',
      direction: { es: 'Entrada', en: 'Input' },
      transport: { es: 'Entradas MAREA SENSE compatibles', en: 'Compatible MAREA SENSE inputs' },
      status: { es: 'Sólo si la matriz lo confirma', en: 'Only where the matrix confirms' },
      note: {
        es: 'SENSE no aporta conectividad ni envío remoto por sí mismo.',
        en: 'SENSE provides no connectivity or remote delivery by itself.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [SPEC, MC06],
    },
    {
      contentId: 'watch.int.uplink',
      direction: { es: 'Salida', en: 'Output' },
      transport: {
        es: 'Servicio de conectividad contratado',
        en: 'Contracted connectivity service',
      },
      status: { es: 'No encontrado', en: 'Not found' },
      note: {
        es: 'El servicio de conectividad no existe todavía: NOT_FOUND.',
        en: 'The connectivity service does not exist yet: NOT_FOUND.',
      },
      evidenceClass: 'BLOCKED',
      sourceRefs: [MC06, SPEC],
    },
    {
      contentId: 'watch.int.notification',
      direction: { es: 'Salida', en: 'Output' },
      transport: { es: 'Proveedor de notificaciones', en: 'Notification provider' },
      status: { es: 'No encontrado', en: 'Not found' },
      note: {
        es: 'La entrega depende del proveedor y no está garantizada: NOT_FOUND.',
        en: 'Delivery depends on the provider and is not guaranteed: NOT_FOUND.',
      },
      evidenceClass: 'BLOCKED',
      sourceRefs: [ALERT_CONTRACT, MC06],
    },
  ],
  editions: [
    {
      editionId: 'WATCH-CORE',
      name: { es: 'WATCH Core', en: 'WATCH Core' },
      summary: {
        es: 'Edición de monitorización esencial: posición, batería/estado DC, sentina, temperatura y estado de conexión, geocerca y el conjunto esencial de avisos, con trazabilidad y revocación de accesos.',
        en: 'Essential monitoring edition: position, battery/DC state, bilge, temperature and connection status, geofence and the essential alert set, with an evidence trail and access revocation.',
      },
      note: {
        es: 'Dispositivo y suscripción previstos. Sin precio aprobado ni disponibilidad comercial.',
        en: 'Intended device and subscription. No approved price and no commercial availability.',
      },
      featureLabels: [LOCAL_ALARM, REMOTE_MONITORING],
    },
    {
      editionId: 'WATCH-PLUS',
      name: { es: 'WATCH Plus', en: 'WATCH Plus' },
      summary: {
        es: 'Edición condicional: entradas monitorizadas adicionales y reglas configurables compuestas; sus ventajas diferenciales deben validarse y costearse antes de presentarse como definitivas.',
        en: 'Conditional edition: additional monitored inputs and composite configurable rules; its differentiating benefits must be validated and costed before being presented as final.',
      },
      note: {
        es: 'Condicional y no seleccionada por defecto. Sin precio aprobado ni disponibilidad comercial.',
        en: 'Conditional and not selected by default. No approved price and no commercial availability.',
      },
      featureLabels: [LOCAL_ALARM, REMOTE_MONITORING],
    },
  ],
  editionNote: {
    es: 'Una edición es una identidad estable, no un SKU de comercio. No hay precio aprobado, stock verificado, código de SKU ni pedido disponible.',
    en: 'An edition is a stable identity, not a merchant SKU. There is no approved price, verified stock, SKU code or available order.',
  },
  limitations: [
    {
      contentId: 'watch.lim.delivery',
      label: { es: 'Avisos no garantizados', en: 'Alerts not guaranteed' },
      description: {
        es: 'La entrega depende de la alimentación, de la cobertura y del proveedor de notificaciones; la ingesta no está verificada (NOT_VERIFIED) y no se garantiza la recepción inmediata.',
        en: 'Delivery depends on power, coverage and the notification provider; ingestion is not verified (NOT_VERIFIED) and immediate receipt is not guaranteed.',
      },
      kind: 'LIMITATION',
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [ALERT_CONTRACT, MC06],
    },
    {
      contentId: 'watch.lim.notfound',
      label: {
        es: 'Conectividad, notificación e identidad no encontradas',
        en: 'Connectivity, notification and identity not found',
      },
      description: {
        es: 'El servicio de conectividad, el de notificaciones y el registro de identidad del dispositivo no existen todavía (NOT_FOUND).',
        en: 'The connectivity service, the notification service and the device identity registry do not exist yet (NOT_FOUND).',
      },
      kind: 'UNAVAILABLE',
      evidenceClass: 'BLOCKED',
      sourceRefs: [MC06, SPEC],
    },
    {
      contentId: 'watch.lim.privacy',
      label: { es: 'Privacidad no autorizada', en: 'Privacy not authorised' },
      description: {
        es: 'GATE-PRIVACY-DPA-DPIA = BLOCKED: no hay base jurídica confirmada ni evaluación de impacto aprobada por el responsable de protección de datos.',
        en: 'GATE-PRIVACY-DPA-DPIA = BLOCKED: there is no confirmed lawful basis and no approved impact assessment by the data protection officer.',
      },
      kind: 'UNAVAILABLE',
      evidenceClass: 'BLOCKED',
      sourceRefs: [MC14_GATES, ALERT_CONTRACT],
    },
    {
      contentId: 'watch.lim.distress',
      label: { es: 'No es un servicio de socorro', en: 'Not a distress service' },
      description: {
        es: 'No es un servicio de socorro, rescate, SOLAS o GMDSS y no evita robos, abordajes ni hundimientos.',
        en: 'It is not a distress, rescue, SOLAS or GMDSS service and does not prevent theft, collision or sinking.',
      },
      kind: 'PROHIBITION',
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [SPEC, MC06],
    },
    {
      contentId: 'watch.lim.control',
      label: { es: 'Sin control remoto', en: 'No remote control' },
      description: {
        es: 'No existe ninguna ruta de mando de gobierno, timón, rumbo o motor desde MAREA WATCH.',
        en: 'No steering, rudder, heading or engine command path exists from MAREA WATCH.',
      },
      kind: 'PROHIBITION',
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [SPEC, MC06],
    },
    {
      contentId: 'watch.lim.connectivity',
      label: { es: 'Conectividad no garantizada', en: 'Connectivity not guaranteed' },
      description: {
        es: 'No se promete cobertura ilimitada ni mundial; la cobertura depende del servicio contratado, que aún no existe.',
        en: 'No unlimited or worldwide coverage is promised; coverage depends on the contracted service, which does not exist yet.',
      },
      kind: 'LIMITATION',
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [SPEC],
    },
    {
      contentId: 'watch.lim.commercial',
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
      bundleId: 'PROTECT',
      note: {
        es: 'Composición canónica: incluye WATCH-CORE. El paquete no es comprable.',
        en: 'Canonical composition: includes WATCH-CORE. The bundle is not purchasable.',
      },
    },
    {
      bundleId: 'COMPLETE',
      note: {
        es: 'Composición canónica: incluye WATCH-CORE. El paquete no es comprable.',
        en: 'Canonical composition: includes WATCH-CORE. The bundle is not purchasable.',
      },
    },
    {
      bundleId: 'FLEET',
      note: {
        es: 'Composición canónica: WATCH-CORE es opcional en el paquete de flota. No es comprable.',
        en: 'Canonical composition: WATCH-CORE is optional in the fleet package. It is not purchasable.',
      },
    },
  ],
  documentation: [
    {
      documentId: 'watch.doc.spec',
      title: {
        es: 'Especificación comercial MAREA WATCH (MC-06)',
        en: 'MAREA WATCH commercial specification (MC-06)',
      },
      kind: 'SPECIFICATION',
      status: 'AVAILABLE',
      limitation: null,
      sourceRef: SPEC,
    },
    {
      documentId: 'watch.doc.alert',
      title: {
        es: 'Contrato de entrega de avisos y privacidad (WATCH)',
        en: 'WATCH alert delivery and privacy contract',
      },
      kind: 'DATA_CONTRACT',
      status: 'AVAILABLE',
      limitation: {
        es: 'Sin garantía de entrega; privacidad BLOCKED.',
        en: 'No delivery guarantee; privacy BLOCKED.',
      },
      sourceRef: ALERT_CONTRACT,
    },
    {
      documentId: 'watch.doc.editions',
      title: {
        es: 'Autoridad de ediciones PILOT/SENSE/WATCH',
        en: 'PILOT/SENSE/WATCH edition authority',
      },
      kind: 'EDITIONS',
      status: 'AVAILABLE',
      limitation: {
        es: 'WATCH-PLUS condicional a validación y coste.',
        en: 'WATCH-PLUS conditional on validation and cost.',
      },
      sourceRef: EDITIONS,
    },
    {
      documentId: 'watch.doc.gates',
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
      documentId: 'watch.doc.routes',
      title: {
        es: 'Registro de rutas propuestas (MC-15)',
        en: 'Proposed route registry (MC-15)',
      },
      kind: 'ROUTE_REGISTRY',
      status: 'AVAILABLE',
      limitation: {
        es: 'La ruta marea/watch está propuesta internamente y no es desplegable.',
        en: 'The marea/watch route is internally proposed and not deployable.',
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
      es: 'Esta ficha es contenido interno. La marca MAREA no está adoptada, la limpieza legal no está concedida, la entrega de avisos no está garantizada y la disponibilidad comercial es NOT_FOR_SALE.',
      en: 'This sheet is internal content. The MAREA brand is not adopted, legal clearance is not granted, alert delivery is not guaranteed and commercial availability is NOT_FOR_SALE.',
    },
    governance: [
      {
        contentId: 'watch.close.gates',
        text: {
          es: '13 puertas de publicación registradas y 0 cerradas; 42 afirmaciones catalogadas y 0 autorizadas públicamente.',
          en: '13 publication gates recorded and 0 closed; 42 claims catalogued and 0 publicly authorised.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC14_GATES, 'docs/marea/legal-commercial/data/claims-policy.json'],
      },
      {
        contentId: 'watch.close.commercial',
        text: {
          es: '0 precios aprobados, 0 ediciones comercializables, 0 SKU de comercio, 0 filas de stock y 0 filas de compatibilidad probadas.',
          en: '0 approved prices, 0 merchantable editions, 0 merchant SKUs, 0 stock rows and 0 tested compatibility rows.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC16_EDITIONS, MC16_FAMILY],
      },
      {
        contentId: 'watch.close.privacy',
        text: {
          es: 'GATE-PRIVACY-DPA-DPIA = BLOCKED: sin formulario, sin captación de contactos y sin almacenamiento de datos personales.',
          en: 'GATE-PRIVACY-DPA-DPIA = BLOCKED: no form, no lead capture and no personal-data storage.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC14_GATES],
      },
    ],
    nextMilestone: {
      contentId: 'watch.close.next',
      text: {
        es: 'MC-21 cierra el lote 2 del catálogo interno. Ningún aviso se garantiza ni se publica aquí.',
        en: 'MC-21 closes batch 2 of the internal catalogue. No alert is guaranteed or published here.',
      },
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: ['docs/marea/execution/MASTER-PROMPT-REGISTRY.md'],
    },
  },
};
