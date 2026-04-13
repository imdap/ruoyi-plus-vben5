import { TSESTree } from '@typescript-eslint/types'
/**
 * Checks if a TypeScript type member is marked as optional.
 *
 * Determines whether a property or method signature in a TypeScript type or
 * interface is optional (marked with '?'). Used for grouping optional and
 * required members separately during sorting.
 *
 * @param node - AST node to check.
 * @returns True if the member is optional, false otherwise.
 */
export declare function isMemberOptional(
  node:
    | TSESTree.TSPropertySignature
    | TSESTree.TSMethodSignature
    | TSESTree.TSIndexSignature,
): boolean
