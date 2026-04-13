import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import {
  additionalCustomGroupMatchOptionsJsonSchema,
  TYPE_IMPORT_FIRST_TYPE_OPTION,
  additionalSortOptionsJsonSchema,
  allSelectors,
  allModifiers,
} from './sort-imports/types.js'
import {
  ORDER_ERROR,
  GROUP_ORDER_ERROR,
  EXTRA_SPACING_ERROR,
  MISSED_SPACING_ERROR,
  DEPENDENCY_ORDER_ERROR,
  MISSED_COMMENT_ABOVE_ERROR,
} from '../utils/report-errors.js'
import {
  useExperimentalDependencyDetectionJsonSchema,
  buildRegexJsonSchema,
  buildCommonJsonSchemas,
} from '../utils/json-schemas/common-json-schemas.js'
import {
  partitionByNewLineJsonSchema,
  partitionByCommentJsonSchema,
} from '../utils/json-schemas/common-partition-json-schemas.js'
import { populateSortingNodeGroupsWithDependencies } from '../utils/populate-sorting-node-groups-with-dependencies.js'
import { validateNewlinesAndPartitionConfiguration } from '../utils/validate-newlines-and-partition-configuration.js'
import { isNonExternalReferenceTsImportEquals } from './sort-imports/is-non-external-reference-ts-import-equals.js'
import { validateSideEffectsConfiguration } from './sort-imports/validate-side-effects-configuration.js'
import { buildOptionsByGroupIndexComputer } from '../utils/build-options-by-group-index-computer.js'
import { computeDependenciesBySortingNode } from '../utils/compute-dependencies-by-sorting-node.js'
import { buildCommonGroupsJsonSchemas } from '../utils/json-schemas/common-groups-json-schemas.js'
import { validateCustomSortConfiguration } from '../utils/validate-custom-sort-configuration.js'
import { comparatorByOptionsComputer } from './sort-imports/comparator-by-options-computer.js'
import { readClosestTsConfigByPath } from './sort-imports/read-closest-ts-config-by-path.js'
import { computeSpecifierModifiers } from './sort-imports/compute-specifier-modifiers.js'
import { validateGroupsConfiguration } from '../utils/validate-groups-configuration.js'
import { getOptionsWithCleanGroups } from '../utils/get-options-with-clean-groups.js'
import { computeCommonSelectors } from './sort-imports/compute-common-selectors.js'
import { isSideEffectOnlyGroup } from './sort-imports/is-side-effect-only-group.js'
import { computeDependencyNames } from './sort-imports/compute-dependency-names.js'
import { generatePredefinedGroups } from '../utils/generate-predefined-groups.js'
import { sortNodesByDependencies } from '../utils/sort-nodes-by-dependencies.js'
import { computeSpecifierName } from './sort-imports/compute-specifier-name.js'
import { getEslintDisabledLines } from '../utils/get-eslint-disabled-lines.js'
import { computeDependencies } from './sort-imports/compute-dependencies.js'
import { isSideEffectImport } from './sort-imports/is-side-effect-import.js'
import { isNodeEslintDisabled } from '../utils/is-node-eslint-disabled.js'
import { doesCustomGroupMatch } from '../utils/does-custom-group-match.js'
import { isNodeOnSingleLine } from '../utils/is-node-on-single-line.js'
import { computeNodeName } from './sort-imports/compute-node-name.js'
import { sortNodesByGroups } from '../utils/sort-nodes-by-groups.js'
import { createEslintRule } from '../utils/create-eslint-rule.js'
import { reportAllErrors } from '../utils/report-all-errors.js'
import { shouldPartition } from '../utils/should-partition.js'
import { computeGroup } from '../utils/compute-group.js'
import { rangeToDiff } from '../utils/range-to-diff.js'
import { getSettings } from '../utils/get-settings.js'
import { isSortable } from '../utils/is-sortable.js'
import { complete } from '../utils/complete.js'
let cachedGroupsByModifiersAndSelectors = /* @__PURE__ */ new Map()
const ORDER_ERROR_ID = 'unexpectedImportsOrder'
const GROUP_ORDER_ERROR_ID = 'unexpectedImportsGroupOrder'
const EXTRA_SPACING_ERROR_ID = 'extraSpacingBetweenImports'
const MISSED_SPACING_ERROR_ID = 'missedSpacingBetweenImports'
const MISSED_COMMENT_ABOVE_ERROR_ID = 'missedCommentAboveImport'
const DEPENDENCY_ORDER_ERROR_ID = 'unexpectedImportsDependencyOrder'
let defaultOptions = {
  groups: [
    'type-import',
    ['value-builtin', 'value-external'],
    'type-internal',
    'value-internal',
    ['type-parent', 'type-sibling', 'type-index'],
    ['value-parent', 'value-sibling', 'value-index'],
    'ts-equals-import',
    'unknown',
  ],
  useExperimentalDependencyDetection: true,
  internalPattern: ['^~/.+', '^@/.+'],
  fallbackSort: { type: 'unsorted' },
  partitionByComment: false,
  partitionByNewLine: false,
  specialCharacters: 'keep',
  tsconfig: { rootDir: '' },
  maxLineLength: Infinity,
  sortSideEffects: false,
  type: 'alphabetical',
  environment: 'node',
  newlinesBetween: 1,
  newlinesInside: 0,
  customGroups: [],
  ignoreCase: true,
  locales: 'en-US',
  sortBy: 'path',
  alphabet: '',
  order: 'asc',
}
const sortImports = createEslintRule({
  create: context => {
    let settings = getSettings(context.settings)
    let userOptions = context.options.at(0)
    let options = getOptionsWithCleanGroups(
      complete(userOptions, settings, defaultOptions),
    )
    validateGroupsConfiguration({
      selectors: allSelectors,
      modifiers: allModifiers,
      options,
    })
    validateCustomSortConfiguration(options)
    validateNewlinesAndPartitionConfiguration(options)
    validateSideEffectsConfiguration(options)
    let tsconfigRootDirectory = options.tsconfig.rootDir
    let tsConfigOutput =
      tsconfigRootDirectory ?
        readClosestTsConfigByPath({
          tsconfigFilename: options.tsconfig.filename ?? 'tsconfig.json',
          tsconfigRootDir: tsconfigRootDirectory,
          filePath: context.physicalFilename,
          contextCwd: context.cwd,
        })
      : null
    let { sourceCode, filename, id } = context
    let eslintDisabledLines = getEslintDisabledLines({
      ruleName: id,
      sourceCode,
    })
    let sortingNodesWithoutPartitionId = []
    let flatGroups = new Set(options.groups.flat())
    let shouldRegroupSideEffectNodes = flatGroups.has('side-effect')
    let shouldRegroupSideEffectStyleNodes = flatGroups.has('side-effect-style')
    function registerNode(node) {
      let name = computeNodeName({
        sourceCode,
        node,
      })
      let commonSelectors = computeCommonSelectors({
        tsConfigOutput,
        filename,
        options,
        name,
      })
      let selectors = []
      let modifiers = []
      let group = null
      if (
        node.type !== AST_NODE_TYPES.VariableDeclaration &&
        node.importKind === 'type'
      ) {
        selectors.push('type')
        modifiers.push('type')
      }
      let isSideEffect = isSideEffectImport({ sourceCode, node })
      let isStyleValue = isStyle(name)
      let isStyleSideEffect = isSideEffect && isStyleValue
      if (!isNonExternalReferenceTsImportEquals(node)) {
        if (isStyleSideEffect) {
          selectors.push('side-effect-style')
        }
        if (isSideEffect) {
          selectors.push('side-effect')
          modifiers.push('side-effect')
        }
        if (isStyleValue) {
          selectors.push('style')
        }
        for (let selector of commonSelectors) {
          selectors.push(selector)
        }
      }
      selectors.push('import')
      if (!modifiers.includes('type')) {
        modifiers.push('value')
      }
      if (node.type === AST_NODE_TYPES.TSImportEqualsDeclaration) {
        modifiers.push('ts-equals')
      }
      if (node.type === AST_NODE_TYPES.VariableDeclaration) {
        modifiers.push('require')
      }
      modifiers.push(...computeSpecifierModifiers(node))
      if (isNodeOnSingleLine(node)) {
        modifiers.push('singleline')
      } else {
        modifiers.push('multiline')
      }
      group ??=
        computeGroupExceptUnknown({
          selectors,
          modifiers,
          options,
          name,
        }) ?? 'unknown'
      let hasMultipleImportDeclarations =
        node.type === AST_NODE_TYPES.ImportDeclaration &&
        isSortable(node.specifiers)
      let size = rangeToDiff(node, sourceCode)
      if (hasMultipleImportDeclarations && size > options.maxLineLength) {
        size = name.length + 10
      }
      sortingNodesWithoutPartitionId.push({
        isIgnored:
          !options.sortSideEffects &&
          isSideEffect &&
          !shouldRegroupSideEffectNodes &&
          (!isStyleSideEffect || !shouldRegroupSideEffectStyleNodes),
        dependencies:
          options.useExperimentalDependencyDetection ?
            []
          : computeDependencies(node),
        isEslintDisabled: isNodeEslintDisabled(node, eslintDisabledLines),
        dependencyNames: computeDependencyNames({ sourceCode, node }),
        specifierName: computeSpecifierName({ sourceCode, node }),
        isTypeImport: modifiers.includes('type'),
        addSafetySemicolonWhenInline: true,
        group,
        size,
        name,
        node,
      })
    }
    return {
      VariableDeclaration: node => {
        if (
          node.declarations[0].init?.type === AST_NODE_TYPES.CallExpression &&
          node.declarations[0].init.callee.type === AST_NODE_TYPES.Identifier &&
          node.declarations[0].init.callee.name === 'require' &&
          node.declarations[0].init.arguments[0]?.type ===
            AST_NODE_TYPES.Literal
        ) {
          registerNode(node)
        }
      },
      'Program:exit': () => {
        sortImportNodes({
          sortingNodesWithoutPartitionId,
          context,
          options,
        })
      },
      TSImportEqualsDeclaration: registerNode,
      ImportDeclaration: registerNode,
    }
  },
  meta: {
    schema: {
      items: {
        properties: {
          ...buildCommonJsonSchemas({
            allowedAdditionalTypeValues: [TYPE_IMPORT_FIRST_TYPE_OPTION],
            additionalSortProperties: additionalSortOptionsJsonSchema,
          }),
          ...buildCommonGroupsJsonSchemas({
            additionalCustomGroupMatchProperties:
              additionalCustomGroupMatchOptionsJsonSchema,
            allowedAdditionalTypeValues: [TYPE_IMPORT_FIRST_TYPE_OPTION],
            additionalSortProperties: additionalSortOptionsJsonSchema,
          }),
          tsconfig: {
            properties: {
              rootDir: {
                description: 'Specifies the tsConfig root directory.',
                type: 'string',
              },
              filename: {
                description: 'Specifies the tsConfig filename.',
                type: 'string',
              },
            },
            additionalProperties: false,
            required: ['rootDir'],
            type: 'object',
          },
          maxLineLength: {
            description: 'Specifies the maximum line length.',
            exclusiveMinimum: true,
            type: 'integer',
            minimum: 0,
          },
          sortSideEffects: {
            description:
              'Controls whether side-effect imports should be sorted.',
            type: 'boolean',
          },
          environment: {
            description: 'Specifies the environment.',
            enum: ['node', 'bun'],
            type: 'string',
          },
          useExperimentalDependencyDetection:
            useExperimentalDependencyDetectionJsonSchema,
          partitionByComment: partitionByCommentJsonSchema,
          partitionByNewLine: partitionByNewLineJsonSchema,
          internalPattern: buildRegexJsonSchema(),
        },
        additionalProperties: false,
        type: 'object',
      },
      uniqueItems: true,
      type: 'array',
    },
    messages: {
      [MISSED_COMMENT_ABOVE_ERROR_ID]: MISSED_COMMENT_ABOVE_ERROR,
      [DEPENDENCY_ORDER_ERROR_ID]: DEPENDENCY_ORDER_ERROR,
      [MISSED_SPACING_ERROR_ID]: MISSED_SPACING_ERROR,
      [EXTRA_SPACING_ERROR_ID]: EXTRA_SPACING_ERROR,
      [GROUP_ORDER_ERROR_ID]: GROUP_ORDER_ERROR,
      [ORDER_ERROR_ID]: ORDER_ERROR,
    },
    docs: {
      url: 'https://perfectionist.dev/rules/sort-imports',
      description: 'Enforce sorted imports.',
      recommended: true,
    },
    type: 'suggestion',
    fixable: 'code',
  },
  defaultOptions: [defaultOptions],
  name: 'sort-imports',
})
function sortImportNodes({ sortingNodesWithoutPartitionId, options, context }) {
  let { sourceCode } = context
  let optionsByGroupIndexComputer = buildOptionsByGroupIndexComputer(options)
  let contentSeparatedSortingNodeGroups = [[[]]]
  for (let sortingNodeWithoutPartitionId of sortingNodesWithoutPartitionId) {
    let lastGroupWithNoContentBetween = contentSeparatedSortingNodeGroups.at(-1)
    let lastGroup = lastGroupWithNoContentBetween.at(-1)
    let lastSortingNode = lastGroup.at(-1)
    if (
      lastSortingNode &&
      hasContentBetweenNodes(lastSortingNode, sortingNodeWithoutPartitionId)
    ) {
      lastGroup = []
      lastGroupWithNoContentBetween = [lastGroup]
      contentSeparatedSortingNodeGroups.push(lastGroupWithNoContentBetween)
    } else if (
      shouldPartition({
        sortingNode: sortingNodeWithoutPartitionId,
        lastSortingNode,
        sourceCode,
        options,
      })
    ) {
      lastGroup = []
      lastGroupWithNoContentBetween.push(lastGroup)
    }
    lastGroup.push({
      ...sortingNodeWithoutPartitionId,
      partitionId: lastGroupWithNoContentBetween.length,
    })
  }
  for (let contentSeparatedSortingNodeGroup of contentSeparatedSortingNodeGroups) {
    let sortingNodeGroups = [...contentSeparatedSortingNodeGroup]
    if (options.useExperimentalDependencyDetection) {
      let dependenciesBySortingNode = computeDependenciesBySortingNode({
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
        unexpectedDependencyOrder: DEPENDENCY_ORDER_ERROR_ID,
        missedSpacingBetweenMembers: MISSED_SPACING_ERROR_ID,
        extraSpacingBetweenMembers: EXTRA_SPACING_ERROR_ID,
        missedCommentAbove: MISSED_COMMENT_ABOVE_ERROR_ID,
        unexpectedGroupOrder: GROUP_ORDER_ERROR_ID,
        unexpectedOrder: ORDER_ERROR_ID,
      },
      sortNodesExcludingEslintDisabled:
        createSortNodesExcludingEslintDisabled(sortingNodeGroups),
      nodes: sortingNodes,
      options,
      context,
    })
  }
  function createSortNodesExcludingEslintDisabled(nodeGroups) {
    return function (ignoreEslintDisabledNodes) {
      let nodesSortedByGroups = nodeGroups.flatMap(nodes =>
        sortNodesByGroups({
          isNodeIgnoredForGroup: ({ groupIndex }) => {
            if (options.sortSideEffects) {
              return false
            }
            return isSideEffectOnlyGroup(options.groups[groupIndex])
          },
          isNodeIgnored: node => node.isIgnored,
          optionsByGroupIndexComputer,
          comparatorByOptionsComputer,
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
  function hasContentBetweenNodes(left, right) {
    return (
      sourceCode.getTokensBetween(left.node, right.node, {
        includeComments: false,
      }).length > 0
    )
  }
}
function computeGroupExceptUnknown({ selectors, modifiers, options, name }) {
  let predefinedGroups = generatePredefinedGroups({
    cache: cachedGroupsByModifiersAndSelectors,
    selectors,
    modifiers,
  })
  let computedCustomGroup = computeGroup({
    customGroupMatcher: customGroup =>
      doesCustomGroupMatch({
        elementName: name,
        customGroup,
        modifiers,
        selectors,
      }),
    predefinedGroups,
    options,
  })
  if (computedCustomGroup === 'unknown') {
    return null
  }
  return computedCustomGroup
}
let styleExtensions = [
  '.less',
  '.scss',
  '.sass',
  '.styl',
  '.pcss',
  '.css',
  '.sss',
]
function isStyle(value) {
  let [cleanedValue] = value.split('?')
  return styleExtensions.some(extension => cleanedValue?.endsWith(extension))
}
export { sortImports as default }
