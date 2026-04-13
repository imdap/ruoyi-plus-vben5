import type { CSpellSettingsWithSourceTrace, CSpellUserSettings } from '@cspell/cspell-types';
import type { ICSpellConfigFile } from 'cspell-config-lib';
import type { Document, DocumentWithText } from './Document/index.js';
import type { ValidationIssueRPC } from './Models/ValidationIssue.js';
import type { ImportFileRefWithError } from './Settings/index.js';
import type { Uri } from './util/IUri.js';
import type { ValidateTextOptions, ValidationIssue } from './validator.js';
export interface SpellCheckFileOptions extends ValidateTextOptions, Pick<CSpellUserSettings, 'unknownWords'> {
    /**
     * Optional path to a configuration file.
     * If given, it will be used instead of searching for a configuration file.
     */
    configFile?: string;
    /**
     * File encoding
     * @defaultValue 'utf-8'
     */
    encoding?: BufferEncoding;
    /**
     * Prevents searching for local configuration files
     * By default the spell checker looks for configuration files
     * starting at the location of given filename.
     * If `configFile` is defined it will still be loaded instead of searching.
     * `false` will override the value in `settings.noConfigSearch`.
     * @defaultValue undefined
     */
    noConfigSearch?: boolean;
}
export interface SpellCheckFileOptionsRPC extends SpellCheckFileOptions {
    measurePerf?: boolean;
}
export interface SpellCheckFilePerf extends Record<string, number | undefined> {
    loadTimeMs?: number;
    prepareTimeMs?: number;
    checkTimeMs?: number;
    totalTimeMs?: number;
}
export interface SpellCheckFileResult {
    document: Document | DocumentWithText;
    settingsUsed: CSpellSettingsWithSourceTrace;
    localConfigFilepath: string | undefined;
    options: SpellCheckFileOptions;
    issues: ValidationIssue[];
    checked: boolean;
    errors: Error[] | undefined;
    configErrors?: ImportFileRefWithError[] | undefined;
    dictionaryErrors?: Map<string, Error[]> | undefined;
    perf?: SpellCheckFilePerf;
}
interface DocumentReferenceRPC extends Pick<Document, 'uri'> {
    text?: undefined;
    languageId?: undefined;
    locale?: undefined;
}
export interface SpellCheckFileResultRPC {
    /**
     * The document that was checked.
     *
     * **Note:** the text will be missing to avoid sending large amounts of text over the RPC channel.
     * If the text is needed, the document should be reloaded using the URI.
     */
    document: DocumentReferenceRPC;
    issues?: ValidationIssueRPC[] | undefined;
    checked: boolean;
    errors?: Error[] | undefined;
    configErrors?: ImportFileRefWithError[] | undefined;
    dictionaryErrors?: Map<string, Error[]> | undefined;
    perf?: SpellCheckFilePerf | undefined;
}
/**
 * Spell Check a file
 * @param file - absolute path to file to read and check.
 * @param options - options to control checking
 * @param settings - default settings to use.
 */
export declare function spellCheckFile(file: string | Uri | URL, options: SpellCheckFileOptions, settingsOrConfigFile: CSpellUserSettings | ICSpellConfigFile): Promise<SpellCheckFileResult>;
/**
 * Spell Check a Document.
 * @param document - document to be checked. If `document.text` is `undefined` the file will be loaded
 * @param options - options to control checking
 * @param settings - default settings to use.
 */
export declare function spellCheckDocument(document: Document | DocumentWithText, options: SpellCheckFileOptions, settingsOrConfigFile: CSpellUserSettings | ICSpellConfigFile): Promise<SpellCheckFileResult>;
/**
 * Spell Check a Document.
 * @param document - document to be checked. If `document.text` is `undefined` the file will be loaded
 * @param options - options to control checking
 * @param settings - default settings to use.
 */
export declare function spellCheckDocumentRPC(document: Document | DocumentWithText, options: SpellCheckFileOptionsRPC, settingsOrConfigFile: CSpellUserSettings | ICSpellConfigFile): Promise<SpellCheckFileResultRPC>;
export interface DetermineFinalDocumentSettingsResult {
    document: DocumentWithText;
    settings: CSpellSettingsWithSourceTrace;
}
/**
 * Combines all relevant setting values into a final configuration to be used for spell checking.
 * It applies any overrides and appropriate language settings by taking into account the document type (languageId)
 * the locale (natural language) and any in document settings.
 *
 * Note: this method will not search for configuration files. Configuration files should already be merged into `settings`.
 * It is NOT necessary to include the cspell defaultSettings or globalSettings. They will be applied within this function.
 * @param document - The document to be spell checked. Note: if the URI doesn't have a path, overrides cannot be applied.
 *   `locale` - if defined will be used unless it is overridden by an in-document setting.
 *   `languageId` - if defined will be used to select appropriate file type dictionaries.
 * @param settings - The near final settings. Should already be the combination of all configuration files.
 */
export declare function determineFinalDocumentSettings(document: DocumentWithText, settings: CSpellUserSettings): Promise<DetermineFinalDocumentSettingsResult>;
export {};
//# sourceMappingURL=spellCheckFile.d.ts.map