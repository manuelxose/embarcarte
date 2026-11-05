import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { MareaContainer } from '../../marea-design-system/components/foundation/marea-container';
import { MareaNotice } from '../../marea-design-system/components/foundation/marea-notice';
import { MareaText } from '../../marea-design-system/components/foundation/marea-text';
import { injectMareaI18n } from '../../marea-design-system/core/i18n';
import type { MareaLocale } from '../../marea-design-system/core/types';
import { BUNDLE_CONTENT_LABELS, BUNDLE_STATE_NOTES } from '../content/bundles';
import type { BundleContentLocalized } from '../content/bundles';
import { MareaBundleComparisonTable } from '../components/bundle-comparison-table';
import type {
  MareaBundleComparisonBundle,
  MareaBundleComparisonFamilyRow,
  MareaBundleLegendEntry,
} from '../components/bundle-comparison-table';
import { MareaBundleUpgradeSelector } from '../components/bundle-upgrade-selector';
import type { MareaUpgradeBundleOption } from '../components/bundle-upgrade-selector';
import {
  BUNDLE_ORDER,
  COMPARISON_FAMILY_ORDER,
  INCLUSION_VOCABULARY,
  bundleLines,
  familyInclusion,
  isBlocked,
  isServiceNotImplemented,
  isPurchasable,
  isSupportedUpgradePath,
  crossSellFrom,
  upgradePaths,
} from '../data/bundle-upgrade-paths';
import type { BundleId } from '../data/bundle-comparison';

/**
 * MC-23 bundle comparison page section.
 *
 * The adapter the review asked for: it reads the contract-derived composition
 * from `bundle-upgrade-paths`, localizes every string through the ES/EN content
 * contract, and feeds the two presentation components. It owns no data of its
 * own and adds no commercial affordance.
 *
 * Rendered ONLY by the isolated loopback preview. Nothing here is mounted in
 * the production application, and nothing renders a price, a stock position, a
 * cart control or an ORDERABLE state: `assertsPurchasable()` is the only
 * availability fact this component exposes, and it is always false.
 */

/** Every inclusion value needs a localized label; the map is built once. */
const INCLUSION_LABELS: Readonly<Record<string, BundleContentLocalized>> = {
  INCLUDED: { es: 'Incluido', en: 'Included' },
  REQUIRED_EXTERNAL: { es: 'Externo necesario', en: 'Required external' },
  OPTIONAL: { es: 'Opcional', en: 'Optional' },
  CONDITIONAL: { es: 'Condicional', en: 'Conditional' },
  NOT_INCLUDED: { es: 'No incluido', en: 'Not included' },
  INELIGIBLE: { es: 'No elegible', en: 'Ineligible' },
  QUOTATION_REQUIRED: { es: 'Requiere presupuesto', en: 'Quotation required' },
};

/** Display name per bundle, derived from the content notes rather than authored here. */
const BUNDLE_NAMES: Readonly<Record<string, BundleContentLocalized>> = {
  START: { es: 'MAREA START', en: 'MAREA START' },
  CRUISE: { es: 'MAREA CRUISE', en: 'MAREA CRUISE' },
  SAIL: { es: 'MAREA SAIL', en: 'MAREA SAIL' },
  PROTECT: { es: 'MAREA PROTECT', en: 'MAREA PROTECT' },
  COMPLETE: { es: 'MAREA COMPLETE', en: 'MAREA COMPLETE' },
  FLEET: { es: 'MAREA FLEET', en: 'MAREA FLEET' },
};

