import { RuleContext } from '@typescript-eslint/utils/ts-eslint'
import { TSESTree } from '@typescript-eslint/types'
import { Options } from './types.js'
/**
 * Computes the matched context options for a given named export node.
 *
 * @param params - Parameters.
 * @param params.node - The named export node to compute the context options
 *   for.
 * @param params.matchedAstSelectors - The matched AST selectors for a named
 *   export node.
 * @param params.context - The rule context.
 * @returns The matched context options or undefined if none match.
 */
export declare function computeMatchedContextOptions<
  MessageIds extends string,
>({
  matchedAstSelectors,
  context,
  node,
}: {
  context: Readonly<RuleContext<MessageIds, Options>>
  matchedAstSelectors: ReadonlySet<string>
  node: TSESTree.ExportNamedDeclaration
}): Options[number] | undefined
