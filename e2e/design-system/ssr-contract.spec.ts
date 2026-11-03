import { expect, test } from '@playwright/test';
import { readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';

/**
 * Contrato SSR/hidratación del sistema de diseño aislado MC-17.
 *
 * El catálogo es CSR-only por diseño y el DS NO forma parte de la aplicación
 * pública SSR. Estas comprobaciones son estructurales (fs + regex), no de
 * navegador: demuestran que el DS no introduce APIs de navegador en rutas de
 * render, ids no deterministas ni acoplamientos al entry de producción.
 */

const ROOT = process.cwd();
const DS_ROOT = join(ROOT, 'src/app/marea-design-system');
const PRODUCTION_ENTRY_FILES = [
  'src/main.ts',
  'src/main.server.ts',
  'src/app/app.routes.ts',
  'src/app/core/seo.service.ts',
  'src/server.ts',
] as const;

const FORBIDDEN_GLOBALS = [
  'window',
  'localStorage',
  'sessionStorage',
  'matchMedia',
  'navigator',
] as const;

const NONDETERMINISTIC_PATTERN = /(?:Math\.random\s*\(|Date\.now\s*\(|new\s+Date\s*\()/;
const FORBIDDEN_GLOBALS_PATTERN =
  /(?<![\w$])(window|localStorage|sessionStorage|matchMedia|navigator)\s*(?:\.|\[|\()/g;
const DOCUMENT_USAGE_PATTERN = /(?<![\w$])document\s*(?:\.|\[|\()/g;

test('DS source does not reference browser-only globals outside handler bodies', async () => {
  const files = collectFiles(DS_ROOT, '.ts');
  expect(files.length, `No se encontraron fuentes del DS en ${DS_ROOT}`).toBeGreaterThan(0);

  const violations: string[] = [];
  const documentUsages: {
    file: string;
    line: number;
    depth: number;
    allowed: boolean;
    context: string;
  }[] = [];

  for (const file of files) {
    const source = stripComments(readFileSync(file, 'utf8'));
    const depthMap = buildDepthMap(source);
    const display = toPosix(relative(ROOT, file));

    for (const match of source.matchAll(FORBIDDEN_GLOBALS_PATTERN)) {
      violations.push(`${display}:${lineNumberAt(source, match.index ?? 0)} usa "${match[1]}.…"`);
    }

    for (const match of source.matchAll(DOCUMENT_USAGE_PATTERN)) {
      const index = match.index ?? 0;
      const depth = depthMap[index] ?? 0;
      // Pragmático: un cuerpo de método Angular (miembro de clase) está a
      // profundidad >= 2. Ahí `document` sólo se ejecuta en el cliente
      // (handlers de plantilla / on*). Fuera de un método es ambiguo y se revisa.
      const allowed = depth >= 2;
      documentUsages.push({
        file: display,
        line: lineNumberAt(source, index),
        depth,
        allowed,
        context: source
          .slice(index, Math.min(source.length, index + 120))
          .replace(/\s+/g, ' ')
          .trim(),
      });
    }
  }

  const ambiguousDocuments = documentUsages.filter((usage) => !usage.allowed);
  await test.info().attach('ssr-global-scan', {
    body: JSON.stringify(
      {
        scannedFiles: files.map((file) => toPosix(relative(ROOT, file))),
        violations,
        documentUsages,
        ambiguousDocuments,
      },
      null,
      2,
    ),
    contentType: 'application/json',
  });

  expect(
    violations,
    `Identificadores prohibidos en fuentes del DS (deben ir en handlers de plantilla):\n${violations.join('\n')}`,
  ).toEqual([]);

  expect(
    ambiguousDocuments,
    [
      'Uso de `document` fuera de un cuerpo de método: no puede probarse que sea seguro en SSR.',
      'Revisar y mover el acceso a un handler on*/de plantilla, o justificar la excepción:',
      ...ambiguousDocuments.map(
        (usage) => `${usage.file}:${usage.line} (depth ${usage.depth}) → ${usage.context}`,
      ),
    ].join('\n'),
  ).toEqual([]);
});

test('DS source has no nondeterministic ids or timestamps', async () => {
  // Componentes, tema, adaptador y fixtures (todo el árbol del DS salvo tokens generados).
  const directories = ['components', 'theme', 'data', 'core'].map((directory) =>
    join(DS_ROOT, directory),
  );
  const files = directories.flatMap((directory) => collectFiles(directory, '.ts'));
  expect(files.length).toBeGreaterThan(0);

  const offenders = files
    .filter((file) => NONDETERMINISTIC_PATTERN.test(stripComments(readFileSync(file, 'utf8'))))
    .map((file) => toPosix(relative(ROOT, file)));

  expect(
    offenders,
    `Math.random/Date.now/new Date en fuentes del DS (ids no deterministas):\n${offenders.join('\n')}`,
  ).toEqual([]);
});

test('the production SSR entry does not import the internal design system', () => {
  const offenders: string[] = [];
  for (const file of PRODUCTION_ENTRY_FILES) {
    const source = readFileSync(join(ROOT, file), 'utf8');
    if (/marea-design-system|marea-/i.test(source)) {
      offenders.push(file);
    }
  }
  expect(
    offenders,
    `El entry de producción referencia el DS interno (no debe hacerlo): ${offenders.join(', ')}`,
  ).toEqual([]);
});

test('angular.json embarcarte project excludes token CSS and the catalogue', () => {
  const angular = JSON.parse(readFileSync(join(ROOT, 'angular.json'), 'utf8')) as {
    projects?: Record<
      string,
      { architect?: { build?: { options?: { styles?: unknown[]; assets?: unknown[] } } } }
    >;
  };
  const options = angular.projects?.['embarcarte']?.architect?.build?.options;
  expect(options, 'No existe el proyecto embarcarte en angular.json').toBeTruthy();

  const styles = (options?.styles ?? []).map((entry) => String(entry));
  const assets = (options?.assets ?? []).map((entry) =>
    typeof entry === 'string' ? entry : JSON.stringify(entry),
  );

  expect(styles).toContain('src/styles.scss');
  const leaking = [...styles, ...assets].filter((entry) => /marea|preview|catalogue/i.test(entry));
  expect(
    leaking,
    `El build público incluye estilos/assets del catálogo o del DS: ${leaking.join(', ')}`,
  ).toEqual([]);
});

test('src/styles.scss does not import any MAREA design-system file', () => {
  const source = readFileSync(join(ROOT, 'src/styles.scss'), 'utf8');
  expect(
    source,
    'src/styles.scss importa el DS interno; debe permanecer aislado en el catálogo',
  ).not.toMatch(/marea/i);
});

/** Lista recursiva de archivos con la extensión indicada. */
function collectFiles(root: string, extension: string): string[] {
  const collected: string[] = [];
  const walk = (directory: string): void => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const fullPath = join(directory, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name.endsWith(extension)) {
        collected.push(fullPath);
      }
    }
  };
  walk(root);
  return collected;
}

/** Elimina comentarios conservando los saltos de línea (y por tanto las líneas). */
function stripComments(source: string): string {
  const withoutBlocks = source.replace(/\/\*[\s\S]*?\*\//g, (match) =>
    match.replace(/[^\n]/g, ' '),
  );
  return withoutBlocks.replace(
    /(^|[^:])\/\/[^\n]*/g,
    (match, prefix: string) => `${prefix}${' '.repeat(match.length - prefix.length)}`,
  );
}

/** Mapa profundidad-de-llaves por índice, ignorando strings y template literals. */
function buildDepthMap(source: string): Int32Array {
  const depths = new Int32Array(source.length);
  let depth = 0;
  let index = 0;
  while (index < source.length) {
    const character = source[index];
    depths[index] = depth;
    if (character === '"' || character === "'" || character === '`') {
      index = skipString(source, index);
      continue;
    }
    if (character === '{') {
      depth += 1;
    } else if (character === '}') {
      depth = Math.max(0, depth - 1);
    }
    index += 1;
  }
  return depths;
}

function skipString(source: string, start: number): number {
  const quote = source[start];
  let index = start + 1;
  while (index < source.length) {
    if (source[index] === '\\') {
      index += 2;
      continue;
    }
    if (source[index] === quote) {
      return index + 1;
    }
    index += 1;
  }
  return index;
}

function lineNumberAt(source: string, index: number): number {
  return source.slice(0, index).split('\n').length;
}

function toPosix(path: string): string {
  return path.replace(/\\/g, '/');
}

test('production entries import no design-system or preview module by any path', () => {
  const files = ['src/main.ts', 'src/main.server.ts', 'src/app/app.routes.ts', 'src/app/core/seo.service.ts', 'src/server.ts'];
  const offenders: string[] = [];
  for (const file of files) {
    const source = readFileSync(file, 'utf8');
    for (const match of source.matchAll(/(?:from|import)\s*\(?\s*['"]([^'"]+)['"]/g)) {
      if (/marea|preview\//i.test(match[1])) offenders.push(file + ': ' + match[1]);
    }
  }
  expect(offenders, offenders.join('\n')).toEqual([]);
});
