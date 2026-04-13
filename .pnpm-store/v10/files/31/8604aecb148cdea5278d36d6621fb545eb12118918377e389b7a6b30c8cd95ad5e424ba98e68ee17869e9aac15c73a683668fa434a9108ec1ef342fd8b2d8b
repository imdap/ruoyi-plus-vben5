export declare let baseUrl: URL;
export declare function getCommonBase(a: string, b: string): string;
export declare function sameOrigin(url: URL, baseUrl: URL): boolean;
export declare function resolve(url: string, mapUrl: URL, rootUrl: URL | null): string;
/**
 * Rebase the given URL to the baseURL and rootURL
 *
 * @param url URL to rebase
 * @param baseUrl Import map baseUrl
 *                URLs will be based relative to this path if the same origin as the URL.
 * @param rootUrl Optional URL ending in / of the root HTML URL.
 *                When provided and possible, will be used as the base of the form '/...'
 * @returns relative URL string
 */
export declare function rebase(url: string, baseUrl: URL, rootUrl?: URL | null): any;
export declare function relative(url: URL, baseUrl: URL): string;
export declare function isURL(specifier: string): boolean;
export declare function isPlain(specifier: string): boolean;
export declare function isRelative(specifier: string): boolean;
