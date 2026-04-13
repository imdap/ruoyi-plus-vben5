import { stringToRegExp } from '../util/textRegex.js';
import { isDefined } from '../util/util.js';
import { CalcLeftRightResultWeakCache } from './mergeCache.js';
const emptyRegExpList = [];
const emptyPatternDefinitions = [];
const cache = new CalcLeftRightResultWeakCache();
export function resolvePatterns(regExpList = emptyRegExpList, patternDefinitions = emptyPatternDefinitions) {
    return cache.get(regExpList, patternDefinitions, _resolvePatterns);
}
function _resolvePatterns(regExpList, patternDefinitions) {
    const patternMap = new Map(patternDefinitions.map((def) => [def.name.toLowerCase(), def.pattern]));
    const resolved = new Set();
    function resolvePattern(p) {
        if (resolved.has(p))
            return undefined;
        resolved.add(p);
        return patternMap.get(p.toString().toLowerCase()) || p;
    }
    function* flatten(patterns) {
        for (const pattern of patterns) {
            if (Array.isArray(pattern)) {
                yield* flatten(pattern.map(resolvePattern).filter(isDefined));
            }
            else {
                yield pattern;
            }
        }
    }
    const patternList = regExpList.map(resolvePattern).filter(isDefined);
    const result = [...flatten(patternList)].map(toRegExp).filter(isDefined);
    Object.freeze(regExpList);
    Object.freeze(patternDefinitions);
    Object.freeze(result);
    return result;
}
function toRegExp(pattern) {
    return pattern instanceof RegExp ? new RegExp(pattern) : stringToRegExp(pattern, 'gim', 'g');
}
//# sourceMappingURL=patterns.js.map