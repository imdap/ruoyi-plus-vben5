function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
const wsRegEx = /^\s+/;
export class Replacer {
    replace(start, end, replacement) {
        const startOffset = findOffset(this.offsetTable, start);
        const endOffset = findOffset(this.offsetTable, end);
        this.source = this.source.slice(0, start + startOffset) + replacement + this.source.slice(end + endOffset);
        addOffset(this.offsetTable, end, replacement.length - (end + endOffset - start - startOffset));
    }
    remove(start, end, trimWs = false) {
        this.replace(start, end, '');
        if (trimWs) {
            if (typeof trimWs === 'boolean') trimWs = wsRegEx;
            const endIndex = this.idx(end);
            var _this_source_slice_match;
            const [wsMatch] = (_this_source_slice_match = this.source.slice(endIndex).match(trimWs)) !== null && _this_source_slice_match !== void 0 ? _this_source_slice_match : [];
            var _wsMatch_length;
            this.source = this.source.slice(0, endIndex) + this.source.slice(endIndex + ((_wsMatch_length = wsMatch === null || wsMatch === void 0 ? void 0 : wsMatch.length) !== null && _wsMatch_length !== void 0 ? _wsMatch_length : 0));
            var _wsMatch_length1;
            addOffset(this.offsetTable, end, -((_wsMatch_length1 = wsMatch === null || wsMatch === void 0 ? void 0 : wsMatch.length) !== null && _wsMatch_length1 !== void 0 ? _wsMatch_length1 : 0));
        }
    }
    idx(idx) {
        return idx + findOffset(this.offsetTable, idx);
    }
    constructor(source){
        _define_property(this, "source", void 0);
        _define_property(this, "offsetTable", []);
        this.source = source;
    }
}
function addOffset(offsetTable, idx, offset) {
    let i = offsetTable.length, eq = false;
    while(i-- > 0){
        const [offsetIdx] = offsetTable[i];
        if (offsetIdx < idx || offsetIdx === idx && (eq = true)) break;
    }
    if (eq) offsetTable.splice(i, 1, [
        idx,
        offset + offsetTable[i][1]
    ]);
    else offsetTable.splice(i + 1, 0, [
        idx,
        offset
    ]);
}
function findOffset(offsetTable, idx) {
    let curOffset = 0;
    for (const [offsetIdx, offset] of offsetTable){
        if (offsetIdx > idx) break;
        curOffset += offset;
    }
    return curOffset;
}


//# sourceMappingURL=str.js.map