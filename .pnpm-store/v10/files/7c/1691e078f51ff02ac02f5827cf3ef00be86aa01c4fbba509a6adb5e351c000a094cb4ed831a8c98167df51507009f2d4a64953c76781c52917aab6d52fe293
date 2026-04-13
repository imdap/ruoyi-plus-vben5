import type { VFileSystem } from '../../../fileSystem.js';
export declare class ConfigSearch {
    #private;
    /**
     * @param searchPlaces - The list of file names to search for.
     * @param allowedExtensionsByProtocol - Map of allowed extensions by protocol, '*' is used to match all protocols.
     * @param fs - The file system to use.
     */
    constructor(searchPlaces: readonly string[], allowedExtensionsByProtocol: Map<string, readonly string[]>, fs: VFileSystem);
    searchForConfig(searchFromURL: URL, stopSearchAtURL?: URL[]): Promise<URL | undefined>;
    clearCache(): void;
}
/**
 * A Scanner that searches for a config file in a directory. It caches the results to speed up future requests.
 */
export declare class DirConfigScanner {
    #private;
    readonly allowedExtensionsByProtocol: Map<string, readonly string[]>;
    private fs;
    /**
     * @param searchPlaces - The list of file names to search for.
     * @param allowedExtensionsByProtocol - Map of allowed extensions by protocol, '*' is used to match all protocols.
     * @param fs - The file system to use.
     */
    constructor(searchPlaces: readonly string[], allowedExtensionsByProtocol: Map<string, readonly string[]>, fs: VFileSystem);
    clearCache(): void;
    /**
     *
     * @param dir - the directory to search for a config file.
     * @param visited - a callback to be called for each directory visited.
     * @returns A promise that resolves to the url of the config file or `undefined`.
     */
    scanDirForConfigFile(dir: URL): Promise<URL | undefined>;
}
//# sourceMappingURL=configSearch.d.ts.map