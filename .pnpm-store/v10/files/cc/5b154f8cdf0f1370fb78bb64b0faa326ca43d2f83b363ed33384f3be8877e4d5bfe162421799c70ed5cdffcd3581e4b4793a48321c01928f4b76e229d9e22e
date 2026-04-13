import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { defaultComparatorByOptionsComputer } from '../utils/compare/default-comparator-by-options-computer.js'
import { makeSingleNodeCommentAfterFixes } from '../utils/make-single-node-comment-after-fixes.js'
import { validateCustomSortConfiguration } from '../utils/validate-custom-sort-configuration.js'
import { buildCommonJsonSchemas } from '../utils/json-schemas/common-json-schemas.js'
import {
  ORDER_ERROR,
  reportErrors,
  RIGHT,
  LEFT,
} from '../utils/report-errors.js'
import { createNodeIndexMap } from '../utils/create-node-index-map.js'
import { createEslintRule } from '../utils/create-eslint-rule.js'
import { rangeToDiff } from '../utils/range-to-diff.js'
import { getSettings } from '../utils/get-settings.js'
import { isSortable } from '../utils/is-sortable.js'
import { makeFixes } from '../utils/make-fixes.js'
import { sortNodes } from '../utils/sort-nodes.js'
import { pairwise } from '../utils/pairwise.js'
import { complete } from '../utils/complete.js'
const ORDER_ERROR_ID = 'unexpectedSwitchCaseOrder'
let defaultOptions = {
  fallbackSort: { type: 'unsorted' },
  specialCharacters: 'keep',
  type: 'alphabetical',
  ignoreCase: true,
  locales: 'en-US',
  alphabet: '',
  order: 'asc',
}
const sortSwitchCase = createEslintRule({
  create: context => ({
    SwitchStatement: switchNode => {
      if (!isSortable(switchNode.cases)) {
        return
      }
      let settings = getSettings(context.settings)
      let options = complete(context.options.at(0), settings, defaultOptions)
      let defaultComparator = defaultComparatorByOptionsComputer(options)
      validateCustomSortConfiguration(options)
      let { sourceCode } = context
      let isDiscriminantTrue =
        switchNode.discriminant.type === AST_NODE_TYPES.Literal &&
        switchNode.discriminant.value === true
      if (isDiscriminantTrue) {
        return
      }
      let caseNameSortingNodeGroups = switchNode.cases.reduce(
        (accumulator, caseNode, index) => {
          if (caseNode.test) {
            accumulator.at(-1).push({
              size: rangeToDiff(caseNode.test, sourceCode),
              name: getCaseName(sourceCode, caseNode),
              partitionId: accumulator.length,
              isEslintDisabled: false,
              node: caseNode.test,
              group: 'unknown',
            })
          }
          if (
            caseNode.consequent.length > 0 &&
            index !== switchNode.cases.length - 1
          ) {
            accumulator.push([])
          }
          return accumulator
        },
        [[]],
      )
      let hasUnsortedNodes = false
      for (let caseNodesSortingNodeGroup of caseNameSortingNodeGroups) {
        let sortedCaseNameSortingNodes = sortNodes({
          comparatorByOptionsComputer: defaultComparatorByOptionsComputer,
          nodes: caseNodesSortingNodeGroup,
          ignoreEslintDisabledNodes: false,
          options,
        })
        hasUnsortedNodes ||= sortedCaseNameSortingNodes.some(
          (node, index) => node !== caseNodesSortingNodeGroup[index],
        )
        let nodeIndexMap = createNodeIndexMap(sortedCaseNameSortingNodes)
        pairwise(caseNodesSortingNodeGroup, (left, right) => {
          if (!left) {
            return
          }
          let leftIndex = nodeIndexMap.get(left)
          let rightIndex = nodeIndexMap.get(right)
          if (leftIndex < rightIndex) {
            return
          }
          reportErrors({
            sortedNodes: sortedCaseNameSortingNodes,
            nodes: caseNodesSortingNodeGroup,
            messageIds: [ORDER_ERROR_ID],
            sourceCode,
            context,
            right,
            left,
          })
        })
      }
      let sortingNodes = switchNode.cases.map(caseNode => ({
        size:
          caseNode.test ?
            rangeToDiff(caseNode.test, sourceCode)
          : 'default'.length,
        name: getCaseName(sourceCode, caseNode),
        addSafetySemicolonWhenInline: true,
        isDefaultClause: !caseNode.test,
        isEslintDisabled: false,
        group: 'unknown',
        partitionId: 0,
        node: caseNode,
      }))
      let sortingNodeGroupsForDefaultSort = reduceCaseSortingNodes(
        sortingNodes,
        caseNode => caseNode.node.consequent.length > 0,
      )
      let sortingNodesGroupWithDefault = sortingNodeGroupsForDefaultSort.find(
        caseNodeGroup => caseNodeGroup.some(node => node.isDefaultClause),
      )
      if (
        sortingNodesGroupWithDefault &&
        !sortingNodesGroupWithDefault.at(-1).isDefaultClause
      ) {
        let defaultCase = sortingNodesGroupWithDefault.find(
          node => node.isDefaultClause,
        )
        let lastCase = sortingNodesGroupWithDefault.at(-1)
        context.report({
          fix: fixer => {
            let punctuatorAfterLastCase = sourceCode.getTokenAfter(
              lastCase.node.test,
            )
            let lastCaseRange = [
              lastCase.node.range[0],
              punctuatorAfterLastCase.range[1],
            ]
            return [
              fixer.replaceText(
                defaultCase.node,
                sourceCode.text.slice(...lastCaseRange),
              ),
              fixer.replaceTextRange(
                lastCaseRange,
                sourceCode.getText(defaultCase.node),
              ),
              ...makeSingleNodeCommentAfterFixes({
                sortedNode: punctuatorAfterLastCase,
                node: defaultCase.node,
                sourceCode,
                fixer,
              }),
              ...makeSingleNodeCommentAfterFixes({
                node: punctuatorAfterLastCase,
                sortedNode: defaultCase.node,
                sourceCode,
                fixer,
              }),
            ]
          },
          data: {
            [LEFT]: defaultCase.name,
            [RIGHT]: lastCase.name,
          },
          messageId: ORDER_ERROR_ID,
          node: defaultCase.node,
        })
      }
      let sortingNodeGroupsForBlockSort = reduceCaseSortingNodes(
        sortingNodes,
        caseNode => caseHasBreakOrReturn(caseNode.node),
      )
      let lastNodeGroup = sortingNodeGroupsForBlockSort.at(-1)
      let lastBlockCaseShouldStayInPlace = !caseHasBreakOrReturn(
        lastNodeGroup.at(-1).node,
      )
      let sortedSortingNodeGroupsForBlockSort = [
        ...sortingNodeGroupsForBlockSort,
      ]
        .toSorted((a, b) => {
          if (lastBlockCaseShouldStayInPlace) {
            if (a === lastNodeGroup) {
              return 1
            }
            if (b === lastNodeGroup) {
              return -1
            }
          }
          if (a.some(node => node.isDefaultClause)) {
            return 1
          }
          if (b.some(node => node.isDefaultClause)) {
            return -1
          }
          return defaultComparator(a.at(0), b.at(0))
        })
        .flat()
      let sortingNodeGroupsForBlockSortFlat =
        sortingNodeGroupsForBlockSort.flat()
      pairwise(sortingNodeGroupsForBlockSortFlat, (left, right) => {
        if (!left) {
          return
        }
        let indexOfLeft = sortedSortingNodeGroupsForBlockSort.indexOf(left)
        let indexOfRight = sortedSortingNodeGroupsForBlockSort.indexOf(right)
        if (indexOfLeft < indexOfRight) {
          return
        }
        context.report({
          fix: fixer =>
            hasUnsortedNodes ?
              []
            : makeFixes({
                sortedNodes: sortedSortingNodeGroupsForBlockSort,
                nodes: sortingNodeGroupsForBlockSortFlat,
                hasCommentAboveMissing: false,
                sourceCode,
                fixer,
              }),
          data: {
            [RIGHT]: right.name,
            [LEFT]: left.name,
          },
          messageId: ORDER_ERROR_ID,
          node: right.node,
        })
      })
    },
  }),
  meta: {
    docs: {
      url: 'https://perfectionist.dev/rules/sort-switch-case',
      description: 'Enforce sorted switch cases.',
      recommended: true,
    },
    schema: [
      {
        properties: buildCommonJsonSchemas(),
        additionalProperties: false,
        type: 'object',
      },
    ],
    messages: {
      [ORDER_ERROR_ID]: ORDER_ERROR,
    },
    type: 'suggestion',
    fixable: 'code',
  },
  defaultOptions: [defaultOptions],
  name: 'sort-switch-case',
})
function reduceCaseSortingNodes(caseNodes, endsBlock) {
  return caseNodes.reduce(
    (accumulator, caseNode, index) => {
      accumulator.at(-1).push(caseNode)
      if (endsBlock(caseNode) && index !== caseNodes.length - 1) {
        accumulator.push([])
      }
      return accumulator
    },
    [[]],
  )
}
function getCaseName(sourceCode, caseNode) {
  if (caseNode.test?.type === AST_NODE_TYPES.Literal) {
    return `${caseNode.test.value}`
  } else if (caseNode.test === null) {
    return 'default'
  }
  return sourceCode.getText(caseNode.test)
}
function caseHasBreakOrReturn(caseNode) {
  let statements =
    caseNode.consequent[0]?.type === AST_NODE_TYPES.BlockStatement ?
      caseNode.consequent[0].body
    : caseNode.consequent
  return statements.some(statementIsBreakOrReturn)
}
function statementIsBreakOrReturn(statement) {
  return (
    statement.type === AST_NODE_TYPES.BreakStatement ||
    statement.type === AST_NODE_TYPES.ReturnStatement
  )
}
export { sortSwitchCase as default }
