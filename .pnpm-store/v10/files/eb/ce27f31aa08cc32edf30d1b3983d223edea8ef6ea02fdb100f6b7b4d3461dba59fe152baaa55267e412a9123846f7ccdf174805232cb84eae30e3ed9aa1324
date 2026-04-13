import { regexScopes } from '../../types/scoped-regex-option.js'
import { buildRegexJsonSchema } from './common-json-schemas.js'
let scopedRegexJsonSchema = buildRegexJsonSchema({
  additionalProperties: {
    scope: {
      enum: [...regexScopes],
      type: 'string',
    },
  },
})
export { scopedRegexJsonSchema }
