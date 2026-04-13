import { isAsyncIterable } from './helpers/index.js';
import { toArrayAsync } from './helpers/toArray.js';
import { opReduceAsync, opReduceSync } from './operators/index.js';
import { pipeAsync, pipeSync } from './pipe.js';
export function reduceSync(iter, reduceFn, initialValue) {
    const i = initialValue === undefined
        ? pipeSync(iter, opReduceSync(reduceFn))
        : pipeSync(iter, opReduceSync(reduceFn, initialValue));
    return [...i][0];
}
export async function reduceAsync(iter, reduceFn, initialValue) {
    const i = initialValue === undefined
        ? pipeAsync(iter, opReduceAsync(reduceFn))
        : pipeAsync(iter, opReduceAsync(reduceFn, initialValue));
    const arr = await toArrayAsync(i);
    return arr[0];
}
export function reduce(iter, reduceFn, initialValue) {
    return isAsyncIterable(iter) ? reduceAsync(iter, reduceFn, initialValue) : reduceSync(iter, reduceFn, initialValue);
}
//# sourceMappingURL=reduce.js.map