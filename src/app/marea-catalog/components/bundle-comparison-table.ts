import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import {
  MareaComparisonOption,
  MareaComparisonRow,
  MareaFeatureComparison,
} from '../../marea-design-system/components/structured/marea-feature-comparison';
import { MareaText } from '../../marea-design-system/components/foundation/marea-text';

/**
 * MC-23 bundle comparison (presentation only).
 *
 * Thin adapter over the verified `marea-feature-comparison` table: bundles
 * become comparison options and bundle families become comparison rows. The
 * MC-08 inclusion vocabulary travels as already-localized TEXT values (never
 * as booleans), so the reused table cannot collapse a commercial
 * classification into yes/no; a bundle without a cell for a family falls
 * through to the reused table's own fail-closed "unverified" rendering.
 *
 * The component owns no copy and no domain logic: every visible string
 * arrives through the `labels` input and the localized data records. The
 * per-bundle state labels and the visible inclusion-vocabulary legend are
 * rendered here, next to the table, to keep MAREA commercial truthfulness
 * readable at every viewport.
 */

/** One bundle column of the comparison. */
export interface MareaBundleComparisonBundle {
  /** Stable bundle identifier (data key only, never rendered as copy). */
  readonly bundleId: string;
  /** Already-localized bundle display name (table column header). */
  readonly displayName: string;
  /** Already-localized readiness/lifecycle state label for the bundle. */
  readonly stateLabel: string;
}

/** One inclusion cell for a (family, bundle) position. */
export interface MareaBundleComparisonCell {
  /**
   * MC-08 inclusion vocabulary key (INCLUDED, REQUIRED_EXTERNAL, OPTIONAL,
   * CONDITIONAL, NOT_INCLUDED, INELIGIBLE, QUOTATION_REQUIRED).
   */
  readonly vocabulary: string;
  /** Already-localized text label rendered inside the cell; never a boolean. */
  readonly label: string;
}

/** One family row of the comparison. */
export interface MareaBundleComparisonFamilyRow {
  /** Stable family identifier (data key only). */
  readonly familyId: string;
  /** Already-localized family display label (table row header). */
  readonly familyLabel: string;
  /** Inclusion cells keyed by bundleId; a missing key renders as unverified. */
  readonly cells: Readonly<Record<string, MareaBundleComparisonCell>>;
}

/** One visible legend entry explaining an inclusion vocabulary key. */
export interface MareaBundleLegendEntry {
  /** Vocabulary key matching MareaBundleComparisonCell.vocabulary. */
  readonly vocabulary: string;
  /** Already-localized legend label. */
  readonly label: string;
}

/** Already-localized chrome copy for the bundle comparison. */
export interface MareaBundleComparisonLabels {
  /** Visible, accessible caption forwarded to the reused comparison table. */
  readonly caption: string;
  /** Visible heading of the inclusion-vocabulary legend. */
  readonly legendTitle: string;
}

@Component({
  selector: 'marea-bundle-comparison-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MareaFeatureComparison, MareaText],
  template: `
    <marea-feature-comparison
      [caption]="labels().caption"
      [options]="options()"
      [rows]="comparisonRows()"
    />
    <ul class="states" role="list">
      @for (bundle of bundles(); track bundle.bundleId) {
        <li role="listitem">
          <span class="state-name">{{ bundle.displayName }}</span>
          <span marea-text variant="meta">{{ bundle.stateLabel }}</span>
        </li>
      }
    </ul>
    <div class="legend">
      <p marea-text variant="label">{{ labels().legendTitle }}</p>
      <ul class="legend-list" role="list">
        @for (entry of legend(); track entry.vocabulary) {
          <li
            role="listitem"
            marea-text
            variant="bodySmall"
            [attr.data-marea-vocabulary]="entry.vocabulary"
          >
            {{ entry.label }}
          </li>
        }
      </ul>
    </div>
  `,
  styles: `
    :host {
      display: block;
      min-inline-size: 0;
    }
    .states {
      margin: var(--marea-space-3) 0 0;
      padding: 0;
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      gap: var(--marea-space-2) var(--marea-space-4);
    }
    .states li {
      display: inline-flex;
      align-items: baseline;
      gap: var(--marea-space-2);
      overflow-wrap: anywhere;
    }
    .state-name {
      font-family: var(--marea-type-label-family);
      font-size: var(--marea-type-label-size);
      line-height: var(--marea-type-label-line-height);
      font-weight: 700;
      letter-spacing: var(--marea-type-label-tracking);
      color: var(--marea-text-primary);
    }
    .legend {
      margin-block-start: var(--marea-space-3);
      display: grid;
      gap: var(--marea-space-2);
    }
    .legend-list {
      margin: 0;
      padding: 0;
      list-style: none;
      display: grid;
      gap: var(--marea-space-1);
    }
  `,
})
export class MareaBundleComparisonTable {
  readonly bundles = input.required<readonly MareaBundleComparisonBundle[]>();
  readonly rows = input.required<readonly MareaBundleComparisonFamilyRow[]>();
  readonly legend = input.required<readonly MareaBundleLegendEntry[]>();
  readonly labels = input.required<MareaBundleComparisonLabels>();

  /** Reused-table columns: one option per bundle, named by displayName only. */
  readonly options = computed<readonly MareaComparisonOption[]>(() =>
    this.bundles().map((bundle) => ({ id: bundle.bundleId, label: bundle.displayName })),
  );

  /** Reused-table rows: localized inclusion-vocabulary labels as TEXT values. */
  readonly comparisonRows = computed<readonly MareaComparisonRow[]>(() =>
    this.rows().map((row) => ({
      feature: row.familyLabel,
      values: this.cellValues(row),
    })),
  );

  /**
   * Localized label per bundle; `null` (data gap) lets the reused table apply
   * its fail-closed "unverified" cell. Booleans are never emitted, so a
   * commercial classification is never collapsed into yes/no.
   */
  private cellValues(row: MareaBundleComparisonFamilyRow): Record<string, string | null> {
    const values: Record<string, string | null> = {};
    for (const bundle of this.bundles()) {
      const cell = row.cells[bundle.bundleId];
      values[bundle.bundleId] = cell ? cell.label : null;
    }
    return values;
  }
}