import EventTarget from '../../event/EventTarget.js';
import * as PropertySymbol from '../../PropertySymbol.js';
import type Document from '../document/Document.js';
import type Element from '../element/Element.js';
import NodeTypeEnum from './NodeTypeEnum.js';
import NodeDocumentPositionEnum from './NodeDocumentPositionEnum.js';
import NodeList from './NodeList.js';
import MutationRecord from '../../mutation-observer/MutationRecord.js';
import type IMutationListener from '../../mutation-observer/IMutationListener.js';
import type ICachedQuerySelectorAllResult from './ICachedQuerySelectorAllResult.js';
import type ICachedQuerySelectorResult from './ICachedQuerySelectorResult.js';
import type ICachedMatchesResult from './ICachedMatchesResult.js';
import type ICachedElementsByTagNameResult from './ICachedElementsByTagNameResult.js';
import type ICachedElementByTagNameResult from './ICachedElementByTagNameResult.js';
import type ICachedComputedStyleResult from './ICachedComputedStyleResult.js';
import type ICachedResult from './ICachedResult.js';
import type ICachedElementByIdResult from './ICachedElementByIdResult.js';
import type HTMLStyleElement from '../html-style-element/HTMLStyleElement.js';
import type HTMLFormElement from '../html-form-element/HTMLFormElement.js';
import type HTMLSelectElement from '../html-select-element/HTMLSelectElement.js';
import type HTMLTextAreaElement from '../html-text-area-element/HTMLTextAreaElement.js';
import type HTMLSlotElement from '../html-slot-element/HTMLSlotElement.js';
import type SVGStyleElement from '../svg-style-element/SVGStyleElement.js';
/**
 * Node.
 */
