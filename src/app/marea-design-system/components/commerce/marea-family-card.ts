import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MareaI18n, type MareaCopyKey } from '../../core/i18n';
import { MareaIds } from '../../core/ids';
import type {
  MareaCommercialPresentation,
  MareaFamilySummary,
  MareaReadinessStatus,
  MareaTone,
} from '../../core/types';
import { FAMILY_LIMIT_KEYS, restrictionCopyKey } from '../../data/commerce-presentation.adapter';
import { MareaStatusBadge } from '../foundation/marea-status-badge';
import { MareaSurface } from '../foundation/marea-surface';
import { MareaText } from '../foundation/marea-text';
import { MareaCommercialCta } from './marea-commercial-cta';

const READINESS_TONE: Readonly<Record<MareaReadinessStatus, MareaTone>> = {
  READY: 'safe',
  NOT_READY: 'warning',
  BLOCKED: 'critical',
  NOT_ASSESSED: 'neutral',
};

const READINESS_COPY: Readonly<Record<MareaReadinessStatus, MareaCopyKey>> = {
  READY: 'ready',
  NOT_READY: 'notReady',
  BLOCKED: 'blocked',
  NOT_ASSESSED: 'notAssessed',
};

/** Commercial family card. Renders identity, limits and derived state only. */
@Component({
  selector: 'marea-family-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'data-marea-component': 'marea-family-card' },
  imports: [MareaStatusBadge, MareaSurface, MareaText, MareaCommercialCta],
  template: `
    <marea-surface [labelledBy]="titleId">
      <article class="card">
        <div class="head">
          <h3 marea-text variant="title2" class="title" [id]="titleId">{{ family().displayName }}</h3>
          <span marea-status-badge [tone]="readinessTone()" [label]="readinessLabel()"></span>
        </div>
        <p marea-text variant="body" tone="secondary" class="summary">{{ localizedSummary() }}</p>
        <p marea-text variant="meta" class="meta">{{ family().editionCount }} · {{ i18n.text('editions') }}</p>
        @if (restrictions().length > 0) {
          <ul class="restrictions" [attr.aria-label]="i18n.text('limitations')">
            @for (label of restrictions(); track label) {
              <li class="restriction">{{ label }}</li>
            }
          </ul>
        }
        @if (familyLimit()) {
          <p marea-text variant="bodySmall" tone="secondary" class="family-limit">{{ familyLimit() }}</p>
        }
        @if (ctaHint()) {
          <p marea-text variant="bodySmall" tone="secondary" class="hint">{{ ctaHint() }}</p>
        }
        <marea-commercial-cta [presentation]="presentation()" />
      </article>
    </marea-surface>
  `,
  styles: `
    :host { display: block; min-inline-size: 0; color: var(--marea-text-primary); }
    .card { display: grid;
      grid-template-columns: minmax(0, 1fr); gap: var(--marea-space-3); min-inline-size: 0; }
    .head { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--marea-space-2); }
    .title, .summary, .meta, .hint, .family-limit { margin: 0; }
    .family-limit { color: var(--marea-text-secondary); overflow-wrap: break-word; }
    .restrictions { display: flex; flex-wrap: wrap; gap: var(--marea-space-2); margin: 0; padding: 0; list-style: none; }
    .restriction {
      padding: var(--marea-space-1) var(--marea-space-2);
      border: var(--marea-border-width-hairline) solid var(--marea-line);
      border-radius: var(--marea-radius-pill);
      background: var(--marea-surface-raised);
      color: var(--marea-text-secondary);
      font-size: var(--marea-type-meta-size);
      line-height: var(--marea-type-meta-line-height);
      overflow-wrap: anywhere;
    }
  `,
})
export class MareaFamilyCard {
  readonly family = input.required<MareaFamilySummary>();
  readonly presentation = input.required<MareaCommercialPresentation>();
  readonly ctaHint = input<string | null>(null);

  readonly i18n = inject(MareaI18n);
  private readonly ids = inject(MareaIds);

  readonly titleId = this.ids.next('family-card-title');

  readonly localizedSummary = computed(() => this.family().summary[this.i18n.locale()]);

  readonly readinessTone = computed<MareaTone>(() => READINESS_TONE[this.family().readiness] ?? 'neutral');

  readonly readinessLabel = computed(() => this.i18n.text(READINESS_COPY[this.family().readiness] ?? 'notAssessed'));

  /** Family-specific limit that must never be dropped from a rendered specimen. */
  readonly familyLimit = computed<string | null>(() => {
    const key = FAMILY_LIMIT_KEYS[this.family().familyId];
    return key ? this.i18n.text(key) : null;
  });

  /** At most four distinct visible restriction labels, deduplicated by copy key. */
  readonly restrictions = computed<readonly string[]>(() => {
    const seen = new Set<string>();
    const labels: string[] = [];
    for (const kind of this.family().restrictions) {
      const key = restrictionCopyKey(kind);
      if (seen.has(key)) continue;
      seen.add(key);
      labels.push(this.i18n.text(key));
      if (labels.length === 4) break;
    }
    return labels;
  });
}
