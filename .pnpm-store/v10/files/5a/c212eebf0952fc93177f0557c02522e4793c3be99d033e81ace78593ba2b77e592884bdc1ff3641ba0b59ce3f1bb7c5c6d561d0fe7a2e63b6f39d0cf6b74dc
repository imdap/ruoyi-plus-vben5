import { RuleContext } from '@typescript-eslint/utils/ts-eslint'
import { TSESTree } from '@typescript-eslint/types'
import { Options } from './types.js'
/**
 * Computes the matched context options for a given import/export attributes
 * node.
 *
 * @param params - Parameters.
 * @param params.matchedAstSelectors - The matched AST selectors for an
 *   import/export declaration node.
 * @param params.attributes - The import attributes to compute the context
 *   options for.
 * @param params.context - The rule context.
 * @returns The matched context options or undefined if none match.
 */
export declare function computeMatchedContextOptions<
  MessageIds extends string,
>({
  matchedAstSelectors,
  attributes,
  context,
}: {
  context: Readonly<RuleContext<MessageIds, Options>>
  matchedAstSelectors: ReadonlySet<string>
  attributes: TSESTree.ImportAttribute[]
}): Options[number] | undefined
