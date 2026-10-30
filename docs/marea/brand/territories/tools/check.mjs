// check.mjs — measured SVG validation for the MC-04 identity set.
// Reads the delivered files, parses them in Chromium, measures real rendered ink bboxes
// (SVGGraphicsElement.getBBox), and checks the documented geometry rules. Writes a JSON +
// Markdown evidence record. This is measurement of our own files, not a design review.
//   node docs/marea/brand/territories/tools/check.mjs
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const BRAND = path.resolve('docs/marea/brand');
const LOGO = path.join(BRAND, 'assets', 'logo');
const OUT = path.join(BRAND, 'territories', 'evidence');
fs.mkdirSync(OUT, { recursive: true });

const files = [
  ...fs
    .readdirSync(LOGO)
    .filter((f) => f.endsWith('.svg'))
    .map((f) => path.join(LOGO, f)),
  ...fs
    .readdirSync(path.join(LOGO, 'family'))
    .filter((f) => f.endsWith('.svg'))
    .map((f) => path.join(LOGO, 'family', f)),
  ...fs
    .readdirSync(path.join(BRAND, 'territories'))
    .filter((f) => f.endsWith('.svg'))
    .map((f) => path.join(BRAND, 'territories', f)),
];

const budgets = (name) =>
  name.startsWith('marea-mark')
    ? 8 * 1024
    : name.includes('territory') && name.includes('mark')
      ? 8 * 1024
      : name.includes('construction') || name.includes('case-study')
        ? 24 * 1024
        : 20 * 1024;

const r = (n) => Math.round(n * 100) / 100;
const results = [];
const browser = await chromium.launch();
const page = await browser.newPage();

