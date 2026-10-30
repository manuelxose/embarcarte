import { Component, computed, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocaleService } from '../../core/i18n/locale.service';
import { TranslationService } from '../../core/i18n/translation.service';
import { IMAGES } from '../../core/images';
import { SeoService, breadcrumb, pageSeo } from '../../core/seo.service';
import { localized } from '../../shared/models/localized';
import { EXPERIENCES_PAGE } from './content/experiences.content';

@Component({
  selector: 'app-experiences',
  imports: [RouterLink],
  template: `
    <section class="hero" style="height: min(600px, calc(100svh - 76px))">
      <div
        class="hero-image"
        role="img"
        [attr.aria-label]="c().imageAlt"
        [style.background-image]="'url(' + images.experiences + ')'"
      ></div>
      <div class="hero-shade"></div>
      <div class="hero-content wrap">
        <p class="eyebrow">{{ c().eyebrow }}</p>
        <h1 class="display h-xl">{{ c().heading[0] }}<br /><em>{{ c().headingEm }}</em></h1>
        <p class="hero-copy">{{ c().copy }}</p>
        <div class="hero-actions">
          <a class="button button-light" [routerLink]="locale.url('contact')" [queryParams]="{ tema: 'experiencias' }">{{ c().cta }} <span>↗</span></a>
        </div>
      </div>
    </section>

    <section class="services bg-soft section-pad">
      <div class="wrap">
        <div class="section-heading">
          <div>
            <p class="eyebrow">{{ c().listEyebrow }}</p>
            <h2 class="display h-lg">{{ c().listHeading[0] }}<br /><em>{{ c().listHeadingEm }}</em></h2>
          </div>
          <p class="heading-note">{{ c().listNote }}</p>
        </div>
        <div class="service-grid">
          @for (item of c().items; track item.title; let i = $index) {
            <article class="service-card">
              <div class="card-content">
                <span class="card-number">0{{ i + 1 }}</span>
                <h3>{{ item.title }}</h3>
                <p>{{ item.text }}</p>
              </div>
            </article>
          }
        </div>
      </div>
    </section>

    <section class="section-pad">
      <div class="wrap intro-grid">
        <p class="eyebrow">{{ c().bookEyebrow }}</p>
        <div>
          <ol class="steps">
            @for (step of c().steps; track step) {
              <li>{{ step }}</li>
            }
          </ol>
          <div class="hero-actions" style="margin-top: 28px">
            <a class="button button-dark" [routerLink]="locale.url('contact')" [queryParams]="{ tema: 'experiencias' }">{{ c().enquiryCta }} <span>↗</span></a>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class Experiences {
  protected readonly locale = inject(LocaleService);
  protected readonly i18n = inject(TranslationService);
  protected readonly images = IMAGES;
  protected readonly c = computed(() => localized(EXPERIENCES_PAGE, this.locale.locale()));

  constructor() {
    const seo = inject(SeoService);
    effect(() =>
      seo.set(
        pageSeo('experiences', this.locale.locale(), {
          title: this.c().seo.title,
          description: this.c().seo.description,
          jsonLd: [breadcrumb([{ name: this.i18n.t('nav.experiences'), path: this.locale.url('experiences') }], this.locale.locale())],
        }),
      ),
    );
  }
}
