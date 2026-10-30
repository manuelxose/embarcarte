import { Component, computed, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocaleService } from '../../core/i18n/locale.service';
import { TranslationService } from '../../core/i18n/translation.service';
import { SeoService, breadcrumb, pageSeo } from '../../core/seo.service';
import { localized } from '../../shared/models/localized';
import { SERVICES, SERVICES_PAGE } from './content/services.content';

@Component({
  selector: 'app-services',
  imports: [RouterLink],
  template: `
    <section class="page-hero">
      <div class="wrap">
        <p class="eyebrow">{{ c().eyebrow }}</p>
        <h1 class="display h-xl">{{ c().heading[0] }}<br /><em>{{ c().headingEm }}</em></h1>
        <p class="lead">{{ c().lead }}</p>
      </div>
    </section>

    <section class="services bg-soft section-pad">
      <div class="wrap service-grid two">
        @for (service of services(); track service.title; let i = $index) {
          <article class="service-card">
            <div class="card-content">
              <span class="card-number">0{{ i + 1 }}</span>
              <h3>{{ service.title }}</h3>
              <p>{{ service.text }}</p>
            </div>
          </article>
        }
      </div>
    </section>

    <section class="section-pad">
      <div class="wrap intro-grid">
        <p class="eyebrow">{{ c().processEyebrow }}</p>
        <div>
          <ol class="steps">
            @for (step of c().steps; track step) {
              <li>{{ step }}</li>
            }
          </ol>
          <div class="hero-actions" style="margin-top: 28px">
            <a class="button button-dark" [routerLink]="locale.url('contact')" [queryParams]="{ tema: 'tecnologia' }">{{ c().cta }} <span>↗</span></a>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class Services {
  protected readonly locale = inject(LocaleService);
  protected readonly i18n = inject(TranslationService);
  protected readonly c = computed(() => localized(SERVICES_PAGE, this.locale.locale()));
  protected readonly services = computed(() => localized(SERVICES, this.locale.locale()));

  constructor() {
    const seo = inject(SeoService);
    effect(() =>
      seo.set(
        pageSeo('services', this.locale.locale(), {
          title: this.c().seo.title,
          description: this.c().seo.description,
          jsonLd: [breadcrumb([{ name: this.i18n.t('nav.services'), path: this.locale.url('services') }], this.locale.locale())],
        }),
      ),
    );
  }
}
