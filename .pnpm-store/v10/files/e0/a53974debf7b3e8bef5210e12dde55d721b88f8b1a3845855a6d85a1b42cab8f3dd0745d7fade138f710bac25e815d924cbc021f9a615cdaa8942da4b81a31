import { RuleContext } from '@typescript-eslint/utils/ts-eslint'
import { TSESTree } from '@typescript-eslint/types'
import { Options } from './types.js'
/**
 * Computes the matched context options for a given map node.
 *
 * @param params - Parameters.
 * @param params.matchedAstSelectors - The matched AST selectors for a map node.
 * @param params.elements - The map elements to compute the context options for.
 * @param params.context - The rule context.
 * @returns The matched context options or undefined if none match.
 */
export declare function computeMatchedContextOptions<
  MessageIds extends string,
>({
  matchedAstSelectors,
  elements,
  context,
}: {
  elements: (TSESTree.SpreadElement | TSESTree.Expression | null)[]
  context: Readonly<RuleContext<MessageIds, Options>>
  matchedAstSelectors: ReadonlySet<string>
}): Options[number] | undefined
