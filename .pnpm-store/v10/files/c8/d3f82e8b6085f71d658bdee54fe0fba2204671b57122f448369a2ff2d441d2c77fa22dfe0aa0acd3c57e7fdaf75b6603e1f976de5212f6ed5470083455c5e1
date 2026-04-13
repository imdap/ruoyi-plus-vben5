import { TSESTree } from '@typescript-eslint/types'
import { TSESLint } from '@typescript-eslint/utils'
import { NodeNameDetails } from '../types.js'
/**
 * Computes the name details of a method or property node.
 *
 * @param node - The method or property node to compute the name for.
 * @param sourceCode - The ESLint source code object.
 * @returns An object containing the name, whether it has a private hash, and
 *   the name without the starting hash.
 */
export declare function computeMethodOrPropertyNameDetails(
  node:
    | TSESTree.TSAbstractPropertyDefinition
    | TSESTree.TSAbstractMethodDefinition
    | TSESTree.TSAbstractAccessorProperty
    | TSESTree.PropertyDefinition
    | TSESTree.MethodDefinition
    | TSESTree.AccessorProperty,
  sourceCode: TSESLint.SourceCode,
): NodeNameDetails
