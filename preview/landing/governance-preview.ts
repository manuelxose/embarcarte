import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MareaTheme } from '../../src/app/marea-design-system/theme/marea-theme';
import { MareaCatalogSkuGovernance } from '../../src/app/marea-catalog/sections/section-sku-governance';
import { CATALOG_SHARED } from '../../src/app/marea-catalog/content';
import { GOVERNANCE_LABELS } from '../../src/app/marea-catalog/content/governance';

/**
 * Internal preview host for the MC-25 SKU governance screen.
 *
 * Applies non-indexable, non-public metadata and renders the real governance
 * section. No canonical, no alternative-language links, no social card, no
 * JSON-LD: an internal administration screen has no publication or indexation
 * authorisation.
 */
@Component({
  selector: 'marea-governance-preview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MareaCatalogSkuGovernance, MareaTheme],
  template: `
    <marea-theme [mode]="'web-light'" [locale]="locale()">
      <a class="skip" href="#governance-main">{{ shared.skipLink[locale()] }}</a>
      <div class="classification" role="region" [attr.aria-label]="shared.previewLabel[locale()]">
        <p class="banner">{{ shared.classificationBanner[locale()] }}</p>
        <p class="provisional">{{ shared.provisionalBrand[locale()] }}</p>
      </div>
      <main id="governance-main" tabindex="-1" data-mc25-governance-main>
        <marea-catalog-sku-governance [locale]="locale()" />
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
    #governance-main {
      padding-block: var(--marea-space-5);
    }
    #governance-main:focus-visible {
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
export class GovernancePreview {
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
      `${GOVERNANCE_LABELS['heading'][locale]} — ${CATALOG_SHARED.previewLabel[locale]}`,
    );
    this.document.documentElement.lang = locale === 'es' ? 'es-ES' : 'en';
    this.document.documentElement.setAttribute('data-marea-preview', 'internal-not-published');
    this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow, noarchive' });
    this.meta.updateTag({
      name: 'description',
      content: CATALOG_SHARED.classificationBanner[locale],
    });
    this.meta.updateTag({ name: 'marea-publication', content: 'NOT_AUTHORIZED' });
  }
}
