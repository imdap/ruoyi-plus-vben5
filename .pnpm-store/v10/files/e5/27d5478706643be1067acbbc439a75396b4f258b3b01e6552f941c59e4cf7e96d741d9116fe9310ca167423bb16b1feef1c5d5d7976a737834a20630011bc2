import { toPipeFn } from '../helpers/util.js';
export function opUniqueAsync(k) {
    function fnK(k) {
        async function* fn(iter) {
            const s = new Set();
            for await (const v of iter) {
                const kk = k(v);
                if (s.has(kk))
                    continue;
                s.add(kk);
                yield v;
            }
        }
        return fn;
    }
    async function* fn(iter) {
        const s = new Set();
        for await (const v of iter) {
            if (s.has(v))
                continue;
            s.add(v);
            yield v;
        }
    }
    return k ? fnK(k) : fn;
}
export function opUniqueSync(k) {
    function fnK(key) {
        function* fn(iter) {
            const s = new Set();
            for (const v of iter) {
                const kk = key(v);
                if (s.has(kk))
                    continue;
                s.add(kk);
                yield v;
            }
        }
        return fn;
    }
    function* fn(iter) {
        const s = new Set();
        for (const v of iter) {
            if (s.has(v))
                continue;
            s.add(v);
            yield v;
        }
    }
    return k ? fnK(k) : fn;
}
export const opUnique = (getKey) => toPipeFn(opUniqueSync(getKey), opUniqueAsync(getKey));
//# sourceMappingURL=unique.js.map