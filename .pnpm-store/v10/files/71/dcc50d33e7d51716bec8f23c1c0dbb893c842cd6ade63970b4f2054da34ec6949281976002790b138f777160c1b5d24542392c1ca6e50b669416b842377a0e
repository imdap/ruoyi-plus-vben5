interface LLNode<T> {
    value: T;
    n?: LLNode<T> | undefined;
    p?: LLNode<T> | undefined;
}
interface LL<T> {
    n?: LLNode<T> | undefined;
    p?: LLNode<T> | undefined;
}
export declare class AutoResolveLRUCache<T, V> {
    readonly maxSize: number;
    readonly isEqual: (a: T, b: T) => boolean;
    protected list: LL<{
        p: T;
        r: V;
    }>;
    private count;
    private _misses;
    private _hits;
    private _added;
    private _removed;
    constructor(maxSize: number, isEqual: (a: T, b: T) => boolean);
    get(params: T): V | undefined;
    get(params: T, fn: (p: T) => V): V;
    get(params: T, fn?: (p: T) => V): V | undefined;
    get size(): number;
    get hits(): number;
    get misses(): number;
    get added(): number;
    get removed(): number;
    clear(): void;
    private addToHead;
    stats(): {
        size: number;
        hits: number;
        misses: number;
        added: number;
        removed: number;
    };
    toJSON(): {
        size: number;
        hits: number;
        misses: number;
        added: number;
        removed: number;
    };
    static assertValid<T, V>(cache: AutoResolveLRUCache<T, V>): void;
}
export declare function assertValidateLL<T>(list: LL<T>): void;
export declare class AutoResolveLastNCalls<Params extends unknown[], Result> extends AutoResolveLRUCache<Params, Result> {
    constructor(maxSize: number);
}
export {};
//# sourceMappingURL=AutoResolveLRUCache.d.ts.map