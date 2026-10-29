import { CanMatchFn, Routes } from '@angular/router';
import { findProduct } from './core/catalog';

const productExists: CanMatchFn = (_route, segments) => !!findProduct(segments[1]?.path ?? '');

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home').then((m) => m.Home) },
  { path: 'open-marine', loadComponent: () => import('./pages/open-marine').then((m) => m.OpenMarine) },
  { path: 'productos', loadComponent: () => import('./pages/products').then((m) => m.Products) },
  {
    path: 'productos/:slug',
    canMatch: [productExists],
    loadComponent: () => import('./pages/product-detail').then((m) => m.ProductDetail),
  },
  { path: 'servicios', loadComponent: () => import('./pages/services').then((m) => m.Services) },
  { path: 'sobre-nosotros', loadComponent: () => import('./pages/about').then((m) => m.About) },
  { path: 'contacto', loadComponent: () => import('./pages/contact').then((m) => m.Contact) },
  ...(['aviso-legal', 'privacidad', 'cookies'] as const).map((page) => ({
    path: page,
    data: { page },
    loadComponent: () => import('./pages/legal').then((m) => m.Legal),
  })),
  { path: '**', loadComponent: () => import('./pages/not-found').then((m) => m.NotFound) },
];
