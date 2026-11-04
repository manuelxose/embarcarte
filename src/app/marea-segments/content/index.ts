/**
 * MC-19 internal audience pages — the ONE bilingual content source.
 *
 * `SEGMENT_CONTENT.segments[segmentId]` is the only copy the page component can
 * render. Audience files hold authored draft copy; `shared.ts` holds the shell,
 * navigation, footer and readiness labels used by all three pages.
 */
import type { SegmentContent } from './content.types';
import { INSTALLERS_COPY } from './installers';
import { PROFESSIONALS_COPY } from './professionals';
import { SHARED_COPY } from './shared';
import { SHIPOWNERS_COPY } from './shipowners';

export const SEGMENT_CONTENT: SegmentContent = {
  shared: SHARED_COPY,
  segments: {
    professionals: PROFESSIONALS_COPY,
    installers: INSTALLERS_COPY,
    shipowners: SHIPOWNERS_COPY,
  },
};
