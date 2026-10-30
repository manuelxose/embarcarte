import { HttpClient } from '@angular/common/http';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LocaleService } from '../../core/i18n/locale.service';
import { TranslationService } from '../../core/i18n/translation.service';
import type { TranslationKey } from '../../i18n/dictionary';
import { SeoService, breadcrumb, pageSeo } from '../../core/seo.service';
import { SITE } from '../../core/site.config';
import { localized } from '../../shared/models/localized';
import { CONTACT_PAGE } from './content/contact.content';

type Status = 'idle' | 'sending' | 'sent' | 'error';

/**
 * `value` travels inside the request and in the `?tema=` links, so it stays in
 * Spanish in both locales; only the label the owner receives is translated.
 */
const TOPICS = [
  { value: 'tecnologia', key: 'contact.topic.technology' },
  { value: 'tienda', key: 'contact.topic.shop' },
  { value: 'experiencias', key: 'contact.topic.experiences' },
  { value: 'traslados', key: 'contact.topic.delivery' },
  { value: 'otra', key: 'contact.topic.other' },
] as const satisfies readonly { readonly value: string; readonly key: TranslationKey }[];

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <section class="section-pad">
      <div class="wrap contact-grid">
        <div>
          <p class="eyebrow">{{ c().eyebrow }}</p>
          <h1 class="display h-lg">{{ c().heading[0] }}<br />{{ c().heading[1] }}</h1>
          <p class="contact-copy">
            {{ c().lead }}
            {{ c().emailPrefix }}
            <a class="text-link" [href]="'mailto:' + site.email">{{ site.email }}</a>.
          </p>
          <div class="contact-note"><span class="contact-dot"></span> {{ c().note }}</div>
        </div>

        @if (status() === 'sent') {
          <div class="panel notice" role="status">
            <h2 class="dash-title">{{ i18n.t('contact.sentTitle') }}</h2>
            <p class="muted">{{ i18n.t('contact.sentText') }}</p>
          </div>
        } @else {
          <form class="form" [formGroup]="form" (ngSubmit)="submit()" novalidate>
            <label for="name">{{ i18n.t('contact.name') }}</label>
            <input id="name" formControlName="name" autocomplete="name" [placeholder]="i18n.t('contact.namePlaceholder')" required />
            <label for="email">{{ i18n.t('contact.email') }}</label>
            <input id="email" type="email" formControlName="email" autocomplete="email" [placeholder]="i18n.t('contact.emailPlaceholder')" required />
            <label for="phone">{{ i18n.t('contact.phone') }}</label>
            <input id="phone" type="tel" formControlName="phone" autocomplete="tel" />
            <label for="topic">{{ i18n.t('contact.topic') }}</label>
            <select id="topic" formControlName="topic" required>
              <option value="" disabled>{{ i18n.t('contact.topicPlaceholder') }}</option>
              @for (topic of topics; track topic.value) {
                <option [value]="topic.value">{{ i18n.t(topic.key) }}</option>
              }
            </select>
            <label for="message">{{ i18n.t('contact.message') }}</label>
            <textarea id="message" formControlName="message" rows="5" required
                      [placeholder]="i18n.t('contact.messagePlaceholder')"></textarea>
            <label class="hp" aria-hidden="true">Web <input formControlName="website" tabindex="-1" autocomplete="off" /></label>
            <label class="check">
              <input type="checkbox" formControlName="consent" required />
              <span>{{ i18n.t('contact.consent') }} <a [routerLink]="locale.url('privacy')">{{ i18n.t('contact.consentLink') }}</a>.</span>
            </label>
            @if (showErrors() && form.invalid) {
              <p class="error" role="alert">{{ i18n.t('contact.invalid') }}</p>
            }
            @if (status() === 'error') {
              <p class="error" role="alert">{{ i18n.t('contact.error', { email: site.email }) }}</p>
            }
            <button class="button button-dark" type="submit" [disabled]="status() === 'sending'">
              {{ status() === 'sending' ? i18n.t('contact.sending') : i18n.t('contact.send') }} <span aria-hidden="true">↗</span>
            </button>
          </form>
        }
      </div>
    </section>
  `,
})
export class Contact {
  private readonly http = inject(HttpClient);
  protected readonly locale = inject(LocaleService);
  protected readonly i18n = inject(TranslationService);
  protected readonly site = SITE;
  protected readonly topics = TOPICS;
  protected readonly c = computed(() => localized(CONTACT_PAGE, this.locale.locale()));
  protected readonly status = signal<Status>('idle');
  protected readonly showErrors = signal(false);

  protected readonly form = inject(FormBuilder).nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(200)]],
    phone: ['', Validators.maxLength(40)],
    topic: ['', Validators.required],
    message: ['', [Validators.required, Validators.maxLength(5000)]],
    website: [''],
    consent: [false, Validators.requiredTrue],
  });

  constructor() {
    const params = inject(ActivatedRoute).snapshot.queryParamMap;
    const topic = params.get('tema');
    if (topic && TOPICS.some((option) => option.value === topic)) {
      this.form.controls.topic.setValue(topic);
    }
    const product = params.get('producto');
    if (product && product.length <= 120) {
      this.form.controls.topic.setValue('tienda');
      this.form.controls.message.setValue(this.i18n.t('contact.productMessage', { product }));
    }

    const seo = inject(SeoService);
    effect(() =>
      seo.set(
        pageSeo('contact', this.locale.locale(), {
          title: this.c().seo.title,
          description: this.c().seo.description,
          jsonLd: [breadcrumb([{ name: this.i18n.t('nav.contact'), path: this.locale.url('contact') }], this.locale.locale())],
        }),
      ),
    );
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.showErrors.set(true);
      this.form.markAllAsTouched();
      return;
    }
    this.status.set('sending');
    this.showErrors.set(false);
    const { topic, ...rest } = this.form.getRawValue();
    const label = TOPICS.find((option) => option.value === topic)?.key;
    this.http
      .post('/api/contact', { ...rest, topic: label ? this.i18n.t(label) : topic })
      .subscribe({ next: () => this.status.set('sent'), error: () => this.status.set('error') });
  }
}
