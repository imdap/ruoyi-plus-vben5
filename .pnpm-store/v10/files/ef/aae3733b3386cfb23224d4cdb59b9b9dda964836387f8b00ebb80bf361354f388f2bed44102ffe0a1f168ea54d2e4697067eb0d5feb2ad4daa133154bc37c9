import type { SearchOptionsRO, SpellingDictionary } from './SpellingDictionary.js';
export interface SpellingDictionaryCollection extends SpellingDictionary {
    readonly type: 'SpellingDictionaryCollection';
    readonly dictionaries: SpellingDictionary[];
    getErrors(): Error[];
}
export declare function createCollection(dictionaries: SpellingDictionary[], name: string, source?: string): SpellingDictionaryCollection;
declare function isWordInAnyDictionary(dicts: SpellingDictionary[], word: string, options: SearchOptionsRO): SpellingDictionary | undefined;
declare function isWordForbiddenInAnyDictionary(dicts: SpellingDictionary[], word: string, ignoreCase: boolean | undefined): SpellingDictionary | undefined;
export declare function isSpellingDictionaryCollection(dict: SpellingDictionary): dict is SpellingDictionaryCollection;
export declare const __testing__: {
    isWordInAnyDictionary: typeof isWordInAnyDictionary;
    isWordForbiddenInAnyDictionary: typeof isWordForbiddenInAnyDictionary;
};
export {};
//# sourceMappingURL=SpellingDictionaryCollection.d.ts.map