import assert from "node:assert";
import Path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
//#region src/url.mts
const isURLRegEx = /^(\w[\w-]{1,63}:\/|data:|stdin:)/i;
/**
* Try to make a URL.
* @param url
* @param relativeTo - optional URL, if given, url will be parsed as relative.
* @returns a URL
*/
function toURL(url, relativeTo) {
	return normalizeWindowsUrl(url instanceof URL ? url : new URL(url, relativeTo));
}
/**
* Try to determine the parent directory URL of the uri.
* If it is not a hierarchical URL, then it will return the URL.
* @param url - url to extract the dirname from.
* @returns a URL
*/
function urlParent(url) {
	url = toURL(url);
	if (url.protocol === "data:") return url;
	const hasTrailingSlash = url.pathname.endsWith("/");
	if (!url.pathname.startsWith("/")) {
		if (!url.pathname) return url;
		const pathname = url.pathname.split("/").slice(0, hasTrailingSlash ? -2 : -1).join("/") + "/";
		return new URL(url.protocol + (url.host ? "//" + url.host : "") + pathname + url.search + url.hash);
	}
	return new URL(hasTrailingSlash ? ".." : ".", url);
}
/**
* Alias of {@link urlParent}
* Try to determine the parent directory URL of the uri.
* If it is not a hierarchical URL, then it will return the URL.
* @param url - url to extract the dirname from.
* @returns a URL
*/
const urlDirname = urlParent;
/**
* return the basename (last portion of the URL pathname) of a path. It does NOT remove the trailing slash.
* @param path - URL pathname to extract the basename from.
*/
function basenameOfUrlPathname(path) {
	const adj = path.endsWith("/") ? 2 : 0;
	const idx = path.lastIndexOf("/", path.length - adj);
	return idx >= 0 ? path.slice(idx + 1) : path;
}
function isUrlLike(filename) {
	return filename instanceof URL || isURLRegEx.test(filename);
}
function isNotUrlLike(filename) {
	return !isUrlLike(filename);
}
/**
* Check if `url` is a URL instance.
* @returns
*/
function isURL(url) {
	return url instanceof URL;
}
/**
*
* @param url - url to check
* @param protocol - protocol to check against - e.g. 'file:', 'http:', 'https:'
* @returns
*/
function hasProtocol(url, protocol) {
	protocol = protocol.endsWith(":") ? protocol : protocol + ":";
	return typeof url === "string" ? url.startsWith(protocol) : url.protocol === protocol;
}
/**
* Attempts to add a trailing slash to the URL pathname if it does not already have one.
* Some If the pathname doesn't start with a `/`, a trailing slash is not added.
* @param url - a URL
* @returns
*/
function addTrailingSlash(url) {
	if (url.pathname.endsWith("/")) return url;
	const urlWithSlash = new URL(url.href);
	urlWithSlash.pathname += "/";
	return urlWithSlash;
}
/**
* Calculate the relative path to go from `urlFrom` to `urlTo`.
* The protocol is not evaluated. Only the `url.pathname` is used.
* @param urlFrom
* @param urlTo
* @returns the relative path
*/
function urlRelative(urlFrom, urlTo) {
	return urlToUrlRelative(toURL(urlFrom), toURL(urlTo));
}
/**
* Calculate the relative path to go from `urlFrom` to `urlTo`.
* The protocol is not evaluated. Only the `url.pathname` is used.
* @param urlFrom
* @param urlTo
* @returns the relative path
*/
function urlToUrlRelative(urlFrom, urlTo) {
	let pFrom = urlFrom.pathname;
	const pTo = urlTo.pathname;
	if (pFrom === pTo) return "";
	pFrom = pFrom.endsWith("/") ? pFrom : new URL("./", urlFrom).pathname;
	if (pTo.startsWith(pFrom)) return decodeURIComponent(pTo.slice(pFrom.length));
	const p0 = pFrom;
	const p1 = pTo;
	if (p1.startsWith(p0)) return decodeURIComponent(p0 === p1 ? "" : p1.slice(p0.lastIndexOf("/") + 1));
	const p0Parts = p0.split("/").slice(0, -1);
	const p1Parts = p1.split("/");
	let i = 0;
	for (; i < p0Parts.length && i < p1Parts.length - 1 && p0Parts[i] === p1Parts[i]; ++i);
	const rel = "../".repeat(p0Parts.length - i) + p1Parts.slice(i).join("/");
	return decodeURIComponent(rel.length < p1.length ? rel : p1);
}
const regExpWindowsPath = /^[\\/]([a-zA-Z]:[\\/])/;
const badUncLocalhostUrl = /^(\/+[a-zA-Z])\$/;
/**
* Ensure that a windows file url is correctly formatted with a capitol letter for the drive.
*
* @param url - URL to check.
* @returns a new URL if modified or converted from a string.
*/
function normalizeWindowsUrl(url) {
	url = typeof url === "string" ? new URL(url) : url;
	if (url.protocol === "file:") {
		let pathname = url.pathname.replaceAll("%3A", ":").replaceAll("%3a", ":").replaceAll("%24", "$");
		if (!url.host) pathname = pathname.replace(badUncLocalhostUrl, "$1:");
		pathname = pathname.replace(regExpWindowsPath, (d) => d.toUpperCase());
		if (pathname !== url.pathname) {
			url = new URL(url);
			url.pathname = pathname;
			return fixUncUrl(url);
		}
	}
	return fixUncUrl(url);
}
/**
* There is a bug is NodeJS that sometimes causes UNC paths converted to a URL to be prefixed with `file:////`.
* @param url - URL to check.
* @returns fixed URL if needed.
*/
function fixUncUrl(url) {
	if (url.href.startsWith("file:////")) return new URL(url.href.replace(/^file:\/{4}/, "file://"));
	return url;
}
//#endregion
//#region src/dataUrl.mts
const regMatchFilename = /filename=([^;,]*)/;
/**
* Try to determine the base name of a URL.
* @param url
* @returns the base name of a URL, including the trailing `/` if present.
*/
function urlBasename(url) {
	function guessDataUrlName(header) {
		const filenameMatch = header.match(regMatchFilename);
		if (filenameMatch) return filenameMatch[1];
		return header.split(";", 1)[0].replaceAll(/\W/g, ".");
	}
	url = toURL(url);
	if (url.protocol === "data:") return guessDataUrlName(url.pathname.split(",", 1)[0]);
	return basenameOfUrlPathname(url.pathname);
}
function isDataURL(url) {
	return hasProtocol(url, "data:");
}
//#endregion
//#region src/fileUrl.mts
const isWindows = process.platform === "win32";
const windowsUrlPathRegExp = /^\/[a-zA-Z]:\//;
function isWindowsPathnameWithDriveLatter(pathname) {
	return windowsUrlPathRegExp.test(pathname);
}
/**
* @param url - URL or string to check if it is a file URL.
* @returns true if the URL is a file URL.
*/
function isFileURL(url) {
	return hasProtocol(url, "file:");
}
/**
* Convert a URL into a string. If it is a file URL, convert it to a path.
* @param url - URL
* @returns path or href
*/
function toFilePathOrHref(url) {
	return isFileURL(url) && url.toString().startsWith("file:///") ? toFilePath(url) : url.toString();
}
function toFilePath(url) {
	try {
		if (isWindows) {
			const u = new URL(url);
			if (!isWindowsPathnameWithDriveLatter(u.pathname)) {
				const cwdUrl = pathToFileURL(process.cwd());
				if (cwdUrl.hostname) return fileURLToPath(new URL(u.pathname, cwdUrl));
				u.pathname = `/${cwdUrl.pathname.split("/")[1]}${u.pathname}`;
				return fileURLToPath(u);
			}
		}
		return pathWindowsDriveLetterToUpper(fileURLToPath(url));
	} catch {
		return url.toString();
	}
}
const regExpWindowsPathDriveLetter = /^([a-zA-Z]):[\\/]/;
function pathWindowsDriveLetterToUpper(absoluteFilePath) {
	return absoluteFilePath.replace(regExpWindowsPathDriveLetter, (s) => s.toUpperCase());
}
const regExpWindowsFileUrl = /^file:\/\/\/[a-zA-Z]:\//;
/**
* Test if a url is a file url with a windows path. It does check for UNC paths.
* @param url - the url
* @returns true if the url is a file url with a windows path with a drive letter.
*/
function isWindowsFileUrl(url) {
	return regExpWindowsFileUrl.test(url.toString());
}
//#endregion
//#region src/FileUrlBuilder.mts
const isWindowsPathRegEx = regExpWindowsPathDriveLetter;
const isWindowsPathname = regExpWindowsPath;
const percentRegEx = /%/g;
const backslashRegEx = /\\/g;
const newlineRegEx = /\n/g;
const carriageReturnRegEx = /\r/g;
const tabRegEx = /\t/g;
const questionRegex = /\?/g;
const hashRegex = /#/g;
const ProtocolFile = "file:";
var FileUrlBuilder = class {
	windows;
	path;
	cwd;
	constructor(options = {}) {
		const sep = options.path?.sep;
		this.windows = options.windows ?? (sep ? sep === "\\" : void 0) ?? isWindows;
		this.path = options.path ?? (this.windows ? Path.win32 : Path.posix);
		this.cwd = options.cwd ?? this.pathToFileURL(this.path.resolve() + "/", this.rootFileURL());
		assert(this.path.sep === (this.windows ? "\\" : "/"), `Path separator should match OS type Windows: ${this.windows === true ? "true" : (this.windows ?? "undefined") || "false"}, sep: ${this.path.sep}, options: ` + JSON.stringify({
			isWindows,
			sep: `${sep}`,
			windows: options.windows,
			pathSep: options.path?.sep,
			n: options.path?.normalize("path/file.txt"),
			cwd: options.cwd?.href,
			win32: this.path === Path.win32,
			posix: this.path === Path.posix,
			"win32.normalize": this.path.normalize === Path.win32.normalize,
			"posix.normalize": this.path.normalize === Path.posix.normalize
		}) + ``);
	}
	/**
	* Encode special characters in a file path to use in a URL.
	* @param filepath
	* @returns
	*/
	encodePathChars(filepath) {
		filepath = filepath.replaceAll(percentRegEx, "%25");
		if (!this.windows && !isWindows && filepath.includes("\\")) filepath = filepath.replaceAll(backslashRegEx, "%5C");
		filepath = filepath.replaceAll(newlineRegEx, "%0A");
		filepath = filepath.replaceAll(carriageReturnRegEx, "%0D");
		filepath = filepath.replaceAll(tabRegEx, "%09");
		return filepath;
	}
	/**
	* Normalize a file path for use in a URL.
	* ```js
	* const url = new URL(normalizeFilePathForUrl('path\\to\\file.txt'), 'file:///Users/user/');
	* // Result: file:///Users/user/path/to/file.txt
	* ```
	* @param filePath
	* @returns a normalized file path for use as a relative path in a URL.
	*/
	normalizeFilePathForUrl(filePath) {
		filePath = this.encodePathChars(filePath);
		filePath = filePath.replaceAll(questionRegex, "%3F");
		filePath = filePath.replaceAll(hashRegex, "%23");
		return filePath.replaceAll("\\", "/").replace(isWindowsPathRegEx, (drive) => `/${drive}`.toUpperCase());
	}
	/**
	* Try to make a file URL.
	* - if filenameOrUrl is already a URL, it is returned as is.
	* @param filenameOrUrl
	* @param relativeTo - optional URL, if given, filenameOrUrl will be parsed as relative.
	* @returns a URL
	*/
	toFileURL(filenameOrUrl, relativeTo) {
		return normalizeWindowsUrl(this.#toFileURL(filenameOrUrl, relativeTo));
	}
	/**
	* Try to make a file URL.
	* - if filenameOrUrl is already a URL, it is returned as is.
	* @param filenameOrUrl
	* @param relativeTo - optional URL, if given, filenameOrUrl will be parsed as relative.
	* @returns a URL
	*/
	#toFileURL(filenameOrUrl, relativeTo) {
		if (typeof filenameOrUrl !== "string") return filenameOrUrl;
		if (isUrlLike(filenameOrUrl)) return normalizeWindowsUrl(new URL(filenameOrUrl));
		relativeTo ??= this.cwd;
		isWindows && (filenameOrUrl = filenameOrUrl.replaceAll("\\", "/"));
		if (this.isAbsolute(filenameOrUrl) && isFileURL(relativeTo)) {
			const pathname = this.normalizeFilePathForUrl(filenameOrUrl);
			if (isWindowsFileUrl(relativeTo) && !isWindowsPathnameWithDriveLatter(pathname)) {
				const relFilePrefix = relativeTo.toString().slice(0, 10);
				return normalizeWindowsUrl(new URL(relFilePrefix + pathname));
			}
			return normalizeWindowsUrl(new URL("file://" + pathname));
		}
		if (isUrlLike(relativeTo)) {
			const pathname = this.normalizeFilePathForUrl(filenameOrUrl);
			return normalizeWindowsUrl(new URL(pathname, relativeTo));
		}
		const appendSlash = filenameOrUrl.endsWith("/") ? "/" : "";
		const pathname = this.normalizeFilePathForUrl(this.path.resolve(relativeTo.toString(), filenameOrUrl)) + appendSlash;
		return normalizeWindowsUrl(new URL("file://" + pathname));
	}
	/**
	* Try to make a URL for a directory.
	* - if dirOrUrl is already a URL, a slash is appended to the pathname.
	* @param dirOrUrl - directory path to convert to a file URL.
	* @param relativeTo - optional URL, if given, filenameOrUrl will be parsed as relative.
	* @returns a URL
	*/
	toFileDirURL(dirOrUrl, relativeTo) {
		return addTrailingSlash(this.toFileURL(dirOrUrl, relativeTo));
	}
	urlToFilePathOrHref(url) {
		url = this.toFileURL(url);
		return this.#urlToFilePathOrHref(url);
	}
	#urlToFilePathOrHref(url) {
		if (url.protocol !== ProtocolFile || url.hostname) return url.href;
		return pathWindowsDriveLetterToUpper((this.path === Path ? toFilePathOrHref(url) : decodeURIComponent(url.pathname.split("/").join(this.path.sep))).replace(isWindowsPathname, "$1"));
	}
	/**
	* Calculate the relative path to go from `urlFrom` to `urlTo`.
	* The protocol is not evaluated. Only the `url.pathname` is used.
	* The result: `new URL(relative(urlFrom, urlTo), urlFrom).pathname === urlTo.pathname`
	* @param urlFrom
	* @param urlTo
	* @returns the relative path
	*/
	relative(urlFrom, urlTo) {
		if (urlFrom.protocol === urlTo.protocol && urlFrom.protocol === ProtocolFile) {
			if (urlFrom.href === urlTo.href) return "";
			urlFrom = urlFrom.pathname.endsWith("/") ? urlFrom : new URL("./", urlFrom);
			const fromPath = urlFrom.pathname;
			const toPath = urlTo.pathname;
			if (toPath.startsWith(fromPath)) return decodeURIComponent(toPath.slice(fromPath.length));
			const pFrom = this.#urlToFilePathOrHref(urlFrom);
			const pTo = this.#urlToFilePathOrHref(urlTo);
			const toIsDir = urlTo.pathname.endsWith("/");
			let pathname = this.normalizeFilePathForUrl(this.path.relative(pFrom, pTo));
			if (toIsDir && !pathname.endsWith("/")) pathname += "/";
			return decodeURIComponent(pathname);
		}
		return decodeURIComponent(urlToUrlRelative(urlFrom, urlTo));
	}
	/**
	* Get the parent directory of a URL.
	* @param url
	*/
	urlDirname(url) {
		return urlParent(this.toFileURL(url));
	}
	pathToFileURL(pathname, relativeToURL) {
		return new URL(this.normalizeFilePathForUrl(pathname), relativeToURL || this.cwd);
	}
	rootFileURL(filePath) {
		const path = this.path;
		const p = path.parse(path.normalize(path.resolve(filePath ?? ".")));
		return new URL(this.normalizeFilePathForUrl(p.root), this.#getFsRootURL());
	}
	#getFsRootURL() {
		if (this.path === Path) return pathToFileURL("/");
		const p = this.path.resolve("/");
		return new URL(this.normalizeFilePathForUrl(p), "file:///");
	}
	/**
	* Determine if a filePath is absolute.
	*
	* @param filePath
	* @returns true if `URL` or `path.isAbsolute(filePath)`
	*/
	isAbsolute(filePath) {
		return isUrlLike(filePath) || this.path.isAbsolute(filePath);
	}
	isUrlLike(url) {
		return isUrlLike(url);
	}
};
//#endregion
//#region src/defaultFileUrlBuilder.mts
const fileUrlBuilder = new FileUrlBuilder();
function encodePathChars(filepath) {
	return fileUrlBuilder.encodePathChars(filepath);
}
/**
* Normalize a file path for use in a URL.
* ```js
* const url = new URL(normalizeFilePathForUrl('path\\to\\file.txt'), 'file:///Users/user/');
* // Result: file:///Users/user/path/to/file.txt
* ```
* @param filePath
* @returns a normalized file path for use as a relative path in a URL.
*/
function normalizeFilePathForUrl(filePath) {
	return fileUrlBuilder.normalizeFilePathForUrl(filePath);
}
/**
* Try to make a file URL.
* - if filenameOrUrl is already a URL, it is returned as is.
* -
* @param filenameOrUrl
* @param relativeTo - optional URL, if given, filenameOrUrl will be parsed as relative.
* @returns a URL
*/
function toFileURL(filenameOrUrl, relativeTo) {
	return fileUrlBuilder.toFileURL(filenameOrUrl, relativeTo);
}
/**
* Converts a file path to a URL and adds a trailing slash.
* @param dir - url to a directory
* @returns a URL
*/
function toFileDirURL(dir) {
	return fileUrlBuilder.toFileDirURL(dir);
}
//#endregion
export { FileUrlBuilder, addTrailingSlash, basenameOfUrlPathname, encodePathChars, fixUncUrl, hasProtocol, isDataURL, isFileURL, isNotUrlLike, isURL, isUrlLike, normalizeFilePathForUrl, normalizeWindowsUrl, toFileDirURL, toFilePathOrHref, toFileURL, toURL, urlBasename, urlDirname, urlParent, urlRelative };

//# sourceMappingURL=index.js.map