export function toIterator(values) {
    let iter;
    const rangeIterator = {
        next: function () {
            if (!iter) {
                iter = values[Symbol.iterator]();
            }
            return iter.next();
        },
    };
    return rangeIterator;
}
export function* toIterableIterator(i) {
    yield* i;
}
//# sourceMappingURL=util.js.map