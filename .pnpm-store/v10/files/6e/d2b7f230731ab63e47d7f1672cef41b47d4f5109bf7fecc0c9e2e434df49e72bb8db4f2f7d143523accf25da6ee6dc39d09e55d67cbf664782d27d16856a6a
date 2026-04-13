import { toIterableIterator } from './util/util.js';
import { ImplSequence } from './ImplSequence.js';
export { toIterableIterator } from './util/util.js';
export function genSequence(i) {
    return new ImplSequence(i);
}
// Collection of entry points into GenSequence
export const GenSequence = {
    genSequence,
    sequenceFromRegExpMatch,
    sequenceFromObject,
};
/**
 * alias of toIterableIterator
 */
export const toIterator = toIterableIterator;
export function* objectIterator(t) {
    const keys = new Set(Object.keys(t));
    for (const k in t) {
        // istanbul ignore else
        if (keys.has(k)) {
            yield [k, t[k]];
        }
    }
}
export function objectToSequence(t) {
    return sequenceFromObject(t);
}
export function sequenceFromObject(t) {
    return genSequence(() => objectIterator(t));
}
export function sequenceFromRegExpMatch(pattern, text) {
    function* doMatch() {
        const regex = new RegExp(pattern);
        let match;
        let lastIndex = undefined;
        while ((match = regex.exec(text))) {
            // Make sure it stops if the index does not move forward.
            if (match.index === lastIndex) {
                break;
            }
            lastIndex = match.index;
            yield match;
        }
    }
    return genSequence(() => doMatch());
}
export default genSequence;
//# sourceMappingURL=GenSequence.js.map