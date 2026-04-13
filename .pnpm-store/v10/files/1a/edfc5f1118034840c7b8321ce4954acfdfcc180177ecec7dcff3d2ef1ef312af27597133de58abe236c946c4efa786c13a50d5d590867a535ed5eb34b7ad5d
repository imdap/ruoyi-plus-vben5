import { TSESTree } from '@typescript-eslint/types'
import {
  OverloadSignatureImplementation,
  OverloadSignatureGroup,
} from './overload-signature-group.js'
import { SortingNode } from '../../types/sorting-node.js'
/**
 * Populate sorting node groups with their corresponding overload signature
 * implementations fields if they exist.
 *
 * @param params - The parameters.
 * @param params.overloadSignatureGroups - List of overload signature groups.
 * @param params.sortingNodeGroups - List of sorting node groups.
 * @returns The populated sorting node groups.
 */
export declare function populateSortingNodeGroupsWithOverloadSignature<
  OverloadSignatureNode extends TSESTree.Node,
  T extends SortingNode,
>({
  overloadSignatureGroups,
  sortingNodeGroups,
}: {
  overloadSignatureGroups: OverloadSignatureGroup<OverloadSignatureNode>[]
  sortingNodeGroups: T[][]
}): (OverloadSignatureImplementation<OverloadSignatureNode> & T)[][]
