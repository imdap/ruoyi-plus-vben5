import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import {
  computeStaticModifier,
  computeAbstractModifier,
  computeDecoratedModifier,
  computeOverrideModifier,
  computeAccessibilityModifier,
  computeOptionalModifier,
  computeAsyncModifier,
} from './common-modifiers.js'
import { computeMethodOrPropertyNameDetails } from './compute-method-or-property-name-details.js'
import { UnreachableCaseError } from '../../../utils/unreachable-case-error.js'
function computeMethodDetails({
  hasParentDeclare,
  isDecorated,
  sourceCode,
  method,
}) {
  let nameDetails = computeMethodOrPropertyNameDetails(method, sourceCode)
  return {
    modifiers: computeModifiers({
      hasPrivateHash: nameDetails.hasPrivateHash,
      isDecorated,
      method,
    }),
    addSafetySemicolonWhenInline: shouldAddSafetySemicolonWhenInline({
      hasParentDeclare,
      method,
    }),
    selectors: computeSelectors(method),
    isStatic: method.static,
    nameDetails,
  }
}
function computeSelectors(method) {
  return [...computeSetterOrConstructorSelector(), 'method']
  function computeSetterOrConstructorSelector() {
    switch (method.kind) {
      case 'constructor':
        return ['constructor']
      case 'method':
        return []
      case 'set':
        return ['set-method']
      case 'get':
        return ['get-method']
      /* v8 ignore next 2 -- @preserve Exhaustive guard. */
      default:
        throw new UnreachableCaseError(method.kind)
    }
  }
}
function computeModifiers({ hasPrivateHash, isDecorated, method }) {
  return [
    ...computeStaticModifier(method),
    ...computeAbstractModifier(method),
    ...computeDecoratedModifier(isDecorated),
    ...computeOverrideModifier(method),
    ...computeAccessibilityModifier({
      hasPrivateHash,
      node: method,
    }),
    ...computeOptionalModifier(method),
    ...computeAsyncModifier(method.value),
  ]
}
function shouldAddSafetySemicolonWhenInline({ hasParentDeclare, method }) {
  switch (method.type) {
    case AST_NODE_TYPES.TSAbstractMethodDefinition:
      return true
    case AST_NODE_TYPES.MethodDefinition:
      return hasParentDeclare
    /* v8 ignore next 2 -- @preserve Exhaustive guard. */
    default:
      throw new UnreachableCaseError(method)
  }
}
export { computeMethodDetails }
