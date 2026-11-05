import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { MareaButton } from '../../marea-design-system/components/foundation/marea-button';
import { MareaSectionHeading } from '../../marea-design-system/components/foundation/marea-section-heading';
import { MareaStatusBadge } from '../../marea-design-system/components/foundation/marea-status-badge';
import type { MareaLocale, MareaTone } from '../../marea-design-system/core/types';
import {
  governanceStateOf,
  transitionOptions,
  type SkuGovernanceState,
} from '../governance/sku-lifecycle';
import {
  READINESS_FACTS,
  evaluateCandidateReadiness,
  type PrerequisiteResult,
  type ReadinessDecision,
} from '../governance/sku-readiness';
import {
  GOVERNANCE_SNAPSHOT,
  blockerById,
  editionById,
  familyById,
} from '../governance/governance-facts';
import { resolveCandidateIdentity, resolveEditionIdentity } from '../governance/sku-identity';
import {
  REVIEW_ACTIONS,
  submitReviewAction,
  type ReviewActionOutcome,
} from '../governance/review-workflow-adapter';
import {
  GOVERNANCE_LABELS,
  GOVERNANCE_LIMITATION_KEYS,
  GOVERNANCE_NOTICE_KEYS,
  GOVERNANCE_STATE_LABELS,
} from '../content/governance';

/**
 * MC-25 internal SKU governance screen.
 *
 * One component tree serves both locales; every rendered string comes from the
 * content contract, so ES and EN cannot drift structurally. The component owns
 * no commercial state: it reads the frozen governance snapshot, calls the pure
 * readiness engine and calls the fail-closed review adapter.
 *
 * Accessibility: real labelled selects, a caption on every table, `th` scope,
 * a polite live region announcing the review refusal, and status text that does
 * not rely on colour.
 */
