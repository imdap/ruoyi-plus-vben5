import { VisitorKeys as VisitorKeys$1 } from "eslint-visitor-keys";
import * as eslint from "eslint";
import { AST, SourceCode } from "eslint";
import { Comment } from "estree";
import { AST as AST$1 } from "jsonc-eslint-parser";

//#region src/parser/ast.d.ts
declare namespace ast_d_exports {
  export { JSONArrayExpression, JSONBigIntLiteral, JSONBinaryExpression, JSONExpression, JSONExpressionStatement, JSONIdentifier, JSONKeywordLiteral, JSONLiteral, JSONNode, JSONNumberIdentifier, JSONNumberLiteral, JSONObjectExpression, JSONProgram, JSONProperty, JSONRegExpLiteral, JSONStringLiteral, JSONTemplateElement, JSONTemplateLiteral, JSONUnaryExpression, JSONUndefinedIdentifier, Locations, Position, SourceLocation };
}
interface Locations {
  loc: SourceLocation;
  range: [number, number];
}
interface BaseJSONNode extends Locations {
  type: string;
}
interface SourceLocation {
  start: Position;
  end: Position;
}
interface Position {
  /** >= 1 */
  line: number;
  /** >= 0 */
  column: number;
}
type JSONNode = JSONProgram | JSONExpressionStatement | JSONExpression | JSONProperty | JSONIdentifier | JSONTemplateLiteral | JSONTemplateElement;
interface JSONProgram extends BaseJSONNode {
  type: "Program";
  body: [JSONExpressionStatement];
  comments: Comment[];
  tokens: AST.Token[];
  parent: null;
}
interface JSONExpressionStatement extends BaseJSONNode {
  type: "JSONExpressionStatement";
  expression: JSONExpression;
  parent: JSONProgram;
}
type JSONExpression = JSONArrayExpression | JSONObjectExpression | JSONLiteral | JSONUnaryExpression | JSONNumberIdentifier | JSONUndefinedIdentifier | JSONTemplateLiteral | JSONBinaryExpression;
interface JSONArrayExpression extends BaseJSONNode {
  type: "JSONArrayExpression";
  elements: (JSONExpression | null)[];
  parent: JSONArrayExpression | JSONProperty | JSONExpressionStatement;
}
interface JSONObjectExpression extends BaseJSONNode {
  type: "JSONObjectExpression";
  properties: JSONProperty[];
  parent: JSONArrayExpression | JSONProperty | JSONExpressionStatement;
}
interface JSONProperty extends BaseJSONNode {
  type: "JSONProperty";
  key: JSONIdentifier | JSONStringLiteral | JSONNumberLiteral;
  value: JSONExpression;
  kind: "init";
  method: false;
  shorthand: false;
  computed: false;
  parent: JSONObjectExpression;
}
interface JSONIdentifier extends BaseJSONNode {
  type: "JSONIdentifier";
  name: string;
  parent?: JSONArrayExpression | JSONProperty | JSONExpressionStatement | JSONUnaryExpression;
}
interface JSONNumberIdentifier extends JSONIdentifier {
  name: "Infinity" | "NaN";
}
interface JSONUndefinedIdentifier extends JSONIdentifier {
  name: "undefined";
}
interface JSONLiteralBase extends BaseJSONNode {
  type: "JSONLiteral";
  raw: string;
  parent?: JSONArrayExpression | JSONProperty | JSONExpressionStatement | JSONUnaryExpression | JSONBinaryExpression;
}
interface JSONStringLiteral extends JSONLiteralBase {
  value: string;
  regex: null;
  bigint: null;
}
interface JSONNumberLiteral extends JSONLiteralBase {
  value: number;
  regex: null;
  bigint: null;
}
interface JSONKeywordLiteral extends JSONLiteralBase {
  value: boolean | null;
  regex: null;
  bigint: null;
}
interface JSONRegExpLiteral extends JSONLiteralBase {
  value: null;
  regex: {
    pattern: string;
    flags: string;
  };
  bigint: null;
}
interface JSONBigIntLiteral extends JSONLiteralBase {
  value: null;
  regex: null;
  bigint: string;
}
type JSONLiteral = JSONStringLiteral | JSONNumberLiteral | JSONKeywordLiteral | JSONRegExpLiteral | JSONBigIntLiteral;
interface JSONUnaryExpression extends BaseJSONNode {
  type: "JSONUnaryExpression";
  operator: "-" | "+";
  prefix: true;
  argument: JSONNumberLiteral | JSONNumberIdentifier;
  parent: JSONArrayExpression | JSONProperty | JSONExpressionStatement;
}
interface JSONTemplateLiteral extends BaseJSONNode {
  type: "JSONTemplateLiteral";
  quasis: [JSONTemplateElement];
  expressions: [];
  parent: JSONArrayExpression | JSONProperty | JSONExpressionStatement;
}
interface JSONTemplateElement extends BaseJSONNode {
  type: "JSONTemplateElement";
  tail: boolean;
  value: {
    cooked: string;
    raw: string;
  };
  parent: JSONTemplateLiteral;
}
interface JSONBinaryExpression extends BaseJSONNode {
  type: "JSONBinaryExpression";
  operator: "-" | "+" | "*" | "/" | "%" | "**";
  left: JSONNumberLiteral | JSONUnaryExpression | JSONBinaryExpression;
  right: JSONNumberLiteral | JSONUnaryExpression | JSONBinaryExpression;
  parent: JSONArrayExpression | JSONProperty | JSONExpressionStatement | JSONUnaryExpression | JSONBinaryExpression;
}
//#endregion
//#region src/parser/parser-options.d.ts
type ParserOptions = {
  jsonSyntax?: "JSON" | "json" | "JSONC" | "jsonc" | "JSON5" | "json5" | null;
};
//#endregion
//#region src/parser/parser.d.ts
/**
 * Parse JSON source code
 */
