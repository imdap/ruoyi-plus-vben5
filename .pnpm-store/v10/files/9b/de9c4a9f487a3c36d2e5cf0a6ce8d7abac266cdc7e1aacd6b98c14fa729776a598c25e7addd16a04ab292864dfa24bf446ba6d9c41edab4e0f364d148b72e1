import { TSESLint } from '@typescript-eslint/utils'
import { ScopedRegexOption } from '../../types/scoped-regex-option.js'
import { ObjectParent } from './types.js'
/**
 * Checks whether the node parent names match the given pattern.
 *
 * @param params - The parameters object.
 * @param params.declarationMatchesPattern - The regex pattern to match against.
 * @param params.parentNodes - The parent nodes to check.
 * @param params.sourceCode - The source code object.
 * @returns True if the parent node parent names passes the pattern filter,
 *   false otherwise.
 */
export declare function passesDeclarationMatchesPatternFilter({
  declarationMatchesPattern,
  parentNodes,
  sourceCode,
}: {
  declarationMatchesPattern: ScopedRegexOption | undefined
  sourceCode: TSESLint.SourceCode
  parentNodes: ObjectParent[]
}): boolean
