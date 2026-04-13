import { isGroupWithOverridesOption } from '../is-group-with-overrides-option.js'
import { isNewlinesBetweenOption } from '../is-newlines-between-option.js'
import { UnreachableCaseError } from '../unreachable-case-error.js'
import { computeOrderedValue } from './compute-ordered-value.js'
function buildSubgroupOrderComparator({ groups, order }) {
  return (a, b) => {
    let subgroupContainingA = computeSubgroupContainingNode(a, groups)
    let subgroupContainingB = computeSubgroupContainingNode(b, groups)
    if (
      !subgroupContainingA ||
      !subgroupContainingB ||
      subgroupContainingA !== subgroupContainingB
    ) {
      return 0
    }
    let indexOfAInSubgroup = subgroupContainingA.indexOf(a.group)
    let indexOfBInSubgroup = subgroupContainingB.indexOf(b.group)
    let result = indexOfAInSubgroup - indexOfBInSubgroup
    return computeOrderedValue(result, order)
  }
}
function computeSubgroupContainingNode(sortingNode, groups) {
  for (let group of groups) {
    if (isNewlinesBetweenOption(group)) {
      continue
    }
    if (typeof group === 'string' || Array.isArray(group)) {
      if (doesStringSubgroupContainsNode(sortingNode, group)) {
        return group
      }
      continue
    }
    if (isGroupWithOverridesOption(group)) {
      if (doesStringSubgroupContainsNode(sortingNode, group.group)) {
        return group.group
      }
      continue
    }
    throw new UnreachableCaseError(group)
  }
  return null
}
function doesStringSubgroupContainsNode(sortingNode, subgroup) {
  if (typeof subgroup === 'string') {
    return false
  }
  return subgroup.includes(sortingNode.group)
}
export { buildSubgroupOrderComparator }
