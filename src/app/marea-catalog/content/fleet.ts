/**
 * MC-20/MC-22 internal catalogue — MAREA FLEET (multi-tenant SaaS) bilingual content.
 *
 * FLEET is a professional B2B fleet-management service in definition only. No
 * production multi-tenant service is deployed (NOT_IMPLEMENTED), no SLA is
 * established (NO_SLA_ESTABLISHED), telemetry is read-only, there is no
 * vessel-control path and the default role is NO_ACCESS. No hardware, SLA,
 * monitoring/availability guarantee, service contract, commercial package or
 * customer deployment is invented. Availability stays NOT_FOR_SALE.
 */
import type { CatalogFamilyContent } from './content.types';

const MC07 = 'docs/marea/products/product-definitions.batch-03.json#products.FLEET';
const SPEC = 'docs/marea/products/MAREA-FLEET-COMMERCIAL-SPEC.md';
const TENANCY = 'docs/marea/products/FLEET-TENANCY-SECURITY-AND-DATA-GOVERNANCE.md';
const MC16_FAMILY = 'docs/marea/commerce-data/data/product-families.json#families[familyId=FLEET]';
const MC16_EDITIONS =
  'docs/marea/commerce-data/data/product-editions.json#editions[familyId=FLEET]';
const MC16_BUNDLES = 'docs/marea/commerce-data/data/bundle-compositions.json';
const MC15_ROUTE =
  'docs/marea/information-architecture/data/proposed-routes.json#items[routeId=mareaFamilyFleet]';
const MC14_GATES = 'docs/marea/legal-commercial/data/release-evidence-gates.json';
const MC02 = 'docs/marea/compliance/MC-02-BLOCKERS-AND-DECISIONS.md';
const COMPAT = 'docs/marea/products/PRODUCT-COMPATIBILITY-DISPLAY-WEATHER-FLEET.md';
const EDITIONS = 'docs/marea/products/PRODUCT-EDITIONS-DISPLAY-WEATHER-FLEET.md';
const COPY_ES = 'docs/marea/products/copy/fleet.es.md';
const COPY_EN = 'docs/marea/products/copy/fleet.en.md';

const TENANCY_FEATURE = {
  featureKey: 'FLEET_TENANCY',
  label: { es: 'Aislamiento de inquilinos', en: 'Tenant isolation' },
} as const;
const REGISTRY = {
  featureKey: 'FLEET_VESSEL_REGISTRY',
  label: { es: 'Registro de embarcaciones', en: 'Vessel registry' },
} as const;
const ROLES = {
  featureKey: 'FLEET_ROLES',
  label: { es: 'Roles', en: 'Roles' },
} as const;
const AUDIT = {
  featureKey: 'FLEET_AUDIT',
  label: { es: 'Auditoría', en: 'Audit' },
} as const;

