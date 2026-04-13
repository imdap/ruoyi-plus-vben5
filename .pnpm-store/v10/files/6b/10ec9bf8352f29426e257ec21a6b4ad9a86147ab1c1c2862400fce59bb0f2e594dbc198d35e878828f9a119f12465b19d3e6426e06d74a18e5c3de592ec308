import type { VFileSystem } from 'cspell-io';
import type { IsIgnoredExResult } from './GitIgnoreFile.js';
import { GitIgnoreHierarchy } from './GitIgnoreFile.js';
/**
 * Class to cache and process `.gitignore` file queries.
 */
export declare class GitIgnore {
    private resolvedGitIgnoreHierarchies;
    private knownGitIgnoreHierarchies;
    private _roots;
    private _sortedRoots;
    private _vfs;
    /**
     * @param roots - (search roots) an optional array of root paths to prevent searching for `.gitignore` files above the root.
     *   If a file is under multiple roots, the closest root will apply. If a file is not under any root, then
     *   the search for `.gitignore` will go all the way to the system root of the file.
     */
    constructor(roots?: (string | URL)[], vfs?: VFileSystem);
    findResolvedGitIgnoreHierarchy(directory: string | URL): GitIgnoreHierarchy | undefined;
    isIgnoredQuick(file: string | URL): boolean | undefined;
    isIgnored(file: string | URL): Promise<boolean>;
    isIgnoredEx(file: string | URL): Promise<IsIgnoredExResult | undefined>;
    findGitIgnoreHierarchy(directory: string | URL): Promise<GitIgnoreHierarchy>;
    filterOutIgnored(files: string[]): Promise<string[]>;
    filterOutIgnored(files: Iterable<string>): Promise<string[]>;
    filterOutIgnored(files: AsyncIterable<string>): AsyncIterable<string>;
    filterOutIgnored(files: Iterable<string> | AsyncIterable<string>): Promise<string[]> | AsyncIterable<string>;
    filterOutIgnored(files: Iterable<string> & AsyncIterable<string>): AsyncIterable<string>;
    filterOutIgnoredAsync(files: Iterable<string> | AsyncIterable<string>): AsyncIterable<string>;
    get roots(): string[];
    addRoots(roots: (string | URL)[]): void;
    peekGitIgnoreHierarchy(directory: string | URL): Promise<GitIgnoreHierarchy> | undefined;
    getGlobs(directory: string): Promise<string[]>;
    private cleanCachedEntries;
    private _findGitIgnoreHierarchy;
    private determineRoot;
}
//# sourceMappingURL=GitIgnore.d.ts.map