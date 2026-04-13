import { ChainFunction, SequenceBuilder } from './types.js';
export declare const builder: Readonly<{
    pipe: <T, U>(fn: ChainFunction<T, U>) => SequenceBuilder<T, U>;
    /** keep values where the fnFilter(t) returns true */
    filter: <T>(fnFilter: (t: T) => boolean) => SequenceBuilder<T, T>;
    skip: <T>(n: number) => SequenceBuilder<T, T>;
    take: <T>(n: number) => SequenceBuilder<T, T>;
    concat: <T>(j: Iterable<T>) => SequenceBuilder<T, T>;
    concatMap: <T, U>(fn: (t: T) => Iterable<U>) => SequenceBuilder<T, U>;
    combine: <T, U, V>(fn: (t: T, u?: U) => V, j: Iterable<U>) => SequenceBuilder<T, V>;
    /** map values from type T to type U */
    map: <T, U>(fnMap: (t: T) => U) => SequenceBuilder<T, U>;
    scan: <T, U>(fnReduce: (previousValue: U, currentValue: T, currentIndex: number) => U, initialValue: U) => SequenceBuilder<T, U>;
}>;
