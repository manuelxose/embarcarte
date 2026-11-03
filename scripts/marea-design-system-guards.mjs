#!/usr/bin/env node
/**
 * MC-17 design-system guard helpers.
 *
 * One resolver shared by the validator (`scripts/check-marea-design-system.mjs`),
 * its unit/adversarial suites and `e2e/design-system/ssr-contract.spec.ts`, so
 * the static gate and the Playwright layer cannot drift apart.
 *
 * Everything here is read-only and deterministic: no network, no writes, no
 * browser APIs. TypeScript is already a devDependency and is used only as a
 * parser/type resolver, never to emit code.
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import ts from 'typescript';

/** Production entry points that must never reach the internal design system. */
export const PRODUCTION_ENTRY_FILES = [
  'src/main.ts',
  'src/main.server.ts',
  'src/app/app.routes.ts',
  'src/app/core/seo.service.ts',
  'src/server.ts',
];

/** Directories that must stay unreachable from the production entry points. */
export const ISOLATED_ROOTS = ['preview', 'src/app/marea-design-system'];

/** Option-like inputs whose documented values are part of the variant contract. */
export const OPTION_INPUT_NAMES =
  /^(?:variant|size|tone|kind|status|mode|state|gap|align|spacing|padding|level|live|freshness)$/;

const RESOLVE_EXTENSIONS = ['', '.ts', '.tsx', '.mts', '.cts', '.js', '.mjs', '.cjs', '.json'];
const INDEX_EXTENSIONS = ['.ts', '.tsx', '.js', '.mjs', '.json'];
const SCRIPT_EXTENSIONS = new Set(['.ts', '.tsx', '.mts', '.cts', '.js', '.mjs', '.cjs']);
const PRIMITIVE_TYPE_NAMES = new Set([
  'string',
  'number',
  'boolean',
  'bigint',
  'symbol',
  'any',
  'unknown',
  'never',
  'void',
  'undefined',
  'null',
  'object',
]);

const toPosix = (path) => path.replaceAll('\\', '/');
const isFile = (path) => {
  try {
    return statSync(path).isFile();
  } catch {
    return false;
  }
};
const isDirectory = (path) => {
  try {
    return statSync(path).isDirectory();
  } catch {
    return false;
  }
};

function walkFiles(directory) {
  const collected = [];
  if (!isDirectory(directory)) return collected;
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) collected.push(...walkFiles(fullPath));
    else if (entry.isFile()) collected.push(fullPath);
  }
  return collected;
}

/** Strip JSONC block/line comments and trailing commas from a tsconfig. */
export function stripJsonComments(text) {
  const withoutBlocks = text.replace(/\/\*[\s\S]*?\*\//g, '');
  const withoutLines = withoutBlocks.replace(/(^|[^:])\/\/[^\n]*/g, '$1');
  return withoutLines.replace(/,(\s*[}\]])/g, '$1');
}

/**
 * Resolve `compilerOptions.baseUrl` / `paths` across the tsconfig `extends`
 * chain. Paths are resolved against the config file that declares them, which
 * is what TypeScript does. A missing file yields an empty resolution.
 */
export function loadTsconfigResolution(root, configRel = 'tsconfig.app.json') {
  const configPath = resolve(root, configRel);
  if (!isFile(configPath)) return { baseUrl: null, paths: [], configPath: null };

  const readConfig = (path, seen) => {
    if (seen.has(path)) return { baseUrl: null, paths: [] };
    seen.add(path);
    const config = JSON.parse(stripJsonComments(readFileSync(path, 'utf8')));
    const directory = dirname(path);
    let baseUrl = null;
    let paths = [];
    if (typeof config.extends === 'string') {
      const parent = isAbsolute(config.extends)
        ? config.extends
        : resolve(directory, config.extends);
      if (isFile(parent)) ({ baseUrl, paths } = readConfig(parent, seen));
    }
    const options = config.compilerOptions ?? {};
    if (typeof options.baseUrl === 'string') baseUrl = resolve(directory, options.baseUrl);
    if (options.paths && typeof options.paths === 'object') {
      const base = baseUrl ?? directory;
      paths = Object.entries(options.paths).map(([pattern, targets]) => ({
        pattern,
        targets: (Array.isArray(targets) ? targets : []).map((target) => ({
          target: String(target),
          base,
        })),
      }));
    }
    return { baseUrl, paths };
  };

  const { baseUrl, paths } = readConfig(configPath, new Set());
  // TypeScript prefers the longest matching pattern prefix; sorting keeps that
  // deterministic regardless of JSON property order.
  paths.sort((left, right) => right.pattern.length - left.pattern.length);
  return { baseUrl, paths, configPath };
}

