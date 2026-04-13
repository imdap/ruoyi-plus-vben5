import { AST, JSONParserOptions, RuleListener } from "jsonc-eslint-parser";
import { IDirective, TextSourceCodeBase, TraversalStep } from "@eslint/plugin-kit";
import { CursorWithCountOptionsWithComment, CursorWithCountOptionsWithFilter, CursorWithCountOptionsWithoutFilter, CursorWithSkipOptionsWithComment, CursorWithSkipOptionsWithFilter, CursorWithSkipOptionsWithoutFilter } from "@ota-meshi/ast-token-store";
import { AST as AST$1, Scope } from "eslint";
import * as core from "@eslint/core";
import { File, FileProblem, Language, NotOkParseResult, OkParseResult, RulesConfig } from "@eslint/core";
import { Comment } from "estree";

//#region lib/language/jsonc-source-code.d.ts
/**
 * A comment token with required range and loc.
 */
type JSONCComment = Comment & {
  range: [number, number];
  loc: AST.SourceLocation;
};
/**
 * JSONC-specific syntax element type
 */
type JSONCSyntaxElement = AST.JSONNode | JSONCTokenOrComment;
type JSONCToken = AST$1.Token;
type JSONCTokenOrComment = JSONCToken | JSONCComment;
/**
 * JSONC Source Code Object
 */
