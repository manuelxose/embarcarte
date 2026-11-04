/**
 * MC-20 internal catalogue — MAREA AIS (receive-only receiver) bilingual content.
 *
 * The receive-only framing is mandatory and appears in the hero, in the
 * capability list, in the limitations and in the closing. No transmission,
 * transponder, DSC, collision-avoidance, navigation, range or certification
 * claim is made anywhere. The unresolved GPL-3.0 decoder licence (DEC-04) is
 * declared instead of hidden.
 */
import type { CatalogFamilyContent } from './content.types';

const MC05 = 'docs/marea/products/product-definitions.batch-01.json#products.AIS';
const MC05_SPEC = 'docs/marea/products/MAREA-AIS-COMMERCIAL-SPEC.md';
const MC16_FAMILY = 'docs/marea/commerce-data/data/product-families.json#families[familyId=AIS]';
const MC16_EDITIONS = 'docs/marea/commerce-data/data/product-editions.json#editions[familyId=AIS]';
const MC15_ROUTE =
  'docs/marea/information-architecture/data/proposed-routes.json#items[routeId=mareaFamilyAis]';
const MC14_GATES = 'docs/marea/legal-commercial/data/release-evidence-gates.json';
const MC02 = 'docs/marea/compliance/MC-02-BLOCKERS-AND-DECISIONS.md';
const MC11_BOUNDARIES = 'docs/marea/hardware/architecture/MC11-AIS-DISPLAY-PILOT-BOUNDARIES.md';
const MC11_PROTOCOL =
  'docs/marea/hardware/architecture/MC11-PROTOCOL-AND-COMPATIBILITY-ASSESSMENT.md';
const MC11_NMEA = 'docs/marea/hardware/conformity/MC11-NMEA-LICENSING-AND-CERTIFICATION-ROADMAP.md';

