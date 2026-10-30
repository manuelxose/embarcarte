import { Component, computed, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocaleService } from '../../core/i18n/locale.service';
import { TranslationService } from '../../core/i18n/translation.service';
import { SeoService, breadcrumb, pageSeo } from '../../core/seo.service';
import { SITE, absoluteUrl } from '../../core/site.config';
import { localized } from '../../shared/models/localized';
import { TECHNOLOGY_DETAIL } from './content/technology-detail.content';
import { TECHNOLOGY, findTechnology } from './models/technology';
import type { TechnologyProduct } from './models/technology';

const summarize = (text: string, max = 158): string =>
  text.length <= max ? text : text.slice(0, text.lastIndexOf(' ', max - 1)).replace(/[,.;:]$/, '') + '…';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink],
  template: `
    <section class="page-hero">
      <div class="wrap">
        <nav class="crumbs" [attr.aria-label]="i18n.t('a11y.breadcrumb')">
          <a [routerLink]="locale.url('home')">{{ i18n.t('nav.home') }}</a> /
          <a [routerLink]="locale.url('technology')">{{ i18n.t('nav.technology') }}</a> /
          <span>{{ text().name }}</span>
        </nav>
        <p class="eyebrow">{{ product().kind }}</p>
        <h1 class="display h-xl">{{ text().name }}</h1>
        <p class="lead">{{ text().tagline ?? text().description }}</p>
      </div>
    </section>

    <section class="section-pad">
      <div class="wrap detail-grid">
        <div class="prose">
          @if (text().tagline) {
            <p>{{ text().description }}</p>
          }
          <h2>{{ c().features }}</h2>
          <ul class="checklist">
            @for (feature of text().features; track feature) {
              <li>{{ feature }}</li>
            }
          </ul>
          @if (text().audience; as audience) {
            <h2>{{ c().audience }}</h2>
            <p>{{ audience }}</p>
          }
        </div>
        <aside class="panel">
          @if (text().specs; as specs) {
            <h2 class="footer-title">{{ c().specs }}</h2>
            <dl class="specs">
              @for (spec of specs; track spec.label) {
                <div><dt>{{ spec.label }}</dt><dd>{{ spec.value }}</dd></div>
              }
            </dl>
          }
          <a class="button button-dark button-block" [routerLink]="locale.url('shop')">{{ c().shopCta }} <span aria-hidden="true">↗</span></a>
          <p class="form-hint">
            {{ c().help }}
            <a class="text-link" [routerLink]="locale.url('contact')" [queryParams]="{ tema: 'tecnologia' }">{{ c().helpCta }}</a>
          </p>
        </aside>
      </div>
    </section>

    <section class="bg-soft section-tight">
      <div class="wrap">
        <p class="eyebrow">{{ c().related }}</p>
        <div class="service-grid">
          @for (other of related(); track other.slug) {
            <article class="service-card">
              <div class="card-content">
                <span class="card-number">{{ other.kind }}</span>
                <h3>{{ textOf(other).name }}</h3>
                <p>{{ textOf(other).tagline ?? textOf(other).description }}</p>
                <a class="arrow-link stretched" [routerLink]="locale.url('technologyDetail', { slug: other.slug })">
                  {{ i18n.t('common.viewDetails') }} <span>↗</span>
                </a>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
})
export class ProductDetail {
  /** Route parameter, bound by `withComponentInputBinding()`; the guard only matches existing slugs. */
  protected readonly slug = input.required<string>();
  protected readonly product = computed(() => findTechnology(this.slug())!);
  protected readonly related = computed(() => TECHNOLOGY.filter((other) => other.slug !== this.slug()));
  protected readonly locale = inject(LocaleService);
  protected readonly i18n = inject(TranslationService);
  protected readonly text = computed(() => localized(this.product().content, this.locale.locale()));
  protected readonly c = computed(() => localized(TECHNOLOGY_DETAIL, this.locale.locale()));

  protected textOf(product: TechnologyProduct) {
    return localized(product.content, this.locale.locale());
  }

  constructor() {
    const seo = inject(SeoService);
    effect(() => {
      const product = this.product();
      const text = this.text();
      const c = this.c();
      const locale = this.locale.locale();
      const path = this.locale.url('technologyDetail', { slug: product.slug });
      seo.set(
        pageSeo('technologyDetail', locale, {
          params: { slug: product.slug },
          title: c.titleKind ? `${text.name}: ${c.titleKind[product.kind]}` : text.name,
          description: summarize(text.description),
          jsonLd: [
            breadcrumb([{ name: this.i18n.t('nav.technology'), path: this.locale.url('technology') }, { name: text.name, path }], locale),
            {
              '@type': product.kind === 'Software' ? 'SoftwareApplication' : 'Product',
              name: text.name,
              description: text.description,
              url: absoluteUrl(path),
              image: `${SITE.url}/og-image.png`,
              ...(product.kind === 'Software'
                ? { applicationCategory: 'NavigationApplication', operatingSystem: 'Web' }
                : { brand: { '@type': 'Brand', name: 'Open Marine' } }),
            },
          ],
        }),
      );
    });
  }
}
