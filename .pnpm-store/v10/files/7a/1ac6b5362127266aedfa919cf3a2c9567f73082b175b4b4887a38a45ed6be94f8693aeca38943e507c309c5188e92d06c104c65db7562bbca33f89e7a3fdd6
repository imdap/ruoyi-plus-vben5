interface IDisposable {
    dispose(): void;
}
export declare function autoResolve<K, V>(map: Map<K, V>, key: K, resolve: (k: K) => V): V;
export interface CacheStats {
    hits: number;
    misses: number;
    resolved: number;
    deletes: number;
    sets: number;
    clears: number;
    disposals: number;
}
export type AutoResolveCacheStats = Readonly<CacheStats>;
export declare class AutoResolveCache<K, V> implements IDisposable {
    readonly map: Map<K, V>;
    get(k: K): V | undefined;
    get(k: K, resolve: (k: K) => V): V;
    get(k: K, resolve?: (k: K) => V): V | undefined;
    has(k: K): boolean;
    set(k: K, v: V): this;
    delete(k: K): boolean;
    clear(): void;
    dispose(): void;
}
export declare function createAutoResolveCache<K, V>(): AutoResolveCache<K, V>;
export interface IWeakMap<K extends object, V> {
    get(k: K): V | undefined;
    set(k: K, v: V): this;
    has(k: K): boolean;
    delete(key: K): boolean;
}
export declare function autoResolveWeak<K extends object, V>(map: IWeakMap<K, V>, key: K, resolve: (k: K) => V): V;
export declare class AutoResolveWeakCache<K extends object, V> implements IWeakMap<K, V> {
    private _map;
    private _stats;
    get(k: K): V | undefined;
    get(k: K, resolve: (k: K) => V): V;
    get(k: K, resolve?: (k: K) => V): V | undefined;
    get map(): WeakMap<K, V>;
    has(k: K): boolean;
    set(k: K, v: V): this;
    clear(): void;
    delete(k: K): boolean;
    dispose(): void;
    stats(): AutoResolveCacheStats;
}
export declare function createAutoResolveWeakCache<K extends object, V>(): AutoResolveWeakCache<K, V>;
export declare class AutoResolveWeakWeakCache<K extends object, V extends object> implements IWeakMap<K, V> {
    private _map;
    private _stats;
    get(k: K): V | undefined;
    get(k: K, resolve: (k: K) => V): V;
    get(k: K, resolve?: (k: K) => V): V | undefined;
    get map(): WeakMap<K, WeakRef<V>>;
    has(k: K): boolean;
    set(k: K, v: V): this;
    clear(): void;
    delete(k: K): boolean;
    dispose(): void;
    stats(): AutoResolveCacheStats;
}
export declare function createAutoResolveWeakWeakCache<K extends object, V extends object>(): AutoResolveWeakWeakCache<K, V>;
export {};
//# sourceMappingURL=AutoResolve.d.ts.map