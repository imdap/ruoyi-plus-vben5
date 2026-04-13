import * as op from './operatorsBase.js';
/**
 * Operators used by Sequence
 */
//// Filters
export function filter(fnFilter) {
    return (i) => op.filter(i, fnFilter);
}
export function skip(n) {
    return (i) => op.skip(i, n);
}
export function take(n) {
    return (i) => op.take(i, n);
}
//// Extenders
/**
 * Concat two iterables together
 */
export function concat(j) {
    return (i) => op.concat(i, j);
}
export function concatMap(fn) {
    return (i) => op.concatMap(i, fn);
}
//// Mappers
/**
 * Combine two iterables together using fnMap function.
 */
export function combine(fnMap, j) {
    return (i) => op.combine(i, j, fnMap);
}
/**
 * apply a mapping function to an Iterable.
 */
export function map(fnMap) {
    return (i) => op.map(i, fnMap);
}
export function scan(fnReduce, initValue) {
    return (i) => op.scan(i, fnReduce, initValue);
}
//// Reducers
export function all(fn) {
    return (i) => op.all(i, fn);
}
export function any(fn) {
    return (i) => op.any(i, fn);
}
export function count() {
    return (i) => op.count(i);
}
export function first(fn, defaultValue) {
    return (i) => op.first(i, fn, defaultValue);
}
export function forEach(fn) {
    return (i) => op.forEach(i, fn);
}
export function max(selector) {
    return (i) => op.max(i, selector);
}
export function min(selector) {
    return (i) => op.min(i, selector);
}
export function reduce(fnReduce, initialValue) {
    return (i) => op.reduce(i, fnReduce, initialValue);
}
export function reduceAsync(fnReduceAsync, initialValue) {
    return (i) => op.reduceAsync(i, fnReduceAsync, initialValue);
}
export function reduceAsyncForAsyncIterator(fnReduceAsync, initialValue) {
    return (i) => op.reduceAsyncForAsyncIterator(i, fnReduceAsync, initialValue);
}
export function pipe(...fns) {
    return (i) => {
        for (const fn of fns) {
            i = fn ? fn(i) : i;
        }
        return i;
    };
}
//# sourceMappingURL=operators.js.map