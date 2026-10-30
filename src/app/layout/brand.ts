import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocaleService } from '../core/i18n/locale.service';
import { TranslationService } from '../core/i18n/translation.service';

@Component({
  selector: 'app-brand',
  imports: [RouterLink],
  template: `
    <a class="brand" [routerLink]="locale.url('home')" [attr.aria-label]="i18n.t('a11y.brand')">
      <span class="brand-mark" aria-hidden="true"></span><span class="brand-name">embarcarte</span>
    </a>
  `,
})
export class Brand {
  protected readonly locale = inject(LocaleService);
  protected readonly i18n = inject(TranslationService);
}
