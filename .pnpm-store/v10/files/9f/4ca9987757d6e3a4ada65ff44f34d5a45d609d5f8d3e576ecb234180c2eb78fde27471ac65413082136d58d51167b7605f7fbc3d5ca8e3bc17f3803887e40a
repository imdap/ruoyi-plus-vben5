/**
 * Proposed CSpell Cache file.
 * To be stored at `./.cspell/cache/cache.json`
 */
export interface CSpellCache {
    version: Version;
    signature: Hash;
    files: CachedFile[];
}
export type Version = '0.1';
/**
 * Hash used. Starts with hash id. i.e. `sha1-` or `sha512-`.
 */
export type Hash = string;
export type UriRelPath = string;
export declare enum IssueCode {
    UnknownWord = 1,
    ForbiddenWord = 2,
    KnownIssue = 4,
    ALL = 7
}
export interface CachedFile {
    hash: Hash;
    path: UriRelPath;
    issues: Issue[];
}
export type Issue = IssueEntry | IssueLine;
export interface IssueEntry {
    line: number;
    character: number;
    code: IssueCode;
    text: string;
    len: number;
}
export type IssueLine = [
    line: IssueEntry['line'],
    character: IssueEntry['character'],
    code: IssueEntry['code'],
    text: IssueEntry['text'],
    len: IssueEntry['len']
];
//# sourceMappingURL=cspell.cache.d.ts.map