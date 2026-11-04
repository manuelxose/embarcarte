/**
 * MC-19 projection builder (pure, deterministic).
 *
 * Reads the ONE content source and the frozen identities and returns the
 * resolved bilingual block list plus the counts the validator and the delivery
 * documents quote. It performs no I/O and no network access.
 */
import { SEGMENT_CONTENT } from '../src/app/marea-segments/content/index.ts';
import {
  SEGMENT_IDS,
  SEGMENT_PREVIEW_ROUTES,
  SEGMENT_IDENTITIES,
} from '../src/app/marea-segments/models/segment-identity.ts';
import { SEGMENT_SECTION_ORDER } from '../src/app/marea-segments/content/content.types.ts';

const LOCALES = ['es', 'en'];

/** Walks every block of one page copy, in document order. */
function pageBlocks(copy) {
  const blocks = [];
  const add = (block) => {
    if (block && typeof block === 'object' && 'text' in block) blocks.push(block);
  };
  const addAll = (list) => {
    for (const entry of list ?? []) add(entry);
  };

  addAll([copy.hero.kicker, copy.hero.heading, copy.hero.lead, copy.hero.classification]);
  addAll(copy.hero.highlights);

  addAll([copy.scope.kicker, copy.scope.heading, copy.scope.lead]);
  for (const item of copy.scope.isFor) addAll([item.label, item.body]);
  for (const item of copy.scope.isNotFor) addAll([item.label, item.body]);
  for (const useCase of copy.scope.useCases) addAll([useCase.title, useCase.body, useCase.limit]);
  add(copy.scope.boundary);

  addAll([copy.families.kicker, copy.families.heading, copy.families.lead]);
  for (const family of copy.families.families) add(family.summary);
  add(copy.families.note);

  addAll([copy.capabilities.kicker, copy.capabilities.heading, copy.capabilities.lead]);
  for (const capability of copy.capabilities.capabilities) {
    addAll([capability.title, capability.capability, capability.limit]);
  }
  add(copy.capabilities.note);

  addAll([copy.ecosystem.kicker, copy.ecosystem.heading, copy.ecosystem.lead]);
  for (const step of copy.ecosystem.steps) addAll([step.label, step.body]);
  add(copy.ecosystem.note);

  addAll([copy.readiness.kicker, copy.readiness.heading, copy.readiness.lead]);
  addAll(copy.readiness.statements);
  add(copy.readiness.gateNote);

  addAll([copy.documentation.kicker, copy.documentation.heading, copy.documentation.lead]);
  for (const reference of copy.documentation.references)
    addAll([reference.title, reference.limitation]);
  add(copy.documentation.note);

  addAll([copy.closing.kicker, copy.closing.heading, copy.closing.lead]);
  addAll(copy.closing.statements);
  addAll([copy.closing.restriction, copy.closing.actionLabel, copy.closing.actionReason]);

  return blocks;
}

function sharedBlocks(shared) {
  const blocks = [
    shared.classificationBanner,
    shared.provisionalBrand,
    shared.proposedBrandLabel,
    shared.footerClassification,
    shared.footerPublicIsolation,
    shared.footerGates,
    shared.footerEnquiry,
    shared.skipLink,
    shared.previewLabel,
    shared.localeSwitchLabel,
  ];
  for (const entry of shared.audienceNav) blocks.push(entry.label);
  for (const entry of shared.readinessLabels) blocks.push(entry.label);
  for (const block of Object.values(shared.labels)) blocks.push(block);
  return blocks;
}

export function buildProjection() {
  const shared = SEGMENT_CONTENT.shared;
  const sharedCount = sharedBlocks(shared).length;

  const segments = {};
  const resolved = [];

  for (const segmentId of SEGMENT_IDS) {
    const copy = SEGMENT_CONTENT.segments[segmentId];
    const blocks = pageBlocks(copy);
    segments[segmentId] = {
      segmentId,
      entityId: SEGMENT_IDENTITIES[segmentId].entityId,
      blocks: blocks.length,
      families: copy.families.families.map((entry) => entry.familyId),
      capabilities: copy.capabilities.capabilities.length,
      useCases: copy.scope.useCases.length,
      documentationReferences: copy.documentation.references.length,
      sections: SEGMENT_SECTION_ORDER.length,
      locales: LOCALES.length,
    };
    for (const locale of LOCALES) {
      for (const block of blocks) {
        resolved.push({
          segmentId,
          locale,
          contentId: block.contentId,
          sectionId: block.sectionId,
          sourceType: block.sourceType,
          copyClass: block.copyClass,
          evidenceIds: [...block.evidenceIds],
          publicationStatus: block.publicationStatus,
          approvalStatus: block.approvalStatus,
          text: block.text[locale],
        });
      }
    }
  }

  for (const locale of LOCALES) {
    for (const block of sharedBlocks(shared)) {
      resolved.push({
        segmentId: 'shared',
        locale,
        contentId: block.contentId,
        sectionId: block.sectionId,
        sourceType: block.sourceType,
        copyClass: block.copyClass,
        evidenceIds: [...block.evidenceIds],
        publicationStatus: block.publicationStatus,
        approvalStatus: block.approvalStatus,
        text: block.text[locale],
      });
    }
  }

  const pageBlockTotal = Object.values(segments).reduce((sum, page) => sum + page.blocks, 0);

  return {
    contractId: 'MC19-CONTENT-PROJECTION',
    contractVersion: '1.0.0',
    milestone: 'MC-19',
    generatedBy: 'scripts/build-mc19-segments-data.mjs',
    publicationStatus: 'INTERNAL_DRAFT_NOT_APPROVED',
    approvalStatus: 'NOT_APPROVED',
    locales: LOCALES,
    identities: SEGMENT_IDS,
    previewRoutes: SEGMENT_PREVIEW_ROUTES.map((route) => ({
      segmentId: route.segmentId,
      locale: route.locale,
      path: `/${route.path}`,
      renderMode: route.renderMode,
    })),
    counts: {
      identities: SEGMENT_IDS.length,
      pages: SEGMENT_IDS.length,
      locales: LOCALES.length,
      sectionsPerPage: SEGMENT_SECTION_ORDER.length,
      pageBlocksPerAudience: segments,
      pageBlockTotal,
      sharedBlocks: sharedCount,
      resolvedRecords: resolved.length,
    },
    segments,
    resolved,
  };
}
