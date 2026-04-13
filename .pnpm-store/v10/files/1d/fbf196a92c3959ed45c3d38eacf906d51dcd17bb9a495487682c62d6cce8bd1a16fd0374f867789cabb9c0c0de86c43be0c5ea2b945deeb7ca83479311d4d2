import { toPipeFn } from '../helpers/util.js';
/**
 * Tap allows you to listen on values, without modifying them.
 *
 * @param fn - function to call for each value.
 */
export function opTapAsync(tapFn) {
    async function* fn(iter) {
        for await (const v of iter) {
            tapFn(v);
            yield v;
        }
    }
    return fn;
}
/**
 * Tap allows you to listen on values, without modifying them.
 *
 * @param fn - function to call for each value.
 */
export function opTapSync(tapFn) {
    function* fn(iter) {
        for (const v of iter) {
            tapFn(v);
            yield v;
        }
    }
    return fn;
}
/**
 * Tap allows you to listen on values, without modifying them.
 *
 * @param fn - function to call for each value.
 */
export const opTap = (fn) => toPipeFn(opTapSync(fn), opTapAsync(fn));
//# sourceMappingURL=tap.js.map