import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MareaI18n } from '../../marea-design-system/core/i18n';
import { MareaLandingSectionFrame } from '../../marea-landing/components/landing-section';
import { MareaLandingSheetIndex } from '../../marea-landing/components/landing-sheet-index';
import { MareaSurface } from '../../marea-design-system/components/foundation/marea-surface';
import { MareaText } from '../../marea-design-system/components/foundation/marea-text';
import {
  MareaDefinitionList,
  type MareaDefinitionItem,
} from '../../marea-design-system/components/structured/marea-definition-list';
import { CATALOG_CONTENT, CATALOG_SECTION_ANCHORS, CATALOG_SHARED } from '../content';
import { catalogFamilyRecord, statusLabel } from '../data/catalog-domain';
import type { CatalogFamilyId } from '../data/catalog.generated';
import { catalogHeadingId } from '../models/catalog-view';
import { MareaCatalogHeading } from '../components/catalog-heading';

/** Section 01 — canonical identity at a glance plus internal overview notes. */
@Component({
  selector: 'marea-catalog-overview',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MareaCatalogHeading,
    MareaDefinitionList,
    MareaLandingSectionFrame,
    MareaLandingSheetIndex,
    MareaSurface,
    MareaText,
  ],
  host: { 'data-marea-catalog-section': 'overview' },
  template: `
    <marea-landing-section [anchor]="anchor" [labelledBy]="headingId()">
      <marea-landing-sheet-index index="01" />
      <marea-catalog-heading
        [headingId]="headingId()"
        [kicker]="copy().sections.overview.kicker[locale()]"
        [heading]="copy().sections.overview.heading[locale()]"
        [lead]="copy().sections.overview.lead[locale()]"
      />
      <div class="panels">
        <marea-surface variant="outline">
          <marea-definition-list [label]="label('productType')" [items]="identityItems()" />
        </marea-surface>
        <div class="notes">
          @for (note of copy().overviewNotes; track note.contentId) {
            <div class="note">
              <p marea-text variant="bodySmall" class="note-text">{{ note.text[locale()] }}</p>
              <p marea-text variant="meta" class="note-meta">
                {{ evidence(note.evidenceClass) }}
              </p>
            </div>
          }
        </div>
      </div>
    </marea-landing-section>
  `,
  styles: `
    :host {
      display: block;
    }
    .panels {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-5);
    }
    .notes {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-3);
      align-content: start;
    }
    .note {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-1);
      padding-block-start: var(--marea-space-3);
      border-block-start: var(--marea-border-width-hairline) solid var(--marea-line);
    }
    .note-text,
    .note-meta {
      margin: 0;
    }
    @media (min-width: 960px) {
      .panels {
        grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
        gap: var(--marea-space-6);
        align-items: start;
      }
    }
  `,
})
export class MareaCatalogOverview {
  readonly family = input.required<CatalogFamilyId>();

  private readonly i18n = inject(MareaI18n);
  readonly locale = computed(() => this.i18n.locale());
  readonly copy = computed(() => CATALOG_CONTENT[this.family()]);
  readonly anchor = CATALOG_SECTION_ANCHORS.overview;
  readonly headingId = computed(() => catalogHeadingId(this.family(), 'overview'));
  readonly record = computed(() => {
    const record = catalogFamilyRecord(this.family());
    if (!record) throw new Error(`MC-20 canonical family projection missing: ${this.family()}`);
    return record;
  });

  label(key: string): string {
    return CATALOG_SHARED.labels[key]?.[this.locale()] ?? key;
  }

  readonly identityItems = computed<readonly MareaDefinitionItem[]>(() => {
    const locale = this.locale();
    const record = this.record();
    const t = (code: string) => statusLabel(code, locale);
    return [
      { term: this.label('productType'), definition: t(record.productType) },
      { term: this.label('lifecycle'), definition: t(record.lifecycleState) },
      { term: this.label('definition'), definition: t(record.definitionStatus) },
      { term: this.label('publication'), definition: t(record.publicationState) },
      { term: this.label('availability'), definition: t(record.commercialAvailability) },
      { term: this.label('editionCount'), definition: String(record.editionIds.length) },
      {
        term: this.label('route'),
        definition: `${record.proposedRoute.routeId} — ${t(record.proposedRoute.status)}`,
        note: `${record.proposedRoute.es} · ${record.proposedRoute.en}`,
      },
      {
        term: this.label('releaseGates'),
        definition: `${record.releaseGateIds.length} · ${this.label('openGate')}`,
      },
    ];
  });

  evidence(code: string): string {
    return CATALOG_SHARED.evidenceVocabulary[code]?.[this.locale()] ?? code;
  }
}
