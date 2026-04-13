/**
 * Merge multiple iterables into an AsyncIterable
 * @param iter - initial iterable.
 * @param rest - iterables to merge.
 */
export async function* mergeAsyncIterables(iter, ...rest) {
    for await (const i of [iter, ...rest]) {
        yield* i;
    }
}
/**
 * Convert one or more iterables to an AsyncIterable
 */
export const toAsyncIterable = mergeAsyncIterables;
//# sourceMappingURL=toAsyncIterable.js.map