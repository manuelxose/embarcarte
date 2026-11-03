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
  content = content.replace(/<span marea-status-badge([^>]*?)\s*\/>/g, '<span marea-status-badge$1></span>');
  if (content !== before) {
    fs.writeFileSync(file, content);
    changed += 1;
    console.log('fixed', file);
  }
}
console.log('files changed', changed);
