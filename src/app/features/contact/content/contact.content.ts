import type { LocalizedContent } from '../../../shared/models/localized';

export interface ContactContent {
  readonly eyebrow: string;
  /** Two display lines, matching the fixed line break of the design. */
  readonly heading: readonly string[];
  readonly lead: string;
  /** Sentence that introduces the mailto link. */
  readonly emailPrefix: string;
  readonly note: string;
  readonly seo: { readonly title: string; readonly description: string };
}

export const CONTACT_PAGE: LocalizedContent<ContactContent> = {
  es: {
    eyebrow: 'Hablemos',
    heading: ['¿Tienes un proyecto', 'o un rumbo en mente?'],
    lead:
      'Cuéntanos qué necesitas. Tanto si buscas integrar un sensor como si estás preparando un traslado, estaremos ' +
      'encantados de escucharte.',
    emailPrefix: 'También puedes escribirnos a',
    note: 'Respondemos en 48 horas laborables.',
    seo: {
      title: 'Contacto',
      description: 'Habla con Embarcarte sobre electrónica náutica, experiencias en el mar o traslados de embarcaciones.',
    },
  },
  en: {
    eyebrow: 'Get in touch',
    heading: ['Tell us about your boat'],
    lead: 'Ask about marine electronics, experiences or boat delivery.',
    emailPrefix: 'You can also email',
    note: 'We reply within 48 working hours.',
    seo: {
      title: 'Contact',
      description: 'Contact Embarcarte about marine electronics, experiences and boat delivery.',
    },
  },
};
