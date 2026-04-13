import { getNodeFetch } from './node_fetch_imports.js';
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
export async function hasOnlyIfCachedOption(resource, init) {
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
//# sourceMappingURL=headers.js.map