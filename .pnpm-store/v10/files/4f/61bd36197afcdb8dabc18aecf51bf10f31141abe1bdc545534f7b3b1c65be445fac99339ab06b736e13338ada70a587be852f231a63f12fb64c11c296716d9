import { toPipeFn } from '../helpers/util.js';
export function opMapAsync(mapFn) {
    async function* genMap(iter) {
        for await (const v of iter) {
            yield mapFn(v);
        }
    }
    return genMap;
}
export function _opMapSync(mapFn) {
    function* genMap(iter) {
        for (const v of iter) {
            yield mapFn(v);
        }
    }
    return genMap;
}
export function opMapSync(mapFn) {
    function opMapIterable(iterable) {
        function opMapIterator() {
            const iter = iterable[Symbol.iterator]();
            function nextOpMap() {
                const { done, value } = iter.next();
                if (done)
                    return { done, value: undefined };
                return { value: mapFn(value) };
            }
            return {
                next: nextOpMap,
            };
        }
        return {
            [Symbol.iterator]: opMapIterator,
        };
    }
    return opMapIterable;
}
export const opMap = (fn) => toPipeFn(opMapSync(fn), opMapAsync(fn));
//# sourceMappingURL=map.js.map