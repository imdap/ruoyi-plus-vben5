import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { computeDependenciesBySortingNode as computeDependenciesBySortingNode$1 } from '../../utils/compute-dependencies-by-sorting-node.js'
import { doesSortingNodeHaveOneOfDependencyNames } from '../../utils/does-sorting-node-have-one-of-dependency-names.js'
import { computeParentNodesWithTypes } from '../../utils/compute-parent-nodes-with-types.js'
import { UnreachableCaseError } from '../../utils/unreachable-case-error.js'
import { isPropertyOrAccessorNode } from './is-property-or-accessor-node.js'
import { isArrowFunctionNode } from './is-arrow-function-node.js'
function computeDependenciesBySortingNode({
  dependencyDetection,
  sortingNodes,
  sourceCode,
}) {
  return computeDependenciesBySortingNode$1({
    additionalIdentifierDependenciesComputer:
      buildAdditionalIdentifierDependenciesComputer({ sortingNodes }),
    shouldIgnoreSortingNodeComputer:
      buildShouldIgnoreSortingNodeComputer(dependencyDetection),
    shouldIgnoreIdentifierComputer:
      buildShouldIgnoreIdentifierComputer(dependencyDetection),
    sortingNodes,
    sourceCode,
  })
}
function buildShouldIgnoreIdentifierComputer(dependencyDetection) {
  return ({ referencingSortingNode, identifier }) => {
    switch (dependencyDetection) {
      case 'soft':
        return false
      case 'hard':
        return !isInRelevantClassContext()
      /* v8 ignore next 2 -- @preserve Exhaustive guard. */
      default:
        throw new UnreachableCaseError(dependencyDetection)
    }
    function isInRelevantClassContext() {
      let relevantParentNodes = computeParentNodesWithTypes({
        allowedTypes: [
          AST_NODE_TYPES.ClassBody,
          AST_NODE_TYPES.PropertyDefinition,
          AST_NODE_TYPES.AccessorProperty,
          AST_NODE_TYPES.MethodDefinition,
          AST_NODE_TYPES.ArrowFunctionExpression,
        ],
        maxParent: referencingSortingNode.node,
        consecutiveOnly: false,
        node: identifier,
      })
      let firstClassBodyParent = relevantParentNodes.findIndex(
        parentNode => parentNode.type === AST_NODE_TYPES.ClassBody,
      )
      if (firstClassBodyParent < 0) {
        return true
      }
      let classBody = relevantParentNodes[firstClassBodyParent]
      let searchStaticMethodsAndFunctionProperties = classBody.body.some(
        classElement =>
          classElement.type === AST_NODE_TYPES.StaticBlock ||
          (classElement.static &&
            isPropertyOrAccessorNode(classElement) &&
            !isArrowFunctionNode(classElement)),
      )
      let otherParents = relevantParentNodes.slice(0, firstClassBodyParent)
      return otherParents.every(otherParent =>
        isClassElementRelevant(
          otherParent,
          searchStaticMethodsAndFunctionProperties,
        ),
      )
    }
    function isClassElementRelevant(
      classElement,
      searchStaticMethodsAndFunctionProperties,
    ) {
      if (
        classElement.type !== AST_NODE_TYPES.MethodDefinition &&
        !isArrowFunctionNode(classElement)
      ) {
        return true
      }
      return classElement.static && searchStaticMethodsAndFunctionProperties
    }
  }
}
function buildAdditionalIdentifierDependenciesComputer({ sortingNodes }) {
  return ({ referencingSortingNode, reference }) => {
    let relatedIdentifiers = [
      ...computeMemberExpressionIdentifiers(),
      ...computeQualifiedNameIdentifiers(),
    ]
    return sortingNodes.filter(sortingNode =>
      doesSortingNodeHaveOneOfDependencyNames(sortingNode, relatedIdentifiers),
    )
    function computeMemberExpressionIdentifiers() {
      return computeParentNodesWithTypes({
        allowedTypes: [AST_NODE_TYPES.MemberExpression],
        maxParent: referencingSortingNode.node,
        node: reference.identifier,
        consecutiveOnly: true,
      })
        .map(node => node.property)
        .filter(property => property.type === AST_NODE_TYPES.Identifier)
        .map(property => property.name)
    }
    function computeQualifiedNameIdentifiers() {
      return computeParentNodesWithTypes({
        allowedTypes: [AST_NODE_TYPES.TSQualifiedName],
        maxParent: referencingSortingNode.node,
        node: reference.identifier,
        consecutiveOnly: true,
      }).map(node => node.right.name)
    }
  }
}
function buildShouldIgnoreSortingNodeComputer(dependencyDetection) {
  return sortingNode => {
    switch (dependencyDetection) {
      case 'hard':
        return sortingNode.dependencyDetection !== 'hard'
      case 'soft':
        return false
      /* v8 ignore next 2 -- @preserve Exhaustive guard. */
      default:
        throw new UnreachableCaseError(dependencyDetection)
    }
  }
}
export { computeDependenciesBySortingNode }
