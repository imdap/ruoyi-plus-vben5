import assert from 'node:assert';
const commentCollectionNode = Symbol.for('CommentedCollectionNode');
export function createCommentedScalar(value, comments) {
    return new ScalarNode(value, comments);
}
export function isCommentedBaseNode(node) {
    return node instanceof BaseNode;
}
export function isCommentedScalar(node) {
    return node instanceof ScalarNode;
}
export function isCommentedNode(value) {
    return isCommentedBaseNode(value);
}
class BaseNode {
    parent;
    comment;
    commentBefore;
    constructor(comments) {
        this.comment = comments?.comment;
        this.commentBefore = comments?.commentBefore;
    }
}
class ScalarNode extends BaseNode {
    value;
    constructor(value, comments) {
        super(comments);
        this.value = value;
    }
    set(value) {
        this.value = value;
    }
    toJSON() {
        return this.value;
    }
}
class CollectionNode extends BaseNode {
}
class ArrayNode extends CollectionNode {
    items;
    constructor(items, comments) {
        super(comments);
        this.items = items.map((item) => adoptChildNode(item, this));
    }
    get value() {
        return this.items.map((item) => item.value);
    }
    get size() {
        return this.items.length;
    }
    has(n) {
        return this.items.includes(n);
    }
    remove(n) {
        const index = this.items.indexOf(n);
        if (index >= 0) {
            this.items.splice(index, 1);
            return true;
        }
        return false;
    }
    get(index) {
        return this.items[index];
    }
    set(index, value) {
        this.items[index] = adoptValue(value, this);
    }
    add(value) {
        this.items.push(adoptValue(value, this));
    }
    [Symbol.iterator]() {
        return this.items[Symbol.iterator]();
    }
    toJSON() {
        return this.items;
    }
    static from(arr, comments) {
        const items = arr.map((item) => _createCommentedNode(item));
        return new ArrayNode(items, comments);
    }
}
class RecordNode extends CollectionNode {
    $map;
    constructor(items, comments) {
        super(comments);
        this.$map = new Map(items.map(([key, item]) => [key, adoptChildNode(item, this)]));
    }
    get value() {
        return Object.fromEntries(this.items.map(([key, n]) => [key, n.value]));
    }
    get items() {
        return [...this.$map.entries()];
    }
    get size() {
        return this.items.length;
    }
    has(n) {
        return this.items.some(([, item]) => item === n);
    }
    remove(n) {
        const index = this.items.findIndex(([, item]) => item === n);
        if (index >= 0) {
            this.items.splice(index, 1);
            return true;
        }
        return false;
    }
    get(key) {
        const found = this.items.find(([k]) => k === key);
        if (!found)
            return undefined;
        return found[1];
    }
    set(key, value) {
        const cValue = adoptValue(value, this);
        const cNodeValue = cValue;
        const found = this.items.find(([k]) => k === key);
        if (found) {
            found[1] = cNodeValue;
        }
        else {
            this.items.push([key, cNodeValue]);
        }
    }
    [Symbol.iterator]() {
        return this.items[Symbol.iterator]();
    }
    toJSON() {
        return Object.fromEntries(this.items);
    }
    static from(obj, comments) {
        const items = Object.entries(obj).map(([k, v]) => [k, createCommentedNode(v)]);
        return new RecordNode(items, comments);
    }
}
function _createCommentedNode(value, comments) {
    if (isCommentedBaseNode(value))
        return value;
    switch (typeof value) {
        case 'number':
        case 'string':
        case 'boolean':
        case 'undefined': {
            return createCommentedScalar(value, comments);
        }
        case 'object': {
            if (!value)
                return createCommentedScalar(value, comments);
            const node = Array.isArray(value) ? ArrayNode.from(value, comments) : RecordNode.from(value, comments);
            return node;
        }
        default: {
            throw new Error(`Unsupported value type: ${typeof value}`);
        }
    }
}
export function createCommentedNode(value, comments) {
    return _createCommentedNode(value, comments);
}
function adoptValue(value, parent) {
    const node = isCommentedBaseNode(value) ? value : createCommentedNode(value);
    return adoptChildNode(node, parent);
}
function adoptChildNode(node, parent) {
    assert(isCommentedBaseNode(node));
    node[commentCollectionNode]?.remove(node);
    node[commentCollectionNode] = parent;
    return node;
}
//# sourceMappingURL=Commented.js.map