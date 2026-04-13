import { ReadClosestTsConfigByPathValue } from './read-closest-ts-config-by-path.js'
import { RegexOption } from '../../types/common-options.js'
import { Selector } from './types.js'
/**
 * Common import selector types that categorize imports by their
 * characteristics.
 *
 * These selectors are used to identify and group imports based on their module
 * path patterns and resolution characteristics.
 */
type CommonSelector = Extract<
  Selector,
  | 'tsconfig-path'
  | 'internal'
  | 'external'
  | 'sibling'
  | 'builtin'
  | 'subpath'
  | 'parent'
  | 'index'
>
/**
 * Computes all applicable selectors for an import based on its module path.
 *
 * Analyzes an import's module specifier to determine which categories it
 * belongs to, such as external package, internal module, relative import, or
 * Node.js builtin. These selectors are used for grouping and sorting imports
 * according to user configuration.
 *
 * @param options - Configuration options.
 * @param options.tsConfigOutput - TypeScript configuration for path resolution.
 * @param options.filename - Current file path for relative import resolution.
 * @param options.options - Rule options including internal patterns and
 *   environment.
 * @param options.name - Import module specifier to analyze.
 * @returns Array of matching selectors for the import.
 */
export declare function computeCommonSelectors({
  tsConfigOutput,
  filename,
  options,
  name,
}: {
  options: {
    internalPattern: RegexOption[]
    environment: 'node' | 'bun'
  }
  tsConfigOutput: ReadClosestTsConfigByPathValue | null
  filename: string
  name: string
}): CommonSelector[]
export {}
