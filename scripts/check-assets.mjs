#!/usr/bin/env node
/**
 * MAREA MC-04 — deterministic asset validator (no new dependencies).
 *
 * WHAT IT CHECKS
 *   1. Every real file under docs/marea/brand/assets/** has exactly one record in
 *      docs/marea/assets/manifest/MC-04-ASSETS.yaml, and every manifest record
 *      points at a real file.
 *   2. SHA-256, byte size, format (magic bytes) and declared width/height match the
 *      bytes on disk for every record.
 *   3. Byte budgets from MC-04-VISUAL-IDENTITY-BRIEF.md §10.5 / ASSET-PIPELINE.md
 *      §8.3: lockup SVG ≤ 20 kB, mark/icon SVG ≤ 8 kB, OG card ≤ 120 kB, app icon
 *      ≤ 45 kB, favicon ≤ 20 kB.
 *   4. ES/EN alt text where required; legal status vocabulary (no
 *      APPROVED_FOR_USE / CLEARED / CERTIFIED); no ® / ™ in any asset; SVG/HTML
 *      hygiene (no script, no external refs, no embedded raster, unique ids).
 *   5. Logo SVG ink bounds: the real ink bbox must be declared by the viewBox and
 *      must not be clipped. Uses the already-installed Playwright Chromium (no new
 *      dependency) for the geometric measurement; if it is unavailable the audit is
 *      recorded as SKIPPED, never silently passed.
 *   6. docs/marea/assets/manifest/MC-04-BRIEFS.yaml (owned by Governance) keeps
 *      provider NONE_YET, files [], status BLOCKED_ON_IMAGE_GENERATION for every
 *      image-generation brief, and never points at a produced file.
 *
 * USAGE
 *   node scripts/check-assets.mjs
 *   node scripts/check-assets.mjs --manifest <path> --briefs <path> --assets <dir>
 *
 * EXIT CODE
 *   0 = every check PASS (warnings may be present), 1 = at least one FAIL.
 *
 * The validator is deterministic: same bytes in, same verdict out. It does not
 * write any file and does not modify the assets it inspects.
 */

import { existsSync } from 'node:fs';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DEFAULTS = {
  manifest: 'docs/marea/assets/manifest/MC-04-ASSETS.yaml',
  briefs: 'docs/marea/assets/manifest/MC-04-BRIEFS.yaml',
  assets: 'docs/marea/brand/assets',
};

const abs = (p) => path.resolve(ROOT, p);
const toRel = (p) => path.relative(ROOT, p).split(path.sep).join('/');
const sha256 = (buf) => crypto.createHash('sha256').update(buf).digest('hex');
const fmtInt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

const RESULTS = [];
const pass = (id, detail) => RESULTS.push({ id, status: 'PASS', detail });
const fail = (id, detail) => RESULTS.push({ id, status: 'FAIL', detail });
const warn = (id, detail) => RESULTS.push({ id, status: 'WARN', detail });
const info = (detail) => RESULTS.push({ id: 'info', status: 'INFO', detail });

const FORBIDDEN_STATUS_TOKENS = ['APPROVED_FOR_USE', 'CLEARED', 'CERTIFIED'];
const LEGAL_STATUSES = new Set([
  'PRODUCED',
  'INTERNALLY_REVIEWED',
  'PREFERRED_PROVISIONAL',
  'LEGAL_REVIEW_PENDING',
  'PUBLICATION_BLOCKED',
  'BLOCKED_ON_IMAGE_GENERATION',
  'BRIEF_APPROVED',
  'NOT_APPLICABLE',
  'PRODUCIBLE_WITHOUT_GENERATION',
]);
const CATEGORIES = new Set([
  'brand',
  'corporate',
  'ecosystem',
  'product-family',
  'product-detail',
  'bundle',
  'install-scenario',
  'professional',
  'diagram',
  'campaign',
]);
const CLASSIFICATIONS = new Set(['CONCEPT', 'REAL_PRODUCT', 'DIAGRAM', 'BRAND']);
const LEGAL_RESTRICTIONS = new Set(['INTERNAL_PROPOSED', 'PUBLICATION_BLOCKED']);

// ---------------------------------------------------------------------------
// Minimal YAML subset parser (mappings, lists, block scalars, quoted strings,
// flow [] / {}, booleans, numbers, null, comments). Sufficient for the two MC-04
// manifests; deliberately small and deterministic.
// ---------------------------------------------------------------------------

