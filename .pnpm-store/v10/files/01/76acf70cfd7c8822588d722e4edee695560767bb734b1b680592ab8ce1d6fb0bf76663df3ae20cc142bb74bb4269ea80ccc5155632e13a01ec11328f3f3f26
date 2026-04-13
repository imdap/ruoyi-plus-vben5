import { isGroupWithOverridesOption } from './is-group-with-overrides-option.js'
import { isNewlinesBetweenOption } from './is-newlines-between-option.js'
import { UnreachableCaseError } from './unreachable-case-error.js'
function getGroupIndex(groups, node) {
  for (let max = groups.length, i = 0; i < max; i++) {
    let currentGroup = groups[i]
    if (doesGroupMatch(currentGroup, node.group)) {
      return i
    }
  }
  return groups.length
}
function doesGroupMatch(group, groupName) {
  if (typeof group === 'string' || Array.isArray(group)) {
    return doesStringGroupMatch(group, groupName)
  }
  if (isGroupWithOverridesOption(group)) {
    return doesStringGroupMatch(group.group, groupName)
  }
  if (isNewlinesBetweenOption(group)) {
    return false
  }
  throw new UnreachableCaseError(group)
}
function doesStringGroupMatch(group, groupName) {
  if (typeof group === 'string') {
    return group === groupName
  }
  return group.includes(groupName)
}
export { getGroupIndex }
