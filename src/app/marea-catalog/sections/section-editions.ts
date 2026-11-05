import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MareaI18n } from '../../marea-design-system/core/i18n';
import { MareaLandingSectionFrame } from '../../marea-landing/components/landing-section';
import { MareaLandingSheetIndex } from '../../marea-landing/components/landing-sheet-index';
import { MareaEditionCard } from '../../marea-design-system/components/commerce/marea-edition-card';
import { MareaGrid } from '../../marea-design-system/components/foundation/marea-grid';
import { MareaNotice } from '../../marea-design-system/components/foundation/marea-notice';
import {
  MareaFeatureComparison,
  type MareaComparisonOption,
  type MareaComparisonRow,
} from '../../marea-design-system/components/structured/marea-feature-comparison';
import { CATALOG_CONTENT, CATALOG_SECTION_ANCHORS } from '../content';
import type { CatalogFamilyId } from '../data/catalog.generated';
import {
  CATALOG_COMMERCIAL_PRESENTATION,
  catalogEditionRecords,
  catalogReadinessSummary,
  editionSummary,
  restrictionsFor,
  readinessStatusOf,
} from '../data/catalog-domain';
import { catalogFamilyRecord } from '../data/catalog-domain';
import { catalogHeadingId } from '../models/catalog-view';
import { MareaCatalogHeading } from '../components/catalog-heading';

/**
 * Section 05 — canonical editions.
 *
 * The feature matrix is built from the canonical feature keys, never from
 * authored differences. The edition cards are the verified MC-17 component and
 * inherit the fail-closed commercial presentation.
 */
@Component({
  selector: 'marea-catalog-editions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MareaCatalogHeading,
    MareaEditionCard,
    MareaFeatureComparison,
    MareaGrid,
    MareaLandingSectionFrame,
    MareaLandingSheetIndex,
    MareaNotice,
  ],
  host: { 'data-marea-catalog-section': 'editions' },
  template: `
    <marea-landing-section [anchor]="anchor" [labelledBy]="headingId()">
      <marea-landing-sheet-index index="05" />
      <marea-catalog-heading
        [headingId]="headingId()"
        [kicker]="copy().sections.editions.kicker[locale()]"
        [heading]="copy().sections.editions.heading[locale()]"
        [lead]="copy().sections.editions.lead[locale()]"
      />
      <div class="matrix">
        <marea-feature-comparison [caption]="caption()" [options]="options()" [rows]="rows()" />
      </div>
      <marea-grid minItem="320px" gap="roomy" class="cards">
        @for (edition of editionSummaries(); track edition.editionId) {
          <marea-edition-card
            [edition]="edition"
            [presentation]="presentation"
            [attr.data-marea-edition]="edition.editionId"
          />
        }
      </marea-grid>
      <div class="note">
        <marea-notice
          variant="warning"
          [heading]="copy().sections.editions.heading[locale()]"
          [body]="copy().editionNote[locale()]"
        />
      </div>
    </marea-landing-section>
  `,
  styles: `
    :host {
      display: block;
    }
    .card {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-3);
    }
    .matrix {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-3);
      margin-block-end: var(--marea-space-5);
    }
    .cards {
      margin-block-start: var(--marea-space-2);
    }
    .note {
      margin-block-start: var(--marea-space-5);
    }
  `,
})
export class MareaCatalogEditions {
  readonly family = input.required<CatalogFamilyId>();

  private readonly i18n = inject(MareaI18n);
  readonly locale = computed(() => this.i18n.locale());
  readonly copy = computed(() => CATALOG_CONTENT[this.family()]);
  readonly anchor = CATALOG_SECTION_ANCHORS.editions;
  readonly headingId = computed(() => catalogHeadingId(this.family(), 'editions'));
  readonly presentation = CATALOG_COMMERCIAL_PRESENTATION;

  readonly options = computed<readonly MareaComparisonOption[]>(() =>
    this.copy().editions.map((edition) => ({
      id: edition.editionId,
      label: edition.name[this.locale()],
    })),
  );

  readonly rows = computed<readonly MareaComparisonRow[]>(() => {
    const records = catalogEditionRecords(this.family());
    const content = this.copy();
    const featureOrder: string[] = [];
    for (const record of records) {
      for (const feature of record.featureKeys) {
        if (!featureOrder.includes(feature)) featureOrder.push(feature);
      }
    }
    return featureOrder.map((feature) => {
      const values: Record<string, boolean> = {};
      for (const record of records) {
        values[record.editionId] = record.featureKeys.includes(feature);
      }
      const label =
        content.editions
          .flatMap((edition) => edition.featureLabels)
          .find((entry) => entry.featureKey === feature)?.label[this.locale()] ?? feature;
      return { feature: label, values };
    });
  });

  readonly editionSummaries = computed(() => {
    const familyRecord = catalogFamilyRecord(this.family());
    if (!familyRecord)
      throw new Error(`MC-20 canonical family projection missing: ${this.family()}`);
    const readiness = readinessStatusOf(
      catalogReadinessSummary(this.family(), this.locale()).overall,
    );
    const restrictions = restrictionsFor(familyRecord);
    const content = this.copy();
    return catalogEditionRecords(this.family()).map((record) => {
      const name = content.editions.find((entry) => entry.editionId === record.editionId);
      return editionSummary(
        record,
        name?.name[this.locale()] ?? record.editionId,
        readiness,
        restrictions,
      );
    });
  });

  caption(): string {
    return `${CATALOG_CONTENT[this.family()].sections.editions.heading.es} / ${CATALOG_CONTENT[this.family()].sections.editions.heading.en}`;
  }
}
