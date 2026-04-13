// alias for uniqueFilterFnGenerator
export const uniqueFn = uniqueFilterFnGenerator;
export function uniqueFilterFnGenerator(extractFn) {
    const values = new Set();
    const extractor = extractFn || ((a) => a);
    return (v) => {
        const vv = extractor(v);
        const ret = !values.has(vv);
        values.add(vv);
        return ret;
    };
}
export function unique(src) {
    return [...new Set(src)];
}
/**
 * Delete all `undefined` and `null` fields from an object.
 * @param src - object to be cleaned
 */
export function clean(src) {
    const r = src;
    for (const key of Object.keys(r)) {
        if (r[key] === undefined || r[key] === null) {
            delete r[key];
        }
    }
    return r;
}
export function scanMap(accFn, init) {
    let acc = init;
    let first = true;
    return function (value) {
        if (first && acc === undefined) {
            first = false;
            acc = value;
            return acc;
        }
        acc = accFn(acc, value);
        return acc;
    };
}
export function isDefined(v) {
    return v !== undefined;
}
export async function asyncIterableToArray(iter) {
    const acc = [];
    for await (const t of iter) {
        acc.push(t);
    }
    return acc;
}
/**
 * Shallow is Equal test.
 * @param a - array of values
 * @param b - array of values
 * @returns true if the values of `a` are exactly equal to the values of `b`
 */
export function isArrayEqual(a, b) {
    if (a === b)
        return true;
    let isMatch = a.length === b.length;
    for (let i = 0; i < a.length && isMatch; ++i) {
        isMatch = a[i] === b[i];
    }
    return isMatch;
}
/**
 * Determine if two sets intersect
 * @param a - first Set
 * @param b - second Set
 * @returns true iff any element of `a` is in `b`
 */
export function doSetsIntersect(a, b) {
    function compare(a, b) {
        for (const item of a) {
            if (b.has(item))
                return true;
        }
        return false;
    }
    return a.size <= b.size ? compare(a, b) : compare(b, a);
}
export function isRecordEqual(a, b) {
    if (a === b)
        return true;
    if (a === undefined || b === undefined)
        return false;
    for (const key of Object.keys(a)) {
        if (a[key] !== b[key])
            return false;
    }
    for (const key of Object.keys(b)) {
        if (a[key] !== b[key])
            return false;
    }
    return true;
}
//# sourceMappingURL=util.js.map