#!/usr/bin/env node
/**
 * Deterministic typography verification for MC-04 (MAREA visual identity, T-1…T-10).
 *
 * What it does, with real evidence only:
 *  1. Reads the shipped licence text, package metadata and lockfile-derived package version of the
 *     installed @fontsource-variable packages (DM Sans = body/numeric, Manrope = display).
 *  2. Parses the ACTUAL .woff2 files (custom minimal WOFF2 table directory + brotli reader):
 *     cmap coverage, GSUB feature tags (`tnum`), fvar axes, name-table copyright/licence strings,
 *     head unitsPerEm and hmtx digit advances.
 *  3. Reads the shipped @font-face `unicode-range` declarations from the packages' CSS and checks
 *     every required character is BOTH present in the font's cmap and served by a declared range.
 *  4. Launches the installed Playwright Chromium, loads the real local .woff2 files over file:// and
 *     measures digit advance widths with `tnum` off/on and with `font-feature-settings: 'tnum' 1`,
 *     plus column alignment of real instrument strings. This is a measurement, not an assumption.
 *
 * It writes NO repo files. It prints a human summary plus a compact machine-readable JSON block and
 * exits non-zero if a hard requirement fails (glyph coverage, tabular figures, licence, load failure).
 *
 * Usage: node scripts/check-typography.mjs [--json]
 */
import { createHash } from 'node:crypto';
import { mkdtempSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { brotliDecompressSync } from 'node:zlib';
import { chromium } from '@playwright/test';

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(SCRIPT_DIR, '..');
const JSON_ONLY = process.argv.includes('--json');

const FONT_PACKAGES = [
  {
    id: 'dm-sans',
    dir: 'node_modules/@fontsource-variable/dm-sans',
    role: 'body text and instrument numerics',
    cssFamily: 'DM Sans Variable',
  },
  {
    id: 'manrope',
    dir: 'node_modules/@fontsource-variable/manrope',
    role: 'display / headings / product-family lockup',
    cssFamily: 'Manrope Variable',
  },
];

// WCAG-independent typographic tolerance: tabular digits must not differ by more than 0.002 em,
// i.e. 0.2 px at 100 px type (≈0.1 px at the 48 px instrument size). The brief (N-1) asks for
// equality within a sub-pixel tolerance; this is far below one device pixel and still catches jitter.
const TABULAR_TOLERANCE_EM = 0.002;
const MEASURE_SIZES_PX = [48, 72, 100];
const MEASURE_PX = 100;
// Measured decision recorded in TYPOGRAPHY-SYSTEM.md: the installed DM Sans build has no `tnum`
// feature (verified below), so the instrument numeric role is carried by Manrope, which does.
// This is the only family swap required and it adds no dependency.
const NUMERIC_FAMILY = 'manrope';

// Strings the brief (§4.5/§4.6, N-1…N-12) requires the system to render. The numeric readout strings
// are the exact set named in the MC-04 brief.
const NUMERIC_STRINGS = [
  '00:00',
  '23:59',
  '000°',
  '359°',
  '6.4 kn',
  '12.8 V',
  '14.2 A',
  '37.5° N',
  '008° W',
  '1013 hPa',
  '24.6 °C',
];
const LOCALE_STRINGS = [
  'Marea alta',
  'Profundidad',
  'Babor',
  'Estribor',
  'Rumbo 045°',
  '6,4 kn',
  '18,5 °C',
  '¿Actualizar?',
  'pingüino',
  'ÁÉÍÓÚÑÜ',
  'Maré',
  'Profundidade',
  'Estibordo',
  'Rumo',
  '6,4 nós',
  'Marée',
  'Profondeur',
  'Bâbord',
  'Cap',
  '6,4 nd',
  '045° T',
  '045° M',
  '1.234,5',
  '1,234.5',
  'STALE 00:12',
  'OFFLINE',
  'NO DATA',
  '—',
  '−0,5',
  'Ñandú',
  'día',
  'año',
];
const REQUIRED_CHARS = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  ':',
  '.',
  ',',
  '°',
  '%',
  '€',
  '−',
  '–',
  '—',
  '·',
  '×',
  '÷',
  'ª',
  'º',
  'á',
  'é',
  'í',
  'ó',
  'ú',
  'ü',
  'ñ',
  'Á',
  'É',
  'Í',
  'Ó',
  'Ú',
  'Ü',
  'Ñ',
  '¿',
  '¡',
  'â',
  'ã',
  'à',
  'ê',
  'ë',
  'ô',
  'õ',
  'ç',
  'è',
  'î',
  'ï',
  'û',
  'ù',
  'œ',
  'æ',
  ' ',
  '\u00a0',
  'T',
  'M',
  'N',
  'W',
  'S',
  'E',
  'h',
  'P',
  'a',
  'k',
  'n',
];
// Probed for information only; none is required by the brief. Prime/double-prime are deliberately
// not used: position is expressed as degrees + decimal minutes (§7.5) and symbol-only units are
// prohibited (N-11), so their absence is a fact to record, not a coverage failure.
const OPTIONAL_PROBES = [
  { char: '′', codePoint: 0x2032, name: 'prime' },
  { char: '″', codePoint: 0x2033, name: 'double prime' },
];

const WOFF2_KNOWN_TAGS = [
  'cmap',
  'head',
  'hhea',
  'hmtx',
  'maxp',
  'name',
  'OS/2',
  'post',
  'cvt ',
  'fpgm',
  'glyf',
  'loca',
  'prep',
  'CFF ',
  'VORG',
  'EBDT',
  'EBLC',
  'gasp',
  'hdmx',
  'kern',
  'LTSH',
  'PCLT',
  'VDMX',
  'vhea',
  'vmtx',
  'BASE',
  'GDEF',
  'GPOS',
  'GSUB',
  'EBSC',
  'JSTF',
  'MATH',
  'CBDT',
  'CBLC',
  'COLR',
  'CPAL',
  'SVG ',
  'sbix',
  'acnt',
  'avar',
  'bdat',
  'bloc',
  'bsln',
  'cvar',
  'fdsc',
  'feat',
  'fmtx',
  'fvar',
  'gvar',
  'hsty',
  'just',
  'lcar',
  'mort',
  'morx',
  'opbd',
  'prop',
  'trak',
  'Zapf',
  'Silf',
  'Glat',
  'Gloc',
  'Feat',
  'Sill',
];

