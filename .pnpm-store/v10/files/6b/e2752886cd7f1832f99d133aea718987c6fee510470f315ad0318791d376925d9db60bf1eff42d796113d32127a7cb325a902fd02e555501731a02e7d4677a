import type { Parser, ParseResult } from '@cspell/cspell-types/Parser';
import type { Grammar } from './grammar.js';
import type { NGrammar } from './grammarNormalized.js';
import type { TokenizedLine, TokenizedLineResult } from './types.js';
export interface DocumentParser {
    parse: (firstLine: string) => TokenizedLineResult;
}
export declare function parseDocument(grammar: NGrammar, _filename: string, content: string, emitter?: (line: string) => void): void;
declare function mapTokenizedLines(itl: Iterable<TokenizedLine>): ParseResult['parsedTexts'];
export declare function createParser(grammar: Grammar, name: string, transform?: typeof mapTokenizedLines): Parser;
export {};
//# sourceMappingURL=parser.d.ts.map