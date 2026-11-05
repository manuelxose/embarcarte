import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MareaI18n, type MareaCopyKey } from '../../core/i18n';
import type {
  MareaBlockedSignal,
  MareaCommercialPresentation,
  MareaCtaState,
  MareaTone,
} from '../../core/types';
import { sanitizeCtaState } from '../../data/commerce-presentation.adapter';
import { MareaNotice } from '../foundation/marea-notice';
import { MareaStatusBadge } from '../foundation/marea-status-badge';
import { MareaText } from '../foundation/marea-text';

interface MareaCtaPresentation {
  readonly tone: MareaTone;
  readonly labelKey: MareaCopyKey;
  readonly bodyKey: MareaCopyKey;
}

const CTA_PRESENTATION: Readonly<Record<MareaCtaState, MareaCtaPresentation>> = {
  DISABLED: { tone: 'neutral', labelKey: 'ctaDisabledLabel', bodyKey: 'ctaDisabled' },
  COMING_SOON: { tone: 'info', labelKey: 'ctaComingSoonLabel', bodyKey: 'ctaComingSoon' },
  REQUEST_INFORMATION: {
    tone: 'info',
    labelKey: 'ctaRequestInformationLabel',
    bodyKey: 'ctaRequestInformation',
  },
  QUOTE_ONLY: { tone: 'warning', labelKey: 'ctaQuoteOnlyLabel', bodyKey: 'ctaQuoteOnly' },
  NOT_AVAILABLE: { tone: 'critical', labelKey: 'ctaNotAvailableLabel', bodyKey: 'ctaNotAvailable' },
};

const BLOCKED_SIGNAL_HEADING: Readonly<Record<MareaBlockedSignal, MareaCopyKey>> = {
  BUY_CTA: 'buySignalBlocked',
  CART: 'buySignalBlocked',
  PRICE_VISIBILITY: 'priceSignalBlocked',
  AVAILABILITY_VISIBILITY: 'stockSignalBlocked',
};

/**
 * Derived commerce state, rendered as explanation only.
 *
 * This component deliberately contains no button, anchor or disabled-looking
 * action: the MC-17 presentation contract has no purchase path. Blocked upstream
 * signals are surfaced as honest critical notices, never as a recovered action.
 */
@Component({
  selector: 'marea-commercial-cta',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'data-marea-component': 'marea-commercial-cta' },
  imports: [MareaNotice, MareaStatusBadge, MareaText],
  template: `
    <div class="cta">
      <span marea-status-badge [tone]="cta().tone" [label]="i18n.text(cta().labelKey)"></span>
      <p marea-text variant="bodySmall" tone="secondary" class="explanation">
        {{ i18n.text(cta().bodyKey) }}
      </p>
      <p marea-text variant="meta" class="rule">{{ i18n.text('buyCtaBlockedRule') }}</p>
      <p marea-text variant="meta" class="rule">{{ i18n.text('noPurchasePath') }}</p>
      @for (headingKey of blockedNotices(); track headingKey) {
        <marea-notice variant="critical" [heading]="i18n.text(headingKey)" />
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
      min-inline-size: 0;
      color: var(--marea-text-primary);
    }
    .cta {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-2);
      min-inline-size: 0;
    }
    .explanation {
      margin: 0;
      max-inline-size: var(--marea-measure);
    }
    .rule {
      margin: 0;
      overflow-wrap: anywhere;
    }
  `,
})
export class MareaCommercialCta {
  readonly presentation = input.required<MareaCommercialPresentation>();

  readonly i18n = inject(MareaI18n);

  readonly cta = computed<MareaCtaPresentation>(
    () =>
      CTA_PRESENTATION[sanitizeCtaState(this.presentation().ctaState)] ??
      CTA_PRESENTATION.NOT_AVAILABLE,
  );

  readonly blockedNotices = computed<readonly MareaCopyKey[]>(() => {
    const seen = new Set<string>();
    const keys: MareaCopyKey[] = [];
    for (const signal of this.presentation().blockedSignals) {
      const key = BLOCKED_SIGNAL_HEADING[signal] ?? 'buySignalBlocked';
      if (seen.has(key)) continue;
      seen.add(key);
      keys.push(key);
    }
    return keys;
  });
}
