import { CanMatchFn, Routes } from '@angular/router';
import { findProduct } from './core/catalog';
import { GUIDES } from './core/guides';
import { SAMPLE_PRODUCTS } from './core/sample-products';
import { CATALOG_EN } from './core/catalog-en';
import { adminGuard, authGuard } from './core/guards';

const techExists: CanMatchFn = (_route, segments) => !!findProduct(segments[1]?.path ?? '');
const guideExists: CanMatchFn = (_route, segments) => GUIDES.some((guide) => guide.slug === segments[1]?.path);
const englishGuideExists: CanMatchFn = (_route, segments) => GUIDES.some((guide) => guide.slug === segments[2]?.path);
const sampleExists: CanMatchFn = (_route, segments) => SAMPLE_PRODUCTS.some((product) => product.slug === segments[2]?.path);
const englishSampleExists: CanMatchFn = (_route, segments) => SAMPLE_PRODUCTS.some((product) => product.slug === segments[3]?.path);
const englishTechExists: CanMatchFn = (_route, segments) => !!CATALOG_EN[segments[2]?.path ?? ''];

const LEGAL = ['aviso-legal', 'privacidad', 'cookies', 'condiciones-de-venta'] as const;

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home').then((m) => m.Home) },
  { path: 'en', data: { language: 'en' }, loadComponent: () => import('./pages/home').then((m) => m.Home) },
  { path: 'en/technology', data: { language: 'en' }, loadComponent: () => import('./pages/open-marine').then((m) => m.OpenMarine) },
  { path: 'en/experiences', data: { language: 'en' }, loadComponent: () => import('./pages/experiences').then((m) => m.Experiences) },
  { path: 'en/delivery', data: { language: 'en' }, loadComponent: () => import('./pages/transfers').then((m) => m.Transfers) },
  { path: 'en/services', data: { language: 'en' }, loadComponent: () => import('./pages/services').then((m) => m.Services) },
  { path: 'en/about', data: { page: 'about' }, loadComponent: () => import('./pages/english').then((m) => m.EnglishPage) },
  { path: 'en/technology/:slug', canMatch: [englishTechExists], loadComponent: () => import('./pages/product-detail-en').then((m) => m.ProductDetailEn) },
  { path: 'tecnologia', loadComponent: () => import('./pages/open-marine').then((m) => m.OpenMarine) },
  {
    path: 'tecnologia/:slug',
    canMatch: [techExists],
    loadComponent: () => import('./pages/product-detail').then((m) => m.ProductDetail),
  },
  { path: 'experiencias', loadComponent: () => import('./pages/experiences').then((m) => m.Experiences) },
  { path: 'traslados', loadComponent: () => import('./pages/transfers').then((m) => m.Transfers) },
  { path: 'servicios', loadComponent: () => import('./pages/services').then((m) => m.Services) },
  { path: 'sobre-nosotros', loadComponent: () => import('./pages/about').then((m) => m.About) },
  { path: 'contacto', loadComponent: () => import('./pages/contact').then((m) => m.Contact) },
  { path: 'en/contact', loadComponent: () => import('./pages/contact-en').then((m) => m.ContactEn) },
  { path: 'guias', loadComponent: () => import('./pages/guides').then((m) => m.Guides) },
  { path: 'guias/:slug', canMatch: [guideExists], loadComponent: () => import('./pages/guides').then((m) => m.Guides) },
  { path: 'en/guides', data: { language: 'en' }, loadComponent: () => import('./pages/guides').then((m) => m.Guides) },
  { path: 'en/guides/:slug', canMatch: [englishGuideExists], data: { language: 'en' }, loadComponent: () => import('./pages/guides').then((m) => m.Guides) },
  ...LEGAL.map((page) => ({
    path: page,
    data: { page },
    loadComponent: () => import('./pages/legal').then((m) => m.Legal),
  })),
  ...['legal-notice', 'privacy', 'cookies', 'terms-of-sale'].map((page) => ({ path: `en/${page}`, data: { page }, loadComponent: () => import('./pages/legal-en').then((m) => m.LegalEn) })),

  // Tienda
  { path: 'tienda', loadComponent: () => import('./shop/shop-list').then((m) => m.ShopList) },
  { path: 'tienda/muestra/:slug', canMatch: [sampleExists], loadComponent: () => import('./shop/sample-detail').then((m) => m.SampleDetail) },
  { path: 'tienda/:slug', loadComponent: () => import('./shop/shop-detail').then((m) => m.ShopDetail) },
  { path: 'en/shop', loadComponent: () => import('./shop/shop-en').then((m) => m.ShopEn) },
  { path: 'en/shop/sample/:slug', data: { language: 'en' }, canMatch: [englishSampleExists], loadComponent: () => import('./shop/sample-detail').then((m) => m.SampleDetail) },
  { path: 'en/shop/:slug', loadComponent: () => import('./shop/commerce-en').then((m) => m.ShopDetailEn) },
  { path: 'en/cart', loadComponent: () => import('./shop/commerce-en').then((m) => m.CartEn) },
  { path: 'en/login', loadComponent: () => import('./shop/commerce-en').then((m) => m.LoginEn) },
  { path: 'en/account', canActivate: [authGuard], loadComponent: () => import('./shop/commerce-en').then((m) => m.AccountEn) },
  { path: 'en/account/orders/:id', canActivate: [authGuard], loadComponent: () => import('./shop/commerce-en').then((m) => m.OrderEn) },
  { path: 'carrito', loadComponent: () => import('./shop/cart').then((m) => m.Cart) },

  // Área de cliente
  { path: 'acceso', loadComponent: () => import('./account/login').then((m) => m.Login) },
  { path: 'cuenta', canActivate: [authGuard], loadComponent: () => import('./account/account').then((m) => m.Account) },
  {
    path: 'cuenta/pedidos/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./account/order-detail').then((m) => m.OrderDetail),
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