export const FLEET_CONTENT: CatalogFamilyContent = {
  familyId: 'FLEET',
  hero: {
    kicker: {
      es: 'Catálogo interno · lote 3 · FLEET',
      en: 'Internal catalogue · batch 3 · FLEET',
    },
    heading: { es: 'MAREA FLEET', en: 'MAREA FLEET' },
    lead: {
      es: 'Servicio profesional de gestión de flotas multiusuario para pequeños operadores comerciales y de chárter: organización, embarcaciones, miembros, roles, telemetría de solo lectura y flujos de mantenimiento. Hoy es una definición: no hay servicio de producción desplegado.',
      en: 'A professional multi-tenant fleet-management service for small commercial and charter operators: organisation, vessels, memberships, roles, read-only telemetry and maintenance workflows. Today it is a definition: no production service is deployed.',
    },
    category: {
      es: 'SaaS B2B · gestión de flotas',
      en: 'B2B SaaS · fleet management',
    },
    mandatoryNotice: {
      contentId: 'fleet.hero.notice',
      text: {
        es: 'MAREA FLEET no está implementado (ningún servicio de producción desplegado) y no tiene SLA establecido (NO_SLA_ESTABLISHED). La telemetría es de solo lectura, no existe ruta de control de embarcación y el rol por defecto es NO_ACCESS. No incluye hardware ni garantía de disponibilidad.',
        en: 'MAREA FLEET is not implemented (no production service deployed) and has no established SLA (NO_SLA_ESTABLISHED). Telemetry is read-only, there is no vessel-control path and the default role is NO_ACCESS. It includes no hardware and no availability guarantee.',
      },
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC07, TENANCY, MC16_FAMILY],
    },
    highlights: [
      {
        contentId: 'fleet.hero.highlight.notimplemented',
        text: {
          es: 'No implementado: ningún servicio de producción multiusuario está desplegado.',
          en: 'Not implemented: no production multi-tenant service is deployed.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC07, MC16_FAMILY],
      },
      {
        contentId: 'fleet.hero.highlight.sla',
        text: {
          es: 'NO_SLA_ESTABLISHED: sin garantía de disponibilidad, monitorización ni contrato de servicio.',
          en: 'NO_SLA_ESTABLISHED: no availability guarantee, monitoring or service contract.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC07, TENANCY],
      },
      {
        contentId: 'fleet.hero.highlight.telemetry',
        text: {
          es: 'Telemetría de solo lectura y sin ruta de control de embarcación: no se gobierna nada a distancia.',
          en: 'Read-only telemetry and no vessel-control path: nothing is steered remotely.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC07, TENANCY],
      },
      {
        contentId: 'fleet.hero.highlight.role',
        text: {
          es: 'Rol por defecto NO_ACCESS: el acceso se concede explícitamente, nunca por defecto.',
          en: 'Default role NO_ACCESS: access is granted explicitly, never by default.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC07, TENANCY],
      },
      {
        contentId: 'fleet.hero.highlight.editions',
        text: {
          es: 'Dos niveles (FLEET-START, FLEET-BUSINESS) y un nivel contratado (FLEET-ENTERPRISE). Una edición no es un SKU de comercio.',
          en: 'Two tiers (FLEET-START, FLEET-BUSINESS) and a contracted tier (FLEET-ENTERPRISE). An edition is not a merchant SKU.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC16_EDITIONS, EDITIONS],
      },
    ],
  },
  sections: {
    overview: {
      kicker: { es: '01 · Visión general', en: '01 · Overview' },
      heading: { es: 'Qué es MAREA FLEET', en: 'What MAREA FLEET is' },
      lead: {
        es: 'Un servicio de gestión de flotas para operadores que gestionan, como hipótesis de segmento, de una a cincuenta embarcaciones, con aislamiento de inquilinos y privilegio mínimo por diseño. No existe ningún servicio en producción.',
        en: 'A fleet-management service for operators managing, as a segment hypothesis, roughly one to fifty vessels, with tenant isolation and least privilege by design. No production service exists.',
      },
    },
    capabilities: {
      kicker: { es: '02 · Capacidades', en: '02 · Capabilities' },
      heading: { es: 'Capacidades definidas', en: 'Defined capabilities' },
      lead: {
        es: 'Cada capacidad es una definición, no una función desplegada. La autorización es del lado del servidor en toda operación sensible.',
        en: 'Each capability is a definition, not a deployed function. Authorisation is server-side on every sensitive operation.',
      },
    },
    specifications: {
      kicker: { es: '03 · Especificaciones', en: '03 · Specifications' },
      heading: { es: 'Ficha técnica y preparación', en: 'Technical sheet and readiness' },
      lead: {
        es: 'Los estados se copian del registro canónico de MC-16. La ingeniería está NOT_VERIFIED y el producto de software no aplica a hardware.',
        en: 'Statuses are copied from the canonical MC-16 record. Engineering is NOT_VERIFIED and the software product has no hardware dimension.',
      },
    },
    composition: {
      kicker: { es: '04 · Composición', en: '04 · Composition' },
      heading: { es: 'Composición y paquete', en: 'Composition and package' },
      lead: {
        es: 'El servicio y sus fuentes de telemetría se declaran por separado. Ningún hardware va incluido por defecto.',
        en: 'The service and its telemetry sources are stated separately. No hardware is included by default.',
      },
    },
    editions: {
      kicker: { es: '05 · Ediciones', en: '05 · Editions' },
      heading: { es: 'Ediciones definidas', en: 'Defined editions' },
      lead: {
        es: 'Tres ediciones registradas en los datos canónicos. Ninguna tiene precio aprobado, stock verificado ni código de SKU de comercio.',
        en: 'Three editions recorded in the canonical data. None has an approved price, verified stock or merchant SKU code.',
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
      contentId: 'fleet.overview.b2b',
      text: {
        es: 'Identidad profesional B2B: el público previsto son operadores comerciales y de chárter, no un panel de consumo.',
        en: 'Professional B2B identity: the intended audience is commercial and charter operators, not a consumer panel.',
      },
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC07, SPEC],
    },
    {
      contentId: 'fleet.overview.tenancy',
      text: {
        es: 'El aislamiento de inquilinos y el privilegio mínimo son requisitos de diseño, no una función desplegada ni certificada.',
        en: 'Tenant isolation and least privilege are design requirements, not a deployed or certified function.',
      },
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC07, TENANCY],
    },
    {
      contentId: 'fleet.overview.claims',
      text: {
        es: 'La ficha no atribuye SLA, disponibilidad, certificación de seguridad ni plan ilimitado.',
        en: 'The sheet attributes no SLA, availability, security certification or unlimited plan.',
      },
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC07, SPEC],
    },
  ],
  capabilities: [
    {
      contentId: 'fleet.cap.tenancy',
      label: { es: 'Aislamiento de inquilinos', en: 'Tenant isolation' },
      description: {
        es: 'Autorización del lado del servidor en toda operación sensible y sin acceso entre inquilinos; es un requisito de diseño.',
        en: 'Server-side authorisation on every sensitive operation and no cross-tenant access; it is a design requirement.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [TENANCY, SPEC],
    },
    {
      contentId: 'fleet.cap.registry',
      label: { es: 'Registro de embarcaciones', en: 'Vessel registry' },
      description: {
        es: 'Organización y registros de embarcaciones con miembros y roles; ninguna embarcación es visible por defecto.',
        en: 'Organisation and vessel records with memberships and roles; no vessel is visible by default.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [SPEC, COPY_ES],
    },
    {
      contentId: 'fleet.cap.roles',
      label: { es: 'Roles y privilegio mínimo', en: 'Roles and least privilege' },
      description: {
        es: 'Ocho roles con el rol por defecto NO_ACCESS; el instalador externo se limita a la embarcación y al tiempo concedidos.',
        en: 'Eight roles with default role NO_ACCESS; the external installer is scoped to the granted vessel and time.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC07, TENANCY],
    },
    {
      contentId: 'fleet.cap.telemetry',
      label: { es: 'Telemetría de solo lectura', en: 'Read-only telemetry' },
      description: {
        es: 'Presentación de telemetría y avisos de solo lectura con fuente y frescura; sin ruta de control de embarcación.',
        en: 'Read-only telemetry and alert presentation with source and freshness; no vessel-control path.',
      },
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC07, TENANCY],
    },
    {
      contentId: 'fleet.cap.maintenance',
      label: { es: 'Flujos de mantenimiento', en: 'Maintenance workflows' },
      description: {
        es: 'Flujos de mantenimiento, informes, exportación y un camino de soporte auditado; son definiciones, no funciones desplegadas.',
        en: 'Maintenance workflows, reporting, export and an audited support path; these are definitions, not deployed functions.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [SPEC, COPY_EN],
    },
    {
      contentId: 'fleet.cap.audit',
      label: { es: 'Registro de auditoría', en: 'Audit log' },
      description: {
        es: 'El registro de auditoría y la exportación de datos son requisitos de diseño; la revocación inmediata de un miembro también es un requisito de diseño.',
        en: 'The audit log and data export are design requirements; immediate revocation of a removed member is likewise a design requirement.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC07, TENANCY],
    },
  ],
  composition: [
    {
      groupId: 'fleet.comp.included',
      label: { es: 'Incluido', en: 'Included' },
      heading: { es: 'Incluido en el servicio previsto', en: 'Included in the intended service' },
      items: [
        {
          contentId: 'fleet.comp.included.account',
          text: {
            es: 'La cuenta de organización, los registros de embarcaciones, las membresías y los roles.',
            en: 'The organisation account, vessel records, memberships and roles.',
          },
          evidenceClass: 'HYPOTHESIS',
          sourceRefs: [SPEC, COPY_ES],
        },
        {
          contentId: 'fleet.comp.included.telemetry',
          text: {
            es: 'La presentación de telemetría de solo lectura, los flujos de mantenimiento y los informes estándar.',
            en: 'Read-only telemetry presentation, maintenance workflows and standard reports.',
          },
          evidenceClass: 'HYPOTHESIS',
          sourceRefs: [SPEC],
        },
        {
          contentId: 'fleet.comp.included.audit',
          text: {
            es: 'El registro de auditoría y el camino de soporte auditado dentro del alcance definido.',
            en: 'The audit log and audited support path within the defined scope.',
          },
          evidenceClass: 'HYPOTHESIS',
          sourceRefs: [TENANCY, SPEC],
        },
      ],
    },
    {
      groupId: 'fleet.comp.excluded',
      label: { es: 'Excluido', en: 'Excluded' },
      heading: { es: 'Excluido del servicio', en: 'Excluded from the service' },
      items: [
        {
          contentId: 'fleet.comp.excluded.hardware',
          text: {
            es: 'Pasarelas de telemetría, sensores, conectividad y presentación DISPLAY: fuentes y dispositivos separados.',
            en: 'Telemetry gateways, sensors, connectivity and DISPLAY presentation: separate sources and devices.',
          },
          evidenceClass: 'VERIFIED_REPO',
          sourceRefs: [SPEC, MC16_FAMILY],
        },
        {
          contentId: 'fleet.comp.excluded.sla',
          text: {
            es: 'Un SLA, una garantía de disponibilidad o monitorización y un contrato de servicio.',
            en: 'An SLA, an availability or monitoring guarantee and a service contract.',
          },
          evidenceClass: 'VERIFIED_REPO',
          sourceRefs: [MC07, TENANCY],
        },
        {
          contentId: 'fleet.comp.excluded.control',
          text: {
            es: 'Cualquier ruta de control de gobierno, motor o timón de la embarcación.',
            en: 'Any steering, motor or rudder control path to the vessel.',
          },
          evidenceClass: 'VERIFIED_REPO',
          sourceRefs: [MC07, TENANCY],
        },
      ],
    },
    {
      groupId: 'fleet.comp.licence',
      label: { es: 'Tenencia y datos', en: 'Tenancy and data' },
      heading: { es: 'Tenencia y datos', en: 'Tenancy and data' },
      items: [
        {
          contentId: 'fleet.comp.licence.tenancy',
          text: {
            es: 'La autorización es del lado del servidor y nunca se confía en un inquilino enviado por el cliente; el acceso entre inquilinos no está permitido.',
            en: 'Authorisation is server-side and a client-supplied tenant is never trusted; cross-tenant access is not allowed.',
          },
          evidenceClass: 'VERIFIED_REPO',
          sourceRefs: [MC07, TENANCY],
        },
        {
          contentId: 'fleet.comp.licence.data',
          text: {
            es: 'Los límites de almacenamiento y API son explícitos: ninguna promesa de almacenamiento o API ilimitados.',
            en: 'Storage and API limits are explicit: no unlimited storage or API promise.',
          },
          evidenceClass: 'OPEN',
          sourceRefs: [SPEC, TENANCY],
        },
      ],
    },
  ],
  interfaces: [
    {
      contentId: 'fleet.int.watch',
      direction: { es: 'Entrada', en: 'Input' },
      transport: { es: 'Telemetría y avisos WATCH', en: 'WATCH telemetry and alerts' },
      status: { es: 'Condicional', en: 'Conditional' },
      note: {
        es: 'Solo lectura para sus embarcaciones autorizadas; FLEET nunca envía comandos a través de WATCH.',
        en: 'Read-only for its authorised vessels; FLEET never sends commands through WATCH.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC07, SPEC],
    },
    {
      contentId: 'fleet.int.hub',
      direction: { es: 'Entrada', en: 'Input' },
      transport: { es: 'Salud del HUB', en: 'HUB health' },
      status: { es: 'Condicional', en: 'Conditional' },
      note: {
        es: 'Solo lectura de salud de instalación y telemetría; sin autoridad de configuración.',
        en: 'Read-only installation and telemetry health; no configuration authority.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC07, SPEC],
    },
    {
      contentId: 'fleet.int.ais',
      direction: { es: 'Entrada', en: 'Input' },
      transport: { es: 'Tráfico AIS recibido', en: 'Received AIS traffic' },
      status: { es: 'Condicional', en: 'Conditional' },
      note: {
        es: 'Solo lectura; AIS sigue siendo solo-recepción y nunca es anticolisión.',
        en: 'Read-only; AIS remains receive-only and is never collision avoidance.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC07, SPEC],
    },
    {
      contentId: 'fleet.int.nav',
      direction: { es: 'Entrada', en: 'Input' },
      transport: { es: 'Rutas compartidas con NAV', en: 'Routes shared with NAV' },
      status: { es: 'Previsto', en: 'Planned' },
      note: {
        es: 'Solo con permiso explícito del cliente; sin control sobre NAV.',
        en: 'Only with explicit customer permission; no control over NAV.',
      },
      evidenceClass: 'OPEN',
      sourceRefs: [MC07, SPEC],
    },
    {
      contentId: 'fleet.int.pilot',
      direction: { es: 'Salida', en: 'Output' },
      transport: { es: 'Estado PILOT de solo lectura', en: 'Read-only PILOT status' },
      status: { es: 'Bloqueado', en: 'Blocked' },
      note: {
        es: 'Cualquier control, engranaje o comando de gobierno está bloqueado y no debe existir.',
        en: 'Any control, engagement or steering command is blocked and must not exist.',
      },
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC07, SPEC],
    },
    {
      contentId: 'fleet.int.control',
      direction: { es: 'Salida', en: 'Output' },
      transport: { es: 'Ruta de control remoto', en: 'Remote control path' },
      status: { es: 'Inexistente', en: 'Nonexistent' },
      note: {
        es: 'No existe ruta de control de gobierno, motor o timón por diseño.',
        en: 'No steering, motor or rudder control path exists by design.',
      },
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC07, TENANCY],
    },
  ],
  editions: [
    {
      editionId: 'FLEET-START',
      name: { es: 'FLEET Start', en: 'FLEET Start' },
      summary: {
        es: 'Nivel para operadores pequeños: organización, registro de embarcaciones, roles y telemetría de solo lectura.',
        en: 'Small-operator tier: organisation, vessel registry, roles and read-only telemetry.',
      },
      note: {
        es: 'Servicio SaaS previsto. Sin precio aprobado ni disponibilidad comercial.',
        en: 'Intended SaaS service. No approved price and no commercial availability.',
      },
      featureLabels: [TENANCY_FEATURE, REGISTRY, ROLES, AUDIT],
    },
    {
      editionId: 'FLEET-BUSINESS',
      name: { es: 'FLEET Business', en: 'FLEET Business' },
      summary: {
        es: 'Añade permisos más ricos, flujos de trabajo, informes e integraciones para flotas mayores.',
        en: 'Adds richer permissions, workflows, reporting and integrations for larger fleets.',
      },
      note: {
        es: 'Servicio SaaS previsto. Sin precio aprobado ni disponibilidad comercial.',
        en: 'Intended SaaS service. No approved price and no commercial availability.',
      },
      featureLabels: [TENANCY_FEATURE, REGISTRY, ROLES, AUDIT],
    },
    {
      editionId: 'FLEET-ENTERPRISE',
      name: { es: 'FLEET Enterprise', en: 'FLEET Enterprise' },
      summary: {
        es: 'Nivel contratado, no un SKU de autoservicio: sin precio estándar, sin SLA y sin promesa ilimitada.',
        en: 'Contracted tier, not a self-service SKU: no standard price, no SLA and no unlimited promise.',
      },
      note: {
        es: 'Contratado y condicional. Sin precio establecido ni disponibilidad comercial.',
        en: 'Contracted and conditional. No established price and no commercial availability.',
      },
      featureLabels: [TENANCY_FEATURE, REGISTRY, ROLES, AUDIT],
    },
  ],
  editionNote: {
    es: 'Una edición es una identidad estable, no un SKU de comercio, y un nivel contratado no es un artículo de pago. No hay precio aprobado, stock verificado, código de SKU ni pedido disponible; ningún SLA se ofrece.',
    en: 'An edition is a stable identity, not a merchant SKU, and a contracted tier is not a checkout item. There is no approved price, verified stock, SKU code or available order; no SLA is offered.',
  },
  limitations: [
    {
      contentId: 'fleet.lim.notimplemented',
      label: { es: 'No implementado', en: 'Not implemented' },
      description: {
        es: 'Ningún servicio de producción multiusuario está desplegado (multiTenantProductionService = false).',
        en: 'No production multi-tenant service is deployed (multiTenantProductionService = false).',
      },
      kind: 'UNAVAILABLE',
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC07, MC16_FAMILY],
    },
    {
      contentId: 'fleet.lim.sla',
      label: { es: 'Sin SLA establecido', en: 'No SLA established' },
      description: {
        es: 'NO_SLA_ESTABLISHED: sin garantía de disponibilidad, sin monitorización y sin contrato de servicio.',
        en: 'NO_SLA_ESTABLISHED: no availability guarantee, no monitoring and no service contract.',
      },
      kind: 'UNAVAILABLE',
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC07, TENANCY],
    },
    {
      contentId: 'fleet.lim.telemetry',
      label: { es: 'Telemetría de solo lectura', en: 'Read-only telemetry' },
      description: {
        es: 'La telemetría es de solo lectura (telemetryReadOnly = true) y no hay ruta de control de embarcación.',
        en: 'Telemetry is read-only (telemetryReadOnly = true) and there is no vessel-control path.',
      },
      kind: 'LIMITATION',
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC07, TENANCY],
    },
    {
      contentId: 'fleet.lim.role',
      label: { es: 'Rol por defecto NO_ACCESS', en: 'Default role NO_ACCESS' },
      description: {
        es: 'Ningún miembro ve embarcaciones por defecto; el acceso explícito y la revocación inmediata son requisitos de diseño, no un comportamiento desplegado.',
        en: 'No member sees vessels by default; explicit access granting and immediate revocation are design requirements, not deployed behaviour.',
      },
      kind: 'LIMITATION',
      evidenceClass: 'OPEN',
      sourceRefs: [MC07, TENANCY],
    },
    {
      contentId: 'fleet.lim.hardware',
      label: { es: 'Sin hardware incluido', en: 'No hardware included' },
      description: {
        es: 'Ningún dispositivo, pasarela, sensor ni conectividad va incluido por defecto.',
        en: 'No device, gateway, sensor or connectivity is included by default.',
      },
      kind: 'UNAVAILABLE',
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC16_EDITIONS, MC16_FAMILY],
    },
    {
      contentId: 'fleet.lim.certification',
      label: { es: 'Sin certificación de seguridad', en: 'No security certification' },
      description: {
        es: 'No se afirma certificación de seguridad (securityCertificationClaimed = false) ni se usan datos de clientes en producción.',
        en: 'No security certification is claimed (securityCertificationClaimed = false) and no customer production data is used.',
      },
      kind: 'PROHIBITION',
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: [MC07, TENANCY],
    },
    {
      contentId: 'fleet.lim.commercial',
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
      bundleId: 'FLEET',
      note: {
        es: 'Composición canónica: incluye FLEET-START; FLEET-BUSINESS es opcional y FLEET-ENTERPRISE es un nivel contratado. El paquete no es comprable.',
        en: 'Canonical composition: includes FLEET-START; FLEET-BUSINESS is optional and FLEET-ENTERPRISE is a contracted tier. The bundle is not purchasable.',
      },
    },
  ],
  documentation: [
    {
      documentId: 'fleet.doc.spec',
      title: {
        es: 'Especificación comercial MAREA FLEET (MC-07)',
        en: 'MAREA FLEET commercial specification (MC-07)',
      },
      kind: 'SPECIFICATION',
      status: 'AVAILABLE',
      limitation: null,
      sourceRef: SPEC,
    },
    {
      documentId: 'fleet.doc.tenancy',
      title: {
        es: 'Tenencia, seguridad y gobernanza de datos (FLEET)',
        en: 'FLEET tenancy, security and data governance',
      },
      kind: 'DATA_CONTRACT',
      status: 'AVAILABLE',
      limitation: {
        es: 'Sin servicio de producción y sin certificación de seguridad.',
        en: 'No production service and no security certification.',
      },
      sourceRef: TENANCY,
    },
    {
      documentId: 'fleet.doc.editions',
      title: {
        es: 'Autoridad de ediciones DISPLAY/WEATHER/FLEET',
        en: 'DISPLAY/WEATHER/FLEET edition authority',
      },
      kind: 'EDITIONS',
      status: 'AVAILABLE',
      limitation: {
        es: 'FLEET-ENTERPRISE es un nivel contratado, sin precio ni SLA.',
        en: 'FLEET-ENTERPRISE is a contracted tier, with no price and no SLA.',
      },
      sourceRef: EDITIONS,
    },
    {
      documentId: 'fleet.doc.compat',
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
      documentId: 'fleet.doc.gates',
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
      documentId: 'fleet.doc.routes',
      title: {
        es: 'Registro de rutas propuestas (MC-15)',
        en: 'Proposed route registry (MC-15)',
      },
      kind: 'ROUTE_REGISTRY',
      status: 'AVAILABLE',
      limitation: {
        es: 'La ruta marea/fleet está propuesta internamente y no es desplegable.',
        en: 'The marea/fleet route is internally proposed and not deployable.',
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
      es: 'Esta ficha es contenido interno. La marca MAREA no está adoptada, la limpieza legal no está concedida, el servicio no está implementado y la disponibilidad comercial es NOT_FOR_SALE.',
      en: 'This sheet is internal content. The MAREA brand is not adopted, legal clearance is not granted, the service is not implemented and commercial availability is NOT_FOR_SALE.',
    },
    governance: [
      {
        contentId: 'fleet.close.gates',
        text: {
          es: '13 puertas de publicación registradas y 0 cerradas; 42 afirmaciones catalogadas y 0 autorizadas públicamente.',
          en: '13 publication gates recorded and 0 closed; 42 claims catalogued and 0 publicly authorised.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC14_GATES, 'docs/marea/legal-commercial/data/claims-policy.json'],
      },
      {
        contentId: 'fleet.close.commercial',
        text: {
          es: '0 precios aprobados, 0 ediciones comercializables, 0 SKU de comercio, 0 filas de stock y 0 filas de compatibilidad probadas.',
          en: '0 approved prices, 0 merchantable editions, 0 merchant SKUs, 0 stock rows and 0 tested compatibility rows.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC16_EDITIONS, MC16_FAMILY],
      },
      {
        contentId: 'fleet.close.tenancy',
        text: {
          es: 'multiTenantProductionService = false, slaEstablished = false, telemetryReadOnly = true, remoteControlPath = false y defaultRole = NO_ACCESS en los datos canónicos de MC-07.',
          en: 'multiTenantProductionService = false, slaEstablished = false, telemetryReadOnly = true, remoteControlPath = false and defaultRole = NO_ACCESS in the canonical MC-07 data.',
        },
        evidenceClass: 'VERIFIED_REPO',
        sourceRefs: [MC07, TENANCY],
      },
    ],
    nextMilestone: {
      contentId: 'fleet.close.next',
      text: {
        es: 'MC-22 cierra el lote 3 del catálogo interno. Ningún servicio de flota se despliega ni se publica aquí.',
        en: 'MC-22 closes batch 3 of the internal catalogue. No fleet service is deployed or published here.',
      },
      evidenceClass: 'VERIFIED_REPO',
      sourceRefs: ['docs/marea/execution/MASTER-PROMPT-REGISTRY.md'],
    },
  },
};
