import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, effect, inject, signal } from '@angular/core';
import { CartItem, ShopProduct } from './models';

const STORAGE_KEY = 'emb_cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly items = signal<CartItem[]>(this.restore());
  readonly count = computed(() => this.items().reduce((n, i) => n + i.qty, 0));
  readonly totalCents = computed(() => this.items().reduce((n, i) => n + i.qty * i.price_cents, 0));

  constructor() {
    effect(() => {
      const items = this.items();
      if (!this.browser) return;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch {
        // Almacenamiento no disponible (modo privado): el carrito dura lo que la pestaña.
      }
    });
  }

  add(product: ShopProduct, qty = 1): void {
    this.items.update((items) => {
      const existing = items.find((i) => i.slug === product.slug);
      if (existing) {
        return items.map((i) => (i.slug === product.slug ? { ...i, qty: Math.min(i.qty + qty, 99) } : i));
      }
      const { slug, name, name_en, price_cents, image } = product;
      return [...items, { slug, name, name_en: name_en || '', price_cents, image, qty }];
    });
  }

  setQty(slug: string, qty: number): void {
    if (qty < 1) {
      this.remove(slug);
      return;
    }
    this.items.update((items) => items.map((i) => (i.slug === slug ? { ...i, qty: Math.min(qty, 99) } : i)));
  }

  remove(slug: string): void {
    this.items.update((items) => items.filter((i) => i.slug !== slug));
  }

  clear(): void {
    this.items.set([]);
  }

  private restore(): CartItem[] {
    if (!this.browser) return [];
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
}
