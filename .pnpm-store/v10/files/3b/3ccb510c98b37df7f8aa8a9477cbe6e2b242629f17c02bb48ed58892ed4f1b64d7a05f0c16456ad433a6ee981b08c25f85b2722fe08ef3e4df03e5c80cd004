import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { UnreachableCaseError } from '../../utils/unreachable-case-error.js'
function computeDependencyNames({ sourceCode, node }) {
  switch (node.type) {
    case AST_NODE_TYPES.TSImportEqualsDeclaration:
      return [node.id.name]
    case AST_NODE_TYPES.VariableDeclaration:
      return []
    case AST_NODE_TYPES.ImportDeclaration:
      return node.specifiers.map(computeImportClauseDependencyName)
    /* v8 ignore next 2 -- @preserve Exhaustive guard. */
    default:
      throw new UnreachableCaseError(node)
  }
  function computeImportClauseDependencyName(specifier) {
    switch (specifier.type) {
      case AST_NODE_TYPES.ImportNamespaceSpecifier:
      case AST_NODE_TYPES.ImportDefaultSpecifier:
        return sourceCode.getText(specifier.local)
      case AST_NODE_TYPES.ImportSpecifier:
        return sourceCode.getText(specifier.imported)
      /* v8 ignore next 2 -- @preserve Exhaustive guard. */
      default:
        throw new UnreachableCaseError(specifier)
    }
  }
}
export { computeDependencyNames }
