import { pipe, filter, skip, take, concat, concatMap, combine, map, scan } from './operators/index.js';
import { ImplSequence } from './ImplSequence.js';
export class ImplSequenceBuilder {
    operators = [];
    constructor(operators = []) {
        this.operators = operators;
    }
    build(i) {
        return new ImplSequence(i).pipe(pipe.apply(null, this.operators));
    }
    pipe(...fns) {
        return new ImplSequenceBuilder([...this.operators, ...fns]);
    }
    //// Filters
    /** keep values where the fnFilter(t) returns true */
    filter(fnFilter) {
        return this.pipe(filter(fnFilter));
    }
    skip(n) {
        return this.pipe(skip(n));
    }
    take(n) {
        return this.pipe(take(n));
    }
    //// Extenders
    concat(j) {
        return this.pipe(concat(j));
    }
    concatMap(fn) {
        return this.pipe(concatMap(fn));
    }
    //// Mappers
    combine(fn, j) {
        return this.pipe(combine(fn, j));
    }
    /** map values from type T to type U */
    map(fnMap) {
        return this.pipe(map(fnMap));
    }
    scan(fnReduce, initialValue) {
        return this.pipe(scan(fnReduce, initialValue));
    }
}
//# sourceMappingURL=ImplSequenceBuilder.js.map