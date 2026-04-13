export interface IImportMap {
    imports?: Record<string, string>;
    scopes?: {
        [scope: string]: Record<string, string>;
    };
    integrity?: {
        [url: string]: string;
    };
}
declare class MapMatcher {
    prefixMatches: string[];
    results: Map<string, string | undefined>;
    constructor(map: Record<string, any>);
}
export declare class ImportMap implements IImportMap {
    #private;
    imports: Record<string, string>;
    scopes: Record<string, Record<string, string>>;
    integrity: Record<string, string>;
    /**
     * The absolute URL of the import map, for determining relative resolutions
     * When using file:/// URLs this allows relative modules to be co-located
     */
    mapUrl: URL | null;
    /**
     * The URL to use for root-level resolutions in the import map
     * If null, root resolutions are not resolved and instead left as-is
     *
     * By default, rootUrl is null unless the mapUrl is an http or https URL,
     * in which case it is taken to be the root of the mapUrl.
     */
    rootUrl: URL | null;
    /**
     * Create a new import map instance
     *
     * @param opts import map options, can be an optional bag of { map?, mapUrl?, rootUrl? } or just a direct mapUrl
     */
    constructor(opts: {
        map?: IImportMap;
        mapUrl?: string | URL;
        rootUrl?: string | URL | null;
    } | string | URL);
    /**
     * Clones the import map
     * @returns Cloned import map
     */
    clone(): ImportMap;
    /**
     * Extends the import map mappings
     * @param map Import map to extend with
     * @param overrideScopes Set to true to have scopes be replacing instead of extending
     * @returns ImportMap for chaining
     */
    extend(map: IImportMap, overrideScopes?: boolean): this;
    /**
     * Performs an alphanumerical sort on the import map imports and scopes
     * @returns ImportMap for chaining
     */
    sort(): this;
    /**
     * Set a specific entry in the import map
     *
     * @param name Specifier to set
     * @param target Target of the map
     * @param parent Optional parent scope
     * @returns ImportMap for chaining
     */
    set(name: string, target: string, parent?: string): this;
    /**
     * @param target URL target
     * @param integrity Integrity
     */
    setIntegrity(target: string, integrity: string): void;
    /**
     * @param target URL target
     * @param integrity Integrity
     */
    getIntegrity(target: string, integrity: string): string;
    /**
     * Bulk replace URLs in the import map
     * Provide a URL ending in "/" to perform path replacements
     *
     * @param url {String} The URL to replace
     * @param newUrl {String} The URL to replace it with
     * @returns ImportMap for chaining
     */
    replace(url: string, newUrl: string): this;
    /**
     * Groups subpath mappings into path mappings when multiple exact subpaths
     * exist under the same path.
     *
     * For two mappings like { "base/a.js": "/a.js", "base/b.js": "/b.js" },
     * these will be replaced with a single path mapping { "base/": "/" }.
     * Groupings are done throughout all import scopes individually.
     *
     * @param targets Which sections to combine: 'scopes' (default) or 'both' (includes top-level imports)
     * @returns ImportMap for chaining
     */
    /**
     * Condense import entries sharing a common prefix into a single
     * trailing-slash entry. Entries with inconsistent URL bases (e.g.
     * shadowed exports) are left in place alongside the prefix entry.
     *
     * @param prefixes Import key prefixes to condense (e.g. "pkg/modules/")
     * @returns ImportMap for chaining
     */
    condenseImports(prefixes: {
        imports?: Set<string>;
        scopes?: Record<string, Set<string>>;
    }): this;
    combineSubpaths(targets?: 'scopes' | 'both'): this;
    /**
     * Groups the import map scopes to shared URLs to reduce duplicate mappings.
     *
     * For two given scopes, "https://site.com/x/" and "https://site.com/y/",
     * a single scope will be constructed for "https://site.com/" including
     * their shared mappings, only retaining the scopes if they have differences.
     *
     * In the case where the scope is on the same origin as the mapUrl, the grouped
     * scope is determined based on determining the common baseline over all local scopes
     *
     * @returns ImportMap for chaining
     */
    flatten(): this;
    /**
     * Rebase the entire import map to a new mapUrl and rootUrl
     *
     * If the rootUrl is not provided, it will remain null if it was
     * already set to null.
     *
     * Otherwise, just like the constructor options, the rootUrl
     * will default to the mapUrl base if it is an http: or https:
     * scheme URL, and null otherwise keeping absolute URLs entirely
     * in-tact.
     *
     * @param mapUrl The new map URL to use
     * @param rootUrl The new root URL to use
     * @returns ImportMap for chaining
     */
    rebase(mapUrl?: URL | string, rootUrl?: URL | string | null): this;
    /**
     * Perform a module resolution against the import map
     *
     * @param specifier Specifier to resolve
     * @param parentUrl Parent URL to resolve against
     * @returns Resolved URL string
     */
    resolve(specifier: string, parentUrl?: string | URL): string;
    /**
     * Get the import map JSON data
     *
     * @returns Import map data
     */
    toJSON(): IImportMap;
}
export declare function getScopeMatches(parentUrl: string, scopes: Record<string, Record<string, string>>, mapUrl: URL, rootUrl?: URL): [string, string][];
export declare function getMapMatch<T = any>(this: MapMatcher | void, specifier: string, map: Record<string, T>): string | undefined;
export {};
