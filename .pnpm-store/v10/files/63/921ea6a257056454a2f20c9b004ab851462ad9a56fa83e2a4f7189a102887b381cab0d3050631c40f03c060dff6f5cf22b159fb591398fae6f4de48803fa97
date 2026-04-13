import { AST_NODE_TYPES } from '@typescript-eslint/utils'
function isNonExternalReferenceTsImportEquals(node) {
  if (node.type !== AST_NODE_TYPES.TSImportEqualsDeclaration) {
    return false
  }
  return node.moduleReference.type !== AST_NODE_TYPES.TSExternalModuleReference
}
export { isNonExternalReferenceTsImportEquals }
