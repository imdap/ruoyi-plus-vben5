import { RuleContext } from '@typescript-eslint/utils/ts-eslint'
import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { NodeOfType } from '../types/node-of-type.js'
type Sorter<
  MessageId extends string,
  Options extends BaseOptions[],
  NodeTypes extends AST_NODE_TYPES,
> = (parameters: {
  context: Readonly<RuleContext<MessageId, Options>>
  matchedAstSelectors: ReadonlySet<string>
  node: NodeOfType<NodeTypes>
}) => void
type AstListeners<NodeTypes extends AST_NODE_TYPES> = Record<
  string,
  (node: NodeOfType<NodeTypes>) => void
>
interface BaseOptions {
  useConfigurationIf?: {
    matchesAstSelector?: string
  }
}
/**
 * Builds the AST listeners for the rule based on the provided node types,
 * context, and sorter function.
 *
 * @param params - The parameters object.
 * @param params.nodeTypes - The AST node types to listen for.
 * @param params.context - The rule context.
 * @param params.sorter - The function that sorts the nodes based on the
 *   provided parameters.
 * @returns An object containing the AST listeners for the specified node types.
 */
export declare function buildAstListeners<
  MessageId extends string,
  Options extends BaseOptions[],
  NodeTypes extends AST_NODE_TYPES,
>({
  nodeTypes,
  context,
  sorter,
}: {
  sorter: Sorter<MessageId, Options, NoInfer<NodeTypes>>
  context: Readonly<RuleContext<MessageId, Options>>
  nodeTypes: NodeTypes[]
}): AstListeners<NodeTypes>
export {}
