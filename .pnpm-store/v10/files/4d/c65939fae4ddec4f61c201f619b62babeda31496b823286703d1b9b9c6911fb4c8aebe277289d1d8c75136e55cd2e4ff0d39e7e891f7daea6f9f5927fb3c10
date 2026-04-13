"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ignoreENOENTSync = exports.ignoreENOENT = void 0;
const error_js_1 = require("./error.js");
const ignoreENOENT = async (p, rethrow) => p.catch(er => {
    if ((0, error_js_1.errorCode)(er) === 'ENOENT') {
        return;
    }
    throw rethrow ?? er;
});
exports.ignoreENOENT = ignoreENOENT;
const ignoreENOENTSync = (fn, rethrow) => {
    try {
        return fn();
    }
    catch (er) {
        if ((0, error_js_1.errorCode)(er) === 'ENOENT') {
            return;
        }
        throw rethrow ?? er;
    }
};
exports.ignoreENOENTSync = ignoreENOENTSync;
//# sourceMappingURL=ignore-enoent.js.map