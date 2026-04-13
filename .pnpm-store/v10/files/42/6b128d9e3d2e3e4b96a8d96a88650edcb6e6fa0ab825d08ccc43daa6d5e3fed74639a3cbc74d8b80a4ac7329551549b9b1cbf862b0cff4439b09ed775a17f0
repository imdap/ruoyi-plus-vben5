export class PairingHeap {
    compare;
    _heap;
    _size = 0;
    constructor(compare) {
        this.compare = compare;
    }
    add(v) {
        this._heap = insert(this.compare, this._heap, v);
        ++this._size;
        return this;
    }
    dequeue() {
        const n = this.next();
        if (n.done)
            return undefined;
        return n.value;
    }
    append(i) {
        for (const v of i) {
            this.add(v);
        }
        return this;
    }
    next() {
        if (!this._heap) {
            return { value: undefined, done: true };
        }
        const value = this._heap.v;
        --this._size;
        this._heap = removeHead(this.compare, this._heap);
        return { value };
    }
    peek() {
        return this._heap?.v;
    }
    [Symbol.iterator]() {
        return this;
    }
    get length() {
        return this._size;
    }
}
function removeHead(compare, heap) {
    if (!heap || !heap.c)
        return undefined;
    return mergeSiblings(compare, heap.c);
}
function insert(compare, heap, v) {
    const n = {
        v,
        s: undefined,
        c: undefined,
    };
    if (!heap || compare(v, heap.v) <= 0) {
        n.c = heap;
        return n;
    }
    n.s = heap.c;
    heap.c = n;
    return heap;
}
function merge(compare, a, b) {
    if (compare(a.v, b.v) <= 0) {
        a.s = undefined;
        b.s = a.c;
        a.c = b;
        return a;
    }
    b.s = undefined;
    a.s = b.c;
    b.c = a;
    return b;
}
function mergeSiblings(compare, n) {
    if (!n.s)
        return n;
    const s = n.s;
    const ss = s.s;
    const m = merge(compare, n, s);
    return ss ? merge(compare, m, mergeSiblings(compare, ss)) : m;
}
export const heapMethods = {
    insert,
    merge,
    mergeSiblings,
};
//# sourceMappingURL=PairingHeap.js.map