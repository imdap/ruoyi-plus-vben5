import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { OverloadSignatureGroup } from '../../utils/overload-signature/overload-signature-group.js'
import { isSortable } from '../../utils/is-sortable.js'
function computeOverloadSignatureGroups(nodes) {
  let functionDetailsByName = /* @__PURE__ */ new Map()
  for (let node of nodes) {
    let functionDetails = computeNodeFunctionDetails(node)
    if (!functionDetails) {
      continue
    }
    let functionDetailsArray = functionDetailsByName.get(functionDetails.name)
    if (!functionDetailsArray) {
      functionDetailsArray = []
      functionDetailsByName.set(functionDetails.name, functionDetailsArray)
    }
    functionDetailsArray.push({
      ...functionDetails,
      node,
    })
  }
  return [...functionDetailsByName.values()]
    .filter(isSortable)
    .map(buildOverloadSignatureGroup)
}
function computeNodeFunctionDetails(node) {
  switch (node.type) {
    case AST_NODE_TYPES.ExportDefaultDeclaration:
      return computeNodeFunctionDetails(node.declaration)
    case AST_NODE_TYPES.ExportNamedDeclaration:
      if (!node.declaration) {
        return null
      }
      return computeNodeFunctionDetails(node.declaration)
    case AST_NODE_TYPES.FunctionDeclaration:
    case AST_NODE_TYPES.TSDeclareFunction:
      return computeFunctionDetails(node)
    default:
      return null
  }
  function computeFunctionDetails(functionNode) {
    if (!functionNode.id) {
      return null
    }
    return {
      isImplementation:
        functionNode.type === AST_NODE_TYPES.FunctionDeclaration,
      name: functionNode.id.name,
    }
  }
}
function buildOverloadSignatureGroup(functionDetailsArray) {
  let implementation = (
    functionDetailsArray.find(isFunctionImplementation) ??
    functionDetailsArray.at(-1)
  ).node
  let overloadSignatures = functionDetailsArray
    .filter(functionDetails => !isFunctionImplementation(functionDetails))
    .map(functionDetails => functionDetails.node)
  return new OverloadSignatureGroup({
    overloadSignatures,
    implementation,
  })
  function isFunctionImplementation(functionDetails) {
    return functionDetails.isImplementation
  }
}
export { computeOverloadSignatureGroups }