@Component({
  selector: 'marea-catalog-sku-governance',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MareaButton, MareaSectionHeading, MareaStatusBadge],
  template: `
    <section class="governance" data-mc25-governance [attr.aria-label]="t('heading')">
      <marea-section-heading [heading]="t('heading')" [kicker]="t('kicker')" [level]="2" />
      <p class="lede">{{ t('intro') }}</p>

      <div class="limits" role="region" [attr.aria-label]="t('noticeHeading')">
        <ul>
          @for (limit of notices(); track $index) {
            <li>{{ limit }}</li>
          }
        </ul>
      </div>

      <div class="selection" role="group" [attr.aria-label]="t('subjectHeading')">
        <p class="help">{{ t('subjectHelp') }}</p>
        <div class="fields">
          <div class="field">
            <label [for]="'mc25-family'">{{ t('subjectLegend') }}</label>
            <select
              [id]="'mc25-family'"
              [value]="family()"
              (change)="selectFamily($any($event.target).value)"
            >
              @for (family of familyOptions(); track family.familyId) {
                <option [value]="family.familyId">{{ family.displayName }}</option>
              }
            </select>
          </div>
          <div class="field">
            <label [for]="'mc25-edition'">{{ t('editionLegend') }}</label>
            <select
              [id]="'mc25-edition'"
              [value]="edition()"
              (change)="selectEdition($any($event.target).value)"
            >
              @for (option of editionOptions(); track option.editionId) {
                <option [value]="option.editionId">{{ option.label }}</option>
              }
            </select>
          </div>
        </div>
      </div>

      <section class="panel identity" aria-labelledby="mc25-identity-h">
        <h3 id="mc25-identity-h">{{ t('identityHeading') }}</h3>
        <dl class="facts-list">
          <dt>{{ t('familyLabel') }}</dt>
          <dd data-mc25-family>{{ identityFamilyLabel() }}</dd>
          <dt>{{ t('editionLabel') }}</dt>
          <dd data-mc25-edition>{{ edition() }}</dd>
          <dt>{{ t('candidateLabel') }}</dt>
          <dd data-mc25-candidate>{{ candidateLabel() }}</dd>
          <dt>{{ t('identityKindLabel') }}</dt>
          <dd>{{ identityKind() }}</dd>
          <dt>{{ t('merchantSkuLabel') }}</dt>
          <dd data-mc25-merchant-sku>{{ merchantSkuLabel() }}</dd>
          <dt>{{ t('contractRefLabel') }}</dt>
          <dd>{{ t('editionLabel') }} + {{ t('candidateLabel') }}</dd>
        </dl>
      </section>

      <section class="panel readiness" aria-labelledby="mc25-readiness-h">
        <h3 id="mc25-readiness-h">{{ t('readinessHeading') }}</h3>
        <p class="verdict">
          <span
            marea-status-badge
            tone="critical"
            [label]="t('verdictNotOrderable')"
            data-mc25-verdict
          ></span>
          <span>{{ t('verdictExplanation') }}</span>
        </p>

        <div
          class="table-scroll"
          tabindex="0"
          role="region"
          [attr.aria-label]="t('tableCaptionReadiness')"
        >
          <table class="matrix">
            <caption>
              {{
                t('tableCaptionReadiness')
              }}
            </caption>
            <thead>
              <tr>
                <th scope="col">{{ t('colPrerequisite') }}</th>
                <th scope="col">{{ t('colStatus') }}</th>
                <th scope="col">{{ t('colReason') }}</th>
                <th scope="col">{{ t('colBlockers') }}</th>
              </tr>
            </thead>
            <tbody>
              @for (item of prerequisites(); track item.id) {
                <tr [attr.data-prerequisite]="item.id" [attr.data-status]="item.status">
                  <th scope="row">{{ item.id }}</th>
                  <td>
                    <span
                      marea-status-badge
                      [tone]="statusTone(item)"
                      [label]="statusLabel(item)"
                    ></span>
                  </td>
                  <td>
                    <p class="reason">{{ item.detail }}</p>
                    @if (item.status === 'NOT_APPLICABLE') {
                      <p class="na">
                        {{
                          item.permittedNotApplicable
                            ? t('statusNaPermitted')
                            : t('statusNaNotPermitted')
                        }}
                      </p>
                    }
                  </td>
                  <td>
                    @for (blocker of item.mc02BlockerIds; track blocker) {
                      <code class="chip">{{ blocker }}</code>
                    } @empty {
                      <span class="muted">—</span>
                    }
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <div class="missing">
          <h4>{{ t('missingHeading') }}</h4>
          <p>{{ t('missingIntro') }}</p>
          <ul data-mc25-missing>
            @for (item of decision().missingPrerequisites; track item) {
              <li>{{ item }}</li>
            }
          </ul>
        </div>
      </section>

      <section class="panel blockers" aria-labelledby="mc25-blockers-h">
        <h3 id="mc25-blockers-h">{{ t('blockersHeading') }}</h3>
        <p class="help">{{ t('blockersIntro') }}</p>
        @if (blockers().length === 0) {
          <p class="muted">{{ t('blockersNone') }}</p>
        } @else {
          <div
            class="table-scroll"
            tabindex="0"
            role="region"
            [attr.aria-label]="t('tableCaptionBlockers')"
          >
            <table class="matrix">
              <caption>
                {{
                  t('tableCaptionBlockers')
                }}
              </caption>
              <thead>
                <tr>
                  <th scope="col">{{ t('blockerId') }}</th>
                  <th scope="col">{{ t('blockerStatus') }}</th>
                  <th scope="col">{{ t('blockerOwner') }}</th>
                  <th scope="col">{{ t('blockerEvidence') }}</th>
                </tr>
              </thead>
              <tbody>
                @for (blocker of blockers(); track blocker.blockerId) {
                  <tr [attr.data-blocker]="blocker.blockerId">
                    <th scope="row">{{ blocker.blockerId }}</th>
                    <td>{{ blocker.status }}</td>
                    <td>{{ blocker.closureOwner }}</td>
                    <td>
                      <ul class="evidence">
                        @for (item of blocker.evidenceRequired; track $index) {
                          <li>{{ item }}</li>
                        }
                      </ul>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        }
      </section>

      <section class="panel provenance" aria-labelledby="mc25-provenance-h">
        <h3 id="mc25-provenance-h">{{ t('provenanceHeading') }}</h3>
        <p class="help">{{ t('provenanceIntro') }}</p>
        <div
          class="table-scroll"
          tabindex="0"
          role="region"
          [attr.aria-label]="t('provenanceHeading')"
        >
          <table class="matrix">
            <caption>
              {{
                t('provenanceHeading')
              }}
            </caption>
            <thead>
              <tr>
                <th scope="col">{{ t('provenanceContract') }}</th>
                <th scope="col">{{ t('provenanceVersion') }}</th>
                <th scope="col">{{ t('provenanceDigest') }}</th>
              </tr>
            </thead>
            <tbody>
              @for (entry of provenance(); track entry.path) {
                <tr [attr.data-contract]="entry.key">
                  <th scope="row">{{ entry.path }}</th>
                  <td>{{ entry.contractId }} v{{ entry.contractVersion }}</td>
                  <td>
                    <code class="digest">{{ entry.sha256.slice(0, 16) }}…</code>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
        <p class="evidence-ids">
          <strong>{{ t('provenanceEvidence') }}:</strong>
          @for (id of evidenceIds(); track id) {
            <code class="chip">{{ id }}</code>
          }
        </p>
      </section>

      <section class="panel lifecycle" aria-labelledby="mc25-lifecycle-h">
        <h3 id="mc25-lifecycle-h">{{ t('lifecycleHeading') }}</h3>
        <p class="help">{{ t('lifecycleIntro') }}</p>
        <dl class="facts-list">
          <dt>{{ t('lifecycleStateLabel') }}</dt>
          <dd data-mc25-state>{{ stateLabel() }}</dd>
        </dl>
        <h4>{{ t('lifecycleOptionsHeading') }}</h4>
        <ul class="transitions" data-mc25-transitions>
          @for (option of transitions(); track option.transitionId) {
            <li [attr.data-permitted]="option.permitted">
              <strong>{{ option.trigger }}</strong> → {{ option.toState }}:
              {{ option.permitted ? t('lifecyclePermitted') : t('lifecycleRefused') }}
              @if (option.refusalCode) {
                <code class="chip">{{ option.refusalCode }}</code>
              }
            </li>
          }
        </ul>
        <p class="help">{{ t('lifecycleTerminal') }}</p>
      </section>

      <section class="panel reviews" aria-labelledby="mc25-reviews-h">
        <h3 id="mc25-reviews-h">{{ t('reviewsHeading') }}</h3>
        <p class="help">{{ t('reviewsIntro') }}</p>
        <div class="actions">
          @for (action of reviewActions; track action.id) {
            <button marea-button type="button" variant="secondary" (click)="runAction(action.id)">
              {{ t(action.labelKey) }}
            </button>
          }
        </div>
        <div class="live" role="status" aria-live="polite">
          @if (outcome(); as result) {
            <div class="refusal" data-mc25-review-outcome>
              <h4>{{ t('reviewRefused') }}</h4>
              <p>
                <span marea-status-badge tone="critical" [label]="result.authorization.code"></span>
              </p>
              <ul>
                @for (reason of result.authorization.reasons; track $index) {
                  <li>{{ reason }}</li>
                }
                <li>{{ t('reviewNoPersistence') }}</li>
                <li>{{ t('reviewDurableNo') }}</li>
              </ul>
              <p class="muted">
                <code>{{ result.auditDraft }}</code>
              </p>
            </div>
          }
        </div>
      </section>

      <section class="panel facts" aria-labelledby="mc25-facts-h">
        <h3 id="mc25-facts-h">{{ t('factsHeading') }}</h3>
        <dl class="facts-list">
          <dt>{{ t('factEditionCount') }}</dt>
          <dd>{{ facts.editionCount }}</dd>
          <dt>{{ t('factOrderableCount') }}</dt>
          <dd data-mc25-fact-orderable>{{ facts.orderableEditions }}</dd>
          <dt>{{ t('factOpenGates') }}</dt>
          <dd>{{ facts.openReleaseGates }}</dd>
          <dt>{{ t('factMerchantSku') }}</dt>
          <dd>{{ facts.merchantSkuCodesEstablished }}</dd>
          <dt>{{ t('factApprovedPrices') }}</dt>
          <dd>{{ facts.approvedPrices }}</dd>
          <dt>{{ t('factEvaluationVersion') }}</dt>
          <dd data-mc25-evaluation-version>{{ decision().evaluationVersion }}</dd>
          <dt>{{ t('factFingerprint') }}</dt>
          <dd>
            <code>{{ decision().evidenceFingerprint }}</code>
          </dd>
        </dl>
      </section>

      <section class="panel limitations" aria-labelledby="mc25-limits-h">
        <h3 id="mc25-limits-h">{{ t('limitationsHeading') }}</h3>
        <ul>
          @for (limitation of limitations(); track $index) {
            <li>{{ limitation }}</li>
          }
        </ul>
      </section>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }
    .governance {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-5);
      max-inline-size: 76rem;
      margin-inline: auto;
      padding-inline: var(--marea-space-4);
    }
    .lede,
    .help,
    .reason,
    .na,
    .muted {
      font-family: var(--marea-font-body);
      font-size: var(--marea-type-body-size);
      line-height: var(--marea-type-body-line-height);
      color: var(--marea-text-secondary);
      margin: 0;
    }
    .help,
    .na,
    .muted {
      font-size: var(--marea-type-meta-size);
      line-height: var(--marea-type-meta-line-height);
    }
    .limits ul,
    .missing ul,
    .limitations ul {
      margin: 0;
      padding-inline-start: var(--marea-space-5);
      display: grid;
      gap: var(--marea-space-2);
    }
    .limits li,
    .limitations li,
    .missing li {
      font-family: var(--marea-font-body);
      font-size: var(--marea-type-body-size);
      line-height: var(--marea-type-body-line-height);
      color: var(--marea-text-secondary);
      overflow-wrap: anywhere;
    }
    .selection {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: var(--marea-space-3);
      min-inline-size: 0;
    }
    .fields {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 12rem), 1fr));
      gap: var(--marea-space-3);
      min-inline-size: 0;
    }
    .field {
      display: grid;
      gap: var(--marea-space-1);
      min-inline-size: 0;
    }
    .field label {
      font-family: var(--marea-font-body);
      font-size: var(--marea-type-label-size);
      font-weight: 700;
      color: var(--marea-text-primary);
    }
    .field select {
      inline-size: 100%;
      max-inline-size: 100%;
      min-inline-size: 0;
      min-block-size: var(--marea-touch-target, 44px);
      padding: var(--marea-space-2) var(--marea-space-3);
      border: var(--marea-border-width-hairline) solid var(--marea-border-strong);
      border-radius: var(--marea-radius-control);
      background: var(--marea-surface);
      color: var(--marea-text-primary);
      font-family: var(--marea-font-body);
      font-size: var(--marea-type-body-size);
    }
    .field select:focus-visible {
      outline: var(--marea-focus-width) var(--marea-focus-style) var(--marea-focus-ring);
      outline-offset: var(--marea-focus-inset);
    }
    .panel {
      display: grid;
      gap: var(--marea-space-3);
      padding: var(--marea-space-4);
      border: var(--marea-border-width-hairline) solid var(--marea-border-strong);
      border-radius: var(--marea-radius-surface);
      min-inline-size: 0;
    }
    /* A wide matrix must not widen the document at 320px: it scrolls inside a
       labelled, keyboard-focusable region instead. */
    .table-scroll {
      max-inline-size: 100%;
      min-inline-size: 0;
      overflow-x: auto;
    }
    .table-scroll:focus-visible {
      outline: var(--marea-focus-width) var(--marea-focus-style) var(--marea-focus-ring);
      outline-offset: var(--marea-focus-inset);
    }
    h3,
    h4 {
      margin: 0;
      font-family: var(--marea-font-display);
      color: var(--marea-text-primary);
    }
    .verdict {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--marea-space-2);
      font-family: var(--marea-font-body);
      line-height: var(--marea-type-body-line-height);
      color: var(--marea-text-primary);
      margin: 0;
    }
    table.matrix {
      inline-size: 100%;
      min-inline-size: 40rem;
      border-collapse: collapse;
      font-family: var(--marea-font-body);
      font-size: var(--marea-type-meta-size);
      line-height: var(--marea-type-meta-line-height);
    }
    table.matrix caption {
      position: absolute;
      inline-size: 1px;
      block-size: 1px;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
    }
    table.matrix th,
    table.matrix td {
      border-block-end: var(--marea-border-width-hairline) solid var(--marea-border-strong);
      padding: var(--marea-space-2);
      text-align: start;
      vertical-align: top;
      overflow-wrap: anywhere;
    }
    table.matrix thead th {
      color: var(--marea-text-primary);
      font-weight: 700;
    }
    table.matrix tbody th {
      font-weight: 700;
      color: var(--marea-text-primary);
    }
    table.matrix td {
      color: var(--marea-text-secondary);
    }
    code.chip,
    code.digest {
      display: inline-block;
      margin: 0 var(--marea-space-1) var(--marea-space-1) 0;
      padding: 1px var(--marea-space-1);
      border-radius: var(--marea-radius-control);
      background: var(--marea-surface-raised);
      color: var(--marea-text-primary);
      font-family: var(--marea-font-mono, monospace);
      font-size: var(--marea-type-meta-size);
      overflow-wrap: anywhere;
    }
    .evidence,
    .transitions {
      margin: 0;
      padding-inline-start: var(--marea-space-4);
      display: grid;
      gap: var(--marea-space-1);
    }
    .evidence li,
    .transitions li {
      font-family: var(--marea-font-body);
      font-size: var(--marea-type-meta-size);
      line-height: var(--marea-type-meta-line-height);
      color: var(--marea-text-secondary);
    }
    dl.facts-list {
      display: grid;
      grid-template-columns: minmax(0, max-content) minmax(0, 1fr);
      gap: var(--marea-space-2) var(--marea-space-4);
      margin: 0;
    }
    dt {
      font-family: var(--marea-font-body);
      font-weight: 700;
      color: var(--marea-text-primary);
    }
    dd {
      margin: 0;
      font-family: var(--marea-font-body);
      color: var(--marea-text-secondary);
      overflow-wrap: anywhere;
    }
    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: var(--marea-space-3);
    }
    .refusal {
      display: grid;
      gap: var(--marea-space-2);
      margin-block-start: var(--marea-space-3);
      padding: var(--marea-space-3);
      border: var(--marea-border-width-hairline) solid var(--marea-state-critical);
      border-radius: var(--marea-radius-surface);
    }
    .refusal ul {
      margin: 0;
      padding-inline-start: var(--marea-space-5);
      display: grid;
      gap: var(--marea-space-1);
    }
    .refusal li {
      font-family: var(--marea-font-body);
      font-size: var(--marea-type-meta-size);
      line-height: var(--marea-type-meta-line-height);
      color: var(--marea-text-secondary);
    }
    .evidence-ids {
      margin: 0;
      font-family: var(--marea-font-body);
      font-size: var(--marea-type-meta-size);
      color: var(--marea-text-secondary);
    }
    @media (max-width: 44rem) {
      dl.facts-list {
        grid-template-columns: minmax(0, 1fr);
      }
      dd {
        margin-block-end: var(--marea-space-2);
      }
    }
  `,
})
export class MareaCatalogSkuGovernance {
  readonly locale = input<MareaLocale>('es');

