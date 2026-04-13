import { ChainFunction, IterableLike, Maybe, ReduceAsyncFunction, ReduceAsyncFunctionForAsyncIterator, ReduceFunction, ThenArg } from '../types.js';
/**
 * Operators used by Sequence
 */
export declare function filter<T>(fnFilter: (t: T) => boolean): ChainFunction<T>;
export declare function skip<T>(n: number): ChainFunction<T>;
export declare function take<T>(n: number): ChainFunction<T>;
/**
 * Concat two iterables together
 */
export declare function concat<T>(j: IterableLike<T>): ChainFunction<T>;
export declare function concatMap<T, U>(fn: (t: T) => IterableLike<U>): ChainFunction<T, U>;
/**
 * Combine two iterables together using fnMap function.
 */
export declare function combine<T, U, V>(fnMap: (t: T, u?: U) => V, j: IterableLike<U>): ChainFunction<T, V>;
/**
 * apply a mapping function to an Iterable.
 */
export declare function map<T, U>(fnMap: (t: T) => U): ChainFunction<T, U>;
export declare function scan<T>(fnReduce: (prevValue: T, curValue: T, curIndex: number) => T): ChainFunction<T>;
export declare function scan<T>(fnReduce: (prevValue: T, curValue: T, curIndex: number) => T, initValue: T): ChainFunction<T>;
export declare function scan<T, U>(fnReduce: (prevValue: U, curValue: T, curIndex: number) => U, initValue: U): ChainFunction<T, U>;
export declare function all<T>(fn: (t: T) => boolean): ReduceFunction<T, boolean>;
export declare function any<T>(fn: (t: T) => boolean): ReduceFunction<T, boolean>;
export declare function count<T>(): ReduceFunction<T, number>;
export declare function first<T>(fn: (t: T) => boolean, defaultValue: T): ReduceFunction<T>;
export declare function first<T>(fn?: (t: T) => boolean, defaultValue?: T): ReduceFunction<T, Maybe<T>>;
export declare function forEach<T>(fn: (t: T, index: number) => void): ReduceFunction<T, void>;
export declare function max<T, U>(selector: (t: T) => U): ReduceFunction<T, Maybe<T>>;
export declare function min<T, U>(selector: (t: T) => U): ReduceFunction<T, Maybe<T>>;
export declare function reduce<T, U>(fnReduce: (prevValue: U, curValue: T, curIndex: number) => U, initialValue: U): ReduceFunction<T, U>;
export declare function reduce<T>(fnReduce: (prevValue: T, curValue: T, curIndex: number) => T, initialValue: T): ReduceFunction<T>;
export declare function reduce<T>(fnReduce: (prevValue: T, curValue: T, curIndex: number) => T, initialValue: Maybe<T>): ReduceFunction<T, Maybe<T>>;
export declare function reduceAsync<T, U>(fnReduceAsync: (previousValue: ThenArg<U>, currentValue: ThenArg<T>, currentIndex: number) => ThenArg<U> | Promise<ThenArg<U>>, initialValue?: ThenArg<U>): ReduceAsyncFunction<T, Promise<ThenArg<U>>>;
export declare function reduceAsync<T>(fnReduceAsync: (previousValue: ThenArg<T>, currentValue: ThenArg<T>, currentIndex: number) => ThenArg<T> | Promise<ThenArg<T>>, initialValue?: ThenArg<T>): ReduceAsyncFunction<T, Promise<ThenArg<T>>>;
export declare function reduceAsyncForAsyncIterator<T, U>(fnReduceAsync: (previousValue: ThenArg<U>, currentValue: ThenArg<T>, currentIndex: number) => ThenArg<U> | Promise<ThenArg<U>>, initialValue?: ThenArg<U>): ReduceAsyncFunctionForAsyncIterator<T, Promise<ThenArg<U>>>;
export declare function reduceAsyncForAsyncIterator<T>(fnReduceAsync: (previousValue: ThenArg<T>, currentValue: ThenArg<T>, currentIndex: number) => ThenArg<T> | Promise<ThenArg<T>>, initialValue?: ThenArg<T>): ReduceAsyncFunctionForAsyncIterator<T, Promise<ThenArg<T>>>;
export type PipeFunction<T, U = T> = ChainFunction<T, U>;
export declare function pipe<T>(): PipeFunction<T>;
export declare function pipe<T, T1>(fn0: PipeFunction<T, T1>): PipeFunction<T, T1>;
export declare function pipe<T, T1, T2>(fn0: PipeFunction<T, T1>, fn1: PipeFunction<T1, T2>): PipeFunction<T, T2>;
export declare function pipe<T, T1, T2, T3>(fn0: PipeFunction<T, T1>, fn1: PipeFunction<T1, T2>, fn2: PipeFunction<T2, T3>): PipeFunction<T, T3>;
export declare function pipe<T, T1, T2, T3, T4>(fn0: PipeFunction<T, T1>, fn1: PipeFunction<T1, T2>, fn2: PipeFunction<T2, T3>, fn3: PipeFunction<T3, T4>): PipeFunction<T, T4>;
export declare function pipe<T, T1, T2, T3, T4, T5>(fn0: PipeFunction<T, T1>, fn1: PipeFunction<T1, T2>, fn2: PipeFunction<T2, T3>, fn3: PipeFunction<T3, T4>, fn4: PipeFunction<T4, T5>): PipeFunction<T, T5>;
export declare function pipe<T, T1, T2, T3, T4, T5, T6>(fn0: PipeFunction<T, T1>, fn1: PipeFunction<T1, T2>, fn2: PipeFunction<T2, T3>, fn3: PipeFunction<T3, T4>, fn4: PipeFunction<T4, T5>, fn5: PipeFunction<T5, T6>): PipeFunction<T, T6>;
export declare function pipe<T, T1, T2, T3, T4, T5, T6>(fn0: PipeFunction<T, T1>, fn1: PipeFunction<T1, T2>, fn2: PipeFunction<T2, T3>, fn3: PipeFunction<T3, T4>, fn4: PipeFunction<T4, T5>, fn5: PipeFunction<T5, T6>, ...fnRest: PipeFunction<T6, T6>[]): PipeFunction<T, T6>;
