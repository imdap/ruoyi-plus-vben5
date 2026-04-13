export declare class SimpleWeakCache<K extends object, T> {
    readonly size: number;
    private L0;
    private L1;
    private L2;
    private sizeL0;
    constructor(size: number);
    has(key: K): boolean;
    get(key: K): T | undefined;
    set(key: K, value: T): void;
    private _set;
    private caches;
    private rotate;
}
export declare class AutoWeakCache<K extends object, T> extends SimpleWeakCache<K, T> {
    readonly factory: (key: K) => T;
    constructor(factory: (key: K) => T, size: number);
    get(key: K): T;
}
/**
 * This will cache between `size` and 3 x `size` items.
 * It has three stashes, L0, L1, and L2. Each can contain `size` items.
 * When L0 is full, its items are given to L1 and L1's are given to L2, and L2 is empties.
 *
 * The stashes are searched in order, L0...L2. If an item is found in L1, or L2, it is
 * promoted to L0.
 */
export declare class SimpleCache<K, T> {
    readonly size: number;
    private L0;
    private L1;
    private L2;
    constructor(size: number);
    has(key: K): boolean;
    get(key: K): T | undefined;
    set(key: K, value: T): void;
    private _set;
    private caches;
    private rotate;
}
export declare class AutoCache<K, T> extends SimpleCache<K, T> {
    readonly factory: (key: K) => T;
    constructor(factory: (key: K) => T, size: number);
    get(key: K): T;
}
//# sourceMappingURL=simpleCache.d.ts.map