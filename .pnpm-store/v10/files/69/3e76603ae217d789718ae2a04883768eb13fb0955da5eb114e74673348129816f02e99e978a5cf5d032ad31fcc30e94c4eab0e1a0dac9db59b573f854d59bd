import { Readable } from 'stream';
import cacache from 'cacache';
import type { INodeFetchCacheCache, NFCResponseMetadata } from '../../types';
type StoredMetadata = {
    emptyBody?: boolean;
    expiration?: number | undefined;
} & NFCResponseMetadata;
export declare class FileSystemCache implements INodeFetchCacheCache {
    private readonly ttl?;
    private readonly cacheDirectory;
    constructor(options?: {
        ttl?: number;
        cacheDirectory?: string;
    });
    clear(): Promise<void>;
    get(key: string, options?: {
        ignoreExpiration?: boolean;
    }): Promise<{
        bodyStream: Readable;
        metaData: StoredMetadata;
    } | {
        bodyStream: NodeJS.ReadableStream;
        metaData: {
            url: string;
            status: number;
            statusText: string;
            headers: Record<string, string[]>;
            size: number;
            counter: number;
        };
    } | undefined>;
    remove(key: string): Promise<cacache.CacheObject>;
    set(key: string, bodyStream: NodeJS.ReadableStream, metaData: NFCResponseMetadata): Promise<{
        bodyStream: Readable;
        metaData: StoredMetadata;
    } | {
        bodyStream: NodeJS.ReadableStream;
        metaData: {
            url: string;
            status: number;
            statusText: string;
            headers: Record<string, string[]>;
            size: number;
            counter: number;
        };
    }>;
    private writeDataToCache;
}
export {};
