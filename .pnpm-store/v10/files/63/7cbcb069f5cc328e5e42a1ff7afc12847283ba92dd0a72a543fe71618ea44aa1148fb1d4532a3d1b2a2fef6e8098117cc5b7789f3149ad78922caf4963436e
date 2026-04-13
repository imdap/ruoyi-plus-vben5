import assert from 'node:assert';
import { opConcatMap, opMap, pipeSync } from '@cspell/cspell-pipe/sync';
import { IssueType } from '@cspell/cspell-types';
import { toFilePathOrHref, toFileURL } from '@cspell/url';
import { satisfiesCSpellConfigFile } from 'cspell-config-lib';
import { getGlobMatcherForExcluding } from '../globs/getGlobMatcher.js';
import { documentUriToURL, updateTextDocument } from '../Models/TextDocument.js';
import { createPerfTimer, measurePerf } from '../perf/index.js';
import { extractImportErrors, finalizeSettings, loadConfig, mergeSettings, resolveConfigFileImports, resolveSettingsImports, searchForConfig, } from '../Settings/index.js';
import { validateInDocumentSettings } from '../Settings/InDocSettings.js';
import { getDictionaryInternal } from '../SpellingDictionary/index.js';
import { calcSuggestionAdjustedToToMatchCase } from '../suggestions.js';
import { createMappedTextSegmenter, createSubstitutionTransformer } from '../Transform/index.js';
import { catchPromiseError, toError } from '../util/errors.js';
import { AutoCache } from '../util/simpleCache.js';
import { uriToFilePath } from '../util/Uri.js';
import { cleanValidationIssue } from './cleanValidationIssue.js';
import { defaultMaxDuplicateProblems, defaultMaxNumberOfProblems } from './defaultConstants.js';
import { determineTextDocumentSettings } from './determineTextDocumentSettings.js';
import { textValidatorFactory } from './lineValidatorFactory.js';
import { settingsToValidateOptions } from './settingsToValidateOptions.js';
import { calcTextInclusionRanges } from './textValidator.js';
import { traceWord } from './traceWord.js';
const ERROR_NOT_PREPARED = 'Validator Must be prepared before calling this function.';
export class DocumentValidator {
    settings;
    _document;
    _ready = false;
    errors = [];
    _prepared;
    _preparations;
    _preparationTime = -1;
    _suggestions = new AutoCache((text) => this.genSuggestions(text), 1000);
    options;
    perfTiming = {};
    skipValidation;
    static async create(doc, options, settingsOrConfigFile) {
        const settings = satisfiesCSpellConfigFile(settingsOrConfigFile)
            ? await resolveConfigFileImports(settingsOrConfigFile)
            : settingsOrConfigFile;
        const validator = new DocumentValidator(doc, options, settings);
        await validator.prepare();
        return validator;
    }
    /**
     * @param doc - Document to validate
     * @param config - configuration to use (not finalized).
     */
    constructor(doc, options, settings) {
        this.settings = settings;
        this._document = doc;
        this.options = { ...options };
        const numSuggestions = this.options.numSuggestions ?? settings.numSuggestions;
        if (numSuggestions !== undefined) {
            this.options.numSuggestions = numSuggestions;
        }
        this.skipValidation = !!options.skipValidation;
        // console.error(`DocumentValidator: ${doc.uri}`);
    }
    get ready() {
        return this._ready;
    }
    prepare() {
        if (this._ready)
            return Promise.resolve();
        if (this._prepared)
            return this._prepared;
        this._prepared = this._prepareAsync();
        return this._prepared;
    }
    async _prepareAsync() {
        assert(!this._ready);
        const timer = createPerfTimer('_prepareAsync');
        const { options, settings: rawSettings } = this;
        const resolveImportsRelativeTo = toFileURL(options.resolveImportsRelativeTo || toFileURL('./virtual.settings.json'));
        const settings = rawSettings.import?.length
            ? await resolveSettingsImports(rawSettings, resolveImportsRelativeTo)
            : rawSettings;
        const useSearchForConfig = (!options.noConfigSearch && !settings.noConfigSearch) || options.noConfigSearch === false;
        const pLocalConfig = options.configFile
            ? loadConfig(options.configFile, settings)
            : useSearchForConfig
                ? timePromise(this.perfTiming, '__searchForDocumentConfig', searchForDocumentConfig(this._document, settings, settings))
                : undefined;
        if (pLocalConfig) {
            timePromise(this.perfTiming, '_loadConfig', pLocalConfig).catch(() => undefined);
        }
        const localConfig = (await catchPromiseError(pLocalConfig, (e) => this.addPossibleError(e))) || {};
        extractImportErrors(localConfig).forEach((e) => this.addPossibleError(e.error));
        const config = mergeSettings(settings, localConfig);
        const docSettings = await timePromise(this.perfTiming, '_determineTextDocumentSettings', determineTextDocumentSettings(this._document, config));
        const dict = await timePromise(this.perfTiming, '_getDictionaryInternal', getDictionaryInternal(docSettings));
        const stopMeasure = measurePerf('DocumentValidator._prepareAsync');
        const recGlobMatcherTime = recordPerfTime(this.perfTiming, '_GlobMatcher');
        const matcher = getGlobMatcherForExcluding(localConfig?.ignorePaths);
        const uri = this._document.uri;
        recGlobMatcherTime();
        const recShouldCheckTime = recordPerfTime(this.perfTiming, '_shouldCheck');
        // eslint-disable-next-line unicorn/prefer-regexp-test
        const shouldCheck = !matcher.match(uriToFilePath(uri)) && (docSettings.enabled ?? true);
        recShouldCheckTime();
        const recFinalizeTime = recordPerfTime(this.perfTiming, '_finalizeSettings');
        const finalSettings = finalizeSettings(docSettings);
        const sub = createSubstitutionTransformer(finalSettings);
        if (sub.missing) {
            this.addPossibleError(`Missing substitutions: ${sub.missing.join(', ')}`);
        }
        const validateOptions = { ...settingsToValidateOptions(finalSettings), transformer: sub.transformer };
        const includeRanges = calcTextInclusionRanges(this._document.text, validateOptions);
        const segmenter = createMappedTextSegmenter(includeRanges);
        const textValidator = textValidatorFactory(dict, validateOptions);
        recFinalizeTime();
        this._preparations = {
            config,
            dictionary: dict,
            docSettings,
            finalSettings,
            shouldCheck,
            validateOptions,
            includeRanges,
            segmenter,
            textValidator,
            localConfig,
            localConfigFilepath: localConfig?.__importRef?.filename,
            subTransformer: sub.transformer,
        };
        this._ready = true;
        this._preparationTime = timer.elapsed;
        this.perfTiming.prepTime = this._preparationTime;
        stopMeasure();
    }
    async _updatePrep() {
        assert(this._preparations, ERROR_NOT_PREPARED);
        const timer = createPerfTimer('_updatePrep');
        const prep = this._preparations;
        const docSettings = await determineTextDocumentSettings(this._document, prep.config);
        const dict = await getDictionaryInternal(docSettings);
        const stopMeasure = measurePerf('DocumentValidator._updatePrep');
        const shouldCheck = docSettings.enabled ?? true;
        const finalSettings = finalizeSettings(docSettings);
        const sub = createSubstitutionTransformer(finalSettings);
        if (sub.missing) {
            this.addPossibleError(`Missing substitutions: ${sub.missing.join(', ')}`);
        }
        const validateOptions = { ...settingsToValidateOptions(finalSettings), transformer: sub.transformer };
        const includeRanges = calcTextInclusionRanges(this._document.text, validateOptions);
        const segmenter = createMappedTextSegmenter(includeRanges);
        const textValidator = textValidatorFactory(dict, validateOptions);
        this._preparations = {
            ...prep,
            dictionary: dict,
            docSettings,
            shouldCheck,
            validateOptions,
            includeRanges,
            segmenter,
            textValidator,
        };
        this._preparationTime = timer.elapsed;
        stopMeasure();
    }
    /**
     * The amount of time in ms to prepare for validation.
     */
    get prepTime() {
        return this._preparationTime;
    }
    get validateDirectives() {
        return this.options.validateDirectives ?? this._preparations?.config.validateDirectives ?? false;
    }
    /**
     * Check a range of text for validation issues.
     * @param range - the range of text to check.
     * @param _text - the text to check. If not given, the text will be taken from the document.
     * @param scope - the scope to use for validation. If not given, the default scope will be used.
     * @returns the validation issues.
     */
    checkText(range, _text, scope) {
        const text = this._document.text.slice(range[0], range[1]);
        scope = (Array.isArray(scope) ? scope.join(' ') : scope) || '';
        return this.check({ text, range, scope });
    }
    check(parsedText) {
        assert(this._ready);
        assert(this._preparations, ERROR_NOT_PREPARED);
        const { segmenter, textValidator } = this._preparations;
        // Determine settings for text range
        // Slice text based upon include ranges
        // Check text against dictionaries.
        const document = this._document;
        let line = undefined;
        function mapToIssue(issue) {
            const { range, text, isFlagged, isFound, suggestionsEx, hasPreferredSuggestions, hasSimpleSuggestions } = issue;
            const offset = range[0];
            const length = range[1] - range[0];
            assert(!line || line.offset <= offset);
            if (!line || line.offset + line.text.length <= offset) {
                line = document.lineAt(offset);
            }
            return {
                text,
                offset,
                line,
                length,
                isFlagged,
                isFound,
                suggestionsEx,
                hasPreferredSuggestions,
                hasSimpleSuggestions,
            };
        }
        const issues = [...pipeSync(segmenter(parsedText), opConcatMap(textValidator.validate), opMap(mapToIssue))];
        if (!this.options.generateSuggestions) {
            return issues.map((issue) => {
                if (!issue.suggestionsEx)
                    return issue;
                const suggestionsEx = this.adjustSuggestions(issue.text, issue.suggestionsEx);
                const suggestions = suggestionsEx.map((s) => s.word);
                return { ...issue, suggestionsEx, suggestions };
            });
        }
        const withSugs = issues.map((t) => {
            // lazy suggestion calculation.
            const text = t.text;
            const suggestionsEx = this.getSuggestions(text);
            t.suggestionsEx = suggestionsEx;
            t.suggestions = suggestionsEx.map((s) => s.word);
            return t;
        });
        return withSugs;
    }
    /**
     * Check a Document for Validation Issues.
     * @param forceCheck - force a check even if the document would normally be excluded.
     * @returns the validation issues.
     */
    async checkDocumentAsync(forceCheck) {
        await this.prepare();
        return this.checkDocument(forceCheck);
    }
    /**
     * Check a Document for Validation Issues.
     *
     * Note: The validator must be prepared before calling this method.
     * @param forceCheck - force a check even if the document would normally be excluded.
     * @returns the validation issues.
     */
    checkDocument(forceCheck = false) {
        const timerDone = recordPerfTime(this.perfTiming, 'checkDocument');
        try {
            if (this.skipValidation)
                return [];
            assert(this._ready);
            assert(this._preparations, ERROR_NOT_PREPARED);
            const spellingIssues = forceCheck || this.shouldCheckDocument() ? [...this._checkParsedText(this._parse())] : [];
            const directiveIssues = this.checkDocumentDirectives();
            // console.log('Stats: %o', this._preparations.textValidator.lineValidator.dict.stats());
            const allIssues = [...spellingIssues, ...directiveIssues]
                .map(cleanValidationIssue)
                .sort((a, b) => a.offset - b.offset);
            return allIssues;
        }
        finally {
            timerDone();
        }
    }
    checkDocumentDirectives(forceCheck = false) {
        assert(this._ready);
        assert(this._preparations, ERROR_NOT_PREPARED);
        const validateDirectives = forceCheck || this.validateDirectives;
        if (!validateDirectives)
            return [];
        const document = this.document;
        const issueType = IssueType.directive;
        function toValidationIssue(dirIssue) {
            const { text, range, suggestions, suggestionsEx, message } = dirIssue;
            const offset = range[0];
            const pos = document.positionAt(offset);
            const line = document.getLine(pos.line);
            const issue = { text, offset, line, suggestions, suggestionsEx, message, issueType };
            return issue;
        }
        return [...validateInDocumentSettings(this.document.text, this._preparations.config)].map(toValidationIssue);
    }
    get document() {
        return this._document;
    }
    async updateDocumentText(text) {
        updateTextDocument(this._document, [{ text }]);
        await this._updatePrep();
    }
    /**
     * Get the calculated ranges of text that should be included in the spell checking.
     * @returns MatchRanges of text to include.
     */
    getCheckedTextRanges() {
        assert(this._preparations, ERROR_NOT_PREPARED);
        return this._preparations.includeRanges;
    }
    traceWord(word) {
        assert(this._preparations, ERROR_NOT_PREPARED);
        return traceWord(word, this._preparations.dictionary, this._preparations.config);
    }
    defaultParser() {
        return pipeSync(this.document.getLines(), opMap((line) => {
            const { text, offset } = line;
            const range = [offset, offset + text.length];
            return { text, range };
        }));
    }
    *_checkParsedText(parsedTexts) {
        assert(this._preparations, ERROR_NOT_PREPARED);
        const { maxNumberOfProblems = defaultMaxNumberOfProblems, maxDuplicateProblems = defaultMaxDuplicateProblems } = this._preparations.validateOptions;
        let numProblems = 0;
        const mapOfProblems = new Map();
        const stopMeasure = measurePerf('DocumentValidator._checkParsedText');
        for (const pText of parsedTexts) {
            for (const issue of this.check(pText)) {
                const { text } = issue;
                const n = (mapOfProblems.get(text) || 0) + 1;
                mapOfProblems.set(text, n);
                if (n > maxDuplicateProblems)
                    continue;
                yield issue;
                if (++numProblems >= maxNumberOfProblems)
                    return;
            }
        }
        stopMeasure();
    }
    addPossibleError(error) {
        if (!error)
            return;
        this.errors.push(toError(error));
    }
    _parse() {
        assert(this._preparations, ERROR_NOT_PREPARED);
        const parser = this._preparations.finalSettings.parserFn;
        if (typeof parser !== 'object')
            return this.defaultParser();
        return parser.parse(this.document.text, toFilePathOrHref(documentUriToURL(this.document.uri))).parsedTexts;
    }
    getSuggestions(text) {
        return this._suggestions.get(text);
    }
    genSuggestions(text) {
        assert(this._preparations, ERROR_NOT_PREPARED);
        const settings = this._preparations.docSettings;
        const dict = this._preparations.dictionary;
        const sugOptions = {
            compoundMethod: 0,
            numSuggestions: this.options.numSuggestions,
            includeTies: false,
            ignoreCase: !(settings.caseSensitive ?? false),
            timeout: settings.suggestionsTimeout,
            numChanges: settings.suggestionNumChanges,
        };
        const rawSuggestions = dict.suggest(text, sugOptions);
        return this.adjustSuggestions(text, rawSuggestions);
    }
    adjustSuggestions(text, rawSuggestions) {
        assert(this._preparations, ERROR_NOT_PREPARED);
        const settings = this._preparations.docSettings;
        const ignoreCase = !(settings.caseSensitive ?? false);
        const locale = this._preparations.config.language;
        const dict = this._preparations.dictionary;
        const sugsWithAlt = calcSuggestionAdjustedToToMatchCase(text, rawSuggestions.map(mapSug), locale, ignoreCase, dict);
        return sugsWithAlt.map(sanitizeSuggestion);
    }
    getFinalizedDocSettings() {
        assert(this._ready);
        assert(this._preparations, ERROR_NOT_PREPARED);
        return this._preparations.docSettings;
    }
    getConfigErrors() {
        const settings = this.getFinalizedDocSettings();
        const errors = extractImportErrors(settings);
        return errors.length ? errors : undefined;
    }
    getDictionaryErrors() {
        assert(this._ready);
        assert(this._preparations, ERROR_NOT_PREPARED);
        const { dictionary } = this._preparations;
        const errors = dictionary.dictionaries
            .map((dict) => [dict.name, dict.getErrors?.()])
            .filter((entry) => (entry[1] && entry[1].length > 0) || false);
        return errors.length ? new Map(errors) : undefined;
    }
    /**
     * Returns true if the final result of the configuration calculation results
     * in the document being enabled. Note: in some cases, checking the document
     * might still make sense, for example, the `@cspell/eslint-plugin` relies on
     * `eslint` configuration to make that determination.
     * @returns true if the document settings have resolved to be `enabled`
     */
    shouldCheckDocument() {
        assert(this._preparations, ERROR_NOT_PREPARED);
        return this._preparations.shouldCheck;
    }
    /**
     * Internal `cspell-lib` use.
     */
    _getPreparations() {
        return this._preparations;
    }
}
function sanitizeSuggestion(sug) {
    const { word, isPreferred, wordAdjustedToMatchCase } = sug;
    if (isPreferred && wordAdjustedToMatchCase)
        return { word, wordAdjustedToMatchCase, isPreferred };
    if (isPreferred)
        return { word, isPreferred };
    if (wordAdjustedToMatchCase)
        return { word, wordAdjustedToMatchCase };
    return { word };
}
async function searchForDocumentConfig(document, defaultConfig, pnpSettings) {
    const url = documentUriToURL(document.uri);
    try {
        return await searchForConfig(url, pnpSettings).then((s) => s || defaultConfig);
    }
    catch (e) {
        if (url.protocol !== 'file:')
            return defaultConfig;
        throw e;
    }
}
function mapSug(sug) {
    return { cost: 999, ...sug };
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
export async function shouldCheckDocument(doc, options, settings) {
    const errors = [];
    function addPossibleError(error) {
        if (!error)
            return undefined;
        errors.push(toError(error));
        return undefined;
    }
    async function shouldCheck() {
        const useSearchForConfig = (!options.noConfigSearch && !settings.noConfigSearch) || options.noConfigSearch === false;
        const pLocalConfig = options.configFile
            ? loadConfig(options.configFile, settings)
            : useSearchForConfig
                ? searchForDocumentConfig(doc, settings, settings)
                : undefined;
        const localConfig = (await catchPromiseError(pLocalConfig, addPossibleError)) || {};
        extractImportErrors(localConfig).forEach((e) => addPossibleError(e.error));
        const config = mergeSettings(settings, localConfig);
        const matcher = getGlobMatcherForExcluding(localConfig?.ignorePaths);
        // eslint-disable-next-line unicorn/prefer-regexp-test
        if (matcher.match(uriToFilePath(doc.uri))) {
            return { errors, shouldCheck: false, settings: localConfig, reason: 'Excluded by ignorePaths.' };
        }
        const docSettings = await determineTextDocumentSettings(doc, config);
        const shouldCheck = docSettings.enabled ?? true;
        const reason = shouldCheck ? undefined : 'Excluded by overrides or languageSettings.';
        return { errors, shouldCheck, settings: docSettings, reason };
    }
    return await shouldCheck();
}
export const __testing__ = {
    sanitizeSuggestion,
};
function recordPerfTime(timings, name) {
    const timer = createPerfTimer(name, (elapsed) => (timings[name] = elapsed));
    return () => timer.end();
}
function timePromise(timings, name, p) {
    return p.finally(recordPerfTime(timings, name));
}
//# sourceMappingURL=docValidator.js.map