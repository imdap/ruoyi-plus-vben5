import { TSESLint } from '@typescript-eslint/utils'
import { SortingNode } from '../types/sorting-node.js'
/**
 * Counts the number of empty lines between two AST nodes.
 *
 * Extracts the lines between the end of the left node and the start of the
 * right node, then counts only the completely empty lines (containing only
 * whitespace). This is used to determine if nodes are separated by newlines and
 * to enforce newline formatting rules.
 *
 * @example
 *
 * ```ts
 * // Source code:
 * // const a = 1;
 * //
 * // const b = 2;
 *
 * getLinesBetween(sourceCode, nodeA, nodeB)
 * // Returns: 1 (one empty line between nodes)
 * ```
 *
 * @example
 *
 * ```ts
 * // Source code:
 * // const a = 1;
 * // // comment
 * // const b = 2;
 *
 * getLinesBetween(sourceCode, nodeA, nodeB)
 * // Returns: 0 (no empty lines, comment line is not empty)
 * ```
 *
 * @param source - ESLint source code object containing the lines array.
 * @param left - Node or object containing the left/first node.
 * @param right - Node or object containing the right/second node.
 * @returns Number of empty lines between the two nodes.
 */
export declare function getLinesBetween(
  source: TSESLint.SourceCode,
  left: Pick<SortingNode, 'node'>,
  right: Pick<SortingNode, 'node'>,
): number
