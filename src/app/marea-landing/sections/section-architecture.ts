import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MareaI18n } from '../../marea-design-system/core/i18n';
import { MareaLandingSectionFrame } from '../components/landing-section';
import { MareaLandingSheetIndex } from '../components/landing-sheet-index';
import { MareaNotice } from '../../marea-design-system/components/foundation/marea-notice';
import { MareaSectionHeading } from '../../marea-design-system/components/foundation/marea-section-heading';
import { MareaSurface } from '../../marea-design-system/components/foundation/marea-surface';
import { MareaText } from '../../marea-design-system/components/foundation/marea-text';
import { LANDING_CONTENT } from '../content/landing-content';
import type { ArchitectureLink, ArchitectureNode } from '../content/content.types';

type KindMarker = 'square' | 'circle' | 'diamond' | 'dashed' | 'triangle';

interface DiagramNode extends ArchitectureNode {
  readonly x: number;
  readonly y: number;
  readonly centerX: number;
  readonly centerY: number;
  readonly kindClass: string;
  readonly marker: KindMarker;
  readonly lines: readonly string[];
  readonly labelX: number;
  readonly labelTop: number;
}

interface DiagramEdge {
  readonly linkId: string;
  readonly x1: number;
  readonly y1: number;
  readonly x2: number;
  readonly y2: number;
}

interface DiagramRelation {
  readonly linkId: string;
  readonly from: string;
  readonly to: string;
  readonly label: string;
}

const BOX_WIDTH = 220;
const BOX_HEIGHT = 90;
const LABEL_MAX_CHARS = 28;
const LABEL_LINE_HEIGHT = 15;
const LABEL_X_INSET = 12;

/**
 * Presentation-only layout on a 1000×580 plotting sheet. Identity, kind and
 * copy come from the content contract; only coordinates live here.
 *
 * The 3-column × 4-row register places HUB in the centre so its six conceptual
 * dependencies are short, non-crossing edges, and groups the three external
 * data dependencies next to EXTERNAL-DATA. INSTALL sits directly above HUB.
 */
const NODE_POSITION: Readonly<Record<string, { x: number; y: number }>> = {
  AIS: { x: 40, y: 20 },
  'PROFESSIONAL-INSTALLATION': { x: 390, y: 20 },
  DISPLAY: { x: 740, y: 20 },
  PILOT: { x: 40, y: 170 },
  HUB: { x: 390, y: 170 },
  SENSE: { x: 740, y: 170 },
  NAV: { x: 40, y: 320 },
  WATCH: { x: 390, y: 320 },
  WEATHER: { x: 740, y: 320 },
  FLEET: { x: 40, y: 470 },
  'EXTERNAL-DATA': { x: 390, y: 470 },
};

const KIND_CLASS: Readonly<Record<ArchitectureNode['kind'], string>> = {
  HARDWARE: 'node--hardware',
  SOFTWARE: 'node--software',
  SERVICE: 'node--service',
  DATA: 'node--data',
  EXTERNAL: 'node--external',
};

const KIND_MARKER: Readonly<Record<ArchitectureNode['kind'], KindMarker>> = {
  HARDWARE: 'square',
  SOFTWARE: 'circle',
  SERVICE: 'diamond',
  DATA: 'triangle',
  EXTERNAL: 'dashed',
};

/**
 * Legend marker order mirrors the content legend order (hardware, software,
 * service, external). The legend is a closed content contract, and the marker is
 * a redundant visual encoding of the node kind — never colour alone.
 */
const LEGEND_MARKERS: readonly KindMarker[] = ['square', 'circle', 'diamond', 'dashed'];

/**
 * Section 04 — conceptual modular architecture.
 *
 * Every edge is a CONCEPTUAL_DEPENDENCY: the diagram never asserts
 * interoperability, NMEA 2000 certification or universal compatibility. The
 * same relationships are also rendered as a plain ordered list, so the
 * information does not depend on the graphic. The SVG scales with the sheet and
 * the only horizontal scroll region is the focusable figure itself.
 */
