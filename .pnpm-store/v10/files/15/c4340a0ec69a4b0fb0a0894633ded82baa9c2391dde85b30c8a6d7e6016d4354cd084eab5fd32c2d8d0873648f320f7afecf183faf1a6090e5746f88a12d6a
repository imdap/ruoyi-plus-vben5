import type { CharacterSet, ReplaceMap } from '@cspell/cspell-types';
export interface ReplaceMapper {
    test?: RegExp;
    fn: (src: string) => string;
}
export declare function createMapper(repMap: ReplaceMap | undefined, ignoreCharset?: string): ReplaceMapper | undefined;
declare function charsetToRepMapRegEx(charset: CharacterSet | undefined, replaceWith?: string): ReplaceMap | undefined;
declare function createMapperRegExp(repMap: ReplaceMap): RegExp;
interface RepTrieNode {
    rep?: string[];
    children?: Record<string, RepTrieNode>;
}
interface Edit {
    b: number;
    e: number;
    r: string;
}
export interface RepMapper {
    test: RegExp;
    fn: (word: string) => string[];
}
export declare function createRepMapper(repMap: ReplaceMap | undefined, ignoreCharset?: string): RepMapper | undefined;
declare function applyEdits(word: string, edits: Edit[]): string[];
declare function calcAllEdits(root: RepTrieNode, word: string): Edit[];
declare function createTrie(repMap: ReplaceMap | undefined, ignoreCharset?: string): RepTrieNode;
export declare const __testing__: {
    charsetToRepMap: typeof charsetToRepMapRegEx;
    createMapperRegExp: typeof createMapperRegExp;
    createTrie: typeof createTrie;
    calcAllEdits: typeof calcAllEdits;
    applyEdits: typeof applyEdits;
};
export {};
//# sourceMappingURL=repMap.d.ts.map