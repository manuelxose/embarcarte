import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MareaI18n } from '../../marea-design-system/core/i18n';
import { MareaLandingSectionFrame } from '../../marea-landing/components/landing-section';
import { MareaLandingSheetIndex } from '../../marea-landing/components/landing-sheet-index';
import { MareaNotice } from '../../marea-design-system/components/foundation/marea-notice';
import { MareaText } from '../../marea-design-system/components/foundation/marea-text';
import { SEGMENT_CONTENT } from '../content';
import { SEGMENT_SECTION_ANCHORS } from '../content/content.types';
import { sectionHeadingId } from '../data/segments-domain';
import type { SegmentId } from '../models/segment-identity';
import { MareaSegmentHeading } from '../components/segment-heading';

/**
 * Section 04 — differentiated capabilities and their mandatory limits.
 *
 * Every capability row carries a limit block enforced by the content type, so a
 * capability cannot be authored without its constraint.
 */
@Component({
  selector: 'marea-segment-capabilities',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MareaLandingSectionFrame,
    MareaLandingSheetIndex,
    MareaNotice,
    MareaSegmentHeading,
    MareaText,
  ],
  host: { 'data-marea-segment-section': 'capabilities' },
  template: `
    <marea-landing-section [anchor]="anchor" [labelledBy]="headingId()" tone="contrast">
      <marea-landing-sheet-index index="04" />
      <marea-segment-heading
        [headingId]="headingId()"
        [kicker]="copy().kicker.text[locale()]"
        [heading]="copy().heading.text[locale()]"
        [lead]="copy().lead.text[locale()]"
      />
      <ul class="rows">
        @for (
          capability of copy().capabilities;
          track capability.capabilityId;
          let index = $index
        ) {
          <li class="row">
            <span class="index" aria-hidden="true">{{ '0' + (index + 1) }}</span>
            <div class="content">
              <h3 marea-text variant="title2" class="title">
                {{ capability.title.text[locale()] }}
              </h3>
              <div class="pair">
                <div class="pair-item">
                  <p marea-text variant="label" tone="action" class="pair-label">
                    {{ labels().capability.text[locale()] }}
                  </p>
                  <p marea-text variant="bodySmall" class="pair-body">
                    {{ capability.capability.text[locale()] }}
                  </p>
                </div>
                <div class="pair-item pair-item--limit">
                  <p marea-text variant="label" tone="critical" class="pair-label">
                    {{ labels().limit.text[locale()] }}
                  </p>
                  <p marea-text variant="bodySmall" class="pair-body">
                    {{ capability.limit.text[locale()] }}
                  </p>
                </div>
              </div>
            </div>
          </li>
        }
      </ul>
      <div class="note">
        <marea-notice
          variant="warning"
          [heading]="copy().heading.text[locale()]"
          [body]="copy().note.text[locale()]"
        />
      </div>
    </marea-landing-section>
  `,
  styles: `
    :host {
      display: block;
    }
    .rows {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 0;
      margin: 0;
      padding: 0;
      list-style: none;
      border-block-start: var(--marea-border-width-strong) solid var(--marea-border-strong);
    }
    .row {
      display: grid;
      grid-template-columns: 2.5rem minmax(0, 1fr);
      gap: var(--marea-space-2);
      padding-block: var(--marea-space-4);
      border-block-end: var(--marea-border-width-hairline) solid var(--marea-line);
      min-inline-size: 0;
    }
    .index {
      color: var(--marea-action);
      font-family: var(--marea-font-display);
      font-size: var(--marea-type-label-size);
      line-height: var(--marea-type-label-line-height);
      font-weight: 700;
      font-variant-numeric: tabular-nums;
      letter-spacing: 0.12em;
    }
    .content {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-2);
      min-inline-size: 0;
    }
    .title,
    .pair-label,
    .pair-body {
      margin: 0;
    }
    .pair {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-3);
    }
    .pair-item {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-1);
      padding-inline-start: var(--marea-space-3);
      border-inline-start: var(--marea-border-width-strong) solid var(--marea-state-warning);
      min-inline-size: 0;
    }
    .pair-item--limit {
      border-inline-start-color: var(--marea-state-critical);
    }
    .note {
      margin-block-start: var(--marea-space-5);
    }
    @media (min-width: 900px) {
      .row {
        grid-template-columns: 3rem minmax(0, 1fr);
        gap: var(--marea-space-4);
        padding-block: var(--marea-space-5);
      }
      .content {
        grid-template-columns: minmax(0, 0.9fr) minmax(0, 2fr);
        gap: var(--marea-space-5);
        align-items: start;
      }
      .pair {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: var(--marea-space-5);
      }
    }
  `,
})
export class MareaSegmentCapabilities {
  readonly segment = input.required<SegmentId>();

  private readonly i18n = inject(MareaI18n);
  readonly locale = computed(() => this.i18n.locale());
  readonly copy = computed(() => SEGMENT_CONTENT.segments[this.segment()].capabilities);
  readonly labels = computed(() => SEGMENT_CONTENT.shared.labels);
  readonly headingId = computed(() => sectionHeadingId(this.segment(), 'capabilities'));
  readonly anchor = SEGMENT_SECTION_ANCHORS.capabilities;
}
