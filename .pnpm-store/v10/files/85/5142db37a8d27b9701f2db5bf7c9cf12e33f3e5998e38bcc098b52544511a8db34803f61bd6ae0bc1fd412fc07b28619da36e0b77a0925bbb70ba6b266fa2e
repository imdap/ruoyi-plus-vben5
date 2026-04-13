import { isGroupWithOverridesOption } from './is-group-with-overrides-option.js'
import { isNewlinesBetweenOption } from './is-newlines-between-option.js'
import { UnreachableCaseError } from './unreachable-case-error.js'
function computeGroupName(group) {
  if (typeof group === 'string' || Array.isArray(group)) {
    return computeStringGroupName(group)
  }
  if (isGroupWithOverridesOption(group)) {
    return computeStringGroupName(group.group)
  }
  if (isNewlinesBetweenOption(group)) {
    return null
  }
  throw new UnreachableCaseError(group)
}
function computeStringGroupName(group) {
  if (typeof group === 'string') {
    return group
  }
  return null
}
export { computeGroupName }
