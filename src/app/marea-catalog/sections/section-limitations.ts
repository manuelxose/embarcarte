import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MareaI18n } from '../../marea-design-system/core/i18n';
import { MareaLandingSectionFrame } from '../../marea-landing/components/landing-section';
import { MareaLandingSheetIndex } from '../../marea-landing/components/landing-sheet-index';
import { MareaCompatibilityNotice } from '../../marea-design-system/components/commerce/marea-compatibility-notice';
import { MareaGrid } from '../../marea-design-system/components/foundation/marea-grid';
import { MareaStatusBadge } from '../../marea-design-system/components/foundation/marea-status-badge';
import { MareaSurface } from '../../marea-design-system/components/foundation/marea-surface';
import { MareaText } from '../../marea-design-system/components/foundation/marea-text';
import type { MareaTone } from '../../marea-design-system/core/types';
import { CATALOG_CONTENT, CATALOG_SECTION_ANCHORS, CATALOG_SHARED } from '../content';
import type { CatalogFamilyId } from '../data/catalog.generated';
import { CATALOG_STATUS_FACTS } from '../data/catalog-domain';
import { catalogHeadingId } from '../models/catalog-view';
import { MareaCatalogHeading } from '../components/catalog-heading';

const KIND_TONE: Readonly<Record<string, MareaTone>> = {
  PROHIBITION: 'critical',
  UNAVAILABLE: 'stale',
  LIMITATION: 'warning',
};

/** Section 06 — explicit limitations, use prohibitions and compatibility state. */
@Component({
  selector: 'marea-catalog-limitations',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MareaCatalogHeading,
    MareaCompatibilityNotice,
    MareaGrid,
    MareaLandingSectionFrame,
    MareaLandingSheetIndex,
    MareaStatusBadge,
    MareaSurface,
    MareaText,
  ],
  host: { 'data-marea-catalog-section': 'limitations' },
  template: `
    <marea-landing-section [anchor]="anchor" [labelledBy]="headingId()" tone="raised">
      <marea-landing-sheet-index index="06" />
      <marea-catalog-heading
        [headingId]="headingId()"
        [kicker]="copy().sections.limitations.kicker[locale()]"
        [heading]="copy().sections.limitations.heading[locale()]"
        [lead]="copy().sections.limitations.lead[locale()]"
      />
      <marea-grid minItem="300px" gap="roomy">
        @for (limitation of copy().limitations; track limitation.contentId) {
          <marea-surface variant="outline" padding="roomy">
            <article class="limitation" [attr.data-marea-limitation]="limitation.contentId">
              <div class="head">
                <h3 marea-text variant="heading" class="title">{{ limitation.label[locale()] }}</h3>
                <span
                  marea-status-badge
                  [tone]="tone(limitation.kind)"
                  [label]="kindLabel(limitation.kind)"
                ></span>
              </div>
              <p marea-text variant="bodySmall" class="body">
                {{ limitation.description[locale()] }}
              </p>
              <div class="meta">
                <p marea-text variant="meta" class="refs">
                  {{ evidence(limitation.evidenceClass) }}
                </p>
                <p marea-text variant="meta" class="refs">
                  {{ label('sourceRefs') }}: {{ limitation.sourceRefs.join(' · ') }}
                </p>
              </div>
            </article>
          </marea-surface>
        }
      </marea-grid>
      <div class="compat">
        <marea-compatibility-notice status="UNTESTED" [testedRows]="testedRows" />
      </div>
    </marea-landing-section>
  `,
  styles: `
    :host {
      display: block;
    }
    .limitation {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-2);
      block-size: 100%;
      align-content: start;
    }
    .head {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--marea-space-2);
    }
    .title,
    .body,
    .refs {
      margin: 0;
    }
    .meta {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-1);
      margin-block-start: var(--marea-space-1);
      padding-block-start: var(--marea-space-2);
      border-block-start: var(--marea-border-width-hairline) solid var(--marea-line);
    }
    .refs {
      overflow-wrap: anywhere;
    }
    .compat {
      margin-block-start: var(--marea-space-5);
    }
  `,
})
export class MareaCatalogLimitations {
  readonly family = input.required<CatalogFamilyId>();

  private readonly i18n = inject(MareaI18n);
  readonly locale = computed(() => this.i18n.locale());
  readonly copy = computed(() => CATALOG_CONTENT[this.family()]);
  readonly anchor = CATALOG_SECTION_ANCHORS.limitations;
  readonly headingId = computed(() => catalogHeadingId(this.family(), 'limitations'));
  readonly testedRows = CATALOG_STATUS_FACTS.testedCompatibilityRows;

  label(key: string): string {
    return CATALOG_SHARED.labels[key]?.[this.locale()] ?? key;
  }

  tone(kind: string): MareaTone {
    return KIND_TONE[kind] ?? 'neutral';
  }

  kindLabel(kind: string): string {
    const key =
      kind === 'PROHIBITION'
        ? 'prohibition'
        : kind === 'UNAVAILABLE'
          ? 'unavailable'
          : 'limitation';
    return this.label(key);
  }

  evidence(code: string): string {
    return CATALOG_SHARED.evidenceVocabulary[code]?.[this.locale()] ?? code;
  }
}
