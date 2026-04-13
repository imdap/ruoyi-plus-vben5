import { opFilter, opFlatten, opMap, pipe } from '@cspell/cspell-pipe/sync';
import { tokenizeText, tokenizeTextIterable } from './tokenizeLine.js';
export function parseDocument(grammar, _filename, content, emitter = (line) => console.log(line)) {
    const r = tokenizeText(content, grammar);
    const tokens = pipe(r, opMap((tl) => tl.tokens.map((t) => ({ t, l: tl.line }))), opFlatten(), opFilter((t) => !t.t.scope.value.startsWith('punctuation')));
    for (const { t: token, l: line } of tokens) {
        emitter(`${(token.range[2] ?? line.lineNumber) + 1}:${token.range[0] + 1}\t ${JSON.stringify(token.text)}\t ${token.scope.toString()}`);
    }
}
function mapTokenizedLine(tl) {
    return tl.tokens.map((t) => ({
        text: t.text,
        range: [tl.offset + t.range[0], tl.offset + t.range[1]],
        scope: t.scope,
    }));
}
function mapTokenizedLines(itl) {
    return pipe(itl, opMap(mapTokenizedLine), opFlatten());
}
export function createParser(grammar, name, transform = mapTokenizedLines) {
    function parse(content, filename) {
        const parsedTexts = pipe(tokenizeTextIterable(content, grammar), transform);
        return { content, filename, parsedTexts };
    }
    return { name, parse };
}
//# sourceMappingURL=parser.js.map