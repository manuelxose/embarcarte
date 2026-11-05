#!/usr/bin/env node
/**
 * Independent raster / ICO / PDF measurement for MC-04 (reviewer-authored).
 * - PNG: decodes the IHDR chunk for real width/height.
 * - JPEG: walks the SOF0/SOF2 markers for real width/height.
 * - ICO: validates the header/type/count and lists the stored directory sizes.
 * - PDF: validates %PDF header / %%EOF, counts "/Type /Page" and reports metadata dates.
 * - WebP/AVIF: parses the container header for dimensions.
 * - Everything: byte size + SHA-256 computed here, not read from the manifest.
 * Writes JSON to argv[2].
 */
import { readFileSync, readdirSync, statSync, writeFileSync, existsSync } from 'node:fs';
import { join, relative, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../../../../..');
const OUT =
  process.argv[2] ??
  join(dirname(fileURLToPath(import.meta.url)), '..', 'raw', 'raster-audit.json');
const SCAN_DIRS = [
  'docs/marea/brand/assets',
];
const EXT = new Set(['.png', '.jpg', '.jpeg', '.ico', '.pdf', '.webp', '.avif', '.svg']);

function walk(dir, acc) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) walk(p, acc);
    else if (EXT.has(entry.name.toLowerCase().slice(entry.name.lastIndexOf('.')))) acc.push(p);
  }
  return acc;
}

function pngSize(buf) {
  if (buf.readUInt32BE(0) !== 0x89504e47 || buf.readUInt32BE(4) !== 0x0d0a1a0a) return null;
  if (buf.toString('latin1', 12, 16) !== 'IHDR') return null;
  return {
    width: buf.readUInt32BE(16),
    height: buf.readUInt32BE(20),
    bitDepth: buf[24],
    colorType: buf[25],
    hasAlphaChannel: buf[25] === 4 || buf[25] === 6,
    hasSRGBChunk: buf.includes(Buffer.from('sRGB', 'latin1')),
    hasEXIF: buf.includes(Buffer.from('eXIf', 'latin1')),
  };
}

function jpegSize(buf) {
  if (buf[0] !== 0xff || buf[1] !== 0xd8) return null;
  let i = 2;
  while (i < buf.length - 9) {
    if (buf[i] !== 0xff) {
      i += 1;
      continue;
    }
    const marker = buf[i + 1];
    if (marker === 0xd8 || marker === 0xd9 || (marker >= 0xd0 && marker <= 0xd7) || marker === 0x01) {
      i += 2;
      continue;
    }
    const len = buf.readUInt16BE(i + 2);
    if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) {
      return {
        width: buf.readUInt16BE(i + 7),
        height: buf.readUInt16BE(i + 5),
        components: buf[i + 9],
        progressive: marker === 0xc2,
        hasAPP1EXIF: buf.toString('latin1', 0, Math.min(4096, buf.length)).includes('Exif'),
        hasAPP14Adobe: buf.toString('latin1', 0, Math.min(4096, buf.length)).includes('Adobe'),
      };
    }
    i += 2 + len;
  }
  return null;
}

function icoInfo(buf) {
  if (buf.length < 6) return { valid: false, reason: 'too short' };
  const reserved = buf.readUInt16LE(0);
  const type = buf.readUInt16LE(2);
  const count = buf.readUInt16LE(4);
  const entries = [];
  for (let n = 0; n < count && 6 + n * 16 + 16 <= buf.length; n += 1) {
    const off = 6 + n * 16;
    entries.push({
      width: buf[off] === 0 ? 256 : buf[off],
      height: buf[off + 1] === 0 ? 256 : buf[off + 1],
      colors: buf[off + 2],
      planes: buf.readUInt16LE(off + 4),
      bpp: buf.readUInt16LE(off + 6),
      bytes: buf.readUInt32LE(off + 8),
      dataOffset: buf.readUInt32LE(off + 12),
    });
  }
  const entriesInBounds = entries.every((e) => e.dataOffset + e.bytes <= buf.length);
  return {
    valid: reserved === 0 && type === 1 && count > 0 && entries.length === count && entriesInBounds,
    reserved,
    type,
    count,
    entries,
    entriesInBounds,
  };
}

