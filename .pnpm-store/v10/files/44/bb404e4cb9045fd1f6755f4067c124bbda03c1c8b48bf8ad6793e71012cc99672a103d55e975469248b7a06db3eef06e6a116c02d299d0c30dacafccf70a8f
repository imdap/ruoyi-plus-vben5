'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var assert = require('assert');
var formdataNode = require('formdata-node');
var buffer = require('buffer');
var stream = require('stream');
var fs = require('fs');
var crypto = require('crypto');
var locko = require('locko');
var cacache = require('cacache');

async function getNodeFetch() {
    const nodeFetchModule = await import('node-fetch');
    const { default: fetch, Request: NodeFetchRequest, Response: NodeFetchResponse } = nodeFetchModule;
    return { ...nodeFetchModule, fetch, NodeFetchRequest, NodeFetchResponse };
}

async function createNFCResponseClass() {
    const { NodeFetchResponse } = await getNodeFetch();
    const responseInternalSymbol = Object.getOwnPropertySymbols(new NodeFetchResponse())[1];
    assert(responseInternalSymbol, 'Failed to get node-fetch responseInternalSymbol');
    return class NFCResponse extends NodeFetchResponse {
        ejectFromCache;
        returnedFromCache;
        isCacheMiss;
        static serializeMetaFromNodeFetchResponse(response) {
            const metaData = {
                url: response.url,
                status: response.status,
                statusText: response.statusText,
                headers: response.headers.raw(),
                size: response.size,
                counter: response[responseInternalSymbol].counter,
            };
            return metaData;
        }
        static cacheMissResponse(url) {
            return new NFCResponse(stream.Readable.from(buffer.Buffer.alloc(0)), {
                url,
                status: 504,
                statusText: 'Gateway Timeout',
                headers: {},
                size: 0,
                counter: 0,
            }, async () => undefined, false, true);
        }
        constructor(bodyStream, metaData, ejectFromCache, returnedFromCache, isCacheMiss = false) {
            super(stream.Readable.from(bodyStream), metaData);
            this.ejectFromCache = ejectFromCache;
            this.returnedFromCache = returnedFromCache;
            this.isCacheMiss = isCacheMiss;
        }
    };
}
let cachedClass;
async function getNFCResponseClass() {
    if (!cachedClass) {
        cachedClass = await createNFCResponseClass();
    }
    return cachedClass;
}

class KeyTimeout {
    timeoutHandleForKey = {};
    clearTimeout(key) {
        clearTimeout(this.timeoutHandleForKey[key]);
    }
    updateTimeout(key, durationMs, callback) {
        this.clearTimeout(key);
        this.timeoutHandleForKey[key] = setTimeout(() => {
            callback();
        }, durationMs);
    }
}

