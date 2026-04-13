import type { AdvancedCSpellSettingsWithSourceTrace, CSpellSettingsWithSourceTrace, Parser } from '@cspell/cspell-types';
import type { OptionalOrUndefined } from '../../util/types.js';
import type { DictionaryDefinitionInternal } from './InternalDictionaryDef.js';
export declare const SymbolCSpellSettingsInternal: unique symbol;
export interface CSpellSettingsInternal extends Omit<AdvancedCSpellSettingsWithSourceTrace, 'dictionaryDefinitions'> {
    [SymbolCSpellSettingsInternal]: true;
    dictionaryDefinitions?: DictionaryDefinitionInternal[];
}
export interface CSpellSettingsInternalFinalized extends CSpellSettingsInternal {
    parserFn: Parser | undefined;
    finalized: true;
    ignoreRegExpList: RegExp[];
    includeRegExpList: RegExp[];
}
export declare function cleanCSpellSettingsInternal(parts?: OptionalOrUndefined<Partial<CSpellSettingsInternal>>): CSpellSettingsInternal;
export declare function createCSpellSettingsInternal(parts?: OptionalOrUndefined<Partial<CSpellSettingsInternal>>): CSpellSettingsInternal;
export declare function isCSpellSettingsInternal(cs: CSpellSettingsInternal | CSpellSettingsWithSourceTrace | OptionalOrUndefined<CSpellSettingsInternal | CSpellSettingsWithSourceTrace>): cs is CSpellSettingsInternal;
//# sourceMappingURL=CSpellSettingsInternalDef.d.ts.map