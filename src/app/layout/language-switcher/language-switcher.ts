import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LOCALE_INFO } from '../../core/i18n/locale.config';
import { LocaleService } from '../../core/i18n/locale.service';
import { TranslationService } from '../../core/i18n/translation.service';

/**
 * One link that takes the visitor to the same page in the other language.
 * `LocaleService.switchUrl()` keeps the slug; the query string and the fragment
 * are carried over by the router, which is why they are not part of the URL
 * string itself.
 */
@Component({
  selector: 'app-language-switcher',
  imports: [RouterLink],
  template: `
    <a
      [class]="linkClass()"
      [routerLink]="url()"
      queryParamsHandling="preserve"
      preserveFragment
      [attr.lang]="target()"
      [attr.hreflang]="target()"
      [attr.aria-label]="label()"
      [attr.title]="label()"
      >{{ display() === 'name' ? name() : target().toUpperCase() }}</a
    >
  `,
})
export class LanguageSwitcher {
  /** CSS class of the rendered link: `icon-link` in the header, plain in the footer. */
  readonly linkClass = input('');
  /** `code` shows ES/EN, `name` shows the target language written in itself. */
  readonly display = input<'code' | 'name'>('code');

  private readonly locale = inject(LocaleService);
  private readonly i18n = inject(TranslationService);
  protected readonly target = computed(() => this.locale.otherLocale());
  protected readonly name = computed(() => LOCALE_INFO[this.target()].switchLabel);
  protected readonly url = computed(() => this.locale.switchUrl());
  protected readonly label = computed(() => this.i18n.t('a11y.switchLanguage', { language: this.name() }));
}
