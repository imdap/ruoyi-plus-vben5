import { isAsyncIterable } from '../helpers/util.js';
/**
 * Buffer the input iterable into arrays of the given size.
 * @param size - The size of the buffer.
 * @returns A function that takes an async iterable and returns an async iterable of arrays of the given size.
 */
export function opBufferAsync(size) {
    async function* fnBuffer(iter) {
        let buffer = [];
        for await (const v of iter) {
            buffer.push(v);
            if (buffer.length >= size) {
                yield buffer;
                buffer = [];
            }
        }
        if (buffer.length > 0) {
            yield buffer;
        }
    }
    return fnBuffer;
}
/**
 * @param size - The size of the buffer.
 * @returns A function that takes an iterable and returns an iterable of arrays of the given size.
 */
export function opBufferSync(size) {
    function* fnBuffer(iter) {
        let buffer = [];
        for (const v of iter) {
            buffer.push(v);
            if (buffer.length >= size) {
                yield buffer;
                buffer = [];
            }
        }
        if (buffer.length > 0) {
            yield buffer;
        }
    }
    return fnBuffer;
}
export function opBuffer(size) {
    const asyncFn = opBufferAsync(size);
    const syncFn = opBufferSync(size);
    function _(i) {
        return isAsyncIterable(i) ? asyncFn(i) : syncFn(i);
    }
    return _;
}
//# sourceMappingURL=buffer.js.map