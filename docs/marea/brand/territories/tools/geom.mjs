// geom.mjs — original geometry toolkit for the MAREA identity prototypes (MC-04).
// Authored for this programme. No third-party artwork, no font outlines, no tracing.
// Conventions: SVG user units, y grows downwards; 1 design unit = 1/100 cap height for lettering.

export const round2 = (n) => {
  const v = Math.round(n * 100) / 100;
  return Object.is(v, -0) ? 0 : v;
};
export const f = (n) => String(round2(n));

const signedArea = (pts) => {
  let a = 0;
  for (let i = 0; i < pts.length; i++) {
    const [x1, y1] = pts[i],
      [x2, y2] = pts[(i + 1) % pts.length];
    a += x1 * y2 - x2 * y1;
  }
  return a / 2;
};
/** Same winding everywhere so overlapping filled subpaths never punch holes. */
export const oriented = (pts) => (signedArea(pts) < 0 ? pts.slice().reverse() : pts);

/** Closed polygon path from a list of [x,y] points. */
export const poly = (pts) =>
  'M' +
  oriented(pts)
    .map((p) => `${f(p[0])} ${f(p[1])}`)
    .join(' L') +
  'Z';

export const rectPts = (x, y, w, h) => [
  [x, y],
  [x + w, y],
  [x + w, y + h],
  [x, y + h],
];

export const bbox = (polys) => {
  let x0 = Infinity,
    y0 = Infinity,
    x1 = -Infinity,
    y1 = -Infinity;
  for (const p of polys)
    for (const [x, y] of p) {
      x0 = Math.min(x0, x);
      y0 = Math.min(y0, y);
      x1 = Math.max(x1, x);
      y1 = Math.max(y1, y);
    }
  return { x0, y0, x1, y1, w: x1 - x0, h: y1 - y0 };
};

const lineIntersect = (a1, a2, b1, b2) => {
  const r = [a2[0] - a1[0], a2[1] - a1[1]];
  const s = [b2[0] - b1[0], b2[1] - b1[1]];
  const den = r[0] * s[1] - r[1] * s[0];
  if (Math.abs(den) < 1e-9) return null;
  const t = ((b1[0] - a1[0]) * s[1] - (b1[1] - a1[1]) * s[0]) / den;
  return [a1[0] + t * r[0], a1[1] + t * r[1]];
};

/**
 * Offset a polyline into a closed band polygon ("stroke to outline").
 * Constant perpendicular width, mitered joins, butt ends. Concave joins fall back
 * to a bevel when the miter exceeds `miterLimit` half-widths.
 */
export const band = (pts, width, { miterLimit = 12 } = {}) => {
  const half = width / 2;
  const segs = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[i + 1];
    const len = Math.hypot(x2 - x1, y2 - y1);
    if (len < 1e-9) continue;
    segs.push({ x1, y1, x2, y2, nx: -(y2 - y1) / len, ny: (x2 - x1) / len });
  }
  if (!segs.length) throw new Error('band(): degenerate polyline');
  const side = (sign) =>
    segs.map((s) => ({
      a: [s.x1 + sign * s.nx * half, s.y1 + sign * s.ny * half],
      b: [s.x2 + sign * s.nx * half, s.y2 + sign * s.ny * half],
    }));
  const walk = (lines) => {
    const out = [lines[0].a];
    for (let i = 1; i < lines.length; i++) {
      const A = lines[i - 1],
        B = lines[i];
      const p = lineIntersect(A.a, A.b, B.a, B.b);
      const v = [segs[i].x1, segs[i].y1];
      if (p && Math.hypot(p[0] - v[0], p[1] - v[1]) <= miterLimit * half) out.push(p);
      else out.push(A.b, B.a);
    }
    out.push(lines[lines.length - 1].b);
    return out;
  };
  const left = walk(side(1));
  const right = walk(side(-1)).reverse();
  return [left.concat(right)];
};

