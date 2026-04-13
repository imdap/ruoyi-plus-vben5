import { isGroupWithOverridesOption } from './is-group-with-overrides-option.js'
import { computeGroupName } from './compute-group-name.js'
function computeOverriddenOptionsByGroupIndex(options, groupIndex) {
  let { customGroups, groups } = options
  let matchingGroup = groups[groupIndex]
  let matchingGroupName = matchingGroup ? computeGroupName(matchingGroup) : null
  let customGroup = customGroups.find(
    currentGroup => matchingGroupName === currentGroup.groupName,
  )
  let returnValue = {
    ...options,
  }
  if (matchingGroup && isGroupWithOverridesOption(matchingGroup)) {
    let {
      newlinesInside,
      commentAbove,
      fallbackSort,
      group,
      ...relevantGroupFields
    } = matchingGroup
    returnValue = {
      ...returnValue,
      ...relevantGroupFields,
      fallbackSort: {
        ...returnValue.fallbackSort,
        ...fallbackSort,
      },
    }
  }
  if (customGroup) {
    let {
      elementNamePattern,
      newlinesInside,
      fallbackSort,
      groupName,
      ...relevantCustomGroupFields
    } = customGroup
    returnValue = {
      ...returnValue,
      ...relevantCustomGroupFields,
      fallbackSort: {
        ...returnValue.fallbackSort,
        ...fallbackSort,
      },
    }
  }
  return returnValue
}
export { computeOverriddenOptionsByGroupIndex }
