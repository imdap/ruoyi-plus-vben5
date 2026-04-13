import type { TypoEntry, TyposDef } from './typos.js';
export declare function isSuggestion(v: string): boolean;
export declare function createTyposDefFromEntries(entries: Iterable<TypoEntry>): TyposDef;
export declare function sanitizeIntoTypoDef(dirtyDef: TyposDef | Record<string, unknown> | unknown): TyposDef | undefined;
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
export declare function processEntriesToTyposDef(entries: Iterable<TypoEntry> | TyposDef | Record<string, unknown>): TyposDef;
/**
 * Tries to parse an entry.
 * @param line - any valid TypoEntry.
 * @returns a valid TypoEntry
 */
export declare function parseTyposLine(line: TypoEntry): TypoEntry | undefined;
export declare function parseTyposFile(content: string): TyposDef;
//# sourceMappingURL=typosParser.d.ts.map