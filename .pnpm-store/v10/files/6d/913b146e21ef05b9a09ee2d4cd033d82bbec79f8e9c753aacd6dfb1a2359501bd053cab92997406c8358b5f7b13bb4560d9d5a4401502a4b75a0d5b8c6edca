export function autoResolve(map, key, resolve) {
    const found = map.get(key);
    if (found !== undefined || map.has(key))
        return found;
    const value = resolve(key);
    map.set(key, value);
    return value;
}
class CacheStatsTracker {
    hits = 0;
    misses = 0;
    resolved = 0;
    deletes = 0;
    sets = 0;
    clears = 0;
    disposals = 0;
    stats() {
        return {
            hits: this.hits,
            misses: this.misses,
            resolved: this.resolved,
            deletes: this.deletes,
            sets: this.sets,
            clears: this.clears,
            disposals: this.disposals,
        };
    }
    clear() {
        this.hits = 0;
        this.misses = 0;
        this.resolved = 0;
        this.deletes = 0;
        this.sets = 0;
        ++this.clears;
    }
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
    delete(k) {
        return this.map.delete(k);
    }
    clear() {
        this.map.clear();
    }
    dispose() {
        this.clear();
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
    _map = new WeakMap();
    _stats = new CacheStatsTracker();
    get(k, resolve) {
        const map = this._map;
        const found = map.get(k);
        if (found !== undefined || map.has(k)) {
            ++this._stats.hits;
            return found;
        }
        ++this._stats.misses;
        if (!resolve) {
            return undefined;
        }
        ++this._stats.resolved;
        const value = resolve(k);
        map.set(k, value);
        return value;
    }
    get map() {
        return this._map;
    }
    has(k) {
        return this._map.has(k);
    }
    set(k, v) {
        ++this._stats.sets;
        this._map.set(k, v);
        return this;
    }
    clear() {
        this._stats.clear();
        this._map = new WeakMap();
    }
    delete(k) {
        ++this._stats.deletes;
        return this._map.delete(k);
    }
    dispose() {
        ++this._stats.disposals;
        this.clear();
    }
    stats() {
        return this._stats.stats();
    }
}
export function createAutoResolveWeakCache() {
    return new AutoResolveWeakCache();
}
export class AutoResolveWeakWeakCache {
    _map = new WeakMap();
    _stats = new CacheStatsTracker();
    get(k, resolve) {
        const map = this._map;
        const found = map.get(k);
        const foundValue = found?.deref();
        if (found !== undefined && foundValue) {
            ++this._stats.hits;
            return foundValue;
        }
        ++this._stats.misses;
        if (!resolve) {
            if (found) {
                map.delete(k);
            }
            return undefined;
        }
        ++this._stats.resolved;
        const value = resolve(k);
        map.set(k, new WeakRef(value));
        return value;
    }
    get map() {
        return this._map;
    }
    has(k) {
        return !!this._map.get(k)?.deref();
    }
    set(k, v) {
        ++this._stats.sets;
        this._map.set(k, new WeakRef(v));
        return this;
    }
    clear() {
        this._stats.clear();
        this._map = new WeakMap();
    }
    delete(k) {
        ++this._stats.deletes;
        return this._map.delete(k);
    }
    dispose() {
        ++this._stats.disposals;
        this.clear();
    }
    stats() {
        return this._stats.stats();
    }
}
export function createAutoResolveWeakWeakCache() {
    return new AutoResolveWeakWeakCache();
}
//# sourceMappingURL=AutoResolve.js.map