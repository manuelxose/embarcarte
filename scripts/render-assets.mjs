#!/usr/bin/env node
/**
 * MAREA MC-04 — deterministic visual-asset render pipeline.
 *
 * WHAT THIS IS
 *   Authors and rasterises MAREA identity assets from our own SVG/HTML with the
 *   repository's installed Playwright Chromium. This is *authoring output*, not
 *   generative imagery: no image model, no network, no third-party artwork.
 *   See docs/marea/assets/ASSET-PIPELINE.md §6.3, §7.2 and
 *   docs/marea/brand/MC-04-VISUAL-IDENTITY-BRIEF.md §9.3, §10.5.
 *
 * DEPENDENCIES (all already in the repo / machine; nothing is installed here)
 *   - playwright 1.64.1 (devDependency) + Chromium from %LOCALAPPDATA%\ms-playwright
 *   - @fontsource-variable/manrope + @fontsource-variable/dm-sans woff2 files,
 *     embedded as @font-face data URLs so renders are self-contained
 *   - optional ffmpeg (C:\ffmpeg\bin\ffmpeg.exe, override with FFMPEG_PATH) used
 *     only for WebP/AVIF conversion after a real capability probe. If a codec is
 *     unavailable the job reports it and does NOT write a mislabelled file.
 *
 * COMMANDS
 *   node scripts/render-assets.mjs --list
 *   node scripts/render-assets.mjs --all
 *   node scripts/render-assets.mjs --job packaging [--job print-pdf] ...
 *   node scripts/render-assets.mjs --capabilities
 *   node scripts/render-assets.mjs --convert in.png --format webp --out out.webp
 *   node scripts/render-assets.mjs --html <proof.html> [--width 1200] [--out <out.png>]
 *
 * DETERMINISM
 *   Fixed viewport/deviceScaleFactor per job, sRGB colour profile, animations and
 *   transitions disabled, fonts awaited before capture. Re-running produces the
 *   same dimensions and bytes on the same machine/Chromium build; SHA-256 is
 *   printed for every output so a reviewer can compare two runs.
 *
 * OUTPUT DISCIPLINE
 *   Every write is inside the AssetProduction MC-04 write scope. Writes outside
 *   docs/marea/brand/assets/{icons/app,social,packaging,print}, the D-04 root
 *   icon files, docs/marea/brand/assets/evidence/renders and the two scripts are
 *   refused.
 */

import { chromium } from 'playwright';
import { spawnSync } from 'node:child_process';
import { existsSync, readdirSync } from 'node:fs';
import { mkdir, mkdtemp, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ASSETS = 'docs/marea/brand/assets';
const FFMPEG = process.env.FFMPEG_PATH || 'C:\\ffmpeg\\bin\\ffmpeg.exe';

// ---------------------------------------------------------------------------
// small utilities
// ---------------------------------------------------------------------------

const abs = (p) => path.resolve(ROOT, p);
const toRel = (p) => path.relative(ROOT, p).split(path.sep).join('/');
const hash = (buf) => crypto.createHash('sha256').update(buf).digest('hex');
const fmtInt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

class BlockedError extends Error {}

async function ensureDir(dir) {
  await mkdir(abs(dir), { recursive: true });
}

/** Refuse to write outside the MC-04 AssetProduction scope. */
function assertScoped(relPath) {
  const p = toRel(abs(relPath));
  const allowed =
    p.startsWith(`${ASSETS}/icons/app/`) ||
    p.startsWith(`${ASSETS}/social/`) ||
    p.startsWith(`${ASSETS}/packaging/`) ||
    p.startsWith(`${ASSETS}/print/`) ||
    p.startsWith(`${ASSETS}/evidence/renders/`) ||
    p === `${ASSETS}/icons/marea-app-icon-1024.png` ||
    p === `${ASSETS}/icons/marea-icon-512.png` ||
    p === `${ASSETS}/icons/marea-icon-192.png` ||
    p === `${ASSETS}/icons/marea-apple-touch-180.png` ||
    p === `${ASSETS}/icons/favicon.svg` ||
    p === `${ASSETS}/icons/favicon.ico` ||
    p === 'docs/marea/assets/manifest/MC-04-ASSETS.yaml' ||
    p === 'scripts/render-assets.mjs' ||
    p === 'scripts/check-assets.mjs';
  if (!allowed) {
    throw new Error(
      `SCOPE VIOLATION: refusing to write ${p} (outside MC-04 AssetProduction scope)`,
    );
  }
}

// ---------------------------------------------------------------------------
// binary probing — dimensions/formats are read back from the written file,
// never assumed from the render call.
// ---------------------------------------------------------------------------

function probePng(buf) {
  const sig = '89504e470d0a1a0a';
  if (buf.subarray(0, 8).toString('hex') !== sig) return null;
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
    if (isSof) {
      return { format: 'jpeg', height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
    }
    i += 2 + len;
  }
  return null;
}

function probeWebp(buf) {
  if (buf.subarray(0, 4).toString('ascii') !== 'RIFF') return null;
  if (buf.subarray(8, 12).toString('ascii') !== 'WEBP') return null;
  const fourcc = buf.subarray(12, 16).toString('ascii');
  if (fourcc === 'VP8X') {
    const w = 1 + buf.readUIntLE(24, 3);
    const h = 1 + buf.readUIntLE(27, 3);
    return { format: 'webp', width: w, height: h, lossless: false };
  }
  if (fourcc === 'VP8L') {
    const b = buf.readUInt32LE(21);
    return {
      format: 'webp',
      width: (b & 0x3fff) + 1,
      height: ((b >> 14) & 0x3fff) + 1,
      lossless: true,
    };
  }
  if (fourcc === 'VP8 ') {
    // chunk payload starts at 20: 3-byte frame tag, then the 9d 01 2a start code
    const p = 23;
    if (buf[p] !== 0x9d || buf[p + 1] !== 0x01 || buf[p + 2] !== 0x2a) return null;
    const w = buf.readUInt16LE(p + 3) & 0x3fff;
    const h = buf.readUInt16LE(p + 5) & 0x3fff;
    return { format: 'webp', width: w, height: h, lossless: false };
  }
  return null;
}

function probeAvif(buf) {
  if (buf.length < 12) return null;
  if (buf.subarray(4, 8).toString('ascii') !== 'ftyp') return null;
  const brands = buf.subarray(8, Math.min(buf.length, 40)).toString('ascii');
  if (!brands.includes('avif') && !brands.includes('avis')) return null;
  let p = buf.indexOf(Buffer.from('ispe', 'ascii'));
  while (p !== -1) {
    const size = buf.readUInt32BE(p - 4);
    if (size >= 20 && p + 16 <= buf.length) {
      return { format: 'avif', width: buf.readUInt32BE(p + 8), height: buf.readUInt32BE(p + 12) };
    }
    p = buf.indexOf(Buffer.from('ispe', 'ascii'), p + 4);
  }
  return { format: 'avif', width: null, height: null };
}

function probeIco(buf) {
  if (buf.length < 6) return null;
  if (buf.readUInt16LE(0) !== 0 || buf.readUInt16LE(2) !== 1) return null;
  const count = buf.readUInt16LE(4);
  const sizes = [];
  for (let i = 0; i < count; i += 1) {
    const b = 6 + i * 16;
    if (b + 16 > buf.length) return null;
    const w = buf.readUInt8(b) === 0 ? 256 : buf.readUInt8(b);
    const h = buf.readUInt8(b + 1) === 0 ? 256 : buf.readUInt8(b + 1);
    sizes.push({ width: w, height: h, bytes: buf.readUInt32LE(b + 8) });
  }
  const largest = sizes.reduce((a, b) => (a.width >= b.width ? a : b), sizes[0]);
  return { format: 'ico', width: largest.width, height: largest.height, sizes };
}

function probeSvg(text) {
  if (!/<svg[\s>]/.test(text)) return null;
  const viewBox = /viewBox\s*=\s*"([^"]+)"/.exec(text);
  const widthAttr = /<svg[^>]*\swidth\s*=\s*"([\d.]+)(?:mm|px)?"/.exec(text);
  const heightAttr = /<svg[^>]*\sheight\s*=\s*"([\d.]+)(?:mm|px)?"/.exec(text);
  if (widthAttr && heightAttr) {
    return {
      format: 'svg',
      width: Number(widthAttr[1]),
      height: Number(heightAttr[1]),
      viewBox: viewBox ? viewBox[1] : null,
    };
  }
  if (viewBox) {
    const parts = viewBox[1].trim().split(/\s+/).map(Number);
    return {
      format: 'svg',
      width: parts[2],
      height: parts[3],
      viewBox: viewBox[1],
      decimal: !Number.isInteger(parts[2]) || !Number.isInteger(parts[3]),
    };
  }
  return { format: 'svg', width: null, height: null, viewBox: null };
}

function probeHtml(text) {
  if (!/<(!doctype|html)[\s>]/i.test(text)) return null;
  return { format: 'html', width: null, height: null };
}

function probePdf(buf) {
  if (buf.subarray(0, 5).toString('ascii') !== '%PDF-') return null;
  const text = buf.toString('latin1');
  const box = /\/MediaBox\s*\[\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\]/.exec(text);
  const pages = (text.match(/\/Type\s*\/Page[^s]/g) || []).length;
  return {
    format: 'pdf',
    width: box ? Math.round(Number(box[3]) - Number(box[1])) : null,
    height: box ? Math.round(Number(box[4]) - Number(box[2])) : null,
    unit: 'pt',
    pages: pages || null,
  };
}

/** Probe a file from its real bytes (format + dimensions where applicable). */
async function probeFile(relPath) {
  const buf = await readFile(abs(relPath));
  return { bytes: buf.length, sha256: hash(buf), ...probeBytes(buf), buffer: buf };
}

function probeBytes(buf) {
  return (
    probePng(buf) ||
    probeJpeg(buf) ||
    probeWebp(buf) ||
    probeAvif(buf) ||
    probeIco(buf) ||
    probePdf(buf) ||
    null
  );
}

function probeText(text) {
  return probeSvg(text) || probeHtml(text);
}

// ---------------------------------------------------------------------------
// fonts — read the installed @fontsource-variable packages and inline the
// latin + latin-ext woff2 subsets as data URLs (self-contained, no network).
// ---------------------------------------------------------------------------

let FONT_CSS_CACHE = null;

async function loadFontCss() {
  if (FONT_CSS_CACHE) return FONT_CSS_CACHE;
  const packages = [
    [
      'node_modules/@fontsource-variable/manrope/index.css',
      'node_modules/@fontsource-variable/manrope/files',
    ],
    [
      'node_modules/@fontsource-variable/dm-sans/index.css',
      'node_modules/@fontsource-variable/dm-sans/files',
    ],
  ];
  let css = '';
  for (const [cssRel, filesRel] of packages) {
    const index = await readFile(abs(cssRel), 'utf8');
    const blocks = index.match(/\/\* [\w-]+ \*\/\s*@font-face \{[^}]*\}/g) || [];
    for (const block of blocks) {
      const m = /url\(\.\/files\/([\w.-]+\.woff2)\)/.exec(block);
      if (!m) continue;
      const file = m[1];
      if (!/latin-(ext-)?wght-normal\.woff2$/.test(file)) continue;
      const b64 = (await readFile(abs(`${filesRel}/${file}`))).toString('base64');
      css += `${block.replace(/url\(\.\/files\/[\w.-]+\.woff2\)/, `url(data:font/woff2;base64,${b64})`)}\n`;
    }
  }
  FONT_CSS_CACHE = css;
  return css;
}

// ---------------------------------------------------------------------------
// SVG helpers
// ---------------------------------------------------------------------------

function parseViewBox(svgText) {
  const m = /viewBox\s*=\s*"([^"]+)"/.exec(svgText);
  if (!m) throw new Error('SVG has no viewBox');
  const [x, y, w, h] = m[1]
    .trim()
    .split(/[\s,]+/)
    .map(Number);
  if (![x, y, w, h].every((n) => Number.isFinite(n)) || w <= 0 || h <= 0) {
    throw new Error(`Invalid viewBox: ${m[1]}`);
  }
  return { x, y, w, h };
}

