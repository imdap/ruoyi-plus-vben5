import { ImplSequenceBuilder } from './ImplSequenceBuilder.js';
import { filter, skip, take, concat, concatMap, combine, map, scan } from './operators/index.js';
function makeBuilder(fn) {
    return new ImplSequenceBuilder([fn]);
}
export const builder = Object.freeze({
    pipe: (fn) => {
        return makeBuilder(fn);
    },
    //// Filters
    /** keep values where the fnFilter(t) returns true */
    filter: (fnFilter) => {
        return makeBuilder(filter(fnFilter));
    },
    skip: (n) => {
        return makeBuilder(skip(n));
    },
    take: (n) => {
        return makeBuilder(take(n));
    },
    //// Extenders
    concat: (j) => {
        return makeBuilder(concat(j));
    },
    concatMap: (fn) => {
        return makeBuilder(concatMap(fn));
    },
    //// Mappers
    combine: (fn, j) => {
        return makeBuilder(combine(fn, j));
    },
    /** map values from type T to type U */
    map: (fnMap) => {
        return makeBuilder(map(fnMap));
    },
    scan: (fnReduce, initialValue) => {
        return makeBuilder(scan(fnReduce, initialValue));
    },
});
//# sourceMappingURL=builder.js.map