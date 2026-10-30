import type { LocalizedContent } from '../../../shared/models/localized';
import { GUIDE_EXTRAS } from '../content/guide-extras';
import { GUIDES_EN } from '../content/guides.en';
import { GUIDES_ES } from '../content/guides.es';

/**
 * Public guide slugs. They are the stable identity of a guide in both locales:
 * English pages keep the Spanish slug (`/en/guides/que-es-signal-k`) because
 * translated slugs need a redirect strategy that this milestone does not own.
 */
export const GUIDE_SLUGS = [
  'que-es-signal-k',
  'cartas-nauticas-sin-internet',
  'ais-barcos-receptor',
  'nmea-0183-nmea-2000',
  'anemometro-veleta-barco',
  'piloto-automatico-vela',
  'raspberry-pi-navegacion',
  'red-wifi-barco',
  'gps-ais-instrumentos-barco',
  'electronica-nautica-abierta',
  'elegir-plotter-nautico-tablet',
  'conectar-gps-signalk',
  'alimentacion-raspberry-pi-barco',
  'instalar-antena-ais-velero',
  'sensor-viento-nmea-2000',
  'diagnosticar-sensor-viento',
  'calibrar-veleta-velero',
  'cartas-mbtiles-navegacion',
  'cartas-s57-s63-diferencias',
  'actualizar-cartas-nauticas-offline',
  'alarma-ais-cpa-tcpa',
  'ais-sdr-receptor-barco',
  'integrar-sonda-signalk',
  'velocidad-sobre-agua-sobre-fondo',
  'red-nmea-2000-componentes',
  'nmea-0183-a-signalk',
  'piloto-automatico-perdida-senal',
  'planificar-traslado-velero',
  'preparar-barco-traslado-maritimo',
  'mantenimiento-electronica-nautica',
] as const;

export type GuideSlug = (typeof GUIDE_SLUGS)[number];

/** `[heading, paragraph]`, the shape the guide data has always used. */
export type GuideSection = readonly [heading: string, text: string];

export interface GuideText {
  readonly title: string;
  readonly description: string;
  readonly sections: readonly GuideSection[];
}

export interface GuideSource {
  readonly label: string;
  readonly url: string;
}

export interface GuideEntry extends GuideText {
  readonly slug: GuideSlug;
}

export interface GuideExtra {
  readonly es: readonly GuideSection[];
  readonly en: readonly GuideSection[];
  readonly sources?: readonly GuideSource[];
}

export interface Guide {
  readonly id: GuideSlug;
  readonly slug: GuideSlug;
  readonly content: LocalizedContent<GuideText>;
  /** Closing sections that only some guides have, in both languages. */
  readonly extra?: LocalizedContent<readonly GuideSection[]>;
  readonly sources?: readonly GuideSource[];
}

/** One entry per published guide, in publication order (used by prerendering too). */
export const GUIDES: readonly Guide[] = GUIDES_ES.map(({ slug, title, description, sections }) => {
  const extra = GUIDE_EXTRAS[slug];
  return {
    id: slug,
    slug,
    content: { es: { title, description, sections }, en: GUIDES_EN[slug] },
    ...(extra ? { extra: { es: extra.es, en: extra.en }, sources: extra.sources } : {}),
  };
});

export const findGuide = (slug: string): Guide | undefined => GUIDES.find((guide) => guide.slug === slug);
