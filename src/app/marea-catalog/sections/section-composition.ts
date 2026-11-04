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

/** Section 04 — hardware/software composition, inclusion and exclusions. */
@Component({
  selector: 'marea-catalog-composition',
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
  host: { 'data-marea-catalog-section': 'composition' },
  template: `
    <marea-landing-section [anchor]="anchor" [labelledBy]="headingId()" tone="raised">
      <marea-landing-sheet-index index="04" />
      <marea-catalog-heading
        [headingId]="headingId()"
        [kicker]="copy().sections.composition.kicker[locale()]"
        [heading]="copy().sections.composition.heading[locale()]"
        [lead]="copy().sections.composition.lead[locale()]"
      />
      <marea-grid minItem="300px" gap="roomy">
        @for (group of copy().composition; track group.groupId) {
          <marea-surface variant="outline" padding="roomy">
            <article class="group" [attr.data-marea-composition]="group.groupId">
              <div class="group-head">
                <h3 marea-text variant="heading" class="title">{{ group.heading[locale()] }}</h3>
                <span marea-status-badge tone="info" [label]="group.label[locale()]"></span>
              </div>
              <ul class="items">
                @for (item of group.items; track item.contentId) {
                  <li class="item">
                    <p marea-text variant="bodySmall" class="text">{{ item.text[locale()] }}</p>
                    <p marea-text variant="meta" class="meta">
                      {{ evidence(item.evidenceClass) }}
                    </p>
                  </li>
                }
              </ul>
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
    .group {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-3);
      block-size: 100%;
      align-content: start;
    }
    .group-head {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--marea-space-2);
    }
    .title,
    .text,
    .meta {
      margin: 0;
    }
    .items {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-2);
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .item {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-1);
      padding-block-start: var(--marea-space-2);
      border-block-start: var(--marea-border-width-hairline) solid var(--marea-line);
    }
  `,
})
export class MareaCatalogComposition {
  readonly family = input.required<CatalogFamilyId>();

  private readonly i18n = inject(MareaI18n);
  readonly locale = computed(() => this.i18n.locale());
  readonly copy = computed(() => CATALOG_CONTENT[this.family()]);
  readonly anchor = CATALOG_SECTION_ANCHORS.composition;
  readonly headingId = computed(() => catalogHeadingId(this.family(), 'composition'));

  evidence(code: string): string {
    return CATALOG_SHARED.evidenceVocabulary[code]?.[this.locale()] ?? code;
  }
}
