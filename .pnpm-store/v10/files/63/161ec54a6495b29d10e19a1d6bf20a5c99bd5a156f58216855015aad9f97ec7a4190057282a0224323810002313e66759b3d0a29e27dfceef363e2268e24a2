export function compareBy(extract, ...extractors) {
    const compareFns = [extract, ...extractors]
        .map((ex) => (typeof ex === 'function' ? ex : (t) => t[ex]))
        .map((ex) => (a, b) => _compare(ex(a), ex(b)));
    return compareEach(...compareFns);
}
export function compareByRev(extract, ...extractors) {
    return reverse(compareBy(extract, ...extractors));
}
export function compareEach(...compareFn) {
    return (a, b) => {
        for (const fn of compareFn) {
            const r = fn(a, b);
            if (r) {
                return r;
            }
        }
        return 0;
    };
}
function _compare(a, b) {
    if (a === b)
        return 0;
    if (a === undefined)
        return 1;
    if (b === undefined)
        return -1;
    if (a === null)
        return 1;
    if (b === null)
        return -1;
    if (a < b)
        return -1;
    if (a > b)
        return 1;
    return 0;
}
export function compare(a, b) {
    return _compare(a, b);
}
export function reverse(fn) {
    return (a, b) => {
        const r = fn(a, b);
        return r ? -r : 0;
    };
}
//# sourceMappingURL=Comparable.js.map