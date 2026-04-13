import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { OverloadSignatureGroup } from '../../utils/overload-signature/overload-signature-group.js'
import { UnreachableCaseError } from '../../utils/unreachable-case-error.js'
import { isSortable } from '../../utils/is-sortable.js'
function computeOverloadSignatureGroups(classElements) {
  let methods = classElements
    .filter(
      classElement =>
        classElement.type === AST_NODE_TYPES.MethodDefinition ||
        classElement.type === AST_NODE_TYPES.TSAbstractMethodDefinition,
    )
    .filter(classElement => classElement.kind === 'method')
  let staticOverloadSignaturesByName = /* @__PURE__ */ new Map()
  let overloadSignaturesByName = /* @__PURE__ */ new Map()
  for (let method of methods) {
    if (method.key.type !== AST_NODE_TYPES.Identifier) {
      continue
    }
    let { name } = method.key
    let mapToUse =
      method.static ? staticOverloadSignaturesByName : overloadSignaturesByName
    let overloadSignaturesArray = mapToUse.get(name)
    if (!overloadSignaturesArray) {
      overloadSignaturesArray = []
      mapToUse.set(name, overloadSignaturesArray)
    }
    overloadSignaturesArray.push(method)
  }
  return [
    ...overloadSignaturesByName.values(),
    ...staticOverloadSignaturesByName.values(),
  ]
    .filter(isSortable)
    .map(buildOverloadSignatureGroup)
}
function buildOverloadSignatureGroup(methods) {
  let implementation = methods.find(isMethodImplementation) ?? methods.at(-1)
  let overloadSignatures = methods.filter(
    method => !isMethodImplementation(method),
  )
  return new OverloadSignatureGroup({
    overloadSignatures,
    implementation,
  })
  function isMethodImplementation(method) {
    switch (method.value.type) {
      case AST_NODE_TYPES.TSEmptyBodyFunctionExpression:
        return false
      case AST_NODE_TYPES.FunctionExpression:
        return true
      /* v8 ignore next 2 -- @preserve Exhaustive guard. */
      default:
        throw new UnreachableCaseError(method.value)
    }
  }
}
export { computeOverloadSignatureGroups }
