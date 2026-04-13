import assert from 'assert';
import { Buffer } from 'buffer';
import { Readable } from 'stream';
import { KeyTimeout } from './key_timeout.js';
async function streamToBuffer(stream) {
    const chunks = [];
    return new Promise((resolve, reject) => {
        stream.on('data', chunk => chunks.push(chunk)).on('error', error => {
            reject(error);
        }).on('end', () => {
            resolve(Buffer.concat(chunks));
        });
    });
}
export class MemoryCache {
    ttl;
    keyTimeout = new KeyTimeout();
    cache = new Map();
    constructor(options) {
        this.ttl = options?.ttl;
    }
    async get(key) {
        const cachedValue = this.cache.get(key);
        if (cachedValue) {
            return {
                bodyStream: Readable.from(cachedValue.bodyBuffer),
                metaData: cachedValue.metaData,
            };
        }
        return undefined;
    }
    async remove(key) {
        this.keyTimeout.clearTimeout(key);
        this.cache.delete(key);
    }
    async set(key, bodyStream, metaData) {
        const bodyBuffer = await streamToBuffer(bodyStream);
        this.cache.set(key, { bodyBuffer, metaData });
        if (typeof this.ttl === 'number') {
            this.keyTimeout.updateTimeout(key, this.ttl, async () => this.remove(key));
        }
        const cachedResult = await this.get(key);
        assert(cachedResult, 'Failed to cache response');
        return cachedResult;
    }
}
//# sourceMappingURL=memory_cache.js.map