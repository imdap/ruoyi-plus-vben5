import { TSESTree } from '@typescript-eslint/types'
import { TSESLint } from '@typescript-eslint/utils'
import { NodeNameDetails, Modifier, Selector } from '../types.js'
/**
 * Computes details related to a method.
 *
 * @param params - Parameters object.
 * @param params.isDecorated - Whether the accessor is decorated.
 * @param params.method - The method node to compute information for.
 * @param params.sourceCode - The source code object.
 * @param params.hasParentDeclare - Whether the parent class is a declare class.
 * @returns An object containing various details about the method.
 */
export declare function computeMethodDetails({
  hasParentDeclare,
  isDecorated,
  sourceCode,
  method,
}: {
  method: TSESTree.TSAbstractMethodDefinition | TSESTree.MethodDefinition
  sourceCode: TSESLint.SourceCode
  hasParentDeclare: boolean
  isDecorated: boolean
}): {
  addSafetySemicolonWhenInline: boolean
  nameDetails: NodeNameDetails
  modifiers: Modifier[]
  selectors: Selector[]
  isStatic: boolean
}
