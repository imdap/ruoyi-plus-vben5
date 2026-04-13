import { opConcatMap, opMap, pipe } from '@cspell/cspell-pipe/sync';
import { binarySearch } from './search.js';
import { regExAccents, regExAllLower, regExAllUpper, regExFirstUpper, regExIgnoreCharacters, regExpCamelCaseWordBreaksWithEnglishSuffix, regExWords, regExWordsAndDigits, } from './textRegex.js';
import { toUri } from './Uri.js';
import { scanMap } from './util.js';
export { stringToRegExp } from './textRegex.js';
// CSpell:ignore ings ning gimuy tsmerge
export function splitCamelCaseWordWithOffset(wo) {
    return splitCamelCaseWord(wo.text).map(scanMap((last, text) => ({ text, offset: last.offset + last.text.length }), {
        text: '',
        offset: wo.offset,
    }));
}
/**
 * Split camelCase words into an array of strings.
 */
export function splitCamelCaseWord(word) {
    return splitWord(word, regExpCamelCaseWordBreaksWithEnglishSuffix);
}
export function splitWordWithOffset(wo, regExpWordBreaks) {
    return splitWord(wo.text, regExpWordBreaks).map(scanMap((last, text) => ({ text, offset: last.offset + last.text.length }), {
        text: '',
        offset: wo.offset,
    }));
}
/**
 * Split camelCase words into an array of strings.
 */
export function splitWord(word, regExpWordBreaks) {
    return word.split(new RegExp(regExpWordBreaks));
}
/**
 * This function lets you iterate over regular expression matches.
 */
export function match(reg, text) {
    if (!text)
        return [];
    reg = reg.global ? new RegExp(reg) : new RegExp(reg.source, reg.flags + 'g');
    return text.matchAll(reg);
}
export function matchStringToTextOffset(reg, text) {
    return matchToTextOffset(reg, { text, offset: 0 });
}
export function matchToTextOffset(reg, t) {
    const text = t.text;
    const offset = t.offset;
    // return opMap((m: RegExpExecArray) => ({ text: m[0], offset: offset + m.index }))(match(reg, text));
    return pipe(match(reg, text), opMap((m) => ({ text: m[0], offset: offset + m.index })));
}
export function* extractLinesOfText(text) {
    let i = 0;
    for (let j = text.indexOf('\n', i); j >= 0; j = text.indexOf('\n', i)) {
        const end = j + 1;
        yield { text: text.slice(i, end), offset: i };
        i = end;
    }
    yield { text: text.slice(i, text.length), offset: i };
}
/**
 * Extract out whole words from a string of text.
 */
export function extractWordsFromText(text) {
    return extractWordsFromTextOffset(textOffset(text));
}
/**
 * Extract out whole words from a string of text.
 */
export function extractWordsFromTextOffset(text) {
    const reg = new RegExp(regExWords);
    return matchToTextOffset(reg, cleanTextOffset(text));
}
/**
 * Remove Hiragana, Han, Katakana, Hangul characters from the text.
 * @param text
 * @returns the text with the characters removed.
 */
export function cleanText(text) {
    regExIgnoreCharacters.lastIndex = 0;
    if (!regExIgnoreCharacters.test(text))
        return text;
    regExIgnoreCharacters.lastIndex = 0;
    text = text.replace(regExIgnoreCharacters, (match) => ' '.repeat(match.length));
    return text;
}
export function cleanTextOffset(text) {
    // Do not make a new object if the text is already clean.
    regExIgnoreCharacters.lastIndex = 0;
    if (!regExIgnoreCharacters.test(text.text))
        return text;
    return {
        text: cleanText(text.text),
        offset: text.offset,
    };
}
/**
 * Extract out whole words and words containing numbers from a string of text.
 */
export function extractPossibleWordsFromTextOffset(text) {
    const reg = new RegExp(regExWordsAndDigits);
    return matchToTextOffset(reg, text);
}
export function extractWordsFromCode(text) {
    return extractWordsFromCodeTextOffset(textOffset(text));
}
export function extractWordsFromCodeTextOffset(textOffset) {
    return pipe(extractWordsFromTextOffset(textOffset), opConcatMap(splitCamelCaseWordWithOffset));
}
export function isUpperCase(word) {
    return regExAllUpper.test(word);
}
export function isLowerCase(word) {
    return regExAllLower.test(word);
}
export function isFirstCharacterUpper(word) {
    return isUpperCase(word.slice(0, 1));
}
export function isFirstCharacterLower(word) {
    return isLowerCase(word.slice(0, 1));
}
export function ucFirst(word) {
    return word.slice(0, 1).toUpperCase() + word.slice(1);
}
export function lcFirst(word) {
    return word.slice(0, 1).toLowerCase() + word.slice(1);
}
export function snakeToCamel(word) {
    return word.split('_').map(ucFirst).join('');
}
export function camelToSnake(word) {
    return splitCamelCaseWord(word).join('_').toLowerCase();
}
export function matchCase(example, word) {
    if (regExFirstUpper.test(example)) {
        return word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase();
    }
    if (regExAllLower.test(example)) {
        return word.toLowerCase();
    }
    if (regExAllUpper.test(example)) {
        return word.toUpperCase();
    }
    if (isFirstCharacterUpper(example)) {
        return ucFirst(word);
    }
    if (isFirstCharacterLower(example)) {
        return lcFirst(word);
    }
    return word;
}
export function textOffset(text, offset = 0) {
    return { text, offset };
}
export function extractText(textOffset, startPos, endPos) {
    const { text, offset: orig } = textOffset;
    const a = Math.max(startPos - orig, 0);
    const b = Math.max(endPos - orig, 0);
    return text.slice(a, b);
}
export function calculateTextDocumentOffsets(uri, doc, wordOffsets) {
    const lines = [
        -1,
        ...pipe(match(/\n/g, doc), opMap((a) => a.index)),
        doc.length,
    ];
    let lastRow = -1;
    let lastOffset = doc.length + 1;
    let lastLineRow = -1;
    let lastLine;
    function findRowCol(offset) {
        const row = binarySearch(lines, offset, offset >= lastOffset ? lastRow : undefined);
        const col = offset - lines[Math.max(0, row - 1)];
        lastOffset = offset;
        lastRow = row;
        return [row, col];
    }
    function extractLine(row) {
        const offset = lines[row - 1] + 1;
        const text = doc.slice(offset, lines[row] + 1);
        return { text, offset };
    }
    function calcLine(row) {
        const last = lastLineRow === row ? lastLine : undefined;
        lastLineRow = row;
        const r = last ?? extractLine(row);
        lastLine = r;
        return r;
    }
    const _uri = toUri(uri).toString();
    return wordOffsets.map((wo) => {
        const [row, col] = findRowCol(wo.offset);
        return { ...wo, row, col, doc, uri: _uri, line: calcLine(row) };
    });
}
export function removeAccents(text) {
    regExAccents.lastIndex = 0;
    return text.normalize('NFD').replace(regExAccents, '');
}
export const __testing__ = {
    regExWords: regExWords,
    regExWordsAndDigits: regExWordsAndDigits,
};
//# sourceMappingURL=text.js.map