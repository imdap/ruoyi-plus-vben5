import { toPipeFn } from '../helpers/util.js';
export function opTakeAsync(count) {
    async function* fn(iter) {
        if (count <= 0)
            return;
        for await (const v of iter) {
            yield v;
            if (--count <= 0)
                return;
        }
    }
    return fn;
}
export function opTakeSync(count) {
    function* fn(iter) {
        if (count <= 0)
            return;
        for (const v of iter) {
            yield v;
            if (--count <= 0)
                return;
        }
    }
    return fn;
}
/**
 * Consume only the first `count` number from the iterable.
 * @param count - number to take
 */
export const opTake = (count) => toPipeFn(opTakeSync(count), opTakeAsync(count));
//# sourceMappingURL=take.js.map