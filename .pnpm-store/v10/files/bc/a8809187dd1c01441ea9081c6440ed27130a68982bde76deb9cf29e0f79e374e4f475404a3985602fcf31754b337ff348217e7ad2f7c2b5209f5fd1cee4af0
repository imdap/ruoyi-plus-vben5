import { AST_NODE_TYPES } from '@typescript-eslint/utils'
function computeDependencies(node) {
  if (node.value.type !== AST_NODE_TYPES.AssignmentPattern) {
    return []
  }
  let dependencies = []
  traverseNode(node.value.right)
  return dependencies
  function checkNode(nodeValue) {
    if (
      nodeValue.type === AST_NODE_TYPES.ArrowFunctionExpression ||
      nodeValue.type === AST_NODE_TYPES.FunctionExpression
    ) {
      return
    }
    if (nodeValue.type === AST_NODE_TYPES.Identifier) {
      dependencies.push(nodeValue.name)
    }
    if (nodeValue.type === AST_NODE_TYPES.Property) {
      traverseNode(nodeValue.key)
      traverseNode(nodeValue.value)
    }
    if (nodeValue.type === AST_NODE_TYPES.ConditionalExpression) {
      traverseNode(nodeValue.test)
      traverseNode(nodeValue.consequent)
      traverseNode(nodeValue.alternate)
    }
    if (
      'expression' in nodeValue &&
      typeof nodeValue.expression !== 'boolean'
    ) {
      traverseNode(nodeValue.expression)
    }
    if ('object' in nodeValue) {
      traverseNode(nodeValue.object)
    }
    if ('callee' in nodeValue) {
      traverseNode(nodeValue.callee)
    }
    if ('left' in nodeValue) {
      traverseNode(nodeValue.left)
    }
    if ('right' in nodeValue) {
      traverseNode(nodeValue.right)
    }
    if ('elements' in nodeValue) {
      let elements = nodeValue.elements.filter(
        currentNode => currentNode !== null,
      )
      traverseNode(elements)
    }
    if ('argument' in nodeValue && nodeValue.argument) {
      traverseNode(nodeValue.argument)
    }
    if ('arguments' in nodeValue) {
      traverseNode(nodeValue.arguments)
    }
    if ('properties' in nodeValue) {
      traverseNode(nodeValue.properties)
    }
    if ('expressions' in nodeValue) {
      traverseNode(nodeValue.expressions)
    }
  }
  function traverseNode(nodeValue) {
    if (Array.isArray(nodeValue)) {
      for (let nodeItem of nodeValue) {
        traverseNode(nodeItem)
      }
    } else {
      checkNode(nodeValue)
    }
  }
}
export { computeDependencies }
