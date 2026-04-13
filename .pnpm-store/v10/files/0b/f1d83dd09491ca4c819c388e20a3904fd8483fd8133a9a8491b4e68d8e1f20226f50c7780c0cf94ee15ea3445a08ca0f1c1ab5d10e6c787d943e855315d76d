import { PackageConfig, ExactPackage, LatestPackageTarget, PackageTarget } from '../install/package.js';
import { Resolver } from '../trace/resolver.js';
import { Log } from '../common/log.js';
import { PackageProvider } from '../install/installer.js';
import type { ImportMap } from '@jspm/import-map';
export interface Provider {
    parseUrlPkg?(this: ProviderContext, url: string): ExactPackage | {
        pkg: ExactPackage;
        layer: string;
        builtin: string | null;
    } | null;
    pkgToUrl?(this: ProviderContext, pkg: ExactPackage, layer?: string): `${string}/` | Promise<`${string}/`>;
    resolveLatestTarget?(this: ProviderContext, target: LatestPackageTarget, layer: string, parentUrl: string, resolver: Resolver): Promise<ExactPackage | null>;
    ownsUrl?(this: ProviderContext, url: string): boolean;
    isBuiltin?(this: ProviderContext, specifier: string): boolean;
    resolveBuiltin?(this: ProviderContext, specifier: string, env: string[]): string | {
        target: PackageTarget;
        subpath: '.' | `./${string}`;
    } | null;
    getPackageConfig?(this: ProviderContext, pkgUrl: string): Promise<PackageConfig | null>;
    getFileList?(this: ProviderContext, pkgUrl: string): Promise<Set<string> | undefined>;
    download?(this: ProviderContext, pkg: ExactPackage): Promise<Record<string, Uint8Array>>;
    /**
     * Publish a package to the provider
     * This is an optional method that providers can implement to support package publishing
     *
     * @param importMap Optional import map to include with the publish
     */
    publish?(this: ProviderContext, pkg: ExactPackage, files: Record<string, string | ArrayBuffer> | undefined, importMap: ImportMap | undefined, imports: string[]): Promise<PublishOutput>;
    /**
     * Authenticate with the provider
     * This is an optional method that providers can implement to support authentication
     *
     * @param username Optional username for authentication
     * @param verify Optional callback to verify authentication with the user
     * @returns A promise resolving to an authentication token
     */
    auth?(this: ProviderContext, options: {
        username?: string;
        verify?: (url: string, instructions: string) => void;
    }): Promise<{
        token: string;
    }>;
    supportedLayers?: string[];
    configure?(this: ProviderContext, config: any): void;
}
/**
 * Context provided to all provider methods
 * Contains necessary services and configuration
 */
export declare class ProviderContext {
    #private;
    /**
     * Logger instance for provider operations
     */
    log: Log;
    /**
     * Fetch options for provider operations
     */
    fetchOpts: any;
    /**
     * Custom context object for providers
     */
    context: any;
    constructor(pm: ProviderManager, log: Log, fetchOpts: any);
}
/**
 * Provider manager to handle provider registration, lookup and operations
 */
export declare class ProviderManager {
    #private;
    log: Log;
    fetchOpts: any;
    providers: Record<string, Provider>;
    contexts: Record<string, ProviderContext>;
    /**
     * Create a new ProviderManager with the given providers
     *
     * @param customProviders Custom provider definitions to add
     */
    constructor(log: Log, fetchOpts: any, providerConfig?: Record<string, any>, customProviders?: Record<string, Provider>);
    /**
     * Add a custom provider to this provider manager
     *
     * @param name Name of the provider
     * @param provider Provider implementation
     */
    addProvider(name: string, provider: Provider): void;
    /**
     * Find the provider name for a given URL
     *
     * @param url URL to find the provider for
     * @returns The name of the provider, or null if no provider handles this URL
     */
    providerNameForUrl(url: string): string | null;
    /**
     * Parse a URL to get package information
     *
     * @param url URL to parse
     * @returns Package information or null if URL can't be parsed
     */
    parseUrlPkg(url: string): {
        pkg: ExactPackage;
        source: {
            provider: string;
            layer: string;
        };
        builtin: string | null;
    } | null;
    /**
     * Convert a package to a URL
     *
     * @param pkg Package to convert
     * @param provider Provider name
     * @param layer Layer to use
     * @returns URL for the package
     */
    pkgToUrl(pkg: ExactPackage, provider: string, layer?: string): `${string}/` | Promise<`${string}/`>;
    /**
     * Get the package config corresponding to a package URL
     *
     * @param pkgUrl URL to the package
     * @returns
     */
    getPackageConfig(pkgUrl: string): Promise<PackageConfig | null | undefined>;
    /**
     * Obtain a file listing of a package boundary if available
     */
    getFileList(pkgUrl: string): Promise<Set<string> | undefined>;
    /**
     * Resolve a builtin module
     *
     * @param specifier Module specifier
     * @returns Resolved string, install target and exports subpath, or undefined if not resolvable
     */
    resolveBuiltin(specifier: string, env: string[]): string | {
        target: PackageTarget;
        subpath: '.' | `./${string}`;
    } | undefined;
    resolveLatestTarget(target: PackageTarget, { provider, layer }: PackageProvider, parentUrl: string, resolver: Resolver): Promise<ExactPackage>;
    /**
     * Get the supported provider strings for all providers
     *
     * @returns List of provider string identifiers
     */
    getProviderStrings(): string[];
    /**
     * Downloads the given package files into the local folder path outDir
     * Does not include the import map, which must be merged separately.
     */
    download(pkg: ExactPackage, providerName: string): Promise<Record<string, Uint8Array<ArrayBufferLike>>>;
    /**
     * Publish a package using the specified provider.
     * A publish operation may be an import map only, files only, or both.
     *
     * @param pkg Package name, version and registry to publish
     * @param providerName Name of the provider to use
     * @param files Package files to publish
     * @param importMap Optional import map to include with the publish
     */
    publish(pkg: ExactPackage, providerName: string, imports: string[], files: undefined, importMap: undefined): Promise<PublishOutput>;
    publish(pkg: ExactPackage, providerName: string, imports: string[], files: Record<string, string | ArrayBuffer>, importMap: undefined): Promise<PublishOutput>;
    publish(pkg: ExactPackage, providerName: string, imports: string[], files: Record<string, string | ArrayBuffer>, importMap: ImportMap): Promise<PublishOutput>;
    /**
     * Authenticate with a provider to obtain an authentication token
     *
     * @param providerName Name of the provider to authenticate with
     * @param options Authentication options
     * @returns Promise resolving to the authentication token
     */
    auth(providerName: string, options?: {
        username?: string;
        verify?: (url: string, instructions: string) => void;
    }): Promise<{
        token: string;
    }>;
}
export interface PublishOutput {
    packageUrl: `${string}/`;
    mapUrl: string;
    codeSnippet?: string;
}
export declare const defaultProviders: Record<string, Provider>;
export declare function getDefaultProviderStrings(): any[];
export declare const registryProviders: Record<string, string>;
export declare const mappableSchemes: Set<String>;
export declare const builtinSchemes: Set<String>;
