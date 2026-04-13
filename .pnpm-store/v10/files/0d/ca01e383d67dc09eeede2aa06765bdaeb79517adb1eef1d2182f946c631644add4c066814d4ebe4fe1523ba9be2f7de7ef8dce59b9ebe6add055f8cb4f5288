import { cloneInto, copy0, copy1, skip } from '../util/clone.js';
/**
 * Sanitize settings for export by removing any internal only properties.
 *
 * @param settings - the input settings
 */
export function cloneSettingsForExport(settings) {
    const result = {};
    const handlers = getHandlers();
    cloneInto(settings, result, handlers);
    return result;
}
const handlers = {
    $schema: skip,
    __importRef: copyImportRefField,
    __imports: copyImportsField,
    source: copySourceField,
    id: skip,
    version: skip,
    allowCompoundWords: copy1,
    cache: skip,
    caseSensitive: copy1,
    description: skip,
    dictionaries: copy1,
    dictionaryDefinitions: copyDictionaryDefinitions,
    enabled: copy1,
    enabledLanguageIds: copy1,
    enableFiletypes: copy1,
    enabledFileTypes: copy1,
    enableGlobDot: copy1,
    engines: copy1,
    failFast: copy1,
    features: skip,
    files: copyGlobsSettingsFields,
    flagWords: copy1,
    gitignoreRoot: copy1,
    globRoot: copy1,
    ignorePaths: copyGlobsSettingsFields,
    ignoreRegExpList: copy1,
    ignoreWords: copy1,
    ignoreRandomStrings: copy1,
    import: skip,
    includeRegExpList: copy1,
    language: copy1,
    languageId: copy1,
    languageSettings: copyLanguageSettings,
    loadDefaultConfiguration: copy1,
    maxDuplicateProblems: copy1,
    maxFileSize: copy1,
    maxNumberOfProblems: copy1,
    minWordLength: copy1,
    minRandomLength: copy1,
    name: skip,
    noConfigSearch: copy1,
    noSuggestDictionaries: copy1,
    numSuggestions: copy1,
    overrides: copyOverrides,
    patterns: copyPatternsField,
    pnpFiles: skip,
    readonly: skip,
    reporters: skip,
    showStatus: copy1,
    spellCheckDelayMs: copy1,
    substitutionDefinitions: copy1,
    substitutions: copy1,
    suggestionNumChanges: copy1,
    suggestionsTimeout: copy1,
    suggestWords: copy1,
    unknownWords: copy1,
    useGitignore: copy1,
    usePnP: skip,
    userWords: copy1,
    validateDirectives: copy1,
    vfs: skip,
    words: copy1,
    // Experimental
    parser: skip,
};
function getHandlers() {
    return handlers;
}
function copyImportRefField(src, dst, key) {
    const ref = src[key];
    if (!ref)
        return;
    dst[key] = copyImportFileRef(ref);
}
function copyImportsField(src, dst, key) {
    const imports = src[key];
    if (!imports)
        return;
    dst[key] = new Map([...imports.entries()].map(([k, v]) => [k, copyImportFileRef(v)]));
}
function copyImportFileRef(src) {
    const ref = { filename: src.filename };
    copy0(src, ref, 'error');
    return ref;
}
function copySourceField(src, dst, key) {
    if (!src[key])
        return;
    dst[key] = copySource(src[key]);
}
function copySource(src) {
    const source = { name: src.name };
    cpy(src, source, 'filename');
    return source;
}
function copyGlobsSettingsFields(src, dst, key) {
    const globs = src[key];
    if (!globs)
        return;
    dst[key] = copyGlobOrGlobs(globs);
}
function copyGlobsOverrideFields(src, dst, key) {
    const globs = src[key];
    if (!globs)
        return;
    dst[key] = copyGlobOrGlobs(globs);
}
function copyGlobOrGlobs(globOrGlobs) {
    if (Array.isArray(globOrGlobs)) {
        return globOrGlobs.map(copyGlob);
    }
    return copyGlob(globOrGlobs);
}
function copyGlob(glob) {
    if (typeof glob === 'string') {
        return glob;
    }
    const g = { glob: glob.glob };
    cpy(glob, g, 'root');
    return g;
}
function copyDictionaryDefinitions(src, dst, key) {
    const defs = src[key];
    if (!defs)
        return;
    dst[key] = defs.map(copyDictionaryDefinition);
}
function copyDictionaryDefinition(src) {
    const def = { name: src.name };
    cpy(src, def, 'path');
    cpy(src, def, 'type');
    cpy(src, def, 'description');
    return def;
}
function copyLanguageSettings(src, dst, key) {
    const langSettings = src[key];
    if (!langSettings)
        return;
    dst[key] = langSettings.map((src) => {
        const dst = { languageId: src.languageId };
        copyLanguageSetting(src, dst);
        return dst;
    });
}
function cpy(src, dst, key) {
    const value = src[key];
    if (value === undefined)
        return;
    dst[key] = value;
}
const LanguageSettingsHandlers = {
    id: cpy,
    locale: cpy,
    local: cpy,
    allowCompoundWords: copy1,
    caseSensitive: copy1,
    description: skip,
    dictionaries: copy1,
    dictionaryDefinitions: copyDictionaryDefinitions,
    enabled: copy1,
    flagWords: copy1,
    ignoreRegExpList: copy1,
    ignoreWords: copy1,
    includeRegExpList: copy1,
    languageId: copy1,
    name: skip,
    noSuggestDictionaries: copy1,
    patterns: copyPatternsField,
    substitutionDefinitions: copy1,
    substitutions: copy1,
    suggestWords: copy1,
    unknownWords: copy1,
    words: copy1,
    // Experimental
    parser: skip,
};
function copyLanguageSetting(src, dst) {
    cloneInto(src, dst, LanguageSettingsHandlers);
}
const RegExpPatternDefinitionHandlers = {
    name: cpy,
    pattern: copy1,
    description: cpy,
};
function copyPatternsField(src, dst, key) {
    const patterns = src[key];
    if (!patterns)
        return;
    dst[key] = patterns.map((p) => {
        const dst = { pattern: p.pattern, name: p.name };
        copyRegExpPatternDefinition(p, dst);
        return dst;
    });
}
function copyRegExpPatternDefinition(src, dst) {
    cloneInto(src, dst, RegExpPatternDefinitionHandlers);
}
const OverridesHandlers = {
    id: copy1,
    allowCompoundWords: copy1,
    caseSensitive: copy1,
    description: copy1,
    dictionaries: copy1,
    dictionaryDefinitions: copyDictionaryDefinitions,
    enabled: copy1,
    enabledFileTypes: copy1,
    enabledLanguageIds: copy1,
    enableFiletypes: copy1,
    filename: copyGlobsOverrideFields,
    flagWords: copy1,
    ignoreRandomStrings: copy1,
    ignoreRegExpList: copy1,
    ignoreWords: copy1,
    includeRegExpList: copy1,
    language: copy1,
    languageId: copy1,
    languageSettings: copyLanguageSettings,
    loadDefaultConfiguration: copy1,
    maxDuplicateProblems: copy1,
    maxFileSize: copy1,
    maxNumberOfProblems: copy1,
    minRandomLength: copy1,
    minWordLength: copy1,
    name: skip,
    noSuggestDictionaries: copy1,
    numSuggestions: copy1,
    patterns: copyPatternsField,
    pnpFiles: skip,
    substitutionDefinitions: copy1,
    substitutions: copy1,
    suggestionNumChanges: copy1,
    suggestionsTimeout: copy1,
    suggestWords: copy1,
    unknownWords: copy1,
    usePnP: skip,
    words: copy1,
    parser: skip,
};
function copyOverrides(src, dst, key) {
    const overrides = src[key];
    if (!overrides)
        return;
    dst[key] = overrides.map((src) => {
        const dst = {};
        cloneInto(src, dst, OverridesHandlers);
        return dst;
    });
}
//# sourceMappingURL=sanitizeSettings.js.map