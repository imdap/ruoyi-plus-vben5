import { RuleContext } from '@typescript-eslint/utils/ts-eslint'
import { TSESTree } from '@typescript-eslint/types'
import { Options } from './types.js'
export declare function sortArray<MessageIds extends string>({
  cachedGroupsByModifiersAndSelectors,
  mustHaveMatchedContextOptions,
  availableMessageIds,
  matchedAstSelectors,
  defaultOptions,
  context,
  node,
}: {
  availableMessageIds: {
    missedSpacingBetweenMembers: MessageIds
    extraSpacingBetweenMembers: MessageIds
    unexpectedGroupOrder: MessageIds
    unexpectedOrder: MessageIds
  }
  cachedGroupsByModifiersAndSelectors: Map<string, string[]>
  node: TSESTree.ArrayExpression | TSESTree.NewExpression
  context: Readonly<RuleContext<MessageIds, Options>>
  defaultOptions: Required<Options[number]>
  matchedAstSelectors: ReadonlySet<string>
  mustHaveMatchedContextOptions: boolean
}): void
