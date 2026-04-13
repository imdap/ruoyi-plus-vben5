import type { ExactPackage, LatestPackageTarget, PackageConfig } from '../install/package.js';
import type { PackageTarget } from '../generator.js';
import type { ProviderContext } from './index.js';
export declare function resolveBuiltin(specifier: string, env: string[]): string | {
    target: PackageTarget;
    subpath: '.' | `./${string}`;
} | undefined;
export declare function pkgToUrl(pkg: ExactPackage): `${string}/`;
export declare function getPackageConfig(this: ProviderContext, pkgUrl: string): Promise<PackageConfig | null | undefined>;
export declare function parseUrlPkg(url: string): {
    pkg: ExactPackage;
    builtin: null | string;
    layer: string;
} | undefined;
export declare function resolveLatestTarget(this: ProviderContext, target: LatestPackageTarget, _layer: string, parentUrl: string): Promise<ExactPackage | null>;
