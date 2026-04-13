import assert from 'assert';
import { Buffer } from 'buffer';
import { Readable } from 'stream';
import cacache from 'cacache';
const emptyBuffer = Buffer.alloc(0);
export class FileSystemCache {
    ttl;
    cacheDirectory;
    constructor(options = {}) {
        this.ttl = options.ttl;
        this.cacheDirectory = options.cacheDirectory ?? '.cache';
    }
    clear() {
        return cacache.rm.all(this.cacheDirectory);
    }
    async get(key, options) {
        const cachedObjectInfo = await cacache.get.info(this.cacheDirectory, key);
        if (!cachedObjectInfo) {
            return undefined;
        }
        const storedMetadata = cachedObjectInfo.metadata;
        const { emptyBody, expiration, ...nfcMetadata } = storedMetadata;
        if (!options?.ignoreExpiration && expiration && expiration < Date.now()) {
            return undefined;
        }
        if (emptyBody) {
            return {
                bodyStream: Readable.from(emptyBuffer),
                metaData: storedMetadata,
            };
        }
        return {
            bodyStream: cacache.get.stream.byDigest(this.cacheDirectory, cachedObjectInfo.integrity),
            metaData: nfcMetadata,
        };
    }
    async remove(key) {
        return cacache.rm.entry(this.cacheDirectory, key);
    }
    async set(key, bodyStream, metaData) {
        const metaToStore = {
            ...metaData,
            expiration: undefined,
            emptyBody: false,
        };
        if (typeof this.ttl === 'number') {
            metaToStore.expiration = Date.now() + this.ttl;
        }
        await this.writeDataToCache(key, metaToStore, bodyStream);
        const cachedData = await this.get(key, { ignoreExpiration: true });
        assert(cachedData, 'Failed to cache response');
        return cachedData;
    }
    async writeDataToCache(key, storedMetadata, stream) {
        try {
            await new Promise((fulfill, reject) => {
                stream.pipe(cacache.put.stream(this.cacheDirectory, key, { metadata: storedMetadata }))
                    .on('integrity', (i) => {
                    fulfill(i);
                })
                    .on('error', (error) => {
                    reject(error);
                });
            });
        }
        catch (error) {
            if (error.code !== 'ENODATA') {
                throw error;
            }
            storedMetadata.emptyBody = true;
            await cacache.put(this.cacheDirectory, key, emptyBuffer, { metadata: storedMetadata });
        }
    }
}
//# sourceMappingURL=file_system_cache.js.map