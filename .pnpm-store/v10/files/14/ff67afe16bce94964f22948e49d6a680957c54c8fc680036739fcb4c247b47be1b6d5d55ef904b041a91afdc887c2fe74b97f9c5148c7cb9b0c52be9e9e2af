import { AST_NODE_TYPES } from '@typescript-eslint/utils'
function computeSpecifierModifiers(node) {
  if (node.type !== AST_NODE_TYPES.ImportDeclaration) {
    return []
  }
  return computeImportDeclarationModifiers(node)
}
function computeImportDeclarationModifiers(node) {
  let importClauses = node.specifiers
  return [
    ...(hasSpecifier(importClauses, AST_NODE_TYPES.ImportDefaultSpecifier) ?
      ['default']
    : []),
    ...(hasSpecifier(importClauses, AST_NODE_TYPES.ImportNamespaceSpecifier) ?
      ['wildcard']
    : []),
    ...(hasSpecifier(importClauses, AST_NODE_TYPES.ImportSpecifier) ?
      ['named']
    : []),
  ]
}
function hasSpecifier(importClauses, specifier) {
  return importClauses.some(importClause => importClause.type === specifier)
}
export { computeSpecifierModifiers }