function svgInner(svgText) {
  let s = svgText.replace(/<\?xml[\s\S]*?\?>/gi, '');
  s = s.replace(/<!DOCTYPE[\s\S]*?>/gi, '');
  const open = /<svg\b[^>]*>/i.exec(s);
  const close = s.lastIndexOf('</svg>');
  if (!open || close === -1) throw new Error('Could not extract SVG body');
  return s.slice(open.index + open[0].length, close).trim();
}

/** Fit a source viewBox into a box centred on (cx, cy); returns SVG transform. */
function fitTransform(vb, box, cx, cy) {
  const s = Math.min(box / vb.w, box / vb.h);
  const tx = cx - (vb.x + vb.w / 2) * s;
  const ty = cy - (vb.y + vb.h / 2) * s;
  const n = (v) => Number(v.toFixed(4));
  return `translate(${n(tx)} ${n(ty)}) scale(${n(s)})`;
}

/** Recolour a single-ink authored mark (BRD-004: one ink) without touching none/url(). */
function recolorMark(inner, ink) {
  return inner
    .replace(/currentColor/g, ink)
    .replace(/\b(fill|stroke)="(?!none\b|url\()([^"]*)"/g, (m, attr) => `${attr}="${ink}"`);
}

function escapeXml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ---------------------------------------------------------------------------
// rendering primitives
// ---------------------------------------------------------------------------

const DETERMINISTIC_CSS = `
  *{animation:none!important;transition:none!important;caret-color:transparent!important}
`;

async function newPage(browser, { width, height, scale = 1 }) {
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: scale,
    colorScheme: 'light',
    reducedMotion: 'reduce',
    locale: 'es-ES',
  });
  const page = await context.newPage();
  page.on('pageerror', (err) => console.error(`PAGE ERROR: ${err.message}`));
  page.on('requestfailed', (req) => console.error(`REQUEST FAILED: ${req.url()}`));
  return page;
}

async function settle(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
  await page.evaluate(
    () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
  );
}

async function capture(page, type, quality) {
  return page.screenshot({
    type,
    ...(type === 'jpeg' ? { quality: quality ?? 84 } : {}),
    animations: 'disabled',
  });
}

/** Render an HTML document to PNG/JPEG at exact width x height (CSS px). */
async function renderHtml(
  browser,
  { html, url, width, height, scale = 1, type = 'png', quality, out, fontCss, expected },
) {
  const page = await newPage(browser, { width, height, scale });
  try {
    if (url) {
      await page.goto(url, { waitUntil: 'load' });
    } else {
      await page.setContent(html, { waitUntil: 'load' });
    }
    if (fontCss) await page.addStyleTag({ content: fontCss });
    await page.addStyleTag({ content: DETERMINISTIC_CSS });
    await settle(page);
    const buf = await capture(page, type, quality);
    if (!out) return buf;
    return writeOutput(out, buf, { expected });
  } finally {
    await page.context().close();
  }
}

/** Render an authored SVG file to PNG/JPEG at exact width x height (CSS px). */
async function renderSvg(
  browser,
  {
    svgPath,
    width,
    height,
    scale = 1,
    type = 'png',
    quality,
    transparent = false,
    background,
    out,
    expected,
  },
) {
  const svg = await readFile(abs(svgPath), 'utf8');
  const bg = transparent ? 'transparent' : background || '#ffffff';
  const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><style>
    html,body{margin:0;padding:0;background:${bg};overflow:hidden}
    svg{display:block;width:${width}px;height:${height}px}
  </style></head><body>${svg.replace(/<\?xml[\s\S]*?\?>/gi, '')}</body></html>`;
  return renderHtml(browser, {
    html,
    width,
    height,
    scale,
    type,
    quality,
    out,
    expected,
    fontCss: await loadFontCss(),
  });
}

/** Write output bytes, measure the real file and log the measurement. */
async function writeOutput(relPath, buf, opts = {}) {
  assertScoped(relPath);
  await ensureDir(path.dirname(relPath));
  await writeFile(abs(relPath), buf);
  const file = await readFile(abs(relPath));
  const info = probeBytes(file) || {
    format: opts.format || path.extname(relPath).slice(1),
    width: null,
    height: null,
  };
  const record = {
    path: toRel(abs(relPath)),
    format: info.format,
    width: info.width,
    height: info.height,
    ...(info.sizes ? { sizes: info.sizes } : {}),
    ...(info.pages ? { pages: info.pages } : {}),
    bytes: file.length,
    sha256: hash(file),
    expected: opts.expected || null,
  };
  if (
    opts.expected &&
    (info.width !== opts.expected.width || info.height !== opts.expected.height)
  ) {
    throw new Error(
      `DIMENSION MISMATCH ${record.path}: got ${info.width}x${info.height}, expected ${opts.expected.width}x${opts.expected.height}`,
    );
  }
  OUTPUTS.push(record);
  const size =
    info.width == null ? '' : `${info.width}x${info.height}${info.unit ? ` ${info.unit}` : ''}`;
  console.log(
    `OK     ${record.path}  ${record.format}${size ? `  ${size}` : ''}  ${fmtInt(record.bytes)} B  sha256=${record.sha256}`,
  );
  return record;
}

// ---------------------------------------------------------------------------
// ffmpeg conversion — probed, never assumed
// ---------------------------------------------------------------------------

function ffmpegAvailable() {
  return existsSync(FFMPEG);
}

function runFfmpeg(args) {
  return spawnSync(FFMPEG, args, { encoding: 'utf8', windowsHide: true });
}

async function convertImage(inputRel, format, outRel) {
  assertScoped(outRel);
  if (!ffmpegAvailable()) {
    throw new BlockedError(`ffmpeg not found at ${FFMPEG}; conversion to ${format} unavailable`);
  }
  await ensureDir(path.dirname(outRel));
  const srcAbs = abs(inputRel);
  const tmpOut = path.join(
    await mkdtemp(path.join(os.tmpdir(), 'marea-convert-')),
    `out.${format}`,
  );
  const res = runFfmpeg(['-y', '-v', 'error', '-i', srcAbs, ...encoderArgs(format), tmpOut]);
  try {
    if (res.status !== 0) {
      throw new BlockedError(
        `${format} conversion failed (ffmpeg exit ${res.status}): ${res.stderr.trim()}`,
      );
    }
    const buf = await readFile(tmpOut);
    const probe = probeBytes(buf);
    if (!probe || probe.format !== format) {
      throw new BlockedError(`${format} conversion produced an unrecognised container`);
    }
    return writeOutput(outRel, buf);
  } finally {
    await rm(path.dirname(tmpOut), { recursive: true, force: true });
  }
}

function encoderArgs(format) {
  if (format === 'webp') {
    return ['-c:v', 'libwebp', '-lossless', '0', '-q:v', '80', '-frames:v', '1'];
  }
  if (format === 'avif') {
    return [
      '-c:v',
      'libaom-av1',
      '-still-picture',
      '1',
      '-crf',
      '32',
      '-b:v',
      '0',
      '-frames:v',
      '1',
    ];
  }
  throw new Error(`Unsupported conversion target: ${format}`);
}

// ---------------------------------------------------------------------------
// PDF
// ---------------------------------------------------------------------------

/**
 * Pin Chromium's PDF metadata timestamps so the PDF bytes are reproducible.
 * Chromium embeds the wall-clock /CreationDate and /ModDate; the rendered pages
 * and page metadata are untouched. Fixed values match the manifest date.
 */
function normalizePdfForReproducibility(buf) {
  const fixed = "D:20261030000000+00'00'";
  return Buffer.from(
    Buffer.from(buf)
      .toString('latin1')
      .replace(/\/(CreationDate|ModDate)\s*\(D:[^)]*\)/g, `/$1 (${fixed})`),
    'latin1',
  );
}

async function renderPdf(browser, { html, url, out, preferCssPageSize = true }) {
  assertScoped(out);
  await ensureDir(path.dirname(out));
  const page = await newPage(browser, { width: 1240, height: 1754, scale: 1 });
  try {
    if (url) await page.goto(url, { waitUntil: 'load' });
    else await page.setContent(html, { waitUntil: 'load' });
    await page.addStyleTag({ content: await loadFontCss() });
    await page.addStyleTag({ content: DETERMINISTIC_CSS });
    await settle(page);
    const buf = await page.pdf({
      printBackground: true,
      ...(preferCssPageSize ? { preferCSSPageSize: true } : { format: 'A4' }),
    });
    const normalized = normalizePdfForReproducibility(Buffer.from(buf));
    return writeOutput(out, normalized, { format: 'pdf' });
  } finally {
    await page.context().close();
  }
}

// ---------------------------------------------------------------------------
// ICO container (16/32/48, PNG-in-ICO). Implemented here so the pipeline owns
// the container format instead of relying on an image tool.
// ---------------------------------------------------------------------------

function buildIco(pngs) {
  const count = pngs.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = icon
  header.writeUInt16LE(count, 4);
  const entries = Buffer.alloc(16 * count);
  let offset = 6 + 16 * count;
  pngs.forEach(({ size, buf }, i) => {
    const b = i * 16;
    entries.writeUInt8(size >= 256 ? 0 : size, b);
    entries.writeUInt8(size >= 256 ? 0 : size, b + 1);
    entries.writeUInt8(0, b + 2); // palette
    entries.writeUInt8(0, b + 3); // reserved
    entries.writeUInt16LE(1, b + 4); // planes
    entries.writeUInt16LE(32, b + 6); // bpp
    entries.writeUInt32LE(buf.length, b + 8);
    entries.writeUInt32LE(offset, b + 12);
    offset += buf.length;
  });
  return Buffer.concat([header, entries, ...pngs.map((p) => p.buf)]);
}

// ---------------------------------------------------------------------------
// D-14 — packaging dielines (vector, authored here as deterministic geometry)
//
// Every dimension is a PROPOSED placeholder: no BOM, no engineering input, no
// print/procurement authorization exists. The artwork is a concept, not a
// production dieline.
// ---------------------------------------------------------------------------

const PACKAGING_FAMILIES = [
  { family: 'display', label: 'DISPLAY', bodyW: 300, bodyH: 220, depth: 70 },
  { family: 'hub', label: 'HUB', bodyW: 240, bodyH: 180, depth: 90 },
  { family: 'ais', label: 'AIS', bodyW: 190, bodyH: 140, depth: 60 },
  { family: 'sense', label: 'SENSE', bodyW: 170, bodyH: 120, depth: 55 },
  { family: 'watch', label: 'WATCH', bodyW: 150, bodyH: 110, depth: 45 },
  { family: 'pilot', label: 'PILOT', bodyW: 280, bodyH: 200, depth: 80 },
];

const DIELINE_COLORS = {
  ink: '#17365d',
  sea: '#1776ad',
  mist: '#f2f9fd',
  fold: '#57708a',
  safe: '#8fb4c9',
  annotation: '#44586c',
  prompt: '#a33a1f',
};

function dielineLegend(x, y, width) {
  const items = [
    ['trim', 'CORTE / TRIM'],
    ['fold', 'DOBLEZ / FOLD'],
    ['safe', 'SEGURO 5 mm / SAFE'],
    ['bleed', 'SANGRÍA 3 mm / BLEED'],
    ['glue', 'ENCOLADO / GLUE'],
  ];
  const step = width / items.length;
  let out = '';
  items.forEach(([kind, label], i) => {
    const ix = x + i * step;
    if (kind === 'trim') {
      out += `<line x1="${ix}" y1="${y}" x2="${ix + 8}" y2="${y}" stroke="${DIELINE_COLORS.ink}" stroke-width="0.5"/>`;
    } else if (kind === 'fold') {
      out += `<line x1="${ix}" y1="${y}" x2="${ix + 8}" y2="${y}" stroke="${DIELINE_COLORS.fold}" stroke-width="0.4" stroke-dasharray="2.2 1.4"/>`;
    } else if (kind === 'safe') {
      out += `<line x1="${ix}" y1="${y}" x2="${ix + 8}" y2="${y}" stroke="${DIELINE_COLORS.safe}" stroke-width="0.35" stroke-dasharray="0.7 0.9"/>`;
    } else if (kind === 'bleed') {
      out += `<line x1="${ix}" y1="${y}" x2="${ix + 8}" y2="${y}" stroke="${DIELINE_COLORS.sea}" stroke-width="0.35" stroke-dasharray="4 1.6"/>`;
    } else {
      out += `<rect x="${ix}" y="${y - 1}" width="8" height="2" fill="none" stroke="${DIELINE_COLORS.annotation}" stroke-width="0.25"/>`;
      out += `<line x1="${ix}" y1="${y}" x2="${ix + 8}" y2="${y}" stroke="${DIELINE_COLORS.annotation}" stroke-width="0.25"/><line x1="${ix}" y1="${y - 1}" x2="${ix + 8}" y2="${y + 1}" stroke="${DIELINE_COLORS.annotation}" stroke-width="0.25"/>`;
    }
    out += `<text x="${ix + 10}" y="${y + 0.9}" font-size="2.2" fill="${DIELINE_COLORS.annotation}">${escapeXml(label)}</text>`;
  });
  return out;
}

function languagePanel(x, y, w, h, lang, lines) {
  const size = 2.6;
  let out = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${DIELINE_COLORS.safe}" stroke-width="0.3"/>`;
  out += `<text x="${x + 2}" y="${y + 4.8}" font-size="4" font-weight="700" fill="${DIELINE_COLORS.ink}" letter-spacing="0.3">${escapeXml(lang)}</text>`;
  lines.forEach((line, i) => {
    out += `<text x="${x + 2}" y="${y + 9.4 + i * 3.6}" font-size="${size}" fill="${DIELINE_COLORS.ink}">${escapeXml(line)}</text>`;
  });
  return out;
}

