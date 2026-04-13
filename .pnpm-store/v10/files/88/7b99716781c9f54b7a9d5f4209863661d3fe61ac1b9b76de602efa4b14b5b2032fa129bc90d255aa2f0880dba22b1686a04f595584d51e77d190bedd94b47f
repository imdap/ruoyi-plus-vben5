import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import {
  partitionByNewLineJsonSchema,
  partitionByCommentJsonSchema,
} from '../utils/json-schemas/common-partition-json-schemas.js'
import {
  ORDER_ERROR,
  GROUP_ORDER_ERROR,
  EXTRA_SPACING_ERROR,
  MISSED_SPACING_ERROR,
} from '../utils/report-errors.js'
import { validateNewlinesAndPartitionConfiguration } from '../utils/validate-newlines-and-partition-configuration.js'
import { defaultComparatorByOptionsComputer } from '../utils/compare/default-comparator-by-options-computer.js'
import { buildOptionsByGroupIndexComputer } from '../utils/build-options-by-group-index-computer.js'
import { buildCommonGroupsJsonSchemas } from '../utils/json-schemas/common-groups-json-schemas.js'
import { validateCustomSortConfiguration } from '../utils/validate-custom-sort-configuration.js'
import { validateGroupsConfiguration } from '../utils/validate-groups-configuration.js'
import { buildCommonJsonSchemas } from '../utils/json-schemas/common-json-schemas.js'
import { getEslintDisabledLines } from '../utils/get-eslint-disabled-lines.js'
import { isNodeEslintDisabled } from '../utils/is-node-eslint-disabled.js'
import { doesCustomGroupMatch } from '../utils/does-custom-group-match.js'
import { sortNodesByGroups } from '../utils/sort-nodes-by-groups.js'
import { getNodeDecorators } from '../utils/get-node-decorators.js'
import { getDecoratorName } from '../utils/get-decorator-name.js'
import { createEslintRule } from '../utils/create-eslint-rule.js'
import { reportAllErrors } from '../utils/report-all-errors.js'
import { shouldPartition } from '../utils/should-partition.js'
import { computeGroup } from '../utils/compute-group.js'
import { rangeToDiff } from '../utils/range-to-diff.js'
import { getSettings } from '../utils/get-settings.js'
import { isSortable } from '../utils/is-sortable.js'
import { complete } from '../utils/complete.js'
const ORDER_ERROR_ID = 'unexpectedDecoratorsOrder'
const GROUP_ORDER_ERROR_ID = 'unexpectedDecoratorsGroupOrder'
const EXTRA_SPACING_ERROR_ID = 'extraSpacingBetweenDecorators'
const MISSED_SPACING_ERROR_ID = 'missedSpacingBetweenDecorators'
let defaultOptions = {
  fallbackSort: { type: 'unsorted' },
  newlinesInside: 'newlinesBetween',
  specialCharacters: 'keep',
  partitionByComment: false,
  partitionByNewLine: false,
  newlinesBetween: 'ignore',
  sortOnProperties: true,
  sortOnParameters: true,
  sortOnAccessors: true,
  type: 'alphabetical',
  sortOnClasses: true,
  sortOnMethods: true,
  ignoreCase: true,
  customGroups: [],
  locales: 'en-US',
  alphabet: '',
  order: 'asc',
  groups: [],
}
const sortDecorators = createEslintRule({
  meta: {
    schema: {
      items: {
        properties: {
          ...buildCommonJsonSchemas(),
          ...buildCommonGroupsJsonSchemas(),
          sortOnParameters: {
            description:
              'Controls whether sorting should be enabled for method parameter decorators.',
            type: 'boolean',
          },
          sortOnProperties: {
            description:
              'Controls whether sorting should be enabled for class property decorators.',
            type: 'boolean',
          },
          sortOnAccessors: {
            description:
              'Controls whether sorting should be enabled for class accessor decorators.',
            type: 'boolean',
          },
          sortOnMethods: {
            description:
              'Controls whether sorting should be enabled for class method decorators.',
            type: 'boolean',
          },
          sortOnClasses: {
            description:
              'Controls whether sorting should be enabled for class decorators.',
            type: 'boolean',
          },
          partitionByComment: partitionByCommentJsonSchema,
          partitionByNewLine: partitionByNewLineJsonSchema,
        },
        additionalProperties: false,
        type: 'object',
      },
      uniqueItems: true,
      type: 'array',
    },
    messages: {
      [MISSED_SPACING_ERROR_ID]: MISSED_SPACING_ERROR,
      [EXTRA_SPACING_ERROR_ID]: EXTRA_SPACING_ERROR,
      [GROUP_ORDER_ERROR_ID]: GROUP_ORDER_ERROR,
      [ORDER_ERROR_ID]: ORDER_ERROR,
    },
    docs: {
      url: 'https://perfectionist.dev/rules/sort-decorators',
      description: 'Enforce sorted decorators.',
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
      modifiers: [],
      selectors: [],
      options,
    })
    validateNewlinesAndPartitionConfiguration(options)
    return {
      Decorator: decorator => {
        if (!options.sortOnParameters) {
          return
        }
        if (
          'decorators' in decorator.parent &&
          decorator.parent.type === AST_NODE_TYPES.Identifier &&
          decorator.parent.parent.type === AST_NODE_TYPES.FunctionExpression
        ) {
          let { decorators } = decorator.parent
          if (decorator !== decorators[0]) {
            return
          }
          sortDecorators$1(context, options, decorators)
        }
      },
      PropertyDefinition: propertyDefinition => {
        if (options.sortOnProperties) {
          sortDecorators$1(
            context,
            options,
            getNodeDecorators(propertyDefinition),
          )
        }
      },
      AccessorProperty: accessorDefinition => {
        if (options.sortOnAccessors) {
          sortDecorators$1(
            context,
            options,
            getNodeDecorators(accessorDefinition),
          )
        }
      },
      MethodDefinition: methodDefinition => {
        if (options.sortOnMethods) {
          sortDecorators$1(
            context,
            options,
            getNodeDecorators(methodDefinition),
          )
        }
      },
      ClassDeclaration: declaration => {
        if (options.sortOnClasses) {
          sortDecorators$1(context, options, getNodeDecorators(declaration))
        }
      },
    }
  },
  defaultOptions: [defaultOptions],
  name: 'sort-decorators',
})
function sortDecorators$1(context, options, decorators) {
  if (!isSortable(decorators)) {
    return
  }
  let { sourceCode, id } = context
  let eslintDisabledLines = getEslintDisabledLines({
    ruleName: id,
    sourceCode,
  })
  let optionsByGroupIndexComputer = buildOptionsByGroupIndexComputer(options)
  let formattedMembers = decorators.reduce(
    (accumulator, decorator) => {
      let name = getDecoratorName({
        sourceCode,
        decorator,
      })
      let group = computeGroup({
        customGroupMatcher: customGroup =>
          doesCustomGroupMatch({
            elementName: name,
            selectors: [],
            modifiers: [],
            customGroup,
          }),
        predefinedGroups: [],
        options,
      })
      let sortingNode = {
        isEslintDisabled: isNodeEslintDisabled(decorator, eslintDisabledLines),
        size: rangeToDiff(decorator, sourceCode),
        node: decorator,
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
  function sortNodesExcludingEslintDisabled(ignoreEslintDisabledNodes) {
    return formattedMembers.flatMap(nodes2 =>
      sortNodesByGroups({
        comparatorByOptionsComputer: defaultComparatorByOptionsComputer,
        optionsByGroupIndexComputer,
        ignoreEslintDisabledNodes,
        groups: options.groups,
        nodes: nodes2,
      }),
    )
  }
  let nodes = formattedMembers.flat()
  reportAllErrors({
    availableMessageIds: {
      missedSpacingBetweenMembers: MISSED_SPACING_ERROR_ID,
      extraSpacingBetweenMembers: EXTRA_SPACING_ERROR_ID,
      unexpectedGroupOrder: GROUP_ORDER_ERROR_ID,
      unexpectedOrder: ORDER_ERROR_ID,
    },
    ignoreFirstNodeHighestBlockComment: true,
    sortNodesExcludingEslintDisabled,
    options,
    context,
    nodes,
  })
}
export { sortDecorators as default }
