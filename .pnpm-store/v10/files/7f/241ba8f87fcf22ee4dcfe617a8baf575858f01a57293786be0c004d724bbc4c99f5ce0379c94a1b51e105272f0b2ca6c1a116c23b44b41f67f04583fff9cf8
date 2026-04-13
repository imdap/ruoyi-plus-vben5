import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import {
  buildUseConfigurationIfJsonSchema,
  matchesAstSelectorJsonSchema,
  buildCommonJsonSchemas,
} from '../utils/json-schemas/common-json-schemas.js'
import {
  ORDER_ERROR_ID,
  GROUP_ORDER_ERROR_ID,
  EXTRA_SPACING_ERROR_ID,
  MISSED_SPACING_ERROR_ID,
} from './sort-heritage-clauses/types.js'
import {
  partitionByCommentJsonSchema,
  partitionByNewLineJsonSchema,
} from '../utils/json-schemas/common-partition-json-schemas.js'
import {
  ORDER_ERROR,
  GROUP_ORDER_ERROR,
  EXTRA_SPACING_ERROR,
  MISSED_SPACING_ERROR,
} from '../utils/report-errors.js'
import {
  defaultOptions,
  sortHeritageClause,
} from './sort-heritage-clauses/sort-heritage-clause.js'
import { buildCommonGroupsJsonSchemas } from '../utils/json-schemas/common-groups-json-schemas.js'
import { buildAstListeners } from '../utils/build-ast-listeners.js'
import { createEslintRule } from '../utils/create-eslint-rule.js'
const sortHeritageClauses = createEslintRule({
  meta: {
    schema: {
      items: {
        properties: {
          ...buildCommonJsonSchemas(),
          ...buildCommonGroupsJsonSchemas(),
          useConfigurationIf: buildUseConfigurationIfJsonSchema({
            additionalProperties: {
              matchesAstSelector: matchesAstSelectorJsonSchema,
            },
          }),
          partitionByNewLine: partitionByNewLineJsonSchema,
          partitionByComment: partitionByCommentJsonSchema,
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
      url: 'https://perfectionist.dev/rules/sort-heritage-clauses',
      description: 'Enforce sorted heritage clauses.',
      recommended: true,
    },
    type: 'suggestion',
    fixable: 'code',
  },
  create: context =>
    buildAstListeners({
      nodeTypes: [
        AST_NODE_TYPES.TSInterfaceDeclaration,
        AST_NODE_TYPES.ClassDeclaration,
      ],
      sorter: sortHeritageClause,
      context,
    }),
  defaultOptions: [defaultOptions],
  name: 'sort-heritage-clauses',
})
export { sortHeritageClauses as default }
