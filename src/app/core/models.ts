import { LOCALE_INFO } from './i18n/locale.config';
import { DEFAULT_LOCALE } from './i18n/locale.types';
import type { Locale } from './i18n/locale.types';

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

/** What the basket stores. Identity and money are language-independent. */
export interface CartItem {
  slug: string;
  name: string;
  /** English name when the product has one; baskets saved before M03 simply lack it. */
  name_en?: string;
  price_cents: number;
  image: string;
  qty: number;
}

/** Name for the active locale. Switching language never rewrites the basket. */
export const cartItemName = (item: CartItem, locale: Locale): string =>
  locale === 'en' ? item.name_en || item.name : item.name;

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

export const formatPrice = (cents: number, locale: Locale = DEFAULT_LOCALE): string =>
  (cents / 100).toLocaleString(LOCALE_INFO[locale].intlLocale, { style: 'currency', currency: 'EUR' });

/** Fecha 'YYYY-MM-DD HH:MM:SS' de SQLite (UTC) en formato local. */
export const formatDate = (sqlDate: string, locale: Locale = DEFAULT_LOCALE): string =>
  new Date(sqlDate.replace(' ', 'T') + 'Z').toLocaleDateString(LOCALE_INFO[locale].intlLocale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