  readonly facts = READINESS_FACTS;
  readonly reviewActions = REVIEW_ACTIONS;

  private readonly familyId = signal<string>('NAV');
  private readonly editionId = signal<string>('NAV-ESSENTIAL');
  private readonly reviewOutcome = signal<ReviewActionOutcome | null>(null);

  readonly family = computed(() => this.familyId());
  readonly edition = computed(() => this.editionId());
  readonly outcome = computed(() => this.reviewOutcome());

  readonly familyOptions = computed(() =>
    GOVERNANCE_SNAPSHOT.families.map((family) => ({
      familyId: family.familyId,
      displayName: family.displayName,
    })),
  );

  readonly editionOptions = computed(() => {
    const family = familyById(this.familyId());
    const ids = family
      ? family.editionIds
      : GOVERNANCE_SNAPSHOT.editions
          .filter((edition) => edition.familyId === this.familyId())
          .map((edition) => edition.editionId);
    return ids
      .map((id) => editionById(id))
      .filter((edition) => edition !== undefined)
      .map((edition) => ({
        editionId: edition.editionId,
        label: `${edition.editionId} · ${edition.editionType}`,
      }));
  });

  readonly decision = computed<ReadinessDecision>(() => {
    const family = familyById(this.familyId());
    const allowed = family ? family.editionIds : [];
    const selected = allowed.includes(this.editionId())
      ? this.editionId()
      : (allowed[0] ?? this.editionId());
    const candidate = resolveCandidateIdentity(`SKU-CAND-${selected}`);
    return candidate.kind === 'CANDIDATE_COMMERCIAL_SKU'
      ? evaluateCandidateReadiness(candidate.canonicalId)
      : evaluateCandidateReadiness('');
  });

