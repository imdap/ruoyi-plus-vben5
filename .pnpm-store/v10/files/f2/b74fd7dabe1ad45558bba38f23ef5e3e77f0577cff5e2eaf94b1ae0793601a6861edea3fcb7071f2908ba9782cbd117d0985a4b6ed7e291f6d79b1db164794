import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import {
  allSelectors,
  allModifiers,
  DEPENDENCY_ORDER_ERROR_ID,
  ORDER_ERROR_ID,
  GROUP_ORDER_ERROR_ID,
  MISSED_SPACING_ERROR_ID,
  EXTRA_SPACING_ERROR_ID,
} from './types.js'
import { computeDependenciesOutsideFunctionsBySortingNode } from '../../utils/compute-dependencies-outside-functions-by-sorting-node.js'
import { populateSortingNodeGroupsWithDependencies } from '../../utils/populate-sorting-node-groups-with-dependencies.js'
import { validateNewlinesAndPartitionConfiguration } from '../../utils/validate-newlines-and-partition-configuration.js'
import { computePropertyOrVariableDeclaratorName } from './compute-property-or-variable-declarator-name.js'
import { buildOptionsByGroupIndexComputer } from '../../utils/build-options-by-group-index-computer.js'
import { validateCustomSortConfiguration } from '../../utils/validate-custom-sort-configuration.js'
import { validateGroupsConfiguration } from '../../utils/validate-groups-configuration.js'
import { generatePredefinedGroups } from '../../utils/generate-predefined-groups.js'
import { computeMatchedContextOptions } from './compute-matched-context-options.js'
import { sortNodesByDependencies } from '../../utils/sort-nodes-by-dependencies.js'
import { getEslintDisabledLines } from '../../utils/get-eslint-disabled-lines.js'
import { comparatorByOptionsComputer } from './comparator-by-options-computer.js'
import { doesCustomGroupMatch } from '../../utils/does-custom-group-match.js'
import { isNodeEslintDisabled } from '../../utils/is-node-eslint-disabled.js'
import { isNodeOnSingleLine } from '../../utils/is-node-on-single-line.js'
import { sortNodesByGroups } from '../../utils/sort-nodes-by-groups.js'
import { computeDependencyNames } from './compute-dependency-names.js'
import { reportAllErrors } from '../../utils/report-all-errors.js'
import { shouldPartition } from '../../utils/should-partition.js'
import { computeDependencies } from './compute-dependencies.js'
import { computeGroup } from '../../utils/compute-group.js'
import { isStyleComponent } from './is-style-component.js'
import { rangeToDiff } from '../../utils/range-to-diff.js'
import { computeNodeValue } from './compute-node-value.js'
import { getSettings } from '../../utils/get-settings.js'
import { isSortable } from '../../utils/is-sortable.js'
import { complete } from '../../utils/complete.js'
let cachedGroupsByModifiersAndSelectors = /* @__PURE__ */ new Map()
let defaultOptions = {
  useExperimentalDependencyDetection: true,
  fallbackSort: { type: 'unsorted' },
  newlinesInside: 'newlinesBetween',
  partitionByComputedKey: false,
  partitionByNewLine: false,
  partitionByComment: false,
  newlinesBetween: 'ignore',
  specialCharacters: 'keep',
  styledComponents: true,
  useConfigurationIf: {},
  type: 'alphabetical',
  ignoreCase: true,
  customGroups: [],
  locales: 'en-US',
  sortBy: 'name',
  alphabet: '',
  order: 'asc',
  groups: [],
}
function sortObject({ matchedAstSelectors, context, node }) {
  if (!isSortable(node.properties)) {
    return
  }
  let { sourceCode, id } = context
  let settings = getSettings(context.settings)
  let isDestructuredObject = node.type === AST_NODE_TYPES.ObjectPattern
  let matchedContextOptions = computeMatchedContextOptions({
    isDestructuredObject,
    matchedAstSelectors,
    nodeObject: node,
    sourceCode,
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
  if (!options.styledComponents && isStyleComponent(node)) {
    return
  }
  let eslintDisabledLines = getEslintDisabledLines({
    ruleName: id,
    sourceCode,
  })
  let optionsByGroupIndexComputer = buildOptionsByGroupIndexComputer(options)
  let sortingNodeGroups = [[]]
  for (let property of node.properties) {
    if (
      property.type === AST_NODE_TYPES.SpreadElement ||
      property.type === AST_NODE_TYPES.RestElement
    ) {
      sortingNodeGroups.push([])
      continue
    }
    if (
      options.partitionByComputedKey &&
      !isDestructuredObject &&
      property.computed
    ) {
      sortingNodeGroups.push([])
      continue
    }
    let lastSortingNode = sortingNodeGroups.at(-1)?.at(-1)
    let selectors = []
    let modifiers = []
    if (
      property.value.type === AST_NODE_TYPES.ArrowFunctionExpression ||
      property.value.type === AST_NODE_TYPES.FunctionExpression
    ) {
      selectors.push('method')
    } else {
      selectors.push('property')
    }
    selectors.push('member')
    if (!isNodeOnSingleLine(property)) {
      modifiers.push('multiline')
    }
    let name = computePropertyOrVariableDeclaratorName({
      node: property,
      sourceCode,
    })
    let dependencyNames = [name]
    if (isDestructuredObject) {
      dependencyNames = [...new Set(computeDependencyNames(property.value))]
    }
    let value = computeNodeValue({
      isDestructuredObject,
      sourceCode,
      property,
    })
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
      dependencies:
        options.useExperimentalDependencyDetection ?
          []
        : computeDependencies(property),
      isEslintDisabled: isNodeEslintDisabled(property, eslintDisabledLines),
      size: rangeToDiff(property, sourceCode),
      value: value ?? '',
      dependencyNames,
      node: property,
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
      sortingNodeGroups.push([])
    }
    sortingNodeGroups.at(-1).push({
      ...sortingNode,
      partitionId: sortingNodeGroups.length,
    })
  }
  if (options.useExperimentalDependencyDetection) {
    let dependenciesBySortingNode =
      computeDependenciesOutsideFunctionsBySortingNode({
        sortingNodes: sortingNodeGroups.flat(),
        sourceCode,
      })
    sortingNodeGroups = populateSortingNodeGroupsWithDependencies({
      dependenciesBySortingNode,
      sortingNodeGroups,
    })
  }
  let sortingNodes = sortingNodeGroups.flat()
  reportAllErrors({
    availableMessageIds: {
      missedSpacingBetweenMembers: MISSED_SPACING_ERROR_ID,
      unexpectedDependencyOrder: DEPENDENCY_ORDER_ERROR_ID,
      extraSpacingBetweenMembers: EXTRA_SPACING_ERROR_ID,
      unexpectedGroupOrder: GROUP_ORDER_ERROR_ID,
      unexpectedOrder: ORDER_ERROR_ID,
    },
    sortNodesExcludingEslintDisabled,
    nodes: sortingNodes,
    options,
    context,
  })
  function sortNodesExcludingEslintDisabled(ignoreEslintDisabledNodes) {
    let nodesSortedByGroups = sortingNodeGroups.flatMap(nodes =>
      sortNodesByGroups({
        comparatorByOptionsComputer,
        optionsByGroupIndexComputer,
        ignoreEslintDisabledNodes,
        groups: options.groups,
        nodes,
      }),
    )
    return sortNodesByDependencies(nodesSortedByGroups, {
      ignoreEslintDisabledNodes,
    })
  }
}
export { defaultOptions, sortObject }
