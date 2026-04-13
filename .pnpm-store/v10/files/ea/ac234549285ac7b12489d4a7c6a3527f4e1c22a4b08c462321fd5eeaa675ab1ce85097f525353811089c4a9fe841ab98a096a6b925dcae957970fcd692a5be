import { TSESTree } from '@typescript-eslint/types'
import { TSESLint } from '@typescript-eslint/utils'
import { Options } from './types.js'
export declare function sortImportOrExportAttributes<
  MessageIds extends string,
>({
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
  node: TSESTree.ExportNamedDeclaration | TSESTree.ImportDeclaration
  context: TSESLint.RuleContext<MessageIds, Options>
  defaultOptions: Required<Options[number]>
  matchedAstSelectors: ReadonlySet<string>
}): void
