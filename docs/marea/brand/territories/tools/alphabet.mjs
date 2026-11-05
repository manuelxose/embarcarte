// alphabet.mjs — original constructed letterforms for MAREA (MC-04, PROPOSED/INTERNAL).
// One construction system: rectilinear stems/arms (16/100 stem weight, 16-unit horizontal
// arms, square terminals) plus mathematically offset diagonal bands (band()) clipped to the
// cap band. No font is used, embedded or traced; every outline is generated from these rules.
import { bandClipped, rectPts, bbox, shiftPolys } from './geom.mjs';

export const CAP = 100;
export const STEM = 16;

const R = (x, y, w, h) => rectPts(x, y, w, h);

// Each glyph: { prims: polygons in a rough local space, join: horizontal advance padding }
// The leftmost ink is normalised to x=0 and the right sidebearing is defined by `gap`.
// Acute junctions are truncated to flat terminals (A apex, M valley, V bottom) — one
// documented engraving rule, not four different treatments.
export const GLYPHS = {
  M: {
    prims: [
      R(0, 0, STEM, CAP),
      R(66, 0, STEM, CAP),
      ...bandClipped(
        [
          [8, 0],
          [37, 94],
          [45, 94],
          [74, 0],
        ],
        STEM,
        0,
        CAP,
      ),
    ],
  },
  A: {
    prims: [
      ...bandClipped(
        [
          [8, CAP],
          [37, 0],
          [45, 0],
          [68, CAP],
        ],
        STEM,
        0,
        CAP,
      ),
      R(14, 58, 48, 16),
    ],
  },
  R: {
    prims: [
      R(0, 0, STEM, CAP),
      R(0, 0, 60, 16),
      R(44, 16, 16, 36),
      R(0, 52, 60, 16),
      [
        [44, 68],
        [60, 68],
        [68, 100],
        [52, 100],
      ],
    ],
  },
  E: { prims: [R(0, 0, STEM, CAP), R(0, 0, 64, 16), R(0, 42, 50, 16), R(0, 84, 64, 16)] },
  N: {
    prims: [
      R(0, 0, STEM, CAP),
      R(58, 0, STEM, CAP),
      ...bandClipped(
        [
          [8, 0],
          [66, CAP],
        ],
        STEM,
        0,
        CAP,
      ),
    ],
  },
  H: { prims: [R(0, 0, STEM, CAP), R(58, 0, STEM, CAP), R(0, 42, 74, 16)] },
  U: { prims: [R(0, 0, STEM, 84), R(0, 84, 68, 16), R(52, 0, STEM, 84)] },
  B: {
    prims: [
      R(0, 0, STEM, CAP),
      R(0, 0, 60, 16),
      R(44, 16, 16, 26),
      R(0, 42, 60, 16),
      R(44, 58, 16, 26),
      R(0, 84, 60, 16),
    ],
  },
  C: { prims: [R(0, 0, 56, 16), R(0, 0, STEM, CAP), R(0, 84, 56, 16)] },
  D: {
    prims: [R(0, 0, STEM, CAP), R(0, 0, 44, 16), R(44, 16, 16, 68), R(0, 84, 44, 16)],
  },
  F: { prims: [R(0, 0, STEM, CAP), R(0, 0, 56, 16), R(0, 42, 46, 16)] },
  I: { prims: [R(0, 0, STEM, CAP)] },
  L: { prims: [R(0, 0, STEM, CAP), R(0, 84, 48, 16)] },
  O: { prims: [R(0, 0, 60, 16), R(0, 0, STEM, CAP), R(44, 0, STEM, CAP), R(0, 84, 60, 16)] },
  P: {
    prims: [R(0, 0, STEM, CAP), R(0, 0, 52, 16), R(36, 16, 16, 36), R(0, 36, 52, 16)],
  },
  S: {
    prims: [
      R(8, 0, 50, 16),
      R(0, 0, STEM, 42),
      R(0, 42, 58, 16),
      R(42, 42, 16, 58),
      R(0, 84, 50, 16),
    ],
  },
  T: { prims: [R(0, 0, 64, 16), R(24, 0, STEM, CAP)] },
  V: {
    prims: [
      ...bandClipped(
        [
          [8, 0],
          [37, 100],
          [45, 100],
          [68, 0],
        ],
        STEM,
        0,
        CAP,
      ),
    ],
  },
  W: {
    prims: [
      ...bandClipped(
        [
          [8.2, 0],
          [30, CAP],
          [52, 8],
          [74, CAP],
          [95.8, 0],
        ],
        STEM,
        0,
        CAP,
      ),
    ],
  },
  Y: {
    prims: [
      ...bandClipped(
        [
          [8, 0],
          [38, 52],
        ],
        STEM,
        0,
        CAP,
      ),
      ...bandClipped(
        [
          [68, 0],
          [38, 52],
        ],
        STEM,
        0,
        CAP,
      ),
      R(30, 44, STEM, 56),
    ],
  },
};

// Optical sidebearings, in 1/100-cap units, added to the base inter-letter gap.
// Diagonal letters open white space and need tighter neighbours; straight-sided
// letters keep the base gap. I is tightened on both sides so it reads as a letter.
// Optical sidebearings, in 1/100-cap units, added to the base inter-letter gap.
// Model: gap(a,b) = BASE_GAP + r(a) + l(b), where a straight vertical edge is 0.
// Diagonal edges recede, so they get a NEGATIVE correction (tighter); a protruding
// diagonal leg (R) also gets a negative right correction so the leg does not open a hole.
// I is tightened on both sides so a bare stem reads as a letter, not a separator.
export const SIDEBEARING = {
  A: { l: -4, r: -4 },
  V: { l: -3, r: -3 },
  W: { l: -2, r: -2 },
  M: { l: 0, r: 0 },
  N: { l: -1, r: 0 },
  R: { l: 0, r: -2 },
  I: { l: -5, r: -5 },
  L: { l: 0, r: -1 },
  T: { l: -1, r: -1 },
  Y: { l: -2, r: -2 },
};
export const BASE_GAP = 20;

/** Normalised glyph: polygons with left ink at x=0, plus ink width. */
export const glyph = (name) => {
  const def = GLYPHS[name];
  if (!def) throw new Error(`unknown glyph ${name}`);
  const b = bbox(def.prims);
  const prims = shiftPolys(def.prims, -b.x0, -b.y0);
  return { name, prims, width: b.w };
};

/**
 * Lay out a string. Returns outlined polygons in the common ink space and the total ink width.
 * `scale` scales BOTH the glyph outlines and the advances, so a family token at 0.70 cap is
 * proportionally identical to the master — same construction, one rule, no separate spacing.
 */
export const layout = (text, { scale = 1, tracking = BASE_GAP } = {}) => {
  const glyphs = [...text].map(glyph);
  const out = [];
  let x = 0;
  let prev = null;
  const scaled = (prims) =>
    scale === 1 ? prims : prims.map((p) => p.map(([px, py]) => [px * scale, py * scale]));
  for (const g of glyphs) {
    if (prev) {
      const adj = (SIDEBEARING[prev.name]?.r || 0) + (SIDEBEARING[g.name]?.l || 0);
      x += (tracking + adj) * scale;
    }
    out.push(...shiftPolys(scaled(g.prims), x, 0));
    x += g.width * scale;
    prev = g;
  }
  return { polys: out, width: x, glyphs };
};

/** Wordmark: MAREA, uppercase master (PROPOSED). Tight, optically spaced, outlined. */
export const WORDMARK = 'MAREA';