export default class Node extends EventTarget {
    [PropertySymbol.ownerDocument]: Document;
    static readonly ELEMENT_NODE = NodeTypeEnum.elementNode;
    static readonly ATTRIBUTE_NODE = NodeTypeEnum.attributeNode;
    static readonly TEXT_NODE = NodeTypeEnum.textNode;
    static readonly CDATA_SECTION_NODE = NodeTypeEnum.cdataSectionNode;
    static readonly COMMENT_NODE = NodeTypeEnum.commentNode;
    static readonly DOCUMENT_NODE = NodeTypeEnum.documentNode;
    static readonly DOCUMENT_TYPE_NODE = NodeTypeEnum.documentTypeNode;
    static readonly DOCUMENT_FRAGMENT_NODE = NodeTypeEnum.documentFragmentNode;
    static readonly PROCESSING_INSTRUCTION_NODE = NodeTypeEnum.processingInstructionNode;
    static readonly DOCUMENT_POSITION_CONTAINED_BY = NodeDocumentPositionEnum.containedBy;
    static readonly DOCUMENT_POSITION_CONTAINS = NodeDocumentPositionEnum.contains;
    static readonly DOCUMENT_POSITION_DISCONNECTED = NodeDocumentPositionEnum.disconnect;
    static readonly DOCUMENT_POSITION_FOLLOWING = NodeDocumentPositionEnum.following;
    static readonly DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = NodeDocumentPositionEnum.implementationSpecific;
    static readonly DOCUMENT_POSITION_PRECEDING = NodeDocumentPositionEnum.preceding;
    readonly ELEMENT_NODE: NodeTypeEnum;
    readonly ATTRIBUTE_NODE: NodeTypeEnum;
    readonly TEXT_NODE: NodeTypeEnum;
    readonly CDATA_SECTION_NODE: NodeTypeEnum;
    readonly COMMENT_NODE: NodeTypeEnum;
    readonly DOCUMENT_NODE: NodeTypeEnum;
    readonly DOCUMENT_TYPE_NODE: NodeTypeEnum;
    readonly DOCUMENT_FRAGMENT_NODE: NodeTypeEnum;
    readonly PROCESSING_INSTRUCTION_NODE: NodeTypeEnum;
    readonly DOCUMENT_POSITION_CONTAINED_BY: NodeDocumentPositionEnum;
    readonly DOCUMENT_POSITION_CONTAINS: NodeDocumentPositionEnum;
    readonly DOCUMENT_POSITION_DISCONNECTED: NodeDocumentPositionEnum;
    readonly DOCUMENT_POSITION_FOLLOWING: NodeDocumentPositionEnum;
    readonly DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: NodeDocumentPositionEnum;
    readonly DOCUMENT_POSITION_PRECEDING: NodeDocumentPositionEnum;
    [PropertySymbol.isConnected]: boolean;
    [PropertySymbol.parentNode]: Node | null;
    [PropertySymbol.rootNode]: Node | null;
    [PropertySymbol.styleNode]: HTMLStyleElement | SVGStyleElement | null;
    [PropertySymbol.textAreaNode]: HTMLTextAreaElement | null;
    [PropertySymbol.formNode]: HTMLFormElement | null;
    [PropertySymbol.selectNode]: HTMLSelectElement | null;
    [PropertySymbol.mutationListeners]: IMutationListener[];
    [PropertySymbol.nodeArray]: Node[];
    [PropertySymbol.elementArray]: Element[];
    [PropertySymbol.childNodes]: NodeList<Node> | null;
    [PropertySymbol.assignedToSlot]: HTMLSlotElement | null;
    [PropertySymbol.cache]: {
        querySelector: Map<string, ICachedQuerySelectorResult>;
        querySelectorAll: Map<string, ICachedQuerySelectorAllResult>;
        matches: Map<string, ICachedMatchesResult>;
        elementsByTagName: Map<string, ICachedElementsByTagNameResult>;
        elementsByTagNameNS: Map<string, ICachedElementsByTagNameResult>;
        elementByTagName: Map<string, ICachedElementByTagNameResult>;
        elementById: Map<string, ICachedElementByIdResult>;
        computedStyle: ICachedComputedStyleResult | null;
    };
    [PropertySymbol.affectsCache]: ICachedResult[];
    [PropertySymbol.proxy]: Element | null;
    [PropertySymbol.nodeType]: NodeTypeEnum;
    /**
     * Constructor.
     */
    constructor();
    /**
     * Returns `Symbol.toStringTag`.
     *
     * @returns `Symbol.toStringTag`.
     */
    get [Symbol.toStringTag](): string;
    /**
     * Returns connected state.
     *
     * @returns Connected state.
     */
    get isConnected(): boolean;
    /**
     * Returns owner document.
     *
     * @returns Owner document.
     */
    get ownerDocument(): Document;
    /**
     * Returns parent node.
     *
     * @returns Parent node.
     */
    get parentNode(): Node | null;
    /**
     * Returns node type.
     *
     * @returns Node type.
     */
    get nodeType(): number;
    /**
     * Get child nodes.
     *
     * @returns Child nodes list.
     */
    get childNodes(): NodeList<Node>;
    /**
     * Get text value of children.
     *
     * @returns Text content.
     */
    get textContent(): string;
    /**
     * Sets text content.
     *
     * @param _textContent Text content.
     */
    set textContent(_textContent: string);
    /**
     * Node value.
     *
     * @returns Node value.
     */
    get nodeValue(): string | null;
    /**
     * Sets node value.
     */
    set nodeValue(_nodeValue: string);
    /**
     * Node name.
     *
     * @returns Node name.
     */
    get nodeName(): string;
    /**
     * Previous sibling.
     *
     * @returns Node.
     */
    get previousSibling(): Node | null;
    /**
     * Next sibling.
     *
     * @returns Node.
     */
    get nextSibling(): Node | null;
    /**
     * First child.
     *
     * @returns Node.
     */
    get firstChild(): Node | null;
    /**
     * Last child.
     *
     * @returns Node.
     */
    get lastChild(): Node | null;
    /**
     * Returns parent element.
     *
     * @returns Element.
     */
    get parentElement(): Element | null;
    /**
     * Returns base URI.
     *
     * @returns Base URI.
     */
    get baseURI(): string;
    /**
     * Returns "true" if the node has child nodes.
     *
     * @returns "true" if the node has child nodes.
     */
    hasChildNodes(): boolean;
    /**
     * Returns "true" if this node contains the other node.
     *
     * @param otherNode Node to test with.
     * @returns "true" if this node contains the other node.
     */
    contains(otherNode: Node): boolean;
    /**
     * Returns closest root node (Document or ShadowRoot).
     *
     * @param options Options.
     * @param options.composed A Boolean that indicates whether the shadow root should be returned (false, the default), or a root node beyond shadow root (true).
     * @returns Node.
     */
    getRootNode(options?: {
        composed: boolean;
    }): Node;
    /**
     * Clones a node.
     *
     * @param [deep=false] "true" to clone deep.
     * @returns Cloned node.
     */
    cloneNode(deep?: boolean): Node;
    /**
     * Append a child node to childNodes.
     *
     * @param  node Node to append.
     * @returns Appended node.
     */
    appendChild(node: Node): Node;
    /**
     * Remove Child element from childNodes array.
     *
     * @param node Node to remove.
     * @returns Removed node.
     */
    removeChild(node: Node): Node;
    /**
     * Inserts a node before another.
     *
     * @param newNode Node to insert.
     * @param referenceNode Node to insert before.
     * @returns Inserted node.
     */
    insertBefore(newNode: Node, referenceNode: Node | null): Node;
    /**
     * Replaces a node with another.
     *
     * @param newChild New child.
     * @param oldChild Old child.
     * @returns Replaced node.
     */
    replaceChild(newChild: Node, oldChild: Node): Node;
    /**
     * Clones a node.
     *
     * @param [deep=false] "true" to clone deep.
     * @returns Cloned node.
     */
    [PropertySymbol.cloneNode](deep?: boolean): Node;
    /**
     * Append a child node to childNodes.
     *
     * @param  node Node to append.
     * @param [disableValidations=false] "true" to disable validations.
     * @returns Appended node.
     */
    [PropertySymbol.appendChild](node: Node, disableValidations?: boolean): Node;
    /**
     * Remove Child element from childNodes array.
     *
     * @param node Node to remove.
     * @returns Removed node.
     */
    [PropertySymbol.removeChild](node: Node): Node;
    /**
     * Inserts a node before another.
     *
     * @param newNode Node to insert.
     * @param referenceNode Node to insert before.
     * @param [disableValidations=false] "true" to disable validations.
     * @returns Inserted node.
     */
    [PropertySymbol.insertBefore](newNode: Node, referenceNode: Node | null, disableValidations?: boolean): Node;
    /**
     * Replaces a node with another.
     *
     * @param newChild New child.
     * @param oldChild Old child.
     * @returns Replaced node.
     */
    [PropertySymbol.replaceChild](newChild: Node, oldChild: Node): Node;
    /**
     * Compares two nodes.
     * Two nodes are equal if they have the same type, defining the same attributes, and so on.
     *
     * @param node  Node to compare.
     * @returns boolean - `true` if two nodes are equal.
     */
    isEqualNode(node: Node): boolean;
    /**
     * Converts the node to a string.
     *
     * @param listener Listener.
     */
    toString(): string;
    /**
     * Observeres mutations on the node.
     *
     * Used by MutationObserver and internal logic.
     *
     * @param listener Listener.
     */
    [PropertySymbol.observeMutations](listener: IMutationListener): void;
    /**
     * Stops observing mutations on the node.
     *
     * Used by MutationObserver and internal logic.
     *
     * @param listener Listener.
     */
    [PropertySymbol.unobserveMutations](listener: IMutationListener): void;
    /**
     * Reports a mutation on the node.
     *
     * Used by MutationObserver and internal logic.
     *
     * @param record Mutation record.
     */
    [PropertySymbol.reportMutation](record: MutationRecord): void;
    /**
     * Clears query selector cache.
     */
    [PropertySymbol.clearCache](): void;
    /**
     * Called when connected to a node.
     */
    [PropertySymbol.connectedToNode](): void;
    /**
     * Called when disconnected from a node.
     */
    [PropertySymbol.disconnectedFromNode](): void;
    /**
     * Called when connected to document.
     */
    [PropertySymbol.connectedToDocument](): void;
    /**
     * Called when disconnected from document.
     */
    [PropertySymbol.disconnectedFromDocument](): void;
    /**
     * @override
     */
    [PropertySymbol.destroy](): void;
    /**
     * Reports the position of its argument node relative to the node on which it is called.
     *
     * @see https://dom.spec.whatwg.org/#dom-node-comparedocumentposition
     * @param otherNode Other node.
     */
    compareDocumentPosition(otherNode: Node): number;
    /**
     * Normalizes the sub-tree of the node, i.e. joins adjacent text nodes, and
     * removes all empty text nodes.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/normalize
     */
    normalize(): void;
    /**
     * Determines whether the given node is equal to the current node.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Node/isSameNode
     * @param node Node to check.
     * @returns True if the given node is equal to the current node, otherwise false.
     */
    isSameNode(node: Node): boolean;
}
//# sourceMappingURL=Node.d.ts.map