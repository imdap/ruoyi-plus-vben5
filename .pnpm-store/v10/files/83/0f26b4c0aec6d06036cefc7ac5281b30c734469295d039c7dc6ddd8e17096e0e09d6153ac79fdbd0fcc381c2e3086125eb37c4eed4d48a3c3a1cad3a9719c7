import type { CSpellUserSettings, MappedText, ParsedText } from '@cspell/cspell-types';
import type { ICSpellConfigFile } from 'cspell-config-lib';
import type { ExtendedSuggestion } from '../Models/Suggestion.js';
import type { TextDocument, TextDocumentRef } from '../Models/TextDocument.js';
import type { ValidationIssue } from '../Models/ValidationIssue.js';
import type { CSpellSettingsInternal, CSpellSettingsInternalFinalized, ImportFileRefWithError } from '../Settings/index.js';
import type { SpellingDictionaryCollection } from '../SpellingDictionary/index.js';
import type { WordSuggestion } from '../suggestions.js';
import type { MatchRange, SimpleRange, SubstitutionTransformer } from '../Transform/index.js';
import type { TextValidationFactoryOptions, TextValidator } from './lineValidatorFactory.js';
import type { TraceResult } from './traceWord.js';
import type { ValidateTextOptions } from './ValidateTextOptions.js';
export interface DocumentValidatorOptions extends ValidateTextOptions {
    /**
     * Optional path to a configuration file.
     * If given, it will be used instead of searching for a configuration file.
     */
    configFile?: string;
    /**
     * Prevents searching for local configuration files
     * By default the spell checker looks for configuration files
     * starting at the location of given filename.
     * If `configFile` is defined it will still be loaded instead of searching.
     * `false` will override the value in `settings.noConfigSearch`.
     * @defaultValue undefined
     */
    noConfigSearch?: boolean;
    /**
     * If `settings: CSpellUserSettings` contains imports, they will be resolved using this path.
     * If not set, the current working directory will be used.
     */
    resolveImportsRelativeTo?: string | URL;
}
type PerfTimings = Record<string, number>;
export declare class DocumentValidator {
    readonly settings: CSpellUserSettings;
    private _document;
    private _ready;
    readonly errors: Error[];
    private _prepared;
    private _preparations;
    private _preparationTime;
    private _suggestions;
    readonly options: DocumentValidatorOptions;
    readonly perfTiming: PerfTimings;
    skipValidation: boolean;
    static create(doc: TextDocument, options: DocumentValidatorOptions, settingsOrConfigFile: CSpellUserSettings | ICSpellConfigFile): Promise<DocumentValidator>;
    /**
     * @param doc - Document to validate
     * @param config - configuration to use (not finalized).
     */
    constructor(doc: TextDocument, options: DocumentValidatorOptions, settings: CSpellUserSettings);
    get ready(): boolean;
    prepare(): Promise<void>;
    private _prepareAsync;
    private _updatePrep;
    /**
     * The amount of time in ms to prepare for validation.
     */
    get prepTime(): number;
    get validateDirectives(): boolean;
    /**
     * Check a range of text for validation issues.
     * @param range - the range of text to check.
     * @param _text - the text to check. If not given, the text will be taken from the document.
     * @param scope - the scope to use for validation. If not given, the default scope will be used.
     * @returns the validation issues.
     */
    checkText(range: SimpleRange, _text: string | undefined, scope?: string[] | string): ValidationIssue[];
    check(parsedText: ParsedText): ValidationIssue[];
    /**
     * Check a Document for Validation Issues.
     * @param forceCheck - force a check even if the document would normally be excluded.
     * @returns the validation issues.
     */
    checkDocumentAsync(forceCheck?: boolean): Promise<ValidationIssue[]>;
    /**
     * Check a Document for Validation Issues.
     *
     * Note: The validator must be prepared before calling this method.
     * @param forceCheck - force a check even if the document would normally be excluded.
     * @returns the validation issues.
     */
    checkDocument(forceCheck?: boolean): ValidationIssue[];
    checkDocumentDirectives(forceCheck?: boolean): ValidationIssue[];
    get document(): TextDocument;
    updateDocumentText(text: string): Promise<void>;
    /**
     * Get the calculated ranges of text that should be included in the spell checking.
     * @returns MatchRanges of text to include.
     */
    getCheckedTextRanges(): MatchRange[];
    traceWord(word: string): TraceResult;
    private defaultParser;
    private _checkParsedText;
    private addPossibleError;
    private _parse;
    private getSuggestions;
    private genSuggestions;
    private adjustSuggestions;
    getFinalizedDocSettings(): CSpellSettingsInternal;
    getConfigErrors(): ImportFileRefWithError[] | undefined;
    getDictionaryErrors(): Map<string, Error[]> | undefined;
    /**
     * Returns true if the final result of the configuration calculation results
     * in the document being enabled. Note: in some cases, checking the document
     * might still make sense, for example, the `@cspell/eslint-plugin` relies on
     * `eslint` configuration to make that determination.
     * @returns true if the document settings have resolved to be `enabled`
     */
    shouldCheckDocument(): boolean;
    /**
     * Internal `cspell-lib` use.
     */
    _getPreparations(): Preparations | undefined;
}
declare function sanitizeSuggestion(sug: WordSuggestion): ExtendedSuggestion;
interface Preparations {
    /** loaded config */
    config: CSpellSettingsInternal;
    dictionary: SpellingDictionaryCollection;
    /** configuration after applying in-doc settings */
    docSettings: CSpellSettingsInternal;
    finalSettings: CSpellSettingsInternalFinalized;
    includeRanges: MatchRange[];
    textValidator: TextValidator;
    segmenter: (texts: MappedText) => Iterable<MappedText>;
    shouldCheck: boolean;
    validateOptions: TextValidationFactoryOptions;
    localConfig: CSpellUserSettings | undefined;
    localConfigFilepath: string | undefined;
    subTransformer: SubstitutionTransformer;
}
interface ShouldCheckDocumentResult {
    /** possible errors found while loading configuration. */
    errors: Error[];
    /**
     * The calculated result:
     * - `false` if the document should not be checked. Based upon the settings.
     * - `true` if the document should be checked.
     */
    shouldCheck: boolean;
    /** final settings used to determine the result. */
    settings: CSpellUserSettings;
    /**
     * The reason the document should not be checked.
     */
    reason?: string | undefined;
}
/**
 * Check if a document should be checked based upon the ignorePaths and override settings.
 *
 * This function will search and fetch settings based upon the location of the document if `noConfigSearch` is not true.
 *
 * @param doc - document to check
 * @param options - options to override some of the settings.
 * @param settings - current settings
 * @returns ShouldCheckDocumentResult
 */
export declare function shouldCheckDocument(doc: TextDocumentRef, options: DocumentValidatorOptions, settings: CSpellUserSettings): Promise<ShouldCheckDocumentResult>;
export declare const __testing__: {
    sanitizeSuggestion: typeof sanitizeSuggestion;
};
export {};
//# sourceMappingURL=docValidator.d.ts.map