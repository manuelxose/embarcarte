import fs from 'node:fs';

const file = 'scripts/build-marea-design-tokens.mjs';
let content = fs.readFileSync(file, 'utf8');
const oldLine = 'cssVar: `--marea-type-${kebab(role)}-${kebab(field)}`,';
const newLine = "cssVar: `--marea-type-${kebab(role)}-${field === 'letterSpacing' ? 'tracking' : kebab(field)}`,";
if (!content.includes(oldLine)) {
  console.log('WARN: line not found');
} else {
  content = content.replace(oldLine, newLine);
  fs.writeFileSync(file, content);
  console.log('generator patched');
}
