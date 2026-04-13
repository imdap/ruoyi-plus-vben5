const nodeValueSymbol = Symbol.for('cspell.config.nodeValue');
export function isNodeValue(value) {
    if (!(typeof value === 'object' && value !== null))
        return false;
    if (nodeValueSymbol in value)
        return true;
    return 'value' in value && 'comment' in value && 'commentBefore' in value && Object.keys(value).length === 3;
}
export function createNodeValue(value, comment, commentBefore) {
    return {
        value,
        comment: comment ?? undefined,
        commentBefore: commentBefore ?? undefined,
        [nodeValueSymbol]: true,
    };
}
export function isCfgArrayNode(node) {
    return node?.type === 'array';
}
export function isCfgObjectNode(node) {
    return node?.type === 'object';
}
export function isCfgScalarNode(node) {
    return (node && node.type === 'scalar' && (typeof node.value !== 'object' || node.value === null)) || false;
}
//# sourceMappingURL=CfgTree.js.map