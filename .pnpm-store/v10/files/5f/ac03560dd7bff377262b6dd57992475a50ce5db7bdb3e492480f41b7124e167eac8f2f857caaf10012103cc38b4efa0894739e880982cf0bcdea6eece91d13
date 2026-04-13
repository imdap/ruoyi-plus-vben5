import { appendToDef, assert, createTyposDef } from './util.js';
function assertString(v) {
    assert(typeof v === 'string', 'A string was expected.');
    return true;
}
const suggestionsSeparator = /[,]/;
// const typoSuggestionsSeparator = /:|->/;
const typoEntrySeparator = /[\n;]/;
const inlineComment = /#.*/gm;
const sugFormatRegex = /^\s*(?:[!~:])*(?<word>.*?)(?<separator>(->|:([0-9a-f]{1,2}:)?))(?<sugs>.*)$/;
export function isSuggestion(v) {
    return sugFormatRegex.test(v);
}
export function createTyposDefFromEntries(entries) {
    const def = Object.create(null);
    for (const entry of entries) {
        appendToDef(def, entry);
    }
    return def;
}
function normalize(s) {
    return s.normalize();
}
function trimAndFilter(lines) {
    return lines
        .map((s) => s.trim())
        .filter((s) => !!s)
        .map(normalize);
}
function cleanSugs(rawSugs) {
    const sugs = trimAndFilter(rawSugs);
    return sugs.length === 1 ? sugs[0] : sugs.length ? sugs : false;
}
function splitSuggestionsValue(value) {
    return cleanSugs(value.split(suggestionsSeparator));
}
export function sanitizeIntoTypoDef(dirtyDef) {
    if (!dirtyDef || typeof dirtyDef !== 'object')
        return undefined;
    const def = createTyposDef();
    for (const [rawKey, value] of Object.entries(dirtyDef)) {
        const key = normalize(rawKey.trim());
        if (!key)
            continue;
        if (typeof value === 'string') {
            def[key] = splitSuggestionsValue(value);
            continue;
        }
        if (Array.isArray(value)) {
            const sugs = cleanSugs(value.filter(assertString));
            def[key] = sugs;
            continue;
        }
        assert(value === false, 'Unexpected suggestion type.');
        def[key] = false;
    }
    return def;
}
/**
 * Parse Typos Entries
 *
 * Format:
 * - `word:suggestion`
 * - `word->suggestion`
 * - `word: first, second, third suggestions`
 *
 * Note:
 * ```plaintext
 * yellow:blue, green
 * ```
 * Is the same as multiple entries with the same key and different suggestions.
 * ```plaintext
 * yellow:blue
 * yellow:green
 * ```
 *
 * Used to process entries found in a `cspell.json` file.
 * @param entries - entries to process
 * @returns a TyposDef
 */
export function processEntriesToTyposDef(entries) {
    const def = isIterable(entries) ? reduceToTyposDef(entries) : entries;
    const result = sanitizeIntoTypoDef(def);
    assert(result);
    return result;
}
function reduceToTyposDef(entries) {
    const def = createTyposDef();
    for (const entry of entries) {
        appendToDef(def, parseTyposLine(entry));
    }
    return def;
}
/**
 * Tries to parse an entry.
 * @param line - any valid TypoEntry.
 * @returns a valid TypoEntry
 */
export function parseTyposLine(line) {
    if (!line)
        return undefined;
    if (typeof line === 'string') {
        const def = createTyposDef();
        for (const subEntry of splitIntoLines(line)) {
            const [left, right] = splitEntry(subEntry);
            const typo = left.trim();
            if (!right)
                return typo;
            const sugs = splitSuggestionsValue(right);
            def[typo] = sugs;
        }
        return def;
    }
    if (Array.isArray(line)) {
        const [key, ...sugs] = line.filter(assertString).map((s) => s.trim());
        if (!key)
            return undefined;
        return [key, ...sugs];
    }
    return sanitizeIntoTypoDef(line);
}
/**
 * Split text into multiple lines
 * @param content - text content
 * @returns
 */
function splitIntoLines(content) {
    return trimAndFilter(normalize(content).split(typoEntrySeparator));
}
/**
 * Split a typo entry into key and value
 * Entry format:
 * - `word:suggestion`
 * - `word->suggestion`
 * - `word: first, second, third suggestions`
 * - sequencing values are ignored, e.g.: `:0:`, `:1:`, `:a:`
 *   - `word:0:first`
 *   - `word:1:second`
 * @param line - the line of text
 * @returns
 */
function splitEntry(line) {
    // Remove any sequencing values like `:1:` or `:a:`
    const m = line.match(sugFormatRegex);
    if (!m?.groups) {
        return [line.trim(), undefined];
    }
    return [m.groups.word.trim(), m.groups.sugs.trim()];
}
export function parseTyposFile(content) {
    const lines = splitIntoLines(content.replaceAll(inlineComment, ''));
    return reduceToTyposDef(lines);
}
function isIterable(v) {
    return Symbol.iterator in v;
}
//# sourceMappingURL=typosParser.js.map