import { Component, computed, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocaleService } from '../../core/i18n/locale.service';
import { TranslationService } from '../../core/i18n/translation.service';
import { SeoService, breadcrumb, pageSeo } from '../../core/seo.service';
import { absoluteUrl } from '../../core/site.config';
import { localized } from '../../shared/models/localized';
import { GUIDES_PAGE } from './content/guides-page.content';
import { GUIDES, findGuide } from './models/guides';

@Component({
  selector: 'app-guides',
  imports: [RouterLink],
  template: `
    @if (text(); as article) {
      <section class="page-hero">
        <div class="wrap">
          <nav class="crumbs" [attr.aria-label]="i18n.t('a11y.breadcrumb')">
            <a [routerLink]="locale.url('home')">{{ i18n.t('nav.home') }}</a> /
            <a [routerLink]="locale.url('guides')">{{ i18n.t('nav.guides') }}</a>
          </nav>
          <p class="eyebrow">{{ c().detailEyebrow }}</p>
          <h1 class="display h-lg">{{ article.title }}</h1>
          <p class="lead">{{ article.description }}</p>
          <p>
            <a [routerLink]="locale.url('guideDetail', { slug: guide()!.slug }, locale.otherLocale())" [attr.hreflang]="locale.otherLocale()">
              {{ i18n.t('guides.otherLanguage') }}
            </a>
          </p>
        </div>
      </section>
      <section class="section-pad">
        <div class="wrap detail-grid">
          <article class="prose">
            @for (section of article.sections; track section[0]) {
              <h2>{{ section[0] }}</h2>
              <p>{{ section[1] }}</p>
            }
            @if (extra(); as extraSections) {
              @for (section of extraSections; track section[0]) {
                <h2>{{ section[0] }}</h2>
                <p>{{ section[1] }}</p>
              }
            }
            @if (guide()!.sources; as sources) {
              <h2>{{ c().sourcesHeading }}</h2>
              <ul>
                @for (source of sources; track source.url) {
                  <li><a [href]="source.url" target="_blank" rel="noopener noreferrer">{{ source.label }}</a></li>
                }
              </ul>
            }
            <p><a [routerLink]="locale.url('guides')">← {{ c().backToList }}</a></p>
          </article>
          <aside class="panel">
            <h2 class="footer-title">{{ c().asideHeading }}</h2>
            <p>{{ c().asideText }}</p>
            <a class="button button-dark" [routerLink]="locale.url('technology')">{{ c().asideCta }} →</a>
          </aside>
        </div>
      </section>
    } @else {
      <section class="page-hero">
        <div class="wrap">
          <p class="eyebrow">{{ c().listEyebrow }}</p>
          <h1 class="display h-xl">{{ c().listHeading }}</h1>
          <p class="lead">{{ c().listLead }}</p>
          <p>
            <a [routerLink]="locale.url('guides', undefined, locale.otherLocale())" [attr.hreflang]="locale.otherLocale()">
              {{ i18n.t('guides.otherLanguage') }}
            </a>
          </p>
        </div>
      </section>
      <section class="section-pad">
        <div class="wrap service-grid">
          @for (item of guides(); track item.slug) {
            <article class="service-card">
              <div class="card-content">
                <span class="card-number">{{ i18n.t('guides.label') }}</span>
                <h2><a class="stretched" [routerLink]="locale.url('guideDetail', { slug: item.slug })">{{ item.title }}</a></h2>
                <p>{{ item.description }}</p>
                <span class="arrow-link">{{ i18n.t('guides.read') }} →</span>
              </div>
            </article>
          }
        </div>
      </section>
    }
  `,
})
export class Guides {
  /** Route parameter; absent on the list page. */
  protected readonly slug = input<string>();
  protected readonly locale = inject(LocaleService);
  protected readonly i18n = inject(TranslationService);
  protected readonly guides = computed(() =>
    GUIDES.map((guide) => ({ slug: guide.slug, ...localized(guide.content, this.locale.locale()) })),
  );
  protected readonly c = computed(() => localized(GUIDES_PAGE, this.locale.locale()));
  protected readonly guide = computed(() => (this.slug() ? findGuide(this.slug()!) : undefined));
  protected readonly text = computed(() => {
    const guide = this.guide();
    return guide ? localized(guide.content, this.locale.locale()) : undefined;
  });
  protected readonly extra = computed(() => {
    const extra = this.guide()?.extra;
    return extra ? localized(extra, this.locale.locale()) : undefined;
  });

  constructor() {
    const seo = inject(SeoService);
    effect(() => {
      const locale = this.locale.locale();
      const c = this.c();
      const guide = this.guide();
      const text = this.text();
      const listPath = this.locale.url('guides');
      seo.set(
        pageSeo(guide ? 'guideDetail' : 'guides', locale, {
          ...(guide ? { params: { slug: guide.slug } } : {}),
          title: text?.title ?? c.listSeo.title,
          description: text?.description ?? c.listSeo.description,
          type: guide ? 'article' : 'website',
          jsonLd: [
            breadcrumb(
              [
                { name: this.i18n.t('nav.guides'), path: listPath },
                ...(text ? [{ name: text.title, path: this.locale.url('guideDetail', { slug: guide!.slug }) }] : []),
              ],
              locale,
            ),
            ...(text
              ? [
                  {
                    '@type': 'Article',
                    headline: text.title,
                    description: text.description,
                    inLanguage: locale,
                    mainEntityOfPage: absoluteUrl(this.locale.url('guideDetail', { slug: guide!.slug })),
                    publisher: { '@type': 'Organization', name: 'Embarcarte' },
                  },
                ]
              : []),
          ],
        }),
      );
    });
  }
}
