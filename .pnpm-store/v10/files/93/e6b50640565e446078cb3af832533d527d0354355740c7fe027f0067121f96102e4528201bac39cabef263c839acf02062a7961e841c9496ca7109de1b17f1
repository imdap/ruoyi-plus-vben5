import { PairingHeap } from './PairingHeap.js';
import { escapeRegEx } from './regexHelper.js';
import { regExDanglingQuote, regExEscapeCharacters, regExNumericLiteral, regExPossibleWordBreaks, regExSplitWords, regExSplitWords2, regExTrailingEndings, regExWordsAndDigits, } from './textRegex.js';
const ignoreBreak = Object.freeze([]);
export function split(line, offset, isValidWord, options = {}) {
    const relWordToSplit = findNextWordText({ text: line.text, offset: offset - line.offset });
    const lineOffset = line.offset;
    const requested = new Map();
    const regExpIgnoreSegment = /^[-.+\d_eE'`\\\s]+$/;
    if (!relWordToSplit.text) {
        const text = rebaseTextOffset(relWordToSplit);
        return {
            line,
            offset,
            text: text,
            words: [],
            endOffset: text.offset + text.text.length,
        };
    }
    const lineSegment = {
        line,
        relStart: relWordToSplit.offset,
        relEnd: relWordToSplit.offset + relWordToSplit.text.length,
    };
    const possibleBreaks = generateWordBreaks(lineSegment, options);
    if (!possibleBreaks.length) {
        const text = rebaseTextOffset(relWordToSplit);
        return {
            line,
            offset,
            text: text,
            words: [{ ...text, isFound: isValidWord(text) }],
            endOffset: text.offset + text.text.length,
        };
    }
    function rebaseTextOffset(relText) {
        return {
            ...relText,
            offset: relText.offset + lineOffset,
        };
    }
    function has(word) {
        if (regExpIgnoreSegment.test(word.text)) {
            return true;
        }
        const i = word.offset;
        const j = word.text.length;
        let v = i + (j << 20);
        if (i < 1 << 20 && j < 1 << 11) {
            const b = requested.get(v);
            if (b !== undefined)
                return b;
        }
        else {
            v = -1;
        }
        const r = isValidWord(rebaseTextOffset(word));
        if (v >= 0) {
            requested.set(v, r);
        }
        return r;
    }
    // Add a dummy break at the end to avoid needing to check for last break.
    possibleBreaks.push({
        offset: lineSegment.relEnd,
        breaks: [ignoreBreak],
    });
    const result = {
        line,
        offset,
        text: rebaseTextOffset(relWordToSplit),
        words: splitIntoWords(lineSegment, possibleBreaks, has).map(rebaseTextOffset),
        endOffset: lineOffset + lineSegment.relEnd,
    };
    return result;
}
function findNextWordText({ text, offset }) {
    const reg = new RegExp(regExWordsAndDigits);
    reg.lastIndex = offset;
    const m = reg.exec(text);
    if (!m) {
        return {
            text: '',
            offset: offset + text.length,
        };
    }
    // Skip numeric literals.
    if (regExNumericLiteral.test(m[0])) {
        return findNextWordText({ text, offset: offset + m[0].length });
    }
    return {
        text: m[0],
        offset: m.index,
    };
}
function generateWordBreaks(line, options) {
    const camelBreaks = genWordBreakCamel(line);
    const symbolBreaks = genSymbolBreaks(line);
    const optionalBreaks = genOptionalWordBreaks(line, options.optionalWordBreakCharacters);
    return mergeSortedBreaks(...camelBreaks, ...symbolBreaks, ...optionalBreaks);
}
function offsetRegEx(reg, offset) {
    const r = new RegExp(reg);
    r.lastIndex = offset;
    return r;
}
function genWordBreakCamel(line) {
    const breaksCamel1 = [];
    const text = line.line.text.slice(0, line.relEnd);
    // lower,Upper: camelCase -> camel|Case
    for (const m of text.matchAll(offsetRegEx(regExSplitWords, line.relStart))) {
        if (m.index === undefined)
            break;
        const i = m.index + m[1].length;
        breaksCamel1.push({
            offset: m.index,
            breaks: [[i, i], ignoreBreak],
        });
    }
    const breaksCamel2 = [];
    // cspell:ignore ERRORC
    // Upper,Upper,lower: ERRORCodes -> ERROR|Codes, ERRORC|odes
    for (const m of text.matchAll(offsetRegEx(regExSplitWords2, line.relStart))) {
        if (m.index === undefined)
            break;
        const i = m.index + m[1].length;
        const j = i + m[3].length;
        breaksCamel2.push({
            offset: m.index,
            breaks: [[i, i], [j, j], ignoreBreak],
        });
    }
    return [breaksCamel1, breaksCamel2];
}
function calcBreaksForRegEx(line, reg, calcBreak) {
    const sb = [];
    const text = line.line.text.slice(0, line.relEnd);
    for (const m of text.matchAll(offsetRegEx(reg, line.relStart))) {
        const b = calcBreak(m);
        if (b) {
            sb.push(b);
        }
    }
    return sb;
}
function genOptionalWordBreaks(line, optionalBreakCharacters) {
    function calcBreaks(m) {
        const i = m.index;
        if (i === undefined)
            return;
        const j = i + m[0].length;
        return {
            offset: i,
            breaks: [
                [i, j], // Remove the characters
                ignoreBreak,
            ],
        };
    }
    const breaks = [
        calcBreaksForRegEx(line, regExDanglingQuote, calcBreaks),
        calcBreaksForRegEx(line, regExTrailingEndings, calcBreaks),
    ];
    if (optionalBreakCharacters) {
        const regex = new RegExp(`[${escapeRegEx(optionalBreakCharacters)}]`, 'gu');
        breaks.push(calcBreaksForRegEx(line, regex, calcBreaks));
    }
    return breaks;
}
function genSymbolBreaks(line) {
    function calcBreaks(m) {
        const i = m.index;
        if (i === undefined)
            return;
        const j = i + m[0].length;
        return {
            offset: i,
            breaks: [
                [i, j], // Remove the characters
                [i, i], // keep characters with word to right
                [j, j], // keep characters with word to left
                ignoreBreak,
            ],
        };
    }
    return [
        calcBreaksForRegEx(line, regExPossibleWordBreaks, calcBreaks),
        calcBreaksForRegEx(line, /\d+/g, calcBreaks),
        calcBreaksForRegEx(line, regExEscapeCharacters, calcBreaks),
    ];
}
function splitIntoWords(lineSeg, breaks, has) {
    const maxIndex = lineSeg.relEnd;
    const maxAttempts = 1000;
    const knownPathsByIndex = new Map();
    /**
     * Create a set of possible candidate to consider
     * @param p - prev candidate that lead to this one
     * @param i - offset within the string
     * @param bi - current index into the set of breaks
     * @param currentCost - current cost accrued
     */
    function makeCandidates(p, i, bi, currentCost) {
        const len = maxIndex;
        while (bi < breaks.length && breaks[bi].offset < i) {
            bi += 1;
        }
        if (bi >= breaks.length) {
            return [];
        }
        const br = breaks[bi];
        function c(bp) {
            const d = bp.length < 2 ? len - i : (bp[0] - i) * 0.5 + len - bp[1];
            const ec = currentCost + d;
            return {
                p,
                i,
                bi,
                bp,
                c: currentCost,
                ec,
                text: undefined,
            };
        }
        return br.breaks.map(c);
    }
    function checkTextOffset(text, offset) {
        const valid = has({ text, offset });
        return {
            text,
            offset,
            isFound: valid,
        };
    }
    function compare(a, b) {
        return a.ec - b.ec || b.i - a.i;
    }
    function pathToWords(node) {
        const results = [];
        for (let p = node; p; p = p.n) {
            if (p.text) {
                results.push(p.text);
            }
        }
        return results;
    }
    function addToKnownPaths(candidate, path) {
        for (let can = candidate; can !== undefined; can = can.p) {
            const t = can.text;
            const i = can.i;
            const cost = (!t || t.isFound ? 0 : t.text.length) + (path?.c ?? 0);
            const exitingPath = knownPathsByIndex.get(i);
            // Keep going only if this is a better candidate than the existing path
            if (exitingPath && exitingPath.c <= cost) {
                return undefined;
            }
            const node = {
                n: path,
                i,
                c: cost,
                text: t,
            };
            knownPathsByIndex.set(i, node);
            path = node;
        }
        return path;
    }
    let maxCost = lineSeg.relEnd - lineSeg.relStart;
    const candidates = new PairingHeap(compare);
    const text = lineSeg.line.text;
    candidates.append(makeCandidates(undefined, lineSeg.relStart, 0, 0));
    let attempts = 0;
    let bestPath;
    while (maxCost && candidates.length && attempts++ < maxAttempts) {
        /** Best Candidate Index */
        const best = candidates.dequeue();
        if (!best || best.c >= maxCost) {
            continue;
        }
        // Does it have a split?
        if (best.bp.length) {
            // yes
            const i = best.bp[0];
            const j = best.bp[1];
            const t = i > best.i ? checkTextOffset(text.slice(best.i, i), best.i) : undefined;
            const cost = !t || t.isFound ? 0 : t.text.length;
            const mc = maxIndex - j;
            best.c += cost;
            best.ec = best.c + mc;
            best.text = t;
            const possiblePath = knownPathsByIndex.get(j);
            if (possiblePath) {
                // We found a known apply to candidate
                const f = addToKnownPaths(best, possiblePath);
                bestPath = !bestPath || (f && f.c < bestPath.c) ? f : bestPath;
            }
            else if (best.c < maxCost) {
                const c = makeCandidates(t ? best : best.p, j, best.bi + 1, best.c);
                candidates.append(c);
            }
        }
        else {
            // It is a pass through
            const c = makeCandidates(best.p, best.i, best.bi + 1, best.c);
            candidates.append(c);
            if (!c.length) {
                const t = maxIndex > best.i ? checkTextOffset(text.slice(best.i, maxIndex), best.i) : undefined;
                const cost = !t || t.isFound ? 0 : t.text.length;
                best.c += cost;
                best.ec = best.c;
                best.text = t;
                const segText = t || best.p?.text || checkTextOffset('', best.i);
                const can = t ? { ...best, text: segText } : { ...best, ...best.p, text: segText };
                const f = addToKnownPaths(can, undefined);
                bestPath = !bestPath || (f && f.c < bestPath.c) ? f : bestPath;
            }
        }
        if (bestPath && bestPath.c < maxCost) {
            maxCost = bestPath.c;
        }
    }
    return pathToWords(bestPath);
}
function mergeSortedBreaks(...maps) {
    return maps.flat().sort((a, b) => a.offset - b.offset);
}
export const __testing__ = {
    generateWordBreaks,
    findNextWordText,
};
//# sourceMappingURL=wordSplitter.js.map