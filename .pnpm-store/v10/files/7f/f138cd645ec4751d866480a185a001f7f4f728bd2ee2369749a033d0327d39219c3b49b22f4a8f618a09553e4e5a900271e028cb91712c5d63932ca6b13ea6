import { Log } from '../common/log.js';
import { Resolver } from '../trace/resolver.js';
import { InstalledResolution, LockResolutions, VersionConstraints } from './lock.js';
import { PackageTarget } from './package.js';
export interface PackageProvider {
    provider: string;
    layer: string;
}
export type ResolutionMode = 'new' | 'new-prefer-existing' | 'existing';
/**
 * InstallOptions configure the generator's behaviour for existing mappings
 * in the import map. An existing mapping is considered "in-range" if either:
 *   1. its parent package.json has no "dependencies" range for it
 *   2. its semver version is within the parent's range
 *
 * The "latest-compatible version" of a package is the latest existing version
 * within the parent's "dependencies range", or just the latest existing
 * version if there is no such range.
 *
 * "default":
 *   New installs always resolve to the latest compatible version. Existing
 *   mappings are kept unless they are out-of-range, in which case they are
 *   bumped to the latest compatible version.
 *
 * "latest-primaries":
 *   Existing primary dependencies (i.e. mappings under "imports") are bumped
 *   to latest. Existing secondary dependencies are kept unless they are
 *   out-of-range, in which case they are bumped to the latest compatible
 *   version. New installs behave according to "default".
 *
 * "latest-all":
 *   All existing mappings are bumped to the latest compatible version. New
 *   installs behave according to "default".
 *
 * "freeze":
 *   No existing mappings are changed, and existing mappings are always used
 *   for new installs wherever possible. Completely new installs behave
 *   according to "default".
 */
export type InstallMode = 'default' | 'latest-primaries' | 'latest-all' | 'freeze';
export type InstallTarget = {
    pkgTarget: PackageTarget | URL;
};
export interface InstallerOptions {
    mapUrl: URL;
    baseUrl: URL;
    rootUrl?: URL | null;
    lock?: LockResolutions;
    reset?: boolean;
    prune?: boolean;
    save?: boolean;
    saveDev?: boolean;
    savePeer?: boolean;
    saveOptional?: boolean;
    resolutions?: Record<string, string>;
    defaultProvider?: string;
    defaultRegistry?: string;
    providers?: Record<string, string>;
    inputMapFallbacks?: boolean | 'semver-compatible';
}
export declare class Installer {
    opts: InstallerOptions;
    installs: LockResolutions;
    constraints: VersionConstraints;
    newInstalls: boolean;
    installBaseUrl: `${string}/`;
    hasLock: boolean;
    defaultProvider: {
        provider: string;
        layer: string;
    };
    defaultRegistry: string;
    providers: Record<string, string>;
    resolutions: Record<string, string>;
    log: Log | undefined;
    resolver: Resolver;
    private _pkgUrls;
    private _pkgsByKey;
    private _constraintsByKey;
    constructor(baseUrl: `${string}/`, opts: InstallerOptions, log: Log | undefined, resolver: Resolver);
    visitInstalls(visitor: (scope: Record<string, InstalledResolution>, scopeUrl: string | null) => boolean | void): void;
    getProvider(target: PackageTarget): {
        provider: string;
        layer: string;
    };
    /**
     * Locks a package against the given target.
     *
     * @param {string} pkgName Name of the package being installed.
     * @param {InstallTarget} target The installation target being installed.
     * @param {InstallMode} mode Specifies how to interact with existing installs.
     * @param {`${string}/` | null} pkgScope URL of the package scope in which this install is occurring, null if it's a top-level install.
     * @param {string} parentUrl URL of the parent for this install.
     * @returns {Promise<InstalledResolution>}
     */
    installTarget(pkgName: string, { pkgTarget }: InstallTarget, mode: InstallMode, pkgScope: `${string}/` | null, parentUrl: string): Promise<InstalledResolution>;
    installBuiltin(install: PackageTarget, specifier: string, mode: InstallMode, parentUrl: string): Promise<InstalledResolution>;
    /**
     * Installs the given package specifier.
     *
     * @param {string} pkgName The package specifier being installed.
     * @param {InstallMode} mode Specifies how to interact with existing installs.
     * @param {`${string}/` | null} pkgScope URL of the package scope in which this install is occurring, null if it's a top-level install.
     * @param {`./${string}` | '.'} traceSubpath
     * @param {string} parentUrl URL of the parent for this install.
     * @returns {Promise<string | InstalledResolution>}
     */
    install(pkgName: string, mode: InstallMode, pkgScope: `${string}/` | null, traceSubpath: `./${string}` | '.', parentUrl: string): Promise<InstalledResolution>;
    private get pkgUrls();
    private setResolution;
    private setConstraint;
    private getConstraintFor;
    private buildPkgIndex;
    private getBestExistingMatch;
    private inRange;
    private tryUpgradeAllTo;
    private upgradeSupportedTo;
}
