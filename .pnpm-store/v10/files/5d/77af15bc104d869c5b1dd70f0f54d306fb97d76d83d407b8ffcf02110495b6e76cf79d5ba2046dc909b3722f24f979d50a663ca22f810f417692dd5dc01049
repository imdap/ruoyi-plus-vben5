import { opConcatMap, opFilter, pipe } from '@cspell/cspell-pipe/sync';
function normalizeTyposDefValue(value) {
    if (!value)
        return false;
    if (typeof value === 'string')
        return value;
    const unique = [...new Set(value)];
    return unique.length > 1 ? unique : unique.length === 1 ? unique[0] : false;
}
export function mergeDefEntry(targetDef, key, value) {
    const curValue = targetDef[key];
    if (!curValue) {
        targetDef[key] = normalizeTyposDefValue(value);
        return targetDef;
    }
    if (!value)
        return targetDef;
    const newValue = Array.isArray(curValue) ? curValue : [curValue];
    if (Array.isArray(value)) {
        newValue.push(...value);
    }
    else {
        newValue.push(value);
    }
    targetDef[key] = normalizeTyposDefValue(newValue);
    return targetDef;
}
/**
 * Merge in place the entries `fromDef` into `targetDef`
 * @param targetDef - the target
 * @param fromDef - the source
 * @returns the target
 */
export function mergeDef(targetDef, fromDef) {
    for (const key of Object.keys(fromDef)) {
        mergeDefEntry(targetDef, key, fromDef[key]);
    }
    return targetDef;
}
/**
 * Append an entry to a TyposDef.
 * @param def - modified in place
 * @param entry- entry to add.
 * @returns def
 */
export function appendToDef(def, entry) {
    if (!entry)
        return def;
    if (typeof entry === 'string') {
        if (!def[entry]) {
            def[entry] = false;
        }
        return def;
    }
    if (Array.isArray(entry)) {
        const [key, ...sugs] = entry.map((s) => s.trim());
        if (!key)
            return def;
        const s = sugs.map((s) => s.trim()).filter((s) => !!s);
        return mergeDefEntry(def, key, s);
    }
    return mergeDef(def, entry);
}
export function createTyposDef(entries) {
    const def = Object.create(null);
    if (!entries)
        return def;
    for (const [key, value] of entries) {
        def[key] = isDefined(value) ? value : false;
    }
    return def;
}
/**
 * Extract all suggestions.
 * @param typosDef - the def
 * @returns the set of suggestions.
 */
export function extractAllSuggestions(typosDef) {
    const allSugs = pipe(Object.values(typosDef), opFilter(hasSuggestions), opConcatMap((v) => (Array.isArray(v) ? v : [v])));
    return new Set(allSugs);
}
/**
 * Extract all words that have been explicitly ignore because they contains the `ignorePrefix`.
 * @param typosDef - the def
 * @param ignorePrefix - prefix
 * @returns set of ignored words with the prefix removed.
 */
export function extractIgnoreValues(typosDef, ignorePrefix) {
    const pfxLen = ignorePrefix.length;
    return new Set(Object.keys(typosDef)
        .filter((k) => k.startsWith(ignorePrefix))
        .map((k) => k.slice(pfxLen)));
}
function isDefined(v) {
    return v !== undefined && v !== null;
}
function isString(v) {
    return typeof v === 'string';
}
function isArray(v) {
    return Array.isArray(v);
}
function hasSuggestions(v) {
    return isString(v) || isArray(v);
}
export function assert(condition, message = 'Assert Failed') {
    if (condition)
        return;
    throw new Error(message);
}
//# sourceMappingURL=util.js.map