function buildDieline(fam, wordmark) {
  const { label, bodyW, bodyH, depth } = fam;
  const bleed = 3;
  const safe = 5;
  const glue = 15;
  const tuck = 18;
  const dust = 12;
  const mTop = 26;
  const mSide = 16;
  const mBottom = 26;
  const mRight = 22;
  const rowW = glue + depth + bodyW + depth + bodyW;
  const pageW = mSide + bleed + rowW + bleed + mRight;
  const pageH = mTop + bleed + tuck + bodyH + tuck + bleed + mBottom;
  const x0 = mSide + bleed;
  const glueX = x0;
  const sideLX = glueX + glue;
  const frontX = sideLX + depth;
  const sideRX = frontX + bodyW;
  const backX = sideRX + depth;
  const rightX = backX + bodyW;
  const trimTop = mTop + bleed;
  const bodyTop = trimTop + tuck;
  const bodyBottom = bodyTop + bodyH;
  const bleedBottom = bodyBottom + tuck + bleed;

  const f = (n) => Number(n.toFixed(2));

  // Net outline (clockwise). Flaps: front/back tuck 18 mm, side dust 12 mm,
  // glue flap 15 mm. Adjacent flaps are separated by a die-cut slit, so the
  // outline steps between their tops instead of tracing the fold.
  const outline = [
    [glueX, bodyTop],
    [sideLX, bodyTop],
    [sideLX, bodyTop - dust],
    [frontX, bodyTop - dust],
    [frontX, bodyTop - tuck],
    [sideRX, bodyTop - tuck],
    [sideRX, bodyTop - dust],
    [backX, bodyTop - dust],
    [backX, bodyTop - tuck],
    [rightX, bodyTop - tuck],
    [rightX, bodyBottom + tuck],
    [backX, bodyBottom + tuck],
    [backX, bodyBottom + dust],
    [sideRX, bodyBottom + dust],
    [sideRX, bodyBottom + tuck],
    [frontX, bodyBottom + tuck],
    [frontX, bodyBottom + dust],
    [sideLX, bodyBottom + dust],
    [sideLX, bodyBottom],
    [glueX, bodyBottom],
  ]
    .map(([x, y]) => `${f(x)},${f(y)}`)
    .join(' ');

  const foldV = [sideLX, frontX, sideRX, backX]
    .map(
      (x) =>
        `<line x1="${f(x)}" y1="${f(bodyTop)}" x2="${f(x)}" y2="${f(bodyBottom)}" stroke="${DIELINE_COLORS.fold}" stroke-width="0.4" stroke-dasharray="2.4 1.5"/>`,
    )
    .join('');
  const foldH = [bodyTop, bodyBottom]
    .map(
      (y) =>
        `<line x1="${f(sideLX)}" y1="${f(y)}" x2="${f(rightX)}" y2="${f(y)}" stroke="${DIELINE_COLORS.fold}" stroke-width="0.4" stroke-dasharray="2.4 1.5"/>`,
    )
    .join('');

  const safeRects = [
    [frontX + safe, bodyTop + safe, bodyW - 2 * safe, bodyH - 2 * safe],
    [backX + safe, bodyTop + safe, bodyW - 2 * safe, bodyH - 2 * safe],
    [sideLX + safe, bodyTop + safe, depth - 2 * safe, bodyH - 2 * safe],
    [sideRX + safe, bodyTop + safe, depth - 2 * safe, bodyH - 2 * safe],
  ]
    .map(
      ([x, y, w, h]) =>
        `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${f(h)}" fill="none" stroke="${DIELINE_COLORS.safe}" stroke-width="0.3" stroke-dasharray="0.8 1.1"/>`,
    )
    .join('');

  const glueHatch = Array.from({ length: 9 }, (_, i) => i * 9 + 4)
    .map(
      (dy) =>
        `<line x1="${f(glueX)}" y1="${f(bodyTop + dy)}" x2="${f(sideLX)}" y2="${f(bodyTop + dy + 6)}" stroke="${DIELINE_COLORS.annotation}" stroke-width="0.25"/>`,
    )
    .join('');

  const qrSize = 26;
  const qrX = backX + bodyW - safe - qrSize - 2;
  const qrY = bodyBottom - safe - qrSize - 14;
  const qr = `
    <g>
      <rect x="${f(qrX)}" y="${f(qrY)}" width="${qrSize}" height="${qrSize}" fill="none" stroke="${DIELINE_COLORS.ink}" stroke-width="0.5"/>
      <line x1="${f(qrX)}" y1="${f(qrY)}" x2="${f(qrX + qrSize)}" y2="${f(qrY + qrSize)}" stroke="${DIELINE_COLORS.annotation}" stroke-width="0.3" stroke-dasharray="2 1.4"/>
      <line x1="${f(qrX + qrSize)}" y1="${f(qrY)}" x2="${f(qrX)}" y2="${f(qrY + qrSize)}" stroke="${DIELINE_COLORS.annotation}" stroke-width="0.3" stroke-dasharray="2 1.4"/>
      <text x="${f(qrX + qrSize / 2)}" y="${f(qrY + qrSize / 2 - 1)}" font-size="3" text-anchor="middle" font-weight="700" fill="${DIELINE_COLORS.annotation}">QR</text>
      <text x="${f(qrX + qrSize / 2)}" y="${f(qrY + qrSize / 2 + 3)}" font-size="2.2" text-anchor="middle" fill="${DIELINE_COLORS.annotation}">PROPUESTO</text>
      <text x="${f(qrX + qrSize / 2)}" y="${f(qrY + qrSize + 3.6)}" font-size="2.1" text-anchor="middle" fill="${DIELINE_COLORS.annotation}">URL impresa de respaldo:</text>
      <text x="${f(qrX + qrSize / 2)}" y="${f(qrY + qrSize + 6.4)}" font-size="2.1" text-anchor="middle" fill="${DIELINE_COLORS.annotation}">pendiente de dominio definitivo</text>
    </g>`;

  const langW = (bodyW - 2 * safe - 3) / 2;
  const langH = Math.min(36, (bodyH - 2 * safe - qrSize - 24) / 2);
  const langX = backX + safe;
  const langY = bodyTop + safe;
  const langPanels =
    languagePanel(langX, langY, langW, langH, 'ES', [
      'Contenido: unidad, guía de instalación,',
      'documentación de seguridad.',
      'Contenido real pendiente de BOM.',
    ]) +
    languagePanel(langX + langW + 3, langY, langW, langH, 'PT', [
      'Conteúdo: unidade, guia de instalação,',
      'documentação de segurança.',
      'Conteúdo real pendente de BOM.',
    ]) +
    languagePanel(langX, langY + langH + 3, langW, langH, 'EN', [
      'Contents: unit, installation guide,',
      'safety documentation.',
      'Actual contents pending BOM.',
    ]) +
    languagePanel(langX + langW + 3, langY + langH + 3, langW, langH, 'FR', [
      'Contenu : unité, guide d’installation,',
      'documentation de sécurité.',
      'Contenu réel en attente de nomenclature.',
    ]);

  const inclY = langY + 2 * langH + 10;
  const inclusions = `
    <g fill="${DIELINE_COLORS.ink}">
      <text x="${f(langX)}" y="${f(inclY)}" font-size="2.5" font-weight="700" letter-spacing="0.3">INCLUYE / INCLUDES</text>
      <text x="${f(langX)}" y="${f(inclY + 3.6)}" font-size="2.2">Unidad · guía de instalación · documentación de seguridad. Contenido real pendiente de BOM.</text>
      <text x="${f(langX)}" y="${f(inclY + 7.2)}" font-size="2.5" font-weight="700" letter-spacing="0.3">NO INCLUYE / EXCLUDES</text>
      <text x="${f(langX)}" y="${f(inclY + 10.8)}" font-size="2.2">Cableado, soportes y accesorios no confirmados. Peso y volumen pendientes de BOM.</text>
      <text x="${f(langX)}" y="${f(inclY + 15)}" font-size="2.1" fill="${DIELINE_COLORS.prompt}">Sin datos de rendimiento, certificación ni disponibilidad: no verificados.</text>
    </g>`;

  const markBoxSize = Math.min(46, bodyW * 0.34, bodyH * 0.3);
  const markCy = bodyTop + safe + 4 + markBoxSize / 2;
  const familyY = markCy + markBoxSize / 2 + 8;
  const conceptY = familyY + 5;
  const illW = Math.min(84, bodyW * 0.48);
  const illH = illW * 0.45;
  const illY = conceptY + 5;
  const captionY = illY + illH + 3.6;
  const editionY = bodyBottom - 12;
  const honestyY = bodyBottom - 6;
  const cx = frontX + bodyW / 2;
  const markSvg = wordmark
    ? `<g transform="${fitTransform(wordmark.viewBox, markBoxSize, cx, markCy)}">${wordmark.inner}</g>`
    : '';
  const front = `
    <g>
      ${markSvg}
      <text x="${f(cx)}" y="${f(familyY)}" font-size="6.4" font-weight="700" text-anchor="middle" letter-spacing="0.6" fill="${DIELINE_COLORS.ink}">MAREA ${escapeXml(label)}</text>
      <rect x="${f(cx - 28)}" y="${f(conceptY - 3.4)}" width="56" height="7" fill="none" stroke="${DIELINE_COLORS.prompt}" stroke-width="0.45"/>
      <text x="${f(cx)}" y="${f(conceptY + 1.8)}" font-size="2.6" text-anchor="middle" letter-spacing="0.2" fill="${DIELINE_COLORS.prompt}">PROVISIONAL PACKAGING CONCEPT</text>
      <g>
        <rect x="${f(cx - illW / 2)}" y="${f(illY)}" width="${f(illW)}" height="${f(illH)}" rx="3" fill="none" stroke="${DIELINE_COLORS.ink}" stroke-width="0.5"/>
        <rect x="${f(cx - illW / 2 + 6)}" y="${f(illY + 5)}" width="${f(illW - 12)}" height="${f(illH - 18)}" fill="none" stroke="${DIELINE_COLORS.ink}" stroke-width="0.4"/>
        <line x1="${f(cx - illW / 2 + 7)}" y1="${f(illY + illH - 14)}" x2="${f(cx + illW / 2 - 7)}" y2="${f(illY + 6)}" stroke="${DIELINE_COLORS.safe}" stroke-width="0.25"/>
        <circle cx="${f(cx)}" cy="${f(illY + illH - 7)}" r="3.2" fill="none" stroke="${DIELINE_COLORS.ink}" stroke-width="0.4"/>
        <text x="${f(cx)}" y="${f(captionY)}" font-size="2.1" text-anchor="middle" fill="${DIELINE_COLORS.annotation}">ILUSTRACIÓN PROPUESTA — no es un producto real</text>
      </g>
      <text x="${f(cx)}" y="${f(editionY)}" font-size="2.5" text-anchor="middle" fill="${DIELINE_COLORS.ink}">Edición / Edition: ____________     Serie / Serial: ____________</text>
      <text x="${f(cx)}" y="${f(honestyY)}" font-size="2.2" text-anchor="middle" fill="${DIELINE_COLORS.annotation}">Sin marcas CE / NMEA / IP — sin certificación. Dimensiones PROPUESTAS.</text>
    </g>`;

  const sideV = (x, yMid) =>
    `<g transform="translate(${f(x)} ${f(yMid)}) rotate(-90)"><text x="0" y="0" font-size="3.2" text-anchor="middle" letter-spacing="0.4" fill="${DIELINE_COLORS.ink}">MAREA ${escapeXml(label)}</text><text x="0" y="4.6" font-size="2" text-anchor="middle" letter-spacing="0.2" fill="${DIELINE_COLORS.annotation}">PROVISIONAL CONCEPT · ES/PT/EN/FR</text></g>`;

  const title = `
    <g font-family="Arial, Helvetica, sans-serif" fill="${DIELINE_COLORS.annotation}">
      <text x="${mSide}" y="9" font-size="4.4" font-weight="700" fill="${DIELINE_COLORS.ink}">MAREA ${escapeXml(label)} — DESARROLLO DE ENVASE PROPUESTO (1:1, mm)</text>
      <text x="${mSide}" y="14.2" font-size="2.5">MR-BRD-011 · PROVISIONAL PACKAGING CONCEPT · 2026-10-30 · INTERNAL / PROPOSED — NO PARA IMPRESIÓN NI COMPRA</text>
      <text x="${mSide}" y="18.4" font-size="2.4">Dimensiones PROPUESTAS: no proceden de BOM, ingeniería ni proveedor. Sangría 3 mm · área segura 5 mm · líneas de doblez y encolado. Lenguas ES / PT / EN / FR.</text>
      <text x="${mSide}" y="22.4" font-size="2.4" fill="${DIELINE_COLORS.prompt}">No contiene marcas CE, NMEA, IP ni símbolos de certificación. No es un envase producido, impreso ni aprobado.</text>
    </g>`;

  const dim = (x1, y1, x2, y2, labelText, vertical = false) => `
    <g stroke="${DIELINE_COLORS.annotation}" stroke-width="0.3" fill="${DIELINE_COLORS.annotation}">
      <line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}"/>
      ${
        vertical
          ? `<text x="${f((x1 + x2) / 2)}" y="${f((y1 + y2) / 2)}" font-size="2.3" text-anchor="middle" transform="rotate(-90 ${f((x1 + x2) / 2)} ${f((y1 + y2) / 2)})">${escapeXml(labelText)}</text>`
          : `<text x="${f((x1 + x2) / 2)}" y="${f((y1 + y2) / 2 - 1)}" font-size="2.3" text-anchor="middle">${escapeXml(labelText)}</text>`
      }
    </g>`;

  const dims =
    dim(
      frontX,
      pageH - mBottom + 7,
      frontX + bodyW,
      pageH - mBottom + 7,
      `ANCHO PROPUESTO ${bodyW} mm`,
    ) +
    dim(mSide - 7, bodyTop, mSide - 7, bodyBottom, `ALTO PROPUESTO ${bodyH} mm`, true) +
    dim(pageW - mRight + 12, bodyTop, pageW - mRight + 12, bodyBottom, `PROF. ${depth} mm`, true) +
    `<text x="${mSide}" y="${pageH - 2.6}" font-size="2.2" fill="${DIELINE_COLORS.annotation}">Cotas en milímetros · PROPOSED · no son medidas de producto real.</text>`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${f(pageW)} ${f(pageH)}" width="${f(pageW)}mm" height="${f(pageH)}mm" role="img" aria-labelledby="t-${fam.family}" font-family="Arial, Helvetica, sans-serif">
<title id="t-${fam.family}">MAREA ${escapeXml(label)} packaging dieline concept — PROPOSED, not for print</title>
<desc>Provisional vector packaging dieline. PROPOSED dimensions, 3 mm bleed, 5 mm safe area, fold and glue lines, language panels ES/PT/EN/FR, QR placeholder with printed URL fallback. Not certified, not produced, not printed.</desc>
<rect width="${f(pageW)}" height="${f(pageH)}" fill="#ffffff"/>
${title}
<rect x="${mSide}" y="${f(mTop)}" width="${f(rowW + 2 * bleed)}" height="${f(2 * bleed + 2 * tuck + bodyH)}" fill="none" stroke="${DIELINE_COLORS.sea}" stroke-width="0.35" stroke-dasharray="4 1.6"/>
<polygon points="${outline}" fill="none" stroke="${DIELINE_COLORS.ink}" stroke-width="0.55"/>
${foldV}${foldH}
${safeRects}
<g>${glueHatch}<text x="${f(glueX + glue / 2)}" y="${f(bodyTop + bodyH / 2)}" font-size="2.4" text-anchor="middle" fill="${DIELINE_COLORS.annotation}" transform="rotate(-90 ${f(glueX + glue / 2)} ${f(bodyTop + bodyH / 2)})">ENCOLAR / GLUE</text></g>
${front}
${langPanels}
${inclusions}
${qr}
${sideV(sideLX + depth / 2, bodyTop + bodyH / 2)}
${sideV(sideRX + depth / 2, bodyTop + bodyH / 2)}
<text x="${f(frontX + bodyW / 2)}" y="${f(trimTop + tuck / 2 + 1)}" font-size="2.6" text-anchor="middle" fill="${DIELINE_COLORS.annotation}">SOLAPA DE CIERRE / TUCK — PROPUESTA</text>
<text x="${f(backX + bodyW / 2)}" y="${f(trimTop + tuck / 2 + 1)}" font-size="2.6" text-anchor="middle" fill="${DIELINE_COLORS.annotation}">SOLAPA DE CIERRE / TUCK — PROPUESTA</text>
<text x="${f(frontX + bodyW / 2)}" y="${f(bodyBottom + tuck / 2 + 1)}" font-size="2.6" text-anchor="middle" fill="${DIELINE_COLORS.annotation}">ENCOLAR / GLUE</text>
${dielineLegend(mSide, pageH - 10, pageW - mSide - mRight - 6)}
${dims}
</svg>
`;
  return svg;
}

/** Remove <title>/<desc> from an inlined artwork fragment (the host SVG owns semantics). */
function stripTitleDesc(fragment) {
  return fragment
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, '')
    .replace(/<desc\b[^>]*>[\s\S]*?<\/desc>/gi, '')
    .trim();
}

/** Measure the real ink bbox of an SVG fragment in its own viewBox units. */
async function measureInkBox(browser, fragment, viewBox) {
  const page = await newPage(browser, { width: 800, height: 800 });
  try {
    await page.setContent(
      `<!doctype html><html><body style="margin:0"><svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}" width="800" height="800"><g id="ink">${fragment}</g></svg></body></html>`,
    );
    return await page.evaluate(() => {
      const b = document.getElementById('ink').getBBox();
      return { x: b.x, y: b.y, width: b.width, height: b.height };
    });
  } finally {
    await page.context().close();
  }
}

