import { TSESTree } from '@typescript-eslint/types'
import { TSESLint } from '@typescript-eslint/utils'
import { NodeNameDetails, Modifier, Selector } from '../types.js'
/**
 * Computes details related to an accessor property.
 *
 * @param params - Parameters object.
 * @param params.isDecorated - Whether the accessor is decorated.
 * @param params.sourceCode - The source code object.
 * @param params.accessor - The accessor node to compute information for.
 * @returns An object containing various details about the accessor.
 */
export declare function computeAccessorDetails({
  isDecorated,
  sourceCode,
  accessor,
}: {
  accessor: TSESTree.TSAbstractAccessorProperty | TSESTree.AccessorProperty
  sourceCode: TSESLint.SourceCode
  isDecorated: boolean
}): {
  nameDetails: NodeNameDetails
  dependencyNames: string[]
  modifiers: Modifier[]
  selectors: Selector[]
  isStatic: boolean
}
