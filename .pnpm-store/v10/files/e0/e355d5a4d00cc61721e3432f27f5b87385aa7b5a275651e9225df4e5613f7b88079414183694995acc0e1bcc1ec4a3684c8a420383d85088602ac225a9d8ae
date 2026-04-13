import * as Path from "node:path";
import { FileUrlBuilder } from "@cspell/url";
import pm from "picomatch";
//#region src/globHelper.ts
const { posix } = Path;
/** test for glob patterns starting with `**` */
const isGlobalPatternRegExp = /^!*[*]{2}/;
const hasGlobCharactersRegExp = /[*?{}[\]]/;
const fileUrlBuilder = new FileUrlBuilder();
const GlobPlaceHolders = { cwd: "${cwd}" };
const GlobPatterns = {
	suffixAny: "/**",
	suffixDir: "/**/*",
	prefixAny: "**/"
};
let cacheCalls = 0;
let cacheMisses = 0;
let cachePath = Path;
let cacheRoot = "<>";
const cache = /* @__PURE__ */ new Map();
/**
* This function tries its best to determine if `fileOrGlob` is a path to a file or a glob pattern.
* @param fileOrGlob - file (with absolute path) or glob.
* @param root - absolute path to the directory that will be considered the root when testing the glob pattern.
* @param path - optional node path methods - used for testing
*/
function fileOrGlobToGlob(fileOrGlob, root, path = Path) {
	if (cacheRoot !== root || cachePath !== path) {
		cache.clear();
		cacheCalls = 0;
		cacheMisses = 0;
		cacheRoot = root;
		cachePath = path;
	}
	++cacheCalls;
	const found = cache.get(fileOrGlob);
	if (found) return found;
	++cacheMisses;
	const pattern = _fileOrGlobToGlob(fileOrGlob, root, path);
	cache.set(fileOrGlob, pattern);
	return pattern;
}
/**
* This function tries its best to determine if `fileOrGlob` is a path to a file or a glob pattern.
* @param fileOrGlob - file (with absolute path) or glob.
* @param root - absolute path to the directory that will be considered the root when testing the glob pattern.
* @param path - optional node path methods - used for testing
*/
function _fileOrGlobToGlob(fileOrGlob, root, path = Path) {
	const toForwardSlash = path.sep === "\\" ? (p) => p.replaceAll("\\", "/") : (p) => p;
	const builder = urlBuilder(path);
	fileOrGlob = typeof fileOrGlob === "string" ? toForwardSlash(fileOrGlob) : fileOrGlob;
	const rootUrl = builder.toFileDirURL(root);
	root = builder.urlToFilePathOrHref(rootUrl);
	return toGlobPatternWithRoot(fileOrGlob, root, builder);
}
function toGlobPatternWithRoot(glob, root, builder) {
	function toPattern() {
		if (isGlobPatternWithRoot(glob)) return fixPatternRoot({ ...glob }, builder);
		const rootUrl = builder.toFileDirURL(root);
		if (typeof glob === "string") return filePathOrGlobToGlob(glob, rootUrl, builder);
		const pattern = {
			isGlobalPattern: isGlobalGlob(glob.glob),
			...glob,
			root: glob.root ?? root
		};
		fixPatternRoot(pattern, builder);
		fixPatternGlob(pattern, builder);
		return pattern;
	}
	const pattern = toPattern();
	if (pattern.glob.startsWith(GlobPlaceHolders.cwd)) {
		pattern.root = GlobPlaceHolders.cwd;
		pattern.glob = pattern.glob.replace(GlobPlaceHolders.cwd, "");
	}
	return pattern;
}
function isGlobPatternWithOptionalRoot(g) {
	return typeof g !== "string" && typeof g.glob === "string";
}
function isGlobPatternWithRoot(g) {
	if (typeof g === "string") return false;
	return typeof g.root === "string" && "isGlobalPattern" in g;
}
function isGlobPatternNormalized(g) {
	if (!isGlobPatternWithRoot(g)) return false;
	const gr = g;
	return "rawGlob" in gr && "rawRoot" in gr && typeof gr.rawGlob === "string";
}
function isGlobPatternNormalizedToRoot(g, options) {
	if (!isGlobPatternNormalized(g)) return false;
	return g.root === options.root;
}
function urlBuilder(path = Path) {
	return path === Path ? fileUrlBuilder : new FileUrlBuilder({ path });
}
/**
* @param pattern glob pattern
* @param nested when true add `**​/<glob>/​**`
* @returns the set of matching globs.
*/
function normalizePattern(pattern, nested) {
	pattern = pattern.replace(/^(!!)+/, "");
	const isNeg = pattern.startsWith("!");
	const prefix = isNeg ? "!" : "";
	pattern = isNeg ? pattern.slice(1) : pattern;
	return (nested ? normalizePatternNested(pattern) : normalizePatternGeneral(pattern)).map((p) => prefix + p);
}
function normalizePatternNested(pattern) {
	if (!pattern.includes("/")) {
		if (pattern === "**") return ["**"];
		return ["**/" + pattern, "**/" + pattern + "/**"];
	}
	const hasLeadingSlash = pattern.startsWith("/");
	pattern = hasLeadingSlash ? pattern.slice(1) : pattern;
	if (pattern.endsWith("/")) return hasLeadingSlash || pattern.slice(0, -1).includes("/") ? [pattern + "**/*"] : ["**/" + pattern + "**/*"];
	if (pattern.endsWith("**")) return [pattern];
	return [pattern, pattern + "/**"];
}
function normalizePatternGeneral(pattern) {
	pattern = pattern.startsWith("/") ? pattern.slice(1) : pattern;
	pattern = pattern.endsWith("/") ? pattern + "**/*" : pattern;
	return [pattern];
}
/**
*
* @param patterns - glob patterns to normalize.
* @param options - Normalization options.
*/
function normalizeGlobPatterns(patterns, options) {
	function* normalize() {
		for (const glob of patterns) {
			if (isGlobPatternNormalized(glob)) {
				yield isGlobPatternNormalizedToRoot(glob, options) ? glob : normalizeGlobToRoot(glob, options.root, options.nodePath || Path);
				continue;
			}
			yield* normalizeGlobPattern(glob, options);
		}
	}
	return [...normalize()];
}
function normalizeGlobPattern(g, options) {
	const { root, nodePath: path = Path, nested } = options;
	const builder = urlBuilder(path);
	const cwd = options.cwd ?? path.resolve();
	const cwdUrl = builder.toFileDirURL(cwd);
	const rootUrl = builder.toFileDirURL(root, cwdUrl);
	const gIsGlobalPattern = isGlobPatternWithRoot(g) ? g.isGlobalPattern : void 0;
	g = !isGlobPatternWithOptionalRoot(g) ? { glob: g } : g;
	const gr = {
		...g,
		root: g.root ?? root
	};
	const rawRoot = gr.root;
	const rawGlob = g.glob;
	gr.glob = trimGlob(g.glob);
	if (gr.glob.startsWith(GlobPlaceHolders.cwd)) {
		gr.glob = gr.glob.replace(GlobPlaceHolders.cwd, "");
		gr.root = GlobPlaceHolders.cwd;
	}
	if (gr.root.startsWith(GlobPlaceHolders.cwd)) {
		const relRoot = gr.root.replace(GlobPlaceHolders.cwd, "./");
		const r = builder.toFileDirURL(relRoot, cwdUrl);
		r.pathname = posix.normalize(r.pathname);
		gr.root = builder.urlToFilePathOrHref(r);
	}
	const isGlobalPattern = gIsGlobalPattern ?? isGlobalGlob(gr.glob);
	gr.root = builder.urlToFilePathOrHref(builder.toFileDirURL(gr.root, rootUrl));
	return normalizePattern(gr.glob, nested).map((glob) => ({
		...gr,
		glob,
		rawGlob,
		rawRoot,
		isGlobalPattern
	}));
}
/**
* Try to adjust the root of a glob to match a new root. If it is not possible, the original glob is returned.
* Note: this does NOT generate absolutely correct glob patterns. The results are intended to be used as a
* first pass only filter. Followed by testing against the original glob/root pair.
* @param glob - glob to map
* @param root - new root to use if possible
* @param path - Node Path modules to use (testing only)
*/
function normalizeGlobToRoot(glob, root, path) {
	const builder = urlBuilder(path);
	glob = { ...glob };
	fixPatternRoot(glob, builder);
	const rootURL = builder.toFileDirURL(root);
	root = builder.urlToFilePathOrHref(rootURL);
	if (glob.root === root) return glob;
	const globRootUrl = builder.toFileDirURL(glob.root);
	const relFromRootToGlob = builder.relative(rootURL, globRootUrl);
	if (!relFromRootToGlob) return glob;
	if (glob.isGlobalPattern) return {
		...glob,
		root
	};
	const relFromGlobToRoot = builder.relative(globRootUrl, rootURL);
	const globIsUnderRoot = isRelativeValueNested(relFromRootToGlob);
	const rootIsUnderGlob = isRelativeValueNested(relFromGlobToRoot);
	if (!globIsUnderRoot && !rootIsUnderGlob) return glob;
	const isNeg = glob.glob.startsWith("!");
	const g = isNeg ? glob.glob.slice(1) : glob.glob;
	const prefix = isNeg ? "!" : "";
	if (globIsUnderRoot) {
		const relGlob = relFromRootToGlob;
		return {
			...glob,
			glob: prefix + posix.join(relGlob, g),
			root
		};
	}
	const rebasedGlob = rebaseGlob(g, nRel(relFromRootToGlob), nRel(relFromGlobToRoot));
	return rebasedGlob ? {
		...glob,
		glob: prefix + rebasedGlob,
		root
	} : glob;
}
function nRel(rel) {
	return rel.endsWith("/") ? rel : rel + "/";
}
function isRelativeValueNested(rel) {
	return !rel || !(rel === ".." || rel.startsWith("../") || rel.startsWith("/"));
}
/**
* Rebase a glob string to a new root.
* @param glob - glob string
* @param fromRootToGlob - relative path from root to globRoot
* @param fromGlobToRoot - relative path from globRoot to root
*/
function rebaseGlob(glob, fromRootToGlob, fromGlobToRoot) {
	if (!fromGlobToRoot || fromGlobToRoot === "/") return glob;
	if (fromRootToGlob.startsWith("../") && !fromGlobToRoot.startsWith("../") && glob.startsWith("**")) return glob;
	fromRootToGlob = nRel(fromRootToGlob);
	fromGlobToRoot = nRel(fromGlobToRoot);
	const relToParts = fromRootToGlob.split("/");
	const relFromParts = fromGlobToRoot.split("/");
	if (glob.startsWith(fromGlobToRoot) && fromRootToGlob === "../".repeat(relToParts.length - 1)) return glob.slice(fromGlobToRoot.length);
	const lastRelIdx = relToParts.findIndex((s) => s !== "..");
	const lastRel = lastRelIdx < 0 ? relToParts.length : lastRelIdx;
	const globParts = [...relToParts.slice(lastRel).filter((a) => a), ...glob.split("/")];
	relToParts.length = lastRel;
	if (fromRootToGlob.startsWith("../") && relFromParts.length !== relToParts.length + 1) return fromRootToGlob + (glob.startsWith("/") ? glob.slice(1) : glob);
	for (let i = 0; i < relFromParts.length && i < globParts.length; ++i) {
		const relSeg = relFromParts[i];
		const globSeg = globParts[i];
		if (!relSeg || globSeg === "**") return globParts.slice(i).join("/");
		if (relSeg !== globSeg && globSeg !== "*") break;
	}
	return fromRootToGlob + (glob.startsWith("/") ? glob.slice(1) : glob);
}
/**
* Trims any trailing spaces, tabs, line-feeds, new-lines, and comments
* @param glob - glob string
* @returns trimmed glob
*/
function trimGlob(glob) {
	glob = globRemoveComment(glob);
	glob = trimGlobLeft(glob);
	glob = trimGlobRight(glob);
	return glob;
}
function globRemoveComment(glob) {
	return glob.replace(/(?<=^|\s)#.*/, "");
}
const spaces = {
	" ": true,
	"	": true,
	"\n": true,
	"\r": true
};
/**
* Trim any trailing spaces, tabs, line-feeds, or new-lines
* Handles a trailing \<space>
* @param glob - glob string
* @returns glob string with space to the right removed.
*/
function trimGlobRight(glob) {
	let i = glob.length - 1;
	while (i >= 0 && glob[i] in spaces) --i;
	if (glob[i] === "\\") ++i;
	++i;
	return i ? glob.slice(0, i) : "";
}
/**
* Trim any leading spaces, tabs, line-feeds, or new-lines
* @param glob - any string
* @returns string with leading spaces removed.
*/
function trimGlobLeft(glob) {
	return glob.trimStart();
}
/**
* Test if a glob pattern has a leading `**`.
* @param glob - the glob
* @returns true if the glob pattern starts with `**`
*/
function isGlobalGlob(glob) {
	return isGlobalPatternRegExp.test(glob);
}
function hasGlobCharacters(glob) {
	return hasGlobCharactersRegExp.test(glob);
}
function isGlobPart(part) {
	if (part === GlobPlaceHolders.cwd) return false;
	return hasGlobCharacters(part);
}
/**
* Split a glob into a path and a glob portion.
* The path portion does not contain any glob characters.
* Path might be empty. The glob portion should always be non-empty.
* @param glob - glob string pattern
* @returns
*/
function splitGlob(glob) {
	const parts = glob.split("/");
	const p = parts.findIndex(isGlobPart);
	const s = p < 0 ? parts.length - 1 : p;
	return createSplitGlob(s ? parts.slice(0, s).join("/") + "/" : void 0, parts.slice(s).join("/"));
}
/**
* Split a glob into a path and a glob portion.
* The path portion does not contain any glob characters.
* Path might be empty. The glob portion should always be non-empty.
* @param glob - glob string pattern
* @param relOnly - Indicates that only `..` and `.` path segments are considered for the path.
* @returns
*/
function splitGlobRel(glob) {
	const parts = glob.split("/");
	if (!parts.includes("..") && !parts.includes(".")) return {
		path: void 0,
		glob
	};
	const firstGlobPartIdx = parts.findIndex(isGlobPart);
	const lastRelIdx = Math.max(parts.lastIndexOf(".."), parts.lastIndexOf("."));
	const p = firstGlobPartIdx >= 0 ? Math.min(firstGlobPartIdx, lastRelIdx + 1) : lastRelIdx + 1;
	const s = p < 0 ? parts.length - 1 : p;
	return createSplitGlob(s ? parts.slice(0, s).join("/") + "/" : void 0, parts.slice(s).join("/"));
}
function createSplitGlob(path, glob) {
	glob = path ? "/" + glob : glob;
	glob = glob.startsWith("/**") ? glob.slice(1) : glob;
	return {
		path,
		glob
	};
}
function rootToUrl(root, builder) {
	if (root.startsWith(GlobPlaceHolders.cwd)) return new URL(builder.normalizeFilePathForUrl(root.replace(GlobPlaceHolders.cwd, ".")), builder.cwd);
	return builder.toFileDirURL(root);
}
function fixPatternRoot(glob, builder) {
	if (glob.root.startsWith(GlobPlaceHolders.cwd)) return glob;
	glob.root = builder.urlToFilePathOrHref(rootToUrl(glob.root, builder));
	return glob;
}
/**
* Adjust the glob pattern in case it is a file or a relative glob.
* @param glob
* @param builder
* @returns
*/
function fixPatternGlob(glob, builder) {
	const rootURL = builder.toFileURL(glob.root);
	const split = splitGlobRel(glob.glob);
	glob.glob = split.glob;
	if (split.path !== void 0) {
		const relRootPath = split.path.startsWith("/") ? "." + split.path : split.path;
		glob.root = builder.urlToFilePathOrHref(builder.toFileDirURL(relRootPath, glob.root));
	}
	fixPatternRelativeToRoot(glob, rootURL, builder);
}
function fixPatternRelativeToRoot(glob, root, builder) {
	if (glob.root.startsWith(GlobPlaceHolders.cwd)) return;
	const rel = builder.relative(root, builder.toFileDirURL(glob.root));
	if (rel.startsWith("/") || rel.startsWith("../")) return;
	glob.root = builder.urlToFilePathOrHref(root);
	glob.glob = rel + glob.glob;
}
function filePathOrGlobToGlob(filePathOrGlob, root, builder) {
	const isGlobalPattern = isGlobalGlob(filePathOrGlob);
	const { path, glob } = builder.isAbsolute(filePathOrGlob) ? splitGlob(filePathOrGlob) : splitGlobRel(filePathOrGlob);
	const url = builder.toFileDirURL(path || "./", root);
	return {
		root: builder.urlToFilePathOrHref(url),
		glob,
		isGlobalPattern
	};
}
function workaroundPicomatchBug(glob) {
	const obj = {};
	return glob.split("/").map((s) => obj[s] ? `{${s},${s}}` : s).join("/");
}
//#endregion
//#region src/GlobMatcher.ts
let idGlobMatcher = 0;
var GlobMatcher = class {
	/**
	* @param filename full path of file to match against.
	* @returns a GlobMatch - information about the match.
	*/
	matchEx;
	path;
	patterns;
	patternsNormalizedToRoot;
	/**
	* path or href of the root directory.
	*/
	root;
	dot;
	options;
	/**
	* Instance ID
	*/
	id;
	constructor(patterns, rootOrOptions, _nodePath) {
		this.id = idGlobMatcher++;
		const options = typeof rootOrOptions === "string" || rootOrOptions instanceof URL ? { root: rootOrOptions.toString() } : rootOrOptions ?? {};
		const mode = options.mode ?? "exclude";
		const isExcludeMode = mode !== "include";
		const nodePath = options.nodePath ?? _nodePath ?? Path;
		this.path = nodePath;
		const cwd = options.cwd ?? nodePath.resolve();
		const dot = options.dot ?? isExcludeMode;
		const nested = options.nested ?? isExcludeMode;
		const nobrace = options.nobrace;
		const root = options.root ?? nodePath.resolve();
		const builder = new FileUrlBuilder({ path: nodePath });
		const rootURL = builder.toFileDirURL(root);
		const normalizedRoot = builder.urlToFilePathOrHref(rootURL);
		this.options = {
			root: normalizedRoot,
			dot,
			nodePath,
			nested,
			mode,
			nobrace,
			cwd
		};
		patterns = Array.isArray(patterns) ? patterns : typeof patterns === "string" ? patterns.split(/\r?\n/g) : [patterns];
		const globPatterns = normalizeGlobPatterns(patterns, this.options);
		this.patternsNormalizedToRoot = globPatterns.map((g) => normalizeGlobToRoot(g, normalizedRoot, nodePath)).filter((g) => builder.relative(builder.toFileDirURL(g.root), rootURL) === "");
		this.patterns = globPatterns;
		this.root = normalizedRoot;
		this.dot = dot;
		this.matchEx = buildMatcherFn(this.id, this.patterns, this.options);
	}
	/**
	* Check to see if a filename matches any of the globs.
	* If filename is relative, it is considered relative to the root.
	* If filename is absolute and contained within the root, it will be made relative before being tested for a glob match.
	* If filename is absolute and not contained within the root, it will be tested as is.
	* @param filename full path of the file to check.
	*/
	match(filename) {
		return this.matchEx(filename).matched;
	}
};
/**
* This function attempts to emulate .gitignore functionality as much as possible.
*
* The resulting matcher function: (filename: string) => GlobMatch
*
* If filename is relative, it is considered relative to the root.
* If filename is absolute and contained within the root, it will be made relative before being tested for a glob match.
* If filename is absolute and not contained within the root, it will return a GlobMatchNoRule.
*
* @param patterns - the contents of a .gitignore style file or an array of individual glob rules.
* @param options - defines root and other options
* @returns a function given a filename returns true if it matches.
*/
function buildMatcherFn(_id, patterns, options) {
	const { nodePath, dot, nobrace } = options;
	const builder = new FileUrlBuilder({ path: nodePath });
	const makeReOptions = {
		dot,
		nobrace
	};
	const suffixDir = GlobPatterns.suffixDir;
	const rules = patterns.map((pattern, index) => ({
		pattern,
		index
	})).filter((r) => !!r.pattern.glob).filter((r) => !r.pattern.glob.startsWith("#")).map(({ pattern, index }) => {
		const matchNeg = pattern.glob.match(/^!/);
		const glob = pattern.glob.replace(/^!/, "");
		const isNeg = matchNeg && matchNeg[0].length & 1 && true || false;
		const reg = pm.makeRe(workaroundPicomatchBug(glob), makeReOptions);
		return {
			pattern,
			index,
			isNeg,
			fn: pattern.glob.endsWith(suffixDir) ? (filename) => {
				return reg.test(filename) || filename.endsWith("/") && reg.test(filename + " ");
			} : (filename) => {
				return reg.test(filename);
			},
			reg
		};
	});
	const negRules = rules.filter((r) => r.isNeg);
	const posRules = rules.filter((r) => !r.isNeg);
	const mapRoots = /* @__PURE__ */ new Map();
	const fn = (filename) => {
		const fileUrl = builder.toFileURL(filename);
		const relFilePathname = builder.relative(new URL("file:///"), fileUrl);
		let lastRoot = new URL("placeHolder://");
		let lastRel = "";
		function rootToUrl(root) {
			const found = mapRoots.get(root);
			if (found) return found;
			const url = builder.toFileDirURL(root);
			mapRoots.set(root, url);
			return url;
		}
		function relativeToRoot(root) {
			if (root.href !== lastRoot.href) {
				lastRoot = root;
				lastRel = builder.relative(root, fileUrl);
			}
			return lastRel;
		}
		function testRules(rules, matched) {
			for (const rule of rules) {
				const pattern = rule.pattern;
				const root = pattern.root;
				const rootURL = rootToUrl(root);
				const isRelPat = !pattern.isGlobalPattern;
				let fname = relFilePathname;
				if (isRelPat) {
					const relPathToFile = relativeToRoot(rootURL);
					if (!isRelativeValueNested(relPathToFile)) continue;
					fname = relPathToFile;
				}
				if (rule.fn(fname)) return {
					matched,
					glob: pattern.glob,
					root,
					pattern,
					index: rule.index,
					isNeg: rule.isNeg
				};
			}
		}
		return testRules(negRules, false) || testRules(posRules, true) || { matched: false };
	};
	return fn;
}
//#endregion
export { GlobMatcher, fileOrGlobToGlob, isGlobPatternNormalized, isGlobPatternWithOptionalRoot, isGlobPatternWithRoot, normalizeGlobPatterns, workaroundPicomatchBug };

//# sourceMappingURL=index.js.map