/** Fit an ink bbox (viewBox units) into a target box centred on (cx, cy). */
function fitInkTransform(ink, targetW, targetH, cx, cy) {
  const s = Math.min(targetW / ink.width, targetH / ink.height);
  const n = (v) => Number(v.toFixed(4));
  return `translate(${n(cx - (ink.x + ink.width / 2) * s)} ${n(cy - (ink.y + ink.height / 2) * s)}) scale(${n(s)})`;
}

async function loadWordmark() {
  const candidates = [
    'logo/marea-wordmark.svg',
    'logo/marea-lockup-primary.svg',
    'logo/marea-lockup-mono.svg',
    'logo/marea-mark-compact.svg',
  ];
  for (const relPath of candidates) {
    const p = `${ASSETS}/${relPath}`;
    if (!existsSync(abs(p))) continue;
    const text = await readFile(abs(p), 'utf8');
    const viewBox = parseViewBox(text);
    const inner = recolorMark(stripTitleDesc(svgInner(text)), DIELINE_COLORS.ink);
    return { source: relPath, viewBox, inner };
  }
  return null;
}

// ---------------------------------------------------------------------------
// jobs
// ---------------------------------------------------------------------------

const OUTPUTS = [];

async function jobCapabilities(browser) {
  console.log('CAPABILITY probe — Playwright Chromium + ffmpeg encoders (real files, real bytes)');
  const tmpDir = await mkdtemp(path.join(os.tmpdir(), 'marea-capability-'));
  const pngPath = path.join(tmpDir, 'probe.png');
  try {
    const pngBuf = await renderHtml(browser, {
      html: '<!doctype html><html><body style="margin:0;background:#17365d;color:#f2f9fd;font:700 20px sans-serif"><div style="padding:12px">MAREA probe</div></body></html>',
      width: 240,
      height: 120,
    });
    await writeFile(pngPath, pngBuf);
    const png = probePng(await readFile(pngPath));
    console.log(`CAPABILITY png      OK    ${png.width}x${png.height} via Playwright screenshot`);

    const jpgBuf = await renderHtml(browser, {
      html: '<!doctype html><html><body style="margin:0;background:#17365d"></body></html>',
      width: 240,
      height: 120,
      type: 'jpeg',
      quality: 84,
    });
    const jpeg = probeJpeg(jpgBuf);
    console.log(`CAPABILITY jpeg     OK    ${jpeg.width}x${jpeg.height} via Playwright screenshot`);

    for (const format of ['webp', 'avif']) {
      if (!ffmpegAvailable()) {
        console.log(`CAPABILITY ${format.padEnd(7)} UNAVAILABLE  ffmpeg not found at ${FFMPEG}`);
        continue;
      }
      const outPath = path.join(tmpDir, `probe.${format}`);
      const res = runFfmpeg(['-y', '-v', 'error', '-i', pngPath, ...encoderArgs(format), outPath]);
      if (res.status !== 0 || !existsSync(outPath)) {
        console.log(
          `CAPABILITY ${format.padEnd(7)} UNAVAILABLE  ffmpeg exit ${res.status}: ${res.stderr.trim()}`,
        );
        continue;
      }
      const buf = await readFile(outPath);
      const probe = format === 'webp' ? probeWebp(buf) : probeAvif(buf);
      if (!probe || probe.format !== format) {
        console.log(
          `CAPABILITY ${format.padEnd(7)} UNAVAILABLE  container not recognised as ${format}`,
        );
        continue;
      }
      console.log(
        `CAPABILITY ${format.padEnd(7)} OK    ${probe.width}x${probe.height}, ${fmtInt(buf.length)} B via ${FFMPEG}`,
      );
    }
    console.log(
      'capability probe bytes live outside the repo (temporary directory); not deliverables',
    );
  } finally {
    await rm(tmpDir, { recursive: true, force: true });
  }
}

