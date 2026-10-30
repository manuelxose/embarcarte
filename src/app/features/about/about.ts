import { Component, computed, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocaleService } from '../../core/i18n/locale.service';
import { TranslationService } from '../../core/i18n/translation.service';
import { SeoService, breadcrumb, pageSeo } from '../../core/seo.service';
import { localized } from '../../shared/models/localized';
import { ABOUT_PAGE } from './content/about.content';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  template: `
    <section class="page-hero">
      <div class="wrap">
        <p class="eyebrow">{{ c().eyebrow }}</p>
        <h1 class="display h-xl">{{ c().heading[0] }}<br /><em>{{ c().headingEm }}</em></h1>
        <p class="lead">{{ c().lead }}</p>
      </div>
    </section>

    <section class="section-pad">
      <div class="wrap intro-grid">
        <p class="eyebrow">{{ c().workEyebrow }}</p>
        <div class="prose">
          @for (section of c().sections; track section.text) {
            @if (section.heading) {
              <h2>{{ section.heading }}</h2>
            }
            <p>{{ section.text }}</p>
          }
        </div>
      </div>
    </section>

    <section class="manifesto section-pad">
      <div class="manifesto-bg"></div>
      <div class="wrap manifesto-inner">
        <p class="eyebrow">{{ c().manifestoEyebrow }}</p>
        <h2 class="display">
          @for (line of c().manifestoHeading; track line) {
            {{ line }}<br />
          }<em>{{ c().manifestoHeadingEm }}</em>
        </h2>
        <p>{{ c().manifestoText }}</p>
        <a class="button button-outline" [routerLink]="locale.url('contact')">{{ c().manifestoCta }} <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  `,
})
export class About {
  protected readonly locale = inject(LocaleService);
  protected readonly i18n = inject(TranslationService);
  protected readonly c = computed(() => localized(ABOUT_PAGE, this.locale.locale()));

  constructor() {
    const seo = inject(SeoService);
    effect(() =>
      seo.set(
        pageSeo('about', this.locale.locale(), {
          title: this.c().seo.title,
          description: this.c().seo.description,
          jsonLd: [breadcrumb([{ name: this.i18n.t('nav.about'), path: this.locale.url('about') }], this.locale.locale())],
        }),
      ),
    );
  }
}
