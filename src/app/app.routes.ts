import { CanMatchFn, Routes } from '@angular/router';
import { findProduct } from './core/catalog';
import { adminGuard, authGuard } from './core/guards';

const techExists: CanMatchFn = (_route, segments) => !!findProduct(segments[1]?.path ?? '');

const LEGAL = ['aviso-legal', 'privacidad', 'cookies', 'condiciones-de-venta'] as const;

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home').then((m) => m.Home) },
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
  ...LEGAL.map((page) => ({
    path: page,
    data: { page },
    loadComponent: () => import('./pages/legal').then((m) => m.Legal),
  })),

  // Tienda
  { path: 'tienda', loadComponent: () => import('./shop/shop-list').then((m) => m.ShopList) },
  { path: 'tienda/:slug', loadComponent: () => import('./shop/shop-detail').then((m) => m.ShopDetail) },
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
