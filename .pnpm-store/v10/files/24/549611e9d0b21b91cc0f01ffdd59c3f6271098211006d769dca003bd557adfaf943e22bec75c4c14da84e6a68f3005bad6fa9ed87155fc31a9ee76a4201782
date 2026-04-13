/**
 * Allows an iterable to be shared by multiple consumers.
 * Each consumer takes from the iterable.
 * @param iterable - the iterable to share
 */
export function toDistributableIterableSync(iterable) {
    let lastValue;
    let iter;
    function getNext() {
        if (lastValue && lastValue.done) {
            return { ...lastValue };
        }
        iter = iter || iterable[Symbol.iterator]();
        lastValue = iter.next();
        return lastValue;
    }
    function* iterableFn() {
        let next;
        while (!(next = getNext()).done) {
            yield next.value;
        }
    }
    return {
        [Symbol.iterator]: iterableFn,
    };
}
/**
 * Allows an iterable to be shared by multiple consumers.
 * Each consumer takes from the iterable.
 * @param iterable - the iterable to share
 */
export const toDistributableIterable = toDistributableIterableSync;
//# sourceMappingURL=distribute.js.map