function parseYaml(text) {
  const lines = text
    .replace(/^\uFEFF/, '')
    .replace(/\r\n?/g, '\n')
    .split('\n');
  let i = 0;

  const isIgnorable = (line) => {
    const t = line.trim();
    return t === '' || t === '---' || t === '...' || t.startsWith('#');
  };
  const indentOf = (line) => line.length - line.trimStart().length;
  function skipIgnorable() {
    while (i < lines.length && isIgnorable(lines[i])) i += 1;
  }
  function findColon(text) {
    let quote = null;
    for (let p = 0; p < text.length; p += 1) {
      const ch = text[p];
      if (quote) {
        if (ch === '\\' && quote === '"') {
          p += 1;
          continue;
        }
        if (ch === quote) quote = null;
        continue;
      }
      if (ch === '"' || ch === "'") {
        quote = ch;
        continue;
      }
      if (ch === ':' && (p + 1 === text.length || text[p + 1] === ' ')) return p;
    }
    return -1;
  }
  function unquote(text) {
    const t = text.trim();
    if (t.startsWith("'") && t.endsWith("'") && t.length >= 2) {
      return t.slice(1, -1).replace(/''/g, "'");
    }
    if (t.startsWith('"') && t.endsWith('"') && t.length >= 2) {
      const inner = t.slice(1, -1);
      return inner.replace(/\\(["\\/nrt])/g, (m, c) =>
        c === 'n' ? '\n' : c === 'r' ? '\r' : c === 't' ? '\t' : c,
      );
    }
    return t;
  }
  function stripInlineComment(text) {
    let quote = null;
    for (let p = 0; p < text.length; p += 1) {
      const ch = text[p];
      if (quote) {
        if (ch === '\\' && quote === '"') p += 1;
        else if (ch === quote) quote = null;
        continue;
      }
      if (ch === '"' || ch === "'") quote = ch;
      else if (ch === '#' && p > 0 && /\s/.test(text[p - 1])) return text.slice(0, p).trim();
    }
    return text.trim();
  }
  function parseFlowList(text) {
    const inner = text.trim().slice(1, -1).trim();
    if (!inner) return [];
    const parts = [];
    let quote = null;
    let cur = '';
    for (let p = 0; p < inner.length; p += 1) {
      const ch = inner[p];
      if (quote) {
        cur += ch;
        if (ch === '\\' && quote === '"') {
          cur += inner[p + 1] ?? '';
          p += 1;
        } else if (ch === quote) quote = null;
        continue;
      }
      if (ch === '"' || ch === "'") {
        quote = ch;
        cur += ch;
        continue;
      }
      if (ch === ',') {
        parts.push(cur);
        cur = '';
        continue;
      }
      cur += ch;
    }
    parts.push(cur);
    return parts.map((p) => parseScalar(p.trim()));
  }
  function parseScalar(raw) {
    const text = stripInlineComment(raw);
    if (text === '' || text === '~' || text === 'null' || text === 'Null' || text === 'NULL')
      return null;
    if (text === 'true' || text === 'True' || text === 'TRUE') return true;
    if (text === 'false' || text === 'False' || text === 'FALSE') return false;
    if (text.startsWith('[') && text.endsWith(']')) return parseFlowList(text);
    if (text.startsWith('{') && text.endsWith('}')) {
      const inner = text.slice(1, -1).trim();
      if (!inner) return {};
      const obj = {};
      for (const part of parseFlowList(`[${inner}]`)) {
        if (typeof part === 'string') {
          const c = findColon(part);
          if (c > 0) obj[unquote(part.slice(0, c))] = parseScalar(part.slice(c + 1));
        }
      }
      return obj;
    }
    if (/^-?\d+$/.test(text)) return Number(text);
    if (/^-?\d+\.\d+$/.test(text)) return Number(text);
    return unquote(text);
  }
  function parseBlockScalar(marker, parentIndent) {
    const gathered = [];
    let blockIndent = null;
    while (i < lines.length) {
      const line = lines[i];
      if (line.trim() === '') {
        gathered.push('');
        i += 1;
        continue;
      }
      const ind = indentOf(line);
      if (ind <= parentIndent) break;
      if (blockIndent === null) blockIndent = ind;
      if (ind < blockIndent) break;
      gathered.push(line.slice(blockIndent));
      i += 1;
    }
    while (gathered.length && gathered[gathered.length - 1] === '') gathered.pop();
    let out;
    if (marker.startsWith('|')) {
      out = gathered.join('\n');
    } else {
      const parts = [];
      let para = [];
      for (const line of gathered) {
        if (line === '') {
          if (para.length) parts.push(para.join(' '));
          para = [];
          parts.push('');
        } else para.push(line);
      }
      if (para.length) parts.push(para.join(' '));
      out = parts.join('\n');
    }
    if (marker.endsWith('+')) out += '\n';
    else if (!marker.endsWith('-')) out += '\n';
    return out;
  }
  function parseValue(rest, indent) {
    if (rest === '') {
      skipIgnorable();
      if (i < lines.length && indentOf(lines[i]) > indent) return parseBlock(indentOf(lines[i]));
      return null;
    }
    if (/^[|>][-+]?[1-9]?$/.test(rest)) return parseBlockScalar(rest, indent);
    return parseScalar(rest);
  }
  function parseBlock(indent) {
    skipIgnorable();
    if (i >= lines.length) return null;
    const line = lines[i];
    const t = line.trim();
    if (t === '-' || t.startsWith('- ')) return parseList(indent);
    return parseMap(indent, null);
  }
  function parseList(indent) {
    const arr = [];
    while (true) {
      skipIgnorable();
      if (i >= lines.length) break;
      const line = lines[i];
      const ind = indentOf(line);
      if (ind !== indent) {
        if (ind < indent) break;
        // tolerate a plain-scalar continuation of the previous list item
        const t = line.trim();
        if (typeof arr[arr.length - 1] === 'string') {
          arr[arr.length - 1] += ` ${t}`;
          i += 1;
          continue;
        }
        throw new Error(`YAML: unexpected indentation at line ${i + 1}: "${t}"`);
      }
      const t = line.trim();
      if (t !== '-' && !t.startsWith('- ')) break;
      const rest = t === '-' ? '' : t.slice(2).trim();
      i += 1;
      if (rest === '') {
        skipIgnorable();
        if (i < lines.length && indentOf(lines[i]) > indent)
          arr.push(parseBlock(indentOf(lines[i])));
        else arr.push(null);
      } else if (findColon(rest) >= 0) {
        arr.push(parseMap(indent + 2, rest));
      } else {
        arr.push(parseScalar(rest));
      }
    }
    return arr;
  }
  function parseMap(indent, seed) {
    const obj = {};
    const assign = (text) => {
      const colon = findColon(text);
      if (colon < 0) throw new Error(`YAML: missing ':' near "${text}"`);
      const key = unquote(text.slice(0, colon).trim());
      const rest = text.slice(colon + 1).trim();
      obj[key] = parseValue(rest, indent);
    };
    if (seed != null) assign(seed);
    while (true) {
      skipIgnorable();
      if (i >= lines.length) break;
      const line = lines[i];
      const ind = indentOf(line);
      if (ind < indent) break;
      const t = line.trim();
      if (ind > indent) {
        // tolerate a plain-scalar continuation of the previous value
        const keys = Object.keys(obj);
        const last = keys[keys.length - 1];
        if (last && typeof obj[last] === 'string') {
          obj[last] += ` ${t}`;
          i += 1;
          continue;
        }
        throw new Error(`YAML: bad indentation at line ${i + 1}: "${t}"`);
      }
      if (t === '-' || t.startsWith('- ')) break;
      if (findColon(t) < 0) {
        i += 1;
        continue;
      }
      i += 1;
      assign(t);
    }
    return obj;
  }

  skipIgnorable();
  if (i >= lines.length) return null;
  return parseBlock(indentOf(lines[i]));
}

// ---------------------------------------------------------------------------
// file probing (format + dimensions read from real bytes)
// ---------------------------------------------------------------------------

function probePng(buf) {
  if (buf.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a') return null;
  return { format: 'png', width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}
function probeJpeg(buf) {
  if (buf[0] !== 0xff || buf[1] !== 0xd8) return null;
  let i = 2;
  while (i < buf.length - 9) {
    if (buf[i] !== 0xff) {
      i += 1;
      continue;
    }
    const marker = buf[i + 1];
    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      i += 2;
      continue;
    }
    const len = buf.readUInt16BE(i + 2);
    const isSof = marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker);
    if (isSof)
      return { format: 'jpeg', height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
    i += 2 + len;
  }
  return null;
}
function probeWebp(buf) {
  if (buf.subarray(0, 4).toString('ascii') !== 'RIFF') return null;
  if (buf.subarray(8, 12).toString('ascii') !== 'WEBP') return null;
  const fourcc = buf.subarray(12, 16).toString('ascii');
  if (fourcc === 'VP8X') {
    return { format: 'webp', width: 1 + buf.readUIntLE(24, 3), height: 1 + buf.readUIntLE(27, 3) };
  }
  if (fourcc === 'VP8L') {
    const b = buf.readUInt32LE(21);
    return { format: 'webp', width: (b & 0x3fff) + 1, height: ((b >> 14) & 0x3fff) + 1 };
  }
  if (fourcc === 'VP8 ') {
    const p = 23;
    if (buf[p] !== 0x9d || buf[p + 1] !== 0x01 || buf[p + 2] !== 0x2a) return null;
    return {
      format: 'webp',
      width: buf.readUInt16LE(p + 3) & 0x3fff,
      height: buf.readUInt16LE(p + 5) & 0x3fff,
    };
  }
  return null;
}
function probeAvif(buf) {
  if (buf.length < 12 || buf.subarray(4, 8).toString('ascii') !== 'ftyp') return null;
  const brands = buf.subarray(8, Math.min(buf.length, 40)).toString('ascii');
  if (!brands.includes('avif') && !brands.includes('avis')) return null;
  const p = buf.indexOf(Buffer.from('ispe', 'ascii'));
  return {
    format: 'avif',
    width: p > 0 ? buf.readUInt32BE(p + 8) : null,
    height: p > 0 ? buf.readUInt32BE(p + 12) : null,
  };
}
function probeIco(buf) {
  if (buf.length < 6 || buf.readUInt16LE(0) !== 0 || buf.readUInt16LE(2) !== 1) return null;
  const count = buf.readUInt16LE(4);
  const sizes = [];
  for (let i = 0; i < count; i += 1) {
    const b = 6 + i * 16;
    if (b + 16 > buf.length) return null;
    sizes.push({
      width: buf.readUInt8(b) === 0 ? 256 : buf.readUInt8(b),
      height: buf.readUInt8(b + 1) === 0 ? 256 : buf.readUInt8(b + 1),
    });
  }
  const largest = sizes.reduce((a, b) => (a.width >= b.width ? a : b), sizes[0]);
  return { format: 'ico', width: largest.width, height: largest.height, sizes };
}
function probePdf(buf) {
  if (buf.subarray(0, 5).toString('ascii') !== '%PDF-') return null;
  const text = buf.toString('latin1');
  const box = /\/MediaBox\s*\[\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\]/.exec(text);
  return {
    format: 'pdf',
    width: box ? Math.round(Number(box[3]) - Number(box[1])) : null,
    height: box ? Math.round(Number(box[4]) - Number(box[2])) : null,
  };
}
function parseViewBox(text) {
  const m = /viewBox\s*=\s*"([^"]+)"/.exec(text);
  if (!m) return null;
  const parts = m[1]
    .trim()
    .split(/[\s,]+/)
    .map(Number);
  if (parts.length !== 4 || parts.some((n) => !Number.isFinite(n))) return null;
  return { x: parts[0], y: parts[1], width: parts[2], height: parts[3] };
}
function probeSvg(buf) {
  const text = buf.toString('utf8');
  if (!/<svg[\s>]/.test(text)) return null;
  const vb = parseViewBox(text);
  return { format: 'svg', width: vb ? vb.width : null, height: vb ? vb.height : null, viewBox: vb };
}
function probeHtml(buf) {
  if (!/<(!doctype|html)[\s>]/i.test(buf.subarray(0, 4096).toString('utf8'))) return null;
  return { format: 'html', width: null, height: null };
}
function probeBytes(buf) {
  return (
    probePng(buf) ||
    probeJpeg(buf) ||
    probeWebp(buf) ||
    probeAvif(buf) ||
    probeIco(buf) ||
    probePdf(buf)
  );
}

const EXT_FORMAT = {
  '.svg': 'svg',
  '.png': 'png',
  '.jpg': 'jpeg',
  '.jpeg': 'jpeg',
  '.webp': 'webp',
  '.avif': 'avif',
  '.ico': 'ico',
  '.pdf': 'pdf',
  '.html': 'html',
  '.htm': 'html',
};

async function probeFile(relPath) {
  const buf = await readFile(abs(relPath));
  const extFormat = EXT_FORMAT[path.extname(relPath).toLowerCase()] || null;
  let probe = probeBytes(buf);
  if (!probe && extFormat === 'svg') probe = probeSvg(buf);
  if (!probe && extFormat === 'html') probe = probeHtml(buf);
  return {
    bytes: buf.length,
    sha256: sha256(buf),
    extFormat,
    ...(probe || { format: null, width: null, height: null }),
    buffer: buf,
  };
}

// ---------------------------------------------------------------------------
// asset tree walk
// ---------------------------------------------------------------------------

async function walkAssets(dirRel, acc = []) {
  const dir = abs(dirRel);
  if (!existsSync(dir)) return acc;
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const childRel = `${dirRel}/${entry.name}`;
    if (entry.isDirectory()) await walkAssets(childRel, acc);
    else acc.push(toRel(abs(childRel)));
  }
  return acc;
}

