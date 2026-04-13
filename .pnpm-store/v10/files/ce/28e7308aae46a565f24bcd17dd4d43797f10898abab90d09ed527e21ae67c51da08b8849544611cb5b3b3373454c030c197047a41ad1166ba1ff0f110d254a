import { TSESLint } from '@typescript-eslint/utils'
import { TSESTree } from '@typescript-eslint/types'
/**
 * Extracts the name of an import attribute for sorting purposes.
 *
 * For identifier keys, returns the identifier name. For literal keys, returns
 * the string value. Falls back to source code text if needed.
 *
 * @param attribute - The import attribute AST node.
 * @param sourceCode - The ESLint source code object.
 * @returns The attribute name to use for sorting.
 */
export declare function computeNodeName(
  attribute: TSESTree.ImportAttribute,
  sourceCode: TSESLint.SourceCode,
): string
