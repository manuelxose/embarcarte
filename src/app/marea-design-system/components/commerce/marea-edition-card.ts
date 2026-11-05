import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MareaI18n, type MareaCopyKey } from '../../core/i18n';
import { MareaIds } from '../../core/ids';
import type {
  MareaCommercialPresentation,
  MareaDefinitionStatus,
  MareaEditionSummary,
  MareaTone,
} from '../../core/types';
import { MareaStatusBadge } from '../foundation/marea-status-badge';
import { MareaSurface } from '../foundation/marea-surface';
import { MareaText } from '../foundation/marea-text';
import { MareaCommercialCta } from './marea-commercial-cta';
import { MareaPriceUnavailable } from './marea-price-unavailable';
import { MareaStockUnavailable } from './marea-stock-unavailable';

const DEFINITION_TONE: Readonly<Record<MareaDefinitionStatus, MareaTone>> = {
  DEFINED: 'neutral',
  CONDITIONAL: 'warning',
  INSTALLATION_PACKAGE: 'info',
};

const DEFINITION_COPY: Readonly<Record<MareaDefinitionStatus, MareaCopyKey>> = {
  DEFINED: 'defined',
  CONDITIONAL: 'conditional',
  INSTALLATION_PACKAGE: 'installationPackage',
};

/**
 * Edition card. An edition is a definition, never a merchant SKU: it always
 * carries the withheld-price and withheld-availability blocks.
 */
@Component({
  selector: 'marea-edition-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'data-marea-component': 'marea-edition-card' },
  imports: [
    MareaStatusBadge,
    MareaSurface,
    MareaText,
    MareaCommercialCta,
    MareaPriceUnavailable,
    MareaStockUnavailable,
  ],
  template: `
    <marea-surface [labelledBy]="titleId">
      <article class="card">
        <div class="head">
          <h3 marea-text variant="title2" class="title" [id]="titleId">
            {{ edition().displayName }}
          </h3>
          <span marea-status-badge [tone]="definitionTone()" [label]="definitionLabel()"></span>
          @if (edition().requiresQuotation) {
            <span marea-status-badge tone="warning" [label]="i18n.text('requiresQuotation')"></span>
          }
        </div>
        <p marea-text variant="meta" class="type">{{ edition().editionType }}</p>
        @if (edition().definitionStatus === 'INSTALLATION_PACKAGE') {
          <p marea-text variant="bodySmall" tone="secondary" class="limitation">
            {{ i18n.text('installationPackage') }} · {{ i18n.text('ctaQuoteOnly') }}
          </p>
        }
        <marea-commercial-cta [presentation]="presentation()" />
        <marea-price-unavailable />
        <marea-stock-unavailable />
      </article>
    </marea-surface>
  `,
  styles: `
    :host {
      display: block;
      min-inline-size: 0;
      color: var(--marea-text-primary);
    }
    .card {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-3);
      min-inline-size: 0;
    }
    .head {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--marea-space-2);
    }
    .title,
    .type,
    .limitation {
      margin: 0;
    }
    .type {
      overflow-wrap: anywhere;
    }
  `,
})
export class MareaEditionCard {
  readonly edition = input.required<MareaEditionSummary>();
  readonly presentation = input.required<MareaCommercialPresentation>();

  readonly i18n = inject(MareaI18n);
  private readonly ids = inject(MareaIds);

  readonly titleId = this.ids.next('edition-card-title');

  readonly definitionTone = computed<MareaTone>(
    () => DEFINITION_TONE[this.edition().definitionStatus] ?? 'neutral',
  );

  readonly definitionLabel = computed(() =>
    this.i18n.text(DEFINITION_COPY[this.edition().definitionStatus] ?? 'notAssessed'),
  );
}
