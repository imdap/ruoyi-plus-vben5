import { RuleContext } from '@typescript-eslint/utils/ts-eslint'
import { TSESTree } from '@typescript-eslint/types'
import { ObjectTypeParent, Options } from './types.js'
export declare function sortObjectTypeElements<MessageIds extends string>({
  availableMessageIds,
  matchedAstSelectors,
  parentNodes,
  elements,
  context,
}: {
  availableMessageIds: {
    missedSpacingBetweenMembers: MessageIds
    extraSpacingBetweenMembers: MessageIds
    unexpectedGroupOrder: MessageIds
    unexpectedOrder: MessageIds
  }
  context: RuleContext<MessageIds, Options>
  matchedAstSelectors: ReadonlySet<string>
  elements: TSESTree.TypeElement[]
  parentNodes: ObjectTypeParent[]
}): void
