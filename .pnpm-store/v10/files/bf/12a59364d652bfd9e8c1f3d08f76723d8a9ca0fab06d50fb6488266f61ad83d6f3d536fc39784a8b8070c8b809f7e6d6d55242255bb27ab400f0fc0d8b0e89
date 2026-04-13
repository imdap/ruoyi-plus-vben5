function computeParentNodesWithTypes({
  consecutiveOnly,
  allowedTypes,
  maxParent,
  node,
}) {
  let allowedTypesSet = new Set(allowedTypes)
  let returnValue = []
  let { parent } = node
  while (parent) {
    if (parent === maxParent) {
      break
    }
    if (allowedTypesSet.has(parent.type)) {
      returnValue.push(parent)
    } else if (consecutiveOnly) {
      break
    }
    ;({ parent } = parent)
  }
  return returnValue
}
export { computeParentNodesWithTypes }
