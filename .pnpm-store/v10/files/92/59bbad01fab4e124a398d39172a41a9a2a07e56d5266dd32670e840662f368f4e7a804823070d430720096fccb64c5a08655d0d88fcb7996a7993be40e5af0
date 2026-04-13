/**
 * Clones the properties from src to dst using the provided handlers.
 * @param src
 * @param dst
 * @param handlers
 * @param keys
 * @returns
 */
export function cloneInto(src, dst, handlers, keys) {
    const keysToProcess = keys || Object.keys(handlers);
    for (const key of keysToProcess) {
        if (src[key] === undefined)
            continue;
        const handler = handlers[key];
        if (handler === skip)
            continue;
        handler(src, dst, key);
    }
    return dst;
}
export function skip(_src, _dst, _key) {
    // do nothing
}
/**
 * Copy the property from src to dst.
 * If the property is undefined, it is not copied.
 * @param src - source object
 * @param dst - destination object
 * @param key - property key
 */
export function copy0(src, dst, key) {
    const value = src[key];
    if (value === undefined)
        return;
    dst[key] = value;
}
/**
 * Copy the property from src to dst.
 * If the property is undefined, it is not copied.
 * If the property is an array, a shallow copy of the array is made.
 * If the property is a Set, a shallow copy of the Set is made.
 * If the property is a Map, a shallow copy of the Map is made.
 * If the property is an object, a shallow copy of the object is made.
 * @param src - source object
 * @param dst - destination object
 * @param key - property key
 */
export function copy1(src, dst, key) {
    if (src[key] === undefined)
        return;
    const value = src[key];
    if (value === undefined)
        return;
    if (Array.isArray(value)) {
        dst[key] = [...value];
        return;
    }
    if (value instanceof Set) {
        dst[key] = new Set(value);
        return;
    }
    if (value instanceof Map) {
        dst[key] = new Map(value);
        return;
    }
    if (value instanceof RegExp) {
        dst[key] = value;
        return;
    }
    if (typeof value === 'object') {
        dst[key] = { ...value };
        return;
    }
    dst[key] = value;
}
//# sourceMappingURL=clone.js.map