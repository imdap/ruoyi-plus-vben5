import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { UnreachableCaseError } from '../../utils/unreachable-case-error.js'
function isSideEffectImport({ sourceCode, node }) {
  switch (node.type) {
    case AST_NODE_TYPES.TSImportEqualsDeclaration:
    case AST_NODE_TYPES.VariableDeclaration:
      return false
    case AST_NODE_TYPES.ImportDeclaration:
      return (
        node.specifiers.length ===
          0 /* Avoid matching on named imports without specifiers */ &&
        !/\}\s*from\s+/u.test(sourceCode.getText(node))
      )
    /* v8 ignore next 2 -- @preserve Exhaustive guard. */
    default:
      throw new UnreachableCaseError(node)
  }
}
export { isSideEffectImport }
