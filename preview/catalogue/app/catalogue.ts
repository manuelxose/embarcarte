import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MareaTheme } from '../../../src/app/marea-design-system/theme/marea-theme';
import { MareaNotice } from '../../../src/app/marea-design-system/components/foundation/marea-notice';
import { MareaButton } from '../../../src/app/marea-design-system/components/foundation/marea-button';
import { MareaInline } from '../../../src/app/marea-design-system/components/foundation/marea-inline';
import { MareaContainer } from '../../../src/app/marea-design-system/components/foundation/marea-container';
import { MareaText } from '../../../src/app/marea-design-system/components/foundation/marea-text';
import type { MareaLocale, MareaMode } from '../../../src/app/marea-design-system/core/types';
import { FoundationGallery } from './galleries/foundation.gallery';
import { StructuredGallery } from './galleries/structured.gallery';
import { CommerceGallery } from './galleries/commerce.gallery';
import { InstrumentGallery } from './galleries/instrument.gallery';
import { AdversarialGallery } from './galleries/adversarial.gallery';

const MODES: readonly { id: MareaMode; label: string }[] = [
  { id: 'web-light', label: 'Web claro' },
  { id: 'instrument-day', label: 'Instrumento · día' },
  { id: 'instrument-sunlight', label: 'Instrumento · sol' },
  { id: 'instrument-night', label: 'Instrumento · noche' },
];

/**
 * Internal catalogue shell (Storybook-equivalent) for MC-17.
 *
 * Renders the real Angular components inside the real theme host. It is a
 * separate Angular project, built only by `npm run build:design-system-preview`,
 * and is never part of the production application, routes, sitemap or assets.
 */
