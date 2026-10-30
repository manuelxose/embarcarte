import type { LocalizedContent } from '../../../shared/models/localized';

export interface ServiceItem {
  readonly title: string;
  readonly text: string;
}

/**
 * The English page has always published three of the four blocks: the
 * "electronic integration" block exists only in Spanish, so it was not
 * translated here. Closing that content gap is a copy decision, not a
 * refactoring one.
 */
export const SERVICES: LocalizedContent<readonly ServiceItem[]> = {
  es: [
    {
      title: 'Integración de electrónica',
      text: 'Unificamos instrumentos, GPS, AIS y sensores de distintas marcas en un único sistema abierto.',
    },
    {
      title: 'Instalación a bordo',
      text: 'Montaje, cableado, alimentación protegida y puesta en marcha del equipo en tu embarcación.',
    },
    {
      title: 'Desarrollo a medida',
      text: 'Paneles, integraciones y hardware específico para flotas, chárter, escuelas o proyectos de I+D.',
    },
    {
      title: 'Soporte y mantenimiento',
      text: 'Actualizaciones, diagnóstico remoto cuando hay conexión y asistencia antes de cada temporada.',
    },
  ],
  en: [
    {
      title: 'Onboard installation',
      text: 'Mounting, wiring, protected power and commissioning adapted to your boat.',
    },
    {
      title: 'Custom development',
      text: 'Displays, integrations and hardware for fleets, charter, schools and research projects.',
    },
    {
      title: 'Support and maintenance',
      text: 'Updates, diagnostics when connected and technical assistance.',
    },
  ],
};

export interface ServicesPageContent {
  readonly eyebrow: string;
  readonly heading: readonly string[];
  readonly headingEm?: string;
  readonly lead: string;
  readonly processEyebrow: string;
  readonly steps: readonly string[];
  readonly cta: string;
  readonly seo: { readonly title: string; readonly description: string };
}

export const SERVICES_PAGE: LocalizedContent<ServicesPageContent> = {
  es: {
    eyebrow: 'Instalación y soporte',
    heading: ['De la idea'],
    headingEm: 'al barco navegando.',
    lead: 'Diseñamos, instalamos y mantenemos el sistema de navegación de tu embarcación.',
    processEyebrow: 'El proceso',
    steps: [
      'Diagnóstico: revisamos tu embarcación, la electrónica actual y cómo navegas.',
      'Propuesta: presupuesto cerrado con equipos, instalación y plazos.',
      'Instalación: montamos, configuramos y probamos el sistema contigo a bordo.',
      'Soporte: actualizaciones y asistencia para que siga funcionando cada temporada.',
    ],
    cta: 'Solicitar diagnóstico',
    seo: {
      title: 'Instalación e integración de electrónica náutica',
      description:
        'Integración de instrumentos NMEA, instalación de ordenadores de navegación, desarrollo a medida y soporte técnico para embarcaciones.',
    },
  },
  en: {
    eyebrow: 'Installation and support',
    heading: ['From the idea'],
    headingEm: 'to your boat.',
    lead: 'We design, install and maintain navigation systems for your vessel.',
    processEyebrow: 'The process',
    steps: [
      'Assessment: we review the boat, existing electronics and how you sail.',
      'Proposal: a quote with equipment, installation and timing.',
      'Installation: we install, configure and test the system on board.',
      'Support: updates and assistance each season.',
    ],
    cta: 'Request an assessment',
    seo: {
      title: 'Marine electronics installation and integration',
      description:
        'Marine instrument integration, onboard computer installation, custom development and support.',
    },
  },
};
