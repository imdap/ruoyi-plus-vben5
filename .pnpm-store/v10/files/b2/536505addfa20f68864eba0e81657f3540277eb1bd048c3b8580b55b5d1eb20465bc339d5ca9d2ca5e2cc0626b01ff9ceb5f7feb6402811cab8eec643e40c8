import type { MessageStyleOption } from "../options/schemas/common.js";
import type { BracesMeta, Literal, QuoteMeta } from "../types/ast.js";
import type { Warning } from "../types/async.js";
export declare function getWhitespace(classes: string): {
    leadingWhitespace: string | undefined;
    trailingWhitespace: string | undefined;
};
export declare function getQuotes(raw: string): QuoteMeta;
export declare function getContent(raw: string, quotes?: QuoteMeta, braces?: BracesMeta): string;
export declare function splitClasses(classes: string): string[];
export declare function deduplicateClasses(classes: string[]): string[];
export declare function display(messageStyle: MessageStyleOption["messageStyle"], classes: string): string;
/**
 * Augments a message with additional warnings and documentation links.
 *
 * @template Options
 * @param message The original message to augment.
 * @param docs The documentation URL to include.
 * @param warnings Any warnings to include in the message.
 * @returns The augmented message.
 */
export declare function augmentMessageWithWarnings<Options extends Record<string, any>>(message: string, docs: string, warnings?: (Warning<Options> | undefined)[]): string;
export declare function escapeMessage(messageStyle: MessageStyleOption["messageStyle"], message: string): string;
export declare function splitWhitespaces(classes: string): string[];
export declare function getIndentation(line: string): number;
export declare function isClassSticky(literal: Literal, classIndex: number): boolean;
export declare function getExactClassLocation(literal: Literal, startIndex: number, endIndex: number): {
    end: {
        column: number;
        line: number;
    };
    start: {
        column: number;
        line: number;
    };
};
export declare function matchesName(pattern: string, name: string | undefined): boolean;
export declare function replacePlaceholders(template: string, match: RegExpMatchArray | string[]): string;
export declare function addAttribute(name: string | undefined): (literal: Literal, index: number, literals: Literal[]) => Literal;
export declare function deduplicateLiterals(literal: Literal, index: number, literals: Literal[]): boolean;
export declare function createObjectPathElement(path?: string): string;
export interface GenericNodeWithParent {
    parent: Partial<GenericNodeWithParent>;
}
export declare function isGenericNodeWithParent(node: unknown): node is GenericNodeWithParent;
//# sourceMappingURL=utils.d.ts.map