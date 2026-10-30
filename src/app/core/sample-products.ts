import type { Locale } from './i18n/locale.types';
import { DEFAULT_LOCALE } from './i18n/locale.types';

export interface SampleProduct {
  slug: string;
  category: string;
  categoryEn: string;
  name: string;
  nameEn: string;
  summary: string;
  summaryEn: string;
  image: string;
}

// Sample listings are separate from the sellable inventory managed by the server.
export const SAMPLE_PRODUCTS: SampleProduct[] = [
  { slug: 'anemometro', category: 'Viento', categoryEn: 'Wind', name: 'Anemómetro náutico', nameEn: 'Marine anemometer', summary: 'Sensor de velocidad del viento para instrumentación de a bordo.', summaryEn: 'Wind-speed sensor for onboard instruments.', image: '/images/home-anemometro.webp' },
  { slug: 'veleta', category: 'Viento', categoryEn: 'Wind', name: 'Veleta náutica', nameEn: 'Marine wind vane', summary: 'Sensor de dirección del viento para sistemas compatibles.', summaryEn: 'Wind-direction sensor for compatible systems.', image: '/images/home-veleta.webp' },
  { slug: 'piloto', category: 'Piloto automático', categoryEn: 'Autopilot', name: 'Controlador de piloto automático', nameEn: 'Autopilot controller', summary: 'Controlador para una instalación adaptada al sistema de gobierno.', summaryEn: 'Controller for an installation adapted to the steering system.', image: '/images/home-piloto.webp' },
  { slug: 'gps', category: 'Navegación', categoryEn: 'Navigation', name: 'Receptor GPS', nameEn: 'GPS receiver', summary: 'Receptor de posición para sistemas de navegación compatibles.', summaryEn: 'Position receiver for compatible navigation systems.', image: '' },
  { slug: 'ais', category: 'Navegación', categoryEn: 'Navigation', name: 'Receptor AIS', nameEn: 'AIS receiver', summary: 'Recepción de mensajes AIS para visualizar embarcaciones equipadas.', summaryEn: 'Receives AIS messages to display equipped vessels.', image: '' },
  { slug: 'sonda', category: 'Sensores', categoryEn: 'Sensors', name: 'Sonda de profundidad', nameEn: 'Depth sounder', summary: 'Instrumentación de profundidad para instalaciones compatibles.', summaryEn: 'Depth instrumentation for compatible installations.', image: '' },
  { slug: 'corredera', category: 'Sensores', categoryEn: 'Sensors', name: 'Corredera náutica', nameEn: 'Boat speed log', summary: 'Sensor de velocidad del barco a través del agua.', summaryEn: 'Measures boat speed through the water.', image: '' },
  { slug: 'adaptador-nmea', category: 'Conectividad', categoryEn: 'Connectivity', name: 'Adaptador NMEA', nameEn: 'NMEA adapter', summary: 'Interfaz de conexión para instrumentos y pasarelas compatibles.', summaryEn: 'Interface for compatible instruments and gateways.', image: '' },
  { slug: 'antena-ais', category: 'Conectividad', categoryEn: 'Connectivity', name: 'Antena AIS', nameEn: 'AIS antenna', summary: 'Antena de recepción para un sistema AIS compatible.', summaryEn: 'Receiving antenna for a compatible AIS system.', image: '' },
  { slug: 'hub', category: 'Open Marine', categoryEn: 'Open Marine', name: 'Open Marine Hub', nameEn: 'Open Marine Hub', summary: 'Ordenador de navegación para integrar datos y servicios a bordo.', summaryEn: 'Navigation computer for onboard data and services.', image: '' },
];

export interface SampleText {
  readonly name: string;
  readonly category: string;
  readonly summary: string;
}

export const sampleText = (product: SampleProduct, locale: Locale): SampleText =>
  locale === 'en'
    ? { name: product.nameEn, category: product.categoryEn, summary: product.summaryEn }
    : { name: product.name, category: product.category, summary: product.summary };

export function searchSamples(query: string, locale: Locale = DEFAULT_LOCALE): SampleProduct[] {
  const normalize = (value: string) => value.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
  const term = normalize(query.trim());
  return SAMPLE_PRODUCTS.filter((p) => {
    const text = sampleText(p, locale);
    return normalize(`${text.name} ${text.category} ${text.summary}`).includes(term);
  });
}
