import { CanMatchFn, Routes } from '@angular/router';
import { LOCALIZED_ROUTES } from './core/i18n/locale-routes';
import type { RouteId } from './core/i18n/locale-routes';
import { SAMPLE_PRODUCTS } from './core/sample-products';
import { adminGuard, authGuard } from './core/guards';
import { findGuide } from './features/guides/models/guides';
import { findTechnology } from './features/technology/models/technology';

/** Path of a semantic route, so public URLs are written once, in the registry. */
const path = (id: RouteId, locale: 'es' | 'en'): string => LOCALIZED_ROUTES[id][locale];

const technologyExists: CanMatchFn = (_route, segments) => !!findTechnology(segments.at(-1)?.path ?? '');
const guideExists: CanMatchFn = (_route, segments) => !!findGuide(segments.at(-1)?.path ?? '');
const sampleExists: CanMatchFn = (_route, segments) => SAMPLE_PRODUCTS.some((product) => product.slug === segments.at(-1)?.path);

export const routes: Routes = [
  // Páginas compartidas: un componente atiende las dos lenguas.
  { path: path('home', 'es'), loadComponent: () => import('./features/home/home').then((m) => m.Home) },
  { path: path('home', 'en'), loadComponent: () => import('./features/home/home').then((m) => m.Home) },
  { path: path('technology', 'es'), loadComponent: () => import('./features/technology/technology').then((m) => m.Technology) },
  { path: path('technology', 'en'), loadComponent: () => import('./features/technology/technology').then((m) => m.Technology) },
  {
    path: path('technologyDetail', 'es'),
    canMatch: [technologyExists],
    loadComponent: () => import('./features/technology/product-detail').then((m) => m.ProductDetail),
  },
  {
    path: path('technologyDetail', 'en'),
    canMatch: [technologyExists],
    loadComponent: () => import('./features/technology/product-detail').then((m) => m.ProductDetail),
  },
  { path: path('experiences', 'es'), loadComponent: () => import('./features/experiences/experiences').then((m) => m.Experiences) },
  { path: path('experiences', 'en'), loadComponent: () => import('./features/experiences/experiences').then((m) => m.Experiences) },
  { path: path('delivery', 'es'), loadComponent: () => import('./features/delivery/delivery').then((m) => m.Delivery) },
  { path: path('delivery', 'en'), loadComponent: () => import('./features/delivery/delivery').then((m) => m.Delivery) },
  { path: path('services', 'es'), loadComponent: () => import('./features/services/services').then((m) => m.Services) },
  { path: path('services', 'en'), loadComponent: () => import('./features/services/services').then((m) => m.Services) },
  { path: path('about', 'es'), loadComponent: () => import('./features/about/about').then((m) => m.About) },
  { path: path('about', 'en'), loadComponent: () => import('./features/about/about').then((m) => m.About) },
  { path: path('contact', 'es'), loadComponent: () => import('./features/contact/contact').then((m) => m.Contact) },
  { path: path('contact', 'en'), loadComponent: () => import('./features/contact/contact').then((m) => m.Contact) },
  { path: path('guides', 'es'), loadComponent: () => import('./features/guides/guides').then((m) => m.Guides) },
  { path: path('guides', 'en'), loadComponent: () => import('./features/guides/guides').then((m) => m.Guides) },
  {
    path: path('guideDetail', 'es'),
    canMatch: [guideExists],
    loadComponent: () => import('./features/guides/guides').then((m) => m.Guides),
  },
  {
    path: path('guideDetail', 'en'),
    canMatch: [guideExists],
    loadComponent: () => import('./features/guides/guides').then((m) => m.Guides),
  },

  // Legal: una presentación, contenido por idioma.
  ...(['legalNotice', 'privacy', 'cookies', 'termsOfSale'] as const).flatMap((id) => [
    { path: path(id, 'es'), data: { page: id }, loadComponent: () => import('./features/legal/legal').then((m) => m.Legal) },
    { path: path(id, 'en'), data: { page: id }, loadComponent: () => import('./features/legal/legal').then((m) => m.Legal) },
  ]),

  // Tienda: la traducción completa de la compra sigue siendo de M03.
  { path: path('shop', 'es'), loadComponent: () => import('./shop/shop-list').then((m) => m.ShopList) },
  { path: path('shopSample', 'es'), canMatch: [sampleExists], loadComponent: () => import('./shop/sample-detail').then((m) => m.SampleDetail) },
  { path: path('shopDetail', 'es'), loadComponent: () => import('./shop/shop-detail').then((m) => m.ShopDetail) },
  { path: path('shop', 'en'), loadComponent: () => import('./shop/shop-en').then((m) => m.ShopEn) },
  {
    path: path('shopSample', 'en'),
    data: { language: 'en' },
    canMatch: [sampleExists],
    loadComponent: () => import('./shop/sample-detail').then((m) => m.SampleDetail),
  },
  { path: path('shopDetail', 'en'), loadComponent: () => import('./shop/commerce-en').then((m) => m.ShopDetailEn) },
  { path: path('cart', 'es'), loadComponent: () => import('./shop/cart').then((m) => m.Cart) },
  { path: path('cart', 'en'), loadComponent: () => import('./shop/commerce-en').then((m) => m.CartEn) },

  // Área de cliente
  { path: path('login', 'es'), loadComponent: () => import('./account/login').then((m) => m.Login) },
  { path: path('login', 'en'), loadComponent: () => import('./shop/commerce-en').then((m) => m.LoginEn) },
  { path: path('account', 'es'), canActivate: [authGuard], loadComponent: () => import('./account/account').then((m) => m.Account) },
  { path: path('account', 'en'), canActivate: [authGuard], loadComponent: () => import('./shop/commerce-en').then((m) => m.AccountEn) },
  {
    path: `${path('account', 'es')}/pedidos/:id`,
    canActivate: [authGuard],
    loadComponent: () => import('./account/order-detail').then((m) => m.OrderDetail),
  },
  {
    path: `${path('account', 'en')}/orders/:id`,
    canActivate: [authGuard],
    loadComponent: () => import('./shop/commerce-en').then((m) => m.OrderEn),
  },

  // Administración
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadComponent: () => import('./admin/admin-layout').then((m) => m.AdminLayout),
    children: [
      { path: '', loadComponent: () => import('./admin/admin-dashboard').then((m) => m.AdminDashboard) },
      { path: 'pedidos', loadComponent: () => import('./admin/admin-orders').then((m) => m.AdminOrders) },
      { path: 'pedidos/:id', loadComponent: () => import('./admin/admin-order').then((m) => m.AdminOrder) },
      { path: 'productos', loadComponent: () => import('./admin/admin-products').then((m) => m.AdminProducts) },
      { path: 'productos/:id', loadComponent: () => import('./admin/admin-product-edit').then((m) => m.AdminProductEdit) },
      { path: 'clientes', loadComponent: () => import('./admin/admin-customers').then((m) => m.AdminCustomers) },
      { path: 'mensajes', loadComponent: () => import('./admin/admin-messages').then((m) => m.AdminMessages) },
    ],
  },

  // Direcciones antiguas
  { path: 'open-marine', redirectTo: '/tecnologia', pathMatch: 'full' },
  { path: 'productos', redirectTo: '/tecnologia', pathMatch: 'full' },
  { path: 'productos/:slug', redirectTo: ({ params }) => `/tecnologia/${params['slug']}` },

  { path: '**', loadComponent: () => import('./pages/not-found').then((m) => m.NotFound) },
];
