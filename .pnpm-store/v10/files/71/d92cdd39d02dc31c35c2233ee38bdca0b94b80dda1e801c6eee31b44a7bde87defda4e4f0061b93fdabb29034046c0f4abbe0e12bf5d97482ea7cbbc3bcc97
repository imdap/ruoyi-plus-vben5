import { isGroupWithOverridesOption } from './is-group-with-overrides-option.js'
import { isNewlinesBetweenOption } from './is-newlines-between-option.js'
import { UnreachableCaseError } from './unreachable-case-error.js'
function computeGroupsNames(groups) {
  return groups.flatMap(group => computeGroupNames(group))
}
function computeGroupNames(group) {
  if (typeof group === 'string' || Array.isArray(group)) {
    return computeStringGroupNames(group)
  }
  if (isGroupWithOverridesOption(group)) {
    return computeStringGroupNames(group.group)
  }
  if (isNewlinesBetweenOption(group)) {
    return []
  }
  throw new UnreachableCaseError(group)
}
function computeStringGroupNames(group) {
  if (typeof group === 'string') {
    return [group]
  }
  return group
}
export { computeGroupsNames }
