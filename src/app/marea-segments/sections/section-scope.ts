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
 * Section 02 — audience boundary and evidence-based use cases.
 *
 * The boundary block is the semantic decision: “professionals”, “installers” and
 * “armadores” are not interchangeable, and the commercial-shipowner meaning of
 * “armador” is explicitly excluded on the shipowner page.
 */
@Component({
  selector: 'marea-segment-scope',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MareaLandingSectionFrame, MareaLandingSheetIndex, MareaSegmentHeading, MareaText],
  host: { 'data-marea-segment-section': 'scope' },
  template: `
    <marea-landing-section [anchor]="anchor" [labelledBy]="headingId()" tone="raised">
      <marea-landing-sheet-index index="02" />
      <marea-segment-heading
        [headingId]="headingId()"
        [kicker]="copy().kicker.text[locale()]"
        [heading]="copy().heading.text[locale()]"
        [lead]="copy().lead.text[locale()]"
      />
      <div class="columns">
        <section class="column" [attr.aria-labelledby]="forId()">
          <h3 marea-text variant="title2" class="column-title" [id]="forId()">
            {{ labels().isFor.text[locale()] }}
          </h3>
          <ul class="items">
            @for (item of copy().isFor; track item.itemId) {
              <li class="item">
                <p marea-text variant="label" tone="action" class="item-label">
                  {{ item.label.text[locale()] }}
                </p>
                <p marea-text variant="bodySmall" tone="secondary" class="item-body">
                  {{ item.body.text[locale()] }}
                </p>
              </li>
            }
          </ul>
        </section>
        <section class="column" [attr.aria-labelledby]="notForId()">
          <h3 marea-text variant="title2" class="column-title" [id]="notForId()">
            {{ labels().isNotFor.text[locale()] }}
          </h3>
          <ul class="items">
            @for (item of copy().isNotFor; track item.itemId) {
              <li class="item">
                <p marea-text variant="label" tone="critical" class="item-label">
                  {{ item.label.text[locale()] }}
                </p>
                <p marea-text variant="bodySmall" tone="secondary" class="item-body">
                  {{ item.body.text[locale()] }}
                </p>
              </li>
            }
          </ul>
        </section>
      </div>
      <p marea-text variant="bodySmall" tone="secondary" class="boundary">
        {{ copy().boundary.text[locale()] }}
      </p>
      <div class="use-cases">
        <h3 marea-text variant="title2" class="group-title">
          {{ labels().useCase.text[locale()] }}
        </h3>
        <ul class="use-case-list">
          @for (useCase of copy().useCases; track useCase.useCaseId) {
            <li class="use-case">
              <h4 marea-text variant="title2" class="use-case-title">
                {{ useCase.title.text[locale()] }}
              </h4>
              <p marea-text variant="bodySmall" tone="secondary" class="use-case-body">
                {{ useCase.body.text[locale()] }}
              </p>
              <p marea-text variant="bodySmall" class="use-case-limit">
                <span class="limit-label">{{ labels().limit.text[locale()] }}</span>
                {{ useCase.limit.text[locale()] }}
              </p>
            </li>
          }
        </ul>
      </div>
    </marea-landing-section>
  `,
  styles: `
    :host {
      display: block;
    }
    .columns {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-5);
    }
    .column {
      min-inline-size: 0;
    }
    .column-title,
    .group-title,
    .use-case-title {
      margin: 0 0 var(--marea-space-3);
    }
    .items,
    .use-case-list {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-3);
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .item,
    .use-case {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-1);
      padding-block-start: var(--marea-space-2);
      border-block-start: var(--marea-border-width-hairline) solid var(--marea-line);
    }
    .item-label,
    .item-body,
    .boundary,
    .use-case-body,
    .use-case-limit {
      margin: 0;
    }
    .boundary {
      margin-block-start: var(--marea-space-5);
      padding: var(--marea-space-4);
      border-inline-start: var(--marea-border-width-strong) solid var(--marea-action);
      background: var(--marea-surface-raised);
      max-inline-size: none;
    }
    .use-cases {
      margin-block-start: var(--marea-space-6);
    }
    .use-case-limit {
      color: var(--marea-text-secondary);
    }
    .limit-label {
      color: var(--marea-state-warning);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      font-size: var(--marea-type-meta-size);
      margin-inline-end: var(--marea-space-1);
    }
    @media (min-width: 900px) {
      .columns {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: var(--marea-space-6);
      }
      .column + .column {
        padding-inline-start: var(--marea-space-6);
        border-inline-start: var(--marea-border-width-hairline) solid var(--marea-line);
      }
      .use-case-list {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: var(--marea-space-5);
      }
    }
  `,
})
export class MareaSegmentScope {
  readonly segment = input.required<SegmentId>();

  private readonly i18n = inject(MareaI18n);
  readonly locale = computed(() => this.i18n.locale());
  readonly copy = computed(() => SEGMENT_CONTENT.segments[this.segment()].scope);
  readonly labels = computed(() => SEGMENT_CONTENT.shared.labels);
  readonly headingId = computed(() => sectionHeadingId(this.segment(), 'scope'));
  readonly forId = computed(() => `${this.headingId()}-for`);
  readonly notForId = computed(() => `${this.headingId()}-not-for`);
  readonly anchor = SEGMENT_SECTION_ANCHORS.scope;
}