declare class JSONCSourceCode extends TextSourceCodeBase<{
  LangOptions: Record<never, never>;
  RootNode: AST.JSONProgram;
  SyntaxElementWithLoc: JSONCSyntaxElement;
  ConfigNode: JSONCComment;
}> {
  #private;
  readonly hasBOM: boolean;
  readonly parserServices: {
    isJSON?: boolean;
    parseError?: unknown;
  };
  readonly visitorKeys: Record<string, string[]>;
  private readonly tokenStore;
  /**
   * Creates a new instance.
   */
  constructor(config: {
    text: string;
    ast: AST.JSONProgram;
    hasBOM: boolean;
    parserServices: {
      isJSON: boolean;
      parseError?: unknown;
    };
    visitorKeys?: Record<string, string[]> | null | undefined;
  });
  traverse(): Iterable<TraversalStep>;
  /**
   * Gets all tokens and comments.
   */
  get tokensAndComments(): JSONCTokenOrComment[];
  getLines(): string[];
  getAllComments(): JSONCComment[];
  /**
   * Returns an array of all inline configuration nodes found in the source code.
   * This includes eslint-disable, eslint-enable, eslint-disable-line,
   * eslint-disable-next-line, and eslint (for inline config) comments.
   */
  getInlineConfigNodes(): JSONCComment[];
  /**
   * Returns directives that enable or disable rules along with any problems
   * encountered while parsing the directives.
   */
  getDisableDirectives(): {
    directives: IDirective[];
    problems: FileProblem[];
  };
  /**
   * Returns inline rule configurations along with any problems
   * encountered while parsing the configurations.
   */
  applyInlineConfig(): {
    configs: {
      config: {
        rules: RulesConfig;
      };
      loc: AST.SourceLocation;
    }[];
    problems: FileProblem[];
  };
  /**
   * Gets the source text for the given node or the entire source if no node is provided.
   */
  getText(node?: JSONCSyntaxElement, beforeCount?: number, afterCount?: number): string;
  getNodeByRangeIndex(index: number): AST.JSONNode | null;
  /**
   * Gets the first token of the given node.
   */
  getFirstToken(node: JSONCSyntaxElement): JSONCToken;
  /**
   * Gets the first token of the given node with options.
   */
  getFirstToken(node: JSONCSyntaxElement, options: CursorWithSkipOptionsWithoutFilter): JSONCToken | null;
  /**
   * Gets the first token of the given node with filter options.
   */
  getFirstToken<R extends JSONCToken>(node: JSONCSyntaxElement, options: CursorWithSkipOptionsWithFilter<JSONCToken, R>): R | null;
  /**
   * Gets the first token of the given node with comment options.
   */
  getFirstToken<R extends JSONCToken | JSONCComment>(node: JSONCSyntaxElement, options: CursorWithSkipOptionsWithComment<JSONCToken, JSONCComment, R>): R | null;
  /**
   * Gets the first tokens of the given node.
   */
  getFirstTokens(node: JSONCSyntaxElement, options?: CursorWithCountOptionsWithoutFilter): JSONCToken[];
  /**
   * Gets the first tokens of the given node with filter options.
   */
  getFirstTokens<R extends JSONCToken>(node: JSONCSyntaxElement, options: CursorWithCountOptionsWithFilter<JSONCToken, R>): R[];
  /**
   * Gets the first tokens of the given node with comment options.
   */
  getFirstTokens<R extends JSONCToken | JSONCComment>(node: JSONCSyntaxElement, options: CursorWithCountOptionsWithComment<JSONCToken, JSONCComment, R>): R[];
  /**
   * Gets the last token of the given node.
   */
  getLastToken(node: JSONCSyntaxElement): JSONCToken;
  /**
   * Gets the last token of the given node with options.
   */
  getLastToken(node: JSONCSyntaxElement, options: CursorWithSkipOptionsWithoutFilter): JSONCToken | null;
  /**
   * Gets the last token of the given node with filter options.
   */
  getLastToken<R extends JSONCToken>(node: JSONCSyntaxElement, options: CursorWithSkipOptionsWithFilter<JSONCToken, R>): R | null;
  /**
   * Gets the last token of the given node with comment options.
   */
  getLastToken<R extends JSONCToken | JSONCComment>(node: JSONCSyntaxElement, options: CursorWithSkipOptionsWithComment<JSONCToken, JSONCComment, R>): R | null;
  /**
   * Get the last tokens of the given node.
   */
  getLastTokens(node: JSONCSyntaxElement, options?: CursorWithCountOptionsWithoutFilter): JSONCToken[];
  /**
   * Get the last tokens of the given node with filter options.
   */
  getLastTokens<R extends JSONCToken>(node: JSONCSyntaxElement, options: CursorWithCountOptionsWithFilter<JSONCToken, R>): R[];
  /**
   * Get the last tokens of the given node with comment options.
   */
  getLastTokens<R extends JSONCToken | JSONCComment>(node: JSONCSyntaxElement, options: CursorWithCountOptionsWithComment<JSONCToken, JSONCComment, R>): R[];
  /**
   * Gets the token that precedes a given node or token.
   */
  getTokenBefore(node: JSONCSyntaxElement, options?: CursorWithSkipOptionsWithoutFilter): JSONCToken | null;
  /**
   * Gets the token that precedes a given node or token with filter options.
   */
  getTokenBefore<R extends JSONCToken>(node: JSONCSyntaxElement, options: CursorWithSkipOptionsWithFilter<JSONCToken, R>): R | null;
  /**
   * Gets the token that precedes a given node or token with comment options.
   */
  getTokenBefore<R extends JSONCToken | JSONCComment>(node: JSONCSyntaxElement, options: CursorWithSkipOptionsWithComment<JSONCToken, JSONCComment, R>): R | null;
  /**
   * Gets the `count` tokens that precedes a given node or token.
   */
  getTokensBefore(node: JSONCSyntaxElement, options?: CursorWithCountOptionsWithoutFilter): JSONCToken[];
  /**
   * Gets the `count` tokens that precedes a given node or token with filter options.
   */
  getTokensBefore<R extends JSONCToken>(node: JSONCSyntaxElement, options: CursorWithCountOptionsWithFilter<JSONCToken, R>): R[];
  /**
   * Gets the `count` tokens that precedes a given node or token with comment options.
   */
  getTokensBefore<R extends JSONCToken | JSONCComment>(node: JSONCSyntaxElement, options: CursorWithCountOptionsWithComment<JSONCToken, JSONCComment, R>): R[];
  /**
   * Gets the token that follows a given node or token.
   */
  getTokenAfter(node: JSONCSyntaxElement, options?: CursorWithSkipOptionsWithoutFilter): JSONCToken | null;
  /**
   * Gets the token that follows a given node or token with filter options.
   */
  getTokenAfter<R extends JSONCToken>(node: JSONCSyntaxElement, options: CursorWithSkipOptionsWithFilter<JSONCToken, R>): R | null;
  /**
   * Gets the token that follows a given node or token with comment options.
   */
  getTokenAfter<R extends JSONCToken | JSONCComment>(node: JSONCSyntaxElement, options: CursorWithSkipOptionsWithComment<JSONCToken, JSONCComment, R>): R | null;
  /**
   * Gets the `count` tokens that follows a given node or token.
   */
  getTokensAfter(node: JSONCSyntaxElement, options?: CursorWithCountOptionsWithoutFilter): JSONCToken[];
  /**
   * Gets the `count` tokens that follows a given node or token with filter options.
   */
  getTokensAfter<R extends JSONCToken>(node: JSONCSyntaxElement, options: CursorWithCountOptionsWithFilter<JSONCToken, R>): R[];
  /**
   * Gets the `count` tokens that follows a given node or token with comment options.
   */
  getTokensAfter<R extends JSONCToken | JSONCComment>(node: JSONCSyntaxElement, options: CursorWithCountOptionsWithComment<JSONCToken, JSONCComment, R>): R[];
  /**
   * Gets the first token between two non-overlapping nodes.
   */
  getFirstTokenBetween(left: JSONCSyntaxElement, right: JSONCSyntaxElement, options?: CursorWithSkipOptionsWithoutFilter): JSONCToken | null;
  /**
   * Gets the first token between two non-overlapping nodes with filter options.
   */
  getFirstTokenBetween<R extends JSONCToken>(left: JSONCSyntaxElement, right: JSONCSyntaxElement, options: CursorWithSkipOptionsWithFilter<JSONCToken, R>): R | null;
  /**
   * Gets the first token between two non-overlapping nodes with comment options.
   */
  getFirstTokenBetween<R extends JSONCToken | JSONCComment>(left: JSONCSyntaxElement, right: JSONCSyntaxElement, options: CursorWithSkipOptionsWithComment<JSONCToken, JSONCComment, R>): R | null;
  /**
   * Gets the first tokens between two non-overlapping nodes.
   */
  getFirstTokensBetween(left: JSONCSyntaxElement, right: JSONCSyntaxElement, options?: CursorWithCountOptionsWithoutFilter): JSONCToken[];
  /**
   * Gets the first tokens between two non-overlapping nodes with filter options.
   */
  getFirstTokensBetween<R extends JSONCToken>(left: JSONCSyntaxElement, right: JSONCSyntaxElement, options: CursorWithCountOptionsWithFilter<JSONCToken, R>): R[];
  /**
   * Gets the first tokens between two non-overlapping nodes with comment options.
   */
  getFirstTokensBetween<R extends JSONCToken | JSONCComment>(left: JSONCSyntaxElement, right: JSONCSyntaxElement, options: CursorWithCountOptionsWithComment<JSONCToken, JSONCComment, R>): R[];
  /**
   * Gets the last token between two non-overlapping nodes.
   */
  getLastTokenBetween(left: JSONCSyntaxElement, right: JSONCSyntaxElement, options?: CursorWithSkipOptionsWithoutFilter): JSONCToken | null;
  /**
   * Gets the last token between two non-overlapping nodes with filter options.
   */
  getLastTokenBetween<R extends JSONCToken>(left: JSONCSyntaxElement, right: JSONCSyntaxElement, options: CursorWithSkipOptionsWithFilter<JSONCToken, R>): R | null;
  /**
   * Gets the last token between two non-overlapping nodes with comment options.
   */
  getLastTokenBetween<R extends JSONCToken | JSONCComment>(left: JSONCSyntaxElement, right: JSONCSyntaxElement, options: CursorWithSkipOptionsWithComment<JSONCToken, JSONCComment, R>): R | null;
  /**
   * Gets the last tokens between two non-overlapping nodes.
   */
  getLastTokensBetween(left: JSONCSyntaxElement, right: JSONCSyntaxElement, options?: CursorWithCountOptionsWithoutFilter): JSONCToken[];
  /**
   * Gets the last tokens between two non-overlapping nodes with filter options.
   */
  getLastTokensBetween<R extends JSONCToken>(left: JSONCSyntaxElement, right: JSONCSyntaxElement, options: CursorWithCountOptionsWithFilter<JSONCToken, R>): R[];
  /**
   * Gets the last tokens between two non-overlapping nodes with comment options.
   */
  getLastTokensBetween<R extends JSONCToken | JSONCComment>(left: JSONCSyntaxElement, right: JSONCSyntaxElement, options: CursorWithCountOptionsWithComment<JSONCToken, JSONCComment, R>): R[];
  /**
   * Gets all tokens that are related to the given node.
   */
  getTokens(node: JSONCSyntaxElement, options?: CursorWithCountOptionsWithoutFilter): JSONCToken[];
  /**
   * Gets all tokens that are related to the given node with filter options.
   */
  getTokens<R extends JSONCToken>(node: JSONCSyntaxElement, options: CursorWithCountOptionsWithFilter<JSONCToken, R>): R[];
  /**
   * Gets all tokens that are related to the given node with comment options.
   */
  getTokens<R extends JSONCToken | JSONCComment>(node: JSONCSyntaxElement, options: CursorWithCountOptionsWithComment<JSONCToken, JSONCComment, R>): R[];
  /**
   * Gets all of the tokens between two non-overlapping nodes.
   */
  getTokensBetween(left: JSONCSyntaxElement, right: JSONCSyntaxElement, options?: CursorWithCountOptionsWithoutFilter): JSONCToken[];
  /**
   * Gets all of the tokens between two non-overlapping nodes with filter options.
   */
  getTokensBetween<R extends JSONCToken>(left: JSONCSyntaxElement, right: JSONCSyntaxElement, options: CursorWithCountOptionsWithFilter<JSONCToken, R>): R[];
  /**
   * Gets all of the tokens between two non-overlapping nodes with comment options.
   */
  getTokensBetween<R extends JSONCToken | JSONCComment>(left: JSONCSyntaxElement, right: JSONCSyntaxElement, options: CursorWithCountOptionsWithComment<JSONCToken, JSONCComment, R>): R[];
  getCommentsInside(nodeOrToken: JSONCSyntaxElement): JSONCComment[];
  getCommentsBefore(nodeOrToken: JSONCSyntaxElement): JSONCComment[];
  getCommentsAfter(nodeOrToken: JSONCSyntaxElement): JSONCComment[];
  commentsExistBetween(first: JSONCSyntaxElement, second: JSONCSyntaxElement): boolean;
  isSpaceBetween(first: JSONCToken | JSONCComment, second: JSONCToken | JSONCComment): boolean;
  /**
   * Compatibility for ESLint's SourceCode API
   * @deprecated JSONC does not have scopes
   */
  getScope(node?: AST.JSONNode): Scope.Scope | null;
  /**
   * Compatibility for ESLint's SourceCode API
   * @deprecated JSONC does not have scopes
   */
  get scopeManager(): Scope.ScopeManager | null;
  /**
   * Compatibility for ESLint's SourceCode API
   * @deprecated
   */
  isSpaceBetweenTokens(first: JSONCTokenOrComment, second: JSONCTokenOrComment): boolean;
  private _getChildren;
}
//#endregion
//#region lib/language/jsonc-language.d.ts
/**
 * Language options for JSONC.
 */
