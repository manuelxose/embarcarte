import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MareaTheme } from '../../src/app/marea-design-system/theme/marea-theme';
import { MareaCatalogConfigurator } from '../../src/app/marea-catalog/sections/section-configurator';
import { CATALOG_SHARED } from '../../src/app/marea-catalog/content';
import { CONFIGURATOR_LABELS } from '../../src/app/marea-catalog/content/configurator';

/**
 * Internal preview host for the MC-24 configurator and quotation triage.
 *
 * Applies non-indexable, non-public metadata and then renders the real
 * configurator section. Like the family catalogue and bundle hosts it emits NO
 * canonical, NO alternative-language links, NO social-card tags and NO JSON-LD:
 * the configurator has no publication or indexation authorisation.
 */
@Component({
  selector: 'marea-configurator-preview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MareaCatalogConfigurator, MareaTheme],
  template: `
    <marea-theme [mode]="'web-light'" [locale]="locale()">
      <a class="skip" href="#configurator-main">{{ shared.skipLink[locale()] }}</a>
      <div class="classification" role="region" [attr.aria-label]="shared.previewLabel[locale()]">
        <p class="banner">{{ shared.classificationBanner[locale()] }}</p>
        <p class="provisional">{{ shared.provisionalBrand[locale()] }}</p>
      </div>
      <main id="configurator-main" tabindex="-1" data-marea-configurator-main>
        <marea-catalog-configurator [locale]="locale()" />
      </main>
    </marea-theme>
  `,
  styles: `
    :host {
      display: block;
      min-block-size: 100%;
    }
    .classification {
      border-block-end: var(--marea-border-width-hairline) solid var(--marea-border-strong);
      background: var(--marea-internal-banner-surface);
      color: var(--marea-internal-banner-text);
      display: grid;
      gap: var(--marea-space-2);
      padding: var(--marea-space-3) var(--marea-space-4);
    }
    .banner,
    .provisional {
      margin: 0;
      font-family: var(--marea-font-body);
      font-size: var(--marea-type-meta-size);
      line-height: var(--marea-type-meta-line-height);
      overflow-wrap: break-word;
    }
    .provisional {
      font-weight: 700;
      letter-spacing: 0.04em;
    }
    #configurator-main {
      padding-block: var(--marea-space-5);
    }
    #configurator-main:focus-visible {
      outline: var(--marea-focus-width) var(--marea-focus-style) var(--marea-focus-ring);
    }
    .skip {
      position: fixed;
      inset-block-start: var(--marea-space-3);
      inset-inline-start: var(--marea-space-3);
      z-index: 50;
      transform: translateY(calc(-100% - var(--marea-space-6)));
      padding: var(--marea-space-2) var(--marea-space-4);
      background: var(--marea-surface-raised);
      color: var(--marea-text-primary);
      border-radius: var(--marea-radius-control);
      text-decoration: none;
    }
    .skip:focus-visible {
      transform: translateY(0);
      outline: var(--marea-focus-width) var(--marea-focus-style) var(--marea-focus-ring);
    }
  `,
})
export class ConfiguratorPreview {
  private readonly route = inject(ActivatedRoute);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  readonly shared = CATALOG_SHARED;

  /** Route data is untrusted input: anything but 'en' falls back to ES. */
  readonly locale = computed<'es' | 'en'>(() =>
    this.route.snapshot.data['locale'] === 'en' ? 'en' : 'es',
  );

  constructor() {
    const locale = this.locale();
    this.title.setTitle(
      `${CONFIGURATOR_LABELS['heading'][locale]} — ${CATALOG_SHARED.previewLabel[locale]}`,
    );
    this.document.documentElement.lang = locale === 'es' ? 'es-ES' : 'en';
    this.document.documentElement.setAttribute('data-marea-preview', 'internal-not-published');
    this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow, noarchive' });
    this.meta.updateTag({ name: 'description', content: CATALOG_SHARED.classificationBanner[locale] });
    this.meta.updateTag({ name: 'marea-publication', content: 'NOT_AUTHORIZED' });
  }
}
