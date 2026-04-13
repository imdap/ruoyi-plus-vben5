import { isStringGroupSideEffectOnlyGroup } from './is-string-group-side-effect-only-group.js'
import { computeGroupsNames } from '../../utils/compute-groups-names.js'
import { isSideEffectOnlyGroup } from './is-side-effect-only-group.js'
function validateSideEffectsConfiguration({ sortSideEffects, groups }) {
  if (sortSideEffects) {
    return
  }
  let hasInvalidGroup = groups
    .map(group => computeGroupsNames([group]))
    .some(
      nestedGroup =>
        hasSideEffectGroup(nestedGroup) && !isSideEffectOnlyGroup(nestedGroup),
    )
  if (hasInvalidGroup) {
    throw new Error(
      "Side effect groups cannot be nested with non side effect groups when 'sortSideEffects' is 'false'.",
    )
  }
}
function hasSideEffectGroup(stringGroups) {
  return stringGroups.some(isStringGroupSideEffectOnlyGroup)
}
export { validateSideEffectsConfiguration }
