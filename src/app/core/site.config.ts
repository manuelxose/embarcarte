/**
 * Datos globales del sitio. Revisa los campos marcados como pendientes antes
 * del lanzamiento: se usan en el pie, en los datos estructurados y en las
 * páginas legales.
 */
export const SITE = {
  name: 'Embarcarte',
  url: 'https://embarcarte.com',
  locale: 'es_ES',
  defaultDescription:
    'Embarcarte diseña y comercializa tecnología náutica abierta: electrónica de navegación, ' +
    'cartografía, instrumentación y piloto automático para tu embarcación con Open Marine.',
  email: 'info@embarcarte.com',
  // Pendiente: completar con los datos fiscales reales del titular.
  legal: {
    owner: 'Embarcarte',
    taxId: '',
    address: '',
    registry: '',
  },
  social: [] as string[],
};

export const absoluteUrl = (path: string): string =>
  SITE.url + (path === '/' ? '/' : path.replace(/\/$/, ''));
