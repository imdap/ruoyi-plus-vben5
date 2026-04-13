import { buildRegexJsonSchema } from './common-json-schemas.js'
let allowedPartitionByCommentJsonSchemas = [
  {
    type: 'boolean',
  },
  buildRegexJsonSchema(),
]
let partitionByCommentJsonSchema = {
  oneOf: [
    ...allowedPartitionByCommentJsonSchemas,
    {
      properties: {
        block: {
          description: 'Enables specific block comments to separate the nodes.',
          oneOf: allowedPartitionByCommentJsonSchemas,
        },
        line: {
          description: 'Enables specific line comments to separate the nodes.',
          oneOf: allowedPartitionByCommentJsonSchemas,
        },
      },
      additionalProperties: false,
      minProperties: 1,
      type: 'object',
    },
  ],
  description:
    'Enables the use of comments to separate the nodes into logical groups.',
}
let partitionByNewLineJsonSchema = {
  description:
    'Enables the use of newlines to separate the nodes into logical groups.',
  type: 'boolean',
}
export { partitionByCommentJsonSchema, partitionByNewLineJsonSchema }
