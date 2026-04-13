import { toFileDirURL, toFilePathOrHref, toFileURL, urlDirname } from '@cspell/url';
import { GlobMatcher } from 'cspell-glob';
import { getDefaultVirtualFs } from 'cspell-io';
import { isDefined, isParentOf, makeRelativeTo } from './utils.js';
/**
 * Represents an instance of a .gitignore file.
 */
export class GitIgnoreFile {
    matcher;
    gitignore;
    constructor(matcher, gitignore) {
        this.matcher = matcher;
        this.gitignore = gitignore;
    }
    get root() {
        return this.matcher.root;
    }
    isIgnored(file) {
        return this.matcher.match(file.toString());
    }
    isIgnoredEx(file) {
        const m = this.matcher.matchEx(file.toString());
        const { matched } = m;
        const partial = m;
        const pattern = partial.pattern;
        const glob = pattern?.rawGlob ?? partial.glob;
        const root = partial.root;
        const line = pattern?.line;
        return { glob, matched, gitIgnoreFile: toFilePathOrHref(this.gitignore), root, line };
    }
    getGlobPatters() {
        return this.matcher.patterns;
    }
    getGlobs(relativeToDir) {
        return this.getGlobPatters()
            .map((pat) => globToString(pat, relativeToDir))
            .filter(isDefined);
    }
    static parseGitignore(content, gitignoreFilename) {
        gitignoreFilename = toFileURL(gitignoreFilename);
        const root = urlDirname(gitignoreFilename).href;
        const options = { root };
        const globs = content
            .split(/\r?\n/g)
            .map((glob, index) => ({
            glob: glob.replace(/^#.*/, ''),
            source: gitignoreFilename.toString(),
            line: index + 1,
        }))
            .filter((g) => !!g.glob);
        const globMatcher = new GlobMatcher(globs, options);
        return new GitIgnoreFile(globMatcher, gitignoreFilename);
    }
    static async loadGitignore(gitignore, vfs) {
        gitignore = toFileURL(gitignore);
        const file = await vfs.readFile(gitignore, 'utf8');
        return this.parseGitignore(file.getText(), gitignore);
    }
}
/**
 * A collection of nested GitIgnoreFiles to be evaluated from top to bottom.
 */
export class GitIgnoreHierarchy {
    gitIgnoreChain;
    constructor(gitIgnoreChain) {
        this.gitIgnoreChain = gitIgnoreChain;
        mustBeHierarchical(gitIgnoreChain);
    }
    isIgnored(file) {
        for (const git of this.gitIgnoreChain) {
            if (git.isIgnored(file))
                return true;
        }
        return false;
    }
    /**
     * Check to see which `.gitignore` file ignored the given file.
     * @param file - fsPath to check.
     * @returns IsIgnoredExResult of the match or undefined if there was no match.
     */
    isIgnoredEx(file) {
        for (const git of this.gitIgnoreChain) {
            const r = git.isIgnoredEx(file);
            if (r.matched)
                return r;
        }
        return undefined;
    }
    getGlobPatters() {
        return this.gitIgnoreChain.flatMap((gf) => gf.getGlobPatters());
    }
    getGlobs(relativeTo) {
        return this.gitIgnoreChain.flatMap((gf) => gf.getGlobs(relativeTo));
    }
}
export async function loadGitIgnore(dir, vfs) {
    dir = toFileDirURL(dir);
    if (!dir.pathname.startsWith('/'))
        return undefined;
    vfs ??= getDefaultVirtualFs().getFS(dir);
    const file = new URL('.gitignore', dir);
    try {
        return await GitIgnoreFile.loadGitignore(file, vfs);
    }
    catch {
        return undefined;
    }
}
function mustBeHierarchical(chain) {
    let root = '';
    for (const file of chain) {
        if (!file.root.startsWith(root)) {
            throw new Error('Hierarchy violation - files are not nested');
        }
        root = file.root;
    }
}
function globToString(glob, relativeToDir) {
    if (glob.isGlobalPattern)
        return glob.glob;
    relativeToDir = toFileDirURL(relativeToDir);
    const root = toFileDirURL(glob.root);
    if (isParentOf(root, relativeToDir) && glob.glob.startsWith('**/'))
        return glob.glob;
    const base = makeRelativeTo(root, relativeToDir);
    if (base === undefined)
        return undefined;
    return (base ? base + '/' : '') + glob.glob;
}
export const __testing__ = {
    mustBeHierarchical,
};
//# sourceMappingURL=GitIgnoreFile.js.map