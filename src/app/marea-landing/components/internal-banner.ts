import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MareaI18n } from '../../marea-design-system/core/i18n';
import { MareaNotice } from '../../marea-design-system/components/foundation/marea-notice';
import { LANDING_CONTENT } from '../content/landing-content';

/**
 * Persistent internal/provisional classification.
 *
 * This banner is always rendered, in both locales, on both preview paths. It is
 * part of the page contract: removing it would present the proposed MAREA brand
 * as a published product, which is not authorized.
 *
 * The two auxiliary lines use an explicit, opaque internal-banner token colour
 * (no opacity) so they keep at least 4.5:1 contrast on the banner surface. The
 * meta typography is declared locally instead of through `marea-text` so the
 * design-system meta colour cannot override the banner colour token.
 */
@Component({
  selector: 'marea-internal-banner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MareaNotice],
  host: {
    'data-marea-landing-banner': 'internal-provisional',
    role: 'region',
    '[attr.aria-label]': 'bannerLabel()',
  },
  template: `
    <div class="banner">
      <marea-notice
        variant="internal"
        [heading]="banner()"
        [body]="provisional()"
        data-landing-internal-banner
      />
      <div class="meta">
        <p class="preview">{{ preview() }}</p>
        <p class="preview">{{ classification() }}</p>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
      border-block-end: var(--marea-border-width-hairline) solid var(--marea-border-strong);
      background: var(--marea-internal-banner-surface);
      color: var(--marea-internal-banner-text);
    }
    .banner {
      display: grid;
      inline-size: min(100% - 2 * var(--marea-space-4), var(--marea-container-wide, 1360px));
      margin-inline: auto;
      gap: var(--marea-space-3);
      padding-block: var(--marea-space-3);
    }
    .meta {
      display: grid;
      align-content: center;
      gap: var(--marea-space-1);
      min-inline-size: 0;
    }
    .preview {
      margin: 0;
      color: var(--marea-internal-banner-text);
      font-family: var(--marea-type-meta-family);
      font-size: var(--marea-type-meta-size);
      line-height: var(--marea-type-meta-line-height);
      font-weight: var(--marea-type-meta-weight);
      letter-spacing: var(--marea-type-meta-tracking);
      max-inline-size: var(--marea-measure);
      overflow-wrap: break-word;
      text-wrap: pretty;
    }
    @media (min-width: 768px) {
      .banner {
        grid-template-columns: minmax(0, 1.65fr) minmax(0, 1fr);
        align-items: stretch;
        gap: var(--marea-space-5);
      }
      .meta {
        padding-inline-start: var(--marea-space-5);
        border-inline-start: var(--marea-border-width-hairline) solid var(--marea-border-strong);
      }
    }
    @media (max-width: 479px) {
      .banner {
        inline-size: calc(100% - 2 * var(--marea-space-3));
      }
    }
  `,
})
export class MareaLandingInternalBanner {
  private readonly i18n = inject(MareaI18n);
  private readonly content = LANDING_CONTENT;

  readonly bannerLabel = computed(() => this.content.brand.internalBanner.text[this.i18n.locale()]);
  readonly banner = computed(() => this.content.brand.internalBanner.text[this.i18n.locale()]);
  readonly provisional = computed(
    () => this.content.brand.provisionalBrand.text[this.i18n.locale()],
  );
  readonly preview = computed(() => this.content.brand.previewLabel.text[this.i18n.locale()]);
  readonly classification = computed(
    () => this.content.brand.footerClassification.text[this.i18n.locale()],
  );
}
