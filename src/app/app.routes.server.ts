import { RenderMode, ServerRoute } from '@angular/ssr';
import { PRODUCTS } from './core/catalog';

const STATIC_PAGES = [
  '',
  'tecnologia',
  'experiencias',
  'traslados',
  'servicios',
  'sobre-nosotros',
  'contacto',
  'aviso-legal',
  'privacidad',
  'cookies',
  'condiciones-de-venta',
];

export const serverRoutes: ServerRoute[] = [
  ...STATIC_PAGES.map((path) => ({ path, renderMode: RenderMode.Prerender as const })),
  {
    path: 'tecnologia/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => PRODUCTS.map((p) => ({ slug: p.slug })),
  },
  // La tienda cambia desde el panel: se renderiza en servidor en cada petición para Google.
  { path: 'tienda', renderMode: RenderMode.Server },
  { path: 'tienda/:slug', renderMode: RenderMode.Server },
  // Zonas privadas: solo en el navegador (dependen de la sesión).
  { path: 'carrito', renderMode: RenderMode.Client },
  { path: 'acceso', renderMode: RenderMode.Client },
  { path: 'cuenta', renderMode: RenderMode.Client },
  { path: 'cuenta/**', renderMode: RenderMode.Client },
  { path: 'admin', renderMode: RenderMode.Client },
  { path: 'admin/**', renderMode: RenderMode.Client },
  { path: 'open-marine', renderMode: RenderMode.Server, status: 301 },
  { path: 'productos', renderMode: RenderMode.Server, status: 301 },
  { path: 'productos/**', renderMode: RenderMode.Server, status: 301 },
  // Las rutas desconocidas se renderizan en servidor para devolver un 404 real.
  { path: '**', renderMode: RenderMode.Server, status: 404 },
];
