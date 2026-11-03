import fs from 'node:fs';

const file = 'preview/catalogue/app/galleries/foundation.gallery.ts';
let content = fs.readFileSync(file, 'utf8');
const before = content;
content = content.replace(/<marea-section-heading id=/g, '<marea-section-heading [level]="3" id=');
fs.writeFileSync(file, content);
console.log('foundation headings patched:', before !== content);
