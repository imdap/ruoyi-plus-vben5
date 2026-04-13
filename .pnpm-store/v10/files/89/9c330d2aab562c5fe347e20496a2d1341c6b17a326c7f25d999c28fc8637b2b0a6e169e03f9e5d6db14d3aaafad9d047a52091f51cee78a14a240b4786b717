export interface AutoCache<R> extends CacheStats {
    (word: string): R;
}
export interface CacheStats {
    hits: number;
    misses: number;
    swaps: number;
}
declare abstract class Cache01<R> implements CacheStats {
    readonly maxSize: number;
    hits: number;
    misses: number;
    swaps: number;
    constructor(maxSize: number);
    abstract get(key: string): R | undefined;
    abstract set(key: string, value: R): this;
}
export declare function createCache01<R>(size: number): Cache01<R>;
export declare function autoCache<R>(fn: (p: string) => R, size?: number): AutoCache<R>;
export declare function extractStats(ac: AutoCache<unknown> | CacheStats): CacheStats;
export {};
//# sourceMappingURL=AutoCache.d.ts.map