import { default as ts } from 'typescript'
/**
 * Heavily inspired from:
 * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/typescript-estree/src/parseSettings/getProjectConfigFiles.ts.
 */
/**
 * Parsed TypeScript configuration with compiler options and module resolution
 * cache.
 */
export interface ReadClosestTsConfigByPathValue {
  /**
   * TypeScript compiler options including path mappings and module resolution
   * settings.
   */
  compilerOptions: ts.CompilerOptions
  /**
   * Module resolution cache for efficient repeated resolutions.
   */
  cache: ts.ModuleResolutionCache
}
/**
 * Cache mapping directories to their nearest tsconfig file path. Speeds up
 * config resolution for files in the same directory.
 */
export declare let directoryCacheByPath: Map<string, string>
/**
 * Cache mapping file paths to their parsed tsconfig content. Prevents
 * re-parsing the same config files multiple times.
 */
export declare let contentCacheByPath: Map<
  string,
  ReadClosestTsConfigByPathValue
>
/**
 * Finds and parses the closest tsconfig.json file in the directory hierarchy.
 *
 * Searches upward from the file's directory until finding a tsconfig file or
 * reaching the configured root directory. Results are cached for performance.
 *
 * @param options - Configuration options.
 * @param options.tsconfigFilename - Name of the config file to search for
 *   (e.g., 'tsconfig.json').
 * @param options.tsconfigRootDir - Root directory to stop searching at.
 * @param options.contextCwd - Current working directory for module resolution.
 * @param options.filePath - Path of the file to find config for.
 * @returns Parsed TypeScript configuration or null if TypeScript is
 *   unavailable.
 * @throws {Error} If no tsconfig file is found within the root directory.
 */
export declare function readClosestTsConfigByPath({
  tsconfigFilename,
  tsconfigRootDir,
  contextCwd,
  filePath,
}: {
  tsconfigFilename: string
  tsconfigRootDir: string
  contextCwd: string
  filePath: string
}): ReadClosestTsConfigByPathValue | null