@Component({
  selector: 'marea-landing-architecture',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MareaLandingSectionFrame,
    MareaLandingSheetIndex,
    MareaNotice,
    MareaSectionHeading,
    MareaSurface,
    MareaText,
  ],
  host: { 'data-marea-landing-section': 'architecture' },
  template: `
    <marea-landing-section anchor="arquitectura" labelledBy="architecture-heading" tone="raised">
      <marea-landing-sheet-index index="04" />
      <marea-section-heading
        id="architecture-heading"
        [heading]="copy().heading.text[locale()]"
        [kicker]="copy().kicker.text[locale()]"
        [lead]="copy().lead.text[locale()]"
      />
      <figure class="figure">
        <div
          class="scroll"
          tabindex="0"
          role="group"
          [attr.aria-label]="copy().diagramAlt.text[locale()]"
        >
          <svg
            viewBox="0 0 1000 580"
            role="img"
            [attr.aria-label]="copy().diagramAlt.text[locale()]"
            focusable="false"
          >
            <defs>
              <marker
                id="marea-arch-arrow"
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path class="edge-arrow" d="M0 0L10 5L0 10z" />
              </marker>
            </defs>
            <g class="edges">
              @for (edge of edges(); track edge.linkId) {
                <line
                  [attr.x1]="edge.x1"
                  [attr.y1]="edge.y1"
                  [attr.x2]="edge.x2"
                  [attr.y2]="edge.y2"
                  marker-end="url(#marea-arch-arrow)"
                />
              }
            </g>
            <g class="nodes">
              @for (node of nodes(); track node.nodeId) {
                <g [class]="'node ' + node.kindClass">
                  <rect
                    [attr.x]="node.x"
                    [attr.y]="node.y"
                    rx="3"
                    [attr.width]="boxWidth"
                    [attr.height]="boxHeight"
                  />
                  <g
                    class="kind"
                    [attr.transform]="'translate(' + (node.x + 14) + ' ' + (node.y + 15) + ')'"
                  >
                    @switch (node.marker) {
                      @case ('square') {
                        <rect x="-4" y="-4" width="8" height="8" />
                      }
                      @case ('circle') {
                        <circle r="4" />
                      }
                      @case ('diamond') {
                        <path d="M0 -5L5 0L0 5L-5 0Z" />
                      }
                      @case ('triangle') {
                        <path d="M0 -5L5 4L-5 4Z" />
                      }
                      @default {
                        <rect x="-4.5" y="-4.5" width="9" height="9" stroke-dasharray="2 2" />
                      }
                    }
                  </g>
                  <text [attr.x]="node.labelX" [attr.y]="node.labelTop">
                    @for (line of node.lines; track $index) {
                      <tspan
                        [attr.x]="node.labelX"
                        [attr.y]="node.labelTop + $index * labelLineHeight"
                      >
                        {{ line }}
                      </tspan>
                    }
                  </text>
                </g>
              }
            </g>
          </svg>
        </div>
        <figcaption class="caption">
          <p marea-text variant="meta" class="hint">{{ i18n.text('scrollHint') }}</p>
          <ul class="legend" [attr.aria-label]="legendLabel()">
            @for (item of copy().legend; track item.contentId; let index = $index) {
              <li>
                <span
                  [class]="'legend-marker legend-marker--' + legendMarker(index)"
                  aria-hidden="true"
                ></span>
                <span marea-text variant="meta">{{ item.text[locale()] }}</span>
              </li>
            }
          </ul>
        </figcaption>
      </figure>
      <div class="relations">
        <marea-surface variant="outline">
          <h3 marea-text variant="heading" class="relations-heading">
            {{ relationsHeading() }}
          </h3>
          <ol class="relations-list">
            @for (relation of relations(); track relation.linkId) {
              <li class="relation">
                <span marea-text variant="label" class="relation-link">
                  {{ relation.from }} → {{ relation.to }}
                </span>
                <span marea-text variant="bodySmall" tone="secondary">
                  {{ relation.label }}
                </span>
              </li>
            }
          </ol>
        </marea-surface>
      </div>
      <div class="note">
        <marea-notice
          variant="warning"
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
    .figure {
      margin: 0;
      min-inline-size: 0;
    }
    .scroll {
      overflow-x: auto;
      overscroll-behavior-x: contain;
      padding: var(--marea-space-4);
      border: var(--marea-border-width-hairline) solid var(--marea-line);
      border-radius: var(--marea-radius-surface);
      background-color: var(--marea-canvas);
      background-image:
        linear-gradient(to right, var(--marea-line) 1px, transparent 1px),
        linear-gradient(to bottom, var(--marea-line) 1px, transparent 1px);
      background-size: 40px 40px;
      color: var(--marea-text-primary);
    }
    .scroll:focus-visible {
      outline: var(--marea-focus-width) var(--marea-focus-style) var(--marea-focus-ring);
      outline-offset: var(--marea-focus-offset);
    }
    svg {
      display: block;
      inline-size: 100%;
      min-inline-size: 880px;
      block-size: auto;
      color: var(--marea-text-secondary);
    }
    .edges line {
      stroke: var(--marea-border-strong);
      stroke-width: 1.25;
      stroke-dasharray: 4 4;
      stroke-linecap: round;
    }
    .edge-arrow {
      fill: var(--marea-border-strong);
    }
    .node rect {
      fill: var(--marea-canvas);
      stroke: var(--marea-border-strong);
      stroke-width: 1.25;
    }
    .node text {
      fill: var(--marea-text-primary);
      font-family: var(--marea-font-body);
      font-size: 11px;
      line-height: 1.35;
      font-weight: 500;
    }
    .kind {
      fill: var(--marea-text-secondary);
      stroke: var(--marea-text-secondary);
      stroke-width: 1.2;
    }
    .node--hardware rect {
      stroke: var(--marea-action);
    }
    .node--hardware .kind {
      fill: var(--marea-action);
      stroke: var(--marea-action);
    }
    .node--software rect {
      stroke: var(--marea-data-primary);
    }
    .node--software .kind {
      fill: var(--marea-data-primary);
      stroke: var(--marea-data-primary);
    }
    .node--service rect {
      stroke: var(--marea-state-safe);
    }
    .node--service .kind {
      fill: var(--marea-state-safe);
      stroke: var(--marea-state-safe);
    }
    .node--data rect {
      stroke: var(--marea-state-warning);
    }
    .node--external {
      color: var(--marea-border-strong);
    }
    .node--external rect {
      stroke: var(--marea-border-strong);
      stroke-dasharray: 4 3;
    }
    .caption {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      justify-content: space-between;
      gap: var(--marea-space-2) var(--marea-space-5);
      margin-block-start: var(--marea-space-3);
    }
    .hint,
    .legend {
      margin: 0;
    }
    .legend {
      display: flex;
      flex-wrap: wrap;
      gap: var(--marea-space-2) var(--marea-space-4);
      padding: 0;
      list-style: none;
    }
    .legend li {
      display: inline-flex;
      align-items: center;
      gap: var(--marea-space-2);
    }
    .legend-marker {
      display: inline-block;
      inline-size: 9px;
      block-size: 9px;
      flex: 0 0 auto;
      border: var(--marea-border-width-hairline) solid var(--marea-text-secondary);
      color: var(--marea-text-secondary);
    }
    .legend-marker--circle {
      border-radius: 50%;
    }
    .legend-marker--diamond {
      transform: rotate(45deg);
    }
    .legend-marker--dashed {
      border-style: dashed;
    }
    .relations {
      margin-block-start: var(--marea-space-5);
    }
    .relations-heading {
      margin: 0 0 var(--marea-space-3);
    }
    .relations-list {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-2);
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .relation {
      display: grid;
      gap: var(--marea-space-1);
      min-inline-size: 0;
      padding-block: var(--marea-space-2);
      border-block-start: var(--marea-border-width-hairline) solid var(--marea-line);
      break-inside: avoid;
    }
    .relation-link {
      font-variant-numeric: tabular-nums;
      overflow-wrap: anywhere;
    }
    .note {
      margin-block-start: var(--marea-space-5);
    }
    @media (min-width: 900px) {
      .relations-list {
        columns: 2;
        column-gap: var(--marea-space-6);
      }
    }
  `,
})
export class MareaLandingArchitecture {
  readonly i18n = inject(MareaI18n);
  readonly copy = computed(() => LANDING_CONTENT.sections.architecture);
  readonly locale = computed(() => this.i18n.locale());

