import type { LatestPackageTarget, PackageConfig } from '../install/package.js';
import type { ExactPackage } from '../install/package.js';
import type { ImportMap } from '@jspm/import-map';
import type { PublishOutput, ProviderContext } from './index.js';
import type { Resolver } from '../trace/resolver.js';
export declare const supportedLayers: string[];
export declare function pkgToUrl(pkg: ExactPackage, layer?: string): `${string}/`;
export declare function getPackageConfig(this: ProviderContext, pkgUrl: string): Promise<PackageConfig | null>;
export declare function configure(config: any): void;
export declare function clearParseUrlPkgCache(): void;
export declare function parseUrlPkg(url: string): {
    pkg: {
        registry: string;
        name: string;
        version: string;
    };
    layer: string;
    builtin: any;
};
export declare function resolveLatestTarget(this: ProviderContext, target: LatestPackageTarget, layer: string, parentUrl: string, resolver: Resolver | null): Promise<ExactPackage | null>;
export declare function fetchVersions(this: ProviderContext, name: string): Promise<string[]>;
export declare function download(this: ProviderContext, pkg: ExactPackage): Promise<Record<string, Uint8Array>>;
/**
 * Publishes a package to the jspm.io app registry
 *
 * Input package is already validated by JSPM
 *
 * @returns Promise that resolves with the package URL
 */
export declare function publish(this: ProviderContext, pkg: ExactPackage, files: Record<string, string> | undefined, importMap: ImportMap | undefined, imports: string[], timeout?: number): Promise<PublishOutput>;
/**
 * Authenticate with JSPM API to obtain a token
 *
 * @param options Authentication options
 * @returns Promise resolving to an authentication token
 */
export declare function auth(this: ProviderContext, options: {
    username?: string;
    verify: (url: string, instructions: string) => void;
}): Promise<{
    token: string;
}>;
