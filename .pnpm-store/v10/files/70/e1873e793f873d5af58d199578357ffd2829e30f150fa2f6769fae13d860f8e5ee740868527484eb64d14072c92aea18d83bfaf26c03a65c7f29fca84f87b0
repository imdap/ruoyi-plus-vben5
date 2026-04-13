import { filter, skip, take, concat, concatMap, combine, map, scan, all, any, count, first, forEach, max, min, reduce, reduceAsync, pipe, } from './operators/index.js';
import { toIterableIterator } from './util/util.js';
export class ImplSequence {
    i;
    _iterator;
    constructor(i) {
        this.i = i;
    }
    get iter() {
        return typeof this.i === 'function' ? this.i() : this.i;
    }
    get iterator() {
        if (!this._iterator) {
            this._iterator = this.iter[Symbol.iterator]();
        }
        return this._iterator;
    }
    inject(fn) {
        const iter = this.i;
        return () => fn(typeof iter === 'function' ? iter() : iter);
    }
    chain(fn) {
        return new ImplSequence(this.inject(fn));
    }
    [Symbol.iterator]() {
        return this.iter[Symbol.iterator]();
    }
    next() {
        return this.iterator.next();
    }
    //// Filters
    filter(fnFilter) {
        return this.chain(filter(fnFilter));
    }
    skip(n) {
        return this.chain(skip(n));
    }
    take(n) {
        return this.chain(take(n));
    }
    //// Extenders
    concat(j) {
        return this.chain(concat(j));
    }
    concatMap(fn) {
        return this.chain(concatMap(fn));
    }
    //// Mappers
    combine(fn, j) {
        return this.chain(combine(fn, j));
    }
    map(fn) {
        return this.chain(map(fn));
    }
    scan(fnReduce, initValue) {
        return this.chain(scan(fnReduce, initValue));
    }
    pipe(...fns) {
        if (!fns.length)
            return this;
        // Casting workaround due to the spread operator not working See: https://github.com/microsoft/TypeScript/issues/28010
        return this.chain(pipe.apply(null, fns));
    }
    // Reducers
    all(fnFilter) {
        return all(fnFilter)(this.iter);
    }
    any(fnFilter) {
        return any(fnFilter)(this.iter);
    }
    count() {
        return count()(this.iter);
    }
    first(fnFilter, defaultValue) {
        return first(fnFilter, defaultValue)(this.iter);
    }
    forEach(fn) {
        return forEach(fn)(this.iter);
    }
    max(fnSelector) {
        return max(fnSelector)(this.iter);
    }
    min(fnSelector) {
        return min(fnSelector)(this.iter);
    }
    reduce(fnReduce, initValue) {
        return reduce(fnReduce, initValue)(this.iter);
    }
    reduceAsync(fnReduceAsync, initialValue) {
        return reduceAsync(fnReduceAsync, initialValue)(this.iter);
    }
    reduceToSequence(fnReduce, initialValue) {
        return this.chain(reduce(fnReduce, initialValue));
    }
    //// Cast
    toArray() {
        return [...this.iter];
    }
    toIterable() {
        return toIterableIterator(this.iter);
    }
}
//# sourceMappingURL=ImplSequence.js.map