  readonly prerequisites = computed<readonly PrerequisiteResult[]>(
    () => this.decision().prerequisites,
  );

  readonly blockers = computed(() =>
    this.decision()
      .mc02BlockerIds.map((id) => blockerById(id))
      .filter((blocker) => blocker !== undefined),
  );

  readonly provenance = computed(() => {
    const refs = new Set(this.decision().contractRefs);
    return GOVERNANCE_SNAPSHOT.provenance.filter((entry) => refs.has(entry.path));
  });

  readonly evidenceIds = computed(() => {
    const identity = resolveEditionIdentity(this.decision().subject.editionId);
    const edition = identity.edition;
    const candidate = identity.candidate;
    return [
      ...new Set([...(edition?.evidenceIds ?? []), ...(candidate?.requiredEvidenceIds ?? [])]),
    ];
  });

  readonly governanceState = computed<SkuGovernanceState>(() => governanceStateOf(this.decision()));

  readonly transitions = computed(() => transitionOptions(this.governanceState()));

  readonly identityKind = computed(() => this.decision().subject.identityKind);

  readonly identityFamilyLabel = computed(() => {
    const family = familyById(this.decision().subject.familyId ?? '');
    return family ? family.displayName : (this.decision().subject.familyId ?? '—');
  });

  readonly candidateLabel = computed(() => this.decision().subject.skuCandidateId ?? '—');

