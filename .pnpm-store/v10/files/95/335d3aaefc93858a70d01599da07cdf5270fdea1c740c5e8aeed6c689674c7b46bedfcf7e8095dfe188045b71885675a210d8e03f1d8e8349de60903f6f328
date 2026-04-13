import { toFileDirURL, toFilePathOrHref, toFileURL } from '@cspell/url';
import { srcDirectory } from '../pkg-info.mjs';
export { addTrailingSlash, isDataURL, isFileURL, isUrlLike as isURLLike, toFileURL as resolveFileWithURL, toFileDirURL, toFilePathOrHref, toURL, } from '@cspell/url';
/**
 * This is a URL that can be used for searching for modules.
 * @returns URL for the source directory
 */
export function getSourceDirectoryUrl() {
    const srcDirectoryURL = toFileDirURL(srcDirectory);
    return srcDirectoryURL;
}
/**
 * @param path - path to convert to a URL
 * @param relativeTo - URL to resolve the path against or the current working directory.
 * @returns a URL
 */
export function relativeTo(path, relativeTo) {
    return toFileURL(path, relativeTo ?? cwdURL());
}
export function cwdURL() {
    return toFileDirURL('./');
}
export function toFileUrl(file) {
    return toFileURL(file, cwdURL());
}
export function fileURLOrPathToPath(filenameOrURL) {
    return toFilePathOrHref(filenameOrURL);
}
const regExpWindowsPathDriveLetter = /^([a-zA-Z]):[\\]/;
export function windowsDriveLetterToUpper(absoluteFilePath) {
    return absoluteFilePath.replace(regExpWindowsPathDriveLetter, (s) => s.toUpperCase());
}
//# sourceMappingURL=url.js.map