import type { LocalizedContent } from '../../../shared/models/localized';

interface AboutSection {
  /** The English page published these blocks as card titles; Spanish runs them as prose. */
  readonly heading?: string;
  readonly text: string;
}

export interface AboutContent {
  readonly eyebrow: string;
  readonly heading: readonly string[];
  readonly headingEm?: string;
  readonly lead: string;
  readonly workEyebrow: string;
  readonly sections: readonly AboutSection[];
  readonly manifestoEyebrow: string;
  readonly manifestoHeading: readonly string[];
  readonly manifestoHeadingEm?: string;
  readonly manifestoText: string;
  readonly manifestoCta: string;
  readonly seo: { readonly title: string; readonly description: string };
}

export const ABOUT_PAGE: LocalizedContent<AboutContent> = {
  es: {
    eyebrow: 'Nosotros',
    heading: ['Más conexión con tu barco.'],
    headingEm: 'Menos límites.',
    lead:
      'En Embarcarte creemos que la tecnología náutica debe ayudarte a navegar, no complicarte la vida. Unimos ' +
      'desarrollo técnico, pasión por el mar y servicios pensados desde la experiencia real a bordo.',
    workEyebrow: 'Cómo trabajamos',
    sections: [
      {
        text:
          'Cada sistema se prueba primero en un banco de simulación que reproduce viento, corriente, AIS y fallos de ' +
          'sensores. Solo después lo llevamos al barco. Así reducimos sorpresas en el agua.',
      },
      {
        text:
          'Apostamos por estándares abiertos como Signal K y NMEA para que tu inversión no dependa de un único ' +
          'fabricante, y por la seguridad por diseño: el piloto automático incluye parada de emergencia física y ' +
          'vigilancia permanente de la comunicación.',
      },
      {
        text:
          'Además de la tecnología, organizamos experiencias en el mar y trasladamos embarcaciones entre puertos, con la ' +
          'misma forma de hacer las cosas: planificación cuidada y comunicación clara.',
      },
    ],
    manifestoEyebrow: 'Nuestra filosofía',
    manifestoHeading: ['La mejor tecnología', 'es la que te deja'],
    manifestoHeadingEm: 'mirar al horizonte.',
    manifestoText: 'Diseñamos para conectar sistemas, compartir conocimiento y dar más control a quienes navegan.',
    manifestoCta: 'Hablemos',
    seo: {
      title: 'Sobre Embarcarte',
      description:
        'Embarcarte une tecnología náutica abierta, experiencias en el mar y traslados de embarcaciones, con la plataforma Open Marine.',
    },
  },
  en: {
    eyebrow: 'About us',
    heading: ['More connection with your boat.'],
    headingEm: 'Fewer limits.',
    lead:
      'We combine technical development, a passion for the sea and services informed by life on board.',
    workEyebrow: 'How we work',
    sections: [
      {
        heading: 'Open technology',
        text: 'We use open standards such as Signal K and NMEA to help integrate compatible equipment.',
      },
      {
        heading: 'Built around the vessel',
        text: 'We plan, integrate and test solutions for the equipment and requirements of each boat.',
      },
      {
        heading: 'Experience at sea',
        text: 'We also arrange marine experiences and boat deliveries with careful planning and clear communication.',
      },
    ],
    manifestoEyebrow: 'Our philosophy',
    manifestoHeading: ['The best technology', 'is the one that lets you'],
    manifestoHeadingEm: 'look at the horizon.',
    manifestoText:
      'We design to connect systems, share knowledge and give more control to those who sail.',
    manifestoCta: 'Get in touch',
    seo: {
      title: 'More connection with your boat',
      description:
        'We combine technical development, a passion for the sea and services informed by life on board.',
    },
  },
};
