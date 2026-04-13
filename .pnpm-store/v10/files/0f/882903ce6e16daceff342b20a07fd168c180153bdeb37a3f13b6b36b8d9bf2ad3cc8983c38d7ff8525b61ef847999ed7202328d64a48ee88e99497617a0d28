import type { TypoEntry, TyposDef, TyposDefKey, TyposDefValue } from './typos.js';
export declare function mergeDefEntry(targetDef: TyposDef, key: string, value: TyposDefValue): TyposDef;
/**
 * Merge in place the entries `fromDef` into `targetDef`
 * @param targetDef - the target
 * @param fromDef - the source
 * @returns the target
 */
export declare function mergeDef(targetDef: TyposDef, fromDef: TyposDef): TyposDef;
/**
 * Append an entry to a TyposDef.
 * @param def - modified in place
 * @param entry- entry to add.
 * @returns def
 */
export declare function appendToDef(def: TyposDef, entry: TypoEntry | undefined): TyposDef;
export declare function createTyposDef(entries?: Iterable<[TyposDefKey, TyposDefValue]>): TyposDef;
/**
 * Extract all suggestions.
 * @param typosDef - the def
 * @returns the set of suggestions.
 */
export declare function extractAllSuggestions(typosDef: TyposDef): Set<string>;
/**
 * Extract all words that have been explicitly ignore because they contains the `ignorePrefix`.
 * @param typosDef - the def
 * @param ignorePrefix - prefix
 * @returns set of ignored words with the prefix removed.
 */
export declare function extractIgnoreValues(typosDef: TyposDef, ignorePrefix: string): Set<string>;
export declare function assert(condition: unknown, message?: string): asserts condition;
//# sourceMappingURL=util.d.ts.map