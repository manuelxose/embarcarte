#!/usr/bin/env node
/**
 * Independent SVG audit across all MC-04 authored vector assets (identity, territories,
 * diagrams, packaging, app icons, UI icons). Strict Chromium XML parse + hygiene rules from
 * brief §10.5/§9.3 + category-specific expectations (single ink in logo masters, no text in
 * identity wordmark art, label text permitted in diagrams/packaging, byte budgets).
 * Writes JSON to argv[2]; prints only the failures/flags.
 */
import { readFileSync, readdirSync, statSync, writeFileSync, existsSync } from 'node:fs';
import { join, relative, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../../../../..');
const OUT =
  process.argv[2] ??
  join(dirname(fileURLToPath(import.meta.url)), '..', 'raw', 'svg-all-audit.json');
const SCAN = ['docs/marea/brand/assets', 'docs/marea/brand/territories'];

function walk(dir, acc) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) walk(p, acc);
    else if (entry.name.toLowerCase().endsWith('.svg')) acc.push(p);
  }
  return acc;
}

const files = [];
for (const rel of SCAN) {
  const abs = join(ROOT, rel);
  if (existsSync(abs)) walk(abs, files);
}
const inputs = files.sort().map((f) => {
  const rel = relative(ROOT, f).split('\\').join('/');
  const text = readFileSync(f, 'utf8');
  let category = 'other';
  if (rel.includes('/assets/logo/')) category = 'logo';
  else if (rel.includes('/assets/icons/ui/')) category = 'ui-icon';
  else if (rel.includes('/assets/icons/app/') || /\/assets\/icons\/marea-/.test(rel) || /favicon\.svg$/.test(rel)) category = 'app-icon';
  else if (rel.includes('/assets/diagrams/')) category = 'diagram';
  else if (rel.includes('/assets/packaging/')) category = 'packaging';
  else if (rel.includes('/territories/')) category = 'territory';
  return {
    rel,
    text,
    bytes: statSync(f).size,
    category,
    isFamilyLockup: rel.includes('/logo/family/'),
  };
});

