import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LocaleService } from './core/i18n/locale.service';
import { TranslationService } from './core/i18n/translation.service';
import { Footer } from './layout/footer';
import { Header } from './layout/header';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet, Header, Footer],
  template: `
    <a class="skip-link" href="#contenido">{{ i18n.t('a11y.skipToContent') }}</a>
    <app-header />
    <main id="contenido"><router-outlet /></main>
    @if (english()) {
      <footer class="site-footer"><div class="wrap footer-top"><div><a class="brand-name" routerLink="/en">embarcarte</a><p>Open technology. Freedom at sea.</p><a href="mailto:info&#64;embarcarte.com">info&#64;embarcarte.com</a></div><div><h2 class="footer-title">Explore</h2><ul><li><a routerLink="/en/technology">Technology</a></li><li><a routerLink="/en/services">Installation and support</a></li><li><a routerLink="/en/about">About us</a></li><li><a routerLink="/en/guides">Marine guides</a></li></ul></div><div><h2 class="footer-title">Shop</h2><ul><li><a routerLink="/en/shop">Catalogue</a></li><li><a routerLink="/en/cart">Basket</a></li><li><a routerLink="/en/account">My account</a></li><li><a routerLink="/en/contact">Contact</a></li></ul></div><div><h2 class="footer-title">Legal</h2><ul><li><a routerLink="/en/legal-notice">Legal notice</a></li><li><a routerLink="/en/privacy">Privacy</a></li><li><a routerLink="/en/cookies">Cookies</a></li><li><a routerLink="/en/terms-of-sale">Terms of sale</a></li></ul></div></div><div class="wrap footer-bottom"><span>© {{ year }} Embarcarte</span><span>Developed by <a href="https://tecnoriasl.com" target="_blank" rel="noopener noreferrer">Tecnoria</a></span><a routerLink="/">Sitio en español</a></div></footer>
    } @else { <app-footer /> }
  `,
})
export class App {
  private readonly locale = inject(LocaleService);
  protected readonly i18n = inject(TranslationService);
  protected readonly year = new Date().getFullYear();
  protected readonly english = computed(() => this.locale.locale() === 'en');
}
