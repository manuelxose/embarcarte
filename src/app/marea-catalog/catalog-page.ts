import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  computed,
  inject,
  input,
} from '@angular/core';
import { MareaContainer } from '../marea-design-system/components/foundation/marea-container';
import { MareaNotice } from '../marea-design-system/components/foundation/marea-notice';
import { MareaText } from '../marea-design-system/components/foundation/marea-text';
import { MareaResponsiveNav } from '../marea-design-system/components/structured/marea-responsive-nav';
import type { MareaNavItem } from '../marea-design-system/components/structured/marea-responsive-nav';
import { injectMareaI18n } from '../marea-design-system/core/i18n';
import type { MareaLocale } from '../marea-design-system/core/types';
import { MareaTheme } from '../marea-design-system/theme/marea-theme';
import { CATALOG_SHARED } from './content';
import { catalogPreviewHref } from './models/catalog-identity';
import type { CatalogFamilyId } from './data/catalog.generated';
import { MareaCatalogHero } from './sections/section-hero';
import { MareaCatalogOverview } from './sections/section-overview';
import { MareaCatalogCapabilities } from './sections/section-capabilities';
import { MareaCatalogSpecifications } from './sections/section-specifications';
import { MareaCatalogComposition } from './sections/section-composition';
import { MareaCatalogEditions } from './sections/section-editions';
import { MareaCatalogLimitations } from './sections/section-limitations';
import { MareaCatalogEcosystem } from './sections/section-ecosystem';
import { MareaCatalogReadiness } from './sections/section-readiness';
import { MareaCatalogDocumentation } from './sections/section-documentation';
import { MareaCatalogClosing } from './sections/section-closing';

/**
 * MC-20 internal catalogue page.
 *
 * ONE component tree for three canonical families and two locales. It is
 * rendered ONLY by the isolated loopback preview application; no production
 * entry point imports this file and no public route reaches it.
 *
 * The persistent internal banner, the proposed-brand restriction, the
 * no-public-route statement and the no-commerce state are part of the contract
 * and are never removed conditionally.
 */
