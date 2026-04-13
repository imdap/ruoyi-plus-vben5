export function autoResolve(map, key, resolve) {
    const found = map.get(key);
    if (found !== undefined || map.has(key))
        return found;
    const value = resolve(key);
    map.set(key, value);
    return value;
}
export class AutoResolveCache {
    map = new Map();
    get(k, resolve) {
        return resolve ? autoResolve(this.map, k, resolve) : this.map.get(k);
    }
    has(k) {
        return this.map.has(k);
    }
    set(k, v) {
        this.map.set(k, v);
        return this;
    }
}
export function createAutoResolveCache() {
    return new AutoResolveCache();
}
export function autoResolveWeak(map, key, resolve) {
    const found = map.get(key);
    if (found !== undefined || map.has(key))
        return found;
    const value = resolve(key);
    map.set(key, value);
    return value;
}
export class AutoResolveWeakCache {
    map = new WeakMap();
    get(k, resolve) {
        return resolve ? autoResolveWeak(this.map, k, resolve) : this.map.get(k);
    }
    has(k) {
        return this.map.has(k);
    }
    set(k, v) {
        this.map.set(k, v);
        return this;
    }
}
export function createAutoResolveWeakCache() {
    return new AutoResolveWeakCache();
}
//# sourceMappingURL=AutoResolve.js.map