import { getNewlinesBetweenOption } from './get-newlines-between-option.js'
import { getLinesBetween } from './get-lines-between.js'
function getNewlinesBetweenErrors({
  newlinesBetweenValueGetter,
  missedSpacingError,
  extraSpacingError,
  rightGroupIndex,
  leftGroupIndex,
  sourceCode,
  options,
  right,
  left,
}) {
  if (
    leftGroupIndex > rightGroupIndex ||
    left.partitionId !== right.partitionId
  ) {
    return []
  }
  let newlinesBetween = getNewlinesBetweenOption({
    nextNodeGroupIndex: rightGroupIndex,
    nodeGroupIndex: leftGroupIndex,
    options,
  })
  newlinesBetween =
    newlinesBetweenValueGetter?.({
      computedNewlinesBetween: newlinesBetween,
      right,
      left,
    }) ?? newlinesBetween
  if (newlinesBetween === 'ignore') {
    return []
  }
  let numberOfEmptyLinesBetween = getLinesBetween(sourceCode, left, right)
  if (numberOfEmptyLinesBetween < newlinesBetween) {
    return [missedSpacingError]
  }
  if (numberOfEmptyLinesBetween > newlinesBetween) {
    return [extraSpacingError]
  }
  return []
}
export { getNewlinesBetweenErrors }
