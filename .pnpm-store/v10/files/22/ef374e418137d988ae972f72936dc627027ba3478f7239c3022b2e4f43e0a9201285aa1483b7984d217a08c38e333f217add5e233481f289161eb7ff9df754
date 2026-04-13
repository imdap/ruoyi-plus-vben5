import { TSESLint } from '@typescript-eslint/utils'
/**
 * Determines which lines have the specified ESLint rule disabled via comments.
 *
 * Parses ESLint disable comments in the source code to identify lines where a
 * specific rule should not be enforced. Handles all ESLint disable directives:
 *
 * - `eslint-disable-next-line` - Disables the rule for the next line
 * - `eslint-disable-line` - Disables the rule for the current line
 * - `eslint-disable` - Disables the rule from this point forward
 * - `eslint-enable` - Re-enables the rule after a previous disable.
 *
 * The function correctly handles:
 *
 * - Rule-specific disables (e.g., `eslint-disable-next-line rule-name`)
 * - Global disables (e.g., `eslint-disable-next-line` without specific rules)
 * - Nested disable/enable pairs.
 *
 * @example
 *
 * ```ts
 * // Source code with disable comments:
 * // eslint-disable-next-line perfectionist/sort-imports
 * import { z } from 'zod'
 * import { a } from 'a'
 *
 * // eslint-disable perfectionist/sort-imports
 * import { y } from 'y'
 * import { b } from 'b'
 * // eslint-enable perfectionist/sort-imports
 *
 * getEslintDisabledLines({
 *   sourceCode,
 *   ruleName: 'perfectionist/sort-imports',
 * })
 * // Returns: [2, 5, 6] (lines where the rule is disabled)
 * ```
 *
 * @param props - Configuration object.
 * @param props.sourceCode - ESLint source code object containing comments.
 * @param props.ruleName - Name of the rule to check for disable directives.
 * @returns Array of line numbers (1-indexed) where the rule is disabled.
 */
export declare function getEslintDisabledLines(props: {
  sourceCode: TSESLint.SourceCode
  ruleName: string
}): number[]
