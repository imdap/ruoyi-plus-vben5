import type { GlobPatternWithRoot } from 'cspell-glob';
import { GlobMatcher } from 'cspell-glob';
import type { VFileSystem } from 'cspell-io';
export interface IsIgnoredExResult {
    glob: string | undefined;
    root: string | undefined;
    matched: boolean;
    gitIgnoreFile: string;
    line: number | undefined;
}
/**
 * Represents an instance of a .gitignore file.
 */
export declare class GitIgnoreFile {
    readonly matcher: GlobMatcher;
    readonly gitignore: string | URL;
    constructor(matcher: GlobMatcher, gitignore: string | URL);
    get root(): string;
    isIgnored(file: string | URL): boolean;
    isIgnoredEx(file: string | URL): IsIgnoredExResult;
    getGlobPatters(): GlobPatternWithRoot[];
    getGlobs(relativeToDir: string | URL): string[];
    static parseGitignore(content: string, gitignoreFilename: string | URL): GitIgnoreFile;
    static loadGitignore(gitignore: string | URL, vfs: VFileSystem): Promise<GitIgnoreFile>;
}
/**
 * A collection of nested GitIgnoreFiles to be evaluated from top to bottom.
 */
export declare class GitIgnoreHierarchy {
    readonly gitIgnoreChain: GitIgnoreFile[];
    constructor(gitIgnoreChain: GitIgnoreFile[]);
    isIgnored(file: string | URL): boolean;
    /**
     * Check to see which `.gitignore` file ignored the given file.
     * @param file - fsPath to check.
     * @returns IsIgnoredExResult of the match or undefined if there was no match.
     */
    isIgnoredEx(file: string | URL): IsIgnoredExResult | undefined;
    getGlobPatters(): GlobPatternWithRoot[];
    getGlobs(relativeTo: string): string[];
}
export declare function loadGitIgnore(dir: string | URL, vfs?: VFileSystem): Promise<GitIgnoreFile | undefined>;
declare function mustBeHierarchical(chain: GitIgnoreFile[]): void;
export declare const __testing__: {
    mustBeHierarchical: typeof mustBeHierarchical;
};
export {};
//# sourceMappingURL=GitIgnoreFile.d.ts.map