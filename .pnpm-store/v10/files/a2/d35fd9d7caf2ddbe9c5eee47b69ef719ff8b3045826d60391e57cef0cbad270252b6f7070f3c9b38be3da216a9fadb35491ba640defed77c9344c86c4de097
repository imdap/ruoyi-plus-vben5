export function isPatternInclude(p) {
    return !!p.include;
}
const TypeofMatch = {
    object: true,
    string: true,
};
const TypeofBegin = TypeofMatch;
const TypeofEnd = { ...TypeofBegin, undefined: true };
export function isPatternMatch(pattern) {
    const p = pattern;
    return !!p.match && (typeof p.match) in TypeofMatch;
}
export function isPatternBeginEnd(pattern) {
    const p = pattern;
    return p.begin !== undefined && (typeof p.begin) in TypeofBegin && (typeof p.end) in TypeofEnd;
}
export function isPatternPatterns(p) {
    return Array.isArray(p.patterns);
}
export function isGrammar(g) {
    return g.scopeName !== undefined;
}
//# sourceMappingURL=grammarTypesHelpers.js.map