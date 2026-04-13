import { ExactPackage, LatestPackageTarget, PackageConfig, PackageTarget } from '../install/package.js';
import { Resolver } from '../trace/resolver.js';
export declare const nodeBuiltinSet: Set<string>;
export declare function pkgToUrl(pkg: ExactPackage, layer: string): `${string}/`;
export declare function resolveBuiltin(specifier: string, env: string[]): string | {
    target: PackageTarget;
    subpath: `./${string}`;
} | undefined;
export declare function getPackageConfig(): Promise<PackageConfig>;
export declare function resolveLatestTarget(target: LatestPackageTarget, layer: string, parentUrl: string, resolver: Resolver): Promise<ExactPackage | null>;
export declare function parseUrlPkg(url: string): {
    registry: string;
    name: string;
    version: string;
};
