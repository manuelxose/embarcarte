/**
 * MC-19 content factories shared by the three audience files.
 *
 * They exist so the three pages cannot drift in block shape, copy class or
 * identifier scheme. They add no content: every string is passed by the caller.
 */
import { b } from './blocks';
import type {
  SegmentCapability,
  SegmentDocumentationReference,
  SegmentEcosystemStep,
  SegmentFamilyCopy,
  SegmentScopeItem,
  SegmentUseCase,
} from './content.types';

export function scopeItem(
  itemId: string,
  labelId: string,
  labelEs: string,
  labelEn: string,
  bodyId: string,
  bodyEs: string,
  bodyEn: string,
  evidence: readonly string[],
): SegmentScopeItem {
  return {
    itemId,
    label: b('scope', labelId, 'NAVIGATIONAL', evidence, labelEs, labelEn),
    body: b('scope', bodyId, 'INTERNAL_EVIDENCED', evidence, bodyEs, bodyEn),
  };
}

export function useCase(
  useCaseId: string,
  titleId: string,
  titleEs: string,
  titleEn: string,
  bodyId: string,
  bodyEs: string,
  bodyEn: string,
  limitId: string,
  limitEs: string,
  limitEn: string,
  evidence: readonly string[],
): SegmentUseCase {
  return {
    useCaseId,
    title: b('scope', titleId, 'PROPOSED_INTENT', evidence, titleEs, titleEn),
    body: b('scope', bodyId, 'INTERNAL_EVIDENCED', evidence, bodyEs, bodyEn),
    limit: b('scope', limitId, 'CONSTRAINT_STATEMENT', evidence, limitEs, limitEn),
  };
}

export function family(
  familyId: string,
  contentId: string,
  es: string,
  en: string,
  evidence: readonly string[],
): SegmentFamilyCopy {
  return {
    familyId,
    summary: b('families', contentId, 'PROPOSED_INTENT', evidence, es, en),
  };
}

export function capability(
  capabilityId: string,
  baseId: string,
  titleEs: string,
  titleEn: string,
  capabilityEs: string,
  capabilityEn: string,
  limitEs: string,
  limitEn: string,
  evidence: readonly string[],
): SegmentCapability {
  return {
    capabilityId,
    title: b('capabilities', `${baseId}.title`, 'NAVIGATIONAL', evidence, titleEs, titleEn),
    capability: b(
      'capabilities',
      `${baseId}.capability`,
      'INTERNAL_EVIDENCED',
      evidence,
      capabilityEs,
      capabilityEn,
    ),
    limit: b('capabilities', `${baseId}.limit`, 'CONSTRAINT_STATEMENT', evidence, limitEs, limitEn),
  };
}

export function ecosystemStep(
  stepId: string,
  baseId: string,
  labelEs: string,
  labelEn: string,
  bodyEs: string,
  bodyEn: string,
  evidence: readonly string[],
): SegmentEcosystemStep {
  return {
    stepId,
    label: b('ecosystem', `${baseId}.label`, 'NAVIGATIONAL', evidence, labelEs, labelEn),
    body: b('ecosystem', `${baseId}.body`, 'INTERNAL_EVIDENCED', evidence, bodyEs, bodyEn),
  };
}

export function documentationReference(
  referenceId: string,
  baseId: string,
  titleEs: string,
  titleEn: string,
  limitationEs: string,
  limitationEn: string,
  evidence: readonly string[],
): SegmentDocumentationReference {
  return {
    referenceId,
    status: 'PENDING',
    title: b('documentation', `${baseId}.title`, 'NAVIGATIONAL', evidence, titleEs, titleEn),
    limitation: b(
      'documentation',
      `${baseId}.limitation`,
      'CONSTRAINT_STATEMENT',
      evidence,
      limitationEs,
      limitationEn,
    ),
  };
}
