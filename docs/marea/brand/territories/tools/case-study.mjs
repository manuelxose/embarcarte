// case-study.mjs — title-case alternative evaluation artwork (MC-04).
// The brief requires the uppercase master and an explicitly evaluated title-case alternative.
// Lowercase forms are authored on the same construction logic: x-height 70/100, stem 16,
// constant-weight ring bands, flat terminals. This is a study, not a second wordmark system.
import { rectPts, ringPath, arcBandPath } from './geom.mjs';
import { layout } from './alphabet.mjs';

const R = (x, y, w, h) => rectPts(x, y, w, h);

// Single-storey x-height forms, baseline 100, x-height 70 (ink 30..100); ink starts at x=0.
// Mixed primitive types (filled arcs + rects) are placed with a translate group, never merged.
export const LOWER = {
  a: { prims: [ringPath(35, 65, 27, 16), R(54, 30, 16, 70)], w: 70 },
  r: { prims: [R(0, 30, 16, 70), R(8, 30, 26, 16)], w: 34 },
  e: { prims: [arcBandPath(35, 65, 27, 16, 50, 380), R(0, 58, 62, 16)], w: 70 },
};

/** Title-case row: cap M from the uppercase system + placed lowercase forms. */
export const titleCaseStudy = () => {
  const upper = layout('MAREA');
  const capM = layout('M');
  const items = [];
  let x = capM.width + 14;
  for (const [ch, gap] of [
    ['a', 12],
    ['r', 14],
    ['e', 12],
    ['a', 0],
  ]) {
    items.push({ ch, x, prims: LOWER[ch].prims });
    x += LOWER[ch].w + gap;
  }
  return { upper, title: { capM, items, width: x } };
};
