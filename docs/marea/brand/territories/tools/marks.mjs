// marks.mjs — territory prototype geometry (MC-04, PROPOSED/INTERNAL).
// Each territory is one construction system with a full and a reduced (small-size) build.
import {
  bandClipped,
  rectPts,
  pathData,
  arcBandPath,
  ringPath,
  radialTick,
  rectPts as R_,
  bbox,
  shiftPolys,
} from './geom.mjs';

const R = (x, y, w, h) => rectPts(x, y, w, h);

/* ---------------------------------------------------------------- Territory A — ISOBATH
 * Construction: four open depth contours that are deliberately NOT concentric — each
 * contour is struck from its own centre, offset along one slope line, so the group reads as
 * isobaths crossing a slope rather than as radiating signal arcs. Radial intervals are
 * unequal (3.5 / 4 / 4.5 of 24). Ends are cut radially; the innermost contour ends in a
 * measured datum that sits on the lockup baseline. A small filled sounding square borrows
 * chart-margin vocabulary without using official chart symbology.
 */
const A_CONTOURS = [
  { cx: 1.0, cy: 21.0, r: 19.5, w: 1.6, a0: -88, a1: -24 },
  { cx: 3.5, cy: 23.0, r: 15.5, w: 1.6, a0: -88, a1: -24 },
  { cx: 6.0, cy: 25.0, r: 12.0, w: 1.6, a0: -88, a1: -24 },
  { cx: 8.5, cy: 27.0, r: 8.5, w: 1.6, a0: -88, a1: -24 },
];

export const markA = () => {
  const parts = A_CONTOURS.map((c) => arcBandPath(c.cx, c.cy, c.r, c.w, c.a0, c.a1));
  const inner = A_CONTOURS[3];
  const a = (Math.PI * inner.a1) / 180;
  const endX = inner.cx + inner.r * Math.cos(a);
  const endY = inner.cy + inner.r * Math.sin(a);
  parts.push(pathData([R(endX - 0.4, endY - 1.2, 23.2 - endX + 0.4, 1.6)]));
  parts.push(pathData([R(13.6, 15.2, 1.4, 1.4)])); // sounding square in the contour gap
  return {
    id: 'A',
    name: 'ISOBATH',
    viewBox: [24, 24],
    parts,
    ink: { x0: 1.65, y0: 0.71, x1: 23.2, y1: 23.94 },
    baseline: 23.94,
    grid: 24,
    strokeOf24: 1.6,
    notes:
      '4 open contours, stroke 1.6/24, unequal radial intervals 3.5/4/4.5, non-concentric centres on one slope line, radial end cuts, datum on the baseline.',
  };
};

export const markACompact = () => {
  const cs = [
    { cx: 1.0, cy: 14.0, r: 12.6, w: 2.2, a0: -88, a1: -24 },
    { cx: 2.8, cy: 15.5, r: 9.6, w: 2.2, a0: -88, a1: -24 },
    { cx: 4.6, cy: 17.0, r: 6.8, w: 2.2, a0: -88, a1: -24 },
  ];
  const parts = cs.map((c) => arcBandPath(c.cx, c.cy, c.r, c.w, c.a0, c.a1));
  const inner = cs[2];
  const a = (Math.PI * inner.a1) / 180;
  const endX = inner.cx + inner.r * Math.cos(a);
  const endY = inner.cy + inner.r * Math.sin(a);
  parts.push(pathData([R(endX - 0.4, endY - 1.1, 15.4 - endX + 0.4, 2.2)]));
  return {
    id: 'A16',
    name: 'ISOBATH reduced',
    viewBox: [16, 16],
    parts,
    ink: { x0: 0.6, y0: 0.7, x1: 15.4, y1: 15.8 },
    baseline: 15.8,
    grid: 16,
    notes: '3 contours, stroke 2.2 on the 16 grid, datum retained, sounding square dropped.',
  };
};

/* ---------------------------------------------------------- Territory B — BEARING INDEX
 * Construction: a 270° calibrated arc open at the lower right (so it cannot close into a
 * seal/badge), one heavy radial bearing index at 0°, one square position datum at the
 * centre, two asymmetric radial ticks. No rose, no cardinal letters, no circle-dot dial.
 */
const B_CX = 16,
  B_CY = 16,
  B_R = 13,
  B_W = 2.5;

