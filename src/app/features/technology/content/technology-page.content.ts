import type { LocalizedContent } from '../../../shared/models/localized';

export interface TechnologyPageContent {
  readonly eyebrow: string;
  /** One entry per rendered line; the second line is emphasised. */
  readonly heading: readonly string[];
  readonly lead: string;
  readonly howEyebrow: string;
  readonly how: readonly string[];
  readonly modulesEyebrow: string;
  readonly modulesHeading: string;
  readonly modulesNote: string;
  readonly kinds: { readonly Software: string; readonly Hardware: string };
  readonly whyEyebrow: string;
  readonly whyHeading: readonly string[];
  readonly why: readonly string[];
  readonly shopCta: string;
  readonly demoCta: string;
  readonly imageAlt: string;
  readonly seo: { readonly title: string; readonly description: string };
}

export const TECHNOLOGY_PAGE: LocalizedContent<TechnologyPageContent> = {
  es: {
    eyebrow: '01 / Tecnología',
    heading: ['Electrónica náutica', 'sin cajas negras.'],
    lead:
      'Open Marine es nuestra plataforma abierta de navegación e instrumentación. Convierte un ordenador compacto a bordo en el centro de datos del barco y muestra cartas, instrumentos y AIS en cualquier pantalla.',
    howEyebrow: 'Cómo funciona',
    how: [
      'Sensores: GPS, sonda, anemómetro, AIS, IMU y el resto de instrumentos NMEA 0183 o NMEA 2000.',
      'Open Marine Hub: la pasarela de sensores normaliza los datos y los publica en Signal K.',
      'Servicios a bordo: motor de cartas, piloto automático y alarmas se ejecutan en local, sin Internet.',
      'Pantallas: tablets, móviles y portátiles abren el navegador por Wi-Fi, sin instalar apps.',
    ],
    modulesEyebrow: 'Módulos',
    modulesHeading: 'Software y hardware',
    modulesNote: 'Elige piezas sueltas o un sistema completo, instalado y configurado para tu embarcación.',
    kinds: { Software: 'Software de navegación', Hardware: 'Hardware a medida' },
    whyEyebrow: 'Por qué abierto',
    whyHeading: ['Tu barco, tus datos,', 'tus decisiones.'],
    why: [
      'Mezcla equipos de distintos fabricantes sin pasarelas propietarias.',
      'Sustituye o amplía piezas sin cambiar todo el sistema.',
      'Tus datos de navegación se quedan en tu barco.',
      'Software auditable, probado con un banco de simulación antes de cada versión.',
      'Cartografía exclusivamente legal: respetamos las licencias de las cartas comerciales.',
    ],
    shopCta: 'Ir a la tienda',
    demoCta: 'Solicitar una demostración',
    imageAlt: 'Electrónica y desarrollo de sistemas',
    seo: {
      title: 'Tecnología náutica abierta Open Marine',
      description:
        'Open Marine integra GPS, AIS, sonda, viento y piloto automático en un sistema abierto basado en Signal K, con cartas náuticas offline en cualquier tablet de a bordo.',
    },
  },
  en: {
    eyebrow: '01 / Technology',
    heading: ['Marine electronics', 'without black boxes.'],
    lead:
      'Open Marine is our open navigation and instrumentation platform. It turns a compact onboard computer into a data hub and displays charts, instruments and AIS on connected screens.',
    howEyebrow: 'How it works',
    how: [
      'Sensors: GPS, depth, wind, AIS, IMU and compatible NMEA instruments.',
      'Open Marine Hub: the gateway makes sensor data available through Signal K.',
      'Onboard services: charts, autopilot and alarms run locally.',
      'Screens: tablets and computers connect over Wi-Fi using a browser.',
    ],
    modulesEyebrow: 'Modules',
    modulesHeading: 'Software and hardware',
    modulesNote: 'Choose individual modules or a complete system configured for your vessel.',
    kinds: { Software: 'Navigation software', Hardware: 'Custom hardware' },
    whyEyebrow: 'Why open',
    whyHeading: ['Your boat, your data,', 'your decisions.'],
    why: [
      'Integrate compatible equipment from different manufacturers.',
      'Replace or expand components without changing the entire system.',
      'Your navigation data remains on your boat.',
      'Auditable software tested using a simulation bench.',
      'Use authorised chart data and respect commercial licences.',
    ],
    shopCta: 'Visit the shop',
    demoCta: 'Request a demonstration',
    imageAlt: 'Electronics and systems development',
    seo: {
      title: 'Open Marine technology',
      description: 'Open Marine integrates navigation instruments and local charts using Signal K.',
    },
  },
};
