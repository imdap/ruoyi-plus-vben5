import { TSESTree } from '@typescript-eslint/types'
import { TSESLint } from '@typescript-eslint/utils'
import { MessageId, Options } from './types.js'
/**
 * Computes the matched context options for a given object node.
 *
 * @param params - Parameters.
 * @param params.isDestructuredObject - Whether the object is destructured.
 * @param params.matchedAstSelectors - The matched AST selectors for an object
 *   node.
 * @param params.sourceCode - The source code object.
 * @param params.nodeObject - The object node to evaluate.
 * @param params.context - The rule context.
 * @returns The matched context options or undefined if none match.
 */
export declare function computeMatchedContextOptions({
  isDestructuredObject,
  matchedAstSelectors,
  sourceCode,
  nodeObject,
  context,
}: {
  nodeObject: TSESTree.ObjectExpression | TSESTree.ObjectPattern
  context: TSESLint.RuleContext<MessageId, Options>
  matchedAstSelectors: ReadonlySet<string>
  sourceCode: TSESLint.SourceCode
  isDestructuredObject: boolean
}): Options[number] | undefined
