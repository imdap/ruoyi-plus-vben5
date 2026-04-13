function _check_private_redeclaration(obj, privateCollection) {
    if (privateCollection.has(obj)) {
        throw new TypeError("Cannot initialize the same private elements twice on an object");
    }
}
function _class_apply_descriptor_get(receiver, descriptor) {
    if (descriptor.get) {
        return descriptor.get.call(receiver);
    }
    return descriptor.value;
}
function _class_apply_descriptor_set(receiver, descriptor, value) {
    if (descriptor.set) {
        descriptor.set.call(receiver, value);
    } else {
        if (!descriptor.writable) {
            throw new TypeError("attempted to set read only private field");
        }
        descriptor.value = value;
    }
}
function _class_apply_descriptor_update(receiver, descriptor) {
    if (descriptor.set) {
        if (!descriptor.get) {
            throw new TypeError("attempted to read set only private field");
        }
        if (!("__destrWrapper" in descriptor)) {
            descriptor.__destrWrapper = {
                set value (v){
                    descriptor.set.call(receiver, v);
                },
                get value () {
                    return descriptor.get.call(receiver);
                }
            };
        }
        return descriptor.__destrWrapper;
    } else {
        if (!descriptor.writable) {
            throw new TypeError("attempted to set read only private field");
        }
        return descriptor;
    }
}
function _class_extract_field_descriptor(receiver, privateMap, action) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to " + action + " private field on non-instance");
    }
    return privateMap.get(receiver);
}
function _class_private_field_get(receiver, privateMap) {
    var descriptor = _class_extract_field_descriptor(receiver, privateMap, "get");
    return _class_apply_descriptor_get(receiver, descriptor);
}
function _class_private_field_init(obj, privateMap, value) {
    _check_private_redeclaration(obj, privateMap);
    privateMap.set(obj, value);
}
function _class_private_field_set(receiver, privateMap, value) {
    var descriptor = _class_extract_field_descriptor(receiver, privateMap, "set");
    _class_apply_descriptor_set(receiver, descriptor, value);
    return value;
}
function _class_private_field_update(receiver, privateMap) {
    var descriptor = _class_extract_field_descriptor(receiver, privateMap, "update");
    return _class_apply_descriptor_update(receiver, descriptor);
}
var _POOL_SIZE = /*#__PURE__*/ new WeakMap(), _opCnt = /*#__PURE__*/ new WeakMap(), _cbs = /*#__PURE__*/ new WeakMap();
export class Pool {
    async queue() {
        if (++_class_private_field_update(this, _opCnt).value > _class_private_field_get(this, _POOL_SIZE)) await new Promise((resolve)=>_class_private_field_get(this, _cbs).push(resolve));
    }
    pop() {
        _class_private_field_update(this, _opCnt).value--;
        const cb = _class_private_field_get(this, _cbs).pop();
        if (cb) cb();
    }
    setSize(size) {
        _class_private_field_set(this, _POOL_SIZE, size);
    }
    constructor(POOL_SIZE){
        _class_private_field_init(this, _POOL_SIZE, {
            writable: true,
            value: void 0
        });
        _class_private_field_init(this, _opCnt, {
            writable: true,
            value: 0
        });
        _class_private_field_init(this, _cbs, {
            writable: true,
            value: []
        });
        _class_private_field_set(this, _POOL_SIZE, POOL_SIZE);
    }
}


//# sourceMappingURL=pool.js.map