@Component({
  selector: 'marea-ds-catalogue',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MareaTheme, MareaNotice, MareaButton, MareaInline, MareaContainer, MareaText, FoundationGallery, StructuredGallery, CommerceGallery, InstrumentGallery, AdversarialGallery],
  template: `
    <marea-theme [mode]="mode()" [locale]="locale()">
      <div class="page">
        <marea-container size="wide">
          <header class="head">
            <p class="eyebrow" marea-text variant="meta">MC-17/36 · catálogo interno · no publicado</p>
            <h1 marea-text variant="title1">Sistema de diseño MAREA — catálogo de componentes</h1>
            <p marea-text variant="body" tone="secondary">
              Cada ejemplo siguiente renderiza el componente Angular real. El catálogo se compila como proyecto Angular aislado y no forma parte de
              la aplicación pública. Todos los datos son fixtures internos sintéticos.
            </p>

            <marea-notice variant="internal" heading="Estado interno y provisional" body="Marca MAREA propuesta, no adoptada. Uso público NO_GO. Sin autorización de publicación, sin precio aprobado y sin stock verificado." />

            <div class="controls" role="group" aria-label="Controles del catálogo">
              <div class="control">
                <span class="control-label" marea-text variant="label">Modo visual</span>
                <marea-inline [gap]="2">
                  @for (option of modes; track option.id) {
                    <button
                      marea-button
                      [variant]="mode() === option.id ? 'action' : 'secondary'"
                      size="sm"
                      (activated)="mode.set(option.id)"
                      [attr.aria-pressed]="mode() === option.id"
                    >
                      {{ option.label }}
                    </button>
                  }
                </marea-inline>
              </div>
              <div class="control">
                <span class="control-label" marea-text variant="label">Idioma de los textos del sistema</span>
                <marea-inline [gap]="2">
                  @for (option of locales; track option.id) {
                    <button
                      marea-button
                      [variant]="locale() === option.id ? 'action' : 'secondary'"
                      size="sm"
                      (activated)="locale.set(option.id)"
                      [attr.aria-pressed]="locale() === option.id"
                    >
                      {{ option.label }}
                    </button>
                  }
                </marea-inline>
              </div>
              <p class="mode-note" marea-text variant="meta">
                Modo activo: {{ mode() }} · idioma: {{ locale() }} · contexto: {{ mode().startsWith('instrument') ? 'instrumento' : 'corporativo' }}
              </p>
            </div>
          </header>

          <nav class="toc" aria-label="Secciones del catálogo">
            <a href="#fundamentos">Fundamentos</a>
            <a href="#estructura">Estructura e interacción</a>
            <a href="#comercio">Presentación comercial</a>
            <a href="#instrumentos">Instrumentación interna</a>
            <a href="#adversario">Datos adversarios</a>
          </nav>

          <section id="fundamentos" aria-labelledby="fundamentos-title">
            <h2 id="fundamentos-title" marea-text variant="title2">Fundamentos</h2>
            <marea-foundation-gallery />
          </section>

          <section id="estructura" aria-labelledby="estructura-title">
            <h2 id="estructura-title" marea-text variant="title2">Estructura e interacción</h2>
            <marea-structured-gallery />
          </section>

          <section id="comercio" aria-labelledby="comercio-title">
            <h2 id="comercio-title" marea-text variant="title2">Presentación comercial</h2>
            <marea-commerce-gallery />
          </section>

          <section id="instrumentos" aria-labelledby="instrumentos-title">
            <h2 id="instrumentos-title" marea-text variant="title2">Instrumentación interna (demostración)</h2>
            <p marea-text variant="body" tone="secondary">
              Especímenes de presentación con datos sintéticos. No son instrumentos certificados y no se afirma legibilidad en hardware, visión nocturna,
              transmisión AIS ni control de gobierno.
            </p>
            <marea-instrument-gallery />
          </section>

          <section id="adversario" aria-labelledby="adversario-title">
            <h2 id="adversario-title" marea-text variant="title2">Datos adversarios (fail-closed)</h2>
            <p marea-text variant="body" tone="secondary">
              Los siguientes view models son deliberadamente inválidos o contradictorios. La capa de presentación debe bloquear compra, precio y stock, y
              explicarlo con texto.
            </p>
            <marea-adversarial-gallery />
          </section>

          <footer class="foot">
            <p marea-text variant="meta">
              Catálogo interno. Sin rutas públicas, sin indexación, sin despliegue y sin aprobación de marca. Generado con Angular 21 y pruebas Playwright.
            </p>
          </footer>
        </marea-container>
      </div>
    </marea-theme>
  `,
  styles: `
    :host { display: block; }
    .page { padding-block: 24px 64px; background: var(--marea-canvas); color: var(--marea-text-primary); min-block-size: 100vh; }
    .head { display: grid;
      grid-template-columns: minmax(0, 1fr); gap: 16px; padding-block: 16px 8px; }
    .eyebrow { margin: 0; letter-spacing: 0.12em; text-transform: uppercase; }
    h1 { margin: 0; max-inline-size: 26ch; }
    .controls { display: grid;
      grid-template-columns: minmax(0, 1fr); gap: 12px; padding: 16px 0; border-block: 1px solid var(--marea-line); }
    .control { display: grid;
      grid-template-columns: minmax(0, 1fr); gap: 6px; }
    .control-label { color: var(--marea-text-secondary); }
    .mode-note { margin: 0; }
    .toc { display: flex; flex-wrap: wrap; gap: 8px 20px; padding-block: 16px; border-block-end: 1px solid var(--marea-line); }
    .toc a { color: var(--marea-action); font-weight: 700; font-size: 12px; text-decoration: none; padding: 4px 2px; border-radius: 3px; }
    .toc a:hover { text-decoration: underline; }
    .toc a:focus-visible { outline: 3px solid var(--marea-focus-ring); outline-offset: 2px; }
    section { display: grid;
      grid-template-columns: minmax(0, 1fr); gap: 12px; padding-block: 32px; border-block-end: 1px solid var(--marea-line); }
    section h2 { margin: 0; }
    .foot { padding-block-start: 32px; color: var(--marea-text-secondary); }
  `,
})
export class CatalogueApp {
  readonly modes = MODES;
  readonly locales: readonly { id: MareaLocale; label: string }[] = [
    { id: 'es', label: 'ES' },
    { id: 'en', label: 'EN' },
  ];
  readonly mode = signal<MareaMode>('web-light');
  readonly locale = signal<MareaLocale>('es');
}
