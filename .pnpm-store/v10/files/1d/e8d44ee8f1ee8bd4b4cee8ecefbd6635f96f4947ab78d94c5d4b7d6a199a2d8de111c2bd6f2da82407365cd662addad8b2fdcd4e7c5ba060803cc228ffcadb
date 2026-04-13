// eslint-disable-next-line @typescript-eslint/no-explicit-any
const emptyArray = [];
Object.freeze(emptyArray);
export function fork(iterable) {
    let active = 3;
    const bufA = { buf: [] };
    const bufB = { buf: [] };
    let iterator = undefined;
    function getIterator() {
        if (iterator) {
            return iterator;
        }
        return (iterator = iterable[Symbol.iterator]());
    }
    function* gen(mask, a, b) {
        const cur = a.buf;
        const other = b.buf;
        const iter = getIterator();
        try {
            // We have to loop through the current buffer first.
            // It is necessary to use a loop in case the buffer is updated between yields.
            for (let i = 0; i < cur.length; i++) {
                yield cur[i];
            }
            cur.length = 0;
            let n;
            while (!(n = iter.next()).done) {
                if (active & mask) {
                    other.push(n.value);
                }
                yield n.value;
            }
        }
        catch (e) {
            if (iter.throw) {
                return iter.throw(e);
            }
            throw e;
        }
        finally {
            active &= mask;
            cur.length = 0;
            a.buf = emptyArray;
            if (!active) {
                iterator?.return?.();
            }
        }
    }
    return [gen(~1, bufA, bufB), gen(~2, bufB, bufA)];
}
//# sourceMappingURL=fork.js.map