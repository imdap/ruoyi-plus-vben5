import { GlobMatcher } from 'cspell-glob';
import { toUri, uriToFilePath } from './util/Uri.js';
const defaultAllowedSchemes = new Set(['file', 'untitled']);
export function extractGlobsFromExcludeFilesGlobMap(globMap) {
    const globs = Object.getOwnPropertyNames(globMap).filter((glob) => globMap[glob]);
    return globs;
}
const leadingGlobPattern = /^\*\*\/([^/*{}]+)$/;
function adjustGlobPatternForBackwardsCompatibility(g) {
    return g.replace(leadingGlobPattern, '**/{$1,$1/**}');
}
function adjustGlobPatternsForBackwardsCompatibility(globs) {
    return globs.map((g) => {
        if (typeof g === 'string') {
            return adjustGlobPatternForBackwardsCompatibility(g);
        }
        return { ...g, glob: adjustGlobPatternForBackwardsCompatibility(g.glob) };
    });
}
/**
 * @todo Support multi root globs.
 * @param globs - glob patterns
 * @param root - root directory
 * @param allowedSchemes - allowed schemas
 */
export function generateExclusionFunctionForUri(globs, root, allowedSchemes = defaultAllowedSchemes) {
    const adjustedGlobs = adjustGlobPatternsForBackwardsCompatibility(globs);
    const matchFn = generateExclusionFunctionForFiles(adjustedGlobs, root);
    function testUri(uri) {
        if (!allowedSchemes.has(uri.scheme)) {
            return true;
        }
        return matchFn(uri.scheme === 'file' || uri.scheme === 'stdin' ? uriToFilePath(uri) : uri.path);
    }
    function testUriPath(uriPath) {
        const uri = toUri(uriPath);
        return testUri(uri);
    }
    return testUriPath;
}
/**
 * @todo Support multi root globs.
 * @param globs - glob patterns
 * @param root - root directory
 * @param allowedSchemes - allowed schemas
 */
export function generateExclusionFunctionForFiles(globs, root) {
    const matcher = new GlobMatcher(globs, { root, dot: true });
    return (file) => matcher.match(file);
}
//# sourceMappingURL=exclusionHelper.js.map