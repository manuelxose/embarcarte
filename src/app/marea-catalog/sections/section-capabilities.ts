import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MareaI18n } from '../../marea-design-system/core/i18n';
import { MareaLandingSectionFrame } from '../../marea-landing/components/landing-section';
import { MareaLandingSheetIndex } from '../../marea-landing/components/landing-sheet-index';
import { MareaGrid } from '../../marea-design-system/components/foundation/marea-grid';
import { MareaStatusBadge } from '../../marea-design-system/components/foundation/marea-status-badge';
import { MareaSurface } from '../../marea-design-system/components/foundation/marea-surface';
import { MareaText } from '../../marea-design-system/components/foundation/marea-text';
import { CATALOG_CONTENT, CATALOG_SECTION_ANCHORS, CATALOG_SHARED } from '../content';
import type { CatalogFamilyId } from '../data/catalog.generated';
import { catalogHeadingId } from '../models/catalog-view';
import { MareaCatalogHeading } from '../components/catalog-heading';

/**
 * Section 02 — capability list.
 *
 * Each capability states the layer it belongs to and carries its evidence class
 * and canonical source references, so a licence or third-party device is never
 * read as a MAREA feature.
 */
@Component({
  selector: 'marea-catalog-capabilities',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MareaCatalogHeading,
    MareaGrid,
    MareaLandingSectionFrame,
    MareaLandingSheetIndex,
    MareaStatusBadge,
    MareaSurface,
    MareaText,
  ],
  host: { 'data-marea-catalog-section': 'capabilities' },
  template: `
    <marea-landing-section [anchor]="anchor" [labelledBy]="headingId()" tone="raised">
      <marea-landing-sheet-index index="02" />
      <marea-catalog-heading
        [headingId]="headingId()"
        [kicker]="copy().sections.capabilities.kicker[locale()]"
        [heading]="copy().sections.capabilities.heading[locale()]"
        [lead]="copy().sections.capabilities.lead[locale()]"
      />
      <marea-grid minItem="300px" gap="roomy">
        @for (capability of copy().capabilities; track capability.contentId) {
          <marea-surface variant="outline" padding="roomy">
            <article class="capability" [attr.data-marea-capability]="capability.contentId">
              <h3 marea-text variant="heading" class="title">{{ capability.label[locale()] }}</h3>
              <p marea-text variant="bodySmall" class="body">
                {{ capability.description[locale()] }}
              </p>
              <div class="meta">
                <span
                  marea-status-badge
                  tone="neutral"
                  [label]="evidence(capability.evidenceClass)"
                ></span>
                <p marea-text variant="meta" class="refs">
                  {{ label('sourceRefs') }}: {{ capability.sourceRefs.join(' · ') }}
                </p>
              </div>
            </article>
          </marea-surface>
        }
      </marea-grid>
    </marea-landing-section>
  `,
  styles: `
    :host {
      display: block;
    }
    .capability {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-2);
      block-size: 100%;
      align-content: start;
    }
    .title,
    .body,
    .refs {
      margin: 0;
    }
    .meta {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-2);
      margin-block-start: var(--marea-space-2);
      padding-block-start: var(--marea-space-2);
      border-block-start: var(--marea-border-width-hairline) solid var(--marea-line);
    }
    .refs {
      overflow-wrap: anywhere;
    }
  `,
})
export class MareaCatalogCapabilities {
  readonly family = input.required<CatalogFamilyId>();

  private readonly i18n = inject(MareaI18n);
  readonly locale = computed(() => this.i18n.locale());
  readonly copy = computed(() => CATALOG_CONTENT[this.family()]);
  readonly anchor = CATALOG_SECTION_ANCHORS.capabilities;
  readonly headingId = computed(() => catalogHeadingId(this.family(), 'capabilities'));

  label(key: string): string {
    return CATALOG_SHARED.labels[key]?.[this.locale()] ?? key;
  }

  evidence(code: string): string {
    return CATALOG_SHARED.evidenceVocabulary[code]?.[this.locale()] ?? code;
  }
}
