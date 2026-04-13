export interface PairHeapNode<T> {
    /** Value */
    v: T;
    /** Siblings */
    s: PairHeapNode<T> | undefined;
    /** Children */
    c: PairHeapNode<T> | undefined;
}
export type CompareFn<T> = (a: T, b: T) => number;
export declare class PairingHeap<T> implements IterableIterator<T> {
    readonly compare: CompareFn<T>;
    private _heap;
    private _size;
    constructor(compare: CompareFn<T>);
    add(v: T): this;
    dequeue(): T | undefined;
    append(i: Iterable<T>): this;
    next(): IteratorResult<T>;
    peek(): T | undefined;
    [Symbol.iterator](): IterableIterator<T>;
    get length(): number;
}
declare function insert<T>(compare: CompareFn<T>, heap: PairHeapNode<T> | undefined, v: T): PairHeapNode<T>;
declare function merge<T>(compare: CompareFn<T>, a: PairHeapNode<T>, b: PairHeapNode<T>): PairHeapNode<T>;
declare function mergeSiblings<T>(compare: CompareFn<T>, n: PairHeapNode<T>): PairHeapNode<T>;
export declare const heapMethods: {
    insert: typeof insert;
    merge: typeof merge;
    mergeSiblings: typeof mergeSiblings;
};
export {};
//# sourceMappingURL=PairingHeap.d.ts.map