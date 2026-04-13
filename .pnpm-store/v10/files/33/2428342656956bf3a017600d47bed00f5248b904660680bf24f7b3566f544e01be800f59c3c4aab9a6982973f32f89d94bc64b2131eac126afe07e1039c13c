import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import {
  ORDER_ERROR,
  GROUP_ORDER_ERROR,
  EXTRA_SPACING_ERROR,
  MISSED_SPACING_ERROR,
  DEPENDENCY_ORDER_ERROR,
} from '../utils/report-errors.js'
import { buildOverloadSignatureNewlinesBetweenValueGetter } from '../utils/overload-signature/build-overload-signature-newlines-between-value-getter.js'
import { populateSortingNodeGroupsWithOverloadSignature } from '../utils/overload-signature/populate-sorting-node-groups-with-overload-signature.js'
import {
  allSelectors,
  allModifiers,
  additionalCustomGroupMatchOptionsJsonSchema,
  USAGE_TYPE_OPTION,
} from './sort-modules/types.js'
import {
  partitionByNewLineJsonSchema,
  partitionByCommentJsonSchema,
} from '../utils/json-schemas/common-partition-json-schemas.js'
import {
  useExperimentalDependencyDetectionJsonSchema,
  buildCommonJsonSchemas,
} from '../utils/json-schemas/common-json-schemas.js'
import { populateSortingNodeGroupsWithDependencies } from '../utils/populate-sorting-node-groups-with-dependencies.js'
import { validateNewlinesAndPartitionConfiguration } from '../utils/validate-newlines-and-partition-configuration.js'
import { buildComparatorByOptionsComputer } from './sort-modules/build-comparator-by-options-computer.js'
import { computeDependenciesBySortingNode } from './sort-modules/compute-dependencies-by-sorting-node.js'
import { buildOptionsByGroupIndexComputer } from '../utils/build-options-by-group-index-computer.js'
import { computeOverloadSignatureGroups } from './sort-modules/compute-overload-signature-groups.js'
import { buildCommonGroupsJsonSchemas } from '../utils/json-schemas/common-groups-json-schemas.js'
import { validateCustomSortConfiguration } from '../utils/validate-custom-sort-configuration.js'
import { validateGroupsConfiguration } from '../utils/validate-groups-configuration.js'
import { generatePredefinedGroups } from '../utils/generate-predefined-groups.js'
import { sortNodesByDependencies } from '../utils/sort-nodes-by-dependencies.js'
import { getEslintDisabledLines } from '../utils/get-eslint-disabled-lines.js'
import { computeNodeDetails } from './sort-modules/compute-node-details.js'
import { isNodeEslintDisabled } from '../utils/is-node-eslint-disabled.js'
import { doesCustomGroupMatch } from '../utils/does-custom-group-match.js'
import { sortNodesByGroups } from '../utils/sort-nodes-by-groups.js'
import { createEslintRule } from '../utils/create-eslint-rule.js'
import { reportAllErrors } from '../utils/report-all-errors.js'
import { shouldPartition } from '../utils/should-partition.js'
import { getGroupIndex } from '../utils/get-group-index.js'
import { computeGroup } from '../utils/compute-group.js'
import { rangeToDiff } from '../utils/range-to-diff.js'
import { getSettings } from '../utils/get-settings.js'
import { complete } from '../utils/complete.js'
let cachedGroupsByModifiersAndSelectors = /* @__PURE__ */ new Map()
const ORDER_ERROR_ID = 'unexpectedModulesOrder'
const GROUP_ORDER_ERROR_ID = 'unexpectedModulesGroupOrder'
const EXTRA_SPACING_ERROR_ID = 'extraSpacingBetweenModulesMembers'
const MISSED_SPACING_ERROR_ID = 'missedSpacingBetweenModulesMembers'
const DEPENDENCY_ORDER_ERROR_ID = 'unexpectedModulesDependencyOrder'
let defaultOptions = {
  groups: [
    'declare-enum',
    'export-enum',
    'enum',
    ['declare-interface', 'declare-type'],
    ['export-interface', 'export-type'],
    ['interface', 'type'],
    'declare-class',
    'class',
    'export-class',
    'declare-function',
    'export-function',
    'function',
  ],
  useExperimentalDependencyDetection: true,
  fallbackSort: { type: 'unsorted' },
  newlinesInside: 'newlinesBetween',
  partitionByComment: false,
  partitionByNewLine: false,
  newlinesBetween: 'ignore',
  specialCharacters: 'keep',
  type: 'alphabetical',
  ignoreCase: true,
  customGroups: [],
  locales: 'en-US',
  alphabet: '',
  order: 'asc',
}
const sortModules = createEslintRule({
  meta: {
    schema: [
      {
        properties: {
          ...buildCommonJsonSchemas({
            allowedAdditionalTypeValues: [USAGE_TYPE_OPTION],
          }),
          ...buildCommonGroupsJsonSchemas({
            additionalCustomGroupMatchProperties:
              additionalCustomGroupMatchOptionsJsonSchema,
            allowedAdditionalTypeValues: [USAGE_TYPE_OPTION],
          }),
          useExperimentalDependencyDetection:
            useExperimentalDependencyDetectionJsonSchema,
          partitionByComment: partitionByCommentJsonSchema,
          partitionByNewLine: partitionByNewLineJsonSchema,
        },
        additionalProperties: false,
        type: 'object',
      },
    ],
    messages: {
      [DEPENDENCY_ORDER_ERROR_ID]: DEPENDENCY_ORDER_ERROR,
      [MISSED_SPACING_ERROR_ID]: MISSED_SPACING_ERROR,
      [EXTRA_SPACING_ERROR_ID]: EXTRA_SPACING_ERROR,
      [GROUP_ORDER_ERROR_ID]: GROUP_ORDER_ERROR,
      [ORDER_ERROR_ID]: ORDER_ERROR,
    },
    docs: {
      url: 'https://perfectionist.dev/rules/sort-modules',
      description: 'Enforce sorted modules.',
      recommended: true,
    },
    type: 'suggestion',
    fixable: 'code',
  },
  create: context => {
    let settings = getSettings(context.settings)
    let options = complete(context.options.at(0), settings, defaultOptions)
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
    return {
      Program: program =>
        analyzeModule({
          eslintDisabledLines,
          module: program,
          sourceCode,
          options,
          context,
        }),
    }
  },
  defaultOptions: [defaultOptions],
  name: 'sort-modules',
})
function analyzeModule({
  eslintDisabledLines,
  sourceCode,
  options,
  context,
  module,
}) {
  let optionsByGroupIndexComputer = buildOptionsByGroupIndexComputer(options)
  let overloadSignatureNewlinesBetweenValueGetter =
    buildOverloadSignatureNewlinesBetweenValueGetter()
  let sortingNodeGroupsWithoutOverloadSignature = [[]]
  for (let node of module.body) {
    switch (node.type) {
      case AST_NODE_TYPES.TSNamespaceExportDeclaration:
      case AST_NODE_TYPES.ExportAllDeclaration:
      case AST_NODE_TYPES.ImportDeclaration:
      case AST_NODE_TYPES.DebuggerStatement:
      case AST_NODE_TYPES.ContinueStatement:
      case AST_NODE_TYPES.ReturnStatement:
      case AST_NODE_TYPES.EmptyStatement:
      case AST_NODE_TYPES.BreakStatement:
      case AST_NODE_TYPES.WithStatement:
        continue
      case AST_NODE_TYPES.ExportDefaultDeclaration:
      case AST_NODE_TYPES.ExportNamedDeclaration:
      case AST_NODE_TYPES.TSInterfaceDeclaration:
      case AST_NODE_TYPES.TSTypeAliasDeclaration:
      case AST_NODE_TYPES.FunctionDeclaration:
      case AST_NODE_TYPES.TSModuleDeclaration:
        break
      case AST_NODE_TYPES.TSImportEqualsDeclaration:
      case AST_NODE_TYPES.VariableDeclaration:
      case AST_NODE_TYPES.ExpressionStatement:
      case AST_NODE_TYPES.TSExportAssignment:
      case AST_NODE_TYPES.DoWhileStatement:
      case AST_NODE_TYPES.LabeledStatement:
      case AST_NODE_TYPES.SwitchStatement:
      case AST_NODE_TYPES.WhileStatement:
      case AST_NODE_TYPES.ForInStatement:
      case AST_NODE_TYPES.ForOfStatement:
      case AST_NODE_TYPES.ThrowStatement:
      case AST_NODE_TYPES.BlockStatement:
      case AST_NODE_TYPES.ForStatement:
      case AST_NODE_TYPES.TryStatement:
      case AST_NODE_TYPES.IfStatement:
        sortingNodeGroupsWithoutOverloadSignature.push([])
        continue
      case AST_NODE_TYPES.TSDeclareFunction:
      case AST_NODE_TYPES.TSEnumDeclaration:
      case AST_NODE_TYPES.ClassDeclaration:
        break
      /* v8 ignore next 2 -- @preserve Exhaustive guard. */
      default:
        continue
    }
    let details = computeNodeDetails({
      useExperimentalDependencyDetection:
        options.useExperimentalDependencyDetection,
      sourceCode,
      node,
    })
    if (!details.nodeDetails) {
      if (details.shouldPartitionAfterNode) {
        sortingNodeGroupsWithoutOverloadSignature.push([])
      }
      if (details.moduleBlock) {
        analyzeModule({
          module: details.moduleBlock,
          eslintDisabledLines,
          sourceCode,
          options,
          context,
        })
      }
      continue
    }
    let {
      addSafetySemicolonWhenInline,
      dependencyDetection,
      dependencies,
      decorators,
      modifiers,
      selector,
      name,
    } = details.nodeDetails
    let predefinedGroups = generatePredefinedGroups({
      cache: cachedGroupsByModifiersAndSelectors,
      selectors: [selector],
      modifiers,
    })
    let group = computeGroup({
      customGroupMatcher: customGroup =>
        doesCustomGroupMatch({
          selectors: [selector],
          elementName: name,
          customGroup,
          decorators,
          modifiers,
        }),
      predefinedGroups,
      options,
    })
    let sortingNode = {
      isEslintDisabled: isNodeEslintDisabled(node, eslintDisabledLines),
      size: rangeToDiff(node, sourceCode),
      addSafetySemicolonWhenInline,
      dependencyNames: [name],
      dependencyDetection,
      dependencies,
      group,
      name,
      node,
    }
    let lastSortingNode = sortingNodeGroupsWithoutOverloadSignature
      .at(-1)
      ?.at(-1)
    if (
      shouldPartition({
        lastSortingNode,
        sortingNode,
        sourceCode,
        options,
      })
    ) {
      sortingNodeGroupsWithoutOverloadSignature.push([])
    }
    sortingNodeGroupsWithoutOverloadSignature.at(-1)?.push({
      ...sortingNode,
      partitionId: sortingNodeGroupsWithoutOverloadSignature.length,
    })
  }
  let overloadSignatureGroups = computeOverloadSignatureGroups(
    sortingNodeGroupsWithoutOverloadSignature.flat().map(({ node }) => node),
  )
  let sortingNodeGroups = populateSortingNodeGroupsWithOverloadSignature({
    sortingNodeGroups: sortingNodeGroupsWithoutOverloadSignature,
    overloadSignatureGroups,
  })
  if (options.useExperimentalDependencyDetection) {
    let dependenciesBySortingNode = computeDependenciesBySortingNode({
      sortingNodes: sortingNodeGroups.flat(),
      dependencyDetection: 'hard',
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
        comparatorByOptionsComputer: buildComparatorByOptionsComputer({
          useExperimentalDependencyDetection:
            options.useExperimentalDependencyDetection,
          sortingNodes: sortingNodeGroup,
          ignoreEslintDisabledNodes,
          sourceCode,
        }),
        isNodeIgnored: sortingNode =>
          getGroupIndex(options.groups, sortingNode) === options.groups.length,
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
export { sortModules as default }
