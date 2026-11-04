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
 * Section 05 — architecture/ecosystem context.
 *
 * A real sequence (data ends up presented and, conditionally, remote), so the
 * steps are an ordered list. It is a conceptual dependency chain, never a claim
 * of verified interoperability.
 */
@Component({
  selector: 'marea-segment-ecosystem',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MareaLandingSectionFrame,
    MareaLandingSheetIndex,
    MareaNotice,
    MareaSegmentHeading,
    MareaText,
  ],
  host: { 'data-marea-segment-section': 'ecosystem' },
  template: `
    <marea-landing-section [anchor]="anchor" [labelledBy]="headingId()">
      <marea-landing-sheet-index index="05" />
      <marea-segment-heading
        [headingId]="headingId()"
        [kicker]="copy().kicker.text[locale()]"
        [heading]="copy().heading.text[locale()]"
        [lead]="copy().lead.text[locale()]"
      />
      <ol class="steps">
        @for (step of copy().steps; track step.stepId) {
          <li class="step">
            <h3 marea-text variant="title2" class="step-title">
              {{ step.label.text[locale()] }}
            </h3>
            <p marea-text variant="bodySmall" tone="secondary" class="step-body">
              {{ step.body.text[locale()] }}
            </p>
          </li>
        }
      </ol>
      <div class="note">
        <marea-notice
          variant="info"
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
    .steps {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-4);
      margin: 0;
      padding: 0;
      list-style: none;
      counter-reset: ecosystem-step;
    }
    .step {
      position: relative;
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-1);
      padding-block-start: var(--marea-space-3);
      border-block-start: var(--marea-border-width-strong) solid var(--marea-border-strong);
      counter-increment: ecosystem-step;
      min-inline-size: 0;
    }
    .step::before {
      content: counter(ecosystem-step, decimal-leading-zero);
      color: var(--marea-action);
      font-family: var(--marea-font-display);
      font-size: var(--marea-type-label-size);
      line-height: var(--marea-type-label-line-height);
      font-weight: 700;
      font-variant-numeric: tabular-nums;
      letter-spacing: 0.12em;
    }
    .step-title,
    .step-body {
      margin: 0;
    }
    .note {
      margin-block-start: var(--marea-space-5);
    }
    @media (min-width: 900px) {
      .steps {
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: var(--marea-space-5);
      }
    }
  `,
})
export class MareaSegmentEcosystem {
  readonly segment = input.required<SegmentId>();

  private readonly i18n = inject(MareaI18n);
  readonly locale = computed(() => this.i18n.locale());
  readonly copy = computed(() => SEGMENT_CONTENT.segments[this.segment()].ecosystem);
  readonly headingId = computed(() => sectionHeadingId(this.segment(), 'ecosystem'));
  readonly anchor = SEGMENT_SECTION_ANCHORS.ecosystem;
}
