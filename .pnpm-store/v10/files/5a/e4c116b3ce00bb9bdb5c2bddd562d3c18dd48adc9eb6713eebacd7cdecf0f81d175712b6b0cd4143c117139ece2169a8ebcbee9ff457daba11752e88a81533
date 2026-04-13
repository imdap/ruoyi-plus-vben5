import type { DictionaryId, DictionaryReference } from '@cspell/cspell-types';
/**
 * A collection of dictionary references to determine if a dictionary is enabled or blocked.
 */
export interface DictionaryReferenceCollection {
    isEnabled(name: DictionaryId): boolean | undefined;
    isBlocked(name: DictionaryId): boolean | undefined;
    enabled(): DictionaryId[];
    blocked(): DictionaryId[];
    readonly dictionaryIds: DictionaryId[];
}
/**
 * Create a collection of dictionary references to be able to easily determine if a dictionary is enabled or blocked.
 * @param dictionaries - list of dictionary references
 * @returns DictionaryReferenceCollection
 */
export declare function createDictionaryReferenceCollection(dictionaries: DictionaryReference[]): DictionaryReferenceCollection;
//# sourceMappingURL=DictionaryReferenceCollection.d.ts.map