  readonly boxWidth = BOX_WIDTH;
  readonly boxHeight = BOX_HEIGHT;
  readonly labelLineHeight = LABEL_LINE_HEIGHT;

  readonly nodes = computed<readonly DiagramNode[]>(() =>
    this.copy()
      .nodes.map((node) => {
        const position = NODE_POSITION[node.nodeId];
        if (!position) throw new Error(`Missing diagram layout for node ${node.nodeId}`);
        const label = node.label.text[this.locale()];
        const lines = wrapLabel(label);
        return {
          ...node,
          ...position,
          centerX: position.x + BOX_WIDTH / 2,
          centerY: position.y + BOX_HEIGHT / 2,
          kindClass: KIND_CLASS[node.kind] ?? 'node--external',
          marker: KIND_MARKER[node.kind] ?? 'dashed',
          lines,
          labelX: position.x + LABEL_X_INSET,
          labelTop: position.y + BOX_HEIGHT / 2 - ((lines.length - 1) * LABEL_LINE_HEIGHT) / 2 + 4,
        };
      })
      .sort((left, right) => left.y - right.y || left.x - right.x),
  );

  readonly edges = computed<readonly DiagramEdge[]>(() => {
    const nodeById = new Map(this.nodes().map((node) => [node.nodeId, node]));
    return this.copy().links.flatMap((link) => {
      const from = nodeById.get(link.from);
      const to = nodeById.get(link.to);
      if (!from || !to) return [];
      const start = boundaryPoint(from, to);
      const end = boundaryPoint(to, from);
      return [{ linkId: link.linkId, x1: start.x, y1: start.y, x2: end.x, y2: end.y }];
    });
  });

