import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MareaI18n } from '../../marea-design-system/core/i18n';
import { MareaLandingSectionFrame } from '../components/landing-section';
import { MareaLandingSheetIndex } from '../components/landing-sheet-index';
import { MareaBundleComponents } from '../../marea-design-system/components/commerce/marea-bundle-components';
import { MareaBundleExclusions } from '../../marea-design-system/components/commerce/marea-bundle-exclusions';
import { MareaNotice } from '../../marea-design-system/components/foundation/marea-notice';
import { MareaSectionHeading } from '../../marea-design-system/components/foundation/marea-section-heading';
import { MareaStatusBadge } from '../../marea-design-system/components/foundation/marea-status-badge';
import { MareaSurface } from '../../marea-design-system/components/foundation/marea-surface';
import { MareaText } from '../../marea-design-system/components/foundation/marea-text';
import type { MareaBundleSummary, MareaTone } from '../../marea-design-system/core/types';
import { LANDING_CONTENT } from '../content/landing-content';
import { bundleSummaryFor } from '../data/landing-domain';
import type { LandingBundleCopy } from '../content/content.types';

interface BundleItem {
  readonly copy: LandingBundleCopy;
  readonly summary: MareaBundleSummary;
}

/**
 * Section 05 — the six canonical solution bundles.
 *
 * Composition comes from the verified MC-17 bundle components, which render kit
 * expansions once and state contract-only/ineligible lines explicitly. The
 * landing adds no price, no package price, no stock, no delivery estimate and
 * no orderable state.
 *
 * Composition: numbered concept plates. Two columns on wide screens give the
 * composition ledger enough width to stay legible; each plate stretches to its
 * row height so the six concepts read as a framed register.
 */
