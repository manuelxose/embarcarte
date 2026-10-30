import { Component, computed, effect, inject, input } from '@angular/core';
import { LocaleService } from '../../core/i18n/locale.service';
import { TranslationService } from '../../core/i18n/translation.service';
import type { TranslationParams } from '../../i18n/dictionary';
import { interpolate } from '../../i18n/dictionary';
import { SeoService, pageSeo } from '../../core/seo.service';
import { SITE } from '../../core/site.config';
import { localized } from '../../shared/models/localized';
import { LEGAL_PAGES } from './models/legal';
import type { LegalPageId } from './models/legal';

@Component({
  selector: 'app-legal',
  template: `
    <section class="page-hero">
      <div class="wrap">
        <p class="eyebrow">Legal</p>
        <h1 class="display h-lg">{{ text().title }}</h1>
      </div>
    </section>
    <section class="section-pad">
      <div class="wrap-narrow prose">
        @for (block of text().blocks; track $index) {
          @if (block.heading) {
            <h2>{{ block.heading }}</h2>
          }
          @for (paragraph of block.paragraphs; track $index) {
            <p>{{ fill(paragraph) }}</p>
          }
          @if (block.ownerDetails) {
            <ul>
              <li>{{ i18n.t('legal.owner') }}: {{ site.legal.owner }}</li>
              @if (site.legal.taxId) { <li>{{ i18n.t('legal.taxId') }}: {{ site.legal.taxId }}</li> }
              @if (site.legal.address) { <li>{{ i18n.t('legal.address') }}: {{ site.legal.address }}</li> }
              @if (site.legal.registry) { <li>{{ i18n.t('legal.registry') }}: {{ site.legal.registry }}</li> }
              @if (!site.legal.taxId || !site.legal.address) { <li>{{ i18n.t('legal.pending') }}</li> }
              <li>{{ i18n.t('legal.email') }}: {{ site.email }}</li>
            </ul>
          }
          @if (block.list; as items) {
            <ul>
              @for (item of items; track $index) {
                <li>@if (item.label) {<strong>{{ item.label }}</strong>} {{ fill(item.text) }}</li>
              }
            </ul>
          }
        }
      </div>
    </section>
  `,
})
export class Legal {
  /** Route data key: legal pages are addressed by their semantic route id. */
  protected readonly page = input.required<LegalPageId>();
  protected readonly locale = inject(LocaleService);
  protected readonly i18n = inject(TranslationService);
  protected readonly site = SITE;
  protected readonly text = computed(() => localized(LEGAL_PAGES, this.locale.locale())[this.page()]);

  /** Owner and contact details are interpolated, never duplicated in the copy. */
  protected fill(value: string): string {
    const params: TranslationParams = {
      owner: SITE.legal.owner,
      email: SITE.email,
      taxId: SITE.legal.taxId,
      address: SITE.legal.address,
      registry: SITE.legal.registry,
    };
    return interpolate(value, params);
  }

  constructor() {
    const seo = inject(SeoService);
    effect(() => {
      const text = this.text();
      seo.set(
        pageSeo(this.page(), this.locale.locale(), {
          title: text.title,
          description: this.i18n.t('legal.description', { title: text.title, name: SITE.name }),
        }),
      );
    });
  }
}
