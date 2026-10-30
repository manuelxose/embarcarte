import { Component, computed, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocaleService } from '../../core/i18n/locale.service';
import { TranslationService } from '../../core/i18n/translation.service';
import { SeoService, pageSeo } from '../../core/seo.service';
import { SITE } from '../../core/site.config';
import { localized } from '../../shared/models/localized';
import { GUIDES } from '../guides/models/guides';
import { HOME_CONTENT } from './content/home.content';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <section class="home-hero">
      <div class="home-hero-image"></div>
      <div class="wrap home-hero-content">
        <p class="eyebrow">{{ content().eyebrow }}</p>
        <h1>{{ content().heading[0] }}<br />{{ content().heading[1] }}</h1>
        <p>{{ content().intro }}</p>
        <div class="hero-actions">
          <a class="button button-dark" [routerLink]="locale.url('technology')">{{ content().primaryCta }} <span aria-hidden="true">→</span></a>
          <a class="button button-outline" [routerLink]="locale.url('home')" fragment="servicios">{{ content().secondaryCta }}</a>
        </div>
      </div>
    </section>

    <section class="home-services wrap" id="servicios" [attr.aria-label]="content().servicesLabel">
      @for (line of content().lines; track line.title) {
        <article class="home-service">
          <img [src]="line.image" alt="" />
          <div>
            <span class="home-service-icon" aria-hidden="true">{{ line.icon }}</span>
            <h2>{{ line.title }}</h2>
            <p>{{ line.text }}</p>
            <a [routerLink]="locale.url(line.routeId)">{{ line.cta }} <span aria-hidden="true">→</span></a>
          </div>
        </article>
      }
    </section>

    <section class="home-products">
      <div class="wrap home-products-grid">
        <div class="home-products-intro">
          <p class="eyebrow">{{ content().productsEyebrow }}</p>
          <h2>{{ content().productsHeading[0] }}<br />{{ content().productsHeading[1] }}</h2>
          <p>{{ content().productsIntro }}</p>
          <a class="button button-outline" [routerLink]="locale.url('technology')">{{ content().productsCta }} <span aria-hidden="true">→</span></a>
        </div>
        <div class="home-product-list">
          @for (product of content().products; track product.title) {
            <a class="home-product" [routerLink]="locale.url(product.routeId, product.slug ? { slug: product.slug } : {})">
              <img [src]="product.image" alt="" />
              <strong>{{ product.title }}</strong>
              <small>{{ product.description }}</small>
              <span aria-hidden="true">→</span>
            </a>
          }
        </div>
        <p class="home-products-note">@for (line of content().note; track line; let last = $last) { {{ line }}@if (!last) {<br />} }</p>
      </div>
    </section>

    <section class="section-tight bg-soft">
      <div class="wrap">
        <div class="section-heading">
          <div>
            <p class="eyebrow">{{ content().guidesEyebrow }}</p>
            <h2 class="display h-md">{{ content().guidesHeading }}</h2>
          </div>
          <a class="button button-outline" [routerLink]="locale.url('guides')">{{ i18n.t('guides.all') }} →</a>
        </div>
        <div class="service-grid">
          @for (guide of guides(); track guide.slug) {
            <article class="service-card">
              <div class="card-content">
                <h3>{{ guide.title }}</h3>
                <p>{{ guide.description }}</p>
                <a class="arrow-link stretched" [routerLink]="[locale.url('guides'), guide.slug]">{{ i18n.t('guides.read') }} →</a>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
})
export class Home {
  protected readonly locale = inject(LocaleService);
  protected readonly i18n = inject(TranslationService);
  protected readonly content = computed(() => localized(HOME_CONTENT, this.locale.locale()));
  protected readonly guides = computed(() =>
    GUIDES.slice(0, 3).map((guide) => ({ slug: guide.slug, ...localized(guide.content, this.locale.locale()) })),
  );

  constructor() {
    const seo = inject(SeoService);
    effect(() =>
      seo.set(
        pageSeo('home', this.locale.locale(), {
          title: this.content().seo.title,
          description: this.content().seo.description,
          jsonLd: [
            {
              '@type': 'Organization',
              name: SITE.name,
              url: SITE.url,
              logo: `${SITE.url}/icon-512.png`,
              email: SITE.email,
              ...(SITE.social.length ? { sameAs: SITE.social } : {}),
            },
            { '@type': 'WebSite', name: SITE.name, url: SITE.url, inLanguage: this.locale.locale() === 'en' ? 'en' : 'es-ES' },
          ],
        }),
      ),
    );
  }
}
