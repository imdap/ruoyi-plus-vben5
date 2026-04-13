import { computeGroupsNames } from './compute-groups-names.js'
function validateNoDuplicatedGroups({ groups }) {
  let groupNames = computeGroupsNames(groups)
  let seenGroups = /* @__PURE__ */ new Set()
  let duplicatedGroups = /* @__PURE__ */ new Set()
  for (let groupName of groupNames) {
    if (seenGroups.has(groupName)) {
      duplicatedGroups.add(groupName)
    } else {
      seenGroups.add(groupName)
    }
  }
  if (duplicatedGroups.size > 0) {
    throw new Error(`Duplicated group(s): ${[...duplicatedGroups].join(', ')}`)
  }
}
export { validateNoDuplicatedGroups }
