import { isAsyncIterable } from '../helpers/util.js';
// prettier-ignore
export function opFilterAsync(filterFn) {
    async function* genFilter(iter) {
        for await (const v of iter) {
            const pass = await filterFn(v);
            if (pass)
                yield v;
        }
    }
    return genFilter;
}
export function opFilterSync(filterFn) {
    function opFilterIterable(iterable) {
        function opFilterIterator() {
            const iter = iterable[Symbol.iterator]();
            function nextOpFilter() {
                while (true) {
                    const { done, value } = iter.next();
                    if (done)
                        return { done, value: undefined };
                    if (filterFn(value))
                        return { value };
                }
            }
            return {
                next: nextOpFilter,
            };
        }
        return {
            [Symbol.iterator]: opFilterIterator,
        };
    }
    return opFilterIterable;
}
export function _opFilterSync(filterFn) {
    function* genFilter(iter) {
        for (const v of iter) {
            if (filterFn(v))
                yield v;
        }
    }
    return genFilter;
}
export function opFilter(fn) {
    const asyncFn = opFilterAsync(fn);
    const syncFn = opFilterSync(fn);
    function _(i) {
        return isAsyncIterable(i) ? asyncFn(i) : syncFn(i);
    }
    return _;
}
//# sourceMappingURL=filter.js.map