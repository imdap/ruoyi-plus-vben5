import { C as ApplicationError, S as width, T as console, _ as padLeft, a as parseApplicationFeatureFlags, b as pruneAnsiTextEnd, c as listDictionaries, d as validateUnitSize, f as unindent, g as tableToLines, i as lint, l as ReportChoicesAll, m as npmPackage, n as checkText, o as suggestions, p as DEFAULT_CACHE_LOCATION, r as createInit, s as trace, t as IncludeExcludeFlag, u as cvtLinterCliCommandOptionsToLinterCliOptions, v as padWidth, w as CheckFailed, x as pruneAnsiTextStart, y as ansiWidth } from "./application-CpRYrn67.js";
import { Link } from "cspell-lib";
import chalk from "chalk";
import * as iPath from "node:path";
import { Option, program } from "commander";
import { satisfies } from "semver";
//#region src/commandCheck.ts
function commandCheck(prog) {
	return prog.command("check <files...>").description("Spell check file(s) and display the result. The full file is displayed in color.").option("-c, --config <cspell.json>", "Configuration file to use.  By default cspell looks for cspell.json in the current directory.").option("--validate-directives", "Validate in-document CSpell directives.").option("--no-validate-directives", "Do not validate in-document CSpell directives.").option("--no-color", "Turn off color.").option("--color", "Force color").option("--no-exit-code", "Do not return an exit code if issues are found.").addOption(new Option("--default-configuration", "Load the default configuration and dictionaries.").hideHelp()).addOption(new Option("--no-default-configuration", "Do not load the default configuration and dictionaries.")).action(async (files, options) => {
		const useExitCode = options.exitCode ?? true;
		parseApplicationFeatureFlags(options.flag);
		let issueCount = 0;
		for (const filename of files) {
			console.log(chalk.yellowBright(`Check file: ${filename}`));
			console.log();
			try {
				const result = await checkText(filename, options);
				for (const item of result.items) {
					const t = (item.flagIE === IncludeExcludeFlag.EXCLUDE ? chalk.gray : item.isError ? chalk.red : chalk.whiteBright)(item.text);
					process.stdout.write(t);
					issueCount += item.isError ? 1 : 0;
				}
				console.log();
			} catch {
				console.error(`File not found "${filename}"`);
				throw new CheckFailed("File not found", 1);
			}
			console.log();
		}
		if (issueCount) throw new CheckFailed("Issues found", useExitCode ?? true ? 1 : 0);
	});
}
//#endregion
//#region src/commandHelpers.ts
/**
* Collects string values into an array.
* @param value the new value(s) to collect.
* @param previous the previous values.
* @returns the new values appended to the previous values.
*/
function collect$1(value, previous) {
	const values = Array.isArray(value) ? value : [value];
	return previous ? [...previous, ...values] : values;
}
/**
* Collects string values into an array, prefixing each value with the given prefix.
* @param prefix the prefix to add to each value.
* @returns a function that collects values with the given prefix.
*/
function prefixCollect(prefix) {
	return (value, previous) => {
		const values = (Array.isArray(value) ? value : [value]).map((v) => prefix + v);
		return previous ? [...previous, ...values] : values;
	};
}
/**
* Create Option - a helper function to create a commander option.
* @param name - the name of the option
* @param description - the description of the option
* @param parseArg - optional function to parse the argument
* @param defaultValue - optional default value
* @returns CommanderOption
*/
function crOpt(name, description, parseArg, defaultValue) {
	const option = new Option(name, description);
	if (parseArg) option.argParser(parseArg);
	if (defaultValue !== void 0) option.default(defaultValue);
	return option;
}
//#endregion
//#region src/emitters/helpers.ts
function trimMidPath(s, w, sep) {
	if (s.length <= w) return s;
	const parts = s.split(sep);
	if (parts[parts.length - 1].length > w) return trimMid(s, w);
	function join(left, right) {
		return [
			...parts.slice(0, left),
			"…",
			...parts.slice(right)
		].join(sep);
	}
	let left = 0, right = parts.length, last = "";
	for (let i = 0; i < parts.length; ++i) {
		const incLeft = i & 1 ? 1 : 0;
		const incRight = incLeft ? 0 : -1;
		const next = join(left + incLeft, right + incRight);
		if (next.length > w) break;
		left += incLeft;
		right += incRight;
		last = next;
	}
	for (let i = left + 1; i < right; ++i) {
		const next = join(i, right);
		if (next.length > w) break;
		last = next;
	}
	for (let i = right - 1; i > left; --i) {
		const next = join(left, i);
		if (next.length > w) break;
		last = next;
	}
	return last || trimMid(s, w);
}
function trimMid(s, w) {
	s = s.trim();
	if (s.length <= w) return s;
	const l = Math.floor((w - 1) / 2);
	const r = Math.ceil((w - 1) / 2);
	return s.slice(0, l) + "…" + s.slice(-r);
}
function formatDictionaryLocation(dictSource, maxWidth, { cwd, dictionaryPathFormat: format, iPath }) {
	let relPath = cwd ? iPath.relative(cwd, dictSource) : dictSource;
	const idxNodeModule = relPath.lastIndexOf("node_modules");
	const isNodeModule = idxNodeModule >= 0;
	if (format === "hide") return "";
	if (format === "short") return (isNodeModule ? "[node_modules]/" : relPath.startsWith(".." + iPath.sep + "..") ? "…/" : relPath.startsWith(".." + iPath.sep) ? "../" : "") + iPath.basename(dictSource);
	if (format === "full") return dictSource;
	relPath = isNodeModule ? relPath.slice(idxNodeModule) : relPath;
	return trimMidPath(relPath.length < dictSource.length ? relPath : dictSource, maxWidth, iPath.sep);
}
//#endregion
//#region src/emitters/dictionaryListEmitter.ts
const maxWidth$1 = 120;
function emitListDictionariesResults(results, options) {
	const report = calcListDictsResultsReport(results, options);
	console.log(report.table);
	if (report.errors) {
		console.error("Errors:");
		console.error(report.errors);
	}
}
function calcListDictsResultsReport(results, options) {
	if (options.color === true) chalk.level = 2;
	else if (options.color === false) chalk.level = 0;
	const col = new Intl.Collator();
	results.sort((a, b) => col.compare(a.name, b.name));
	return {
		table: tableToLines({
			header: calcHeaders(options),
			rows: results.map((r) => dictTableRowToTableRow(emitDictResult(r, options))),
			terminalWidth: options.lineWidth || process.stdout.columns || maxWidth$1,
			deliminator: " ",
			maxColumnWidths: {
				locales: 12,
				fileTypes: 40
			}
		}).map((line) => line.trimEnd()).join("\n"),
		errors: ""
	};
}
function calcHeaders(options) {
	const showLocation = options.dictionaryPathFormat !== "hide" && (options.options.showLocation ?? true);
	const showLocales = options.options.showLocales ?? true;
	const showFileTypes = options.options.showFileTypes ?? true;
	const headers = [["name", "Dictionary"]];
	showLocales && headers.push(["locales", "Locales"]);
	showFileTypes && headers.push(["fileTypes", "File Types"]);
	showLocation && headers.push(["location", "Dictionary Location"]);
	return headers;
}
function emitDictResult(r, options) {
	const a = (r.blocked ? chalk.redBright("!") : "") + (r.enabled ? "*" : " ");
	const dictColor = r.enabled ? chalk.yellowBright : chalk.rgb(200, 128, 50);
	const n = (width) => dictColor(pruneAnsiTextEnd(r.name, width && width - ansiWidth(a)) + a);
	const c = colorize$1(chalk.white);
	const locales = (width) => c(pruneAnsiTextEnd(r.locales?.join(",") || "", width));
	const fileTypes = (width) => c(pruneAnsiTextEnd(r.fileTypes?.join(",") || "", width));
	if (!r.path) return {
		name: n,
		location: c(r.inline?.join(", ") || ""),
		locales,
		fileTypes
	};
	return {
		name: n,
		location: (widthSrc) => c(r.path && pruneAnsiTextStart(formatDictionaryLocation(r.path, widthSrc ?? maxWidth$1, {
			iPath,
			...options
		}), widthSrc ?? maxWidth$1) || ""),
		locales,
		fileTypes
	};
}
function dictTableRowToTableRow(row) {
	return Object.fromEntries(Object.entries(row));
}
function colorize$1(fn) {
	return (s) => s ? fn(s) : "";
}
//#endregion
//#region src/emitters/DictionaryPathFormat.ts
const formats = {
	full: true,
	hide: true,
	long: true,
	short: true
};
function isDictionaryPathFormat(value) {
	if (!value || typeof value !== "string") return false;
	return value in formats;
}
//#endregion
//#region src/util/canUseColor.ts
function canUseColor(colorOption) {
	if (colorOption !== void 0) return colorOption;
	if (!("NO_COLOR" in process.env)) return void 0;
	if (!process.env["NO_COLOR"] || process.env["NO_COLOR"] === "false") return void 0;
	return false;
}
//#endregion
//#region src/commandDictionaries.ts
function commandDictionaries(prog) {
	return prog.command("dictionaries").description(`List dictionaries`).option("-c, --config <cspell.json>", "Configuration file to use.  By default cspell looks for cspell.json in the current directory.").addOption(crOpt("--path-format <format>", "Configure how to display the dictionary path.").choices([
		"hide",
		"short",
		"long",
		"full"
	]).default("long", "Display most of the path.")).addOption(crOpt("--enabled", "Show only enabled dictionaries.").default(void 0)).addOption(crOpt("--no-enabled", "Do not show enabled dictionaries.")).option("--locale <locale>", "Set language locales. i.e. \"en,fr\" for English and French, or \"en-GB\" for British English.").option("--file-type <fileType>", "File type to use. i.e. \"html\", \"golang\", or \"javascript\".").option("--no-show-location", "Do not show the location of the dictionary.").option("--show-file-types", "Show the file types supported by the dictionary.", false).addOption(crOpt("--no-show-file-types", "Do not show the file types supported by the dictionary.").hideHelp()).option("--show-locales", "Show the language locales supported by the dictionary.", false).addOption(crOpt("--no-show-locales", "Do not show the locales supported by the dictionary.").hideHelp()).addOption(crOpt("--color", "Force color.").default(void 0)).addOption(crOpt("--no-color", "Turn off color.").default(void 0)).addOption(crOpt("--default-configuration", "Load the default configuration and dictionaries.").hideHelp()).addOption(crOpt("--no-default-configuration", "Do not load the default configuration and dictionaries.")).action(async (options) => {
		const dictionaryPathFormat = isDictionaryPathFormat(options.pathFormat) ? options.pathFormat : "long";
		const useColor = canUseColor(options.color);
		emitListDictionariesResults(await listDictionaries(options), {
			cwd: process.cwd(),
			dictionaryPathFormat,
			color: useColor,
			options
		});
	});
}
//#endregion
//#region src/commandInit.ts
function commandInit(prog) {
	return prog.command("init").description("Initialize a CSpell configuration file.").addOption(crOpt("-c, --config <path>", "Path to the CSpell configuration file. Conflicts with --output and --format.").conflicts(["output", "format"])).option("-o, --output <path>", "Define where to write file.").addOption(crOpt("--format <format>", "Define the format of the file.").choices([
		"yaml",
		"yml",
		"json",
		"jsonc"
	]).default("yaml")).option("--import <path|package>", "Import a configuration file or dictionary package.", collect$1).option("--locale <locale>", "Define the locale to use when spell checking (e.g., en, en-US, de).").addOption(crOpt("--dictionary <dictionary>", "Enable a dictionary. Can be used multiple times.", collect$1).default(void 0)).addOption(crOpt("--comments", "Add comments to the config file.").default(void 0).hideHelp()).option("--no-comments", "Do not add comments to the config file.").addOption(crOpt("--remove-comments", "Remove all comments from the config file.").implies({ comments: false })).option("--no-schema", "Do not add the schema reference to the config file.").option("--stdout", "Write the configuration to stdout instead of a file.").action((options) => {
		return createInit(options);
	});
}
//#endregion
//#region src/link.ts
const listGlobalImports = Link.listGlobalImports;
const addPathsToGlobalImports = Link.addPathsToGlobalImports;
const removePathsFromGlobalImports = Link.removePathsFromGlobalImports;
function listGlobalImportsResultToTable(results) {
	const header = [
		"id",
		"package",
		"name",
		"filename",
		"dictionaries",
		"errors"
	];
	const decorate = (isError) => isError ? (s) => chalk.red(s) : (s) => s;
	function toColumns(r) {
		return [
			r.id,
			r.package?.name,
			r.name,
			r.filename,
			r.dictionaryDefinitions?.map((def) => def.name).join(", "),
			r.error ? "Failed to read file." : ""
		].map((c) => c || "").map(decorate(!!r.error));
	}
	return {
		header,
		rows: results.map(toColumns)
	};
}
function addPathsToGlobalImportsResultToTable(results) {
	const header = ["filename", "errors"];
	const decorate = (isError) => isError ? (s) => chalk.red(s) : (s) => s;
	function toColumns(r) {
		return [r.resolvedToFilename || r.filename, r.error ? "Failed to read file." : ""].map((c) => c || "").map(decorate(!!r.error));
	}
	return {
		header,
		rows: results.resolvedSettings.map(toColumns)
	};
}
//#endregion
//#region src/commandLink.ts
function commandLink(prog) {
	const linkCommand = prog.command("link").description("Link dictionaries and other settings to the cspell global config.");
	linkCommand.command("list", { isDefault: true }).alias("ls").description("List currently linked configurations.").action(async () => {
		tableToLines(listGlobalImportsResultToTable((await listGlobalImports()).list)).forEach((line) => console.log(line));
	});
	linkCommand.command("add <dictionaries...>").alias("a").description("Add dictionaries any other settings to the cspell global config.").action(async (dictionaries) => {
		const r = await addPathsToGlobalImports(dictionaries);
		const table = addPathsToGlobalImportsResultToTable(r);
		console.log("Adding:");
		tableToLines(table).forEach((line) => console.log(line));
		if (r.error) throw new CheckFailed(r.error, 1);
	});
	linkCommand.command("remove <paths...>").alias("r").description("Remove matching paths / packages from the global config.").action(async (dictionaries) => {
		const r = await removePathsFromGlobalImports(dictionaries);
		console.log("Removing:");
		if (r.error) throw new CheckFailed(r.error, 1);
		r.removed.map((f) => console.log(f));
	});
	return linkCommand;
}
//#endregion
//#region src/commandLint.ts
const usage = `\
[options] [globs...] [file://<path> ...] [stdin[://<path>]]

Patterns:
 - [globs...]            Glob Patterns
 - [stdin]               Read from "stdin" assume text file.
 - [stdin://<path>]      Read from "stdin", use <path> for file type and config.
 - [file://<path>]       Check the file at <path>

Examples:
    cspell .                        Recursively check all files.
    cspell lint .                   The same as "cspell ."
    cspell "*.js"                   Check all .js files in the current directory
    cspell "**/*.js"                Check all .js files recursively
    cspell "src/**/*.js"            Only check .js under src
    cspell "**/*.txt" "**/*.js"     Check both .js and .txt files.
    cspell "**/*.{txt,js,md}"       Check .txt, .js, and .md files.
    cat LICENSE | cspell stdin      Check stdin
    cspell stdin://docs/doc.md      Check stdin as if it was "./docs/doc.md"\
`;
const advanced = `
More Examples:

    cspell "**/*.js" --reporter @cspell/cspell-json-reporter
        This will spell check all ".js" files recursively and use
        "@cspell/cspell-json-reporter".

    cspell . --reporter default
        This will force the default reporter to be used overriding
        any reporters defined in the configuration.

    cspell . --reporter ./<path>/reporter.cjs
        Use a custom reporter. See API for details.

    cspell "*.md" --exclude CHANGELOG.md --files README.md CHANGELOG.md
        Spell check only check "README.md" but NOT "CHANGELOG.md".

    cspell "/*.md" --no-must-find-files --files $FILES
        Only spell check the "/*.md" files in $FILES,
        where $FILES is a shell variable that contains the list of files.

    cspell --help --verbose
        Show all options including hidden options.

References:
    https://cspell.org
    https://github.com/streetsidesoftware/cspell
`;
function commandLint(prog, opts) {
	const spellCheckCommand = prog.command("lint", opts);
	spellCheckCommand.description("Check spelling").option("-c, --config <cspell.json>", "Configuration file to use.  By default cspell looks for cspell.json in the current directory.").addOption(crOpt("--config-search", "Allow searching for configuration files.", void 0).hideHelp()).option("--no-config-search", "Disable automatic searching for additional configuration files in parent directories. Only the specified config file (if any) will be used.").option("--stop-config-search-at <dir>", "Specify a directory at which to stop searching for configuration files when walking up from the files being checked. Useful for limiting config inheritance.", collect$1).option("-v, --verbose", "Display more information about the files being checked. Add more than one -v for increased verbosity.", increaseVerbosity, 0).option("--locale <locale>", "Set language locales. i.e. \"en,fr\" for English and French, or \"en-GB\" for British English.").option("--language-id <file-type>", "Force programming language for unknown extensions. i.e. \"php\" or \"scala\"").addOption(crOpt("--languageId <file-type>", "Alias of \"--language-id\". Force programming language for unknown extensions. i.e. \"php\" or \"scala\"").hideHelp()).option("--words-only", "Only output the words not found in the dictionaries.").addOption(crOpt("--wordsOnly", "Only output the words not found in the dictionaries.").hideHelp()).option("-u, --unique", "Only output the first instance of a word not found in the dictionaries.").option("-e, --exclude <glob>", "Exclude files matching the glob pattern. This option can be used multiple times to add multiple globs. ", collect$1).option("--file-list <path or stdin>", "Specify a list of files to be spell checked. The list is filtered against the glob file patterns. Note: the format is 1 file path per line.", collect$1).option("--file [file...]", "Specify files to spell check. They are filtered by the [globs...].", collect$1).addOption(crOpt("--files [file...]", "Alias of \"--file\". Files to spell check.", collect$1).hideHelp()).option("--no-issues", "Do not show the spelling errors.").option("--no-progress", "Turn off progress messages").option("--no-summary", "Turn off summary message in console.").option("-s, --silent", "Silent mode, suppress error messages.").option("--no-exit-code", "Do not return an exit code if issues are found.").addOption(crOpt("--quiet", "Only show spelling issues or errors.").implies({
		summary: false,
		progress: false
	})).option("--fail-fast", "Exit after first file with an issue or error.").addOption(crOpt("--no-fail-fast", "Process all files even if there is an error.").hideHelp()).option("--continue-on-error", "Continue processing files even if there is a configuration error.").option("-r, --root <root folder>", "Root directory, defaults to current directory.").addOption(crOpt("--relative", "Issues are displayed relative to the root.").default(true).hideHelp()).option("--no-relative", "Issues are displayed with absolute path instead of relative to the root.").option("--show-context", "Show the surrounding text around an issue.").option("--show-suggestions", "Show spelling suggestions.").addOption(crOpt("--no-show-suggestions", "Do not show spelling suggestions or fixes.").default(void 0)).addOption(crOpt("--must-find-files", "Error if no files are found.").default(true).hideHelp()).option("--no-must-find-files", "Do not error if no files are found.").addOption(crOpt("--legacy", "Legacy output").hideHelp()).addOption(crOpt("--local <local>", "Deprecated -- Use: --locale").hideHelp()).option("--cache", "Use cache to only check changed files.").option("--no-cache", "Do not use cache.").option("--cache-reset", "Reset the cache file.").addOption(crOpt("--cache-strategy <strategy>", "Strategy to use for detecting changed files.").choices(["content", "metadata"]).default("content")).option("--cache-location <path>", `Path to the cache file or directory. (default: "${DEFAULT_CACHE_LOCATION}")`).option("--dot", "Include files and directories starting with `.` (period) when matching globs.").option("--gitignore", "Ignore files matching glob patterns found in .gitignore files.").option("--no-gitignore", "Do NOT use .gitignore files.").option("--gitignore-root <path>", "Prevent searching for .gitignore files past root.", collect$1).option("--validate-directives", "Validate in-document CSpell directives.").addOption(crOpt("--no-validate-directives", "Do not validate in-document CSpell directives.").hideHelp()).option("--max-file-size <size>", "Prevent checking large files. i.e 1MB, 50KB, 1GB").addOption(crOpt("--color", "Force color.").default(void 0)).addOption(crOpt("--no-color", "Turn off color.").default(void 0)).addOption(crOpt("--default-configuration", "Load the default configuration and dictionaries.").hideHelp()).addOption(crOpt("--no-default-configuration", "Do not load the default configuration and dictionaries.")).option("--dictionary <name>", "Enable a dictionary by name.", collect$1).addOption(crOpt("--no-dictionary <name>", "Disable a dictionary by name. Can be used multiple times.", prefixCollect("!")).hideHelp()).option("--disable-dictionary <name>", "Disable a dictionary by name.", collect$1).option("--reporter <module|path>", "Specify one or more reporters to use.", collect$1).addOption(crOpt("--report <level>", "Set how unknown words are reported").choices(ReportChoicesAll)).addOption(crOpt("--skip-validation", "Collect and process documents, but do not spell check.").implies({ cache: false }).hideHelp()).addOption(crOpt("--issues-summary-report", "Output a summary of issues found.").hideHelp()).addOption(crOpt("--show-perf-summary", "Output a performance summary report.").hideHelp()).option("--issue-template [template]", "Use a custom issue template. See --help --issue-template for details.").addOption(crOpt("--debug", "Output information useful for debugging cspell.json files.").hideHelp()).usage(usage).addHelpText("after", augmentCommandHelp).arguments("[globs...]").action(action);
	return spellCheckCommand;
}
async function action(fileGlobs, cliOptions) {
	const options = cvtLinterCliCommandOptionsToLinterCliOptions(cliOptions);
	const useExitCode = options.exitCode ?? true;
	if (options.skipValidation) options.cache = false;
	options.color ??= canUseColor(options.color);
	const maxFileSizeErr = validateMaxFileSize(options.maxFileSize);
	if (maxFileSizeErr) this.error(`error: invalid option value for --max-file-size: ${maxFileSizeErr}`);
	const { mustFindFiles, fileList, files, file } = options;
	const result = await lint(fileGlobs, options);
	if (!fileGlobs.length && !result.files && !result.errors && !fileList && !files?.length && !file?.length) {
		this.outputHelp();
		throw new CheckFailed("outputHelp", 1);
	}
	if (result.errors || mustFindFiles && !result.files) throw new CheckFailed("check failed", 1);
	if (result.issues) throw new CheckFailed("check failed", useExitCode ? 1 : 0);
}
function helpIssueTemplate(opts) {
	if (!("issueTemplate" in opts)) return "";
	return unindent`
      Issue Template:
        Use "--issue-template"  to set the template to use when reporting issues.

        The template is a string that can contain the following placeholders:
        - $filename - the file name
        - $col - the column number
        - $row - the row number
        - $text - the word that is misspelled
        - $message - the issues message: "unknown word", "word is misspelled", etc.
        - $messageColored - the issues message with color based upon the message type.
        - $uri - the URI of the file
        - $suggestions - suggestions for the misspelled word (if requested)
        - $quickFix - possible quick fixes for the misspelled word.
        - $contextFull - the full context of the misspelled word.
        - $contextLeft - the context to the left of the misspelled word.
        - $contextRight - the context to the right of the misspelled word.

        Color is supported using the following template pattern:
        - \`{<style[.style]> <text>}\` - where \`<style>\` is a style name and \`<text>\` is the text to style.

        Styles
        - \`bold\`, \`italic\`, \`underline\`, \`strikethrough\`, \`dim\`, \`inverse\`
        - \`black\`, \`red\`, \`green\`, \`yellow\`, \`blue\`, \`magenta\`, \`cyan\`, \`white\`

        Example:
          --issue-template '{green $filename}:{yellow $row}:{yellow $col} $message {red $text} $quickFix {dim $suggestions}'
    `;
}
/**
* Add additional help text to the command.
* When the verbose flag is set, show the hidden options.
* @param context
* @returns
*/
function augmentCommandHelp(context) {
	const output = [];
	const command = context.command;
	const opts = command.opts();
	const showHidden = !!opts.verbose;
	const hiddenHelp = [];
	const help = command.createHelp();
	help.helpWidth = process.stdout.columns || 80;
	const hiddenOptions = command.options.filter((opt) => opt.hidden && showHidden);
	const flagColWidth = Math.max(...command.options.map((opt) => opt.flags.length), 0);
	for (const options of hiddenOptions) {
		if (!hiddenHelp.length) hiddenHelp.push("\nHidden Options:");
		hiddenHelp.push(help.formatItem(options.flags, flagColWidth, options.description, help));
	}
	output.push(...hiddenHelp, advanced);
	return helpIssueTemplate(opts) + output.join("\n");
}
function validateMaxFileSize(size) {
	if (!size) return void 0;
	return validateUnitSize(size);
}
function increaseVerbosity(_dummyValue, previous) {
	return previous + 1;
}
//#endregion
//#region src/emitters/suggestionsEmitter.ts
const regExpRTL = /([ \u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]+)/g;
function reverseRtlText(s) {
	return s.replaceAll(regExpRTL, (s) => [...s].reverse().join(""));
}
function emitSuggestionResult(result, options) {
	const { word, suggestions } = result;
	const { verbose, output = console } = options;
	const elapsed = verbose && verbose > 1 && result.elapsedTimeMs ? ` ${result.elapsedTimeMs.toFixed(2)} ms` : "";
	const rWord = reverseRtlText(word);
	const wordEx = rWord !== word ? ` (${chalk.yellow(rWord)})` : "";
	output.log((word ? chalk.yellow(word) + wordEx : chalk.yellow("<empty>")) + ":" + elapsed);
	if (!suggestions.length) {
		console.log(chalk.yellow(" <no suggestions>"));
		return;
	}
	function handleRtl(word) {
		const r = reverseRtlText(word);
		return r === word ? word : `${word} (${r})`;
	}
	if (verbose) {
		const mappedSugs = suggestions.map((s) => ({
			...s,
			w: handleRtl(s.compoundWord || s.wordAdjustedToMatchCase || s.word)
		}));
		const maxWidth = mappedSugs.map((s) => width(s.w)).reduce((max, len) => Math.max(max, len), 0);
		for (const sug of mappedSugs) {
			const { cost, dictionaries, w } = sug;
			const padding = " ".repeat(padWidth(w, maxWidth));
			const forbid = sug.forbidden && sug.isPreferred ? chalk.red("*") : sug.forbidden ? chalk.red("X") : sug.isPreferred ? chalk.yellow("*") : " ";
			const ignore = sug.noSuggest ? chalk.yellow("N") : " ";
			const strCost = padLeft(cost.toString(10), 4);
			const dicts = dictionaries.map((n) => chalk.gray(n)).join(", ");
			output.log(` - ${formatWord(w, sug)}${padding} ${forbid}${ignore} - ${chalk.yellow(strCost)} ${dicts}`);
		}
	} else {
		const mappedSugs = suggestions.map((s) => ({
			...s,
			word: handleRtl(s.wordAdjustedToMatchCase || s.word)
		}));
		for (const r of mappedSugs) output.log(` - ${formatWordSingle(r)}`);
	}
}
function formatWord(word, r) {
	return r.forbidden || r.noSuggest ? chalk.gray(chalk.strikethrough(word)) : word === r.wordAdjustedToMatchCase ? diff(word, r.word) : word;
}
function diff(wordA, wordB) {
	const a = [...wordA];
	const b = [...wordB];
	const parts = [];
	for (let idx = 0; idx < a.length; ++idx) {
		const aa = a[idx];
		const bb = b[idx];
		parts.push(aa === bb ? aa : chalk.yellow(aa));
	}
	return parts.join("");
}
function formatWordSingle(s) {
	let word = formatWord(s.word, s);
	word = s.forbidden ? word + chalk.red(" X") : word;
	word = s.noSuggest ? word + chalk.yellow(" Not suggested.") : word;
	word = s.isPreferred ? chalk.yellow(word + " *") : word;
	return word;
}
//#endregion
//#region src/commandSuggestion.ts
function collect(value, previous) {
	value = value.replace(/^=/, "");
	if (!previous) return [value];
	return [...previous, value];
}
function count(_, previous) {
	return (previous || 0) + 1;
}
function asNumber(value, prev) {
	return Number.parseInt(value, 10) ?? prev;
}
function commandSuggestion(prog) {
	const suggestionCommand = prog.command("suggestions");
	suggestionCommand.aliases(["sug", "suggest"]).description("Spelling Suggestions for words.").option("-c, --config <cspell.json>", "Configuration file to use.  By default cspell looks for cspell.json in the current directory.").option("--locale <locale>", "Set language locales. i.e. \"en,fr\" for English and French, or \"en-GB\" for British English.").option("--language-id <language>", "Use programming language. i.e. \"php\" or \"scala\".").addOption(new Option("--languageId <language>", "Use programming language. i.e. \"php\" or \"scala\".").hideHelp()).option("-s, --no-strict", "Ignore case and accents when searching for words.").option("--ignore-case", "Alias of --no-strict.").option("--num-changes <number>", "Number of changes allowed to a word", asNumber, 4).option("--num-suggestions <number>", "Number of suggestions", asNumber, 8).option("--no-include-ties", "Force the number of suggested to be limited, by not including suggestions that have the same edit cost.").option("--stdin", "Use stdin for input.").addOption(new Option("--repl", "REPL interface for looking up suggestions.")).option("-v, --verbose", "Show detailed output.", count, 0).option("-d, --dictionary <dictionary name>", "Use the dictionary specified. Only dictionaries specified will be used.", collect).option("--dictionaries <dictionary names...>", "Use the dictionaries specified. Only dictionaries specified will be used.").option("--no-color", "Turn off color.").option("--color", "Force color").arguments("[words...]").action(async (words, options) => {
		parseApplicationFeatureFlags(options.flag);
		options.useStdin = options.stdin;
		options.dictionaries = mergeArrays(options.dictionaries, options.dictionary);
		if (!words.length && !options.useStdin && !options.repl) {
			suggestionCommand.outputHelp();
			throw new CheckFailed("outputHelp", 1);
		}
		for await (const r of suggestions(words, options)) emitSuggestionResult(r, options);
	});
	return suggestionCommand;
}
function mergeArrays(a, b) {
	if (a === void 0) return b;
	if (b === void 0) return a;
	return [...a, ...b];
}
//#endregion
//#region src/emitters/traceEmitter.ts
const maxWidth = 120;
const colWidthDictionaryName = 20;
function emitTraceResults(word, found, results, options) {
	const report = calcTraceResultsReport(word, found, results, options);
	console.log(report.table);
	if (report.errors) {
		console.error("Errors:");
		console.error(report.errors);
	}
}
function calcTraceResultsReport(word, found, results, options) {
	if (options.color === true) chalk.level = 2;
	else if (options.color === false) chalk.level = 0;
	const col = new Intl.Collator();
	results.sort((a, b) => col.compare(a.dictName, b.dictName));
	options.showWordFound && console.log(`${options.prefix || ""}${word}: ${found ? "Found" : "Not Found"}`);
	return {
		table: tableToLines({
			header: emitHeader(options.dictionaryPathFormat !== "hide"),
			rows: results.map((r) => emitTraceResult(r, options)),
			terminalWidth: options.lineWidth || process.stdout.columns || maxWidth,
			deliminator: " "
		}).map((line) => line.trimEnd()).join("\n"),
		errors: emitErrors(results).join("\n")
	};
}
function emitHeader(location) {
	const headers = [
		"Word",
		"F",
		"Dictionary"
	];
	location && headers.push("Dictionary Location");
	return headers;
}
function emitTraceResult(r, options) {
	const errors = !!r.errors?.length;
	const cWord = (r.foundWord || r.word).replaceAll("+", chalk.yellow("+"));
	const sug = r.preferredSuggestions?.map((s) => chalk.yellowBright(s)).join(", ") || "";
	const w = (r.forbidden ? chalk.red(cWord) : chalk.green(cWord)) + (sug ? `->(${sug})` : "");
	const f = calcFoundChar(r);
	const a = (r.dictBlocked ? chalk.redBright("!") : "") + (r.dictActive ? "*" : " ");
	const dictName = r.dictName.slice(0, colWidthDictionaryName - 1) + a;
	const n = (r.dictActive ? chalk.yellowBright : chalk.rgb(200, 128, 50))(dictName);
	const c = colorize(errors ? chalk.red : chalk.white);
	return [
		w,
		f,
		n,
		(widthSrc) => c(formatDictionaryLocation(r.dictSource, widthSrc ?? maxWidth, {
			iPath,
			...options
		}))
	];
}
function emitErrors(results) {
	return results.filter((r) => r.errors?.length).map((r) => {
		const errors = r.errors?.map((e) => e.message)?.join("\n	") || "";
		return chalk.bold(r.dictName) + "\n	" + chalk.red(errors);
	});
}
function calcFoundChar(r) {
	const errors = r.errors?.map((e) => e.message)?.join("\n	") || "";
	let color = chalk.dim;
	color = r.found ? chalk.whiteBright : color;
	color = r.forbidden ? chalk.red : color;
	color = r.noSuggest ? chalk.yellowBright : color;
	color = errors ? chalk.red : color;
	let char = "-";
	char = r.found ? "*" : char;
	char = r.forbidden ? "!" : char;
	char = r.noSuggest ? "I" : char;
	char = errors ? "X" : char;
	return color(char);
}
function colorize(fn) {
	return (s) => s ? fn(s) : "";
}
//#endregion
//#region src/commandTrace.ts
function commandTrace(prog) {
	return prog.command("trace").description(`Trace words -- Search for words in the configuration and dictionaries.`).option("-c, --config <cspell.json>", "Configuration file to use.  By default cspell looks for cspell.json in the current directory.").option("--locale <locale>", "Set language locales. i.e. \"en,fr\" for English and French, or \"en-GB\" for British English.").option("--language-id <language>", "Use programming language. i.e. \"php\" or \"scala\".").addOption(new Option("--languageId <language>", "Use programming language. i.e. \"php\" or \"scala\".").hideHelp()).option("--allow-compound-words", "Turn on allowCompoundWords").addOption(new Option("--allowCompoundWords", "Turn on allowCompoundWords.").hideHelp()).option("--no-allow-compound-words", "Turn off allowCompoundWords").option("--ignore-case", "Ignore case and accents when searching for words.").option("--no-ignore-case", "Do not ignore case and accents when searching for words.").option("--dictionary <name>", "Enable a dictionary by name. Can be used multiple times.", collect$1).option("--no-dictionary <name>", "Disable a dictionary by name. Can be used multiple times.", prefixCollect("!")).addOption(new Option("--dictionary-path <format>", "Configure how to display the dictionary path.").choices([
		"hide",
		"short",
		"long",
		"full"
	]).default("long", "Display most of the path.")).option("--stdin", "Read words from stdin.").option("--all", "Show all dictionaries.").addOption(new Option("--only-found", "Show only dictionaries that have the words.").conflicts("all")).addOption(new Option("--color", "Force color.").default(void 0)).addOption(new Option("--no-color", "Turn off color.").default(void 0)).addOption(new Option("--default-configuration", "Load the default configuration and dictionaries.").hideHelp()).addOption(new Option("--no-default-configuration", "Do not load the default configuration and dictionaries.")).arguments("[words...]").action(async (words, options) => {
		parseApplicationFeatureFlags(options.flag);
		let numFound = 0;
		const dictionaryPathFormat = isDictionaryPathFormat(options.dictionaryPath) ? options.dictionaryPath : "long";
		let prefix = "";
		const useColor = canUseColor(options.color);
		for await (const results of trace(words, options)) {
			const byWord = groupBy(results, (r) => r.word);
			for (const split of results.splits) {
				const filtered = filterTraceResults(byWord.get(split.word) || [], options);
				emitTraceResults(split.word, split.found, filtered, {
					cwd: process.cwd(),
					dictionaryPathFormat,
					prefix,
					showWordFound: results.splits.length > 1,
					color: useColor
				});
				prefix = "\n";
				numFound += results.reduce((n, r) => n + (r.found ? 1 : 0), 0);
				if (results.map((r) => r.errors?.length || 0).reduce((n, r) => n + r, 0)) {
					console.error("Dictionary Errors.");
					throw new CheckFailed("dictionary errors", 1);
				}
			}
		}
		if (!numFound) {
			console.error("No matches found");
			throw new CheckFailed("no matches", 1);
		}
	});
}
function filterTraceResults(results, options) {
	if (options.all) return results;
	return results.filter((r) => filterTraceResult(r, options.onlyFound));
}
function filterTraceResult(result, onlyFound) {
	return result.found || result.forbidden || result.noSuggest || !!result.preferredSuggestions || !onlyFound && result.dictActive;
}
function groupBy(items, key) {
	const map = /* @__PURE__ */ new Map();
	for (const item of items) {
		const k = key(item);
		const a = map.get(k) || [];
		a.push(item);
		map.set(k, a);
	}
	return map;
}
//#endregion
//#region src/globalOptions.ts
function addGlobalOptionsToAction(command) {
	command = command.addOption(new Option("-f,--flag <flag:value>", "Declare an execution flag value").hideHelp().argParser(collect$1));
	return command;
}
function addGlobalOptionsAndHooks(command) {
	addGlobalOptionsToAction(command);
	command.hook("preAction", (thisCommand, _actionCommand) => {
		processGlobalOptions(thisCommand.opts());
	});
	return command;
}
function processGlobalOptions(options) {
	parseApplicationFeatureFlags(options.flag);
}
//#endregion
//#region src/app.mts
async function run(command, argv) {
	const prog = command || program;
	const args = argv || process.argv;
	prog.exitOverride();
	prog.version(npmPackage.version).description("Spelling Checker for Code").name("cspell");
	if (!satisfies(process.versions.node, npmPackage.engines.node)) throw new ApplicationError(`Unsupported NodeJS version (${process.versions.node}); ${npmPackage.engines.node} is required`);
	addGlobalOptionsToAction(commandLint(prog, { isDefault: true }));
	addGlobalOptionsToAction(commandTrace(prog));
	addGlobalOptionsToAction(commandCheck(prog));
	addGlobalOptionsToAction(commandSuggestion(prog));
	addGlobalOptionsToAction(commandInit(prog));
	commandLink(prog);
	addGlobalOptionsToAction(commandDictionaries(prog));
	addGlobalOptionsAndHooks(prog);
	prog.exitOverride();
	await prog.parseAsync(args);
}
//#endregion
export { ApplicationError, CheckFailed, run };

//# sourceMappingURL=app.js.map