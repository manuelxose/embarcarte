import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MareaI18n } from '../../marea-design-system/core/i18n';
import { MareaLandingSectionFrame } from '../../marea-landing/components/landing-section';
import { MareaLandingSheetIndex } from '../../marea-landing/components/landing-sheet-index';
import { MareaCommercialCta } from '../../marea-design-system/components/commerce/marea-commercial-cta';
import { MareaReadinessPanel } from '../../marea-design-system/components/commerce/marea-readiness-panel';
import { MareaNotice } from '../../marea-design-system/components/foundation/marea-notice';
import { MareaSurface } from '../../marea-design-system/components/foundation/marea-surface';
import {
  MareaDefinitionList,
  type MareaDefinitionItem,
} from '../../marea-design-system/components/structured/marea-definition-list';
import { MareaText } from '../../marea-design-system/components/foundation/marea-text';
import { SEGMENT_CONTENT } from '../content';
import { SEGMENT_SECTION_ANCHORS } from '../content/content.types';
import {
  SEGMENT_COMMERCIAL_PRESENTATION,
  SEGMENT_STATUS_FACTS,
  sectionHeadingId,
  segmentReadinessSummary,
} from '../data/segments-domain';
import type { SegmentId } from '../models/segment-identity';
import { MareaSegmentHeading } from '../components/segment-heading';

/**
 * Section 06 — explicit availability and readiness states.
 *
 * The readiness summary is derived server-side from the canonical dimensions.
 * The recorded facts are copied from the generated projection and the commercial
 * CTA is the verified fail-closed MC-17 component: no button, no price, no stock.
 */
@Component({
  selector: 'marea-segment-readiness',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MareaCommercialCta,
    MareaDefinitionList,
    MareaLandingSectionFrame,
    MareaLandingSheetIndex,
    MareaNotice,
    MareaReadinessPanel,
    MareaSegmentHeading,
    MareaSurface,
    MareaText,
  ],
  host: { 'data-marea-segment-section': 'readiness' },
  template: `
    <marea-landing-section [anchor]="anchor" [labelledBy]="headingId()" tone="raised">
      <marea-landing-sheet-index index="06" />
      <marea-segment-heading
        [headingId]="headingId()"
        [kicker]="copy().kicker.text[locale()]"
        [heading]="copy().heading.text[locale()]"
        [lead]="copy().lead.text[locale()]"
      />
      <div class="panels">
        <marea-surface variant="outline">
          <marea-readiness-panel [summary]="readiness()" />
        </marea-surface>
        <div class="side">
          <marea-definition-list
            [label]="labels().readinessFacts.text[locale()]"
            [items]="factItems()"
          />
          <ul class="statements">
            @for (statement of copy().statements; track statement.contentId) {
              <li class="statement">
                <p marea-text variant="bodySmall" tone="secondary" class="statement-text">
                  {{ statement.text[locale()] }}
                </p>
              </li>
            }
          </ul>
        </div>
      </div>
      <div class="cta">
        <marea-surface variant="raised">
          <marea-commercial-cta [presentation]="presentation" />
        </marea-surface>
      </div>
      <div class="gate-note">
        <marea-notice
          variant="critical"
          [heading]="copy().heading.text[locale()]"
          [body]="copy().gateNote.text[locale()]"
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
    .side {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-4);
      min-inline-size: 0;
    }
    .statements {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-2);
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .statement {
      padding-block-start: var(--marea-space-2);
      border-block-start: var(--marea-border-width-hairline) solid var(--marea-line);
    }
    .statement-text {
      margin: 0;
    }
    .cta,
    .gate-note {
      margin-block-start: var(--marea-space-5);
    }
    @media (min-width: 900px) {
      .panels {
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        gap: var(--marea-space-6);
        align-items: start;
      }
    }
  `,
})
export class MareaSegmentReadiness {
  readonly segment = input.required<SegmentId>();

  private readonly i18n = inject(MareaI18n);
  readonly locale = computed(() => this.i18n.locale());
  readonly copy = computed(() => SEGMENT_CONTENT.segments[this.segment()].readiness);
  readonly labels = computed(() => SEGMENT_CONTENT.shared.labels);
  readonly readiness = computed(() => segmentReadinessSummary(this.locale()));
  readonly presentation = SEGMENT_COMMERCIAL_PRESENTATION;
  readonly headingId = computed(() => sectionHeadingId(this.segment(), 'readiness'));
  readonly anchor = SEGMENT_SECTION_ANCHORS.readiness;

  readonly factItems = computed<readonly MareaDefinitionItem[]>(() => {
    const locale = this.locale();
    const labels = this.labels();
    const facts = SEGMENT_STATUS_FACTS;
    return [
      { term: String(facts.families), definition: labels.factsFamilies.text[locale] },
      { term: String(facts.editions), definition: labels.factsEditions.text[locale] },
      { term: String(facts.bundles), definition: labels.factsBundles.text[locale] },
      {
        term: `${facts.releaseGatesClosed} / ${facts.releaseGates}`,
        definition: labels.factsGates.text[locale],
      },
      {
        term: `${facts.publicAuthorizedClaims} / 42`,
        definition: labels.factsClaims.text[locale],
      },
      { term: String(facts.approvedPrices), definition: labels.factsPrices.text[locale] },
      {
        term: String(facts.testedCompatibilityRows),
        definition: labels.factsCompatibility.text[locale],
      },
    ];
  });
}
