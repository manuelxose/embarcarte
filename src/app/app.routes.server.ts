import { RenderMode, ServerRoute } from '@angular/ssr';
import { PRODUCTS } from './core/catalog';

const STATIC_PAGES = [
  '',
  'open-marine',
  'productos',
  'servicios',
  'sobre-nosotros',
  'contacto',
  'aviso-legal',
  'privacidad',
  'cookies',
];

export const serverRoutes: ServerRoute[] = [
  ...STATIC_PAGES.map((path) => ({ path, renderMode: RenderMode.Prerender as const })),
  {
    path: 'productos/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => PRODUCTS.map((p) => ({ slug: p.slug })),
  },
  // Las rutas desconocidas se renderizan en servidor para devolver un 404 real.
  { path: '**', renderMode: RenderMode.Server, status: 404 },
];
