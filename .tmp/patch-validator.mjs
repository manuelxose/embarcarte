import fs from 'node:fs';

const file = 'scripts/check-marea-design-system.mjs';
let content = fs.readFileSync(file, 'utf8');

const start = content.indexOf("add('MC17-16'");
const end = content.indexOf("add('MC17-17'");
if (start < 0 || end < 0) throw new Error('MC17-16 block not found');

const replacement = `add('MC17-16', 'Instrument numerics use the Manrope numeric role with tabular figures', () => {
  // Only components that actually render an instrument numeric value must use the numeric role.
  const numericRenderers = ['src/app/marea-design-system/components/instrument/marea-numeric-readout.ts', 'src/app/marea-design-system/components/instrument/marea-telemetry-list.ts'];
  const offenders = [];
  for (const file of numericRenderers) {
    if (!exists(file)) {
      offenders.push(\`\${file}: missing\`);
      continue;
    }
    const source = read(file);
    if (!source.includes('--marea-type-numeric')) offenders.push(\`\${file}: no numeric typography role\`);
    if (!/tabular-nums|type-numeric-[a-z]+-numeric/.test(source)) offenders.push(\`\${file}: no tabular figures\`);
    if (/font-family:\\s*var\\(--marea-font-body\\)[^;]*;\\s*\\}/.test(source) && source.includes('class="value"')) offenders.push(\`\${file}: numeric value uses body family\`);
  }
  return offenders.length === 0 ? pass(\`\${numericRenderers.length} numeric renderers use Manrope tabular figures\`) : fail(offenders.join(' | '));
});

`;

content = content.slice(0, start) + replacement + content.slice(end);
content = content.replace('(fixtures.match(/"editionId":/g) ?? []).length !== 26', '(fixtures.match(/"editionType":/g) ?? []).length !== 26');
content = content.replace(
  'const count = Array.isArray(routes.routes) ? routes.routes.length : Array.isArray(routes) ? routes.length : 0;',
  'const count = Array.isArray(routes.items) ? routes.items.length : Array.isArray(routes.routes) ? routes.routes.length : 0;',
);
fs.writeFileSync(file, content);
console.log('validator patched');
