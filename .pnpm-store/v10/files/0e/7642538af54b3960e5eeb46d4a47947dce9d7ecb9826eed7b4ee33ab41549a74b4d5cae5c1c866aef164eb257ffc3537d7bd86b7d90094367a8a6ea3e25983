export function* iteratorToIterable(iterator) {
    try {
        let n;
        while (!(n = iterator.next()).done) {
            yield n.value;
        }
    }
    catch (e) {
        if (iterator.throw) {
            return iterator.throw(e);
        }
        throw e;
    }
    finally {
        // ensure that clean up happens.
        iterator.return?.();
    }
}
export async function* asyncIteratorToAsyncIterable(iterator) {
    try {
        let n;
        while (!(n = await iterator.next()).done) {
            yield n.value;
        }
    }
    catch (e) {
        if (iterator.throw) {
            return iterator.throw(e);
        }
        throw e;
    }
    finally {
        // ensure that clean up happens.
        iterator.return?.();
    }
}
//# sourceMappingURL=iteratorToIterable.js.map