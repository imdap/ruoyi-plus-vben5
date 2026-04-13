export declare class StrongWeakMap<K, V extends object> implements Map<K, V> {
    private map;
    constructor(init?: [K, V][]);
    clear(): void;
    /**
     * @returns true if an element in the Map existed and has been removed, or false if the element does not exist.
     */
    delete(key: K): boolean;
    /**
     * Executes a provided function once per each key/value pair in the Map, in insertion order.
     */
    forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void;
    /**
     * Returns a specified element from the Map object. You will get a reference to the value object and any change made to that
     * object will effectively modify it inside the Map.
     * @returns Returns the element associated with the specified key.
     *   If no element is associated with the specified key, undefined is returned.
     */
    get(key: K): V | undefined;
    /**
     * Returns a specified element from the Map. If the element isn't found, the resolver function is called and the result is stored in the map and returned.
     */
    autoGet(key: K, resolver: (key: K) => V): V;
    /**
     * Note: has will cause the value object to live longer.
     * See: [WeakRef - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakRef#notes_on_weakrefs)
     * @returns boolean indicating whether an element with the specified key exists or not.
     */
    has(key: K): boolean;
    /**
     * Adds a new element with a specified key and value to the Map. If an element with the same key already exists, the element will be updated.
     */
    set(key: K, value: V): this;
    /**
     * @returns the number of elements in the Map. Note: it is possible that some of the values have been dereferenced
     */
    get size(): number;
    /** Returns an iterable of entries in the map. */
    [Symbol.iterator](): IterableIterator<[K, V]>;
    /**
     * Returns an iterable of key, value pairs for every entry in the map.
     */
    entries(): IterableIterator<[K, V]>;
    /**
     * Returns an iterable of keys in the map
     *
     * Note: It is possible that the value associated with the key was released.
     */
    keys(): IterableIterator<K>;
    /**
     * Returns an iterable of values in the map
     */
    values(): IterableIterator<V>;
    /**
     * Removes any keys that reference released objects.
     */
    cleanKeys(): this;
    readonly [Symbol.toStringTag]: string;
}
//# sourceMappingURL=StrongWeakMap.d.ts.map