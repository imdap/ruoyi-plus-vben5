import { InstallTarget, PackageProvider } from './installer.js';
import { Resolver } from '../trace/resolver.js';
import { Install } from '../generator.js';
/**
 * ExportsTarget defines specifier mappings for the public entry points of a
 * package, with support for conditionals.
 *   see https://nodejs.org/dist/latest-v19.x/docs/api/packages.html#exports
 */
export type ExportsTarget = '.' | `./${string}` | null | {
    [condition: string]: ExportsTarget;
} | ExportsTarget[];
/**
 * ImportsTarget defines private specifier mappings that apply only to the
 * internal imports of a package, with support for conditionals.
 *   see https://nodejs.org/dist/latest-v19.x/docs/api/packages.html#imports
 */
export type ImportsTarget = string | null | {
    [condition: string]: ExportsTarget;
} | ExportsTarget[];
/**
 * PackageConfig is a parsed version of a package's package.json file.
 *   see https://nodejs.org/dist/latest-v19.x/docs/api/packages.html
 */
export interface PackageConfig {
    registry?: string;
    name?: string;
    version?: string;
    main?: string;
    files?: string[];
    module?: string;
    browser?: string | Record<string, string | false>;
    imports?: Record<string, ExportsTarget>;
    exports?: ExportsTarget | Record<string, ExportsTarget>;
    type?: string;
    dependencies?: Record<string, string>;
    peerDependencies?: Record<string, string>;
    optionalDependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
}
/**
 * ExactPackage pins down an exact version of a package on an external registry,
 * such as npm or deno.
 */
export interface ExactPackage {
    name: string;
    registry: string;
    version: string;
}
/**
 * ExactModule pins down an exact version of a module in a package that can be
 * served by a PackageProvider.
 */
export interface ExactModule {
    pkg: ExactPackage;
    builtin: string | null;
    source: PackageProvider;
}
/**
 * PackageTarget pins down a particular version range of a package on an
 * external registry, such as npm or deno.
 */
export interface PackageTarget {
    registry: string;
    name: string;
    range: any;
    unstable: boolean;
}
/**
 * @deprecated Use PackageTarget directly — ranges are now singular.
 */
export type LatestPackageTarget = PackageTarget;
export declare function parseUrlTarget(resolver: Resolver, targetStr: string, parentUrl?: URL): Promise<Install | undefined>;
export declare function isPackageTarget(targetStr: string): boolean;
export declare function parseTarget(resolver: Resolver, targetStr: string, parentPkgUrl: URL, defaultRegistry: string): Promise<Install>;
export declare function newPackageTarget(target: string, parentPkgUrl: URL, defaultRegistry: string, pkgName?: string): InstallTarget;
export declare function pkgToStr(pkg: ExactPackage): string;
/**
 * Throws unless the given specifier is a valid npm-style package specifier.
 *
 * @param {string} specifier Specifier to validate.
 */
export declare function validatePkgName(specifier: string): void;
/**
 * Parses an npm-style module specifier, such as '@jspm/generator/index.js',
 * and splits it into the package name ('@jspm/generator') and module subpath
 * ('./index.js'). Returns undefined if the given specifier is invalid.
 *
 * @param {string} specifier Specifier to parse.
 * @returns {{ pkgName: string, subpath: '.' | `./${string}` } | undefined}
 */
export declare function parsePkg(specifier: string): {
    pkgName: string;
    subpath: '.' | `./${string}`;
} | undefined;
