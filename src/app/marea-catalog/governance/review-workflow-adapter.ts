/**
 * MC-25 review-workflow adapter.
 *
 * A thin, explicit surface between the governance screen and the authorization
 * boundary. It exists so the UI cannot reach an action that is not declared
 * here, and so the fail-closed behaviour is exercised exactly as the UI
 * exercises it: `submitReviewAction` is the same function the tests invoke
 * directly.
 */
import { submitReviewAction } from './admin-authorization';

export type { ReviewActionOutcome, ReviewActionRequest } from './admin-authorization';
export { submitReviewAction };

export interface ReviewActionDescriptor {
  readonly id: 'REQUEST_EVIDENCE' | 'RECORD_REVIEW_DECISION';
  readonly labelKey: string;
}

/**
 * The only two review actions the screen offers. Both are refused by the
 * authorization boundary: no verified mechanism and no persistence contract.
 * Approval, publication and orderability actions are deliberately absent.
 */
export const REVIEW_ACTIONS: readonly ReviewActionDescriptor[] = Object.freeze([
  { id: 'REQUEST_EVIDENCE', labelKey: 'actionRequestEvidence' },
  { id: 'RECORD_REVIEW_DECISION', labelKey: 'actionRecordDecision' },
]);
