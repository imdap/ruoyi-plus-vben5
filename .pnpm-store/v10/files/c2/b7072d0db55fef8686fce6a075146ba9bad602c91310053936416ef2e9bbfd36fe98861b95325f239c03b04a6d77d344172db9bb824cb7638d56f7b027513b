export type LoaderResult = URL | undefined;
export declare class PnpLoader {
    readonly pnpFiles: string[];
    private cacheKeySuffix;
    constructor(pnpFiles?: string[]);
    /**
     * Request that the nearest .pnp file gets loaded
     * @param urlDirectory starting directory
     * @returns promise - rejects on error - success if loaded or not found.
     */
    load(urlDirectory: URL): Promise<LoaderResult>;
    peek(urlDirectory: URL): Promise<LoaderResult>;
    /**
     * Clears the cached so .pnp files will get reloaded on request.
     */
    clearCache(): Promise<void>;
    private calcKey;
}
export declare function pnpLoader(pnpFiles?: string[]): PnpLoader;
export declare function clearPnPGlobalCache(): Promise<undefined>;
//# sourceMappingURL=pnpLoader.d.ts.map