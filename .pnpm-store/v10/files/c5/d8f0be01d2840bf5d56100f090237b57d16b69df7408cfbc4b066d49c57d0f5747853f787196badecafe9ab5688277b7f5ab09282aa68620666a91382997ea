import type { TextDocumentOffset, TextOffset } from '@cspell/cspell-types';
import type { Uri } from './IUri.js';
export { stringToRegExp } from './textRegex.js';
export declare function splitCamelCaseWordWithOffset(wo: TextOffset): TextOffset[];
/**
 * Split camelCase words into an array of strings.
 */
export declare function splitCamelCaseWord(word: string): string[];
export declare function splitWordWithOffset(wo: TextOffset, regExpWordBreaks: RegExp): TextOffset[];
/**
 * Split camelCase words into an array of strings.
 */
export declare function splitWord(word: string, regExpWordBreaks: RegExp): string[];
/**
 * This function lets you iterate over regular expression matches.
 */
export declare function match(reg: RegExp, text: string): Iterable<RegExpExecArray>;
export declare function matchStringToTextOffset(reg: RegExp, text: string): Iterable<TextOffset>;
export declare function matchToTextOffset(reg: RegExp, t: TextOffset): Iterable<TextOffset>;
export declare function extractLinesOfText(text: string): Iterable<TextOffset>;
/**
 * Extract out whole words from a string of text.
 */
export declare function extractWordsFromText(text: string): Iterable<TextOffset>;
/**
 * Extract out whole words from a string of text.
 */
export declare function extractWordsFromTextOffset(text: TextOffset): Iterable<TextOffset>;
/**
 * Remove Hiragana, Han, Katakana, Hangul characters from the text.
 * @param text
 * @returns the text with the characters removed.
 */
export declare function cleanText(text: string): string;
export declare function cleanTextOffset(text: TextOffset): TextOffset;
/**
 * Extract out whole words and words containing numbers from a string of text.
 */
export declare function extractPossibleWordsFromTextOffset(text: TextOffset): Iterable<TextOffset>;
export declare function extractWordsFromCode(text: string): Iterable<TextOffset>;
export declare function extractWordsFromCodeTextOffset(textOffset: TextOffset): Iterable<TextOffset>;
export declare function isUpperCase(word: string): boolean;
export declare function isLowerCase(word: string): boolean;
export declare function isFirstCharacterUpper(word: string): boolean;
export declare function isFirstCharacterLower(word: string): boolean;
export declare function ucFirst(word: string): string;
export declare function lcFirst(word: string): string;
export declare function snakeToCamel(word: string): string;
export declare function camelToSnake(word: string): string;
export declare function matchCase(example: string, word: string): string;
export declare function textOffset(text: string, offset?: number): TextOffset;
export declare function extractText(textOffset: TextOffset, startPos: number, endPos: number): string;
export declare function calculateTextDocumentOffsets<T extends TextOffset>(uri: string | Uri | URL, doc: string, wordOffsets: T[]): (TextDocumentOffset & T)[];
export declare function removeAccents(text: string): string;
export declare const __testing__: {
    regExWords: RegExp;
    regExWordsAndDigits: RegExp;
};
//# sourceMappingURL=text.d.ts.map