@Component({
  selector: 'marea-bundle-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MareaBundleComparisonTable,
    MareaBundleUpgradeSelector,
    MareaContainer,
    MareaNotice,
    MareaText,
  ],
  template: `
    <marea-container size="wide">
      <section class="block" aria-labelledby="mc23-comparison">
        <h2 id="mc23-comparison" marea-text variant="title2">
          {{ labels['comparisonHeading'][locale()] }}
        </h2>
        <marea-bundle-comparison-table
          [bundles]="comparisonBundles()"
          [rows]="comparisonRows()"
          [legend]="legend()"
          [labels]="comparisonLabels()"
        />
      </section>

      <section class="block" aria-labelledby="mc23-upgrade">
        <h2 id="mc23-upgrade" marea-text variant="title2">
          {{ labels['upgradeHeading'][locale()] }}
        </h2>
        <marea-bundle-upgrade-selector
          [bundles]="upgradeOptions()"
          [labels]="selectorLabels()"
          (bundleSelected)="onSelect($event)"
        />
        @if (selectedId(); as selected) {
          <ul class="paths" [attr.aria-label]="labels['upgradeHeading'][locale()]">
            @for (path of pathsForSelected(); track path.upgradeId) {
              <li class="path">
                <p marea-text variant="label">{{ bundleName(path.fromBundleId) }}</p>
                <p marea-text variant="meta">{{ quoteNote(path.requiresNewQuotation) }}</p>
              </li>
            }
          </ul>
        }
      </section>

      <section class="block" aria-labelledby="mc23-state">
        <h2 id="mc23-state" marea-text variant="title2">
          {{ labels['stateHeading'][locale()] }}
        </h2>
        <ul class="notes">
          @for (entry of stateNotes(); track entry.bundleId) {
            <li class="note">
              <p marea-text variant="label">{{ entry.name }}</p>
              <p marea-text variant="meta">{{ entry.note }}</p>
            </li>
          }
        </ul>
        <marea-notice
          variant="internal"
          [heading]="labels['notForSale'][locale()]"
          [body]="labels['quotationRequired'][locale()]"
        />
      </section>
    </marea-container>
  `,
  styles: `
    :host {
      display: block;
    }
    .block {
      margin-block-end: var(--marea-space-7);
    }
    .block h2 {
      margin-block: 0 var(--marea-space-3);
    }
    .paths,
    .notes {
      margin: var(--marea-space-3) 0 0;
      padding: 0;
      list-style: none;
      display: grid;
      gap: var(--marea-space-3);
    }
    .path,
    .note {
      overflow-wrap: anywhere;
    }
    .path p,
    .note p {
      margin: 0;
    }
  `,
})
export class MareaBundleSection {
  readonly locale = input<MareaLocale>('es');

  private readonly i18n = injectMareaI18n();

  readonly labels = BUNDLE_CONTENT_LABELS;

  readonly selectedId = signal<string | null>(null);

  onSelect(bundleId: string | null): void {
    this.i18n.locale.set(this.locale());
    this.selectedId.set(bundleId);
  }

  /** Columns of the comparison: the six canonical bundles, in contract order. */
  readonly comparisonBundles = computed<readonly MareaBundleComparisonBundle[]>(() => {
    const locale = this.locale();
    return BUNDLE_ORDER.map((bundleId) => ({
      bundleId,
      displayName: BUNDLE_NAMES[bundleId][locale],
      stateLabel: BUNDLE_STATE_NOTES[bundleId][locale],
    }));
  });

  /**
   * Rows of the comparison: ONE ROW PER LINE, so edition-level truth survives.
   *
   * A one-cell-per-family table would show START's NAV-PRO and CRUISE's
   * NAV-ESSENTIAL as the same "Included", which is exactly the ambiguity the
   * review flagged. Each row is a contract line, labelled with its edition.
   */
  readonly comparisonRows = computed<readonly MareaBundleComparisonFamilyRow[]>(() => {
    const locale = this.locale();
    const rows: MareaBundleComparisonFamilyRow[] = [];
    const seen = new Set<string>();
    for (const bundleId of BUNDLE_ORDER) {
      for (const line of bundleLines(bundleId)) {
        const key = `${line.familyId ?? 'EXTERNAL'}::${line.editionId ?? line.lineId}`;
        if (seen.has(key)) continue;
        seen.add(key);
        const label = line.editionId
          ? `${line.familyId} · ${line.editionId}`
          : `${line.familyId ?? 'EXTERNAL'} · ${line.lineId}`;
        const cells: Record<string, { vocabulary: string; label: string }> = {};
        for (const otherId of BUNDLE_ORDER) {
          const match = bundleLines(otherId).find(
            (candidate) => `${candidate.familyId ?? 'EXTERNAL'}::${candidate.editionId ?? candidate.lineId}` === key,
          );
          const vocabulary = match ? match.inclusion : 'NOT_INCLUDED';
          cells[otherId] = { vocabulary, label: INCLUSION_LABELS[vocabulary][locale] };
        }
        rows.push({
          familyId: key,
          familyLabel: label,
          cells,
        });
      }
    }
    return rows;
  });