for (const file of files) {
  const rel = path.relative(process.cwd(), file).replace(/\\/g, '/');
  const raw = fs.readFileSync(file, 'utf8');
  const bytes = Buffer.byteLength(raw);
  const name = path.basename(file);
  const hygiene = {
    script: /<script[\s>]/i.test(raw),
    externalRef: /(?:href|src)\s*=\s*"(?!#)/i.test(raw),
    raster: /<image[\s>]/i.test(raw),
    importRule: /@import/i.test(raw),
    filter: /<filter[\s>]/i.test(raw),
    foreignObject: /<foreignObject[\s>]/i.test(raw),
    viewBox: /viewBox="0 0 [\d.]+ [\d.]+"/.test(raw),
    roleImg: /role="img"/.test(raw),
    title: /<title[\s>]/.test(raw),
    desc: /<desc[\s>]/.test(raw),
    textElement: /<text[\s>]/.test(raw),
    trademarkSymbol: /[®™]/.test(raw),
  };
  // §10.5 short-decimal rule applies to coordinates; transform scale factors are documented
  // separately (3 decimals are required to land the symbol ink band exactly on the cap band).
  const geometryOnly = raw.replace(/transform="[^"]*"/g, 'transform=""');
  const decimals = [...geometryOnly.matchAll(/(?<![\w.])-?\d+\.(\d+)/g)].map((m) => m[1].length);
  const maxDecimals = decimals.length ? Math.max(...decimals) : 0;

  const inline = raw.replace(/^<\?xml[^>]*>\s*/, '');
  await page.setContent(`<!DOCTYPE html><html><body style="margin:0">${inline}</body></html>`, {
    waitUntil: 'load',
  });
  const measure = await page.evaluate(() => {
    const svg = document.querySelector('svg');
    const parserError = document.querySelector('parsererror');
    if (!svg) return { parseError: 'no svg element' };
    const vb = svg.viewBox.baseVal;
    const bb = (el) => {
      const b = el.getBBox();
      return {
        x: b.x,
        y: b.y,
        w: b.width,
        h: b.height,
        right: b.x + b.width,
        bottom: b.y + b.height,
      };
    };
    // Child <g> getBBox() is in the group's own user space; apply its own translate/scale.
    const groups = [...svg.querySelectorAll(':scope > g')].map((g) => {
      const b = bb(g);
      const m = /translate\(([-\d.]+) ([-\d.]+)\)(?:\s*scale\(([-\d.]+)\))?/.exec(
        g.getAttribute('transform') || '',
      );
      const tx = m ? Number(m[1]) : 0,
        ty = m ? Number(m[2]) : 0,
        sc = m && m[3] ? Number(m[3]) : 1;
      return {
        transform: g.getAttribute('transform'),
        box: {
          x: tx + b.x * sc,
          y: ty + b.y * sc,
          w: b.w * sc,
          h: b.h * sc,
          right: tx + (b.x + b.w) * sc,
          bottom: ty + (b.y + b.h) * sc,
        },
      };
    });
    let all;
    try {
      all = bb(svg);
    } catch {
      all = null;
    }
    return {
      parseError: parserError ? parserError.textContent.slice(0, 200) : null,
      viewBox: { w: vb.width, h: vb.height },
      groups,
      ink: all,
    };
  });

  const lockup = name.includes('lockup');
  const family = name.includes('family');
  const isArtwork =
    /^marea-(lockup|mark|wordmark|family)/.test(name) ||
    /^territory-[abc]-(mark|lockup)/.test(name);
  const checks = [];
  const add = (id, ok, detail) => checks.push({ id, ok, detail });

  add('parse', !measure.parseError, measure.parseError || 'well-formed');
  add(
    'hygiene',
    !Object.entries(hygiene).some(
      ([k, v]) =>
        [
          'script',
          'externalRef',
          'raster',
          'importRule',
          'filter',
          'foreignObject',
          'trademarkSymbol',
        ].includes(k) && v,
    ),
    'no script/external/raster/import/filter/foreignObject/®™',
  );
  add('viewBox', !!measure.viewBox, `viewBox ${measure.viewBox?.w} × ${measure.viewBox?.h}`);
  add('semantics', hygiene.roleImg && hygiene.title && hygiene.desc, 'role=img + title + desc');
  if (isArtwork) add('noEmbeddedText', !hygiene.textElement, 'no <text> in delivered artwork');
  add('decimals', maxDecimals <= 2, `max ${maxDecimals} decimals`);
  add('bytes', bytes <= budgets(name), `${bytes} B ≤ ${budgets(name)} B`);

  if (isArtwork && measure.ink && measure.viewBox) {
    const { ink, viewBox } = measure;
    add(
      'insideViewBox',
      ink.x >= -0.01 &&
        ink.y >= -0.01 &&
        ink.right <= viewBox.w + 0.01 &&
        ink.bottom <= viewBox.h + 0.01,
      `ink x ${r(ink.x)} y ${r(ink.y)} → ${r(ink.right)} ${r(ink.bottom)} inside ${viewBox.w}×${viewBox.h}`,
    );
    if (/^marea-mark-(compact|reduced-16)\.svg$/.test(name)) {
      const lx = ink.x,
        rx = viewBox.w - ink.right,
        ty = ink.y,
        by = viewBox.h - ink.bottom;
      add(
        'centred',
        Math.abs(lx - rx) <= 0.05 && Math.abs(ty - by) <= 0.05,
        `margins L ${r(lx)} R ${r(rx)} T ${r(ty)} B ${r(by)}`,
      );
    }
  }

  if (lockup && measure.groups.length >= 2) {
    const [sym, wm] = measure.groups;
    const gap = wm.box.x - sym.box.right;
    add(
      'symbolCapBand',
      Math.abs(sym.box.y - wm.box.y) <= 0.05 && Math.abs(sym.box.bottom - wm.box.bottom) <= 0.05,
      `symbol ink y ${r(sym.box.y)}..${r(sym.box.bottom)} vs cap band ${r(wm.box.y)}..${r(wm.box.bottom)}`,
    );
    add(
      'inkGap075',
      Math.abs(gap - 75) <= 0.15,
      `measured ink gap ${r(gap)} = ${r(gap / 100)} × cap`,
    );
    add('capHeight100', Math.abs(wm.box.h - 100) <= 0.05, `wordmark cap band ${r(wm.box.h)}`);
    const { ink, viewBox } = measure;
    add(
      'clearSpace',
      ink.x >= 49.9 &&
        ink.y >= 49.9 &&
        ink.right <= viewBox.w - 49.9 + 0.02 &&
        ink.bottom <= viewBox.h - 49.9 + 0.02,
      `ink ${r(ink.x)},${r(ink.y)} → ${r(ink.right)},${r(ink.bottom)} in ${viewBox.w}×${viewBox.h}; ≥50 units on all sides`,
    );
    if (family && measure.groups.length >= 3) {
      const fam = measure.groups[2];
      const famGap = fam.box.x - wm.box.right;
      add(
        'familyRatio',
        Math.abs(fam.box.h - 70) <= 0.1,
        `family ink height ${r(fam.box.h)} = ${r(fam.box.h / 100)} × cap`,
      );
      add(
        'familyGap',
        Math.abs(famGap - 26) <= 0.2,
        `MAREA→family ink gap ${r(famGap)} = ${r(famGap / 100)} × cap`,
      );
      add(
        'familyBaseline',
        Math.abs(fam.box.bottom - wm.box.bottom) <= 0.05,
        `family baseline ${r(fam.box.bottom)} vs ${r(wm.box.bottom)}`,
      );
    }
  }

  results.push({
    file: rel,
    bytes,
    viewBox: measure.viewBox,
    ink: measure.ink,
    groups: measure.groups,
    checks,
    hygiene,
    maxDecimals,
  });
}

