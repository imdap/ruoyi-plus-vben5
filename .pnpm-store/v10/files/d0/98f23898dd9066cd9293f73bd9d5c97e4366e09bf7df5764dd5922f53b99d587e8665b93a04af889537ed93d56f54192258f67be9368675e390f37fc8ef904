import { expandCharacterSet } from 'cspell-trie-lib';
import { escapeRegEx } from './regexHelper.js';
import { isDefined } from './util.js';
export function createMapper(repMap, ignoreCharset) {
    if (!repMap && !ignoreCharset)
        return undefined;
    repMap = repMap || [];
    const charsetMap = charsetToRepMapRegEx(ignoreCharset);
    if (charsetMap) {
        repMap = [...repMap, ...charsetMap];
    }
    const filteredMap = repMap.filter(([match, _]) => !!match);
    if (!filteredMap.length) {
        return undefined;
    }
    const regEx = createMapperRegExp(repMap);
    const values = repMap.filter(([match, _]) => !!match).map(([_, into]) => into);
    function resolve(m, ...matches) {
        const index = matches.findIndex((a) => !!a);
        return 0 <= index && index < values.length ? values[index] : m;
    }
    function fn(s) {
        return s.replace(regEx, resolve);
    }
    return {
        test: regexpRemoveFlags(regEx, 'gm'),
        fn,
    };
}
function charsetToRepMapRegEx(charset, replaceWith = '') {
    if (!charset)
        return undefined;
    return charset
        .split('|')
        .map((chars) => `[${chars.replaceAll(/[\][\\]/g, '\\$&')}]`)
        .map((map) => [map, replaceWith]);
}
function charsetToRepMap(charset, replaceWith = '') {
    if (!charset)
        return undefined;
    return charset
        .split('|')
        .flatMap((chars) => [...expandCharacterSet(chars)])
        .map((char) => [char, replaceWith]);
}
function expandReplaceMap(repMap) {
    return repMap.flatMap(([from, replaceWith]) => from.split('|').map((w) => [w, replaceWith]));
}
function createMapperRegExp(repMap) {
    const filteredMap = repMap.filter(([match, _]) => !!match);
    if (!filteredMap.length) {
        return /$^/;
    }
    const regExStr = filteredMap
        .map(([from, _]) => from)
        // make sure it compiles into a regex
        .map((s) => {
        try {
            // fix up any nested ()
            const r = /\(/.test(s) ? s.replaceAll(/\((?=.*\))/g, '(?:').replaceAll('(?:?', '(?') : s;
            new RegExp(r);
            s = r;
        }
        catch {
            return escapeRegEx(s);
        }
        return s;
    })
        .map((s) => `(${s})`)
        .join('|');
    const regEx = new RegExp(regExStr, 'g');
    return regEx;
}
export function createRepMapper(repMap, ignoreCharset) {
    if (!repMap?.length && !ignoreCharset)
        return undefined;
    let tRepMap = repMap || [];
    const charsetMap = charsetToRepMapRegEx(ignoreCharset);
    if (charsetMap) {
        tRepMap = [...tRepMap, ...charsetMap];
    }
    const regEx = createMapperRegExp(tRepMap);
    const trie = createTrie(repMap, ignoreCharset);
    // const root = createTrie(repMap, ignoreCharset);
    return {
        test: regexpRemoveFlags(regEx, 'gm'),
        fn: (word) => {
            const edits = calcAllEdits(trie, word);
            return applyEdits(word, edits);
        },
    };
}
function applyEdits(word, edits) {
    if (!edits.length)
        return [word];
    // Prepare
    const letterEdits = [];
    for (let i = 0; i < word.length; ++i) {
        letterEdits[i] = { edits: [{ b: i, e: i + 1, r: word[i] }], suffixes: [] };
    }
    letterEdits[word.length] = { edits: [], suffixes: [''] };
    // Add edits
    for (const edit of edits) {
        const le = letterEdits[edit.b];
        le.edits.push(edit);
    }
    // Apply edits in reverse
    for (let i = word.length - 1; i >= 0; --i) {
        const le = letterEdits[i];
        const sfx = le.suffixes;
        for (const edit of le.edits) {
            const pfx = edit.r;
            const nSfx = letterEdits[edit.e].suffixes;
            for (const s of nSfx) {
                sfx.push(pfx + s);
            }
        }
    }
    const results = new Set(letterEdits[0].suffixes);
    return [...results];
}
function calcAllEdits(root, word) {
    const edits = [];
    function walk(node, b, e) {
        if (node.rep) {
            node.rep.forEach((r) => edits.push({ b, e, r }));
        }
        if (e === word.length || !node.children)
            return;
        const n = node.children[word[e]];
        if (!n)
            return;
        walk(n, b, e + 1);
    }
    for (let i = 0; i < word.length; ++i) {
        walk(root, i, i);
    }
    return edits;
}
function createTrie(repMap, ignoreCharset) {
    const combined = [repMap, charsetToRepMap(ignoreCharset)].filter(isDefined).flat();
    const expanded = expandReplaceMap(combined);
    const trieRoot = Object.create(null);
    expanded.forEach(([match, replaceWith]) => addToTrie(trieRoot, match, replaceWith));
    return trieRoot;
}
function addToTrie(node, match, replaceWith) {
    while (match) {
        const children = node.children || (node.children = Object.create(null));
        const k = match[0];
        const childNode = children[k] || (children[k] = Object.create(null));
        node = childNode;
        match = match.slice(1);
    }
    const s = new Set(node.rep || []);
    s.add(replaceWith);
    node.rep = [...s];
}
function regexpRemoveFlags(re, flagsToRemove) {
    const toRemove = new Set(flagsToRemove);
    const flags = [...re.flags].filter((f) => !toRemove.has(f)).join('');
    return new RegExp(re.source, flags);
}
export const __testing__ = {
    charsetToRepMap: charsetToRepMapRegEx,
    createMapperRegExp,
    createTrie,
    calcAllEdits,
    applyEdits,
};
//# sourceMappingURL=repMap.js.map