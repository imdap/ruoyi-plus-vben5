import { isAsyncIterable } from '../helpers/index.js';
/**
 * Append values onto the end of an iterable.
 * @param iterablesToAppend - the iterables in the order to be appended.
 * @returns
 */
export function opAppendAsync(...iterablesToAppend) {
    async function* fnAppend(iter) {
        yield* iter;
        for (const i of iterablesToAppend) {
            yield* i;
        }
    }
    return fnAppend;
}
/**
 * Append values onto the end of an iterable.
 * @param iterablesToAppend - the iterables in the order to be appended.
 * @returns
 */
export function opAppendSync(...iterablesToAppend) {
    function* fnAppend(iter) {
        yield* iter;
        for (const i of iterablesToAppend) {
            yield* i;
        }
    }
    return fnAppend;
}
export function opAppend(...iterablesToAppend) {
    function _(i) {
        return isAsyncIterable(i) ? opAppendAsync(...iterablesToAppend)(i) : opAppendSync(...iterablesToAppend)(i);
    }
    return _;
}
//# sourceMappingURL=append.js.map