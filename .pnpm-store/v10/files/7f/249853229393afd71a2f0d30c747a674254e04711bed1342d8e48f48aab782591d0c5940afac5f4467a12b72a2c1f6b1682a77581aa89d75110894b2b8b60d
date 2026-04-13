import { TSESTree } from '@typescript-eslint/types'
import { Modifier } from '../types.js'
type Property =
  | TSESTree.TSAbstractPropertyDefinition
  | TSESTree.PropertyDefinition
type Accessor = TSESTree.TSAbstractAccessorProperty | TSESTree.AccessorProperty
type Method = TSESTree.TSAbstractMethodDefinition | TSESTree.MethodDefinition
export declare function computeAccessibilityModifier({
  hasPrivateHash,
  node,
}: {
  node: Accessor | Property | Method
  hasPrivateHash: boolean
}): Modifier[]
export declare function computeAbstractModifier(
  node: Accessor | Property | Method,
): Modifier[]
export declare function computeAsyncModifier(
  node:
    | TSESTree.TSEmptyBodyFunctionExpression
    | TSESTree.ArrowFunctionExpression
    | TSESTree.FunctionExpression,
): Modifier[]
export declare function computeStaticModifier(
  node: TSESTree.TSIndexSignature | Accessor | Property | Method,
): Modifier[]
export declare function computeReadonlyModifier(
  node: TSESTree.TSIndexSignature | Property,
): Modifier[]
export declare function computeOverrideModifier(
  node: Accessor | Property | Method,
): Modifier[]
export declare function computeOptionalModifier(
  node: Property | Method,
): Modifier[]
export declare function computeDecoratedModifier(
  isDecorated: boolean,
): Modifier[]
export {}
