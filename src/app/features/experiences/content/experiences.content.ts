import type { LocalizedContent } from '../../../shared/models/localized';

export interface ExperiencesContent {
  readonly eyebrow: string;
  /** Plain lines; `headingEm` is rendered as the emphasised last line. */
  readonly heading: readonly string[];
  readonly headingEm?: string;
  readonly copy: string;
  readonly cta: string;
  readonly imageAlt: string;
  readonly listEyebrow: string;
  readonly listHeading: readonly string[];
  readonly listHeadingEm: string;
  readonly listNote: string;
  readonly items: readonly { readonly title: string; readonly text: string }[];
  readonly bookEyebrow: string;
  readonly steps: readonly string[];
  readonly enquiryCta: string;
  readonly seo: { readonly title: string; readonly description: string };
}

export const EXPERIENCES_PAGE: LocalizedContent<ExperiencesContent> = {
  es: {
    eyebrow: '02 / Experiencias',
    heading: ['El mar se disfruta'],
    headingEm: 'desde dentro.',
    copy: 'Salidas y experiencias náuticas para descubrir la costa, aprender y vivir el mar de otra manera.',
    cta: 'Consultar disponibilidad',
    imageAlt: 'Costa vista desde el mar',
    listEyebrow: 'Propuestas',
    listHeading: ['Cada salida,'],
    listHeadingEm: 'a tu medida.',
    listNote: 'Adaptamos la ruta, la duración y el ritmo al grupo, a la previsión y a lo que queráis vivir.',
    items: [
      {
        title: 'Salidas por la costa',
        text: 'Navega calas y tramos de costa con calma, a vela o a motor, en grupos reducidos.',
      },
      {
        title: 'Iniciación a la navegación',
        text: 'Aprende maniobras básicas, lectura del viento y uso de la electrónica de a bordo.',
      },
      {
        title: 'Travesías y planes a medida',
        text: 'Jornadas especiales, celebraciones o travesías más largas diseñadas contigo.',
      },
    ],
    bookEyebrow: 'Cómo reservar',
    steps: [
      'Cuéntanos tu idea: fechas, número de personas y qué os gustaría hacer.',
      'Te proponemos una ruta, horario y precio cerrado según la previsión.',
      'Confirmamos y revisamos la meteo los días previos, avisándote de cualquier cambio.',
    ],
    enquiryCta: 'Preparar consulta',
    seo: {
      title: 'Experiencias y salidas en barco',
      description:
        'Salidas en barco por la costa, iniciación a la navegación y travesías a medida con Embarcarte. Consulta disponibilidad.',
    },
  },
  en: {
    eyebrow: '02 / Experiences',
    heading: ['Experience the sea'],
    headingEm: 'from on board.',
    copy: 'Boat trips and marine experiences to explore the coast and learn about sailing.',
    cta: 'Check availability',
    imageAlt: 'Coast viewed from the sea',
    listEyebrow: 'Our experiences',
    listHeading: ['Every trip,'],
    listHeadingEm: 'tailored to you.',
    listNote: 'We adapt the route, duration and pace to your group, the forecast and your plans.',
    items: [
      {
        title: 'Coastal trips',
        text: 'Explore the coast at a relaxed pace in small groups, by sail or motor.',
      },
      {
        title: 'Introduction to sailing',
        text: 'Learn basic manoeuvres, wind awareness and use of onboard electronics.',
      },
      {
        title: 'Tailored trips',
        text: 'Special days, celebrations or longer trips designed with you.',
      },
    ],
    bookEyebrow: 'How to book',
    steps: [
      'Tell us your idea: dates, group size and what you would like to do.',
      'We propose a route, schedule and price according to the forecast.',
      'We confirm and review the weather, informing you of any changes.',
    ],
    enquiryCta: 'Send an enquiry',
    seo: {
      title: 'Boat trips and marine experiences',
      description: 'Coastal trips, sailing introductions and tailored boat experiences with Embarcarte.',
    },
  },
};
