import type { DictionaryDefinition } from '@cspell/cspell-types';
import type { DictionaryReferenceCollection } from '../DictionaryReferenceCollection.js';
import type { CSpellSettingsInternal } from './CSpellSettingsInternalDef.js';
import type { DictionaryDefinitionInternal, DictionaryDefinitionInternalWithSource, DictionaryFileDefinitionInternalWithSource } from './InternalDictionaryDef.js';
export type DefMapArrayItem = [string, DictionaryDefinitionInternal];
/**
 * Combines the list of desired dictionaries with the list of dictionary
 * definitions. Order does not matter, but the number of leading `!` does.
 *
 * Excluding dictionaries.
 * - Adding `!` to a dictId will remove the dictionary.
 * - Adding `!!` will add it back.
 *
 * @param dictRefCol - dictionaries desired
 * @param defs - dictionary definitions
 * @returns map from dictIds to definitions
 */
export declare function filterDictDefsToLoad(dictRefCol: DictionaryReferenceCollection, defs: DictionaryDefinitionInternal[]): DictionaryDefinitionInternal[];
export declare function mapDictDefsToInternal(defs: undefined, pathToSettingsFile: URL): undefined;
export declare function mapDictDefsToInternal(defs: DictionaryDefinition[], pathToSettingsFile: URL): DictionaryDefinitionInternalWithSource[];
export declare function mapDictDefsToInternal(defs: DictionaryDefinition[] | undefined, pathToSettingsFile: URL): DictionaryDefinitionInternalWithSource[] | undefined;
export declare function mapDictDefToInternal(def: DictionaryDefinition, pathToSettingsFile: URL): DictionaryDefinitionInternalWithSource;
export declare function calcDictionaryDefsToLoad(settings: CSpellSettingsInternal): DictionaryDefinitionInternal[];
export declare function isDictionaryDefinitionWithSource(d: DictionaryDefinition | DictionaryDefinitionInternalWithSource): d is DictionaryDefinitionInternalWithSource;
export declare function isDictionaryDefinitionInternal(def: DictionaryDefinition | DictionaryDefinitionInternal): def is DictionaryDefinitionInternal;
export declare function isDictionaryFileDefinitionInternalWithSource(def: DictionaryDefinition | DictionaryDefinitionInternal): def is DictionaryFileDefinitionInternalWithSource;
export declare function isDictionaryDefinitionInlineInternalWithSource(def: DictionaryDefinition | DictionaryDefinitionInternal): def is DictionaryDefinitionInternalWithSource;
//# sourceMappingURL=DictionarySettings.d.ts.map