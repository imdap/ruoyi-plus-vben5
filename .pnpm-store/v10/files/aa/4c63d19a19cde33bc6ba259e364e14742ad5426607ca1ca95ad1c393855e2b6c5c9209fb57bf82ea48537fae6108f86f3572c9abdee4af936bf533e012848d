let orderJsonSchema = {
  description:
    'Specifies whether to sort items in ascending or descending order.',
  enum: ['asc', 'desc'],
  type: 'string',
}
let alphabetJsonSchema = {
  description:
    "Used only when the `type` option is set to `'custom'`. Specifies the custom alphabet for sorting.",
  type: 'string',
}
let localesJsonSchema = {
  oneOf: [
    {
      type: 'string',
    },
    {
      items: {
        type: 'string',
      },
      type: 'array',
    },
  ],
  description: 'Specifies the sorting locales.',
}
let ignoreCaseJsonSchema = {
  description: 'Controls whether sorting should be case-sensitive or not.',
  type: 'boolean',
}
let specialCharactersJsonSchema = {
  description:
    'Specifies whether to trim, remove, or keep special characters before sorting.',
  enum: ['remove', 'trim', 'keep'],
  type: 'string',
}
let matchesAstSelectorJsonSchema = {
  description:
    'Specifies an AST selector to match elements for conditional configuration.',
  type: 'string',
}
function buildCommonJsonSchemas({
  allowedAdditionalTypeValues,
  additionalSortProperties,
} = {}) {
  return {
    fallbackSort: buildFallbackSortJsonSchema({
      additionalProperties: additionalSortProperties,
      allowedAdditionalTypeValues,
    }),
    type: buildTypeJsonSchema({
      allowedAdditionalValues: allowedAdditionalTypeValues,
    }),
    specialCharacters: specialCharactersJsonSchema,
    ignoreCase: ignoreCaseJsonSchema,
    alphabet: alphabetJsonSchema,
    locales: localesJsonSchema,
    order: orderJsonSchema,
    ...additionalSortProperties,
  }
}
function buildFallbackSortJsonSchema({
  allowedAdditionalTypeValues,
  additionalProperties,
}) {
  return {
    properties: {
      type: buildTypeJsonSchema({
        allowedAdditionalValues: allowedAdditionalTypeValues,
      }),
      order: orderJsonSchema,
      ...additionalProperties,
    },
    description: 'Fallback sort order.',
    additionalProperties: false,
    required: ['type'],
    type: 'object',
  }
}
function buildUseConfigurationIfJsonSchema({ additionalProperties } = {}) {
  return {
    description:
      'Specifies filters to match a particular options configuration for a given element to sort.',
    properties: {
      allNamesMatchPattern: buildRegexJsonSchema(),
      ...additionalProperties,
    },
    additionalProperties: false,
    type: 'object',
  }
}
function buildTypeJsonSchema({ allowedAdditionalValues }) {
  return {
    enum: [
      'alphabetical',
      'natural',
      'line-length',
      'custom',
      'unsorted',
      'subgroup-order',
      ...(allowedAdditionalValues ?? []),
    ],
    description: 'Specifies the sorting method.',
    type: 'string',
  }
}
function buildRegexJsonSchema({ additionalProperties } = {}) {
  return {
    oneOf: [
      {
        items: buildSingleRegexJsonSchema({ additionalProperties }),
        type: 'array',
      },
      buildSingleRegexJsonSchema({ additionalProperties }),
    ],
    description: 'Regular expression.',
  }
}
function buildSingleRegexJsonSchema({ additionalProperties }) {
  return {
    oneOf: [
      {
        properties: {
          ...additionalProperties,
          pattern: {
            description: 'Regular expression pattern.',
            type: 'string',
          },
          flags: {
            description: 'Regular expression flags.',
            type: 'string',
          },
        },
        additionalProperties: false,
        required: ['pattern'],
        type: 'object',
      },
      {
        type: 'string',
      },
    ],
    description: 'Regular expression.',
  }
}
let useExperimentalDependencyDetectionJsonSchema = {
  description:
    'Enables experimental dependency detection for sorting rules that support it.',
  type: 'boolean',
}
export {
  buildCommonJsonSchemas,
  buildFallbackSortJsonSchema,
  buildRegexJsonSchema,
  buildTypeJsonSchema,
  buildUseConfigurationIfJsonSchema,
  matchesAstSelectorJsonSchema,
  orderJsonSchema,
  useExperimentalDependencyDetectionJsonSchema,
}
