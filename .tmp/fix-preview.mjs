import fs from 'node:fs';
import path from 'node:path';

const files = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (entry.name.endsWith('.ts')) files.push(file);
  }
})('preview');

let changed = 0;
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  const before = content;
  content = content.replace(/<\/marea-text>/g, '</p>');
  content = content.replace(/\bgap="(\d)"/g, '[gap]="$1"');
  content = content.replace(/\blevel="(\d)"/g, '[level]="$1"');
  if (content !== before) {
    fs.writeFileSync(file, content);
    changed += 1;
    console.log('fixed', file);
  }
}
console.log('files changed', changed);
