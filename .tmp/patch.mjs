import fs from 'node:fs';
const angular = JSON.parse(fs.readFileSync('angular.json', 'utf8'));
angular.projects['marea-design-system-catalogue'] = {
  projectType: 'application',
  root: 'preview',
  sourceRoot: 'preview',
  prefix: 'marea',
  architect: {
    build: {
      builder: '@angular/build:application',
      options: {
        browser: 'preview/main.ts',
        index: 'preview/index.html',
        tsConfig: 'preview/tsconfig.json',
        inlineStyleLanguage: 'scss',
        outputPath: 'dist/marea-ds-catalogue',
        styles: ['preview/catalogue.css'],
        optimization: false,
        sourceMap: true,
        assets: [],
      },
      configurations: {
        development: {},
        production: {
          optimization: true,
          outputHashing: 'all',
          budgets: [
            { type: 'initial', maximumWarning: '500kB', maximumError: '1MB' },
            { type: 'anyComponentStyle', maximumWarning: '6kB', maximumError: '8kB' },
          ],
        },
      },
      defaultConfiguration: 'development',
    },
    serve: {
      builder: '@angular/build:dev-server',
      configurations: {
        development: { buildTarget: 'marea-design-system-catalogue:build:development' },
        production: { buildTarget: 'marea-design-system-catalogue:build:production' },
      },
      defaultConfiguration: 'development',
    },
  },
};
fs.writeFileSync('angular.json', JSON.stringify(angular, null, 2) + '\n');

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const s = pkg.scripts;
s.build = 'ng build embarcarte';
s.start = 'ng serve embarcarte';
s.watch = 'ng build embarcarte --watch --configuration development';
s['build:tokens'] = 'node scripts/build-marea-design-tokens.mjs && node scripts/build-marea-design-system-fixtures.mjs';
s['test:design-system'] = 'node scripts/check-marea-design-system.mjs';
s['test:design-system:unit'] = 'node --test --test-isolation=none scripts/check-marea-design-system.test.mjs scripts/check-marea-design-system-adversarial.test.mjs';
s['test:design-system:visual'] = 'playwright test -c playwright.design-system.config.ts';
s['build:design-system-preview'] = 'ng build marea-design-system-catalogue';
s['preview:design-system'] = 'ng serve marea-design-system-catalogue --port 4301';
s['serve:design-system-preview'] = 'node scripts/marea-ds-preview-server.mjs';
const extra = ['scripts/build-marea-design-tokens.mjs', 'scripts/build-marea-design-system-fixtures.mjs', 'scripts/check-marea-design-system.mjs', 'scripts/check-marea-design-system.test.mjs', 'scripts/check-marea-design-system-adversarial.test.mjs', 'scripts/marea-design-system-policy.mjs', 'scripts/build-marea-design-system-catalogue-data.mjs', 'scripts/marea-ds-preview-server.mjs'];
for (const field of ['format', 'format:check']) {
  const prefix = field === 'format' ? 'prettier --write ' : 'prettier --check ';
  const existing = s[field].slice(prefix.length);
  const list = existing.split(' ').filter(Boolean);
  for (const file of extra) if (!list.includes(file)) list.push(file);
  s[field] = prefix + list.join(' ');
}
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
console.log('angular.json + package.json patched');
