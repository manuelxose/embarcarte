import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MareaI18n } from '../../marea-design-system/core/i18n';
import { MareaLandingSectionFrame } from '../../marea-landing/components/landing-section';
import { MareaLandingSheetIndex } from '../../marea-landing/components/landing-sheet-index';
import { MareaNotice } from '../../marea-design-system/components/foundation/marea-notice';
import { MareaSurface } from '../../marea-design-system/components/foundation/marea-surface';
import {
  MareaSpecTable,
  type MareaSpecRow,
} from '../../marea-design-system/components/structured/marea-spec-table';
import { CATALOG_CONTENT, CATALOG_SECTION_ANCHORS, CATALOG_SHARED } from '../content';
import { CATALOG_READINESS_DIMENSIONS } from '../data/catalog.generated';
import type { CatalogFamilyId } from '../data/catalog.generated';
import { catalogFamilyRecord, statusLabel } from '../data/catalog-domain';
import { catalogHeadingId } from '../models/catalog-view';
import { MareaCatalogHeading } from '../components/catalog-heading';

/** Section 03 — canonical readiness dimensions and declared interfaces. */
@Component({
  selector: 'marea-catalog-specifications',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MareaCatalogHeading,
    MareaLandingSectionFrame,
    MareaLandingSheetIndex,
    MareaNotice,
    MareaSpecTable,
    MareaSurface,
  ],
  host: { 'data-marea-catalog-section': 'specifications' },
  template: `
    <marea-landing-section [anchor]="anchor" [labelledBy]="headingId()">
      <marea-landing-sheet-index index="03" />
      <marea-catalog-heading
        [headingId]="headingId()"
        [kicker]="copy().sections.specifications.kicker[locale()]"
        [heading]="copy().sections.specifications.heading[locale()]"
        [lead]="copy().sections.specifications.lead[locale()]"
      />
      <div class="panels">
        <marea-surface variant="outline">
          <marea-spec-table [caption]="captionReadiness()" [rows]="readinessRows()" />
        </marea-surface>
        <marea-surface variant="outline">
          <marea-spec-table [caption]="captionInterfaces()" [rows]="interfaceRows()" />
        </marea-surface>
      </div>
      <div class="notice">
        <marea-notice
          variant="warning"
          [heading]="label('compatibilityStatus')"
          [body]="label('compatibilityZero')"
        />
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
    .notice {
      margin-block-start: var(--marea-space-5);
    }
    @media (min-width: 1024px) {
      .panels {
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        gap: var(--marea-space-6);
        align-items: start;
      }
    }
  `,
})
export class MareaCatalogSpecifications {
  readonly family = input.required<CatalogFamilyId>();

  private readonly i18n = inject(MareaI18n);
  readonly locale = computed(() => this.i18n.locale());
  readonly copy = computed(() => CATALOG_CONTENT[this.family()]);
  readonly anchor = CATALOG_SECTION_ANCHORS.specifications;
  readonly headingId = computed(() => catalogHeadingId(this.family(), 'specifications'));
  readonly record = computed(() => {
    const record = catalogFamilyRecord(this.family());
    if (!record) throw new Error(`MC-20 canonical family projection missing: ${this.family()}`);
    return record;
  });

  label(key: string): string {
    return CATALOG_SHARED.labels[key]?.[this.locale()] ?? key;
  }

  captionReadiness(): string {
    return `${this.label('readiness')} · ${this.family()}`;
  }

  captionInterfaces(): string {
    return `${this.label('interfaces')} · ${this.family()}`;
  }

  readonly readinessRows = computed<readonly MareaSpecRow[]>(() => {
    const locale = this.locale();
    const record = this.record();
    return CATALOG_READINESS_DIMENSIONS.map((dimension) => {
      const value =
        record.readiness[dimension.dimension as keyof typeof record.readiness] ??
        dimension.currentStatus;
      return {
        label: this.label(dimension.dimension),
        value: statusLabel(value, locale),
        note: value,
      };
    });
  });

  readonly interfaceRows = computed<readonly MareaSpecRow[]>(() =>
    this.copy().interfaces.map((row) => ({
      label: `${row.direction[this.locale()]} · ${row.transport[this.locale()]}`,
      value: row.status[this.locale()],
      note: row.note ? row.note[this.locale()] : null,
    })),
  );
}