export const AIS_CONTENT: CatalogFamilyContent = {
  familyId: 'AIS',
  hero: {
    kicker: { es: 'Catálogo interno · lote 1 · AIS', en: 'Internal catalogue · batch 1 · AIS' },
    heading: { es: 'MAREA AIS', en: 'MAREA AIS' },
    lead: {
      es: 'Receptor AIS de solo recepción: escucha las emisiones VHF AIS y pone el tráfico recibido a disposición de sistemas compatibles a bordo.',
      en: 'Receive-only AIS receiver: it listens to AIS VHF broadcasts and makes received vessel traffic available to compatible on-board systems.',
    },
    category: {
      es: 'Hardware · receptor de solo recepción',
      en: 'Hardware · receive-only receiver',
    },
    mandatoryNotice: {
      contentId: 'ais.hero.notice',
      text: {
        es: 'MAREA AIS es de SOLO RECEPCIÓN. No es un transpondedor, no transmite la identidad ni la posición del barco, no es un dispositivo DSC, no es un sistema anticolisión y no es un sistema de navegación.',
        en: 'MAREA AIS is RECEIVE-ONLY. It is not a transponder, it does not transmit the vessel’s identity or position, it is not a DSC device, it is not a collision-avoidance system and it is not a navigation system.',
      },
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC05, MC11_BOUNDARIES],
    },
    highlights: [
      {
        contentId: 'ais.hero.highlight.receiveonly',
        text: {
          es: 'Solo recepción: AIS_TRANSMISSION_OFFERED = false en los datos canónicos.',
          en: 'Receive-only: AIS_TRANSMISSION_OFFERED = false in the canonical data.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC05, MC16_FAMILY],
      },
      {
        contentId: 'ais.hero.highlight.antenna',
        text: {
          es: 'La antena VHF AIS, el divisor, el coaxial de mástil y la instalación no están incluidos.',
          en: 'The AIS VHF antenna, splitter, mast coax and installation are not included.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC05],
      },
      {
        contentId: 'ais.hero.highlight.licence',
        text: {
          es: 'La licencia del decodificador externo GPL-3.0 sigue sin resolver (DEC-04): no se puede distribuir hasta que se decida.',
          en: 'The external GPL-3.0 decoder licence remains unresolved (DEC-04): it cannot be distributed until decided.',
        },
        evidenceClass: 'BLOCKED',
        sourceRefs: [MC05, MC02],
      },
      {
        contentId: 'ais.hero.highlight.cpa',
        text: {
          es: 'CPA/TCPA sólo se muestra cuando existen los datos propios y una ruta de cálculo validada; si no, se declara no disponible.',
          en: 'CPA/TCPA is shown only when own-vessel inputs and a validated computation path exist; otherwise it is declared unavailable.',
        },
        evidenceClass: 'OPEN',
        sourceRefs: [MC05, MC11_BOUNDARIES],
      },
    ],
  },
  sections: {
    overview: {
      kicker: { es: '01 · Visión general', en: '01 · Overview' },
      heading: { es: 'Qué es MAREA AIS', en: 'What MAREA AIS is' },
      lead: {
        es: 'Una línea de hardware de receptor que escucha AIS VHF y publica el tráfico recibido. No transmite, no identifica al barco y no sustituye a ningún equipo de seguridad o navegación.',
        en: 'A receiver hardware line that listens to AIS VHF and publishes received traffic. It does not transmit, it does not identify the vessel and it replaces no safety or navigation equipment.',
      },
    },
    capabilities: {
      kicker: { es: '02 · Capacidades', en: '02 · Capabilities' },
      heading: { es: 'Capacidades definidas', en: 'Defined capabilities' },
      lead: {
        es: 'Capacidades de recepción, decodificación y publicación. Ninguna capacidad de transmisión existe en este producto.',
        en: 'Reception, decoding and publication capabilities. No transmission capability exists in this product.',
      },
    },
    specifications: {
      kicker: { es: '03 · Especificaciones', en: '03 · Specifications' },
      heading: { es: 'Ficha técnica y preparación', en: 'Technical sheet and readiness' },
      lead: {
        es: 'Los estados se copian del registro canónico de MC-16. Esta página no declara certificación, conformidad ni rendimiento de recepción.',
        en: 'Statuses are copied from the canonical MC-16 record. This page claims no certification, conformity or reception performance.',
      },
    },
    composition: {
      kicker: { es: '04 · Composición', en: '04 · Composition' },
      heading: { es: 'Composición y paquete', en: 'Composition and package' },
      lead: {
        es: 'Ninguna edición incluye antena AIS VHF, divisor, coaxial de mástil, instalación profesional, MAREA NAV ni MAREA HUB.',
        en: 'Neither edition includes an AIS VHF antenna, splitter, mast coax, professional installation, MAREA NAV or MAREA HUB.',
      },
    },
    editions: {
      kicker: { es: '05 · Ediciones', en: '05 · Editions' },
      heading: { es: 'Ediciones definidas', en: 'Defined editions' },
      lead: {
        es: 'Dos ediciones registradas. La edición Connected es condicional y no se selecciona por defecto; no se publica ninguna hipótesis de precio.',
        en: 'Two canonical editions. The Connected edition is conditional and not selected by default; no price hypothesis is published.',
      },
    },
    limitations: {
      kicker: { es: '06 · Limitaciones', en: '06 · Limitations' },
      heading: {
        es: 'Limitaciones y prohibiciones de uso',
        en: 'Limitations and use prohibitions',
      },
      lead: {
        es: 'El carácter de solo recepción y la ausencia de función anticolisión o de navegación se declaran aquí y en la cabecera, no sólo al pie.',
        en: 'The receive-only nature and the absence of collision-avoidance or navigation function are stated here and in the hero, not only in the footer.',
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
      contentId: 'ais.overview.receiveonly',
      text: {
        es: 'El producto escucha y decodifica emisiones AIS; no transmite y no puede sustituir a un transpondedor.',
        en: 'The product listens to and decodes AIS broadcasts; it does not transmit and cannot replace a transponder.',
      },
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC05, MC11_BOUNDARIES],
    },
    {
      contentId: 'ais.overview.consumers',
      text: {
        es: 'MAREA NAV es la superficie de visualización prevista y MAREA HUB el agregador local previsto; ambos son objetos separados.',
        en: 'MAREA NAV is the intended visualisation surface and MAREA HUB the intended local aggregator; both are separate objects.',
      },
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC05],
    },
    {
      contentId: 'ais.overview.licence',
      text: {
        es: 'El decodificador externo GPL-3.0 no puede distribuirse hasta que se decida la opción de cumplimiento (DEC-04).',
        en: 'The external GPL-3.0 decoder cannot be distributed until the compliance option is decided (DEC-04).',
      },
      evidenceClass: 'BLOCKED',
      sourceRefs: [MC05, MC02],
    },
  ],
  capabilities: [
    {
      contentId: 'ais.cap.receive',
      label: { es: 'Recepción de emisiones AIS VHF', en: 'Reception of AIS VHF broadcasts' },
      description: {
        es: 'Diseñado para escuchar las emisiones AIS VHF a través de una antena VHF conectada y decodificarlas en identidad y movimiento de buques.',
        en: 'Designed to listen to AIS VHF broadcasts through a connected VHF antenna and decode them into vessel identity and movement.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC05, MC11_BOUNDARIES],
    },
    {
      contentId: 'ais.cap.state',
      label: {
        es: 'Estado por blanco con antigüedad y fuente',
        en: 'Per-target state with age and source',
      },
      description: {
        es: 'Diseñado para mantener el estado de cada blanco con la antigüedad del mensaje y su fuente, sin inventar datos ausentes.',
        en: 'Designed to maintain per-target state with message age and source, without inventing missing data.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC05],
    },
    {
      contentId: 'ais.cap.view',
      label: { es: 'Lista de blancos y vista de tráfico', en: 'Target list and traffic view' },
      description: {
        es: 'Diseñado para presentar una lista de blancos y una vista de tráfico recibido.',
        en: 'Designed to present a target list and a received-traffic view.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC05],
    },
    {
      contentId: 'ais.cap.publish',
      label: {
        es: 'Publicación a consumidores compatibles',
        en: 'Publication to compatible consumers',
      },
      description: {
        es: 'Diseñado para publicar el tráfico y el estado del receptor a MAREA NAV, MAREA HUB y sistemas de terceros compatibles.',
        en: 'Designed to publish traffic data and receiver health to MAREA NAV, MAREA HUB and compatible third-party systems.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC05, MC11_PROTOCOL],
    },
    {
      contentId: 'ais.cap.cpa',
      label: { es: 'CPA/TCPA condicional', en: 'Conditional CPA/TCPA' },
      description: {
        es: 'Muestra proximidad (CPA/TCPA) sólo cuando existen los datos propios necesarios y una ruta de cálculo validada; si no, declara que no está disponible en lugar de estimar.',
        en: 'Shows proximity (CPA/TCPA) only when the required own-vessel inputs and a validated computation path exist; otherwise it states that they are unavailable instead of estimating.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC05, MC11_BOUNDARIES],
    },
    {
      contentId: 'ais.cap.health',
      label: { es: 'Salud del receptor', en: 'Receiver health' },
      description: {
        es: 'Diseñado para comunicar el estado del receptor a los consumidores compatibles.',
        en: 'Designed to report receiver health to compatible consumers.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC05],
    },
  ],
  composition: [
    {
      groupId: 'ais.comp.hardware',
      label: { es: 'Hardware', en: 'Hardware' },
      heading: { es: 'Composición de hardware', en: 'Hardware composition' },
      items: [
        {
          contentId: 'ais.comp.hardware.unit',
          text: {
            es: 'La unidad receptora, un cable de alimentación documentado, una solución de montaje adecuada a la carcasa elegida y una guía de inicio rápido.',
            en: 'The receiver unit, a documented power lead, a mounting solution appropriate to the chosen enclosure and a quick-start guide.',
          },
          evidenceClass: 'OPEN',
          sourceRefs: [MC05],
        },
        {
          contentId: 'ais.comp.hardware.antenna',
          text: {
            es: 'Antena VHF AIS dedicada, divisor VHF, coaxial de mástil y conectores: opcionales, separados y no incluidos.',
            en: 'Dedicated AIS VHF antenna, VHF splitter, mast coax and connectors: optional, separate and not included.',
          },
          evidenceClass: 'VERIFIED_REPO',
          sourceRefs: [MC05],
        },
        {
          contentId: 'ais.comp.hardware.selection',
          text: {
            es: 'El hardware del receptor no está seleccionado y la BOM no está congelada.',
            en: 'The receiver hardware is not selected and the BOM is not frozen.',
          },
          evidenceClass: 'VERIFIED_REPO',
          sourceRefs: [MC16_FAMILY],
        },
      ],
    },
    {
      groupId: 'ais.comp.software',
      label: { es: 'Software', en: 'Software' },
      heading: {
        es: 'Composición de software y licencias',
        en: 'Software composition and licensing',
      },
      items: [
        {
          contentId: 'ais.comp.software.decoder',
          text: {
            es: 'El decodificador externo AIS-catcher está bajo GPL-3.0 y no puede distribuirse hasta que se decida DEC-04: distribución compatible con oferta de código y avisos, decodificador permisivo sustituto o instalación por el usuario con separación documentada.',
            en: 'The external AIS-catcher decoder is GPL-3.0 and cannot be distributed until DEC-04 is decided: GPL-compliant distribution with source offer and notices, a replacement permissive decoder, or user-installed with documented separation.',
          },
          evidenceClass: 'BLOCKED',
          sourceRefs: [MC05, MC02],
        },
        {
          contentId: 'ais.comp.software.terms',
          text: {
            es: 'Hasta esa decisión no se pueden declarar términos de licencia, derecho de actualización ni posición de oferta de código fuente.',
            en: 'Until that decision, no licence terms, update entitlement or source-offer position can be stated.',
          },
          evidenceClass: 'BLOCKED',
          sourceRefs: [MC05, MC02],
        },
      ],
    },
    {
      groupId: 'ais.comp.included',
      label: { es: 'Incluido', en: 'Included' },
      heading: { es: 'Incluido en la compra prevista', en: 'Included in the intended purchase' },
      items: [
        {
          contentId: 'ais.comp.included.unit',
          text: {
            es: 'Unidad receptora, cable de alimentación documentado, guía de inicio rápido, montaje y ruta de registro de soporte.',
            en: 'Receiver unit, documented power lead, quick-start guide, mounting and a support registration path.',
          },
          evidenceClass: 'HYPOTHESIS',
          sourceRefs: [MC05],
        },
      ],
    },
    {
      groupId: 'ais.comp.excluded',
      label: { es: 'Excluido', en: 'Excluded' },
      heading: { es: 'Excluido de la compra', en: 'Excluded from the purchase' },
      items: [
        {
          contentId: 'ais.comp.excluded.antenna',
          text: {
            es: 'Antena AIS VHF, divisor VHF, coaxial de mástil y conectores.',
            en: 'AIS VHF antenna, VHF splitter, mast coax and connectors.',
          },
          evidenceClass: 'VERIFIED_REPO',
          sourceRefs: [MC05],
        },
        {
          contentId: 'ais.comp.excluded.ecosystem',
          text: {
            es: 'Instalación profesional, suscripción MAREA NAV y MAREA HUB.',
            en: 'Professional installation, MAREA NAV subscription and MAREA HUB.',
          },
          evidenceClass: 'VERIFIED_REPO',
          sourceRefs: [MC05],
        },
        {
          contentId: 'ais.comp.excluded.transmit',
          text: {
            es: 'Cualquier capacidad de transmisión AIS: no existe en este producto.',
            en: 'Any AIS transmission capability: it does not exist in this product.',
          },
          evidenceClass: 'VERIFIED_REPO',
          sourceRefs: [MC05, MC16_FAMILY],
        },
      ],
    },
  ],
  interfaces: [
    {
      contentId: 'ais.int.vhf',
      direction: { es: 'Entrada', en: 'Input' },
      transport: {
        es: 'Emisiones AIS VHF mediante antena VHF conectada',
        en: 'AIS VHF broadcasts through a connected VHF antenna',
      },
      status: { es: 'Previsto', en: 'Intended' },
      note: {
        es: 'La antena no está incluida; la calidad de recepción no se declara.',
        en: 'The antenna is not included; reception quality is not claimed.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC05],
    },
    {
      contentId: 'ais.int.aivdm',
      direction: { es: 'Salida', en: 'Output' },
      transport: {
        es: 'Sentencias NMEA 0183 !AIVDM por un transporte local documentado',
        en: 'NMEA 0183 !AIVDM sentences over a documented local transport',
      },
      status: { es: 'Previsto', en: 'Intended' },
      note: {
        es: 'El transporte local exacto no está congelado.',
        en: 'The exact local transport is not frozen.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC05, MC11_PROTOCOL],
    },
    {
      contentId: 'ais.int.signalk',
      direction: { es: 'Salida', en: 'Output' },
      transport: { es: 'Ruta Signal K', en: 'Signal K path' },
      status: { es: 'Sólo con resultado probado', en: 'Only with a tested result' },
      note: {
        es: 'Ruta por ruta y dirección por dirección.',
        en: 'Path by path and direction by direction.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC11_PROTOCOL],
    },
    {
      contentId: 'ais.int.nav',
      direction: { es: 'Salida', en: 'Output' },
      transport: { es: 'MAREA NAV', en: 'MAREA NAV' },
      status: { es: 'Previsto', en: 'Intended' },
      note: {
        es: 'NAV es la superficie de visualización prevista, no parte de esta compra.',
        en: 'NAV is the intended visualisation surface, not part of this purchase.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC05],
    },
    {
      contentId: 'ais.int.hub',
      direction: { es: 'Salida', en: 'Output' },
      transport: { es: 'MAREA HUB', en: 'MAREA HUB' },
      status: { es: 'Previsto', en: 'Intended' },
      note: {
        es: 'El HUB es el agregador local previsto, no parte de esta compra.',
        en: 'The HUB is the intended local aggregator, not part of this purchase.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC05],
    },
  ],
  editions: [
    {
      editionId: 'AIS-RECEIVER',
      name: { es: 'AIS Receiver', en: 'AIS Receiver' },
      summary: {
        es: 'Receptor de solo recepción con una salida local compatible documentada básica.',
        en: 'Receive-only receiver with a basic documented compatible local output.',
      },
      note: {
        es: 'Dispositivo de hardware previsto. Sin precio aprobado ni disponibilidad comercial.',
        en: 'Intended hardware device. No approved price and no commercial availability.',
      },
      featureLabels: [
        { featureKey: 'AIS_RECEIVE_ONLY', label: { es: 'Solo recepción', en: 'Receive only' } },
        { featureKey: 'AIS_TARGET_LIST', label: { es: 'Lista de blancos', en: 'Target list' } },
      ],
    },
    {
      editionId: 'AIS-CONNECTED',
      name: { es: 'AIS Connected', en: 'AIS Connected' },
      summary: {
        es: 'Variante condicional con redes locales, diagnóstico e integración más ricos y documentados. Debe entregar un beneficio verificable frente a Receiver; no es una etiqueta ni un interruptor de software.',
        en: 'Conditional variant with richer documented local networking, diagnostics and integration. It must deliver a verifiable benefit over Receiver; it is not a label or a software toggle.',
      },
      note: {
        es: 'Condicional y no seleccionada por defecto. Sin precio aprobado ni disponibilidad comercial.',
        en: 'Conditional and not selected by default. No approved price and no commercial availability.',
      },
      featureLabels: [
        { featureKey: 'AIS_RECEIVE_ONLY', label: { es: 'Solo recepción', en: 'Receive only' } },
        { featureKey: 'AIS_TARGET_LIST', label: { es: 'Lista de blancos', en: 'Target list' } },
      ],
    },
  ],
  editionNote: {
    es: 'Una edición es una identidad estable, no un SKU de comercio. No hay precio aprobado, stock verificado, código de SKU ni pedido disponible; las hipótesis de precio de MC-05 no se publican.',
    en: 'An edition is a stable identity, not a merchant SKU. There is no approved price, verified stock, SKU code or available order; MC-05 price hypotheses are not published.',
  },
  limitations: [
    {
      contentId: 'ais.lim.receiveonly',
      label: { es: 'Solo recepción: no transmite', en: 'Receive-only: it does not transmit' },
      description: {
        es: 'No es un transpondedor y no transmite la identidad ni la posición del barco. AIS_TRANSMISSION_OFFERED = false.',
        en: 'It is not a transponder and it does not transmit the vessel’s identity or position. AIS_TRANSMISSION_OFFERED = false.',
      },
      kind: 'PROHIBITION',
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC05, MC16_FAMILY],
    },
    {
      contentId: 'ais.lim.notdsc',
      label: { es: 'No es un dispositivo DSC', en: 'Not a DSC device' },
      description: {
        es: 'No realiza llamadas selectivas digitales ni funciones de socorro.',
        en: 'It performs no digital selective calling and no distress function.',
      },
      kind: 'PROHIBITION',
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC05, MC11_BOUNDARIES],
    },
    {
      contentId: 'ais.lim.navigation',
      label: {
        es: 'No es anticolisión ni navegación',
        en: 'Not collision avoidance or navigation',
      },
      description: {
        es: 'No es un sistema anticolisión ni un sistema de navegación, y no sustituye a equipos certificados de seguridad o navegación.',
        en: 'It is not a collision-avoidance system or a navigation system, and it replaces no certified safety or navigation equipment.',
      },
      kind: 'PROHIBITION',
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC05, MC11_BOUNDARIES],
    },
    {
      contentId: 'ais.lim.cpa',
      label: { es: 'CPA/TCPA no garantizado', en: 'CPA/TCPA not guaranteed' },
      description: {
        es: 'CPA/TCPA depende de los datos propios y de una ruta de cálculo validada; sin ellos se declara no disponible y no se estima.',
        en: 'CPA/TCPA depends on own-vessel inputs and a validated computation path; without them it is declared unavailable and not estimated.',
      },
      kind: 'LIMITATION',
      evidenceClass: 'OPEN',
      sourceRefs: [MC05, MC11_BOUNDARIES],
    },
    {
      contentId: 'ais.lim.antenna',
      label: {
        es: 'Antena e instalación no incluidas',
        en: 'Antenna and installation not included',
      },
      description: {
        es: 'La antena VHF AIS, el divisor, el coaxial de mástil, los conectores y la instalación profesional son objetos separados.',
        en: 'The AIS VHF antenna, splitter, mast coax, connectors and professional installation are separate objects.',
      },
      kind: 'LIMITATION',
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC05],
    },
    {
      contentId: 'ais.lim.licence',
      label: { es: 'Licencia del decodificador sin resolver', en: 'Decoder licence unresolved' },
      description: {
        es: 'El decodificador externo GPL-3.0 no puede distribuirse hasta que DEC-04 se decida; no se declaran términos de licencia ni derecho de actualización.',
        en: 'The external GPL-3.0 decoder cannot be distributed until DEC-04 is decided; no licence terms or update entitlement are stated.',
      },
      kind: 'UNAVAILABLE',
      evidenceClass: 'BLOCKED',
      sourceRefs: [MC05, MC02],
    },
    {
      contentId: 'ais.lim.commercial',
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
      bundleId: 'CRUISE',
      note: {
        es: 'Composición canónica: incluye AIS-RECEIVER. El paquete no es comprable.',
        en: 'Canonical composition: includes AIS-RECEIVER. The bundle is not purchasable.',
      },
    },
    {
      bundleId: 'COMPLETE',
      note: {
        es: 'Composición canónica: AIS-RECEIVER es opcional en este paquete. No es comprable.',
        en: 'Canonical composition: AIS-RECEIVER is optional in this bundle. It is not purchasable.',
      },
    },
  ],
  documentation: [
    {
      documentId: 'ais.doc.spec',
      title: {
        es: 'Especificación comercial MAREA AIS (MC-05)',
        en: 'MAREA AIS commercial specification (MC-05)',
      },
      kind: 'SPECIFICATION',
      status: 'AVAILABLE',
      limitation: null,
      sourceRef: MC05_SPEC,
    },
    {
      documentId: 'ais.doc.boundaries',
      title: {
        es: 'Fronteras AIS / DISPLAY / PILOT (MC-11)',
        en: 'AIS / DISPLAY / PILOT boundaries (MC-11)',
      },
      kind: 'ARCHITECTURE',
      status: 'AVAILABLE',
      limitation: {
        es: 'Fija el carácter de solo recepción y la ausencia de función anticolisión.',
        en: 'Fixes the receive-only nature and the absence of a collision-avoidance function.',
      },
      sourceRef: MC11_BOUNDARIES,
    },
    {
      documentId: 'ais.doc.licence',
      title: {
        es: 'Decisiones y bloqueos de MC-02 (DEC-04, GPL-3.0)',
        en: 'MC-02 decisions and blockers (DEC-04, GPL-3.0)',
      },
      kind: 'LICENSING',
      status: 'PENDING',
      limitation: {
        es: 'Decisión de licencia pendiente: no se puede distribuir el decodificador.',
        en: 'Licence decision pending: the decoder cannot be distributed.',
      },
      sourceRef: MC02,
    },
    {
      documentId: 'ais.doc.compat',
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
      documentId: 'ais.doc.gates',
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
        contentId: 'ais.close.gates',
        text: {
          es: '13 puertas de publicación registradas y 0 cerradas; 42 afirmaciones catalogadas y 0 autorizadas públicamente.',
          en: '13 publication gates recorded and 0 closed; 42 claims catalogued and 0 publicly authorised.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC14_GATES, 'docs/marea/legal-commercial/data/claims-policy.json'],
      },
      {
        contentId: 'ais.close.commercial',
        text: {
          es: '0 precios aprobados, 0 ediciones comercializables, 0 SKU de comercio, 0 filas de stock y 0 filas de compatibilidad probadas.',
          en: '0 approved prices, 0 merchantable editions, 0 merchant SKUs, 0 stock rows and 0 tested compatibility rows.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC16_EDITIONS, MC16_FAMILY],
      },
      {
        contentId: 'ais.close.transmission',
        text: {
          es: 'AIS_TRANSMISSION_OFFERED = false en los datos canónicos; ninguna edición ofrece transmisión.',
          en: 'AIS_TRANSMISSION_OFFERED = false in the canonical data; no edition offers transmission.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC05, MC16_EDITIONS],
      },
    ],
    nextMilestone: {
      contentId: 'ais.close.next',
      text: {
        es: 'MC-21 no está iniciado. Este lote de catálogo no lo autoriza.',
        en: 'MC-21 is not started. This catalogue batch does not authorise it.',
      },
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: ['docs/marea/execution/MASTER-PROMPT-REGISTRY.md'],
    },
  },
};
