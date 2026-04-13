import { toAsyncIterable } from './helpers/index.js';
import { opCombineAsync, opCombineSync } from './operators/index.js';
export function pipeAsync(i, ...fns) {
    const iter = toAsyncIterable(i);
    return opCombineAsync(...fns)(iter);
}
export function pipeSync(i, ...fns) {
    return opCombineSync(...fns)(i);
}
//# sourceMappingURL=pipe.js.map