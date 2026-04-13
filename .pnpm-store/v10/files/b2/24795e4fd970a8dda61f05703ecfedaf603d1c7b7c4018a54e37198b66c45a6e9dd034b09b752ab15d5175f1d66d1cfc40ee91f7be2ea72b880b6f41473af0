import { getGlobMatcherForExcluding } from './getGlobMatcher.js';
/**
 * @param filename - filename
 * @param globs - globs
 * @returns true if it matches
 */
export function checkFilenameMatchesExcludeGlob(filename, globs) {
    const m = getGlobMatcherForExcluding(globs);
    return m.match(filename);
}
//# sourceMappingURL=checkFilenameMatchesGlob.js.map