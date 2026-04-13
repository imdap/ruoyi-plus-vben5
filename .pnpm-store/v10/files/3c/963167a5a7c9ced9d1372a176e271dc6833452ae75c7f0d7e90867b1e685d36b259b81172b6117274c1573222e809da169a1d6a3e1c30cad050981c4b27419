//#region src/configFields.ts
const ConfigFields = {
	allowCompoundWords: "allowCompoundWords",
	cache: "cache",
	caseSensitive: "caseSensitive",
	description: "description",
	dictionaries: "dictionaries",
	dictionaryDefinitions: "dictionaryDefinitions",
	enabled: "enabled",
	enabledLanguageIds: "enabledLanguageIds",
	enableFiletypes: "enableFiletypes",
	enabledFileTypes: "enabledFileTypes",
	enableGlobDot: "enableGlobDot",
	engines: "engines",
	failFast: "failFast",
	features: "features",
	files: "files",
	flagWords: "flagWords",
	gitignoreRoot: "gitignoreRoot",
	globRoot: "globRoot",
	ignorePaths: "ignorePaths",
	ignoreRegExpList: "ignoreRegExpList",
	ignoreWords: "ignoreWords",
	ignoreRandomStrings: "ignoreRandomStrings",
	import: "import",
	includeRegExpList: "includeRegExpList",
	language: "language",
	languageId: "languageId",
	languageSettings: "languageSettings",
	loadDefaultConfiguration: "loadDefaultConfiguration",
	maxDuplicateProblems: "maxDuplicateProblems",
	maxFileSize: "maxFileSize",
	maxNumberOfProblems: "maxNumberOfProblems",
	minWordLength: "minWordLength",
	minRandomLength: "minRandomLength",
	name: "name",
	noConfigSearch: "noConfigSearch",
	noSuggestDictionaries: "noSuggestDictionaries",
	numSuggestions: "numSuggestions",
	overrides: "overrides",
	patterns: "patterns",
	pnpFiles: "pnpFiles",
	readonly: "readonly",
	reporters: "reporters",
	showStatus: "showStatus",
	spellCheckDelayMs: "spellCheckDelayMs",
	substitutionDefinitions: "substitutionDefinitions",
	substitutions: "substitutions",
	suggestionNumChanges: "suggestionNumChanges",
	suggestionsTimeout: "suggestionsTimeout",
	suggestWords: "suggestWords",
	unknownWords: "unknownWords",
	useGitignore: "useGitignore",
	usePnP: "usePnP",
	userWords: "userWords",
	validateDirectives: "validateDirectives",
	vfs: "vfs",
	words: "words",
	parser: "parser"
};
//#endregion
//#region src/CSpellReporter.ts
let IssueType = /* @__PURE__ */ function(IssueType) {
	IssueType[IssueType["spelling"] = 0] = "spelling";
	IssueType[IssueType["directive"] = 1] = "directive";
	return IssueType;
}({});
const MessageTypes = {
	Debug: "Debug",
	Info: "Info",
	Warning: "Warning"
};
const unknownWordsChoices = {
	ReportAll: "report-all",
	ReportSimple: "report-simple",
	ReportCommonTypos: "report-common-typos",
	ReportFlagged: "report-flagged"
};
//#endregion
//#region src/defaultConfigSettings.ts
const defaultCSpellSettings = {
	ignoreRandomStrings: true,
	minRandomLength: 40
};
//#endregion
//#region src/defineConfig.ts
function defineConfig(config) {
	return config;
}
//#endregion
//#region src/merge.ts
const mArr = mergeAppendArrays;
const mRec = mergeRecords;
const exKV = extractKeyValues;
const mergeDefinitionFunctions = {
	$schema: (key) => recKV(key, void 0),
	allowCompoundWords: (key, settings) => recKV(key, lastValue(exKV(key, settings))),
	cache: (key, settings) => recKV(key, mRec(exKV(key, settings))),
	caseSensitive: (key, settings) => recKV(key, lastValue(exKV(key, settings))),
	description: (key, settings) => recKV(key, lastValue(exKV(key, settings))),
	dictionaries: (key, settings) => recKV(key, mArr(exKV(key, settings))),
	dictionaryDefinitions: (key, settings) => recKV(key, mArr(exKV(key, settings))),
	enabled: (key, settings) => recKV(key, lastValue(exKV(key, settings))),
	enabledFileTypes: (key, settings) => recKV(key, mRec(exKV(key, settings))),
	enabledLanguageIds: (key, settings) => recKV(key, mArr(exKV(key, settings))),
	enableFiletypes: (key, settings) => recKV(key, mArr(exKV(key, settings))),
	enableGlobDot: (key, settings) => recKV(key, lastValue(exKV(key, settings))),
	engines: (key, settings) => recKV(key, mRec(exKV(key, settings))),
	failFast: (key, settings) => recKV(key, lastValue(exKV(key, settings))),
	features: (key, settings) => recKV(key, mRec(exKV(key, settings))),
	files: (key, settings) => recKV(key, mArr(exKV(key, settings))),
	flagWords: (key, settings) => recKV(key, mArr(exKV(key, settings))),
	gitignoreRoot: (key, settings) => recKV(key, lastValue(exKV(key, settings))),
	globRoot: (key, settings) => recKV(key, lastValue(exKV(key, settings))),
	id: (key, settings) => recKV(key, lastValue(exKV(key, settings))),
	ignorePaths: (key, settings) => recKV(key, mArr(exKV(key, settings))),
	ignoreRandomStrings: (key, settings) => recKV(key, lastValue(exKV(key, settings))),
	ignoreRegExpList: (key, settings) => recKV(key, mArr(exKV(key, settings))),
	ignoreWords: (key, settings) => recKV(key, mArr(exKV(key, settings))),
	import: (key, settings) => recKV(key, mArr(exKV(key, settings).map(strArrToArr))),
	includeRegExpList: (key, settings) => recKV(key, mArr(exKV(key, settings))),
	language: (key, settings) => recKV(key, lastValue(exKV(key, settings))),
	languageId: (key, settings) => recKV(key, lastValue(exKV(key, settings))),
	languageSettings: (key, settings) => recKV(key, mArr(exKV(key, settings))),
	loadDefaultConfiguration: (key, settings) => recKV(key, lastValue(exKV(key, settings))),
	maxDuplicateProblems: (key, settings) => recKV(key, lastValue(exKV(key, settings))),
	maxFileSize: (key, settings) => recKV(key, lastValue(exKV(key, settings))),
	maxNumberOfProblems: (key, settings) => recKV(key, lastValue(exKV(key, settings))),
	minRandomLength: (key, settings) => recKV(key, lastValue(exKV(key, settings))),
	minWordLength: (key, settings) => recKV(key, lastValue(exKV(key, settings))),
	name: (key, settings) => recKV(key, lastValue(exKV(key, settings))),
	noConfigSearch: (key, settings) => recKV(key, lastValue(exKV(key, settings))),
	noSuggestDictionaries: (key, settings) => recKV(key, mArr(exKV(key, settings))),
	numSuggestions: (key, settings) => recKV(key, lastValue(exKV(key, settings))),
	overrides: (key, settings) => recKV(key, mArr(exKV(key, settings))),
	parser: (key, settings) => recKV(key, lastValue(exKV(key, settings))),
	patterns: (key, settings) => recKV(key, mArr(exKV(key, settings))),
	pnpFiles: (key, settings) => recKV(key, mArr(exKV(key, settings))),
	readonly: (key, settings) => recKV(key, orValue(exKV(key, settings))),
	reporters: (key, settings) => recKV(key, mArr(exKV(key, settings))),
	showStatus: (key, settings) => recKV(key, lastValue(exKV(key, settings))),
	spellCheckDelayMs: (key, settings) => recKV(key, lastValue(exKV(key, settings))),
	substitutionDefinitions: (key, settings) => recKV(key, mArr(exKV(key, settings))),
	substitutions: (key, settings) => recKV(key, mArr(exKV(key, settings))),
	suggestionNumChanges: (key, settings) => recKV(key, lastValue(exKV(key, settings))),
	suggestionsTimeout: (key, settings) => recKV(key, lastValue(exKV(key, settings))),
	suggestWords: (key, settings) => recKV(key, mArr(exKV(key, settings))),
	unknownWords: (key, settings) => recKV(key, lastValue(exKV(key, settings))),
	useGitignore: (key, settings) => recKV(key, lastValue(exKV(key, settings))),
	usePnP: (key, settings) => recKV(key, lastValue(exKV(key, settings))),
	userWords: (key, settings) => recKV(key, mArr(exKV(key, settings))),
	validateDirectives: (key, settings) => recKV(key, lastValue(exKV(key, settings))),
	version: (key, settings) => recKV(key, lastValue(exKV(key, settings))),
	vfs: (key, settings) => recKV(key, mRec(exKV(key, settings))),
	words: (key, settings) => recKV(key, mArr(exKV(key, settings)))
};
function makeMergeFn(key) {
	const fn = mergeDefinitionFunctions[key];
	return (settings) => fn(key, settings);
}
const mergeIndividualSettingsFns = Object.keys(mergeDefinitionFunctions).map((k) => makeMergeFn(k));
function mergeConfig(first, ...configs) {
	const settings = [first, ...configs].flat();
	if (settings.length === 1) return settings[0];
	const result = Object.assign(Object.create(null), ...settings);
	Object.assign(result, ...mergeIndividualSettingsFns.map((fn) => fn(settings)));
	return result;
}
function orValue(values) {
	let v = void 0;
	for (const value of values) v ||= value;
	return v;
}
function lastValue(values) {
	for (let i = values.length - 1; i >= 0; i--) {
		const value = values[i];
		if (value !== void 0) return value;
	}
}
function strArrToArr(value) {
	return Array.isArray(value) ? value : [value];
}
function mergeAppendArrays(arrays) {
	const values = arrays.filter((a) => !!a);
	if (values.length === 1) return values[0];
	const merged = values.flat();
	return merged.length ? merged : void 0;
}
function mergeRecords(records) {
	const values = records.filter((r) => !!r);
	if (!values.length) return void 0;
	if (values.length === 1) return values[0];
	return Object.assign(Object.create(null), ...values);
}
function extractKeyValues(key, records) {
	return records.filter((r) => !!r).map((r) => r[key]).filter((v) => v !== void 0);
}
function recKV(key, value) {
	if (value === void 0) return void 0;
	return { [key]: value };
}
//#endregion
export { ConfigFields, IssueType, MessageTypes, defaultCSpellSettings, defineConfig, mergeConfig, unknownWordsChoices };

//# sourceMappingURL=index.mjs.map