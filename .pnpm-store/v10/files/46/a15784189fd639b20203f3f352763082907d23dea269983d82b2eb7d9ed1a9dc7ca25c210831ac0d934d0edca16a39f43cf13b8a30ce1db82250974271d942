import { isGroupWithOverridesOption } from './is-group-with-overrides-option.js'
import { isNewlinesBetweenOption } from './is-newlines-between-option.js'
const NEWLINES_INSIDE_ERROR_MESSAGE =
  "The 'partitionByNewLine' and 'newlinesInside' options cannot be used together"
const NEWLINES_BETWEEN_ERROR_MESSAGE =
  "The 'partitionByNewLine' and 'newlinesBetween' options cannot be used together"
function validateNewlinesAndPartitionConfiguration({
  partitionByNewLine,
  newlinesBetween,
  newlinesInside,
  customGroups,
  groups,
}) {
  if (!partitionByNewLine) {
    return
  }
  validateNewlinesBetweenConfiguration({
    newlinesBetween,
    groups,
  })
  validateNewlinesInsideConfiguration({
    newlinesInside,
    customGroups,
    groups,
  })
}
function validateNewlinesInsideConfiguration({
  newlinesInside,
  customGroups,
  groups,
}) {
  switch (newlinesInside) {
    case 'newlinesBetween':
    case 'ignore':
      break
    default:
      throw new Error(NEWLINES_INSIDE_ERROR_MESSAGE)
  }
  validateGroups()
  validateCustomGroups()
  function validateCustomGroups() {
    for (let customGroup of customGroups) {
      throwErrorIfNeeded(customGroup.newlinesInside)
    }
  }
  function validateGroups() {
    for (let group of groups) {
      if (!isGroupWithOverridesOption(group)) {
        continue
      }
      throwErrorIfNeeded(group.newlinesInside)
    }
  }
  function throwErrorIfNeeded(newlinesInsideOptions) {
    switch (newlinesInsideOptions) {
      case void 0:
      case 'ignore':
        return
      default:
        throw new Error(NEWLINES_INSIDE_ERROR_MESSAGE)
    }
  }
}
function validateNewlinesBetweenConfiguration({ newlinesBetween, groups }) {
  if (newlinesBetween !== 'ignore') {
    throw new Error(NEWLINES_BETWEEN_ERROR_MESSAGE)
  }
  let hasInvalidNewlinesBetweenGroup = groups.some(
    group =>
      isNewlinesBetweenOption(group) && group.newlinesBetween !== 'ignore',
  )
  if (hasInvalidNewlinesBetweenGroup) {
    throw new Error(NEWLINES_BETWEEN_ERROR_MESSAGE)
  }
}
export { validateNewlinesAndPartitionConfiguration }
