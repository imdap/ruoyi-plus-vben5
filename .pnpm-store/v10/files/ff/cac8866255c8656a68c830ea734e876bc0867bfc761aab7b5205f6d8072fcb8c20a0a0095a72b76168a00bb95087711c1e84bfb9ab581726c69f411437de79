import { toPipeFn } from '../helpers/util.js';
export function opConcatMapAsync(mapFn) {
    async function* fn(iter) {
        for await (const v of iter) {
            yield* mapFn(v);
        }
    }
    return fn;
}
export function opConcatMapSync(mapFn) {
    function fnConcatMapSync(iterable) {
        function opConcatMapIterator() {
            const iter = iterable[Symbol.iterator]();
            let resultsIter = undefined;
            function nextConcatMap() {
                while (true) {
                    if (resultsIter) {
                        const { done, value } = resultsIter.next();
                        if (!done) {
                            return { value };
                        }
                        resultsIter = undefined;
                    }
                    const { done, value } = iter.next();
                    if (done) {
                        return { done, value: undefined };
                    }
                    resultsIter = mapFn(value)[Symbol.iterator]();
                }
            }
            return {
                next: nextConcatMap,
            };
        }
        return {
            [Symbol.iterator]: opConcatMapIterator,
        };
    }
    return fnConcatMapSync;
}
export function _opConcatMapSync(mapFn) {
    function* fnConcatMapSync(iter) {
        for (const v of iter) {
            yield* mapFn(v);
        }
    }
    return fnConcatMapSync;
}
export const opConcatMap = (fn) => toPipeFn(opConcatMapSync(fn), opConcatMapAsync(fn));
//# sourceMappingURL=concatMap.js.map