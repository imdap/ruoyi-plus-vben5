export class SimpleWeakCache {
    size;
    L0 = new WeakMap();
    L1 = new WeakMap();
    L2 = new WeakMap();
    sizeL0 = 0;
    constructor(size) {
        this.size = size;
    }
    has(key) {
        for (const c of this.caches()) {
            if (c.has(key))
                return true;
        }
        return false;
    }
    get(key) {
        for (const c of this.caches()) {
            const entry = c.get(key);
            if (entry) {
                if (c !== this.L0) {
                    this._set(key, entry);
                }
                return entry.v;
            }
        }
        return undefined;
    }
    set(key, value) {
        this._set(key, { v: value });
    }
    _set(key, entry) {
        if (this.L0.has(key)) {
            this.L0.set(key, entry);
            return this;
        }
        if (this.sizeL0 >= this.size) {
            this.rotate();
        }
        this.sizeL0 += 1;
        this.L0.set(key, entry);
    }
    caches() {
        return [this.L0, this.L1, this.L2];
    }
    rotate() {
        this.L2 = this.L1;
        this.L1 = this.L0;
        this.L0 = new WeakMap();
        this.sizeL0 = 0;
    }
}
export class AutoWeakCache extends SimpleWeakCache {
    factory;
    constructor(factory, size) {
        super(size);
        this.factory = factory;
    }
    get(key) {
        const v = super.get(key);
        if (v !== undefined)
            return v;
        const val = this.factory(key);
        this.set(key, val);
        return val;
    }
}
/**
 * This will cache between `size` and 3 x `size` items.
 * It has three stashes, L0, L1, and L2. Each can contain `size` items.
 * When L0 is full, its items are given to L1 and L1's are given to L2, and L2 is empties.
 *
 * The stashes are searched in order, L0...L2. If an item is found in L1, or L2, it is
 * promoted to L0.
 */
export class SimpleCache {
    size;
    L0 = new Map();
    L1 = new Map();
    L2 = new Map();
    constructor(size) {
        this.size = size;
    }
    has(key) {
        for (const c of this.caches()) {
            if (c.has(key))
                return true;
        }
        return false;
    }
    get(key) {
        for (const c of this.caches()) {
            const entry = c.get(key);
            if (entry) {
                if (c !== this.L0) {
                    this._set(key, entry);
                }
                return entry.v;
            }
        }
        return undefined;
    }
    set(key, value) {
        this._set(key, { v: value });
    }
    delete(key) {
        let deleted = false;
        for (const c of this.caches()) {
            deleted = c.delete(key) || deleted;
        }
        return deleted;
    }
    _set(key, entry) {
        if (this.L0.has(key)) {
            this.L0.set(key, entry);
            return this;
        }
        if (this.L0.size >= this.size) {
            this.rotate();
        }
        this.L0.set(key, entry);
    }
    caches() {
        return [this.L0, this.L1, this.L2];
    }
    rotate() {
        const L2 = this.L2;
        this.L2 = this.L1;
        this.L1 = this.L0;
        this.L0 = L2;
        this.L0.clear();
    }
}
export class AutoCache extends SimpleCache {
    factory;
    constructor(factory, size) {
        super(size);
        this.factory = factory;
    }
    get(key) {
        const v = super.get(key);
        if (v !== undefined)
            return v;
        const val = this.factory(key);
        this.set(key, val);
        return val;
    }
}
//# sourceMappingURL=simpleCache.js.map