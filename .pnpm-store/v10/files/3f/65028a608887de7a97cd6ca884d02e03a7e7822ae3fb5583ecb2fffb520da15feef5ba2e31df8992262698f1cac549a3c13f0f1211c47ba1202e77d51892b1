import { Readable } from 'stream';
import type { INodeFetchCacheCache, NFCResponseMetadata } from '../../types.js';
export declare class MemoryCache implements INodeFetchCacheCache {
    private readonly ttl?;
    private readonly keyTimeout;
    private readonly cache;
    constructor(options?: {
        ttl?: number;
    });
    get(key: string): Promise<{
        bodyStream: Readable;
        metaData: NFCResponseMetadata;
    } | undefined>;
    remove(key: string): Promise<void>;
    set(key: string, bodyStream: NodeJS.ReadableStream, metaData: NFCResponseMetadata): Promise<{
        bodyStream: Readable;
        metaData: NFCResponseMetadata;
    }>;
}
