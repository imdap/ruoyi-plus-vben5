import { computeGroupsNames } from './compute-groups-names.js'
function validateObjectsInsideGroups({ groups }) {
  let isPreviousElementNonGroupBased = false
  for (let group of groups) {
    let [groupName] = computeGroupsNames([group])
    if (groupName) {
      isPreviousElementNonGroupBased = false
      continue
    }
    if (isPreviousElementNonGroupBased) {
      throw new Error('Consecutive `newlinesBetween` objects are not allowed')
    }
    isPreviousElementNonGroupBased = true
  }
}
export { validateObjectsInsideGroups }
