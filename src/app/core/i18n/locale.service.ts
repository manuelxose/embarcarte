import { DOCUMENT, Injectable, REQUEST, computed, effect, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { LOCALE_INFO } from './locale.config';
import { alternateUrl, localizedUrl } from './locale-routes';
import type { RouteId, RouteParams } from './locale-routes';
import { localeFromUrl, otherLocale } from './locale.types';
import type { Locale } from './locale.types';

@Injectable({ providedIn: 'root' })
export class LocaleService {
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  /**
   * The request URL on the server, so the first render of an English page
   * already renders in English. `null` in the browser, where the router
   * navigation provides it. A new injector is created per request, so this
   * state is never shared between concurrent renders.
   */
  private readonly request = inject(REQUEST, { optional: true });

  private readonly currentUrl = signal(this.request?.url ?? this.document.location?.pathname ?? '/');

  readonly locale = computed<Locale>(() => localeFromUrl(this.currentUrl()));

  readonly otherLocale = computed<Locale>(() => otherLocale(this.locale()));

  constructor() {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => this.currentUrl.set(event.urlAfterRedirects));

    effect(() => {
      this.document.documentElement.lang = LOCALE_INFO[this.locale()].htmlLang;
    });
  }

  /** Localized URL for a semantic route, in the active locale unless one is passed. */
  url(id: RouteId, params?: RouteParams, locale: Locale = this.locale()): string {
    return localizedUrl(id, locale, params);
  }

  /**
   * The current page in the other language, used by the language switcher.
   * Only the path is returned: `RouterLink` cannot take a query string inside a
   * string command (it would percent-encode it into the path), so the switcher
   * preserves the live query string and fragment instead. Pages without a
   * localized counterpart (admin, legacy redirects) fall back to that
   * language's home, which is the previous behaviour.
   */
  switchUrl(): string {
    return (alternateUrl(this.currentUrl(), this.otherLocale()) ?? this.url('home', undefined, this.otherLocale())).split(/[?#]/)[0];
  }
}
