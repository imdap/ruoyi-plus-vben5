function expand(pattern, options, start = 0) {
    const _options = options ?? { begin: '(', end: ')', sep: '|' };
    const len = pattern.length;
    const parts = [];
    function push(word) {
        if (Array.isArray(word)) {
            parts.push(...word);
        }
        else {
            parts.push(word);
        }
    }
    let i = start;
    let curWord = '';
    while (i < len) {
        const ch = pattern[i++];
        if (ch === _options.end) {
            break;
        }
        if (ch === _options.begin) {
            const nested = expand(pattern, _options, i);
            i = nested.idx;
            curWord = nested.parts.flatMap((p) => (Array.isArray(curWord) ? curWord.map((w) => w + p) : [curWord + p]));
            continue;
        }
        if (ch === _options.sep) {
            push(curWord);
            curWord = '';
            continue;
        }
        curWord = Array.isArray(curWord) ? curWord.map((w) => w + ch) : curWord + ch;
    }
    push(curWord);
    return { parts, idx: i };
}
export function expandBraces(pattern, options) {
    return expand(pattern, options ?? { begin: '(', end: ')', sep: '|' }).parts;
}
//# sourceMappingURL=braceExpansion.js.map