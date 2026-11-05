import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MareaFormField } from '../../marea-design-system/components/foundation/marea-form-field';
import { MareaButton } from '../../marea-design-system/components/foundation/marea-button';
import { MareaInput } from '../../marea-design-system/components/foundation/marea-input';
import { MareaStatusBadge } from '../../marea-design-system/components/foundation/marea-status-badge';
import { MareaSectionHeading } from '../../marea-design-system/components/foundation/marea-section-heading';
import type { MareaLocale, MareaTone } from '../../marea-design-system/core/types';
import {
  CONFIGURATOR_FACTS,
  MANDATORY_QUESTION_IDS,
  VALIDATED_SELF_INSTALL_RULES,
  isKnownBundle,
  resolveConfiguration,
  type ConfiguratorResult,
} from '../data/configurator-engine';
import { triageFor, type TriageRecord } from '../data/configurator-triage';
import { CONFIGURATOR_QUESTIONS, type ConfiguratorQuestion } from '../data/configurator.generated';
import {
  BUNDLE_OPTIONS,
  CONFIGURATOR_LABELS,
  CONFIGURATOR_LIMITATIONS,
  OUTCOME_EXPLANATIONS,
  OUTCOME_LABELS,
  PRIORITY_LABELS,
  TRIAGE_LABELS,
} from '../content/configurator';

interface ResolvedView {
  readonly result: ConfiguratorResult;
  readonly triage: TriageRecord;
}

/**
 * MC-24 internal configurator and quotation triage section.
 *
 * One component tree serves both locales; every string comes from the content
 * contract, so ES and EN cannot drift structurally. The component owns no
 * commercial state: it reads the canonical project/manifest and the generated
 * MC-08 projection, and calls the pure engine.
 *
 * Accessibility: a real form element, fieldset/legend grouping, labelled inputs,
 * a polite live region announcing the result and a status summary that does not
 * rely on colour alone.
 */
