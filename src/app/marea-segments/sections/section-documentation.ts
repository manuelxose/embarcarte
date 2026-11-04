import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MareaI18n } from '../../marea-design-system/core/i18n';
import { MareaLandingSectionFrame } from '../../marea-landing/components/landing-section';
import { MareaLandingSheetIndex } from '../../marea-landing/components/landing-sheet-index';
import { MareaNotice } from '../../marea-design-system/components/foundation/marea-notice';
import { MareaStatusBadge } from '../../marea-design-system/components/foundation/marea-status-badge';
import { MareaText } from '../../marea-design-system/components/foundation/marea-text';
import { SEGMENT_CONTENT } from '../content';
import { SEGMENT_SECTION_ANCHORS } from '../content/content.types';
import { sectionHeadingId } from '../data/segments-domain';
import type { SegmentId } from '../models/segment-identity';
import { MareaSegmentHeading } from '../components/segment-heading';

/**
 * Section 07 — documentation references.
 *
 * Every reference is PENDING and is rendered as text, never as a link: no
 * authorised document exists to deliver, and no unapproved public page is
 * exposed.
 */
@Component({
  selector: 'marea-segment-documentation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MareaLandingSectionFrame,
    MareaLandingSheetIndex,
    MareaNotice,
    MareaSegmentHeading,
    MareaStatusBadge,
    MareaText,
  ],
  host: { 'data-marea-segment-section': 'documentation' },
  template: `
    <marea-landing-section [anchor]="anchor" [labelledBy]="headingId()">
      <marea-landing-sheet-index index="07" />
      <marea-segment-heading
        [headingId]="headingId()"
        [kicker]="copy().kicker.text[locale()]"
        [heading]="copy().heading.text[locale()]"
        [lead]="copy().lead.text[locale()]"
      />
      <p marea-text variant="label" tone="action" class="group-label">
        {{ labels().references.text[locale()] }}
      </p>
      <ul class="references">
        @for (reference of copy().references; track reference.referenceId) {
          <li class="reference" [attr.data-marea-reference]="reference.referenceId">
            <div class="head">
              <h3 marea-text variant="title2" class="title">
                {{ reference.title.text[locale()] }}
              </h3>
              <span
                marea-status-badge
                tone="stale"
                [label]="labels().pending.text[locale()]"
              ></span>
            </div>
            <p marea-text variant="bodySmall" tone="secondary" class="limitation">
              {{ reference.limitation.text[locale()] }}
            </p>
          </li>
        }
      </ul>
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
    .group-label {
      margin: 0 0 var(--marea-space-3);
    }
    .references {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-3);
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .reference {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-1);
      padding-block-start: var(--marea-space-3);
      border-block-start: var(--marea-border-width-hairline) solid var(--marea-line);
      min-inline-size: 0;
    }
    .head {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: var(--marea-space-2);
    }
    .title,
    .limitation {
      margin: 0;
    }
    .note {
      margin-block-start: var(--marea-space-5);
    }
    @media (min-width: 900px) {
      .references {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: var(--marea-space-5);
      }
    }
  `,
})
export class MareaSegmentDocumentation {
  readonly segment = input.required<SegmentId>();

  private readonly i18n = inject(MareaI18n);
  readonly locale = computed(() => this.i18n.locale());
  readonly copy = computed(() => SEGMENT_CONTENT.segments[this.segment()].documentation);
  readonly labels = computed(() => SEGMENT_CONTENT.shared.labels);
  readonly headingId = computed(() => sectionHeadingId(this.segment(), 'documentation'));
  readonly anchor = SEGMENT_SECTION_ANCHORS.documentation;
}