const findings = [];
const failures = [];
const warnings = [];
const sha256 = (data) => createHash('sha256').update(data).digest('hex');
const fixed16 = (value) => value / 65536;
const hex = (value) => `U+${value.toString(16).toUpperCase().padStart(4, '0')}`;

// --- Minimal WOFF2 reader ---------------------------------------------------

// WOFF2 encodes origLength/transformLength as UIntBase128 (1–5 bytes, high bit = continuation).
function readUIntBase128(buffer, offset) {
  let value = 0;
  for (let index = 0; index < 5; index += 1) {
    const byte = buffer[offset + index];
    if (index === 0 && byte === 0x80) throw new Error('invalid UIntBase128 leading zero');
    if (value > 0x1ffffff) throw new Error('invalid UIntBase128 overflow');
    value = value * 128 + (byte & 0x7f);
    if ((byte & 0x80) === 0) return { value, next: offset + index + 1 };
  }
  throw new Error('invalid UIntBase128 sequence');
}

function parseWoff2(buffer) {
  if (buffer.toString('latin1', 0, 4) !== 'wOF2') throw new Error('not a WOFF2 file');
  const numTables = buffer.readUInt16BE(12);
  const totalSfntSize = buffer.readUInt32BE(16);
  const totalCompressedSize = buffer.readUInt32BE(20);
  const metaOffset = buffer.readUInt32BE(28);
  const metaLength = buffer.readUInt32BE(32);
  let offset = 48;
  const entries = [];
  for (let index = 0; index < numTables; index += 1) {
    const flags = buffer[offset];
    offset += 1;
    const tagIndex = flags & 0x3f;
    let tag;
    if (tagIndex === 0x3f) {
      tag = buffer.toString('latin1', offset, offset + 4);
      offset += 4;
    } else {
      tag = WOFF2_KNOWN_TAGS[tagIndex];
    }
    if (!tag) throw new Error(`unknown WOFF2 tag index ${tagIndex}`);
    const original = readUIntBase128(buffer, offset);
    const origLength = original.value;
    offset = original.next;
    const transformVersion = (flags >> 6) & 0x03;
    const nullTransform = tag === 'glyf' || tag === 'loca' ? 3 : 0;
    let transformLength = null;
    if (transformVersion !== nullTransform) {
      const transformed = readUIntBase128(buffer, offset);
      transformLength = transformed.value;
      offset = transformed.next;
    }
    entries.push({ tag, transformVersion, origLength, transformLength });
  }
  const compressed = buffer.subarray(offset, offset + totalCompressedSize);
  const decompressed = brotliDecompressSync(compressed);
  const tables = new Map();
  let cursor = 0;
  for (const entry of entries) {
    const length = entry.transformLength ?? entry.origLength;
    tables.set(entry.tag, decompressed.subarray(cursor, cursor + length));
    cursor += length;
  }
  return {
    entries: entries.map(({ tag, transformVersion, origLength, transformLength }) => ({
      tag,
      transformVersion,
      origLength,
      transformLength,
    })),
    tables,
    directoryBytes: offset - 48,
    decompressedBytes: decompressed.length,
    totalSfntSize,
    totalCompressedSize,
    metaOffset,
    metaLength,
    fileBytes: buffer.length,
  };
}

function parseCmap(table) {
  const glyphs = new Map();
  const numTables = table.readUInt16BE(2);
  const subtables = [];
  for (let index = 0; index < numTables; index += 1) {
    const platformID = table.readUInt16BE(4 + index * 8);
    const encodingID = table.readUInt16BE(6 + index * 8);
    const subtableOffset = table.readUInt32BE(8 + index * 8);
    const format = table.readUInt16BE(subtableOffset);
    subtables.push({ platformID, encodingID, format, subtableOffset });
    const add = (codePoint, glyphId) => {
      if (glyphId !== 0 && !glyphs.has(codePoint)) glyphs.set(codePoint, glyphId);
    };
    if (format === 4) {
      const segCountX2 = table.readUInt16BE(subtableOffset + 6);
      const segCount = segCountX2 / 2;
      const endCodes = subtableOffset + 14;
      const startCodes = endCodes + segCountX2 + 2;
      const idDeltas = startCodes + segCountX2;
      const idRangeOffsets = idDeltas + segCountX2;
      for (let segment = 0; segment < segCount; segment += 1) {
        const end = table.readUInt16BE(endCodes + segment * 2);
        const start = table.readUInt16BE(startCodes + segment * 2);
        const delta = table.readInt16BE(idDeltas + segment * 2);
        const rangeOffset = table.readUInt16BE(idRangeOffsets + segment * 2);
        for (let codePoint = start; codePoint <= end; codePoint += 1) {
          if (codePoint === 0xffff) continue;
          let glyphId;
          if (rangeOffset === 0) {
            glyphId = (codePoint + delta) & 0xffff;
          } else {
            const glyphAddress =
              idRangeOffsets + segment * 2 + rangeOffset + (codePoint - start) * 2;
            if (glyphAddress + 2 > table.length) continue;
            glyphId = table.readUInt16BE(glyphAddress);
            if (glyphId !== 0) glyphId = (glyphId + delta) & 0xffff;
          }
          add(codePoint, glyphId);
        }
      }
    } else if (format === 6) {
      const firstCode = table.readUInt16BE(subtableOffset + 6);
      const entryCount = table.readUInt16BE(subtableOffset + 8);
      for (let entry = 0; entry < entryCount; entry += 1) {
        add(firstCode + entry, table.readUInt16BE(subtableOffset + 10 + entry * 2));
      }
    } else if (format === 12 || format === 13) {
      const groupCount = table.readUInt32BE(subtableOffset + 12);
      const groups = subtableOffset + 16;
      for (let group = 0; group < groupCount; group += 1) {
        const start = table.readUInt32BE(groups + group * 12);
        const end = table.readUInt32BE(groups + group * 12 + 4);
        const startGlyph = table.readUInt32BE(groups + group * 12 + 8);
        for (let codePoint = start; codePoint <= end; codePoint += 1) {
          const glyphId = format === 12 ? startGlyph + (codePoint - start) : startGlyph;
          add(codePoint, glyphId);
        }
      }
    } else if (format === 0) {
      for (let codePoint = 0; codePoint < 256; codePoint += 1) {
        add(codePoint, table.readUInt8(subtableOffset + 6 + codePoint));
      }
    }
  }
  return { glyphs, subtables };
}