@Component({
  selector: 'marea-catalog-configurator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    MareaFormField,
    MareaButton,
    MareaInput,
    MareaStatusBadge,
    MareaSectionHeading,
  ],
  template: `
    <section class="configurator" aria-label="MC-24" data-mc24-configurator>
      <marea-section-heading [heading]="t('heading')" [level]="2" />
      <p class="lede">{{ t('intro') }}</p>

      <div class="limits" role="region" [attr.aria-label]="t('noticeHeading')">
        <ul>
          @for (limit of limits(); track $index) {
            <li>{{ limit }}</li>
          }
        </ul>
      </div>

      <form (ngSubmit)="classify()" novalidate>
        <fieldset class="bundle-fieldset">
          <legend>{{ t('bundleLegend') }}</legend>
          <p class="hint">{{ t('bundleHelp') }}</p>
          <div class="bundles">
            @for (bundle of bundleOptions; track bundle) {
              <label class="bundle-option">
                <input
                  type="radio"
                  name="mc24-bundle"
                  [value]="bundle"
                  [checked]="selectedBundle() === bundle"
                  (change)="selectBundle(bundle)"
                />
                <span>{{ bundle }}</span>
              </label>
            }
          </div>
        </fieldset>

        <fieldset class="cap-fieldset">
          <legend>{{ t('excludedLegend') }}</legend>
          <p class="hint">{{ t('excludedHelp') }}</p>
          @for (capability of capabilities; track capability.id) {
            <label class="cap-option">
              <input
                type="checkbox"
                [checked]="requested().includes(capability.id)"
                (change)="toggleCapability(capability.id)"
              />
              <span>{{ capability.label[locale()] }}</span>
            </label>
          }
        </fieldset>

        @for (group of groupedQuestions(); track group.id) {
          <fieldset class="question-group" [attr.data-group]="group.id">
            <legend>{{ group.legend[locale()] }}</legend>
            @if (group.id === 'SAFETY_SENSITIVE') {
              <p class="hint">{{ t('groupSafetyNote') }}</p>
            }
            @for (question of group.questions; track question.id) {
              <div class="question">
                <marea-form-field
                  [label]="questionText(question)"
                  [controlId]="'mc24-' + question.id"
                  [required]="isMandatory(question)"
                >
                  <input
                    mareaInput
                    type="text"
                    [id]="'mc24-' + question.id"
                    [name]="question.id"
                    [placeholder]="t('answerPlaceholder')"
                    [value]="answerFor(question.id)"
                    (input)="setAnswer(question.id, $any($event.target).value)"
                  />
                </marea-form-field>
                @if (!isMandatory(question)) {
                  <p class="na">{{ t('optionalMark') }}</p>
                }
              </div>
            }
          </fieldset>
        }

        <div class="actions">
          <button marea-button type="submit">{{ t('submit') }}</button>
          <button marea-button type="button" variant="secondary" (click)="reset()">
            {{ t('reset') }}
          </button>
        </div>
      </form>

      <section class="result" aria-labelledby="cfg-result-h">
        <h3 id="cfg-result-h">{{ t('resultHeading') }}</h3>
        <div class="live" role="status" aria-live="polite">
          @if (resolved(); as view) {
            <p class="outcome" [attr.data-outcome]="view.result.outcome">
              <span
                marea-status-badge
                [tone]="outcomeTone(view.result.outcome)"
                [label]="outcomeLabel(view.result.outcome)"
                data-mc24-outcome
              ></span>
              {{ outcomeExplanation(view.result.outcome) }}
            </p>

            @if (view.result.unresolvedQuestionIds.length > 0) {
              <div class="missing">
                <h4>{{ t('missingHeading') }}</h4>
                <p>{{ t('missingNote') }}</p>
                <ul>
                  @for (id of view.result.unresolvedQuestionIds; track id) {
                    <li>{{ id }}</li>
                  }
                </ul>
              </div>
            }

            @if (view.result.excludedCapabilities.length > 0) {
              <div class="excluded">
                <h4>{{ t('excludedHeading') }}</h4>
                <p>{{ t('excludedNote') }}</p>
              </div>
            }

            <div class="triage" data-mc24-triage>
              <h4>{{ t('triageHeading') }}</h4>
              <dl>
                <dt>{{ t('triageRoute') }}</dt>
                <dd data-mc24-route>{{ triageLabel(view.triage.route) }}</dd>
                <dt>{{ t('triagePriority') }}</dt>
                <dd>{{ priorityLabel(view.triage.priority) }}</dd>
                <dt>{{ t('triageSurvey') }}</dt>
                <dd>{{ view.triage.requiresVesselSurvey ? t('triageYes') : t('triageNo') }}</dd>
                <dt>{{ t('triageSafety') }}</dt>
                <dd>{{ view.triage.requiresSafetyEvidence ? t('triageYes') : t('triageNo') }}</dd>
              </dl>
            </div>

            <div class="next">
              <h4>{{ t('nextActionHeading') }}</h4>
              <p data-mc24-next>{{ nextAction(view.result.outcome) }}</p>
            </div>

            <div class="quotation">
              <h4>{{ t('quotationHeading') }}</h4>
              <p>{{ t('quotationNotProduced') }}</p>
            </div>
          } @else {
            <p class="empty">{{ t('resultEmpty') }}</p>
          }
        </div>
      </section>

      <section class="facts" aria-labelledby="cfg-facts-h">
        <h3 id="cfg-facts-h">{{ t('factsHeading') }}</h3>
        <dl class="fact-list">
          <dt>{{ t('factQuestions') }}</dt>
          <dd data-mc24-fact-questions>{{ facts.questionCount }}</dd>
          <dt>{{ t('factRules') }}</dt>
          <dd>{{ facts.ruleCount }}</dd>
          <dt>{{ t('factConflictRules') }}</dt>
          <dd>{{ facts.conflictRuleCount }}</dd>
          <dt>{{ t('factValidatedRules') }}</dt>
          <dd data-mc24-fact-validated>{{ facts.validatedSelfInstallRuleCount }}</dd>
          <dt>{{ t('factTestedRows') }}</dt>
          <dd>{{ facts.testedCompatibilityRows }}</dd>
        </dl>
      </section>

      <section class="limitations" aria-labelledby="cfg-lim-h">
        <h3 id="cfg-lim-h">{{ t('limitationHeading') }}</h3>
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
    .configurator {
      display: grid;
      gap: var(--marea-space-5);
      max-inline-size: 72rem;
      margin-inline: auto;
      padding-inline: var(--marea-space-4);
    }
    .lede {
      font-family: var(--marea-font-body);
      font-size: var(--marea-type-body-size);
      line-height: var(--marea-type-body-line-height);
      color: var(--marea-text-primary);
      max-inline-size: 60ch;
    }
    .limits ul,
    .limitations ul {
      margin: 0;
      padding-inline-start: var(--marea-space-5);
      display: grid;
      gap: var(--marea-space-2);
    }
    .limits li,
    .limitations li {
      font-family: var(--marea-font-body);
      font-size: var(--marea-type-body-size);
      line-height: var(--marea-type-body-line-height);
      color: var(--marea-text-secondary);
    }
    form {
      display: grid;
      gap: var(--marea-space-5);
    }
    fieldset {
      border: var(--marea-border-width-hairline) solid var(--marea-border-strong);
      border-radius: var(--marea-radius-surface);
      padding: var(--marea-space-4);
      margin: 0;
      min-inline-size: 0;
    }
    legend {
      font-family: var(--marea-font-body);
      font-weight: 700;
      font-size: var(--marea-type-label-size);
      color: var(--marea-text-primary);
      padding-inline: var(--marea-space-2);
    }
    .hint,
    .na {
      font-family: var(--marea-font-body);
      font-size: var(--marea-type-meta-size);
      line-height: var(--marea-type-meta-line-height);
      color: var(--marea-text-secondary);
      margin: 0 0 var(--marea-space-3);
    }
    .bundles {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
      gap: var(--marea-space-2);
    }
    .bundle-option,
    .cap-option {
      display: flex;
      align-items: center;
      gap: var(--marea-space-2);
      min-block-size: var(--marea-touch-target);
      font-family: var(--marea-font-body);
      font-size: var(--marea-type-body-size);
      color: var(--marea-text-primary);
    }
    .bundle-option input,
    .cap-option input {
      inline-size: 1.25rem;
      block-size: 1.25rem;
      flex: none;
    }
    .question-group {
      display: grid;
      gap: var(--marea-space-3);
    }
    .question {
      display: grid;
      gap: var(--marea-space-1);
    }
    .question .na {
      margin: 0;
    }
    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: var(--marea-space-3);
    }
    .result,
    .facts,
    .limitations {
      display: grid;
      gap: var(--marea-space-3);
      padding: var(--marea-space-4);
      border: var(--marea-border-width-hairline) solid var(--marea-border-strong);
      border-radius: var(--marea-radius-surface);
    }
    h3,
    h4 {
      margin: 0;
      font-family: var(--marea-font-display);
      color: var(--marea-text-primary);
    }
    .outcome {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--marea-space-2);
      font-family: var(--marea-font-body);
      line-height: var(--marea-type-body-line-height);
      color: var(--marea-text-primary);
      margin: 0;
    }
    .empty {
      margin: 0;
      font-family: var(--marea-font-body);
      color: var(--marea-text-secondary);
    }
    dl {
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
    }
    .missing ul {
      margin: 0;
      padding-inline-start: var(--marea-space-5);
    }
    @media (max-width: 40rem) {
      dl {
        grid-template-columns: minmax(0, 1fr);
      }
      dd {
        margin-block-end: var(--marea-space-2);
      }
    }
  `,
})
export class MareaCatalogConfigurator {
  readonly locale = input<MareaLocale>('es');

