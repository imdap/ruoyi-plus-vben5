/**
 * MutationRecord is a model for a mutation.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MutationRecord
 */
export default class MutationRecord {
    type;
    target;
    addedNodes;
    removedNodes;
    previousSibling;
    nextSibling;
    attributeName;
    attributeNamespace;
    oldValue;
    /**
     * Constructor.
     *
     * @param init Options to initialize the mutation record.
     * @param init.type Type.
     * @param init.target Target node.
     * @param init.addedNodes Nodes added.
     * @param init.removedNodes Nodes removed.
     * @param init.previousSibling Previous sibling node.
     * @param init.nextSibling Next sibling node.
     * @param init.attributeName Name of the attribute.
     * @param init.attributeNamespace Namespace of the attribute.
     * @param init.oldValue Previous value of the attribute.
     */
    constructor(init) {
        this.type = init.type;
        this.target = init.target;
        this.addedNodes = init.addedNodes || [];
        this.removedNodes = init.removedNodes || [];
        this.previousSibling = init.previousSibling || null;
        this.nextSibling = init.nextSibling || null;
        this.attributeName = init.attributeName || null;
        this.attributeNamespace = init.attributeNamespace || null;
        this.oldValue = init.oldValue || null;
    }
}
//# sourceMappingURL=MutationRecord.js.map