// ---------------------------------------------------------------------------
// budgets
// ---------------------------------------------------------------------------

function byteBudget(relPath) {
  const p = `/${relPath.replace(/\\/g, '/')}`;
  if (/\/social\/og-marea-[a-z]{2}-1200x630\.jpe?g$/.test(p))
    return { limit: 120000, label: 'OG card ≤ 120 kB' };
  if (/\/icons\/marea-app-icon-1024\.png$/.test(p))
    return { limit: 45000, label: 'app icon ≤ 45 kB' };
  if (/\/icons\/marea-icon-(512|192)\.png$/.test(p))
    return { limit: 45000, label: 'app icon ≤ 45 kB' };
  if (/\/icons\/marea-apple-touch-180\.png$/.test(p))
    return { limit: 45000, label: 'app icon ≤ 45 kB' };
  if (/\/icons\/favicon\.svg$/.test(p)) return { limit: 20000, label: 'favicon ≤ 20 kB' };
  if (/\/icons\/favicon\.ico$/.test(p)) return { limit: 20000, label: 'favicon ≤ 20 kB' };
  if (/\/icons\/app\/marea-icon-(16|32|48)\.png$/.test(p))
    return { limit: 20000, label: 'favicon ≤ 20 kB' };
  if (/\/icons\/(ui|app)\/[^/]+\.svg$/.test(p)) return { limit: 8000, label: 'icon mark ≤ 8 kB' };
  if (/\/logo\/.*(mark|reduced|construction)[^/]*\.svg$/.test(p))
    return { limit: 8000, label: 'mark ≤ 8 kB' };
  if (/\/logo\/(marea-(lockup|wordmark)[^/]*\.svg|family\/[^/]+\.svg)$/.test(p)) {
    return { limit: 20000, label: 'lockup ≤ 20 kB' };
  }
  return null;
}