  readonly labels = CONFIGURATOR_LABELS;
  readonly facts = CONFIGURATOR_FACTS;
  readonly bundleOptions = BUNDLE_OPTIONS;
  readonly capabilities = [
    { id: 'steering-integration', label: CONFIGURATOR_LABELS['excludedSteering'] },
    { id: 'autopilot-control', label: CONFIGURATOR_LABELS['excludedAutopilot'] },
    { id: 'nmea2000-certification', label: CONFIGURATOR_LABELS['excludedNmea'] },
  ];

  private readonly bundle = signal<string>('START');
  private readonly answers = signal<Record<string, string>>({});
  private readonly requestedCapabilities = signal<string[]>([]);
  private readonly view = signal<ResolvedView | null>(null);

  readonly selectedBundle = computed(() => this.bundle());
  readonly requested = computed(() => this.requestedCapabilities());
  readonly resolved = computed(() => this.view());

  /**
   * Typed accessor for the contract-keyed bilingual labels.
   *
   * The label map is an index-signature record, so a template member access is a
   * TS4111 error under the strict Angular template checker. Resolving through one
   * typed method keeps the template honest and fails closed to the key itself.
   */
  t(key: string): string {
    return CONFIGURATOR_LABELS[key]?.[this.locale()] ?? key;
  }