type JSONCLanguageOptions = {
  parserOptions?: JSONParserOptions;
};
type ParserMode = "JSON" | "JSONC" | "JSON5" | "EXTENDED";
type JSONCLanguageInstanceOptions = {
  mode?: ParserMode;
};
/**
 * The JSONC language implementation for ESLint.
 */
declare class JSONCLanguage implements Language<{
  LangOptions: JSONCLanguageOptions;
  Code: JSONCSourceCode;
  RootNode: AST.JSONProgram;
  Node: AST.JSONNode;
}> {
  /**
   * The type of file to read.
   */
  fileType: "text";
  /**
   * The line number at which the parser starts counting.
   */
  lineStart: 1;
  /**
   * The column number at which the parser starts counting.
   */
  columnStart: 0;
  /**
   * The name of the key that holds the type of the node.
   */
  nodeTypeKey: "type";
  private readonly _mode;
  constructor(options?: JSONCLanguageInstanceOptions);
  /**
   * Validates the language options.
   */
  validateLanguageOptions(_languageOptions: JSONCLanguageOptions): void;
  normalizeLanguageOptions(languageOptions: JSONCLanguageOptions): JSONCLanguageOptions;
  /**
   * Parses the given file into an AST.
   */
  parse(file: File, context: {
    languageOptions?: JSONCLanguageOptions;
  }): OkParseResult<AST.JSONProgram> | NotOkParseResult;
  /**
   * Creates a new SourceCode object for the given file and parse result.
   */
  createSourceCode(file: File, parseResult: OkParseResult<AST.JSONProgram>): JSONCSourceCode;
}
//#endregion
//#region lib/types.d.ts
interface RuleModule<RuleOptions extends unknown[] = unknown[]> extends core.RuleDefinition<{
  LangOptions: JSONCLanguageOptions;
  Code: JSONCSourceCode;
  RuleOptions: RuleOptions;
  Visitor: RuleListener;
  Node: AST.JSONNode;
  MessageIds: string;
  ExtRuleDocs: RuleMetaDocs;
}> {
  meta: RuleMetaData<RuleOptions>;
}
type RuleMetaDocs = {
  description: string;
  recommended: ("json" | "jsonc" | "json5")[] | null;
  url: string;
  ruleId: string;
  ruleName: string;
  default?: "error" | "warn";
  extensionRule: boolean | string | {
    plugin: string;
    url: string;
  };
  layout: boolean;
};
interface RuleMetaData<RuleOptions extends unknown[] = unknown[]> extends core.RulesMeta<string, RuleOptions, RuleMetaDocs> {
  docs: RuleMetaDocs;
}
//#endregion
export { JSONCSourceCode as a, JSONCComment as i, JSONCLanguage as n, JSONCToken as o, JSONCLanguageOptions as r, RuleModule as t };