async function streamToBuffer(stream) {
    const chunks = [];
    return new Promise((resolve, reject) => {
        stream.on('data', chunk => chunks.push(chunk)).on('error', error => {
            reject(error);
        }).on('end', () => {
            resolve(buffer.Buffer.concat(chunks));
        });
    });
}
class MemoryCache {
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
                bodyStream: stream.Readable.from(cachedValue.bodyBuffer),
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

const CACHE_VERSION = 6;
function md5(string_) {
    return crypto.createHash('md5').update(string_).digest('hex');
}
function getFormDataCacheKeyJson(formData) {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const cacheKey = {
        type: 'FormData',
        entries: Array.from(formData.entries()),
    };
    return cacheKey;
}
function getHeadersCacheKeyJson(headers) {
    return headers
        .map(([key, value]) => [key.toLowerCase(), value])
        .filter(([key, value]) => key !== 'cache-control' || value !== 'only-if-cached');
}
function getBodyCacheKeyJson(body) {
    if (!body) {
        return undefined;
    }
    if (typeof body === 'string') {
        return body;
    }
    if (body instanceof URLSearchParams) {
        return body.toString();
    }
    if (body instanceof fs.ReadStream) {
        return body.path.toString();
    }
    if (body instanceof formdataNode.FormData) {
        return getFormDataCacheKeyJson(body);
    }
    if (body instanceof buffer.Buffer) {
        return body.toString();
    }
    throw new Error('Unsupported body type. Supported body types are: string, number, undefined, null, url.URLSearchParams, fs.ReadStream, FormData');
}
async function getRequestCacheKeyJson(request) {
    const { NodeFetchRequest } = await getNodeFetch();
    const bodyInternalsSymbol = Object.getOwnPropertySymbols(new NodeFetchRequest('http://url.com'))[0];
    assert(bodyInternalsSymbol, 'Failed to get node-fetch bodyInternalsSymbol');
    return {
        headers: getHeadersCacheKeyJson([...request.headers.entries()]),
        method: request.method,
        redirect: request.redirect,
        referrer: request.referrer,
        url: request.url,
        body: getBodyCacheKeyJson(request[bodyInternalsSymbol].body),
        // Confirmed that this property exists, but it's not in the types
        follow: request.follow, // eslint-disable-line @typescript-eslint/no-unsafe-assignment
        // Confirmed that this property exists, but it's not in the types
        compress: request.compress, // eslint-disable-line @typescript-eslint/no-unsafe-assignment
        size: request.size,
    };
}
async function calculateCacheKey(resource, init) {
    const { NodeFetchRequest } = await getNodeFetch();
    const resourceCacheKeyJson = resource instanceof NodeFetchRequest
        ? await getRequestCacheKeyJson(resource)
        : { url: resource, body: undefined };
    const initCacheKeyJson = {
        body: undefined,
        ...init,
        headers: getHeadersCacheKeyJson(Object.entries(init?.headers ?? {})),
    };
    resourceCacheKeyJson.body = getBodyCacheKeyJson(resourceCacheKeyJson.body);
    initCacheKeyJson.body = getBodyCacheKeyJson(initCacheKeyJson.body);
    delete initCacheKeyJson.agent;
    return md5(JSON.stringify([resourceCacheKeyJson, initCacheKeyJson, CACHE_VERSION]));
}

const cacheOkayOnly = (response) => response.ok;
const cacheNon5xxOnly = (response) => response.status < 500;

function headerKeyIsCacheControl(key) {
    return key.trim().toLowerCase() === 'cache-control';
}
function headerValueContainsOnlyIfCached(cacheControlValue) {
    return cacheControlValue
        ?.split?.(',')
        .map(d => d.trim().toLowerCase())
        .includes('only-if-cached');
}
function headerEntryIsCacheControlOnlyIfCached(pair) {
    return headerKeyIsCacheControl(pair[0]) && headerValueContainsOnlyIfCached(pair[1]);
}
async function hasOnlyIfCachedOption(resource, init) {
    const initHeaderEntries = Object.entries(init?.headers ?? {});
    const initHeaderEntriesContainsCacheControlOnlyIfCached = initHeaderEntries.some(pair => headerEntryIsCacheControlOnlyIfCached(pair));
    if (initHeaderEntriesContainsCacheControlOnlyIfCached) {
        return true;
    }
    const { NodeFetchRequest } = await getNodeFetch();
    if (resource instanceof NodeFetchRequest
        && headerValueContainsOnlyIfCached(resource.headers.get('Cache-Control') ?? undefined)) {
        return true;
    }
    return false;
}

/* This is a bit of a hack to deal with the case when the user
 * consumes the response body in their `shouldCacheResponse` delegate.
 * The response body can only be consumed once, so if the user consumes
 * it then we wouldn't be able to read it again to write it to the cache.
 * This shim allows us to intercept the parsed body in that case and repackage
 * it into a fresh stream to cache. This of course doesn't work if the user
 * reads response.body directly, but that's not going to be likely.
 * My initial inclination was to use Response.prototype.clone() for this,
 * but the problems with backpressure seem significant. */
function shimResponseToSnipeBody(response, replaceBodyStream) {
    const origArrayBuffer = response.arrayBuffer;
    response.arrayBuffer = async function () {
        const arrayBuffer = await origArrayBuffer.call(this);
        replaceBodyStream(stream.Readable.from(buffer.Buffer.from(arrayBuffer)));
        return arrayBuffer;
    };
    const origBuffer = response.buffer;
    response.buffer = async function () {
        const buffer = await origBuffer.call(this);
        replaceBodyStream(stream.Readable.from(buffer));
        return buffer;
    };
    const origJson = response.json;
    response.json = async function () {
        const json = await origJson.call(this);
        replaceBodyStream(stream.Readable.from(buffer.Buffer.from(JSON.stringify(json))));
        return json;
    };
    const origText = response.text;
    response.text = async function () {
        const text = await origText.call(this);
        replaceBodyStream(stream.Readable.from(buffer.Buffer.from(text)));
        return text;
    };
    const origBlob = response.blob;
    response.blob = async function () {
        const blob = await origBlob.call(this);
        replaceBodyStream(stream.Readable.from(buffer.Buffer.from(await blob.text())));
        return blob;
    };
}

class LockoSynchronizationStrategy {
    async doWithExclusiveLock(key, action) {
        return locko.doWithLock(key, action);
    }
}

const emptyBuffer = buffer.Buffer.alloc(0);
class FileSystemCache {
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
                bodyStream: stream.Readable.from(emptyBuffer),
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

async function getUrlFromRequestArguments(resource) {
    const { NodeFetchRequest } = await getNodeFetch();
    if (resource instanceof NodeFetchRequest) {
        return resource.url;
    }
    return resource;
}
async function getResponse(fetchCustomization, resource, init) {
    const { NodeFetchRequest, fetch } = await getNodeFetch();
    const NFCResponse = await getNFCResponseClass();
    if (typeof resource !== 'string' && !(resource instanceof NodeFetchRequest)) {
        throw new TypeError('The first argument to fetch must be either a string or a node-fetch Request instance');
    }
    const cacheKey = await fetchCustomization.calculateCacheKey(resource, init);
    const ejectSelfFromCache = async () => fetchCustomization.cache.remove(cacheKey);
    const cachedValue = await fetchCustomization.cache.get(cacheKey);
    if (cachedValue) {
        return new NFCResponse(cachedValue.bodyStream, cachedValue.metaData, ejectSelfFromCache, true);
    }
    if (await hasOnlyIfCachedOption(resource, init)) {
        return NFCResponse.cacheMissResponse(await getUrlFromRequestArguments(resource));
    }
    return fetchCustomization.synchronizationStrategy.doWithExclusiveLock(cacheKey, async () => {
        const cachedValue = await fetchCustomization.cache.get(cacheKey);
        if (cachedValue) {
            return new NFCResponse(cachedValue.bodyStream, cachedValue.metaData, ejectSelfFromCache, true);
        }
        const fetchResponse = await fetch(resource, init);
        const serializedMeta = NFCResponse.serializeMetaFromNodeFetchResponse(fetchResponse);
        let bodyStream = fetchResponse.body;
        assert(bodyStream, 'No body stream found in fetch response');
        shimResponseToSnipeBody(fetchResponse, stream => {
            bodyStream = stream;
        });
        const shouldCache = await fetchCustomization.shouldCacheResponse(fetchResponse);
        if (shouldCache) {
            const cacheSetResult = await fetchCustomization.cache.set(cacheKey, bodyStream, serializedMeta);
            bodyStream = cacheSetResult.bodyStream;
        }
        return new NFCResponse(bodyStream, serializedMeta, ejectSelfFromCache, false);
    });
}
const globalMemoryCache = new MemoryCache();
function create(creationOptions) {
    const fetchOptions = {
        cache: creationOptions.cache ?? globalMemoryCache,
        synchronizationStrategy: creationOptions.synchronizationStrategy ?? new LockoSynchronizationStrategy(),
        shouldCacheResponse: creationOptions.shouldCacheResponse ?? (() => true),
        calculateCacheKey: creationOptions.calculateCacheKey ?? calculateCacheKey,
    };
    const fetchCache = async (resource, init, perRequestOptions) => getResponse({ ...fetchOptions, ...perRequestOptions }, resource, init);
    fetchCache.create = create;
    fetchCache.options = fetchOptions;
    return fetchCache;
}
const defaultFetch = create({});
const cacheStrategies = {
    cacheOkayOnly,
    cacheNon5xxOnly,
};

Object.defineProperty(exports, "FormData", {
    enumerable: true,
    get: function () { return formdataNode.FormData; }
});
exports.CACHE_VERSION = CACHE_VERSION;
exports.FileSystemCache = FileSystemCache;
exports.MemoryCache = MemoryCache;
exports.NodeFetchCache = defaultFetch;
exports.cacheStrategies = cacheStrategies;
exports.calculateCacheKey = calculateCacheKey;
exports.default = defaultFetch;
exports.getCacheKey = calculateCacheKey;
exports.getNodeFetch = getNodeFetch;
