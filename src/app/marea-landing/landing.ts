import { ChangeDetectionStrategy, Component, OnChanges, input } from '@angular/core';
import { injectMareaI18n } from '../marea-design-system/core/i18n';
import type { MareaLocale } from '../marea-design-system/core/types';
import { MareaTheme } from '../marea-design-system/theme/marea-theme';
import { MareaLandingInternalBanner } from './components/internal-banner';
import { MareaLandingHeader } from './components/landing-header';
import { MareaLandingFooter } from './components/landing-footer';
import { MareaLandingHero } from './sections/section-hero';
import { MareaLandingEcosystem } from './sections/section-ecosystem';
import { MareaLandingFamilies } from './sections/section-families';
import { MareaLandingArchitecture } from './sections/section-architecture';
import { MareaLandingBundles } from './sections/section-bundles';
import { MareaLandingSoftwareHardware } from './sections/section-software-hardware';
import { MareaLandingProfessionals } from './sections/section-professionals';
import { MareaLandingDocumentation } from './sections/section-documentation';
import { MareaLandingAvailability } from './sections/section-availability';
import { MareaLandingClosing } from './sections/section-closing';
import { LANDING_CONTENT } from './content/landing-content';
import type { ContentBlock } from './content/content.types';

/**
 * MC-18 internal MAREA landing.
 *
 * One component tree for two locales, wrapped in the verified MC-17 theme host
 * (`web-light` only: instrument modes never appear on the corporate surface).
 * It is rendered ONLY by the isolated preview application; no production entry
 * point imports this file, and no public route reaches it.
 *
 * The internal/provisional banner is part of the contract and is never
 * conditionally removed.
 */
@Component({
  selector: 'marea-landing',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MareaTheme,
    MareaLandingInternalBanner,
    MareaLandingHeader,
    MareaLandingFooter,
    MareaLandingHero,
    MareaLandingEcosystem,
    MareaLandingFamilies,
    MareaLandingArchitecture,
    MareaLandingBundles,
    MareaLandingSoftwareHardware,
    MareaLandingProfessionals,
    MareaLandingDocumentation,
    MareaLandingAvailability,
    MareaLandingClosing,
  ],
  host: {
    'data-marea-landing': '',
    '[attr.data-marea-landing-locale]': 'locale()',
  },
  template: `
    <marea-theme [mode]="'web-light'" [locale]="locale()">
      <a class="skip" href="#landing-main">{{ skipLabel() }}</a>
      <marea-internal-banner />
      <marea-landing-header [locale]="locale()" />
      <main id="landing-main" tabindex="-1" data-marea-landing-main>
        <marea-landing-hero />
        <marea-landing-ecosystem />
        <marea-landing-families />
        <marea-landing-architecture />
        <marea-landing-bundles />
        <marea-landing-software-hardware />
        <marea-landing-professionals />
        <marea-landing-documentation />
        <marea-landing-availability />
        <marea-landing-closing />
      </main>
      <marea-landing-footer />
    </marea-theme>
  `,
  styles: `
    :host {
      display: block;
      min-block-size: 100%;
      background: var(--marea-canvas, transparent);
    }
    #landing-main:focus-visible {
      outline: var(--marea-focus-width) var(--marea-focus-style) var(--marea-focus-ring);
      outline-offset: var(--marea-focus-inset);
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
  `,
})
export class MareaLanding implements OnChanges {
  readonly locale = input<MareaLocale>('es');

  private readonly i18n = injectMareaI18n();

  ngOnChanges(): void {
    // Set the document locale before any projected section renders, so the
    // server-rendered text and the hydrated client agree byte for byte.
    this.i18n.locale.set(this.locale());
  }

  skipLabel(): string {
    return blockText(LANDING_CONTENT.brand.skipLink, this.locale());
  }
}

function blockText(block: ContentBlock, locale: MareaLocale): string {
  return block.text[locale];
}
