import { TSESTree } from '@typescript-eslint/types'
import { TSESLint } from '@typescript-eslint/utils'
import { Modifier, Selector } from '../types.js'
/**
 * Computes details related to an index-signature.
 *
 * @param params - Parameters object.
 * @param params.indexSignature - The index signature node to compute
 *   information for.
 * @param params.sourceCode - The source code object.
 * @returns An object containing various details about the index-signature.
 */
export declare function computeIndexSignatureDetails({
  indexSignature,
  sourceCode,
}: {
  indexSignature: TSESTree.TSIndexSignature
  sourceCode: TSESLint.SourceCode
}): {
  modifiers: Modifier[]
  selectors: Selector[]
  name: string
}
