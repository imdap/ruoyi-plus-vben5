import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { allSelectors, allModifiers } from './types.js'
import { validateNewlinesAndPartitionConfiguration } from '../../utils/validate-newlines-and-partition-configuration.js'
import { buildOptionsByGroupIndexComputer } from '../../utils/build-options-by-group-index-computer.js'
import { validateCustomSortConfiguration } from '../../utils/validate-custom-sort-configuration.js'
import { validateGroupsConfiguration } from '../../utils/validate-groups-configuration.js'
import { generatePredefinedGroups } from '../../utils/generate-predefined-groups.js'
import { computeMatchedContextOptions } from './compute-matched-context-options.js'
import { getEslintDisabledLines } from '../../utils/get-eslint-disabled-lines.js'
import { comparatorByOptionsComputer } from './comparator-by-options-computer.js'
import { doesCustomGroupMatch } from '../../utils/does-custom-group-match.js'
import { isNodeEslintDisabled } from '../../utils/is-node-eslint-disabled.js'
import { UnreachableCaseError } from '../../utils/unreachable-case-error.js'
import { isNodeOnSingleLine } from '../../utils/is-node-on-single-line.js'
import { sortNodesByGroups } from '../../utils/sort-nodes-by-groups.js'
import { reportAllErrors } from '../../utils/report-all-errors.js'
import { shouldPartition } from '../../utils/should-partition.js'
import { isNodeFunctionType } from './is-node-function-type.js'
import { computeGroup } from '../../utils/compute-group.js'
import { isMemberOptional } from './is-member-optional.js'
import { rangeToDiff } from '../../utils/range-to-diff.js'
import { getSettings } from '../../utils/get-settings.js'
import { computeNodeName } from './compute-node-name.js'
import { defaultOptions } from '../sort-object-types.js'
import { isSortable } from '../../utils/is-sortable.js'
import { complete } from '../../utils/complete.js'
let cachedGroupsByModifiersAndSelectors = /* @__PURE__ */ new Map()
function sortObjectTypeElements({
  availableMessageIds,
  matchedAstSelectors,
  parentNodes,
  elements,
  context,
}) {
  if (!isSortable(elements)) {
    return
  }
  let settings = getSettings(context.settings)
  let { sourceCode, id } = context
  let matchedContextOptions = computeMatchedContextOptions({
    matchedAstSelectors,
    parentNodes,
    sourceCode,
    elements,
    context,
  })
  let options = complete(matchedContextOptions, settings, defaultOptions)
  validateCustomSortConfiguration(options)
  validateGroupsConfiguration({
    selectors: allSelectors,
    modifiers: allModifiers,
    options,
  })
  validateNewlinesAndPartitionConfiguration(options)
  let eslintDisabledLines = getEslintDisabledLines({
    ruleName: id,
    sourceCode,
  })
  let optionsByGroupIndexComputer = buildOptionsByGroupIndexComputer(options)
  let formattedMembers = [[]]
  for (let typeElement of elements) {
    if (
      typeElement.type === AST_NODE_TYPES.TSCallSignatureDeclaration ||
      typeElement.type === AST_NODE_TYPES.TSConstructSignatureDeclaration
    ) {
      formattedMembers.push([])
      continue
    }
    let lastGroup = formattedMembers.at(-1)
    let lastSortingNode = lastGroup?.at(-1)
    let selectors = []
    let modifiers = []
    if (typeElement.type === AST_NODE_TYPES.TSIndexSignature) {
      selectors.push('index-signature')
    }
    if (isNodeFunctionType(typeElement)) {
      selectors.push('method')
    }
    if (!isNodeOnSingleLine(typeElement)) {
      modifiers.push('multiline')
    }
    if (
      !['index-signature', 'method'].some(selector =>
        selectors.includes(selector),
      )
    ) {
      selectors.push('property')
    }
    selectors.push('member')
    if (isMemberOptional(typeElement)) {
      modifiers.push('optional')
    } else {
      modifiers.push('required')
    }
    let name = computeNodeName({ node: typeElement, sourceCode })
    let value = null
    if (
      typeElement.type === AST_NODE_TYPES.TSPropertySignature &&
      typeElement.typeAnnotation
    ) {
      value = sourceCode.getText(typeElement.typeAnnotation.typeAnnotation)
    }
    let predefinedGroups = generatePredefinedGroups({
      cache: cachedGroupsByModifiersAndSelectors,
      selectors,
      modifiers,
    })
    let group = computeGroup({
      customGroupMatcher: customGroup =>
        doesCustomGroupMatch({
          elementValue: value,
          elementName: name,
          customGroup,
          selectors,
          modifiers,
        }),
      predefinedGroups,
      options,
    })
    let sortingNode = {
      isEslintDisabled: isNodeEslintDisabled(typeElement, eslintDisabledLines),
      size: rangeToDiff(typeElement, sourceCode),
      addSafetySemicolonWhenInline: true,
      value: value ?? '',
      node: typeElement,
      group,
      name,
    }
    if (
      shouldPartition({
        lastSortingNode,
        sortingNode,
        sourceCode,
        options,
      })
    ) {
      lastGroup = []
      formattedMembers.push(lastGroup)
    }
    lastGroup?.push({
      ...sortingNode,
      partitionId: formattedMembers.length,
    })
  }
  let nodes = formattedMembers.flat()
  reportAllErrors({
    sortNodesExcludingEslintDisabled,
    availableMessageIds,
    options,
    context,
    nodes,
  })
  function sortNodesExcludingEslintDisabled(ignoreEslintDisabledNodes) {
    return formattedMembers.flatMap(groupedNodes =>
      sortNodesByGroups({
        isNodeIgnoredForGroup: ({ groupOptions, node }) => {
          switch (groupOptions.sortBy) {
            case 'value':
              return !node.value
            case 'name':
              return false
            /* v8 ignore next 2 -- @preserve Exhaustive guard. */
            default:
              throw new UnreachableCaseError(groupOptions.sortBy)
          }
        },
        optionsByGroupIndexComputer,
        comparatorByOptionsComputer,
        ignoreEslintDisabledNodes,
        groups: options.groups,
        nodes: groupedNodes,
      }),
    )
  }
}
export { sortObjectTypeElements }
