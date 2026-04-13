import {
  allSelectors,
  DEPENDENCY_ORDER_ERROR_ID,
  ORDER_ERROR_ID,
  GROUP_ORDER_ERROR_ID,
  MISSED_SPACING_ERROR_ID,
  EXTRA_SPACING_ERROR_ID,
} from './types.js'
import { computeDependenciesOutsideFunctionsBySortingNode } from '../../utils/compute-dependencies-outside-functions-by-sorting-node.js'
import { populateSortingNodeGroupsWithDependencies } from '../../utils/populate-sorting-node-groups-with-dependencies.js'
import { validateNewlinesAndPartitionConfiguration } from '../../utils/validate-newlines-and-partition-configuration.js'
import { defaultComparatorByOptionsComputer } from '../../utils/compare/default-comparator-by-options-computer.js'
import { buildOptionsByGroupIndexComputer } from '../../utils/build-options-by-group-index-computer.js'
import { validateCustomSortConfiguration } from '../../utils/validate-custom-sort-configuration.js'
import { validateGroupsConfiguration } from '../../utils/validate-groups-configuration.js'
import { generatePredefinedGroups } from '../../utils/generate-predefined-groups.js'
import { computeMatchedContextOptions } from './compute-matched-context-options.js'
import { sortNodesByDependencies } from '../../utils/sort-nodes-by-dependencies.js'
import { getEslintDisabledLines } from '../../utils/get-eslint-disabled-lines.js'
import { doesCustomGroupMatch } from '../../utils/does-custom-group-match.js'
import { isNodeEslintDisabled } from '../../utils/is-node-eslint-disabled.js'
import { sortNodesByGroups } from '../../utils/sort-nodes-by-groups.js'
import { reportAllErrors } from '../../utils/report-all-errors.js'
import { shouldPartition } from '../../utils/should-partition.js'
import { computeDependencies } from './compute-dependencies.js'
import { computeGroup } from '../../utils/compute-group.js'
import { rangeToDiff } from '../../utils/range-to-diff.js'
import { getSettings } from '../../utils/get-settings.js'
import { computeNodeName } from './compute-node-name.js'
import { isSortable } from '../../utils/is-sortable.js'
import { complete } from '../../utils/complete.js'
let cachedGroupsByModifiersAndSelectors = /* @__PURE__ */ new Map()
let defaultOptions = {
  useExperimentalDependencyDetection: true,
  fallbackSort: { type: 'unsorted' },
  newlinesInside: 'newlinesBetween',
  specialCharacters: 'keep',
  partitionByNewLine: false,
  partitionByComment: false,
  newlinesBetween: 'ignore',
  useConfigurationIf: {},
  type: 'alphabetical',
  customGroups: [],
  ignoreCase: true,
  locales: 'en-US',
  alphabet: '',
  order: 'asc',
  groups: [],
}
function sortVariableDeclaration({ matchedAstSelectors, context, node }) {
  if (!isSortable(node.declarations)) {
    return
  }
  let { sourceCode, id } = context
  let settings = getSettings(context.settings)
  let matchedContextOptions = computeMatchedContextOptions({
    matchedAstSelectors,
    sourceCode,
    context,
    node,
  })
  let options = complete(matchedContextOptions, settings, defaultOptions)
  validateCustomSortConfiguration(options)
  validateNewlinesAndPartitionConfiguration(options)
  validateGroupsConfiguration({
    selectors: allSelectors,
    modifiers: [],
    options,
  })
  let eslintDisabledLines = getEslintDisabledLines({
    ruleName: id,
    sourceCode,
  })
  let optionsByGroupIndexComputer = buildOptionsByGroupIndexComputer(options)
  let sortingNodeGroups = node.declarations.reduce(
    (accumulator, declaration) => {
      let name = computeNodeName({
        node: declaration,
        sourceCode,
      })
      let selector = declaration.init ? 'initialized' : 'uninitialized'
      let predefinedGroups = generatePredefinedGroups({
        cache: cachedGroupsByModifiersAndSelectors,
        selectors: [selector],
        modifiers: [],
      })
      let lastSortingNode = accumulator.at(-1)?.at(-1)
      let sortingNode = {
        group: computeGroup({
          customGroupMatcher: customGroup =>
            doesCustomGroupMatch({
              selectors: [selector],
              elementName: name,
              modifiers: [],
              customGroup,
            }),
          predefinedGroups,
          options,
        }),
        dependencies:
          options.useExperimentalDependencyDetection ?
            []
          : computeDependencies(declaration),
        isEslintDisabled: isNodeEslintDisabled(
          declaration,
          eslintDisabledLines,
        ),
        size: rangeToDiff(declaration, sourceCode),
        dependencyNames: [name],
        node: declaration,
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
      accumulator.at(-1)?.push({
        ...sortingNode,
        partitionId: accumulator.length,
      })
      return accumulator
    },
    [[]],
  )
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
    let nodesSortedByGroups = sortingNodeGroups.flatMap(sortingNodeGroup =>
      sortNodesByGroups({
        comparatorByOptionsComputer: defaultComparatorByOptionsComputer,
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
export { defaultOptions, sortVariableDeclaration }
