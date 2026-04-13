import { asyncIteratorToAsyncIterable, iteratorToIterable } from '../helpers/index.js';
export function opReduceAsync(reduceFn, initialValue) {
    async function* reduce(head, tail) {
        for await (const v of tail) {
            head = reduceFn(head, v);
        }
        yield head;
    }
    async function* fn(iter) {
        const ht = initialValue === undefined ? await headTailAsync(iter) : { head: await initialValue, tail: iter };
        if (!ht)
            return;
        yield* reduce(ht.head, ht.tail);
    }
    return fn;
}
export function opReduceSync(reduceFn, initialValue) {
    function* reduce(head, tail) {
        for (const v of tail) {
            head = reduceFn(head, v);
        }
        yield head;
    }
    function* fn(iter) {
        const ht = initialValue === undefined ? headTail(iter) : { head: initialValue, tail: iter };
        if (!ht)
            return;
        yield* reduce(ht.head, ht.tail);
    }
    return fn;
}
function headTail(iter) {
    const iterator = iter[Symbol.iterator]();
    const first = iterator.next();
    if (first.done)
        return undefined;
    return { head: first.value, tail: iteratorToIterable(iterator) };
}
async function headTailAsync(iter) {
    const iterator = isIterable(iter) ? iter[Symbol.iterator]() : iter[Symbol.asyncIterator]();
    const first = await iterator.next();
    if (first.done)
        return undefined;
    return { head: first.value, tail: asyncIteratorToAsyncIterable(iterator) };
}
function isIterable(i) {
    return typeof i[Symbol.iterator] === 'function';
}
//# sourceMappingURL=reduce.js.map