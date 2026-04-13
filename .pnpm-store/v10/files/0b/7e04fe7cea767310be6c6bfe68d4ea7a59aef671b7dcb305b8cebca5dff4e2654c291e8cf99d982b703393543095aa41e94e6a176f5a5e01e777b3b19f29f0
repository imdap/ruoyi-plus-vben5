import { IImportMap } from '@jspm/import-map';
import { Resolver } from '../trace/resolver.js';
import { PackageProvider } from './installer.js';
import { PackageTarget, ExactModule } from './package.js';
import { Log } from '../generator.js';
export interface LockResolutions {
    primary: {
        [pkgName: string]: InstalledResolution;
    };
    secondary: {
        [pkgUrl: `${string}/`]: {
            [pkgName: string]: InstalledResolution;
        };
    };
    flattened: {
        [scopeUrl: `${string}/`]: {
            [pkgName: string]: FlatInstalledResolution[];
        };
    };
}
interface PackageToTarget {
    [pkgName: string]: PackageTarget | URL;
}
export interface VersionConstraints {
    primary: PackageToTarget;
    secondary: {
        [pkgUrl: `${string}/`]: PackageToTarget;
    };
}
export interface InstalledResolution {
    installUrl: `${string}/`;
}
export interface FlatInstalledResolution {
    export: `.${string}`;
    resolution: InstalledResolution;
}
export declare function getResolution(resolutions: LockResolutions, name: string, pkgScope: `${string}/` | null): InstalledResolution | null;
export declare function getFlattenedResolution(resolutions: LockResolutions, name: string, pkgScope: `${string}/`, flattenedSubpath: `.${string}`, semverCompatible?: boolean, inRange?: ((installUrl: string) => Promise<boolean>) | null): Promise<InstalledResolution | null>;
export declare function setConstraint(constraints: VersionConstraints, name: string, target: PackageTarget, pkgScope?: string | null): void;
export declare function setResolution(resolutions: LockResolutions, name: string, installUrl: `${string}/`, pkgScope?: `${string}/` | null): boolean;
export declare function mergeLocks(resolutions: LockResolutions, newResolutions: LockResolutions): void;
export declare function mergeConstraints(constraints: VersionConstraints, newConstraints: VersionConstraints): void;
export interface PackageConstraint {
    alias: string;
    pkgScope: `${string}/` | null;
    range: any;
}
export declare function getConstraintFor(name: string, registry: string, constraints: VersionConstraints): PackageConstraint[];
export declare function extractLockConstraintsAndMap(log: Log | undefined, map: IImportMap, preloadUrls: string[], mapUrl: URL, rootUrl: URL | null, defaultRegistry: string, resolver: Resolver, provider: PackageProvider): Promise<{
    locks: LockResolutions;
    constraints: VersionConstraints;
    maps: IImportMap;
}>;
export declare function translateProvider(mdl: ExactModule, { provider, layer }: PackageProvider, resolver: Resolver, parentUrl: string): Promise<ExactModule | null>;
export {};
