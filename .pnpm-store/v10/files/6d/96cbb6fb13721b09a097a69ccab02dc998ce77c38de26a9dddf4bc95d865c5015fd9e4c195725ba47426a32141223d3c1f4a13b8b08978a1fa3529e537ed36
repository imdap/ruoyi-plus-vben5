import type { CSpellSettings, LocaleId } from '@cspell/cspell-types';
import type { ICSpellConfigFile } from 'cspell-config-lib';
import type { LanguageId } from './fileTypes.js';
import type { DictionaryTraceResult, WordSplits } from './textValidation/traceWord.js';
export interface TraceResult extends DictionaryTraceResult {
    /** True if the dictionary is currently active. */
    dictActive: boolean;
    /** True if the dictionary is blocked from use. */
    dictBlocked: boolean;
}
export interface TraceOptions {
    languageId?: LanguageId | LanguageId[];
    locale?: LocaleId;
    ignoreCase?: boolean;
    allowCompoundWords?: boolean;
    compoundSeparator?: string | undefined;
}
export interface TraceWordResult extends Array<TraceResult> {
    splits: readonly WordSplits[];
}
export declare function traceWords(words: string[], settings: CSpellSettings | ICSpellConfigFile, options: TraceOptions | undefined): Promise<TraceResult[]>;
export declare function traceWordsAsync(words: Iterable<string> | AsyncIterable<string>, settingsOrConfig: CSpellSettings | ICSpellConfigFile, options: TraceOptions | undefined): AsyncIterableIterator<TraceWordResult>;
//# sourceMappingURL=trace.d.ts.map