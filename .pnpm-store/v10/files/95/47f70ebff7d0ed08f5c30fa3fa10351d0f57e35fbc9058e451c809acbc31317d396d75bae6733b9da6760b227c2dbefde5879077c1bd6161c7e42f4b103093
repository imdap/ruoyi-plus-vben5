import { satisfiesCSpellConfigFile } from 'cspell-config-lib';
import { isBinaryDoc } from './Document/isBinaryDoc.js';
import { documentToTextDocument, resolveDocument } from './Document/resolveDocument.js';
import { createTextDocument } from './Models/TextDocument.js';
import { toValidationIssueRPC } from './Models/ValidationIssue.js';
import { createPerfTimer } from './perf/index.js';
import { determineTextDocumentSettings } from './textValidation/determineTextDocumentSettings.js';
import { DocumentValidator } from './textValidation/index.js';
import { isError } from './util/errors.js';
import { toUri } from './util/Uri.js';
/**
 * Spell Check a file
 * @param file - absolute path to file to read and check.
 * @param options - options to control checking
 * @param settings - default settings to use.
 */
export function spellCheckFile(file, options, settingsOrConfigFile) {
    const doc = {
        uri: toUri(file).toString(),
    };
    return spellCheckDocument(doc, options, settingsOrConfigFile);
}
/**
 * Spell Check a Document.
 * @param document - document to be checked. If `document.text` is `undefined` the file will be loaded
 * @param options - options to control checking
 * @param settings - default settings to use.
 */
export async function spellCheckDocument(document, options, settingsOrConfigFile) {
    const settingsUsed = satisfiesCSpellConfigFile(settingsOrConfigFile)
        ? settingsOrConfigFile.settings
        : settingsOrConfigFile;
    if (isBinaryDoc(document)) {
        return {
            document,
            options,
            settingsUsed,
            localConfigFilepath: undefined,
            issues: [],
            checked: false,
            errors: undefined,
        };
    }
    try {
        const timer = createPerfTimer('loadFile');
        const doc = await resolveDocument(document).finally(() => timer.end());
        if (isBinaryDoc(doc)) {
            return {
                document,
                options,
                settingsUsed,
                localConfigFilepath: undefined,
                issues: [],
                checked: false,
                errors: undefined,
            };
        }
        const result = await spellCheckFullDocument(doc, options, settingsOrConfigFile);
        const perf = result.perf || {};
        perf.loadTimeMs = timer.elapsed;
        result.perf = perf;
        return result;
    }
    catch (e) {
        const errors = isError(e) ? [e] : [];
        return {
            document,
            options,
            settingsUsed,
            localConfigFilepath: undefined,
            issues: [],
            checked: false,
            errors,
        };
    }
}
/**
 * Spell Check a Document.
 * @param document - document to be checked. If `document.text` is `undefined` the file will be loaded
 * @param options - options to control checking
 * @param settings - default settings to use.
 */
export async function spellCheckDocumentRPC(document, options, settingsOrConfigFile) {
    const { issues, checked, errors, configErrors, dictionaryErrors, perf } = await spellCheckDocument(document, options, settingsOrConfigFile);
    const result = {
        document: { uri: document.uri },
        checked,
    };
    if (issues.length) {
        result.issues = issues.map(toValidationIssueRPC);
    }
    if (errors?.length) {
        result.errors = errors;
    }
    if (configErrors?.length) {
        result.configErrors = configErrors;
    }
    if (dictionaryErrors?.size) {
        result.dictionaryErrors = dictionaryErrors;
    }
    if (perf && options.measurePerf) {
        result.perf = perf;
    }
    return result;
}
async function spellCheckFullDocument(document, options, settingsOrConfigFile) {
    // if (options.skipValidation) {
    //     return {
    //         document,
    //         options,
    //         settingsUsed: settings,
    //         localConfigFilepath: undefined,
    //         issues: [],
    //         checked: true,
    //         errors: undefined,
    //     };
    // }
    const perf = {};
    const timer = createPerfTimer('spellCheckFullDocument', (elapsed) => (perf.totalTimeMs = elapsed));
    const timerCheck = createPerfTimer('check', (elapsed) => (perf.checkTimeMs = elapsed));
    const timerPrepare = createPerfTimer('prepare', (elapsed) => (perf.prepareTimeMs = elapsed));
    const doc = documentToTextDocument(document);
    const docValOptions = options;
    const docValidator = await DocumentValidator.create(doc, docValOptions, settingsOrConfigFile).finally(() => timerPrepare.end());
    Object.assign(perf, Object.fromEntries(Object.entries(docValidator.perfTiming).map(([k, v]) => ['_' + k, v])));
    const prep = docValidator._getPreparations();
    if (docValidator.errors.length) {
        const settingsUsed = prep?.localConfig ||
            (satisfiesCSpellConfigFile(settingsOrConfigFile) ? settingsOrConfigFile.settings : settingsOrConfigFile);
        return {
            document,
            options,
            settingsUsed,
            localConfigFilepath: prep?.localConfigFilepath,
            issues: [],
            checked: false,
            errors: docValidator.errors,
            configErrors: docValidator.getConfigErrors(),
            dictionaryErrors: docValidator.getDictionaryErrors(),
            perf,
        };
    }
    timerCheck.start();
    const issues = docValidator.checkDocument();
    timerCheck.end();
    Object.assign(perf, Object.fromEntries(Object.entries(docValidator.perfTiming).map(([k, v]) => ['_' + k, v])));
    const result = {
        document,
        options,
        settingsUsed: docValidator.getFinalizedDocSettings(),
        localConfigFilepath: prep?.localConfigFilepath,
        issues,
        checked: docValidator.shouldCheckDocument(),
        errors: undefined,
        configErrors: docValidator.getConfigErrors(),
        dictionaryErrors: docValidator.getDictionaryErrors(),
        perf,
    };
    timer.end();
    return result;
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
export async function determineFinalDocumentSettings(document, settings) {
    const doc = createTextDocument({
        uri: document.uri,
        content: document.text,
        languageId: document.languageId,
        locale: document.locale,
    });
    return {
        document,
        settings: await determineTextDocumentSettings(doc, settings),
    };
}
//# sourceMappingURL=spellCheckFile.js.map