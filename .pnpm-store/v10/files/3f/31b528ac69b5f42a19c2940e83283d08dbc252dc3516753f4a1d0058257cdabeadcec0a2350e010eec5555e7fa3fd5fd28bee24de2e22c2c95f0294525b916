import { SequenceBuilder, ChainFunction, LazyIterable, Sequence } from './types.js';
export declare class ImplSequenceBuilder<S, T = S> implements SequenceBuilder<S, T> {
    private operators;
    constructor(operators?: ChainFunction<S, T>[]);
    build(i: LazyIterable<S>): Sequence<T>;
    pipe<U>(...fns: ChainFunction<T, U>[]): SequenceBuilder<S, U>;
    /** keep values where the fnFilter(t) returns true */
    filter(fnFilter: (t: T) => boolean): SequenceBuilder<S, T>;
    skip(n: number): SequenceBuilder<S, T>;
    take(n: number): SequenceBuilder<S, T>;
    concat(j: Iterable<T>): SequenceBuilder<S, T>;
    concatMap<U>(fn: (t: T) => Iterable<U>): SequenceBuilder<S, U>;
    combine<U, V>(fn: (t: T, u?: U) => V, j: Iterable<U>): SequenceBuilder<S, V>;
    /** map values from type T to type U */
    map<U>(fnMap: (t: T) => U): SequenceBuilder<S, U>;
    scan(fnReduce: (previousValue: T, currentValue: T, currentIndex: number) => T, initialValue?: T): SequenceBuilder<S, T>;
}
