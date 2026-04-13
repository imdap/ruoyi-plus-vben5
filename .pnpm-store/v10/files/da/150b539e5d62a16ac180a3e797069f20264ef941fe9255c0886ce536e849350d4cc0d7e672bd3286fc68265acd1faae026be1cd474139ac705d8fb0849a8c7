import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { isPropertyOrAccessorNode } from './is-property-or-accessor-node.js'
import { getNodeDecorators } from '../../utils/get-node-decorators.js'
import { getDecoratorName } from '../../utils/get-decorator-name.js'
import { isArrowFunctionNode } from './is-arrow-function-node.js'
import { computeDependencies } from './compute-dependencies.js'
function computeNodeDetails({
  useExperimentalDependencyDetection,
  sourceCode,
  node,
}) {
  let selector
  let name
  let modifiers = []
  let dependencies = []
  let decorators = []
  let addSafetySemicolonWhenInline = false
  let moduleBlock = null
  let shouldPartitionAfterNode = false
  let ignoredDueToDecoratorBeforeExportClass = false
  let dependencyDetection = 'soft'
  let exportNode
  parseNode(node)
  if (!selector || !name || ignoredDueToDecoratorBeforeExportClass) {
    return {
      shouldPartitionAfterNode,
      moduleBlock,
    }
  }
  return {
    nodeDetails: {
      addSafetySemicolonWhenInline,
      dependencyDetection,
      dependencies,
      decorators,
      modifiers,
      selector,
      name,
    },
  }
  function parseNode(nodeToParse) {
    if ('declare' in nodeToParse && nodeToParse.declare) {
      modifiers.push('declare')
    }
    switch (nodeToParse.type) {
      case AST_NODE_TYPES.ExportDefaultDeclaration:
        exportNode = nodeToParse
        modifiers.push('default', 'export')
        parseNode(nodeToParse.declaration)
        break
      case AST_NODE_TYPES.ExportNamedDeclaration:
        exportNode = nodeToParse
        if (nodeToParse.declaration) {
          parseNode(nodeToParse.declaration)
        }
        modifiers.push('export')
        break
      case AST_NODE_TYPES.TSInterfaceDeclaration:
        selector = 'interface'
        ;({ name } = nodeToParse.id)
        break
      case AST_NODE_TYPES.TSTypeAliasDeclaration:
        selector = 'type'
        ;({ name } = nodeToParse.id)
        addSafetySemicolonWhenInline = true
        break
      case AST_NODE_TYPES.FunctionDeclaration:
      case AST_NODE_TYPES.TSDeclareFunction:
        selector = 'function'
        if (nodeToParse.async) {
          modifiers.push('async')
        }
        if (modifiers.includes('declare')) {
          addSafetySemicolonWhenInline = true
        }
        name = nodeToParse.id?.name
        break
      case AST_NODE_TYPES.TSModuleDeclaration:
        shouldPartitionAfterNode = true
        moduleBlock = nodeToParse.body ?? null
        break
      case AST_NODE_TYPES.VariableDeclaration:
        shouldPartitionAfterNode = true
        break
      case AST_NODE_TYPES.TSEnumDeclaration:
        selector = 'enum'
        ;({ name } = nodeToParse.id)
        dependencyDetection = 'hard'
        dependencies.push(
          ...extractDependencies(
            nodeToParse,
            useExperimentalDependencyDetection,
          ),
        )
        break
      case AST_NODE_TYPES.ClassDeclaration:
        selector = 'class'
        name = nodeToParse.id?.name
        let nodeDecorators = getNodeDecorators(nodeToParse)
        if (nodeDecorators[0]) {
          modifiers.push('decorated')
          ignoredDueToDecoratorBeforeExportClass = isExportAfterDecorators({
            firstDecorator: nodeDecorators[0],
            exportNode,
          })
        }
        decorators = nodeDecorators.map(decorator =>
          getDecoratorName({
            sourceCode,
            decorator,
          }),
        )
        dependencyDetection = 'hard'
        dependencies.push(
          ...extractDependencies(
            nodeToParse,
            useExperimentalDependencyDetection,
          ),
        )
        break
    }
  }
}
function extractDependencies(expression, useExperimentalDependencyDetection) {
  if (useExperimentalDependencyDetection) {
    return []
  }
  let searchStaticMethodsAndFunctionProperties =
    expression.type === AST_NODE_TYPES.ClassDeclaration &&
    expression.body.body.some(
      classElement =>
        classElement.type === AST_NODE_TYPES.StaticBlock ||
        (classElement.static &&
          isPropertyOrAccessorNode(classElement) &&
          !isArrowFunctionNode(classElement)),
    )
  return computeDependencies(expression, {
    searchStaticMethodsAndFunctionProperties,
    type: 'hard',
  })
}
function isExportAfterDecorators({ firstDecorator, exportNode }) {
  if (!exportNode) {
    return false
  }
  return exportNode.range[0] > firstDecorator.range[0]
}
export { computeNodeDetails }
