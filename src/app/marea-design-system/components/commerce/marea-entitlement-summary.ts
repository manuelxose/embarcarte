import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MareaI18n } from '../../core/i18n';
import type { MareaEntitlement } from '../../core/types';
import { MareaText } from '../foundation/marea-text';

interface MareaEntitlementRow {
  readonly rowKey: string;
  readonly names: string;
  readonly term: string;
  readonly sharedLedger: boolean;
  readonly localSafetyIndependent: boolean;
}

/**
 * Entitlement summary.
 *
 * Entitlements sharing one ledger key collapse into a single row with the
 * explicit shared-ledger note, so one right is never presented as two. Terms are
 * language-neutral domain codes, not offers.
 */
@Component({
  selector: 'marea-entitlement-summary',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'data-marea-component': 'marea-entitlement-summary' },
  imports: [MareaText],
  template: `
    <section class="entitlements">
      <h3 marea-text variant="heading" class="heading">
        {{ heading() ?? i18n.text('entitlements') }}
      </h3>
      <ul class="rows">
        @for (row of rows(); track row.rowKey) {
          <li class="row">
            <div class="row-head">
              <span marea-text variant="label" class="names">{{ row.names }}</span>
              <span marea-text variant="meta" class="term">{{ row.term }}</span>
            </div>
            @if (row.sharedLedger) {
              <p marea-text variant="bodySmall" tone="secondary" class="note">
                {{ i18n.text('sharedEntitlement') }}
              </p>
            }
            @if (row.localSafetyIndependent) {
              <p marea-text variant="bodySmall" tone="secondary" class="note">
                {{ i18n.text('localSafetyIndependent') }}
              </p>
            }
          </li>
        }
      </ul>
    </section>
  `,
  styles: `
    :host {
      display: block;
      min-inline-size: 0;
      color: var(--marea-text-primary);
    }
    .entitlements {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-3);
      min-inline-size: 0;
    }
    .heading {
      margin: 0;
    }
    .rows {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-2);
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .row {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-1);
      padding-block-end: var(--marea-space-2);
      border-block-end: var(--marea-border-width-hairline, 1px) solid var(--marea-line);
      min-inline-size: 0;
    }
    .row:last-child {
      padding-block-end: 0;
      border-block-end: 0;
    }
    .row-head {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      justify-content: space-between;
      gap: var(--marea-space-2);
    }
    .names {
      font-weight: 600;
      overflow-wrap: anywhere;
    }
    .term {
      overflow-wrap: anywhere;
    }
    .note {
      margin: 0;
    }
  `,
})
export class MareaEntitlementSummary {
  readonly entitlements = input.required<readonly MareaEntitlement[]>();
  readonly heading = input<string | null>(null);

  readonly i18n = inject(MareaI18n);

  readonly rows = computed<readonly MareaEntitlementRow[]>(() => {
    const groups = new Map<string, MareaEntitlement[]>();
    const order: string[] = [];

    for (const entitlement of this.entitlements()) {
      const ledgerKey = entitlement.sharedLedgerKey;
      const rowKey = ledgerKey ?? `entitlement:${entitlement.entitlementId}`;
      const group = groups.get(rowKey);
      if (group) {
        group.push(entitlement);
      } else {
        groups.set(rowKey, [entitlement]);
        order.push(rowKey);
      }
    }

    return order.map((rowKey) => {
      const items = groups.get(rowKey) ?? [];
      const terms = [...new Set(items.map((item) => item.term))];
      return {
        rowKey,
        names: items.map((item) => item.name).join(', '),
        term: terms.join(' / '),
        sharedLedger: items.length > 0 && items[0].sharedLedgerKey !== null,
        localSafetyIndependent: items.some((item) => item.localSafetyIndependent),
      };
    });
  });
}