function matchPathPattern(pattern, specifier) {
  const star = pattern.indexOf('*');
  if (star === -1) return specifier === pattern ? '' : null;
  const prefix = pattern.slice(0, star);
  const suffix = pattern.slice(star + 1);
  if (!specifier.startsWith(prefix) || !specifier.endsWith(suffix)) return null;
  const captured = specifier.slice(prefix.length, specifier.length - suffix.length);
  return captured.length > 0 ? captured : null;
}

function resolveExistingFile(candidate) {
  for (const extension of RESOLVE_EXTENSIONS) {
    if (isFile(candidate + extension)) return candidate + extension;
  }
  for (const extension of INDEX_EXTENSIONS) {
    const indexPath = join(candidate, `index${extension}`);
    if (isFile(indexPath)) return indexPath;
  }
  return null;
}

/**
 * Resolve a module specifier to an existing project file: relative paths,
 * tsconfig `paths` aliases, then `baseUrl`. Bare package specifiers that do not
 * match any alias return null (they are not project modules).
 */
export function resolveProjectModule(
  specifier,
  fromFile,
  resolution = { baseUrl: null, paths: [] },
) {
  if (specifier.startsWith('.') || isAbsolute(specifier)) {
    return resolveExistingFile(resolve(dirname(fromFile), specifier));
  }
  if (specifier.startsWith('#')) return null;
  for (const { pattern, targets } of resolution.paths ?? []) {
    const captured = matchPathPattern(pattern, specifier);
    if (captured === null) continue;
    for (const target of targets) {
      const substituted = target.target.replace('*', captured);
      const resolved = resolveExistingFile(resolve(target.base, substituted));
      if (resolved) return resolved;
    }
  }
  if (resolution.baseUrl) {
    const resolved = resolveExistingFile(resolve(resolution.baseUrl, specifier));
    if (resolved) return resolved;
  }
  return null;
}

/**
 * Extract every static import, re-export, import-equals and dynamic import from
 * a TypeScript/JavaScript source. AST-based so template strings or comments
 * that merely contain "import" cannot create false positives.
 */
