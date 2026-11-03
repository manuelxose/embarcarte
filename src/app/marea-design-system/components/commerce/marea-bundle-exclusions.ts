import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MareaI18n } from '../../core/i18n';
import type { MareaBundleExclusion } from '../../core/types';
import { MareaStatePanel } from '../foundation/marea-state-panel';
import { MareaText } from '../foundation/marea-text';

/**
 * Exclusions, contract-only elements and external requirements. An empty set is
 * stated explicitly instead of being silently omitted.
 */
@Component({
  selector: 'marea-bundle-exclusions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'data-marea-component': 'marea-bundle-exclusions' },
  imports: [MareaStatePanel, MareaText],
  template: `
    <section class="bundle-exclusions">
      @if (isEmpty()) {
        <marea-state-panel kind="empty" [title]="i18n.text('noneRecorded')" />
      } @else {
        @if (contractOnly().length > 0) {
          <section class="group">
            <h4 marea-text variant="heading" class="heading">{{ i18n.text('contractOnly') }}</h4>
            <ul class="items">
              @for (item of contractOnly(); track item.editionId) {
                <li class="item">
                  <span marea-text variant="label">{{ item.displayName }}</span>
                  <span marea-text variant="meta" class="reason">{{ item.reason }}</span>
                </li>
              }
            </ul>
          </section>
        }
        @if (ineligible().length > 0) {
          <section class="group">
            <h4 marea-text variant="heading" class="heading">{{ i18n.text('exclusions') }}</h4>
            <ul class="items">
              @for (item of ineligible(); track item.editionId) {
                <li class="item">
                  <span marea-text variant="label">{{ item.displayName }}</span>
                  <span marea-text variant="meta" class="reason">{{ item.reason }}</span>
                </li>
              }
            </ul>
          </section>
        }
        @if (externalRequirements().length > 0) {
          <section class="group">
            <h4 marea-text variant="heading" class="heading">{{ i18n.text('externalRequirements') }}</h4>
            <ul class="items">
              @for (requirement of externalRequirements(); track $index) {
                <li class="item">
                  <span marea-text variant="label">{{ requirement }}</span>
                </li>
              }
            </ul>
          </section>
        }
      }
    </section>
  `,
  styles: `
    :host { display: block; min-inline-size: 0; color: var(--marea-text-primary); }
    .bundle-exclusions { display: grid; gap: var(--marea-space-4); min-inline-size: 0; }
    .group { display: grid; gap: var(--marea-space-2); min-inline-size: 0; }
    .heading { margin: 0; }
    .items { display: grid; gap: var(--marea-space-1); margin: 0; padding: 0; list-style: none; }
    .item { display: flex; flex-wrap: wrap; align-items: baseline; gap: var(--marea-space-2); min-inline-size: 0; }
    .item span { overflow-wrap: anywhere; }
    .reason { font-variant-numeric: tabular-nums; }
  `,
})
export class MareaBundleExclusions {
  readonly contractOnly = input<readonly MareaBundleExclusion[]>([]);
  readonly ineligible = input<readonly MareaBundleExclusion[]>([]);
  readonly externalRequirements = input<readonly string[]>([]);

  readonly i18n = inject(MareaI18n);

  readonly isEmpty = computed(
    () =>
      this.contractOnly().length === 0 &&
      this.ineligible().length === 0 &&
      this.externalRequirements().length === 0,
  );
}
