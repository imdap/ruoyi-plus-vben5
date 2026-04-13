import { TSESTree } from '@typescript-eslint/types'
import { TSESLint } from '@typescript-eslint/utils'
import { Options } from './types.js'
/**
 * Computes the matched context options for a given JSX element node.
 *
 * @param params - Parameters.
 * @param params.matchedAstSelectors - The matched AST selectors for a JSX node.
 * @param params.sourceCode - The source code object.
 * @param params.node - The JSX element node to evaluate.
 * @param params.context - The rule context.
 * @returns The matched context options or undefined if none match.
 */
export declare function computeMatchedContextOptions({
  matchedAstSelectors,
  sourceCode,
  context,
  node,
}: {
  context: TSESLint.RuleContext<string, Options>
  matchedAstSelectors: ReadonlySet<string>
  sourceCode: TSESLint.SourceCode
  node: TSESTree.JSXElement
}): Options[number] | undefined
