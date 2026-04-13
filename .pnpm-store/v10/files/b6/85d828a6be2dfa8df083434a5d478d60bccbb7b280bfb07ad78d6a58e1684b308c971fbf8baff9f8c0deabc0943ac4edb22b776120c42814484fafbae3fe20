import { IssueType } from '@cspell/cspell-types';
import { createTextDocument } from '../Models/TextDocument.js';
import * as Settings from '../Settings/index.js';
import { validateInDocumentSettings } from '../Settings/InDocSettings.js';
import { CompoundWordsMethod, getDictionaryInternal } from '../SpellingDictionary/index.js';
import { settingsToValidateOptions } from './settingsToValidateOptions.js';
import { validateText as validateFullText } from './textValidator.js';
export const diagSource = 'cSpell Checker';
/**
 * @deprecated
 * @deprecationMessage Use spellCheckDocument
 */
export async function validateText(text, settings, options = {}) {
    const finalSettings = Settings.finalizeSettings(settings);
    const dict = await getDictionaryInternal(finalSettings);
    const spellingIssues = [...validateFullText(text, dict, settingsToValidateOptions(finalSettings))];
    const validationIssues = options.validateDirectives || finalSettings.validateDirectives
        ? validateInDocumentSettings(text, settings)
        : [];
    const issues = [...spellingIssues, ...mapValidationIssues(text, validationIssues)];
    if (!options.generateSuggestions) {
        return issues;
    }
    const sugOptions = {
        numSuggestions: options.numSuggestions,
        compoundMethod: CompoundWordsMethod.NONE,
        includeTies: false,
        ignoreCase: !(settings.caseSensitive ?? false),
        timeout: settings.suggestionsTimeout,
        numChanges: settings.suggestionNumChanges,
    };
    const withSugs = issues.map((t) => {
        const text = t.text;
        const suggestionsEx = dict
            .suggest(text, sugOptions)
            .map(({ word, isPreferred }) => (isPreferred ? { word, isPreferred } : { word }));
        t.suggestions = suggestionsEx.map((s) => s.word);
        t.suggestionsEx = suggestionsEx;
        return t;
    });
    return withSugs;
}
function mapValidationIssues(text, valIssues) {
    const issues = [...valIssues];
    if (!issues.length)
        return [];
    const document = createTextDocument({ uri: '', content: text });
    const issueType = IssueType.directive;
    function toValidationIssue(dirIssue) {
        const { text, range, suggestions, suggestionsEx, message } = dirIssue;
        const offset = range[0];
        const pos = document.positionAt(offset);
        const line = document.getLine(pos.line);
        const issue = { text, offset, line, suggestions, suggestionsEx, message, issueType };
        return issue;
    }
    return issues.map(toValidationIssue);
}
//# sourceMappingURL=validator.js.map