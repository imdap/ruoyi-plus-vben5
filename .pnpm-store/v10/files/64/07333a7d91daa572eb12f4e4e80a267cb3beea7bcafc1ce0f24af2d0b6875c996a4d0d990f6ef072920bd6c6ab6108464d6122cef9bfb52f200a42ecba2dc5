import { TSESTree } from '@typescript-eslint/types'
/**
 * Recursively extracts the name from a heritage clause expression.
 *
 * For simple identifiers, returns the name directly. For member expressions
 * (like `Namespace.Class`), recursively extracts the property name.
 *
 * @param expression - The heritage clause expression AST node.
 * @returns The extracted name string from the expression.
 */
export declare function computeNodeName(
  expression: TSESTree.PrivateIdentifier | TSESTree.Expression,
): string