export function extractModuleSpecifiers(source, fileName = 'module.ts') {
  const sourceFile = ts.createSourceFile(
    fileName,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );
  const found = [];
  for (const statement of sourceFile.statements) {
    if (ts.isImportDeclaration(statement) && ts.isStringLiteralLike(statement.moduleSpecifier)) {
      found.push({ specifier: statement.moduleSpecifier.text, kind: 'import' });
    } else if (
      ts.isExportDeclaration(statement) &&
      statement.moduleSpecifier &&
      ts.isStringLiteralLike(statement.moduleSpecifier)
    ) {
      found.push({ specifier: statement.moduleSpecifier.text, kind: 're-export' });
    } else if (
      ts.isImportEqualsDeclaration(statement) &&
      ts.isExternalModuleReference(statement.moduleReference) &&
      statement.moduleReference.expression &&
      ts.isStringLiteralLike(statement.moduleReference.expression)
    ) {
      found.push({ specifier: statement.moduleReference.expression.text, kind: 'import-equals' });
    }
  }
  const visit = (node) => {
    if (
      ts.isCallExpression(node) &&
      node.arguments.length > 0 &&
      ts.isStringLiteralLike(node.arguments[0])
    ) {
      if (node.expression.kind === ts.SyntaxKind.ImportKeyword) {
        found.push({ specifier: node.arguments[0].text, kind: 'dynamic-import' });
      } else if (ts.isIdentifier(node.expression) && node.expression.text === 'require') {
        found.push({ specifier: node.arguments[0].text, kind: 'require' });
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
  return found;
}

const LITERAL_FORBIDDEN =
  /(?:^|[\\/])preview[\\/]|marea-design-system|marea-ds-catalogue|marea-theme|(?:^|[@\\/])catalogue(?:[\\/]|$)/i;

/**
 * Follow the production entry points through every local project module and
 * fail when a reachable module resolves under `preview/` or
 * `src/app/marea-design-system/`. Resolves relative specifiers, tsconfig
 * `paths`/`baseUrl` aliases and local transitive bridges. Specifiers that
 * cannot be resolved fall back to a conservative literal check.
 */
export function findIsolationOffenders({ root, entryFiles = PRODUCTION_ENTRY_FILES } = {}) {
  const rootAbsolute = resolve(root);
  const resolution = loadTsconfigResolution(rootAbsolute);
  const forbiddenRoots = ISOLATED_ROOTS.map((path) => resolve(rootAbsolute, path));
  const offenders = new Set();
  const visited = new Set();
  const queue = entryFiles.map((file) => resolve(rootAbsolute, file));
  let scanned = 0;

  const isForbidden = (absolutePath) =>
    forbiddenRoots.some(
      (forbidden) => absolutePath === forbidden || absolutePath.startsWith(`${forbidden}${sep}`),
    );
  const withinRoot = (absolutePath) =>
    absolutePath === rootAbsolute || absolutePath.startsWith(`${rootAbsolute}${sep}`);
  const display = (absolutePath) => toPosix(relative(rootAbsolute, absolutePath));

  for (const entry of queue) {
    if (!isFile(entry)) offenders.add(`${display(entry)}: entry file missing`);
  }

  while (queue.length > 0) {
    const file = queue.shift();
    if (visited.has(file) || !isFile(file)) continue;
    visited.add(file);
    if (isForbidden(file)) {
      offenders.add(`${display(file)}: isolated module reached`);
      continue;
    }
    scanned += 1;
    const source = readFileSync(file, 'utf8');
    for (const { specifier, kind } of extractModuleSpecifiers(source, file)) {
      const resolved = resolveProjectModule(specifier, file, resolution);
      if (!resolved) {
        if (LITERAL_FORBIDDEN.test(specifier)) {
          offenders.add(`${display(file)}: ${specifier} (${kind}, unresolved literal)`);
        }
        continue;
      }
      if (isForbidden(resolved)) {
        offenders.add(`${display(file)}: ${specifier} (${kind}) -> ${display(resolved)}`);
        continue;
      }
      if (withinRoot(resolved) && SCRIPT_EXTENSIONS.has(extensionOf(resolved))) {
        queue.push(resolved);
      }
    }
  }

  return {
    offenders: [...offenders].sort(),
    scanned,
    aliasPatterns: resolution.paths?.length ?? 0,
  };
}

function extensionOf(path) {
  const match = /\.[^./\\]+$/.exec(path);
  return match ? match[0] : '';
}

// ---------------------------------------------------------------- variants

function buildFileContext(absolutePath) {
  const source = readFileSync(absolutePath, 'utf8');
  const sourceFile = ts.createSourceFile(
    absolutePath,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );
  const declarations = new Map();
  const imports = new Map();
  for (const statement of sourceFile.statements) {
    if (ts.isTypeAliasDeclaration(statement)) {
      declarations.set(statement.name.text, {
        kind: 'alias',
        node: statement,
        sourceFile,
        file: absolutePath,
      });
    } else if (ts.isEnumDeclaration(statement)) {
      declarations.set(statement.name.text, {
        kind: 'enum',
        node: statement,
        sourceFile,
        file: absolutePath,
      });
    } else if (ts.isImportDeclaration(statement) && statement.importClause) {
      const specifier = ts.isStringLiteralLike(statement.moduleSpecifier)
        ? statement.moduleSpecifier.text
        : null;
      if (!specifier) continue;
      if (statement.importClause.name) {
        imports.set(statement.importClause.name.text, { specifier, imported: 'default' });
      }
      const bindings = statement.importClause.namedBindings;
      if (bindings && ts.isNamedImports(bindings)) {
        for (const element of bindings.elements) {
          imports.set(element.name.text, {
            specifier,
            imported: (element.propertyName ?? element.name).text,
          });
        }
      } else if (bindings && ts.isNamespaceImport(bindings)) {
        imports.set(bindings.name.text, { specifier, imported: '*' });
      }
    }
  }
  return { absolutePath, sourceFile, declarations, imports };
}

function mergeResolved(...results) {
  const values = new Set();
  const unresolved = [];
  let broad = false;
  for (const result of results) {
    for (const value of result.values) values.add(value);
    unresolved.push(...result.unresolved);
    broad ||= result.broad;
  }
  return { values, broad, unresolved };
}

function broadResult() {
  return { values: new Set(), broad: true, unresolved: [] };
}

function resolveEnumValues(declaration) {
  const values = new Set();
  const unresolved = [];
  for (const member of declaration.node.members) {
    const name = member.name.getText(declaration.sourceFile);
    if (member.initializer && ts.isStringLiteralLike(member.initializer)) {
      values.add(member.initializer.text);
    } else {
      unresolved.push(`enum ${declaration.node.name.text}.${name} has a non-string value`);
    }
  }
  return { values, broad: false, unresolved };
}

function findDeclaration(name, context, project) {
  const local = context.declarations.get(name);
  if (local) return { declaration: local };
  const imported = context.imports.get(name);
  if (!imported) return null;
  const target = resolveProjectModule(imported.specifier, context.absolutePath, project.resolution);
  const targetContext = target ? project.contexts.get(target) : null;
  if (!targetContext) {
    return { unresolved: `cannot resolve module "${imported.specifier}" for "${name}"` };
  }
  if (imported.imported === '*') {
    return { unresolved: `namespace import "${name}" is not enumerable` };
  }
  const declaration = targetContext.declarations.get(imported.imported);
  if (!declaration) {
    return {
      unresolved: `"${imported.imported}" is not a type or enum in "${imported.specifier}"`,
    };
  }
  return { declaration };
}

function resolveDeclaration(declaration, project, stack) {
  const key = `${declaration.file}#${declaration.node.name.text}`;
  if (stack.has(key)) {
    return { values: new Set(), broad: false, unresolved: [`circular type "${key}"`] };
  }
  stack.add(key);
  try {
    if (declaration.kind === 'alias') {
      const context = project.contexts.get(declaration.file);
      return resolveTypeNode(declaration.node.type, context, project, stack);
    }
    return resolveEnumValues(declaration);
  } finally {
    stack.delete(key);
  }
}

function resolveNamedType(name, context, project, stack) {
  if (PRIMITIVE_TYPE_NAMES.has(name)) return broadResult();
  const found = findDeclaration(name, context, project);
  if (found?.declaration) return resolveDeclaration(found.declaration, project, stack);
  return {
    values: new Set(),
    broad: false,
    unresolved: [found?.unresolved ?? `unresolved type "${name}"`],
  };
}

function resolveTypeNode(node, context, project, stack) {
  if (!node) return broadResult();
  if (ts.isParenthesizedTypeNode(node)) {
    return resolveTypeNode(node.type, context, project, stack);
  }
  if (ts.isUnionTypeNode(node)) {
    return mergeResolved(
      ...node.types.map((type) => resolveTypeNode(type, context, project, stack)),
    );
  }
  if (ts.isLiteralTypeNode(node)) {
    return ts.isStringLiteralLike(node.literal)
      ? { values: new Set([node.literal.text]), broad: false, unresolved: [] }
      : broadResult();
  }
  if (ts.isTypeReferenceNode(node)) {
    if (node.typeArguments && node.typeArguments.length > 0) return broadResult();
    if (!ts.isIdentifier(node.typeName)) return broadResult();
    return resolveNamedType(node.typeName.text, context, project, stack);
  }
  if (ts.isTypeOperatorNode(node)) return resolveTypeNode(node.type, context, project, stack);
  // Arrays, tuples, maps, intersections, functions, conditional and import
  // types are not enumerable string sets: treat them as documented-but-broad.
  return broadResult();
}

function resolveDefaultValue(callExpression, context, project, stack) {
  const argument = callExpression.arguments[0];
  if (!argument) return { values: new Set(), broad: false, unresolved: [] };
  if (ts.isStringLiteralLike(argument)) {
    return { values: new Set([argument.text]), broad: false, unresolved: [] };
  }
  if (ts.isPropertyAccessExpression(argument) && ts.isIdentifier(argument.expression)) {
    const found = findDeclaration(argument.expression.text, context, project);
    if (found?.declaration?.kind === 'enum') {
      const member = found.declaration.node.members.find(
        (candidate) => candidate.name.getText(found.declaration.sourceFile) === argument.name.text,
      );
      if (member?.initializer && ts.isStringLiteralLike(member.initializer)) {
        return { values: new Set([member.initializer.text]), broad: false, unresolved: [] };
      }
      return {
        values: new Set(),
        broad: false,
        unresolved: [`default ${argument.expression.text}.${argument.name.text} is not a string`],
      };
    }
    return {
      values: new Set(),
      broad: false,
      unresolved: [`default ${argument.getText(context.sourceFile)} cannot be resolved`],
    };
  }
  void stack;
  return { values: new Set(), broad: false, unresolved: [] };
}

function calleeName(expression) {
  if (ts.isIdentifier(expression)) return expression.text;
  if (ts.isPropertyAccessExpression(expression) && ts.isIdentifier(expression.expression)) {
    return `${expression.expression.text}.${expression.name.text}`;
  }
  return '';
}

function optionInputDeclarations(sourceFile) {
  const declarations = [];
  for (const statement of sourceFile.statements) {
    if (!ts.isClassDeclaration(statement)) continue;
    for (const member of statement.members) {
      if (!ts.isPropertyDeclaration(member) || !ts.isIdentifier(member.name)) continue;
      if (!OPTION_INPUT_NAMES.test(member.name.text)) continue;
      if (!member.initializer || !ts.isCallExpression(member.initializer)) continue;
      const name = calleeName(member.initializer.expression);
      if (!/^(?:input|model)(?:\.required)?$/.test(name)) continue;
      declarations.push({
        name: member.name.text,
        call: member.initializer,
        typeNode: member.initializer.typeArguments?.[0] ?? null,
      });
    }
  }
  return declarations;
}

const normalizeTypeText = (text) => text.replace(/\s+/g, ' ').trim();

/**
 * Resolve every option-like `input<T>(default)` / `input.required<T>()` in the
 * design-system sources and compare the complete string value set with the
 * registry:
 *
 * - the registry-declared type for the input (aliases, enums, unions, imports),
 * - the component's `visualVariants`, in both directions.
 *
 * Constructs that cannot be enumerated are reported as `unresolved` instead of
 * being silently ignored. Broad, explicitly non-enumerable types (`string`,
 * `string | null`) are counted as skipped, not as failures.
 */
export function analyzeVariantCoverage({ root, dsDir = 'src/app/marea-design-system', registry }) {
  const rootAbsolute = resolve(root);
  const resolution = loadTsconfigResolution(rootAbsolute);
  const files = walkFiles(resolve(rootAbsolute, dsDir)).filter((file) => file.endsWith('.ts'));
  const contexts = new Map(
    files.map((file) => {
      const context = buildFileContext(file);
      return [file, context];
    }),
  );
  const project = { contexts, resolution };
  const documentedTypeCache = new Map();
  const offenders = new Set();
  let optionInputs = 0;
  let resolvedValues = 0;
  let nonEnumerable = 0;
  let visualMatched = 0;

  const resolveDocumentedType = (typeText, context) => {
    const key = `${context.absolutePath}|${typeText}`;
    if (documentedTypeCache.has(key)) return documentedTypeCache.get(key);
    const synthetic = ts.createSourceFile(
      '__documented_type__.ts',
      `type __Documented = ${typeText};`,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TS,
    );
    const alias = synthetic.statements.find(ts.isTypeAliasDeclaration);
    const result = alias
      ? resolveTypeNode(alias.type, context, project, new Set())
      : {
          values: new Set(),
          broad: false,
          unresolved: [`cannot parse documented type "${typeText}"`],
        };
    documentedTypeCache.set(key, result);
    return result;
  };

  for (const entry of registry.components ?? []) {
    const componentId = entry.componentId ?? 'unknown';
    const absolutePath = resolve(rootAbsolute, entry.implementationPath ?? '');
    const context = project.contexts.get(absolutePath);
    if (!context) {
      offenders.add(`${componentId}: implementation not parsed (${entry.implementationPath})`);
      continue;
    }
    const variantSet = new Set(Array.isArray(entry.visualVariants) ? entry.visualVariants : []);
    const visualValues = new Set();
    const declared = optionInputDeclarations(context.sourceFile);
    for (const input of declared) {
      const registryInput = (entry.inputs ?? []).find((candidate) => candidate.name === input.name);
      if (!registryInput) {
        offenders.add(
          `${componentId}.${input.name}: option input is not documented in the registry`,
        );
        continue;
      }
      optionInputs += 1;
      const documented = resolveDocumentedType(registryInput.type, context);
      const declaredType = input.typeNode
        ? resolveTypeNode(input.typeNode, context, project, new Set())
        : { values: new Set(), broad: true, unresolved: [`${input.name} has no type argument`] };
      const defaultValue = resolveDefaultValue(input.call, context, project, new Set());
      const actual = mergeResolved(declaredType, defaultValue);

      if (input.typeNode) {
        const actualText = normalizeTypeText(input.typeNode.getText(context.sourceFile));
        const documentedText = normalizeTypeText(registryInput.type ?? '');
        if (documentedText && actualText !== documentedText) {
          offenders.add(
            `${componentId}.${input.name}: declared type "${actualText}" drifts from documented "${documentedText}"`,
          );
        }
      }

      if (actual.unresolved.length > 0 || documented.unresolved.length > 0) {
        const problems = [...actual.unresolved, ...documented.unresolved].join('; ');
        offenders.add(`${componentId}.${input.name}: unresolved (${problems})`);
        continue;
      }
      if (actual.broad || documented.broad) {
        nonEnumerable += 1;
        continue;
      }
      resolvedValues += actual.values.size;
      for (const value of actual.values) {
        if (!documented.values.has(value)) {
          offenders.add(
            `${componentId}.${input.name}=${value} is not documented by type "${registryInput.type}"`,
          );
        }
      }
      for (const value of documented.values) {
        if (!actual.values.has(value)) {
          offenders.add(
            `${componentId}.${input.name}: documented value "${value}" is not implemented`,
          );
        }
      }
      const documentedIsVisual =
        documented.values.size > 0 &&
        [...documented.values].every((value) => variantSet.has(value));
      if (documentedIsVisual) {
        for (const value of actual.values) visualValues.add(value);
      }
    }

    for (const value of visualValues) {
      if (!variantSet.has(value)) {
        offenders.add(`${componentId}: undocumented visual variant "${value}"`);
      }
    }
    for (const value of variantSet) {
      if (!visualValues.has(value)) {
        offenders.add(`${componentId}: variant "${value}" declared but not implemented`);
      }
    }
    if (
      visualValues.size === variantSet.size &&
      [...variantSet].every((value) => visualValues.has(value))
    ) {
      visualMatched += variantSet.size;
    }
  }

  return {
    offenders: [...offenders].sort(),
    optionInputs,
    resolvedValues,
    nonEnumerable,
    visualMatched,
  };
}

// ---------------------------------------------------------------- focus

/**
 * Validate a component's `:focus-visible` contract. Every focus rule must keep
 * a visible outline: `outline: none`, zero-width outlines, `outline-style:
 * none` and transparent outline colours are all rejected, even when the rule
 * still references `--marea-focus-ring`.
 */
export function focusContractProblems(source, { focusToken = '--marea-focus-ring' } = {}) {
  const problems = new Set();
  const blocks = [...source.matchAll(/:focus-visible[^{}]*\{([^{}]*)\}/g)].map((match) => match[1]);
  if (blocks.length === 0) return ['no :focus-visible rule'];
  for (const block of blocks) {
    for (const declaration of block.split(';')) {
      const separator = declaration.indexOf(':');
      if (separator === -1) continue;
      const property = declaration.slice(0, separator).trim().toLowerCase();
      const value = declaration
        .slice(separator + 1)
        .replace(/!important/gi, '')
        .trim()
        .toLowerCase();
      if (property === 'outline') {
        if (/^0(?:px|rem|em|%|vh|vw)?\b/.test(value) || /^none\b/.test(value)) {
          problems.add(`invisible outline ("outline: ${value}")`);
        } else if (/\btransparent\b/.test(value)) {
          problems.add(`transparent outline ("outline: ${value}")`);
        }
      } else if (property === 'outline-color' && /\btransparent\b/.test(value)) {
        problems.add(`transparent outline colour ("outline-color: ${value}")`);
      } else if (property === 'outline-style' && /^none\b/.test(value)) {
        problems.add(`hidden outline style ("outline-style: ${value}")`);
      } else if (property === 'outline-width' && /^0(?:px|rem|em|%)?\b/.test(value)) {
        problems.add(`zero outline width ("outline-width: ${value}")`);
      }
    }
  }
  if (!blocks.some((block) => block.includes(focusToken))) {
    problems.add(`:focus-visible does not reference ${focusToken}`);
  }
  return [...problems];
}

/** True when a path exists (small convenience used by tests). */
export function fileExists(path) {
  return existsSync(path);
}

// ---------------------------------------------------------------- families

/**
 * Static coupling read of `FAMILY_LIMIT_KEYS` in the commerce presentation
 * adapter. Returns the familyId → copy-key map; it does not render anything.
 */
export function extractFamilyLimitKeys({
  root,
  adapterPath = 'src/app/marea-design-system/data/commerce-presentation.adapter.ts',
} = {}) {
  const absolutePath = resolve(root, adapterPath);
  if (!isFile(absolutePath)) {
    return { keys: new Map(), unresolved: [`missing ${adapterPath}`] };
  }
  const sourceFile = ts.createSourceFile(
    absolutePath,
    readFileSync(absolutePath, 'utf8'),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );
  let initializer = null;
  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (
        ts.isIdentifier(declaration.name) &&
        declaration.name.text === 'FAMILY_LIMIT_KEYS' &&
        declaration.initializer
      ) {
        initializer = declaration.initializer;
      }
    }
  }
  if (!initializer || !ts.isObjectLiteralExpression(initializer)) {
    return { keys: new Map(), unresolved: ['FAMILY_LIMIT_KEYS object literal not found'] };
  }
  const keys = new Map();
  for (const property of initializer.properties) {
    if (!ts.isPropertyAssignment(property)) continue;
    const name = ts.isIdentifier(property.name)
      ? property.name.text
      : ts.isStringLiteralLike(property.name)
        ? property.name.text
        : null;
    const value = ts.isStringLiteralLike(property.initializer) ? property.initializer.text : null;
    if (name && value) keys.set(name, value);
  }
  return { keys, unresolved: [] };
}

/**
 * Static read of the commerce gallery: how many family-card specimens its
 * template instantiates and which fixture families it references. Rendered
 * evidence remains the exclusive job of the Playwright suite.
 */
export function analyzeFamilyGalleryCoupling({
  root,
  galleryPath = 'preview/catalogue/app/galleries/commerce.gallery.ts',
} = {}) {
  const absolutePath = resolve(root, galleryPath);
  if (!isFile(absolutePath)) {
    return { cards: 0, familyIds: new Set(), unresolved: [`missing ${galleryPath}`] };
  }
  const source = readFileSync(absolutePath, 'utf8');
  // Map component fields to their fixture family, so auxiliary/adversarial
  // templates that bind `[family]="specimen.family"` are not counted as
  // documented family cards.
  const fixtureVariables = new Map(
    [...source.matchAll(/readonly\s+(\w+)\s*=\s*familyFixture\(\s*'([A-Z0-9-]+)'\s*\)/g)].map(
      (match) => [match[1], match[2]],
    ),
  );
  const familyIds = new Set();
  let cards = 0;
  for (const [, attributes] of source.matchAll(/<marea-family-card\b([\s\S]*?)\/>/g)) {
    const binding = /\[family\]="([A-Za-z_$][\w$]*)"/.exec(attributes)?.[1];
    const familyId = binding ? fixtureVariables.get(binding) : null;
    if (!familyId) continue;
    cards += 1;
    familyIds.add(familyId);
  }
  return { cards, familyIds, unresolved: [] };
}
