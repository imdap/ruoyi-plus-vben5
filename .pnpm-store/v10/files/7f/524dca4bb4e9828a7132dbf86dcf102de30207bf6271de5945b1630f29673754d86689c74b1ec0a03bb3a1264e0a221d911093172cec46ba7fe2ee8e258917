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
export class JspmError extends Error {
    constructor(msg, code){
        super(msg), _define_property(this, "jspmError", true), _define_property(this, "code", void 0);
        this.code = code;
    }
}
export function throwInternalError(...args) {
    throw new Error('Internal Error' + (args.length ? ' ' + args.join(', ') : ''));
}


//# sourceMappingURL=err.js.map