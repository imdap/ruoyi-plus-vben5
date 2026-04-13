import { isAsyncIterable } from './util.js';
export function toArray(i) {
    return isAsyncIterable(i) ? toArrayAsync(i) : toArraySync(i);
}
export function toArraySync(iter) {
    return [...iter];
}
export async function toArrayAsync(iter) {
    const collection = [];
    for await (const i of iter) {
        collection.push(i);
    }
    return collection;
}
//# sourceMappingURL=toArray.js.map