function parseFeatureTags(table) {
  const featureListOffset = table.readUInt16BE(6);
  if (featureListOffset === 0) return [];
  const count = table.readUInt16BE(featureListOffset);
  const tags = [];
  for (let index = 0; index < count; index += 1) {
    tags.push(
      table.toString(
        'latin1',
        featureListOffset + 2 + index * 6,
        featureListOffset + 6 + index * 6,
      ),
    );
  }
  return [...new Set(tags)];
}

function parseFvar(table) {
  const axesArrayOffset = table.readUInt16BE(4);
  const axisCount = table.readUInt16BE(8);
  const axisSize = table.readUInt16BE(10);
  const axes = [];
  for (let index = 0; index < axisCount; index += 1) {
    const base = axesArrayOffset + index * axisSize;
    axes.push({
      tag: table.toString('latin1', base, base + 4),
      min: fixed16(table.readInt32BE(base + 4)),
      default: fixed16(table.readInt32BE(base + 8)),
      max: fixed16(table.readInt32BE(base + 12)),
    });
  }
  return axes;
}

function decodeNameRecord(table, platformID, offset, length) {
  const slice = Buffer.from(table.subarray(offset, offset + length));
  if ((platformID === 0 || platformID === 3) && slice.length % 2 === 0) {
    slice.swap16();
    return slice.toString('utf16le');
  }
  return slice.toString('latin1');
}

function parseNameTable(table) {
  const count = table.readUInt16BE(2);
  const stringOffset = table.readUInt16BE(4);
  const records = [];
  for (let index = 0; index < count; index += 1) {
    const base = 6 + index * 12;
    const platformID = table.readUInt16BE(base);
    const languageID = table.readUInt16BE(base + 4);
    const nameID = table.readUInt16BE(base + 6);
    const length = table.readUInt16BE(base + 8);
    const offset = stringOffset + table.readUInt16BE(base + 10);
    if (offset + length > table.length) continue;
    records.push({
      nameID,
      platformID,
      languageID,
      text: decodeNameRecord(table, platformID, offset, length),
    });
  }
  const pick = (nameID) => {
    const matches = records.filter((record) => record.nameID === nameID);
    return (
      matches.find((record) => record.platformID === 3 && record.languageID === 0x0409)?.text ??
      matches.find((record) => record.platformID === 3)?.text ??
      matches[0]?.text ??
      null
    );
  };
  return {
    copyright: pick(0),
    family: pick(1),
    subfamily: pick(2),
    version: pick(5),
    license: pick(13),
    licenseUrl: pick(14),
  };
}

function parseHmtx(table, numberOfHMetrics, glyphId) {
  if (glyphId * 4 + 4 > table.length && glyphId >= numberOfHMetrics) return null;
  if (glyphId < numberOfHMetrics) return table.readUInt16BE(glyphId * 4);
  if (numberOfHMetrics === 0) return null;
  return table.readUInt16BE((numberOfHMetrics - 1) * 4);
}

// --- Shipped CSS / unicode-range -------------------------------------------

function parseFontFaces(cssPath) {
  const css = readFileSync(cssPath, 'utf8');
  const faces = [];
  for (const block of css.matchAll(/@font-face\s*\{([^}]*)\}/g)) {
    const body = block[1];
    const srcMatch = body.match(/url\(\s*([^)]+?)\s*\)/);
    const rangeMatch = body.match(/unicode-range:\s*([^;]+);/);
    const weightMatch = body.match(/font-weight:\s*([^;]+);/);
    const displayMatch = body.match(/font-display:\s*([^;]+);/);
    if (!srcMatch || !rangeMatch) continue;
    const relativeFile = srcMatch[1].replace(/['"]/g, '').replace(/^\.\//, '');
    faces.push({
      file: resolve(dirname(cssPath), relativeFile),
      fontDisplay: displayMatch ? displayMatch[1].trim() : null,
      fontWeight: weightMatch ? weightMatch[1].trim() : null,
      ranges: rangeMatch[1]
        .split(',')
        .map((part) => {
          const match = part.trim().match(/^U\+([0-9A-Fa-f?]+)(?:-([0-9A-Fa-f]+))?$/);
          if (!match) return null;
          if (match[1].includes('?')) {
            const start = parseInt(match[1].replace(/\?/g, '0'), 16);
            const end = parseInt(match[1].replace(/\?/g, 'f'), 16);
            return [start, end];
          }
          const start = parseInt(match[1], 16);
          const end = match[2] ? parseInt(match[2], 16) : start;
          return [start, end];
        })
        .filter(Boolean),
    });
  }
  return faces;
}

const rangeCovers = (ranges, codePoint) =>
  ranges.some(([start, end]) => codePoint >= start && codePoint <= end);

// --- Main -------------------------------------------------------------------

