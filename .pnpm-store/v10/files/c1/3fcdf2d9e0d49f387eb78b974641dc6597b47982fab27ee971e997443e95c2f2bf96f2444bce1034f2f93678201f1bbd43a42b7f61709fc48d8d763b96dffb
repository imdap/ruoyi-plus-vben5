import { isGroupWithOverridesOption } from './is-group-with-overrides-option.js'
import { isNewlinesBetweenOption } from './is-newlines-between-option.js'
import { computeGroupName } from './compute-group-name.js'
function getNewlinesBetweenOption({
  nextNodeGroupIndex,
  nodeGroupIndex,
  options,
}) {
  if (nodeGroupIndex === nextNodeGroupIndex) {
    return computeNewlinesInsideOption({
      groupIndex: nodeGroupIndex,
      options,
    })
  }
  if (nextNodeGroupIndex >= nodeGroupIndex + 2) {
    return computeNewlinesBetweenOptionForDifferentGroups({
      nextNodeGroupIndex,
      nodeGroupIndex,
      options,
    })
  }
  return options.newlinesBetween
}
function computeNewlinesBetweenOptionForDifferentGroups({
  nextNodeGroupIndex,
  nodeGroupIndex,
  options,
}) {
  if (nextNodeGroupIndex === nodeGroupIndex + 2) {
    let groupBetween = options.groups[nodeGroupIndex + 1]
    if (isNewlinesBetweenOption(groupBetween)) {
      return groupBetween.newlinesBetween
    }
    return options.newlinesBetween
  }
  let relevantGroups = options.groups.slice(
    nodeGroupIndex,
    nextNodeGroupIndex + 1,
  )
  let groupsWithAllNewlinesBetween = buildGroupsWithAllNewlinesBetween(
    relevantGroups,
    options.newlinesBetween,
  )
  let newlinesBetweenOptions = new Set(
    groupsWithAllNewlinesBetween
      .filter(isNewlinesBetweenOption)
      .map(group => group.newlinesBetween),
  )
  let numberNewlinesBetween = [...newlinesBetweenOptions].filter(
    option => typeof option === 'number',
  )
  let maxNewlinesBetween =
    numberNewlinesBetween.length > 0 ? Math.max(...numberNewlinesBetween) : null
  if (maxNewlinesBetween !== null && maxNewlinesBetween >= 1) {
    return maxNewlinesBetween
  }
  if (newlinesBetweenOptions.has('ignore')) {
    return 'ignore'
  }
  return 0
}
function computeNewlinesInsideOption({ groupIndex, options }) {
  let globalNewlinesInsideOption = computeGlobalNewlinesInsideOption()
  let group = options.groups[groupIndex]
  if (!group) {
    return globalNewlinesInsideOption
  }
  let groupName = computeGroupName(group)
  let nodeCustomGroup = options.customGroups.find(
    customGroup => customGroup.groupName === groupName,
  )
  let groupOverrideNewlinesInside =
    isGroupWithOverridesOption(group) ? group.newlinesInside : null
  return (
    nodeCustomGroup?.newlinesInside ??
    groupOverrideNewlinesInside ??
    globalNewlinesInsideOption
  )
  function computeGlobalNewlinesInsideOption() {
    switch (options.newlinesInside) {
      case 'newlinesBetween':
        return options.newlinesBetween === 'ignore' ? 'ignore' : 0
      case 'ignore':
        return 'ignore'
      default:
        return options.newlinesInside
    }
  }
}
function buildGroupsWithAllNewlinesBetween(
  groups,
  globalNewlinesBetweenOption,
) {
  let returnValue = []
  for (let i = 0; i < groups.length; i++) {
    let group = groups[i]
    if (!isNewlinesBetweenOption(group)) {
      let previousGroup = groups[i - 1]
      if (previousGroup && !isNewlinesBetweenOption(previousGroup)) {
        returnValue.push({
          newlinesBetween: globalNewlinesBetweenOption,
        })
      }
    }
    returnValue.push(group)
  }
  return returnValue
}
export { getNewlinesBetweenOption }
