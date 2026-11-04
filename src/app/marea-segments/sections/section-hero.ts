import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MareaI18n } from '../../marea-design-system/core/i18n';
import { MareaLandingSectionFrame } from '../../marea-landing/components/landing-section';
import { MareaLandingSheetIndex } from '../../marea-landing/components/landing-sheet-index';
import { MareaText } from '../../marea-design-system/components/foundation/marea-text';
import { SEGMENT_CONTENT } from '../content';
import { SEGMENT_SECTION_ANCHORS } from '../content/content.types';
import { sectionHeadingId } from '../data/segments-domain';
import type { SegmentId } from '../models/segment-identity';
import { MareaSegmentHeading } from '../components/segment-heading';

/**
 * Section 01 — audience-specific introduction.
 *
 * The `h1` is the only level-1 heading of the page. The three highlights are
 * facts already recorded in the repository, not marketing claims.
 */
@Component({
  selector: 'marea-segment-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MareaLandingSectionFrame, MareaLandingSheetIndex, MareaSegmentHeading, MareaText],
  host: { 'data-marea-segment-section': 'hero' },
  template: `
    <marea-landing-section [anchor]="anchor" [labelledBy]="headingId()">
      <marea-landing-sheet-index index="01" />
      <div class="intro">
        <marea-segment-heading
          [level]="1"
          [headingId]="headingId()"
          [kicker]="copy().kicker.text[locale()]"
          [heading]="copy().heading.text[locale()]"
          [lead]="copy().lead.text[locale()]"
        />
        <p marea-text variant="bodySmall" tone="secondary" class="classification">
          {{ copy().classification.text[locale()] }}
        </p>
      </div>
      <ul class="highlights">
        @for (highlight of copy().highlights; track highlight.contentId; let index = $index) {
          <li class="highlight">
            <span class="index" aria-hidden="true">{{ '0' + (index + 1) }}</span>
            <p marea-text variant="body" class="text">{{ highlight.text[locale()] }}</p>
          </li>
        }
      </ul>
    </marea-landing-section>
  `,
  styles: `
    :host {
      display: block;
    }
    .intro {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-3);
      max-inline-size: 62rem;
    }
    .classification {
      margin: 0;
      padding-block-start: var(--marea-space-2);
      border-block-start: var(--marea-border-width-hairline) solid var(--marea-line);
    }
    .highlights {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-3);
      margin: var(--marea-space-5) 0 0;
      padding: 0;
      list-style: none;
      border-block-start: var(--marea-border-width-strong) solid var(--marea-border-strong);
    }
    .highlight {
      display: grid;
      grid-template-columns: auto minmax(0, 1fr);
      gap: var(--marea-space-3);
      align-items: start;
      padding-block-start: var(--marea-space-3);
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
    .text {
      margin: 0;
      max-inline-size: var(--marea-measure);
    }
    @media (min-width: 768px) {
      .highlights {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: var(--marea-space-5);
      }
    }
  `,
})
export class MareaSegmentHero {
  readonly segment = input.required<SegmentId>();

  private readonly i18n = inject(MareaI18n);
  readonly locale = computed(() => this.i18n.locale());
  readonly copy = computed(() => SEGMENT_CONTENT.segments[this.segment()].hero);
  readonly headingId = computed(() => sectionHeadingId(this.segment(), 'hero'));
  readonly anchor = SEGMENT_SECTION_ANCHORS.hero;
}
