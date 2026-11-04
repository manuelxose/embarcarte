import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MareaI18n } from '../../marea-design-system/core/i18n';
import { MareaLandingSectionFrame } from '../../marea-landing/components/landing-section';
import { MareaLandingSheetIndex } from '../../marea-landing/components/landing-sheet-index';
import { MareaButton } from '../../marea-design-system/components/foundation/marea-button';
import { MareaNotice } from '../../marea-design-system/components/foundation/marea-notice';
import { MareaText } from '../../marea-design-system/components/foundation/marea-text';
import { SEGMENT_CONTENT } from '../content';
import { SEGMENT_SECTION_ANCHORS } from '../content/content.types';
import { sectionHeadingId } from '../data/segments-domain';
import type { SegmentId } from '../models/segment-identity';
import { MareaSegmentHeading } from '../components/segment-heading';

/**
 * Section 08 — closing and the fail-closed action.
 *
 * The only action-like control is a deliberately disabled native button: it stays
 * keyboard discoverable, exposes its reason through `aria-describedby` and blocks
 * activation. It does not post anywhere, open a dialog or hide an endpoint.
 */
@Component({
  selector: 'marea-segment-closing',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MareaButton,
    MareaLandingSectionFrame,
    MareaLandingSheetIndex,
    MareaNotice,
    MareaSegmentHeading,
    MareaText,
  ],
  host: { 'data-marea-segment-section': 'closing' },
  template: `
    <marea-landing-section [anchor]="anchor" [labelledBy]="headingId()" tone="contrast">
      <marea-landing-sheet-index index="08" />
      <marea-segment-heading
        [headingId]="headingId()"
        [kicker]="copy().kicker.text[locale()]"
        [heading]="copy().heading.text[locale()]"
        [lead]="copy().lead.text[locale()]"
      />
      <ul class="statements">
        @for (statement of copy().statements; track statement.contentId) {
          <li class="statement">
            <p marea-text variant="body" tone="secondary" class="statement-text">
              {{ statement.text[locale()] }}
            </p>
          </li>
        }
      </ul>
      <div class="restriction">
        <marea-notice
          variant="permission"
          [heading]="copy().heading.text[locale()]"
          [body]="copy().restriction.text[locale()]"
        />
      </div>
      <div class="action">
        <button
          marea-button
          variant="secondary"
          size="lg"
          [disabled]="true"
          [disabledReason]="copy().actionReason.text[locale()]"
          data-marea-segment-disabled-cta
        >
          {{ copy().actionLabel.text[locale()] }}
        </button>
        <p marea-text variant="bodySmall" tone="secondary" class="action-reason">
          {{ copy().actionReason.text[locale()] }}
        </p>
      </div>
    </marea-landing-section>
  `,
  styles: `
    :host {
      display: block;
    }
    .statements {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-3);
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .statement {
      padding-block-start: var(--marea-space-3);
      border-block-start: var(--marea-border-width-hairline) solid var(--marea-line);
    }
    .statement-text,
    .action-reason {
      margin: 0;
    }
    .restriction,
    .action {
      margin-block-start: var(--marea-space-5);
    }
    .action {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--marea-space-4);
    }
    .action-reason {
      flex: 1 1 20rem;
      max-inline-size: var(--marea-measure);
    }
    @media (min-width: 900px) {
      .statements {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: var(--marea-space-5);
      }
    }
  `,
})
export class MareaSegmentClosing {
  readonly segment = input.required<SegmentId>();

  private readonly i18n = inject(MareaI18n);
  readonly locale = computed(() => this.i18n.locale());
  readonly copy = computed(() => SEGMENT_CONTENT.segments[this.segment()].closing);
  readonly headingId = computed(() => sectionHeadingId(this.segment(), 'closing'));
  readonly anchor = SEGMENT_SECTION_ANCHORS.closing;
}
