import fs from 'node:fs';
import path from 'node:path';

const walk = (dir, out = []) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(file, out);
    else if (file.endsWith('.ts')) out.push(file);
  }
  return out;
};

// 1) Generated token names are kebab-case: bodySmall -> body-small.
let renamed = 0;
for (const file of [...walk('src/app/marea-design-system'), ...walk('preview')]) {
  const before = fs.readFileSync(file, 'utf8');
  const after = before.replaceAll('--marea-type-bodySmall', '--marea-type-body-small');
  if (after !== before) {
    fs.writeFileSync(file, after);
    renamed += 1;
  }
}
console.log('files with bodySmall token renamed:', renamed);

// 2) Form field ids must come from the deterministic per-render generator, not a
//    process-wide module counter (SSR requests would drift).
const fieldFile = 'src/app/marea-design-system/components/foundation/marea-form-field.ts';
let field = fs.readFileSync(fieldFile, 'utf8');
field = field.replace("import { MareaI18n } from '../../core/i18n';", "import { MareaI18n } from '../../core/i18n';\nimport { MareaIds } from '../../core/ids';");
field = field.replace('let fieldSequence = 0;\n\n', '');
field = field.replace("  readonly i18n = inject(MareaI18n);\n\n  private readonly base = `marea-field-${++fieldSequence}`;", "  readonly i18n = inject(MareaI18n);\n\n  private readonly ids = inject(MareaIds);\n  private readonly base = this.ids.next('field');");
fs.writeFileSync(fieldFile, field);
console.log('form field id generator using MareaIds:', field.includes("this.ids.next('field')"));

// 3) Registry token dependencies follow the same rename.
const registryFile = 'docs/marea/design-system/data/component-registry.json';
let registry = fs.readFileSync(registryFile, 'utf8');
registry = registry.replaceAll('--marea-type-bodySmall', '--marea-type-body-small');
fs.writeFileSync(registryFile, registry);
console.log('registry token names updated');

// 4) Validator: camelCase token references were silently truncated by the old regex.
const validatorFile = 'scripts/check-marea-design-system.mjs';
let validator = fs.readFileSync(validatorFile, 'utf8');
validator = validator.replace(
  "for (const file of sources) for (const match of read(file).matchAll(/--marea-[a-z0-9-]+/g)) referenced.add(match[0]);",
  "for (const file of sources) for (const match of read(file).matchAll(/--marea-[A-Za-z0-9-]+/g)) referenced.add(match[0]);",
);
validator = validator.replace(
  "  const unresolved = [...referenced].filter((name) => !definedVars.has(name) && !runtimeVars.has(name));",
  "  const unresolved = [...referenced].filter((name) => /[A-Z]/.test(name) || (!definedVars.has(name) && !runtimeVars.has(name)));",
);
fs.writeFileSync(validatorFile, validator);
console.log('validator token regex updated');
