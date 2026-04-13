import type { CSpellUserSettings, DictionaryDefinitionInline } from '@cspell/cspell-types';
import type { ExtendedSuggestion } from '../Models/Suggestion.js';
export type CSpellUserSettingsKeys = keyof CSpellUserSettings;
export interface DirectiveIssue {
    /**
     * the start and end offsets within the document of the issue.
     */
    range: [start: number, end: number];
    /**
     * The text causing the issue.
     */
    text: string;
    message: string;
    suggestions: string[];
    suggestionsEx: ExtendedSuggestion[];
}
declare function collectInDocumentDirectives(text: string): DirectiveMatchWithParser[];
export declare function getInDocumentSettings(text: string): CSpellUserSettings;
export declare function validateInDocumentSettings(docText: string, _settings: CSpellUserSettings): Iterable<DirectiveIssue>;
interface PossibleMatch {
    /** The full directive text till the end of the line */
    fullDirective: string;
    /** Offset of the directive */
    offset: number;
    /** the partial directive, missing the CSpell prefix. */
    match: string;
}
type Directive = 'CompoundWords' | 'CaseSensitive' | 'Enable' | 'Disable' | 'Words' | 'Ignore' | 'Flag' | 'IgnoreRegExp' | 'IncludeRegExp' | 'Locale' | 'Dictionaries';
type ReducerFn = (acc: CSpellUserSettings, match: string) => CSpellUserSettings;
interface DirectiveMatchWithParser extends PossibleMatch {
    directive: Directive;
    fn: ReducerFn;
}
declare function parseCompoundWords(acc: CSpellUserSettings, match: string): CSpellUserSettings;
declare function parseWords(acc: CSpellUserSettings, match: string): CSpellUserSettings;
declare function parseIgnoreWords(acc: CSpellUserSettings, match: string): CSpellUserSettings;
declare function parseIgnoreRegExp(acc: CSpellUserSettings, match: string): CSpellUserSettings;
declare function getPossibleInDocSettings(text: string): Iterable<PossibleMatch>;
declare function getWordsFromDocument(text: string): string[];
export declare function extractInDocDictionary(settings: CSpellUserSettings): DictionaryDefinitionInline | undefined;
export declare function getIgnoreWordsFromDocument(text: string): string[];
export declare function getIgnoreRegExpFromDocument(text: string): (string | RegExp)[];
/**
 * These internal functions are used exposed for unit testing.
 */
export declare const __internal: {
    collectInDocumentSettings: typeof collectInDocumentDirectives;
    getPossibleInDocSettings: typeof getPossibleInDocSettings;
    getWordsFromDocument: typeof getWordsFromDocument;
    parseWords: typeof parseWords;
    parseCompoundWords: typeof parseCompoundWords;
    parseIgnoreRegExp: typeof parseIgnoreRegExp;
    parseIgnoreWords: typeof parseIgnoreWords;
    staticInDocumentDictionaryName: string;
};
export {};
//# sourceMappingURL=InDocSettings.d.ts.map