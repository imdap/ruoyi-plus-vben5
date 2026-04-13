import { ReadClosestTsConfigByPathValue } from './read-closest-ts-config-by-path.js'
/**
 * Checks if an import matches any of the path mappings in tsconfig.json.
 *
 * Path mappings allow custom module resolution (e.g., '@/_' → './src/_'). This
 * function determines if an import uses such a mapped path.
 *
 * @param options - Configuration options.
 * @param options.tsConfigOutput - Parsed TypeScript configuration with path
 *   mappings.
 * @param options.name - Import module specifier to check.
 * @returns True if the import matches a tsconfig path mapping.
 */
export declare function matchesTsconfigPaths({
  tsConfigOutput,
  name,
}: {
  tsConfigOutput: ReadClosestTsConfigByPathValue
  name: string
}): boolean
