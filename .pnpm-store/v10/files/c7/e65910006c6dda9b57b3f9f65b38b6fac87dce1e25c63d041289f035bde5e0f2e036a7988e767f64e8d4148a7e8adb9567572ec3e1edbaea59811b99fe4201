import type { WrappedResponse } from './fetch.js';
export declare function clearCache(): Promise<void>;
export declare const fetch: (url: URL, opts?: Record<string, any>) => Promise<WrappedResponse | {
    readonly ejectFromCache: () => Promise<unknown>;
    readonly returnedFromCache: boolean;
    readonly isCacheMiss: boolean;
    readonly headers: import("node-fetch").Headers;
    readonly ok: boolean;
    readonly redirected: boolean;
    readonly status: number;
    readonly statusText: string;
    readonly type: "default" | "error" | "basic" | "cors" | "opaque" | "opaqueredirect";
    readonly url: string;
    clone(): import("node-fetch").Response;
    readonly body: NodeJS.ReadableStream | null;
    readonly bodyUsed: boolean;
    readonly size: number;
    buffer(): Promise<Buffer>;
    arrayBuffer(): Promise<ArrayBuffer>;
    formData(): Promise<globalThis.FormData>;
    blob(): Promise<Blob>;
    json(): Promise<unknown>;
    text(): Promise<string>;
} | {
    status: number;
    text(): Promise<string>;
    json(): Promise<any>;
    arrayBuffer(): ArrayBuffer;
} | {
    status: number;
    statusText: any;
}>;
