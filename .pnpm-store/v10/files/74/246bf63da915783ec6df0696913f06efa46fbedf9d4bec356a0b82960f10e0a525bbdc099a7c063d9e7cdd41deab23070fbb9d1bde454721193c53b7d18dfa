import { TSESTree } from '@typescript-eslint/types'
import { TSESLint } from '@typescript-eslint/utils'
import { ObjectTypeParent, Options } from './types.js'
/**
 * Computes the matched context options for the given nodes.
 *
 * @param params - The parameters.
 * @param params.sourceCode - The source code object.
 * @param params.parentNodes - The parent nodes of the type elements.
 * @param params.elements - The type elements.
 * @param params.context - The rule context.
 * @returns The matched context options, or undefined if none match.
 */
export declare function computeMatchedContextOptions({
  matchedAstSelectors,
  parentNodes,
  sourceCode,
  elements,
  context,
}: {
  context: TSESLint.RuleContext<string, Options>
  matchedAstSelectors: ReadonlySet<string>
  elements: TSESTree.TypeElement[]
  parentNodes: ObjectTypeParent[]
  sourceCode: TSESLint.SourceCode
}): Options[number] | undefined