// ---------------------------------------------------------------------------
// ink-bounds audit for logo SVGs (Playwright Chromium, already installed)
// ---------------------------------------------------------------------------

async function auditSvgInk(paths) {
  let chromium;
  try {
    ({ chromium } = await import('playwright'));
  } catch {
    warn('svg-ink-bounds', 'SKIPPED — Playwright is not available; ink clipping was not measured');
    return;
  }
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
  } catch (err) {
    warn(
      'svg-ink-bounds',
      `SKIPPED — Chromium could not launch (${err.message}); ink clipping was not measured`,
    );
    return;
  }
  const page = await browser.newPage({ viewport: { width: 900, height: 900 } });
  try {
    for (const relPath of paths) {
      const text = await readFile(abs(relPath), 'utf8');
      const vb = parseViewBox(text);
      if (!vb) {
        fail('svg-ink-bounds', `${relPath}: no viewBox, cannot declare ink bounds`);
        continue;
      }
      const open = /<svg\b[^>]*>/i.exec(text);
      const close = text.lastIndexOf('</svg>');
      const inner = open && close > 0 ? text.slice(open.index + open[0].length, close) : '';
      const cleaned = inner
        .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, '')
        .replace(/<desc\b[^>]*>[\s\S]*?<\/desc>/gi, '')
        .replace(/<\?xml[\s\S]*?\?>/gi, '');
      await page.setContent(
        `<!doctype html><html><body style="margin:0"><svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.x} ${vb.y} ${vb.width} ${vb.height}" width="800" height="800"><g id="ink">${cleaned}</g></svg></body></html>`,
      );
      const bbox = await page.evaluate(() => {
        const b = document.getElementById('ink').getBBox();
        return { x: b.x, y: b.y, width: b.width, height: b.height };
      });
      if (!bbox || !Number.isFinite(bbox.width) || bbox.width <= 0) {
        fail('svg-ink-bounds', `${relPath}: ink bbox is empty or not measurable`);
        continue;
      }
      const eps = 0.05;
      const clipped =
        bbox.x < vb.x - eps ||
        bbox.y < vb.y - eps ||
        bbox.x + bbox.width > vb.x + vb.width + eps ||
        bbox.y + bbox.height > vb.y + vb.height + eps;
      const detail = `${relPath}: ink [${bbox.x.toFixed(2)}, ${bbox.y.toFixed(2)}, ${bbox.width.toFixed(2)} × ${bbox.height.toFixed(2)}] viewBox [${vb.x}, ${vb.y}, ${vb.width} × ${vb.height}]`;
      const isConstructionGuide = /construction/.test(relPath);
      if (clipped && isConstructionGuide) {
        warn(
          'svg-ink-bounds',
          `${detail} — working construction file; ink extends beyond its viewBox and is clipped if rendered 1:1`,
        );
      } else if (clipped) {
        fail('svg-ink-bounds', `${detail} — INK IS CLIPPED BY THE VIEWBOX`);
      } else {
        info(detail);
      }
    }
    if (!RESULTS.some((r) => r.id === 'svg-ink-bounds' && r.status === 'FAIL')) {
      pass(
        'svg-ink-bounds',
        `ink bbox measured for ${paths.length} logo SVG(s); no ink is clipped by its viewBox`,
      );
    }
  } finally {
    await page.close().catch(() => {});
    await browser.close().catch(() => {});
  }
}