  readonly legend = computed<readonly MareaBundleLegendEntry[]>(() => {
    const locale = this.locale();
    return INCLUSION_VOCABULARY.map((vocabulary) => ({
      vocabulary,
      label: INCLUSION_LABELS[vocabulary][locale],
    }));
  });

  readonly comparisonLabels = computed(() => ({
    caption: BUNDLE_CONTENT_LABELS['comparisonCaption'][this.locale()],
    legendTitle: BUNDLE_CONTENT_LABELS['inclusionLegend'][this.locale()],
  }));

  readonly selectorLabels = computed(() => ({
    groupLabel: BUNDLE_CONTENT_LABELS['selectorLabel'][this.locale()],
    pathHeading: BUNDLE_CONTENT_LABELS['selectorHeading'][this.locale()],
    pathIdleLabel: BUNDLE_CONTENT_LABELS['selectorLabel'][this.locale()],
    pathListLabel: BUNDLE_CONTENT_LABELS['additionsLabel'][this.locale()],
  }));

  /** Selector options: only bundles that have at least one supported upgrade path. */
  readonly upgradeOptions = computed<readonly MareaUpgradeBundleOption[]>(() => {
    const locale = this.locale();
    return BUNDLE_ORDER.filter((bundleId) =>
      upgradePaths(bundleId).some((path) => isSupportedUpgradePath(path.upgradeId)),
    ).map((bundleId) => ({
      bundleId,
      displayName: BUNDLE_NAMES[bundleId][locale],
      stateLabel: BUNDLE_STATE_NOTES[bundleId][locale],
      pathAdditions: upgradePaths(bundleId)
        .filter((path) => isSupportedUpgradePath(path.upgradeId))
        .flatMap((path) => path.adds),
    }));
  });

  /** Supported paths for the selected bundle. Non-supported paths are never shown. */
  readonly pathsForSelected = computed(() => {
    const selected = this.selectedId();
    if (selected === null) return [];
    return upgradePaths(selected).filter((path) => isSupportedUpgradePath(path.upgradeId));
  });

  /** Localized display name for a bundle id, or the raw id when unknown. */
  bundleName(bundleId: string | null): string {
    if (bundleId === null) return '';
    return BUNDLE_NAMES[bundleId]?.[this.locale()] ?? bundleId;
  }

  /**
   * Localized note about whether the path needs a new quotation.
   *
   * The contract's own `condition` prose is internal wording (it mentions
   * hypotheses and blocked gates), so it is never printed as buyer-facing copy.
   */
  quoteNote(requiresNewQuotation: boolean): string {
    const locale = this.locale();
    return requiresNewQuotation
      ? BUNDLE_CONTENT_LABELS['quotationRequired'][locale]
      : BUNDLE_CONTENT_LABELS['priceConfirmOnly'][locale];
  }

  readonly stateNotes = computed(() => {
    const locale = this.locale();
    return BUNDLE_ORDER.map((bundleId) => ({
      bundleId,
      name: BUNDLE_NAMES[bundleId][locale],
      note: BUNDLE_STATE_NOTES[bundleId][locale],
    }));
  });

  /**
   * Exposed so a test can assert the catalogue never claims a bundle is
   * purchasable. It is false for every bundle in MC-08 and must stay false.
   */
  assertsPurchasable(bundleId: BundleId): boolean {
    return isPurchasable(bundleId);
  }

  /** Families present in at least one line, canonical order. */
  readonly familyIds = COMPARISON_FAMILY_ORDER;

  /** Convenience for the state section: is this bundle held by a safety gate? */
  isHeld(bundleId: BundleId): boolean {
    return isBlocked(bundleId);
  }

  /** Convenience for the state section: is this bundle's service unimplemented? */
  isUnimplemented(bundleId: BundleId): boolean {
    return isServiceNotImplemented(bundleId);
  }

  /** Convenience: cross-sell rules originating at a bundle. */
  crossSell(bundleId: BundleId) {
    return crossSellFrom(bundleId);
  }

  /** Convenience: strongest inclusion for a family, used by compact views. */
  strongestInclusion(bundleId: BundleId, familyId: string): string {
    return familyInclusion(bundleId, familyId);
  }
}
