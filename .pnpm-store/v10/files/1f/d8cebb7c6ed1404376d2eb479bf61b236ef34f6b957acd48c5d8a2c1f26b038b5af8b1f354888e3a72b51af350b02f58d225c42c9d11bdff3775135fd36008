import { computeGroupsNames } from './compute-groups-names.js'
function computeGroup({ customGroupMatcher, predefinedGroups, options }) {
  let groupsSet = new Set(computeGroupsNames(options.groups))
  return (
    computeFirstMatchingCustomGroupName(
      groupsSet,
      options.customGroups,
      customGroupMatcher,
    ) ??
    predefinedGroups.find(group => groupsSet.has(group)) ??
    'unknown'
  )
}
function computeFirstMatchingCustomGroupName(
  groupsSet,
  customGroups,
  customGroupMatcher,
) {
  for (let customGroup of customGroups) {
    if (
      customGroupMatcher(customGroup) &&
      groupsSet.has(customGroup.groupName)
    ) {
      return customGroup.groupName
    }
  }
  return null
}
export { computeGroup }
