declare function addToHeap<T>(t: T[], c: T, compare: (a: T, b: T) => number): void;
declare function takeFromHeap<T>(t: T[], compare: (a: T, b: T) => number): T | undefined;
/**
 * MinHeapQueue - based upon a minHeap array.
 */
export declare class MinHeapQueue<T> implements IterableIterator<T> {
    readonly compare: (a: T, b: T) => number;
    private values;
    constructor(compare: (a: T, b: T) => number);
    add(t: T): MinHeapQueue<T>;
    get length(): number;
    dequeue(): T | undefined;
    append(i: Iterable<T>): MinHeapQueue<T>;
    next(): IteratorResult<T>;
    [Symbol.iterator](): IterableIterator<T>;
    clone(): MinHeapQueue<T>;
}
export declare const __testing__: {
    addToHeap: typeof addToHeap;
    takeFromHeap: typeof takeFromHeap;
};
export {};
//# sourceMappingURL=MinHeapQueue.d.ts.map