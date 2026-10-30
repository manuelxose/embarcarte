/**
 * Shared interface strings (navigation, chrome, common actions, accessibility
 * labels and generic errors). Editorial and product copy stays with the
 * content modules; only framework-level UI lives here.
 *
 * Placeholders use `{name}` and are interpolated by `translate()`.
 */
export const es = {
  'a11y.skipToContent': 'Saltar al contenido',
  'a11y.mainNavigation': 'Navegación principal',
  'a11y.openMenu': 'Abrir menú',
  'a11y.closeMenu': 'Cerrar menú',
  'a11y.switchLanguage': 'Ver la web en {language}',
  'nav.technology': 'Tecnología',
  'nav.shop': 'Tienda',
  'nav.experiences': 'Experiencias',
  'nav.delivery': 'Traslados',
  'nav.about': 'Nosotros',
  'nav.guides': 'Guías',
  'header.contact': 'Hablemos',
  'footer.explore': 'Qué hacemos',
  'footer.shop': 'Tienda',
  'footer.legal': 'Legal',
  'footer.language': 'Sitio en español',
  'common.viewDetails': 'Ver detalles',
  'common.backHome': 'Volver al inicio',
  'error.generic': 'No se ha podido completar la operación. Inténtalo de nuevo.',
} as const;
