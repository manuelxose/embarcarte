import type { LocalizedContent } from '../../../shared/models/localized';

export interface GuidesPageContent {
  readonly listEyebrow: string;
  readonly listHeading: string;
  readonly listLead: string;
  readonly detailEyebrow: string;
  readonly backToList: string;
  readonly sourcesHeading: string;
  readonly asideHeading: string;
  readonly asideText: string;
  readonly asideCta: string;
  readonly listSeo: { readonly title: string; readonly description: string };
}

export const GUIDES_PAGE: LocalizedContent<GuidesPageContent> = {
  es: {
    listEyebrow: 'Aprende con Embarcarte',
    listHeading: 'Guías de tecnología y navegación náutica',
    listLead: 'Ideas prácticas para entender tus instrumentos y planificar una electrónica adaptada a tu barco.',
    detailEyebrow: 'Guías náuticas',
    backToList: 'Todas las guías',
    sourcesHeading: 'Fuentes y lecturas recomendadas',
    asideHeading: 'Tecnología para tu barco',
    asideText: 'Conoce los módulos de Open Marine y consulta una solución para tu instalación.',
    asideCta: 'Ver tecnología',
    listSeo: {
      title: 'Guías de navegación y electrónica náutica',
      description: 'Guías prácticas sobre instrumentos, navegación y tecnología náutica.',
    },
  },
  en: {
    listEyebrow: 'Learn with Embarcarte',
    listHeading: 'Marine technology and navigation guides',
    listLead: 'Practical information to understand your instruments and plan onboard electronics.',
    detailEyebrow: 'Marine guides',
    backToList: 'All guides',
    sourcesHeading: 'Sources and further reading',
    asideHeading: 'Technology for your boat',
    asideText: 'Discover Open Marine modules and ask about a solution for your installation.',
    asideCta: 'Explore technology',
    listSeo: {
      title: 'Marine navigation and electronics guides',
      description: 'Practical guides to marine instruments, navigation and technology.',
    },
  },
};
