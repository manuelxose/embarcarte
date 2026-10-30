import type { RouteId } from '../../../core/i18n/locale-routes';
import type { LocalizedContent } from '../../../shared/models/localized';

interface HomeLine {
  readonly title: string;
  readonly text: string;
  readonly cta: string;
  readonly routeId: RouteId;
  readonly image: string;
  readonly icon: string;
}

interface HomeProduct {
  readonly title: string;
  readonly description: string;
  readonly image: string;
  readonly routeId: RouteId;
  readonly slug?: string;
}

export interface HomeContent {
  readonly eyebrow: string;
  /** One entry per rendered line: the design uses forced line breaks. */
  readonly heading: readonly string[];
  readonly intro: string;
  readonly primaryCta: string;
  readonly secondaryCta: string;
  readonly servicesLabel: string;
  readonly lines: readonly HomeLine[];
  readonly productsEyebrow: string;
  readonly productsHeading: readonly string[];
  readonly productsIntro: string;
  readonly productsCta: string;
  readonly products: readonly HomeProduct[];
  readonly note: readonly string[];
  readonly guidesEyebrow: string;
  readonly guidesHeading: string;
  readonly seo: { readonly title: string; readonly description: string };
}

const ICONS = ['⚙', '⛵', '♧'] as const;

export const HOME_CONTENT: LocalizedContent<HomeContent> = {
  es: {
    eyebrow: 'Tecnología · Experiencias · Traslados',
    heading: ['Navega con', 'más posibilidades'],
    intro:
      'Desarrollamos soluciones electrónicas náuticas y conectamos la tecnología con la experiencia real de navegar.',
    primaryCta: 'Explorar tecnología',
    secondaryCta: 'Nuestros servicios',
    servicesLabel: 'Nuestros servicios',
    lines: [
      {
        title: 'Tecnología náutica',
        text: 'Sensores, instrumentación y pilotos automáticos con sistemas abiertos y protocolos estándar.',
        cta: 'Ver tecnología',
        routeId: 'technology',
        image: '/images/home-tech.webp',
        icon: ICONS[0],
      },
      {
        title: 'Experiencias náuticas',
        text: 'Salidas por mar para disfrutar del entorno desde otra perspectiva.',
        cta: 'Ver experiencias',
        routeId: 'experiences',
        image: '/images/home-experiences.webp',
        icon: ICONS[1],
      },
      {
        title: 'Traslados de embarcaciones',
        text: 'Transporte seguro y eficiente de barcos de un puerto a otro por vía marítima.',
        cta: 'Solicitar presupuesto',
        routeId: 'delivery',
        image: '/images/home-transfers.webp',
        icon: ICONS[2],
      },
    ],
    productsEyebrow: 'Productos destacados',
    productsHeading: ['Instrumentación náutica', 'de última generación'],
    productsIntro: 'Soluciones abiertas diseñadas para integrarse con los sistemas que ya conoces.',
    productsCta: 'Ver toda la tecnología',
    products: [
      { title: 'Instrumentación', description: 'Datos · Precisión · Protocolo abierto', image: '/images/home-anemometro.webp', routeId: 'technology' },
      { title: 'Sensores de viento', description: 'Dirección del viento · Integración', image: '/images/home-veleta.webp', routeId: 'technology' },
      { title: 'Piloto automático', description: 'Control inteligente · Abierto', image: '/images/home-piloto.webp', routeId: 'technologyDetail', slug: 'piloto-automatico' },
    ],
    note: ['Tecnología abierta', 'para un futuro', 'sin límites'],
    guidesEyebrow: 'Conocimiento a bordo',
    guidesHeading: 'Guías para navegar mejor',
    seo: {
      title: 'Embarcarte - Tecnología abierta. Libertad en el mar.',
      description: 'Tecnología náutica abierta, experiencias en el mar y traslado de embarcaciones.',
    },
  },
  en: {
    eyebrow: 'Technology · Experiences · Boat delivery',
    heading: ['Sail with', 'more possibilities'],
    intro: 'We develop marine electronics and connect technology with the real experience of being at sea.',
    primaryCta: 'Explore technology',
    secondaryCta: 'Our services',
    servicesLabel: 'Our services',
    lines: [
      {
        title: 'Marine technology',
        text: 'Sensors, instruments and autopilots using open systems and standard protocols.',
        cta: 'Explore technology',
        routeId: 'technology',
        image: '/images/home-tech.webp',
        icon: ICONS[0],
      },
      {
        title: 'Marine experiences',
        text: 'Trips at sea to enjoy the coast from another perspective.',
        cta: 'Explore experiences',
        routeId: 'experiences',
        image: '/images/home-experiences.webp',
        icon: ICONS[1],
      },
      {
        title: 'Boat delivery',
        text: 'Carefully planned vessel deliveries between ports.',
        cta: 'Request a quote',
        routeId: 'delivery',
        image: '/images/home-transfers.webp',
        icon: ICONS[2],
      },
    ],
    productsEyebrow: 'Featured products',
    productsHeading: ['Marine instruments', 'for your boat'],
    productsIntro: 'Open solutions designed to work with the systems you already know.',
    productsCta: 'Explore technology',
    products: [
      { title: 'Instruments', description: 'Data · Precision · Open protocol', image: '/images/home-anemometro.webp', routeId: 'technology' },
      { title: 'Wind sensors', description: 'Wind direction · Integration', image: '/images/home-veleta.webp', routeId: 'technology' },
      { title: 'Autopilot', description: 'Intelligent control · Open', image: '/images/home-piloto.webp', routeId: 'technologyDetail', slug: 'piloto-automatico' },
    ],
    note: ['Open technology', 'for a future', 'without limits'],
    guidesEyebrow: 'Knowledge on board',
    guidesHeading: 'Guides for better navigation',
    seo: {
      title: 'Open marine technology and boat services',
      description: 'Open marine electronics, experiences at sea and boat delivery with Embarcarte.',
    },
  },
};
