export function toPipeFn(syncFn, asyncFn) {
    function _(i) {
        return isAsyncIterable(i) ? asyncFn(i) : syncFn(i);
    }
    return _;
}
export function isAsyncIterable(i) {
    return typeof i[Symbol.asyncIterator] === 'function';
}
//# sourceMappingURL=util.js.map