import { ExactPackage, LatestPackageTarget } from '../install/package.js';
import { ProviderContext } from './index.js';
export declare function pkgToUrl(pkg: ExactPackage): `${string}/`;
export declare function parseUrlPkg(url: string): {
    registry: string;
    name: string;
    version: string;
};
export declare function resolveLatestTarget(this: ProviderContext, target: LatestPackageTarget, layer: string, parentUrl: string): Promise<ExactPackage | null>;
