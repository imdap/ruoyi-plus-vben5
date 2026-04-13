import { CommonOptions } from '../../types/common-options.js'
/**
 * Creates a function that formats strings for comparison.
 *
 * Applies transformations based on the provided options:
 *
 * - Case normalization (lowercase if ignoreCase is true)
 * - Special character handling (keep, trim, or remove)
 * - Whitespace removal (always applied).
 *
 * @param params - Parameters for string formatting.
 * @param params.ignoreCase - Whether to convert strings to lowercase.
 * @param params.specialCharacters - How to handle special characters:
 *
 *   - 'keep': Keep all characters as-is
 *   - 'trim': Remove leading special characters
 *   - 'remove': Remove all special characters.
 *
 * @returns Function that formats a string for comparison.
 * @throws {UnreachableCaseError} If an unknown special characters option is
 *   specified.
 */
export declare function buildStringFormatter({
  specialCharacters,
  ignoreCase,
}: Pick<CommonOptions, 'specialCharacters' | 'ignoreCase'>): (
  value: string,
) => string