/** Sutherland–Hodgman clip of a polygon against ymin..ymax. */
export const clipY = (pts, ymin, ymax) => {
  const clip = (polygon, inside, intersect) => {
    const out = [];
    for (let i = 0; i < polygon.length; i++) {
      const cur = polygon[i],
        prev = polygon[(i + polygon.length - 1) % polygon.length];
      const curIn = inside(cur),
        prevIn = inside(prev);
      if (curIn) {
        if (!prevIn) out.push(intersect(prev, cur));
        out.push(cur);
      } else if (prevIn) out.push(intersect(prev, cur));
    }
    return out;
  };
  const at = (a, b, y) => {
    const t = (y - a[1]) / (b[1] - a[1]);
    return [a[0] + t * (b[0] - a[0]), y];
  };
  let p = clip(
    pts,
    (q) => q[1] >= ymin,
    (a, b) => at(a, b, ymin),
  );
  if (p.length)
    p = clip(
      p,
      (q) => q[1] <= ymax,
      (a, b) => at(a, b, ymax),
    );
  return p;
};
export const bandClipped = (pts, width, ymin, ymax, opts) =>
  band(pts, width, opts)
    .map((p) => clipY(p, ymin, ymax))
    .filter((p) => p.length > 2);

/** Point on a circle; angle in degrees, 0 = +x, positive = clockwise on screen. */
export const arcPt = (cx, cy, r, deg) => {
  const a = (deg * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
};

/** Arc band (open, butt ends) as SVG path segment string. */
export const arcBandPath = (cx, cy, r, w, a0, a1) => {
  const ro = r + w / 2,
    ri = r - w / 2;
  const large = Math.abs(a1 - a0) > 180 ? 1 : 0;
  const sweep = a1 > a0 ? 1 : 0;
  const o0 = arcPt(cx, cy, ro, a0),
    o1 = arcPt(cx, cy, ro, a1);
  const i0 = arcPt(cx, cy, ri, a0),
    i1 = arcPt(cx, cy, ri, a1);
  return (
    `M${f(o0[0])} ${f(o0[1])}` +
    `A${f(ro)} ${f(ro)} 0 ${large} ${sweep} ${f(o1[0])} ${f(o1[1])}` +
    `L${f(i1[0])} ${f(i1[1])}` +
    `A${f(ri)} ${f(ri)} 0 ${large} ${1 - sweep} ${f(i0[0])} ${f(i0[1])}Z`
  );
};

/** Full annulus as one closed path (outer CW, inner CCW, radial seam). */
export const ringPath = (cx, cy, r, w, a0 = -90) => {
  const ro = r + w / 2,
    ri = r - w / 2;
  const o0 = arcPt(cx, cy, ro, a0),
    oMid = arcPt(cx, cy, ro, a0 + 180);
  const i0 = arcPt(cx, cy, ri, a0),
    iMid = arcPt(cx, cy, ri, a0 + 180);
  return (
    `M${f(o0[0])} ${f(o0[1])}` +
    `A${f(ro)} ${f(ro)} 0 1 1 ${f(oMid[0])} ${f(oMid[1])}` +
    `A${f(ro)} ${f(ro)} 0 1 1 ${f(o0[0])} ${f(o0[1])}` +
    `L${f(i0[0])} ${f(i0[1])}` +
    `A${f(ri)} ${f(ri)} 0 1 0 ${f(iMid[0])} ${f(iMid[1])}` +
    `A${f(ri)} ${f(ri)} 0 1 0 ${f(i0[0])} ${f(i0[1])}Z`
  );
};

/** Cylindrical-lens shaped 4-point quad along a radial direction (for instrument ticks). */
export const radialTick = (cx, cy, w, r0, r1, deg) => {
  const a = (deg * Math.PI) / 180;
  const dir = [Math.cos(a), Math.sin(a)];
  const nor = [-dir[1], dir[0]];
  const p = (r, s) => [cx + dir[0] * r + nor[0] * s, cy + dir[1] * r + nor[1] * s];
  return [p(r0, -w / 2), p(r1, -w / 2), p(r1, w / 2), p(r0, w / 2)];
};

/** Path data from a mixed list of polygon point arrays and path-segment strings. */
export const pathData = (parts) => parts.map((p) => (typeof p === 'string' ? p : poly(p))).join('');

export const shiftPolys = (polys, dx, dy) => polys.map((p) => p.map(([x, y]) => [x + dx, y + dy]));
