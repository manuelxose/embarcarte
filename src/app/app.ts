import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslationService } from './core/i18n/translation.service';
import { Footer } from './layout/footer/footer';
import { Header } from './layout/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  template: `
    <a class="skip-link" href="#contenido">{{ i18n.t('a11y.skipToContent') }}</a>
    <app-header />
    <main id="contenido"><router-outlet /></main>
    <app-footer />
  `,
})
export class App {
  protected readonly i18n = inject(TranslationService);
}
