import type { VFileSystem } from 'cspell-io';
export interface ResolveFileResult {
    /**
     * Absolute path or URL to the file.
     */
    filename: string;
    relativeTo: string | undefined;
    found: boolean;
    /**
     * A warning message if the file was found, but there was a problem.
     */
    warning?: string;
    /**
     * The method used to resolve the file.
     */
    method: string;
}
export declare class FileResolver {
    private fs;
    readonly templateReplacements: Record<string, string>;
    constructor(fs: VFileSystem, templateReplacements: Record<string, string>);
    /**
     * Resolve filename to absolute paths.
     * - Replaces `${env:NAME}` with the value of the environment variable `NAME`.
     * - Replaces `~` with the user's home directory.
     * It tries to look for local files as well as node_modules
     * @param filename an absolute path, relative path, `~` path, a node_module, or URL.
     * @param relativeTo absolute path
     */
    resolveFile(filename: string | URL, relativeTo: string | URL): Promise<ResolveFileResult>;
    _resolveFile(filename: string, relativeTo: string | URL): Promise<ResolveFileResult>;
    private doesExist;
    /**
     * Check to see if it is a URL.
     * Note: URLs are absolute!
     * If relativeTo is a non-file URL, then it will try to resolve the filename relative to it.
     * @param filename - url string
     * @returns ResolveFileResult
     */
    tryUrlRel: (filename: string, relativeToURL: string | URL) => Promise<ResolveFileResult | undefined>;
    /**
     * Check to see if it is a URL.
     * Note: URLs are absolute!
     * If relativeTo is a non-file URL, then it will try to resolve the filename relative to it.
     * @param filename - url string
     * @returns ResolveFileResult
     */
    tryUrl: (filename: string, relativeToURL: string | URL) => Promise<ResolveFileResult | undefined>;
    tryCreateRequire: (filename: string | URL, relativeTo: string | URL) => ResolveFileResult | undefined;
    tryNodeResolveDefaultPaths: (filename: string) => ResolveFileResult | undefined;
    tryNodeRequireResolve: (filenameOrURL: string, relativeTo: string | URL) => ResolveFileResult | undefined;
    tryImportResolve: (filename: string, relativeTo: string | URL) => ResolveFileResult | undefined;
    tryResolveGlobal: (filename: string) => ResolveFileResult | undefined;
    tryResolveExists: (filename: string | URL, relativeTo: string | URL) => Promise<ResolveFileResult | undefined>;
    tryResolveFrom: (filename: string, relativeTo: string | URL) => ResolveFileResult | undefined;
    tryLegacyResolve: (filename: string | URL, relativeTo: string | URL) => ResolveFileResult | undefined;
}
export declare function patchFilename(filename: string, templateReplacements: Record<string, string>): string;
/**
 * Resolve filename to a URL
 * - Replaces `${env:NAME}` with the value of the environment variable `NAME`.
 * - Replaces `~` with the user's home directory.
 * It will not resolve Node modules.
 * @param filename - a filename, path, relative path, or URL.
 * @param relativeTo - a path, or URL.
 * @param env - environment variables used to patch the filename.
 * @returns a URL
 */
export declare function resolveRelativeTo(filename: string | URL, relativeTo: string | URL, templateReplacements?: Record<string, string>): URL;
export declare function createFileResolver(fs: VFileSystem, templateVariables?: Record<string, string>): FileResolver;
export declare function resolveFile(filename: string | URL, relativeTo: string | URL, fs?: VFileSystem): Promise<ResolveFileResult>;
//# sourceMappingURL=resolveFile.d.ts.map