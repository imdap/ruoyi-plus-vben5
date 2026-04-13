import {
  orderJsonSchema,
  buildTypeJsonSchema,
  buildFallbackSortJsonSchema,
  buildRegexJsonSchema,
} from './common-json-schemas.js'
let newlinesBetweenJsonSchema = {
  oneOf: [
    {
      description: 'Specifies how to handle newlines between groups.',
      enum: ['ignore'],
      type: 'string',
    },
    {
      type: 'number',
      minimum: 0,
    },
  ],
}
let newlinesInsideJsonSchema = {
  oneOf: [
    {
      description: 'Specifies how to handle newlines between groups elements',
      enum: ['ignore'],
      type: 'string',
    },
    {
      type: 'number',
      minimum: 0,
    },
  ],
}
function buildGroupsJsonSchema({
  allowedAdditionalTypeValues,
  additionalSortProperties,
}) {
  return {
    items: {
      oneOf: [
        {
          type: 'string',
        },
        {
          items: {
            type: 'string',
          },
          type: 'array',
          minItems: 1,
        },
        {
          properties: {
            newlinesBetween: newlinesBetweenJsonSchema,
          },
          required: ['newlinesBetween'],
          additionalProperties: false,
          type: 'object',
        },
        {
          properties: {
            group: {
              oneOf: [
                {
                  type: 'string',
                },
                {
                  items: {
                    type: 'string',
                  },
                  type: 'array',
                  minItems: 1,
                },
              ],
            },
            fallbackSort: buildFallbackSortJsonSchema({
              additionalProperties: additionalSortProperties,
              allowedAdditionalTypeValues,
            }),
            commentAbove: {
              description: 'Specifies a comment to enforce above the group.',
              type: 'string',
            },
            type: buildTypeJsonSchema({
              allowedAdditionalValues: allowedAdditionalTypeValues,
            }),
            newlinesInside: newlinesInsideJsonSchema,
            order: orderJsonSchema,
            ...additionalSortProperties,
          },
          additionalProperties: false,
          required: ['group'],
          minProperties: 2,
          type: 'object',
        },
      ],
    },
    description: 'Specifies a list of groups for sorting.',
    type: 'array',
  }
}
function buildCustomGroupsArrayJsonSchema({
  additionalCustomGroupMatchProperties,
  allowedAdditionalTypeValues,
  additionalSortProperties,
}) {
  let commonCustomGroupJsonSchemas = buildCommonCustomGroupJsonSchemas({
    allowedAdditionalTypeValues,
    additionalSortProperties,
  })
  let populatedCustomGroupMatchOptionsJsonSchema =
    buildPopulatedCustomGroupMatchPropertiesJsonSchema(
      additionalCustomGroupMatchProperties,
    )
  return {
    items: {
      oneOf: [
        {
          properties: {
            ...commonCustomGroupJsonSchemas,
            anyOf: {
              items: {
                properties: populatedCustomGroupMatchOptionsJsonSchema,
                description: 'Custom group.',
                additionalProperties: false,
                type: 'object',
              },
              type: 'array',
              minItems: 1,
            },
          },
          description: 'Custom group block.',
          required: ['groupName', 'anyOf'],
          additionalProperties: false,
          type: 'object',
        },
        {
          properties: {
            ...commonCustomGroupJsonSchemas,
            ...populatedCustomGroupMatchOptionsJsonSchema,
          },
          description: 'Custom group.',
          additionalProperties: false,
          required: ['groupName'],
          minProperties: 2,
          type: 'object',
        },
      ],
    },
    description: 'Defines custom groups to match specific members.',
    type: 'array',
  }
}
function buildCommonGroupsJsonSchemas({
  additionalCustomGroupMatchProperties,
  allowedAdditionalTypeValues,
  additionalSortProperties,
} = {}) {
  return {
    customGroups: buildCustomGroupsArrayJsonSchema({
      additionalCustomGroupMatchProperties,
      allowedAdditionalTypeValues,
      additionalSortProperties,
    }),
    newlinesInside: {
      oneOf: [
        newlinesInsideJsonSchema,
        { enum: ['newlinesBetween'], type: 'string' },
      ],
    },
    groups: buildGroupsJsonSchema({
      allowedAdditionalTypeValues,
      additionalSortProperties,
    }),
    newlinesBetween: newlinesBetweenJsonSchema,
  }
}
function buildCustomGroupModifiersJsonSchema(modifiers) {
  return {
    items: {
      enum: [...modifiers],
      type: 'string',
    },
    description: 'Modifier filters.',
    type: 'array',
  }
}
function buildCustomGroupSelectorJsonSchema(selectors) {
  return {
    description: 'Selector filter.',
    enum: [...selectors],
    type: 'string',
  }
}
function buildCommonCustomGroupJsonSchemas({
  allowedAdditionalTypeValues,
  additionalSortProperties,
}) {
  return {
    fallbackSort: buildFallbackSortJsonSchema({
      additionalProperties: additionalSortProperties,
      allowedAdditionalTypeValues,
    }),
    type: buildTypeJsonSchema({
      allowedAdditionalValues: allowedAdditionalTypeValues,
    }),
    groupName: {
      description: 'Custom group name.',
      type: 'string',
    },
    newlinesInside: newlinesInsideJsonSchema,
    order: orderJsonSchema,
    ...additionalSortProperties,
  }
}
function buildPopulatedCustomGroupMatchPropertiesJsonSchema(
  customGroupMatchOptionsJsonSchema,
) {
  return {
    elementNamePattern: buildRegexJsonSchema(),
    ...customGroupMatchOptionsJsonSchema,
  }
}
export {
  buildCommonGroupsJsonSchemas,
  buildCustomGroupModifiersJsonSchema,
  buildCustomGroupSelectorJsonSchema,
  buildCustomGroupsArrayJsonSchema,
  buildGroupsJsonSchema,
  newlinesBetweenJsonSchema,
  newlinesInsideJsonSchema,
}
