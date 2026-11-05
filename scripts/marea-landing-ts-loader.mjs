/**
 * Minimal ESM resolver hook for the MC-18 tooling.
 *
 * Node 24 strips TypeScript types natively but still requires explicit file
 * extensions for relative ESM specifiers, while the Angular sources use
 * extensionless imports. This hook only resolves a relative specifier that
 * failed normally to `X.ts` or `X/index.ts` inside the repository; it does not
 * transform code, shim dependencies or bypass type stripping.
 */
import { existsSync, statSync } from 'node:fs';
import { dirname, resolve as resolvePath } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const CANDIDATE_SUFFIXES = ['.ts', '.mts', '/index.ts'];

export async function resolve(specifier, context, nextResolve) {
  try {
    return await nextResolve(specifier, context);
  } catch (error) {
    const isRelative = specifier.startsWith('./') || specifier.startsWith('../');
    if (!isRelative || !context.parentURL?.startsWith('file:')) throw error;

    const parentDirectory = dirname(fileURLToPath(context.parentURL));
    const base = resolvePath(parentDirectory, specifier);
    for (const suffix of CANDIDATE_SUFFIXES) {
      const candidate = `${base}${suffix}`;
      if (existsSync(candidate) && statSync(candidate).isFile()) {
        return { url: pathToFileURL(candidate).href, shortCircuit: true };
      }
    }
    throw error;
  }
}
