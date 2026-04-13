import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import {
  DEPENDENCY_ORDER_ERROR_ID,
  ORDER_ERROR_ID,
  GROUP_ORDER_ERROR_ID,
  MISSED_SPACING_ERROR_ID,
  EXTRA_SPACING_ERROR_ID,
} from './types.js'
import { populateSortingNodeGroupsWithDependencies } from '../../utils/populate-sorting-node-groups-with-dependencies.js'
import { validateNewlinesAndPartitionConfiguration } from '../../utils/validate-newlines-and-partition-configuration.js'
import { buildOptionsByGroupIndexComputer } from '../../utils/build-options-by-group-index-computer.js'
import { validateCustomSortConfiguration } from '../../utils/validate-custom-sort-configuration.js'
import { computeDependenciesBySortingNode } from './compute-dependencies-by-sorting-node.js'
import { buildComparatorByOptionsComputer } from './build-comparator-by-options-computer.js'
import { validateGroupsConfiguration } from '../../utils/validate-groups-configuration.js'
import { computeExpressionNumberValue } from './compute-expression-number-value.js'
import { sortNodesByDependencies } from '../../utils/sort-nodes-by-dependencies.js'
import { computeMatchedContextOptions } from './compute-matched-context-options.js'
import { getEslintDisabledLines } from '../../utils/get-eslint-disabled-lines.js'
import { doesCustomGroupMatch } from '../../utils/does-custom-group-match.js'
import { isNodeEslintDisabled } from '../../utils/is-node-eslint-disabled.js'
import { sortNodesByGroups } from '../../utils/sort-nodes-by-groups.js'
import { reportAllErrors } from '../../utils/report-all-errors.js'
import { shouldPartition } from '../../utils/should-partition.js'
import { getEnumMembers } from '../../utils/get-enum-members.js'
import { computeDependencies } from './compute-dependencies.js'
import { computeGroup } from '../../utils/compute-group.js'
import { rangeToDiff } from '../../utils/range-to-diff.js'
import { getSettings } from '../../utils/get-settings.js'
import { computeNodeName } from './compute-node-name.js'
import { isSortable } from '../../utils/is-sortable.js'
import { complete } from '../../utils/complete.js'
let defaultOptions = {
  useExperimentalDependencyDetection: true,
  fallbackSort: { type: 'unsorted' },
  newlinesInside: 'newlinesBetween',
  sortByValue: 'ifNumericEnum',
  partitionByComment: false,
  partitionByNewLine: false,
  specialCharacters: 'keep',
  newlinesBetween: 'ignore',
  useConfigurationIf: {},
  type: 'alphabetical',
  ignoreCase: true,
  locales: 'en-US',
  customGroups: [],
  alphabet: '',
  order: 'asc',
  groups: [],
}
function sortEnum({ matchedAstSelectors, context, node }) {
  let members = getEnumMembers(node)
  if (
    !isSortable(members) ||
    !members.every(({ initializer }) => initializer)
  ) {
    return
  }
  let settings = getSettings(context.settings)
  let matchedContextOptions = computeMatchedContextOptions({
    enumMembers: members,
    matchedAstSelectors,
    context,
  })
  let options = complete(matchedContextOptions, settings, defaultOptions)
  validateCustomSortConfiguration(options)
  validateGroupsConfiguration({
    selectors: [],
    modifiers: [],
    options,
  })
  validateNewlinesAndPartitionConfiguration(options)
  let { sourceCode, id } = context
  let eslintDisabledLines = getEslintDisabledLines({
    ruleName: id,
    sourceCode,
  })
  let optionsByGroupIndexComputer = buildOptionsByGroupIndexComputer(options)
  let sortingNodeGroups = members.reduce(
    (accumulator, member) => {
      let name = computeNodeName({ node: member, sourceCode })
      let group = computeGroup({
        customGroupMatcher: customGroup =>
          doesCustomGroupMatch({
            elementValue: sourceCode.getText(member.initializer),
            elementName: name,
            selectors: [],
            modifiers: [],
            customGroup,
          }),
        predefinedGroups: [],
        options,
      })
      let lastSortingNode = accumulator.at(-1)?.at(-1)
      let sortingNode = {
        dependencies:
          options.useExperimentalDependencyDetection ?
            []
          : computeDependencies(member.initializer, node.id.name),
        value:
          member.initializer?.type === AST_NODE_TYPES.Literal ?
            (member.initializer.value?.toString() ?? null)
          : null,
        isEslintDisabled: isNodeEslintDisabled(member, eslintDisabledLines),
        numericValue: computeExpressionNumberValue(member.initializer),
        size: rangeToDiff(member, sourceCode),
        dependencyNames: [name],
        node: member,
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
        accumulator.push([])
      }
      accumulator.at(-1).push({
        ...sortingNode,
        partitionId: accumulator.length,
      })
      return accumulator
    },
    [[]],
  )
  if (options.useExperimentalDependencyDetection) {
    let dependenciesBySortingNode = computeDependenciesBySortingNode({
      sortingNodes: sortingNodeGroups.flat(),
      enumName: node.id.name,
      sourceCode,
    })
    sortingNodeGroups = populateSortingNodeGroupsWithDependencies({
      dependenciesBySortingNode,
      sortingNodeGroups,
    })
  }
  let sortingNodes = sortingNodeGroups.flat()
  let isNumericEnum = sortingNodes.every(
    sortingNode => sortingNode.numericValue !== null,
  )
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
    let nodesSortedByGroups = sortingNodeGroups.flatMap(sortingNodeGroup =>
      sortNodesByGroups({
        comparatorByOptionsComputer:
          buildComparatorByOptionsComputer(isNumericEnum),
        optionsByGroupIndexComputer,
        ignoreEslintDisabledNodes,
        nodes: sortingNodeGroup,
        groups: options.groups,
      }),
    )
    return sortNodesByDependencies(nodesSortedByGroups, {
      ignoreEslintDisabledNodes,
    })
  }
}
export { defaultOptions, sortEnum }