await browser.close();

const failed = results.flatMap((f) =>
  f.checks.filter((c) => !c.ok).map((c) => `${f.file} :: ${c.id} :: ${c.detail}`),
);

fs.writeFileSync(
  path.join(OUT, 'svg-geometry-report.json'),
  JSON.stringify(
    { generatedBy: 'territories/tools/check.mjs', date: '2026-10-30', files: results, failed },
    null,
    2,
  ),
);

const md = [];
md.push('# MC-04 identity SVG — measured geometry report');
md.push('');
md.push(
  'Generated by `docs/marea/brand/territories/tools/check.mjs` on 2026-10-30. Measurements are',
);
md.push(
  'real `SVGGraphicsElement.getBBox()` values from Playwright Chromium, not estimates. Status:',
);
md.push(
  'PROPOSED / INTERNAL; this report measures our own artwork, it is not a design or legal review.',
);
md.push('');
md.push('| File | Bytes | Budget | viewBox | Ink bbox (x, y, w, h) | Checks |');
md.push('| --- | ---: | ---: | --- | --- | --- |');
for (const f of results) {
  const ink = f.ink ? `${r(f.ink.x)}, ${r(f.ink.y)}, ${r(f.ink.w)}, ${r(f.ink.h)}` : 'n/a';
  const ok = f.checks.filter((c) => c.ok).length;
  md.push(
    `| \`${f.file}\` | ${f.bytes} | ${budgets(path.basename(f.file))} | ${f.viewBox?.w}×${f.viewBox?.h} | ${ink} | ${ok}/${f.checks.length} |`,
  );
}
md.push('');
md.push('## Lockup geometry rules (measured)');
md.push('');
md.push(
  '| Lockup | Symbol ink band y | Cap band y | Ink gap | Family ink height | MAREA→family gap |',
);
md.push('| --- | --- | --- | ---: | ---: | ---: |');
for (const f of results.filter((x) => x.file.includes('lockup') && x.groups?.length >= 2)) {
  const [sym, wm] = f.groups;
  const fam = f.groups[2];
  md.push(
    `| \`${path.basename(f.file)}\` | ${r(sym.box.y)}..${r(sym.box.bottom)} | ${r(wm.box.y)}..${r(wm.box.bottom)} | ${r(wm.box.x - sym.box.right)} | ${fam ? r(fam.box.h) : '—'} | ${fam ? r(fam.box.x - wm.box.right) : '—'} |`,
  );
}
md.push('');
md.push(
  failed.length
    ? `## FAILURES (${failed.length})\n\n${failed.map((f) => `- ${f}`).join('\n')}`
    : '## Result\n\nAll checks passed.',
);
fs.writeFileSync(path.join(OUT, 'svg-geometry-report.md'), md.join('\n') + '\n');

console.log(`checked ${results.length} files; ${failed.length} failed checks`);
for (const f of results) {
  const bad = f.checks.filter((c) => !c.ok);
  const ink = f.ink ? `ink ${r(f.ink.x)},${r(f.ink.y)} ${r(f.ink.w)}×${r(f.ink.h)}` : '';
  console.log(
    `${bad.length ? 'FAIL' : 'OK  '} ${f.file} (${f.bytes} B) ${ink}${bad.length ? ' :: ' + bad.map((b) => b.id).join(',') : ''}`,
  );
}
if (failed.length) process.exitCode = 1;
