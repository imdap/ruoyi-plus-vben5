import fs from 'fs';
import crypto from 'crypto';
import assert from 'assert';
import { Buffer } from 'buffer';
import { FormData } from '../types.js';
import { getNodeFetch } from './node_fetch_imports.js';
export const CACHE_VERSION = 6;
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
    if (body instanceof FormData) {
        return getFormDataCacheKeyJson(body);
    }
    if (body instanceof Buffer) {
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
export async function calculateCacheKey(resource, init) {
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
//# sourceMappingURL=cache_keys.js.map