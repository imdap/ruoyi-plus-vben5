import { toPipeFn } from '../helpers/util.js';
export function opFlattenAsync() {
    async function* fn(iter) {
        for await (const v of iter) {
            yield* v;
        }
    }
    return fn;
}
export function opFlattenSync() {
    function* fn(iter) {
        for (const v of iter) {
            yield* v;
        }
    }
    return fn;
}
export const opFlatten = () => toPipeFn(opFlattenSync(), opFlattenAsync());
//# sourceMappingURL=flatten.js.map