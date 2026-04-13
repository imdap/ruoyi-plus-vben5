import { RuleContext } from '@typescript-eslint/utils/ts-eslint'
import { TSESTree } from '@typescript-eslint/types'
import { Options } from './types.js'
export declare function sortUnionOrIntersectionTypes<
  MessageIds extends string,
>({
  cachedGroupsByModifiersAndSelectors,
  tokenValueToIgnoreBefore,
  matchedAstSelectors,
  availableMessageIds,
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
  node: TSESTree.TSIntersectionType | TSESTree.TSUnionType
  context: Readonly<RuleContext<MessageIds, Options>>
  defaultOptions: Required<Options[number]>
  matchedAstSelectors: ReadonlySet<string>
  tokenValueToIgnoreBefore: string
}): void
