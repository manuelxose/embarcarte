import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MareaI18n, type MareaCopyKey } from '../../core/i18n';
import type { MareaDocumentationItem, MareaDocumentationStatus, MareaTone } from '../../core/types';
import { MareaStatePanel } from '../foundation/marea-state-panel';
import { MareaStatusBadge } from '../foundation/marea-status-badge';
import { MareaText } from '../foundation/marea-text';

const DOCUMENT_TONE: Readonly<Record<MareaDocumentationStatus, MareaTone>> = {
  AVAILABLE: 'safe',
  PENDING: 'stale',
};

const DOCUMENT_COPY: Readonly<Record<MareaDocumentationStatus, MareaCopyKey>> = {
  AVAILABLE: 'documentAvailable',
  PENDING: 'documentPending',
};

/**
 * Documentation list for an internal family specimen. Documents are rendered as
 * status-labelled items with no links: no unapproved public page is exposed.
 */
@Component({
  selector: 'marea-documentation-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'data-marea-component': 'marea-documentation-panel' },
  imports: [MareaStatePanel, MareaStatusBadge, MareaText],
  template: `
    <section class="documentation">
      <h3 marea-text variant="heading" class="heading">
        {{ heading() ?? i18n.text('documentation') }}
      </h3>
      <p marea-text variant="meta" class="family">{{ i18n.text('family') }} · {{ familyId() }}</p>
      @if (items().length === 0) {
        <marea-state-panel kind="empty" [title]="i18n.text('noDocumentation')" />
      } @else {
        <ul class="documents">
          @for (item of items(); track $index) {
            <li class="document">
              <div class="document-head">
                <span marea-text variant="label" class="document-title">{{ item.title }}</span>
                <span
                  marea-status-badge
                  [tone]="documentTone(item.status)"
                  [label]="documentLabel(item.status)"
                ></span>
              </div>
              <p marea-text variant="meta" class="kind">{{ item.kind }}</p>
              @if (item.limitation) {
                <p marea-text variant="bodySmall" tone="secondary" class="limitation">
                  {{ item.limitation }}
                </p>
              }
            </li>
          }
        </ul>
      }
    </section>
  `,
  styles: `
    :host {
      display: block;
      min-inline-size: 0;
      color: var(--marea-text-primary);
    }
    .documentation {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-3);
      min-inline-size: 0;
    }
    .heading,
    .family,
    .kind,
    .limitation {
      margin: 0;
    }
    .documents {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-2);
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .document {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-1);
      min-inline-size: 0;
    }
    .document-head {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--marea-space-2);
    }
    .document-title {
      font-weight: 600;
      overflow-wrap: anywhere;
    }
    .kind {
      overflow-wrap: anywhere;
    }
  `,
})
export class MareaDocumentationPanel {
  readonly familyId = input.required<string>();
  readonly items = input.required<readonly MareaDocumentationItem[]>();
  readonly heading = input<string | null>(null);

  readonly i18n = inject(MareaI18n);

  documentTone(status: MareaDocumentationStatus): MareaTone {
    return DOCUMENT_TONE[status] ?? 'stale';
  }

  documentLabel(status: MareaDocumentationStatus): string {
    return this.i18n.text(DOCUMENT_COPY[status] ?? 'documentPending');
  }
}
