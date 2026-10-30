import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LocaleService } from '../../core/i18n/locale.service';
import type { RouteId } from '../../core/i18n/locale-routes';
import { TranslationService } from '../../core/i18n/translation.service';
import { SITE } from '../../core/site.config';
import type { TranslationKey } from '../../i18n/dictionary';
import { Brand } from '../brand';
import { LanguageSwitcher } from '../language-switcher/language-switcher';

interface FooterColumn {
  readonly title: TranslationKey;
  readonly links: readonly { readonly id: RouteId; readonly key: TranslationKey }[];
}

const COLUMNS: readonly FooterColumn[] = [
  {
    title: 'footer.explore',
    links: [
      { id: 'technology', key: 'footer.technology' },
      { id: 'experiences', key: 'footer.experiences' },
      { id: 'delivery', key: 'footer.delivery' },
      { id: 'services', key: 'footer.services' },
      { id: 'guides', key: 'footer.guides' },
      { id: 'about', key: 'footer.about' },
    ],
  },
  {
    title: 'footer.shop',
    links: [
      { id: 'shop', key: 'footer.catalogue' },
      { id: 'cart', key: 'footer.cart' },
      { id: 'account', key: 'footer.account' },
      { id: 'contact', key: 'footer.contact' },
    ],
  },
  {
    title: 'footer.legal',
    links: [
      { id: 'legalNotice', key: 'footer.legalNotice' },
      { id: 'privacy', key: 'footer.privacy' },
      { id: 'cookies', key: 'footer.cookies' },
      { id: 'termsOfSale', key: 'footer.termsOfSale' },
    ],
  },
];

@Component({
  selector: 'app-footer',
  imports: [RouterLink, Brand, LanguageSwitcher],
  template: `
    <footer class="site-footer">
      <div class="wrap footer-top">
        <div>
          <app-brand />
          <p>{{ i18n.t('footer.tagline') }}</p>
          <p><a [href]="'mailto:' + site.email">{{ site.email }}</a></p>
        </div>
        @for (column of columns; track column.title) {
          <div>
            <h2 class="footer-title">{{ i18n.t(column.title) }}</h2>
            <ul>
              @for (link of column.links; track link.id) {
                <li><a [routerLink]="locale.url(link.id)">{{ i18n.t(link.key) }}</a></li>
              }
            </ul>
          </div>
        }
      </div>
      <div class="wrap footer-bottom">
        <span>© {{ year }} Embarcarte</span>
        <span>{{ i18n.t('footer.developedBy') }} <a href="https://tecnoriasl.com" target="_blank" rel="noopener noreferrer">Tecnoria</a></span>
        <app-language-switcher display="name" />
        <span class="footer-domain">embarcarte.com</span>
      </div>
    </footer>
  `,
})
export class Footer {
  protected readonly locale = inject(LocaleService);
  protected readonly i18n = inject(TranslationService);
  protected readonly site = SITE;
  protected readonly columns = COLUMNS;
  protected readonly year = new Date().getFullYear();
}
