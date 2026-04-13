import assert from 'node:assert';
import { opFlatten, opMap, pipe } from '@cspell/cspell-pipe/sync';
import { grammar } from '../../grammars/typescript.js';
import { appendParsedText } from '../../mappers/appendMappedText.js';
import { mapRawString } from '../../mappers/typescript.js';
import { compileGrammar } from '../../parser/grammar.js';
import { createParser } from '../../parser/parser.js';
import { ScopePool } from '../../parser/scope.js';
const tsGrammar = compileGrammar(grammar);
const pool = new ScopePool();
const useScope = new WeakMap();
function* transform(texts) {
    for (const parsed of texts) {
        if (doesScopeMatch(parsed.scope, 'constant.character.escape.ts')) {
            const mapped = mapRawString(parsed.text);
            const scope = parsed.scope ? pool.parseScope(parsed.scope) : undefined;
            yield {
                text: mapped.text,
                scope: scope?.parent,
                map: absMapToRelMap(mapped.offsetMap),
                range: parsed.range,
            };
            continue;
        }
        yield parsed;
    }
}
function* mergeStringResults(results) {
    let last;
    for (const next of results) {
        if (!doesScopeMatch(next.scope, 'string.')) {
            if (last) {
                yield last;
                last = undefined;
            }
            yield next;
            continue;
        }
        if (!last) {
            last = next;
            continue;
        }
        if (next.scope !== last.scope || last.range[1] !== next.range[0]) {
            yield last;
            last = next;
            continue;
        }
        last = mergeParsedText(last, next);
    }
    if (last)
        yield last;
}
function mergeParsedText(a, b) {
    const abT = appendParsedText(a, b);
    const ab = {
        ...abT,
        scope: a.scope,
        delegate: a.delegate,
    };
    return ab;
}
function filterScope(scope) {
    const cached = useScope.get(scope);
    if (cached !== undefined)
        return cached;
    const value = scope.value;
    const use = !value.startsWith('punctuation') && !value.startsWith('keyword.');
    useScope.set(scope, use);
    return use;
}
function mapTokenizedLine(tl) {
    return tl.tokens
        .filter((t) => filterScope(t.scope))
        .map((t) => ({
        text: t.text,
        range: [tl.offset + t.range[0], tl.offset + t.range[1]],
        scope: t.scope,
    }));
}
function mapTokenizedLines(itl) {
    return pipe(itl, opMap(mapTokenizedLine), opFlatten(), transform, mergeStringResults);
}
export const parser = createParser(tsGrammar, 'typescript', mapTokenizedLines);
function doesScopeMatch(s, match) {
    if (!s)
        return false;
    return typeof s === 'string' ? s.startsWith(match) : s.value.startsWith(match);
}
function absMapToRelMap(map) {
    if (!map)
        return undefined;
    assert((map.length & 1) === 0, 'Map must be pairs of values.');
    const relMap = [];
    let base0 = 0;
    let base1 = 0;
    for (let i = 0; i < map.length; i += 2) {
        const d0 = map[i] - base0;
        const d1 = map[i + 1] - base1;
        base0 += d0;
        base1 += d1;
        if (d0 === 0 && d1 === 0)
            continue;
        relMap.push(d0, d1);
    }
    return relMap;
}
//# sourceMappingURL=TypeScriptParser.js.map