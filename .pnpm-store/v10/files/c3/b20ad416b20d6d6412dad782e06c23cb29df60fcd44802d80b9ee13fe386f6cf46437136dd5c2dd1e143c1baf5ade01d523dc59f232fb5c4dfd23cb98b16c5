import { isStringGroupSideEffectOnlyGroup } from './is-string-group-side-effect-only-group.js'
import { computeGroupsNames } from '../../utils/compute-groups-names.js'
function isSideEffectOnlyGroup(group) {
  if (!group) {
    return false
  }
  let groupNames = computeGroupsNames([group])
  if (groupNames.length === 0) {
    return false
  }
  return groupNames.every(isStringGroupSideEffectOnlyGroup)
}
export { isSideEffectOnlyGroup }
