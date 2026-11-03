/**
 * Registers the MC-18 TypeScript resolution hook for `node --import`.
 *
 * Usage: node --import ./scripts/marea-landing-ts-register.mjs <script.mjs>
 */
import { register } from 'node:module';

register('./marea-landing-ts-loader.mjs', import.meta.url);
