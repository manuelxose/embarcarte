import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { LOCALE_INFO } from './i18n/locale.config';
import { DEFAULT_LOCALE } from './i18n/locale.types';
import type { Locale } from './i18n/locale.types';
import { SITE, absoluteUrl } from './site.config';

export interface SeoData {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article' | 'product';
  noindex?: boolean;
  language?: Locale;
  alternates?: { language: Locale; path: string }[];
  jsonLd?: Record<string, unknown>[];
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  set(data: SeoData): void {
    const url = absoluteUrl(data.path);
    const image = SITE.url + (data.image ?? '/og-image.png');
    const fullTitle = data.path === '/' ? data.title : `${data.title} | ${SITE.name}`;
    const locale = LOCALE_INFO[data.language ?? DEFAULT_LOCALE];
    this.document.documentElement.lang = locale.htmlLang;

    this.title.setTitle(fullTitle);
    this.tag('name', 'description', data.description);
    this.tag('name', 'robots', data.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large');
    this.tag('property', 'og:type', data.type === 'article' ? 'article' : 'website');
    this.tag('property', 'og:site_name', SITE.name);
    this.tag('property', 'og:locale', locale.ogLocale);
    this.tag('property', 'og:title', fullTitle);
    this.tag('property', 'og:description', data.description);
    this.tag('property', 'og:url', url);
    this.tag('property', 'og:image', image);
    this.tag('property', 'og:image:width', '1200');
    this.tag('property', 'og:image:height', '630');
    this.tag('name', 'twitter:card', 'summary_large_image');
    this.tag('name', 'twitter:title', fullTitle);
    this.tag('name', 'twitter:description', data.description);
    this.tag('name', 'twitter:image', image);

    this.setCanonical(url);
    this.setAlternates(data.alternates ?? []);
    this.setJsonLd(data.jsonLd ?? []);
  }

  private tag(attr: 'name' | 'property', key: string, content: string): void {
    this.meta.updateTag({ [attr]: key, content }, `${attr}="${key}"`);
  }

  private setCanonical(url: string): void {
    let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private setAlternates(alternates: NonNullable<SeoData['alternates']>): void {
    this.document.head.querySelectorAll('link[data-seo="alternate"]').forEach((el) => el.remove());
    for (const alternate of alternates) {
      const link = this.document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', LOCALE_INFO[alternate.language].htmlLang);
      link.setAttribute('href', absoluteUrl(alternate.path));
      link.setAttribute('data-seo', 'alternate');
      this.document.head.appendChild(link);
    }
  }

  private setJsonLd(items: Record<string, unknown>[]): void {
    this.document.head.querySelectorAll('script[data-seo="page"]').forEach((el) => el.remove());
    for (const item of items) {
      const script = this.document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('data-seo', 'page');
      script.textContent = JSON.stringify({ '@context': 'https://schema.org', ...item });
      this.document.head.appendChild(script);
    }
  }
}

export const breadcrumb = (items: { name: string; path: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [{ name: 'Inicio', path: '/' }, ...items].map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});
