/**
 * MC-25 readiness verdict presentation.
 *
 * The rendered verdict is DERIVED from the engine's decision, never authored in
 * the template. This closes the "UI says NOT_ORDERABLE while a service says
 * ORDERABLE" class of defect in both directions: if the engine ever returned
 * ORDERABLE, the screen could not keep claiming NOT_ORDERABLE — it would render
 * a distinct "requires commercial authorization" state instead, which still is
 * not a purchase or availability claim.
 */
export interface ReadinessVerdict {
  readonly code: 'NOT_ORDERABLE' | 'ORDERABLE';
  readonly labelKey: string;
  readonly explanationKey: string;
  readonly tone: 'critical' | 'warning';
}

const NOT_ORDERABLE: ReadinessVerdict = Object.freeze({
  code: 'NOT_ORDERABLE',
  labelKey: 'verdictNotOrderable',
  explanationKey: 'verdictExplanation',
  tone: 'critical',
});

/**
 * The only positive branch, and it is still NOT a sale claim: an orderable
 * readiness result requires commercial authorization before any transaction.
 */
const ORDERABLE: ReadinessVerdict = Object.freeze({
  code: 'ORDERABLE',
  labelKey: 'verdictRequiresAuthorization',
  explanationKey: 'verdictRequiresAuthorizationExplanation',
  tone: 'warning',
});

/** Map an engine orderability value to the rendered verdict. Unknown → refuse. */
export function verdictFor(value: string | null | undefined): ReadinessVerdict {
  return value === 'ORDERABLE' ? ORDERABLE : NOT_ORDERABLE;
}