// ---------------------------------------------------------------------------
// main validation
// ---------------------------------------------------------------------------

function validateEntry(entry, seenIds, seenSlugs) {
  const label = entry && entry.id ? entry.id : '(entry without id)';
  if (!entry || typeof entry !== 'object') {
    fail('manifest-entry', 'manifest contains a non-object asset entry');
    return false;
  }
  let ok = true;
  if (!/^MR-[A-Z]{3}-\d{3}$/.test(String(entry.id || ''))) {
    fail('manifest-entry-id', `${label}: id must match MR-XXX-NNN`);
    ok = false;
  } else if (seenIds.has(entry.id)) {
    fail('manifest-entry-id', `${label}: duplicate id`);
    ok = false;
  } else seenIds.add(entry.id);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(entry.slug || ''))) {
    fail('manifest-entry-slug', `${label}: slug must be unique kebab-case`);
    ok = false;
  } else if (seenSlugs.has(entry.slug)) {
    fail('manifest-entry-slug', `${label}: duplicate slug ${entry.slug}`);
    ok = false;
  } else seenSlugs.add(entry.slug);
  if (!CATEGORIES.has(entry.category)) {
    fail('manifest-entry-category', `${label}: illegal category "${entry.category}"`);
    ok = false;
  }
  if (!CLASSIFICATIONS.has(entry.classification)) {
    fail(
      'manifest-entry-classification',
      `${label}: illegal classification "${entry.classification}"`,
    );
    ok = false;
  }
  if (!LEGAL_STATUSES.has(entry.status)) {
    fail('manifest-entry-status', `${label}: illegal status "${entry.status}"`);
    ok = false;
  }
  if (typeof entry.purpose !== 'string' || entry.purpose.trim().length < 10) {
    fail('manifest-entry-purpose', `${label}: purpose must be a sentence`);
    ok = false;
  }
  if (!entry.author || typeof entry.author !== 'string') {
    fail('manifest-entry-author', `${label}: author missing`);
    ok = false;
  }
  if (!entry.reviewer || entry.reviewer === entry.author) {
    fail('manifest-entry-reviewer', `${label}: reviewer must be present and differ from author`);
    ok = false;
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(entry.created_at || ''))) {
    fail('manifest-entry-created-at', `${label}: created_at must be YYYY-MM-DD`);
    ok = false;
  }
  const rights = entry.rights || {};
  if (rights.license !== 'EMBARCARTE-authored') {
    fail('manifest-entry-rights', `${label}: rights.license must be "EMBARCARTE-authored"`);
    ok = false;
  }
  if (rights.ai_generated !== false) {
    fail(
      'manifest-entry-rights',
      `${label}: rights.ai_generated must be false (no AI imagery in MC-04)`,
    );
    ok = false;
  }
  if (!LEGAL_RESTRICTIONS.has(entry.legal_restrictions)) {
    fail(
      'manifest-entry-legal',
      `${label}: legal_restrictions must be INTERNAL_PROPOSED or PUBLICATION_BLOCKED`,
    );
    ok = false;
  }
  if (!Array.isArray(entry.files) || entry.files.length === 0) {
    fail('manifest-entry-files', `${label}: produced assets must list at least one file`);
    ok = false;
  }
  if (entry.known_limitations == null) {
    warn('manifest-entry-limitations', `${label}: known_limitations is missing`);
  }
  return ok;
}

