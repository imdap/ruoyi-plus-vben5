import { URI } from 'vscode-uri';
import type { DocumentUri, Uri, UriInstance } from './IUri.js';
export declare function toUri(uriOrFile: string | Uri | URL): UriInstance;
export declare function uriToFilePath(uri: DocumentUri): string;
export declare function fromFilePath(file: string): UriInstance;
export declare function fromStdinFilePath(path?: string): UriInstance;
export declare const file: typeof fromFilePath;
export declare function parse(uri: string): UriInstance;
export declare function normalizeDriveLetter(path: string): string;
export declare function isUri(uri: unknown): uri is Uri;
export declare function basename(uri: Uri): string;
export declare function dirname(uri: Uri): UriInstance;
export declare function extname(uri: Uri): string;
export declare function joinPath(uri: Uri, ...paths: string[]): UriInstance;
export declare function resolvePath(uri: Uri, ...paths: string[]): UriInstance;
export declare function uriFrom(uri: Uri, ...parts: Partial<Uri>[]): UriInstance;
declare class UriImpl extends URI implements UriInstance {
    constructor(uri: Uri);
    toString(): string;
    toJSON(): {
        scheme: string;
        authority: string;
        path: string;
        query: string;
        fragment: string;
    };
    with(change: Partial<Uri>): UriImpl;
    static isUri(uri: unknown): uri is UriImpl;
    static from(uri: Uri, ...parts: Partial<Uri>[]): UriImpl;
    static parse(uri: string): UriImpl;
    static file(filename: string): UriImpl;
    static stdin(filePath?: string): UriImpl;
}
declare function normalizeFilePath(path: string): string;
export declare function documentUriToURL(uri: DocumentUri): URL;
export declare const __testing__: {
    UriImpl: typeof UriImpl;
    normalizeFilePath: typeof normalizeFilePath;
};
export {};
//# sourceMappingURL=Uri.d.ts.map