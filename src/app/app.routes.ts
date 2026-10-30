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

  // Tienda: una presentación por página, localizada desde el registro de rutas.
  { path: path('shop', 'es'), loadComponent: () => import('./features/shop/shop-list').then((m) => m.ShopList) },
  { path: path('shop', 'en'), loadComponent: () => import('./features/shop/shop-list').then((m) => m.ShopList) },
  {
    path: path('shopSample', 'es'),
    canMatch: [sampleExists],
    loadComponent: () => import('./features/shop/sample-detail').then((m) => m.SampleDetail),
  },
  {
    path: path('shopSample', 'en'),
    canMatch: [sampleExists],
    loadComponent: () => import('./features/shop/sample-detail').then((m) => m.SampleDetail),
  },
  { path: path('shopDetail', 'es'), loadComponent: () => import('./features/shop/shop-detail').then((m) => m.ShopDetail) },
  { path: path('shopDetail', 'en'), loadComponent: () => import('./features/shop/shop-detail').then((m) => m.ShopDetail) },
  { path: path('cart', 'es'), loadComponent: () => import('./features/shop/cart').then((m) => m.Cart) },
  { path: path('cart', 'en'), loadComponent: () => import('./features/shop/cart').then((m) => m.Cart) },

  // Área de cliente
  { path: path('login', 'es'), loadComponent: () => import('./features/account/login').then((m) => m.Login) },
  { path: path('login', 'en'), loadComponent: () => import('./features/account/login').then((m) => m.Login) },
  {
    path: path('account', 'es'),
    canActivate: [authGuard],
    loadComponent: () => import('./features/account/account').then((m) => m.Account),
  },
  {
    path: path('account', 'en'),
    canActivate: [authGuard],
    loadComponent: () => import('./features/account/account').then((m) => m.Account),
  },
  {
    path: path('orderDetail', 'es'),
    canActivate: [authGuard],
    loadComponent: () => import('./features/account/order-detail').then((m) => m.OrderDetail),
  },
  {
    path: path('orderDetail', 'en'),
    canActivate: [authGuard],
    loadComponent: () => import('./features/account/order-detail').then((m) => m.OrderDetail),
  },

  // Administración: solo en español, decisión documentada en M03-COMMERCE-SEO-DELIVERY.md.
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadComponent: () => import('./features/admin/admin-layout').then((m) => m.AdminLayout),
    children: [
      { path: '', loadComponent: () => import('./features/admin/admin-dashboard').then((m) => m.AdminDashboard) },
      { path: 'pedidos', loadComponent: () => import('./features/admin/admin-orders').then((m) => m.AdminOrders) },
      { path: 'pedidos/:id', loadComponent: () => import('./features/admin/admin-order').then((m) => m.AdminOrder) },
      { path: 'productos', loadComponent: () => import('./features/admin/admin-products').then((m) => m.AdminProducts) },
      { path: 'productos/:id', loadComponent: () => import('./features/admin/admin-product-edit').then((m) => m.AdminProductEdit) },
      { path: 'clientes', loadComponent: () => import('./features/admin/admin-customers').then((m) => m.AdminCustomers) },
      { path: 'mensajes', loadComponent: () => import('./features/admin/admin-messages').then((m) => m.AdminMessages) },
    ],
  },

  // Direcciones antiguas
  { path: 'open-marine', redirectTo: '/tecnologia', pathMatch: 'full' },
  { path: 'productos', redirectTo: '/tecnologia', pathMatch: 'full' },
  { path: 'productos/:slug', redirectTo: ({ params }) => `/tecnologia/${params['slug']}` },

  { path: '**', loadComponent: () => import('./features/not-found/not-found').then((m) => m.NotFound) },
];
