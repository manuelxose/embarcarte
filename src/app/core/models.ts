export interface User {
  id: number;
  email: string;
  name: string;
  role: 'customer' | 'admin';
  phone: string;
  address: string;
  created_at: string;
}

export interface ShopProduct {
  id: number;
  slug: string;
  name: string;
  category: string;
  summary: string;
  description: string;
  price_cents: number;
  stock: number;
  image: string;
  name_en: string;
  category_en: string;
  summary_en: string;
  description_en: string;
}

export interface AdminProduct extends ShopProduct {
  active: number;
  created_at: string;
  updated_at: string;
}

export type OrderStatus = 'pendiente' | 'pagado' | 'enviado' | 'completado' | 'cancelado';

export interface OrderSummary {
  id: number;
  status: OrderStatus;
  total_cents: number;
  payment_method: 'transferencia' | 'tarjeta';
  created_at: string;
  customer?: string;
  email?: string;
}

export interface Order extends OrderSummary {
  user_id: number;
  shipping_name: string;
  shipping_address: string;
  shipping_phone: string;
  notes: string;
  items: { product_id: number | null; name: string; unit_cents: number; qty: number }[];
}

export const ORDER_STATUSES: OrderStatus[] = ['pendiente', 'pagado', 'enviado', 'completado', 'cancelado'];

export const formatPrice = (cents: number): string =>
  (cents / 100).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });

/** Fecha 'YYYY-MM-DD HH:MM:SS' de SQLite (UTC) en formato local. */
export const formatDate = (sqlDate: string): string =>
  new Date(sqlDate.replace(' ', 'T') + 'Z').toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
