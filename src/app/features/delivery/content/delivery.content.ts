import type { LocalizedContent } from '../../../shared/models/localized';

export interface DeliveryContent {
  readonly eyebrow: string;
  readonly heading: readonly string[];
  readonly headingEm?: string;
  readonly copy: string;
  readonly cta: string;
  readonly imageAlt: string;
  readonly howEyebrow: string;
  readonly steps: readonly string[];
  readonly quoteEyebrow: string;
  readonly quoteHeading: readonly string[];
  readonly quoteHeadingEm?: string;
  readonly quoteText: string;
  readonly quoteCta: string;
  readonly seo: { readonly title: string; readonly description: string };
}

export const DELIVERY_PAGE: LocalizedContent<DeliveryContent> = {
  es: {
    eyebrow: '03 / Traslados',
    heading: ['Tu barco, rumbo'],
    headingEm: 'al próximo puerto.',
    copy: 'Traslados marítimos de embarcaciones con planificación cuidada y comunicación clara en cada etapa.',
    cta: 'Solicitar presupuesto',
    imageAlt: 'Embarcación navegando hacia el horizonte',
    howEyebrow: 'Cómo trabajamos',
    steps: [
      'Revisión previa: estado de la embarcación, documentación y equipo de seguridad.',
      'Planificación: ruta, escalas y ventana meteorológica adecuada.',
      'Navegación con seguimiento: te mantenemos informado de la posición y del avance.',
      'Entrega: llegada a puerto, informe del viaje y de cualquier incidencia detectada.',
    ],
    quoteEyebrow: 'Para el presupuesto',
    quoteHeading: ['Cuéntanos el barco,'],
    quoteHeadingEm: 'el origen y el destino.',
    quoteText:
      'Tipo y eslora de la embarcación, puertos de salida y llegada, fechas aproximadas y si necesitas tripulación adicional.',
    quoteCta: 'Pedir presupuesto',
    seo: {
      title: 'Traslado de embarcaciones',
      description:
        'Traslados marítimos de veleros y barcos a motor entre puertos, con planificación, seguimiento y entrega documentada.',
    },
  },
  en: {
    eyebrow: '03 / Boat delivery',
    heading: ['Your boat, on its way'],
    headingEm: 'to the next port.',
    copy: 'Boat deliveries by sea with careful planning and clear communication at every stage.',
    cta: 'Request a quote',
    imageAlt: 'Boat sailing toward the horizon',
    howEyebrow: 'How we work',
    steps: [
      'Pre-departure review: vessel condition, documents and safety equipment.',
      'Planning: route, stops and a suitable weather window.',
      'Passage tracking: we keep you informed of position and progress.',
      'Handover: arrival, passage report and any incidents.',
    ],
    quoteEyebrow: 'For your quote',
    quoteHeading: ['Tell us about the boat,'],
    quoteHeadingEm: 'origin and destination.',
    quoteText:
      'Vessel type and length, departure and arrival ports, approximate dates and whether extra crew is needed.',
    quoteCta: 'Request a quote',
    seo: {
      title: 'Boat delivery',
      description: 'Sailboat and motorboat deliveries between ports, with planning and tracking.',
    },
  },
};
