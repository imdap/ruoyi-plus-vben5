function toMatchRangeWithText(m) {
    const range = m.indices?.[0];
    const index = range?.[0] ?? (m.index || 0);
    const text = m[0];
    const startPos = index;
    const endPos = range?.[1] ?? index + text.length;
    return { startPos, endPos, text };
}
export function findMatchingRanges(pattern, text) {
    if (pattern.source === '.*') {
        return [{ startPos: 0, endPos: text.length }];
    }
    const regex = new RegExp(pattern);
    if (!regex.global) {
        const m = text.match(regex);
        if (!m)
            return [];
        return [toMatchRangeWithText(m)];
    }
    return [...text.matchAll(regex)].map(toMatchRangeWithText);
}
function compareRanges(a, b) {
    return a.startPos - b.startPos || a.endPos - b.endPos;
}
export function unionRanges(ranges) {
    const sortedRanges = sortMatchRangeArray(ranges);
    ranges = sortedRanges.values;
    if (!ranges.length)
        return sortedRanges;
    let i = 0;
    let j = 0;
    let { startPos, endPos } = ranges[i++];
    for (; i < ranges.length; ++i) {
        const r = ranges[i];
        if (r.startPos > endPos) {
            ranges[j++] = { startPos, endPos };
            startPos = r.startPos;
            endPos = r.endPos;
            continue;
        }
        endPos = Math.max(endPos, r.endPos);
    }
    if (startPos < endPos) {
        ranges[j++] = { startPos, endPos };
    }
    ranges.length = j;
    return sortedRanges;
}
export function findMatchingRangesForPatterns(patterns, text) {
    const nested = patterns.map((pattern) => findMatchingRanges(pattern, text));
    return unionRanges(flatten(nested)).values;
}
/**
 * Create a new set of positions that have the excluded position ranges removed.
 */
export function excludeRanges(includeRanges, excludeRanges) {
    return _excludeRanges(sortMatchRangeArray(includeRanges), sortMatchRangeArray(excludeRanges));
}
function _excludeRanges(sortedIncludeRanges, sortedExcludeRanges) {
    const includeRanges = sortedIncludeRanges.values;
    const excludeRanges = sortedExcludeRanges.values;
    if (!includeRanges.length)
        return includeRanges;
    if (!excludeRanges.length) {
        return includeRanges;
    }
    const ranges = [];
    ranges.length = includeRanges.length + excludeRanges.length + 1;
    let i = 0;
    let exIndex = 0;
    const limit = excludeRanges.length;
    for (const incRange of includeRanges) {
        const endPos = incRange.endPos;
        let startPos = incRange.startPos;
        for (; exIndex < limit; ++exIndex) {
            const ex = excludeRanges[exIndex];
            if (ex.startPos >= endPos)
                break;
            if (ex.endPos <= startPos)
                continue;
            if (ex.startPos > startPos) {
                ranges[i++] = { startPos, endPos: ex.startPos };
            }
            startPos = ex.endPos;
            if (startPos >= endPos)
                break;
        }
        if (startPos < endPos) {
            ranges[i++] = { startPos, endPos };
        }
    }
    ranges.length = i;
    return ranges;
}
export function extractRangeText(text, ranges) {
    return ranges.map(({ startPos, endPos }) => ({
        startPos,
        endPos,
        text: text.slice(startPos, endPos),
    }));
}
function sortMatchRangeArray(values) {
    values.sort(compareRanges);
    return { values };
}
function flatten(data) {
    let size = 0;
    for (let i = data.length - 1; i >= 0; --i) {
        size += data[i].length;
    }
    const result = new Array(size);
    let k = 0;
    for (let i = 0; i < data.length; ++i) {
        const d = data[i];
        for (let j = 0; j < d.length; ++j) {
            result[k++] = d[j];
        }
    }
    return result;
}
//# sourceMappingURL=TextRange.js.map