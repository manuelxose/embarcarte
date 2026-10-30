import { Component, computed, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocaleService } from '../../core/i18n/locale.service';
import { TranslationService } from '../../core/i18n/translation.service';
import { IMAGES } from '../../core/images';
import { SeoService, breadcrumb, pageSeo } from '../../core/seo.service';
import { localized } from '../../shared/models/localized';
import { TECHNOLOGY_PAGE } from './content/technology-page.content';
import { TECHNOLOGY } from './models/technology';
import type { TechnologyKind, TechnologyProduct } from './models/technology';

@Component({
  selector: 'app-technology',
  imports: [RouterLink],
  template: `
    <section class="page-hero">
      <div class="wrap">
        <p class="eyebrow">{{ c().eyebrow }}</p>
        <h1 class="display h-xl">{{ c().heading[0] }}<br /><em>{{ c().heading[1] }}</em></h1>
        <p class="lead">{{ c().lead }}</p>
      </div>
    </section>

    <section class="section-pad">
      <div class="wrap intro-grid">
        <p class="eyebrow">{{ c().howEyebrow }}</p>
        <ol class="steps">
          @for (step of c().how; track step) {
            <li>{{ step }}</li>
          }
        </ol>
      </div>
    </section>

    <section class="services bg-soft section-pad">
      <div class="wrap">
        <div class="section-heading">
          <div>
            <p class="eyebrow">{{ c().modulesEyebrow }}</p>
            <h2 class="display h-lg">{{ c().modulesHeading }}<br /><em>Open Marine.</em></h2>
          </div>
          <p class="heading-note">{{ c().modulesNote }}</p>
        </div>
        @for (kind of kinds; track kind) {
          <h3 class="display h-md" style="margin: 40px 0 24px">{{ c().kinds[kind] }}</h3>
          <div class="service-grid two">
            @for (product of byKind(kind); track product.slug; let i = $index) {
              <article class="service-card">
                <div class="card-content">
                  <span class="card-number">0{{ i + 1 }} / {{ product.kind }}</span>
                  <h3>{{ text(product).name }}</h3>
                  <p>{{ text(product).tagline ?? text(product).description }}</p>
                  <a class="arrow-link stretched" [routerLink]="locale.url('technologyDetail', { slug: product.slug })">
                    {{ i18n.t('common.viewDetails') }} <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            }
          </div>
        }
      </div>
    </section>

    <section class="section-pad">
      <div class="wrap detail-grid">
        <div>
          <p class="eyebrow">{{ c().whyEyebrow }}</p>
          <h2 class="display h-md">{{ c().whyHeading[0] }}<br /><em>{{ c().whyHeading[1] }}</em></h2>
          <ul class="checklist" style="margin-top: 28px">
            @for (item of c().why; track item) {
              <li>{{ item }}</li>
            }
          </ul>
          <div class="hero-actions">
            <a class="button button-dark" [routerLink]="locale.url('shop')">{{ c().shopCta }} <span aria-hidden="true">↗</span></a>
            <a class="text-link" [routerLink]="locale.url('contact')" [queryParams]="{ tema: 'tecnologia' }">{{ c().demoCta }} <span>→</span></a>
          </div>
        </div>
        <div class="product-photo"><img [src]="images.tech" [alt]="c().imageAlt" loading="lazy" /></div>
      </div>
    </section>
  `,
})
export class Technology {
  protected readonly locale = inject(LocaleService);
  protected readonly i18n = inject(TranslationService);
  protected readonly images = IMAGES;
  protected readonly kinds: readonly TechnologyKind[] = ['Software', 'Hardware'];
  protected readonly c = computed(() => localized(TECHNOLOGY_PAGE, this.locale.locale()));

  protected byKind(kind: TechnologyKind): readonly TechnologyProduct[] {
    return TECHNOLOGY.filter((product) => product.kind === kind);
  }

  protected text(product: TechnologyProduct) {
    return localized(product.content, this.locale.locale());
  }

  constructor() {
    const seo = inject(SeoService);
    effect(() =>
      seo.set(
        pageSeo('technology', this.locale.locale(), {
          title: this.c().seo.title,
          description: this.c().seo.description,
          jsonLd: [breadcrumb([{ name: this.i18n.t('nav.technology'), path: this.locale.url('technology') }], this.locale.locale())],
        }),
      ),
    );
  }
}
