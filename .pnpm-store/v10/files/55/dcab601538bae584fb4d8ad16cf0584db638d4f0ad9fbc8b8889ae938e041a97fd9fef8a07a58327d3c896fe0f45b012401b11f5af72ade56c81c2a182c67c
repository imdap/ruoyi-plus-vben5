import { GTrie } from 'cspell-trie-lib';
import { mapOffsetPairsToSourceMap, mergeSourceMaps } from './SourceMap.js';
export class SubstitutionTransformer {
    #trie;
    constructor(subMap) {
        this.#trie = subMap ? GTrie.fromEntries(subMap) : undefined;
    }
    transform(text) {
        if (typeof text === 'string') {
            return this.transformString(text);
        }
        if (!this.#trie)
            return text;
        const transformed = this.transformString(text.text);
        const result = {
            ...text,
            text: transformed.text,
            map: mergeSourceMaps(text.map, transformed.map),
        };
        return result;
    }
    transformString(text) {
        if (!this.#trie) {
            return { text, range: [0, text.length] };
        }
        const map = [0, 0];
        let repText = '';
        let lastEnd = 0;
        for (const edit of calcEdits(text, this.#trie)) {
            if (edit.range[0] > lastEnd) {
                repText += text.slice(lastEnd, edit.range[0]);
                map.push(edit.range[0], repText.length);
            }
            repText += edit.text;
            map.push(edit.range[1], repText.length);
            lastEnd = edit.range[1];
        }
        if (lastEnd === 0) {
            return { text, range: [0, text.length] };
        }
        if (lastEnd < text.length) {
            repText += text.slice(lastEnd);
            map.push(text.length, repText.length);
        }
        const result = {
            text: repText,
            range: [0, text.length],
            map: mapOffsetPairsToSourceMap(map),
        };
        return result;
    }
}
function* calcEdits(text, subTrie) {
    let i = 0;
    while (i < text.length) {
        const edit = findSubString(text, subTrie, i);
        if (edit) {
            yield edit;
            i = edit.range[1];
            continue;
        }
        ++i;
    }
}
function findSubString(text, subTrie, start) {
    let node = subTrie.root;
    let i = start;
    let lastMatch = undefined;
    node = node.children?.get(text[i]);
    while (i < text.length && node) {
        ++i;
        if (node.value !== undefined) {
            lastMatch = { text: node.value, range: [start, i] };
        }
        node = node.children?.get(text[i]);
    }
    return lastMatch;
}
function calcSubMap(subs, defs) {
    const subMap = new Map();
    const missing = [];
    const defMap = buildDefinitionMap(defs);
    for (const sub of subs) {
        if (typeof sub === 'string') {
            const def = defMap.get(sub);
            if (!def) {
                missing.push(sub);
                continue;
            }
            for (const [find, replacement] of def.entries) {
                subMap.set(find, replacement);
            }
            continue;
        }
        subMap.set(sub[0], sub[1]);
    }
    return { subMap, missing };
}
function buildDefinitionMap(defs) {
    const defMap = new Map();
    for (const def of defs) {
        defMap.set(def.name, def);
    }
    return defMap;
}
/**
 * Creates a SubstitutionTransformer based upon the provided SubstitutionInfo.
 * This will create a transformer that can be used to apply the substitutions to a document before spell checking.
 * @param info
 * @returns
 */
export function createSubstitutionTransformer(info) {
    const { subMap, missing } = info.substitutions && info.substitutionDefinitions
        ? calcSubMap(info.substitutions, info.substitutionDefinitions)
        : {};
    return {
        transformer: new SubstitutionTransformer(subMap),
        missing: missing && missing.length > 0 ? missing : undefined,
    };
}
//# sourceMappingURL=SubstitutionTransformer.js.map