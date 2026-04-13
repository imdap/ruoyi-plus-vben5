import { Maybe, IterableLike, AsyncIterableLike, IterableOfPromise } from '../types.js';
/**
 * Operators used by Sequence
 */
export declare function filter<T>(i: IterableLike<T>, fnFilter: (t: T) => boolean): IterableIterator<T>;
export declare function skip<T>(i: IterableLike<T>, n: number): IterableIterator<T>;
export declare function take<T>(i: IterableLike<T>, n: number): IterableIterator<T>;
/**
 * Concat two iterables together
 */
export declare function concat<T>(i: IterableLike<T>, j: IterableLike<T>): IterableIterator<T>;
export declare function concatMap<T, U>(i: IterableLike<T>, fn: (t: T) => IterableLike<U>): IterableIterator<U>;
/**
 * Combine two iterables together using fnMap function.
 */
export declare function combine<T, U, V>(i: IterableLike<T>, j: IterableLike<U>, fnMap: (t: T, u?: U) => V): IterableIterator<V>;
/**
 * apply a mapping function to an Iterable.
 */
export declare function map<T, U>(i: IterableLike<T>, fnMap: (t: T) => U): IterableIterator<U>;
export declare function scan<T>(i: IterableLike<T>, fnReduce: (prevValue: T, curValue: T, curIndex: number) => T): IterableIterator<T>;
export declare function scan<T>(i: IterableLike<T>, fnReduce: (prevValue: T, curValue: T, curIndex: number) => T, initValue: T): IterableIterator<T>;
export declare function scan<T, U>(i: IterableLike<T>, fnReduce: (prevValue: U, curValue: T, curIndex: number) => U, initValue: U): IterableIterator<U>;
export declare function all<T>(i: IterableLike<T>, fn: (t: T) => boolean): boolean;
export declare function any<T>(i: IterableLike<T>, fn: (t: T) => boolean): boolean;
export declare function count<T>(i: IterableLike<T>): number;
export declare function first<T>(i: IterableLike<T>, fn: Maybe<(t: T) => boolean>, defaultValue: Maybe<T>): Maybe<T>;
export declare function first<T>(i: IterableLike<T>, fn: (t: T) => boolean, defaultValue: T): T;
export declare function forEach<T>(i: IterableLike<T>, fn: (t: T, index: number) => void): void;
export declare function max<T, U>(i: IterableLike<T>, selector: undefined): Maybe<T>;
export declare function max<T, U>(i: IterableLike<T>, selector: ((t: T) => U) | undefined): Maybe<T>;
export declare function min<T>(i: IterableLike<T>, selector: undefined): Maybe<T>;
export declare function min<T, U>(i: IterableLike<T>, selector: ((t: T) => U) | undefined): Maybe<T>;
export declare function reduce<T, U>(i: IterableLike<T>, fnReduce: (prevValue: U, curValue: T, curIndex: number) => U, initialValue: U): U;
export declare function reduce<T>(i: IterableLike<T>, fnReduce: (prevValue: T, curValue: T, curIndex: number) => T, initialValue: T): T;
export declare function reduce<T>(i: IterableLike<T>, fnReduce: (prevValue: T, curValue: T, curIndex: number) => T, initialValue: Maybe<T>): Maybe<T>;
export declare function reduceAsync<T, U>(i: IterableOfPromise<T>, fnReduce: (previousValue: U, currentValue: T, currentIndex: number) => U | Promise<U>, initialValue: U | Promise<U>): Promise<U>;
export declare function reduceAsync<T>(i: IterableOfPromise<T>, fnReduce: (previousValue: T, currentValue: T, currentIndex: number) => T | Promise<T>, initialValue?: T | Promise<T>): Promise<T>;
export declare function reduceAsyncForAsyncIterator<T, U>(i: AsyncIterableLike<T>, fnReduce: (previousValue: U, currentValue: T, currentIndex: number) => U | Promise<U>, initialValue?: U | Promise<U>): Promise<U>;
export declare function reduceAsyncForAsyncIterator<T>(i: AsyncIterableLike<T>, fnReduce: (previousValue: T, currentValue: T, currentIndex: number) => T | Promise<T>, initialValue?: T | Promise<T>): Promise<T>;
/**
 * Convert an Iterator into an IterableIterator
 */
export declare function makeIterable<T>(i: Iterator<T> | Iterable<T> | IterableIterator<T>): IterableIterator<T>;
export declare function isIterable<T>(i: Iterator<T> | IterableLike<T> | AsyncIterator<T> | AsyncIterableIterator<T>): i is IterableLike<T>;
export declare function isIterableIterator<T>(i: IterableLike<T>): i is IterableIterator<T>;
export declare function makeAsyncIterable<T>(i: Iterator<T> | Iterable<T> | IterableIterator<T> | AsyncIterator<T> | AsyncIterable<T> | AsyncIterableIterator<T>): AsyncIterableIterator<T>;
export declare function isAsyncIterable<T>(i: Iterator<T> | Iterable<T> | AsyncIterator<T> | AsyncIterable<T> | AsyncIterableIterator<T>): i is AsyncIterableLike<T>;
export declare function isAsyncIterableIterator<T>(i: AsyncIterableLike<T>): i is AsyncIterableIterator<T>;
/**
 * Creates a scan function that can be used in a map function.
 */
export declare function scanMap<T>(accFn: (acc: T, value: T) => T, init?: T): (value: T) => T;
export declare function scanMap<T, U>(accFn: (acc: U, value: T) => U, init: U): (value: T) => U;
