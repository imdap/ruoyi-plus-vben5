import { isGroupWithOverridesOption } from './is-group-with-overrides-option.js'
function validateCustomSortConfiguration(options) {
  if (!usesCustomSort(options)) {
    return
  }
  if (options.alphabet.length === 0) {
    throw new Error('`alphabet` option must not be empty')
  }
}
function usesCustomSortInGroups(groups) {
  if (!groups) {
    return false
  }
  return groups
    .filter(isGroupWithOverridesOption)
    .some(groupWithSettings => groupWithSettings.type === 'custom')
}
function usesCustomSort(options) {
  if (options.type === 'custom') {
    return true
  }
  return usesCustomSortInGroups(options.groups)
}
export { validateCustomSortConfiguration }
