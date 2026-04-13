import { readFile } from 'node:fs/promises';
import { extname } from 'node:path/posix';
import { suite } from 'perf-insight';
import { extractPossibleWordsFromTextOffset, extractWordsFromCode, extractWordsFromText, matchStringToTextOffset, splitCamelCaseWordWithOffset, textOffset, } from './text.js';
import { regExWordsAndDigits } from './textRegex.js';
const regExpWord = /\b[\w\p{L}\p{M}]+\b/gu;
suite('wordSplitter', async (test) => {
    const lines = await sampleLines();
    const iterations = 1;
    test('baseline: matchAll /[\\w\\p{L}\\p{M}]+/gu', () => {
        const s = [];
        const _regExpWord = regExpWord;
        for (let i = iterations; i > 0; --i) {
            for (const line of lines) {
                for (const m of line.matchAll(_regExpWord)) {
                    s.push({ text: m[0], offset: m.index });
                }
            }
        }
        return s;
    });
    test('baseline: matchAll non-space /\\S+/g', () => {
        const s = [];
        const regExp = /\S+/g;
        for (let i = iterations; i > 0; --i) {
            for (const line of lines) {
                s.push(...[...line.matchAll(regExp)].map((a) => ({ text: a[0], offset: a.index })));
            }
        }
        return s;
    });
    test('baseline: matchAll non-special', () => {
        const s = [];
        const regExp = /[^\s();:{}[\]*&^%$#@!~"?/\\,<>+=]+/g;
        for (let i = iterations; i > 0; --i) {
            for (const line of lines) {
                s.push(...[...line.matchAll(regExp)].map((a) => ({ text: a[0], offset: a.index })));
            }
        }
        return s;
    });
    test('baseline: matchAll regExWordsAndDigits', () => {
        const s = [];
        const regExp = regExWordsAndDigits;
        for (let i = iterations; i > 0; --i) {
            for (const line of lines) {
                s.push(...[...line.matchAll(regExp)].map((a) => ({ text: a[0], offset: a.index })));
            }
        }
        return s;
    });
    test('baseline: matchAll regExWordsAndDigits matchStringToTextOffset', () => {
        const s = [];
        const regExp = regExWordsAndDigits;
        for (let i = iterations; i > 0; --i) {
            for (const line of lines) {
                s.push(...matchStringToTextOffset(regExp, line));
            }
        }
        return s;
    });
    test('matchAll into possible words', () => {
        const s = [];
        const regExpMaybeWord = /[^\s();:{}[\]*&^%$#@!~"?/\\,<>+=]+/g;
        const _regExpWord = regExpWord;
        for (let i = iterations; i > 0; --i) {
            for (const line of lines) {
                for (const m of line.matchAll(regExpMaybeWord)) {
                    const index = m.index;
                    for (const words of m[0].matchAll(_regExpWord)) {
                        s.push({ text: words[0], offset: index + words.index });
                    }
                }
            }
        }
        return s;
    });
    test('extractWordsFromText', () => {
        const s = [];
        for (let i = iterations; i > 0; --i) {
            for (const line of lines) {
                s.push(...extractWordsFromText(line));
            }
        }
        return s;
    });
    test('extractPossibleWordsFromTextOffset', () => {
        const s = [];
        for (let i = iterations; i > 0; --i) {
            for (const line of lines) {
                s.push(...extractPossibleWordsFromTextOffset(textOffset(line)));
            }
        }
        return s;
    });
    test('extractPossibleWordsFromTextOffset splitCamelCaseWordWithOffset', () => {
        const s = [];
        for (let i = iterations; i > 0; --i) {
            for (const line of lines) {
                for (const wo of extractPossibleWordsFromTextOffset(textOffset(line))) {
                    for (const cWord of splitCamelCaseWordWithOffset(wo)) {
                        s.push(cWord);
                    }
                }
            }
        }
        return s;
    });
    test('extractWordsFromCode', () => {
        const s = [];
        for (let i = iterations; i > 0; --i) {
            for (const line of lines) {
                s.push(...extractWordsFromCode(line));
            }
        }
        return s;
    });
});
async function sampleLines() {
    const ext = extname(new URL(import.meta.url).pathname);
    const url = new URL('wordSplitter.test' + ext, import.meta.url);
    const context = await readFile(url, 'utf8');
    return context.replaceAll('\r\n', '\n').replaceAll('\r', '\n').split('\n');
}
//# sourceMappingURL=wordSplitter.perf.js.map