declare function parseJSON(code: string, options?: ParserOptions): JSONProgram;
/**
 * Parse source code
 */
declare function parseForESLint(code: string, options?: ParserOptions): {
  ast: JSONProgram;
  visitorKeys: SourceCode.VisitorKeys;
  services: {
    isJSON: boolean;
  };
};
//#endregion
//#region src/parser/tokenizer.d.ts
/**
 * Tokenizes the given code.
 * @param code The code to tokenize.
 * @param options The options to use for tokenization.
 * @private
 */
declare function tokenize(code: string, options?: ParserOptions & {
  includeComments?: false | null | undefined;
}): AST.Token[];
/**
 * Tokenizes the given code.
 * @param code The code to tokenize.
 * @param options The options to use for tokenization.
 * @private
 */
declare function tokenize(code: string, options: ParserOptions & {
  includeComments: true;
}): (AST.Token | Comment)[];
//#endregion
//#region src/parser/traverse.d.ts
interface Visitor<N> {
  visitorKeys?: VisitorKeys$1;
  enterNode(node: N, parent: N | null): void;
  leaveNode(node: N, parent: N | null): void;
}
declare function traverseNodes(node: JSONNode, visitor: Visitor<JSONNode>): void;
//#endregion
//#region src/utils/ast.d.ts
/**
 * Checks if given node is JSONExpression
 */
declare function isExpression<N extends JSONNode>(node: N): node is N & JSONExpression;
/**
 * Checks if given node is JSONNumberIdentifier
 */
declare function isNumberIdentifier(node: JSONIdentifier): node is JSONNumberIdentifier;
/**
 * Checks if given node is JSONUndefinedIdentifier
 */
declare function isUndefinedIdentifier(node: JSONIdentifier): node is JSONUndefinedIdentifier;
type JSONValue = string | number | boolean | null | undefined | JSONObjectValue | JSONValue[] | RegExp | bigint;
type JSONObjectValue = {
  [key: string]: JSONValue;
};
declare function getStaticJSONValue(node: JSONUnaryExpression | JSONNumberIdentifier | JSONNumberLiteral | JSONBinaryExpression): number;
declare function getStaticJSONValue(node: JSONUndefinedIdentifier): undefined;
declare function getStaticJSONValue(node: JSONTemplateLiteral | JSONTemplateElement | JSONStringLiteral): string;
declare function getStaticJSONValue(node: JSONKeywordLiteral): boolean | null;
declare function getStaticJSONValue(node: JSONRegExpLiteral): RegExp;
declare function getStaticJSONValue(node: JSONBigIntLiteral): bigint;
declare function getStaticJSONValue(node: JSONLiteral): string | number | boolean | RegExp | bigint | null;
declare function getStaticJSONValue(node: Exclude<JSONExpression, JSONObjectExpression | JSONArrayExpression>): Exclude<JSONValue, JSONObjectValue | JSONValue[]>;
declare function getStaticJSONValue(node: JSONObjectExpression): JSONObjectValue;
declare function getStaticJSONValue(node: JSONArrayExpression): JSONValue[];
declare function getStaticJSONValue(node: JSONExpression | JSONExpressionStatement | JSONProgram | JSONNode): JSONValue;
declare namespace meta_d_exports {
  export { name, version };
}
declare const name: string;
declare const version: string;
//#endregion
//#region src/types.d.ts
type JSONSyntax = "JSON" | "JSONC" | "JSON5" | null;
interface JSONParserOptions {
  jsonSyntax?: JSONSyntax;
}
type RuleFunction<Node extends AST$1.JSONNode = any> = (node: Node) => void;
type BuiltInRuleListeners = { [Node in AST$1.JSONNode as Node["type"]]?: RuleFunction<Node> };
type BuiltInRuleListenerExits = { [Node in AST$1.JSONNode as `${Node["type"]}:exit`]?: RuleFunction<Node> };
interface RuleListener extends BuiltInRuleListeners, BuiltInRuleListenerExits {
  [key: string]: RuleFunction | undefined;
}
//#endregion
//#region src/index.d.ts
declare const VisitorKeys: eslint.SourceCode.VisitorKeys;
//#endregion
export { type ast_d_exports as AST, BuiltInRuleListenerExits, BuiltInRuleListeners, JSONParserOptions, JSONSyntax, RuleFunction, RuleListener, VisitorKeys, getStaticJSONValue, isExpression, isNumberIdentifier, isUndefinedIdentifier, meta_d_exports as meta, name, parseForESLint, parseJSON, tokenize, traverseNodes };