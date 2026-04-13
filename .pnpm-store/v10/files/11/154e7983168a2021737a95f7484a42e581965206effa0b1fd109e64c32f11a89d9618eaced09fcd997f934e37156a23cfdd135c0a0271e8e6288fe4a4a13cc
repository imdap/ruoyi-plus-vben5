import type Node from '../nodes/node/Node.js';
import type MutationTypeEnum from './MutationTypeEnum.js';
/**
 * MutationRecord is a model for a mutation.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MutationRecord
 */
export default class MutationRecord {
    type: string;
    target: Node;
    addedNodes: Node[];
    removedNodes: Node[];
    previousSibling: Node | null;
    nextSibling: Node | null;
    attributeName: string | null;
    attributeNamespace: string | null;
    oldValue: string | null;
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
    constructor(init: {
        type: MutationTypeEnum;
        target: Node;
        addedNodes?: Node[];
        removedNodes?: Node[];
        previousSibling?: Node | null;
        nextSibling?: Node | null;
        attributeName?: string | null;
        attributeNamespace?: string | null;
        oldValue?: string | null;
    });
}
//# sourceMappingURL=MutationRecord.d.ts.map