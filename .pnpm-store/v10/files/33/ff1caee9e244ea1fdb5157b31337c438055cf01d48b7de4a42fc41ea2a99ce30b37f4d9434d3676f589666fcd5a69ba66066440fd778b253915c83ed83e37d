import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import {
  computeStaticModifier,
  computeAbstractModifier,
  computeDecoratedModifier,
  computeOverrideModifier,
  computeReadonlyModifier,
  computeAccessibilityModifier,
  computeOptionalModifier,
  computeAsyncModifier,
} from './common-modifiers.js'
import { computeMethodOrPropertyNameDetails } from './compute-method-or-property-name-details.js'
import { computeDependencyName } from '../compute-dependency-name.js'
import { computeDependencies } from '../compute-dependencies.js'
function computePropertyDetails({
  ignoreCallbackDependenciesPatterns,
  useExperimentalDependencyDetection,
  isDecorated,
  sourceCode,
  className,
  property,
}) {
  let nameDetails = computeMethodOrPropertyNameDetails(property, sourceCode)
  let modifiers = computeModifiers({
    hasPrivateHash: nameDetails.hasPrivateHash,
    isDecorated,
    property,
  })
  return {
    dependencyNames: [
      computeDependencyName({
        nodeNameWithoutStartingHash: nameDetails.nameWithoutStartingHash,
        hasPrivateHash: nameDetails.hasPrivateHash,
        isStatic: modifiers.includes('static'),
      }),
    ],
    dependencies: computePropertyDependencies({
      ignoreCallbackDependenciesPatterns,
      useExperimentalDependencyDetection,
      className,
      property,
    }),
    memberValue:
      !isFunctionExpression(property.value) && property.value ?
        sourceCode.getText(property.value)
      : void 0,
    selectors: computeSelectors(property),
    isStatic: property.static,
    nameDetails,
    modifiers,
  }
}
function computeModifiers({ hasPrivateHash, isDecorated, property }) {
  return [
    ...computeStaticModifier(property),
    ...computeDeclareModifier(),
    ...computeAbstractModifier(property),
    ...computeDecoratedModifier(isDecorated),
    ...computeOverrideModifier(property),
    ...computeReadonlyModifier(property),
    ...computeAccessibilityModifier({
      hasPrivateHash,
      node: property,
    }),
    ...computeOptionalModifier(property),
    ...computeAsyncModifierIfFunctionProperty(),
  ]
  function computeDeclareModifier() {
    return property.declare ? ['declare'] : []
  }
  function computeAsyncModifierIfFunctionProperty() {
    if (!isFunctionExpression(property.value)) {
      return []
    }
    return computeAsyncModifier(property.value)
  }
}
function computePropertyDependencies({
  ignoreCallbackDependenciesPatterns,
  useExperimentalDependencyDetection,
  className,
  property,
}) {
  if (isFunctionExpression(property.value)) {
    return []
  }
  if (!property.value) {
    return []
  }
  return computeDependencies({
    ignoreCallbackDependenciesPatterns,
    useExperimentalDependencyDetection,
    isMemberStatic: property.static,
    expression: property.value,
    className,
  })
}
function computeSelectors(property) {
  return [...computeFunctionPropertySelector(), 'property']
  function computeFunctionPropertySelector() {
    return isFunctionExpression(property.value) ? ['function-property'] : []
  }
}
function isFunctionExpression(node) {
  if (!node) {
    return false
  }
  return (
    node.type === AST_NODE_TYPES.ArrowFunctionExpression ||
    node.type === AST_NODE_TYPES.FunctionExpression
  )
}
export { computePropertyDetails }
