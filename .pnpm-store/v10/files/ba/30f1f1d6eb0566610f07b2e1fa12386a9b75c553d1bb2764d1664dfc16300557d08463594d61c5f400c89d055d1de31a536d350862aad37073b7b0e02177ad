import { Command, CommandReportDescriptor, CommandReportErrorCauseDescriptor, FindNodeOptions, Linter, MessageIds, RuleOptions, Tree } from "./types.mjs";

//#region src/traverse.d.ts
interface TraversePath {
  node: Tree.Node;
  parent: Tree.Node | null;
  parentKey: string | null;
  parentPath: TraversePath | null;
}
type TraverseVisitor = (path: TraversePath, symbols: {
  SKIP: symbol;
  STOP: symbol;
}) => symbol | void;
//#endregion
//#region src/context.d.ts
declare class CommandContext {
  /**
   * The ESLint RuleContext
   */
  readonly context: Linter.RuleContext<MessageIds, RuleOptions>;
  /**
   * The comment node that triggered the command
   */
  readonly comment: Tree.Comment;
  /**
   * Command that triggered the context
   */
  readonly command: Command;
  /**
   * Alias for `this.context.sourceCode`
   */
  readonly source: Linter.SourceCode;
  /**
   * Regexp matches
   */
  readonly matches: RegExpMatchArray;
  constructor(context: Linter.RuleContext<MessageIds, RuleOptions>, comment: Tree.Comment, command: Command, matches: RegExpMatchArray);
  /**
   * A shorthand of `this.context.sourceCode.getText(node)`
   *
   * When `node` is `null` or `undefined`, it returns an empty string
   */
  getTextOf(node?: Tree.Node | Tree.Token | Tree.Range | null): string;
  /**
   * Report an ESLint error on the triggering comment, without fix
   */
  reportError(message: string, ...causes: CommandReportErrorCauseDescriptor[]): void;
  /**
   * Report an ESLint error.
   * Different from normal `context.report` as that it requires `message` instead of `messageId`.
   */
  report(descriptor: CommandReportDescriptor): void;
  /**
   * Utility to traverse the AST starting from a node
   */
  traverse(node: Tree.Node, cb: TraverseVisitor): boolean;
  /**
   * Find specific node within the line below the comment
   *
   * Override 1: Find the fist node of a specific type with rest parameters
   */
  findNodeBelow<T extends Tree.Node['type']>(...keys: (T | `${T}`)[]): Extract<Tree.Node, {
    type: T;
  }> | undefined;
  /**
   * Find specific node within the line below the comment
   *
   * Override 2: Find the first matched node with a custom filter function
   */
  findNodeBelow(filter: ((node: Tree.Node) => boolean)): Tree.Node | undefined;
  /**
   * Find specific node within the line below the comment
   *
   * Override 3: Find all match with full options (returns an array)
   */
  findNodeBelow<T extends Tree.Node['type']>(options: FindNodeOptions<T, true>): Extract<Tree.Node, {
    type: T;
  }>[] | undefined;
  /**
   * Find specific node within the line below the comment
   *
   * Override 4: Find one match with full options
   */
  findNodeBelow<T extends Tree.Node['type']>(options: FindNodeOptions<T>): Extract<Tree.Node, {
    type: T;
  }> | undefined;
  /**
   * Get the parent block of the triggering comment
   */
  getParentBlock(): Tree.BlockStatement | Tree.Program;
  /**
   * Get indent string of a specific line
   */
  getIndentOfLine(line: number): string;
}
//#endregion
export { CommandContext as t };