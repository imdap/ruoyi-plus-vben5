export function settingsToValidateOptions(settings) {
    const opt = {
        allowCompoundWords: settings.allowCompoundWords,
        flagWords: settings.flagWords,
        ignoreCase: !(settings.caseSensitive ?? false),
        ignoreRandomStrings: settings.ignoreRandomStrings,
        ignoreRegExpList: settings.ignoreRegExpList,
        includeRegExpList: settings.includeRegExpList,
        maxDuplicateProblems: settings.maxDuplicateProblems,
        maxNumberOfProblems: settings.maxNumberOfProblems,
        minRandomLength: settings.minRandomLength,
        minWordLength: settings.minWordLength,
        numSuggestions: settings.numSuggestions,
        suggestionNumChanges: settings.suggestionNumChanges,
        suggestionsTimeout: settings.suggestionsTimeout,
        unknownWords: settings.unknownWords || 'report-all',
    };
    return opt;
}
//# sourceMappingURL=settingsToValidateOptions.js.map