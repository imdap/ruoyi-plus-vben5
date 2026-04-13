import { ExactPackage, LatestPackageTarget, PackageConfig } from '../install/package.js';
import type { ProviderContext } from './index.js';
export declare function pkgToUrl(pkg: ExactPackage): `${string}/`;
export declare function parseUrlPkg(url: string): {
    registry: string;
    name: string;
    version: string;
};
export declare function getPackageConfig(this: ProviderContext, pkgUrl: string): Promise<PackageConfig | null>;
export declare function resolveLatestTarget(this: ProviderContext, target: LatestPackageTarget, layer: string, parentUrl: string): Promise<ExactPackage | null>;
