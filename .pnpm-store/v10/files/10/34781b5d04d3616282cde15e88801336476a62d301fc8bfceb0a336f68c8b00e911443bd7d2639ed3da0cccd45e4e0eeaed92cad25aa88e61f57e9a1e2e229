import type { ExportsTarget } from '../install/package.js';
export declare function getMapMatch<T = any>(specifier: string, map: Record<string, T>): string | undefined;
export declare function allDotKeys(exports: Record<string, any>): boolean;
/**
 * Get the set of export subpath prefixes that can be losslessly collapsed
 * into trailing-slash import map entries.
 *
 * A wildcard export like `"./modules/*": "./modules/*"` can be represented
 * as `pkg/modules/` → `base/modules/` without expanding individual files.
 * Suffix wildcards like `"./foo/*.js": "./src/*.js"` are only eligible if
 * all files under the target prefix match the suffix (no file leakage).
 */
export declare function getWildcardPrefixes(exports: ExportsTarget | Record<string, ExportsTarget>, env: string[], files?: Set<string>): Set<string>;
/**
 * Expand a package exports field into its set of subpaths and resolution
 * With an optional file list for expanding globs
 */
export declare function expandExportsResolutions(exports: ExportsTarget | Record<string, ExportsTarget>, env: string[], files?: Set<string> | undefined, exportsResolutions?: Map<string, string>): void;
/**
 * Expand a package exports field into a list of entry points
 * With an optional file list for expanding globs
 */
export declare function expandExportsEntries(exports: ExportsTarget | Record<string, ExportsTarget>, env: string[], files?: Set<string> | undefined, entriesList?: Set<string>): void;
