import { CalcLeftRightResultWeakCache } from './mergeCache.js';
const cacheMergeListUnique = new CalcLeftRightResultWeakCache();
const cacheMergeLists = new CalcLeftRightResultWeakCache();
export function mergeListUnique(left, right) {
    if (!Array.isArray(left))
        return Array.isArray(right) ? right : undefined;
    if (!Array.isArray(right))
        return left;
    if (!right.length)
        return left;
    if (!left.length)
        return right;
    const result = cacheMergeListUnique.get(left, right, (left, right) => [...new Set([...left, ...right])]);
    Object.freeze(left);
    Object.freeze(right);
    Object.freeze(result);
    return result;
}
export function mergeList(left, right) {
    if (!Array.isArray(left))
        return Array.isArray(right) ? right : undefined;
    if (!Array.isArray(right))
        return left;
    if (!left.length)
        return right;
    if (!right.length)
        return left;
    const result = cacheMergeLists.get(left, right, (left, right) => [...left, ...right]);
    Object.freeze(left);
    Object.freeze(right);
    Object.freeze(result);
    return result;
}
export function stats() {
    return {
        cacheMergeListUnique: cacheMergeListUnique.stats(),
        cacheMergeLists: cacheMergeLists.stats(),
    };
}
//# sourceMappingURL=mergeList.js.map