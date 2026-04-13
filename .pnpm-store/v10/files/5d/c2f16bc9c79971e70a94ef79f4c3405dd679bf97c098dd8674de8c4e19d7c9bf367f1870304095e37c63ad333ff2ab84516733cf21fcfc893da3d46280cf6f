import { matches } from '../matches.js'
function passesAllNamesMatchPatternFilter({ allNamesMatchPattern, nodeNames }) {
  if (!allNamesMatchPattern) {
    return true
  }
  return nodeNames.every(nodeName => matches(nodeName, allNamesMatchPattern))
}
export { passesAllNamesMatchPatternFilter }
