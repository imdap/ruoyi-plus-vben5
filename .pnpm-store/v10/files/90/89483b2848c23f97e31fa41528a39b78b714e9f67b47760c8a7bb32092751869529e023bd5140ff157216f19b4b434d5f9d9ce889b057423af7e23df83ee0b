//#region src/dataUrl.d.mts
/**
* Try to determine the base name of a URL.
* @param url
* @returns the base name of a URL, including the trailing `/` if present.
*/
declare function urlBasename(url: string | URL): string;
declare function isDataURL(url: string | URL): boolean;
//#endregion
//#region src/defaultFileUrlBuilder.d.mts
declare function encodePathChars(filepath: string): string;
/**
* Normalize a file path for use in a URL.
* ```js
* const url = new URL(normalizeFilePathForUrl('path\\to\\file.txt'), 'file:///Users/user/');
* // Result: file:///Users/user/path/to/file.txt
* ```
* @param filePath
* @returns a normalized file path for use as a relative path in a URL.
*/
declare function normalizeFilePathForUrl(filePath: string): string;
/**
* Try to make a file URL.
* - if filenameOrUrl is already a URL, it is returned as is.
* -
* @param filenameOrUrl
* @param relativeTo - optional URL, if given, filenameOrUrl will be parsed as relative.
* @returns a URL
*/
declare function toFileURL(filenameOrUrl: string | URL, relativeTo?: string | URL): URL;
/**
* Converts a file path to a URL and adds a trailing slash.
* @param dir - url to a directory
* @returns a URL
*/
declare function toFileDirURL(dir: string | URL): URL;
//#endregion
//#region src/fileUrl.d.mts
/**
* @param url - URL or string to check if it is a file URL.
* @returns true if the URL is a file URL.
*/
declare function isFileURL(url: URL | string): boolean;
/**
* Convert a URL into a string. If it is a file URL, convert it to a path.
* @param url - URL
* @returns path or href
*/
declare function toFilePathOrHref(url: URL | string): string;
//#endregion
//#region src/FileUrlBuilder.d.mts
interface ParsedPath {
  /**
  * The root of the path such as '/' or 'c:\'
  */
  root: string;
  /**
  * The full directory path such as '/home/user/dir' or 'c:\path\dir'
  */
  dir: string;
  /**
  * The file name including extension (if any) such as 'index.html'
  */
  base: string;
  /**
  * The file extension (if any) such as '.html'
  */
  ext: string;
  /**
  * The file name without extension (if any) such as 'index'
  */
  name: string;
}
interface PathInterface {
  sep: string;
  resolve(...paths: string[]): string;
  parse(path: string): ParsedPath;
  normalize(path: string): string;
  relative(from: string, to: string): string;
  isAbsolute(path: string): boolean;
}
interface BuilderOptions {
  windows?: boolean | undefined;
  path?: PathInterface | undefined;
  cwd?: URL | undefined;
}
declare class FileUrlBuilder {
  #private;
  private windows;
  readonly path: PathInterface;
  readonly cwd: URL;
  constructor(options?: BuilderOptions);
  /**
  * Encode special characters in a file path to use in a URL.
  * @param filepath
  * @returns
  */
  encodePathChars(filepath: string): string;
  /**
  * Normalize a file path for use in a URL.
  * ```js
  * const url = new URL(normalizeFilePathForUrl('path\\to\\file.txt'), 'file:///Users/user/');
  * // Result: file:///Users/user/path/to/file.txt
  * ```
  * @param filePath
  * @returns a normalized file path for use as a relative path in a URL.
  */
  normalizeFilePathForUrl(filePath: string): string;
  /**
  * Try to make a file URL.
  * - if filenameOrUrl is already a URL, it is returned as is.
  * @param filenameOrUrl
  * @param relativeTo - optional URL, if given, filenameOrUrl will be parsed as relative.
  * @returns a URL
  */
  toFileURL(filenameOrUrl: string | URL, relativeTo?: string | URL): URL;
  /**
  * Try to make a URL for a directory.
  * - if dirOrUrl is already a URL, a slash is appended to the pathname.
  * @param dirOrUrl - directory path to convert to a file URL.
  * @param relativeTo - optional URL, if given, filenameOrUrl will be parsed as relative.
  * @returns a URL
  */
  toFileDirURL(dirOrUrl: string | URL, relativeTo?: string | URL): URL;
  urlToFilePathOrHref(url: URL | string): string;
  /**
  * Calculate the relative path to go from `urlFrom` to `urlTo`.
  * The protocol is not evaluated. Only the `url.pathname` is used.
  * The result: `new URL(relative(urlFrom, urlTo), urlFrom).pathname === urlTo.pathname`
  * @param urlFrom
  * @param urlTo
  * @returns the relative path
  */
  relative(urlFrom: URL, urlTo: URL): string;
  /**
  * Get the parent directory of a URL.
  * @param url
  */
  urlDirname(url: URL | string): URL;
  pathToFileURL(pathname: string, relativeToURL?: URL | string): URL;
  rootFileURL(filePath?: string): URL;
  /**
  * Determine if a filePath is absolute.
  *
  * @param filePath
  * @returns true if `URL` or `path.isAbsolute(filePath)`
  */
  isAbsolute(filePath: string): boolean;
  isUrlLike(url: string | URL): boolean;
}
//#endregion
//#region src/url.d.mts
/**
* Try to make a URL.
* @param url
* @param relativeTo - optional URL, if given, url will be parsed as relative.
* @returns a URL
*/
declare function toURL(url: string | URL, relativeTo?: string | URL): URL;
/**
* Try to determine the parent directory URL of the uri.
* If it is not a hierarchical URL, then it will return the URL.
* @param url - url to extract the dirname from.
* @returns a URL
*/
declare function urlParent(url: string | URL): URL;
/**
* Alias of {@link urlParent}
* Try to determine the parent directory URL of the uri.
* If it is not a hierarchical URL, then it will return the URL.
* @param url - url to extract the dirname from.
* @returns a URL
*/
declare const urlDirname: typeof urlParent;
/**
* return the basename (last portion of the URL pathname) of a path. It does NOT remove the trailing slash.
* @param path - URL pathname to extract the basename from.
*/
declare function basenameOfUrlPathname(path: string): string;
/**
* @param filename - filename to check if it is a string containing a URL.
*/
declare function isUrlLike(filename: string): boolean;
declare function isUrlLike(filename: URL): true;
/**
* @param filename - filename to check if it is a string containing a URL or a URL object.
*/
declare function isUrlLike(filename: string | URL): boolean;
/**
* @param filename - filename to check if it is a string containing a URL.
*/
declare function isNotUrlLike(filename: string): boolean;
declare function isNotUrlLike(filename: URL): false;
/**
* @param filename - filename to check if it is a string containing a URL or a URL object.
*/
declare function isNotUrlLike(filename: string | URL): filename is string;
/**
* Check if `url` is a URL instance.
* @returns
*/
declare function isURL(url: unknown): url is URL;
/**
*
* @param url - url to check
* @param protocol - protocol to check against - e.g. 'file:', 'http:', 'https:'
* @returns
*/
declare function hasProtocol(url: string | URL, protocol: string): boolean;
/**
* Attempts to add a trailing slash to the URL pathname if it does not already have one.
* Some If the pathname doesn't start with a `/`, a trailing slash is not added.
* @param url - a URL
* @returns
*/
declare function addTrailingSlash(url: URL): URL;
/**
* Calculate the relative path to go from `urlFrom` to `urlTo`.
* The protocol is not evaluated. Only the `url.pathname` is used.
* @param urlFrom
* @param urlTo
* @returns the relative path
*/
declare function urlRelative(urlFrom: string | URL, urlTo: string | URL): string;
/**
* Ensure that a windows file url is correctly formatted with a capitol letter for the drive.
*
* @param url - URL to check.
* @returns a new URL if modified or converted from a string.
*/
declare function normalizeWindowsUrl(url: URL | string): URL;
/**
* There is a bug is NodeJS that sometimes causes UNC paths converted to a URL to be prefixed with `file:////`.
* @param url - URL to check.
* @returns fixed URL if needed.
*/
declare function fixUncUrl(url: URL): URL;
//#endregion
export { type BuilderOptions, FileUrlBuilder, type PathInterface, addTrailingSlash, basenameOfUrlPathname, encodePathChars, fixUncUrl, hasProtocol, isDataURL, isFileURL, isNotUrlLike, isURL, isUrlLike, normalizeFilePathForUrl, normalizeWindowsUrl, toFileDirURL, toFilePathOrHref, toFileURL, toURL, urlBasename, urlDirname, urlParent, urlRelative };
//# sourceMappingURL=index.d.ts.map