  readonly relations = computed<readonly DiagramRelation[]>(() => {
    const labels = new Map(this.nodes().map((node) => [node.nodeId, node.label.text]));
    return this.copy().links.map((link: ArchitectureLink) => ({
      linkId: link.linkId,
      from: labels.get(link.from)?.[this.locale()] ?? link.from,
      to: labels.get(link.to)?.[this.locale()] ?? link.to,
      label: link.label.text[this.locale()],
    }));
  });

  readonly legendLabel = computed(() =>
    this.locale() === 'es' ? 'Leyenda del diagrama' : 'Diagram legend',
  );

  readonly relationsHeading = computed(() =>
    this.locale() === 'es' ? 'Dependencias conceptuales' : 'Conceptual dependencies',
  );

  readonly noteHeading = computed(() =>
    this.locale() === 'es' ? 'Sin interoperabilidad verificada' : 'No verified interoperability',
  );

  legendMarker(index: number): KindMarker {
    return LEGEND_MARKERS[index] ?? 'dashed';
  }
}

/** Intersects the segment between two node centres with the source box border. */
function boundaryPoint(from: DiagramNode, to: DiagramNode): { x: number; y: number } {
  const dx = to.centerX - from.centerX;
  const dy = to.centerY - from.centerY;
  const scaleX = dx === 0 ? Number.POSITIVE_INFINITY : BOX_WIDTH / 2 / Math.abs(dx);
  const scaleY = dy === 0 ? Number.POSITIVE_INFINITY : BOX_HEIGHT / 2 / Math.abs(dy);
  const scale = Math.min(scaleX, scaleY);
  return { x: from.centerX + dx * scale, y: from.centerY + dy * scale };
}

/** Greedy word wrap for the diagram labels; keeps each node inside its box. */
function wrapLabel(text: string): string[] {
  const words = text.trim().split(/\s+/);
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > LABEL_MAX_CHARS && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
}
