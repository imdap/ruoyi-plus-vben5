import { toArray } from '../helpers/toArray.js';
import { toPipeFn } from '../helpers/util.js';
export function opJoinStringsAsync(joinCharacter = ',') {
    async function* fn(iter) {
        for await (const v of iter) {
            const a = await toArray(v);
            yield a.join(joinCharacter);
        }
    }
    return fn;
}
export function opJoinStringsSync(joinCharacter = ',') {
    function* fn(iter) {
        for (const v of iter) {
            const a = toArray(v);
            yield a.join(joinCharacter);
        }
    }
    return fn;
}
export const opJoinStrings = (joinCharacter) => toPipeFn(opJoinStringsSync(joinCharacter), opJoinStringsAsync(joinCharacter));
//# sourceMappingURL=joinStrings.js.map