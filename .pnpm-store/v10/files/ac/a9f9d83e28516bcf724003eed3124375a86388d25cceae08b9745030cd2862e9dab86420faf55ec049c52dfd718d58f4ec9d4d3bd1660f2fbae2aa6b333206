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
import { buildOverloadSignatureNewlinesBetweenValueGetter } from '../../utils/overload-signature/build-overload-signature-newlines-between-value-getter.js'
import { populateSortingNodeGroupsWithOverloadSignature } from '../../utils/overload-signature/populate-sorting-node-groups-with-overload-signature.js'
import { populateSortingNodeGroupsWithDependencies } from '../../utils/populate-sorting-node-groups-with-dependencies.js'
import { validateNewlinesAndPartitionConfiguration } from '../../utils/validate-newlines-and-partition-configuration.js'
import { defaultComparatorByOptionsComputer } from '../../utils/compare/default-comparator-by-options-computer.js'
import { buildOptionsByGroupIndexComputer } from '../../utils/build-options-by-group-index-computer.js'
import { validateCustomSortConfiguration } from '../../utils/validate-custom-sort-configuration.js'
import { computeIndexSignatureDetails } from './node-info/compute-index-signature-details.js'
import { computeDependenciesBySortingNode } from './compute-dependencies-by-sorting-node.js'
import { validateGroupsConfiguration } from '../../utils/validate-groups-configuration.js'
import { computeStaticBlockDetails } from './node-info/compute-static-block-details.js'
import { computeOverloadSignatureGroups } from './compute-overload-signature-groups.js'
import { generatePredefinedGroups } from '../../utils/generate-predefined-groups.js'
import { sortNodesByDependencies } from '../../utils/sort-nodes-by-dependencies.js'
import { computeMatchedContextOptions } from './compute-matched-context-options.js'
import { getEslintDisabledLines } from '../../utils/get-eslint-disabled-lines.js'
import { computePropertyDetails } from './node-info/compute-property-details.js'
import { computeAccessorDetails } from './node-info/compute-accessor-details.js'
import { doesCustomGroupMatch } from '../../utils/does-custom-group-match.js'
import { isNodeEslintDisabled } from '../../utils/is-node-eslint-disabled.js'
import { computeMethodDetails } from './node-info/compute-method-details.js'
import { UnreachableCaseError } from '../../utils/unreachable-case-error.js'
import { sortNodesByGroups } from '../../utils/sort-nodes-by-groups.js'
import { getNodeDecorators } from '../../utils/get-node-decorators.js'
import { getDecoratorName } from '../../utils/get-decorator-name.js'
import { reportAllErrors } from '../../utils/report-all-errors.js'
import { isKnownClassElement } from './is-known-class-element.js'
import { shouldPartition } from '../../utils/should-partition.js'
import { getGroupIndex } from '../../utils/get-group-index.js'
import { computeGroup } from '../../utils/compute-group.js'
import { rangeToDiff } from '../../utils/range-to-diff.js'
import { getSettings } from '../../utils/get-settings.js'
import { isSortable } from '../../utils/is-sortable.js'
import { complete } from '../../utils/complete.js'
let cachedGroupsByModifiersAndSelectors = /* @__PURE__ */ new Map()
let defaultOptions = {
  groups: [
    'index-signature',
    ['static-property', 'static-accessor-property'],
    ['static-get-method', 'static-set-method'],
    ['protected-static-property', 'protected-static-accessor-property'],
    ['protected-static-get-method', 'protected-static-set-method'],
    ['private-static-property', 'private-static-accessor-property'],
    ['private-static-get-method', 'private-static-set-method'],
    'static-block',
    ['property', 'accessor-property'],
    ['get-method', 'set-method'],
    ['protected-property', 'protected-accessor-property'],
    ['protected-get-method', 'protected-set-method'],
    ['private-property', 'private-accessor-property'],
    ['private-get-method', 'private-set-method'],
    'constructor',
    ['static-method', 'static-function-property'],
    ['protected-static-method', 'protected-static-function-property'],
    ['private-static-method', 'private-static-function-property'],
    ['method', 'function-property'],
    ['protected-method', 'protected-function-property'],
    ['private-method', 'private-function-property'],
    'unknown',
  ],
  useExperimentalDependencyDetection: true,
  ignoreCallbackDependenciesPatterns: [],
  fallbackSort: { type: 'unsorted' },
  newlinesInside: 'newlinesBetween',
  partitionByComment: false,
  partitionByNewLine: false,
  newlinesBetween: 'ignore',
  specialCharacters: 'keep',
  useConfigurationIf: {},
  type: 'alphabetical',
  ignoreCase: true,
  customGroups: [],
  locales: 'en-US',
  alphabet: '',
  order: 'asc',
}
function sortClass({ matchedAstSelectors, context, node }) {
  let classElements = node.body.filter(isKnownClassElement)
  if (!isSortable(classElements)) {
    return
  }
  let settings = getSettings(context.settings)
  let matchedContextOptions = computeMatchedContextOptions({
    matchedAstSelectors,
    classElements,
    context,
  })
  let options = complete(matchedContextOptions, settings, defaultOptions)
  validateCustomSortConfiguration(options)
  validateGroupsConfiguration({
    modifiers: allModifiers,
    selectors: allSelectors,
    options,
  })
  validateNewlinesAndPartitionConfiguration(options)
  let { sourceCode, id } = context
  let eslintDisabledLines = getEslintDisabledLines({
    ruleName: id,
    sourceCode,
  })
  let optionsByGroupIndexComputer = buildOptionsByGroupIndexComputer(options)
  let overloadSignatureNewlinesBetweenValueGetter =
    buildOverloadSignatureNewlinesBetweenValueGetter()
  let className = node.parent.id?.name
  let sortingNodeGroupsWithoutOverloadSignature = classElements.reduce(
    (accumulator, member) => {
      let dependencies = []
      let isDecorated = false
      let decorators = []
      if ('decorators' in member) {
        decorators = getNodeDecorators(member).map(decorator =>
          getDecoratorName({ sourceCode, decorator }),
        )
        isDecorated = decorators.length > 0
      }
      let addSafetySemicolonWhenInline
      let dependencyNames
      let name
      let nameDetails
      let memberValue
      let isStatic
      let modifiers
      let selectors
      switch (member.type) {
        case AST_NODE_TYPES.TSAbstractPropertyDefinition:
        case AST_NODE_TYPES.PropertyDefinition:
          addSafetySemicolonWhenInline = true
          ;({
            dependencyNames,
            dependencies,
            memberValue,
            nameDetails,
            modifiers,
            selectors,
            isStatic,
          } = computePropertyDetails({
            ignoreCallbackDependenciesPatterns:
              options.ignoreCallbackDependenciesPatterns,
            useExperimentalDependencyDetection:
              options.useExperimentalDependencyDetection,
            property: member,
            isDecorated,
            sourceCode,
            className,
          }))
          ;({ name } = nameDetails)
          break
        case AST_NODE_TYPES.TSAbstractMethodDefinition:
        case AST_NODE_TYPES.MethodDefinition:
          dependencyNames = []
          ;({
            addSafetySemicolonWhenInline,
            nameDetails,
            selectors,
            modifiers,
            isStatic,
          } = computeMethodDetails({
            hasParentDeclare: node.parent.declare,
            method: member,
            isDecorated,
            sourceCode,
          }))
          ;({ name } = nameDetails)
          break
        case AST_NODE_TYPES.TSAbstractAccessorProperty:
        case AST_NODE_TYPES.AccessorProperty:
          addSafetySemicolonWhenInline = true
          ;({ dependencyNames, nameDetails, selectors, modifiers, isStatic } =
            computeAccessorDetails({
              accessor: member,
              isDecorated,
              sourceCode,
            }))
          ;({ name } = nameDetails)
          break
        case AST_NODE_TYPES.TSIndexSignature:
          addSafetySemicolonWhenInline = true
          dependencyNames = []
          nameDetails = null
          isStatic = false
          ;({ modifiers, selectors, name } = computeIndexSignatureDetails({
            indexSignature: member,
            sourceCode,
          }))
          break
        case AST_NODE_TYPES.StaticBlock:
          addSafetySemicolonWhenInline = false
          dependencyNames = []
          name = 'static'
          nameDetails = null
          isStatic = true
          ;({ dependencies, selectors, modifiers } = computeStaticBlockDetails({
            useExperimentalDependencyDetection:
              options.useExperimentalDependencyDetection,
            ignoreCallbackDependenciesPatterns:
              options.ignoreCallbackDependenciesPatterns,
            staticBlock: member,
            className,
          }))
          break
        /* v8 ignore next 2 -- @preserve Exhaustive guard. */
        default:
          throw new UnreachableCaseError(member)
      }
      let predefinedGroups = generatePredefinedGroups({
        cache: cachedGroupsByModifiersAndSelectors,
        selectors,
        modifiers,
      })
      let group = computeGroup({
        customGroupMatcher: customGroup =>
          doesCustomGroupMatch({
            elementValue: memberValue,
            elementName: name,
            customGroup,
            decorators,
            modifiers,
            selectors,
          }),
        predefinedGroups,
        options,
      })
      let sortingNode = {
        isEslintDisabled: isNodeEslintDisabled(member, eslintDisabledLines),
        size: rangeToDiff(member, sourceCode),
        addSafetySemicolonWhenInline,
        dependencyNames,
        node: member,
        dependencies,
        nameDetails,
        isStatic,
        group,
        name,
      }
      let lastSortingNode = accumulator.at(-1)?.at(-1)
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
  let sortingNodeGroups = populateSortingNodeGroupsWithOverloadSignature({
    overloadSignatureGroups: computeOverloadSignatureGroups(classElements),
    sortingNodeGroups: sortingNodeGroupsWithoutOverloadSignature,
  })
  if (options.useExperimentalDependencyDetection) {
    let dependenciesBySortingNode = computeDependenciesBySortingNode({
      ignoreCallbackDependenciesPatterns:
        options.ignoreCallbackDependenciesPatterns,
      sortingNodes: sortingNodeGroups.flat(),
      classBody: node,
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
    newlinesBetweenValueGetter: overloadSignatureNewlinesBetweenValueGetter,
    sortNodesExcludingEslintDisabled,
    nodes: sortingNodes,
    options,
    context,
  })
  function sortNodesExcludingEslintDisabled(ignoreEslintDisabledNodes) {
    let nodesSortedByGroups = sortingNodeGroups.flatMap(sortingNodeGroup =>
      sortNodesByGroups({
        isNodeIgnored: sortingNode =>
          getGroupIndex(options.groups, sortingNode) === options.groups.length,
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
export { defaultOptions, sortClass }
