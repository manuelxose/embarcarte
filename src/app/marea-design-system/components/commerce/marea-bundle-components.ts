import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MareaI18n, type MareaCopyKey } from '../../core/i18n';
import type { MareaBundleLine, MareaInclusion, MareaTone } from '../../core/types';
import { MareaStatusBadge } from '../foundation/marea-status-badge';
import { MareaText } from '../foundation/marea-text';

const INCLUSION_TONE: Readonly<Record<MareaInclusion, MareaTone>> = {
  INCLUDED: 'safe',
  OPTIONAL: 'neutral',
  CONDITIONAL: 'warning',
  QUOTATION_REQUIRED: 'warning',
  EXCLUDED: 'stale',
  CONTRACT_ONLY: 'info',
};

const INCLUSION_COPY: Readonly<Record<MareaInclusion, MareaCopyKey>> = {
  INCLUDED: 'included',
  OPTIONAL: 'optional',
  CONDITIONAL: 'conditionalLine',
  QUOTATION_REQUIRED: 'quotationRequired',
  EXCLUDED: 'excluded',
  CONTRACT_ONLY: 'contractOnly',
};

/**
 * Bundle component list.
 *
 * Kit expansions are rendered as a nested "includes" line on the kit itself, so
 * a kit never becomes extra counted component lines (for example SENSE
 * ESSENTIALS counts POWER + BILGE once).
 */
@Component({
  selector: 'marea-bundle-components',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'data-marea-component': 'marea-bundle-components' },
  imports: [MareaStatusBadge, MareaText],
  template: `
    <section class="bundle-components">
      <h3 marea-text variant="heading" class="heading">
        {{ heading() ?? i18n.text('components') }}
      </h3>
      <ul class="lines">
        @for (line of components(); track line.lineId) {
          <li class="line">
            <div class="line-head">
              <span marea-text variant="label" class="line-name">{{ line.displayName }}</span>
              <span
                marea-status-badge
                [tone]="inclusionTone(line.inclusion)"
                [label]="inclusionLabel(line.inclusion)"
              ></span>
              @if (line.quantity > 1) {
                <span marea-text variant="meta" class="quantity">×{{ line.quantity }}</span>
              }
            </div>
            @if (line.expandsTo.length > 0) {
              <p marea-text variant="bodySmall" tone="secondary" class="expands">
                {{ i18n.text('includes') }}: {{ line.expandsTo.join(', ') }}
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
    .bundle-components {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-3);
      min-inline-size: 0;
    }
    .heading {
      margin: 0;
    }
    .lines {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-2);
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .line {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-1);
      min-inline-size: 0;
    }
    .line-head {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--marea-space-2);
    }
    .line-name {
      font-weight: 600;
      overflow-wrap: anywhere;
    }
    .quantity {
      font-variant-numeric: tabular-nums;
    }
    .expands {
      margin: 0;
    }
  `,
})
export class MareaBundleComponents {
  readonly components = input.required<readonly MareaBundleLine[]>();
  readonly heading = input<string | null>(null);

  readonly i18n = inject(MareaI18n);

  inclusionTone(inclusion: MareaInclusion): MareaTone {
    return INCLUSION_TONE[inclusion] ?? 'neutral';
  }

  inclusionLabel(inclusion: MareaInclusion): string {
    return this.i18n.text(INCLUSION_COPY[inclusion] ?? 'conditionalLine');
  }
}