function pdfInfo(buf) {
  const head = buf.toString('latin1', 0, 8);
  const tail = buf.toString('latin1', Math.max(0, buf.length - 64));
  const text = buf.toString('latin1');
  const pageCount = (text.match(/\/Type\s*\/Page[^s]/g) ?? []).length;
  return {
    header: head,
    hasHeader: head.startsWith('%PDF-'),
    version: (head.match(/%PDF-([\d.]+)/) ?? [])[1] ?? null,
    hasEOF: /%%EOF\s*$/.test(tail.trim()) || tail.includes('%%EOF'),
    pageCount,
    hasEncrypt: /\/Encrypt\b/.test(text),
    hasJavaScript: /\/JavaScript\b|\/JS\b/.test(text),
    hasEmbeddedFiles: /\/EmbeddedFile\b/.test(text),
    hasAcroForm: /\/AcroForm\b/.test(text),
    producer: (text.match(/\/Producer\s*\(([^)]{0,120})\)/) ?? [])[1] ?? null,
    creator: (text.match(/\/Creator\s*\(([^)]{0,120})\)/) ?? [])[1] ?? null,
    creationDate: (text.match(/\/CreationDate\s*\(([^)]{0,60})\)/) ?? [])[1] ?? null,
    modificationDate: (text.match(/\/ModDate\s*\(([^)]{0,60})\)/) ?? [])[1] ?? null,
    bytes: buf.length,
  };
}

function webpAvifSize(buf, ext) {
  if (ext === '.webp' && buf.toString('latin1', 0, 4) === 'RIFF' && buf.toString('latin1', 8, 12) === 'WEBP') {
    const kind = buf.toString('latin1', 12, 16);
    if (kind === 'VP8X') {
      return { width: 1 + buf.readUIntLE(24, 3), height: 1 + buf.readUIntLE(27, 3), kind };
    }
    if (kind === 'VP8 ') {
      return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff, kind };
    }
    return { kind };
  }
  if (ext === '.avif' && buf.toString('latin1', 4, 12) === 'ftypavif') {
    return { container: 'ftyp avif' };
  }
  return null;
}

const files = [];
for (const dir of SCAN_DIRS) {
  const abs = join(ROOT, dir);
  if (existsSync(abs)) walk(abs, files);
}
const results = [];
for (const file of files.sort()) {
  const buf = readFileSync(file);
  const ext = file.slice(file.lastIndexOf('.')).toLowerCase();
  const rel = relative(ROOT, file).split('\\').join('/');
  const rec = {
    path: rel,
    ext,
    bytes: buf.length,
    sha256: createHash('sha256').update(buf).digest('hex'),
  };
  if (ext === '.png') rec.image = pngSize(buf);
  else if (ext === '.jpg' || ext === '.jpeg') rec.image = jpegSize(buf);
  else if (ext === '.ico') rec.ico = icoInfo(buf);
  else if (ext === '.pdf') rec.pdf = pdfInfo(buf);
  else if (ext === '.webp' || ext === '.avif') rec.image = webpAvifSize(buf, ext);
  rec.ok =
    (ext === '.png' && rec.image) ||
    ((ext === '.jpg' || ext === '.jpeg') && rec.image) ||
    (ext === '.ico' && rec.ico?.valid) ||
    (ext === '.pdf' && rec.pdf?.hasHeader && rec.pdf?.hasEOF) ||
    (ext === '.svg') ||
    ((ext === '.webp' || ext === '.avif') && rec.image);
  results.push(rec);
}

const report = {
  generatedBy: 'docs/marea/brand/evidence/review/tools/raster-audit.mjs',
  generatedAt: new Date().toISOString(),
  scannedDirs: SCAN_DIRS,
  counts: results.reduce((acc, r) => {
    acc[r.ext] = (acc[r.ext] ?? 0) + 1;
    return acc;
  }, {}),
  problems: results.filter((r) => !r.ok).map((r) => ({ path: r.path, ext: r.ext, bytes: r.bytes })),
  files: results,
};
writeFileSync(OUT, JSON.stringify(report, null, 2), 'utf8');
console.log('counts:', JSON.stringify(report.counts));
console.log('problems:', JSON.stringify(report.problems));
for (const r of results) {
  if (r.ext === '.png' || r.ext === '.jpg' || r.ext === '.ico' || r.ext === '.pdf') {
    const dim = r.image ? `${r.image.width}x${r.image.height}` : r.ico ? `${r.ico.count} ico entries` : '';
    console.log(
      `${r.path} ${r.bytes}B ${r.sha256.slice(0, 16)} ${dim}${r.pdf ? ` pages~${r.pdf.pageCount} ${r.pdf.producer ?? ''}` : ''}`,
    );
  }
}
