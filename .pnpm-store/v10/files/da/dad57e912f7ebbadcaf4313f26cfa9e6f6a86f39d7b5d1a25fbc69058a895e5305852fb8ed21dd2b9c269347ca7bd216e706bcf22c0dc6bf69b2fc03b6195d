import { TSESTree } from '@typescript-eslint/utils'
import { SortingNode } from '../../types/sorting-node.js'
export type SortingNodeWithOverloadSignatureImplementation<
  T extends TSESTree.Node,
> = OverloadSignatureImplementation<T> & SortingNode
export interface OverloadSignatureImplementation<T extends TSESTree.Node> {
  overloadSignatureImplementation: null | T
}
/**
 * Represents a group of overload signatures along with their implementation.
 */
export declare class OverloadSignatureGroup<T extends TSESTree.Node> {
  readonly implementation: T
  private readonly _overloadSignatures
  constructor({
    overloadSignatures,
    implementation,
  }: {
    overloadSignatures: T[]
    implementation: T
  })
  doesNodeBelongToGroup(node: TSESTree.Node): boolean
}
