const CACHE_SIZE = 100;
class Cache01 {
    maxSize;
    hits = 0;
    misses = 0;
    swaps = 0;
    constructor(maxSize) {
        this.maxSize = maxSize;
    }
}
class Cache01Map extends Cache01 {
    count = 0;
    cache0 = new Map();
    cache1 = new Map();
    constructor(maxSize) {
        super(maxSize);
    }
    get(key) {
        const cache0 = this.cache0;
        const cache1 = this.cache1;
        let found = cache0.get(key);
        if (found !== undefined) {
            ++this.hits;
            return found;
        }
        found = cache1.get(key);
        if (found !== undefined) {
            ++this.hits;
            ++this.count;
            cache0.set(key, found);
            return found;
        }
        ++this.misses;
        return undefined;
    }
    set(key, value) {
        if (this.count >= this.maxSize) {
            const c = this.cache1;
            this.cache1 = this.cache0;
            this.cache0 = c;
            c.clear();
            this.swaps++;
            this.count = 0;
        }
        ++this.count;
        this.cache0.set(key, value);
        return this;
    }
}
export function createCache01(size) {
    return new Cache01Map(size);
}
export function autoCache(fn, size = CACHE_SIZE) {
    const cache = createCache01(size);
    const ac = get;
    ac.hits = 0;
    ac.misses = 0;
    ac.swaps = 0;
    function get(k) {
        const f = cache.get(k);
        if (f !== undefined) {
            ++ac.hits;
            return f;
        }
        const r = fn(k);
        cache.set(k, r);
        ac.swaps = cache.swaps;
        ++ac.misses;
        return r;
    }
    return ac;
}
export function extractStats(ac) {
    const { hits, misses, swaps } = ac;
    return { hits, misses, swaps };
}
//# sourceMappingURL=AutoCache.js.map