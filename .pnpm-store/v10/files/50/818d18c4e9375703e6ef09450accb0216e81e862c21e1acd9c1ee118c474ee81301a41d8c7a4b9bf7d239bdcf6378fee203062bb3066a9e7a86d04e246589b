import { toPipeFn } from '../helpers/util.js';
export function opSkipAsync(count) {
    async function* fn(iter) {
        for await (const v of iter) {
            if (count > 0) {
                --count;
                continue;
            }
            yield v;
        }
    }
    return fn;
}
export function opSkipSync(count) {
    function* fn(iter) {
        for (const v of iter) {
            if (count > 0) {
                --count;
                continue;
            }
            yield v;
        }
    }
    return fn;
}
export const opSkip = (count) => toPipeFn(opSkipSync(count), opSkipAsync(count));
//# sourceMappingURL=skip.js.map