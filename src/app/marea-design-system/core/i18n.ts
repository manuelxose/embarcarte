import { Injectable, inject, signal } from '@angular/core';
import type { MareaLocale } from './types';

/**
 * Bilingual copy for the isolated design-system components.
 *
 * Rules:
 * - ES is the default language; EN is a translation of the same claim, never a weaker one.
 * - No component contains a hard-coded user-facing string.
 * - Copy describes withheld capability honestly: no price, stock, purchase, date,
 *   waitlist, certification, quotation guarantee or autonomous-navigation claim.
 */
export const MAREA_COPY = {
  internalOnlyBanner: {
    es: 'Solo uso interno · sistema de diseño no publicado',
    en: 'Internal use only · unpublished design system',
  },
  provisionalBrand: {
    es: 'Marca propuesta MAREA · identidad no adoptada · uso público NO_GO',
    en: 'MAREA is a proposed brand · identity not adopted · public use NO_GO',
  },
  demoData: {
    es: 'Datos de demostración sintéticos',
    en: 'Synthetic demonstration data',
  },
  demo: { es: 'DEMO', en: 'DEMO' },
  status: { es: 'Estado', en: 'Status' },
  readiness: { es: 'Preparación', en: 'Readiness' },
  definitionStatus: { es: 'Estado de definición', en: 'Definition status' },
  family: { es: 'Familia', en: 'Family' },
  edition: { es: 'Edición', en: 'Edition' },
  editions: { es: 'Ediciones', en: 'Editions' },
  bundle: { es: 'Paquete', en: 'Bundle' },
  component: { es: 'Componente', en: 'Component' },
  components: { es: 'Componentes', en: 'Components' },
  optionalComponents: { es: 'Componentes opcionales', en: 'Optional components' },
  exclusions: { es: 'Exclusiones y límites', en: 'Exclusions and limits' },
  externalRequirements: { es: 'Requisitos externos', en: 'External requirements' },
  entitlement: { es: 'Derecho de uso', en: 'Entitlement' },
  entitlements: { es: 'Derechos de uso', en: 'Entitlements' },
  documentation: { es: 'Documentación', en: 'Documentation' },
  limitations: { es: 'Limitaciones', en: 'Limitations' },
  features: { es: 'Funciones', en: 'Features' },
  specifications: { es: 'Especificaciones', en: 'Specifications' },
  factSheet: { es: 'Ficha técnica', en: 'Technical sheet' },
  included: { es: 'Incluido', en: 'Included' },
  optional: { es: 'Opcional', en: 'Optional' },
  contractOnly: { es: 'Solo contrato', en: 'Contract only' },
  quotationRequired: { es: 'Requiere presupuesto', en: 'Quotation required' },
  conditionalLine: { es: 'Condicional', en: 'Conditional' },
  excluded: { es: 'Excluido', en: 'Excluded' },
  required: { es: 'Obligatorio', en: 'Required' },
  ready: { es: 'LISTO', en: 'READY' },
  notReady: { es: 'NO LISTO', en: 'NOT READY' },
  blocked: { es: 'BLOQUEADO', en: 'BLOCKED' },
  notAssessed: { es: 'NO EVALUADO', en: 'NOT ASSESSED' },
  verified: { es: 'VERIFICADO', en: 'VERIFIED' },
  partial: { es: 'PARCIAL', en: 'PARTIAL' },
  unverified: { es: 'NO VERIFICADO', en: 'UNVERIFIED' },
  staleData: { es: 'DATOS OBSOLETOS', en: 'STALE DATA' },
  missing: { es: 'AUSENTE', en: 'MISSING' },
  noData: { es: 'SIN DATOS', en: 'NO DATA' },
  stale: { es: 'OBSOLETO', en: 'STALE' },
  offline: { es: 'SIN CONEXIÓN', en: 'OFFLINE' },
  online: { es: 'CONECTADO', en: 'ONLINE' },
  degraded: { es: 'DEGRADADO', en: 'DEGRADED' },
  unknown: { es: 'DESCONOCIDO', en: 'UNKNOWN' },
  sensorUnavailable: { es: 'Sensor no disponible', en: 'Sensor unavailable' },
  sensorNotInstalled: { es: 'Sensor no instalado', en: 'Sensor not installed' },
  sensorNoSignal: { es: 'Sin señal del sensor', en: 'No sensor signal' },
  sensorError: { es: 'Error del sensor', en: 'Sensor error' },
  sensorCalibrating: { es: 'Sensor en calibración', en: 'Sensor calibrating' },
  sensorUnlicensed: { es: 'Datos no licenciados', en: 'Data not licensed' },
  noDataAvailable: {
    es: 'No hay datos disponibles para este sensor. No se muestra un valor congelado.',
    en: 'No data is available for this sensor. No frozen last value is shown.',
  },
  freshness: { es: 'Actualidad del dato', en: 'Data freshness' },
  lastUpdate: { es: 'Última actualización', en: 'Last update' },
  age: { es: 'Antigüedad', en: 'Age' },
  measuredValue: { es: 'Valor medido', en: 'Measured value' },
  unit: { es: 'Unidad', en: 'Unit' },
  connectivity: { es: 'Conectividad', en: 'Connectivity' },
  device: { es: 'Dispositivo', en: 'Device' },
  telemetry: { es: 'Telemetría', en: 'Telemetry' },
  dataQuality: { es: 'Calidad del dato', en: 'Data quality' },
  evidence: { es: 'Evidencia', en: 'Evidence' },
  source: { es: 'Fuente', en: 'Source' },
  loading: { es: 'Cargando', en: 'Loading' },
  empty: { es: 'Sin contenido', en: 'No content' },
  error: { es: 'Error', en: 'Error' },
  retry: { es: 'Reintentar', en: 'Retry' },
  expand: { es: 'Expandir', en: 'Expand' },
  collapse: { es: 'Contraer', en: 'Collapse' },
  open: { es: 'Abrir', en: 'Open' },
  close: { es: 'Cerrar', en: 'Close' },
  navigation: { es: 'Navegación', en: 'Navigation' },
  mainNavigation: { es: 'Navegación principal', en: 'Main navigation' },
  breadcrumb: { es: 'Ruta de navegación', en: 'Breadcrumb' },
  currentPage: { es: 'Página actual', en: 'Current page' },
  tabs: { es: 'Pestañas', en: 'Tabs' },
  permission: { es: 'Autorización', en: 'Authorisation' },
  gateClosed: { es: 'Puerta cerrada', en: 'Gate closed' },
  publicationNotAuthorized: { es: 'Publicación no autorizada', en: 'Publication not authorised' },
  internalScope: { es: 'Ámbito interno', en: 'Internal scope' },
  quotationOnly: { es: 'Solo presupuesto', en: 'Quotation only' },
  requiresQuotation: { es: 'Requiere presupuesto', en: 'Requires quotation' },
  installationPackage: { es: 'Paquete de instalación', en: 'Installation package' },
  conditional: { es: 'Condicional', en: 'Conditional' },
  defined: { es: 'Definido', en: 'Defined' },
  notForSale: { es: 'No comercializable', en: 'Not for sale' },
  priceUnavailable: {
    es: 'Importe no establecido. No se muestra ningún precio porque no existe un precio aprobado.',
    en: 'No amount established. No price is shown because no approved price exists.',
  },
  priceUnavailableHeading: { es: 'Precio no disponible', en: 'Price unavailable' },
  stockUnavailable: {
    es: 'Disponibilidad no verificada. No se muestra stock y no se afirma que el producto esté agotado.',
    en: 'Availability unverified. No stock is shown and the product is not claimed to be sold out.',
  },
  stockUnavailableHeading: { es: 'Disponibilidad no verificada', en: 'Availability unverified' },
  compatibilityUnverified: {
    es: 'Compatibilidad no verificada: 0 filas probadas. No se afirma compatibilidad con equipos de terceros.',
    en: 'Compatibility unverified: 0 tested rows. No compatibility with third-party equipment is claimed.',
  },
  compatibilityHeading: { es: 'Compatibilidad no verificada', en: 'Compatibility unverified' },
  sharedEntitlement: {
    es: 'Un solo derecho compartido con un único registro de licencia. No se factura dos veces.',
    en: 'One shared right with a single licence ledger. It is not billed twice.',
  },
  localSafetyIndependent: {
    es: 'Las funciones locales de seguridad no dependen del pago de una suscripción.',
    en: 'Local safety functions do not depend on a subscription payment.',
  },
  watchNoGuarantee: {
    es: 'No se garantizan alertas ni una monitorización remota continua.',
    en: 'Alerts are not guaranteed and continuous remote monitoring is not provided.',
  },
  fleetNoHardware: {
    es: 'Sin hardware por defecto y sin acuerdo de nivel de servicio establecido.',
    en: 'No default hardware and no established service-level agreement.',
  },
  pilotSupervised: {
    es: 'Concepto de pilotaje asistido. Sin navegación autónoma ni control de gobierno en vivo. Puerta de seguridad bloqueada.',
    en: 'Supervised pilot concept. No autonomous navigation and no live steering control. Safety gate blocked.',
  },
  aisReceiveOnly: {
    es: 'Recepción únicamente. Sin transmisión AIS ni promesa de evitación de colisiones.',
    en: 'Receive-only. No AIS transmission and no collision-avoidance promise.',
  },
  navWeatherLicensing: {
    es: 'Los datos de cartas náuticas y meteorología no licenciados no se representan como incluidos.',
    en: 'Unlicensed chart and weather data are not represented as included.',
  },
  senseEssentialsKit: {
    es: 'Un kit que representa POWER + BILGE; los módulos no se cuentan dos veces.',
    en: 'One kit representing POWER + BILGE; modules are not double-counted.',
  },
  displayConditional: {
    es: 'Sin dimensiones, tamaño final ni precio inventados.',
    en: 'No invented dimensions, final size or price.',
  },
  ctaDisabled: {
    es: 'Acción no disponible: la publicación comercial no está autorizada. No existe botón de compra.',
    en: 'Action unavailable: commercial publication is not authorised. No purchase button exists.',
  },
  ctaComingSoon: {
    es: 'Concepto interno definido sin fecha aprobada. No hay preventa, reserva ni lista de espera.',
    en: 'Internal concept defined without an approved date. There is no pre-order, reservation or waiting list.',
  },
  ctaRequestInformation: {
    es: 'Información pendiente de autorización de copy. Esta vista interna no recoge datos personales ni crea un mecanismo de contacto.',
    en: 'Information pending copy authorisation. This internal view collects no personal data and creates no contact mechanism.',
  },
  ctaQuoteOnly: {
    es: 'Categoría de interacción contractual futura. No constituye una oferta, no muestra precio y no garantiza un presupuesto.',
    en: 'Future contractual interaction category. It is not an offer, shows no price and does not guarantee a quotation.',
  },
  ctaNotAvailable: {
    es: 'No disponible. El estado refleja puertas de seguridad o legales cerradas.',
    en: 'Not available. The status reflects closed safety or legal gates.',
  },
  buySignalBlocked: {
    es: 'Se ha recibido una señal no autorizada de compra y la vista la bloquea. No se muestra ninguna acción de compra.',
    en: 'An unauthorised purchase signal was received and the view blocks it. No purchase action is shown.',
  },
  priceSignalBlocked: {
    es: 'Se ha recibido una señal de precio no aprobada. Ningún importe se representa.',
    en: 'An unapproved price signal was received. No amount is represented.',
  },
  stockSignalBlocked: {
    es: 'Se ha recibido una señal de disponibilidad no verificada. Ninguna cantidad se representa.',
    en: 'An unverified availability signal was received. No quantity is represented.',
  },
  buyCtaBlockedRule: {
    es: 'Regla global: buyCtaAllowed=false, cartAllowed=false, priceVisible=false, availabilityVisible=false.',
    en: 'Global rule: buyCtaAllowed=false, cartAllowed=false, priceVisible=false, availabilityVisible=false.',
  },
  noPurchasePath: {
    es: 'Este sistema no contiene carrito, pago, suscripción ni ruta de compra.',
    en: 'This system contains no cart, payment, subscription or purchase path.',
  },
  documentPending: { es: 'Pendiente', en: 'Pending' },
  documentAvailable: { es: 'Disponible', en: 'Available' },
  noDocumentation: {
    es: 'No hay documentación autorizada todavía para esta familia.',
    en: 'No authorised documentation exists yet for this family.',
  },
  notApplicable: { es: 'No aplicable', en: 'Not applicable' },
  scrollHint: {
    es: 'Desplaza horizontalmente para ver la tabla completa',
    en: 'Scroll horizontally to see the full table',
  },
  openNavigation: { es: 'Abrir navegación', en: 'Open navigation' },
  closeNavigation: { es: 'Cerrar navegación', en: 'Close navigation' },
  tableLabel: { es: 'Tabla: {name}', en: 'Table: {name}' },
  blockedGates: { es: 'Puertas bloqueadas', en: 'Blocked gates' },
  noneRecorded: { es: 'Ninguna registrada', en: 'None recorded' },
  derivedReadiness: {
    es: 'Etiquetas derivadas en servidor. Una página nunca promueve el ciclo de vida del producto.',
    en: 'Labels derived server-side. A page never promotes the product lifecycle.',
  },
  comparisonUnverified: { es: 'No verificado', en: 'Unverified' },
  yes: { es: 'Sí', en: 'Yes' },
  no: { es: 'No', en: 'No' },
  rowHeader: { es: 'Característica', en: 'Feature' },
  optionHeader: { es: 'Opción', en: 'Option' },
  definitionList: { es: 'Ficha', en: 'Fact sheet' },
  note: { es: 'Nota', en: 'Note' },
  valueLabel: { es: 'Valor', en: 'Value' },
  includes: { es: 'Incluye', en: 'Includes' },
  fresh: { es: 'Actual', en: 'Current' },
  ctaDisabledLabel: { es: 'Sin acción disponible', en: 'No action available' },
  ctaComingSoonLabel: { es: 'Próximamente (sin fecha)', en: 'Coming later (no date)' },
  ctaRequestInformationLabel: { es: 'Información no autorizada', en: 'Information not authorised' },
  ctaQuoteOnlyLabel: { es: 'Solo presupuesto futuro', en: 'Future quotation only' },
  external: { es: 'abre en otra pestaña', en: 'opens in a new tab' },
  ctaNotAvailableLabel: { es: 'No disponible', en: 'Not available' },
} as const satisfies Record<string, { es: string; en: string }>;

export type MareaCopyKey = keyof typeof MAREA_COPY;

/**
 * Document-wide locale state. One locale per rendered document: the theme host
 * sets it before children render, so SSR output and hydration agree.
 */
@Injectable({ providedIn: 'root' })
export class MareaI18n {
  readonly locale = signal<MareaLocale>('es');

  text(key: MareaCopyKey, params?: Readonly<Record<string, string | number>>): string {
    const entry = MAREA_COPY[key];
    let value: string = entry[this.locale()];
    if (params) {
      for (const [name, replacement] of Object.entries(params)) {
        value = value.split(`{${name}}`).join(String(replacement));
      }
    }
    return value;
  }
}

export function injectMareaI18n(): MareaI18n {
  return inject(MareaI18n);
}

/** Formats a duration as mm:ss without locale APIs, so SSR and hydration agree. */
export function formatAge(seconds: number | null): string {
  if (seconds === null || !Number.isFinite(seconds) || seconds < 0) return '--:--';
  const total = Math.floor(seconds);
  const minutes = Math.floor(total / 60);
  const rest = total % 60;
  return `${String(minutes).padStart(2, '0')}:${String(rest).padStart(2, '0')}`;
}
