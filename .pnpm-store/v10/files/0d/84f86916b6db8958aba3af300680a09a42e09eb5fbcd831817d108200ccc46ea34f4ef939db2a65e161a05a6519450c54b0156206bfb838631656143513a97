import { toFileDirURL, toFileURL, urlDirname } from '@cspell/url';
import { GitIgnoreHierarchy, loadGitIgnore } from './GitIgnoreFile.js';
import { isParentOf } from './utils.js';
/**
 * Class to cache and process `.gitignore` file queries.
 */
export class GitIgnore {
    resolvedGitIgnoreHierarchies = new Map();
    knownGitIgnoreHierarchies = new Map();
    _roots;
    _sortedRoots;
    _vfs;
    /**
     * @param roots - (search roots) an optional array of root paths to prevent searching for `.gitignore` files above the root.
     *   If a file is under multiple roots, the closest root will apply. If a file is not under any root, then
     *   the search for `.gitignore` will go all the way to the system root of the file.
     */
    constructor(roots = [], vfs) {
        this._vfs = vfs;
        this._sortedRoots = resolveAndSortRoots(roots);
        this._roots = new Set(this._sortedRoots);
    }
    findResolvedGitIgnoreHierarchy(directory) {
        return this.resolvedGitIgnoreHierarchies.get(toFileDirURL(directory).href);
    }
    isIgnoredQuick(file) {
        const uFile = toFileURL(file);
        const gh = this.findResolvedGitIgnoreHierarchy(getDir(uFile));
        return gh?.isIgnored(uFile);
    }
    async isIgnored(file) {
        const uFile = toFileURL(file);
        const gh = await this.findGitIgnoreHierarchy(getDir(uFile));
        return gh.isIgnored(uFile);
    }
    async isIgnoredEx(file) {
        const uFile = toFileURL(file);
        const gh = await this.findGitIgnoreHierarchy(getDir(uFile));
        return gh.isIgnoredEx(uFile);
    }
    async findGitIgnoreHierarchy(directory) {
        directory = toFileDirURL(directory).href;
        const known = this.knownGitIgnoreHierarchies.get(directory);
        if (known) {
            return known;
        }
        const find = this._findGitIgnoreHierarchy(directory);
        this.knownGitIgnoreHierarchies.set(directory, find);
        const found = await find;
        this.resolvedGitIgnoreHierarchies.set(directory, found);
        return find;
    }
    filterOutIgnored(files) {
        const iter = this.filterOutIgnoredAsync(files);
        return isAsyncIterable(files) ? iter : asyncIterableToArray(iter);
    }
    async *filterOutIgnoredAsync(files) {
        for await (const file of files) {
            const isIgnored = this.isIgnoredQuick(file) ?? (await this.isIgnored(file));
            if (!isIgnored) {
                yield file;
            }
        }
    }
    get roots() {
        return this._sortedRoots;
    }
    addRoots(roots) {
        const rootsToAdd = roots.map((r) => toFileDirURL(r).href).filter((r) => !this._roots.has(r));
        if (!rootsToAdd.length)
            return;
        rootsToAdd.forEach((r) => this._roots.add(r));
        this._sortedRoots = resolveAndSortRoots([...this._roots]);
        this.cleanCachedEntries();
    }
    peekGitIgnoreHierarchy(directory) {
        directory = toFileDirURL(directory).href;
        return this.knownGitIgnoreHierarchies.get(directory);
    }
    async getGlobs(directory) {
        const hierarchy = await this.findGitIgnoreHierarchy(directory);
        return hierarchy.getGlobs(directory);
    }
    cleanCachedEntries() {
        this.knownGitIgnoreHierarchies.clear();
        this.resolvedGitIgnoreHierarchies.clear();
    }
    async _findGitIgnoreHierarchy(directory) {
        directory = toFileDirURL(directory);
        const root = this.determineRoot(directory);
        const parent = urlDirname(directory);
        const parentHierarchy = parent.href !== directory.href && isParentOf(root, parent)
            ? await this.findGitIgnoreHierarchy(parent)
            : undefined;
        const git = await loadGitIgnore(directory, this._vfs);
        if (!git) {
            return parentHierarchy || new GitIgnoreHierarchy([]);
        }
        const chain = parentHierarchy ? [...parentHierarchy.gitIgnoreChain, git] : [git];
        return new GitIgnoreHierarchy(chain);
    }
    determineRoot(directory) {
        const uDir = toFileDirURL(directory);
        const roots = this.roots;
        for (let i = roots.length - 1; i >= 0; --i) {
            const r = roots[i];
            if (uDir.href.startsWith(r))
                return r;
        }
        return uDir.pathname.startsWith('/') ? new URL('/', uDir).href : uDir.href;
    }
}
/**
 * Convert the roots into urls strings.
 * @param roots
 * @returns
 */
function resolveAndSortRoots(roots) {
    const sortedRoots = roots.map((a) => toFileDirURL(a).href);
    sortRoots(sortedRoots);
    Object.freeze(sortedRoots);
    return sortedRoots;
}
function getDir(file) {
    return urlDirname(toFileURL(file));
}
/**
 * Sorts root paths based upon their length.
 * @param roots - array to be sorted
 */
function sortRoots(roots) {
    roots.sort((a, b) => a.length - b.length || a.localeCompare(b));
    return roots;
}
function isAsyncIterable(i) {
    const as = i;
    return typeof as[Symbol.asyncIterator] === 'function';
}
async function asyncIterableToArray(iter) {
    const r = [];
    for await (const t of iter) {
        r.push(t);
    }
    return r;
}
//# sourceMappingURL=GitIgnore.js.map