async function main() {
  const packages = [];

  for (const spec of FONT_PACKAGES) {
    const packageDir = join(ROOT, spec.dir);
    const packageJson = JSON.parse(readFileSync(join(packageDir, 'package.json'), 'utf8'));
    const metadata = JSON.parse(readFileSync(join(packageDir, 'metadata.json'), 'utf8'));
    const licenseText = readFileSync(join(packageDir, 'LICENSE'), 'utf8');
    const faces = parseFontFaces(join(packageDir, 'index.css'));

    const licenseChecks = {
      ofl11: /SIL OPEN FONT LICENSE Version 1\.1 - 26 February 2007/.test(licenseText),
      oflPermission:
        /Permission is hereby granted, free of charge, to any person obtaining\s+a copy of the Font Software, to use, study, copy, merge, embed, modify,\s+redistribute, and sell modified and unmodified copies/.test(
          licenseText,
        ),
      oflDocumentExemption:
        /The requirement for fonts to\s+remain under this license does not apply\s+to any document created\s+using the Font Software/.test(
          licenseText,
        ),
      oflBundling: /may be bundled,\s+redistributed and\/or sold with any software/.test(
        licenseText,
      ),
      reservedFontNameClause:
        /No Modified Version of the Font Software may use the Reserved Font/.test(licenseText),
      copyrightLine: licenseText.split(/\r?\n/)[0].trim(),
    };
    // OFL reserved font names are declared "after the copyright statement(s)" in the licence header.
    // Neither shipped header contains a "Reserved Font Name" declaration, so none is reserved by
    // these builds; we still do not modify or rename the fonts.
    licenseChecks.reservedFontNameDeclared = /Reserved Font Name/i.test(
      licenseText.split(/\r?\n/)[0],
    );
    if (faces.some((face) => face.fontDisplay !== 'swap')) {
      warnings.push(
        `${spec.id}: at least one shipped @font-face does not declare font-display: swap`,
      );
    } else {
      findings.push(`${spec.id}: every shipped @font-face declares font-display: swap`);
    }

    const fonts = faces.map((face) => {
      const buffer = readFileSync(face.file);
      const woff2 = parseWoff2(buffer);
      const cmap = parseCmap(woff2.tables.get('cmap'));
      const gsub = woff2.tables.get('GSUB');
      const gpos = woff2.tables.get('GPOS');
      const fvar = woff2.tables.get('fvar');
      const head = woff2.tables.get('head');
      const hhea = woff2.tables.get('hhea');
      const hmtxEntry = woff2.entries.find((entry) => entry.tag === 'hmtx');
      // WOFF2 permits a transformed hmtx (transform version 1). When present, this reader does not
      // decode it; the browser measurement below is the authoritative numeric advance evidence.
      const hmtx = hmtxEntry && hmtxEntry.transformVersion === 0 ? woff2.tables.get('hmtx') : null;
      return {
        file: face.file.replace(ROOT + '\\', '').replace(ROOT + '/', ''),
        bytes: statSync(face.file).size,
        sha256: sha256(buffer),
        fontDisplay: face.fontDisplay,
        fontWeight: face.fontWeight,
        ranges: face.ranges,
        tableCount: woff2.entries.length,
        tables: woff2.entries.map((entry) => entry.tag),
        directoryBytes: woff2.directoryBytes,
        decompressedBytes: woff2.decompressedBytes,
        hmtxTransformVersion: hmtxEntry ? hmtxEntry.transformVersion : null,
        unitsPerEm: head ? head.readUInt16BE(18) : null,
        numberOfHMetrics: hhea ? hhea.readUInt16BE(34) : null,
        glyphs: cmap.glyphs,
        cmapFormats: cmap.subtables.map((subtable) => subtable.format),
        featureTags: [
          ...new Set([
            ...(gsub ? parseFeatureTags(gsub) : []),
            ...(gpos ? parseFeatureTags(gpos) : []),
          ]),
        ].sort(),
        gsubFeatureTags: gsub ? parseFeatureTags(gsub) : [],
        gposFeatureTags: gpos ? parseFeatureTags(gpos) : [],
        axes: fvar ? parseFvar(fvar) : [],
        names: woff2.tables.get('name') ? parseNameTable(woff2.tables.get('name')) : null,
        hmtx,
      };
    });

    packages.push({
      id: spec.id,
      packageDir,
      role: spec.role,
      version: packageJson.version,
      license: packageJson.license,
      metadataVersion: metadata.version,
      metadataLastModified: metadata.lastModified,
      metadataAttribution: metadata.license?.attribution ?? null,
      metadataSource: metadata.source ?? null,
      metadataSubsets: metadata.subsets ?? [],
      variableAxes: metadata.variable ?? {},
      licenseChecks,
      declaredFamily: spec.cssFamily,
      faces,
      fonts,
    });
  }

  // Every woff2 shipped by both packages is inspected (including builds not imported by index.css),
  // so the numeric-feature conclusion cannot be an artefact of today's CSS entry point.
  for (const fontPackage of packages) {
    fontPackage.builds = readdirSync(join(fontPackage.packageDir, 'files'))
      .filter((file) => file.endsWith('.woff2'))
      .sort()
      .map((file) => {
        const buffer = readFileSync(join(fontPackage.packageDir, 'files', file));
        const woff2 = parseWoff2(buffer);
        const gsub = woff2.tables.get('GSUB');
        const gpos = woff2.tables.get('GPOS');
        const gsubTags = gsub ? parseFeatureTags(gsub) : [];
        const gposTags = gpos ? parseFeatureTags(gpos) : [];
        return {
          file,
          bytes: buffer.length,
          gsubFeatureTags: gsubTags,
          gposFeatureTags: gposTags,
          hasTnum: gsubTags.includes('tnum') || gposTags.includes('tnum'),
        };
      });
    const withTnum = fontPackage.builds.filter((build) => build.hasTnum);
    if (withTnum.length === 0) {
      warnings.push(
        `${fontPackage.id}: no shipped woff2 build declares a GSUB/GPOS 'tnum' feature — tabular figures are unavailable in this package`,
      );
    } else {
      findings.push(
        `${fontPackage.id}: ${withTnum.length} of ${fontPackage.builds.length} shipped woff2 builds declare 'tnum' (${withTnum.map((build) => build.file).join(', ')})`,
      );
    }
  }

  // ---- Coverage against cmap AND declared unicode-ranges ----
  const coverage = [];
  for (const fontPackage of packages) {
    // A character is renderable only if the browser can pick a subset face that (a) is declared for
    // that code point by the shipped @font-face unicode-range AND (b) actually contains the glyph.
    const serve = (codePoint) => {
      const candidates = fontPackage.fonts.filter((face) => rangeCovers(face.ranges, codePoint));
      const served = candidates.find((face) => face.glyphs.has(codePoint)) ?? null;
      return {
        served: Boolean(served),
        face: served ? served.file : null,
        declaredBy: candidates.map((face) => face.file),
        inAnyCmap: fontPackage.fonts.some((face) => face.glyphs.has(codePoint)),
      };
    };
    const missing = [];
    for (const char of REQUIRED_CHARS) {
      const codePoint = char.codePointAt(0);
      const result = serve(codePoint);
      if (!result.served) {
        missing.push({
          char,
          codePoint: hex(codePoint),
          inAnyCmap: result.inAnyCmap,
          declaredBy: result.declaredBy,
        });
      }
    }
    const strings = [];
    for (const [kind, list] of [
      ['numeric', NUMERIC_STRINGS],
      ['locale', LOCALE_STRINGS],
    ]) {
      for (const value of list) {
        const uncovered = [...value].filter((char) => !serve(char.codePointAt(0)).served);
        strings.push({ kind, value, uncovered });
        for (const char of uncovered) {
          const codePoint = char.codePointAt(0);
          const result = serve(codePoint);
          missing.push({
            char,
            codePoint: hex(codePoint),
            inAnyCmap: result.inAnyCmap,
            declaredBy: result.declaredBy,
            string: value,
          });
        }
      }
    }
    coverage.push({
      font: fontPackage.id,
      requiredChars: REQUIRED_CHARS.length,
      missingChars: missing,
      stringsWithGaps: strings.filter((entry) => entry.uncovered.length > 0),
      numericStrings: strings.filter((entry) => entry.kind === 'numeric'),
      localeStrings: strings.filter((entry) => entry.kind === 'locale'),
      optionalProbes: OPTIONAL_PROBES.map((probe) => ({
        ...probe,
        available: serve(probe.codePoint).served,
      })),
    });
    if (missing.length > 0) {
      failures.push(
        `glyph coverage: ${fontPackage.id} is missing ${missing.length} required character/range combination(s)`,
      );
    } else {
      findings.push(
        `${fontPackage.id}: all ${REQUIRED_CHARS.length} required characters are present in cmap AND served by a declared unicode-range`,
      );
    }
  }

  // ---- Font-level numeric evidence (default hmtx advances in font units) ----
  for (const fontPackage of packages) {
    const font = fontPackage.fonts.find((entry) => entry.ranges.some(([start]) => start <= 0x00ff));
    const digits = '0123456789';
    const advances = [...digits].map((char) => {
      const glyphId = font.glyphs.get(char.codePointAt(0));
      const units =
        glyphId === undefined || !font.hmtx
          ? null
          : parseHmtx(font.hmtx, font.numberOfHMetrics, glyphId);
      return {
        char,
        glyphId: glyphId ?? null,
        advanceUnits: units,
        advancePxAt100: units === null ? null : (units / font.unitsPerEm) * MEASURE_PX,
      };
    });
    const knownAdvances = advances
      .map((entry) => entry.advancePxAt100)
      .filter((value) => value !== null);
    const spread =
      knownAdvances.length === digits.length
        ? Math.max(...knownAdvances) - Math.min(...knownAdvances)
        : null;
    if (spread === null) {
      warnings.push(
        `${fontPackage.id}: default digit advances not read from hmtx (transform v${font.hmtxTransformVersion}); the Chromium normal-variant measurement is used instead`,
      );
    }
    const familyFeatureTags = [
      ...new Set(fontPackage.fonts.flatMap((entry) => entry.featureTags)),
    ].sort();
    fontPackage.fontNumeric = {
      featureTags: familyFeatureTags,
      hasTnumFeature: familyFeatureTags.includes('tnum'),
      hasZeroFeature: familyFeatureTags.includes('zero'),
      unitsPerEm: font.unitsPerEm,
      hmtxTransformVersion: font.hmtxTransformVersion,
      axes: font.axes,
      digits: advances,
      defaultDigitAdvanceSpreadPxAt100: spread,
    };
  }

  // ---- Real Chromium measurement with the local woff2 files ----
  const tempDir = mkdtempSync(join(tmpdir(), 'marea-typography-'));
  const probeDir = tempDir;
  const fontFaceCss = [];
  for (const fontPackage of packages) {
    fontPackage.probeName =
      fontPackage.id === 'dm-sans'
        ? 'MareaDMProbe'
        : fontPackage.id === 'manrope'
          ? 'MareaManropeProbe'
          : 'MareaProbe';
    const weightRange = fontPackage.id === 'dm-sans' ? '100 1000' : '200 800';
    for (const face of fontPackage.faces) {
      const unicodeRange = face.ranges
        .map(
          ([start, end]) =>
            `U+${start.toString(16).toUpperCase()}-${end.toString(16).toUpperCase()}`,
        )
        .join(',');
      fontFaceCss.push(
        `@font-face{font-family:'${fontPackage.probeName}';font-style:normal;font-display:block;` +
          `font-weight:${weightRange};src:url("${pathToFileURL(face.file).href}") format("woff2-variations");` +
          `unicode-range:${unicodeRange};}`,
      );
    }
  }

  const requiredForLoad = [...NUMERIC_STRINGS, ...LOCALE_STRINGS].join(' ');
  const html = `<!doctype html><html lang="en"><meta charset="utf-8"><title>MC-04 typography probe</title>
<style>${fontFaceCss.join('\n')}
html,body{margin:0;background:#fff;color:#111} .probe{font-size:16px}
</style>
<div class="probe" style="font-family:'MareaDMProbe';font-weight:700">${requiredForLoad.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</div>
<div class="probe" style="font-family:'MareaManropeProbe';font-weight:700">MAREA NAV HUB AIS PILOT SENSE WATCH DISPLAY WEATHER FLEET 0123456789</div>
</html>`;
  const htmlPath = join(probeDir, 'probe.html');
  writeFileSync(htmlPath, html, 'utf8');

  const browser = await chromium.launch({
    headless: true,
    args: ['--allow-file-access-from-files', '--disable-web-security'],
  });
  let browserVersion = null;
  let measurement = null;
  try {
    browserVersion = browser.version();
    const page = await browser.newPage();
    await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'load' });
    measurement = await page.evaluate(
      async ({ numericStrings, localeStrings, measurePx, measureSizes, probeNames }) => {
        const loadTargets = [
          ...numericStrings,
          ...localeStrings,
          '0123456789',
          'MAREA NAV HUB AIS PILOT SENSE WATCH DISPLAY WEATHER FLEET',
        ];
        for (const probeName of probeNames) {
          for (const target of loadTargets) {
            await document.fonts.load(`700 ${measurePx}px "${probeName}"`, target);
          }
        }
        await document.fonts.ready;

        const faces = [...document.fonts].map((face) => ({
          family: face.family,
          status: face.status,
          weight: face.weight,
          unicodeRange: face.unicodeRange,
        }));

        const baseCss = (family, sizePx, extra) =>
          `position:absolute;left:0;top:0;white-space:pre;display:inline-block;padding:0;margin:0;border:0;` +
          `font-family:"${family}";font-size:${sizePx}px;line-height:1;font-weight:700;letter-spacing:0;` +
          extra;
        const body = document.body;
        const measure = (text, family, sizePx, variant) => {
          const span = document.createElement('span');
          span.style.cssText = baseCss(family, sizePx, variant);
          span.textContent = text;
          body.appendChild(span);
          const width = span.getBoundingClientRect().width;
          span.remove();
          return width;
        };
        const variants = {
          normal: 'font-variant-numeric:normal;font-feature-settings:normal;',
          cssTabular: 'font-variant-numeric:tabular-nums;',
          featureTnum: "font-feature-settings:'tnum' 1;",
        };
        const digits = '0123456789';
        const digitWidths = {};
        const spreads = {};
        for (const probeName of probeNames) {
          digitWidths[probeName] = {};
          spreads[probeName] = {};
          for (const sizePx of measureSizes) {
            digitWidths[probeName][sizePx] = {};
            spreads[probeName][sizePx] = {};
            for (const [variantName, variantCss] of Object.entries(variants)) {
              const values = [...digits].map((digit) =>
                measure(digit, probeName, sizePx, variantCss),
              );
              digitWidths[probeName][sizePx][variantName] = values;
              spreads[probeName][sizePx][variantName] = Math.max(...values) - Math.min(...values);
            }
          }
        }

        const prefixPositions = (text, family, variant) => {
          const positions = [];
          for (let index = 1; index <= text.length; index += 1) {
            positions.push(measure(text.slice(0, index), family, measurePx, variant));
          }
          return positions;
        };
        const columnPairs = [
          ['00:00', '23:59'],
          ['000°', '359°'],
          ['6.4 kn', '6.4 kn'],
          ['08.4 m', '18.4 m'],
        ];
        const columns = [];
        for (const probeName of probeNames) {
          for (const variantName of ['normal', 'cssTabular', 'featureTnum']) {
            for (const [left, right] of columnPairs) {
              const leftPositions = prefixPositions(left, probeName, variants[variantName]);
              const rightPositions = prefixPositions(right, probeName, variants[variantName]);
              const deltas = leftPositions.map((value, index) =>
                Math.abs(value - rightPositions[index]),
              );
              columns.push({
                family: probeName,
                variant: variantName,
                left,
                right,
                maxColumnDeltaPx: Math.max(...deltas),
              });
            }
          }
        }

        const stringWidths = [];
        for (const probeName of probeNames) {
          for (const value of [...numericStrings, ...localeStrings]) {
            stringWidths.push({
              family: probeName,
              value,
              normalPx: measure(value, probeName, measurePx, variants.normal),
              tabularPx: measure(value, probeName, measurePx, variants.cssTabular),
              featureTnumPx: measure(value, probeName, measurePx, variants.featureTnum),
            });
          }
        }

        const minus = {};
        for (const probeName of probeNames) {
          minus[probeName] = {
            minusU2212: measure('\u2212', probeName, measurePx, variants.normal),
            hyphenU002D: measure('-', probeName, measurePx, variants.normal),
            zero: measure('0', probeName, measurePx, variants.normal),
          };
        }

        const checks = {};
        for (const probeName of probeNames) {
          checks[probeName] = {
            loaded: document.fonts.check(
              `700 ${measurePx}px "${probeName}"`,
              numericStrings.join(''),
            ),
            fontVariantNumericSupported: CSS.supports('font-variant-numeric', 'tabular-nums'),
          };
        }

        return { faces, digitWidths, spreads, columns, stringWidths, minus, checks };
      },
      {
        numericStrings: NUMERIC_STRINGS,
        localeStrings: LOCALE_STRINGS,
        measurePx: MEASURE_PX,
        measureSizes: MEASURE_SIZES_PX,
        probeNames: packages.map((entry) => entry.probeName),
      },
    );
  } finally {
    await browser.close();
  }

  // ---- Evaluate measurement against the hard requirements ----
  const toleranceAt = (sizePx) => TABULAR_TOLERANCE_EM * sizePx;
  const browserChecks = [];
  for (const fontPackage of packages) {
    const probeName = fontPackage.probeName;
    const sizes = {};
    for (const sizePx of MEASURE_SIZES_PX) {
      const spread = measurement.spreads[probeName][sizePx];
      const tolerancePx = toleranceAt(sizePx);
      sizes[sizePx] = {
        normal: spread.normal,
        tabularNums: spread.cssTabular,
        featureTnum: spread.featureTnum,
        tolerancePx,
        tabularNumsOk: spread.cssTabular <= tolerancePx,
        featureTnumOk: spread.featureTnum <= tolerancePx,
      };
    }
    const isNumericRole = fontPackage.id === NUMERIC_FAMILY;
    const loaded = measurement.checks[probeName].loaded;
    const tabularFiguresOk = Object.values(sizes).every(
      (entry) => entry.tabularNumsOk && entry.featureTnumOk,
    );
    const record = {
      font: fontPackage.id,
      probeName,
      loadedFromFileUrl: loaded,
      sizes,
      numericRole: isNumericRole,
      tabularFiguresOk,
      tnumFeatureInImportedFaces: fontPackage.fontNumeric.hasTnumFeature,
      fontVariantNumericSupported: measurement.checks[probeName].fontVariantNumericSupported,
    };
    browserChecks.push(record);
    if (!loaded) {
      failures.push(
        `${fontPackage.id}: the browser did not load the local woff2 faces over file://`,
      );
      continue;
    }
    if (isNumericRole && !fontPackage.fontNumeric.hasTnumFeature) {
      failures.push(
        `${fontPackage.id}: numeric family has no 'tnum' feature in the imported faces`,
      );
    }
    if (isNumericRole && !tabularFiguresOk) {
      const failing = MEASURE_SIZES_PX.filter(
        (sizePx) => !sizes[sizePx].tabularNumsOk || !sizes[sizePx].featureTnumOk,
      );
      failures.push(
        `${fontPackage.id}: tabular figures fail at ${failing.join(', ')} px (tolerance ${TABULAR_TOLERANCE_EM} em)`,
      );
    }
    if (!isNumericRole && !tabularFiguresOk) {
      const at100 = sizes[MEASURE_PX];
      warnings.push(
        `${fontPackage.id}: display family is not fully tabular (spread ${at100.tabularNums.toFixed(4)} px at 100 px); do not use it for mutable values, prices in tables or instrument numerics`,
      );
    }
    findings.push(
      `${fontPackage.id}: digit advance spread normal/tabular-nums/tnum at ${MEASURE_SIZES_PX.map((sizePx) => `${sizePx}px ${sizes[sizePx].normal.toFixed(3)}/${sizes[sizePx].tabularNums.toFixed(3)}/${sizes[sizePx].featureTnum.toFixed(3)}`).join(' · ')}`,
    );
  }

  const deviations = [];
  const dmSansCheck = browserChecks.find((entry) => entry.font === 'dm-sans');
  if (dmSansCheck && !dmSansCheck.tabularFiguresOk) {
    deviations.push({
      id: 'TYPO-DEVIATION-01',
      decision: `Instrument numeric role carried by ${NUMERIC_FAMILY} instead of DM Sans (brief §4.4 proposal)`,
      reason:
        'the installed DM Sans 5.3.0 builds expose no tnum feature and render proportional digits; the brief N-1/N-2 requirement is non-negotiable',
      evidence:
        'scripts/check-typography.mjs: GSUB/GPOS scan of every shipped woff2 + Chromium digit-advance measurement',
    });
  }
  const numericPackage = packages.find((entry) => entry.id === NUMERIC_FAMILY);
  if (numericPackage && !numericPackage.fontNumeric.hasTnumFeature) {
    failures.push(`${NUMERIC_FAMILY}: the declared numeric family does not expose 'tnum'`);
  }

  // ---- Report ---------------------------------------------------------------

  const report = {
    checkedAt: new Date().toISOString(),
    environment: {
      node: process.version,
      playwright: JSON.parse(
        readFileSync(join(ROOT, 'node_modules/@playwright/test/package.json'), 'utf8'),
      ).version,
      chromium: browserVersion,
      platform: process.platform,
    },
    measureSizesPx: MEASURE_SIZES_PX,
    measurePx: MEASURE_PX,
    tabularToleranceEm: TABULAR_TOLERANCE_EM,
    numericFamily: NUMERIC_FAMILY,
    packages: packages.map((fontPackage) => ({
      id: fontPackage.id,
      role: fontPackage.role,
      version: fontPackage.version,
      license: fontPackage.license,
      metadataVersion: fontPackage.metadataVersion,
      metadataLastModified: fontPackage.metadataLastModified,
      metadataAttribution: fontPackage.metadataAttribution,
      metadataSource: fontPackage.metadataSource,
      metadataSubsets: fontPackage.metadataSubsets,
      variableAxes: fontPackage.variableAxes,
      licenseChecks: fontPackage.licenseChecks,
      fontFaces: fontPackage.fonts.map((font) => ({
        file: font.file,
        bytes: font.bytes,
        sha256: font.sha256,
        fontDisplay: font.fontDisplay,
        fontWeight: font.fontWeight,
        unitsPerEm: font.unitsPerEm,
        tableCount: font.tableCount,
        tableTags: font.tables,
        cmapFormats: font.cmapFormats,
        featureTags: font.featureTags,
        axes: font.axes,
        names: font.names,
        digitAdvances: fontPackage.fontNumeric.digits,
      })),
      fontNumeric: {
        hasTnumFeature: fontPackage.fontNumeric.hasTnumFeature,
        hasZeroFeature: fontPackage.fontNumeric.hasZeroFeature,
        featureTags: fontPackage.fontNumeric.featureTags,
        axes: fontPackage.fontNumeric.axes,
        defaultDigitAdvanceSpreadPxAt100: fontPackage.fontNumeric.defaultDigitAdvanceSpreadPxAt100,
      },
      builds: fontPackage.builds,
    })),
    browserMeasurements: {
      checks: measurement.checks,
      digitWidths: measurement.digitWidths,
      spreads: measurement.spreads,
      columns: measurement.columns,
      stringWidths: measurement.stringWidths,
      minus: measurement.minus,
      loadedFaces: measurement.faces,
    },
    coverage,
    deviations,
    findings,
    warnings,
    failures,
    result: failures.length === 0 ? 'PASS' : 'FAIL',
  };

  if (JSON_ONLY) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    console.log('MC-04 typography verification (T-1…T-10) — real evidence');
    console.log(
      `Environment: node ${report.environment.node}, @playwright/test ${report.environment.playwright}, chromium ${report.environment.chromium}, ${report.environment.platform}`,
    );
    console.log('');
    for (const fontPackage of packages) {
      console.log(`## ${fontPackage.id} (${fontPackage.role})`);
      console.log(`  package      : @fontsource-variable/${fontPackage.id}@${fontPackage.version}`);
      console.log(
        `  licence      : ${fontPackage.license} (${fontPackage.licenseChecks.copyrightLine})`,
      );
      console.log(
        `  OFL checks   : ofl11=${fontPackage.licenseChecks.ofl11} permission=${fontPackage.licenseChecks.oflPermission} bundling=${fontPackage.licenseChecks.oflBundling} document-exemption=${fontPackage.licenseChecks.oflDocumentExemption} RFN-clause=${fontPackage.licenseChecks.reservedFontNameClause} RFN-declared=${fontPackage.licenseChecks.reservedFontNameDeclared}`,
      );
      console.log(
        `  upstream     : ${fontPackage.metadataVersion} (${fontPackage.metadataLastModified}) from ${fontPackage.metadataSource}`,
      );
      console.log(
        `  axes         : ${fontPackage.fontNumeric.axes.map((axis) => `${axis.tag} ${axis.min}–${axis.max} (default ${axis.default})`).join(', ') || 'none'}`,
      );
      console.log(
        `  feature tags : ${fontPackage.fontNumeric.featureTags.join(', ') || '(none)'} — tnum=${fontPackage.fontNumeric.hasTnumFeature} zero=${fontPackage.fontNumeric.hasZeroFeature}`,
      );
      for (const font of fontPackage.fonts) {
        console.log(
          `  woff2        : ${font.file} ${font.bytes} B ${font.sha256.slice(0, 16)}… font-display=${font.fontDisplay} weight=${font.fontWeight} unitsPerEm=${font.unitsPerEm} tables=${font.tableCount} dir=${font.directoryBytes}B`,
        );
      }
      const buildTnum = fontPackage.builds.filter((build) => build.hasTnum);
      console.log(
        `  builds       : ${fontPackage.builds.length} woff2 shipped, ${buildTnum.length} declare tnum`,
      );
      console.log(
        `  default digit spread (font units→px@100): ${fontPackage.fontNumeric.defaultDigitAdvanceSpreadPxAt100 === null ? 'n/a (hmtx transform v' + fontPackage.fontNumeric.hmtxTransformVersion + ')' : fontPackage.fontNumeric.defaultDigitAdvanceSpreadPxAt100.toFixed(4) + ' px'}`,
      );
      console.log('');
    }
    console.log('## Glyph coverage (cmap ∩ declared unicode-range)');
    for (const entry of coverage) {
      console.log(
        `  ${entry.font}: required=${entry.requiredChars} missing=${entry.missingChars.length} strings-with-gaps=${entry.stringsWithGaps.length}`,
      );
      for (const gap of entry.stringsWithGaps) {
        console.log(
          `    GAP ${gap.kind} ${JSON.stringify(gap.value)} → ${gap.uncovered.join(' ')}`,
        );
      }
      for (const probe of entry.optionalProbes) {
        console.log(
          `    optional probe: ${probe.name} ${probe.codePoint} available=${probe.available}`,
        );
      }
    }
    console.log('');
    console.log(`## Chromium measurement (local woff2 over file://, weight 700)`);
    for (const check of browserChecks) {
      console.log(
        `  ${check.font}: loaded=${check.loadedFromFileUrl} numericRole=${check.numericRole} tabularFiguresOk=${check.tabularFiguresOk}`,
      );
      for (const sizePx of MEASURE_SIZES_PX) {
        const size = check.sizes[sizePx];
        console.log(
          `    ${String(sizePx).padStart(3)} px: normal=${size.normal.toFixed(4)} tabular-nums=${size.tabularNums.toFixed(4)} tnum=${size.featureTnum.toFixed(4)} tolerance=${size.tolerancePx.toFixed(4)} px`,
        );
      }
    }
    console.log('');
    console.log(`  digit advances at ${MEASURE_PX} px (px, normal / tabular-nums / tnum):`);
    for (const fontPackage of packages) {
      const widths = measurement.digitWidths[fontPackage.probeName][MEASURE_PX];
      console.log(`  ${fontPackage.id}`);
      console.log(`    normal       ${widths.normal.map((value) => value.toFixed(2)).join(' ')}`);
      console.log(
        `    tabular-nums ${widths.cssTabular.map((value) => value.toFixed(2)).join(' ')}`,
      );
      console.log(
        `    tnum         ${widths.featureTnum.map((value) => value.toFixed(2)).join(' ')}`,
      );
    }
    console.log('');
    console.log('  column alignment deltas (max px across same-length strings):');
    for (const column of measurement.columns.filter((entry) => entry.left !== entry.right)) {
      console.log(
        `    ${column.family} ${column.variant}: ${JSON.stringify(column.left)} vs ${JSON.stringify(column.right)} → ${column.maxColumnDeltaPx.toFixed(4)} px`,
      );
    }
    console.log('');
    console.log('  required numeric string widths (px, normal → tnum):');
    for (const width of measurement.stringWidths.filter((entry) =>
      NUMERIC_STRINGS.includes(entry.value),
    )) {
      console.log(
        `    ${width.family.padEnd(13)} ${JSON.stringify(width.value).padEnd(14)} ${width.normalPx.toFixed(2)} → ${width.tabularPx.toFixed(2)} (tnum feature ${width.featureTnumPx.toFixed(2)})`,
      );
    }
    console.log('');
    console.log('  minus sign U+2212 vs hyphen U+002D vs zero (px):');
    for (const fontPackage of packages) {
      const values = measurement.minus[fontPackage.probeName];
      console.log(
        `    ${fontPackage.id}: − ${values.minusU2212.toFixed(3)} / - ${values.hyphenU002D.toFixed(3)} / 0 ${values.zero.toFixed(3)}`,
      );
    }
    console.log('');
    for (const deviation of deviations) {
      console.log(`DEVIATION ${deviation.id}: ${deviation.decision}`);
      console.log(`          reason: ${deviation.reason}`);
    }
    for (const warning of warnings) console.log(`WARN  ${warning}`);
    for (const failure of failures) console.log(`FAIL  ${failure}`);
    console.log('');
    console.log(`RESULT: ${report.result}`);
    console.log('');
    console.log('JSON (machine-readable):');
    console.log(JSON.stringify(report, null, 2));
  }

  process.exitCode = failures.length === 0 ? 0 : 1;
}

main().catch((error) => {
  console.error('FATAL:', error.stack ?? error.message);
  process.exitCode = 1;
});