const browser = await chromium.launch({ headless: true });
let parsed;
try {
  const page = await browser.newPage();
  await page.goto('about:blank');
  parsed = await page.evaluate((items) => {
    return items.map((item) => {
      const doc = new DOMParser().parseFromString(item.text, 'image/svg+xml');
      const errors = [...doc.getElementsByTagName('parsererror')].map((n) => n.textContent);
      const root = doc.documentElement;
      const tags = [...new Set([...doc.getElementsByTagName('*')].map((e) => e.tagName.toLowerCase()))];
      const attrs = root ? Object.fromEntries([...root.attributes].map((a) => [a.name, a.value])) : {};
      const title = doc.getElementsByTagName('title')[0]?.textContent ?? null;
      const desc = doc.getElementsByTagName('desc')[0]?.textContent ?? null;
      const texts = [...doc.getElementsByTagName('text')].map((t) => t.textContent);
      const gradients = doc.querySelectorAll('linearGradient,radialGradient,meshgradient').length;
      const filters = doc.querySelectorAll('filter').length;
      const images = doc.querySelectorAll('image').length;
      const styles = doc.querySelectorAll('style').length;
      const scripts = doc.querySelectorAll('script').length;
      const ids = [...doc.querySelectorAll('[id]')].map((e) => e.id);
      const colors = new Set();
      const strokes = new Set();
      const fonts = new Set();
      for (const el of doc.querySelectorAll('*')) {
        for (const a of el.attributes) {
          if (a.name === 'fill' || a.name === 'stroke' || a.name === 'stop-color') colors.add(a.value);
          if (a.name === 'stroke-width') strokes.add(a.value);
          if (a.name === 'font-family') fonts.add(a.value);
        }
      }
      const foreignRefs = [];
      const urlRefs = [];
      for (const el of doc.querySelectorAll('*')) {
        for (const a of el.attributes) {
          if ((a.name === 'href' || a.name === 'xlink:href') && !a.value.startsWith('#')) foreignRefs.push(a.value);
          if (/url\(\s*['"]?(https?:|data:)/i.test(a.value)) urlRefs.push(a.value.slice(0, 60));
          if (/^on/i.test(a.name)) urlRefs.push('event:' + a.name);
        }
      }
      return {
        file: item.rel,
        category: item.category,
        isFamilyLockup: item.isFamilyLockup,
        parserErrors: errors,
        rootTag: root?.tagName ?? null,
        viewBox: attrs.viewBox ?? null,
        xmlns: attrs.xmlns ?? null,
        width: attrs.width ?? null,
        height: attrs.height ?? null,
        role: attrs.role ?? null,
        ariaLabel: attrs['aria-label'] ?? null,
        title,
        desc,
        tags,
        textCount: texts.length,
        sampleTexts: texts.slice(0, 3),
        gradients,
        filters,
        images,
        styles,
        scripts,
        ids,
        duplicateIds: ids.filter((id, i) => ids.indexOf(id) !== i),
        colors: [...colors],
        strokes: [...strokes],
        fonts: [...fonts],
        foreignRefs,
        urlRefs,
      };
    });
  }, inputs);
} finally {
  await browser.close();
}

const budget = (category) =>
  category === 'logo' ? 20 * 1024 : category === 'ui-icon' || category === 'app-icon' ? 8 * 1024 : null;

const records = parsed.map((p, i) => {
  const src = inputs[i];
  const flags = [];
  if (p.parserErrors.length) flags.push('XML parse error');
  if (!p.viewBox) flags.push('missing viewBox');
  if (p.xmlns !== 'http://www.w3.org/2000/svg') flags.push('missing/incorrect xmlns');
  if (p.scripts) flags.push(`<script> x${p.scripts}`);
  if (p.images) flags.push(`<image> x${p.images}`);
  if (p.filters) flags.push(`<filter> x${p.filters}`);
  if (p.styles) flags.push(`<style> inline`);
  if (p.gradients) flags.push(`gradient x${p.gradients}`);
  if (p.foreignRefs.length) flags.push(`external href: ${p.foreignRefs.join(',')}`);
  if (p.urlRefs.length) flags.push(`external/data/event ref: ${p.urlRefs.join(',')}`);
  if (p.duplicateIds.length) flags.push(`duplicate ids: ${[...new Set(p.duplicateIds)].join(',')}`);
  if (budget(p.category) && src.bytes > budget(p.category)) flags.push(`over byte budget (${src.bytes} > ${budget(p.category)})`);
  // Identity masters: single ink, outlined wordmark, no <text>, no fixed width/height.
  if (p.category === 'logo') {
    if (p.textCount) flags.push(`<text> in identity art x${p.textCount}`);
    const inkColours = p.colors.filter((c) => c !== 'none' && !/^currentcolor$/i.test(c));
    if (inkColours.length) flags.push(`hard-coded colour in identity: ${inkColours.slice(0, 4).join(',')}`);
    if (p.width || p.height) flags.push('fixed width/height on root (should scale by CSS)');
    if (!p.role) flags.push('no root role');
    if (!p.title && !p.desc && !p.ariaLabel) flags.push('no title/desc/aria-label');
  }
  if (p.category === 'diagram' || p.category === 'packaging') {
    if (!p.title && !p.desc && !p.ariaLabel) flags.push('no title/desc/aria-label');
  }
  if (p.category === 'ui-icon') {
    if (!p.title) flags.push('no <title>');
  }
  return {
    ...p,
    bytes: src.bytes,
    flags,
    gradientLike: p.gradients > 0,
  };
});

const report = {
  generatedBy: 'docs/marea/brand/evidence/review/tools/svg-all-audit.mjs',
  generatedAt: new Date().toISOString(),
  scanned: SCAN,
  fileCount: records.length,
  byCategory: records.reduce((acc, r) => {
    acc[r.category] = (acc[r.category] ?? 0) + 1;
    return acc;
  }, {}),
  parseErrors: records.filter((r) => r.parserErrors.length).map((r) => r.file),
  filesWithFlags: records.filter((r) => r.flags.length).map((r) => ({ file: r.file, category: r.category, bytes: r.bytes, flags: r.flags })),
  familyLockups: records.filter((r) => r.isFamilyLockup).map((r) => ({ file: r.file, bytes: r.bytes, viewBox: r.viewBox, title: r.title, flags: r.flags })),
  records,
};
writeFileSync(OUT, JSON.stringify(report, null, 2), 'utf8');
console.log('files:', report.fileCount, JSON.stringify(report.byCategory));
console.log('parse errors:', report.parseErrors);
console.log('flagged files:', report.filesWithFlags.length);
for (const f of report.filesWithFlags) console.log(`  ${f.file} [${f.category}] ${f.bytes}B :: ${f.flags.join(' | ')}`);
