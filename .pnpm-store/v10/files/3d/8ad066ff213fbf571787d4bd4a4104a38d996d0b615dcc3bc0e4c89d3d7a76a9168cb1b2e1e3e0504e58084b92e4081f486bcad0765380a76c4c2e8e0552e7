import { getModifiedDate } from "./fs.js";
const CACHE = new Map();
export function invalidateByModifiedDate(cache, path) {
    if (!path) {
        return true;
    }
    const modified = getModifiedDate(path);
    return modified > cache.date;
}
export function withCache(key, path, callback, invalidate = invalidateByModifiedDate) {
    const cacheKey = `${key}-${path}`;
    const cached = CACHE.get(cacheKey);
    if (cached && !invalidate(cached, path)) {
        return cached.value;
    }
    const value = callback();
    if (value instanceof Promise) {
        return value.then(resolvedValue => {
            CACHE.set(cacheKey, { date: new Date(), value: resolvedValue });
            return resolvedValue;
        });
    }
    else {
        CACHE.set(cacheKey, { date: new Date(), value });
        return value;
    }
}
export function clearCache() {
    CACHE.clear();
}
//# sourceMappingURL=cache.js.map