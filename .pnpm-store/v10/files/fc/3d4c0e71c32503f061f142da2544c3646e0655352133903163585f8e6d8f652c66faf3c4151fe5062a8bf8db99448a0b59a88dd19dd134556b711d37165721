/**
 * JSON.stringify replacer which converts Set to Array to allow serialization
 */
export function setToJSONReplacer(_, value) {
    if (typeof value === 'object' && value instanceof Set) {
        return [...value];
    }
    return value;
}
//# sourceMappingURL=setToJSONReplacer.js.map