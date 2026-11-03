import fs from 'node:fs';
import path from 'node:path';

// 1) Fix component token references to the real border-width variable.
const walk = (dir, out = []) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(file, out);
    else if (file.endsWith('.ts')) out.push(file);
  }
  return out;
};
let fixed = 0;
for (const file of walk('src/app/marea-design-system')) {
  const before = fs.readFileSync(file, 'utf8');
  const after = before.replaceAll('--marea-border-hairline', '--marea-border-width-hairline');
  if (after !== before) {
    fs.writeFileSync(file, after);
    fixed += 1;
  }
}
console.log('component var references fixed:', fixed);

// 2) Validator: correct typography variable names, allow the dynamic space prefix,
//    and keep the catalogue shell out of the DS global-override rule.
const file = 'scripts/check-marea-design-system.mjs';
let content = fs.readFileSync(file, 'utf8');
const oldBlock = `for (const [role, def] of Object.entries(tokenSource.tokens.typography.roles)) {
  const kebab = (value) => value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  for (const field of ['size', 'lineHeight', 'weight', 'letterSpacing']) definedVars.add(\`--marea-type-\${kebab(role)}-\${kebab(field)}\`);
  if (def.textTransform) definedVars.add(\`--marea-type-\${kebab(role)}-transform\`);
  if (def.numeric) definedVars.add(\`--marea-type-\${kebab(role)}-numeric\`);
}`;
const newBlock = `for (const [role, def] of Object.entries(tokenSource.tokens.typography.roles)) {
  const prefix = \`--marea-type-\${role.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()}\`;
  for (const suffix of ['family', 'size', 'line-height', 'weight', 'tracking']) definedVars.add(\`\${prefix}-\${suffix}\`);
  if (def.textTransform) definedVars.add(\`\${prefix}-transform\`);
  if (def.numeric) definedVars.add(\`\${prefix}-numeric\`);
}`;
if (!content.includes(oldBlock)) console.log('WARN: typography validator block not found (may already be patched)');
else content = content.replace(oldBlock, newBlock);

content = content.replace(
  "const runtimeVars = new Set(['--marea-grid-min', '--marea-stack-gap', '--marea-inline-gap']);",
  "const runtimeVars = new Set(['--marea-grid-min', '--marea-stack-gap', '--marea-inline-gap', '--marea-space-']);",
);
content = content.replace(
  "  for (const file of [...DS_FILES, ...PREVIEW_FILES].filter((candidate) => /\\.(ts|scss|css)$/.test(candidate))) {",
  "  for (const file of DS_FILES.filter((candidate) => /\\.(ts|scss|css)$/.test(candidate))) {",
);
fs.writeFileSync(file, content);
console.log('validator patched');
