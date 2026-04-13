declare const commentCollectionNode: unique symbol;
export interface NodeComments {
    comment?: Comment | undefined;
    commentBefore?: Comment | undefined;
}
export interface CommentedBaseNode extends NodeComments {
    [commentCollectionNode]?: CommentedCollectionNode | undefined;
}
export interface CommentedScalar<T> extends CommentedBaseNode {
    readonly value: T;
    set(value: T): void;
}
export type ScalarNumber = CommentedScalar<number>;
export type ScalarString = CommentedScalar<string>;
export type ScalarBoolean = CommentedScalar<boolean>;
export type ScalarUndefined = CommentedScalar<undefined>;
export type ScalarNull = CommentedScalar<null>;
export interface Comment {
    comment: string;
    block?: boolean | undefined;
}
export type CommentedNode<T> = T extends number | string | boolean | null | undefined ? CommentedScalar<T> : T extends [] ? CommentedArrayNode<T[number]> : T extends object ? CommentedRecordNode<T> : never;
export interface CommentedCollectionNode extends CommentedBaseNode {
    /**
     * Check if a node exists in the collection.
     * @param n - node to check for.
     * @returns true if the node is in the collection.
     */
    has(n: CommentedBaseNode): boolean;
    /**
     * Remove a node from the collection.
     * @param n - node to remove
     * @returns true if the node was removed
     */
    remove(n: CommentedBaseNode): boolean;
    /**
     * The number of items in the collection.
     */
    readonly size: number;
}
type ChildNode<T> = CommentedNode<T>;
export interface CommentedArrayNode<T> extends CommentedCollectionNode, Iterable<CommentedNode<T>> {
    readonly value: T[];
    readonly items: ChildNode<T>[];
    get(index: number): ChildNode<T> | undefined;
    set(index: number, value: T | CommentedNode<T>): void;
    add(value: T | CommentedNode<T>): void;
}
export interface CommentedRecordNode<T> extends CommentedCollectionNode, Iterable<[keyof T, CommentedNode<T[keyof T]>]> {
    readonly value: T;
    readonly items: [keyof T, ChildNode<T[keyof T]>][];
    get<K extends keyof T>(key: K): ChildNode<T[K]> | undefined;
    set<K extends keyof T>(key: K, value: T[K] | CommentedNode<T[K]>): void;
}
export declare function createCommentedScalar(value: number, comments?: NodeComments): ScalarNode<number>;
export declare function createCommentedScalar(value: string, comments?: NodeComments): ScalarNode<string>;
export declare function createCommentedScalar(value: boolean, comments?: NodeComments): ScalarNode<boolean>;
export declare function createCommentedScalar(value: null, comments?: NodeComments): ScalarNode<null>;
export declare function createCommentedScalar(value: undefined, comments?: NodeComments): ScalarNode<undefined>;
export declare function createCommentedScalar<T>(value: T, comments?: NodeComments): ScalarNode<T>;
export declare function isCommentedBaseNode(node: unknown): node is CommentedBaseNode;
export declare function isCommentedScalar(node: unknown): node is CommentedScalar<unknown>;
export declare function isCommentedNode<T>(value: T | CommentedNode<T>): value is CommentedNode<T>;
declare class BaseNode {
    parent?: CommentedCollectionNode | undefined;
    comment?: Comment | undefined;
    commentBefore?: Comment | undefined;
    constructor(comments?: NodeComments);
}
declare class ScalarNode<T> extends BaseNode implements CommentedScalar<T> {
    value: T;
    constructor(value: T, comments?: NodeComments);
    set(value: T): void;
    toJSON(): T;
}
export declare function createCommentedNode<T>(value: T, comments?: NodeComments): CommentedNode<T>;
export {};
//# sourceMappingURL=Commented.d.ts.map