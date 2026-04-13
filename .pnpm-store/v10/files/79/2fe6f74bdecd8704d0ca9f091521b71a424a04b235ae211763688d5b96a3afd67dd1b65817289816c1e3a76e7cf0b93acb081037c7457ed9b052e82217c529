import { ScopedRegexOption, Scope } from '../../types/scoped-regex-option.js'
export type SingleRegexOption =
  | {
      pattern: string
      flags?: string
      scope?: Scope
    }
  | string
/**
 * Partitions patterns by their scope (shallow or deep).
 *
 * @param patternOrPatterns - A single pattern or an array of patterns.
 * @returns An object containing arrays of shallow and deep scope patterns.
 */
export declare function partitionPatternsByScope(
  patternOrPatterns: ScopedRegexOption,
): {
  shallowScopePatterns: SingleRegexOption[]
  deepScopePatterns: SingleRegexOption[]
}
