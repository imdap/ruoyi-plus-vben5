import type { Response as NodeFetchResponse } from 'node-fetch';
import type fetch from 'node-fetch';
import { FormData } from 'formdata-node';
export type FetchResource = Parameters<typeof fetch>[0];
export type FetchInit = Parameters<typeof fetch>[1];
export type CacheStrategy = (response: NodeFetchResponse) => Promise<boolean> | boolean;
export { FormData };
export type NFCResponseMetadata = {
    url: string;
    status: number;
    statusText: string;
    headers: Record<string, string[]>;
    size: number;
    counter: number;
};
export type INodeFetchCacheCache = {
    get(key: string): Promise<{
        bodyStream: NodeJS.ReadableStream;
        metaData: NFCResponseMetadata;
    } | undefined>;
    set(key: string, bodyStream: NodeJS.ReadableStream, metaData: NFCResponseMetadata): Promise<{
        bodyStream: NodeJS.ReadableStream;
        metaData: NFCResponseMetadata;
    }>;
    remove(key: string): Promise<void | unknown>;
};
export type ISynchronizationStrategy = {
    doWithExclusiveLock<TReturnType>(key: string, action: () => Promise<TReturnType>): Promise<TReturnType>;
};
