export declare function autoResolve<K, V>(map: Map<K, V>, key: K, resolve: (k: K) => V): V;
export declare class AutoResolveCache<K, V> {
    readonly map: Map<K, V>;
    get(k: K): V | undefined;
    get(k: K, resolve: (k: K) => V): V;
    get(k: K, resolve?: (k: K) => V): V | undefined;
    has(k: K): boolean;
    set(k: K, v: V): this;
}
export declare function createAutoResolveCache<K, V>(): AutoResolveCache<K, V>;
export declare function autoResolveWeak<K extends object, V>(map: WeakMap<K, V>, key: K, resolve: (k: K) => V): V;
export declare class AutoResolveWeakCache<K extends object, V> {
    readonly map: WeakMap<K, V>;
    get(k: K): V | undefined;
    get(k: K, resolve: (k: K) => V): V;
    get(k: K, resolve?: (k: K) => V): V | undefined;
    has(k: K): boolean;
    set(k: K, v: V): this;
}
export declare function createAutoResolveWeakCache<K extends object, V>(): AutoResolveWeakCache<K, V>;
//# sourceMappingURL=AutoResolve.d.ts.map