import { isAsyncIterable } from '../helpers/util.js';
// prettier-ignore
export function opFirstAsync(firstFn) {
    async function* fn(iter) {
        for await (const v of iter) {
            const pass = await firstFn(v);
            if (pass) {
                yield v;
                break;
            }
        }
    }
    return fn;
}
export function opFirstSync(firstFn) {
    function* fn(iter) {
        for (const v of iter) {
            if (firstFn(v)) {
                yield v;
                break;
            }
        }
    }
    return fn;
}
export function opFirst(fn) {
    const asyncFn = opFirstAsync(fn);
    const syncFn = opFirstSync(fn);
    function _(i) {
        return isAsyncIterable(i) ? asyncFn(i) : syncFn(i);
    }
    return _;
}
//# sourceMappingURL=first.js.map