@Component({
  selector: 'marea-catalog-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MareaCatalogCapabilities,
    MareaCatalogClosing,
    MareaCatalogComposition,
    MareaCatalogDocumentation,
    MareaCatalogEcosystem,
    MareaCatalogEditions,
    MareaCatalogHero,
    MareaCatalogLimitations,
    MareaCatalogOverview,
    MareaCatalogReadiness,
    MareaCatalogSpecifications,
    MareaContainer,
    MareaNotice,
    MareaResponsiveNav,
    MareaText,
    MareaTheme,
  ],
  host: {
    'data-marea-catalog': '',
    '[attr.data-marea-catalog-family]': 'family()',
    '[attr.data-marea-catalog-locale]': 'locale()',
  },
  template: `
    <marea-theme [mode]="'web-light'" [locale]="locale()">
      <a class="skip" [attr.href]="skipHref()">{{ shared.skipLink[locale()] }}</a>

      <div class="classification" role="region" [attr.aria-label]="shared.previewLabel[locale()]">
        <div class="classification-inner">
          <marea-notice
            variant="internal"
            [heading]="shared.previewLabel[locale()]"
            [body]="shared.classificationBanner[locale()]"
          />
          <p class="provisional">{{ shared.provisionalBrand[locale()] }}</p>
        </div>
      </div>

      <header class="header">
        <div class="header-inner">
          <a class="wordmark" [attr.href]="homeHref()" [attr.aria-label]="wordmarkLabel()">
            <svg
              class="glyph"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.4"
              aria-hidden="true"
              focusable="false"
            >
              <circle cx="12" cy="12" r="8.5" />
              <path d="M12 1.5v4M12 18.5v4M1.5 12h4M18.5 12h4" />
              <path d="M12 7.5 13.6 12 12 16.5 10.4 12Z" />
            </svg>
            <span class="mark">MAREA</span>
            <span class="proposed">{{ shared.proposedBrandLabel[locale()] }}</span>
          </a>
          <marea-responsive-nav
            [label]="shared.familiesNavLabel[locale()]"
            [items]="familyNavItems()"
          />
          <a
            class="locale"
            [href]="switchHref()"
            [attr.lang]="locale() === 'es' ? 'en' : 'es-ES'"
            [attr.aria-label]="shared.localeSwitchLabel[locale()]"
          >
            {{ locale() === 'es' ? 'EN' : 'ES' }}
          </a>
        </div>
        <nav class="section-nav" [attr.aria-label]="shared.sectionNavLabel[locale()]">
          <ul class="section-nav-list">
            @for (item of sectionNavItems(); track item.id) {
              <li class="section-nav-item">
                <a class="section-nav-link" [href]="item.href">{{ item.label }}</a>
              </li>
            }
          </ul>
        </nav>
      </header>

      <main id="catalog-main" tabindex="-1" data-marea-catalog-main>
        <marea-catalog-hero [family]="family()" />
        <marea-catalog-overview [family]="family()" />
        <marea-catalog-capabilities [family]="family()" />
        <marea-catalog-specifications [family]="family()" />
        <marea-catalog-composition [family]="family()" />
        <marea-catalog-editions [family]="family()" />
        <marea-catalog-limitations [family]="family()" />
        <marea-catalog-ecosystem [family]="family()" />
        <marea-catalog-readiness [family]="family()" />
        <marea-catalog-documentation [family]="family()" />
        <marea-catalog-closing [family]="family()" />
      </main>

      <footer class="footer">
        <marea-container size="wide">
          <div class="footer-grid">
            <div class="footer-mark">
              <p class="mark">MAREA</p>
              <p marea-text variant="meta" class="footer-line">
                {{ shared.footerClassification[locale()] }}
              </p>
            </div>
            <div class="footer-blocks">
              <p marea-text variant="meta" class="footer-line">
                {{ shared.footerPublicIsolation[locale()] }}
              </p>
              <p marea-text variant="meta" class="footer-line">
                {{ shared.footerGates[locale()] }}
              </p>
              <p marea-text variant="meta" class="footer-line">
                {{ shared.footerNoCommerce[locale()] }}
              </p>
              <p marea-text variant="meta" class="footer-line">
                {{ shared.footerNoEnquiry[locale()] }}
              </p>
            </div>
          </div>
        </marea-container>
      </footer>
    </marea-theme>
  `,
  styles: `
    :host {
      display: block;
      min-block-size: 100%;
      background: var(--marea-canvas, transparent);
    }
    #catalog-main:focus-visible {
      outline: var(--marea-focus-width) var(--marea-focus-style) var(--marea-focus-ring);
      outline-offset: var(--marea-focus-inset);
    }
    .classification {
      border-block-end: var(--marea-border-width-hairline) solid var(--marea-border-strong);
      background: var(--marea-internal-banner-surface);
      color: var(--marea-internal-banner-text);
    }
    .classification-inner {
      display: grid;
      inline-size: min(100% - 2 * var(--marea-space-4), var(--marea-container-wide, 1360px));
      margin-inline: auto;
      gap: var(--marea-space-3);
      padding-block: var(--marea-space-3);
    }
    .provisional {
      margin: 0;
      color: var(--marea-internal-banner-text);
      font-family: var(--marea-font-body);
      font-size: var(--marea-type-meta-size);
      line-height: var(--marea-type-meta-line-height);
      font-weight: 700;
      letter-spacing: 0.04em;
      max-inline-size: var(--marea-measure);
      overflow-wrap: break-word;
    }
    .header {
      background: var(--marea-canvas);
      border-block-end: var(--marea-border-width-hairline) solid var(--marea-line);
      color: var(--marea-text-primary);
    }
    .header-inner,
    .section-nav {
      inline-size: min(100% - 2 * var(--marea-space-4), var(--marea-container-wide, 1360px));
      margin-inline: auto;
    }
    .header-inner {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: var(--marea-space-2) var(--marea-space-4);
      padding-block: var(--marea-space-3);
    }
    .wordmark {
      display: inline-flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--marea-space-2);
      min-block-size: var(--marea-control-md);
      color: var(--marea-text-primary);
      text-decoration: none;
    }
    .wordmark:focus-visible,
    .locale:focus-visible {
      outline: var(--marea-focus-width) var(--marea-focus-style) var(--marea-focus-ring);
      outline-offset: var(--marea-focus-offset);
    }
    .glyph {
      inline-size: var(--marea-icon-md);
      block-size: var(--marea-icon-md);
      flex: 0 0 auto;
      color: var(--marea-action);
    }
    .mark {
      margin: 0;
      font-family: var(--marea-font-display);
      font-size: var(--marea-type-title2-size);
      line-height: var(--marea-type-title2-line-height);
      font-weight: 700;
      letter-spacing: 0.18em;
    }
    .proposed {
      font-family: var(--marea-font-body);
      font-size: var(--marea-type-meta-size);
      line-height: var(--marea-type-meta-line-height);
      color: var(--marea-text-secondary);
      max-inline-size: 18ch;
    }
    .locale {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-block-size: var(--marea-control-md);
      min-inline-size: var(--marea-touch-target-min);
      padding-inline: var(--marea-space-3);
      border: var(--marea-border-width-hairline) solid var(--marea-border-strong);
      border-radius: var(--marea-radius-control);
      background: var(--marea-canvas);
      color: var(--marea-text-primary);
      font-family: var(--marea-font-body);
      font-size: var(--marea-type-label-size);
      line-height: var(--marea-type-label-line-height);
      font-weight: 700;
      letter-spacing: 0.08em;
      text-decoration: none;
    }
    .locale:hover {
      color: var(--marea-action);
      border-color: var(--marea-action);
    }
    .section-nav {
      padding-block: var(--marea-space-2);
      border-block-start: var(--marea-border-width-hairline) solid var(--marea-line);
    }
    .section-nav-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0 var(--marea-space-4);
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .section-nav-item {
      min-inline-size: 0;
    }
    .section-nav-link {
      display: inline-flex;
      align-items: center;
      min-block-size: var(--marea-control-md);
      color: var(--marea-text-secondary);
      font-family: var(--marea-font-body);
      font-size: var(--marea-type-body-small-size);
      line-height: var(--marea-type-body-small-line-height);
      text-decoration: none;
    }
    .section-nav-link:hover {
      color: var(--marea-action);
      text-decoration: underline;
    }
    .section-nav-link:focus-visible {
      outline: var(--marea-focus-width) var(--marea-focus-style) var(--marea-focus-ring);
      outline-offset: var(--marea-focus-inset);
    }
    .footer {
      border-block-start: var(--marea-border-width-strong) solid var(--marea-border-strong);
      background: var(--marea-surface-raised);
      padding-block: var(--marea-space-6);
    }
    .footer-grid {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-4);
    }
    .footer-blocks {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-2);
    }
    .footer-line {
      margin: 0;
      max-inline-size: var(--marea-measure);
    }
    .skip {
      position: fixed;
      inset-block-start: var(--marea-space-3);
      inset-inline-start: var(--marea-space-3);
      z-index: var(--marea-z-skip, 50);
      transform: translateY(calc(-100% - var(--marea-space-6)));
      display: inline-flex;
      align-items: center;
      min-block-size: var(--marea-control-lg);
      padding: var(--marea-space-2) var(--marea-space-4);
      background: var(--marea-surface-raised);
      color: var(--marea-text-primary);
      border: var(--marea-border-width-hairline) solid var(--marea-border-strong);
      border-radius: var(--marea-radius-control);
      font-family: var(--marea-font-body);
      font-size: var(--marea-type-label-size);
      font-weight: 700;
      text-decoration: none;
    }
    .skip:focus-visible {
      transform: translateY(0);
      outline: var(--marea-focus-width) var(--marea-focus-style) var(--marea-focus-ring);
      outline-offset: var(--marea-focus-offset);
    }
    @media (prefers-reduced-motion: no-preference) {
      .skip {
        transition: transform var(--marea-motion-enter) var(--marea-ease-standard);
      }
    }
    @media (min-width: 768px) {
      .classification-inner {
        grid-template-columns: minmax(0, 1.65fr) minmax(0, 1fr);
        align-items: stretch;
        gap: var(--marea-space-5);
      }
      .footer-grid {
        grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
        gap: var(--marea-space-6);
      }
    }
  `,
})
export class MareaCatalogPage implements OnChanges {
  readonly family = input.required<CatalogFamilyId>();
  readonly locale = input<MareaLocale>('es');

