import type { Localized } from './content.types';

/** MC-23 bilingual chrome copy for the bundle comparison and upgrade selector. */
export const BUNDLE_CONTENT_LABELS: Readonly<Record<string, Localized>> = {
  comparisonHeading: { es: 'Comparativa de paquetes', en: 'Bundle comparison' },
  comparisonCaption: {
    es: 'Composición canónica de cada paquete de MC-08: la tabla describe qué incluye cada conjunto, no su disponibilidad comercial.',
    en: 'Canonical composition of each MC-08 bundle: the table describes what each set includes, not its commercial availability.',
  },
  selectorHeading: { es: 'Selector de paquete', en: 'Bundle selector' },
  selectorLabel: {
    es: 'Elige un conjunto para ver su composición canónica.',
    en: 'Choose a set to view its canonical composition.',
  },
  inclusionLegend: {
    es: 'Leyenda de inclusión: elementos que forman parte de la composición canónica del paquete.',
    en: 'Inclusion legend: items that form part of the canonical bundle composition.',
  },
  upgradeHeading: { es: 'De un conjunto a otro', en: 'From one bundle to another' },
  quotationRequired: {
    es: 'Toda ampliación requiere una propuesta formal revisada antes de considerarse.',
    en: 'Every upgrade requires a formal proposal reviewed before it can be considered.',
  },
  notForSale: { es: 'No se vende', en: 'Not for sale' },
  blockedByPilotGate: {
    es: 'Bloqueado por la puerta de seguridad de PILOT',
    en: 'Blocked by the PILOT safety gate',
  },
  notImplemented: { es: 'No implementado', en: 'Not implemented' },
};

/** One short honest state note per MC-08 bundle, ES and EN. */
export const BUNDLE_STATE_NOTES: Readonly<Record<string, Localized>> = {
  START: {
    es: 'Definido en el catálogo canónico; no se vende.',
    en: 'Defined in the canonical catalogue; not for sale.',
  },
  CRUISE: {
    es: 'Definido en el catálogo canónico; no se vende.',
    en: 'Defined in the canonical catalogue; not for sale.',
  },
  SAIL: {
    es: 'Definido en el catálogo canónico; no se vende y está bloqueado por la puerta de seguridad de PILOT.',
    en: 'Defined in the canonical catalogue; not for sale and blocked by the PILOT safety gate.',
  },
  PROTECT: {
    es: 'Definido en el catálogo canónico; no se vende.',
    en: 'Defined in the canonical catalogue; not for sale.',
  },
  COMPLETE: {
    es: 'Definido en el catálogo canónico; no se vende y está bloqueado por la puerta de seguridad de PILOT.',
    en: 'Defined in the canonical catalogue; not for sale and blocked by the PILOT safety gate.',
  },
  FLEET: {
    es: 'Definido en el catálogo canónico; no se vende y no está implementado.',
    en: 'Defined in the canonical catalogue; not for sale and not implemented.',
  },
};
