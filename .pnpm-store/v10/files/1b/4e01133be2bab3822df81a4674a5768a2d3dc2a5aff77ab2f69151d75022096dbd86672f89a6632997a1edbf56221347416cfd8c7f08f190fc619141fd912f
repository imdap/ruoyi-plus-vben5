import Node from '../nodes/node/Node.js';
import * as PropertySymbol from '../PropertySymbol.js';
import type { TNodeFilter } from './TNodeFilter.js';
/**
 * The TreeWalker object represents the nodes of a document subtree and a position within them.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker
 * @see https://dom.spec.whatwg.org/#interface-treewalker
 */
export default class TreeWalker {
    #private;
    root: Node;
    whatToShow: number;
    filter: TNodeFilter | null;
    /**
     * Constructor.
     *
     * @param root Root.
     * @param [whatToShow] What to show.
     * @param [filter] Filter.
     */
    constructor(root: Node, whatToShow?: number, filter?: TNodeFilter | null);
    /**
     * Returns the current Node.
     *
     * @returns Current node.
     */
    get currentNode(): Node | null;
    /**
     * Sets the current Node.
     *
     * @param node Node.
     */
    set currentNode(node: Node | null);
    /**
     * Moves the current Node to the first visible ancestor node in the document order, and returns the found node. It also moves the current node to this one. If no such node exists, or if it is before that the root node defined at the object construction, returns null and the current node is not changed.
     *
     * @returns Current node.
     */
    parentNode(): Node | null;
    /**
     * Moves the current Node to the first visible child of the current node, and returns the found child. It also moves the current node to this child. If no such child exists, returns null and the current node is not changed.
     *
     * @returns Current node.
     */
    firstChild(): Node | null;
    /**
     * Moves the current Node to the last visible child of the current node, and returns the found child. It also moves the current node to this child. If no such child exists, null is returned and the current node is not changed.
     *
     * @returns Current node.
     */
    lastChild(): Node | null;
    /**
     * Moves the current Node to its next sibling, if any, and returns the found sibling. If there is no such node, null is returned and the current node is not changed.
     *
     * @returns Current node.
     */
    nextSibling(): Node | null;
    /**
     * Moves the current Node to its previous sibling, if any, and returns the found sibling. If there is no such node, return null and the current node is not changed.
     *
     * @returns Current node.
     */
    previousSibling(): Node | null;
    /**
     * Moves the current Node to the previous visible node in the document order, and returns the found node. It also moves the current node to this one. If no such node exists, or if it is before that the root node defined at the object construction, returns null and the current node is not changed.
     *
     * @returns Current node.
     */
    previousNode(): Node | null;
    /**
     * Moves the current Node to the next visible node in the document order.
     *
     * @returns Current node.
     */
    nextNode(): Node | null;
    /**
     * Filters a node.
     *
     * Based on solution:
     * https://gist.github.com/shawndumas/1132009.
     *
     * @param node Node.
     * @returns Child nodes.
     */
    [PropertySymbol.filterNode](node: Node): number;
}
//# sourceMappingURL=TreeWalker.d.ts.map