async function validateAssetsManifest(manifestPath, assetsDir) {
  if (!existsSync(abs(manifestPath))) {
    fail('manifest-exists', `manifest not found: ${manifestPath}`);
    return { entries: [], fileRecords: new Map(), manifest: null };
  }
  const text = await readFile(abs(manifestPath), 'utf8');
  let manifest;
  try {
    manifest = parseYaml(text);
  } catch (err) {
    fail('manifest-parse', `YAML parse failed: ${err.message}`);
    return { entries: [], fileRecords: new Map(), manifest: null };
  }
  if (!manifest || !Array.isArray(manifest.assets)) {
    fail('manifest-structure', 'manifest must contain an `assets:` list');
    return { entries: [], fileRecords: new Map(), manifest: null };
  }
  const entries = manifest.assets.filter((e) => e && !e.example_only);
  pass(
    'manifest-parse',
    `parsed ${entries.length} manifest asset entries (${fmtInt(text.length)} bytes)`,
  );

  const seenIds = new Set();
  const seenSlugs = new Set();
  const fileRecords = new Map();
  for (const entry of entries) {
    validateEntry(entry, seenIds, seenSlugs);
    for (const file of entry.files || []) {
      const p = String(file.path || '');
      if (!p) {
        fail('manifest-file', `${entry.id}: file record without path`);
        continue;
      }
      if (fileRecords.has(p))
        fail('manifest-file-duplicate', `${p}: referenced by more than one manifest record`);
      else fileRecords.set(p, { entry, file });
    }
  }

  // generation record (task H requirement)
  const gen = manifest.generation_record;
  if (!gen || typeof gen !== 'object') {
    fail('manifest-generation-record', 'generation_record block is missing');
  } else {
    if (!Array.isArray(gen.commands) || gen.commands.length === 0) {
      fail(
        'manifest-generation-record',
        'generation_record.commands must list the real commands run',
      );
    }
    for (const key of ['node_version', 'playwright_version', 'chromium_version']) {
      if (!gen[key] || typeof gen[key] !== 'string') {
        fail('manifest-generation-record', `generation_record.${key} is missing`);
      }
    }
    if (!gen.scale_factors || typeof gen.scale_factors !== 'object') {
      fail('manifest-generation-record', 'generation_record.scale_factors is missing');
    }
  }

  // coverage: files on disk vs manifest records
  const onDisk = await walkAssets(assetsDir);
  const missing = onDisk.filter((p) => !fileRecords.has(p));
  const orphan = [...fileRecords.keys()].filter((p) => !onDisk.includes(p));
  if (missing.length)
    fail(
      'coverage',
      `${missing.length} asset file(s) without a manifest record: ${missing.slice(0, 8).join(', ')}${missing.length > 8 ? ', …' : ''}`,
    );
  if (orphan.length)
    fail(
      'coverage',
      `${orphan.length} manifest record(s) pointing at a non-existent file: ${orphan.slice(0, 8).join(', ')}${orphan.length > 8 ? ', …' : ''}`,
    );
  if (!missing.length && !orphan.length) {
    pass(
      'coverage',
      `1:1 coverage — ${onDisk.length} asset files, ${fileRecords.size} manifest file records`,
    );
  }

  // per-file verification
  const findings = { sha: 0, bytes: 0, format: 0, dims: 0, budget: 0, alt: 0 };
  for (const relPath of onDisk) {
    const rec = fileRecords.get(relPath);
    if (!rec) continue;
    const { entry, file } = rec;
    const actual = await probeFile(relPath);
    const declaredSha = String(file.sha256 || '');
    if (declaredSha !== actual.sha256) {
      findings.sha += 1;
      fail(
        'sha256',
        `${relPath}: declared ${declaredSha.slice(0, 12)}…, real ${actual.sha256.slice(0, 12)}…`,
      );
    }
    if (Number(file.bytes) !== actual.bytes) {
      findings.bytes += 1;
      fail('bytes', `${relPath}: declared ${file.bytes} B, real ${actual.bytes} B`);
    }
    const declaredFormat = String(file.format || '');
    if (actual.format !== declaredFormat) {
      findings.format += 1;
      fail('format', `${relPath}: declared ${declaredFormat}, real ${actual.format || 'unknown'}`);
    }
    if (actual.extFormat && actual.extFormat !== actual.format) {
      findings.format += 1;
      fail(
        'format-extension',
        `${relPath}: extension implies ${actual.extFormat}, bytes are ${actual.format}`,
      );
    }
    if (actual.format === 'svg') {
      const vb = probeSvg(actual.buffer).viewBox;
      const declaredW = file.width == null ? null : Number(file.width);
      const declaredH = file.height == null ? null : Number(file.height);
      if (!vb) {
        findings.dims += 1;
        fail('dims', `${relPath}: SVG has no parseable viewBox`);
      } else if (declaredW != null && Math.round(vb.width) !== Math.round(declaredW)) {
        findings.dims += 1;
        fail('dims', `${relPath}: declared width ${declaredW}, real viewBox width ${vb.width}`);
      } else if (declaredH != null && Math.round(vb.height) !== Math.round(declaredH)) {
        findings.dims += 1;
        fail('dims', `${relPath}: declared height ${declaredH}, real viewBox height ${vb.height}`);
      }
    } else if (actual.format === 'html') {
      if (file.width != null || file.height != null) {
        findings.dims += 1;
        fail('dims', `${relPath}: HTML sources must declare null width/height`);
      }
    } else if (actual.width != null) {
      if (Number(file.width) !== actual.width || Number(file.height) !== actual.height) {
        findings.dims += 1;
        fail(
          'dims',
          `${relPath}: declared ${file.width}×${file.height}, real ${actual.width}×${actual.height}`,
        );
      }
    }

    const budget = byteBudget(relPath);
    if (budget) {
      if (actual.bytes > budget.limit) {
        findings.budget += 1;
        fail(
          'byte-budget',
          `${relPath}: ${fmtInt(actual.bytes)} B > ${fmtInt(budget.limit)} B (${budget.label})`,
        );
      }
    }

    // alt text requirement (content media); documents/decorative sources may opt out
    const altRequired =
      entry.alt_required !== false &&
      entry.alt &&
      entry.alt.decorative !== true &&
      ['png', 'jpeg', 'webp', 'avif', 'svg'].includes(actual.format) &&
      !/\/evidence\/renders\//.test(relPath);
    if (altRequired) {
      if (!entry.alt.es || !entry.alt.en) {
        findings.alt += 1;
        fail('alt-text', `${entry.id} (${relPath}): alt.es and alt.en are both required`);
      }
    }

    // forbidden symbols in authored text assets (binary containers like PNG/PDF are
    // not text-extracted here; their authored sources are scanned instead)
    if (/\.(svg|html|htm)$/i.test(relPath)) {
      const text = actual.buffer.toString('utf8');
      if (text.includes('\u00AE') || text.includes('\u2122')) {
        fail('no-register-symbols', `${relPath}: contains ® or ™`);
      }
    }
  }
  if (findings.sha === 0 && findings.bytes === 0) {
    pass(
      'file-bytes',
      `verified ${onDisk.length} files: declared SHA-256 and byte size match the bytes on disk`,
    );
  }
  if (findings.format === 0) {
    pass('file-format', 'declared format matches magic bytes and file extension for every file');
  }
  if (findings.dims === 0) {
    pass('file-dimensions', 'declared dimensions match the real headers/viewBox for every file');
  }
  const budgetCount = onDisk.filter((p) => byteBudget(p)).length;
  if (findings.budget === 0)
    pass('byte-budgets', `${budgetCount} budgeted file(s) checked; none over budget`);
  if (findings.alt === 0)
    pass('alt-text', `ES/EN alt text present where required (${onDisk.length} files reviewed)`);

  // status vocabulary + registration wording
  const manifestStatusIssues = entries.filter((e) => !LEGAL_STATUSES.has(e.status)).length;
  if (manifestStatusIssues === 0) {
    pass(
      'status-vocabulary',
      `all ${entries.length} manifest status values are legal (PRODUCED / INTERNALLY_REVIEWED / …)`,
    );
  }
  for (const token of FORBIDDEN_STATUS_TOKENS) {
    if (text.includes(token))
      fail('status-vocabulary', `manifest contains forbidden status token ${token}`);
  }
  return { entries, fileRecords, manifest, onDisk };
}

