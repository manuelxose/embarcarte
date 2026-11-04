import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MareaI18n } from '../../marea-design-system/core/i18n';
import { MareaLandingSectionFrame } from '../../marea-landing/components/landing-section';
import { MareaLandingSheetIndex } from '../../marea-landing/components/landing-sheet-index';
import { MareaFamilyCard } from '../../marea-design-system/components/commerce/marea-family-card';
import { MareaGrid } from '../../marea-design-system/components/foundation/marea-grid';
import { MareaNotice } from '../../marea-design-system/components/foundation/marea-notice';
import { SEGMENT_CONTENT } from '../content';
import { SEGMENT_SECTION_ANCHORS } from '../content/content.types';
import {
  SEGMENT_COMMERCIAL_PRESENTATION,
  sectionHeadingId,
  segmentFamilySummaries,
} from '../data/segments-domain';
import type { SegmentId } from '../models/segment-identity';
import { MareaSegmentHeading } from '../components/segment-heading';

/**
 * Section 03 — canonical product-family references for this audience.
 *
 * Cards are the verified MC-17 component: identity, edition count, readiness and
 * restrictions come from the canonical projection. Only the summary sentence is
 * MC-19 draft copy. The commercial presentation is inherited fail-closed, so no
 * price, stock or purchase action can appear on the card.
 */
@Component({
  selector: 'marea-segment-families',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MareaLandingSectionFrame,
    MareaLandingSheetIndex,
    MareaFamilyCard,
    MareaGrid,
    MareaNotice,
    MareaSegmentHeading,
  ],
  host: { 'data-marea-segment-section': 'families' },
  template: `
    <marea-landing-section [anchor]="anchor" [labelledBy]="headingId()">
      <marea-landing-sheet-index index="03" />
      <marea-segment-heading
        [headingId]="headingId()"
        [kicker]="copy().kicker.text[locale()]"
        [heading]="copy().heading.text[locale()]"
        [lead]="copy().lead.text[locale()]"
      />
      <marea-grid minItem="300px" gap="roomy">
        @for (family of families(); track family.familyId) {
          <marea-family-card
            [family]="family"
            [presentation]="presentation"
            [attr.data-marea-segment-family]="family.familyId"
          />
        }
      </marea-grid>
      <div class="note">
        <marea-notice
          variant="info"
          [heading]="copy().heading.text[locale()]"
          [body]="noteText()"
        />
      </div>
    </marea-landing-section>
  `,
  styles: `
    :host {
      display: block;
    }
    .note {
      margin-block-start: var(--marea-space-5);
    }
  `,
})
export class MareaSegmentFamilies {
  readonly segment = input.required<SegmentId>();

  private readonly i18n = inject(MareaI18n);
  readonly locale = computed(() => this.i18n.locale());
  readonly copy = computed(() => SEGMENT_CONTENT.segments[this.segment()].families);
  readonly families = computed(() => segmentFamilySummaries(this.segment()));
  readonly noteText = computed(() => this.copy().note.text[this.locale()]);
  readonly presentation = SEGMENT_COMMERCIAL_PRESENTATION;
  readonly headingId = computed(() => sectionHeadingId(this.segment(), 'families'));
  readonly anchor = SEGMENT_SECTION_ANCHORS.families;
}