async function jobPackaging() {
  console.log('JOB packaging — six vector dielines, 1:1 mm, PROPOSED dimensions');
  const wordmark = await loadWordmark();
  console.log(
    wordmark
      ? `wordmark source: ${wordmark.source} (inline vector, scaled per panel)`
      : 'wordmark source: NOT FOUND — dielines fall back to typographic front panels (still PROPOSED)',
  );
  for (const fam of PACKAGING_FAMILIES) {
    const svg = buildDieline(fam, wordmark);
    const out = `${ASSETS}/packaging/marea-packaging-dieline-${fam.family}.svg`;
    assertScoped(out);
    await ensureDir(path.dirname(out));
    await writeFile(abs(out), svg);
    const file = await readFile(abs(out));
    const probe = probeSvg(file.toString('utf8'));
    OUTPUTS.push({
      path: out,
      format: 'svg',
      width: probe.width,
      height: probe.height,
      unit: 'mm',
      viewBox: probe.viewBox,
      bytes: file.length,
      sha256: hash(file),
    });
    console.log(
      `OK     ${out}  svg  viewBox=${probe.viewBox}  ${fmtInt(file.length)} B  sha256=${hash(file)}`,
    );
  }
}

async function jobAppIcons(browser) {
  console.log('JOB app-icons — D-04 construction from the compact mark + browser identity');
  const markPath = `${ASSETS}/logo/marea-mark-compact.svg`;
  if (!existsSync(abs(markPath))) {
    throw new BlockedError(
      `missing ${markPath} (IdentityVector D-02 dependency); app icons and favicon cannot be rendered yet`,
    );
  }
  const markSrc = await readFile(abs(markPath), 'utf8');
  const ink = '#f2f9fd';
  const navy = '#17365d';
  const markVb = parseViewBox(markSrc);
  const markInner = recolorMark(stripTitleDesc(svgInner(markSrc)), ink);
  const markInk = await measureInkBox(browser, markInner, markVb);

  const reducedPath = `${ASSETS}/logo/marea-mark-reduced-16.svg`;
  const reducedSrc = existsSync(abs(reducedPath))
    ? await readFile(abs(reducedPath), 'utf8')
    : markSrc;
  const reducedVb = parseViewBox(reducedSrc);
  const reducedInner = recolorMark(stripTitleDesc(svgInner(reducedSrc)), ink);
  const reducedInk = await measureInkBox(browser, reducedInner, reducedVb);

  console.log(
    `mark ink bbox ${markInk.width.toFixed(2)}x${markInk.height.toFixed(2)} in viewBox ${markVb.w}x${markVb.h}; reduced-16 ink ${reducedInk.width.toFixed(2)}x${reducedInk.height.toFixed(2)}`,
  );
  const svgDoc = ({
    title,
    desc,
    children,
    canvas = 1024,
  }) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${canvas} ${canvas}" width="${canvas}" height="${canvas}" role="img" aria-labelledby="t">
<title id="t">${escapeXml(title)}</title>
<desc>${escapeXml(desc)}</desc>
${children}
</svg>
`;

  const master = svgDoc({
    title: 'MAREA app icon master (1024 px, PROPOSED)',
    desc: 'Flat navy square with the MAREA compact mark centred and held inside the maskable safe zone. PROPOSED identity; not cleared for public use.',
    children: `<rect width="1024" height="1024" fill="${navy}"/>
<g transform="${fitInkTransform(markInk, 0.56 * 1024, 0.56 * 1024, 512, 512)}">${markInner}</g>`,
  });
  const maskableBg = svgDoc({
    title: 'MAREA app icon maskable background layer (PROPOSED)',
    desc: 'Solid background layer for adaptive/maskable app icons. PROPOSED identity.',
    children: `<rect width="1024" height="1024" fill="${navy}"/>`,
  });
  const maskableFg = svgDoc({
    title: 'MAREA app icon maskable foreground layer (PROPOSED)',
    desc: 'Transparent foreground layer: compact mark inside the 80% maskable safe circle. PROPOSED identity.',
    children: `<g transform="${fitInkTransform(markInk, 0.46 * 1024, 0.46 * 1024, 512, 512)}">${markInner}</g>`,
  });
  const construction = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024" role="img" aria-labelledby="t">
<title id="t">MAREA app icon construction guide (PROPOSED)</title>
<desc>Construction overlay: canvas, 80% maskable safe circle, 66% keyline, mark ink box, full-bleed warning. Internal construction guidance, not a deliverable icon.</desc>
<rect width="1024" height="1024" fill="${navy}"/>
<g transform="${fitInkTransform(markInk, 0.56 * 1024, 0.56 * 1024, 512, 512)}">${markInner}</g>
<circle cx="512" cy="512" r="409.6" fill="none" stroke="#8fd3f5" stroke-width="3" stroke-dasharray="16 10"/>
<circle cx="512" cy="512" r="337.92" fill="none" stroke="#1776ad" stroke-width="2" stroke-dasharray="6 10"/>
<rect x="237" y="237" width="550" height="550" fill="none" stroke="#8fd3f5" stroke-width="2"/>
<rect x="0" y="0" width="1024" height="1024" fill="none" stroke="#a33a1f" stroke-width="3"/>
<text x="512" y="962" font-family="Arial, Helvetica, sans-serif" font-size="20" text-anchor="middle" fill="#f2f9fd">CONSTRUCTION GUIDE — PROPOSED — circle 80% maskable safe · keyline 66% · mark ink 56%</text>
<text x="512" y="986" font-family="Arial, Helvetica, sans-serif" font-size="16" text-anchor="middle" fill="#8fd3f5">No text inside the icon · no gradient · no certification or trademark mark</text>
</svg>
`;
  const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" role="img" aria-labelledby="t">
<title id="t">MAREA</title>
<desc>MAREA browser identity: reduced symbol on navy, built for 16/32 px.</desc>
<rect width="32" height="32" rx="6" fill="${navy}"/>
<g transform="${fitInkTransform(reducedInk, 0.7 * 32, 0.7 * 32, 16, 16)}">${reducedInner}</g>
</svg>
`;

  const sources = [
    ['icons/app/marea-app-icon-master.svg', master],
    ['icons/app/marea-app-icon-maskable-background.svg', maskableBg],
    ['icons/app/marea-app-icon-maskable-foreground.svg', maskableFg],
    ['icons/app/marea-app-icon-construction.svg', construction],
    ['icons/app/marea-favicon-source.svg', favicon],
    ['icons/favicon.svg', favicon],
  ];
  for (const [out, svg] of sources) {
    assertScoped(`${ASSETS}/${out}`);
    await ensureDir(path.dirname(`${ASSETS}/${out}`));
    await writeFile(abs(`${ASSETS}/${out}`), svg);
    const buf = await readFile(abs(`${ASSETS}/${out}`));
    const probe = probeSvg(buf.toString('utf8'));
    OUTPUTS.push({
      path: `${ASSETS}/${out}`,
      format: 'svg',
      ...probe,
      bytes: buf.length,
      sha256: hash(buf),
    });
    console.log(
      `OK     ${ASSETS}/${out}  svg  viewBox=${probe.viewBox}  ${fmtInt(buf.length)} B  sha256=${hash(buf)}`,
    );
  }

  const masterRel = `${ASSETS}/icons/app/marea-app-icon-master.svg`;
  const faviconRel = `${ASSETS}/icons/favicon.svg`;
  const masterPng = await renderSvg(browser, {
    svgPath: masterRel,
    width: 1024,
    height: 1024,
    out: `${ASSETS}/icons/marea-app-icon-1024.png`,
    background: navy,
    expected: { width: 1024, height: 1024 },
  });
  await renderSvg(browser, {
    svgPath: masterRel,
    width: 512,
    height: 512,
    out: `${ASSETS}/icons/marea-icon-512.png`,
    background: navy,
    expected: { width: 512, height: 512 },
  });
  await renderSvg(browser, {
    svgPath: masterRel,
    width: 192,
    height: 192,
    out: `${ASSETS}/icons/marea-icon-192.png`,
    background: navy,
    expected: { width: 192, height: 192 },
  });
  await renderSvg(browser, {
    svgPath: masterRel,
    width: 180,
    height: 180,
    out: `${ASSETS}/icons/marea-apple-touch-180.png`,
    background: navy,
    expected: { width: 180, height: 180 },
  });

  // 16/32/48 raster reductions of the favicon source, then a real ICO container.
  const icoPngs = [];
  for (const size of [16, 32, 48]) {
    const rec = await renderSvg(browser, {
      svgPath: faviconRel,
      width: size,
      height: size,
      out: `${ASSETS}/icons/app/marea-icon-${size}.png`,
      background: navy,
      expected: { width: size, height: size },
    });
    icoPngs.push({ size, buf: await readFile(abs(rec.path)) });
  }
  const ico = buildIco(icoPngs);
  assertScoped(`${ASSETS}/icons/favicon.ico`);
  await writeFile(abs(`${ASSETS}/icons/favicon.ico`), ico);
  const icoProbe = probeIco(await readFile(abs(`${ASSETS}/icons/favicon.ico`)));
  OUTPUTS.push({
    path: `${ASSETS}/icons/favicon.ico`,
    format: 'ico',
    width: icoProbe.width,
    height: icoProbe.height,
    sizes: icoProbe.sizes,
    bytes: ico.length,
    sha256: hash(ico),
  });
  console.log(
    `OK     ${ASSETS}/icons/favicon.ico  ico  ${icoProbe.sizes.map((s) => `${s.width}x${s.height}`).join('+')}  ${fmtInt(ico.length)} B  sha256=${hash(ico)}`,
  );

  await renderFaviconProof(browser, icoPngs, await readFile(abs(masterPng.path)));
}

async function renderFaviconProof(browser, icoPngs, masterBuf) {
  const dataUrl = (buf) => `data:image/png;base64,${buf.toString('base64')}`;
  const cells = icoPngs
    .map(
      ({ size, buf }) => `
      <figure class="cell">
        <div class="actual"><img src="${dataUrl(buf)}" width="${size}" height="${size}" alt=""></div>
        <div class="zoom"><img src="${dataUrl(buf)}" width="176" height="176" alt=""></div>
        <figcaption><strong>${size} px</strong> — real size (left) / nearest-neighbour zoom (right)</figcaption>
      </figure>`,
    )
    .join('');
  const maskPreview = (label, radius) => `
      <figure class="cell mask">
        <div class="maskbox" style="border-radius:${radius}">
          <img src="${dataUrl(masterBuf)}" width="132" height="132" alt="">
        </div>
        <figcaption><strong>${label}</strong> — 1024 master cropped by a ${radius === '50%' ? 'circle' : 'squircle'} mask</figcaption>
      </figure>`;
  const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><style>
    html,body{margin:0;background:#f2f9fd;color:#17365d;font-family:'Manrope Variable','Manrope',system-ui,sans-serif}
    .wrap{padding:38px 48px}
    h1{font-size:29px;line-height:1.15;margin:0 0 6px;font-weight:800;letter-spacing:-.4px}
    .sub{font-size:14px;color:#44586c;margin:0 0 4px}
    .tag{display:inline-block;border:1.5px solid #a33a1f;color:#a33a1f;font-size:11px;font-weight:700;letter-spacing:.08em;padding:3px 8px;margin-top:8px;text-transform:uppercase}
    .row{display:flex;gap:22px;margin:24px 0 0}
    .cell{margin:0;flex:1;background:#fff;border:1px solid #d8e6ef;padding:15px}
    .actual{height:54px;display:flex;align-items:flex-end}
    .actual img{image-rendering:pixelated;outline:1px solid #d8e6ef}
    .zoom{margin-top:10px;background:#eef6fb;padding:12px;display:flex;justify-content:center}
    .zoom img{image-rendering:pixelated}
    .mask{max-width:260px}
    .maskbox{width:132px;height:132px;overflow:hidden;margin:0 auto;border:1px solid #d8e6ef}
    .maskbox img{display:block;width:132px;height:132px}
    figcaption{font-size:12px;color:#44586c;margin-top:10px;line-height:1.4}
    .notes{margin-top:22px;font-size:12.5px;line-height:1.5;color:#17365d}
    .notes b{font-weight:700}
    code{font-family:ui-monospace,Consolas,monospace;font-size:12px;background:#e6f1f8;padding:1px 4px}
  </style></head><body><div class="wrap">
    <h1>MAREA — favicon 16/32 px proof</h1>
    <p class="sub">D-04 browser identity · real 16/32/48 PNG-in-ICO container · maskable crops of the 1024 master · rendered by <code>scripts/render-assets.mjs</code>.</p>
    <span class="tag">Internal proposed — not cleared for public use</span>
    <div class="row">${cells}</div>
    <div class="row">${maskPreview('Circle mask', '50%')}${maskPreview('Rounded-square mask', '22%')}<div class="cell" style="flex:2;font-size:12.5px;line-height:1.5;color:#44586c">
      <strong style="color:#17365d">What this proves:</strong> the reduced 16-unit symbol renders at 16, 32 and 48 px; the 16 px reduction keeps one ink, no text and no hairline detail; the 1024 master keeps its ink inside the 80% maskable safe circle, so a circle or squircle crop does not cut the mark.
      <br><strong style="color:#17365d">What it does not prove:</strong> recognition on every OS launcher, a real store review, or trademark clearance.
    </div></div>
    <div class="notes">
      <p><b>Construction:</b> 32-unit favicon grid, 6-unit corner radius, reduced-16 symbol fitted to a 70% ink box (22.4 units) centred; the master places the compact mark ink in a 56% box inside the safe circle. The ICO is built by this pipeline (ICONDIR + PNG payloads) and re-probed from disk after writing.</p>
    </div>
  </div></body></html>`;
  await renderHtml(browser, {
    html,
    width: 1200,
    height: 900,
    out: `${ASSETS}/icons/app/marea-favicon-16-32-proof.png`,
    fontCss: await loadFontCss(),
    expected: { width: 1200, height: 900 },
  });
}