  readonly merchantSkuLabel = computed(() => {
    const code = this.decision().subject.merchantSkuCode;
    return code === null ? this.t('merchantSkuNone') : code;
  });

  readonly stateLabel = computed(() => {
    const key = GOVERNANCE_STATE_LABELS[this.governanceState()];
    return key ? this.t(key) : this.governanceState();
  });

  readonly notices = computed(() => GOVERNANCE_NOTICE_KEYS.map((key) => this.t(key)));

  readonly limitations = computed(() => GOVERNANCE_LIMITATION_KEYS.map((key) => this.t(key)));

  /** Typed accessor for the contract-keyed bilingual labels (TS4111-safe). */
  t(key: string): string {
    return GOVERNANCE_LABELS[key]?.[this.locale()] ?? key;
  }

  selectFamily(familyId: string): void {
    const family = familyById(familyId);
    this.familyId.set(family ? family.familyId : 'NAV');
    const first = this.editionOptions()[0];
    if (first) this.editionId.set(first.editionId);
    this.reviewOutcome.set(null);
  }

  selectEdition(editionId: string): void {
    const edition = editionById(editionId);
    if (edition) this.editionId.set(edition.editionId);
    this.reviewOutcome.set(null);
  }

  statusLabel(item: PrerequisiteResult): string {
    switch (item.status) {
      case 'PASSED':
        return this.t('statusPassed');
      case 'FAILED':
        return this.t('statusFailed');
      case 'NOT_APPLICABLE':
        return this.t('statusNotApplicable');
      default:
        return this.t('statusUnknown');
    }
  }

  statusTone(item: PrerequisiteResult): MareaTone {
    switch (item.status) {
      case 'PASSED':
        return 'safe';
      case 'FAILED':
        return 'critical';
      case 'NOT_APPLICABLE':
        return 'info';
      default:
        return 'stale';
    }
  }

  /** Calls the fail-closed review adapter directly, exactly as the UI does. */
  runAction(action: string): void {
    const outcome = submitReviewAction({
      action,
      editionId: this.decision().subject.editionId ?? undefined,
      note: undefined,
    });
    this.reviewOutcome.set(outcome);
  }
}
