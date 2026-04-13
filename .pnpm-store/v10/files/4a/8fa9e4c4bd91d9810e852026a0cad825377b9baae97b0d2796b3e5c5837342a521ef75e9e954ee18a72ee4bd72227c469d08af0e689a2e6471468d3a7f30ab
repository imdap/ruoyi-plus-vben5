import { createRequire } from "node:module";
import { isAsyncIterable, opFilter, opMap, opTap, operators, pipeAsync, pipeAsync as asyncPipe, toAsyncIterable, toAsyncIterable as mergeAsyncIterables } from "@cspell/cspell-pipe";
import * as cspell from "cspell-lib";
import { ENV_CSPELL_GLOB_ROOT, IncludeExcludeFlag, MessageTypes, SuggestionError, Text, checkTextDocument, combineTextAndLanguageSettings, createDictionaryReferenceCollection, createPerfTimer, extractDependencies, extractImportErrors, fileToDocument, getDefaultSettings, getGlobalSettingsAsync, getSystemFeatureFlags, isBinaryFile, isSpellingDictionaryLoadError, mergeSettings, setLogger, shouldCheckDocument, spellCheckDocument, suggestionsForWords, traceWordsAsync } from "cspell-lib";
import assert from "node:assert";
import { format, formatWithOptions, stripVTControlCharacters } from "node:util";
import { isUrlLike, toFileDirURL, toFilePathOrHref, toFileURL, urlRelative } from "@cspell/url";
import chalk, { Chalk } from "chalk";
import { makeTemplate } from "chalk-template";
import ansiRegex from "ansi-regex";
import fs, { stat } from "node:fs/promises";
import { MutableCSpellConfigFile, createReaderWriter, cspellConfigFileSchema, isCfgArrayNode } from "cspell-config-lib";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import * as path$1 from "node:path";
import path, { isAbsolute, posix, relative, resolve, sep } from "node:path";
import { enablePerformanceMeasurements, measurePerf } from "@cspell/cspell-performance-monitor";
import { opMap as opMap$1, pipe } from "@cspell/cspell-pipe/sync";
import { IssueType, MessageTypes as MessageTypes$1, unknownWordsChoices } from "@cspell/cspell-types";
import { dictionaryCacheEnableLogging, dictionaryCacheGetLog } from "cspell-dictionary";
import { GitIgnore, findRepoRoot } from "cspell-gitignore";
import { GlobMatcher, fileOrGlobToGlob, workaroundPicomatchBug } from "cspell-glob";
import { dynamicImport } from "@cspell/dynamic-import";
import crypto from "node:crypto";
import streamConsumers from "node:stream/consumers";
import { getStat, readFileText, toURL } from "cspell-io";
import { glob } from "tinyglobby";
import * as readline from "node:readline";
import { parse, stringify } from "flatted";
//#region src/console.ts
var ImplChannel = class {
	constructor(stream) {
		this.stream = stream;
	}
	write = (msg) => this.stream.write(msg);
	writeLine = (msg) => this.write(msg + "\n");
	clearLine = (dir, callback) => this.stream.clearLine?.(dir, callback) ?? false;
	printLine = (...params) => this.writeLine(params.length && formatWithOptions({ colors: this.stream.hasColors?.() }, ...params) || "");
	getColorLevel = () => getColorLevel(this.stream);
};
var Console = class {
	stderrChannel;
	stdoutChannel;
	constructor(stdout = process.stdout, stderr = process.stderr) {
		this.stdout = stdout;
		this.stderr = stderr;
		this.stderrChannel = new ImplChannel(this.stderr);
		this.stdoutChannel = new ImplChannel(this.stdout);
	}
	log = (...p) => this.stdoutChannel.printLine(...p);
	error = (...p) => this.stderrChannel.printLine(...p);
	info = this.log;
	warn = this.error;
};
const console = new Console();
function getColorLevel(stream) {
	switch (stream.getColorDepth?.() || 0) {
		case 1: return 1;
		case 4: return 2;
		case 24: return 3;
		default: return 0;
	}
}
//#endregion
//#region src/util/errors.ts
var CheckFailed = class extends Error {
	constructor(message, exitCode = 1) {
		super(message);
		this.exitCode = exitCode;
	}
};
var ApplicationError = class extends Error {
	constructor(message, exitCode = 1, cause) {
		super(message);
		this.exitCode = exitCode;
		this.cause = cause;
	}
};
var IOError = class extends ApplicationError {
	constructor(message, cause) {
		super(message, void 0, cause);
		this.cause = cause;
	}
	get code() {
		return this.cause.code;
	}
	isNotFound() {
		return this.cause.code === "ENOENT";
	}
};
function toError$1(e) {
	if (isError(e)) return e;
	if (isErrorLike(e)) {
		const ex = new Error(e.message, { cause: e });
		if (e.code !== void 0) ex.code = e.code;
		return ex;
	}
	const message = format(e);
	return new Error(message);
}
function isError(e) {
	return e instanceof Error;
}
function isErrorLike(e) {
	if (e instanceof Error) return true;
	if (!e || typeof e !== "object") return false;
	return typeof e.message === "string";
}
function toApplicationError(e, message) {
	if (e instanceof ApplicationError && !message) return e;
	const err = toError$1(e);
	return new ApplicationError(message ?? err.message, void 0, err);
}
//#endregion
//#region src/util/perfMeasurements.ts
function getPerfMeasurements() {
	const measurements = performance.getEntriesByType("measure");
	const root = {
		depth: -1,
		totalTimeMs: 0,
		nestedTimeMs: 0,
		children: /* @__PURE__ */ new Map()
	};
	if (!measurements.length) return [];
	const stack = [];
	let depth = 0;
	for (let i = 0; i < measurements.length; i++) {
		const m = measurements[i];
		rollUpStack(m.startTime);
		const s = {
			m,
			p: addToParent(depth === 0 ? root : stack[depth - 1].p, m)
		};
		stack[depth++] = s;
	}
	sortChildren(root);
	return [...root.children.values()].flatMap((r) => [...flattenChildren(r)]);
	function contains(m, t) {
		const stop = m.startTime + m.duration;
		return t >= m.startTime && t < stop;
	}
	function rollUpStack(t) {
		for (; depth > 0 && !contains(stack[depth - 1].m, t); --depth);
	}
	function addToParent(p, m) {
		p.children ??= /* @__PURE__ */ new Map();
		p.nestedTimeMs += m.duration;
		return updateChild(p.children, m, p.depth + 1);
	}
	function updateChild(children, m, depth) {
		const p = children.get(m.name);
		if (p) {
			p.totalTimeMs += m.duration;
			p.count += 1;
			p.minTimeMs = Math.min(p.minTimeMs, m.duration);
			p.maxTimeMs = Math.max(p.maxTimeMs, m.duration);
			return p;
		}
		const n = {
			name: m.name,
			depth,
			totalTimeMs: m.duration,
			nestedTimeMs: 0,
			count: 1,
			minTimeMs: m.duration,
			maxTimeMs: m.duration
		};
		children.set(m.name, n);
		return n;
	}
	function* flattenChildren(m) {
		yield m;
		if (!m.children) return;
		for (const child of m.children.values()) yield* flattenChildren(child);
	}
	function sortChildren(m) {
		if (!m.children) return;
		m.children = new Map([...m.children.entries()].sort((a, b) => b[1].totalTimeMs - a[1].totalTimeMs));
		m.children.forEach(sortChildren);
	}
}
//#endregion
//#region src/util/ansi.ts
function isAnsiString(s) {
	return s.includes("\x1B") || s.includes("");
}
/**
*
* @param s - the string to measure - should NOT contains ANSI codes
* @param tabWidth -
* @returns
*/
function width(s, tabWidth = 1) {
	return s.replaceAll("…", ".").replaceAll("	", " ".repeat(tabWidth)).replaceAll(/\p{M}/gu, "").replaceAll(/\p{L}/gu, ".").replaceAll(/[\u0000-\u001F\u0300-\u036F]/g, "").replaceAll(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, ".").length;
}
/**
* Measure the width of a string containing ANSI control characters.
* @param s - string to measure with width in characters.
* @returns the approximate number of screen characters.
*/
function ansiWidth(s) {
	return width(stripVTControlCharacters(s));
}
function fragmentString(str, splitOnRegex, sType) {
	const fragments = [];
	let lastIndex = 0;
	for (const match of str.matchAll(new RegExp(splitOnRegex))) {
		if (match.index > lastIndex) fragments.push({
			type: "text",
			text: str.slice(lastIndex, match.index)
		});
		fragments.push({
			type: sType,
			text: match[0]
		});
		lastIndex = match.index + match[0].length;
	}
	if (lastIndex < str.length) fragments.push({
		type: "text",
		text: str.slice(lastIndex)
	});
	return fragments;
}
const ansi = ansiRegex();
function parseAnsiStr(str) {
	return fragmentString(str, ansi, "ansi");
}
/**
* Prune the end of a string to fit within a specified width, adding an ellipsis if necessary.
* @param str - the text to prune - ANSI is supported
* @param maxWidth - the maximum width of the text
* @param pad - the string to use for padding, default is '…'
* @returns the pruned text
*/
function pruneAnsiTextEnd(str, maxWidth, pad = "…") {
	if (!maxWidth || maxWidth <= 0) return str;
	if (str.length <= maxWidth) return str;
	if (ansiWidth(str) <= maxWidth) return str;
	const padWidth = ansiWidth(pad);
	const fragments = parseAnsiStr(str);
	let remaining = maxWidth - padWidth;
	for (const frag of fragments) {
		if (frag.type !== "text") continue;
		if (remaining <= 0) {
			frag.text = "";
			continue;
		}
		const pruned = pruneTextEnd(frag.text, remaining, pad);
		if (pruned !== frag.text) {
			frag.text = pruned;
			remaining = 0;
			continue;
		}
		remaining -= width(frag.text);
	}
	return fragments.map((frag) => frag.text).join("");
}
/**
* Prune the start of a string to fit within a specified width, adding an ellipsis if necessary.
* @param str - the text to prune - ANSI is supported
* @param maxWidth - the maximum width of the text
* @param pad - the string to use for padding, default is '…'
* @returns the pruned text
*/
function pruneAnsiTextStart(str, maxWidth, pad = "…") {
	if (!maxWidth || maxWidth <= 0) return str;
	if (str.length <= maxWidth) return str;
	if (ansiWidth(str) <= maxWidth) return str;
	const padWidth = ansiWidth(pad);
	const fragments = parseAnsiStr(str);
	let remaining = maxWidth - padWidth;
	for (const frag of fragments.reverse()) {
		if (frag.type !== "text") continue;
		if (remaining <= 0) {
			frag.text = "";
			continue;
		}
		const pruned = pruneTextStart(frag.text, remaining, pad);
		if (pruned !== frag.text) {
			frag.text = pruned;
			remaining = 0;
			continue;
		}
		remaining -= width(frag.text);
	}
	return fragments.reverse().map((frag) => frag.text).join("");
}
/**
* Prune the end of a string to fit within a specified width, adding an ellipsis if necessary.
* @param str - the text to prune - ANSI is not supported
* @param maxWidth - the maximum width of the text
* @param pad - the string to use for padding, default is '…'
* @returns the pruned text
*/
function pruneTextEnd(str, maxWidth, pad = "…") {
	if (!maxWidth || maxWidth <= 0) return str;
	if (str.length <= maxWidth) return str;
	if (isAnsiString(str)) return pruneAnsiTextEnd(str, maxWidth, pad);
	const maxWidthWithPad = maxWidth - width(pad);
	const letters = [...str];
	let len = 0;
	for (let i = 0; i < letters.length; i++) {
		const c = letters[i];
		len += width(c);
		if (len > maxWidthWithPad) {
			let j = i + 1;
			while (j < letters.length && width(letters[j]) === 0) ++j;
			return j === letters.length ? str : letters.slice(0, i).join("") + pad;
		}
	}
	return str;
}
/**
* Prune the start of a string to fit within a specified width, adding an ellipsis if necessary.
* @param str - the text to prune - ANSI is not supported
* @param maxWidth - the maximum width of the text
* @param pad - the string to use for padding, default is '…'
* @returns the pruned text
*/
function pruneTextStart(str, maxWidth, pad = "…") {
	if (!maxWidth || maxWidth <= 0) return str;
	if (str.length <= maxWidth) return str;
	const maxWidthWithPad = maxWidth - width(pad);
	const letters = [...str];
	let len = 0;
	for (let i = letters.length - 1; i >= 1; i--) {
		const c = letters[i];
		len += width(c);
		if (len > maxWidthWithPad) {
			i += 1;
			while (i < letters.length && width(letters[i]) === 0) ++i;
			return pad + letters.slice(i).join("");
		}
	}
	return str;
}
//#endregion
//#region src/util/pad.ts
function pad(s, w) {
	const p = padWidth(s, w);
	if (!p) return s;
	return s.padEnd(p + s.length);
}
function padWidth(s, target) {
	const sWidth = ansiWidth(s);
	return Math.max(target - sWidth, 0);
}
function padLeft(s, w) {
	const p = padWidth(s, w);
	if (!p) return s;
	return s.padStart(p + s.length);
}
//#endregion
//#region src/util/table.ts
function tableToLines(table, deliminator) {
	const del = deliminator || table.deliminator || " | ";
	const columnWidths = [];
	const columnAlignments = table.columnAlignments || [];
	const maxColumnWidthsMap = table.maxColumnWidths || {};
	const tableIndent = table.indent ? typeof table.indent === "number" ? " ".repeat(table.indent) : table.indent : "";
	const { header, rows } = table;
	const simpleHeader = header.map((col) => Array.isArray(col) ? col[1] : col);
	const columnFieldNames = header.map((col) => Array.isArray(col) ? col[0] : col);
	const maxColumnWidths = columnFieldNames.map((field, idx) => maxColumnWidthsMap[field] ?? maxColumnWidthsMap[idx]);
	function getCell(row, col) {
		return getCellFromRow(rows[row], col);
	}
	function getCellFromRow(row, col) {
		if (!row) return void 0;
		if (Array.isArray(row)) return row[col];
		return row[columnFieldNames[col]];
	}
	function rowToCells(row) {
		if (Array.isArray(row)) return row;
		return columnFieldNames.map((fieldName) => row[fieldName]);
	}
	function getText(col, maxWidth) {
		return !col ? "" : typeof col === "string" ? pruneTextEnd(col, maxWidth) : col(maxWidth);
	}
	function getRCText(row, col, maxWidth) {
		return getText(getCell(row, col), maxWidth);
	}
	function recordHeaderWidths(header) {
		header.forEach((col, idx) => {
			columnWidths[idx] = Math.max(ansiWidth(col), columnWidths[idx] || 0);
		});
	}
	function recordColWidths() {
		for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) for (let colIndex = 0; colIndex < columnFieldNames.length; colIndex++) columnWidths[colIndex] = Math.max(ansiWidth(getRCText(rowIndex, colIndex, void 0)), columnWidths[colIndex] || 0);
	}
	function justifyRow(c, i) {
		return columnAlignments[i] === "R" ? padLeft(c, columnWidths[i]) : pad(c, columnWidths[i]);
	}
	function toHeaderLine(header) {
		return tableIndent + decorateRowWith(header.map((c, i) => getText(c, columnWidths[i])), justifyRow, headerDecorator).join(del);
	}
	function toLine(row) {
		return tableIndent + decorateRowWith(rowToCells(row).map((c, i) => getText(c, columnWidths[i])), justifyRow).join(del);
	}
	function* process() {
		if (table.title) yield table.title;
		yield toHeaderLine(simpleHeader);
		yield* rows.map(toLine);
	}
	function sumColumnWidths() {
		return columnWidths.reduce((sum, width) => sum + width, 0);
	}
	function adjustColWidths() {
		for (let i = 0; i < columnWidths.length; i++) {
			const mw = maxColumnWidths[i];
			if (!mw) continue;
			columnWidths[i] = Math.min(columnWidths[i], mw);
		}
		if (!table.terminalWidth) return;
		const dWidth = (columnWidths.length - 1) * ansiWidth(del);
		const lineWidth = table.terminalWidth - dWidth;
		if (lineWidth <= columnWidths.length * 2) {
			const fixedWidth = Math.max(Math.min(...columnWidths), 5);
			for (let i = 0; i < columnWidths.length; i++) columnWidths[i] = fixedWidth;
			return;
		}
		if (columnWidths.length === 1) {
			columnWidths[0] = lineWidth;
			return;
		}
		function trimWidestColumn(neededToTrim) {
			let first = 0;
			let second = 0;
			for (let i = 0; i < columnWidths.length; i++) if (columnWidths[i] > columnWidths[first]) {
				second = first;
				first = i;
			} else if (columnWidths[i] > columnWidths[second]) second = i;
			const diff = Math.max(columnWidths[first] - columnWidths[second], 1);
			columnWidths[first] -= Math.min(diff, neededToTrim);
		}
		for (let sum = sumColumnWidths(); sum > lineWidth; sum = sumColumnWidths()) trimWidestColumn(sum - lineWidth);
	}
	recordHeaderWidths(simpleHeader);
	recordColWidths();
	adjustColWidths();
	return [...process()];
}
function headerDecorator(t) {
	return chalk.bold(chalk.underline(t));
}
function decorateRowWith(row, ...decorators) {
	return decorators.reduce((row, decorator) => row.map(decorator), row);
}
//#endregion
//#region src/util/util.ts
const uniqueFn = uniqueFilterFnGenerator;
function uniqueFilterFnGenerator(extractFn) {
	const values = /* @__PURE__ */ new Set();
	const extractor = extractFn || ((a) => a);
	return (v) => {
		const vv = extractor(v);
		const ret = !values.has(vv);
		values.add(vv);
		return ret;
	};
}
/**
* Removed all properties with a value of `undefined` from the object.
* @param src - the object to clean.
* @returns the same object with all properties with a value of `undefined` removed.
*/
function clean(src) {
	const r = src;
	for (const key of Object.keys(r)) if (r[key] === void 0) delete r[key];
	return r;
}
//#endregion
//#region src/cli-reporter.ts
const templateIssue = `{green $filename}:{yellow $row:$col} - $message ({red $text}) $quickFix`;
const templateIssueNoFix = `{green $filename}:{yellow $row:$col} - $message ({red $text})`;
const templateIssueWithSuggestions = `{green $filename}:{yellow $row:$col} - $message ({red $text}) Suggestions: {yellow [$suggestions]}`;
const templateIssueWithContext = `{green $filename}:{yellow $row:$col} $padRowCol- $message ({red $text})$padContext -- {gray $contextLeft}{red {underline $text}}{gray $contextRight}`;
const templateIssueWithContextWithSuggestions = `{green $filename}:{yellow $row:$col} $padRowCol- $message ({red $text})$padContext -- {gray $contextLeft}{red {underline $text}}{gray $contextRight}\n\t Suggestions: {yellow [$suggestions]}`;
const templateIssueLegacy = `{green $filename}[$row, $col]: $message: {red $text}`;
const templateIssueWordsOnly = "$text";
assert(true);
/**
*
* @param template - The template to use for the issue.
* @param uniqueIssues - If true, only unique issues will be reported.
* @param reportedIssuesCollection - optional collection to store reported issues.
* @returns issueEmitter function
*/
function genIssueEmitter(stdIO, errIO, template, uniqueIssues, reportedIssuesCollection) {
	const uniqueFilter = uniqueIssues ? uniqueFilterFnGenerator((issue) => issue.text) : () => true;
	const defaultWidth = 10;
	let maxWidth = defaultWidth;
	let uri;
	return function issueEmitter(issue) {
		if (!uniqueFilter(issue)) return;
		if (uri !== issue.uri) {
			maxWidth = defaultWidth;
			uri = issue.uri;
		}
		maxWidth = Math.max(maxWidth * .999, issue.text.length, 10);
		const issueText = formatIssue(stdIO, template, issue, Math.ceil(maxWidth));
		reportedIssuesCollection?.push(formatIssue(errIO, template, issue, Math.ceil(maxWidth)));
		stdIO.writeLine(issueText);
	};
}
function nullEmitter() {}
function relativeUriFilename(uri, rootURL) {
	const url = toFileURL(uri);
	const rel = urlRelative(rootURL, url);
	if (rel.startsWith("..")) return toFilePathOrHref(url);
	return rel;
}
function reportProgress(io, p, cwdURL, options) {
	if (p.type === "ProgressFileComplete") return reportProgressFileComplete(io, p, cwdURL, options);
	if (p.type === "ProgressFileBegin") return reportProgressFileBegin(io, p, cwdURL);
}
function determineFilename(io, p, cwd) {
	const fc = "" + p.fileCount;
	return {
		idx: (" ".repeat(fc.length) + p.fileNum).slice(-fc.length) + "/" + fc,
		filename: io.chalk.gray(relativeUriFilename(p.filename, cwd))
	};
}
function reportProgressFileBegin(io, p, cwdURL) {
	const { idx, filename } = determineFilename(io, p, cwdURL);
	if (io.getColorLevel() > 0) {
		io.clearLine?.(0);
		io.write(`${idx} ${filename}\r`);
	}
}
function reportProgressFileComplete(io, p, cwd, options) {
	const { idx, filename } = determineFilename(io, p, cwd);
	const { verbose, debug } = options;
	const time = reportTime(io, p.elapsedTimeMs, !!p.cached);
	const skippedReason = p.skippedReason ? ` (${p.skippedReason})` : "";
	const skipped = p.processed === false ? ` skipped${skippedReason}` : "";
	const hasErrors = p.numErrors ? io.chalk.red` X` : "";
	const msg = `${idx} ${filename} ${time}${skipped}${hasErrors}${(verbose || debug || hasErrors || isSlow(p.elapsedTimeMs) || io.getColorLevel() < 1 ? "\n" : "") || "\r"}`;
	io.write(msg);
}
function reportTime(io, elapsedTimeMs, cached) {
	if (cached) return io.chalk.green("cached");
	if (elapsedTimeMs === void 0) return "-";
	const slow = isSlow(elapsedTimeMs);
	return (!slow ? io.chalk.white : slow === 1 ? io.chalk.yellow : io.chalk.redBright)(elapsedTimeMs.toFixed(2) + "ms");
}
function isSlow(elapsedTmeMs) {
	if (!elapsedTmeMs || elapsedTmeMs < 1e3) return 0;
	if (elapsedTmeMs < 2e3) return 1;
	return 2;
}
function getReporter(options, config) {
	const perfStats = {
		filesProcessed: 0,
		filesSkipped: 0,
		filesCached: 0,
		accumulatedTimeMs: 0,
		startTime: performance.now(),
		perf: Object.create(null)
	};
	const noColor = options.color === false;
	const forceColor = options.color === true;
	const uniqueIssues = config?.unique || false;
	const defaultIssueTemplate = options.wordsOnly ? templateIssueWordsOnly : options.legacy ? templateIssueLegacy : options.showContext ? options.showSuggestions ? templateIssueWithContextWithSuggestions : templateIssueWithContext : options.showSuggestions ? templateIssueWithSuggestions : options.showSuggestions === false ? templateIssueNoFix : templateIssue;
	const { fileGlobs, silent, summary, issues, progress: showProgress, verbose, debug } = options;
	const issueTemplate = config?.issueTemplate || defaultIssueTemplate;
	assertCheckTemplate(issueTemplate);
	const console$1 = config?.console || console;
	const colorLevel = noColor ? 0 : forceColor ? 2 : console$1.stdoutChannel.getColorLevel();
	const stdio = {
		...console$1.stdoutChannel,
		chalk: new Chalk({ level: colorLevel })
	};
	const stderr = {
		...console$1.stderrChannel,
		chalk: new Chalk({ level: colorLevel })
	};
	const consoleError = (msg) => stderr.writeLine(msg);
	function createInfoLog(wrap) {
		return (msg) => console$1.info(wrap(msg));
	}
	const emitters = {
		Debug: !silent && debug ? createInfoLog(stdio.chalk.cyan) : nullEmitter,
		Info: !silent && verbose ? createInfoLog(stdio.chalk.yellow) : nullEmitter,
		Warning: createInfoLog(stdio.chalk.yellow)
	};
	function infoEmitter(message, msgType) {
		emitters[msgType]?.(message);
	}
	const rootURL = toFileDirURL(options.root || process.cwd());
	function relativeIssue(fn) {
		const fnFilename = options.relative ? (uri) => relativeUriFilename(uri, rootURL) : (uri) => toFilePathOrHref(toFileURL(uri, rootURL));
		return (i) => {
			const fullFilename = i.uri ? toFilePathOrHref(toFileURL(i.uri, rootURL)) : "";
			const filename = i.uri ? fnFilename(i.uri) : "";
			fn({
				...i,
				filename,
				fullFilename
			});
		};
	}
	const issuesCollection = void 0;
	const errorCollection = [];
	function errorEmitter(message, error) {
		if (isSpellingDictionaryLoadError(error)) error = error.cause;
		const errorText = formatWithOptions({ colors: stderr.stream.hasColors?.() }, stderr.chalk.red(message), debug ? error : error.toString());
		errorCollection?.push(errorText);
		consoleError(errorText);
	}
	const resultEmitter = (result) => {
		if (!fileGlobs.length && !result.files) return;
		const { files, issues, cachedFiles, filesWithIssues, errors, skippedFiles } = result;
		const numFilesWithIssues = filesWithIssues.size;
		const chalk = stderr.chalk;
		if (stderr.getColorLevel() > 0) {
			stderr.write("\r");
			stderr.clearLine(0);
		}
		if (issuesCollection?.length || errorCollection?.length) consoleError("-------------------------------------------");
		if (issuesCollection?.length) {
			consoleError("Issues found:");
			issuesCollection.forEach((issue) => consoleError(issue));
		}
		const filesChecked = files - (skippedFiles || 0);
		const cachedFilesText = cachedFiles ? ` (${cachedFiles} from cache)` : "";
		const skippedFilesText = skippedFiles ? `, skipped: ${skippedFiles}` : "";
		const withErrorsText = errors ? ` with ${errors} error${errors === 1 ? "" : "s"}` : "";
		consoleError(`CSpell\u003A Files checked: ${filesChecked}${cachedFilesText}${skippedFilesText}, Issues found: ${issues} in ${numFilesWithIssues === 1 ? "1 file" : `${numFilesWithIssues} files`}${withErrorsText}.`);
		if (errorCollection?.length && issues > 5) {
			consoleError("-------------------------------------------");
			consoleError("Errors:");
			errorCollection.forEach((error) => consoleError(error));
		}
		if (options.showPerfSummary) {
			const elapsedTotal = performance.now() - perfStats.startTime;
			consoleError("-------------------------------------------");
			consoleError("Performance Summary:");
			consoleError(`  Files Processed : ${perfStats.filesProcessed.toString().padStart(11)}`);
			consoleError(`  Files Skipped   : ${perfStats.filesSkipped.toString().padStart(11)}`);
			consoleError(`  Files Cached    : ${perfStats.filesCached.toString().padStart(11)}`);
			consoleError(`  Processing Time : ${perfStats.accumulatedTimeMs.toFixed(2).padStart(9)}ms`);
			consoleError(`  Total Time      : ${elapsedTotal.toFixed(2).padStart(9)}ms`);
			const tableStats = {
				title: chalk.bold("Perf Stats:"),
				header: ["Name", "Time (ms)"],
				columnAlignments: ["L", "R"],
				indent: 2,
				rows: Object.entries(perfStats.perf).filter((p) => !!p[1]).map(([key, value]) => [key, value.toFixed(2)])
			};
			consoleError("");
			for (const line of tableToLines(tableStats)) consoleError(line);
			if (options.verboseLevel) verbosePerfReport();
		}
	};
	function verbosePerfReport() {
		const perfMeasurements = getPerfMeasurements();
		if (!perfMeasurements.length) return;
		const notable = extractNotableBySelfTimeInGroup(perfMeasurements);
		const chalk = stderr.chalk;
		const maxDepth = Math.max(...perfMeasurements.map((m) => m.depth));
		const depthIndicator = (d) => "⋅".repeat(d) + " ".repeat(maxDepth - d);
		const rows = perfMeasurements.map((m) => {
			const cbd = (text) => colorByDepth(chalk, m.depth, text);
			const cNotable = (text) => notable.has(m) ? chalk.yellow(text) : text;
			return [
				chalk.dim("⋅".repeat(m.depth)) + colorByDepthGrayscale(stderr.chalk, m.depth, m.name),
				cbd(m.totalTimeMs.toFixed(2) + chalk.dim(depthIndicator(m.depth))),
				cbd(cNotable((m.totalTimeMs - m.nestedTimeMs).toFixed(2))),
				cbd(m.count.toString()),
				cbd(m.minTimeMs.toFixed(2)),
				cbd(m.maxTimeMs.toFixed(2)),
				cbd((m.totalTimeMs / m.count).toFixed(2))
			];
		});
		const table = tableToLines({
			title: chalk.bold("Detailed Measurements:"),
			header: [
				"Name",
				"Total Time (ms)",
				"Self (ms)",
				"Count",
				"Min (ms)",
				"Max (ms)",
				"Avg (ms)"
			],
			rows,
			columnAlignments: [
				"L",
				"R",
				"R",
				"R",
				"R",
				"R",
				"R"
			],
			indent: 2
		});
		consoleError("\n-------------------------------------------\n");
		for (const line of table) consoleError(line);
	}
	function colorByDepth(chalk, depth, text) {
		const colors = [
			chalk.green,
			chalk.cyan,
			chalk.blue,
			chalk.magenta,
			chalk.red
		];
		const color = colors[depth % colors.length];
		if (depth / colors.length >= 1) return chalk.dim(color(text));
		return color(text);
	}
	function colorByDepthGrayscale(chalk, depth, text) {
		const grayLevel = Math.max(32, 255 - depth * 20);
		return chalk.rgb(grayLevel, grayLevel, grayLevel)(text);
	}
	function collectPerfStats(p) {
		if (p.cached) {
			perfStats.filesCached++;
			return;
		}
		perfStats.filesProcessed += p.processed ? 1 : 0;
		perfStats.filesSkipped += !p.processed ? 1 : 0;
		perfStats.accumulatedTimeMs += p.elapsedTimeMs || 0;
		if (!p.perf) return;
		for (const [key, value] of Object.entries(p.perf)) if (typeof value === "number") perfStats.perf[key] = (perfStats.perf[key] || 0) + value;
	}
	function progress(p) {
		if (!silent && showProgress) reportProgress(stderr, p, rootURL, options);
		if (p.type === "ProgressFileComplete") collectPerfStats(p);
	}
	return {
		issue: relativeIssue(silent || !issues ? nullEmitter : genIssueEmitter(stdio, stderr, issueTemplate, uniqueIssues, issuesCollection)),
		error: silent ? nullEmitter : errorEmitter,
		info: infoEmitter,
		debug: emitters.Debug,
		progress,
		result: !silent && summary ? resultEmitter : nullEmitter,
		features: void 0
	};
}
function extractNotableBySelfTimeInGroup(measurements) {
	const notable = /* @__PURE__ */ new Set();
	if (!measurements.length) return notable;
	let highest;
	let highestSelfTime = 0;
	for (const m of measurements) {
		if (m.depth === 0 || !highest) {
			if (highest) notable.add(highest);
			highest = m;
			highestSelfTime = m.totalTimeMs - m.nestedTimeMs;
			continue;
		}
		const selfTime = m.totalTimeMs - m.nestedTimeMs;
		if (selfTime > highestSelfTime) {
			highest = m;
			highestSelfTime = selfTime;
		}
	}
	if (highest) notable.add(highest);
	return notable;
}
function formatIssue(io, templateStr, issue, maxIssueTextWidth) {
	function clean(t) {
		return t.replace(/\s+/, " ");
	}
	const { uri = "", filename, row, col, text, context = issue.line, offset } = issue;
	const contextLeft = clean(context.text.slice(0, offset - context.offset));
	const contextRight = clean(context.text.slice(offset + text.length - context.offset));
	const contextFull = clean(context.text);
	const padContext = " ".repeat(Math.max(maxIssueTextWidth - text.length, 0));
	const rowText = row.toString();
	const colText = col.toString();
	const padRowCol = " ".repeat(Math.max(1, 8 - (rowText.length + colText.length)));
	const suggestions = formatSuggestions(io, issue);
	const msg = issue.message || (issue.isFlagged ? "Forbidden word" : "Unknown word");
	const messageColored = issue.isFlagged ? `{yellow ${msg}}` : msg;
	const substitutions = {
		$col: colText,
		$contextFull: contextFull,
		$contextLeft: contextLeft,
		$contextRight: contextRight,
		$filename: filename,
		$padContext: padContext,
		$padRowCol: padRowCol,
		$row: rowText,
		$suggestions: suggestions,
		$text: text,
		$uri: uri,
		$quickFix: formatQuickFix(io, issue),
		$message: msg,
		$messageColored: messageColored
	};
	const t = templateStr.replaceAll("$messageColored", messageColored);
	return substitute(makeTemplate(io.chalk)(t), substitutions).trimEnd();
}
function formatSuggestions(io, issue) {
	if (issue.suggestionsEx) return issue.suggestionsEx.map((sug) => sug.isPreferred ? io.chalk.italic(io.chalk.bold(sug.wordAdjustedToMatchCase || sug.word)) + "*" : sug.wordAdjustedToMatchCase || sug.word).join(", ");
	if (issue.suggestions) return issue.suggestions.join(", ");
	return "";
}
function formatQuickFix(io, issue) {
	if (!issue.suggestionsEx?.length) return "";
	const preferred = issue.suggestionsEx.filter((sug) => sug.isPreferred).map((sug) => sug.wordAdjustedToMatchCase || sug.word);
	if (!preferred.length) return "";
	return `fix: (${preferred.map((w) => io.chalk.italic(io.chalk.yellow(w))).join(", ")})`;
}
function substitute(text, substitutions) {
	const subs = [];
	for (const [match, replaceWith] of Object.entries(substitutions)) {
		const len = match.length;
		for (let i = text.indexOf(match); i >= 0; i = text.indexOf(match, i)) {
			const end = i + len;
			const reg = /\b/y;
			reg.lastIndex = end;
			if (reg.test(text)) subs.push([
				i,
				end,
				replaceWith
			]);
			i = end;
		}
	}
	subs.sort((a, b) => a[0] - b[0]);
	let i = 0;
	function sub(r) {
		const [a, b, t] = r;
		const prefix = text.slice(i, a);
		i = b;
		return prefix + t;
	}
	return subs.map(sub).join("") + text.slice(i);
}
function assertCheckTemplate(template) {
	const r = checkTemplate(template);
	if (r instanceof Error) throw r;
}
function checkTemplate(template) {
	const chalkTemplate = makeTemplate(new Chalk());
	const substitutions = {
		$col: "<col>",
		$contextFull: "<contextFull>",
		$contextLeft: "<contextLeft>",
		$contextRight: "<contextRight>",
		$filename: "<filename>",
		$padContext: "<padContext>",
		$padRowCol: "<padRowCol>",
		$row: "<row>",
		$suggestions: "<suggestions>",
		$text: "<text>",
		$uri: "<uri>",
		$quickFix: "<quickFix>",
		$message: "<message>",
		$messageColored: "<messageColored>"
	};
	try {
		const problems = [...substitute(chalkTemplate(template), substitutions).matchAll(/\$[a-z]+/gi)].map((m) => m[0]);
		if (problems.length) throw new Error(`Unresolved template variable${problems.length > 1 ? "s" : ""}: ${problems.map((v) => `'${v}'`).join(", ")}`);
		return true;
	} catch (e) {
		return new ApplicationError(e instanceof Error ? e.message : `${e}`);
	}
}
//#endregion
//#region src/config/adjustConfig.ts
async function fileExists(url) {
	if (url.protocol !== "file:") return false;
	try {
		return (await promises.stat(url)).isFile();
	} catch (e) {
		if (toError$1(e).code === "ENOENT") return false;
		throw e;
	}
}
async function resolveImports(configFile, imports) {
	const fromConfigDir = new URL("./", configFile.url);
	const fromCurrentDir = toFileDirURL("./");
	const require = createRequire(fromConfigDir);
	function isPackageName(name) {
		try {
			require.resolve(name, { paths: [fileURLToPath(fromConfigDir)] });
			return true;
		} catch {
			return false;
		}
	}
	const _imports = [];
	for (const imp of imports) {
		const url = new URL(imp, fromCurrentDir);
		if (url.protocol !== "file:") {
			_imports.push(imp);
			continue;
		}
		if (await fileExists(url)) {
			let rel = urlRelative(fromConfigDir, url);
			if (!(rel.startsWith("./") || rel.startsWith("../"))) rel = "./" + rel;
			_imports.push(rel);
			continue;
		}
		if (url.protocol !== "file:") {
			_imports.push(url.href);
			continue;
		}
		if (isPackageName(imp)) {
			_imports.push(imp);
			continue;
		}
		throw new Error(`Cannot resolve import: ${imp}`);
	}
	return _imports;
}
function addImportsToMutableConfigFile(configFile, resolvedImports, comment) {
	let importNode = configFile.getNode("import", []);
	if (importNode.type === "scalar") {
		configFile.setValue("import", [importNode.value]);
		importNode = configFile.getNode("import", []);
	}
	assert(isCfgArrayNode(importNode));
	const knownImports = new Set(importNode.value);
	for (const imp of resolvedImports) {
		if (knownImports.has(imp)) continue;
		importNode.push(imp);
	}
	if (comment) configFile.setComment("import", comment);
}
async function addImportsToConfigFile(configFile, imports, comment) {
	const resolvedImports = await resolveImports(configFile, imports);
	if (configFile instanceof MutableCSpellConfigFile) return addImportsToMutableConfigFile(configFile, resolvedImports, comment);
	const settings = configFile.settings;
	let importNode = settings.import;
	if (!Array.isArray(importNode)) {
		importNode = typeof importNode === "string" ? [importNode] : [];
		settings.import = importNode;
		if (comment) configFile.setComment("import", comment);
	}
	assert(Array.isArray(importNode));
	const knownImports = new Set(importNode);
	for (const imp of resolvedImports) {
		if (knownImports.has(imp)) continue;
		importNode.push(imp);
	}
}
function setConfigFieldValue(configFile, key, value, comment) {
	configFile.setValue(key, value);
	if (comment !== void 0) configFile.setComment(key, comment);
}
function addDictionariesToConfigFile(configFile, dictionaries, comment) {
	if (configFile instanceof MutableCSpellConfigFile) {
		const found = configFile.getValue("dictionaries");
		const dicts = configFile.getNode("dictionaries", []);
		assert(isCfgArrayNode(dicts));
		const knownDicts = new Set(dicts.value);
		for (const dict of dictionaries) if (!knownDicts.has(dict)) {
			dicts.push(dict);
			knownDicts.add(dict);
		}
		if (!found && comment) configFile.setComment("dictionaries", comment);
		return;
	}
	const dicts = configFile.settings.dictionaries || [];
	const knownDicts = new Set(dicts);
	for (const dict of dictionaries) if (!knownDicts.has(dict)) {
		dicts.push(dict);
		knownDicts.add(dict);
	}
	setConfigFieldValue(configFile, "dictionaries", dicts, comment);
}
//#endregion
//#region src/config/config.ts
function applyValuesToConfigFile(config, settings, defaultValues, addComments) {
	const currentSettings = config.settings || {};
	for (const [k, entry] of Object.entries(defaultValues)) {
		const { value: defaultValue, comment } = entry;
		const key = k;
		const newValue = settings[key];
		const oldValue = currentSettings[key];
		const value = newValue ?? oldValue ?? defaultValue;
		if (newValue === void 0 && oldValue !== void 0 || value === void 0) continue;
		setConfigFieldValue(config, key, value, addComments && oldValue === void 0 && comment || void 0);
	}
	return config;
}
//#endregion
//#region src/config/constants.ts
const defaultConfig = {
	$schema: {
		value: void 0,
		comment: " The schema for the configuration file."
	},
	version: {
		value: "0.2",
		comment: " The version of the configuration file format."
	},
	name: {
		value: void 0,
		comment: " The name of the configuration. Use for display purposes only."
	},
	description: {
		value: void 0,
		comment: " A description of the configuration."
	},
	language: {
		value: "en",
		comment: " The locale to use when spell checking. (e.g., en, en-GB, de-DE"
	},
	import: {
		value: void 0,
		comment: " Configuration or packages to import."
	},
	dictionaryDefinitions: {
		value: void 0,
		comment: " Define user dictionaries."
	},
	dictionaries: {
		value: void 0,
		comment: " Enable the dictionaries."
	},
	ignorePaths: {
		value: void 0,
		comment: " Glob patterns of files to be skipped."
	},
	files: {
		value: void 0,
		comment: " Glob patterns of files to be included."
	},
	words: {
		value: void 0,
		comment: " Words to be considered correct."
	},
	ignoreWords: {
		value: void 0,
		comment: " Words to be ignored."
	},
	flagWords: {
		value: void 0,
		comment: " Words to be flagged as incorrect."
	},
	overrides: {
		value: void 0,
		comment: " Set configuration based upon file globs."
	},
	languageSettings: {
		value: void 0,
		comment: " Define language specific settings."
	},
	enabledFileTypes: {
		value: void 0,
		comment: " Enable for specific file types."
	},
	caseSensitive: {
		value: void 0,
		comment: " Enable case sensitive spell checking."
	},
	patterns: {
		value: void 0,
		comment: " Regular expression patterns."
	},
	ignoreRegExpList: {
		value: void 0,
		comment: " Regular expressions / patterns of text to be ignored."
	},
	includeRegExpList: {
		value: void 0,
		comment: " Regular expressions / patterns of text to be included."
	}
};
//#endregion
//#region src/config/configInit.ts
const schemaRef = cspellConfigFileSchema;
const defaultConfigJson = `\
{
}
`;
const defaultConfigYaml = `
`;
async function configInit(options) {
	const rw = createReaderWriter();
	const configFile = await createConfigFile(rw, determineFileNameURL(options), options);
	await applyOptionsToConfigFile(configFile, options);
	await fs.mkdir(new URL("./", configFile.url), { recursive: true });
	if (options.stdout) console.stdoutChannel.write(rw.serialize(configFile));
	else await rw.writeConfig(configFile);
}
async function applyOptionsToConfigFile(configFile, options) {
	const settings = {};
	const addComments = options.comments || options.comments === void 0 && !options.removeComments && !configFile.url.pathname.endsWith(".json");
	if (options.comments === false) configFile.removeAllComments();
	if (options.schema ?? true) configFile.setSchema(schemaRef);
	if (options.locale) settings.language = options.locale;
	applyValuesToConfigFile(configFile, settings, defaultConfig, addComments);
	if (options.import) await addImportsToConfigFile(configFile, options.import, addComments && defaultConfig.import?.comment || void 0);
	if (options.dictionary) addDictionariesToConfigFile(configFile, options.dictionary, addComments && defaultConfig.dictionaries?.comment || void 0);
	return configFile;
}
function determineFileNameURL(options) {
	if (options.config) return toFileURL(options.config);
	const defaultFileName = determineDefaultFileName(options);
	const outputUrl = toFileURL(options.output || defaultFileName);
	const path = outputUrl.pathname;
	if (path.endsWith(".json") || path.endsWith(".jsonc") || path.endsWith(".yaml") || path.endsWith(".yml")) return outputUrl;
	if (/\.{m,c}?{j,t}s$/.test(path)) throw new Error(`Unsupported file extension: ${path}`);
	return new URL(defaultFileName, toFileDirURL(outputUrl));
}
function determineDefaultFileName(options) {
	switch (options.format || "yaml") {
		case "json": return "cspell.json";
		case "jsonc": return "cspell.jsonc";
		case "yaml": return "cspell.config.yaml";
		case "yml": return "cspell.config.yml";
	}
	throw new Error(`Unsupported format: ${options.format}`);
}
function getDefaultContent(options) {
	switch (options.format) {
		case void 0:
		case "yaml": return defaultConfigYaml;
		case "json":
		case "jsonc": return defaultConfigJson;
		default: throw new Error(`Unsupported format: ${options.format}`);
	}
}
async function createConfigFile(rw, url, options) {
	if (url.pathname.endsWith("package.json")) return rw.readConfig(url);
	const content = await fs.readFile(url, "utf8").catch(() => getDefaultContent(options));
	return rw.parse({
		url,
		content
	});
}
//#endregion
//#region src/featureFlags/featureFlags.ts
function getFeatureFlags() {
	return getSystemFeatureFlags();
}
function parseFeatureFlags(flags, featureFlags = getFeatureFlags()) {
	if (!flags) return featureFlags;
	const flagsKvP = flags.map((f) => f.split(":", 2));
	for (const flag of flagsKvP) {
		const [name, value] = flag;
		try {
			featureFlags.setFlag(name, value);
		} catch {
			console.warn(`Unknown flag: "${name}"`);
		}
	}
	return featureFlags;
}
//#endregion
//#region src/environment.ts
const environmentKeys = {
	CSPELL_ENABLE_DICTIONARY_LOGGING: "CSPELL_ENABLE_DICTIONARY_LOGGING",
	CSPELL_ENABLE_DICTIONARY_LOG_FILE: "CSPELL_ENABLE_DICTIONARY_LOG_FILE",
	CSPELL_ENABLE_DICTIONARY_LOG_FIELDS: "CSPELL_ENABLE_DICTIONARY_LOG_FIELDS",
	CSPELL_GLOB_ROOT: "CSPELL_GLOB_ROOT",
	CSPELL_CONFIG_PATH: "CSPELL_CONFIG_PATH",
	CSPELL_DEFAULT_CONFIG_PATH: "CSPELL_DEFAULT_CONFIG_PATH"
};
function setEnvironmentVariable(key, value) {
	process.env[key] = value;
}
function getEnvironmentVariable(key) {
	return process.env[key];
}
function truthy(value) {
	switch (value?.toLowerCase().trim()) {
		case "t":
		case "true":
		case "on":
		case "yes":
		case "1": return true;
	}
	return false;
}
//#endregion
//#region src/dirname.ts
let _dirname;
try {
	if (typeof import.meta.url !== "string") throw new Error("assert");
	_dirname = fileURLToPath(new URL(".", import.meta.url));
} catch {
	_dirname = __dirname;
}
const pkgDir = _dirname;
const npmPackage = {
	name: "cspell",
	version: "9.8.0",
	engines: { node: ">=20.18" }
};
//#endregion
//#region src/reporters/reporters.ts
function filterFeatureIssues(features, issue, reportOptions) {
	if (issue.issueType === IssueType.directive) return features?.issueType && reportOptions?.validateDirectives || false;
	if (features?.unknownWords) return true;
	if (!reportOptions) return true;
	if (issue.isFlagged || !reportOptions.unknownWords || reportOptions.unknownWords === unknownWordsChoices.ReportAll) return true;
	if (issue.hasPreferredSuggestions && reportOptions.unknownWords !== unknownWordsChoices.ReportFlagged) return true;
	if (issue.hasSimpleSuggestions && reportOptions.unknownWords === unknownWordsChoices.ReportSimple) return true;
	return false;
}
function handleIssue(reporter, issue, reportOptions) {
	if (!reporter.issue) return;
	if (!filterFeatureIssues(reporter.features, issue, reportOptions)) return;
	if (!reporter.features?.contextGeneration && !issue.context) {
		issue = { ...issue };
		issue.context = issue.line;
	}
	return reporter.issue(issue, reportOptions);
}
/**
* Loads reporter modules configured in cspell config file
*/
async function loadReporters(reporters, defaultReporter, config) {
	async function loadReporter(reporterSettings) {
		if (reporterSettings === "default") return defaultReporter;
		if (!Array.isArray(reporterSettings)) reporterSettings = [reporterSettings];
		const [moduleName, settings] = reporterSettings;
		try {
			const { getReporter } = await dynamicImport(moduleName, [process.cwd(), pkgDir]);
			return getReporter(settings, config);
		} catch (e) {
			throw new ApplicationError(`Failed to load reporter ${moduleName}: ${toError$1(e).message}`);
		}
	}
	reporters = !reporters || !reporters.length ? ["default"] : [...reporters];
	return (await Promise.all(reporters.map(loadReporter))).filter((v) => v !== void 0);
}
function finalizeReporter(reporter) {
	if (!reporter) return void 0;
	if (reporterIsFinalized(reporter)) return reporter;
	return {
		issue: (...params) => reporter.issue?.(...params),
		info: (...params) => reporter.info?.(...params),
		debug: (...params) => reporter.debug?.(...params),
		progress: (...params) => reporter.progress?.(...params),
		error: (...params) => reporter.error?.(...params),
		result: (...params) => reporter.result?.(...params),
		features: reporter.features
	};
}
function reporterIsFinalized(reporter) {
	return !!reporter && reporter.features && typeof reporter.issue === "function" && typeof reporter.info === "function" && typeof reporter.debug === "function" && typeof reporter.error === "function" && typeof reporter.progress === "function" && typeof reporter.result === "function" || false;
}
const reportIssueOptionsKeyMap = {
	unknownWords: "unknownWords",
	validateDirectives: "validateDirectives",
	showContext: "showContext"
};
function setValue(options, key, value) {
	if (value !== void 0) options[key] = value;
}
function extractReporterIssueOptions(settings) {
	const src = settings;
	const options = {};
	for (const key in reportIssueOptionsKeyMap) {
		const k = key;
		setValue(options, k, src[k]);
	}
	return options;
}
function mergeReportIssueOptions(a, b) {
	const options = extractReporterIssueOptions(a);
	if (!b) return options;
	for (const key in reportIssueOptionsKeyMap) {
		const k = key;
		setValue(options, k, b[k]);
	}
	return options;
}
var LintReporter = class {
	#reporters = [];
	#config;
	#finalized = false;
	constructor(defaultReporter, config) {
		this.defaultReporter = defaultReporter;
		this.#config = config;
		if (defaultReporter) this.#reporters.push(finalizeReporter(defaultReporter));
	}
	get config() {
		return this.#config;
	}
	set config(config) {
		assert(!this.#finalized, "Cannot change the configuration of a finalized reporter");
		this.#config = config;
	}
	issue(issue, reportOptions) {
		for (const reporter of this.#reporters) handleIssue(reporter, issue, reportOptions);
	}
	info(...params) {
		for (const reporter of this.#reporters) reporter.info(...params);
	}
	debug(...params) {
		for (const reporter of this.#reporters) reporter.debug(...params);
	}
	error(...params) {
		for (const reporter of this.#reporters) reporter.error(...params);
	}
	progress(...params) {
		for (const reporter of this.#reporters) reporter.progress(...params);
	}
	async result(result) {
		await Promise.all(this.#reporters.map((reporter) => reporter.result?.(result)));
	}
	get features() {
		return {
			unknownWords: true,
			issueType: true
		};
	}
	async loadReportersAndFinalize(reporters) {
		assert(!this.#finalized, "Cannot change the configuration of a finalized reporter");
		const loaded = await loadReporters(reporters, this.defaultReporter, this.config);
		this.#reporters = [...new Set(loaded)].map((reporter) => finalizeReporter(reporter));
	}
	emitProgressBegin(filename, fileNum, fileCount) {
		this.progress({
			type: "ProgressFileBegin",
			fileNum,
			fileCount,
			filename
		});
	}
	emitProgressComplete(filename, fileNum, fileCount, result) {
		const numIssues = result.issues.filter((issue) => filterFeatureIssues({}, issue, result.reportIssueOptions)).length;
		for (const reporter of this.#reporters) {
			const progress = clean({
				type: "ProgressFileComplete",
				fileNum,
				fileCount,
				filename,
				elapsedTimeMs: result.elapsedTimeMs,
				processed: result.processed,
				skippedReason: result.skippedReason,
				numErrors: numIssues || result.errors,
				cached: result.cached,
				perf: result.perf,
				issues: reporter.features && result.issues,
				reportIssueOptions: reporter.features && result.reportIssueOptions
			});
			reporter.progress(progress);
		}
		result.issues.forEach((issue) => this.issue(issue, result.reportIssueOptions));
		return numIssues;
	}
};
var ReportItemCollector = class {
	#collection;
	constructor(collection) {
		this.#collection = collection;
	}
	get #items() {
		if (!this.#collection.reportItems) this.#collection.reportItems = [];
		return this.#collection.reportItems;
	}
	get items() {
		return this.#collection.reportItems;
	}
	info(...params) {
		this.#items.push({
			type: "info",
			payload: params
		});
	}
	debug(...params) {
		this.#items.push({
			type: "debug",
			payload: params
		});
	}
	error(...params) {
		this.#items.push({
			type: "error",
			payload: params
		});
	}
};
function replayReportItems(reportItemsCollection, reporter) {
	const items = reportItemsCollection.reportItems;
	if (!items) return;
	for (const item of items) switch (item.type) {
		case "info":
			reporter.info(...item.payload);
			break;
		case "debug":
			reporter.debug(...item.payload);
			break;
		case "error":
			reporter.error(...item.payload);
			break;
	}
}
//#endregion
//#region src/util/async.ts
const asyncMap = operators.opMapAsync;
operators.opFilterAsync;
const asyncAwait = operators.opAwaitAsync;
const asyncFlatten = operators.opFlattenAsync;
//#endregion
//#region src/util/constants.ts
const UTF8 = "utf8";
const STDINProtocol = "stdin:";
const STDINUrlPrefix = "stdin://";
//#endregion
//#region src/util/glob.ts
const defaultExcludeGlobs = ["node_modules/**"];
/**
*
* @param pattern - glob patterns and NOT file paths. It can be a file path turned into a glob.
* @param options - search options.
*/
async function globP(pattern, options) {
	const cwd = options?.root || options?.cwd || process.cwd();
	const ignore = (typeof options?.ignore === "string" ? [options.ignore] : options?.ignore)?.filter((g) => !g.startsWith("../"));
	const onlyFiles = options?.nodir;
	const dot = options?.dot;
	const patterns = typeof pattern === "string" ? [pattern] : pattern;
	const useOptions = clean({
		cwd,
		onlyFiles,
		dot,
		ignore,
		absolute: true,
		followSymbolicLinks: false,
		expandDirectories: false
	});
	const compare = new Intl.Collator("en").compare;
	return (await glob$1(patterns, useOptions)).sort(compare).map((absFilename) => path$1.relative(cwd, absFilename));
}
function calcGlobs(commandLineExclude) {
	const commandLineExcludes = {
		globs: [...new Set((commandLineExclude || []).flatMap((glob) => glob.split(/(?<!\\)\s+/g)).map((g) => g.replaceAll("\\ ", " ")))],
		source: "arguments"
	};
	const defaultExcludes = {
		globs: defaultExcludeGlobs,
		source: "default"
	};
	return commandLineExcludes.globs.length ? commandLineExcludes : defaultExcludes;
}
function extractPatterns(globs) {
	return globs.reduce((info, g) => {
		const source = g.source;
		const patterns = g.matcher.patternsNormalizedToRoot;
		return [...info, ...patterns.map((glob) => ({
			glob,
			source
		}))];
	}, []);
}
function calcExcludeGlobInfo(root, commandLineExclude) {
	commandLineExclude = typeof commandLineExclude === "string" ? [commandLineExclude] : commandLineExclude;
	const choice = calcGlobs(commandLineExclude);
	return [{
		matcher: new GlobMatcher(choice.globs, {
			root,
			dot: true
		}),
		source: choice.source
	}];
}
/**
* Build GlobMatcher from command line or config file globs.
* @param globs Glob patterns or file paths
* @param root - directory to use as the root
*/
function buildGlobMatcher(globs, root, isExclude) {
	return new GlobMatcher(globs.map((g) => {
		return {
			source: typeof g === "string" ? "command line" : void 0,
			...fileOrGlobToGlob(g, root)
		};
	}), {
		root,
		mode: isExclude ? "exclude" : "include"
	});
}
function extractGlobsFromMatcher(globMatcher) {
	return globMatcher.patternsNormalizedToRoot.map((g) => g.glob);
}
function normalizeGlobsToRoot(globs, root, isExclude) {
	return [globs.filter((g) => typeof g === "string" && isPossibleUrlRegExp.test(g)), extractGlobsFromMatcher(buildGlobMatcher(globs.filter((g) => typeof g !== "string" || !isPossibleUrlRegExp.test(g)), root, isExclude))].flat();
}
const isPossibleGlobRegExp = /[()*?[{}]/;
const isPossibleUrlRegExp = /^[\d_a-z-]{3,}:\/\//;
/**
* If a 'glob' is a path to a directory, then append `**` so that
* directory searches work.
* @param glob - a glob, file, or directory
* @param root - root to use.
* @returns `**` is appended directories.
*/
async function adjustPossibleDirectory(glob, root) {
	const g = typeof glob === "string" ? {
		glob,
		root
	} : {
		glob: glob.glob,
		root: glob.root ?? root
	};
	if (isPossibleGlobRegExp.test(g.glob)) return glob;
	if (isPossibleUrlRegExp.test(g.glob)) return glob;
	const dirPath = path$1.resolve(g.root, g.glob);
	try {
		if ((await promises.stat(dirPath)).isDirectory()) {
			const useGlob = posix.join(posixPath(g.glob), "**");
			return typeof glob === "string" ? useGlob : {
				...glob,
				glob: useGlob
			};
		}
	} catch {
		return glob;
	}
	return glob;
}
function posixPath(p) {
	return path$1.sep === "\\" ? p.replaceAll("\\", "/") : p;
}
async function normalizeFileOrGlobsToRoot(globs, root) {
	return normalizeGlobsToRoot(await Promise.all(globs.map((g) => adjustPossibleDirectory(g, root))), root, false);
}
function glob$1(patterns, options) {
	patterns = typeof patterns === "string" ? workaroundPicomatchBug(patterns) : patterns.map((g) => workaroundPicomatchBug(g));
	return glob(patterns, options);
}
//#endregion
//#region src/util/stdin.ts
function readStdin() {
	return readline.createInterface(process.stdin);
}
//#endregion
//#region src/util/stdinUrl.ts
function isStdinUrl(url) {
	if (url instanceof URL) return url.protocol === STDINProtocol;
	return url.startsWith(STDINProtocol);
}
/**
* Normalize and resolve a stdin url.
* @param url - stdin url to resolve.
* @param cwd - file path to resolve relative paths against.
* @returns
*/
function resolveStdinUrl(url, cwd) {
	assert(url.startsWith(STDINProtocol), `Expected url to start with ${STDINProtocol}`);
	const path = decodeURIComponent(url).slice(6).replace(/^\/\//, "").replace(/^\/([a-z]:)/i, "$1");
	const fileUrl = toFileURL(path, cwd);
	return new URL(fileUrl.toString().replace(/^file:/, STDINProtocol) + (path ? "" : "/"));
}
//#endregion
//#region src/util/fileHelper.ts
function fileInfoToDocument(fileInfo, languageId, locale) {
	const { filename, text } = fileInfo;
	languageId = languageId || void 0;
	locale = locale || void 0;
	const uri = filenameToUrl(filename);
	if (uri.href.startsWith("stdin:")) return clean({
		uri: uri.href,
		text,
		languageId,
		locale
	});
	return fileToDocument(uri.href, text, languageId, locale);
}
function filenameToUrl(filename, cwd = ".") {
	if (filename instanceof URL) return filename;
	const cwdURL = toFileDirURL(cwd);
	if (filename === "stdin") return new URL("stdin:///");
	if (isStdinUrl(filename)) return new URL(resolveStdinUrl(filename, cwd));
	return toFileURL(filename, cwdURL);
}
function filenameToUri(filename, cwd) {
	return toURL(filenameToUrl(filename, cwd));
}
function isBinaryFile$1(filename, cwd) {
	const uri = filenameToUri(filename, cwd);
	if (uri.protocol.startsWith("stdin")) return false;
	return isBinaryFile(uri);
}
function resolveFilenameToUrl(filename, cwd) {
	if (filename instanceof URL) return filename;
	if (filename === "stdin") return new URL(STDINUrlPrefix);
	if (filename.startsWith("file:///")) return new URL(filename);
	const cwdUrl = toFileDirURL(cwd || process.cwd());
	if (filename.startsWith("file://")) return new URL(filename.slice(7), cwdUrl);
	if (isStdinUrl(filename)) return resolveStdinUrl(filename, cwdUrl);
	return toFileURL(filename, cwdUrl);
}
function resolveFilename(filename, cwd) {
	return toFilePathOrHref(resolveFilenameToUrl(filename, cwd));
}
function readFileInfo(filename, encoding = UTF8, handleNotFound = false) {
	filename = resolveFilename(filename);
	return (filename.startsWith("stdin:") ? streamConsumers.text(process.stdin) : readFileText(filename, encoding)).then((text) => ({
		text,
		filename
	}), (e) => {
		const error = toError$1(e);
		return handleNotFound && error.code === "EISDIR" ? Promise.resolve({
			text: "",
			filename,
			errorCode: error.code
		}) : handleNotFound && error.code === "ENOENT" ? Promise.resolve({
			text: "",
			filename,
			errorCode: error.code
		}) : Promise.reject(new IOError(`Error reading file: "${filename}"`, error));
	});
}
async function getFileSize(filename) {
	const s = await getStat(filename);
	if (!(s instanceof Error)) return s.size;
	throw s;
}
function readFile(filename, encoding = UTF8) {
	return readFileInfo(filename, encoding).then((info) => info.text);
}
/**
* Looks for matching glob patterns or stdin
* @param globPatterns patterns or stdin
*/
async function findFiles(globPatterns, options) {
	const stdin = [];
	const globPats = globPatterns.filter((filename) => !isStdin(filename) && !filename.startsWith("file://") ? true : (stdin.push(filename), false));
	const globResults = globPats.length ? await globP(globPats, options) : [];
	const cwd = options.cwd || process.cwd();
	return [...stdin, ...globResults].map((filename) => resolveFilename(filename, cwd));
}
const resolveFilenames = asyncMap(resolveFilename);
/**
* Read
* @param listFiles - array of file paths to read that will contain a list of files. Paths contained in each
*   file will be resolved relative to the containing file.
* @returns - a list of files to be processed.
*/
function readFileListFiles(listFiles) {
	let useStdin = false;
	return asyncPipe(mergeAsyncIterables(asyncPipe(listFiles.filter((file) => {
		const isStdin = file === "stdin";
		useStdin = useStdin || isStdin;
		return !isStdin;
	}), asyncMap((file) => readFileListFile(file)), asyncAwait(), asyncFlatten()), useStdin ? readStdin() : []), resolveFilenames);
}
/**
* Read a `listFile` and return the containing file paths resolved relative to the `listFile`.
* @param listFiles - array of file paths to read that will contain a list of files. Paths contained in each
*   file will be resolved relative to the containing file.
* @returns - a list of files to be processed.
*/
async function readFileListFile(listFile) {
	try {
		const relTo = path$1.resolve(path$1.dirname(listFile));
		return (await readFile(listFile)).split("\n").map((a) => a.trim()).filter((a) => !!a).map((file) => path$1.resolve(relTo, file));
	} catch (err) {
		throw toApplicationError(err, `Error reading file list from: "${listFile}"`);
	}
}
function isStdin(filename) {
	return filename === "stdin" || isStdinUrl(filename);
}
async function isFile(filename) {
	if (isStdin(filename)) return true;
	try {
		return (await promises.stat(filename)).isFile();
	} catch {
		return false;
	}
}
async function isDir(filename) {
	try {
		return (await promises.stat(filename)).isDirectory();
	} catch {
		return false;
	}
}
function isNotDir(filename) {
	return isDir(filename).then((a) => !a);
}
function relativeToCwd(filename, cwd = process.cwd()) {
	const urlCwd = toFileDirURL(cwd);
	const url = toFileURL(filename, urlCwd);
	const rel = urlRelative(urlCwd, url);
	if (rel.startsWith("..")) return toFilePathOrHref(url);
	return rel;
}
//#endregion
//#region src/util/cache/file-entry-cache/flatCache.ts
var FlatCache = class {
	#cache;
	constructor(cacheFilename) {
		this.cacheFilename = cacheFilename;
		this.#cache = /* @__PURE__ */ new Map();
	}
	keys() {
		return this.#cache.keys();
	}
	set(key, value) {
		this.#cache.set(key, value);
		return this;
	}
	removeKey(key) {
		this.#cache.delete(key);
	}
	get(key) {
		return this.#cache.get(key);
	}
	async load(ifFound = true) {
		this.#cache.clear();
		try {
			const content = await fs.readFile(this.cacheFilename, "utf8");
			this.#cache = new Map(Object.entries(parse(content)));
		} catch (error) {
			if (!ifFound) throw error;
		}
		return this;
	}
	async save() {
		const dir = new URL(".", this.cacheFilename);
		await fs.mkdir(dir, { recursive: true });
		const content = stringify(Object.fromEntries(this.#cache.entries()));
		await fs.writeFile(this.cacheFilename, content, "utf8");
	}
	/**
	* Clear the cache and remove the cache file from disk.
	*/
	async destroy() {
		this.#cache.clear();
		try {
			await fs.unlink(this.cacheFilename);
		} catch {}
	}
};
/**
*
* @param cachefile - The location of the cache file.
* @returns
*/
function loadCacheFile(cachefile) {
	return new FlatCache(cachefile).load();
}
//#endregion
//#region src/util/cache/file-entry-cache/file-entry-cache.ts
async function createFromFile$1(cacheFileUrl, useChecksum, currentWorkingDir) {
	const fec = new ImplFileEntryCache(await loadCacheFile(cacheFileUrl), useChecksum ?? false, currentWorkingDir);
	await fec.removeNotFoundFiles();
	return fec;
}
var ImplFileEntryCache = class {
	cache;
	useChecksum;
	#normalizedEntries = /* @__PURE__ */ new Map();
	/**
	* To enable relative paths as the key with current working directory
	*/
	currentWorkingDir;
	constructor(cache, useChecksum, currentWorkingDir) {
		this.cache = cache;
		this.useChecksum = useChecksum || false;
		this.currentWorkingDir = currentWorkingDir ? fileURLToPath(currentWorkingDir) : void 0;
	}
	async removeNotFoundFiles() {
		for (const fPath of this.cache.keys()) try {
			const filePath = this.resolveKeyToFile(fPath);
			await fs.stat(filePath);
		} catch (error) {
			if (isNodeError(error) && error.code === "ENOENT") this.cache.removeKey(fPath);
		}
	}
	/**
	* Given a buffer, calculate md5 hash of its content.
	* @param  buffer buffer to calculate hash on
	* @return content hash digest
	*/
	#getHash(buffer) {
		return crypto.createHash("md5").update(buffer).digest("hex");
	}
	async getFileDescriptor(file) {
		let fstat;
		try {
			fstat = await fs.stat(file);
		} catch (error) {
			this.#removeEntry(file);
			return {
				key: file,
				notFound: true,
				err: toError(error)
			};
		}
		if (this.useChecksum) return this.#getFileDescriptorUsingChecksum(file);
		return this.#getFileDescriptorUsingMtimeAndSize(file, fstat);
	}
	#getFileDescriptorUsingMtimeAndSize(file, fstat) {
		const key = this.#getFileKey(file);
		let meta = this.cache.get(key);
		const cacheExists = !!meta;
		const cSize = fstat.size;
		const cTime = fstat.mtime.getTime();
		let isDifferentDate;
		let isDifferentSize;
		if (meta) {
			isDifferentDate = cTime !== meta.mtime;
			isDifferentSize = cSize !== meta.size;
		} else meta = {
			size: cSize,
			mtime: cTime
		};
		const nEntry = {
			key,
			changed: !cacheExists || isDifferentDate || isDifferentSize,
			meta
		};
		this.#normalizedEntries.set(key, nEntry);
		return nEntry;
	}
	async #getFileDescriptorUsingChecksum(file) {
		const key = this.#getFileKey(file);
		let meta = this.cache.get(key);
		const cacheExists = !!meta;
		let contentBuffer;
		try {
			contentBuffer = await fs.readFile(file);
		} catch {
			contentBuffer = "";
		}
		let isDifferent = true;
		const hash = this.#getHash(contentBuffer);
		if (meta) isDifferent = hash !== meta.hash;
		else meta = { hash };
		const nEntry = {
			key,
			changed: !cacheExists || isDifferent,
			meta
		};
		this.#normalizedEntries.set(key, nEntry);
		return nEntry;
	}
	/**
	* Remove an entry from the file-entry-cache. Useful to force the file to still be considered
	* modified the next time the process is run
	*/
	#removeEntry(file) {
		const key = this.#getFileKey(file);
		this.#normalizedEntries.delete(key);
		this.cache.removeKey(key);
	}
	/**
	* Deletes the cache file from the disk and clears the memory cache
	*/
	async destroy() {
		this.#normalizedEntries.clear();
		await this.cache.destroy();
	}
	async #getMetaForFileUsingCheckSum(cacheEntry) {
		const filePath = this.resolveKeyToFile(cacheEntry.key);
		const contentBuffer = await fs.readFile(filePath);
		const hash = this.#getHash(contentBuffer);
		const meta = {
			...cacheEntry.meta,
			hash
		};
		delete meta.size;
		delete meta.mtime;
		return meta;
	}
	async #getMetaForFileUsingMtimeAndSize(cacheEntry) {
		const filePath = this.resolveKeyToFile(cacheEntry.key);
		const stat = await fs.stat(filePath);
		const meta = {
			...cacheEntry.meta,
			size: stat.size,
			mtime: stat.mtime.getTime()
		};
		delete meta.hash;
		return meta;
	}
	/**
	* Sync the files and persist them to the cache
	*/
	async reconcile() {
		await this.removeNotFoundFiles();
		for (const [entryKey, cacheEntry] of this.#normalizedEntries.entries()) try {
			const meta = this.useChecksum ? await this.#getMetaForFileUsingCheckSum(cacheEntry) : await this.#getMetaForFileUsingMtimeAndSize(cacheEntry);
			this.cache.set(entryKey, meta);
		} catch (error) {
			if (!isNodeError(error) || error.code !== "ENOENT") throw error;
		}
		await this.cache.save();
	}
	resolveKeyToFile(entryKey) {
		if (this.currentWorkingDir) return path.resolve(this.currentWorkingDir, entryKey);
		return entryKey;
	}
	#getFileKey(file) {
		if (this.currentWorkingDir && path.isAbsolute(file)) return normalizePath$1(path.relative(this.currentWorkingDir, file));
		return normalizePath$1(file);
	}
};
function isNodeError(error) {
	return typeof error === "object" && error !== null && "code" in error;
}
function toError(error) {
	if (error instanceof Error) return error;
	if (typeof error === "string") return new Error(error);
	return new Error("Unknown error", { cause: error });
}
function normalizePath$1(filePath) {
	if (path.sep === "/") return filePath;
	return filePath.split(path.sep).join("/");
}
//#endregion
//#region src/util/cache/fileEntryCache.ts
function createFromFile(cacheFileUrl, useCheckSum, useRelative) {
	return createFromFile$1(cacheFileUrl, useCheckSum, useRelative ? new URL("./", cacheFileUrl) : void 0);
}
//#endregion
//#region src/util/cache/ObjectCollection.ts
const compare = Intl.Collator().compare;
var ShallowObjectCollection = class {
	tree = {};
	get(v) {
		if (typeof v !== "object" || v === null) return v;
		const keys = Object.entries(v).filter((entry) => entry[1] !== void 0).sort((a, b) => compare(a[0], b[0]));
		let t = this.tree;
		for (const [key, obj] of keys) {
			if (!t.c) t.c = /* @__PURE__ */ new Map();
			const c0 = t.c.get(key);
			const cc = c0 || /* @__PURE__ */ new Map();
			if (!c0) t.c.set(key, cc);
			const c1 = cc.get(obj);
			const ccc = c1 || {};
			if (!c1) cc.set(obj, ccc);
			t = ccc;
		}
		if (t.v) return t.v;
		t.v = v;
		return v;
	}
};
//#endregion
//#region src/util/cache/DiskCache.ts
const META_DATA_VERSION_SUFFIX = "-1-" + Object.keys({
	v: "v",
	r: "r",
	d: "d"
}).join("|");
/**
* Caches cspell results on disk
*/
var DiskCache = class {
	cacheDir;
	dependencyCache = /* @__PURE__ */ new Map();
	dependencyCacheTree = {};
	objectCollection = new ShallowObjectCollection();
	ocCacheFileResult = new ShallowObjectCollection();
	version;
	constructor(cacheFileLocation, useCheckSum, cspellVersion, useUniversalCache, fileEntryCache) {
		this.cacheFileLocation = cacheFileLocation;
		this.useCheckSum = useCheckSum;
		this.cspellVersion = cspellVersion;
		this.useUniversalCache = useUniversalCache;
		this.fileEntryCache = fileEntryCache;
		this.cacheDir = fileURLToPath(new URL("./", cacheFileLocation));
		this.version = calcVersion(cspellVersion);
	}
	async getCachedLintResults(filename) {
		filename = normalizePath(filename);
		const fileDescriptor = await this.fileEntryCache.getFileDescriptor(filename);
		const meta = fileDescriptor.meta;
		const data = meta?.data;
		const result = data?.r;
		const versionMatches = this.version === data?.v;
		if (fileDescriptor.notFound || fileDescriptor.changed || !meta || !result || !versionMatches || !await this.checkDependencies(data.d)) return;
		const dd = { ...data };
		if (dd.d) dd.d = setTreeEntry(this.dependencyCacheTree, dd.d);
		dd.r = dd.r && this.normalizeResult(dd.r);
		meta.data = this.objectCollection.get(dd);
		const hasErrors = !!result && (result.errors > 0 || result.configErrors > 0 || result.issues.length > 0);
		const cached = true;
		const shouldReadFile = hasErrors;
		return {
			...result,
			elapsedTimeMs: void 0,
			fileInfo: shouldReadFile ? await readFileInfo(filename) : { filename },
			cached
		};
	}
	async setCachedLintResults({ fileInfo, elapsedTimeMs: _, cached: __, ...result }, dependsUponFiles) {
		const fileDescriptor = await this.fileEntryCache.getFileDescriptor(fileInfo.filename);
		const meta = fileDescriptor.meta;
		if (fileDescriptor.notFound || !meta) return;
		meta.data = this.objectCollection.get({
			v: this.version,
			r: this.normalizeResult(result),
			d: await this.calcDependencyHashes(dependsUponFiles)
		});
	}
	async reconcile() {
		await this.fileEntryCache.reconcile();
	}
	async reset() {
		await this.fileEntryCache.destroy();
		this.dependencyCache.clear();
		this.dependencyCacheTree = {};
		this.objectCollection = new ShallowObjectCollection();
		this.ocCacheFileResult = new ShallowObjectCollection();
	}
	normalizeResult(result) {
		const { issues, processed, errors, configErrors, reportIssueOptions, ...rest } = result;
		if (!Object.keys(rest).length) return this.ocCacheFileResult.get(result);
		return this.ocCacheFileResult.get({
			issues,
			processed,
			errors,
			configErrors,
			reportIssueOptions
		});
	}
	async calcDependencyHashes(dependsUponFiles) {
		dependsUponFiles.sort();
		const c = getTreeEntry(this.dependencyCacheTree, dependsUponFiles);
		if (c?.d) return c.d;
		const dependencies = await Promise.all(dependsUponFiles.map((f) => this.getDependency(f)));
		return setTreeEntry(this.dependencyCacheTree, dependencies);
	}
	async checkDependency(dep) {
		const depFile = this.resolveFile(dep.f);
		const cDep = this.dependencyCache.get(depFile);
		if (cDep && compDep(dep, cDep)) return true;
		if (cDep) return false;
		const d = await this.getFileDep(depFile);
		if (compDep(dep, d)) {
			this.dependencyCache.set(depFile, dep);
			return true;
		}
		this.dependencyCache.set(depFile, d);
		return false;
	}
	async getDependency(file) {
		const dep = this.dependencyCache.get(file);
		if (dep) return dep;
		const d = await this.getFileDep(file);
		this.dependencyCache.set(file, d);
		return d;
	}
	async getFileDep(file) {
		if (isUrlLike(file)) {
			if (!file.startsWith("file://")) return getDependencyForUrl(file);
			file = toFilePathOrHref(file);
		}
		assert(isAbsolute(file), `Dependency must be absolute "${file}"`);
		const f = this.toRelFile(file);
		let h;
		try {
			const buffer = await fs.readFile(file);
			h = this.getHash(buffer);
		} catch {
			return { f };
		}
		return {
			f,
			h
		};
	}
	async checkDependencies(dependencies) {
		if (!dependencies) return false;
		for (const dep of dependencies) if (!await this.checkDependency(dep)) return false;
		return true;
	}
	getHash(buffer) {
		return crypto.createHash("md5").update(buffer).digest("hex");
	}
	resolveFile(file) {
		if (isUrlLike(file)) return file;
		return normalizePath(resolve(this.cacheDir, file));
	}
	toRelFile(file) {
		return normalizePath(this.useUniversalCache ? relative(this.cacheDir, file) : file);
	}
};
async function getDependencyForUrl(remoteUrl) {
	const url = new URL(remoteUrl);
	try {
		const response = await fetch(url, { method: "HEAD" });
		const h = response.headers.get("etag") || response.headers.get("last-modified") || response.headers.get("content-length") || "";
		return {
			f: url.href,
			h: h ? h.trim() : ""
		};
	} catch {
		return {
			f: url.href,
			h: ""
		};
	}
}
async function createDiskCache(cacheFileLocation, useCheckSum, cspellVersion, useUniversalCache) {
	return new DiskCache(cacheFileLocation, useCheckSum, cspellVersion, useUniversalCache, await createFromFile(cacheFileLocation, useCheckSum, useUniversalCache));
}
function getTreeEntry(tree, keys) {
	let r = tree;
	for (const k of keys) {
		r = r.c?.get(k);
		if (!r) return r;
	}
	return r;
}
function setTreeEntry(tree, deps, update = false) {
	let r = tree;
	for (const d of deps) {
		const k = d.f;
		if (!r.c) r.c = /* @__PURE__ */ new Map();
		const cn = r.c.get(k);
		const n = cn ?? {};
		if (!cn) r.c.set(k, n);
		r = n;
	}
	let d = r.d;
	if (!d || r.d && update) {
		r.d = deps;
		d = deps;
	}
	return d;
}
function compDep(a, b) {
	return a.f === b.f && a.h === b.h;
}
function calcVersion(version) {
	return version + META_DATA_VERSION_SUFFIX;
}
function normalizePath(filePath) {
	if (sep === "/") return filePath;
	return filePath.split(sep).join("/");
}
//#endregion
//#region src/util/cache/DummyCache.ts
/**
* Dummy cache implementation that should be usd if caching option is disabled.
*/
var DummyCache = class {
	getCachedLintResults() {
		return Promise.resolve(void 0);
	}
	setCachedLintResults() {
		return Promise.resolve();
	}
	reconcile() {
		return Promise.resolve();
	}
	reset() {
		return Promise.resolve();
	}
};
//#endregion
//#region src/util/cache/createCache.ts
const DEFAULT_CACHE_LOCATION = ".cspellcache";
const versionSuffix = "";
/**
* Creates CSpellLintResultCache (disk cache if caching is enabled in config or dummy otherwise)
*/
async function createCache(options) {
	const { useCache, cacheLocation, cacheStrategy, reset } = options;
	const location = toFileURL(cacheLocation);
	const useChecksum = cacheStrategy === "content";
	const version = normalizeVersion(options.version);
	const useUniversal = options.cacheFormat === "universal";
	const cache = useCache ? await createDiskCache(location, useChecksum, version, useUniversal) : new DummyCache();
	if (reset) await cache.reset();
	return cache;
}
async function calcCacheSettings(config, cacheOptions, root) {
	const cs = config.cache ?? {};
	const useCache = cacheOptions.cache ?? cs.useCache ?? false;
	const cacheLocation = await resolveCacheLocation(path.resolve(root, cacheOptions.cacheLocation ?? cs.cacheLocation ?? ".cspellcache"));
	const cacheStrategy = cacheOptions.cacheStrategy ?? cs.cacheStrategy ?? "content";
	const cacheFormat = cacheOptions.cacheFormat ?? cs.cacheFormat ?? "universal";
	const optionals = {};
	if (cacheOptions.cacheReset) optionals.reset = true;
	return {
		...optionals,
		useCache,
		cacheLocation,
		cacheStrategy,
		version: cacheOptions.version,
		cacheFormat
	};
}
async function resolveCacheLocation(cacheLocation) {
	try {
		if ((await stat(cacheLocation)).isFile()) return cacheLocation;
		return path.join(cacheLocation, DEFAULT_CACHE_LOCATION);
	} catch (err) {
		if (isErrorLike(err) && err.code === "ENOENT") return cacheLocation;
		throw err;
	}
}
/**
* Normalizes the version and return only `major.minor + versionSuffix`
* @param version The cspell semantic version.
*/
function normalizeVersion(version) {
	const parts = version.split(".").slice(0, 2);
	assert(parts.length === 2);
	return parts.join(".") + versionSuffix;
}
//#endregion
//#region src/util/configFileHelper.ts
async function readConfig(configFile, root, stopConfigSearchAt) {
	configFile ??= getEnvironmentVariable(environmentKeys.CSPELL_CONFIG_PATH);
	if (configFile) return configFileToConfigInfo(typeof configFile === "string" ? await readConfigHandleError(configFile) : configFile);
	const config = await cspell.searchForConfig(root, { stopSearchAt: stopConfigSearchAt });
	const defaultConfigFile = getEnvironmentVariable(environmentKeys.CSPELL_DEFAULT_CONFIG_PATH);
	if (!config && defaultConfigFile) {
		const cfgFile = await readConfigFile(defaultConfigFile).catch(() => void 0);
		if (cfgFile) return configFileToConfigInfo(cfgFile);
	}
	return {
		source: config?.__importRef?.filename || "None found",
		config: config || {}
	};
}
async function configFileToConfigInfo(cfgFile) {
	const config = await cspell.resolveConfigFileImports(cfgFile);
	return {
		source: toFilePathOrHref(cfgFile.url),
		config
	};
}
function readConfigFile(filename) {
	return cspell.readConfigFile(filename);
}
async function readConfigHandleError(filename) {
	try {
		return await readConfigFile(filename);
	} catch (e) {
		const settings = { __importRef: {
			filename: filename.toString(),
			error: e
		} };
		return {
			url: filenameToUrl(filename),
			settings
		};
	}
}
//#endregion
//#region src/util/timer.ts
function getTimeMeasurer() {
	const timer = createPerfTimer("timer");
	return () => timer.elapsed;
}
//#endregion
//#region src/util/unindent.ts
/**
* Indent each line of a multi-line string.
* @param str - multi-line string to left pad
* @param padding - the padding to use for all lines except the first.
* @param firstLinePadding - optional padding of first line.
* @returns
*/
function indent(str, padding, firstLinePadding = "") {
	let pad = firstLinePadding;
	const lines = [];
	for (const line of str.split("\n")) {
		lines.push(pad + line);
		pad = padding;
	}
	return lines.join("\n");
}
/**
* Inject values into a template string while keeping indentation of multi-line values.
* @param template - template string
* @param values- values to inject
* @returns the injected string
*/
function keepIndent(template, ...values) {
	const strings = template;
	const adjValues = [];
	for (let i = 0; i < values.length; ++i) {
		const prevLines = strings[i].split("\n");
		const currLine = prevLines[prevLines.length - 1];
		const padLen = padLength(currLine);
		const padding = " ".repeat(padLen);
		adjValues.push(indent(`${values[i]}`, padding));
	}
	return String.raw({ raw: strings }, ...adjValues);
}
/**
* Calculate the padding at the start of the string.
* @param s - string to evaluate
* @returns number of padding characters
*/
function padLength(s) {
	return s.length - s.trimStart().length;
}
function unindent(templateOrString, ...values) {
	return unindentString(typeof templateOrString === "string" ? templateOrString : keepIndent(templateOrString, ...values));
}
function unindentString(str) {
	const lines = str.split("\n");
	let curPad = str.length;
	for (const line of lines) {
		if (!line.trim()) continue;
		curPad = Math.min(curPad, padLength(line));
	}
	return lines.map((line) => line.slice(curPad)).join("\n");
}
//#endregion
//#region src/util/wrap.ts
const wrapSep = /\s+|(?<=,)|\.(?=\w)/g;
function wordWrapAnsiText(str, maxWidth, indent = "", sep = wrapSep) {
	if (!maxWidth || maxWidth <= 0) return str;
	if (str.length <= maxWidth) return str;
	if (str.includes("\n")) return str.split("\n").map((line) => wordWrapAnsiText(line, maxWidth, indent)).join("\n");
	const fragments = fragmentString(str, sep, "sep");
	const lines = [];
	let line = "";
	for (const text of joinFragments(fragments)) {
		const lineWidth = ansiWidth(line);
		const textWidth = ansiWidth(text);
		if (line && lineWidth + textWidth > maxWidth) {
			if (line) lines.push(line);
			line = indent + text.trimStart();
			continue;
		}
		line += text;
	}
	if (line) lines.push(line);
	return lines.join("\n");
}
function* joinFragments(fragments) {
	let last;
	for (const frag of fragments) {
		if (frag.type === "sep") {
			if (last) yield last.text;
			last = frag;
			continue;
		}
		yield last ? last.text + frag.text : frag.text;
		last = void 0;
	}
	if (last) yield last.text;
}
//#endregion
//#region src/util/writeFile.ts
async function writeFileOrStream(filename, data) {
	switch (filename) {
		case "stdout":
			await writeStream(process.stdout, data);
			return;
		case "stderr":
			await writeStream(process.stderr, data);
			return;
		case "null": return;
	}
	return fs.writeFile(filename, data);
}
function writeStream(stream, data) {
	return new Promise((resolve, reject) => {
		stream.write(data, (err) => {
			if (err) reject(err);
			else resolve();
		});
	});
}
//#endregion
//#region src/util/extractContext.ts
function prefCharIndex(text, offset, count = 1) {
	if (offset - count < 0) return 0;
	for (; count > 0 && offset > 0; count--) {
		let code = text.charCodeAt(--offset) || 0;
		if (code === 65039) code = text.charCodeAt(--offset) || 0;
		offset -= (code & 64512) === 56320 ? 1 : 0;
	}
	return offset < 0 ? 0 : offset;
}
function nextCharIndex(text, offset, count = 1) {
	if (offset + count >= text.length) return text.length;
	for (; count > 0 && offset < text.length; count--) {
		const code = text.charCodeAt(offset++) || 0;
		offset += (code & 64512) === 55296 ? 1 : 0;
		if (text.charCodeAt(offset) === 65039) offset++;
	}
	return offset > text.length ? text.length : offset;
}
function lineContext(lineText, start, end, contextRange) {
	let left = prefCharIndex(lineText, start, contextRange);
	let right = nextCharIndex(lineText, end, contextRange);
	const isLetter = /^\p{L}$/u;
	const isMark = /^\p{M}$/u;
	for (let n = contextRange / 2; n > 0 && left > 0; n--, left--) {
		const c = lineText[left - 1];
		if (isMark.test(c)) {
			if (!isLetter.test(lineText[left - 2])) break;
			left--;
			continue;
		}
		if (!isLetter.test(lineText[left - 1])) break;
	}
	for (let n = contextRange / 2; n > 0 && right < lineText.length; n--, right++) {
		if (!isLetter.test(lineText[right])) break;
		if (isMark.test(lineText[right + 1])) right++;
	}
	left = left < 0 ? 0 : left;
	const t0 = lineText.slice(left, right);
	const tLeft = t0.trimStart();
	left = Math.min(left + t0.length - tLeft.length, start);
	return {
		text: tLeft.trimEnd(),
		offset: left
	};
}
function extractContext(tdo, contextRange) {
	const { line, offset, text } = tdo;
	const start = offset - line.offset;
	const context = lineContext(line.text, start, start + text.length, contextRange);
	context.offset += line.offset;
	return context;
}
//#endregion
//#region src/lint/LinterError.ts
var LinterError = class extends Error {
	constructor(message) {
		super(message);
	}
	toString() {
		return this.message;
	}
};
//#endregion
//#region src/lint/processFile.ts
async function processFile(file, cache, prefetch, processFileOptions) {
	if (prefetch?.fileResult) return prefetch.fileResult;
	const { filename } = file;
	const { cfg, configInfo, userSettings } = processFileOptions;
	const getElapsedTimeMs = getTimeMeasurer();
	const reportIssueOptions = prefetch?.reportIssueOptions;
	const cachedResult = await cache.getCachedLintResults(filename);
	if (cachedResult) return {
		...cachedResult,
		elapsedTimeMs: getElapsedTimeMs(),
		reportIssueOptions: {
			...cachedResult.reportIssueOptions,
			...reportIssueOptions
		}
	};
	const result = {
		fileInfo: { filename },
		issues: [],
		processed: false,
		errors: 0,
		configErrors: 0,
		elapsedTimeMs: 0,
		reportIssueOptions,
		reportItems: void 0
	};
	const reporter = new ReportItemCollector(result);
	const fileInfo = prefetch?.fileInfo || await readFileInfo(filename, void 0, true);
	if (fileInfo.errorCode) {
		if (fileInfo.errorCode !== "EISDIR" && cfg.options.mustFindFiles) {
			const err = new LinterError(`File not found: "${filename}"`);
			reporter.error("Linter:", err);
			result.errors += 1;
		}
		return result;
	}
	const doc = fileInfoToDocument(fileInfo, cfg.options.languageId, cfg.locale);
	const { text } = fileInfo;
	result.fileInfo = fileInfo;
	let spellResult = {};
	try {
		const { showSuggestions: generateSuggestions, validateDirectives, skipValidation } = cfg.options;
		const r = await spellCheckDocument(doc, clean({
			generateSuggestions,
			numSuggestions: configInfo.config.numSuggestions ?? 5,
			validateDirectives,
			skipValidation
		}), userSettings);
		spellResult = r;
		result.processed = r.checked;
		result.perf = r.perf ? { ...r.perf } : void 0;
		result.issues = Text.calculateTextDocumentOffsets(doc.uri, text, r.issues).map(mapIssue);
	} catch (e) {
		reporter.error(`Failed to process "${filename}"`, toError$1(e));
		result.errors += 1;
	}
	result.elapsedTimeMs = getElapsedTimeMs();
	const config = spellResult.settingsUsed ?? {};
	result.reportIssueOptions = mergeReportIssueOptions(spellResult.settingsUsed || configInfo.config, reportIssueOptions);
	result.configErrors += reportSpellingResultConfigErrors(reporter, spellResult, processFileOptions);
	reportCheckResult(result, doc, spellResult, config, processFileOptions);
	const dep = calcDependencies(config);
	await cache.setCachedLintResults(result, dep.files);
	return result;
	function mapIssue({ doc: _, ...tdo }) {
		const context = cfg.showContext ? extractContext(tdo, cfg.showContext) : void 0;
		return clean({
			...tdo,
			context
		});
	}
}
function reportCheckResult(result, _doc, spellResult, config, processFileOptions) {
	const { configInfo, verboseLevel, useColor, cfg, chalk } = processFileOptions;
	const elapsed = result.elapsedTimeMs || 0;
	const dictionaries = config.dictionaries || [];
	const reporter = new ReportItemCollector(result);
	if (verboseLevel > 1) {
		const dictsUsed = [...dictionaries].sort().map((name) => chalk.green(name)).join(", ");
		const msg = unindent`
                    File type: ${config.languageId}, Language: ${config.language}, Issues: ${result.issues.length} ${elapsed.toFixed(2)}ms
                    Config file Used: ${relativeToCwd(spellResult.localConfigFilepath || configInfo.source, cfg.root)}
                    Dictionaries Used:
                      ${wordWrapAnsiText(dictsUsed, 70)}`;
		reporter.info(indent(msg, "  "), MessageTypes.Info);
	}
	if (cfg.options.debug) {
		const { enabled, language, languageId, dictionaries } = config;
		const msg = unindent`\
                Debug Config: ${formatWithOptions({
			depth: 2,
			colors: useColor
		}, {
			languageId,
			enabled,
			language,
			dictionaries
		})}`;
		reporter.debug(msg);
	}
}
function calcDependencies(config) {
	const { configFiles, dictionaryFiles } = extractDependencies(config);
	return { files: [...configFiles, ...dictionaryFiles] };
}
function reportConfigurationErrors(reporter, config, processFileOptions) {
	return reportImportErrors(reporter, extractImportErrors(config), processFileOptions);
}
function reportImportErrors(reporter, errors, processFileOptions) {
	const { configErrors } = processFileOptions;
	let count = 0;
	errors.forEach((ref) => {
		const key = ref.error.toString();
		if (configErrors.has(key)) return;
		configErrors.add(key);
		count += 1;
		reporter.error("Configuration", ref.error);
	});
	return count;
}
function reportSpellingResultConfigErrors(reporter, spellResult, processFileOptions) {
	const { configErrors } = processFileOptions;
	let count = reportImportErrors(reporter, spellResult.configErrors || [], processFileOptions);
	const dictionaryErrors = [...spellResult.dictionaryErrors || []];
	for (const [dictName, dictErrors] of dictionaryErrors) {
		const msg = `Dictionary Error with (${dictName})`;
		dictErrors.forEach((error) => {
			const key = msg + error.toString();
			if (configErrors.has(key)) return;
			configErrors.add(key);
			count += 1;
			reporter.error(msg, error);
		});
	}
	return count;
}
function countConfigErrors(reporter, configInfo, processFileOptions) {
	return reportConfigurationErrors(reporter, configInfo.config, processFileOptions);
}
//#endregion
//#region src/util/prefetch.ts
function* prefetchIterable(iterable, size) {
	assert(size >= 0);
	const buffer = [];
	for (const value of iterable) {
		buffer.push(value);
		if (buffer.length >= size - 1) {
			const value = buffer[0];
			buffer.shift();
			yield value;
		}
	}
	yield* buffer;
}
//#endregion
//#region src/util/unitNumbers.ts
const regexUnitNumber = /^((?:\d+(?:\.\d*)?)|(?:\.\d+))([a-z]*)$/i;
const unitSizes = {
	"": 1,
	b: 1,
	k: 1024,
	kb: 1024,
	m: 1 << 20,
	mb: 1 << 20,
	g: 1 << 30,
	gb: 1 << 30
};
function parseUnitSize(size) {
	const match = size.match(regexUnitNumber);
	const digits = match?.[1] || "";
	const units = (match?.[2] || "").toLowerCase();
	if (!match) return {
		size,
		digits,
		units,
		error: "Invalid size."
	};
	if (!units || units in unitSizes) return {
		size,
		digits,
		units
	};
	return {
		size,
		digits,
		units,
		error: `Unknown units. Valid units are: ${Object.keys(unitSizes).filter(Boolean).join(", ").toUpperCase()}.`
	};
}
function validateUnitSize(size) {
	return parseUnitSize(size).error;
}
function sizeToNumber(size) {
	const p = parseUnitSize(size);
	if (p.error) return NaN;
	return Number.parseFloat(p.digits) * (unitSizes[p.units] || 1);
}
//#endregion
//#region src/lint/processFiles.ts
const BATCH_FETCH_SIZE = 12;
const BATCH_PROCESS_SIZE = 1;
function prefetch(fileToProcess, cfg) {
	const { filename } = fileToProcess;
	if (isBinaryFile$1(filename, cfg.root)) return {
		...fileToProcess,
		result: Promise.resolve({
			skip: true,
			skipReason: "Binary file."
		})
	};
	const reportIssueOptions = extractReporterIssueOptions(cfg.config);
	async function fetch() {
		const getElapsedTimeMs = getTimeMeasurer();
		const cachedResult = await cfg.cache.getCachedLintResults(filename);
		if (cachedResult) return { fileResult: {
			...cachedResult,
			elapsedTimeMs: getElapsedTimeMs()
		} };
		const uri = filenameToUri(filename, cfg.root).href;
		const checkResult = await shouldCheckDocument({ uri }, {}, cfg.config);
		if (!checkResult.shouldCheck) return {
			skip: true,
			skipReason: checkResult.reason || "Ignored by configuration."
		};
		const maxFileSize = processMaxFileSize(cfg.maxFileSize ?? checkResult.settings.maxFileSize);
		if (maxFileSize) {
			if (await getFileSize(filename) > maxFileSize) return {
				skip: true,
				skipReason: `File exceeded max file size of ${maxFileSize.toLocaleString()}`
			};
		}
		return {
			fileInfo: await readFileInfo(filename, void 0, true),
			reportIssueOptions
		};
	}
	const result = fetch().catch((e) => toApplicationError(e));
	return {
		...fileToProcess,
		result
	};
}
async function processFiles(files, options) {
	const status = runResult();
	const cache = await createCache(options.cacheSettings);
	const failFast = options.cfg.options.failFast ?? options.configInfo.config.failFast ?? false;
	const reporter = options.lintReporter;
	const prefetchConfig = {
		root: options.cfg.root,
		maxFileSize: options.cfg.maxFileSize,
		config: options.configInfo.config,
		cache
	};
	const processFileOptionsGeneral = {
		chalk: options.chalk,
		configInfo: options.configInfo,
		cfg: options.cfg,
		verboseLevel: options.verboseLevel,
		useColor: options.useColor,
		configErrors: options.configErrors,
		userSettings: options.configInfo.config
	};
	function* prefetchFiles(files) {
		yield* prefetchIterable(pipe(files, opMap$1((file) => prefetch(file, prefetchConfig))), BATCH_FETCH_SIZE);
	}
	async function* prefetchFilesAsync(files) {
		for await (const file of files) yield prefetch(file, prefetchConfig);
	}
	const emptyResult = {
		fileInfo: { filename: "" },
		issues: [],
		processed: false,
		errors: 0,
		configErrors: 0,
		elapsedTimeMs: 1,
		reportIssueOptions: void 0,
		reportItems: void 0
	};
	async function processPrefetchFileResult(pf) {
		const { filename, sequence, sequenceSize, result: pFetchResult } = pf;
		const getElapsedTimeMs = getTimeMeasurer();
		const fetchResult = await pFetchResult;
		if (fetchResult instanceof Error) throw fetchResult;
		const fileNum = sequence + 1;
		reporter.emitProgressBegin(filename, fileNum, pf.sequenceSize ?? sequence);
		if (fetchResult?.skip) return {
			filename,
			sequence,
			sequenceSize,
			result: {
				...emptyResult,
				fileInfo: { filename },
				elapsedTimeMs: getElapsedTimeMs(),
				skippedReason: fetchResult.skipReason
			}
		};
		return {
			filename,
			sequence,
			sequenceSize,
			result: await processFile(pf, cache, fetchResult, processFileOptionsGeneral)
		};
	}
	async function* loadAndProcessFiles() {
		if (isAsyncIterable(files)) {
			for await (const pf of prefetchFilesAsync(files)) yield processPrefetchFileResult(pf);
			return;
		}
		if (BATCH_PROCESS_SIZE <= 1) {
			for (const pf of prefetchFiles(files)) {
				await pf.result;
				yield processPrefetchFileResult(pf);
			}
			return;
		}
		yield* pipe(prefetchIterable(pipe(prefetchFiles(files), opMap$1(async (pf) => processPrefetchFileResult(pf))), BATCH_PROCESS_SIZE));
	}
	for await (const processed of loadAndProcessFiles()) {
		const { filename, sequence, sequenceSize, result } = processed;
		replayReportItems(result, reporter);
		status.files += 1;
		status.cachedFiles = (status.cachedFiles || 0) + (result.cached ? 1 : 0);
		status.skippedFiles = (status.skippedFiles || 0) + (result.processed ? 0 : 1);
		const fileNum = sequence + 1;
		const numIssues = reporter.emitProgressComplete(filename, fileNum, sequenceSize ?? fileNum, result);
		if (numIssues || result.errors) {
			status.filesWithIssues.add(relativeToCwd(filename, options.cfg.root));
			status.issues += numIssues;
			status.errors += result.errors;
			if (failFast) return status;
		}
		status.errors += result.configErrors;
	}
	await cache.reconcile();
	return status;
}
function processMaxFileSize(value) {
	if (!value) return void 0;
	if (typeof value === "number") return value;
	const num = sizeToNumber(value);
	if (Number.isNaN(num)) throw new ApplicationError(`Invalid max file size: "${value}"`);
	return num;
}
function runResult(init = {}) {
	const { files = 0, filesWithIssues = /* @__PURE__ */ new Set(), issues = 0, errors = 0, cachedFiles = 0 } = init;
	return {
		files,
		filesWithIssues,
		issues,
		errors,
		cachedFiles
	};
}
//#endregion
//#region \0@oxc-project+runtime@0.122.0/helpers/usingCtx.js
function _usingCtx() {
	var r = "function" == typeof SuppressedError ? SuppressedError : function(r, e) {
		var n = Error();
		return n.name = "SuppressedError", n.error = r, n.suppressed = e, n;
	}, e = {}, n = [];
	function using(r, e) {
		if (null != e) {
			if (Object(e) !== e) throw new TypeError("using declarations can only be used with objects, functions, null, or undefined.");
			if (r) var o = e[Symbol.asyncDispose || Symbol["for"]("Symbol.asyncDispose")];
			if (void 0 === o && (o = e[Symbol.dispose || Symbol["for"]("Symbol.dispose")], r)) var t = o;
			if ("function" != typeof o) throw new TypeError("Object is not disposable.");
			t && (o = function o() {
				try {
					t.call(e);
				} catch (r) {
					return Promise.reject(r);
				}
			}), n.push({
				v: e,
				d: o,
				a: r
			});
		} else r && n.push({
			d: e,
			a: r
		});
		return e;
	}
	return {
		e,
		u: using.bind(null, !1),
		a: using.bind(null, !0),
		d: function d() {
			var o, t = this.e, s = 0;
			function next() {
				for (; o = n.pop();) try {
					if (!o.a && 1 === s) return s = 0, n.push(o), Promise.resolve().then(next);
					if (o.d) {
						var r = o.d.call(o.v);
						if (o.a) return s |= 2, Promise.resolve(r).then(next, err);
					} else s |= 1;
				} catch (r) {
					return err(r);
				}
				if (1 === s) return t !== e ? Promise.reject(t) : Promise.resolve();
				if (t !== e) throw t;
			}
			function err(n) {
				return t = t !== e ? new r(n, t) : n, next();
			}
			return next();
		}
	};
}
//#endregion
//#region src/lint/lint.ts
const version = npmPackage.version;
const { opFilterAsync } = operators;
async function runLint(cfg) {
	const reporter = new LintReporter(cfg.reporter, cfg.options);
	const configErrors = /* @__PURE__ */ new Set();
	const verboseLevel = calcVerboseLevel(cfg.options);
	const useColor = cfg.options.color ?? true;
	if (verboseLevel >= 1 && cfg.options.showPerfSummary) enablePerformanceMeasurements();
	const timer = getTimeMeasurer();
	const logDictRequests = truthy(getEnvironmentVariable("CSPELL_ENABLE_DICTIONARY_LOGGING"));
	if (logDictRequests) dictionaryCacheEnableLogging(true);
	const lintResult = await run();
	if (logDictRequests) await writeDictionaryLog();
	await reporter.result(lintResult);
	const elapsed = timer();
	if (getFeatureFlags().getFlag("timer") || verboseLevel >= 1 || cfg.options.showPerfSummary) console.error(`Elapsed Time: ${elapsed.toFixed(2)}ms`);
	return lintResult;
	async function run() {
		try {
			var _usingCtx$1 = _usingCtx();
			_usingCtx$1.u(measurePerf("runLint"));
			if (cfg.options.root) setEnvironmentVariable(ENV_CSPELL_GLOB_ROOT, cfg.root);
			const configInfo = await readConfig(cfg.configFile, cfg.root, cfg.options.stopConfigSearchAt);
			const processFileOptions = getProcessFileOptions(configInfo);
			if (cfg.options.defaultConfiguration !== void 0) configInfo.config.loadDefaultConfiguration = cfg.options.defaultConfiguration;
			configInfo.config = mergeSettings(configInfo.config, cfg.cspellSettingsFromCliOptions);
			const reporterConfig = clean({
				maxNumberOfProblems: configInfo.config.maxNumberOfProblems,
				maxDuplicateProblems: configInfo.config.maxDuplicateProblems,
				minWordLength: configInfo.config.minWordLength,
				...cfg.options,
				console
			});
			const reporters = cfg.options.reporter ?? configInfo.config.reporters;
			reporter.config = reporterConfig;
			await reporter.loadReportersAndFinalize(reporters);
			setLogger(getLoggerFromReporter(reporter, useColor));
			const globInfo = await determineGlobs(configInfo, cfg);
			const { fileGlobs, excludeGlobs } = globInfo;
			const hasFileLists = !!cfg.fileLists.length;
			if (!fileGlobs.length && !hasFileLists && !cfg.files?.length) return runResult();
			header(fileGlobs, excludeGlobs);
			checkGlobs(fileGlobs, reporter);
			if (verboseLevel > 1) reporter.info(`Config Files Found:\n    ${relativeToCwd(configInfo.source)}\n`, MessageTypes$1.Info);
			const configErrorCount = countConfigErrors(reporter, configInfo, processFileOptions);
			if (configErrorCount && cfg.options.exitCode !== false && !cfg.options.continueOnError) return runResult({ errors: configErrorCount });
			const { root } = cfg;
			try {
				const cacheSettings = await calcCacheSettings(configInfo.config, {
					...cfg.options,
					version
				}, root);
				const result = await processFiles(await determineFilesToCheck(configInfo, cfg, reporter, globInfo), {
					chalk,
					configInfo,
					cfg,
					verboseLevel,
					useColor,
					configErrors,
					userSettings: configInfo.config,
					lintReporter: reporter,
					cacheSettings
				});
				if (configErrorCount && cfg.options.exitCode !== false) result.errors ||= configErrorCount;
				return result;
			} catch (e) {
				const err = toApplicationError(e);
				reporter.error("Linter", err);
				return runResult({ errors: 1 });
			}
		} catch (_) {
			_usingCtx$1.e = _;
		} finally {
			_usingCtx$1.d();
		}
	}
	function header(files, cliExcludes) {
		if (verboseLevel < 2) return;
		const formattedFiles = files.length > 100 ? [...files.slice(0, 100), "..."] : files;
		reporter.info(unindent`
                cspell;
                Date: ${(/* @__PURE__ */ new Date()).toUTCString()}
                Options:
                    verbose:   ${yesNo(!!cfg.options.verbose)}
                    config:    ${cfg.configFile || "default"}
                    exclude:   ${wordWrapAnsiText(cliExcludes.join(", "), 60, "  ")}
                    files:     ${formattedFiles}
                    wordsOnly: ${yesNo(!!cfg.options.wordsOnly)}
                    unique:    ${yesNo(!!cfg.options.unique)}
                `, MessageTypes$1.Info);
	}
	function getProcessFileOptions(configInfo) {
		return {
			chalk,
			configInfo,
			cfg,
			verboseLevel,
			useColor,
			configErrors,
			userSettings: configInfo.config
		};
	}
}
function checkGlobs(globs, reporter) {
	globs.filter((g) => g.startsWith("'") || g.endsWith("'")).map((glob) => chalk.yellow(glob)).forEach((glob) => reporter.error("Linter", new CheckFailed(`Glob starting or ending with ' (single quote) is not likely to match any files: ${glob}.`)));
}
async function determineGlobs(configInfo, cfg) {
	const useGitignore = cfg.options.gitignore ?? configInfo.config.useGitignore ?? false;
	const gitignoreRoots = cfg.options.gitignoreRoot ?? configInfo.config.gitignoreRoot;
	const gitIgnore = useGitignore ? await generateGitIgnore(gitignoreRoots) : void 0;
	const cliGlobs = cfg.fileGlobs;
	const allGlobs = cliGlobs.length && cliGlobs || cfg.options.filterFiles !== false && configInfo.config.files || [];
	const combinedGlobs = await normalizeFileOrGlobsToRoot(allGlobs, cfg.root);
	const normalizedExcludes = normalizeGlobsToRoot(extractPatterns(cfg.excludes).map((p) => p.glob), cfg.root, true);
	return {
		allGlobs,
		gitIgnore,
		fileGlobs: combinedGlobs.filter((g) => !g.startsWith("!")),
		excludeGlobs: [...combinedGlobs.filter((g) => g.startsWith("!")).map((g) => g.slice(1)), ...normalizedExcludes],
		normalizedExcludes
	};
}
async function* filesToProcessAsync(filenames) {
	let sequence = 0;
	for await (const filename of filenames) yield {
		filename,
		sequence: sequence++
	};
}
function filesToProcess(files) {
	const filenames = [...files];
	const sequenceSize = filenames.length;
	return filenames.map((filename, sequence) => ({
		filename,
		sequence,
		sequenceSize
	}));
}
async function determineFilesToCheck(configInfo, cfg, reporter, globInfo) {
	async function _determineFilesToCheck() {
		const { fileLists } = cfg;
		const hasFileLists = !!fileLists.length;
		const { allGlobs, gitIgnore, fileGlobs, excludeGlobs, normalizedExcludes } = globInfo;
		const { root } = cfg;
		const globsToExcludeRaw = [...configInfo.config.ignorePaths || [], ...excludeGlobs];
		const globsToExclude = globsToExcludeRaw.filter((g) => !globPattern(g).startsWith("!"));
		if (globsToExclude.length !== globsToExcludeRaw.length) {
			const msg = `Negative glob exclusions are not supported: ${globsToExcludeRaw.map((g) => globPattern(g)).filter((g) => g.startsWith("!")).join(", ")}`;
			reporter.info(msg, MessageTypes$1.Warning);
		}
		const globMatcher = buildGlobMatcher(globsToExclude, root, true);
		const globOptions = {
			root,
			cwd: root,
			ignore: [...extractGlobsFromMatcher(globMatcher), ...normalizedExcludes],
			nodir: true
		};
		const enableGlobDot = cfg.enableGlobDot ?? configInfo.config.enableGlobDot;
		if (enableGlobDot !== void 0) globOptions.dot = enableGlobDot;
		const opFilterExcludedFiles = opFilter(filterOutExcludedFilesFn(globMatcher));
		const includeFilter = createIncludeFileFilterFn(allGlobs, root, enableGlobDot);
		const rawCliFiles = cfg.files?.map((file) => resolveFilename(file, root)).filter(includeFilter);
		const cliFiles = cfg.options.mustFindFiles ? rawCliFiles : rawCliFiles && pipeAsync(rawCliFiles, opFilterAsync(isFile));
		const foundFiles = hasFileLists ? concatAsyncIterables(cliFiles, await useFileLists(fileLists, includeFilter)) : cliFiles || await findFiles(fileGlobs, globOptions);
		const filtered = gitIgnore ? await gitIgnore.filterOutIgnored(foundFiles) : foundFiles;
		return isAsyncIterable(filtered) ? pipeAsync(filtered, opFilterExcludedFiles, filesToProcessAsync) : filesToProcess(pipe(filtered, opFilterExcludedFiles));
	}
	function isExcluded(filename, globMatcherExclude) {
		if (isBinaryFile(toFileURL(filename))) return true;
		const { root } = cfg;
		const absFilename = path$1.resolve(root, filename);
		const r = globMatcherExclude.matchEx(absFilename);
		if (r.matched) {
			const { glob, source } = extractGlobSource(r.pattern);
			if (calcVerboseLevel(cfg.options) > 1) reporter.info(`Excluded File: ${path$1.relative(root, absFilename)}; Excluded by ${glob} from ${source}`, MessageTypes$1.Info);
		}
		return r.matched;
	}
	function filterOutExcludedFilesFn(globMatcherExclude) {
		const excludeInfo = globMatcherExclude.patterns.map(extractGlobSource).map(({ glob, source }) => `Glob: ${glob} from ${source}`).filter(uniqueFn());
		if (calcVerboseLevel(cfg.options) > 1) reporter.info(`Exclusion Globs: \n    ${excludeInfo.join("\n    ")}\n`, MessageTypes$1.Info);
		return (filename) => !isExcluded(filename, globMatcherExclude);
	}
	return _determineFilesToCheck();
}
function extractGlobSource(g) {
	const { glob, rawGlob, source } = g;
	return {
		glob: rawGlob || glob,
		source
	};
}
function yesNo(value) {
	return value ? "Yes" : "No";
}
function getLoggerFromReporter(reporter, useColor) {
	const inspectOptions = { colors: useColor };
	const log = (...params) => {
		const msg = formatWithOptions(inspectOptions, ...params);
		reporter.info(msg, "Info");
	};
	const error = (...params) => {
		const msg = formatWithOptions(inspectOptions, ...params);
		reporter.error(msg, {
			message: "",
			name: "error",
			toString: () => ""
		});
	};
	const warn = (...params) => {
		const msg = formatWithOptions(inspectOptions, ...params);
		reporter.info(msg, "Warning");
	};
	return {
		log,
		warn,
		error
	};
}
async function generateGitIgnore(roots) {
	const root = (typeof roots === "string" ? [roots].filter((r) => !!r) : roots) || [];
	if (!root?.length) {
		const cwd = process.cwd();
		const repo = await findRepoRoot(cwd) || cwd;
		root.push(repo);
	}
	return new GitIgnore(root?.map((p) => path$1.resolve(p)));
}
async function useFileLists(fileListFiles, filterFiles) {
	return pipeAsync(readFileListFiles(fileListFiles), opFilter(filterFiles), opFilterAsync(isNotDir));
}
function createIncludeFileFilterFn(includeGlobPatterns, root, dot) {
	if (!includeGlobPatterns?.length) return () => true;
	const patterns = includeGlobPatterns.map((g) => g === "." ? "/**" : g);
	const options = {
		root,
		mode: "include"
	};
	if (dot !== void 0) options.dot = dot;
	const globMatcher = new GlobMatcher(patterns, options);
	return (file) => globMatcher.match(file);
}
async function* concatAsyncIterables(...iterables) {
	for (const iter of iterables) {
		if (!iter) continue;
		yield* iter;
	}
}
async function writeDictionaryLog() {
	const fields = (getEnvironmentVariable("CSPELL_ENABLE_DICTIONARY_LOG_FIELDS") || "time, word, value").split(",").map((f) => f.trim());
	const data = fields.join(", ") + "\n" + dictionaryCacheGetLog().filter((d) => d.method === "has").map((d) => fields.map((f) => f in d ? `${d[f]}` : "").join(", ")).join("\n") + "\n";
	await writeFileOrStream(getEnvironmentVariable("CSPELL_ENABLE_DICTIONARY_LOG_FILE") || "cspell-dictionary-log.csv", data);
}
function globPattern(g) {
	return typeof g === "string" ? g : g.glob;
}
function calcVerboseLevel(options) {
	return options.verboseLevel ?? (options.verbose ? 1 : 0);
}
//#endregion
//#region src/lint/LintRequest.ts
const defaultContextRange = 20;
var LintRequest = class {
	locale;
	configFile;
	excludes;
	root;
	showContext;
	enableGlobDot;
	fileLists;
	files;
	cspellSettingsFromCliOptions;
	maxFileSize;
	constructor(fileGlobs, options, reporter) {
		this.fileGlobs = fileGlobs;
		this.options = options;
		this.reporter = reporter;
		this.root = path$1.resolve(options.root || process.cwd());
		this.configFile = options.config;
		this.excludes = calcExcludeGlobInfo(this.root, options.exclude);
		this.locale = options.locale ?? options.local ?? "";
		this.enableGlobDot = options.dot;
		this.showContext = Math.max(options.showContext === true ? defaultContextRange : options.showContext ? options.showContext : 0, 0);
		this.fileLists = (options.fileList ?? options.fileLists) || [];
		this.files = mergeFiles(options.file, options.files);
		const noConfigSearch = options.configSearch === false ? true : options.configSearch === true ? false : void 0;
		const languageSettings = [{
			languageId: "*",
			locale: "*",
			dictionaries: [...(options.disableDictionary ?? []).map((d) => `!${d}`), ...(options.dictionary ?? []).map((d) => `!!${d}`)]
		}];
		this.cspellSettingsFromCliOptions = {
			...noConfigSearch !== void 0 ? { noConfigSearch } : {},
			...extractUnknownWordsConfig(options),
			languageSettings
		};
		this.maxFileSize = options.maxFileSize ? sizeToNumber(options.maxFileSize) : void 0;
	}
};
function mergeFiles(a, b) {
	const files = merge(a, b);
	if (!files) return void 0;
	return [...new Set(files.flatMap((a) => a.split("\n").map((a) => a.trim())).filter((a) => !!a))];
}
function merge(a, b) {
	if (!a) return b;
	if (!b) return a;
	return [...a, ...b];
}
function extractUnknownWordsConfig(options) {
	const config = {};
	if (!options.report) return config;
	switch (options.report) {
		case "all":
			config.unknownWords = unknownWordsChoices.ReportAll;
			break;
		case "simple":
			config.unknownWords = unknownWordsChoices.ReportSimple;
			break;
		case "typos":
			config.unknownWords = unknownWordsChoices.ReportCommonTypos;
			break;
		case "flagged":
			config.unknownWords = unknownWordsChoices.ReportFlagged;
			break;
	}
	return config;
}
//#endregion
//#region src/options.ts
const ReportChoicesAll = [
	"all",
	"simple",
	"typos",
	"flagged"
];
function fixLegacy(opts) {
	const { local, ...rest } = opts;
	if (local && !rest.locale) rest.locale = local;
	return rest;
}
function cvtLinterCliCommandOptionsToLinterCliOptions(options) {
	const { verbose: verboseLevel, ...optionsRest } = options;
	const cliOptions = { ...optionsRest };
	if (verboseLevel) {
		cliOptions.verboseLevel = verboseLevel;
		cliOptions.verbose = true;
	}
	return cliOptions;
}
//#endregion
//#region src/repl/index.ts
function simpleRepl() {
	return new SimpleRepl();
}
var SimpleRepl = class {
	beforeEach;
	completer;
	_history;
	rl;
	constructor(prompt = "> ") {
		this.prompt = prompt;
		this._history = [];
		this.rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
			prompt,
			history: this._history,
			historySize: 100,
			completer: (line) => this._completer(line)
		});
		this.rl.on("history", (h) => (this._history = h, void 0));
	}
	question(query) {
		return new Promise((resolve) => {
			this.rl.question(query, resolve);
		});
	}
	_completer(line) {
		if (this.completer) return this.completer(line);
		return [this._history.filter((h) => h.startsWith(line)), line];
	}
	get history() {
		return this._history;
	}
	[Symbol.asyncIterator]() {
		const next = () => {
			if (this.beforeEach) this.beforeEach();
			return this.question(this.prompt).then((value) => ({ value })).catch(() => ({
				done: true,
				value: void 0
			}));
		};
		return { next };
	}
};
//#endregion
//#region src/dictionaries/listDictionaries.ts
const inlineDictionaries = {
	"[words]": {
		name: "[words]",
		description: "List of words to be included in the spell check.",
		enabled: true,
		blocked: false
	},
	"[flagWords]": {
		name: "[flagWords]",
		description: "List of words to be flagged as incorrect.",
		enabled: true,
		blocked: false
	},
	"[ignoreWords]": {
		name: "[ignoreWords]",
		description: "List of words to be ignored in the spell check.",
		enabled: true,
		blocked: false
	},
	"[suggestWords]": {
		name: "[suggestWords]",
		description: "List of spelling suggestions for words.",
		enabled: true,
		blocked: false
	}
};
function splitList(list) {
	if (!list) return [];
	if (typeof list === "string") return list.split(",").map((s) => s.trim()).filter((s) => !!s);
	return list.flatMap((s) => splitList(s));
}
function extractDictionaryLocalesAndFileTypes(config) {
	const map = /* @__PURE__ */ new Map();
	function getDict(name) {
		const found = map.get(name);
		if (found) return found;
		const dict = {
			locales: /* @__PURE__ */ new Set(),
			fileTypes: /* @__PURE__ */ new Set()
		};
		map.set(name, dict);
		return dict;
	}
	const languageSettings = config.languageSettings || [];
	for (const lang of languageSettings) {
		const locales = splitList(lang.locale);
		const fileTypes = splitList(lang.languageId);
		const dicts = lang.dictionaries || [];
		for (const dictName of dicts) {
			const dict = getDict(dictName);
			for (const locale of locales) if (locale) dict.locales.add(locale);
			for (const fileType of fileTypes) if (fileType) dict.fileTypes.add(fileType);
		}
	}
	return map;
}
function extractInlineDictionaries(dict) {
	const iDict = dict;
	const inline = [];
	if (iDict.words?.length) inline.push("[words]");
	if (iDict.flagWords?.length) inline.push("[flagWords]");
	if (iDict.ignoreWords?.length) inline.push("[ignoreWords]");
	if (iDict.suggestWords?.length) inline.push("[suggestWords]");
	return inline.length ? inline : void 0;
}
function extractSpecialDictionaries(config) {
	const specialDictionaries = [];
	if (config.words?.length) specialDictionaries.push(inlineDictionaries["[words]"]);
	if (config.flagWords?.length) specialDictionaries.push(inlineDictionaries["[flagWords]"]);
	if (config.ignoreWords?.length) specialDictionaries.push(inlineDictionaries["[ignoreWords]"]);
	if (config.suggestWords?.length) specialDictionaries.push(inlineDictionaries["[suggestWords]"]);
	return specialDictionaries;
}
async function listDictionaries(options) {
	const configFile = await readConfig(options.config, void 0);
	const configBase = mergeSettings(await getDefaultSettings(options.defaultConfiguration ?? configFile.config.loadDefaultConfiguration ?? true), await getGlobalSettingsAsync(), configFile.config);
	const useFileType = options.fileType === "text" ? "plaintext" : options.fileType;
	if (options.locale) configBase.language = options.locale;
	const config = combineTextAndLanguageSettings(configBase, "", useFileType || configBase.languageId || "plaintext");
	const dictRefs = createDictionaryReferenceCollection(config.dictionaries || []);
	const allDictionaries = [...dictRefs.enabled(), ...dictRefs.blocked()];
	const dictionaryLocalesAndFileTypes = extractDictionaryLocalesAndFileTypes({
		...config,
		dictionaries: allDictionaries
	});
	const enabledDictionaries = new Set(dictRefs.enabled());
	const blockedDictionaries = new Set(dictRefs.blocked());
	function toListDictionariesResult(dict) {
		const inline = extractInlineDictionaries(dict);
		return {
			name: dict.name,
			description: dict.description,
			enabled: enabledDictionaries.has(dict.name),
			blocked: blockedDictionaries.has(dict.name),
			path: dict.path,
			inline,
			locales: [...dictionaryLocalesAndFileTypes.get(dict.name)?.locales || []].sort(),
			fileTypes: [...dictionaryLocalesAndFileTypes.get(dict.name)?.fileTypes || []].sort()
		};
	}
	function filterDicts(dict) {
		if (options.enabled === void 0) return true;
		return options.enabled === enabledDictionaries.has(dict.name);
	}
	const dictionaryDefinitions = (config.dictionaryDefinitions || []).filter(filterDicts);
	dictionaryDefinitions.sort((a, b) => a.name.localeCompare(b.name));
	return [...options.enabled !== false ? extractSpecialDictionaries(config) : [], ...dictionaryDefinitions.map(toListDictionariesResult)];
}
//#endregion
//#region src/application.mts
function lint(fileGlobs, options, reporter) {
	options = fixLegacy(options);
	const unknownWordsConfig = extractUnknownWordsConfig(options);
	const useOptions = {
		...options,
		...unknownWordsConfig
	};
	const reporterOptions = {
		...useOptions,
		console
	};
	return runLint(new LintRequest(fileGlobs, useOptions, finalizeReporter(reporter) ?? getReporter({
		...useOptions,
		fileGlobs
	}, reporterOptions)));
}
async function* trace(words, options) {
	options = fixLegacy(options);
	const iWords = options.stdin ? toAsyncIterable(words, readStdin()) : words;
	const { languageId, locale, allowCompoundWords, ignoreCase } = options;
	const configFile = await readConfig(options.config, void 0);
	const loadDefault = options.defaultConfiguration ?? configFile.config.loadDefaultConfiguration ?? true;
	const additionalSettings = {};
	if (options.dictionary) additionalSettings.dictionaries = options.dictionary;
	yield* traceWordsAsync(iWords, mergeSettings(await getDefaultSettings(loadDefault), await getGlobalSettingsAsync(), configFile.config, additionalSettings), clean({
		languageId,
		locale,
		ignoreCase,
		allowCompoundWords
	}));
}
async function checkText(filename, options) {
	options = fixLegacy(options);
	const fileInfo = await readFileInfo(filename);
	const { locale, languageId, validateDirectives } = options;
	const doc = fileInfoToDocument(fileInfo, languageId, locale);
	const checkOptions = {
		configFile: options.config,
		validateDirectives
	};
	const settingsFromCommandLine = clean({
		languageId,
		language: locale,
		loadDefaultConfiguration: options.defaultConfiguration
	});
	return checkTextDocument(doc, clean({ ...checkOptions }), settingsFromCommandLine);
}
async function* suggestions(words, options) {
	options = fixLegacy(options);
	const configFile = await readConfig(options.config, void 0);
	let timer;
	function tapStart() {
		timer = getTimeMeasurer();
	}
	function mapStart(v) {
		tapStart();
		return v;
	}
	function mapEnd(v) {
		const elapsedTimeMs = timer?.();
		return elapsedTimeMs ? {
			...v,
			elapsedTimeMs
		} : v;
	}
	const iWords = options.repl ? pipeAsync(toAsyncIterable(words, simpleRepl()), opTap(tapStart)) : options.useStdin ? pipeAsync(toAsyncIterable(words, readStdin()), opTap(tapStart)) : words.map(mapStart);
	try {
		yield* pipeAsync(suggestionsForWords(iWords, clean({ ...options }), configFile.config), opMap(mapEnd));
	} catch (e) {
		if (!(e instanceof SuggestionError)) throw e;
		console.error(e.message);
		process.exitCode = 1;
	}
}
function createInit(options) {
	return configInit(options);
}
function registerApplicationFeatureFlags() {
	const ff = getFeatureFlags();
	[{
		name: "timer",
		description: "Display elapsed time for command."
	}].forEach((flag) => ff.register(flag));
	return ff;
}
function parseApplicationFeatureFlags(flags) {
	return parseFeatureFlags(flags, registerApplicationFeatureFlags());
}
//#endregion
export { ApplicationError as C, width as S, console as T, padLeft as _, parseApplicationFeatureFlags as a, pruneAnsiTextEnd as b, listDictionaries as c, validateUnitSize as d, unindent as f, tableToLines as g, getReporter as h, lint as i, ReportChoicesAll as l, npmPackage as m, checkText as n, suggestions as o, DEFAULT_CACHE_LOCATION as p, createInit as r, trace as s, IncludeExcludeFlag as t, cvtLinterCliCommandOptionsToLinterCliOptions as u, padWidth as v, CheckFailed as w, pruneAnsiTextStart as x, ansiWidth as y };

//# sourceMappingURL=application-CpRYrn67.js.map