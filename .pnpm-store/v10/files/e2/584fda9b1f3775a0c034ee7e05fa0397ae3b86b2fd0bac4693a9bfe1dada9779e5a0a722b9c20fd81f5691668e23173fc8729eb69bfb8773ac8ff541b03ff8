import type { Glob } from '@cspell/cspell-types';
export type ExclusionFunction = (fileUri: string) => boolean;
export type FileExclusionFunction = (file: string) => boolean;
/** The structure of the VS Code search.exclude settings */
export interface ExcludeFilesGlobMap {
    [glob: string]: boolean;
}
export declare function extractGlobsFromExcludeFilesGlobMap(globMap: ExcludeFilesGlobMap): string[];
/**
 * @todo Support multi root globs.
 * @param globs - glob patterns
 * @param root - root directory
 * @param allowedSchemes - allowed schemas
 */
export declare function generateExclusionFunctionForUri(globs: Glob[], root: string, allowedSchemes?: Set<string>): ExclusionFunction;
/**
 * @todo Support multi root globs.
 * @param globs - glob patterns
 * @param root - root directory
 * @param allowedSchemes - allowed schemas
 */
export declare function generateExclusionFunctionForFiles(globs: Glob[], root: string): FileExclusionFunction;
//# sourceMappingURL=exclusionHelper.d.ts.map