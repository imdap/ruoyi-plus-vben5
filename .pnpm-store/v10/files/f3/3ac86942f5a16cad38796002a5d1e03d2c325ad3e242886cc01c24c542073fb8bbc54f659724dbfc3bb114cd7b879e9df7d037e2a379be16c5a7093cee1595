import { TSESLint } from '@typescript-eslint/utils'
import { ScopedRegexOption } from '../../types/scoped-regex-option.js'
import { ObjectParent } from './types.js'
/**
 * Checks if the object passes the calling function name pattern filter.
 *
 * @param params - Parameters.
 * @param params.callingFunctionNamePattern - The pattern to evaluate.
 * @param params.parentNodes - The parent nodes of the object.
 * @param params.sourceCode - The source code object.
 * @returns True if the object passes the filter, false otherwise.
 */
export declare function passesCallingFunctionNamePatternFilter({
  callingFunctionNamePattern,
  parentNodes,
  sourceCode,
}: {
  callingFunctionNamePattern: ScopedRegexOption | undefined
  sourceCode: TSESLint.SourceCode
  parentNodes: ObjectParent[]
}): boolean
