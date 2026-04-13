import { clearCache } from '#fetch';
export type FetchFn = (url: URL | string, ...args: any[]) => Promise<WrappedResponse | globalThis.Response>;
export type WrappedFetch = (url: URL | string, ...args: any[]) => Promise<WrappedResponse | globalThis.Response>;
export interface WrappedResponse {
    url: string;
    headers: Headers;
    ok: boolean;
    status: number;
    statusText?: string;
    text?(): Promise<string>;
    json?(): Promise<any>;
    arrayBuffer?(): ArrayBuffer;
}
export declare function setRetryCount(count: number): void;
export declare function setFetchPoolSize(size: number): void;
/**
 * Allows customizing the fetch implementation used by the generator.
 */
export declare function setFetch(fetch: typeof globalThis.fetch | WrappedFetch): void;
export type SourceData = Record<string, string | ArrayBuffer>;
/**
 * Allows virtual sources to be defined into the wrapped fetch implementation.
 */
export declare function setVirtualSourceData(urlBase: string, sourceData: SourceData): void;
export declare function isVirtualUrl(url: string): boolean;
declare let _fetch: WrappedFetch;
export { clearCache, _fetch as fetch };
