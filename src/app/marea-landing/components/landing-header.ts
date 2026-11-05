import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MareaI18n } from '../../marea-design-system/core/i18n';
import { MareaResponsiveNav } from '../../marea-design-system/components/structured/marea-responsive-nav';
import type { MareaNavItem } from '../../marea-design-system/components/structured/marea-responsive-nav';
import type { MareaLocale } from '../../marea-design-system/core/types';
import { LANDING_PAGE_IDENTITY } from '../models/page-identity';
import { LANDING_CONTENT } from '../content/landing-content';

const LOCALE_SWITCH_LABEL = {
  es: 'Ver esta vista interna en inglés',
  en: 'View this internal view in Spanish',
} as const;

const PROPOSED_BRAND_LABEL = {
  es: 'Marca propuesta, no adoptada',
  en: 'Proposed brand, not adopted',
} as const;

/**
 * Landing masthead. In-page anchors only: the internal preview never links to a
 * public route. The locale switch points at the other preview path served by the
 * same loopback-only preview server.
 *
 * The compass glyph is original inline SVG, decorative and hidden from assistive
 * technology; it adds the instrument register without introducing an asset.
 */
@Component({
  selector: 'marea-landing-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MareaResponsiveNav],
  host: { 'data-marea-landing-header': '' },
  template: `
    <header class="header">
      <div class="inner">
        <a class="wordmark" href="#hero" [attr.aria-label]="wordmarkLabel()">
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
          <span class="proposed">{{ proposedBrand() }}</span>
        </a>
        <marea-responsive-nav [label]="i18n.text('mainNavigation')" [items]="navItems()" />
        <a
          class="locale"
          [href]="switchHref()"
          [attr.lang]="switchHrefLang()"
          [attr.aria-label]="switchLabel()"
        >
          {{ locale() === 'es' ? 'EN' : 'ES' }}
        </a>
      </div>
    </header>
  `,
  styles: `
    :host {
      display: block;
      background: var(--marea-canvas);
      border-block-end: var(--marea-border-width-hairline) solid var(--marea-line);
      color: var(--marea-text-primary);
    }
    .header {
      inline-size: min(100% - 2 * var(--marea-space-4), var(--marea-container-wide, 1360px));
      margin-inline: auto;
      padding-block: var(--marea-space-3);
    }
    .inner {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: var(--marea-space-2) var(--marea-space-4);
    }
    .wordmark {
      display: inline-flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--marea-space-2);
      color: var(--marea-text-primary);
      text-decoration: none;
      min-block-size: var(--marea-control-md);
      padding-block: var(--marea-space-1);
    }
    .wordmark:hover .mark {
      color: var(--marea-action);
    }
    .wordmark:focus-visible {
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
    .locale:focus-visible {
      outline: var(--marea-focus-width) var(--marea-focus-style) var(--marea-focus-ring);
      outline-offset: var(--marea-focus-offset);
    }
    @media (prefers-reduced-motion: no-preference) {
      .mark,
      .locale {
        transition:
          color var(--marea-motion-state) var(--marea-ease-standard),
          border-color var(--marea-motion-state) var(--marea-ease-standard);
      }
    }
    @media (max-width: 479px) {
      .header {
        inline-size: calc(100% - 2 * var(--marea-space-3));
      }
    }
  `,
})
export class MareaLandingHeader {
  readonly locale = input.required<MareaLocale>();

  readonly i18n = inject(MareaI18n);
  private readonly content = LANDING_CONTENT;

  readonly proposedBrand = computed(() => PROPOSED_BRAND_LABEL[this.locale()]);

  readonly switchHref = computed(() =>
    this.locale() === 'es'
      ? LANDING_PAGE_IDENTITY.locales.en.path
      : LANDING_PAGE_IDENTITY.locales.es.path,
  );

  readonly switchHrefLang = computed(() =>
    this.locale() === 'es'
      ? LANDING_PAGE_IDENTITY.locales.en.hreflang
      : LANDING_PAGE_IDENTITY.locales.es.hreflang,
  );

  readonly switchLabel = computed(() => LOCALE_SWITCH_LABEL[this.locale()]);

  readonly wordmarkLabel = computed(() => `${this.proposedBrand()} - MAREA`);

  readonly navItems = computed<readonly MareaNavItem[]>(() =>
    this.content.navigation.map((entry) => ({
      id: entry.id,
      label: entry.label[this.locale()],
      href: entry.href,
      current: false,
    })),
  );
}