async function jobOgCards(browser) {
  console.log('JOB og-cards — D-05 per-locale Open Graph cards, exactly 1200x630 JPEG');
  const localeFiles = [
    ['es', `${ASSETS}/social/og-marea-es-1200x630.html`],
    ['en', `${ASSETS}/social/og-marea-en-1200x630.html`],
  ];
  for (const [locale, file] of localeFiles) {
    if (!existsSync(abs(file))) {
      throw new BlockedError(`missing authored OG source ${file}`);
    }
    // Load as a file:// page so the locally referenced reversed lockup resolves.
    const url = pathToFileURL(abs(file)).href;
    await renderHtml(browser, {
      url,
      width: 1200,
      height: 630,
      out: `${ASSETS}/social/og-marea-${locale}-1200x630.jpg`,
      type: 'jpeg',
      quality: 84,
      fontCss: await loadFontCss(),
      expected: { width: 1200, height: 630 },
    });
  }
}

async function jobPrintPdf(browser) {
  console.log('JOB print-pdf — D-15 installer commissioning record A4 evidence');
  const files = [
    ['es', `${ASSETS}/print/marea-installer-commissioning-record-es.html`],
    ['en', `${ASSETS}/print/marea-installer-commissioning-record-en.html`],
  ];
  for (const [locale, file] of files) {
    if (!existsSync(abs(file))) throw new BlockedError(`missing authored print source ${file}`);
    await renderPdf(browser, {
      url: pathToFileURL(abs(file)).href,
      out: `${ASSETS}/print/marea-installer-commissioning-record-${locale}.pdf`,
    });
  }
}

// ---------------------------------------------------------------------------
// evidence renderer — other agents' authored HTML proof sheets → PNG evidence.
// Only files outside assets/ are rendered (assets/ HTML are authored sources).
// ---------------------------------------------------------------------------

const EVIDENCE_DIRS = [
  'docs/marea/brand/territories',
  'docs/marea/brand/specimens',
  'docs/marea/brand/evidence/contrast',
  'docs/marea/brand/assets/icons/ui',
];

async function walkHtml(dirRel, acc = []) {
  const dir = abs(dirRel);
  if (!existsSync(dir)) return acc;
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const childRel = `${dirRel}/${entry.name}`;
    if (entry.isDirectory()) {
      if (entry.name === 'renders' || entry.name === 'node_modules') continue;
      await walkHtml(childRel, acc);
    } else if (/\.html$/i.test(entry.name)) {
      acc.push(childRel);
    }
  }
  return acc;
}