  readonly limits = computed(() =>
    ['noticeNoPrice', 'noticeNoPurchase', 'noticeUnknown', 'noticeNoTestedRow'].map(
      (key) => CONFIGURATOR_LABELS[key][this.locale()],
    ),
  );

  readonly limitations = computed(() =>
    CONFIGURATOR_LIMITATIONS.map((item) => item[this.locale()]),
  );

  readonly groupedQuestions = computed(() => {
    const bundleId = this.bundle();
    const groups = [
      { id: 'GENERAL' as const, legendKey: 'groupGeneral' },
      { id: 'SAFETY_SENSITIVE' as const, legendKey: 'groupSafety' },
      { id: 'B2B_FLEET' as const, legendKey: 'groupFleet' },
    ];
    return groups
      .map((group) => ({
        id: group.id,
        legend: CONFIGURATOR_LABELS[group.legendKey],
        questions: CONFIGURATOR_QUESTIONS.filter((question) => {
          if (question.group !== group.id) return false;
          // A group applies to a bundle only when the contract says so.
          return question.appliesTo === null || question.appliesTo.includes(bundleId);
        }),
      }))
      .filter((group) => group.questions.length > 0);
  });

  private readonly mandatoryIds = computed(() => {
    const bundleId = this.bundle();
    return new Set(isKnownBundle(bundleId) ? (MANDATORY_QUESTION_IDS[bundleId] ?? []) : []);
  });

  questionText(question: ConfiguratorQuestion): string {
    return question.question;
  }

  isMandatory(question: ConfiguratorQuestion): boolean {
    return this.mandatoryIds().has(question.id);
  }

  answerFor(id: string): string {
    return this.answers()[id] ?? '';
  }

  selectBundle(bundleId: string): void {
    this.bundle.set(bundleId);
    this.view.set(null);
  }

  setAnswer(id: string, value: string): void {
    this.answers.update((current) => ({ ...current, [id]: value }));
    this.view.set(null);
  }

  toggleCapability(id: string): void {
    this.requestedCapabilities.update((current) =>
      current.includes(id) ? current.filter((value) => value !== id) : [...current, id],
    );
    this.view.set(null);
  }

  reset(): void {
    this.bundle.set('START');
    this.answers.set({});
    this.requestedCapabilities.set([]);
    this.view.set(null);
  }

  /** Pure call into the deterministic engine; no I/O, no clock, no network. */
  classify(): void {
    const result = resolveConfiguration({
      bundleId: this.bundle(),
      answers: this.answers(),
      requestedCapabilities: this.requestedCapabilities(),
    });
    this.view.set({ result, triage: triageFor(result) });
  }

  outcomeLabel(outcome: string): string {
    return OUTCOME_LABELS[outcome]?.[this.locale()] ?? outcome;
  }

  outcomeExplanation(outcome: string): string {
    return OUTCOME_EXPLANATIONS[outcome]?.[this.locale()] ?? '';
  }

  outcomeTone(outcome: string): MareaTone {
    switch (outcome) {
      case 'ELIGIBLE_SELF_INSTALL':
        return 'safe';
      case 'INSTALLER_ASSESSMENT_REQUIRED':
        return 'warning';
      case 'NOT_SUPPORTED':
        return 'critical';
      default:
        return 'neutral';
    }
  }

  triageLabel(route: string): string {
    return TRIAGE_LABELS[route]?.[this.locale()] ?? route;
  }

  priorityLabel(priority: string): string {
    return PRIORITY_LABELS[priority]?.[this.locale()] ?? priority;
  }

  nextAction(outcome: string): string {
    switch (outcome) {
      case 'INSUFFICIENT_INFORMATION':
        return CONFIGURATOR_LABELS['nextActionComplete'][this.locale()];
      case 'NOT_SUPPORTED':
        return CONFIGURATOR_LABELS['nextActionReadExclusion'][this.locale()];
      case 'INSTALLER_ASSESSMENT_REQUIRED':
        return CONFIGURATOR_LABELS['nextActionInstaller'][this.locale()];
      case 'ELIGIBLE_SELF_INSTALL':
        return CONFIGURATOR_LABELS['nextActionSteps'][this.locale()];
      default:
        return CONFIGURATOR_LABELS['nextActionSpecialist'][this.locale()];
    }
  }
}
