import type { Rule } from "eslint";
import type { ArrowFunctionExpression as ESArrowFunctionExpression, BaseNode as ESBaseNode, CallExpression as ESCallExpression, ExportDefaultDeclaration as ESExportDefaultDeclaration, FunctionDeclaration as ESFunctionDeclaration, FunctionExpression as ESFunctionExpression, Node as ESNode, SimpleLiteral as ESSimpleLiteral, TaggedTemplateExpression as ESTaggedTemplateExpression, TemplateElement as ESTemplateElement, TemplateLiteral as ESTemplateLiteral, VariableDeclarator as ESVariableDeclarator } from "estree";
import type { Literal, StringLiteral } from "../types/ast.js";
import type { WithParent } from "../types/estree.js";
import type { CalleeSelector, MatcherFunctions, SelectorMatcher, TagSelector, VariableSelector } from "../types/rule.js";
export declare const ES_CONTAINER_TYPES_TO_REPLACE_QUOTES: string[];
export declare const ES_CONTAINER_TYPES_TO_INSERT_BRACES: string[];
export declare function getLiteralsByESVariableDeclarator(ctx: Rule.RuleContext, node: ESVariableDeclarator, selectors: VariableSelector[]): Literal[];
export declare function getLiteralsByESExportDefaultDeclaration(ctx: Rule.RuleContext, node: ESExportDefaultDeclaration, selectors: VariableSelector[]): Literal[];
export declare function getLiteralsByESCallExpression(ctx: Rule.RuleContext, node: ESCallExpression, selectors: CalleeSelector[]): Literal[];
export declare function getLiteralsByTaggedTemplateExpression(ctx: Rule.RuleContext, node: ESTaggedTemplateExpression, selectors: TagSelector[]): Literal[];
export declare function getLiteralsByESBareTemplateLiteral(ctx: Rule.RuleContext, node: ESTemplateLiteral, selectors: TagSelector[]): Literal[];
export declare function getLiteralsByESLiteralNode(ctx: Rule.RuleContext, node: ESBaseNode): Literal[];
export declare function getLiteralsByESMatchers(ctx: Rule.RuleContext, node: ESBaseNode, matchers: SelectorMatcher[]): Literal[];
export declare function getStringLiteralByESStringLiteral(ctx: Rule.RuleContext, node: ESSimpleStringLiteral): StringLiteral | undefined;
export declare function getLiteralsByESTemplateLiteral(ctx: Rule.RuleContext, node: ESTemplateLiteral): Literal[];
export declare function findParentESTemplateLiteralByESTemplateElement(node: WithParent<ESNode>): ESTemplateLiteral | undefined;
export declare function getESObjectPath(node: WithParent<ESNode>): string | undefined;
export interface ESSimpleStringLiteral extends Rule.NodeParentExtension, ESSimpleLiteral {
    value: string;
}
export declare function isESObjectKey(node: ESBaseNode & Rule.NodeParentExtension): boolean;
export declare function isInsideObjectValue(node: WithParent<ESNode>): boolean;
export declare function isESSimpleStringLiteral(node: ESBaseNode): node is ESSimpleStringLiteral;
export declare function isESStringLike(node: ESBaseNode): node is ESSimpleStringLiteral | ESTemplateElement;
export declare function isESTemplateLiteral(node: ESBaseNode): node is ESTemplateLiteral;
export declare function isESTemplateElement(node: ESBaseNode): node is ESTemplateElement;
export declare function isESNode(node: unknown): node is ESNode;
export declare function isESCallExpression(node: ESBaseNode): node is ESCallExpression;
export declare function isESArrowFunctionExpression(node: ESBaseNode): node is ESArrowFunctionExpression;
export declare function isESFunctionExpression(node: ESBaseNode): node is ESFunctionExpression;
export declare function isESFunctionDeclaration(node: ESBaseNode): node is ESFunctionDeclaration;
export declare function isESAnonymousFunction(node: ESBaseNode): boolean;
export declare function isESArrowFunctionWithoutBody(node: ESBaseNode): node is ESArrowFunctionExpression;
export declare function isESReturnStatement(node: ESNode): boolean;
export declare function isESVariableDeclarator(node: ESBaseNode): node is ESVariableDeclarator;
export declare function hasESNodeParentExtension(node: ESBaseNode): node is Rule.Node & Rule.NodeParentExtension;
export declare function getESMatcherFunctions(matchers: SelectorMatcher[], options?: {
    isStringLikeNode?: (node: ESBaseNode) => boolean;
}): MatcherFunctions;
//# sourceMappingURL=es.d.ts.map