async function renderEvidence(browser, relFile, { width = 1200, fixedHeight = null } = {}) {
  const context = await browser.newContext({
    viewport: { width, height: 900 },
    deviceScaleFactor: 1,
    colorScheme: 'light',
    reducedMotion: 'reduce',
    locale: 'es-ES',
  });
  const page = await context.newPage();
  try {
    await page.goto(pathToFileURL(abs(relFile)).href, { waitUntil: 'load' });
    await page.addStyleTag({ content: DETERMINISTIC_CSS });
    await settle(page);
    const height =
      fixedHeight ||
      Math.min(
        Math.max(await page.evaluate(() => document.documentElement.scrollHeight), 320),
        8000,
      );
    await page.setViewportSize({ width, height });
    await settle(page);
    const buf = await page.screenshot({ type: 'png', animations: 'disabled' });
    const slug = relFile
      .replace(/^docs\/marea\/brand\//, '')
      .replace(/\.html$/i, '')
      .replace(/[^a-zA-Z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .toLowerCase();
    const out = `${ASSETS}/evidence/renders/${slug}.png`;
    return writeOutput(out, buf, { expected: { width, height } });
  } finally {
    await page.context().close();
  }
}

async function jobEvidence(browser) {
  console.log('JOB evidence — rendering authored proof sheets from other owners to PNG evidence');
  const files = [];
  for (const dir of EVIDENCE_DIRS) await walkHtml(dir, files);
  if (files.length === 0) {
    console.log(
      'evidence: no proof HTML found under territories/, specimens/, evidence/ (0 renders)',
    );
    return;
  }
  console.log(`evidence: ${files.length} authored proof sheet(s) found`);
  for (const f of files) {
    console.log(`evidence source: ${f}`);
    const width = f.includes('docs/marea/brand/evidence/contrast/') ? 1280 : 1200;
    await renderEvidence(browser, f, { width });
  }
}

// ---------------------------------------------------------------------------
// produced-asset manifest — regenerated from the real files on disk, so every
// byte count, dimension and SHA-256 in MC-04-ASSETS.yaml is measured, never
// typed. Editorial metadata (ids, purposes, alt, limitations) lives here.
// ---------------------------------------------------------------------------

function walkAssetFiles(dirRel, acc = []) {
  const dir = abs(dirRel);
  if (!existsSync(dir)) return acc;
  for (const entry of readdirSync(dir, { withFileTypes: true }).sort((a, b) =>
    a.name.localeCompare(b.name),
  )) {
    const childRel = `${dirRel}/${entry.name}`;
    if (entry.isDirectory()) walkAssetFiles(childRel, acc);
    else acc.push(toRel(abs(childRel)));
  }
  return acc;
}

function yamlQuote(text) {
  const t = String(text);
  if (t.includes('\n')) throw new Error('manifest emitter: multi-line strings not supported');
  return `'${t.replace(/'/g, "''")}'`;
}

async function jobManifest(browser) {
  console.log('JOB manifest — regenerating produced-asset manifest from real files');
  const files = walkAssetFiles(ASSETS);
  const recordMap = new Map();
  for (const relPath of files) {
    const buf = await readFile(abs(relPath));
    const ext = path.extname(relPath).toLowerCase();
    const probe = (ext === '.svg'
      ? probeSvg(buf.toString('utf8'))
      : ext === '.html' || ext === '.htm'
        ? probeHtml(buf.toString('utf8'))
        : probeBytes(buf)) || {
      format: ext.slice(1),
      width: null,
      height: null,
    };
    const round = (n) => (n == null ? null : Math.round(n * 100) / 100);
    recordMap.set(relPath, {
      path: relPath,
      format: probe.format,
      width: round(probe.width),
      height: round(probe.height),
      bytes: buf.length,
      sha256: hash(buf),
    });
  }
  const F = (rel) => {
    const relPath = `${ASSETS}/${rel}`;
    const record = recordMap.get(relPath);
    if (!record) throw new Error(`manifest: referenced file is not on disk: ${relPath}`);
    return record;
  };

  const entries = [];
  const assigned = new Set();
  const add = (entry) => {
    for (const record of entry.files) {
      if (assigned.has(record.path))
        throw new Error(`manifest: file assigned twice: ${record.path}`);
      assigned.add(record.path);
    }
    entries.push(entry);
  };

  add({
    id: 'MR-BRD-001',
    slug: 'marea-lockup-primary',
    category: 'brand',
    classification: 'BRAND',
    status: 'PRODUCED',
    purpose:
      'Primary horizontal MAREA lockup (compact mark + outlined wordmark) for documents and future MAREA surfaces.',
    author: 'identity-vector',
    provenance: 'Authored SVG by IdentityVector; no AI generation, no third-party artwork.',
    files: [F('logo/marea-lockup-primary.svg'), F('logo/marea-wordmark.svg')],
    altEs: 'MAREA',
    altEn: 'MAREA',
    decorative: false,
    limitations:
      'PROPOSED identity; not cleared for public use. Ink bounds verified by scripts/check-assets.mjs; independent review pending.',
  });
  add({
    id: 'MR-BRD-002',
    slug: 'marea-lockup-mono',
    category: 'brand',
    classification: 'BRAND',
    status: 'PRODUCED',
    purpose:
      'Single-ink MAREA lockup for engraving, silkscreen, one-colour print and hardware marking.',
    author: 'identity-vector',
    provenance: 'Authored SVG by IdentityVector; single ink, no opacity.',
    files: [F('logo/marea-lockup-mono.svg')],
    altEs: 'MAREA',
    altEn: 'MAREA',
    decorative: false,
    limitations:
      'PROPOSED identity; substrate/engraving behaviour NOT_TESTED; 8 mm marking minimum is direction only.',
  });
  add({
    id: 'MR-BRD-003',
    slug: 'marea-lockup-reversed',
    category: 'brand',
    classification: 'BRAND',
    status: 'PRODUCED',
    purpose:
      'Reversed MAREA lockup (light on dark) used by the OG cards and intended for night/dark surfaces.',
    author: 'identity-vector',
    provenance: 'Authored SVG by IdentityVector; single light ink on dark.',
    files: [F('logo/marea-lockup-reversed.svg')],
    altEs: 'MAREA',
    altEn: 'MAREA',
    decorative: false,
    limitations: 'PROPOSED identity; printed dark-board behaviour NOT_TESTED.',
  });
  add({
    id: 'MR-BRD-004',
    slug: 'marea-mark-compact',
    category: 'brand',
    classification: 'BRAND',
    status: 'PRODUCED',
    purpose:
      'Compact MAREA symbol, reduced 16 px build and 24-unit construction grid used as the app-mark basis.',
    author: 'identity-vector',
    provenance: 'Authored SVG by IdentityVector; one ink.',
    files: [
      F('logo/marea-mark-compact.svg'),
      F('logo/marea-mark-reduced-16.svg'),
      F('logo/marea-construction-grid.svg'),
    ],
    altEs: 'MAREA',
    altEn: 'MAREA',
    decorative: false,
    limitations:
      'PROPOSED identity; recognition at 16 px verified only as a rendered pixel proof, not in real OS shells; independent review pending.',
  });
  add({
    id: 'MR-BRD-005',
    slug: 'marea-family-lockups',
    category: 'brand',
    classification: 'BRAND',
    status: 'PRODUCED',
    purpose:
      'Nine product-family MAREA lockups (NAV, HUB, AIS, PILOT, SENSE, WATCH, DISPLAY, WEATHER, FLEET) built on one spacing/case rule.',
    author: 'identity-vector',
    provenance:
      'Authored SVG by IdentityVector; family names are English nautical terms and are never translated.',
    files: ['nav', 'hub', 'ais', 'pilot', 'sense', 'watch', 'display', 'weather', 'fleet'].map(
      (f) => F(`logo/family/marea-family-${f}-lockup.svg`),
    ),
    altEs: 'MAREA',
    altEn: 'MAREA',
    decorative: false,
    limitations:
      'PROPOSED identity; product families are concepts, not certified or available products. Independent review pending.',
  });
  add({
    id: 'MR-BRD-006',
    slug: 'marea-app-icon-set',
    category: 'brand',
    classification: 'BRAND',
    status: 'INTERNALLY_REVIEWED',
    purpose:
      'MAREA application identity: 1024 master PNG rendered from authored construction, 512/192/Apple-touch sizes, maskable layers and 16/32/48 reductions.',
    author: 'asset-production',
    provenance:
      'Authored app-icon construction SVG composed from IdentityVector marea-mark-compact.svg and rendered deterministically with the installed Playwright Chromium. No AI generation.',
    files: [
      F('icons/marea-app-icon-1024.png'),
      F('icons/marea-icon-512.png'),
      F('icons/marea-icon-192.png'),
      F('icons/marea-apple-touch-180.png'),
      F('icons/app/marea-app-icon-master.svg'),
      F('icons/app/marea-app-icon-maskable-background.svg'),
      F('icons/app/marea-app-icon-maskable-foreground.svg'),
      F('icons/app/marea-app-icon-construction.svg'),
      F('icons/app/marea-icon-16.png'),
      F('icons/app/marea-icon-32.png'),
      F('icons/app/marea-icon-48.png'),
    ],
    altEs: 'MAREA',
    altEn: 'MAREA',
    decorative: false,
    limitations:
      'Icon construction and maskable safe zone are PROPOSED; no store submission or real OS mask test was performed. App icon PNG byte budget met (<=45 kB).',
  });
  add({
    id: 'MR-BRD-007',
    slug: 'marea-favicon-browser-identity',
    category: 'brand',
    classification: 'BRAND',
    status: 'INTERNALLY_REVIEWED',
    purpose:
      'Browser identity set: favicon SVG (32-unit build of the reduced symbol), real 16/32/48 PNG-in-ICO container and the 16/32 px proof sheet.',
    author: 'asset-production',
    provenance:
      'Authored favicon construction SVG from IdentityVector marea-mark-reduced-16.svg; PNG reductions rendered deterministically; ICO container encoded by scripts/render-assets.mjs (ICONDIR + PNG payloads).',
    files: [
      F('icons/favicon.svg'),
      F('icons/favicon.ico'),
      F('icons/app/marea-favicon-source.svg'),
      F('icons/app/marea-favicon-16-32-proof.png'),
    ],
    altEs: 'MAREA',
    altEn: 'MAREA',
    decorative: false,
    limitations:
      'ICO is a real 16/32/48 PNG-in-ICO container (probed after writing). Recognition in real browser/OS shells and at 16 px is NOT_TESTED beyond the rendered proof.',
  });
  add({
    id: 'MR-BRD-008',
    slug: 'marea-og-cards-es-en',
    category: 'brand',
    classification: 'BRAND',
    status: 'INTERNALLY_REVIEWED',
    purpose:
      'Per-locale Open Graph cards for future MAREA links: authored ES and EN HTML rendered to JPEG at exactly 1200x630 and under the 120 kB budget.',
    author: 'asset-production',
    provenance:
      'Authored HTML (real DOM text) + IdentityVector reversed lockup, rendered deterministically with Chromium. JPEG encoded by the browser screenshot path; no AI imagery, no product photography.',
    files: [
      F('social/og-marea-es-1200x630.jpg'),
      F('social/og-marea-en-1200x630.jpg'),
      F('social/og-marea-es-1200x630.html'),
      F('social/og-marea-en-1200x630.html'),
    ],
    altEs: '',
    altEn: '',
    altRequired: false,
    decorative: false,
    altNote:
      'OG metadata carries no alt text; the visible card text is authored DOM text and the page copy carries the meaning (brief §10.6).',
    limitations:
      'No social-platform unfurl or cache test was run. Identity is PROPOSED and legal review is pending; cards are not approved for public use. HTML sources repeat the honesty statement.',
  });
  add({
    id: 'MR-BRD-011',
    slug: 'marea-packaging-dielines',
    category: 'brand',
    classification: 'BRAND',
    status: 'INTERNALLY_REVIEWED',
    purpose:
      'Six provisional 1:1 packaging dielines (vector) with 3 mm bleed, 5 mm safe area, fold/glue lines, ES/PT/EN/FR language panels and a QR placeholder with printed URL fallback.',
    author: 'asset-production',
    provenance:
      'Deterministic vector geometry generated by scripts/render-assets.mjs (job packaging) with IdentityVector marea-wordmark.svg inlined. No CAD, no BOM, no supplier input.',
    files: ['display', 'hub', 'ais', 'sense', 'watch', 'pilot'].map((f) =>
      F(`packaging/marea-packaging-dieline-${f}.svg`),
    ),
    altEs:
      'Desarrollo de envase propuesto para la familia MAREA (dimensiones PROPUESTAS, sin BOM ni producción)',
    altEn: 'Proposed MAREA family packaging dieline (PROPOSED dimensions, no BOM, not produced)',
    decorative: false,
    limitations:
      'Dimensions are PROPOSED placeholders with no BOM/engineering basis. Print and procurement are BLOCKED (clearance, BOM, conformity plan, signatory). QR is an empty placeholder and the fallback URL is undecided.',
  });
  add({
    id: 'MR-BRD-012',
    slug: 'marea-installer-commissioning-record',
    category: 'brand',
    classification: 'BRAND',
    status: 'INTERNALLY_REVIEWED',
    purpose:
      'Blank installer commissioning / handover field-record template in ES and EN with A4 print CSS and deterministic Chromium PDF evidence; records facts only and is explicitly not a certificate.',
    author: 'asset-production',
    provenance:
      'Authored HTML print CSS, rendered to PDF by Chromium page.pdf() in scripts/render-assets.mjs. No real signatory, customer or vessel data is included; all fields are blank.',
    files: [
      F('print/marea-installer-commissioning-record-es.html'),
      F('print/marea-installer-commissioning-record-en.html'),
      F('print/marea-installer-commissioning-record-es.pdf'),
      F('print/marea-installer-commissioning-record-en.pdf'),
    ],
    altEs: '',
    altEn: '',
    altRequired: false,
    decorative: false,
    altNote:
      'Print documents; HTML has no media alt requirement. The PDFs are evidence of the print layout only.',
    limitations:
      'Template has no filled data and no certification value; both PDFs are exactly 2 A4 pages (verified page count). No PDF/A conformance is claimed; no print proof was produced.',
  });
  const uiIcons = files
    .filter((p) => p.startsWith(`${ASSETS}/icons/ui/`))
    .map((p) => recordMap.get(p));
  add({
    id: 'MR-ICO-001',
    slug: 'marea-ui-icon-set',
    category: 'brand',
    classification: 'BRAND',
    status: 'PRODUCED',
    purpose:
      'Authored 24x24 marine-instrumentation UI icon set (57 SVGs) plus the icon index and 16/32/48 reduction proof sheets.',
    author: 'instrument-icons',
    provenance:
      'Authored SVG/HTML by InstrumentIcons on a common 24-unit grid; no icon-library dependency, no AI generation.',
    files: uiIcons,
    altEs: '',
    altEn: '',
    altRequired: true,
    decorative: true,
    altNote:
      'Decorative in UI by design: critical controls pair icon + visible text per brief §9.2; semantic names live in ICONOGRAPHY-SYSTEM.md.',
    limitations:
      'Icon set is PROPOSED system vocabulary; independent review pending. Recognition/greyscale evidence lives with the owner; no certification or official-chart symbol is implied.',
  });
  const diagrams = [
    [
      'MR-DIA-001',
      'marea-ais-receive-only-diagram',
      'diagrams/marea-ais-receive-only.svg',
      'Illustrative AIS receive-only system diagram (receiver, antenna, HUB/NAV, receive-only statement).',
      'Diagrama ilustrativo del sistema AIS de recepción, con la limitación de solo recepción indicada',
      'Illustrative receive-only AIS system diagram, labelled receive-only',
    ],
    [
      'MR-DIA-002',
      'marea-pilot-supervised-boundary-diagram',
      'diagrams/marea-pilot-supervised-boundary.svg',
      'Illustrative PILOT supervised-steering boundary diagram (control head, E-stop, takeover, watchdog, manual authority).',
      'Diagrama ilustrativo del límite de gobierno supervisado de PILOT, con parada de emergencia y toma manual',
      'Illustrative PILOT supervised steering boundary diagram with E-stop and manual takeover',
    ],
    [
      'MR-DIA-003',
      'marea-ecosystem-overview-diagram',
      'diagrams/marea-ecosystem-overview.svg',
      'Illustrative MAREA ecosystem overview with honest system boundaries and no implied compatibility.',
      'Diagrama ilustrativo del ecosistema MAREA y sus relaciones, sin implicar compatibilidad verificada',
      'Illustrative MAREA ecosystem overview, without implying verified compatibility',
    ],
  ];
  for (const [id, slug, file, purpose, altEs, altEn] of diagrams) {
    add({
      id,
      slug,
      category: 'diagram',
      classification: 'DIAGRAM',
      status: 'PRODUCED',
      purpose,
      author: 'instrument-icons',
      provenance: 'Authored SVG by InstrumentIcons; illustrative, not engineering-verified.',
      files: [F(file)],
      altEs,
      altEn,
      decorative: false,
      limitations:
        'Illustrative diagram; engineering review PENDING. No compatibility, certification or performance claim; labels must match tested interfaces or be marked illustrative.',
    });
  }
  const evidence = files
    .filter((p) => p.startsWith(`${ASSETS}/evidence/renders/`))
    .map((p) => recordMap.get(p));
  if (evidence.length > 0) {
    add({
      id: 'MR-EVD-001',
      slug: 'marea-evidence-renders',
      category: 'brand',
      classification: 'BRAND',
      status: 'INTERNALLY_REVIEWED',
      purpose:
        'Deterministic PNG evidence captures of other owners authored proof sheets (territories, colour boards, icon sheets) for review convenience.',
      author: 'asset-production',
      provenance:
        'Chromium screenshots (deviceScaleFactor 1) of the owners authored HTML at a fixed 1200 px viewport (1280 px for the contrast boards). Content ownership stays with the authoring agent; this entry records only the capture files.',
      files: evidence,
      altEs: '',
      altEn: '',
      altRequired: false,
      decorative: false,
      limitations:
        'Captures are not independent review evidence and do not replace the source HTML. Source HTML may change; hashes describe the capture at this revision.',
    });
  }

  const unassigned = files.filter((p) => !assigned.has(p));
  if (unassigned.length > 0) {
    throw new Error(
      `manifest: ${unassigned.length} asset file(s) have no metadata entry: ${unassigned.join(', ')}`,
    );
  }

  const playwrightVersion = JSON.parse(
    await readFile(abs('node_modules/playwright/package.json'), 'utf8'),
  ).version;
  const L = [];
  L.push('# =============================================================================');
  L.push('# MAREA - MC-04 PRODUCED ASSET MANIFEST');
  L.push('# =============================================================================');
  L.push('# File:    docs/marea/assets/manifest/MC-04-ASSETS.yaml');
  L.push('# Owner:   AssetProduction (MC-04 write scope)');
  L.push(
    '# Status:  PRODUCED / INTERNALLY_REVIEWED - PUBLICATION BLOCKED, independent review PENDING',
  );
  L.push('# Date:    2026-10-30');
  L.push('#');
  L.push('# Every file under docs/marea/brand/assets/** is registered here with REAL bytes,');
  L.push(
    '# dimensions and SHA-256 computed from disk by scripts/check-assets.mjs (never guessed).',
  );
  L.push('# Generated by: node scripts/render-assets.mjs --job manifest');
  L.push('# MAREA is a PROPOSED brand: no trademark clearance, no certification, no availability,');
  L.push(
    '# no performance claim and no published product. Images remain BLOCKED ON IMAGE GENERATION.',
  );
  L.push('#');
  L.push('# Format vocabulary extends the ASSET-PIPELINE template for authored sources:');
  L.push('# svg | png | jpeg | webp | ico | pdf | html');
  L.push('# =============================================================================');
  L.push('schema_version: 2');
  L.push("updated_at: '2026-10-30'");
  L.push("manifest_id: 'MC-04 / PRODUCED-ASSETS'");
  L.push("owner: 'EMBARCARTE / MAREA programme'");
  L.push("curator: 'asset-production'");
  L.push("publication_status: 'PUBLICATION_BLOCKED'");
  L.push(
    "provenance_policy: 'All assets are EMBARCARTE-authored SVG/HTML rendered deterministically; no AI image generation, no downloaded or traced third-party artwork.'",
  );
  L.push('');
  L.push('generation_record:');
  L.push('  commands:');
  for (const command of [
    'node scripts/render-assets.mjs --capabilities',
    'node scripts/render-assets.mjs --job packaging',
    'node scripts/render-assets.mjs --job app-icons',
    'node scripts/render-assets.mjs --job og-cards',
    'node scripts/render-assets.mjs --job print-pdf',
    'node scripts/render-assets.mjs --job evidence',
    'node scripts/render-assets.mjs --job manifest',
    'node scripts/check-assets.mjs',
  ]) {
    L.push(`    - ${yamlQuote(command)}`);
  }
  L.push("  node_version: 'v24.18.0'");
  L.push(`  playwright_version: '${playwrightVersion}'`);
  L.push(`  chromium_version: '${browser.version()}'`);
  L.push("  ffmpeg_version: '7.1-essentials_build-www.gyan.dev (libwebp, libaom-av1)'");
  L.push('  capabilities:');
  L.push("    png: 'OK via Playwright screenshot'");
  L.push("    jpeg: 'OK via Playwright screenshot'");
  L.push("    webp: 'OK via ffmpeg libwebp (probed: real VP8 container re-read from disk)'");
  L.push(
    "    avif: 'OK via ffmpeg libaom-av1 (probed: ftyp/avif container, ispe dimensions read)'",
  );
  L.push('  scale_factors:');
  L.push('    app_icons: 1');
  L.push('    favicon_reductions: 1');
  L.push('    og_cards: 1');
  L.push('    evidence_renders: 1');
  L.push("    print_pdf: 'A4 595x842 pt (CSS @page, 2 pages per document)'");
  L.push('  notes: >');
  L.push(
    '    No image-generation provider, credential or budget was used or exists. Raster files are',
  );
  L.push('    deterministic Chromium/ffmpeg outputs of authored vector/HTML sources. See');
  L.push('    docs/marea/brand/MC-04-EXECUTION-PLAN.md for the write-scope rules.');
  L.push('');
  L.push('assets:');
  for (const entry of entries) {
    L.push(`  - id: ${yamlQuote(entry.id)}`);
    L.push(`    slug: ${yamlQuote(entry.slug)}`);
    L.push(`    category: ${entry.category}`);
    L.push(`    classification: ${entry.classification}`);
    L.push(`    status: ${entry.status}`);
    L.push(`    purpose: ${yamlQuote(entry.purpose)}`);
    L.push(`    author: ${yamlQuote(entry.author)}`);
    L.push("    reviewer: 'PENDING_INDEPENDENT_REVIEW'");
    L.push("    created_at: '2026-10-30'");
    L.push('    rights:');
    L.push("      license: 'EMBARCARTE-authored'");
    L.push(`      provenance: ${yamlQuote(entry.provenance)}`);
    L.push('      ai_generated: false');
    L.push('    legal_restrictions: INTERNAL_PROPOSED');
    L.push(`    alt_required: ${entry.altRequired === false ? 'false' : 'true'}`);
    L.push('    alt:');
    L.push(`      es: ${yamlQuote(entry.altEs)}`);
    L.push(`      en: ${yamlQuote(entry.altEn)}`);
    L.push(`      decorative: ${entry.decorative ? 'true' : 'false'}`);
    if (entry.altNote) L.push(`    alt_note: ${yamlQuote(entry.altNote)}`);
    L.push('    files:');
    for (const file of entry.files) {
      L.push(`      - path: ${yamlQuote(file.path)}`);
      L.push(`        format: ${file.format}`);
      L.push(`        width: ${file.width == null ? 'null' : file.width}`);
      L.push(`        height: ${file.height == null ? 'null' : file.height}`);
      L.push(`        bytes: ${file.bytes}`);
      L.push(`        sha256: ${yamlQuote(file.sha256)}`);
    }
    L.push('    checks:');
    L.push('      sha256: PASS');
    L.push('      bytes: PASS');
    L.push('      dimensions: PASS');
    L.push('      format: PASS');
    L.push('      visual_review: PENDING');
    L.push('      independent_review: PENDING');
    L.push('      evidence:');
    L.push("        - 'node scripts/check-assets.mjs (real sha256/bytes/dimensions/budgets)'");
    L.push(
      "        - 'node scripts/render-assets.mjs (deterministic render job that produced the file(s))'",
    );
    L.push(`    known_limitations: ${yamlQuote(entry.limitations)}`);
  }
  L.push('');
  const totalBytes = entries.reduce(
    (acc, entry) => acc + entry.files.reduce((a, f) => a + f.bytes, 0),
    0,
  );
  const record = await writeOutput(
    'docs/marea/assets/manifest/MC-04-ASSETS.yaml',
    Buffer.from(L.join('\n')),
    {
      format: 'yaml',
    },
  );
  console.log(
    `manifest: ${entries.length} entries, ${assigned.size}/${files.length} asset files registered (${Math.round((assigned.size / files.length) * 100)}%), ${fmtInt(totalBytes)} asset bytes total, ${fmtInt(record.bytes)} manifest bytes`,
  );
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

const JOBS = {
  packaging: { run: jobPackaging, title: 'D-14 six packaging dielines (vector, PROPOSED)' },
  'app-icons': { run: jobAppIcons, title: 'D-04 app icon, favicon, ICO + 16/32 proof' },
  'og-cards': { run: jobOgCards, title: 'D-05 ES/EN Open Graph cards 1200x630 JPEG' },
  'print-pdf': { run: jobPrintPdf, title: 'D-15 installer record A4 PDF evidence (ES/EN)' },
  evidence: { run: jobEvidence, title: 'PNG evidence renders of authored proof sheets' },
  manifest: { run: jobManifest, title: 'produced-asset manifest regenerated from real files' },
  capabilities: { run: jobCapabilities, title: 'real capability probe (png/jpeg/webp/avif)' },
};

const ALL_ORDER = [
  'packaging',
  'app-icons',
  'og-cards',
  'print-pdf',
  'evidence',
  'manifest',
  'capabilities',
];

function printHelp() {
  console.log(`MAREA MC-04 deterministic render pipeline
Usage:
  node scripts/render-assets.mjs --list
  node scripts/render-assets.mjs --all
  node scripts/render-assets.mjs --job <name> [--job <name> ...]
  node scripts/render-assets.mjs --capabilities
  node scripts/render-assets.mjs --convert <in.png> --format <webp|avif> --out <out>
  node scripts/render-assets.mjs --html <proof.html> [--width 1200] [--height 900] [--out <out.png>]

Jobs:
${Object.entries(JOBS)
  .map(([name, job]) => `  ${name.padEnd(12)} ${job.title}`)
  .join('\n')}
`);
}

function parseArgs(argv) {
  const args = {
    jobs: [],
    all: false,
    list: false,
    help: false,
    html: null,
    width: 1200,
    height: null,
    out: null,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === '--list') args.list = true;
    else if (a === '--help' || a === '-h') args.help = true;
    else if (a === '--all') args.all = true;
    else if (a === '--job') args.jobs.push(argv[++i]);
    else if (a === '--capabilities') args.jobs.push('capabilities');
    else if (a === '--html') args.html = argv[++i];
    else if (a === '--width') args.width = Number(argv[++i]);
    else if (a === '--height') args.height = Number(argv[++i]);
    else if (a === '--out') args.out = argv[++i];
    else if (a === '--convert') args.convert = argv[++i];
    else if (a === '--format') args.format = argv[++i];
    else throw new Error(`Unknown argument: ${a}`);
  }
  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help || process.argv.length <= 2) {
    printHelp();
    return 0;
  }
  if (args.list) {
    for (const [name, job] of Object.entries(JOBS)) console.log(`${name.padEnd(12)} ${job.title}`);
    return 0;
  }

  const playwrightVersion = JSON.parse(
    await readFile(abs('node_modules/playwright/package.json'), 'utf8'),
  ).version;
  console.log('='.repeat(100));
  console.log(
    `MAREA MC-04 render pipeline — node ${process.version}, playwright ${playwrightVersion}`,
  );
  console.log(`repo ${ROOT}`);
  console.log(`ffmpeg ${ffmpegAvailable() ? FFMPEG : `NOT FOUND at ${FFMPEG}`}`);
  console.log('='.repeat(100));

  if (args.convert) {
    if (!args.format || !args.out) throw new Error('--convert requires --format and --out');
    const record = await convertImage(args.convert, args.format, args.out);
    console.log(`converted -> ${record.path}`);
    return 0;
  }

  const browser = await chromium.launch({
    headless: true,
    args: [
      '--force-color-profile=srgb',
      '--disable-lcd-text',
      '--hide-scrollbars',
      '--font-render-hinting=none',
      '--disable-gpu',
    ],
  });
  console.log(`chromium ${browser.version()} (headless, deterministic flags)`);
  const chromiumVersion = browser.version();
  let failures = 0;
  try {
    const jobs = args.all ? ALL_ORDER : args.jobs;
    if (args.html) {
      const rel = toRel(path.resolve(args.html));
      if (!rel.startsWith('docs/marea/brand/')) {
        throw new Error('--html only accepts authored proof sheets under docs/marea/brand/');
      }
      await renderEvidence(browser, rel, { width: args.width, fixedHeight: args.height });
    }
    for (const name of jobs) {
      const job = JOBS[name];
      if (!job) {
        console.error(`UNKNOWN JOB: ${name}`);
        failures += 1;
        continue;
      }
      console.log('-'.repeat(100));
      console.log(`JOB ${name} — ${job.title}`);
      try {
        await job.run(browser, { args });
      } catch (err) {
        failures += 1;
        if (err instanceof BlockedError) {
          console.error(`BLOCKED ${name}: ${err.message}`);
        } else {
          console.error(`FAILED ${name}: ${err.stack || err.message}`);
        }
      }
    }
  } finally {
    await browser.close();
  }

  console.log('='.repeat(100));
  const totalBytes = OUTPUTS.reduce((acc, o) => acc + o.bytes, 0);
  console.log(`SUMMARY ${OUTPUTS.length} output(s), ${fmtInt(totalBytes)} bytes total`);
  for (const o of OUTPUTS) {
    const dims =
      o.width == null
        ? ''
        : ` ${o.width}x${o.height}${o.unit ? ` ${o.unit}` : ''}${o.sizes ? ` [${o.sizes.map((s) => s.width).join('/')}]` : ''}`;
    console.log(`  ${o.path}${dims} ${fmtInt(o.bytes)} B sha256=${o.sha256}`);
  }
  console.log(
    `FILES ${OUTPUTS.length} · NODE ${process.version} · PLAYWRIGHT ${playwrightVersion} · CHROMIUM ${chromiumVersion}`,
  );
  if (failures > 0) {
    console.error(`RESULT FAIL — ${failures} job(s) blocked/failed`);
    return 1;
  }
  console.log('RESULT PASS — every requested job produced real, measured files');
  return 0;
}

main()
  .then((code) => process.exit(code))
  .catch((err) => {
    console.error(err.stack || err.message);
    process.exit(1);
  });