async function validateTextAssets(onDisk) {
  const textExt = /\.(svg|html|htm)$/i;
  let checked = 0;
  for (const relPath of onDisk) {
    if (!textExt.test(relPath)) continue;
    checked += 1;
    const text = await readFile(abs(relPath), 'utf8');
    const isSvg = /\.svg$/i.test(relPath);
    const checks = [];
    if (isSvg) {
      if (!/<svg[\s>]/.test(text)) checks.push('missing <svg>');
      if (!parseViewBox(text)) checks.push('missing/invalid viewBox');
      if (/<script\b/i.test(text)) checks.push('<script>');
      if (/<foreignObject\b/i.test(text)) checks.push('<foreignObject>');
      if (/<image\b/i.test(text)) checks.push('embedded raster <image>');
      if (/\bfilter\s*=/i.test(text)) checks.push('filter/effect');
      if (/@import/i.test(text)) checks.push('CSS @import');
      if (/\b(?:href|xlink:href)\s*=\s*"https?:/i.test(text)) checks.push('external href');
      if (/url\(\s*['"]?https?:/i.test(text)) checks.push('external url()');
      const ids = [...text.matchAll(/\sid\s*=\s*"([^"]+)"/g)].map((m) => m[1]);
      const dup = ids.filter((id, idx) => ids.indexOf(id) !== idx);
      if (dup.length) checks.push(`duplicate id(s): ${[...new Set(dup)].join(', ')}`);
    } else {
      if (/<script\b/i.test(text)) checks.push('<script>');
      if (/\b(?:src|href)\s*=\s*"https?:/i.test(text)) checks.push('external src/href');
    }
    for (const token of FORBIDDEN_STATUS_TOKENS) {
      if (text.includes(token)) checks.push(`forbidden status token ${token}`);
    }
    if (checks.length) fail('asset-hygiene', `${relPath}: ${checks.join('; ')}`);
  }
  if (!RESULTS.some((r) => r.id === 'asset-hygiene' && r.status === 'FAIL')) {
    pass(
      'asset-hygiene',
      `${checked} SVG/HTML asset(s): viewBox present, no script/external refs/embedded raster/filters, unique ids`,
    );
  }
  info(
    `register-symbol scan: ${checked} authored SVG/HTML source(s) checked for ®/™; rendered raster/PDF containers are not text-extracted, so their authored sources are the scanned evidence`,
  );

  // registration wording warning (claims review is Governance's gate; this is a signal)
  const registrationPhrases = /registered trademark|marca registrada|registrada\b/i;
  for (const relPath of onDisk) {
    if (!/\.(svg|html|htm)$/i.test(relPath)) continue;
    const text = await readFile(abs(relPath), 'utf8');
    if (registrationPhrases.test(text))
      warn(
        'no-registration-wording',
        `${relPath}: contains registration wording (review as a prohibition statement, not a claim)`,
      );
  }
}

function collectBriefEntries(node, acc = []) {
  if (Array.isArray(node)) {
    for (const item of node) collectBriefEntries(item, acc);
    return acc;
  }
  if (node && typeof node === 'object') {
    if (typeof node.id === 'string' && /^MR-[A-Z]{3}-\d{3}$/.test(node.id) && node.status)
      acc.push(node);
    for (const value of Object.values(node)) collectBriefEntries(value, acc);
  }
  return acc;
}

function providerValuesAllNoneYet(provider) {
  if (!provider || typeof provider !== 'object') return false;
  const values = Object.values(provider).filter((v) => v != null && typeof v !== 'object');
  if (values.length === 0) return false;
  return values.every(
    (v) =>
      String(v).includes('NONE_YET') ||
      String(v) === 'NOT_REVIEWED' ||
      String(v) === 'NOT_VERIFIED',
  );
}

async function validateBriefs(briefsPath) {
  if (!existsSync(abs(briefsPath))) {
    fail('briefs-exists', `briefs manifest not found: ${briefsPath}`);
    return;
  }
  const text = await readFile(abs(briefsPath), 'utf8');
  let briefs;
  try {
    briefs = parseYaml(text);
  } catch (err) {
    fail('briefs-parse', `YAML parse failed: ${err.message}`);
    return;
  }
  const entries = collectBriefEntries(briefs.assets ?? briefs);
  if (entries.length === 0) {
    fail('briefs-structure', 'no MR-* brief entries found in MC-04-BRIEFS.yaml');
    return;
  }
  const blocked = entries.filter((e) => e.status === 'BLOCKED_ON_IMAGE_GENERATION');
  const other = entries.filter((e) => e.status !== 'BLOCKED_ON_IMAGE_GENERATION');
  let problems = 0;
  for (const entry of blocked) {
    const provider =
      entry.provider ||
      (briefs.defaults_shared_across_assets && briefs.defaults_shared_across_assets.provider);
    if (!providerValuesAllNoneYet(provider)) {
      fail('briefs-provider', `${entry.id}: blocked brief must keep provider.* = NONE_YET`);
      problems += 1;
    }
    if (!Array.isArray(entry.files) || entry.files.length !== 0) {
      fail('briefs-files', `${entry.id}: BLOCKED_ON_IMAGE_GENERATION entry must have files: []`);
      problems += 1;
    }
    if (entry.generated_at != null) {
      fail('briefs-generated-at', `${entry.id}: blocked brief must have generated_at: null`);
      problems += 1;
    }
    if (entry.classification && entry.classification !== 'CONCEPT') {
      warn(
        'briefs-classification',
        `${entry.id}: blocked brief classification is ${entry.classification}`,
      );
    }
  }
  for (const entry of other) {
    const files = Array.isArray(entry.files) ? entry.files : [];
    if (files.length > 0) {
      fail('briefs-files', `${entry.id}: ${entry.status} entry must not point at a produced file`);
      problems += 1;
    }
  }
  // no produced file path may be referenced from the briefs manifest
  const assetPaths = text.match(/docs\/marea\/brand\/assets\/[^\s"'`]+/g) || [];
  if (assetPaths.length > 0) {
    fail(
      'briefs-files',
      `briefs manifest references asset file paths: ${[...new Set(assetPaths)].slice(0, 5).join(', ')}`,
    );
    problems += 1;
  }
  if (problems === 0) {
    pass(
      'briefs-structure',
      `MC-04-BRIEFS.yaml: ${blocked.length} blocked brief(s) with provider NONE_YET + files [] + status BLOCKED_ON_IMAGE_GENERATION; ${other.length} producible-without-generation entry(ies) with no files`,
    );
  }
}

// ---------------------------------------------------------------------------
// CLI + report
// ---------------------------------------------------------------------------

function parseArgs(argv) {
  const args = { ...DEFAULTS };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === '--manifest') args.manifest = argv[++i];
    else if (a === '--briefs') args.briefs = argv[++i];
    else if (a === '--assets') args.assets = argv[++i];
    else if (a === '--help' || a === '-h') args.help = true;
    else throw new Error(`Unknown argument: ${a}`);
  }
  return args;
}

function printReport() {
  console.log('='.repeat(100));
  console.log('check-assets — MAREA MC-04 asset validator');
  console.log(`repo ${ROOT}`);
  console.log('='.repeat(100));
  for (const result of RESULTS) {
    if (result.id === 'info') {
      console.log(`INFO   ${result.detail}`);
      continue;
    }
    console.log(`${result.status.padEnd(6)} ${result.id.padEnd(28)} ${result.detail}`);
  }
  const counts = { PASS: 0, FAIL: 0, WARN: 0 };
  for (const r of RESULTS) if (r.status in counts) counts[r.status] += 1;
  console.log('-'.repeat(100));
  console.log(`SUMMARY ${counts.PASS} passed · ${counts.FAIL} failed · ${counts.WARN} warning(s)`);
  return counts;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log(
      'Usage: node scripts/check-assets.mjs [--manifest <yaml>] [--briefs <yaml>] [--assets <dir>]',
    );
    return 0;
  }

  console.log(`check-assets: manifest=${args.manifest} assets=${args.assets}`);
  const { entries, onDisk } = await validateAssetsManifest(args.manifest, args.assets);
  if (!onDisk || onDisk.length === 0) {
    fail('assets-exists', `no asset files found under ${args.assets}`);
  } else {
    pass('assets-exists', `${onDisk.length} asset file(s) under ${args.assets}`);
    await validateTextAssets(onDisk);

    const logoFiles = onDisk.filter(
      (p) => /\/assets\/logo\/[^/]+\.svg$/.test(p) || /\/assets\/logo\/family\/[^/]+\.svg$/.test(p),
    );
    if (logoFiles.length === 0) warn('svg-ink-bounds', 'no logo SVGs found to audit');
    else await auditSvgInk(logoFiles);
  }

  await validateBriefs(args.briefs);

  const counts = printReport();
  if (counts.FAIL > 0) {
    console.error('RESULT FAIL — fix the FAIL lines above; the manifest/asset set is not valid.');
    return 1;
  }
  console.log(
    'RESULT PASS — every asset file is registered, measured, budget-compliant and honest.',
  );
  console.log(`Manifest entries: ${entries.length} · asset files: ${(onDisk || []).length}`);
  return 0;
}

main()
  .then((code) => process.exit(code))
  .catch((err) => {
    console.error(err.stack || err.message);
    process.exit(1);
  });
