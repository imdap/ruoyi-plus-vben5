import { isAsyncIterable } from '../helpers/util.js';
const symNotFound = Symbol('LastNotFound');
// prettier-ignore
export function opLastAsync(lastFn) {
    async function* fn(iter) {
        let last = symNotFound;
        for await (const v of iter) {
            const pass = await lastFn(v);
            if (pass) {
                last = v;
            }
        }
        if (last !== symNotFound)
            yield last;
    }
    return fn;
}
export function opLastSync(lastFn) {
    function* fn(iter) {
        let last = symNotFound;
        for (const v of iter) {
            if (lastFn(v)) {
                last = v;
            }
        }
        if (last !== symNotFound)
            yield last;
    }
    return fn;
}
export function opLast(fn) {
    const asyncFn = opLastAsync(fn);
    const syncFn = opLastSync(fn);
    function _(i) {
        return isAsyncIterable(i) ? asyncFn(i) : syncFn(i);
    }
    return _;
}
//# sourceMappingURL=last.js.map