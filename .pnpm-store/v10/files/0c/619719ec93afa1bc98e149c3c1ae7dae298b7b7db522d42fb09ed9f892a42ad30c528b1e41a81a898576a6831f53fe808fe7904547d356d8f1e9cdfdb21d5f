/**
 * Array of all ESLint disable directive types. Used to identify and parse
 * ESLint disable comments in source code.
 */
declare let eslintDisableDirectives: readonly [
  'eslint-disable',
  'eslint-enable',
  'eslint-disable-line',
  'eslint-disable-next-line',
]
/**
 * Type representing one of the ESLint disable directive types. Can be
 * 'eslint-disable', 'eslint-enable', 'eslint-disable-line', or
 * 'eslint-disable-next-line'.
 */
type EslintDisableDirective = (typeof eslintDisableDirectives)[number]
/**
 * Parses an ESLint disable comment to extract the directive type and affected
 * rules.
 *
 * Analyzes comment text to determine if it contains an ESLint disable directive
 * and which rules are affected. Returns null if the comment is not a valid
 * ESLint disable directive.
 *
 * @example
 *
 * ```ts
 * getEslintDisabledRules('eslint-disable')
 * // Returns: { eslintDisableDirective: 'eslint-disable', rules: 'all' }
 * ```
 *
 * @example
 *
 * ```ts
 * getEslintDisabledRules('eslint-disable-next-line no-console, no-alert')
 * // Returns: {
 * //   eslintDisableDirective: 'eslint-disable-next-line',
 * //   rules: ['no-console', 'no-alert']
 * // }
 * ```
 *
 * @example
 *
 * ```ts
 * getEslintDisabledRules('regular comment')
 * // Returns: null
 * ```
 *
 * @param comment - Comment text to parse (without comment delimiters).
 * @returns Object containing directive type and affected rules, or null if not
 *   a disable comment.
 */
export declare function getEslintDisabledRules(comment: string): {
  eslintDisableDirective: EslintDisableDirective
  rules: string[] | 'all'
} | null
export {}