export const markB = () => {
  const parts = [arcBandPath(B_CX, B_CY, B_R, B_W, 90, 360)];
  parts.push(pathData([R(B_CX - 1.75, 1, 3.5, B_CY - 1)])); // bearing index, heavier
  parts.push(pathData([R(B_CX - 1.5, B_CY - 1.5, 3, 3)])); // square position datum
  parts.push(pathData([radialTick(B_CX, B_CY, 2, 11, 15.5, 205)]));
  parts.push(pathData([radialTick(B_CX, B_CY, 2, 12, 14, 315)]));
  const ro = B_R + B_W / 2;
  return {
    id: 'B',
    name: 'BEARING INDEX',
    viewBox: [32, 32],
    parts,
    ink: { x0: 1.53, y0: 1, x1: B_CX + ro, y1: B_CY + ro },
    baseline: B_CY + ro,
    grid: 32,
    strokeOf32: B_W,
    notes: '270° arc 2.5 thick r=13, index 3.5 wide, datum 3×3, ticks 4.5 and 2 long.',
  };
};

export const markBCompact = () => {
  const cx = 8,
    cy = 8,
    r = 6.6,
    w = 2;
  const parts = [arcBandPath(cx, cy, r, w, 90, 360)];
  parts.push(pathData([R(cx - 1.5, 0.8, 3, cy - 0.8)]));
  parts.push(pathData([R(cx - 1.25, cy - 1.25, 2.5, 2.5)]));
  parts.push(pathData([radialTick(cx, cy, 1.6, 5.4, 7.8, 210)]));
  const ro = r + w / 2;
  return {
    id: 'B16',
    name: 'BEARING INDEX reduced',
    viewBox: [16, 16],
    parts,
    ink: { x0: cx - ro, y0: 0.8, x1: cx + ro, y1: cy + ro },
    baseline: cy + ro,
    grid: 16,
    notes: 'arc 2 on the 16 grid, index + datum + one tick retained, second tick dropped.',
  };
};

/* ----------------------------------------------------------- Territory C — SIGNAL TRUNK
 * REVISION 5 = ART FREEZE (Lead instruction). v1–v4 added a hanging key, block masses and a
 * diagonal cable; each addition made the 16 px silhouette worse. This build removes all of
 * them and returns to the brief's construction hypothesis, nothing added: ONE bus rail at the
 * wordmark baseline, THREE terminal keys with squared caps, genuinely unequal widths and
 * unequal spacing, the centre key raised to the cap line, and one visible screw slot in the
 * centre key (it splits the head into two stubs). No hanging element, no diagonal, no bridge.
 * The symbol ink band is exactly 10 units tall (y 4..14) so the lockup scale is a flat ×10 and
 * the rail bottom lands on the wordmark baseline.
 */
export const markC = () => {
  const parts = [
    pathData([R(0, 12, 15.5, 2)]), // bus rail on the baseline (bottom = 14)
    pathData([R(1.5, 10, 2.5, 2)]), // left key, 2 units tall (unequal height 1)
    pathData([R(6.5, 4, 1.4, 8)]), // centre key left stub
    pathData([R(9.1, 4, 1.4, 8)]), // centre key right stub
    pathData([R(7.9, 5.8, 1.2, 6.2)]), // centre key bridge under the screw slot
    pathData([R(12, 6, 3, 6)]), // right key, 6 units tall (unequal height 2)
  ];
  return {
    id: 'C',
    name: 'SIGNAL TRUNK',
    viewBox: [24, 24],
    parts,
    ink: { x0: 0, y0: 4, x1: 15.5, y1: 14 },
    baseline: 14,
    grid: 24,
    strokeOf24: 2,
    notes:
      'rail 15.5 × 2 on the baseline; keys 2.5 / 4 / 3 wide at unequal gaps 2.5 and 1.5; heights 2 / 8 (raised to cap line) / 6; centre-key screw slot 1.2 × 1.8 splitting the head into two stubs; ink band 10 units tall (y 4..14).',
    translate: [4.25, 3],
  };
};

export const markCCompact = () => {
  const parts = [
    pathData([R(0, 8, 10, 1.8)]),
    pathData([R(1, 6.4, 1.7, 1.6)]),
    pathData([R(4.1, 2, 1, 5.6)]),
    pathData([R(5.9, 2, 1, 5.6)]),
    pathData([R(5.1, 3.4, 0.8, 4.2)]),
    pathData([R(7.8, 3.9, 2, 4.1)]),
  ];
  return {
    id: 'C16',
    name: 'SIGNAL TRUNK reduced',
    viewBox: [16, 16],
    parts,
    ink: { x0: 0, y0: 2, x1: 10, y1: 9.8 },
    baseline: 9.8,
    grid: 16,
    translate: [3, 2.1],
    notes:
      'own 16-unit coordinates (not a scaled copy): rail 1.8, keys 1.7 / 2.8 / 2 at unequal gaps, centre key raised to the cap line, screw slot 0.8 × 1.4 retained.',
  };
};

export const MARKS = { A: markA, B: markB, C: markC };
export const COMPACTS = { A: markACompact, B: markBCompact, C: markCCompact };
