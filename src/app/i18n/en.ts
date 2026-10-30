import type { es } from './es';

/** Typed as a complete record, so a key added to `es` fails to compile until it is translated here. */
export const en: Record<keyof typeof es, string> = {
  'a11y.skipToContent': 'Skip to content',
  'a11y.mainNavigation': 'Main navigation',
  'a11y.openMenu': 'Open menu',
  'a11y.closeMenu': 'Close menu',
  'a11y.switchLanguage': 'View the site in {language}',
  'nav.technology': 'Technology',
  'nav.shop': 'Shop',
  'nav.experiences': 'Experiences',
  'nav.delivery': 'Boat delivery',
  'nav.about': 'About',
  'nav.guides': 'Guides',
  'header.contact': 'Contact',
  'footer.explore': 'Explore',
  'footer.shop': 'Shop',
  'footer.legal': 'Legal',
  'footer.language': 'Spanish site',
  'common.viewDetails': 'View details',
  'common.backHome': 'Back to home',
  'error.generic': 'We could not complete the request. Please try again.',
};