@Component({
  selector: 'marea-landing-bundles',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MareaLandingSectionFrame,
    MareaLandingSheetIndex,
    MareaBundleComponents,
    MareaBundleExclusions,
    MareaNotice,
    MareaSectionHeading,
    MareaStatusBadge,
    MareaSurface,
    MareaText,
  ],
  host: { 'data-marea-landing-section': 'bundles' },
  template: `
    <marea-landing-section anchor="paquetes" labelledBy="bundles-heading">
      <marea-landing-sheet-index index="05" />
      <marea-section-heading
        id="bundles-heading"
        [heading]="copy().heading.text[locale()]"
        [kicker]="copy().kicker.text[locale()]"
        [lead]="copy().lead.text[locale()]"
      />
      <div class="bundles">
        @for (item of items(); track item.copy.bundleId; let index = $index) {
          <marea-surface
            variant="raised"
            padding="roomy"
            [labelledBy]="'bundle-' + item.copy.bundleId"
            [attr.data-landing-bundle]="item.copy.bundleId"
          >
            <article class="bundle">
              <div class="head">
                <p class="concept-index" aria-hidden="true">{{ '0' + (index + 1) }}</p>
                <h3 marea-text variant="title2" class="title" [id]="'bundle-' + item.copy.bundleId">
                  {{ item.summary.displayName }}
                </h3>
                <div class="chips">
                  <span
                    marea-status-badge
                    [tone]="compatibilityTone()"
                    [label]="i18n.text('compatibilityUnverified')"
                  ></span>
                  @if (item.summary.contractedSolution) {
                    <span marea-status-badge tone="info" [label]="i18n.text('contractOnly')"></span>
                    <span
                      marea-status-badge
                      tone="warning"
                      [label]="i18n.text('fleetNoHardware')"
                    ></span>
                  }
                </div>
              </div>
              <p marea-text variant="body" tone="secondary" class="summary">
                {{ item.copy.summary.text[locale()] }}
              </p>
              <div class="composition">
                <marea-bundle-components [components]="item.summary.components" />
                @if (item.summary.optionalComponents.length > 0) {
                  <marea-bundle-components
                    [components]="item.summary.optionalComponents"
                    [heading]="i18n.text('optionalComponents')"
                  />
                }
                <marea-bundle-exclusions
                  [contractOnly]="item.summary.contractOnly"
                  [ineligible]="item.summary.ineligible"
                  [externalRequirements]="item.summary.externalRequirements"
                />
              </div>
              <div class="constraints">
                <h4 marea-text variant="label" class="constraints-heading">
                  {{ constraintsLabel() }}
                </h4>
                <ul class="constraints-list">
                  @for (constraint of item.copy.constraints; track constraint.contentId) {
                    <li>
                      <span marea-text variant="bodySmall" tone="secondary">{{
                        constraint.text[locale()]
                      }}</span>
                    </li>
                  }
                </ul>
              </div>
            </article>
          </marea-surface>
        }
      </div>
      <div class="note">
        <marea-notice
          variant="info"
          [heading]="noteHeading()"
          [body]="copy().note.text[locale()]"
        />
      </div>
    </marea-landing-section>
  `,
  styles: `
    :host {
      display: block;
    }
    .bundles {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-4);
      align-items: start;
    }
    .bundle {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-4);
      min-inline-size: 0;
    }
    .head {
      display: grid;
      grid-template-columns: auto minmax(0, 1fr);
      align-items: baseline;
      gap: var(--marea-space-1) var(--marea-space-3);
      min-inline-size: 0;
    }
    .concept-index {
      margin: 0;
      color: var(--marea-action);
      font-family: var(--marea-font-display);
      font-size: var(--marea-type-label-size);
      line-height: var(--marea-type-label-line-height);
      font-weight: 700;
      font-variant-numeric: tabular-nums;
      letter-spacing: 0.12em;
    }
    .title {
      margin: 0;
    }
    .chips {
      grid-column: 1 / -1;
      display: flex;
      flex-wrap: wrap;
      gap: var(--marea-space-2);
      margin-block-start: var(--marea-space-2);
    }
    .summary {
      margin: 0;
      max-inline-size: var(--marea-measure);
    }
    .composition {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-4);
      padding-block-start: var(--marea-space-3);
      border-block-start: var(--marea-border-width-hairline) solid var(--marea-line);
    }
    .constraints {
      display: grid;
      gap: var(--marea-space-2);
      padding-block-start: var(--marea-space-3);
      border-block-start: var(--marea-border-width-hairline) solid var(--marea-line);
    }
    .constraints-heading {
      margin: 0;
      color: var(--marea-text-secondary);
    }
    .constraints-list {
      display: grid;
      gap: var(--marea-space-1);
      margin: 0;
      padding-inline-start: var(--marea-space-4);
    }
    .constraints-list li {
      overflow-wrap: break-word;
    }
    .constraints-list li::marker {
      color: var(--marea-action);
    }
    .note {
      margin-block-start: var(--marea-space-5);
    }
    @media (min-width: 1024px) {
      .bundles {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: var(--marea-space-5);
      }
    }
    @media (min-width: 1280px) {
      .composition {
        grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
      }
    }
  `,
})
export class MareaLandingBundles {
  readonly i18n = inject(MareaI18n);
  readonly copy = computed(() => LANDING_CONTENT.sections.bundles);
  readonly locale = computed(() => this.i18n.locale());

  readonly constraintsLabel = computed(() =>
    this.locale() === 'es' ? 'Restricciones del concepto' : 'Concept constraints',
  );

  readonly noteHeading = computed(() =>
    this.locale() === 'es' ? 'Conceptos internos, no ofertas' : 'Internal concepts, not offers',
  );

  readonly compatibilityTone = computed<MareaTone>(() => 'warning');

  readonly items = computed<readonly BundleItem[]>(() =>
    this.copy().bundles.map((copy) => {
      const summary = bundleSummaryFor(copy.bundleId);
      if (!summary) throw new Error(`Missing verified bundle composition for ${copy.bundleId}`);
      return { copy, summary };
    }),
  );
}
