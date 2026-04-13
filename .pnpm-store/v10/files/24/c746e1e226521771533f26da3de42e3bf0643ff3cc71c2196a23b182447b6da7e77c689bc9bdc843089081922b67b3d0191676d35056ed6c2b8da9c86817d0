import type { RemoveUndefined } from './types.js';
export declare const uniqueFn: typeof uniqueFilterFnGenerator;
export declare function uniqueFilterFnGenerator<T>(): (v: T) => boolean;
export declare function uniqueFilterFnGenerator<T, U>(extractFn: (v: T) => U): (v: T) => boolean;
export declare function unique<T>(src: T[]): T[];
/**
 * Delete all `undefined` and `null` fields from an object.
 * @param src - object to be cleaned
 */
export declare function clean<T extends object>(src: T): RemoveUndefined<T>;
/**
 * Creates a scan function that can be used in a map function.
 */
export declare function scanMap<T>(accFn: (acc: T, value: T) => T, init?: T): (value: T) => T;
export declare function scanMap<T, U>(accFn: (acc: U, value: T) => U, init: U): (value: T) => U;
export declare function isDefined<T>(v: T | undefined): v is T;
export declare function asyncIterableToArray<T>(iter: Iterable<T> | AsyncIterable<T>): Promise<Awaited<T>[]>;
/**
 * Shallow is Equal test.
 * @param a - array of values
 * @param b - array of values
 * @returns true if the values of `a` are exactly equal to the values of `b`
 */
export declare function isArrayEqual<K>(a: K[], b: K[]): boolean;
/**
 * Determine if two sets intersect
 * @param a - first Set
 * @param b - second Set
 * @returns true iff any element of `a` is in `b`
 */
export declare function doSetsIntersect<T>(a: Set<T>, b: Set<T>): boolean;
export declare function isRecordEqual<T extends Record<string, unknown>>(a: T | undefined, b: T | undefined): boolean;
//# sourceMappingURL=util.d.ts.map