  private readonly i18n = injectMareaI18n();

  readonly shared = CATALOG_SHARED;

  ngOnChanges(): void {
    // Set the document locale before any projected section renders, so the
    // server-rendered text and the hydrated client agree byte for byte.
    this.i18n.locale.set(this.locale());
  }

  basePath(): string {
    return catalogPreviewHref(this.family(), this.locale());
  }

  skipHref(): string {
    return `${this.basePath()}#catalog-main`;
  }

  homeHref(): string {
    return `${this.basePath()}#inicio`;
  }

  wordmarkLabel(): string {
    return `${CATALOG_SHARED.proposedBrandLabel[this.locale()]} - MAREA`;
  }

  switchHref(): string {
    return catalogPreviewHref(this.family(), this.locale() === 'es' ? 'en' : 'es');
  }

  /** Cross-navigation between the three catalogue families. */
  familyNavItems(): readonly MareaNavItem[] {
    return CATALOG_SHARED.familyNav.map((entry) => ({
      id: entry.familyId,
      label: entry.label[this.locale()],
      href: catalogPreviewHref(entry.familyId as CatalogFamilyId, this.locale()),
      current: entry.familyId === this.family(),
    }));
  }

  /** In-page section anchors only. */
  sectionNavItems(): readonly MareaNavItem[] {
    return CATALOG_SHARED.navigation.map((entry) => ({
      id: entry.id,
      label: entry.label[this.locale()],
      href: `${this.basePath()}${entry.href}`,
      current: false,
    }));
  }
}
